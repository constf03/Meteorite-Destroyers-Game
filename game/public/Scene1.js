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


    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start('playGame');
    }
    
}