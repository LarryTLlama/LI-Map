var Jimp = require("jimp");
let minbounds = [-8, -8];
let maxbounds = [7, 7];
let currentlocation = minbounds;
const path = require("path")
/**
 * Each image will be split into four, with each number quartered. Here are what the quarters mean:
 * [0][1]
 * [2][3]
 * 
 * To get each image, we will need an algorithm to find which image to quarter, then which quarter to use.
 * OR
 * Get the image, get the quarters and then work out what the coordinates to each are.
 */

async function locationything() {
while (currentlocation[0] != (maxbounds[0] + 1)) {
    while (currentlocation[1] != (maxbounds[1] + 1)) {
        async function dothing() {
            const actualcurrentcoords = currentlocation;
            let newcoord = [currentlocation[0] / 2, currentlocation[1] / 2]
            let posonimg;
            let cropcoords = {};
            let whole = (n) => n % 1 == 0;
            if (whole(newcoord[0]) && whole(newcoord[1])) {
                // Must be top-left
                posonimg = "0";
                cropcoords.start = [0, 0];
                cropcoords.end = [512, 512];
            } else if (whole(newcoord[0])) {
                // Must be bottom-left
                posonimg = "2";
                cropcoords.start = [0, 512];
                cropcoords.end = [512, 1024];
            } else if (whole(newcoord[1])) {
                // Must be top-right
                posonimg = "1";
                cropcoords.start = [512, 0];
                cropcoords.end = [1024, 512];
            } else {
                // Must be bottom-right
                posonimg = "3";
                cropcoords.end = [1024, 1024];
                cropcoords.start = [512, 512];
            }
            newcoord[0] = Math.floor(newcoord[0])
            newcoord[1] = Math.floor(newcoord[1])
            console.log(currentlocation.toString(), "=>", newcoord.toString(), "@ the", posonimg)
            let tile = await Jimp.read(path.join(__dirname, `/tiles/2/${newcoord[0]}_${newcoord[1]}.png`))
            tile.resize(1024, 1024) // resize
            tile.crop(cropcoords.start[0], cropcoords.start[1], 512, 512)
            await tile.writeAsync(path.join(__dirname, `/tiles/3/${actualcurrentcoords[0]}_${actualcurrentcoords[1]}.png`)); // save;
            currentlocation[1]++;
            console.log("inc [1]")
        }
        await dothing()
    }
    currentlocation[1] = -8;
    currentlocation[0]++;
    console.log("inc [0]")
}

}

locationything()




/*
Jimp.read("lenna.png", (err, lenna) => {
  if (err) throw err;
  lenna
    .resize(256, 256) // resize
    .quality(60) // set JPEG quality
    .greyscale() // set greyscale
    .write("lena-small-bw.jpg"); // save
});
*/