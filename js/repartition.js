function loadRepartition() {
    if (settings.nsfw) {
        document.getElementById("repartitionNsfw").classList.remove("hidden");
    } else {
        document.getElementById("repartitionNsfw").classList.add("hidden");
    }

    let genders = { male: 0, female: 0 };
    let genderLength = 0;

    let bloodTypes = { a: 0, b: 0, ab: 0, o: 0 };
    let bloodTypeLength = 0;

    let sexualities = { heterosexual: 0, homosexual: 0, bisexual: 0, asexual: 0 };
    let sexualityLength = 0;

    for (const [_, val] of Object.entries(allProfiles)) {
        let gender = val.gender;
        let sexuality = val.orientation;
        let bloodType = val.bloodType;
        if (gender !== "") {
            if (genders[gender] === undefined) genders[gender] = 1;
            else genders[gender]++;
            genderLength++;
        }
        if (sexuality !== "") {
            if (sexualities[sexuality] === undefined) sexualities[sexuality] = 1;
            else sexualities[sexuality]++;
            sexualityLength++;
        }
        if (bloodType !== "") {
            if (bloodTypes[bloodType] === undefined) bloodTypes[bloodType] = 1;
            else bloodTypes[bloodType]++;
            bloodTypeLength++;
        }
    }
    if (genderLength === 0) {
        genderLength = 1;
    }
    if (bloodTypeLength === 0) {
        bloodTypeLength = 1;
    }
    if (sexualityLength === 0) {
        genderLength = 1;
    }

    let str = "";
    for (const [name, val] of Object.entries(genders)) {
        str += name + ": " + (val * 100 / genderLength).toFixed(2) + "%<br/>";
    }
    document.getElementById("repartitionGender").innerHTML = str;
    str = "";
    for (const [name, val] of Object.entries(bloodTypes)) {
        str += name + ": " + (val * 100 / bloodTypeLength).toFixed(2) + "%<br/>";
    }
    document.getElementById("repartitionBloodType").innerHTML = str;
    if (settings.nsfw) {
        str = "";
        for (const [name, val] of Object.entries(sexualities)) {
            str += name + ": " + (val * 100 / sexualityLength).toFixed(2) + "%<br/>";
        }
        document.getElementById("repartitionSexuality").innerHTML = str;
    }
}