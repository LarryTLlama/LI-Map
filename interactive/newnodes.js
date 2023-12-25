let oldnodes = require("./nodes.json");
let newnodes = {};

function getDistance(x1, y1, x2, y2) {
    let y = x2 - x1;
    let x = y2 - y1;

    return Math.sqrt(x * x + y * y);
}

let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
alphabet.forEach((itemone) => {
    alphabet.forEach((itemtwo) => {
        alphabet.forEach((itemthree) => {
            let node = itemone + itemtwo + itemthree;
            if (oldnodes[node]) {
                let connections = {}
                oldnodes[node].connections.forEach((item) => {
                    connections[item] = getDistance(oldnodes[node].coords[0], oldnodes[node].coords[1], oldnodes[item].coords[0], oldnodes[item].coords[1])
                })

                newnodes[node] = connections;
            }
        })
    })
})

console.log(newnodes)
require("fs").writeFileSync("./newnodes.json", JSON.stringify(newnodes))