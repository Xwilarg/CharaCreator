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
        json[e.name] = e.value;
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