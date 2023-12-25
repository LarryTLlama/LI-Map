export default async function handler(req, res) {
    let result = fetch("https://web.peacefulvanilla.club/online.html")
    .then(async () => res.status(200).json(await result.json()))
    .catch(async (e) => res.status(200).json({ error: e.toString() }))
}