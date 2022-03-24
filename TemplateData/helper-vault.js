const vaultContract = new web3.eth.Contract(abiVault, VAULT_CONTRACT);

window.web3gl.vault = {
  claimToken,
};

async function claimToken(user, amount, nonce, signature) {
  if (!window.web3gl.checkAddressMetamask()) return;
  activeLoading();
  try {
    await vaultContract.methodds
      .claimToken(user, amount, nonce, signature)
      .send({
        from: window.web3gl.address,
      });
  } catch (error) {
    console.log('error: ', error);
  }
  deactiveLoading();
}
