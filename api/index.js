const axios = require("axios")
export default async function handler(req, res) {
  let result = await fetch("https://web.peacefulvanilla.club/maps/tiles/players.json")
  return res.status(200).json(await result.json());
}