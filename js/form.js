function display(id) {
    let container = document.getElementById(id + "Container");
    if (container.classList.contains("hidden")) {
        container.classList.remove("hidden");
    } else {
        container.classList.add("hidden");
    }
}

function remove(current) {
    console.log(current);
    current.parentNode.remove();
}

function addHobby() {
    document.getElementById("hobbies").innerHTML += '<div class="hobby"><button onclick="remove(this)">Delete</button></div>';
}

function save() {
    let json = saveCurrent();
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