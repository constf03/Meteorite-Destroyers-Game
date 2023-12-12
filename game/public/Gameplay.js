class Gameplay extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        //Lisätään scenen taustakuva
        this.background = this.add.image(0,0, "sky");
        this.background.setOrigin(0,0);

        //Avaruusalukset (spritesheet)
        this.meteor01 = this.add.image(config.width/2 - 50, 0, "meteor01");
        this.meteor02 = this.add.image(config.width/2, 0, "meteor02");
        this.meteor03 = this.add.image(config.width/2 + 50, 0, "meteor03");

        //lisätään putoavat meteoriitit enemies-ryhmään
        this.enemies = this.physics.add.group();
        this.enemies.add(this.meteor01);
        this.enemies.add(this.meteor02);
        this.enemies.add(this.meteor03);

        //Pelaaja
        this.player = this.physics.add.sprite(
        config.width / 2 - 8,
        config.height - 64,
        "player");
        
        this.player.play("player_anim");

        //Kontrollit
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.player.setCollideWorldBounds(true); //pelaaja liikkuu vain rajojen sisällä
        //Määritetään ampumistoiminto
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.projectiles = this.add.group();

        //Vuorovaikutus objektejen kanssa
        this.physics.add.collider(this.projectiles,
        function(projectile) {
            projectile.destroy(); 
        });

        this.physics.add.overlap(this.player, this.enemies, this.damagePlayer, null, this);

        this.physics.add.overlap(this.projectiles, this.enemies, this.damageEnemy, null, this);

        //Määritetään score
        this.score = 0;
        this.highscore = localStorage.getItem("highscore");
        this.scoreText;
        this.highscoreText;
        this.highestscoreText;
    
        this.score = 0;
        
        this.labelScore = this.add.text(70, 5, "0", { 
            font: "15px Arial",
            fill: "limegreen"
        });
        
        this.scoreText = this.add.text(5, 5, 'SCORE: ', {
            font: '15px Arial',
            fill: 'limegreen'
        });

        this.highscoreText = this.add.text(45, 140, '', {
            font: '18px Arial',
            fill: 'Yellow'
        });
        this.highscoreText.visible = false;

        this.highestcoreText = this.add.text(45, 160, '', {
            font: '18px Arial',
            fill: 'Yellow'
        });
        this.highestcoreText.visible = false;

        //Elämät (lives)
        this.lives = 5;
        this.livesText;

        this.livesText = this.add.text(190, 10, 'LIVES: ' + this.lives, {
            font: '15px Arial',
            fill: 'ORANGE'
        });

        //Lopputeksti (game over)
        this.gameOverText;
        this.gameOverText = this.add.text(40, 100, 'GAME OVER', {
            font: '30px Arial',
            fill: 'red'
        });
        this.gameOverText.visible = false;

        }

    update() {
        this.moveMeteor(this.meteor01, 3);
        this.moveMeteor(this.meteor02, 2.3);
        this.moveMeteor(this.meteor03, 1.5);

        this.background.tilePositionY -= 0.5;

        this.movePlayerManager();

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){ //JustDown: tosi vain silloin,
            if (this.player.active){//kun välilyöntiä painetaan kerralla(eli ei togglea) 
                this.shootMissile();           
                console.log("Player just shot.")
            }
            
        }

        for (var i = 0; i < this.projectiles.getChildren().length; i++){
            var missile = this.projectiles.getChildren()[i];
            missile.update();
        }

        if (this.score > localStorage.getItem("highscore")) {
            localStorage.setItem("highscore", this.score);
        }

    }
    

    ////////FUNKTIOT//////////////

    shootMissile() {
        var missile = new Missile(this);
    }

    movePlayerManager() {
        //Pelaajan koordinaatit (consolia varten)
        var playerPosX = Math.round(this.player.x);
        var playerPosY = Math.round(this.player.y);

        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        // Liikutaan x-suunnassa:
        if(this.cursorKeys.right.isDown){
            this.player.setVelocityX(gameSettings.playerSpeed);
            console.log("Player position {x y}:", playerPosX, playerPosY);
        }
        else if(this.cursorKeys.left.isDown){
            this.player.setVelocityX(-gameSettings.playerSpeed);
            console.log("Player position {x y}:", playerPosX, playerPosY);
        }
        //Liikutaan y-suunnassa:
        if(this.cursorKeys.up.isDown){
            this.player.setVelocityY(-gameSettings.playerSpeed); //Negatiivinen y-suuntanen nopeus vie ylös??
            console.log("Player position {x y}:", playerPosX, playerPosY);
        }
        else if(this.cursorKeys.down.isDown){
            this.player.setVelocityY(gameSettings.playerSpeed);
            console.log("Player position {x y}:", playerPosX, playerPosY);
        }
            
    }
    
    moveMeteor(meteor, speed) {
        meteor.y += speed;
        if (meteor.y > (config.height + 30)) {
            this.resetMeteorPos(meteor);
        }
    }

    resetMeteorPos(meteor) {
        meteor.y = -30;
        var randomX = Phaser.Math.Between(0, config.width);
        meteor.x = randomX;
    }

    destroyMeteor(pointer, gameObject) {
        gameObject.setTexture("explosion"); //gameObject = ship
        gameObject.play("explode");
    }

    damagePlayer(player, enemy) {
        this.resetMeteorPos(enemy);
        this.lives -= 1;
        this.livesText.text = 'LIVES: ' + this.lives;
        if (this.lives <= 0) {
            this.endGame()
        }
        var explosion = new Explosion(this, player.x, player.y);
        this.resetPlayer()
    }

    damageEnemy(projectile, enemy) {
        var explosion = new Explosion(this, enemy.x, enemy.y);
        projectile.destroy();
        this.resetMeteorPos(enemy); //palautetaan hyökkäävän aluksen paikka
        this.score += 1;
        this.labelScore.text = this.score;
    }

    resetPlayer() {
        var x = config.width / 2 - 8;
        var y = config.height + 64;
        this.player.enableBody(true, x, y, true, true);
    }

    endGame() {
        if (this.score > this.highscore) {
            addHighScoreToDB(); //Jos score on suurempi kuin aikaisempi highscore, se menee tietokantaan.
        }
        this.gameOverText.visible = true;
        this.highscoreText.text = 'HIGHEST SCORE: ' + this.score;
        this.highestcoreText.text = 'PERSONAL BEST: ' + localStorage.getItem("highscore");
        this.highscoreText.visible = true;
        this.highestcoreText.visible = true;
        game.destroy();
        console.log("Game ended with player reaching highest score", this.score);
    }

}

//Tallennetaan suurin score tietokantaan
async function addHighScoreToDB() {
    const data = { 'text' : localStorage.getItem("highscore") };
    const response = await fetch('http://localhost:8000/highscores', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});
}