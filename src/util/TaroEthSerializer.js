import previewLove       from '../assets/PreviewCard/0.png'
import previewFinance    from '../assets/PreviewCard/1.png'
import previewSuccess    from '../assets/PreviewCard/2.png'
import previewHealth     from '../assets/PreviewCard/3.png'
import previewWork       from '../assets/PreviewCard/4.png'
import previewFear       from '../assets/PreviewCard/5.png'
import previewCrypto     from '../assets/PreviewCard/6.png'
import previewEverything from '../assets/PreviewCard/7.png'

import fullcardLove    from '../assets/FullCard/c2.jpg'
import fullcardFinance from '../assets/FullCard/p2.jpg'
import fullcardSuccess from '../assets/FullCard/w6.jpg'
import fullcardHealth  from '../assets/FullCard/c1.jpg'
import fullcardWork    from '../assets/FullCard/p7.jpg'
import fullcardFear    from '../assets/FullCard/s6.jpg'
import fullcardCrypto  from '../assets/FullCard/p4.jpg'
import fullcardEverything    from '../assets/FullCard/10.jpg'

const StatusMap = {
  0: 'Pending',
  1: 'Fulfilled',
  2: 'Cancelled'
}

const TopicMap = {
  0: 'Love',
  1: 'Finance',
  2: 'Success',
  3: 'Health',
  4: 'Work',
  5: 'Fear',
  6: 'Crypto',
  7: 'Everything',
}

const topicObjectMap = {
  'Love':       {id: 0, header: 'Explorations of Love',    previewImage: previewLove,       fullcard: fullcardLove},
  'Finance':    {id: 1, header: 'Explorations of Finance', previewImage: previewFinance,    fullcard: fullcardFinance},
  'Success':    {id: 2, header: 'Explorations of Success', previewImage: previewSuccess,    fullcard: fullcardSuccess},
  'Health':     {id: 3, header: 'Explorations of Health',  previewImage: previewHealth,     fullcard: fullcardHealth},
  'Work':       {id: 4, header: 'Explorations of Work',    previewImage: previewWork,       fullcard: fullcardWork},
  'Fear':       {id: 5, header: 'Explorations onto Fears', previewImage: previewFear,       fullcard: fullcardFear},
  'Crypto':     {id: 6, header: 'Explorations of Crypto',  previewImage: previewCrypto,     fullcard: fullcardCrypto},
  'Everything': {id: 7, header: 'Free form explorations',  previewImage: previewEverything, fullcard: fullcardEverything},
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
  status: StatusMap,
  topic: TopicMap,
  topicObj: topicObjectMap,
  rStorageOption: reverseStorageOptionMap,
  storageOption: StorageOptionMap,
}

export default PetitionMap
