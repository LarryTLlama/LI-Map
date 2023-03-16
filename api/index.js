const axios = require("axios")
export default async function handler(req, res) {
  let result = await axios.get("https://web.peacefulvanilla.club/maps/tiles/players.json")
  return res.status(200).json(result.response);
}