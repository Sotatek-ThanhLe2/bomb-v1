const vaultContract = new web3.eth.Contract(abiVault, VAULT_CONTRACT);

window.web3gl.vault = {
  claimToken,
};

async function claimToken(user, amount, nonce, signature) {
  window.web3gl.checkAddressMetamask();
  try {
    activeLoading();
    await vaultContract.methodds
      .claimToken(user, amount, nonce, signature)
      .send({
        from: window.web3gl.address,
      });
    deactiveLoading();
  } catch (error) {
    console.log('error: ', error);
  }
}