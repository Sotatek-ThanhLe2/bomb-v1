window.web3gl.digger = {
  diggerPackage: [
    {
      unit: 1,
      price: 0,
    },
    {
      unit: 5,
      price: 0,
    },
    {
      unit: 10,
      price: 0,
    },
  ],
  tokenPending: 0,
  upgradeCost: [],
  mintDigger,
  upgradeDigger,
  getClaimableTokensDigger,
  getProcessableTokensDigger,
  getPricePackageDigger,
  processTokenRequestsDigger,
  rentDigger,
  claimDigger,
  getCostLevelRarity,
  getUpgradeDiggerCosts,
};

async function mintDigger(count) {
  // error message has been returned in the function checkAddressMetamask
  if (!window.web3gl.checkAddressMetamask()) return;

  if (count <= 0) {
    setError(ERROR_CODE.MINT_DIGGER_NOT_NEGATIVE);
    return;
  }
  if (count > MAX_DIGGER_MINT) {
    setError(ERROR_CODE.MINT_DIGGER_MINT_LIMIT);
    return;
  }
  activeLoading();
  try {
    if (!(await window.web3gl.isApproved(DIGGER_CONTRACT))) {
      const rs = await window.web3gl.approveToken(DIGGER_CONTRACT);
      if (!rs) {
        setError(ERROR_CODE.APPROVED_FAILED);
        return;
      } else {
        setSuccess(SUCCESS_CODE.APPROVED_SUCCESS);
      }
    }
    await diggerContract.methods.mint(count).send({
      from: window.web3gl.address,
    });
    setSuccess(SUCCESS_CODE.ACTION_MINT_DIGGER_SUCCESS);
    // await processTokenRequestsDigger();
  } catch (error) {
    setError(ERROR_CODE.ACTION_MINT_DIGGER_FAILED);
    console.log(error, 'err');
  }
  deactiveLoading();
}

async function processTokenRequestsDigger() {
  // error message has been returned in the function checkAddressMetamask
  if (!window.web3gl.checkAddressMetamask()) return;
  activeLoading();
  try {
    await diggerContract.methods.processTokenRequests().send({
      from: window.web3gl.address,
    });
    setSuccess(SUCCESS_CODE.MINT_DIGGER_SUCCESS);
  } catch (error) {
    console.log(error, 'err');
    setError(ERROR_CODE.MINT_DIGGER_FAILED);
  }
  deactiveLoading();
}

async function rentDigger(diggerId) {
  // error message has been returned in the function checkAddressMetamask
  if (!window.web3gl.checkAddressMetamask()) return;
  if (!diggerId || typeof diggerId !== 'number') {
    setError(ERROR_CODE.DIGGIER_INVALID);
    return;
  }
  activeLoading();
  try {
    await diggerContract.methods.rent(diggerId).send({
      from: window.web3gl.address,
    });
    setSuccess(SUCCESS_CODE.RENT_DIGGER_SUCCESS);
  } catch (error) {
    setError(ERROR_CODE.RENT_DIGGER_FAILED);
    console.log('error: ', error);
  }
  deactiveLoading();
}

async function upgradeDigger(diggerId, commonDiggerId) {
  // error message has been returned in the function checkAddressMetamask
  if (!window.web3gl.checkAddressMetamask()) return;
  if (
    !diggerId ||
    !commonDiggerId ||
    typeof diggerId !== 'number' ||
    typeof commonDiggerId !== 'number'
  ) {
    setError(ERROR_CODE.DIGGIER_INVALID);
    return;
  }
  if (diggerId == commonDiggerId) {
    setError(ERROR_CODE.UPGRADE_DIGGIER_NOT_SAME);
    return;
  }

  activeLoading();
  try {
    await diggerContract.methods.upgrade(diggerId, commonDiggerId).send({
      from: window.web3gl.address,
    });
    setSuccess(SUCCESS_CODE.UPGRADE_DIGGER_SUCCESS);
  } catch (error) {
    setError(ERROR_CODE.UPGRADE_DIGGER_FAILED);
    console.log('error', error);
  }
  deactiveLoading();
}

async function getClaimableTokensDigger(address) {
  // error message has been returned in the function checkAddressMetamask
  if (!window.web3gl.checkAddressMetamask()) return;
  activeLoading();
  try {
    await diggerContract.methods.getClaimableTokens(address).call();
    setSuccess(SUCCESS_CODE.CLAIMABLE_TOKEN_DIGGER_SUCCESS);
  } catch (error) {
    setError(ERROR_CODE.CLAIMABLE_TOKEN_DIGGER_FAILED);
    console.log('error', error);
  }
  deactiveLoading();
}

async function claimDigger(addressTo, details, nonce, signature) {
  if (!window.web3gl.checkAddressMetamask()) return;
  activeLoading();
  try {
    await diggerContract.methods
      .createTokenWithSignature(addressTo, details, nonce, signature)
      .send({
        from: window.web3gl.address,
      });
    setSuccess(SUCCESS_CODE.CREATE_TOKEN_SIGNATURE_SUCCESS);
  } catch (error) {
    setError(ERROR_CODE.CREATE_TOKEN_SIGNATURE_FAILED);
    console.log('error', error);
  }
  deactiveLoading();
}

async function getProcessableTokensDigger() {
  // error message has been returned in the function checkAddressMetamask
  if (!window.web3gl.checkAddressMetamask()) return;
  activeLoading();
  try {
    const rs = await diggerContract.methods
      .getProcessableTokens(window.web3gl.address)
      .call();
    console.log(rs, 'rs');
    window.web3gl.digger.tokenPending = Number(rs);
    setSuccess(SUCCESS_CODE.PROCESSABLE_TOKEN_DIGGER_SUCCESS);
    return rs;
  } catch (error) {
    setError(ERROR_CODE.PROCESSABLE_TOKEN_DIGGER_FAILED);
    console.log(error, 'err');
  }
  deactiveLoading();
}

async function getPricePackageDigger() {
  // error message has been returned in the function checkAddressMetamask
  // if (!window.web3gl.checkAddressMetamask()) return;

  if (!window.ethereum) {
    setError(ERROR_CODE.INSTALL_METAMASK);
    return;
  }

  activeLoading();
  try {
    const mintCost = await diggerDesignContract.methods.getMintCost().call();
    window.web3gl.digger.diggerPackage = window.web3gl.digger.diggerPackage.map(
      (i) => ({
        ...i,
        price: parseFloat(formatBalance(new BigNumber(mintCost).times(i.unit))),
      })
    );
    setSuccess(SUCCESS_CODE.GET_PRICE_PACKAGE_DIGGER_SUCCESS);
  } catch (error) {
    setError(ERROR_CODE.GET_PRICE_PACKAGE_DIGGER_FAILED);
    console.log('error: ', error);
  }
  deactiveLoading();
}

async function getUpgradeDiggerCosts() {
  if (!window.ethereum) {
    return 'ERROR';
  }
  const rs = await diggerDesignContract.methods.getUpgradeCosts().call();
  window.web3gl.digger.upgradeCost = rs.map((i) =>
    i.map((o) => formatBalance(o))
  );
}

function getCostLevelRarity(rarity, level) {
  if (!window.ethereum) {
    return 'ERROR';
  }

  if (window.web3gl.digger.upgradeCost.length === 0) {
    return 'ERROR';
  }
  if (!window.web3gl.digger.upgradeCost[Number(rarity)][Number(level) - 1]) {
    return 'ERROR';
  }
  return window.web3gl.digger.upgradeCost[Number(rarity)][Number(level) - 1];
}
