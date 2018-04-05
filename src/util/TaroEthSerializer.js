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
  5: 'Danger',
  6: 'Crypto',
  7: 'Open',
}

const StorageOptionMap = {
  0: 'Youtube',
  1: 'IPFS',
  2: 'Swarm'
}

export const PetitionMap = {
  state: StateMap,
  topic: TopicMap,
  storageOption: StorageOptionMap,
}

export default PetitionMap
