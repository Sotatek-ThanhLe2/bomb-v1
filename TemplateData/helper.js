const DEFAULT_WEB3GL = {
  loading: false,
  messageLogin: MESSAGE_SIGN,
  networkId: CHAIN_ID_TESTNET,
  address: '',
  signature: '',
  symbol: '',
  name: '',
  blockNumber: 0,
  balanceNativeCoin: '0',
  balanceOfMland: '0',
  checkAddressMetamask,
  checkErrorCodeMetamask,
  setWallet,
  setBalanceMland,
  resetData,
  connect,
  disconnect,
  getBlockNumber,
  getBalanceNativeCoin,
  getBalanceOfMland,
  checkEnoughBalance,
  getInfoToken,
  approveToken,
  isApproved,
  getWeb3Gl,
  signMessage,
  isApproved,
  signMessageResponse: '',
  errorMessage: '',
  errorCode: '',
  successCode: '',
  successMessage: '',
};

// init web3
const web3 = new Web3(window.ethereum);
const contractMland = new web3.eth.Contract(abiMland, MLAND_TOKEN);
window.web3gl = { ...DEFAULT_WEB3GL };

function setWallet(walletAddress = 'Connect wallet') {
  document.getElementById('wallet-address').innerHTML = walletAddress;
}

function setBalanceMland(balance = window.web3gl.balanceOfMland) {
  document.getElementById('wallet-mland-token').innerHTML = balance;
}

setWallet();
setBalanceMland();
function resetData() {
  setWallet();
  setBalanceMland();
}

// handle loading
function activeLoading() {
  return (window.web3gl.loading = true);
}

function deactiveLoading() {
  return (window.web3gl.loading = false);
}

// format balance , wallet
function formatBalance(balance) {
  return new BigNumber(balance).div(10 ** 18).toString();
}

function formatAddress(wallet) {
  return String(wallet).slice(0, 5) + '...' + String(wallet).slice(-5);
}

// set error, success message
function setError(errorObject = {}) {
  console.log('err', errorObject);
  window.web3gl.errorCode = errorObject.code;
  window.web3gl.errorMessage = errorObject.message;
}

function setSuccess(successObject = {}) {
  console.log('ok', successObject);
  window.web3gl.successCode = successObject.code;
  window.web3gl.successMessage = successObject.message;
}

function checkEnoughBalance(amountCompare = 0) {
  let currentBalance = null;
  (async () => {
    const rs = await window.web3gl.getBalanceOfMland();
    currentBalance = rs;
  })();

  if (new BigNumber(currentBalance).minus(amountCompare).gte(0)) {
    return true;
  }
  setError(ERROR_CODE.INSUFFICIENT_BALANCE);
  return false;
}

function checkAddressMetamask() {
  if (!window.ethereum) {
    setError(ERROR_CODE.INSTALL_METAMASK);
    return false;
  }

  if (!window.web3gl.address || typeof window.web3gl.address !== 'string') {
    setError(ERROR_CODE.METAMASK_NOT_CONNECT);
    return false;
  }

  if (window.web3gl.address && !window.web3gl.address.includes('0x')) {
    setError(ERROR_CODE.METAMASK_NOT_MATCH);
    window.web3gl.disconnect();
    window.web3gl.resetData();
    return false;
  }
  return true;
}

function checkErrorCodeMetamask(errorMetamask = {}) {
  switch (errorMetamask.code) {
    case 4001:
      setError({
        code: errorMetamask.code,
        message: errorMetamask.message,
      });
      break;

    default:
      setError(ERROR_CODE.SOME_THING_WENT_WRONG);
      break;
  }
}

/// main

if (window.ethereum) {
  window.ethereum.on('accountsChanged', async function (accounts) {
    // Time to reload your interface with accounts[0]! when user click button lock on metamask extention
    if (!accounts[0]) {
      // alert('logout');
      return;
    }
    window.web3gl.disconnect();
    resetData();
  });
}

async function connect() {
  if (!window.ethereum) {
    setError(ERROR_CODE.INSTALL_METAMASK);
    return;
  }
  activeLoading();
  try {
    const chainId = await web3.eth.getChainId();
    if (chainId !== CHAIN_ID_TESTNET) {
      setError(ERROR_CODE.WRONG_NETWORK);
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(CHAIN_ID_TESTNET) }],
      });
    }

    const acc = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    window.web3gl.address = acc[0]?.toLowerCase();
    await window.web3gl.signMessage();
    await window.web3gl.getBalanceOfMland();
    console.log(
      'form',
      JSON.stringify({
        address: window.web3gl.address,
        signature: window.web3gl.signature,
        message: MESSAGE_SIGN + window.web3gl.address,
      })
    );
    setWallet(formatAddress(acc[0]));
  } catch (error) {
    setError(ERROR_CODE.METAMASK_CONNECT_FAILED);
  }
  deactiveLoading();
}

function disconnect() {
  window.web3gl = {
    ...window.web3gl,
    ...DEFAULT_WEB3GL,
  };
}

async function getBlockNumber() {
  if (!window.web3gl.checkAddressMetamask()) return;
  activeLoading();
  const rs = await web3.eth.getBlockNumber();
  window.web3gl.blockNumber = rs;
  deactiveLoading();
}

async function getBalanceNativeCoin() {
  if (!window.web3gl.checkAddressMetamask()) return;
  activeLoading();
  const balance = await web3.eth.getBalance(window.web3gl.address);
  window.web3gl.balanceNativeCoin = formatBalance(balance);
  deactiveLoading();
}

async function getInfoToken() {
  if (!window.web3gl.checkAddressMetamask()) return;
  activeLoading();
  const name = await contractMland.methods.name().call();
  const symbol = await contractMland.methods.symbol().call();
  window.web3gl.name = name;
  window.web3gl.symbol = symbol;
  deactiveLoading();
}

async function getBalanceOfMland() {
  if (!window.web3gl.checkAddressMetamask()) return;
  activeLoading();
  const rs = await contractMland.methods
    .balanceOf(window.web3gl.address)
    .call();
  const balanceOfMland = web3.utils.fromWei(rs);
  window.web3gl.balanceOfMland = balanceOfMland;
  setBalanceMland(balanceOfMland);
  deactiveLoading();
  return balanceOfMland;
}

async function signMessage() {
  if (!window.web3gl.checkAddressMetamask()) return;
  activeLoading();
  try {
    const signature = await web3.eth.personal.sign(
      MESSAGE_SIGN + window.web3gl.address,
      window.web3gl.address
    );
    window.web3gl.signature = signature;
  } catch (error) {
    window.web3gl.signMessageResponse = error.message;
  }
  deactiveLoading();
}

function getWeb3Gl() {
  if (!window.ethereum) return;

  return window.web3gl;
}

async function approveToken(contractAddress) {
  console.log('approveToken', contractAddress);
  if (!window.web3gl.checkAddressMetamask()) return;
  if (!contractAddress || typeof contractAddress !== 'string') {
    setError(ERROR_CODE.APPROVED_FAILED);
    return;
  }
  activeLoading();
  try {
    console.log('approved ok');
    await contractMland.methods
      .approve(contractAddress, UNLIMITED_ALLOWANCE_IN_BASE_UNITS.toString())
      .send({
        from: window.web3gl.address,
      });
    setSuccess(SUCCESS_CODE.APPROVED_SUCCESS);
    return true;
  } catch (error) {
    console.log('error: ', error);
    setError(ERROR_CODE.APPROVED_FAILED);
  }
  deactiveLoading();
}

async function isApproved(contractAddress, amountCompare = 0) {
  if (!window.web3gl.checkAddressMetamask()) return;

  const amount = new BigNumber(amountCompare).gt(0)
    ? new BigNumber(amountCompare)
    : new BigNumber(0);

  try {
    const allowance = await contractMland.methods
      .allowance(window.web3gl.address, contractAddress)
      .call();
    if (!new BigNumber(amount).gt(0)) {
      if (!new BigNumber(allowance).gt(0)) {
        return false;
      }
    } else {
      if (!new BigNumber(allowance).gte(amount)) {
        return false;
      }
    }
  } catch (e) {
    throw e;
  }
  return true;
}
