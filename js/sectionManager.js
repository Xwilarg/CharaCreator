function displaySection(id) {
    allProfiles[currId] = saveCurrent();

    document.getElementById("buttonMainSection").classList.remove("selected");
    document.getElementById("buttonComparatorSection").classList.remove("selected");
    document.getElementById("buttonRelationshipSection").classList.remove("selected");
    document.getElementById("buttonSettingsSection").classList.remove("selected");
    document.getElementById("buttonRepartitionSection").classList.remove("selected");

    document.getElementById("mainSection").classList.add("hidden");
    document.getElementById("comparatorSection").classList.add("hidden");
    document.getElementById("relationshipSection").classList.add("hidden");
    document.getElementById("settingsSection").classList.add("hidden");
    document.getElementById("repartitionSection").classList.add("hidden");

    switch (id) {
        case "main":
            document.getElementById("buttonMainSection").classList.add("selected");
            document.getElementById("mainSection").classList.remove("hidden");
            break;

        case "comparator":
            document.getElementById("buttonComparatorSection").classList.add("selected");
            document.getElementById("comparatorSection").classList.remove("hidden");
            loadComparator();
            break;

        case "relationship":
            document.getElementById("buttonRelationshipSection").classList.add("selected");
            document.getElementById("relationshipSection").classList.remove("hidden");
            loadRelationship();
            break;

        case "repartition":
            document.getElementById("buttonRepartitionSection").classList.add("selected");
            document.getElementById("repartitionSection").classList.remove("hidden");
            loadRepartition();
            break;

        case "settings":
            document.getElementById("buttonSettingsSection").classList.add("selected");
            document.getElementById("settingsSection").classList.remove("hidden");
            break;
    }
}