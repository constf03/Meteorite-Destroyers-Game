class Scene1 extends Phaser.Scene {
    constructor() {
        super("startGame");
    }

    preload() {
        this.load.image("background", "assets/images/background.png");

        //this.load.image("ship01", "assets/images/ship01.png");
        //this.load.image("ship02", "assets/images/ship02.png");
        //this.load.image("ship03", "assets/images/ship03.png")

        this.load.spritesheet("ship01", "assets/spritesheets/ship01.png",{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("ship02", "assets/spritesheets/ship02.png",{
            frameWidth: 32,
            frameHeight: 16
        });
        this.load.spritesheet("ship03", "assets/spritesheets/ship03.png",{
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("explosion", "assets/spritesheets/explosion.png",{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("powerup", "assets/spritesheets/power-up.png",{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("player", "assets/spritesheets/player.png",{
            frameWidth: 16,
            frameHeight: 24
        });



    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start('playGame');

        //Lisätään animaatiot
        this.anims.create({
            key: "ship01_anim",
            frames: this.anims.generateFrameNumbers("ship01"),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "ship02_anim",
            frames: this.anims.generateFrameNumbers("ship02"),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "ship03_anim",
            frames: this.anims.generateFrameNumbers("ship03"),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true
        });

        //Määritetään powerupit
        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("powerup", {
                start: 0, // start- ja end-arvot määrittävät, minkä osan (0-3) näyttää power-up.png tiedostosta
                end: 1
            }),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: "gray",
            frames: this.anims.generateFrameNumbers("powerup", {
                start: 2,
                end: 3
            }),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: "player_anim",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 10,
            repeat: -1,
        });

    }
    
}