var TaroEth = artifacts.require("./TaroEth.sol");

contract('TaroEth', function(accounts) {
  // Most of these functions test the basic functionality of adding and modifying
  // data that is relevant to the contracts basic operation. I.E. adding a petitions
  // is a necessary step to doing anything else
  it("should store a Petition", function() {
    return TaroEth.new().then(function(instance) {
      TaroEthInstance = instance;
      return TaroEthInstance.makePetition("Test", [true,false,false,false,false,false,false,false], 0, 0, [1,2,3,4], {from: accounts[0], value: 10000000});
    }).then(function() {
      return TaroEthInstance.getPetition.call(0);
    }).then(function(data) {
      assert.equal(data[0], 10000000, "The stored Petition Comments don't match...");
      assert.equal(data[1], "Test", "The stored Petition Comments don't match...");
      assert.equal(data[4], 0, "status is not 'Pending'");
      assert.equal(data[5], 0, "showcaseTopic doesn't match");
      assert.equal(data[6], 0, "storageOption doesn't match");
    });
  });

  // A user should be able to cancel his/her petition if the circumnstances permit it so
  it("should cancel a Petition", function() {
    return TaroEth.new().then(function(instance) {
      TaroEthInstance = instance;
      return TaroEthInstance.makePetition("Test", [true,false,false,false,false,false,false,false], 0, 0, [1,2,3,4], {from: accounts[0], value: 10000000});
    }).then(function() {
      return TaroEthInstance.cancelPetition(0);
    }).then(function() {
      return TaroEthInstance.getPetition.call(0);
    }).then(function(data){
      assert.equal(data[4], 2, "status is equal to 'Cancelled'");
    });
  });

  // Readings are the end product of this dApp, so they being storeable in the
  // contract is a necessity
  it("should store a Reading", function() {
    return TaroEth.new().then(function(instance) {
      TaroEthInstance = instance;
      return TaroEthInstance.makePetition("Test", [true,false,false,false,false,false,false,false], 0, 0, [1,2,3,4], {from: accounts[0], value: 10000000});
    }).then(function() {
      TaroEthInstance.makeReading("Youtube.com", "You're screwed. Spiritually.", 0)
    }).then(function() {
      return TaroEthInstance.getReading.call(0);
    }).then(function(data) {
      assert.equal(data[0], "Youtube.com", "Stored URL doesn't match");
      assert.equal(data[1], "You're screwed. Spiritually.", "Stored comments don't match");
    });
  });

  // This is a GET like function necessary for efficiently presenting information
  // from the contract that is relevant to the user in the dApp.
  it("should get all the petitions for one address", function() {
    return TaroEth.new().then(function(instance) {
      TaroEthInstance = instance;
      TaroEthInstance.makePetition("Test1", [true,false,false,false,false,false,false,false], 0, 0, [1,2,3,4], {from: accounts[0], value: 10000000});
      TaroEthInstance.makePetition("From Another Address", [true,false,false,false,false,false,false,false], 0, 0, [1,2,3,4], {from: accounts[1], value: 10000000});
      TaroEthInstance.makePetition("Test2", [true,false,false,false,false,false,false,false], 0, 0, [1,2,3,4], {from: accounts[0], value: 10000000});
      TaroEthInstance.makePetition("Test3", [true,false,false,false,false,false,false,false], 0, 0, [1,2,3,4], {from: accounts[0], value: 10000000});
      TaroEthInstance.makePetition("Test4", [true,false,false,false,false,false,false,false], 0, 0, [1,2,3,4], {from: accounts[0], value: 10000000});
      TaroEthInstance.makePetition("Test5", [true,false,false,false,false,false,false,false], 0, 0, [1,2,3,4], {from: accounts[0], value: 10000000});

    }).then(function() {
      return TaroEthInstance.getPetitionsByPetitioner.call(accounts[0]);
    }).then(function(data) {
      assert.equal(data[0].length, 5, "Function brought a different amount of petitions from the expected");
      assert.equal(data[0][0], 0, "Index for first petition matches first petition made");
      assert.equal(data[0][1], 2, "Index for subsequent petitions don't skip indexes of other addressess");
    });
  });


  it("should get all the latest petitions in order", function() {
    return TaroEth.new().then(function(instance) {
      TaroEthInstance = instance;
      TaroEthInstance.makePetition("Earliest", [true,false,false,false,false,false,false,false], 0, 0, [1,2,3,4], {from: accounts[0], value: 10000000});
      TaroEthInstance.makePetition("Test2", [true,false,false,false,false,false,false,false], 0, 0, [1,2,3,4], {from: accounts[0], value: 10000000});
      TaroEthInstance.makePetition("Test3", [true,false,false,false,false,false,false,false], 0, 0, [1,2,3,4], {from: accounts[0], value: 10000000});
      TaroEthInstance.makePetition("Test4", [true,false,false,false,false,false,false,false], 0, 0, [1,2,3,4], {from: accounts[0], value: 10000000});
      TaroEthInstance.makePetition("Test5", [true,false,false,false,false,false,false,false], 0, 0, [1,2,3,4], {from: accounts[0], value: 10000000});
      TaroEthInstance.makePetition("Test6", [true,false,false,false,false,false,false,false], 0, 0, [1,2,3,4], {from: accounts[0], value: 10000000});
      TaroEthInstance.makePetition("Latest", [true,false,false,false,false,false,false,false], 0, 0, [1,2,3,4], {from: accounts[0], value: 10000000});
      return TaroEthInstance.getLastPetitions.call();
    }).then(function(data) {
      assert.equal(data[0].length < 7, true, "It's bringing more than 6 petitions");
      //[0][0] Index of first petition returned
      assert.equal(data[0][0], 6, "First Petition in array is not the latest...");
    });
  });

  // Testing that edge cases don't blow up my dApp
  it("should get return an output parameter arity sized array of empty arrays if there are no petitions", function() {
    return TaroEth.new().then(function(instance) {
      TaroEthInstance = instance;
      return TaroEthInstance.getLastPetitions.call();

    }).then(function(data) {
      assert.equal(data.length, 7,    "It's not bringing 7 arrays.");
      assert.equal(data[0].length, 0, "It's not bringing empty array.");
    });
  });

  // Testing that edge cases don't blow up my dApp
  it("should not return petitionsn if address has none", function() {
    return TaroEth.new().then(function(instance) {
      TaroEthInstance = instance;
      TaroEthInstance.makePetition("Earliest", [true,false,false,false,false,false,false,false], 0, 0, [1,2,3,4], {from: accounts[0], value: 10000000});
      return TaroEthInstance.getPetitionsByPetitioner.call(accounts[1]);
    }).then(function(data) {
      assert.equal(data.length, 7, "It's not bringing 7 arrays for output parameter arity");
      assert.equal(data[0].length, 0, "It's not bringing an empty index array");
    });
  });
});
