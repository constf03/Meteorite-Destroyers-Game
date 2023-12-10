class Gameplay extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        //Lisätään scenen taustakuva
        this.background = this.add.tileSprite(0,0, config.width, config.height, "background");
        this.background.setOrigin(0,0);

        //Avaruusalukset (spritesheet)
        this.ship01 = this.add.sprite(config.width/2 - 50, config.height/2, "ship01");
        this.ship02 = this.add.sprite(config.width/2, config.height/2, "ship02");
        this.ship03 = this.add.sprite(config.width/2 + 50, config.height/2, "ship03");

        this.ship01.play("ship01_anim");
        this.ship02.play("ship02_anim");
        this.ship03.play("ship03_anim");

        //setInteractive() --> alukset ottavat vastaan hiiren inputin
        this.ship01.setInteractive();
        this.ship02.setInteractive();
        this.ship03.setInteractive();

        //lisätään alukset enemies-ryhmään
        this.enemies = this.physics.add.group();
        this.enemies.add(this.ship01);
        this.enemies.add(this.ship02);
        this.enemies.add(this.ship03);

        //gameobjectdown --> tapahtuma käyntiin kun objektia klikataan
        //destroyShip() --> funktio (alukset tuhoutuvat, kun niitä klikataan)
        this.input.on('gameobjectdown', this.destroyShip, this);

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
        this.scoreText;
        this.highscoreText;
    
        this.score = 0;
        
        this.labelScore = this.add.text(70, 5, "0", { 
            font: "15px Arial",
            fill: "limegreen"
        });
        
        this.scoreText = this.add.text(5, 5, 'SCORE: ', {
            font: '15px Arial',
            fill: 'limegreen'
        });

        this.highscoreText = this.add.text(40, 130, '', {
            font: '30px Arial',
            fill: 'Purple'
        });
        this.highscoreText.visible = false;

        //Lives
        this.lives = 5;
        this.livesText;

        this.livesText = this.add.text(190, 10, 'LIVES: ' + this.lives, {
            font: '15px Arial',
            fill: 'ORANGE'
        });

        //Loppu
        this.gameOverText;
        this.gameOverText = this.add.text(40, 100, 'GAME OVER', {
            font: '30px Arial',
            fill: 'red'
        });
        this.gameOverText.visible = false;

        }

    update() {
        this.moveShip(this.ship01, 1);
        this.moveShip(this.ship02, 2);
        this.moveShip(this.ship03, 3);

        this.background.tilePositionY -= 0.5;

        this.movePlayerManager();

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){ //JustDown: tosi vain silloin,
            if (this.player.active){//kun välilyöntiä painetaan kerralla(eli ei togglea) 
                this.shootBeam();           
                console.log("Player just shot.")
            }
            
        }

        for (var i = 0; i < this.projectiles.getChildren().length; i++){
            var beam = this.projectiles.getChildren()[i];
            beam.update();
        }

    }

    ////////FUNKTIOT//////////////

    shootBeam() {
        var beam = new Beam(this);
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
    
    moveShip(ship, speed) {
        ship.y += speed;
        if (ship.y > config.height) {
            this.resetShipPos(ship);
        }
    }

    resetShipPos(ship) {
        ship.y = 0;
        var randomX = Phaser.Math.Between(0, config.width);
        ship.x = randomX;
    }

    destroyShip(pointer, gameObject) {
        gameObject.setTexture("explosion"); //gameObject = ship
        gameObject.play("explode");
    }

    damagePlayer(player, enemy) {
        this.resetShipPos(enemy);
        this.lives -= 1;
        this.livesText.text = 'LIVES: ' + this.lives;
        if (this.lives < 1) {
            this.endGame()
        }
        var explosion = new Explosion(this, player.x, player.y);
        this.time.addEvent({
            delay: 2500, //ms
            callback: this.resetPlayer(),
            callbaskScope: this,
            loop: false
        });
        if(this.player.alpha < 1){
            return;
        }
        player.disableBody(true, true);
    }

    damageEnemy(projectile, enemy) {
        var explosion = new Explosion(this, enemy.x, enemy.y);
        projectile.destroy();
        this.resetShipPos(enemy); //palautetaan hyökkäävän aluksen paikka
        this.score += 1;
        this.labelScore.text = this.score;
    }

    resetPlayer() {
        var x = config.width / 2 - 8;
        var y = config.height + 64;
        this.player.enableBody(true, x, y, true, true);
        this.player.alpha = 0.5;
        var transition = this.tweens.add({
            targets: this.player,
            y: config.height - 64,
            ease: 'Power1',
            duration: 2500,
            repeat: false,
            onComplete: function(){
                this.player.alpha = 1;
            },
            callbackScope: this
        });
    }

    endGame() {
        this.gameOverText.visible = true;
        addHighScoreToDB(); //highscore tallennetaan tietokantaan
        this.highscoreText.text = 'HIGHEST SCORE: ' + this.score;
        this.highscoreText.visible = true;

    }

}

async function addHighScoreToDB() {
    let newHighScore = this.score;
    const data = { 'text' : newHighScore }
    const response = await fetch('http://localhost:8000/highscores', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
let highscore = await response.json();
}