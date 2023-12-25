$(window).on('resize', function () {
    var win = $(this); //this = window
    if (win.height() > win.width()) {
        // Remove the "hidden" class from the popup thingy
        document.querySelector(".orientation").classList.remove("hidden")
    } else {
        // Add the hidden class from the popup thingy
        document.querySelector(".orientation").classList.add("hidden")
    }
});
let currentPlayerCoordinates = [];
let polyline;
let router;
let map;

// Converts from degrees to radians.
function toRadians(degrees) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
function toDegrees(radians) {
    return radians * 180 / Math.PI;
    
}

// Thanks Stack Overflow!
// https://stackoverflow.com/questions/46590154/calculate-bearing-between-2-points-with-javascript
function bearing(startLat, startLng, destLat, destLng) {
    startLat = toRadians(startLat);
    startLng = toRadians(startLng);
    destLat = toRadians(destLat);
    destLng = toRadians(destLng);

    y = Math.sin(destLng - startLng) * Math.cos(destLat);
    x = Math.cos(startLat) * Math.sin(destLat) -
        Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    brng = Math.atan2(y, x);
    brng = toDegrees(brng);
    return (brng + 360) % 360;
}

function getScale() {
    return 1 / Math.pow(2, 5);
}

function pixelsToMeters(num) {
    return num * getScale();
}

function metersToPixels(num) {
    return Math.round(num / getScale());
}

function metersToPixelsLatLng(num) {
    return [Math.round(num[1] / getScale()), Math.round(num[0] / getScale())];
}

window.onload = async function () {
    if ($(window).height() > $(window).width()) {
        // Remove the "hidden" class from the popup thingy
        document.querySelector(".orientation").classList.remove("hidden")
    } else {
        // Add the hidden class from the popup thingy
        document.querySelector(".orientation").classList.add("hidden")
    }
    function imageToDataUri(img, width, height) {

        // create an off-screen canvas
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');

        // set its dimension to target size
        canvas.width = width;
        canvas.height = height;
        let newimg = document.createElement('img')
        newimg.src = img;

        // draw source image into the off-screen canvas:
        ctx.drawImage(newimg, 0, 0, width, height);

        // encode image to data-uri with base64 version of compressed image
        console.log(canvas.toDataURL())
        return canvas.toDataURL();
    }

    map = L.map('map', {
        crs: L.Util.extend(L.CRS.Simple, {
            // we need to flip the y-axis correctly
            // https://stackoverflow.com/a/62320569/3530727
            transformation: new L.Transformation(1, 0, 1, 0)
        }),
        zoom: 5
    }).setView([0, 0], 0);

    function centre() {
        map.setView([0, 0]);
        map.setZoom(3)
    }
    function getURLQueryParts(url) {
        let overallJSON = `{`
        let each = url.replace("?", "").split("&")
        each.forEach((item) => overallJSON += `"${item.split("=")[0]}": "${item.split("=")[1]}",`)
        overallJSON = overallJSON.slice(0, -1);
        overallJSON += "}"
        return JSON.parse(overallJSON);
    }
    let queries = getURLQueryParts(window.location.search)
    const TileLayerCustom = L.TileLayer.extend({
        getTileUrl(coords) {
            //let x = imageToDataUri(`http://localhost:443?url=http://web.peacefulvanilla.club/maps/tiles/World_nether/${coords.z}/${coords.x}_${coords.y}.png`, 512, 512)
            return window.location.protocol + "//" + window.location.host + `/interactive/tiles/${coords.z}/${coords.x}_${coords.y}.png`;
        },
        options: {
            noWrap: true,
            bounds: [[-1000, -1000], [1000, 1000]],
            minZoom: 1,
            maxZoom: 5,
            tileSize: 512
        },
    });

    console.log("Get Coordinates ON")
    function onMapClick(e) {
        navigator.clipboard.writeText("[" + e.latlng.toString().split("LatLng(")[1].split(")")[0] + "],");
    }
    map.on('contextmenu', onMapClick);
    map.on('click', (event) => L.popup([event.latlng.lat, event.latlng.lng], { content: `This location is: ${metersToPixels(event.latlng.lng)}, ${metersToPixels(event.latlng.lat)}.<br><a href="javascript:navigator.clipboard.writeText('${metersToPixels(event.latlng.lng)}, ${metersToPixels(event.latlng.lat)}')">Copy To Clipboard</a>` }).openOn(map))
    const mp = new TileLayerCustom()
    mp.addTo(map);
    console.log(map)

    setInterval(() => {
        map.invalidateSize()
    }, 1000)

    /*let markers = [
        [-67.963555, -41.814874],
        [-42.861382, -41.876424],
        [-42.736225, -42.095099],
        [-34.945175, -42.095099],
        [-34.945175, -37.909045],
        [-34.976464, -33.348121],
        [-42.830093, -33.37936],
        [-42.740082, -0.51459],
        [-34.980321, -0.764504],
    ]
    markers.forEach((item, index) => {
        L.marker(item, {title: "Junction"}).addTo(map).bindPopup(`Junction #${index}`)
    })*/

    let lines = [
        [
            [-29.1875, -27.8125],
            [-29.1875, 26.71875],
            [27.8125, 26.71875],
            [27.8125, -27.8125],
            [-29.1875, -27.8125]

        ],
        [
            [-29.1875, -27.6875],
            [-45.3125, -27.6875],
            [-45.3125, -65.75]
        ],
        [
            [27.8125, -22.1875],
            [-29.1875, -22.1875]
        ],
        [
            [13.625, -22.1875],
            [13.625, -19.03125]
        ],
        [
            [-16.25, -27.8125],
            [-16.25, -22.1875],
            [-15.59375, -19.40625]
        ],
        [
            [-15.625, -22.1875],
            [-15.625, 26.71875]
        ],
        [
            [-21.6875, 26.71875],
            [-21.6875, 21.5625]
        ],
        [
            [-29.1875, 21.5625],
            [0, 21.5625],
        ],
        [
            [-7.3125, 21.5],
            [-7.3125, 0.09375]
        ],
        [
            [-22.1875, 0],
            [-15.5625, 1.75],
            [-2.40625, 1.75],
            [-2.125, 1.96875],
            [-1.15625, 1.96875],
            [-1.125, 0.71875]
        ],
        [
            [-0.15625, 1.78125],
            [-1.125, 1.78125]
        ],
        [
            [-2.6875, 1.8125],
            [-2.6875, 10.9375]
        ],
        [
            [-7.375, 3.96875],
            [1.75, 3.96875],
            [1.75, 1.78125],
            [0.3125, 1.78125]
        ],
        [
            [1.25, 1.78125],
            [1.25, 0.65625]
        ],
        [
            [1.75, 2.28125],
            [7.15625, 2.28125],
            [7.15625, 26.71875]
        ],
        [
            [3.65625, 2.28125],
            [3.65625, -0.6875],
            [1.875, -0.6875],
            [1.875, -3.4375],
            [-0.21875, -3.4375],
            [-0.21875, -2.53125],
            [-0.625, -2.53125],
            [-0.625, -4.78125],
            [-1.125, -6.40625]
        ],
        [
            [-1.125, 0.15625],
            [-1.125, -27.8125]
        ],
        [
            [-1.125, -0.96875],
            [-0.15625, -0.96875]
        ],
        [
            [0.3125, -0.96875],
            [1.84375, -0.96875]
        ],
        [
            [1.25, -0.96875],
            [1.25, 0.15625]
        ],
        [
            [2.8125, 0.09375],
            [27.8125, 0.09375]
        ],
        [
            [27.8125, 2.78125],
            [7.15625, 2.78125]
        ],
        [
            [0, 3.96875],
            [0, 27.375]
        ],
        [
            [0, 22.9375],
            [7.34375, 22.9375]
        ],
        [
            [27.8125, 17.5625],
            [-7.3125, 17.5625]
        ],
        [
            [-29.1875, 12.75],
            [-10.40625, 12.75],
            [-10.40625, 13.3125],
            [-7.3125, 13.34375],

        ],
        [
            [-7.34375, 13.0625],
            [-4.21875, 13.0625],
            [-3.09375, 12.6875],
            [0, 12.6875]
        ],
        [
            [27.8125, 10.9375],
            [-29.1875, 10.9375]
        ],
        [
            [-9.6875, 12.09375],
            [-9.6875, -22.1875]
        ],
        [
            [-2.6875, 0.09375],
            [-12.96875, 0.09375],
            [-12.96875, 0],
            [-29.1875, 0]
        ],
        [
            [-17.4375, 0],
            [-17.4375, -0.875]
        ],
        [
            [-23.4375, 0],
            [-23.4375, -27.8125]
        ],
        [
            [-23.40625, -26.40625],
            [-16.25, -26.40625]
        ],
        [
            [-15.5625, -16.34375],
            [-23.4375, -16.34375]
        ],
        [
            [-6.625, 21.5],
            [-6.625, 26],
            [-6.25, 26]
        ],
        [
            [-6.375, 26],
            [-6.375, 26.71875]
        ],
        [
            [20.21875, 26.71875],
            [20.21875, 0.0625]
        ],
        [
            [-3.15625, 10.9375],
            [-3.15625, 8.15625]
        ],
        [
            [-3.625, 1.8125],
            [-3.625, -1.3125],
            [-1.125, -1.3125]
        ],
        [
            [17.634831, 2.78125],
            [17.634831, 12.125],
            [17.319094, 12.125],
            [17.319094, 17.53125],
        ],
        [
            [13.625, -19.03125],
            [13.625, -15.75],
            [9.003646, -15.75],
            [9.003646, -3.3125],
            [1.910595, -3.3125],
        ],
        [
            [pixelsToMeters(2000), pixelsToMeters(2000)],
            [pixelsToMeters(2000), pixelsToMeters(-2000)],
            [pixelsToMeters(-2000), pixelsToMeters(-2000)],
            [pixelsToMeters(-2000), pixelsToMeters(2000)],
            [pixelsToMeters(2000), pixelsToMeters(2000)],
        ],
        [
            [-29.213928, 0],
            [pixelsToMeters(-2000), pixelsToMeters(0)]
        ],
        [
            [0, 27.3125],
            [pixelsToMeters(0), pixelsToMeters(2000)]
        ],
        [
            [27.874421, 0],
            [pixelsToMeters(2000), pixelsToMeters(0)]
        ],
        [
            [-1.203924, -27.8125],
            [pixelsToMeters(-40), pixelsToMeters(-2000)]
        ],
        [
            [27.789973, 10.90625],
            [pixelsToMeters(2000), pixelsToMeters(350)]
        ]


    ]

    let gculines = [
        [
            [4.473401, 0.15625],
            [5.536481, 0.125],
            [5.567748, 3.4375],
            [10.976945, 3.5],
            [11.039479, 4.375],
            [16.073472, 4.375],
            [16.073472, 6.949098],
        ]
    ]

    //[-5.340598, -0.03125],
    let colorPicker = document.getElementById("colour")
    let r = await fetch("./interactive/geojson/paths.json");
    let r2d2 = await r.json();
    polyline = L.polyline(lines, { color: '#94dee7' }).addTo(map);
    console.log(polyline.toGeoJSON())
    console.log(window.location.search)
    if (queries.gcu == "true") {
        let pl = L.polyline(gculines, { color: "#7be765" }).addTo(map);
        L.marker([16.129822, 7.09375], { title: "GCU Event location is here!" }).addTo(map).bindPopup("The GCU Event location is here!").openPopup();
        L.marker([4.439647, 0.09375], { title: "Pink Hub" }).addTo(map).bindPopup("Go from pink hub's LI Tunnel (here!)");
        console.log("Added GCU Lines")
        map.fitBounds(pl.getBounds());
    }
    colorPicker.addEventListener("change", watchColorPicker, false);
    let player = null;
    let llamabut = document.querySelector(".button1")
    let boatbut = document.querySelector(".button2")
    let stevebut = document.querySelector(".button3")
    let followplayer = document.querySelector(".button4")
    llamabut.addEventListener("click", changeType, false)
    boatbut.addEventListener("click", changeType, false)
    stevebut.addEventListener("click", changeType, false)
    let follow = false;
    function followPlayer() {
        follow == true ? follow = false : follow = true;
    }
    followplayer.addEventListener("click", followPlayer, false)
    function watchColorPicker(event) {
        console.log(polyline)
        polyline.setStyle({ color: event.target.value });
    }
    centre()
    //map.fitBounds(polyline.getBounds());


    var llama = L.icon({
        iconUrl: '/interactive/llama.png',
        iconSize: [25, 25],
    });
    var boat = L.icon({
        iconUrl: '/interactive/boat.png',
        iconSize: [25, 25],
    });
    var steve = L.icon({
        iconUrl: '/interactive/steve.png',
        iconSize: [25, 25],
    });
    var spawn = L.icon({
        iconUrl: '/interactive/spawn.png',
        iconSize: [16, 16],
    });
    var spawnmarker = L.marker([0, 0], { icon: spawn }).bindPopup("Spawn Portal (0, 0)").addTo(map);
    function changeType(type) {
        if (!player) return;
        if (type.target.innerText == "Llama") {
            player.setIcon(llama)
        } else if (type.target.innerText == "Boat") {
            player.setIcon(boat)
        } else if (type.target.innerText == "Steve") {
            player.setIcon(steve)
        }
    }

    function addPlayer(name) {
        document.getElementById("yourLoc").removeAttribute("disabled")
        player = L.marker([0, 0], { icon: llama }).addTo(map)
        setInterval(async () => {
            let x = await fetch("../api/index");
            let x2 = await x.json();
            console.log(x2)
            console.log(name)
            let y = false;
            x2.players.forEach((x3) => {
                if (((x3.world == "World_nether") || (x3.world == "minecraft_the_nether")) && x3.name == queries.player) {
                    player.setLatLng([pixelsToMeters(x3.z), pixelsToMeters(x3.x)]);
                    y = true

                    currentPlayerCoordinates = [pixelsToMeters(x3.z), pixelsToMeters(x3.x)]
                }
            })
            console.log(y)
        }, 1000)
    }
    if (queries.player) addPlayer(queries.player)

    // All da locations:
    let locations = [
        {
            name: "The Emlands Atlantic",
            description: "Large shopping area in a big dome offering free plots!",
            wiki: "https://peaceful-vanilla-club.fandom.com/wiki/The_Emlands_Atlantic",
            coords: [-16.439808, -24.435132],
        },
        {
            name: "Bastiontown",
            description: "Nether town hosted in a reconverted Bastion",
            wiki: null,
            coords: [-45.339678, -65.75],
        },
        {
            name: "Moonland (East Entry)",
            description: "Abandoned shopping area with public farms and trading hall.",
            wiki: "https://peaceful-vanilla-club.fandom.com/wiki/Moonland_Mall",
            coords: [-15.617759, -21.78125],
        },
        {
            name: "Moonland (West Entry)",
            description: "Abandoned shopping area with public farms and trading hall.",
            wiki: "https://peaceful-vanilla-club.fandom.com/wiki/Moonland_Mall",
            coords: [-15.18002, -22.1875],
        },
        {
            name: "DM (The Dark Market)",
            description: "Collection of public farms and shops, now mostly abandoned.",
            wiki: "https://peaceful-vanilla-club.fandom.com/wiki/Dark_Market",
            coords: [-5.394562, -22.28125],
        },
        {
            name: "Kings' Hub",
            description: "Nether hub with bases of a few players",
            wiki: null,
            coords: [11.944468, -22.21875],
        },
        {
            name: "Bottlenose Cove",
            description: "Seaside hamlet with bases and attractions.",
            wiki: "https://peaceful-vanilla-club.fandom.com/wiki/Bottlenose_Cove",
            coords: [13.632888, -22.21875],
        },
        {
            name: "Ottoman Hub",
            description: "Player made area with scenic buildings",
            wiki: null,
            coords: [12.66361, -22.21875],
        },
        {
            name: "Quartz Hub",
            description: "Nether area with farms, shops and PVP arena",
            wiki: "https://peaceful-vanilla-club.fandom.com/wiki/Quartz_Hub",
            coords: [13.630946, -19.0625],
        },
        {
            name: "Betaways (West)",
            description: "Access to the West 1.18 lands and WORI through the Betalands.",
            wiki: null,
            coords: [-0.595556, -27.84375],
        },
        {
            name: "Blue Nether Hub",
            description: "Nether hub serving the West of the nether.",
            wiki: null,
            coords: [-0.001482, -2.03125],
        },
        {
            name: "Green Nether Hub",
            description: "Nether hub serving the North of the nether.",
            wiki: null,
            coords: [-2.127641, 0.03125],
        },
        {
            name: "Yellow Nether Hub",
            description: "Nether hub serving the East of the nether.",
            wiki: null,
            coords: [0.061052, 2.9375],
        },
        {
            name: "Pink Nether Hub",
            description: "Nether hub serving the South of the nether.",
            wiki: null,
            coords: [2.312279, 0.3125],
        },
        {
            name: "Snowdin",
            description: "Area containing bases for players in a snow biome.",
            wiki: null,
            coords: [-3.184263, 8.15625],
        },
        {
            name: "BIF (British Imperial Federation) HQ and EE Shops",
            description: "HQ for BIF Union, and its trading hall, EE.",
            wiki: "https://peaceful-vanilla-club.fandom.com/wiki/British_Imperial_Federation",
            coords: [-2.459754, 1.71875],
        },
        {
            name: "Red Nether Hub",
            description: "Unofficial player-made nether hub.",
            wiki: null,
            coords: [-2.678623, 4.4375],
        },
        {
            name: "Betaways (South)",
            description: "Access to the South 1.18 lands and SORI through the Betalands.",
            wiki: null,
            coords: [27.827885, 0.3125],
        },
        {
            name: "Redstopia",
            description: "Headquarters of the former ARC union.",
            wiki: "https://peaceful-vanilla-club.fandom.com/wiki/Advanced_Redstone_Computing_Union",
            coords: [17.663031, 12.09375],
        },
        {
            name: "Crimson Creek Nether Hub",
            description: "Nether hub with portal access to player bases.",
            wiki: null,
            coords: [1.137863, 17.53125],
        },
        {
            name: "Sunset Bay",
            description: "Seaside players' town featuring GCU Union HQ",
            wiki: "https://peaceful-vanilla-club.fandom.com/wiki/Sunset_Bay",
            coords: [-9.02544, 13.34375],
        },
        {
            name: "Sunset Bay Mall",
            description: "Indoor shopping area featuring casino.",
            wiki: "https://peaceful-vanilla-club.fandom.com/wiki/Sunset_Bay_Mall",
            coords: [-10.369923, 13.28125],
        },
        {
            name: "Flynn's Oceanside Monument",
            description: "Player area and monument with farms.",
            wiki: null,
            coords: [20.236674, 19.5625],
        },
        {
            name: "Ends Meet",
            description: "Player-made area at corner of iceways.",
            wiki: null,
            coords: [27.834564, 26.625],
        },
        {
            name: "Betaways (East)",
            description: "Access to the East 1.18 lands and EORI through the Betalands.",
            wiki: null,
            coords: [0.038167, 27.15625],
        },
        {
            name: "Historians Of PVC (HOP) HQ",
            description: "Former Union HQ with museum and library.",
            wiki: "https://peaceful-vanilla-club.fandom.com/wiki/Historians_of_PVC",
            coords: [-6.277774, 26],
        },
        {
            name: "Llama Sanctuary",
            description: "Llama-Commercial Union HQ, plus zoo with attractions.",
            wiki: "https://peaceful-vanilla-club.fandom.com/wiki/LarryTLlama%27s_Llama_Sanctuary",
            coords: [-7.309587, 21.5625],
        },
        {
            name: "HOP Monument",
            description: "Drained ocean monument from the HOP union, still unfinished 👀",
            wiki: null,
            coords: [-21.723691, 25.625],
        },
        {
            name: "Sprucetown",
            description: "Player town with bases and shops",
            wiki: null,
            coords: [-19.717523, 12.78125],
        },
        {
            name: "Helping Hand Union (HHU) HQ",
            description: "Headquarters of the HHU Union.",
            wiki: "https://peaceful-vanilla-club.fandom.com/wiki/Helping_Hand_Union",
            coords: [7.170323, 22.90625],
        },
        {
            name: "Emlands Plaza",
            description: "Large shopping area with many shops.",
            wiki: "https://peaceful-vanilla-club.fandom.com/wiki/Emlands_Plaza",
            coords: [-12.965649, 0.0625],
        },
        {
            name: "Potato Town",
            description: "Abandoned players' town located in swamp biome.",
            wiki: "https://peaceful-vanilla-club.fandom.com/wiki/Potato_Town",
            coords: [-17.433854, -0.875],
        },
        {
            name: "CVU Hub",
            description: "Hub leading to the Creeper Valley Union territory.",
            wiki: null,
            coords: [-15.680549, -17.53125],
        },
        {
            name: "Universal Welfare Union HQ",
            description: "Union HQ, with access to the large Saenctuary",
            wiki: null,
            coords: [-23.345096, -11.53125],
        },
        {
            name: "The Building Society (TBS)",
            description: "Large city and former union HQ for TBS, now owned by the LCU union.",
            wiki: "https://peaceful-vanilla-club.fandom.com/wiki/The_Buildings_of_Society",
            coords: [-23.40763, -26.71875],
        },
        {
            name: "Betaways (North)",
            description: "Access to the North 1.18 lands and NORI through the Betalands.",
            wiki: null,
            coords: [-28.333408, -0.03125],
        },
        {
            name: "Barebones",
            description: "Area with various farms and other attractions",
            wiki: "https://peaceful-vanilla-club.fandom.com/wiki/Barebones_Public_Farms",
            coords: [-29.208885, -4.6875],
        },
        {
            name: "Certune",
            description: "Gold and Blaze farm with smaller shops.",
            wiki: "https://peaceful-vanilla-club.fandom.com/wiki/Certune",
            coords: [0.099645, 26.6875],
        },
        {
            name: "TCU HQ",
            description: "Headquarters of the Toad Union.",
            wiki: "https://peaceful-vanilla-club.fandom.com/wiki/Toad_Corporations_Union",
            coords: [1.058952, 26.6875],
        },
        {
            name: "NORI/N Betaways Junction",
            description: "Portal Access on the 2K Loop",
            coords: [-62.497734, -0.125],
        },
        {
            name: "NORI/EORI Junction",
            description: "Portal Access on the 2K Loop",
            coords: [-62.526036, 62.5],
        },
        {
            name: "EORI/E Betaways Junction",
            description: "Portal Access on the 2K Loop",
            coords: [0.017055, 62.46875],
        },
        {
            name: "EORI/SORI Junction",
            description: "Portal Access on the 2K Loop",
            coords: [62.51685, 62.53125],
        },
        {
            name: "SORI/S Betaways Junction",
            description: "Portal Access on the 2K Loop",
            coords: [62.476962, -0.0625],
        },
        {
            name: "SORI/WORI Junction",
            description: "Portal Access on the 2K Loop",
            coords: [62.476417, -62.5],
        },
        {
            name: "WORI/W Betaways Junction",
            description: "Portal Access on the 2K Loop",
            coords: [-1.262335, -62.5],
        },
        {
            name: "WORI/NORI Junction",
            description: "Portal Access on the 2K Loop",
            coords: [-62.545647, -62.46875],
        },
    ]

    var markersLayer = new L.LayerGroup();	//layer contain searched elements

    // This next block of code allows all the nodes to show up.
    // Append "?showdebugnodes=true" to the request URL to get these to show.
    if (window.location.href.includes("showdebugnodes=true")) {
        let graph = await fetch("/interactive/nodes.json");
        let nodes = await graph.json();
        document.querySelector("title").innerText = Object.keys(nodes).length + " Nodes! - Llama Iceways"
        let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        alphabet.forEach((itemone) => {
            alphabet.forEach((itemtwo) => {
                alphabet.forEach((itemthree) => {
                    let node = itemone + itemtwo + itemthree;
                    if (nodes[node]) {
                        markersLayer.addLayer(L.marker(nodes[node].coords, { icon: spawn }).bindPopup(`[DEBUG NODE] ${node}`));
                    }
                })
            })
        })
    }

    map.addLayer(markersLayer);

    /**
     * Equation of a straight line
     * WHERE: (x1, y1) is a point, (x2, y2) is another point, (p1, p2) is the foreign point
     * y-y1 = (y2-y1/x2-x1)(x-x1)
     * 
     * The other point is on the line with gradient of the inverse reciprocal -(1/x) of (y2-y1/x2-x1)
     * So the other gradient is -(1/(y2-y1/x2-x1))
     * 
     * Line 1 equation = y-y1 = (y2-y1/x2-x1)(x-x1)
     * Line 2 equation = y-p1 = -(1/(y2-y1/x2-x1))(x-p2)
     * 
     */
    let givenPoint = L.latLng(0, 0);

    // Hide the Location nodes by adding "?hidelocationnodes=true" to the URL.
    if (window.location.href.includes("hidelocationnodes=true")) return;

    //router.route(waypoints, callback, context, options)
    locations.forEach((i) => {
        markersLayer.addLayer(L.marker(i.coords, {}).bindPopup(`<strong>${i.name}</strong><br>${i.description ?? "No description provided"}<br>${(i.wiki == "") || (i.wiki == null) ? "" : `<a href="${i.wiki}">Wiki Page</a><br>`}Coordinates: ${metersToPixels(i.coords[1])}, ${metersToPixels(i.coords[0])}`));
    })
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}
let maproutepolyline = null;
let routerfunc = async () => {
    if (maproutepolyline) maproutepolyline.remove();
    let start = document.getElementById("start").value,
        properstart = start,
        end = document.getElementById("end").value;
    if (start == "nowhere" || end == "nowhere") return;
    let graph = await fetch("/interactive/nodes.json");
    let nodes = await graph.json();
    if (start == "here") {
        properstart = await new Promise((resolve, reject) => {
            // Iterate through each letter of the alphabet. Find the node with the shortest distance
            let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
                shortestnode = "xxx",
                shortestdistance = Infinity;
            alphabet.forEach((itemone) => {
                alphabet.forEach((itemtwo) => {
                    alphabet.forEach((itemthree) => {
                        let node = itemone + itemtwo + itemthree;
                        if (nodes[node]) {
                            // Find the shortest distance to the node.
                            if (getDistance(currentPlayerCoordinates[0], currentPlayerCoordinates[1], nodes[node].coords[0], nodes[node].coords[1]) < shortestdistance) {
                                shortestdistance = getDistance(currentPlayerCoordinates[0], currentPlayerCoordinates[1], nodes[node].coords[0], nodes[node].coords[1]);
                                shortestnode = node;
                            }
                        }
                    })
                })
            })
            resolve(shortestnode)
        })
    }

    // Call the pathfinder server function.
    let r = await fetch(`/api/pathfind?start=${properstart}&end=${end}`)
    let rr = await r.json();
    console.log("[PATHFIND] Result: ")
    console.log(rr)
    if (rr.result == [] || rr.result == null) return;
    let steps = document.getElementById("steps");
    steps.innerHTML = ""
    if (start == "here") {
        steps.innerHTML += `<hr style="width:90%;text-align:left;margin-left:5%;">
        <div><h5>Walk to the Iceway</h5><br><p>You should arrive at around ${metersToPixelsLatLng(nodes[rr.result[0]].coords).join(", ")}</p></div>`
    }

    let routepolyline = [];
    rr.result.forEach((n, index) => {
        routepolyline.push(nodes[rr.result[index]].coords);
        /**
         * ++ is SE
         * +- is NE
         * -- is NW
         * -+ is SW
         */

        if (n == end) {
            return steps.innerHTML += `<hr style="width:90%;text-align:left;margin-left:5%;">
            <div><h5>Destination reached 📍</h5><br><p>You should arrive at around ${metersToPixelsLatLng(nodes[rr.result[index]].coords).join(", ")}</p></div>`
        }
        let thisnode = (nodes[rr.result[index]].coords),
            lastnode = (nodes[rr.result[index - 1]]?.coords),
            nextnode = (nodes[rr.result[index + 1]].coords);

        var closest = (goal, counts) => counts.reduce(function (prev, curr) {
            return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
        });
        if (!lastnode) {
            let newbear = bearing(thisnode[0], thisnode[1], nextnode[0], nextnode[1])
            let dir = closest(newbear, [0, 90, 180, 270, 360])
            let textdir = "";
            // Going to be lazy and put this in one big statement. 
            // Rip the lovely code formatting - You will be missed 🫡
            if (dir == 0 || dir == 360) { textdir = "South" } else if (dir == 90) { textdir = "East" } else if (dir == 180) { textdir = "North" } else if (dir == 270) { textdir = "West" }
            steps.innerHTML += `<hr style="width:90%;text-align:left;margin-left:5%;">
        <div><h5>Boat ${textdir}</h5><br><p>Head towards ${metersToPixelsLatLng(nodes[rr.result[index + 1]].coords).join(", ")}</p></div>`
            return;
        }



        // 180 = South
        // 90 = East
        // 0 = North
        // 270 = West
        let lastbear = bearing(lastnode[0], lastnode[1], thisnode[0], thisnode[1]),
            thisbear = bearing(thisnode[0], thisnode[1], nextnode[0], nextnode[1]);

        // If statement for left turns

        let diff = thisbear - lastbear;

        // -360 = Ahead
        // -270 = Right
        // -180 = Backwards
        // -90 = Left
        // 0 = Ahead
        // 90 = Right
        // 180 = Backwards
        // 270 = Left
        // 360 = Ahead
        // This is the closest value, so we can kinda guarantee it'll be one of these.
        let dir = closest(diff, [-360, -270, -180, -90, 0, 90, 180, 270, 360])
        if (dir == -360 || dir == 0 || dir == 360) {
            // Keep ahead
            steps.innerHTML += `<hr style="width:90%;text-align:left;margin-left:5%;">
            <div><h5>Keep Ahead</h5><br><p>Continue straight at the next junction (${metersToPixelsLatLng(nodes[rr.result[index]].coords).join(", ")}).</p></div>`;
        } else if (dir == -270 || dir == 90) {
            // Turn Right - Or left? IDEK
            steps.innerHTML += `<hr style="width:90%;text-align:left;margin-left:5%;">
            <div><h5>Turn left.</h5><br><p>Take a left at the next junction (${metersToPixelsLatLng(nodes[rr.result[index]].coords).join(", ")}).</p></div>`;
        } else if (dir == -180 || dir == 180) {
            // Turn Around!
            steps.innerHTML += `<hr style="width:90%;text-align:left;margin-left:5%;">
            <div><h5>Turn back.</h5><br><p>The GPS shouldn't really be doing this :/ Try turning around, and following it back to ${metersToPixelsLatLng(nodes[rr.result[0]].coords).join(", ")}.</p></div>`;
        } else if (dir == -90 || dir == 270) {
            // Turn right, or potentially left if I coded it wrong!
            steps.innerHTML += `<hr style="width:90%;text-align:left;margin-left:5%;">
            <div><h5>Turn right.</h5><br><p>Go right at the junction at ${metersToPixelsLatLng(nodes[rr.result[index]].coords).join(", ")}.</p></div>`;
        }

    })

    maproutepolyline = L.polyline(routepolyline, { color: '#008000' }).addTo(map);
}

document.getElementById("go").onclick = routerfunc;


