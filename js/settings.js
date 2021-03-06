let settings = {
    nsfw: false
}

function onSettingModify(e) {
    settings[e.name] = e.checked;
    switch (e.name) {
        case "nsfw": // NSFW sexuality related options
            if (e.checked) {
                document.getElementById("nsfwEnabled").classList.remove("hidden");
                document.getElementById("nsfwDisabled").classList.add("hidden");
                document.getElementById("buttonFetishComparator").classList.remove("hidden");
            } else {
                document.getElementById("nsfwEnabled").classList.add("hidden");
                document.getElementById("nsfwDisabled").classList.remove("hidden");
                document.getElementById("buttonFetishComparator").classList.add("hidden");
            }
            break;
    }
}

function settingsCtor() {
    Array.prototype.slice.call(document.getElementsByTagName("input")).forEach(elem => {
        if (elem.id.startsWith("settings_")) {
            elem.addEventListener("change", function (e) {
                onSettingModify(e.target);
            });
        }
    });
}