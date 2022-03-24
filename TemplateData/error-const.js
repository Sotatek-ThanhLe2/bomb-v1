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
  WRONG_NETWORK: {
    code: 'ERROR_BLC_0002',
    message: 'Wrong network. Please change network.',
  },

  APPROVED_FAILED: {
    code: 'ERROR_BLC_0003',
    message: 'Approve token failed.',
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
};

// success message
const SUCCESS_CODE = {
  // wallet
  CONNECT_WALLET_SUCCESS: {
    code: 'SUCCESS_WALLET_0001',
    message: 'Connect wallet successfully.',
  },

  // blockchain
  APPROVED_SUCCESS: {
    code: 'SUCCESS_BLC_0001',
    message: 'Approve token successfully.',
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
};
