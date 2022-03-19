window.wallet = {
  address: '',
  sign: '',
  balanceBNB: 0,
  balanceOfMland: 0
}
var web3 = new Web3(window.ethereum);

const connect3 = async () => {
  console.log("begin connect");
  if (!window.ethereum) return;
  const acc = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  const sign = await web3.eth.personal.sign(
    'Mland',
    acc[0]
  );
  window.wallet.address = acc[0]
  window.wallet.sign = sign
  return { wallet: acc[0], sign };
};

const getAccount = () => {
  return window.wallet.address
};

const getSignature = () => {
  return window.wallet.sign
};

const getBalanceBNB = () => {
  return window.wallet.balanceBNB
}

const getBalanceOfMland = () => {
  return window.wallet.balanceOfMland
}
