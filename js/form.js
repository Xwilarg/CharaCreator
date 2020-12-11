function display(id) {
    let container = document.getElementById(id + "Container");
    if (container.classList.contains("hidden")) {
        container.classList.remove("hidden");
    } else {
        container.classList.add("hidden");
    }
}

function save() {
    let json = new Object();
    Array.prototype.slice.call(document.getElementsByTagName('input')).forEach(e => {
        if (!e.name.endsWith("Other") && e.name.length > 0) { // We ignore "other" input field since they are associated with a select
            json[e.name] = e.value;
        }
    });
    Array.prototype.slice.call(document.getElementsByTagName('select')).forEach(e => {
        if (e.value === "other") { // "Other" answer, we check the input field
            json[e.name] = document.getElementsByName(e.name + "Other")[0].value;
        } else {
            json[e.name] = e.value;
        }
    });
    download("character.json", JSON.stringify(json));
}

function download(filename, content) {
    let file = document.createElement('a');
    file.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    file.setAttribute('download', filename);
    file.style.display = 'none';
    document.body.appendChild(file);
    file.click();
    document.body.removeChild(file);
}

function upload() {
    document.getElementById("uploadInternal").click();
}