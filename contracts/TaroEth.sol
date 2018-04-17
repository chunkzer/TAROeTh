pragma solidity ^0.4.19;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';

contract TaroEth is Ownable{
  using SafeMath for uint256;

  event NewPetition(uint incentive, uint petitionIndex, bool[8] topics, uint32 turnaround, Topic showcaseTopic, VideoStorageOptions storageOption, uint8[4] spread);
  event NewReading(string url);

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
    makePetition("Hopefully it works...", [true,false,false,false,false,false,false,false], Topic(0), VideoStorageOptions(0), [1,2,3,4]);
    makePetition("The second of many...", [false,true,false,false,false,false,false,false], Topic(1), VideoStorageOptions(1), [2,3,4,5]);
    makePetition("More supply...",        [true,false,false,false,false,false,false,false], Topic(2), VideoStorageOptions(1), [3,4,5,6]);
    /* makePetition("Hopefully it works...", [true,false,false,false,false,false,false,false], Topic(3), VideoStorageOptions(0), [4,5,6,7]); */
    /* makePetition("The second of many...", [false,true,false,false,false,false,false,false], Topic(4), VideoStorageOptions(1), [5,6,7,8]);
    makePetition("More supply...",        [true,false,false,false,false,false,false,false], Topic(5), VideoStorageOptions(1), [6,7,8,9]); */
    /* makePetition("Lucky number slevin",   [true,false,false,false,false,false,false,false], Topic(6), VideoStorageOptions(1), [7,8,9,10]); */

    makeReading("https://www.youtube.com/embed/ohQPySWJToo", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque metus odio, tristique eget tempor eu, commodo nec purus. Vestibulum id neque id ipsum tempor tempor faucibus ut lacus. Phasellus urna velit, condimentum ut suscipit ac, tristique ut diam. Donec ultrices libero sit amet eros lobortis, ut lacinia nisl pharetra. In lobortis purus nec semper sagittis. Nulla et orci non dui posuere finibus accumsan at nibh. Vivamus viverra at erat et tristique. Proin faucibus eros vitae lectus blandit consectetur. Nunc quis enim congue, suscipit augue in, rhoncus odio. Vivamus varius, mi a mattis sollicitudin, lacus odio laoreet libero, et pellentesque lectus turpis vel felis. Vivamus eget metus tempor, tempus sapien vitae, pellentesque diam. Fusce nec nisl molestie, accumsan diam at, pellentesque elit. Donec quis metus pharetra, porta quam sed, vulputate elit.", 0);
    makeReading("https://www.youtube.com/embed/XDA7WSMyiro", "It was the best of times. It was the worst of times.", 1);
  }

  // Modify State functions
  function withdraw() external onlyOwner {
    uint withdrawSum = unlockedBalance;
    unlockedBalance = 0;
    owner.transfer(withdrawSum);
  }

  function makePetition(string _comments, bool[8] _topics, Topic _showcaseTopic, VideoStorageOptions _storageOption, uint8[4] nonces) payable public {
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
    require(petitions[_index].turnaround > now);
    petitions[_index].status = PetitionStatus.Cancelled;
    msg.sender.transfer(petitions[_index].incentive);
  }

  function makeReading(string _url, string _commentary, uint _index) public onlyOwner existingPetition(_index) {
    require(petitions[_index].status == PetitionStatus.Pending);
    petitions[_index].status = PetitionStatus.Fulfilled;
    unlockedBalance.add(petitions[_index].incentive);
    petitions[_index].reading =  Reading(_url, _commentary, petitions[_index].reading.spread);
    NewReading(_url);
  }

  function modifyConstraints(uint _turnaround, uint _minimumIncentive) external onlyOwner {
    minimumIncentive = _minimumIncentive;
    maximumTurnaround = (_turnaround) * 1 days;
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
    Petition[] memory result = new Petition[](resultLength);
    //6 being the magic number of returned petitions...
    if(petitions.length < 6) {
      for(uint i = 0; i < petitions.length; i++){
        result[i] = petitions[i];
        petitionIndexes[i] = i;
      }
      return serializePetitionArray(petitionIndexes, result);
    }else{
      uint arrIndex = 0;
      for(i = (petitions.length - 6); i != petitions.length; i++){
        result[arrIndex] = (petitions[i]);
        petitionIndexes[arrIndex] = i;
        arrIndex++;
      }
      return serializePetitionArray(petitionIndexes, result);
    }
  }

  function getPetition(uint _index)
  public
  view
  existingPetition(_index)
  returns(uint256 incentive,
          string comments,
          uint32 turnaround,
          bool[8] topics,
          uint8 status,
          uint8 showcaseTopic,
          uint8 storageOption
          ){
    Petition memory petition = petitions[_index];
    return(petition.incentive,petition.comments,petition.turnaround, petition.topics, uint8(petition.status),uint8(petition.showcaseTopic),uint8(petition.storageOption));
  }

  function getReading(uint _index)
  external
  view
  existingPetition(_index)
  returns(string url, string commentary, uint8[4] spread){
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
