pragma solidity ^0.4.19;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/lifecycle/Pausable.sol';

contract TaroEth is Ownable, Pausable{
  using SafeMath for uint256;

  event NewPetition(uint incentive, uint petitionIndex, bool[8] topics, uint32 turnaround, Topic showcaseTopic, VideoStorageOptions storageOption, uint8[4] spread);
  event NewReading(string url, string commentary);

  enum PetitionStatus { Pending, Fulfilled, Cancelled}
  enum VideoStorageOptions { Youtube, IPFS, Swarm}
  enum Topic {Love, Finance, Success, Health, Work, Fear, Crypto, Everything}


  uint public maximumTurnaround = 7 days;
  uint public unlockedBalance = 0;
  uint public minimumIncentive = 0;


  //Follow this order (with omissions when necessary) for all input / output parameters for Petition.
  //Prefix external input output parameters
  struct Petition {
    address petitioner;
    uint256 incentive;
    Reading reading; //who knows
    string comments; //who knows
    uint32 turnaround; //uint32
    bool[8] topics; //8bits
    PetitionStatus status; //uint8
    Topic showcaseTopic; //uint8
    VideoStorageOptions storageOption; //uint8
  }

  struct Reading {
    string url;
    string commentary;
    uint8[4] spread;
  }


  address[] public petitionersAddresses;
  mapping(address => uint[]) public addressToPetitionIndexes;
  Petition[] petitions;

  modifier existingPetition(uint _index) {
    require(petitions[_index].turnaround != 0);
    _;
  }

  function TaroEth() public payable {
    unlockedBalance = msg.value;
  }

  function withdraw() external onlyOwner {
    uint withdrawSum = unlockedBalance;
    unlockedBalance = 0;
    owner.transfer(withdrawSum);
  }

  function petitionsLength() external view returns(uint length){
    return petitions.length;
  }

  function makePetition(string _comments, bool[8] _topics, Topic _showcaseTopic, VideoStorageOptions _storageOption, uint8[4] nonces)
    payable
    public
    whenNotPaused
    {
    require(msg.value >= minimumIncentive);
    if (addressToPetitionIndexes[msg.sender].length == 0){
      petitionersAddresses.push(msg.sender);
    }
    uint8[4] memory spread = generateSpread(nonces);

    Petition memory petition = Petition({
      petitioner: msg.sender,
      incentive: msg.value,
      reading: Reading("","", spread),
      comments: _comments,
      turnaround: uint32(now + maximumTurnaround),
      topics: _topics,
      status: PetitionStatus.Pending,
      showcaseTopic: (_showcaseTopic),
      storageOption: VideoStorageOptions(_storageOption)
      });
    uint newPetitionIndex = petitions.push(petition);
    addressToPetitionIndexes[msg.sender].push((newPetitionIndex - 1));
    NewPetition(msg.value, (newPetitionIndex - 1), _topics, uint32(now + maximumTurnaround), _showcaseTopic, _storageOption, spread);
  }

  function generateSpread(uint8[4] nonces) internal view returns(uint8[4]){
      uint8[4] memory spread;
      uint8 counter = 1;
      uint8 majorArcana = uint8(uint8(sha256(nonces[0] + uint256(block.timestamp))) % 22);
      uint8 minor1 = uint8(uint8(sha256(nonces[1] + uint256(block.timestamp))) % 56) + 22;
      uint8 minor2 = uint8(uint8(sha256(nonces[2] + uint256(block.timestamp))) % 56) + 22;
      while(minor1 == minor2){
          minor2 = uint8(uint8(sha256(nonces[2] + counter + uint256(block.timestamp))) % 56) + 22;
          counter++;
      }
      uint8 minor3 = uint8(uint8(sha256(nonces[3] + uint256(block.timestamp))) % 56) + 22;
      while(minor1 == minor3 || minor2 == minor3){
          minor3 = uint8(uint8(sha256(nonces[3] + counter + uint256(block.timestamp))) % 56) + 22;
          counter++;
      }

      spread[0] = majorArcana;
      spread[1] = minor1;
      spread[2] = minor2;
      spread[3] = minor3;
      return spread;
    }

  function cancelPetition(uint256 _index) public existingPetition(_index) {
    require(petitions[_index].petitioner == msg.sender);
    require(petitions[_index].status == PetitionStatus.Pending);
    require(petitions[_index].turnaround < now);
    petitions[_index].status = PetitionStatus.Cancelled;
    msg.sender.transfer(petitions[_index].incentive);
  }

  function updateReading(string _url, string _commentary, uint _index) public onlyOwner existingPetition(_index) {
    if(petitions[_index].status == PetitionStatus.Pending){
      unlockedBalance = unlockedBalance.add(petitions[_index].incentive);
    }
    petitions[_index].status = PetitionStatus.Fulfilled;
    petitions[_index].reading =  Reading(_url, _commentary, petitions[_index].reading.spread);
    NewReading(_url, _commentary);
  }

  function modifyConstraints(uint _turnaround, uint _minimumIncentive) external onlyOwner {
    minimumIncentive = _minimumIncentive;
    maximumTurnaround = (_turnaround);
  }

  function getLastPetitions()
  external
  view returns(uint[] indexes,
               address[] petitioner,
               uint[] incentive,
               uint32[] turnaround,
               uint8[] status,
               uint8[] showcaseTopic,
               uint8[] storageOption
  ){
    uint resultLength;
    if(petitions.length < 6){
      resultLength = petitions.length;
    }else{
      resultLength = 6;
    }
    uint[] memory petitionIndexes = new uint[](resultLength);
    uint arrIndex;
    Petition[] memory result = new Petition[](resultLength);
    //6 being the magic number of returned petitions...
    if(petitions.length < 6) {
      arrIndex = 0;
      for(uint i = petitions.length; i > 0; i--){
        result[arrIndex] = petitions[i - 1];
        petitionIndexes[arrIndex] = (i - 1);
        arrIndex++;
      }
    }else{
      arrIndex = 0;
      for(i = petitions.length; i > (petitions.length - 6); i--){
        result[arrIndex] = (petitions[(i - 1)]);
        petitionIndexes[arrIndex] = (i - 1);
        arrIndex++;
      }
    }
    return serializePetitionArray(petitionIndexes, result);
  }

  function getPetition(uint _index)
  public
  view
  returns(uint256 incentive,
          string comments,
          uint32 turnaround,
          bool[8] topics,
          uint8 status,
          uint8 showcaseTopic,
          uint8 storageOption
          ){

    if(petitions.length <= _index){
      return(0, '', 0, [false,false,false,false,false,false,false,false], 0, 0, 0);
    }
    Petition memory petition = petitions[_index];
    return(petition.incentive,petition.comments,petition.turnaround, petition.topics, uint8(petition.status),uint8(petition.showcaseTopic),uint8(petition.storageOption));
  }

  function getReading(uint _index)
  external
  view
  returns(string url, string commentary, uint8[4] spread){
    if(petitions.length <= _index){
      return('', '', [0,0,0,0]);
    }
    Reading memory reading = petitions[_index].reading;
    return (reading.url, reading.commentary, reading.spread);
  }

  function getAllPetitions()
  external
  view
  returns(uint[] indexes,
          address[] petitioner,
          uint[] incentive,
          uint32[] turnaround,
          uint8[] status,
          uint8[] showcaseTopic,
          uint8[] storageOption
  ){
    Petition[] memory result = new Petition[](petitions.length);
    uint[] memory petitionIndexes = new uint[](petitions.length);
    for(uint i = 0; i < petitions.length; i++){
      petitionIndexes[i] = i;
      result[i] = (petitions[petitionIndexes[i]]);
    }
    return serializePetitionArray(petitionIndexes, result);
  }


  function getPetitionsByPetitioner(address _petitioner)
  external
  view
  returns(uint[] indexes,
          address[] petitioner,
          uint[] incentive,
          uint32[] turnaround,
          uint8[] status,
          uint8[] showcaseTopic,
          uint8[] storageOption
  ){
    uint resultLength = addressToPetitionIndexes[_petitioner].length;
    Petition[] memory result = new Petition[](resultLength);
    uint[] memory petitionIndexes = new uint[](resultLength);
    for(uint i = 0; i < resultLength; i++){
      petitionIndexes[i] = addressToPetitionIndexes[_petitioner][i];
      result[i] = (petitions[petitionIndexes[i]]);
    }
    return serializePetitionArray(petitionIndexes, result);
  }

  function serializePetitionArray(uint[] petitionIndexes, Petition[] _petitions)
  internal
  pure
  returns(uint[], address[], uint[], uint32[], uint8[], uint8[], uint8[]) {
    address [] memory petitioners   = new address[](_petitions.length);
    uint    [] memory incentives    = new uint[](_petitions.length);
    uint32  [] memory turnarounds   = new uint32[](_petitions.length);
    uint8   [] memory status        = new uint8[](_petitions.length);
    uint8   [] memory showcaseTopic = new uint8[](_petitions.length);
    uint8   [] memory storageOption = new uint8[](_petitions.length);
    for(uint i = 0; i < _petitions.length; i++) {
      petitioners[i]    = _petitions[i].petitioner;
      incentives[i]     = _petitions[i].incentive;
      turnarounds[i]    = _petitions[i].turnaround;
      status[i]         = uint8(_petitions[i].status);
      showcaseTopic[i]  = uint8(_petitions[i].showcaseTopic);
      storageOption[i]  = uint8(_petitions[i].storageOption);
    }
    return (petitionIndexes, petitioners, incentives, turnarounds, status, showcaseTopic, storageOption);
  }
}
