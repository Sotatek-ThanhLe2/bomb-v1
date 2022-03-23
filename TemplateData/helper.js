const DEFAULT_WEB3GL = {
  loading: false,
  messageLogin: MESSAGE_SIGN,
  networkId: 97,
  address: '',
  signature: '',
  symbol: '',
  name: '',
  balanceNativeCoin: '0',
  balanceOfMland: '0',
  checkAddressMetamask,
  connect,
  disconnect,
  getBalanceNativeCoin,
  getBalanceOfMland,
  checkEnoughBalance,
  getInfoToken,
  getWeb3Gl,
  signMessage,
  signMessageResponse: '',
  sendTransaction,
  sendTransactionResponse: '',
  sendContract,
  sendContractResponse: '',
  errorMessage: '',
  errorCode: '',
};
const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(abiMland, MLAND_TOKEN);
window.web3gl = { ...DEFAULT_WEB3GL };

// handle loading
function activeLoading() {
  return (window.web3gl.loading = true);
}

function deactiveLoading() {
  return (window.web3gl.loading = false);
}

function formatBalance(balance) {
  return new BigNumber(balance).div(10 ** 18).toString();
}

function formatAddress(wallet) {
  return String(wallet).slice(0, 5) + '...' + String(wallet).slice(-5);
}

function checkEnoughBalance(amountCompare) {
  if (new BigNumber(window.web3gl.balanceOfMland).minus(amountCompare).gte(0)) {
    return true;
  }
  alert('Insufficient Amount Minera Token');
  return false;
}

function checkAddressMetamask(address = window.web3gl.address) {
  if (!address || typeof address !== 'string') {
    alert('err');
    window.web3gl.errorCode = ERROR_CODE.METAMASK_NOT_CONNECT.code;
    window.web3gl.errorMessage = ERROR_CODE.METAMASK_NOT_CONNECT.message;
  }

  if (address && !address.includes('0x')) {
    alert('err');
    window.web3gl.errorCode = ERROR_CODE.METAMASK_NOT_CONNECT.code;
    window.web3gl.errorMessage = ERROR_CODE.METAMASK_NOT_CONNECT.message;
  }
  return;
}

/// main
function resetData() {
  document.getElementById('wallet-address').innerHTML = 'Connect wallet';
  document.getElementById('wallet-mland-token').innerHTML =
    window.web3gl.balanceOfMland;
}

window.ethereum.on('accountsChanged', async function (accounts) {
  // Time to reload your interface with accounts[0]! when user click button lock on metamask extention
  if (!accounts[0]) {
    alert('logout');
    return;
  }
  window.web3gl.disconnect();
  resetData();
});
document.getElementById('wallet-address').innerHTML = 'Connect wallet';
document.getElementById('wallet-mland-token').innerHTML =
  window.web3gl.balanceOfMland;

async function connect() {
  const chainId = await web3.eth.getChainId();
  if (chainId !== CHAIN_ID_BSC_TESTNET) {
    alert('wrong network');
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: web3.utils.toHex(97) }],
    });
  }

  const acc = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  window.web3gl.address = acc[0]?.toLowerCase();
  await window.web3gl.signMessage();
  await getBalanceOfMland();
  console.log(
    'form',
    JSON.stringify({
      address: window.web3gl.address,
      signature: window.web3gl.signature,
      message: MESSAGE_SIGN + window.web3gl.address,
    })
  );
  document.getElementById('wallet-address').innerHTML = formatAddress(acc[0]);
}

function disconnect() {
  window.web3gl = DEFAULT_WEB3GL;
}

async function getBalanceNativeCoin() {
  window.web3gl.checkAddressMetamask();
  const balance = await web3.eth.getBalance(window.web3gl.address);
  window.web3gl.balanceNativeCoin = formatBalance(balance);
}

async function getInfoToken() {
  window.web3gl.checkAddressMetamask();
  const name = await contract.methods.name().call();
  const symbol = await contract.methods.symbol().call();
  window.web3gl.name = name;
  window.web3gl.symbol = symbol;
}

async function getBalanceOfMland() {
  window.web3gl.checkAddressMetamask();
  const rs = await contract.methods.balanceOf(window.web3gl.address).call();
  const balanceOfMland = web3.utils.fromWei(rs);
  window.web3gl.balanceOfMland = balanceOfMland;
  document.getElementById('wallet-mland-token').innerHTML = balanceOfMland;
}
/*
paste this in inspector to connect to sign message:
window.web3gl.signMessage("hello")
*/
async function signMessage() {
  window.web3gl.checkAddressMetamask();
  try {
    const signature = await web3.eth.personal.sign(
      MESSAGE_SIGN + window.web3gl.address,
      window.web3gl.address
    );
    window.web3gl.signature = signature;
    console.log(signature, 'signature');
  } catch (error) {
    window.web3gl.signMessageResponse = error.message;
  }
}

/*
paste this in inspector to send eth:
const to = "0xdD4c825203f97984e7867F11eeCc813A036089D1"
const value = "12300000000000000"
const gasLimit = "21000" // gas limit
const gasPrice = "33333333333"
window.web3gl.sendTransaction(to, value, gasLimit, gasPrice);
*/
async function sendTransaction(to, value, gasLimit, gasPrice) {
  window.web3gl.checkAddressMetamask();
  const from = (await web3.eth.getAccounts())[0];
  web3.eth
    .sendTransaction({
      from,
      to,
      value,
      gas: gasLimit ? gasLimit : undefined,
      gasPrice: gasPrice ? gasPrice : undefined,
    })
    .on('transactionHash', (transactionHash) => {
      window.web3gl.sendTransactionResponse = transactionHash;
    })
    .on('error', (error) => {
      window.web3gl.sendTransactionResponse = error.message;
    });
}

/*
paste this in inspector to connect to interact with contract:
const method = "increment"
const abi = `[ { "inputs": [], "name": "increment", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "x", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]`;
const contract = "0xB6B8bB1e16A6F73f7078108538979336B9B7341C"
const args = "[]"
const value = "0"
const gasLimit = "222222" // gas limit
const gasPrice = "333333333333"
window.web3gl.sendContract(method, abi, contract, args, value, gasLimit, gasPrice)
*/
async function sendContract(
  method,
  abi,
  contract,
  args,
  value,
  gasLimit,
  gasPrice
) {
  const from = (await web3.eth.getAccounts())[0];
  new web3.eth.Contract(JSON.parse(abi), contract).methods[method](
    ...JSON.parse(args)
  )
    .send({
      from,
      value,
      gas: gasLimit ? gasLimit : undefined,
      gasPrice: gasPrice ? gasPrice : undefined,
    })
    .on('transactionHash', (transactionHash) => {
      window.web3gl.sendContractResponse = transactionHash;
    })
    .on('error', (error) => {
      window.web3gl.sendContractResponse = error.message;
    });
}

async function getWeb3Gl() {
  if (!window.ethereum) return;
  console.log(window.web3gl, 'wallet');
  return window.web3gl;
}
