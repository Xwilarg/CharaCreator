let idCount = 1; // Tab count
let currId = 0; // Current tab we are in

let allProfiles = {};

// GROUP FUNCTIONS

let doesGroup = 0;

function getNameFromJson(json) {
    let firstName = json.firstName;
    let lastName = json.lastName;

    return firstName === "" && lastName === "" ? "Empty" : lastName + " " + firstName;
}

function dontGroup() {
    document.getElementById("dontGroup").classList.add("selected");
    document.getElementById("groupFamilyName").classList.remove("selected");
    document.getElementById("groupRace").classList.remove("selected");
    document.getElementById("groupOrientation").classList.remove("selected");
    document.getElementById("groupCompletion").classList.remove("selected");

    let str = "";
    for (const [id, json] of Object.entries(allProfiles)) {
        str += '<button id="chara' + id + '" onclick="loadTab(' + id + ')" class="' + (id.toString() === currId.toString() ? "selected" : "") + '">' + getNameFromJson(json) + '</button>';
    }
    document.getElementById("profileList").innerHTML = str;

    doesGroup = 0;
    sortProfiles();
}

function groupByFamilyName() {
    document.getElementById("dontGroup").classList.remove("selected");
    document.getElementById("groupFamilyName").classList.add("selected");
    document.getElementById("groupRace").classList.remove("selected");
    document.getElementById("groupOrientation").classList.remove("selected");
    document.getElementById("groupCompletion").classList.remove("selected");

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

function groupByRace() {
    document.getElementById("dontGroup").classList.remove("selected");
    document.getElementById("groupFamilyName").classList.remove("selected");
    document.getElementById("groupRace").classList.add("selected");
    document.getElementById("groupOrientation").classList.remove("selected");
    document.getElementById("groupCompletion").classList.remove("selected");

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

function groupByOrientation() {
    document.getElementById("dontGroup").classList.remove("selected");
    document.getElementById("groupFamilyName").classList.remove("selected");
    document.getElementById("groupRace").classList.remove("selected");
    document.getElementById("groupOrientation").classList.add("selected");
    document.getElementById("groupCompletion").classList.remove("selected");

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

function groupByCompletion() {
    document.getElementById("dontGroup").classList.remove("selected");
    document.getElementById("groupFamilyName").classList.remove("selected");
    document.getElementById("groupRace").classList.remove("selected");
    document.getElementById("groupOrientation").classList.remove("selected");
    document.getElementById("groupCompletion").classList.add("selected");

    let str = "";
    let completions = {};
    for (const [id, json] of Object.entries(allProfiles)) {
        let count = 0;
        let max = 0;

        for (key in json) {
            let docElem = document.getElementById(key);
            if (docElem === null || json[key] === "" || docElem.classList.contains("hidden"))
                continue;
            max++;
            if (Object.prototype.toString.call(json[key]) === '[object Array]') {
                if (json[key].length > 0) {
                    count++;
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

    doesGroup = 4;
    sortGroupedProfiles();
    sortProfiles();
}
// TODO: Merge groupBy functions

// PROFILES FUNCTIONS

function resetProfiles() {
    document.getElementById("profileList").innerHTML = '<button id="chara0" onclick="loadTab(0)" class="selected">Empty</button>';
    idCount = 1;
    currId = 0;
    allProfiles = {};
}

// Order all tabs in alphabetic order
function sortProfiles(id = "profileList") {
    Array.prototype.slice.call(document.getElementById(id).children, 0).sort(function(a, b) {
        let aInner = a.innerHTML;
        let bInner = b.innerHTML;
        return aInner > bInner ? 1 : -1;
    }).forEach(function(div) {
        div.parentElement.appendChild(div);
    });
}

function sortGroupedProfiles() {
    Array.prototype.slice.call(document.getElementById("profileList").children, 0).forEach(function(e) {
        if (e.tagName === "NOTHING") {
            sortProfiles(e.id.substr(8));
        }
    })
}

// When the user press the "+", add a new profile
function addProfile() {
    allProfiles[currId] = saveCurrent(); // Save current profile

    // We increase id counter to new value and set new tab as selected
    document.getElementById("chara" + currId).classList.remove("selected");
    currId = idCount++;
    document.getElementById("profileList").innerHTML += '<button id="chara' + currId + '" onclick="loadTab(' + currId + ')" class="selected">Empty</button>';
    document.getElementById("chara" + currId).classList.add("selected");

    // Clear all
    clearCurrent();
}

onkeydown = function(e){
    if (e.ctrlKey && (e.key == 's' || e.key == 'S')) {
        e.preventDefault();
        save();
    }
}

function loadTab(id) {
    allProfiles[currId] = saveCurrent(); // Save current profile
    clearCurrent();
    document.getElementById("chara" + currId).classList.remove("selected");
    
    currId = id;

    document.getElementById("chara" + currId).classList.add("selected");
    loadCurrent(allProfiles[currId]);
}

function saveLoadCtor() {
    // When the user change the first or last name of a profile
    document.getElementsByName("firstName")[0].addEventListener("change", onNameChange);
    document.getElementsByName("lastName")[0].addEventListener("change", onNameChange);
}

// Clear all inputs
function clearCurrent() {
    clearCurrentInternal(document.getElementById("mainSection").childNodes);
    calculateAll();
}

function clearCurrentInternal(nodes) {
    nodes.forEach(n => {
        if (n.nodeName === "DIV" && n.id.endsWith("Array")) {
            n.innerHTML = "";
        } else {
            clearCurrentInternal(n.childNodes);
        }
        switch (n.nodeName) {
            case "INPUT": case "TEXTAREA": case "SELECT":
                n.value = "";
                let container = document.getElementById(n.name + "Container");
                // We put the "hidden" attribute back
                if (container !== null) {
                    container.classList.remove("wasHidden");
                    container.classList.add("hidden");
                }
                break;
        }
    });
}

// Convert all fields to a JSON
function saveCurrent(nodes = document.getElementById("mainSection").childNodes, json = new Object()) {
    let arr = Object.prototype.toString.call(json) === '[object Array]' ? new Object() : undefined;
    nodes.forEach(n => {
        if (n.nodeName === "DIV" && n.id.endsWith("Array")) { // Array nodes must be saved as an array
            json[n.id] = [];
            saveCurrent(n.childNodes, json[n.id]);
        } else {
            saveCurrent(n.childNodes, json);
        }
        switch (n.nodeName) {
            case "INPUT": case "TEXTAREA":
                if (n.name.length > 0 && !n.name.endsWith("Other")) { // We ignore "other" input field since they are associated with a select
                    if (arr === undefined) json[n.name] = n.value;
                    else arr[n.name] = n.value;
                }
                break;

            case "SELECT":
                if (n.value === "other") { // "Other" answer, we check the input field
                    let elem = Array.prototype.slice.call(document.getElementsByName(n.name + "Other")).filter(function(x) { return x.parentElement.id === n.id + "Container"})
                    if (arr === undefined) json[n.name] = elem[0].value;
                    else arr[n.name] = elem[0].value;
                } else {
                    if (arr === undefined) json[n.name] = n.value;
                    else arr[n.name] = n.value;
                }
                break;
        }
    });
    if (arr !== undefined && Object.values(arr).length > 0) {
        json.push(arr);
    }
    arr = undefined;
    return json;
}

// Load all fields given a JSON
function loadCurrent(json) {
    clearCurrent();
    loadCurrentInternal(json);
    calculateAll();
    onNameChange();
    doesGroup > 0 ? sortProfiles() : sortGroupedProfiles();
}

function loadCurrentInternal(json) {
    for (key in json) {
        let nodes = document.getElementsByName(key); // TODO: Don't do that on whole document
        let n;
        if (nodes.length === 0) {
            n = document.getElementById(key);
            if (n === undefined) {
                console.warn("Unknown node " + key);
                continue;
            }
        }
        else {
            n = nodes[nodes.length - 1];
        }
        if (n.nodeName === "DIV" && n.id.endsWith("Array")) { // Array nodes must be saved as an array
            switch (n.id) {
                case "likesArray":
                    let arr = json[n.id];
                    if (arr === undefined || arr.length === 0) break;
                    arr.forEach(function(e) {
                        addLike();
                        loadCurrentInternal(e);
                    });
                    break;
            }
        }
        switch (n.nodeName) {
            case "INPUT": case "TEXTAREA":
                if (n.type === "color") break;
                if (json[n.name] !== undefined) {
                    n.value = json[n.name];
                    let container = document.getElementById(n.name + "Container");
                    // If the input is originally hidden in the form, we remove the "hidden" attribute
                    if (container !== null && n.value !== "") {
                        container.classList.remove("hidden");
                        container.classList.add("wasHidden"); // We keep track of attributes that used to be hidden
                    }
                }
                break;

            case "SELECT":
                let arr = [];
                Array.apply(null, n.options).forEach(e => {
                    arr.push(e.value);
                });
                // We check for each elements in the select, in our JSON...
                if (json[n.name] === undefined) {
                } else if (!arr.includes(json[n.name].toLowerCase())) { // If the element in our JSON isn't in the select, that means we must put it in the "other" option
                    let selectNames = Array.prototype.slice.call(document.getElementsByName(n.name + "Other")).filter(function(x) { return x.parentElement.id === n.id + "Container"})
                    n.value = "other";
                    if (selectNames.length > 0) {
                        selectNames[0].value = json[n.name];
                        // We then fill the "other" input
                        let container = document.getElementById(n.id + "Container");
                        if (container !== null) {
                            container.classList.remove("hidden");
                            container.classList.add("wasHidden");
                        }
                    }
                }
                else { // If the element is in the JSON, we just put the right value
                    n.value = json[n.name].toLowerCase();
                }
                break;
        }
    }
}