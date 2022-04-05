const vaultContract = new web3.eth.Contract(abiVault, VAULT_CONTRACT);

window.web3gl.vault = {
  claimToken,
};

async function claimToken(user, amount, nonce, signature) {
  console.log('das');
  if (!window.web3gl.checkAddressMetamask()) return;
  if (!(await window.web3gl.isApproved(VAULT_CONTRACT))) {
    const rs = await window.web3gl.approveToken(VAULT_CONTRACT);
    if (!rs) {
      setError(ERROR_CODE.APPROVED_FAILED);
      return;
    } else {
      setSuccess(SUCCESS_CODE.APPROVED_SUCCESS);
    }
  }
  activeLoading();
  try {
    await vaultContract.methods
      .claimToken(user, amount, nonce, signature)
      .send({
        from: window.web3gl.address,
      });
    setSuccess(SUCCESS_CODE.CLAIM_TOKEN_SUCCESS);
  } catch (error) {
    setError(ERROR_CODE.CLAIM_TOKEN_FAILED);
    console.log('error: ', error);
  }
  deactiveLoading();
}
