function loadRepartition() {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(function() {
        if (settings.nsfw) {
            document.getElementById("repartitionNsfw").classList.remove("hidden");
        } else {
            document.getElementById("repartitionNsfw").classList.add("hidden");
        }
    
        let races = { };
        let raceLength = 0;
    
        let genders = { male: 0, female: 0 };
        let genderLength = 0;
    
        let bloodTypes = { a: 0, b: 0, ab: 0, o: 0 };
        let bloodTypeLength = 0;
    
        let sexualities = { heterosexual: 0, homosexual: 0, bisexual: 0, asexual: 0 };
        let sexualityLength = 0;
    
        for (const [_, val] of Object.entries(allProfiles)) {
            let race = val.race;
            let gender = val.gender;
            let sexuality = val.orientation;
            let bloodType = val.bloodType;
            if (race !== "") {
                if (races[race] === undefined) races[race] = 1;
                else races[race]++;
                raceLength++;
            }
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

        let arr = [["Race", "Count"]];
        for (const [name, val] of Object.entries(races)) {
            arr.push([name, val * 100 / raceLength]);
        }
        drawChart("repartitionRace", "Races", arr);
        arr = [["Gender", "Count"]];
        for (const [name, val] of Object.entries(genders)) {
            arr.push([name, val * 100 / genderLength]);
        }
        drawChart("repartitionGender", "Genders", arr);
        arr = [["Blood types", "Count"]];
        for (const [name, val] of Object.entries(bloodTypes)) {
            arr.push([name, val * 100 / bloodTypeLength]);
        }
        drawChart("repartitionBloodType", "Blood types", arr);
        if (settings.nsfw) {
            arr = [["Sexuality", "Count"]];
            for (const [name, val] of Object.entries(sexualities)) {
                arr.push([name, val * 100 / sexualityLength]);
            }
            drawChart("repartitionSexuality", "Sexualities", arr);
        }
    });
}

function drawChart(id, name, array) {
    var data = google.visualization.arrayToDataTable(array);

    var options = {
        title: name
    };

    let chart = new google.visualization.PieChart(document.getElementById(id));

    chart.draw(data, options);
}