let personnalityTraits = [
    "sincerity", "fairness", "greed_avoidance", "modesty",
    "fearfulness", "anxiety", "dependence", "sentimentality",
    "social_self_esteem", "social_boldness", "sociability", "liveliness",
    "forgivingness", "gentleness", "flexibility", "patience",
    "organization", "diligence", "perfectionism", "prudence",
    "aesthetic_appreciation", "inquisitiveness", "creativity", "unconventionality",
    "altruism"
]

function isPersonnalityTrait(attribut) {
    return personnalityTraits.some((x) => attribut.startsWith(x));
}

// We consider a personnality is set if one of the trait don't have the default value of 3
function isPersonnalitySet(json) {
    for (const [_, trait] of Object.entries(personnalityTraits)) {
        if (json[trait] !== "3") return true;
    }
    return false;
}

function calculatePersonnnalityDifference(json1, json2) {
    let total = 0;
    for (const [_, trait] of Object.entries(personnalityTraits)) {
        total += Math.abs(json1[trait] - json2[trait]);
    }
    return total;
}

function personnalityCtor() {
    Array.prototype.slice.call(document.getElementsByClassName("personnality")).forEach(elem => {
        elem.addEventListener("change", function (e) {
            let value;
            switch (e.target.value) {
                case "1":
                    value = "Very Weak";
                    break;
                    
                case "2":
                    value = "Weak";
                    break;
                    
                case "3":
                    value = "Neutral";
                    break;
                    
                case "4":
                    value = "Strong";
                    break;
                    
                case "5":
                    value = "Very Strong";
                    break;
            }
            document.getElementsByName(e.target.name + "_value")[0].innerHTML = value;
        });
    });
}