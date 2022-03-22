const diggerContract = new web3.eth.Contract(abiDigger, DIGGER_CONTRACT);

window.web3gl.digger = {
  mintDigger,
  upgradeDigger,
  getClaimableTokensDigger,
  getProcessableTokensDigger,
};

async function mintDigger(count) {
  if (!window.web3gl.address) {
    alert('connect metamask...');
    return;
  }
  try {
    activeLoading();
    await diggerContract.methods.mint(count).send({
      from: window.web3gl.address,
    });
    deactiveLoading();
    console.log('ok');
  } catch (error) {
    console.log(error, 'err');
  }
}

async function upgradeDigger(diggerId, commonDiggerId) {
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
  activeLoading();
  try {
    await diggerContract.methods.getClaimableTokens(address).call();
  } catch (error) {
    console.log('error', error);
  }
  deactiveLoading();
}

async function getProcessableTokensDigger(address) {
  try {
    const rs = await diggerContract.methods
      .getProcessableTokens(address)
      .call();
    console.log(rs, 'rs');
    return rs;
  } catch (error) {
    console.log(error, 'err');
  }
}
