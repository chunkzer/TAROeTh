# TAROeTh
Esoteric dApp.
You can make a request for a video Tarot card reading from the contract owner. (It can be free or you can include some ETH).

Your request can be fulfilled (or not) and you can cancel any petition after a bit of time. (If it wasn't fulfilled)

How to run locally:

``npm install``

``npm start``

At this point the front end of the dApp will be running, if you are connected to mainnet or ropsten you'll be able to see and interact with the app. If you want to do it locally and deploy the contracts yourself please do:


``truffle develop``

Now within the truffle develop environment run

``migrate``

Now, if you have metamask installed with a custom RPC port matching the one where the truffle
development blockchain is running you should be able to see / operate / interact with the application.

You can check it out a live version of the code hosted on github at:
https://chunkzer.github.io/TAROeTh

Requires a connection to mainnet or ropsten network.
