pragma solidity ^0.4.19;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';

contract TaroEth is Ownable{
  using SafeMath for uint256;

  event NewPetition(uint incentive, uint32 turnaround, PetitionStatus status, VideoStorageOptions storageOption, Topics topic);
  event NewReading(string url);

  enum PetitionStatus { Pending, Fulfilled, Cancelled}
  enum VideoStorageOptions { Youtube, IPFS, Swarm}
  enum Topics { Finance, Love, Success, Health, Work, Danger, Crypto, Open}


  uint oldestLastPetitionIndex = 0;
  uint public turnaround = 7 days;
  uint public unlockedBalance = 0;
  uint public minimumIncentive = 0;

  struct Petition {
    address petitioner;
    uint256 incentive;
    uint32 turnaround;
    PetitionStatus status;
    VideoStorageOptions storageOption;
    Topics topic;
    Reading reading;
  }

  struct Reading {
    string url;
    string commentary;
  }

  struct IndexedPetitions {
    uint index;
    Petition[] petitions;
  }

  Petition[] internal lastPetitions;
  address[] public hasPetitions;

  mapping(address => IndexedPetitions) addressToPetitions;

  modifier existingPetition(address _petitioner, uint _index) {
    IndexedPetitions storage p = addressToPetitions[_petitioner];
    require(hasPetitions[p.index] == msg.sender);
    require(_index <= (p.petitions.length.sub(1)));
    _;
  }

  function TaroEth() public payable {
    unlockedBalance = msg.value;
    Petition memory petition1 = Petition(msg.sender, msg.value, uint32(now + turnaround), PetitionStatus(0), VideoStorageOptions(0), Topics(0), Reading("", ""));
    lastPetitions.push(petition1);
    Petition memory petition2 = Petition(msg.sender, msg.value, uint32(now + turnaround), PetitionStatus(0), VideoStorageOptions(1), Topics(1), Reading("", ""));
    lastPetitions.push(petition2);
  }

  // Modify State functions
  function withdraw() external onlyOwner {
    uint withdrawSum = unlockedBalance;
    unlockedBalance = 0;
    owner.transfer(withdrawSum);
  }

  function makePetition(Topics _topic, VideoStorageOptions _storageOption) payable public {
    require(msg.value >= minimumIncentive);
    if (addressToPetitions[msg.sender].petitions.length == 0){
      addressToPetitions[msg.sender].index = hasPetitions.push(msg.sender);
    }
    Petition memory petition = Petition(msg.sender, msg.value, uint32(now + turnaround), PetitionStatus.Pending, VideoStorageOptions(_storageOption), Topics(_topic), Reading("", ""));
    addressToPetitions[msg.sender].petitions.push(petition);
    lastPetitions[oldestLastPetitionIndex] = petition;
    _updateLastPetitionIndex();
    NewPetition(msg.value, uint32(now + turnaround), PetitionStatus.Pending, _storageOption, _topic);
  }

  function _updateLastPetitionIndex() internal {
    if(oldestLastPetitionIndex == 4){
      oldestLastPetitionIndex = 0;
    }else {
      oldestLastPetitionIndex.add(1);
    }
  }

  function cancelPetition(uint256 _index) public existingPetition(msg.sender, _index) {
    Petition[] storage petitions = addressToPetitions[msg.sender].petitions;
    require(petitions[_index].status == PetitionStatus.Pending);
    require(petitions[_index].turnaround > now);
    petitions[_index].status = PetitionStatus.Cancelled;
    msg.sender.transfer(petitions[_index].incentive);
  }

  function makeReading(string _url, string _commentary, address _petitioner, uint _index) external onlyOwner existingPetition(_petitioner, _index) {
    Petition storage petition = addressToPetitions[msg.sender].petitions[_index];
    require(petition.status == PetitionStatus.Pending);
    petition.status = PetitionStatus.Fulfilled;
    unlockedBalance.add(petition.incentive);
    petition.reading =  Reading(_url, _commentary);
    NewReading(_url);
  }

  function modifyConstraints(uint _turnaround, uint _minimumIncentive) external onlyOwner {
    minimumIncentive = _minimumIncentive;
    turnaround = (_turnaround) * 1 days;
  }

  function getLast5Petitions() external view returns(address[] petitioner, uint[] incentive, uint32[] turnaround, uint8[] status, uint8[] storageOption, uint8[] topic) {
    Petition[] storage petitions = lastPetitions;
    return returnPetitionArray(petitions);
  }

  function getPetitionsByPetitioner(address _petitioner) external view returns(address[] petitioner, uint[] incentive, uint32[] turnaround, uint8[] status, uint8[] storageOption, uint8[] topic) {
    Petition[] storage petitions = addressToPetitions[_petitioner].petitions;
    return returnPetitionArray(petitions);
  }

  function returnPetitionArray(Petition[] storage petitions) internal view returns(address[], uint[], uint32[], uint8[], uint8[], uint8[]) {
    address [] memory petitioners   = new address[](petitions.length);
    uint    [] memory incentives    = new uint[](petitions.length);
    uint32  [] memory turnarounds   = new uint32[](petitions.length);
    uint8   [] memory status        = new uint8[](petitions.length);
    uint8   [] memory storageOption = new uint8[](petitions.length);
    uint8   [] memory topics        = new uint8[](petitions.length);
    for(uint i = 0; i < petitions.length; i++) {
      petitioners[i]    = petitions[i].petitioner;
      incentives[i]     = petitions[i].incentive;
      turnarounds[i]    = petitions[i].turnaround;
      status[i]         = uint8(petitions[i].status);
      storageOption[i]  = uint8(petitions[i].storageOption);
      topics[i]         = uint8(petitions[i].topic);
    }
    return (petitioners, incentives, turnarounds, status, storageOption, topics);
  }

  function getReading(address _petitioner, uint _index) external view existingPetition(_petitioner, _index) returns(string, string)  {
    require(addressToPetitions[_petitioner].petitions[_index].status == PetitionStatus.Fulfilled);
    Reading storage reading = addressToPetitions[_petitioner].petitions[_index].reading;
    return (reading.url, reading.commentary);
  }
}
