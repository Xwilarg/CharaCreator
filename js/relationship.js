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

function loadRelationship() {
    nodes = [];
    links = [];
    loadRelationshipInternal("likesArray", "likeNamePart", "blue");
    loadRelationshipInternal("diseasesArray", "diseaseNamePart", "green");
    if (settings.nsfw) {
        loadRelationshipInternal("fetishesArray", "fetishNamePart", "red");
    }
    createNetwork(nodes, links);
}

function loadRelationshipInternal(arrayName, partName, c) {
    let elems = {};
    let filteredElems = {};
    // Create hobbies array
    for (const [id, json] of Object.entries(allProfiles)) {
        if (json[arrayName] !== undefined && json[arrayName].length > 0) {
            elems[id] = { elems: json[arrayName].map(function(x) {
                if (json.isExport) {
                    return x[partName];
                }
                return x[partName].hashCode().toString();
            }), name: getName(json), isExport: json.isExport === true };
        }
    }
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
            let hexVal = padNumber(Math.ceil((255 - (value * 255 / maxValue))).toString(16));
            let color;
            if (c === "red") color = "ff" + hexVal + hexVal;
            else if (c === "blue") color = "" + hexVal + hexVal + "ff";
            else if (c === "green") color = "" + hexVal + "ff" + hexVal;
            else color = "000000";
            links.push({from: id1, to: id2, width: 4, selectionWidth: 6,
                color: { color: color, highlight: color}});
        }
    }
}