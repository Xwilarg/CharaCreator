let idCount = 1; // Tab count
let currId = 0; // Current tab we are in

let allProfiles = {};

// GROUP FUNCTIONS

let doesGroup = false;

function getNameFromJson(json) {
    let firstName = json.firstName;
    let lastName = json.lastName;

    return firstName === "" && lastName === "" ? "Empty" : lastName + " " + firstName;
}

function dontGroup() {
    document.getElementById("dontGroup").classList.add("selected");
    document.getElementById("groupFamilyName").classList.remove("selected");
    document.getElementById("groupRace").classList.remove("selected");

    let str = "";
    for (const [id, json] of Object.entries(allProfiles)) {
        str += '<button id="chara' + id + '" onclick="loadTab(' + id + ')" class="' + (id.toString() === currId.toString() ? "selected" : "") + '">' + getNameFromJson(json) + '</button>';
    }
    document.getElementById("profileList").innerHTML = str;

    doesGroup = false;
    sortProfiles();
}

function groupByFamilyName() {
    document.getElementById("dontGroup").classList.remove("selected");
    document.getElementById("groupFamilyName").classList.add("selected");
    document.getElementById("groupRace").classList.remove("selected");

    let str = "";
    let names = {};
    for (const [id, json] of Object.entries(allProfiles)) {
        if (names[json.lastName] === undefined) names[json.lastName] = [id];
        else names[json.lastName].push(id);
    }
    for (const [lastName, ids] of Object.entries(names)) {
        str += '<h4>' + lastName + '</h4><div id="' + lastName + '">';
        ids.forEach(function(id) {
            let name = allProfiles[id].firstName;
            str += '<button id="chara' + id + '" onclick="loadTab(' + id + ')" class="' + (id.toString() === currId.toString() ? "selected" : "") + '">' + (name === "" ? "Empty" : name) + '</button>';
        });
        str += "</div>";
    }
    document.getElementById("profileList").innerHTML = str;

    doesGroup = true;
    sortGroupedProfiles();
}

function groupByRace() {
    document.getElementById("dontGroup").classList.remove("selected");
    document.getElementById("groupFamilyName").classList.remove("selected");
    document.getElementById("groupRace").classList.add("selected");

    let str = "";
    let races = {};
    for (const [id, json] of Object.entries(allProfiles)) {
        if (races[json.race] === undefined) races[json.race] = [id];
        else races[json.race].push(id);
    }
    for (const [race, ids] of Object.entries(races)) {
        str += '<h4>' + race + '</h4><div id="' + race + '">';
        ids.forEach(function(id) {
            str += '<button id="chara' + id + '" onclick="loadTab(' + id + ')" class="' + (id.toString() === currId.toString() ? "selected" : "") + '">' + getNameFromJson(allProfiles[id]) + '</button>';
        });
        str += "</div>";
    }
    document.getElementById("profileList").innerHTML = str;

    doesGroup = true;
    sortGroupedProfiles();
}

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
        if (e.tagName === "DIV") {
            sortProfiles(e.id);
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
    nodes.forEach(n => {
        let arr = Object.prototype.toString.call(json) === '[object Array]' ? new Object() : undefined;
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
                    if (arr === undefined) json[n.name] = document.getElementsByName(n.name + "Other")[0].value;
                    else arr[n.name] = document.getElementsByName(n.name + "Other")[0].value;
                } else {
                    if (arr === undefined) json[n.name] = n.value;
                    else arr[n.name] = n.value;
                }
                break;
        }
        if (arr !== undefined && Object.values(arr).length > 0) {
            json.push(arr);
        }
        arr = undefined;
    });
    return json;
}

// Load all fields given a JSON
function loadCurrent(json) {
    loadCurrentInternal(json, document.getElementById("mainSection").childNodes);
    calculateAll();
    onNameChange();
    doesGroup === false ? sortProfiles() : sortGroupedProfiles();
}

function loadCurrentInternal(json, nodes) {
    nodes.forEach(n => {
        if (n.nodeName === "DIV" && n.id.endsWith("Array")) { // Array nodes must be saved as an array
            switch (n.id) {
                case "likesArray":
                    let arr = json[n.id];
                    if (arr === undefined || arr.length === 0) break;
                    arr.forEach(function(e) {
                        addLike();
                        loadCurrentInternal(e, n.childNodes);
                    });
                    break;
            }
        } else {
            loadCurrentInternal(json, n.childNodes);
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
                } else if (!arr.includes(json[n.name])) { // If the element in our JSON isn't in the select, that means we must put it in the "other" option
                    let selectNames = document.getElementsByName(n.name + "Other");
                    n.value = "other";
                    if (selectNames.length > 0) {
                        selectNames[0].value = json[n.name];
                        // We then fill the "other" input
                        let container = document.getElementById(n.name + "Container");
                        if (container !== null) {
                            container.classList.remove("hidden");
                            container.classList.add("wasHidden");
                        }
                    }
                }
                else { // If the element is in the JSON, we just put the right value
                    n.value = json[n.name];
                }
                break;
        }
    });
}