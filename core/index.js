const cbor = require('cbor');
const getWalletInfo = require('./getWalletInfo');
const getTransactionHistoryByBlockId = require('./getTransactionHistoryByBlockId');
const getNTransactions = require('./getNTransactions');

const jsonToByte = function(json) {
  return cbor.encode(json);
}

export {
  jsonToByte,
  getWalletInfo,
  getTransactionHistoryByBlockId,
  getNTransactions
};
