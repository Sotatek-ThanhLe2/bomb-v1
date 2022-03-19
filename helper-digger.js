const diggerContract = new web3.eth.Contract(abiDigger, DIGGER_CONTRACT);

window.web3gl.digger = {
  diggerMint,
  diggerGetClaimableTokens,
  diggerGetProcessableTokens,
};

async function diggerMint(count) {
  try {
    alert(count);
    await diggerContract.methods.mint(2).call();
  } catch (error) {
    console.log(error, 'err');
  }
}

async function diggerGetClaimableTokens(address) {
  alert(address);
  await diggerContract.methods.getClaimableTokens(address).call();
}

async function diggerGetProcessableTokens(address) {
  try {
    alert(address);
    const rs = await diggerContract.methods
      .getProcessableTokens(address)
      .call();
    console.log(rs, 'rs');
    return rs;
  } catch (error) {
    console.log('loi');
  }
}
