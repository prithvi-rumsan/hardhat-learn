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

  it("Should transfer tokens between accounts", async function () {
    const [owner, address1, address2] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");

    const hardhatToken = await Token.deploy();

    // transfer 10 tokens from owner to address 1

    await hardhatToken.transfer(address1.address, 10);

    expect((await hardhatToken.balanceOf(address1.address)) === 10);

    // transfer 5 tokens from address 1 to address 2

    await hardhatToken.connect(address1).transfer(address2.address, 5);

    expect(
      (await hardhatToken.balanceOf(address2.address)) === 5 &&
        (await hardhatToken.balanceOf(address1.address)) === 5
    );
  });
});
