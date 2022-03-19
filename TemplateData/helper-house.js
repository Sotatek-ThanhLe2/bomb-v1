const houseContract = new web3.eth.Contract(abiDigger, HOUSE_CONTRACT);

window.web3gl.house = {
  houseMint,
  houseWithdraw,
  houseBurn,
  houseGetTokenDetailsByOwner,
};

async function houseMint(rarity) {
  if (typeof rarity !== 'number') return;
  await houseContract.methods.mint(rarity).call();
}

async function houseWithdraw() {
  await houseContract.methods.withdraw().call();
}

async function houseBurn(ids) {
  if (!Array.isArray(ids) || !ids?.length) return;
  await houseContract.methods.burn(ids).call();
}

async function houseGetTokenDetailsByOwner(address) {
  if (typeof address !== 'string') return;
  const rs = await houseContract.methods.getTokenDetailsByOwner(address).call();
  return rs;
}
