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