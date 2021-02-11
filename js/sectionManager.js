function displaySection(id) {
    document.getElementById("buttonMainSection").classList.remove("selected");
    document.getElementById("buttonComparatorSection").classList.remove("selected");
    document.getElementById("buttonRelationshipSection").classList.remove("selected");

    document.getElementById("mainSection").classList.add("hidden");
    document.getElementById("comparatorSection").classList.add("hidden");
    document.getElementById("relationshipSection").classList.add("hidden");

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
    }
}