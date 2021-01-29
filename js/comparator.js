function loadComparator() {
    let data = [
        ['Name', 'Age']
    ];
    for (const [_, json] of Object.entries(allProfiles)) {
        // TABLE ELEMENTS: Name, Age
        let arr = [];
        arr.push(json.lastName + " " + json.firstName);
        arr.push(new Date(Date.now() - Date.parse(json.birthdate)).getUTCFullYear() - 1970);
        data.push(arr);
    }

    new Handsontable(document.getElementById("comparationTable"), {
        data: data,
        rowHeaders: true,
        colHeaders: true,
        licenseKey: "non-commercial-and-evaluation"
    });
}