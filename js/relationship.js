let lastRelationship = "main";

function displayLastRelationship() {
    displayRelationship(lastRelationship);
}

function displayRelationship(id) {
    lastRelationship = id;
    document.getElementById("buttonGeneralRelationship").classList.remove("selected");
    document.getElementById("buttonPersonnalityRelationship").classList.remove("selected");

    switch (id) {
        case "main":
            document.getElementById("buttonGeneralRelationship").classList.add("selected");
            loadRelationshipMain();
            break;

        case "personnality":
            document.getElementById("buttonPersonnalityRelationship").classList.add("selected");
            loadRelationshipPersonnality();
            break;
    }
}


function createNetwork(argNodes, argEdges) {
    document.getElementById("loadingBar").hidden = false;
    document.getElementById("bar").style.width = 0;
    let nodes = new vis.DataSet(argNodes);

    let edges = new vis.DataSet(argEdges);

    let container = document.getElementById("network");
    let data = {
        nodes: nodes,
        edges: edges
    };

    let options = {
        interaction: {
            zoomView: false
        }
    };
    let network = new vis.Network(container, data, options);

    network.on("stabilizationProgress", function(params) {
        let maxWidth = 940;
        let widthFactor = params.iterations / params.total;
        let width = maxWidth * widthFactor;
    
        document.getElementById("bar").style.width = width + "px";
    });

    network.once("stabilizationIterationsDone", function () {
        document.getElementById("loadingBar").hidden = true;
    });
}

let nodes = [];
let links = [];

function getContainedArray(array, myArray, myId) {
    let values = [];
    for (const [id, content] of Object.entries(array)) {
        if (id == myId) {
            continue;
        }
        myArray.forEach(e => {
            if (!values.includes(e) && content.elems.includes(e)) {
                values.push(e);
            }
        });
    }
    return values;
}

function getCharactersWithCommonArray(allLinks, array, myArray, myId) {
    if (allLinks[myId] === undefined) {
        allLinks[myId] = {};
    }
    for (const [id, content] of Object.entries(array)) {
        if (id == myId) {
            continue;
        }
        for (const e of myArray) {
            if (content.elems.includes(e)) {
                if (allLinks[id] !== undefined) {
                    if (allLinks[id][myId] !== undefined) {
                        allLinks[id][myId]++;
                    } else {
                        allLinks[id][myId] = 0;
                    }
                } else {
                    if (allLinks[myId][id] !== undefined) {
                        allLinks[myId][id]++;
                    } else {
                        allLinks[myId][id] = 0;
                    }
                }
            }
        }
    }
}

function padNumber(nb) {
    return (nb < 10 ? "0" : "") + nb;
}

function loadRelationshipMain() {
    nodes = [];
    links = [];
    loadRelationshipInternalFromArray("likesArray", "likeNamePart", "blue");
    loadRelationshipInternalFromArray("diseasesArray", "diseaseNamePart", "green");
    loadRelationshipInternalFromArray("phobiasArray", "phobiaNamePart", "lightgreen");
    if (settings.nsfw) {
        loadRelationshipInternalFromArray("fetishesArray", "fetishNamePart", "red");
    }
    loadRelationshipInternalFromField("favoriteDrink", "yellow");
    loadRelationshipInternalFromField("favoriteMeal", "yellow");
    loadRelationshipInternalFromField("favoriteDessert", "yellow");
    loadRelationshipInternalFromField("favoriteSmell", "yellow");
    loadRelationshipInternalFromField("favoriteAnimal", "yellow");
    createNetwork(nodes, links);
}

function loadRelationshipPersonnality() {
    nodes = [];
    links = [];
    profiles = {};
    for (const [id, json] of Object.entries(allProfiles)) {
        if (isPersonnalitySet(json)) {
            profiles[id] = json;
        }
    }
    for (const [id, json] of Object.entries(profiles)) {
        for (const [id2, json2] of Object.entries(profiles)) {
            if (id === id2) {
                continue;
            }
        }
    }
    createNetwork(nodes, links);
}

function loadRelationshipInternalFromArray(arrayName, partName, c) {
    let elems = {};
    // Create hobbies array
    for (const [id, json] of Object.entries(allProfiles)) {
        if (json[arrayName] !== undefined && json[arrayName].length > 0) {
            elems[id] = { elems: json[arrayName].map(function(x) {
                if (json.isExport) {
                    return x[partName];
                }
                return x[partName].toLowerCase().hashCode().toString();
            }), name: getName(json), isExport: json.isExport === true };
        }
    }
    filterRelationshipInternal(elems, c);
}

function loadRelationshipInternalFromField(name, c) {
    let elems = {};
    // Create hobbies array
    for (const [id, json] of Object.entries(allProfiles)) {
        if (json[name] !== undefined && json[name] !== "" && json[name] !== "0") {
            let rName;
            if (json.isExport) rName = json[name];
            else rName = json[name].toLowerCase().hashCode().toString();
            elems[id] = { elems: [rName], name: getName(json), isExport: json.isExport === true };
        }
    }
    filterRelationshipInternal(elems, c);
}

function filterRelationshipInternal(elems, c) {
    let filteredElems = {};
    // Filter them
    for (const [id, json] of Object.entries(elems)) {
        let common = getContainedArray(elems, json.elems, id);
        if (common.length > 0) { // If the character have at least one hobby in common with someone else
            filteredElems[id] = { elems: common, name: json.name, isExport: json.isExport };
        }
    }

    let allLinks = {};
    for (const [id, json] of Object.entries(filteredElems)) {
        if (!nodes.some(x => x.id === id)) {
            let color;
            if (json.isExport) {
                color = "lightgreen";
            } else {
                color = "lightgrey";
            }
            nodes.push({ id: id, label: json.name, color: color });
        }
        getCharactersWithCommonArray(allLinks, elems, json.elems, id);
    }

    let maxValue = 0; // Biggest number of common hobby we can find
    for (const [id1, json] of Object.entries(allLinks)) {
        for (const [id2, value] of Object.entries(json)) {
            if (value > maxValue) {
                maxValue = value;
            }
        }
    }

    for (const [id1, json] of Object.entries(allLinks)) {
        for (const [id2, value] of Object.entries(json)) {
            let max = 255;
            if (c === "lightgreen") max = 127;
            let hexVal = padNumber(Math.ceil((max - (value * max / maxValue))).toString(16));
            let color;
            if (c === "red") color = "ff" + hexVal + hexVal;
            else if (c === "blue") color = "" + hexVal + hexVal + "ff";
            else if (c === "green") color = "" + hexVal + "ff" + hexVal;
            else if (c === "lightgreen") color = "" + hexVal + "7f" + hexVal;
            else if (c === "yellow") color = "ffff" + hexVal;
            else color = "000000";
            links.push({from: id1, to: id2, width: 4, selectionWidth: 6,
                color: { color: color, highlight: color}});
        }
    }
}