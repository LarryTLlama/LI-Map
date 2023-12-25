const Graph = require("node-dijkstra");
const nodes = require("./newnodes.json")
const route = new Graph(nodes)
export default async function handler(req, res) {
    if(!nodes[req.query.start] || !nodes[[req.query.end]]) return res.json({result: null, error: "Bad request - Invalid start/end query parameters"})
    return res.json({result: route.path(req.query.start, req.query.end)})
}