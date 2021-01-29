function loadComparator() {
    let str = "";
    for (const [_, json] of Object.entries(allProfiles)) {
        // TABLE ELEMENTS: Name, Age
        str += "<tr>";
        str += "<th>" + json.lastName + " " + json.firstName + "</th>";
        str += "<th>" + (new Date(Date.now() - Date.parse(json.birthdate)).getUTCFullYear() - 1970) + "</th>"
        str += "</tr>";
    }
    document.getElementById("mainTable").innerHTML = str;
}