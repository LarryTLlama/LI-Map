var map = L.map('map', {
    crs: L.Util.extend(L.CRS.Simple, {
        // we need to flip the y-axis correctly
        // https://stackoverflow.com/a/62320569/3530727
        transformation: new L.Transformation(1, 0, 1, 0)
    }),
}).setView([0, 0], 0);;

let currentylevel = "all";

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
        return window.location.protocol + "//" + window.location.host + `/interactive/llama-sanctuary/tiles/${coords.z}/${coords.x}_${coords.y}.png`;
    },
    options: {
        noWrap: true,
        bounds: [[-1000, -1000], [1000, 1000]],
        minZoom: 0,
        maxZoom: 3,
        tileSize: 512
    },
});

const mp = new TileLayerCustom()
mp.addTo(map);

map.on("contextmenu", (event) => {
    console.log(event.latlng)
    navigator.clipboard.writeText(`[${event.latlng.lat}, ${event.latlng.lng}],`)
})

L.control.attribution({ prefix: false, position: "bottomleft" }).addAttribution(`<a href="https://www.freepik.com/icons/llama">Icons by Freepik</a>`).addTo(map)

let animal = L.icon({
    iconUrl: '/interactive/llama-sanctuary/images/animal.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
})

let attraction = L.icon({
    iconUrl: '/interactive/llama-sanctuary/images/rollercoaster.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
})

let portal = L.icon({
    iconUrl: '/interactive/llama-sanctuary/images/portal.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
})

let union = L.icon({
    iconUrl: '/interactive/llama-sanctuary/images/union.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
})

let landmark = L.icon({
    iconUrl: '/interactive/llama-sanctuary/images/landmark.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
})

let metro = L.icon({
    iconUrl: '/interactive/llama-sanctuary/images/metro.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
})

let iceway = L.icon({
    iconUrl: '/interactive/llama-sanctuary/images/canoe.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
})

let escalator = L.icon({
    iconUrl: '/interactive/llama-sanctuary/images/escalator.png',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
})

let paths = L.layerGroup().addTo(map)
let iceways = L.layerGroup().addTo(map)
let railways = L.layerGroup().addTo(map)
let animals = L.layerGroup().addTo(map)
let attractions = L.layerGroup().addTo(map)
let portals = L.layerGroup().addTo(map)
let unions = L.layerGroup().addTo(map)
let landmarks = L.layerGroup().addTo(map)
let metros = L.layerGroup().addTo(map)
let escalators = L.layerGroup().addTo(map)
let icewayStations = L.layerGroup().addTo(map)
let texts = L.layerGroup().addTo(map)
let areas = L.layerGroup()
areas.addLayer(L.polygon([
    [-217.26356346738737, -228.75],
    [-230.50985798402894, -232],
    [-271.5165698029423, -201.5],
    [-327.5009088921445, -162],
    [-328.2652414221157, -95.25],
    [-305.52160366712735, -81.25],
    [-266.28258028764185, -50.5],
    [-249.02328162185563, 2.25],
    [-172.29474545942224, 9.25],
    [-156.04928992014482, 26.5],
    [-128.30705046076338, 41],
    [-107.81278347275185, 69.5],
    [-94.31655887089059, 83],
    [-68.3238300080467, 82.75],
    [-52.578234639208574, 98.75],
    [-10.781881139838347, 130.75],
    [10.71210618905178, 168.75],
    [14.211127382126946, 189.75],
    [24.708190961352358, 202.75],
    [59.69840289210373, 217.25],
    [110.93407036213256, 172.5],
    [162.41966791738102, 125.75],
    [183.41379507583184, 89.25],
    [193.41099848461798, 90.25],
    [213.4054053021902, 70.25],
    [217.40428666570463, 68],
    [225.65197947795318, 48.75],
    [249.3953375738202, 32.25],
    [264.39114268699933, 33],
    [281.38638848193574, -50.5],
    [268.63995413573343, -50.25],
    [261.39198166436347, -70],
    [275.3880664366641, -72],
    [258.892680812167, -117.25],
    [246.39617655118434, -108.5],
    [245.1465261250861, -96.75],
    [231.15044135278552, -103.75],
    [234.14960237542135, -112.25],
    [222.40288837009768, -132],
    [197.9097400185717, -128.25],
    [193.91085865505727, -137],
    [201.90862138208615, -142],
    [199.4093205298896, -172.25],
    [197.9097400185717, -178],
    [192.661208228959, -184],
    [131.98552764046812, -201.5],
    [108.48056369106347, -195.75],
    [96.48391960052012, -191],
    [85.23706576563575, -191.75],
    [79.7386038908034, -199.25],
    [73.24042167509242, -206.25],
    [61.493707669768746, -218.25],
    [56.49510596537569, -219],
    [55.745315709716735, -196.25],
    [11.233919600520132, -196.25],
    [-40.501608039947996, -190.25],
    [-34.503285994676304, -173.25],
    [-50.99867161917339, -174],
    [-66.24440681757221, -183.25],
    [-77.49126065245659, -174.5],
    [-79.49070133421381, -181.75],
    [-105.983290367497, -204],
    [-113.23126283886694, -205],
    [-111.0266375313123, -207],
    [-104.77838540082098, -208.75],
    [-106.02803582691925, -240],
    [-114.27572863916777, -239.75],
    [-120.52398076965909, -236.75],
    [-127.52202315580936, -226.75],
    [-135.51978588283825, -235.25],
    [-148.26622022904053, -232],
    [-159.5130740639249, -212],
    [-178.00790037017921, -209.75],
    [-206.74986017043932, -239.25]
], { color: 'red' }).bindPopup("Llama Park Area"))

areas.addLayer(L.polygon([
    [-230.75734105193646, -232.25],
    [-225.2588791771041, -270.75],
    [-195.5171990359654, -325],
    [-208.763493552607, -339],
    [-206.2641927004105, -347.75],
    [-192.26810792810994, -346],
    [-182.27090451932384, -353.25],
    [-178.27202315580936, -353],
    [-168.27481974702326, -358],
    [-156.52810574169956, -383.75],
    [-147.28069258857244, -406],
    [-133.78446798671118, -441.5],
    [-130.28544679363603, -453.25],
    [-123.78726457792507, -459],
    [-110.79090014650313, -469.5],
    [-96.0450251185436, -475.75],
    [-81.54908017580375, -512],
    [88.70224820502284, -511.5],
    [72.20686258052575, -498],
    [61.95972908652, -483.25],
    [51.962525677733886, -454.5],
    [41.96532226894777, -431.75],
    [63.709239683057575, -407.25],
    [75.45595368838124, -397.5],
    [80.4545553927743, -368],
    [62.209659171739645, -335.25],
    [41.21553201328882, -337.25],
    [13.973152724346676, -337.5],
    [-9.020415115861383, -340.5],
    [-41.26139610919659, -333.5],
    [-46.75985798402895, -328.5],
    [-48.25943849534687, -319.5],
    [-70.75314616511562, -312.75],
    [-80.00055931824276, -319.75],
    [-78.02551889482675, -337.25],
    [-105.01796809854925, -328.25],
    [-110.76636005860126, -320],
    [-121.51335372304632, -321.5],
    [-123.51279440480356, -328],
    [-126.76188551265903, -329.5],
    [-146.5063622450116, -308],
    [-150.50524360852606, -307],
    [-159.00286650599423, -308],
    [-167.50048940346244, -297.25],
    [-176.49797247136993, -276],
    [-182.74622460186126, -272],
    [-189.9941970732312, -273.25],
    [-206.48958269772825, -258.75],
    [-207.2393729533872, -238.75],
    [-217.48650644739297, -228.75]
], { color: 'red' }).bindPopup("Llama Park Area"))

areas.addLayer(L.polygon([
    [-207.00727113715612, -239.25],
    [-206.38244592410697, -259.375],
    [-189.76209525700008, -273.5],
    [-183.13894799867927, -272.25],
    [-176.5158007403585, -276],
    [-167.76824775767062, -297.375],
    [-158.89572973237296, -308],
    [-150.76213021439025, -306.75],
    [-146.38835372304632, -308],
    [-126.64387699069376, -329.25],
    [-123.39478588283828, -328],
    [-121.27038015847123, -321.625],
    [-110.63695542743937, -320.125],
    [-105.13849355260702, -328.125],
    [-77.89611426366487, -337.25],
    [-80.02051998803192, -319.875],
    [-70.64814179229494, -313.125],
    [-48.141395015991435, -319.625],
    [-46.78086017132716, -328.5759446272312],
    [-41.28239829649482, -333.5759446272312],
    [-9.517129121185064, -340.5],
    [14.10126393207213, -337.5],
    [40.718818007965154, -337.25],
    [62.08784029424547, -336],
    [60.42302382683772, -322.25],
    [47.17672931019615, -307],
    [38.42917632750829, -306.75],
    [36.679665730970726, -304],
    [40.42861700926551, -298.5],
    [43.48828927429184, -290.5],
    [45.48772995604906, -282.875],
    [46.61241533953749, -266.125],
    [44.86290474299992, -257.875],
    [40.61409329426583, -253.625],
    [35.615491589872775, -240.375],
    [33.491085865505724, -235.375],
    [16.120944942739857, -234],
    [9.122902556589583, -216.125],
    [3.6244406817572212, -210.5],
    [4.999056150465314, -203.625],
    [4.374230937416179, -195.75],
    [-40.38356456059254, -190.375],
    [-34.76013764315035, -173.125],
    [-51.14062595340761, -174],
    [-66.13643106658677, -183.25],
    [-77.6332149866908, -174.125],
    [-79.38272558322836, -181.625],
    [-105.87531461651156, -203.875],
    [-113.24825213049132, -205.125],
    [-110.87391632090461, -207.25],
    [-104.87559427563295, -208.875],
    [-106.00027965912139, -239.875],
    [-114.37293751397975, -239.875],
    [-120.74615468708089, -236.625],
    [-127.49426698801153, -226.875],
    [-135.86692484286988, -235.25],
    [-148.48839414646233, -231.625],
    [-159.51674458989316, -212],
    [-177.88660585353765, -209.625]
]).bindPopup("LCU HQ Area"))

areas.addLayer(L.polygon([
    [4.619092201060656, -195.625],
    [55.72979462847965, -196.625],
    [56.60454992674843, -219.125],
    [61.353221545921826, -218.25],
    [85.09657964178885, -192.25],
    [96.7183286045027, -191],
    [107.96518243938708, -195.75],
    [131.95847062047375, -201.625],
    [191.98245139013284, -184.25],
    [197.96168670036968, -191.25],
    [213.4573519839882, -191.5],
    [220.95525454057776, -196.5],
    [223.4545553927743, -199.75],
    [229.70280752326562, -207.5],
    [242.19931178424827, -214],
    [243.69889229556617, -231.75],
    [223.7044854779939, -249],
    [220.45539437013844, -248.75],
    [217.94448766440428, -241.75],
    [206.44770374430027, -241.75],
    [202.6987524660055, -248],
    [195.95064016507484, -250],
    [195.20084990941587, -259.75],
    [192.70154905721935, -266.75],
    [197.7001507616124, -273.75],
    [200.9492418694679, -281],
    [188.7026676937049, -287.5],
    [172.70714223964714, -299.25],
    [163.45972908651999, -311.25],
    [159.46084772300554, -320.75],
    [158.21119729690727, -327],
    [150.71329474031768, -340],
    [143.71525235416743, -340],
    [140.96602141675123, -344.5],
    [139.46644090543333, -409.25],
    [130.71888792274547, -395.5],
    [114.97329255390736, -386.25],
    [108.97497050863569, -388.25],
    [108.97497050863569, -396.5],
    [102.72671837814437, -406.5],
    [94.47902556589582, -403.5],
    [87.73091326496521, -393.25],
    [80.9828009640346, -369.25],
    [62.4897924420693, -335.25],
    [60.990211930751386, -322],
    [47.74391741410979, -307.75],
    [38.49650426098264, -307.25],
    [36.99692374966472, -304.25],
    [39.49622460186124, -300],
    [45.49454664713291, -282.75],
    [46.49426698801152, -267.5],
    [45.24461656191326, -258],
    [41.495665283618465, -254.5],
    [33.49790255658958, -235.5],
    [15.253006335554929, -233.5],
    [8.754824119843953, -215.5],
    [3.2563622450115943, -210],
    [5.2558029267688156, -204.5],
]).bindPopup("Llama Sanctuary Local Area"))
let layers = {
    "Lines - Paths": paths,
    "Lines - Iceways": iceways,
    "Lines - Railways/Metro": railways,
    "Places - Animal Areas/Shelters": animals,
    "Places - Portals": portals,
    "Places - Attractions": attractions,
    "Places - Union Buildings": unions,
    "Places - Metro Stations": metros,
    "Places - Access Up/Down": escalators,
    "Places - Iceway Stations": icewayStations,
    "Places - Other Markers": texts,
    "Areas": areas
}
L.control.layers(null, layers).addTo(map);
let z;
function refreshIcons() {
    paths.clearLayers()
    iceways.clearLayers()
    railways.clearLayers()
    animals.clearLayers()
    attractions.clearLayers()
    portals.clearLayers()
    unions.clearLayers()
    landmarks.clearLayers()
    metros.clearLayers()
    escalators.clearLayers()
    icewayStations.clearLayers()
    texts.clearLayers()
    z.points.forEach((element) => {
        if (element["y-index"].indexOf(currentylevel) == -1 && currentylevel != "all") return;
        if (element.type == "animal") animals.addLayer(L.marker(element.point, { icon: animal }).bindPopup(`<strong>${element.name}</strong> <small>Animals 🫎</small><br>${element.description}`))
        if (element.type == "attraction") attractions.addLayer(L.marker(element.point, { icon: attraction }).bindPopup(`<strong>${element.name}</strong> <small>Attraction 🎢</small><br>${element.description}`))
        if (element.type == "portal") portals.addLayer(L.marker(element.point, { icon: portal }).bindPopup(`<strong>${element.name}</strong> <small>Portal 🚪</small><br>${element.description}`))
        if (element.type == "union") unions.addLayer(L.marker(element.point, { icon: union }).bindPopup(`<strong>${element.name}</strong> <small>Union Building 🤝</small><br>${element.description}`))
        if (element.type == "landmark") landmarks.addLayer(L.marker(element.point, { icon: landmark }).bindPopup(`<strong>${element.name}</strong> <small>Landmark 🗽</small><br>${element.description}`))
        if (element.type == "metro") metros.addLayer(L.marker(element.point, { icon: metro }).bindPopup(`<strong>${element.name}</strong> <small>Metro Station 🚇</small><br>${element.description}`))
        if (element.type == "iceway") icewayStations.addLayer(L.marker(element.point, { icon: iceway }).bindPopup(`<strong>${element.name}</strong> <small>Iceway ❄️</small><br>${element.description}`))
        if (element.type == "escalator") escalators.addLayer(L.marker(element.point, { icon: escalator }))
        if (element.type == "text") texts.addLayer(L.marker(element.point, {
            icon: L.divIcon({
                html: `<p style="position: absolute; width: 5rem; background-color: white; color: black;">${element.text}</p>`,
                className: "customMarker"
            })
        }))
    })

    z.paths.forEach((element) => {
        if (element["y-index"].indexOf(currentylevel) == -1 && currentylevel != "all") return;
        if (element.type == "iceway") iceways.addLayer(L.polyline(element.polyline, { color: element.color }).bindPopup(element.popuptext))
        if (element.type == "path") paths.addLayer(L.polyline(element.polyline, { color: element.color }).bindPopup(element.popuptext))
        if (element.type == "railway") iceways.addLayer(L.polyline(element.polyline, { color: element.color }).bindPopup(element.popuptext))
    })
}
let x = fetch("/interactive/llama-sanctuary/data.json").then(async (y) => {
    z = await y.json();
    refreshIcons()
})



function switchYLevel(y) {
    if (y == currentylevel) return;
    document.getElementById(`${currentylevel}`).classList.remove("selected");
    document.getElementById(`${y}`).classList.add("selected");
    currentylevel = y;
    refreshIcons()
}