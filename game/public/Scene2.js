class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        //Lisätään scenen taustakuva
        this.background = this.add.tileSprite(0,0, config.width, config.height, "background");
        this.background.setOrigin(0,0);

        this.add.text(20, 20, "Playing game", {
            font: "25px Arial",
            fill: "Yellow"
        });

        //Avaruusalukset (perus image)
        //this.ship01 = this.add.image(config.width/2 - 50, config.height/2, "ship01");
        //this.ship02 = this.add.image(config.width/2, config.height/2, "ship02");
        //this.ship03 = this.add.image(config.width/2 + 50, config.height/2, "ship03");

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

        //gameobjectdown --> tapahtuma käyntiin kun objektia klikataan
        //destroyShip() --> funktio (alukset tuhoutuvat, kun niitä klikataan)
        this.input.on('gameobjectdown', this.destroyShip, this);

        this.powerUps = this.physics.add.group();

        var maxObjects = 3;
        //toisto, joka määrittää poweruppeja satunnaisesti (max 4 yhtäaikaa)
        for (var i = 1; i <= maxObjects; i++) { //i = 1 eikä 0, koska peli laskee nollan yhdeksi objektiksi 
            var powerUp = this.physics.add.sprite(16, 16, "powerup");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0, 0, game.config.width, game.config.heigth);
        
        
        //Määritetään 50-50 todennäköisyys, että powerUp on joko punainen tai harmaa
        if (Math.random() > 0.5) {
            powerUp.play("red");
        }
        else {
            powerUp.play("gray");
        }

        powerUp.setVelocity(100, 100); //Nopeus
        powerUp.setCollideWorldBounds(true); //Rajat
        powerUp.setBounce(1); //kimpoavat reunoista

        }

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
    }

    update() {
        this.moveShip(this.ship01, 1);
        this.moveShip(this.ship02, 2);
        this.moveShip(this.ship03, 3);

        this.background.tilePositionY -= 0.5;

        this.movePlayerManager();

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){ //JustDown: tosi silloin, kun näppäintä painetaan 
            this.shootBeam();
            console.log("Player just shot.")
        }

        for (var i = 0; i < this.projectiles.getChildren().length; i++){
            var beam = this.projectiles.getChildren()[i];
            beam.update();
        }
    }

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
            console.log("Player position:", playerPosX, playerPosY);
        }
        else if(this.cursorKeys.left.isDown){
            this.player.setVelocityX(-gameSettings.playerSpeed);
            console.log("Player position:", playerPosX, playerPosY);
        }
        //Liikutaan y-suunnassa:
        if(this.cursorKeys.up.isDown){
            this.player.setVelocityY(-gameSettings.playerSpeed); //Negatiivinen y-suuntanen nopeus vie ylös??
            console.log("Player position:", playerPosX, playerPosY);
        }
        else if(this.cursorKeys.down.isDown){
            this.player.setVelocityY(gameSettings.playerSpeed);
            console.log("Player position:", playerPosX, playerPosY);
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

}