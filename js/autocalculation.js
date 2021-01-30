function calculateAll() {
    calculateBMI();
    calculateAge();
    Array.from(document.getElementsByClassName("colorText")).forEach(function(e) {
        calculateColorFromText(e);
    });
}

function calculateColorFromText(e) {
    if (e === undefined) e = this;
    document.getElementById(e.id + "Preview").value = e.value.startsWith("#") ? e.value : "#" + e.value;
}

function calculateColorFromPicker() {
    document.getElementById(this.id.slice(0, -7)).value = this.value;
}

// We calculate the BMI (Body Mass Index)
function calculateBMI() {
    let h = document.getElementById("height").value / 100;
    let w = document.getElementById("weight").value;

    let bmi = w / (h * h);
    if (isNaN(bmi)) {
        document.getElementById("bmi").innerHTML = "";
        document.getElementById("bmiText").innerHTML = "";
    } else {
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
}

// Age is just current date - birthday date
function calculateAge() {
    var age = new Date(Date.now() - Date.parse(document.getElementById("birthdate").value)).getUTCFullYear() - 1970;
    document.getElementById("age").innerHTML = isNaN(age) ? "" : age;
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
