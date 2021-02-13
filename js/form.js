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

let likeId = 0;
function addLike() {
    let container = document.getElementById("likesArray");
    let div = document.createElement('div');
    div.classList.add("like");
    likeId++;
    div.innerHTML = `
    <select value="" type="text" name="likeNamePart" id="likeNamePart` + likeId + `">
        <option disabled selected value> -- select an option -- </option>
        <option value="other">Other</option>
        <optgroup label="Esoteric">
            <option value="astrology">Astrology</option>
            <option value="occult">Occult</option>
            <option value="tarot">Tarot</option>
        </optgroup>
    </select>
    <br/>
    <span id="likeNamePart` + likeId + `Container" class="hidden">
        <input type="text" name="likeNamePartOther" placeholder="Name"/>
    </span>
    <br/>
    <textarea value="" type="text" name="likeNameOtherPart" placeholder="How was this hobby discovered?\nWhat does your character like in it?"></textarea>
    <br/>
    <button onclick="remove(this)">Delete</button>
    `
    // innerHtml += get rid of input value so we need to use appendChild instead
    container.appendChild(div);
    document.getElementById("likeNamePart" + likeId).addEventListener("change", function (e) {
        selectChange(e.originalTarget.id);
    });
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
                        let json = JSON.parse(fileData);
                        allProfiles[currId] = json;
                        loadCurrent(json);
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
    document.getElementById("birthdate").addEventListener("change", calculateAge);
    // Calculate color field from hex value
    Array.from(document.getElementsByClassName("colorText")).forEach(function(e) {
        e.addEventListener("change", calculateColorFromText);
    });
    Array.from(document.getElementsByClassName("colorPreview")).forEach(function(e) {
        e.addEventListener("change", calculateColorFromPicker);
    });
};