function introNewProfile() {
    document.getElementById("introPopup").classList.add("hidden");
    document.getElementById("mainContent").classList.remove("hidden");
}

function introLoadProfile() {
    document.getElementById("uploadInternal").click();
    document.getElementById("introPopup").classList.add("hidden");
    document.getElementById("mainContent").classList.remove("hidden");
}