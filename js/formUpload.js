document.getElementById("uploadInternal").addEventListener('change', (e) => {
    let file = document.getElementById("uploadInternal").files[0];
    if (!file) return;
    let reader = new FileReader();
    reader.onload = function(e) {
        let json = JSON.parse(e.target.result);
        Array.prototype.slice.call(document.getElementsByTagName('input')).forEach(e => {
            let names = document.getElementsByName(e.name);
            if (names.length > 0) {
                names[0].value = json[e.name];
            }
        });
    };
    reader.readAsText(file);
});