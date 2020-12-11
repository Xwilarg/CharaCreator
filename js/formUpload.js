document.getElementById("uploadInternal").addEventListener('change', () => {
    let file = document.getElementById("uploadInternal").files[0];
    if (!file) return;
    let reader = new FileReader();
    reader.onload = function(val) {
        let json = JSON.parse(val.target.result);
        Array.prototype.slice.call(document.getElementsByTagName('input')).forEach(e => {
            let names = document.getElementsByName(e.name);
            if (names.length > 0) {
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
            if (!arr.includes(json[e.name])) {
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
    };
    reader.readAsText(file);
});

document.getElementById("gender").addEventListener("change", () => {
    if (document.getElementById("gender").value === "other") {
        document.getElementById("genderContainer").classList.remove("hidden");
    } else {
        document.getElementById("genderContainer").classList.add("hidden");
    }
})