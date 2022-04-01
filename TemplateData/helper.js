const DEFAULT_WEB3GL = {
  loading: false,
  messageLogin: MESSAGE_SIGN,
  networkId: CHAIN_ID_TESTNET,
  address: '',
  signature: '',
  symbol: '',
  name: '',
  blockNumber: 0,
  isEnoughBalance: false,
  balanceNativeCoin: '0',
  balanceOfMland: '0',
  browserReload,
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
  jsonStringify,
  jsonParse,
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

function jsonStringify(data) {
  return JSON.stringify(data);
}

function jsonParse(data) {
  return JSON.parse(data);
}

function browserReload() {
  window.location.reload();
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

function tryCatch(cb) {
  activeLoading();
  try {
    cb();
  } catch (error) {
    console.log('error: ', error);
  } finally {
    deactiveLoading();
  }
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
      setSuccess(SUCCESS_CODE.LOGOUT_WALLET);
    }
    window.web3gl.disconnect();
    resetData();
  });
}

async function checkEnoughBalance(amountCompare = 0) {
  if (!window.web3gl.checkAddressMetamask()) return;
  activeLoading();
  try {
    let currentBalance = await window.web3gl.getBalanceOfMland();
    if (new BigNumber(currentBalance).minus(amountCompare).gte(0)) {
      window.web3gl.balanceOfMland = currentBalance;
      window.web3gl.isEnoughBalance = true;
    } else {
      setError(ERROR_CODE.INSUFFICIENT_BALANCE);
      window.web3gl.isEnoughBalance = false;
    }
  } catch (error) {}
  deactiveLoading();
}

async function connect() {
  if (window.web3gl.address) return;
  if (!window.ethereum) {
    setError(ERROR_CODE.INSTALL_METAMASK);
    return;
  }
  activeLoading();
  try {
    const chainId = await web3.eth.getChainId();
    if (chainId !== CHAIN_ID_TESTNET) {
      // setError(ERROR_CODE.WRONG_NETWORK);
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
    setSuccess(SUCCESS_CODE.CONNECT_WALLET_SUCCESS);
  } catch (error) {
    setError(ERROR_CODE.METAMASK_CONNECT_FAILED);
  } finally {
    deactiveLoading();
  }
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
  try {
    const rs = await web3.eth.getBlockNumber();
    window.web3gl.blockNumber = rs;
    setSuccess(SUCCESS_CODE.GET_BLOCK_NUMBER_SUCCESS);
  } catch (error) {
    setError(ERROR_CODE.GET_BLOCK_NUMBER_FAILED);
  }
  deactiveLoading();
}

async function getBalanceNativeCoin() {
  if (!window.web3gl.checkAddressMetamask()) return;
  activeLoading();
  try {
    const balance = await web3.eth.getBalance(window.web3gl.address);
    window.web3gl.balanceNativeCoin = formatBalance(balance);
    setSuccess(SUCCESS_CODE.GET_BALANCE_NATIVE_COIN_SUCCESS);
  } catch (error) {
    setError(ERROR_CODE.GET_BALANCE_NATIVE_COIN_FAILED);
  }
  deactiveLoading();
}

async function getInfoToken() {
  if (!window.web3gl.checkAddressMetamask()) return;
  activeLoading();
  try {
    const name = await contractMland.methods.name().call();
    const symbol = await contractMland.methods.symbol().call();
    window.web3gl.name = name;
    window.web3gl.symbol = symbol;
    setSuccess(SUCCESS_CODE.GET_INFO_TOKEN_SUCCESS);
  } catch (error) {
    setError(ERROR_CODE.GET_INFO_TOKEN_FAILED);
  }
  deactiveLoading();
}

async function getBalanceOfMland() {
  if (!window.web3gl.checkAddressMetamask()) return;
  activeLoading();
  try {
    const rs = await contractMland.methods
      .balanceOf(window.web3gl.address)
      .call();
    const balanceOfMland = web3.utils.fromWei(rs);
    window.web3gl.balanceOfMland = balanceOfMland;
    setBalanceMland(balanceOfMland);
    setSuccess(SUCCESS_CODE.GET_BALANCE_TOKEN_SUCCESS);
    return balanceOfMland;
  } catch (error) {
    setError(ERROR_CODE.GET_BALANCE_TOKEN_FAILED);
  }
  deactiveLoading();
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
    setSuccess(SUCCESS_CODE.METAMASK_SIGN_SUCCESS);
  } catch (error) {
    setError(ERROR_CODE.METAMASK_SIGN_FAILED);
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
