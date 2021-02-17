let comparatorTable = undefined;
let hobbyTable = undefined;

function displayComparator(id) {
    document.getElementById("buttonGeneralComparator").classList.remove("selected");
    document.getElementById("buttonHobbyComparator").classList.remove("selected");

    document.getElementById("generalComparator").classList.add("hidden");
    document.getElementById("hobbyComparator").classList.add("hidden");

    switch (id) {
        case "main":
            document.getElementById("buttonGeneralComparator").classList.add("selected");
            document.getElementById("generalComparator").classList.remove("hidden");
            break;

        case "hobby":
            document.getElementById("buttonHobbyComparator").classList.add("selected");
            document.getElementById("hobbyComparator").classList.remove("hidden");
            break;
    }
}

function loadComparator() {
    // Remove previous instance of the tables if existing
    if (comparatorTable !== undefined) {
        comparatorTable.destroy();
    }

    if (hobbyTable !== undefined) {
        hobbyTable.destroy();
    }

    let dataGeneral = [];
    let dataHobby = [];

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
        dataGeneral.push(arr);
    }

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
        dataHobby.push([hobby, names.join(", ")]);
    }

    // Create tables
    if (dataGeneral.length === 0) {
        dataGeneral.push(["", "", "", "", "", "", ""]);
    }

    if (dataHobby.length === 0) {
        dataHobby.push(["", ""]);
    }

    comparatorTable = new Handsontable(document.getElementById("generalComparationTable"), {
        licenseKey: "non-commercial-and-evaluation",
        data: dataGeneral,
        rowHeaders: true, // Row headers (1, 2, 3...)
        colHeaders: ["Name", "Age", "Height", "Weight", "BMI", "Description"], // Column headers
        editor: false, // Can't edit cells
        dropdownMenu: true, // Drop down menu to display filters
        filters: true, // Enable filters
        dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'], // Filter conditions
        columnSorting: true, // Click a column to sort it
        manualColumnMove: true // Drag and drop columns
    });

    hobbyTable = new Handsontable(document.getElementById("hobbyComparationTable"), {
        licenseKey: "non-commercial-and-evaluation",
        data: dataHobby,
        rowHeaders: true,
        colHeaders: ["Hobby", "Characters"],
        editor: false,
        dropdownMenu: true,
        filters: true,
        dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'],
        columnSorting: true
    });
}