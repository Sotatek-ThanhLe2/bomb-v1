const houseContract = new web3.eth.Contract(abiHouse, HOUSE_CONTRACT);
const houseDesignContract = new web3.eth.Contract(
  abiDesignHouse,
  HOUSE_DESIGN_CONTRACT
);

function sumQuantitiesHouse(arr) {
  return arr.reduce((t, i) => parseFloat(t) + parseFloat(i), 0);
}

window.web3gl.house = {
  warehouses: [],
  currentQuantityHouse: 0,
  totalQuantityHouse: 0,
  mintHouse,
  widthdrawHouse,
  burnHouse,
  getTokenDetailsByOwnerHouse,
  getWarehousesShop,
};

//
async function mintHouse(rarity = window.web3gl.house) {
  // error message has been returned in the function checkAddressMetamask

  if (!window.web3gl.checkAddressMetamask()) return;
  activeLoading();
  try {
    if (!(await window.web3gl.isApproved(HOUSE_CONTRACT))) {
      const rs = await approveToken(HOUSE_CONTRACT);
      if (!rs) {
        setError(ERROR_CODE.APPROVED_FAILED);
        return;
      } else {
        setSuccess(SUCCESS_CODE.APPROVED_SUCCESS);
      }
    }

    if (typeof rarity !== 'number') {
      setError(ERROR_CODE.MINT_HOUSE_FAILED);
      return;
    }
    await houseContract.methods.mint(rarity).send({
      from: window.web3gl.address,
    });
    setSuccess(SUCCESS_CODE.MINT_HOUSE_SUCCESS);
  } catch (error) {
    setError(ERROR_CODE.MINT_HOUSE_FAILED);
    console.log('error: ', error);
  }
  deactiveLoading();
}

async function widthdrawHouse() {
  // error message has been returned in the function checkAddressMetamask
  if (!window.web3gl.checkAddressMetamask()) return;

  await houseContract.methods.withdraw().send({
    from: window.web3gl.address,
  });
}

async function burnHouse(ids) {
  if (!Array.isArray(ids) || !ids?.length) return;
  await houseContract.methods.burn(ids).send({
    from: window.web3gl.address,
  });
}

async function getTokenDetailsByOwnerHouse() {
  // error message has been returned in the function checkAddressMetamask
  if (!window.web3gl.checkAddressMetamask()) return;

  const rs = await houseContract.methods
    .getTokenDetailsByOwner(window.web3gl.address)
    .call();
  return rs;
}

async function getWarehousesShop() {
  // error message has been returned in the function checkAddressMetamask
  if (!window.web3gl.checkAddressMetamask()) return;

  activeLoading();
  try {
    const mintLimits = await houseDesignContract.methods.getMintLimits().call();
    const mintCosts = await houseDesignContract.methods.getMintCosts().call();
    const currentQuantityHouse = await houseContract.methods
      .getMintAvailable()
      .call();
    window.web3gl.house.currentQuantityHouse =
      sumQuantitiesHouse(currentQuantityHouse);
    window.web3gl.house.totalQuantityHouse = sumQuantitiesHouse(mintLimits);

    window.web3gl.house.warehouses = RARITY_HOUSES.map((house, index) => ({
      ...house,
      unit: mintLimits[index],
      price: formatBalance(mintCosts[index]),
    }));
    setSuccess(SUCCESS_CODE.GET_WAREHOUSE_SHOP_SUCCESS);
  } catch (error) {
    setError(ERROR_CODE.GET_WAREHOUSE_SHOP_FAILED);
    console.log('error: ', error);
  }
  deactiveLoading();
}
