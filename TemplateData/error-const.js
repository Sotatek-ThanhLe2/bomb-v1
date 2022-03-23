const ERROR_CODE = {
  // error blockchain
  SOME_THING_WENT_WRONG: {
    code: 'BLC_0001',
    message: 'Some thing went wrong.',
  },
  JSON_RPC: {
    code: 'BLC_0002',
    message: 'JSON RPC has been error',
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
};
