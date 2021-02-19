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

function getContainedHobbies(hobbies, myHobbies, myId) {
    let values = [];
    for (const [id, content] of Object.entries(hobbies)) {
        if (id == myId) {
            continue;
        }
        myHobbies.forEach(e => {
            if (!values.includes(e) && content.hobbies.includes(e)) {
                values.push(e);
            }
        });
    }
    return values;
}

function getCharactersWithCommonHobbies(allLinks, hobbies, myHobbies, myId) {
    if (allLinks[myId] === undefined) {
        allLinks[myId] = {};
    }
    for (const [id, content] of Object.entries(hobbies)) {
        if (id == myId) {
            continue;
        }
        for (const e of myHobbies) {
            if (content.hobbies.includes(e)) {
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
    let hobbies = {};
    let filteredHobbies = {};
    // Create hobbies array
    for (const [id, json] of Object.entries(allProfiles)) {
        if (json.likesArray !== undefined && json.likesArray.length > 0) {
            hobbies[id] = { hobbies: json.likesArray.map(x => x.likeNamePart), name: getName(json) };
        }
    }
    // Filter them
    for (const [id, json] of Object.entries(hobbies)) {
        let common = getContainedHobbies(hobbies, json.hobbies, id);
        if (common.length > 0) { // If the character have at least one hobby in common with someone else
            filteredHobbies[id] = { hobbies: common, name: json.name };
        }
    }

    let allLinks = {};
    for (const [id, json] of Object.entries(filteredHobbies)) {
        nodes.push({ id: id, label: json.name, color: "lightgrey" });
        getCharactersWithCommonHobbies(allLinks, hobbies, json.hobbies, id);
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
            let hexVal = padNumber((255 - (value * 255 / maxValue)).toString(16));
            let color = "" + hexVal + hexVal + "ff";
            links.push({from: id1, to: id2, width: 4, selectionWidth: 6,
                color: { color: color, highlight: color}});
        }
    }
    createNetwork(nodes, links);
}