## Design Pattern considerations:


### Puasable
Included Pausable as a way to stop this contract from executing if it's being interacted with in a destructive way that was never intended, as a last resort, or if I as owner can't find an administrative user to transfer ownership that will continue operating this contract (it does require an interested owner to produce readings)


### Ownable
Included Ownable pattern as this contract is not an open marketplace, but a decentralized order filling mechanism where the order attendant is the contract owner and there is not much here that is automatized. So the responsibility and power associated with that position should be only available to the relevant stake holder (owner).

### Not INCLUDED: Arbitrage

A glaring flaw and need for trust is present in this contract. A malicious Owner could simply claim fees without making any readings! Why not include arbitrage to make sure owner is doing his part? Well, for one, the application is not financially minded, there could be some transactios but its mostly for fun and accordingly it assumes good faith from its participants (for the most part) and secondly owner has skin in the game to operate the contract in a fair manner! Any outright breach in expected operated procedure would be observable by the public and crash contract operators credibility.





Stretch Requirements:

Contract has been deployed to main net and rinkeby. You can play around with it at:
https://chunkzer.github.io/TAROeTh
