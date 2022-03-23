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
  window.web3gl.checkAddressMetamask();
  try {
    activeLoading();
    await diggerContract.methods.mint(count).send({
      from: window.web3gl.address,
    });
    await getProcessableTokensDigger();
    await processTokenRequestsDigger();
    deactiveLoading();
    console.log('ok');
  } catch (error) {
    console.log(error, 'err');
  }
}

async function upgradeDigger(diggerId, commonDiggerId) {
  window.web3gl.checkAddressMetamask();
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
  window.web3gl.checkAddressMetamask();
  activeLoading();
  try {
    await diggerContract.methods.getClaimableTokens(address).call();
  } catch (error) {
    console.log('error', error);
  }
  deactiveLoading();
}

async function getProcessableTokensDigger() {
  window.web3gl.checkAddressMetamask();
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
  window.web3gl.checkAddressMetamask();
  try {
    await diggerContract.methods.processTokenRequests().send({
      from: window.web3gl.address,
    });
  } catch (error) {
    console.log(error, 'err');
  }
}
