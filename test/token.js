//Mocha -> Framework
//Chai -> Library
const { expect } = require("chai");

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();
    console.log("Signers object:", owner);
    const Token = await ethers.getContractFactory("Token"); // instance contract

    const hardhatToken = await Token.deploy(); // deploy contract

    const ownerBalance = await hardhatToken.balanceOf(owner.address); // owner balance = 10000
    console.log("Owner Address:", owner.address);

    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance); // total supply = 10000
  });
});
