// Add function to group characters by some criterias

let doesGroup = 0;

function dontGroup() { // Don't group anything
    groupByRemoveAll();

    let str = "";
    for (const [id, json] of Object.entries(allProfiles)) {
        str += '<button id="chara' + id + '" onclick="loadTab(' + id + ')" class="' + (id.toString() === currId.toString() ? "selected" : "") + '">' + getNameFromJson(json) + '</button>';
    }
    document.getElementById("profileList").innerHTML = str;

    doesGroup = 0;
    sortProfiles();
}

function groupByRemoveAll() {
    document.getElementById("dontGroup").classList.remove("selected");
    document.getElementById("groupFavorite").classList.remove("selected");
    document.getElementById("groupFamilyName").classList.remove("selected");
    document.getElementById("groupRace").classList.remove("selected");
    document.getElementById("groupOrientation").classList.remove("selected");
    document.getElementById("groupCompletion").classList.remove("selected");
    document.getElementById("groupBloodType").classList.remove("selected");
    document.getElementById("groupCustom").classList.remove("selected");
}

function groupByFavorite() { // Group by if you added the characters in favorite or not
    groupByRemoveAll();
    document.getElementById("groupFavorite").classList.add("selected");

    let str = "";
    let names = { Favorite: [], Other: [] };
    for (const [id, json] of Object.entries(allProfiles)) {
        names[json.favorite ? "Favorite" : "Other"].push(id);
    }
    for (const [lastName, ids] of Object.entries(names)) {
        str += '<nothing id="categoryGroupFavorite' + lastName + '"><h4>' + lastName + '</h4><div id="GroupFavorite' + lastName + '">';
        ids.forEach(function(id) {
            str += '<button id="chara' + id + '" onclick="loadTab(' + id + ')" class="' + (id.toString() === currId.toString() ? "selected" : "") + '">' + getNameFromJson(allProfiles[id]) + '</button>';
        });
        str += "</div></nothing>";
    }
    document.getElementById("profileList").innerHTML = str;

    doesGroup = 6;
    sortGroupedProfiles();
    sortProfiles();
}

function groupByFamilyName() { // Group by family name, we only display the first names of the character
    groupByRemoveAll();
    document.getElementById("groupFamilyName").classList.add("selected");

    let str = "";
    let names = {};
    for (const [id, json] of Object.entries(allProfiles)) {
        if (names[json.lastName] === undefined) names[json.lastName] = [id];
        else names[json.lastName].push(id);
    }
    for (const [lastName, ids] of Object.entries(names)) {
        str += '<nothing id="categoryGroupName' + lastName + '"><h4>' + lastName + '</h4><div id="GroupName' + lastName + '">';
        ids.forEach(function(id) {
            let name = allProfiles[id].firstName;
            str += '<button id="chara' + id + '" onclick="loadTab(' + id + ')" class="' + (id.toString() === currId.toString() ? "selected" : "") + '">' + (name === "" ? "Empty" : name) + '</button>';
        });
        str += "</div></nothing>";
    }
    document.getElementById("profileList").innerHTML = str;

    doesGroup = 1;
    sortGroupedProfiles();
    sortProfiles();
}

function groupByRace() { // Group by the race of the character
    groupByRemoveAll();
    document.getElementById("groupRace").classList.add("selected");

    let str = "";
    let races = {};
    for (const [id, json] of Object.entries(allProfiles)) {
        if (races[json.race] === undefined) races[json.race] = [id];
        else races[json.race].push(id);
    }
    for (const [race, ids] of Object.entries(races)) {
        str += '<nothing id="categoryGroupRace' + race + '"><h4>' + race + '</h4><div id="GroupRace' + race + '">';
        ids.forEach(function(id) {
            str += '<button id="chara' + id + '" onclick="loadTab(' + id + ')" class="' + (id.toString() === currId.toString() ? "selected" : "") + '">' + getNameFromJson(allProfiles[id]) + '</button>';
        });
        str += "</div></nothing>";
    }
    document.getElementById("profileList").innerHTML = str;

    doesGroup = 2;
    sortGroupedProfiles();
    sortProfiles();
}

function groupByOrientation() { // Group by sexual orientation
    groupByRemoveAll();
    document.getElementById("groupOrientation").classList.add("selected");

    let str = "";
    let orientations = {};
    for (const [id, json] of Object.entries(allProfiles)) {
        if (orientations[json.orientation] === undefined) orientations[json.orientation] = [id];
        else orientations[json.orientation].push(id);
    }
    for (const [orientation, ids] of Object.entries(orientations)) {
        str += '<nothing id="categoryGroupOrientation' + orientation + '"><h4>' + (orientation.charAt(0).toUpperCase() + orientation.substr(1)) + '</h4><div id="GroupOrientation' + orientation + '">';
        ids.forEach(function(id) {
            str += '<button id="chara' + id + '" onclick="loadTab(' + id + ')" class="' + (id.toString() === currId.toString() ? "selected" : "") + '">' + getNameFromJson(allProfiles[id]) + '</button>';
        });
        str += "</div></nothing>";
    }
    document.getElementById("profileList").innerHTML = str;

    doesGroup = 3;
    sortGroupedProfiles();
    sortProfiles();
}

function groupByBloodType() { // Group by blood type
    groupByRemoveAll();
    document.getElementById("groupBloodType").classList.add("selected");

    let str = "";
    let bloodTypes = {};
    for (const [id, json] of Object.entries(allProfiles)) {
        if (bloodTypes[json.bloodType] === undefined) bloodTypes[json.bloodType] = [id];
        else bloodTypes[json.bloodType].push(id);
    }
    for (const [bloodType, ids] of Object.entries(bloodTypes)) {
        str += '<nothing id="categoryGroupBloodType' + bloodType + '"><h4>' + (bloodType.charAt(0).toUpperCase() + bloodType.substr(1)) + '</h4><div id="GroupBloodType' + bloodType + '">';
        ids.forEach(function(id) {
            str += '<button id="chara' + id + '" onclick="loadTab(' + id + ')" class="' + (id.toString() === currId.toString() ? "selected" : "") + '">' + getNameFromJson(allProfiles[id]) + '</button>';
        });
        str += "</div></nothing>";
    }
    document.getElementById("profileList").innerHTML = str;

    doesGroup = 4;
    sortGroupedProfiles();
    sortProfiles();
}

function groupByCompletion() { // Group by profile completion
    groupByRemoveAll();
    document.getElementById("groupCompletion").classList.add("selected");

    let str = "";
    let completions = {};
    for (const [id, json] of Object.entries(allProfiles)) {
        let count = 0;
        let max = 0;

        for (key in json) {
            if (!canJsonExport(key)) {
                continue;
            }
            let docElem = document.getElementById(key);
            if (docElem === null) {
                docElem = document.getElementsByName(key);
            }
            let container = document.getElementById(key + "Container");
            if (docElem.length === 0 || (container !== null && container.classList.contains("hidden")))
                continue;
            docElem = docElem[0];
            max++;
            if (Object.prototype.toString.call(json[key]) === '[object Array]') { // Array containing data (fetishes, diseases)
                if (json[key].length > 0) {
                    count++;
                } else {
                    let checkbox = document.getElementsByName(key + "None");
                    if (checkbox.length > 0 && checkbox[0].checked) { // The user ticked a checkbox to say that it's normal that the array is null
                        count++;
                    }
                }
            } else if (json[key] !== "") {
                count++;
            }
        }

        let percent = (count * 100 / max).toFixed(2);
        if (completions[percent] === undefined) completions[percent] = [id];
        else completions[percent].push(id);
    }
    for (const [completion, ids] of Object.entries(completions)) {
        str += '<nothing id="categoryGroupCompletion' + completion + '"><h4>' + (completion.charAt(0).toUpperCase() + completion.substr(1)) + '</h4><div id="GroupCompletion' + completion + '">';
        ids.forEach(function(id) {
            str += '<button id="chara' + id + '" onclick="loadTab(' + id + ')" class="' + (id.toString() === currId.toString() ? "selected" : "") + '">' + getNameFromJson(allProfiles[id]) + '</button>';
        });
        str += "</div></nothing>";
    }
    document.getElementById("profileList").innerHTML = str;

    doesGroup = 5;
    sortGroupedProfiles();
    sortProfilesNumber();
}
// TODO: Merge groupBy functions

/// SORT BY NUMBER

function sortProfilesNumber(id = "profileList") {
    Array.prototype.slice.call(document.getElementById(id).children, 0).sort(function(a, b) {
        let aInner = parseFloat(a.innerHTML.match(/<h4>([0-9\.]+)<\/h4>/)[1]);
        let bInner = parseFloat(b.innerHTML.match(/<h4>([0-9\.]+)<\/h4>/)[1]);
        return aInner < bInner ? 1 : -1;
    }).forEach(function(div) {
        div.parentElement.appendChild(div);
        let elem = div.id.substr(5);
        if (allProfiles[elem] !== undefined && allProfiles[elem].favorite) {
            div.classList.add("favorite");
        }
    });
}

/// SORT BY ALPHABETIC ORDER

// Order all tabs in alphabetic order
function sortProfiles(id = "profileList") {
    Array.prototype.slice.call(document.getElementById(id).children, 0).sort(function(a, b) {
        let aInner = a.innerHTML;
        let bInner = b.innerHTML;
        return aInner > bInner ? 1 : -1;
    }).forEach(function(div) {
        div.parentElement.appendChild(div);
        let elem = div.id.substr(5);
        if (allProfiles[elem] !== undefined && allProfiles[elem].favorite) {
            div.classList.add("favorite");
        }
    });
}

function sortGroupedProfiles() {
    Array.prototype.slice.call(document.getElementById("profileList").children, 0).forEach(function(e) {
        if (e.tagName === "NOTHING") {
            sortProfiles(e.id.substr(8));
        }
    })
}