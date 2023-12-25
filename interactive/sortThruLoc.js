let json = require("./geojson/locations.json");
json.features.forEach((element) => {
    console.log('<option value="' + element.geometry.coordinates[0] + "," + element.geometry.coordinates[1] + ";" + element.geometry.name + '">' + element.geometry.name + "</option>")
})