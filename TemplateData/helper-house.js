const houseContract = new web3.eth.Contract(abiDigger, HOUSE_CONTRACT);

window.web3gl.house = {
  mintHouse,
  widthdrawHouse,
  burnHouse,
  getTokenDetailsByOwnerHouse,
};

async function mintHouse(rarity) {
  if (!window.web3gl.checkAddressMetamask()) return;
  activeLoading();
  try {
    if (!(await window.web3gl.isApproved(HOUSE_CONTRACT))) {
      const rs = await approveToken(HOUSE_CONTRACT);
      if (!rs) {
        setError(ERROR_CODE.APPROVED_FAILED);
        return;
      } else {
        setSuccess(SUCCESS_CODE.APPROVED_SUCCESS);
      }
    }

    if (typeof rarity !== 'number') return;
    await houseContract.methods.mint(rarity).send({
      from: window.web3gl.address,
    });
  } catch (error) {
    console.log('error: ', error);
  }
  deactiveLoading();
}

async function widthdrawHouse() {
  await houseContract.methods.withdraw().call();
}

async function burnHouse(ids) {
  if (!Array.isArray(ids) || !ids?.length) return;
  await houseContract.methods.burn(ids).call();
}

async function getTokenDetailsByOwnerHouse(address) {
  if (typeof address !== 'string') return;
  const rs = await houseContract.methods.getTokenDetailsByOwner(address).call();
  return rs;
}
