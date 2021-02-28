function loadSummary() {
    let allElems = [];
    for (const [_, json] of Object.entries(allProfiles)) {
        if (currentSummary === "favorite" && !json.favorite) {
            continue;
        }
        let content = "";
        allElems.push([getName(json), content]);
    };

    allElems.sort(function(a, b) {
        return a[0] < b[0] ? -1 : 1;
    })

    let str = "";
    for (const c of allElems) {
        str += '<div class="comparatorCategory"><h3>' + c[0] + '</h3>' + c[1] + '</div>';
    }

    document.getElementById("summaryContainer").innerHTML = str;
}

let currentSummary = "all";

function displaySummary(id) {
    document.getElementById("buttonAllSummary").classList.remove("selected");
    document.getElementById("buttonFavoriteSummary").classList.remove("selected");
    currentSummary = id;

    switch (id) {
        case "all":
            document.getElementById("buttonAllSummary").classList.add("selected");
            break;

        case "favorite":
            document.getElementById("buttonFavoriteSummary").classList.add("selected");
            break;
    }

    loadSummary();
}