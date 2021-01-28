function display(id) {
    let container = document.getElementById(id + "Container");
    if (container.classList.contains("hidden")) {
        container.classList.remove("hidden");
        container.classList.add("wasHidden");
    } else {
        container.classList.add("hidden");
        container.classList.remove("wasHidden");
    }
}

function remove(current) {
    current.parentNode.remove();
}

function addHobby() {
    document.getElementById("hobbies").innerHTML += '<div class="hobby"><button onclick="remove(this)">Delete</button></div>';
}

function getName(json) {
    if (json.firstName == "" && json.lastName == "") {
        return "Empty";
    }
    return json.lastName + " " + json.firstName;
}

function save() {
    allProfiles[currId] = saveCurrent();
    let names = [];
    let zip = new JSZip();
    for (const [_, val] of Object.entries(allProfiles)) {
        let finalName = getName(val);
        let id = 0;
        while (names.includes(finalName)) {
            id++;
            finalName = getName(val) + " (" + id + ")"
        }
        names.push(finalName);
        zip.file(finalName + ".json", JSON.stringify(val));
    }
    zip.generateAsync({type:"blob"}).then(function(content) {
        saveAs(content, "CharaCreator.zip");
    });
}

// Called when we modify the value in a <select> and select "other", we need to display the "Other" input field
function selectChange(id) {
    if (document.getElementById(id).value === "other") {
        document.getElementById(id + "Container").classList.remove("hidden");
    } else {
        document.getElementById(id + "Container").classList.add("hidden");
    }
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

// Button to upload a file, call "uploadInternal" (see below)
function upload() {
    document.getElementById("uploadInternal").click();
}

function formCtor() {
    // Upload a file from the user computer and put all the values on the page
    document.getElementById("uploadInternal").addEventListener('change', () => {
        let file = document.getElementById("uploadInternal").files[0]; // Get user file
        if (!file) return;
        let reader = new FileReader();
        reader.onload = function(val) {
            let zip = new JSZip();
            zip.loadAsync(val.target.result) // Unzip
            .then(function() {
                resetProfiles();
                let isFirst = true;
                Object.keys(zip.files).forEach(function (filename) {
                    // Load all files
                    zip.files[filename].async('string').then(function (fileData) {
                        if (isFirst) {
                            isFirst = false;
                        } else {
                            addProfile();
                        }
                        loadCurrent(JSON.parse(fileData));
                    });
                });
                window.scrollTo(0, 0);
            });
        };
        reader.readAsBinaryString(file);
    });
    // Add check when a select is changed
    Array.prototype.slice.call(document.getElementsByTagName("select")).forEach(elem => {
        elem.addEventListener("change", function (e) {
            selectChange(e.originalTarget.id);
        });
    });
    // We recalculate the BMI when the user change the height or weight
    document.getElementById("height").addEventListener("change", calculateBMI);
    document.getElementById("weight").addEventListener("change", calculateBMI);
    // We recalculate the age when the user change the birthday
    document.getElementById("birthdate").addEventListener("change", calculateAge());
};