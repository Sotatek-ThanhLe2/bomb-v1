const diggerContract = new web3.eth.Contract(abiDigger, DIGGER_CONTRACT);

window.web3gl.digger = {
  mintDigger,
  upgradeDigger,
  getClaimableTokensDigger,
  getProcessableTokensDigger,
  processTokenRequestsDigger,
};

/*
  mint digger
  - count: 
*/
async function mintDigger(count) {
  if (!window.web3gl.checkAddressMetamask()) return;

  if (count <= 0) {
    setError(ERROR_CODE.MINT_DIGGER_NOT_NEGATIVE);
    return;
  }
  if (count >= MAX_DIGGER_MINT) {
    setError(ERROR_CODE.MINT_DIGGER_MINT_LIMIT);
    return;
  }
  try {
    activeLoading();
    await diggerContract.methods.mint(count).send({
      from: window.web3gl.address,
    });
    deactiveLoading();
  } catch (error) {
    console.log(error, 'err');
  }
}

async function upgradeDigger(diggerId, commonDiggerId) {
  if (!window.web3gl.checkAddressMetamask()) return;
  activeLoading();
  try {
    await diggerContract.methods.upgrade(diggerId, commonDiggerId).send({
      from: window.web3gl.address,
    });
  } catch (error) {
    console.log('error', error);
  }
  deactiveLoading();
}

async function getClaimableTokensDigger(address) {
  if (!window.web3gl.checkAddressMetamask()) return;
  activeLoading();
  try {
    await diggerContract.methods.getClaimableTokens(address).call();
  } catch (error) {
    console.log('error', error);
  }
  deactiveLoading();
}

async function getProcessableTokensDigger() {
  if (!window.web3gl.checkAddressMetamask()) return;
  try {
    const rs = await diggerContract.methods
      .getProcessableTokens(window.web3gl.address)
      .call();
    console.log(rs, 'rs');
    return rs;
  } catch (error) {
    console.log(error, 'err');
  }
}

async function processTokenRequestsDigger() {
  if (!window.web3gl.checkAddressMetamask()) return;
  try {
    await diggerContract.methods.processTokenRequests().send({
      from: window.web3gl.address,
    });
  } catch (error) {
    console.log(error, 'err');
  }
}
