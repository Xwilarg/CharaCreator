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

function clearCurrent() {
    // Put all input to empty value
    Array.prototype.slice.call(document.getElementById("mainData").getElementsByTagName('input')).forEach(e => {
        e.value = "";
        let container = document.getElementById(e.name + "Container");
        // We put the "hidden" attribute back
        if (container !== null) {
            container.classList.remove("wasHidden");
            container.classList.add("hidden");
        }
    });
    // Reset all select to default value
    Array.prototype.slice.call(document.getElementById("mainData").getElementsByTagName('select')).forEach(e => {
        e.value = "";
    });
    Array.prototype.slice.call(document.getElementById("mainData").getElementsByTagName('textarea')).forEach(e => {
        e.value = "";
    });
    calculateBMI();
    calculateAge();
}

function saveCurrent() {
    let json = new Object();
    // We go through all inputs to see if we need to save thel
    Array.prototype.slice.call(document.getElementById("mainData").getElementsByTagName('input')).forEach(e => {
        if (!e.name.endsWith("Other") && e.name.length > 0) { // We ignore "other" input field since they are associated with a select
            json[e.name] = e.value;
        }
    });
    Array.prototype.slice.call(document.getElementById("mainData").getElementsByTagName('textarea')).forEach(e => {
        if (!e.name.endsWith("Other") && e.name.length > 0) {
            json[e.name] = e.value;
        }
    });
    // Then we go through top down menus
    Array.prototype.slice.call(document.getElementById("mainData").getElementsByTagName('select')).forEach(e => {
        if (e.value === "other") { // "Other" answer, we check the input field
            json[e.name] = document.getElementsByName(e.name + "Other")[0].value;
        } else {
            json[e.name] = e.value;
        }
    });
    return json;
}

function loadCurrent(json) {
    // For each input in the document, we see if we have an element with the same name in our JSON
    Array.prototype.slice.call(document.getElementById("mainData").getElementsByTagName('input')).forEach(e => {
        if (json[e.name] !== undefined) {
            e.value = json[e.name];
            let container = document.getElementById(e.name + "Container");
            // If the input is originally hidden in the form, we remove the "hidden" attribute
            if (container !== null && e.value !== "") {
                container.classList.remove("hidden");
                container.classList.add("wasHidden"); // We keep track of attributes that used to be hidden
            }
        }
    });
    Array.prototype.slice.call(document.getElementById("mainData").getElementsByTagName('textarea')).forEach(e => {
        if (json[e.name] !== undefined) {
            e.value = json[e.name];
        }
    });
    // Then we go through all select in the document
    Array.prototype.slice.call(document.getElementById("mainData").getElementsByTagName('select')).forEach(e => {
        let arr = [];
        Array.apply(null, e.options).forEach(e => {
            arr.push(e.value);
        });
        // We check for each elements in the select, in our JSON...
        if (json[e.name] === undefined) {
        } else if (!arr.includes(json[e.name])) { // If the element in our JSON isn't in the select, that means we must put it in the "other" option
            let selectNames = document.getElementsByName(e.name + "Other");
            e.value = "other";
            if (selectNames.length > 0) {
                selectNames[0].value = json[e.name];
                // We then fill the "other" input
                let container = document.getElementById(e.name + "Container");
                if (container !== null) {
                    container.classList.remove("hidden");
                    container.classList.add("wasHidden");
                }
            }
        }
        else { // If the element is in the JSON, we just put the right value
            e.value = json[e.name];
        }
    });
    calculateBMI();
    calculateAge();
    onNameChange();
}