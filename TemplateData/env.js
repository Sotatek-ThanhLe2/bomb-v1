// const CHAIN_ID_BSC_TESTNET = 97;
// const CHAIN_ID_POLYGON_MAINET = 137;
// const CHAIN_ID_POLYGON_TESTNET = 80001;

// init web3
const web3 = new Web3(window.ethereum);
const MLAND_TOKEN_VALUE = '0.06';
const BASE_URL = 'https://mland-api.sotatek.works/api/v1/';
const MAX_DIGGER_MINT = 10;
const UNLIMITED_ALLOWANCE_IN_BASE_UNITS =
  '115792089237316195423570985008687907853269984665640564039457584007913129639935';
const CHAIN_ID_TESTNET = 97;
const MESSAGE_SIGN = 'Sign this message to login with address ';

const MLAND_TOKEN = '0xfD6818F207e25a5bE33283C9A7F5ca144101749f';
const HOUSE_CONTRACT = '0xCE8916E22cb42c706B9642e40A9D45c5bC34b575';
const HOUSE_DESIGN_CONTRACT = '0x46c0797F9b474636e8687a95f77F149640291DCA';
const DIGGER_CONTRACT = '0xB3C53030a34af584d1B3A4A67D742EA6Fc44B9eB';
const DIGGER_DESIGN_CONTRACT = '0x8AE9E5c9De9Ff64b9b837193AA65E8ef276A7dE1';
const VAULT_CONTRACT = '0x2c1cD699C422f57193aA70E993318DbBc5F43F62';

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
