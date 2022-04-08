function sumQuantitiesHouse(arr) {
  return arr.reduce((t, i) => parseFloat(t) + parseFloat(i), 0);
}

window.web3gl.house = {
  warehouses: [],
  avaiableHouse: 0,
  totalHouse: 0,
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
    const [mintLimits, mintCosts, avaiableHouse] = await Promise.all([
      houseDesignContract.methods.getMintLimits().call(),
      houseDesignContract.methods.getMintCosts().call(),
      houseContract.methods.getMintAvailable().call(),
    ]);

    window.web3gl.house.avaiableHouse = sumQuantitiesHouse(avaiableHouse);
    window.web3gl.house.totalHouse = sumQuantitiesHouse(mintLimits);

    window.web3gl.house.warehouses = RARITY_HOUSES.map((house, index) => ({
      ...house,
      unit: parseFloat(mintLimits[index]),
      price: parseFloat(formatBalance(mintCosts[index])),
    }));
    window.web3gl.house.warehouses.reverse();

    setSuccess(SUCCESS_CODE.GET_WAREHOUSE_SHOP_SUCCESS);
  } catch (error) {
    setError(ERROR_CODE.GET_WAREHOUSE_SHOP_FAILED);
    console.log('error: ', error);
  }
  deactiveLoading();
}
