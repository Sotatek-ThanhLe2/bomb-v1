// init web3
const web3 = new Web3(window.ethereum);
const MLAND_TOKEN_VALUE = '0.06';
const MAX_DIGGER_MINT = 10;
const UNLIMITED_ALLOWANCE_IN_BASE_UNITS =
  '115792089237316195423570985008687907853269984665640564039457584007913129639935';
const CHAIN_ID_TESTNET = 97;
const MESSAGE_SIGN = 'Sign this message to login with address ';

// Update ENV for each enviroment
// Base API Backend Game

// Staging
const ADMIN_CONTRACT = '0x21e85501Ec72178171bb3d677D56d424aD5d13Bf';
const MLAND_TOKEN = '0x91582e0f5600d9BD0B24b865fc2B0Efae64b32Ed';
const DIGGER_CONTRACT = '0x67d00eA9D9BC84D8DF649A03d8AEc5690bdf796C';
const DIGGER_DESIGN_CONTRACT = '0x7e955c8757c31AaF29F66aCfbC8fF1e275002026';
const HOUSE_CONTRACT = '0x47fcc97704d855EfF65DE77c20d41a17bA1ED456';
const HOUSE_DESIGN_CONTRACT = '0x26CDaaC43fb9E768dE2411AD678AC661711DE579';
const VAULT_CONTRACT = '0xa308C66F74f50Af7c69D1ac80a97b1Be6526d056';

// contract
const contractMland = new web3.eth.Contract(abiMland, MLAND_TOKEN);
const houseContract = new web3.eth.Contract(abiHouse, HOUSE_CONTRACT);
const houseDesignContract = new web3.eth.Contract(
  abiDesignHouse,
  HOUSE_DESIGN_CONTRACT
);
const diggerContract = new web3.eth.Contract(abiDigger, DIGGER_CONTRACT);
const diggerDesignContract = new web3.eth.Contract(
  abiDesignDigger,
  DIGGER_DESIGN_CONTRACT
);

const RARITY_HOUSES = [
  {
    rarity: 0,
    name: 'Mini Warehouse',
    alias: 'mini-warehouse',
    x: 6,
    y: 6,
    energyRecoveryPerSecond: 2,
    diggerNumber: 4,
    price: 0,
    unit: 0,
  },
  {
    rarity: 1,
    name: 'Standard Warehouse',
    alias: 'standard-warehouse',
    x: 6,
    y: 10,
    energyRecoveryPerSecond: 5,
    diggerNumber: 6,
    price: 0,
    unit: 0,
  },
  {
    rarity: 2,
    name: 'Large Warehouse',
    alias: 'large-warehouse',
    x: 6,
    y: 15,
    energyRecoveryPerSecond: 8,
    diggerNumber: 8,
    price: 0,
    unit: 0,
  },
  {
    rarity: 3,
    name: 'Macro Warehouse',
    alias: 'macro-warehouse',
    x: 6,
    y: 20,
    energyRecoveryPerSecond: 11,
    diggerNumber: 10,
    price: 0,
    unit: 0,
  },
  {
    rarity: 4,
    name: 'Omega Warehouse',
    alias: 'omega-warehouse',
    x: 6,
    y: 25,
    energyRecoveryPerSecond: 14,
    diggerNumber: 12,
    price: 0,
    unit: 0,
  },
  {
    rarity: 5,
    name: 'Enterprise Warehouse',
    alias: 'enterprise-warehouse',
    x: 6,
    y: 30,
    energyRecoveryPerSecond: 17,
    diggerNumber: 15,
    price: 0,
    unit: 0,
  },
];
