const cbor = require('cbor');

const jsonToByte = function(json) {
  return cbor.encode(json);
}

export {jsonToByte};
