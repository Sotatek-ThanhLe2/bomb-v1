const ERROR_CODE = {
  SOME_THING_WENT_WRONG: {
    code: 'NO_CODE_0001',
    message: 'Some thing went wrong.',
  },

  // Mland token

  INSUFFICIENT_BALANCE: {
    code: 'MLAND_0001',
    message: 'Insufficient token.',
  },

  // error blockchain
  JSON_RPC: {
    code: 'BLC_0001',
    message: 'JSON RPC has been error',
  },
  INSTALL_METAMASK: {
    code: 'BLC_0002',
    message: 'You must install metamask extention.',
  },
  WRONG_NETWORK: {
    code: 'BLC_0002',
    message: 'Wrong network. Please change network.',
  },

  // error metamask
  METAMASK_NOT_CONNECT: {
    code: 'WALLET_0001',
    message: 'You must connect metamask wallet.',
  },
  METAMASK_NOT_MATCH: {
    code: 'WALLET_0002',
    message: 'Your wallet address does not exist.',
  },

  // digger
  MINT_DIGGER_NOT_NEGATIVE: {
    code: 'DIGGER_0001',
    message: 'Number of diggers can not be negative.',
  },

  MINT_DIGGER_MINT_LIMIT: {
    code: 'DIGGER_0002',
    message: 'Number of diggers must be greater than 10.',
  },

  UPGRADE_DIGGIER_NOT_SAME: {
    code: 'DIGGER_0002',
    message: 'Digger not same.',
  },

  DIGGIER_INVALID: {
    code: 'DIGGER_0004',
    message: 'Invalid Digger.',
  },

  MINT_DIGGER_FAIL: {
    code: 'DIGGER_0001',
    message: 'Mint digger failed.',
  },
};

// success message
const SUCCESS_CODE = {
  // digger
  MINT_DIGGER_SUCCESS: {
    code: 'DIGGER_0001',
    message: 'Mint digger successfully.',
  },
};
