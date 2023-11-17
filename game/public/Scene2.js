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

        //Lisätään animaatiot
        this.anims.create({
            key: "ship01_anim",
            frames: this.anims.generateFrameNumbers("ship01"),
            frameRate: 60,
            repeat: -1,
        });

        this.anims.create({
            key: "ship02_anim",
            frames: this.anims.generateFrameNumbers("ship02"),
            frameRate: 60,
            repeat: -1,
        });

        this.anims.create({
            key: "ship03_anim",
            frames: this.anims.generateFrameNumbers("ship03"),
            frameRate: 60,
            repeat: -1,
        });

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 60,
            repeat: 0,
            hideOnComplete: true
        });

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

        //Määritetään powerupit
        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("powerup", {
                start: 0, // start- ja end-arvot määrittävät, minkä osan (0-3) näyttää power-up.png tiedostosta
                end: 1
            }),
            frameRate: 60,
            repeat: -1
        });

        this.anims.create({
            key: "gray",
            frames: this.anims.generateFrameNumbers("powerup", {
                start: 2,
                end: 3
            }),
            frameRate: 60,
            repeat: -1
        });

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

    }

    update() {
        this.moveShip(this.ship01, 1);
        this.moveShip(this.ship02, 2);
        this.moveShip(this.ship03, 3);

        this.background.tilePositionY -= 0.5;
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