function init() {
    let infoText = document.getElementById('infoText');
    infoText.innerHTML = 'Loading highscores, please wait...';
    loadHighscores();
}

async function loadHighscores() {
    const response = await fetch("http://localhost:3000/highscores");
    const highscores = await response.json();
    console.log(highscores);
    showHighscores(highscores)
}

function createHighscoreListItem(highscore) {
    let li = document.createElement('li');
    let li_attr = document.createAttribute('id');
    li_attr.value= highscore._id;
    li.setAttributeNode(li_attr);
    let number = document.createTextNode(highscore.highscore)
    li.appendChild(number)

    return li
}

function showHighscores(highscores) {
    let highscoreList = document.getElementById("highscoreList");
    let infoText = document.getElementById("infoText");

    //no highscores
    if (highscores.length === 0) {
        infoText.innerHTML = "No highscores";
    } else {
        highscores.forEach (highscore => {
            let li = createHighscoreListItem(highscore)
            highscoreList.appendChild(li)
        });
        infoText.innerHTML = '';
    }

}