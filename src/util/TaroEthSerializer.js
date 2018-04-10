const StateMap = {
  0: 'Pending',
  1: 'Fulfilled',
  2: 'Cancelled'
}

const TopicMap = {
  0: 'Finance',
  1: 'Love',
  2: 'Success',
  3: 'Health',
  4: 'Work',
  5: 'Fear',
  6: 'Crypto',
  7: 'Open',
}

const reverseTopicMap = {
   'Finance':0,
   'Love'   :1,
   'Success':2,
   'Health' :3,
   'Work'   :4,
   'Fear'   :5,
   'Crypto' :6,
   'Open'   :7,
}

const StorageOptionMap = {
  0: 'Youtube',
  1: 'IPFS',
  2: 'SWARM'
}

const reverseStorageOptionMap = {
   'Youtube':0,
   'IPFS':1,
   'SWARM':2,
}

export const PetitionMap = {
  state: StateMap,
  topic: TopicMap,
  rTopic: reverseTopicMap,
  rStorageOption: reverseStorageOptionMap,
  storageOption: StorageOptionMap,
}

export default PetitionMap
