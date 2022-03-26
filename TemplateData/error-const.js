const ERROR_CODE = {
  SOME_THING_WENT_WRONG: {
    code: 'NO_CODE_0001',
    message: 'Some thing went wrong.',
  },

  // Mland token

  INSUFFICIENT_BALANCE: {
    code: 'ERROR_MLAND_0001',
    message: 'Insufficient token.',
  },

  // error blockchain
  JSON_RPC: {
    code: 'ERROR_BLC_0001',
    message: 'JSON RPC has been error',
  },
  INSTALL_METAMASK: {
    code: 'ERROR_BLC_0002',
    message: 'You must install metamask extention.',
  },

  APPROVED_FAILED: {
    code: 'ERROR_BLC_0003',
    message: 'Approve token failed.',
  },

  GET_BLOCK_NUMBER_FAILED: {
    code: 'ERROR_BLC_0004',
    message: 'Get blocknumber failed.',
  },

  GET_BALANCE_NATIVE_COIN_FAILED: {
    code: 'ERROR_BLC_0005',
    message: 'Get balance native coin failed.',
  },

  GET_BALANCE_TOKEN_FAILED: {
    code: 'ERROR_BLC_0006',
    message: 'Get balance token failed.',
  },

  GET_INFO_TOKEN_FAILED: {
    code: 'ERROR_BLC_0007',
    message: 'Get info token failed.',
  },

  // error metamask

  METAMASK_NOT_CONNECT: {
    code: 'ERROR_WALLET_0001',
    message: 'You must connect metamask wallet.',
  },
  METAMASK_NOT_MATCH: {
    code: 'ERROR_WALLET_0002',
    message: 'Your wallet address does not exist.',
  },

  METAMASK_CONNECT_FAILED: {
    code: 'ERROR_WALLET_0003',
    message: 'Connect wallet failed.',
  },

  METAMASK_SIGN_FAILED: {
    code: 'ERROR_WALLET_0004',
    message: 'Metamask sign failed.',
  },

  WRONG_NETWORK: {
    code: 'ERROR_WALLET_0005',
    message: 'Wrong network. Please change network.',
  },

  // digger
  MINT_DIGGER_NOT_NEGATIVE: {
    code: 'ERROR_DIGGER_0001',
    message: 'Number of diggers can not be negative.',
  },

  MINT_DIGGER_MINT_LIMIT: {
    code: 'ERROR_DIGGER_0002',
    message: 'Number of diggers must be greater than 10.',
  },

  UPGRADE_DIGGIER_NOT_SAME: {
    code: 'ERROR_DIGGER_0003',
    message: 'Digger not same.',
  },

  DIGGIER_INVALID: {
    code: 'ERROR_DIGGER_0004',
    message: 'Invalid Digger.',
  },

  MINT_DIGGER_FAILED: {
    code: 'ERROR_DIGGER_0005',
    message: 'Mint digger failed.',
  },

  PROCESS_DIGGER_FAILED: {
    code: 'ERROR_DIGGER_0006',
    message: 'Mint Digger Failed.',
  },

  UPGRADE_DIGGER_FAILED: {
    code: 'ERROR_DIGGER_0007',
    message: 'Upgrade Digger Failed.',
  },

  CLAIMABLE_TOKEN_DIGGER_FAILED: {
    code: 'ERROR_DIGGER_0008',
    message: 'Claimable token digger failed.',
  },

  PROCESSABLE_TOKEN_DIGGER_FAILED: {
    code: 'ERROR_DIGGER_0009',
    message: 'Get processable token digger failed.',
  },

  ACTION_MINT_DIGGER_FAILED: {
    code: 'ERROR_DIGGER_0010',
    message: 'Action mint digger failed.',
  },

  RENT_DIGGER_FAILED: {
    code: 'ERROR_DIGGER_0011',
    message: 'Rent digger failed.',
  },

  CREATE_TOKEN_SIGNATURE_FAILED: {
    code: 'ERROR_DIGGER_0012',
    message: 'Create token with signature digger failed.',
  },

  // house
  MINT_HOUSE_FAILED: {
    code: 'ERROR_HOUSE_0001',
    message: 'Mint house failed.',
  },

  WIDTHDRAW_HOUSE_FAILED: {
    code: 'ERROR_HOUSE_0002',
    message: 'Mint house failed.',
  },

  BURN_HOUSE_FAILED: {
    code: 'ERROR_HOUSE_0002',
    message: 'Burn house failed.',
  },

  GET_TOKEN_DETAIL_BY_OWNER_HOUSE_FAILED: {
    code: 'ERROR_HOUSE_0003',
    message: 'Get token detail by owner house failed.',
  },

  // vault
  CLAIM_TOKEN_FAILED: {
    code: 'ERROR_VAULT_0001',
    message: 'Claim token failed.',
  },
};

// success message
const SUCCESS_CODE = {
  // wallet
  CONNECT_WALLET_SUCCESS: {
    code: 'SUCCESS_WALLET_0001',
    message: 'Connect wallet successfully.',
  },

  LOGOUT_WALLET: {
    code: 'SUCCESS_WALLET_0002',
    message: 'Logout wallet.',
  },

  METAMASK_SIGN_SUCCESS: {
    code: 'SUCCESS_WALLET_0003',
    message: 'Metamask sign successfully.',
  },

  // blockchain
  APPROVED_SUCCESS: {
    code: 'SUCCESS_BLC_0001',
    message: 'Approve token successfully.',
  },
  GET_BLOCK_NUMBER_SUCCESS: {
    code: 'SUCCESS_BLC_0002',
    message: 'Get blocknumber successfully.',
  },

  GET_BALANCE_NATIVE_COIN_SUCCESS: {
    code: 'SUCCESS_BLC_0003',
    message: 'Get balance native coin successfully.',
  },

  GET_BALANCE_TOKEN_SUCCESS: {
    code: 'SUCCESS_BLC_0004',
    message: 'Get balance token successfully.',
  },

  GET_INFO_TOKEN_SUCCESS: {
    code: 'SUCCESS_BLC_0005',
    message: 'Get info token successfully.',
  },

  // digger
  MINT_DIGGER_SUCCESS: {
    code: 'SUCCESS_DIGGER_0001',
    message: 'Mint digger successfully.',
  },

  PROCESS_DIGGER_SUCCESS: {
    code: 'SUCCESS_DIGGER_0002',
    message: 'Mint digger successfully.',
  },

  UPGRADE_DIGGER_SUCCESS: {
    code: 'SUCCESS_DIGGER_0003',
    message: 'Upgrade digger successfully.',
  },

  CLAIMABLE_TOKEN_DIGGER_SUCCESS: {
    code: 'SUCCESS_DIGGER_0004',
    message: 'Claimable token digger successfully.',
  },

  PROCESSABLE_TOKEN_DIGGER_SUCCESS: {
    code: 'SUCCESS_DIGGER_0005',
    message: 'Get processable token digger successfully.',
  },

  ACTION_MINT_DIGGER_SUCCESS: {
    code: 'SUCCESS_DIGGER_0006',
    message: 'Action mint digger successfully.',
  },

  RENT_DIGGER_SUCCESS: {
    code: 'SUCCESS_DIGGER_0007',
    message: 'Rent digger successfully.',
  },

  CREATE_TOKEN_SIGNATURE_SUCCESS: {
    code: 'SUCCESS_DIGGER_0008',
    message: 'Create token with signature digger successfully.',
  },

  // house
  MINT_HOUSE_SUCCESS: {
    code: 'SUCCESS_HOUSE_0001',
    message: 'Mint house successfully.',
  },

  WIDTHDRAW_HOUSE_SUCCESS: {
    code: 'SUCCESS_HOUSE_0002',
    message: 'Mint house successfully.',
  },

  BURN_HOUSE_SUCCESS: {
    code: 'SUCCESS_HOUSE_0002',
    message: 'Burn house successfully.',
  },

  GET_TOKEN_DETAIL_BY_OWNER_HOUSE_SUCCESS: {
    code: 'SUCCESS_HOUSE_0003',
    message: 'Get token detail by owner house successfully.',
  },

  // vault
  CLAIM_TOKEN_SUCCESS: {
    code: 'SUCCESS_VAULT_0001',
    message: 'Claim token successfully.',
  },
};

// function checkSameCode(o) {
//   const arr = Object.keys(o);
//   const newArr = [...new Set(arr.map((i) => o[`${i}`].code))];
//   const newArr1 = arr.map((i) => o[`${i}`].code);
//   console.log(arr.length, 'key');
//   console.log(arr, 'code');
//   console.log(newArr, 'code');
// }
// checkSameCode(ERROR_CODE);
// checkSameCode(SUCCESS_CODE);
