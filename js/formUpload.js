document.getElementById("uploadInternal").addEventListener('change', () => {
    let file = document.getElementById("uploadInternal").files[0];
    if (!file) return;
    let reader = new FileReader();
    reader.onload = function(val) {
        let json = JSON.parse(val.target.result);
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
    };
    reader.readAsText(file);
});

function selectChange(id) {
    if (document.getElementById(id).value === "other") {
        document.getElementById(id + "Container").classList.remove("hidden");
    } else {
        document.getElementById(id + "Container").classList.add("hidden");
    }
}

document.getElementById("gender").addEventListener("change", (e) => {
   selectChange(e.originalTarget.id);
});
document.getElementById("orientation").addEventListener("change", (e) => {
   selectChange(e.originalTarget.id);
});

function calculateBMI() {
    let h = document.getElementById("height").value / 100;
    let w = document.getElementById("weight").value;

    let bmi = w / (h * h);
    document.getElementById("bmi").innerHTML = bmi.toFixed(1);
    if (bmi !== 0) {
        let bmiText;
        if (bmi < 18.5) bmiText = "Underweight (< 18.5)";
        else if (bmi < 25) bmiText = "Normal (18.5 - 24.9)";
        else if (bmi < 30) bmiText = "Overweight (25.0 - 29.9)";
        else if (bmi < 35) bmiText = "Obese (30.0 - 34.9)";
        else bmiText = "Extremly Obese (> 35.0)";
        document.getElementById("bmiText").innerHTML = bmiText;
    }
}

function calculateAge() {
    document.getElementById("age").innerHTML = new Date(Date.now() - Date.parse(document.getElementById("birthdate").value)).getUTCFullYear() - 1970;
}

document.getElementById("height").addEventListener("change", calculateBMI);
document.getElementById("weight").addEventListener("change", calculateBMI);


document.getElementById("birthdate").addEventListener("change", calculateAge());