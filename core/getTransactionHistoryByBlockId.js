import axios from 'axios';

const getTransactionHistoryByBlockId = function(blockId) {
  const baseUrl=`http://5.23.55.35:9051/history/${blockId}/transactions`;
  return axios.get(baaseUrl)

}
