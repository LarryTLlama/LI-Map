export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
    const util = require('minecraft-server-util');
    util.status('mc.peacefulvanilla.club', 25565, {
      timeout: 1000 * 5, // timeout in milliseconds
      enableSRV: true // SRV record lookup
  })
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(200).json({error: error.toString()}));
  }