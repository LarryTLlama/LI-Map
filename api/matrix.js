let {Matrix} = require("mad-matrixes");
let matrix = new Matrix(4200, 4200, 1);
let h = "Horizontal";
let v = "Vertical"
// {type: h, one: , two: },
// {type: v, one: , two: },
let lines = [
    {type: h, one: [-2103, -1450], two: [-888, -1450]},
    {type: v, one: [-888, -1450], two: [-886, -935]},
    {type: v, one: [-892, -935], two: [-890, 889]},
    {type: v, one: [854, -931], two: [852, 891]},
    {type: v, one: [-712, -936], two: [-710, 889]},
    {type: v, one: [-1, -936], two: [-1, -416]},
    {type: v, one: [-846, -749], two: [-846, -520]},
    {type: v, one: [-154, -35], two: [-153, -19]},
    {type: v, one: [-82, -8], two: [-81, -7]},
    {type: h, one: [-110, -7], two: [-83, -7]},
    {type: v, one: [-110, -7], two: [-111, 60]},
    {type: h, one: [-111, 60], two: [-22, 61]},
    {type: v, one: [-22, 61], two: [-23, 115]},
    {type: h, one: [-23, 115], two: [73, 117]},
    {type: v, one: [-31, 11], two: [-32, 57]},
    {type: h, one: [-30, 39], two: [-4, 38]},
    {type: h, one: [23, 40], two: [56, 40]},
    {type: v, one: [56, 40], two: [57, 10]},
    {type: h, one: [-892, -935], two: [854, -935]},
    {type: h, one: [-153, -19], two: [-83, -19]},
    {type: h, one: [-711, 436], two: [-610, 436]},
    {type: h, one: [-890, -35], two: [5, -35]},
    {type: h, one: [-710, -501], two: [855, -501]},
    {type: h, one: [-892, -749], two: [1, -750]},
    {type: h, one: [-709, -309], two: [387, -309]},
]
/*
for (let i = 0; i < lines.length; i++) {
    if(lines[i].type == h) {
        matrix.addHorizontalLine(lines[i].one[1] + 2100, lines[i].one[0] + 2100, lines[i].two[0] + 2100, 0);
    } else {
        matrix.addVerticalLine(lines[i].one[0] + 2100, lines[i].one[1] + 2100, lines[i].two[1] + 2100, 0);
    }
}*/

process.on("unhandledRejection", (e) => {
    console.error(e)
})
console.log(lines[0].one[1])
console.log(matrix.getArray()[0][-1450 + 2100])
//require("fs").writeFileSync("./matrix.txt", matrix.getString())