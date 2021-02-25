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
        if (val.isExport) { // We don't save imported data
            continue;
        }
        let finalName = getName(val);
        let id = 0;
        while (names.includes(finalName)) {
            id++;
            finalName = getName(val) + " (" + id + ")"
        }
        names.push(finalName);
        zip.file("characters/" + finalName + ".json", JSON.stringify(val));
    }
    zip.file("settings.json", JSON.stringify(settings));
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

function uploadPfp() {
    document.getElementById("uploadPfpInternal").click();
}

Object.defineProperty(String.prototype, 'hashCode', { // From https://stackoverflow.com/a/7616484
    value: function() {
        let hash = 0, i, chr;
        for (i = 0; i < this.length; i++) {
            chr   = this.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return hash;
    }
});

// Export all data
function exportData() {
    allProfiles[currId] = saveCurrent(); // Save current profile

    let toExport = []; // Everything we need to export
    var radios = document.getElementsByName('exportContent');

    Array.apply(null, radios).forEach(r => {
        if (r.checked) {
            switch (r.value) {
                case "onlyThis":
                    if (!allProfiles[currId].isExport) {
                        toExport = [allProfiles[currId]];
                    }
                    break;

                case "onlyFavorites":
                    for (const [id, json] of Object.entries(allProfiles)) {
                        if (!json.isExport && json.favorite) {
                            toExport.push(json);
                        }
                    }
                    break;

                case "everything":
                    for (const [id, json] of Object.entries(allProfiles)) {
                        if (!json.isExport) {
                            toExport.push(json);
                        }
                    }
                    break;
            }
        }
    });

    let zip = new JSZip();
    let newJson = {};
    let settings = { isExport: true };

    let toCheck = Array.apply(null, document.getElementsByName('exportField')).filter(x => x.checked).map(x => x.value);

    toExport.forEach(current => {
        console.log(toCheck);
        // For each element, we export what the player ticked
        if (toCheck.includes("firstName")) {
            newJson.firstName = current.firstName;
        }
        if (toCheck.includes("lastName")) {
            newJson.lastName = current.lastName;
        }
        if (toCheck.includes("pfp")) {
            newJson.pfp = current.pfp;
        }
        if (toCheck.includes("trivia")) {
            newJson.favoriteDrink = current.favoriteDrink.toLowerCase().hashCode().toString();
            newJson.favoriteMeal = current.favoriteMeal.toLowerCase().hashCode().toString();
            newJson.favoriteDessert = current.favoriteDessert.toLowerCase().hashCode().toString();
            newJson.favoriteSmell = current.favoriteSmell.toLowerCase().hashCode().toString();
            newJson.favoriteAnimal = current.favoriteAnimal.toLowerCase().hashCode().toString();
        }
        if (toCheck.includes("hobbies")) {
            newJson.likesArray = [];
            current.likesArray.forEach(function(e) {
                newJson.likesArray.push({ likeNamePart: e.likeNamePart.toLowerCase().hashCode().toString() });
            });
        }
        if (toCheck.includes("fetishes")) {
            newJson.fetishesArray = [];
            current.fetishesArray.forEach(function(e) {
                newJson.fetishesArray.push({ fetishNamePart: e.fetishNamePart.toLowerCase().hashCode().toString() });
            });
        }
        if (toCheck.includes("diseases")) {
            newJson.diseasesArray = [];
            current.diseasesArray.forEach(function(e) {
                newJson.diseasesArray.push({ diseaseNamePart: e.diseaseNamePart.toLowerCase().hashCode().toString() });
            });
        }
        zip.file("characters/" + getName(newJson) + ".json", JSON.stringify(newJson));
    });

    zip.file("settings.json", JSON.stringify(settings));
    zip.generateAsync({type:"blob"}).then(function(content) {
        saveAs(content, "CharaExport.zip");
    });
}

function loadZipInternal(zip, isExport) {
    if (!isExport) { // We don't reset everything when importing exported data
        resetProfiles();
    } else {
        addProfile();
    }
    let isFirst = true;
    Object.keys(zip.files).forEach(function (filename) {
        // Load all files
        if (filename === "characters/") return; // Folder
        if (filename.startsWith("characters/")) {
            zip.files[filename].async('string').then(function (fileData) {
                if (isFirst) {
                    isFirst = false;
                } else {
                    addProfile();
                }
                let json = JSON.parse(fileData);
                json.isExport = isExport;
                allProfiles[currId] = json;
                loadCurrent(json);
            });
        }
        else if (filename === "settings.json") {
            zip.files[filename].async('string').then(function (fileData) {
                let json = JSON.parse(fileData);
                for (let elem in json) {
                    if (elem === "isExport") {
                        continue;
                    }
                    let docElem = document.getElementById("settings_" + elem);
                    if (docElem === null) {
                        console.warn("Invalid setting option: " + elem);
                    } else {
                        docElem.checked = json[elem];
                        onSettingModify(docElem);
                    }
                }
            });
        }
        else {
            console.warn("Can't load " + filename);
        }
    });
    window.scrollTo(0, 0);
}

function loadZip(file) {
    let reader = new FileReader();
    reader.onload = function(val) {
        let zip = new JSZip();
        zip.loadAsync(val.target.result) // Unzip
        .then(function() {
            if (zip.files["settings.json"] !== undefined) {
                zip.files["settings.json"].async('string').then(function (fileData) {
                    loadZipInternal(zip, JSON.parse(fileData).isExport === true);
                });
            } else {
                loadZipInternal(zip, false);
            }
        });
    };
    reader.readAsBinaryString(file);
}

function formCtor() {
    // Upload a file from the user computer and put all the values on the page
    document.getElementById("uploadInternal").addEventListener('change', () => {
        let file = document.getElementById("uploadInternal").files[0]; // Get user file
        if (file) loadZip(file);
    });
    document.getElementById("uploadPfpInternal").addEventListener('change', () => {
        let file = document.getElementById("uploadPfpInternal").files[0]; // Get user file
        if (file) {
            let reader = new FileReader();
            reader.onload = function(val) {
                document.getElementsByName("pfp")[0].src = val.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    // Add check when a select is changed
    Array.prototype.slice.call(document.getElementsByTagName("select")).forEach(elem => {
        elem.addEventListener("change", function (e) {
            selectChange(e.target.id);
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