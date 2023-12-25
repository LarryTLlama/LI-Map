export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    fetch("https://authserver.mojang.com/")
    .then(async (d) => res.status(200).json(await d.json()))
    .catch(async (e) => res.status(200).json({ error: e.toString() }))
}