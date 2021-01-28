function clearCurrent() {
    // Put all input to empty value
    Array.prototype.slice.call(document.getElementsByTagName('input')).forEach(e => {
        let names = document.getElementsByName(e.name);
        if (names.length > 0) {
            names[0].value = "";
            let container = document.getElementById(e.name + "Container");
            // We put the "hidden" attribute back
            if (container !== null) {
                container.classList.remove("wasHidden");
                container.classList.add("hidden");
            }
        }
    });
    // Reset all select to default value
    Array.prototype.slice.call(document.getElementsByTagName('select')).forEach(e => {
        document.getElementsByName(e.name)[0].value = "";
    });
    calculateBMI();
    calculateAge();
}

function saveCurrent() {
    let json = new Object();
    // We go through all inputs to see if we need to save thel
    Array.prototype.slice.call(document.getElementsByTagName('input')).forEach(e => {
        if (!e.name.endsWith("Other") && e.name.length > 0) { // We ignore "other" input field since they are associated with a select
            json[e.name] = e.value;
        }
    });
    // Then we go through top down menus
    Array.prototype.slice.call(document.getElementsByTagName('select')).forEach(e => {
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
    Array.prototype.slice.call(document.getElementsByTagName('input')).forEach(e => {
        let names = document.getElementsByName(e.name);
        if (names.length > 0 && json[e.name] !== undefined) {
            names[0].value = json[e.name];
            let container = document.getElementById(e.name + "Container");
            // If the input is originally hidden in the form, we remove the "hidden" attribute
            if (names[0].value.length > 0 && container !== null) {
                container.classList.remove("hidden");
                container.classList.add("wasHidden"); // We keep track of attributes that used to be hidden
            }
        }
    });
    // Then we go through all select in the document
    Array.prototype.slice.call(document.getElementsByTagName('select')).forEach(e => {
        let arr = [];
        Array.apply(null, e.options).forEach(e => {
            arr.push(e.value);
        });
        // We check for each elements in the select, in our JSON...
        if (json[e.name] === undefined) {
        } else if (!arr.includes(json[e.name])) { // If the element in our JSON isn't in the select, that means we must put it in the "other" option
            let selectNames = document.getElementsByName(e.name + "Other");
            let names = document.getElementsByName(e.name);
            if (names.length > 0) {
                names[0].value = "other";
            }
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
            let names = document.getElementsByName(e.name);
            if (names.length > 0) {
                names[0].value = json[e.name];
            }
        }
    });
    calculateBMI();
    calculateAge();
}