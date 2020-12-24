function saveCurrent() {
    let json = new Object();
    Array.prototype.slice.call(document.getElementsByTagName('input')).forEach(e => {
        if (!e.name.endsWith("Other") && e.name.length > 0) { // We ignore "other" input field since they are associated with a select
            json[e.name] = e.value;
        }
    });
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
    Array.prototype.slice.call(document.getElementsByTagName('input')).forEach(e => {
        let names = document.getElementsByName(e.name);
        if (names.length > 0 && json[e.name] !== undefined) {
            names[0].value = json[e.name];
            let container = document.getElementById(e.name + "Container");
            if (names[0].value.length > 0 && container !== null) {
                container.classList.remove("hidden");
            }
        }
    });
    Array.prototype.slice.call(document.getElementsByTagName('select')).forEach(e => {
        let arr = [];
        Array.apply(null, e.options).forEach(e => {
            arr.push(e.value)
        });
        if (json[e.name] === undefined) {

        } else if (!arr.includes(json[e.name])) {
            console.log(e.name);
            let selectNames = document.getElementsByName(e.name + "Other");
            let names = document.getElementsByName(e.name);
            if (names.length > 0) {
                names[0].value = "other";
            }
            if (selectNames.length > 0) {
                selectNames[0].value = json[e.name];
                let container = document.getElementById(e.name + "Container");
                if (container !== null) {
                    container.classList.remove("hidden");
                }
            }
        }
        else {
            let names = document.getElementsByName(e.name);
            if (names.length > 0) {
                names[0].value = json[e.name];
            }
        }
    });
    calculateBMI();
    calculateAge();
}