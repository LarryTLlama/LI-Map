export default async function handler(req, res) {
  BigInt.prototype.toJSON = function() { return 0;}
    res.setHeader('Access-Control-Allow-Origin', '*')
    const util = require('minecraft-server-util');
    util.statusBedrock('bedrock.peacefulvanilla.club', 19132, {
      enableSRV: true // SRV record lookup
  })
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(200).json({error: error.toString()}));
  }