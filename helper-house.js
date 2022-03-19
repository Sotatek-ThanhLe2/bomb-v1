const houseContract = new web3.eth.Contract(abiDigger, HOUSE_CONTRACT);

window.web3gl.house = {};

async function withdraw() {
  await houseContract.methods.withdraw().call();
}

async function burn(ids) {
  if (!Array.isArray(ids) || !ids?.length) return;
  await houseContract.methods.burn(ids).call();
}
