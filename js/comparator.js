let comparatorTable = undefined;

function loadComparator() {
    if (comparatorTable !== undefined) { // Remove previous instance of the table if existing
        comparatorTable.destroy();
    }

    let data = [];
    for (const [_, json] of Object.entries(allProfiles)) {
        // TABLE ELEMENTS: Name, Age, BMI
        let arr = [];
        arr.push(json.lastName + " " + json.firstName);
        arr.push(new Date(Date.now() - Date.parse(json.birthdate)).getUTCFullYear() - 1970);
        arr.push((json.height / 100).toFixed(1));
        arr.push(json.weight);
        arr.push((json.weight / ((json.height / 100) * (json.height / 100))).toFixed(2));
        data.push(arr);
    }

    if (data.length === 0) {
        data.push(["", "", "", "", ""]);
    }

    comparatorTable = new Handsontable(document.getElementById("comparationTable"), {
        licenseKey: "non-commercial-and-evaluation",
        data: data,
        rowHeaders: true, // Row headers (1, 2, 3...)
        colHeaders: ["Name", "Age", "Height", "Weight", "BMI"], // Column headers
        editor: false, // Can't edit cells
        dropdownMenu: true, // Drop down menu to display filters
        filters: true, // Enable filters
        dropdownMenu: ['filter_by_condition', 'filter_by_value', 'filter_action_bar'], // Filter conditions
        columnSorting: true, // Click a column to sort it
        manualColumnMove: true // Drag and drop columns
    });
}