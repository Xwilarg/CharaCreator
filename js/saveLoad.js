let idCount = 1; // Tab count
let currId = 0; // Current tab we are in

let allProfiles = {};

function getNameFromJson(json) {
    let firstName = json.firstName;
    let lastName = json.lastName;

    return firstName === "" && lastName === "" ? "Empty" : lastName + " " + firstName;
}

function resetProfiles() {
    document.getElementById("profileList").innerHTML = '<button id="chara0" onclick="loadTab(0)" class="selected">Empty</button>';
    idCount = 1;
    currId = 0;
    allProfiles = {};
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
    // When clearing, we hide the quizz
    document.getElementById("hexacoQuizzContainer").classList.add("hidden");

    clearCurrentInternal(document.getElementById("mainSection").childNodes);
    calculateAll();
}

function clearCurrentInternal(nodes) {
    nodes.forEach(n => {
        if (n.name !== undefined && n.name.startsWith("export")) {
            return;
        }
        if (n.nodeName === "DIV" && n.id.endsWith("Array")) {
            n.innerHTML = "";
        } else {
            clearCurrentInternal(n.childNodes);
        }
        switch (n.nodeName) {
            case "IMG":
                n.src = "";
                break;

            case "INPUT": case "TEXTAREA": case "SELECT":
                if (n.type === "checkbox") {
                    n.checked = false;
                } else if (n.type === "range") {
                    n.value = "3";
                    n.dispatchEvent(new Event("change"));
                } else {
                    n.value = "";
                    let container = document.getElementById(n.name + "Container");
                    // We put the "hidden" attribute back
                    if (container !== null) {
                        container.classList.remove("wasHidden");
                        container.classList.add("hidden");
                    }
                }
                break;
        }
    });
}

// Convert all fields to a JSON
function saveCurrent(nodes = document.getElementById("mainSection").childNodes, json = new Object()) {
    let arr = Object.prototype.toString.call(json) === '[object Array]' ? new Object() : undefined;
    nodes.forEach(n => {
        if (n.name !== undefined && n.name.startsWith("export")) {
            return;
        }
        if (n.nodeName === "DIV" && n.id.endsWith("Array")) { // Array nodes must be saved as an array
            json[n.id] = [];
            saveCurrent(n.childNodes, json[n.id]);
        } else {
            saveCurrent(n.childNodes, json);
        }
        switch (n.nodeName) {
            case "IMG":
                if (arr === undefined) json[n.name] = n.src;
                else arr[n.name] = n.src;
                break;

            case "INPUT":
                if (n.type === "checkbox") {
                    if (arr === undefined) json[n.name] = n.checked;
                    else arr[n.name] = n.checked;
                    if (n.name === "favorite") {
                        if (n.checked) {
                            document.getElementById("chara" + currId).classList.add("favorite");
                        } else {
                            document.getElementById("chara" + currId).classList.remove("favorite");
                        }
                    }
                    break;
                }

            case "TEXTAREA":
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
    if (doesGroup === 5) {
        sortProfilesNumber();
    } else if (doesGroup > 0) {
        sortProfiles();
    } else {
        sortGroupedProfiles();
    }
}

function loadCurrentInternal(json) {
    let arr;
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
        if (n == null) {
            console.warn("Invalid JSON element: " + key);
            continue;
        }
        if (n.nodeName === "DIV" && n.id.endsWith("Array")) { // Array nodes must be saved as an array
            switch (n.id) {
                case "likesArray":
                    arr = json[n.id];
                    if (arr === undefined || arr.length === 0) break;
                    arr.forEach(function(e) {
                        addLike();
                        loadCurrentInternal(e);
                    });
                    break;

                case "fetishesArray":
                    arr = json[n.id];
                    if (arr === undefined || arr.length === 0) break;
                    arr.forEach(function(e) {
                        addFetish();
                        loadCurrentInternal(e);
                    });
                    break;

                case "diseasesArray":
                    arr = json[n.id];
                    if (arr === undefined || arr.length === 0) break;
                    arr.forEach(function(e) {
                        addDisease();
                        loadCurrentInternal(e);
                    });
                    break;

                case "phobiasArray":
                    arr = json[n.id];
                    if (arr === undefined || arr.length === 0) break;
                    arr.forEach(function(e) {
                        addPhobia();
                        loadCurrentInternal(e);
                    });
                    break;
            }
        }
        switch (n.nodeName) {
            case "IMG":
                n.src = json[n.name];
                break;

            case "INPUT": case "TEXTAREA":
                if (n.type === "color") break;
                if (n.type === "checkbox") {
                    n.checked = json[n.name];
                    break;
                }
                if (json[n.name] !== undefined) {
                    n.value = json[n.name];
                    let container = document.getElementById(n.name + "Container");
                    // If the input is originally hidden in the form, we remove the "hidden" attribute
                    if (container !== null && n.value !== "") {
                        container.classList.remove("hidden");
                        container.classList.add("wasHidden"); // We keep track of attributes that used to be hidden
                    }
                }
                if (n.type === "range") {
                    n.dispatchEvent(new Event("change")); // Update the description of the slider
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