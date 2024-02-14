const { expect } = require("chai");

describe("Token Contract", function () {
  let Token;
  let hardhatToken;
  let owner;
  let address1;
  let address2;
  let addresses;

  // Gets run before each test
  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, address1, address2, ...addresses] = await ethers.getSigners();
    hardhatToken = await Token.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });
    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      await hardhatToken.transfer(address1.address, 5);
      const address1Balance = await hardhatToken.balanceOf(address1.address);
      expect(address1Balance).to.equal(5);

      await hardhatToken.connect(address1).transfer(address2.address, 5);
      const address2Balance = await hardhatToken.balanceOf(address2.address);
      expect(address2Balance).to.equal(5);
    });

    it("Should fail if the sender doesnt have enough tokens", async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
      await expect(
        hardhatToken.connect(address1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens");

      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
      await hardhatToken.transfer(address1.address, 5);
      await hardhatToken.transfer(address2.address, 10);

      const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
      const address1Balance = await hardhatToken.balanceOf(address1.address);
      const address2Balance = await hardhatToken.balanceOf(address2.address);

      expect(initialOwnerBalance).to.not.equal(finalOwnerBalance);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 15);
      expect(address1Balance).to.equal(5);
      expect(address2Balance).to.equal(10);
    });
  });
});
