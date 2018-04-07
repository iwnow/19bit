import axios from 'axios';

const getNtransactions = function(N) {
  const baseUrl = `http://5.23.55.35:9051/history/lastHeaders/${N}`;;
  return axios.get(baseUrl);
}

export default getNtransactions;
