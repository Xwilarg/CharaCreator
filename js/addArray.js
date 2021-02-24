let likeId = 0;
function addLike() {
    let container = document.getElementById("likesArray");
    let div = document.createElement('div');
    div.classList.add("like");
    likeId++;
    div.innerHTML = `
    <select value="" type="text" name="likeNamePart" id="likeNamePart` + likeId + `">
        <option disabled selected value> -- select an option -- </option>
        <option value="other">Other</option>
        <optgroup label="Animal">
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
            <option value="fish">Fish</option>
            <option value="insect">Insect</option>
            <option value="parrot">Parrot</option>
            <option value="snake">Snake</option>
        </optgroup>
        <optgroup label="Art">
            <option value="acting">Acting</option>
            <option value="calligraphy">Calligraphy</option>
            <option value="cinephile">Cinephile</option>
            <option value="calligraphy">Dancing</option>
            <option value="drawing">Drawing</option>
            <option value="gardening">Gardening</option>
            <option value="language_learning">Language learning</option>
            <option value="language_learning">Listening Music</option>
            <option value="movie_making">Moving making</option>
            <option value="painting">Painting</option>
            <option value="photography">Photography</option>
            <option value="reading">Reading</option>
            <option value="writing">Writing</option>
        </optgroup>
        <optgroup label="Book and Movie Genres">
            <option value="genre_biography">Biography Genre</option>
            <option value="genre_detective">Detective Genre</option>
            <option value="genre_fantasy">Fantasy Genre</option>
            <option value="genre_horror">Horror Genre</option>
            <option value="genre_humour">Humour Genre</option>
            <option value="genre_journalism">Journalism Genre</option>
            <option value="genre_mythology">Mythology Genre</option>
            <option value="genre_realistic_fantasy">Realistic Fiction Genre</option>
            <option value="genre_romance">Romance Genre</option>
            <option value="genre_satire">Satire Genre</option>
            <option value="genre_scientifical_articles">Scientifical Articles Genre</option>
            <option value="genre_tragedy">Tragedy Genre</option>
        </optgroup>
        <optgroup label="Craft">
            <option value="knitting">Knitting</option>
            <option value="pottery">Pottery</option>
            <option value="origami">Origami</option>
            <option value="sewing">Sewing</option>
            <option value="sculpting">Sculpting</option>
        </optgroup>
        <optgroup label="Collections">
            <option value="philately">Philately</option>
            <option value="numinastics">Numismatics</option>
        </optgroup>
        <optgroup label="Cooking">
            <option value="cooking_molecular">Cooking (Molecular)</option>
            <option value="cooking_traditional">Cooking (Traditional)</option>
        </optgroup>
        <optgroup label="Esoteric">
            <option value="astrology">Astrology</option>
            <option value="occult">Occult</option>
            <option value="tarot">Tarot</option>
        </optgroup>
        <optgroup label="Instruments">
            <option value="flute">Flute</option>
            <option value="guitar">Guitar</option>
            <option value="harmonica">Harmonica</option>
            <option value="piano">Piano</option>
            <option value="singing">Singing</option>
            <option value="violon">Violon</option>
        </optgroup>
        <optgroup label="Music">
            <option value="disco">Disco</option>
            <option value="gospel">Gospel</option>
            <option value="jazz">Jazz</option>
            <option value="rock">Rock</option>
            <option value="metal">Metal</option>
        </optgroup>
        <optgroup label="Science">
            <option value="astronomy">Astronomy</option>
            <option value="archeology">Archeology</option>
            <option value="botany">Botany</option>
            <option value="chemistry">Chemistry</option>
            <option value="geology">Geology</option>
            <option value="humanBiology">Human biology</option>
            <option value="it_security">IT (Security)</option>
            <option value="it_software">IT (Software)</option>
            <option value="it_videoGames">IT (Video Games)</option>
            <option value="it_web">IT (Web)</option>
            <option value="mechanics">Mechanics</option>
            <option value="zoology">Zoology</option>
        </optgroup>
        <optgroup label="Sport">
            <option value="airsoft">Airsoft</option>
            <option value="archery">Archery</option>
            <option value="boxing">Boxing</option>
            <option value="baseball">Baseball</option>
            <option value="fencing">Fencing</option>
            <option value="fishing">Fishing</option>
            <option value="football">Football</option>
            <option value="horseback_riding">Horseback riding</option>
            <option value="rudby">Rudby</option>
            <option value="running">Running</option>
            <option value="swimming">Swimming</option>
            <option value="tennis">Tennis</option>
            <option value="volleyball">Volleyball</option>
            <option value="weight_training">Weight training</option>
        </optgroup>
        <optgroup label="Traditional games">
            <option value="board_games">Board games</option>
            <option value="card_games">Card games</option>
            <option value="chess">Chess</option>
            <option value="mahjong">Mahjong</option>
            <option value="paper_rpg">Paper role playing games</option>
        </optgroup>
        <optgroup label="Video games">
            <option value="fps">FPS</option>
            <option value="mmo">MMO</option>
            <option value="rpg">RPG</option>
            <option value="rts">RTS</option>
            <option value="rythm_games">Rythm games</option>
        </optgroup>
    </select>
    <br/>
    <span id="likeNamePart` + likeId + `Container" class="hidden">
        <input type="text" name="likeNamePartOther" placeholder="Name"/>
    </span>
    <br/>
    <textarea value="" type="text" name="likeNameOtherPart" placeholder="How was this hobby discovered?\nWhat does your character like in it?"></textarea>
    <br/>
    <button onclick="remove(this)">Delete</button>
    `
    // innerHtml += get rid of input value so we need to use appendChild instead
    container.appendChild(div);
    document.getElementById("likeNamePart" + likeId).addEventListener("change", function (e) {
        selectChange(e.target.id);
    });
}

let fetishId = 0;
function addFetish() {
    let container = document.getElementById("fetishesArray");
    let div = document.createElement('div');
    div.classList.add("fetish");
    fetishId++;
    div.innerHTML = `
    <select value="" type="text" name="fetishNamePart" id="fetishNamePart` + fetishId + `">
        <option disabled selected value> -- select an option -- </option>
        <option value="anal">Anal</option>
        <option value="autozoophilia">Animal roleplay</option>
        <option value="maschalagnia">Armpits</option>
        <option value="bondage">Bondage</option>
        <option value="lactophilia">Breast milk</option>
        <option value="pygophilia">Buttocks</option>
        <option value="domination">Domination</option>
        <option value="exhibitionism">Exhibitionism</option>
        <option value="podophilia">Feet</option>
        <option value="trichophilia">Hair</option>
        <option value="crurophilia">Legs</option>
        <option value="algolagnia">Pain</option>
        <option value="shoes">Shoes</option>
        <option value="sthenolagnia">Muscles</option>
        <option value="olfactophilia">Odors</option>
        <option value="roleplay">Roleplay</option>
        <option value="spanking">Spanking</option>
        <option value="asphyxiophilia">Strangulation</option>
        <option value="transvestism">Transvestism</option>
        <option value="underwears">Underwears</option>
        <option value="uniform">Uniforms</option>
        <option value="urolagnia">Urination</option>
        <option value="voyeurism">Voyeurism</option>
        <option value="other">Other</option>
    </select>
    <br/>
    <span id="fetishNamePart` + fetishId + `Container" class="hidden">
        <input type="text" name="fetishNamePartOther" placeholder="Name"/>
    </span>
    <br/>
    <button onclick="remove(this)">Delete</button>
    `;
    // innerHtml += get rid of input value so we need to use appendChild instead
    container.appendChild(div);
    document.getElementById("fetishNamePart" + fetishId).addEventListener("change", function (e) {
        selectChange(e.target.id);
    });
}

let diseaseId = 0;
function addDisease() {
    let container = document.getElementById("diseasesArray");
    let div = document.createElement('div');
    div.classList.add("disease");
    fetishId++;
    div.innerHTML = `
    <select value="" type="text" name="diseaseNamePart" id="diseaseNamePart` + diseaseId + `">
        <option disabled selected value> -- select an option -- </option>
        <option value="other">Other</option>
        <optgroup label="Haematology">
            <option value="anemia">Anemia</option>
            <option value="haemophilia">Haemophilia</option>
        </optgroup>
        <optgroup label="Neurology and Psychiatry">
            <option value="dementia">Dementia</option>
            <option value="epilepsy">Epilepsy</option>
            <option value="panic_disorder">Panic Disorder</option>
        </optgroup>
        <optgroup label="Ophthalmology">
            <option value="cataract">Cataract</option>
            <option value="hyperopia">Hyperopia</option>
            <option value="myopia">Myopia</option>
        </optgroup>
        <optgroup label="Oncology">
            <option value="cancer">Cancer</option>
        </optgroup>
        <optgroup label="Psychiatry">
            <option value="did">Dissociative identity disorder</option>
            <option value="schizophrenia">Schizophrenia</option>
        </optgroup>
        <optgroup label="Pulmonology">
            <option value="asthma">Asthma</option>
        </optgroup>
    </select>
    <br/>
    <span id="diseaseNamePart` + diseaseId + `Container" class="hidden">
        <input type="text" name="diseaseNamePartOther" placeholder="Name"/>
    </span>
    <br/>
    <button onclick="remove(this)">Delete</button>
    `;
    // innerHtml += get rid of input value so we need to use appendChild instead
    container.appendChild(div);
    document.getElementById("diseaseNamePart" + diseaseId).addEventListener("change", function (e) {
        selectChange(e.target.id);
    });
}