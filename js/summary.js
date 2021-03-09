function loadSummary() {
    let allElems = [];
    for (const [_, json] of Object.entries(allProfiles)) {
        if (currentSummary === "favorite" && !json.favorite) {
            continue;
        }
        let content = json.shortDescription.replace("\n", "<br/>") + "<br/><br/><table>"; // The element begin with the short description
        for (let key in json) {
            if (!canJsonExport(key) || key === "shortDescription") {
                continue;
            }
            if (key === "pfp") {
            } else if (isPersonnalityTrait(key) || key.startsWith("hexaco_")) {
            } else if (key.endsWith("Color")) {
                content += '<tr><td><b>' + (json[key] === "" ? "<br/>" : camelToSentence(key)) + "</b></td><td>" +
                (json[key] === "" ? "" : '<input type="color" class="colorPreview" disabled="disabled" value="' + json[key] + '"/>') + "</td></tr>";
            } else if (Object.prototype.toString.call(json[key]) === '[object Array]') {

            } else {
                // We put blank line if elem is empty so it doesn't mess with the height of the thing
                content += '<tr><td><b>' + (json[key] === "" ? "<br/>" : camelToSentence(key)) + "</b></td><td>" + json[key] + "</td></tr>";
            }
        }
        content += "</table>"
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