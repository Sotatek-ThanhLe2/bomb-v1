const houseContract = new web3.eth.Contract(abiDigger, HOUSE_CONTRACT);

window.web3gl.house = {
  mintHouse,
  widthdrawHouse,
  burnHouse,
  getTokenDetailsByOwnerHouse,
};

//
async function mintHouse(rarity) {
  if (!window.web3gl.checkAddressMetamask()) return;
  activeLoading();
  try {
    console.log('ok');
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
    setSuccess(SUCCESS_CODE.MINT_HOUSE_SUCCESS);
  } catch (error) {
    setError(ERROR_CODE.MINT_HOUSE_FAILED);
    console.log('error: ', error);
  }
  deactiveLoading();
}

async function widthdrawHouse() {
  if (!window.web3gl.checkAddressMetamask()) return;

  await houseContract.methods.withdraw().send({
    from: window.web3gl.address,
  });
}

async function burnHouse(ids) {
  if (!Array.isArray(ids) || !ids?.length) return;
  await houseContract.methods.burn(ids).send({
    from: window.web3gl.address,
  });
}

async function getTokenDetailsByOwnerHouse() {
  if (!window.web3gl.checkAddressMetamask()) return;
  const rs = await houseContract.methods
    .getTokenDetailsByOwner(window.web3gl.address)
    .call();
  return rs;
}
