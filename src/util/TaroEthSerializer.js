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

import fool       from '../assets/FullCard/0.jpg'
import magician   from '../assets/FullCard/1.jpg'
import hpriestess from '../assets/FullCard/2.jpg'
import empress    from '../assets/FullCard/3.jpg'
import emperor    from '../assets/FullCard/4.jpg'
import hierophant from '../assets/FullCard/5.jpg'
import lovers     from '../assets/FullCard/6.jpg'
import chariot    from '../assets/FullCard/7.jpg'
import strength   from '../assets/FullCard/8.jpg'
import hermit     from '../assets/FullCard/9.jpg'
import wheel      from '../assets/FullCard/10.jpg'
import justice    from '../assets/FullCard/11.jpg'
import hangedman  from '../assets/FullCard/12.jpg'
import death      from '../assets/FullCard/13.jpg'
import temperance from '../assets/FullCard/14.jpg'
import devil      from '../assets/FullCard/15.jpg'
import tower      from '../assets/FullCard/16.jpg'
import star       from '../assets/FullCard/17.jpg'
import moon       from '../assets/FullCard/18.jpg'
import sun        from '../assets/FullCard/19.jpg'
import judgement  from '../assets/FullCard/20.jpg'
import world      from '../assets/FullCard/21.jpg'
import c1         from '../assets/FullCard/c1.jpg'
import c2         from '../assets/FullCard/c2.jpg'
import c3         from '../assets/FullCard/c3.jpg'
import c4         from '../assets/FullCard/c4.jpg'
import c5         from '../assets/FullCard/c5.jpg'
import c6         from '../assets/FullCard/c6.jpg'
import c7         from '../assets/FullCard/c7.jpg'
import c8         from '../assets/FullCard/c8.jpg'
import c9         from '../assets/FullCard/c9.jpg'
import c10        from '../assets/FullCard/c10.jpg'
import c11        from '../assets/FullCard/c11.jpg'
import c12        from '../assets/FullCard/c12.jpg'
import c13        from '../assets/FullCard/c13.jpg'
import c14        from '../assets/FullCard/c14.jpg'

import w1         from '../assets/FullCard/w1.jpg'
import w2         from '../assets/FullCard/w2.jpg'
import w3         from '../assets/FullCard/w3.jpg'
import w4         from '../assets/FullCard/w4.jpg'
import w5         from '../assets/FullCard/w5.jpg'
import w6         from '../assets/FullCard/w6.jpg'
import w7         from '../assets/FullCard/w7.jpg'
import w8         from '../assets/FullCard/w8.jpg'
import w9         from '../assets/FullCard/w9.jpg'
import w10        from '../assets/FullCard/w10.jpg'
import w11        from '../assets/FullCard/w11.jpg'
import w12        from '../assets/FullCard/w12.jpg'
import w13        from '../assets/FullCard/w13.jpg'
import w14        from '../assets/FullCard/w14.jpg'

import p1         from '../assets/FullCard/p1.jpg'
import p2         from '../assets/FullCard/p2.jpg'
import p3         from '../assets/FullCard/p3.jpg'
import p4         from '../assets/FullCard/p4.jpg'
import p5         from '../assets/FullCard/p5.jpg'
import p6         from '../assets/FullCard/p6.jpg'
import p7         from '../assets/FullCard/p7.jpg'
import p8         from '../assets/FullCard/p8.jpg'
import p9         from '../assets/FullCard/p9.jpg'
import p10        from '../assets/FullCard/p10.jpg'
import p11        from '../assets/FullCard/p11.jpg'
import p12        from '../assets/FullCard/p12.jpg'
import p13        from '../assets/FullCard/p13.jpg'
import p14        from '../assets/FullCard/p14.jpg'

import s1         from '../assets/FullCard/s1.jpg'
import s2         from '../assets/FullCard/s2.jpg'
import s3         from '../assets/FullCard/s3.jpg'
import s4         from '../assets/FullCard/s4.jpg'
import s5         from '../assets/FullCard/s5.jpg'
import s6         from '../assets/FullCard/s6.jpg'
import s7         from '../assets/FullCard/s7.jpg'
import s8         from '../assets/FullCard/s8.jpg'
import s9         from '../assets/FullCard/s9.jpg'
import s10        from '../assets/FullCard/s10.jpg'
import s11        from '../assets/FullCard/s11.jpg'
import s12        from '../assets/FullCard/s12.jpg'
import s13        from '../assets/FullCard/s13.jpg'
import s14        from '../assets/FullCard/s14.jpg'


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


const fullcardMap = {
  0:  {card: fool,
       title: 'The Fool',
       byline: 'An infinitely repeating first step towards life.',
       summary: 'Numbered 0 The Fool represents the beginning of a journey both within the Major Arcana and without. This card expresses exploration, optimism in the face of the unknown but also a naivete about the difficulties ahead.' },
  1:  {card: magician,
       title: 'The Magician',
       byline: 'The greatest Alchemy is one between abstracts and actuals.',
       summary: 'Represent open sometimes hubristic experimentation. In his table you can see that the 4 suits of the Minor Arcana are represented, suggesting no particular affinity but a drive towards becoming a complete being' },
  2:  {card: hpriestess,
       title: 'The High Priestess',
       byline: 'Submerge your heart in an icy lake and listen for what comes after the last beat.',
       summary: 'The High Priestess is a difficult to interpret card as it’s often linked to the subconscious mind. It’s dominance over a reading suggests to pay particular attention your dreams, your intuition and ‘gut’ feelings. ' },
  3:  {card: empress,
       title: 'The Empress',
       byline: 'I can’t think of anything more important than the germination of a single seed.',
       summary: 'The Royal pair of Empress and Emperor represent the maximized qualities of the two genders. Accordingly the Empress card represents fertility, life, nature, the care of motherhood as well as ‘soft power’ and unseen (benign) influences.' },
  4:  {card: emperor,
       title: 'The Emperor',
       byline: 'No man is free who is not master of himself. No man is free.',
       summary: 'The Royal pair of Empress and Emperor represent the maximized qualities of the two genders. Accordingly the Emperor card represents existing Authority, Norms and Power. Though from a child’s perspective it is often normal to resent and fear this figure of control it can also represent our own role of Emperor within our spheres of influence.' },
  5:  {card: hierophant,
       title: 'The Hierophant',
       byline: 'I want fanatics for God because fanaticism is Love',
       summary: 'The Hierophant solidifies spirituality, belief systems and groupings of all kinds into institutions with their own norms. Like the two adepts before him, his presence signifies the welcoming of others into a system of thinking that could require significant learning.' },
  6:  {card: lovers,
       title: 'The Lovers',
       byline: 'If I could become a circle with you...',
       summary: 'The Lovers is the only Major Arcana where two figures take the spotlight. Accordingly the Lovers represent mutual attractiveness, passion and harmony beyond just sexual attraction. Not limited to relationships between individuals it can also speak to the relationship of the self and the world, it’s harmony or disharmony.' },
  7:  {card: chariot,
       title: 'The Chariot',
       byline: 'I’d rather fight and regret it than not fight and regret it',
       summary: 'The Chariot represents conquest, glory, victory and overcoming challenges through will and action. The appearance of this card in a reading suggest a necessity for vitality and confidence when tackling challenges ahead.' },
  8:  {card: strength,
       title: 'The Strength',
       byline: 'It’s often said that you don’t know your own strength until it’s tested but could it be the other way around?',
       summary: 'The Strength Arcana deals with inner strength and resiliency. It speaks of a capacity to deal with lives blows while maintaining your composure and intellect. ' },
  9:  {card: hermit,
       title: 'The Hermit',
       byline: 'A man can do what he wants but he cannot want what he wants',
       summary: 'The Hermit card suggests both the fruits and pains of meditation and isolation. A card that invites you to do some introspection and inventory of the self. The hermit only has himself as a case study, but that is often the most rewarding topic of all.' },
  10: {card: wheel,
       title: 'The Wheel of Fortune',
       byline: 'Be it a second later or a hundred years. It\'s always churning and roiling. And people change as much as oceans',
       summary: 'Like it ludic imagery suggests the wheel represents cycles, good tides, bad tides and everything in between. If things are hard, they might be getting easier in the future  and if things are comfortable we would do well to remember everything is transient. ' },
  11: {card: justice,
       title: 'Justice',
       byline: 'Fiat justitia ruat cælum',
       summary: 'Could be the most straightforward of the Major Arcana, Justice deals simply with the concept of Justice and fairness. A reading dominated by this card puts the rest of the spread in a context of fairness, equity and lawfulness which can be a recipe for very bitter feelings to arise.' },
  12: {card: hangedman,
       title: 'The Hangedman',
       byline: 'Hangedman is the null space of the Tarot cards. This card represents stasis, inaction and deferred decision making. Which itself can be a most powerful tool.',
       summary: 'As long as you know I am waiting take your time flowers of the spring' },
  13: {card: death,
       title: 'Death',
       byline: 'Something that\'s supposed to die and doesn\'t will eventually rot away, whether it\'s a man or a nation.',
       summary: 'A card of ends. A major feature of your life is about to wound down leaving space for a new beginning. It may be troublesome to let go of something that has been with us for so long, but there’s no use in holding on to a dead thing.' },
  14: {card: temperance,
       title: 'Temperance',
       byline:  'Everything in it\'s right place',
       summary: 'In regards to the self Temperance represents the harmonic coexistence of our needs physical, spiritual and mental. While in relation to others it omens a time of exciting collaboration, cooperation and understanding with the people around us.' },
  15: {card: devil,
       title: 'The Devil',
       byline: 'I know the Sabbath party is where people get possessed by devils',
       summary: 'The card of the Devil represents our own hidden vicious cycles and their capacity to oppress us as an outside force when in reality they are self-imposed shackles. Self-fulfilling prophecies, anxiety, addiction and other harmful daily habits that inhibits us from reaching a higher consciousness.' },
  16: {card: tower,
       title: 'The Tower',
       byline: 'Sometimes bad things happen and darkness descends.',
       summary: 'A card of destruction, it represents the danger that our perceived safety and understanding of the world is about to be rocked and unless we can rid ourselves of our false assumptions we will be in for a rude awakening.' },
  17: {card: star,
       title: 'The Star',
       byline: 'Born under a red comet.',
       summary: 'The star is an extremely positive card. The context of the spread is permeated with the feeling of blissful knowing of your place in the universe and the gifts and opportunities that are offered to you. This card only asks that you have faith in the flow of the world to bring to you the things that you need to feel inspired, meet your goals and more.' },
  18: {card: moon,
       title: 'The Moon',
       byline: 'You can\'t forget me...',
       summary: 'The moon represents our darker hidden selves. The part that we dislike to show to other due to feelings of weakness, embarrassment or vulnerability. However they are still part of us, and The Moon invites us to deal with our dark self in a productive way.' },
  19: {card: sun,
       title:   'The Sun',
       byline:  'Charismatic authority is powerful becuase we desire it',
       summary: 'The Sun card represents a radiance, vitality and plenty. It suggests that an external force will bless you with it’s patronage or that you yourself will play the Sun for people in your orbit. Giving warmth and receiving blessings for sharing your best qualities.' },
  20: {card: judgement,
       title: 'The Judgement',
       byline: 'It all goes into a scale in the end...',
       summary: 'The Judgement card invites a period of vast self-reflection using logic and the intellect as well as the experiences of our emotions. It’s the Christmas carol of cards inviting us on a journey to examine our past, present and future.' },
  21: {card: world,
       title: 'Za World',
       byline: 'It\'s like the whole world froze for 9 seconds...',
       summary: 'The World is the last card in the Major Arcana sequence. It signifies the completion of a great work or journey. The moment of payoff where all of the hardships suffered and effort expended is finally rewarded and we fill that the whole world is at our hand.' },
  22: c1,
  23: c2,
  24: c3,
  25: c4,
  26: c5,
  27: c6,
  28: c7,
  29: c8,
  30: c9,
  31: c10,
  32: c11,
  33: c12,
  34: c13,
  35: c14,
  36: w1,
  37: w2,
  38: w3,
  39: w4,
  40: w5,
  41: w6,
  42: w7,
  43: w8,
  44: w9,
  45: w10,
  46: w11,
  47: w12,
  48: w13,
  49: w14,
  50: p1,
  51: p2,
  52: p3,
  53: p4,
  54: p5,
  55: p6,
  56: p7,
  57: p8,
  58: p9,
  59: p10,
  60: p11,
  61: p12,
  62: p13,
  63: p14,
  64: s1,
  65: s2,
  66: s3,
  67: s4,
  68: s5,
  69: s6,
  70: s7,
  71: s8,
  72: s9,
  73: s10,
  74: s11,
  75: s12,
  76: s13,
  77: s14
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
  fullcards: fullcardMap
}

export default PetitionMap
