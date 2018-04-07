import axios from 'axios';

//8ZMwRPmRDz8J6TWa1s7Jh53ZMYG1hurM6GS4MBJVFm9
//http://5.23.55.35:9051/history/8ZMwRPmRDz8J6TWa1s7Jh53ZMYG1hurM6GS4MBJVFm9/transactions
const getTransactionHistoryByBlockId = function(blockId) {
  const baseUrl=`http://5.23.55.35:9051/history/${blockId}/transactions`;
  return axios.get(baseUrl)

}
