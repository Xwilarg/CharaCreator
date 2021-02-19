let comparatorTable = undefined;
let hobbyTable = undefined;
let fetishTable = undefined;

let last = "main";

function loadComparator() {
    displayComparator(last);
}

function displayComparator(id) {
    document.getElementById("buttonGeneralComparator").classList.remove("selected");
    document.getElementById("buttonHobbyComparator").classList.remove("selected");
    document.getElementById("buttonFetishComparator").classList.remove("selected");

    document.getElementById("generalComparationTable").classList.add("hidden");
    document.getElementById("hobbyComparationTable").classList.add("hidden");
    document.getElementById("fetishComparationTable").classList.add("hidden");

    switch (id) {
        case "main":
            document.getElementById("buttonGeneralComparator").classList.add("selected");
            document.getElementById("generalComparationTable").classList.remove("hidden");
            last = "main";
            loadComparatorMain();
            break;

        case "hobby":
            document.getElementById("buttonHobbyComparator").classList.add("selected");
            document.getElementById("hobbyComparationTable").classList.remove("hidden");
            last = "hobby";
            loadComparatorHobby();
            break;

        case "fetish":
            document.getElementById("buttonFetishComparator").classList.add("selected");
            document.getElementById("fetishComparationTable").classList.remove("hidden");
            last = "fetish";
            loadComparatorFetish();
            break;
    }
}

function loadComparatorMain() {
    if (comparatorTable !== undefined) {
        comparatorTable.destroy();
    }

    let data = [];

    // GENERAL ELEMENTS: Name, Age, Height, Weight, BMI, Description
    for (const [_, json] of Object.entries(allProfiles)) {
        let arr = [];
        arr.push(getName(json));
        arr.push(new Date(Date.now() - Date.parse(json.birthdate)).getUTCFullYear() - 1970);
        arr.push(json.height);
        arr.push(json.weight);
        let bmi = (json.weight / ((json.height / 100) * (json.height / 100))).toFixed(2);
        arr.push(isNaN(bmi) ? "" : bmi);
        arr.push(json.shortDescription);
        data.push(arr);
    }

    if (data.length === 0) {
        data.push(["", "", "", "", "", ""]);
    }

    comparatorTable = new Handsontable(document.getElementById("generalComparationTable"), {
        licenseKey: "non-commercial-and-evaluation",
        data: data,
        rowHeaders: true, // Row headers (1, 2, 3...)
        colHeaders: ["Name", "Age", "Height", "Weight", "BMI", "Description"], // Column headers
        editor: false, // Can't edit cells
        dropdownMenu: true, // Drop down menu to display filters
        filters: true, // Enable filters
        dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'], // Filter conditions
        columnSorting: true, // Click a column to sort it
        manualColumnMove: true // Drag and drop columns
    });
}

function loadComparatorHobby() {
    if (hobbyTable !== undefined) {
        hobbyTable.destroy();
    }

    let data = [];

    // HOBBY ELEMENTS: Hobby name, all names
    let hobbies = {};
    for (const [_, json] of Object.entries(allProfiles)) {
        if (json.likesArray !== undefined) {
            json.likesArray.forEach(e => {
                if (hobbies[e.likeNamePart] === undefined) {
                    hobbies[e.likeNamePart] = [ getName(json) ];
                } else {
                    hobbies[e.likeNamePart].push(getName(json));
                }
            });
        }
    }

    for (const [hobby, names] of Object.entries(hobbies)) {
        data.push([hobby, names.join(", ")]);
    }

    if (data.length === 0) {
        data.push(["", ""]);
    }

    hobbyTable = new Handsontable(document.getElementById("hobbyComparationTable"), {
        licenseKey: "non-commercial-and-evaluation",
        data: data,
        rowHeaders: true,
        colHeaders: ["Hobby", "Characters"],
        editor: false,
        dropdownMenu: true,
        filters: true,
        dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'],
        columnSorting: true
    });
}

function loadComparatorFetish() {
    if (fetishTable !== undefined) {
        fetishTable.destroy();
    }

    let data = [];

    // FETISH ELEMENTS: Fetish name, all names
    let fetishes = {};
    for (const [_, json] of Object.entries(allProfiles)) {
        if (json.fetishesArray !== undefined) {
            json.fetishesArray.forEach(e => {
                if (fetishes[e.fetishNamePart] === undefined) {
                    fetishes[e.fetishNamePart] = [ getName(json) ];
                } else {
                    fetishes[e.fetishNamePart].push(getName(json));
                }
            });
        }
    }

    for (const [hobby, names] of Object.entries(fetishes)) {
        data.push([hobby, names.join(", ")]);
    }

    if (data.length === 0) {
        data.push(["", ""]);
    }

    fetishTable = new Handsontable(document.getElementById("fetishComparationTable"), {
        licenseKey: "non-commercial-and-evaluation",
        data: data,
        rowHeaders: true,
        colHeaders: ["Fetish", "Characters"],
        editor: false,
        dropdownMenu: true,
        filters: true,
        dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'],
        columnSorting: true
    });
}