let comparatorTable = undefined;

let last = "main";

function comparatorCtor() {
    let str = "";
    for (const [_, trait] of Object.entries(personnalityTraits)) {
        str += "<h4>" + trait + "</h3>";
        str += '<div id="comparator_' + trait + '"></div>'
    }
    document.getElementById("personnalityComparationTable").innerHTML = str;
}

function loadComparator() {
    displayComparator(last);

}

function displayComparator(id) {
    last = id;
    document.getElementById("buttonGeneralComparator").classList.remove("selected");
    document.getElementById("buttonPersonnalityComparator").classList.remove("selected");
    document.getElementById("buttonHobbyComparator").classList.remove("selected");
    document.getElementById("buttonFetishComparator").classList.remove("selected");
    document.getElementById("buttonDiseaseComparator").classList.remove("selected");
    document.getElementById("buttonPhobiaComparator").classList.remove("selected");

    document.getElementById("generalComparationTable").classList.add("hidden");
    document.getElementById("arrayComparationTable").classList.add("hidden");
    document.getElementById("personnalityComparationTable").classList.add("hidden");

    switch (id) {
        case "main":
            document.getElementById("buttonGeneralComparator").classList.add("selected");
            document.getElementById("generalComparationTable").classList.remove("hidden");
            loadComparatorMain();
            break;

        case "personnality":
            document.getElementById("buttonPersonnalityComparator").classList.add("selected");
            document.getElementById("personnalityComparationTable").classList.remove("hidden");
            loadComparatorPersonnality();
            break;

        case "hobby":
            document.getElementById("buttonHobbyComparator").classList.add("selected");
            document.getElementById("arrayComparationTable").classList.remove("hidden");
            loadComparatorInternal("likesArray", "likeNamePart");
            break;

        case "fetish":
            document.getElementById("buttonFetishComparator").classList.add("selected");
            document.getElementById("arrayComparationTable").classList.remove("hidden");
            loadComparatorInternal("fetishesArray", "fetishNamePart");
            break;

        case "disease":
            document.getElementById("buttonDiseaseComparator").classList.add("selected");
            document.getElementById("arrayComparationTable").classList.remove("hidden");
            loadComparatorInternal("diseasesArray", "diseaseNamePart");
            break;

        case "phobia":
            document.getElementById("buttonPhobiaComparator").classList.add("selected");
            document.getElementById("arrayComparationTable").classList.remove("hidden");
            loadComparatorInternal("phobiasArray", "phobiaNamePart");
            break;
    }
}

let personnalityTables = [];
function loadComparatorPersonnality() {
    for (const [_, table] of Object.entries(personnalityTables)) {
        table.destroy();
    }
    personnalityTables = [];

    let profiles = [];
    for (const [_, json] of Object.entries(allProfiles)) {
        if (isPersonnalitySet(json)) {
            profiles.push(json);
        }
    }

    for (const [_, trait] of Object.entries(personnalityTraits)) {
        let data = [];

        for (const [_, json] of Object.entries(profiles)) {
            let arr = [];
            arr.push(getName(json));
            let p = getPersonnality(json);
            arr.push(p[trait]);
            data.push(arr);
        }

        if (data.length === 0) {
            data.push(["", "", "", "", "", "", ""]);
        }

        personnalityTables.push(new Handsontable(document.getElementById("comparator_" + trait), {
            licenseKey: "non-commercial-and-evaluation",
            data: data,
            rowHeaders: true, // Row headers (1, 2, 3...)
            colHeaders: ["Name", "Score"], // Column headers
            editor: false, // Can't edit cells
            dropdownMenu: true, // Drop down menu to display filters
            filters: true, // Enable filters
            dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'], // Filter conditions
            columnSorting: {
                initialConfig: {
                    column: 1,
                    sortOrder: 'desc'
                }
            },
            copyPaste: false,
            fillHandle: false
        }));
    }
}

function loadComparatorMain() {
    if (comparatorTable !== undefined) {
        comparatorTable.destroy();
    }

    let data = [];

    // GENERAL ELEMENTS: Name, Age, Height, Weight, BMI, Blood type, Description
    for (const [_, json] of Object.entries(allProfiles)) {
        let arr = [];
        arr.push(getName(json));
        arr.push(new Date(Date.now() - Date.parse(json.birthdate)).getUTCFullYear() - 1970);
        arr.push(json.height);
        arr.push(json.weight);
        let bmi = (json.weight / ((json.height / 100) * (json.height / 100))).toFixed(2);
        arr.push(isNaN(bmi) ? "" : bmi);
        arr.push(json.bloodType);
        arr.push(json.shortDescription);
        data.push(arr);
    }

    if (data.length === 0) {
        data.push(["", "", "", "", "", "", ""]);
    }

    comparatorTable = new Handsontable(document.getElementById("generalComparationTable"), {
        licenseKey: "non-commercial-and-evaluation",
        data: data,
        rowHeaders: true, // Row headers (1, 2, 3...)
        colHeaders: ["Name", "Age", "Height", "Weight", "BMI", "Blood Type", "Description"], // Column headers
        editor: false, // Can't edit cells
        dropdownMenu: true, // Drop down menu to display filters
        filters: true, // Enable filters
        dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'], // Filter conditions
        columnSorting: true, // Click a column to sort it
        manualColumnMove: true, // Drag and drop columns
        copyPaste: false,
        fillHandle: false
    });
}

function loadComparatorInternal(arrayName, partName) {
    // HOBBY ELEMENTS: Hobby name, all names
    let hobbies = {};
    for (const [_, json] of Object.entries(allProfiles)) {
        if (json[arrayName] !== undefined) {
            json[arrayName].forEach(e => {
                if (hobbies[e[partName]] === undefined) {
                    hobbies[e[partName]] = [ getName(json) ];
                } else {
                    hobbies[e[partName]].push(getName(json));
                }
            });
        }
    }

    let conversion = [];
    for (const [a, b] of Object.entries(hobbies)) {
        conversion.push([a.toLowerCase().replaceAll('_', ' '), b]);
    }

    conversion.sort(function(a, b) {
        return a[0] < b[0] ? -1 : 1;
    })

    let str = "";
    for (const c of conversion) {
        c[1].sort();
        str += '<div class="comparatorCategory"><h3>' + c[0] + '</h3>' + c[1].join("<br/>") + '</div>';
    }
    document.getElementById("arrayComparationTable").innerHTML = str;
}