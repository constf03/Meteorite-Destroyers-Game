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
    let number = document.createTextNode(highscore.highscore);
    li.appendChild(number);

    return li;
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
    sortHighscores();
}

function sortHighscores() {
    var list, i, switching, b, shouldSwitch;
    list = document.getElementById("highscoreList");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // start by saying: no switching is done:
      switching = false;
      b = list.getElementsByTagName("LI");
      // Loop through all list-items:
      for (i = 0; i < (b.length - 1); i++) {
        // start by saying there should be no switching:
        shouldSwitch = false;
        /* check if the next item should
        switch place with the current item: */
        
        if (Number(b[i].innerHTML) < Number(b[i + 1].innerHTML)) {
          /* if next item is numerically
          lower than current item, mark as a switch
          and break the loop: */
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark the switch as done: */
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
      }
    }
}