let destinations = [
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
];

window.addEventListener("load", async () => {
    let query = new URL(window.location).searchParams.get("search");
    let element = document.getElementById("content");
    if (query) {
        element.innerHTML = `
        <div class="sk-folding-cube">
            <div class="sk-cube1 sk-cube"></div>
            <div class="sk-cube2 sk-cube"></div>
            <div class="sk-cube4 sk-cube"></div>
            <div class="sk-cube3 sk-cube"></div>
        </div>
        Loading...
        `

        // 1s delay for *fancy loading icon*
        await new Promise(r => setTimeout(r, 1000));

        let results = ``;
        let regex = new RegExp(`/(.*${query}.*)/g`)
        for (const i of destinations) {
            if(i.name.toLowerCase().includes(query.toLowerCase())) {
                results +=  `<div class="resultItem">
                <h1>${i.name}</h1>
                <p>${i.description}</p>
                <a href="/interactive?pos=${i.coords}"><button class="btn btn-outline-primary">View on LI Map</button></a>${i.wiki ? `<a href="${i.wiki}"><button class="btn btn-outline-success">Go to Wiki Page</button></a>` : ""}
            </div>`
            }
        }

        if(results == "") {
            element.innerHTML = "No results found. Try another search :("
        } else {
            element.style.position = "static";
            element.style.marginTop = "32px";
            element.innerHTML = results
        }
    }
})