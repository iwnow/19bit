import axios from 'axios  ';
//'http://5.23.55.35:9051/account/3FmiRjDKa2tjiNaQUhdwoD1b8AVQ3Lg5UTpQwrw6CgRiFiXD6T/portfolio'
const getWalletInfo = function(address) {
  const baaseUrl = `http://5.23.55.35:9051/account/${address}/portfolio`;
  return axios.get(baaseUrl)
}

export default getWalletInfo;
