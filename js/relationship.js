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

function getCharactersWithCommonHobbies(hobbies, myHobbies, myId) {
    let values = [];
    for (const [id, content] of Object.entries(hobbies)) {
        if (id == myId) {
            continue;
        }
        for (const e of myHobbies) {
            if (content.hobbies.includes(e)) {
                values.push(id);
                break;
            }
        }
    }
    return values;
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
    for (const [id, json] of Object.entries(filteredHobbies)) {
        nodes.push({ id: id, label: json.name, color: "lightgrey" });
        getCharactersWithCommonHobbies(hobbies, json.hobbies, id).forEach(e => {
            if (!links.some(x => x.from === e && x.to === id)) {
                links.push({from: id, to: e, width: 4, selectionWidth: 6});
            }
        });
    }
    createNetwork(nodes, links);
}