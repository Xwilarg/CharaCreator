function displaySection(id) {
    switch (id) {
        case "main":
            document.getElementById("buttonMainSection").classList.add("selected");
            document.getElementById("buttonComparatorSection").classList.remove("selected");
            document.getElementById("mainSection").classList.remove("hidden");
            document.getElementById("comparatorSection").classList.add("hidden");
            break;

        case "comparator":
            document.getElementById("buttonMainSection").classList.remove("selected");
            document.getElementById("buttonComparatorSection").classList.add("selected");
            document.getElementById("mainSection").classList.add("hidden");
            document.getElementById("comparatorSection").classList.remove("hidden");
            loadComparator();
            break;
    }
}