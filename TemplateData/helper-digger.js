const diggerContract = new web3.eth.Contract(abiDigger, DIGGER_CONTRACT);

window.web3gl.digger = {
  mintDigger,
  upgradeDigger,
  getClaimableTokensDigger,
  getProcessableTokensDigger,
  processTokenRequestsDigger,
  rentDigger,
};

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
  activeLoading();
  try {
    await diggerContract.methods.mint(count).send({
      from: window.web3gl.address,
    });
    // await processTokenRequestsDigger();
  } catch (error) {
    console.log(error, 'err');
  }
  deactiveLoading();
}

async function processTokenRequestsDigger() {
  if (!window.web3gl.checkAddressMetamask()) return;
  activeLoading();
  try {
    await diggerContract.methods.processTokenRequests().send({
      from: window.web3gl.address,
    });
    setSuccess(SUCCESS_CODE.MINT_DIGGER_SUCCESS);
    // alert(SUCCESS_CODE.MINT_DIGGER_SUCCESS.message);
  } catch (error) {
    console.log(error, 'err');
    setError(ERROR_CODE.MINT_DIGGER_FAIL);
    // alert(ERROR_CODE.MINT_DIGGER_FAIL.message);
  }
  deactiveLoading();
}

async function rentDigger(diggerId) {
  if (!window.web3gl.checkAddressMetamask()) return;
  if (!diggerId || !commonDiggerId) {
    setError(ERROR_CODE.DIGGIER_INVALID);
    return;
  }
  activeLoading();
  try {
    await diggerContract.methods.rent(diggerId).send({
      from: window.web3gl.address,
    });
  } catch (error) {
    console.log('error: ', error);
  }
  deactiveLoading();
}

async function upgradeDigger(diggerId, commonDiggerId) {
  if (!window.web3gl.checkAddressMetamask()) return;
  if (!diggerId || !commonDiggerId) {
    setError(ERROR_CODE.DIGGIER_INVALID);
    return;
  }
  if (diggerId == commonDiggerId) {
    setError(ERROR_CODE.UPGRADE_DIGGIER_NOT_SAME);
    return;
  }
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
