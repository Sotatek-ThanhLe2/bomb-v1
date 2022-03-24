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
    if (!(await window.web3gl.isApproved(DIGGER_CONTRACT))) {
      const rs = await window.web3gl.approveToken(DIGGER_CONTRACT);
      if (!rs) {
        setError(ERROR_CODE.APPROVED_FAILED);
        return;
      } else {
        setSuccess(SUCCESS_CODE.APPROVED_SUCCESS);
      }
    }
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
  } catch (error) {
    console.log(error, 'err');
    setError(ERROR_CODE.MINT_DIGGER_FAILED);
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
    setSuccess(SUCCESS_CODE.UPGRADE_DIGGER_SUCCESS);
  } catch (error) {
    setError(ERROR_CODE.UPGRADE_DIGGER_FAILED);
    console.log('error', error);
  }
  deactiveLoading();
}

async function getClaimableTokensDigger(address) {
  if (!window.web3gl.checkAddressMetamask()) return;
  activeLoading();
  try {
    await diggerContract.methods.getClaimableTokens(address).call();
    setSuccess(SUCCESS_CODE.CLAIMABLE_TOKEN_DIGGER_SUCCESS);
  } catch (error) {
    setError(ERROR_CODE.CLAIMABLE_TOKEN_DIGGER_FAILED);
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
    setSuccess(SUCCESS_CODE.PROCESSABLE_TOKEN_DIGGER_SUCCESS);
    return rs;
  } catch (error) {
    setError(ERROR_CODE.PROCESSABLE_TOKEN_DIGGER_FAILED);
    console.log(error, 'err');
  }
}
