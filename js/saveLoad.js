let idCount = 1; // Tab count
let currId = 0; // Current tab we are in

let allProfiles = {};

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

function loadTab(id) {
    allProfiles[currId] = saveCurrent(); // Save current profile
    clearCurrent();
    document.getElementById("chara" + currId).classList.remove("selected");
    
    currId = id;

    document.getElementById("chara" + currId).classList.add("selected");
    loadCurrent(allProfiles[currId]);
}

// Update tab name with profile first/last names
function onNameChange() {
    let firstName = document.getElementsByName("firstName")[0].value;
    let lastName = document.getElementsByName("lastName")[0].value;

    if (firstName === "" && lastName === "") {
        document.getElementById("chara" + currId).innerHTML = "Empty";
    } else {
        document.getElementById("chara" + currId).innerHTML = lastName + " " + firstName;
    }
}

function saveLoadCtor() {
    // When the user change the first or last name of a profile
    document.getElementsByName("firstName")[0].addEventListener("change", onNameChange);
    document.getElementsByName("lastName")[0].addEventListener("change", onNameChange);
}

// Clear all inputs
function clearCurrent(nodes = document.getElementById("mainSection").childNodes) {
    nodes.forEach(n => {
        clearCurrent(n.childNodes);
        switch (n.nodeName) {
            case "INPUT": case "TEXTAREA":
                n.value = "";
                break;

            case "SELECT":
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
    calculateBMI();
    calculateAge();
}

// Convert all fields to a JSON
function saveCurrent(nodes = document.getElementById("mainSection").childNodes, json = new Object()) {
    nodes.forEach(n => {
        saveCurrent(n.childNodes, json);
        switch (n.nodeName) {
            case "INPUT": case "TEXTAREA":
                if (n.name.length > 0 && !n.name.endsWith("Other")) { // We ignore "other" input field since they are associated with a select
                    json[n.name] = n.value;
                }
                break;

            case "SELECT":
                if (n.value === "other") { // "Other" answer, we check the input field
                    json[n.name] = document.getElementsByName(n.name + "Other")[0].value;
                } else {
                    json[n.name] = n.value;
                }
                break;
        }
    });
    return json;
}

// Load all fields given a JSON
function loadCurrent(json, nodes = document.getElementById("mainSection").childNodes) {
    nodes.forEach(n => {
        loadCurrent(json, n.childNodes);
        switch (n.nodeName) {
            case "INPUT": case "TEXTAREA":
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
    calculateBMI();
    calculateAge();
    onNameChange();
}