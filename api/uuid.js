const uuid = require("uuid");
const fs = require("fs")
export default async function handler(req, res) {
    const json = require("./people.json");
    const uuid2 = uuid.v4();
    const d = new Date().toISOString()
    json.people.push({
        uuid: uuid2,
        step: 1
    });
    fs.writeFile("./people.json", JSON.stringify(json), () => {})
    res.send(uuid2);
}