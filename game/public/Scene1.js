class Scene1 extends Phaser.Scene {
    constructor() {
        super("startGame");
    }

    preload() {
        this.load.image("background", "assets/images/background.png");
        this.load.image("ship01", "assets/images/ship01.png");
        this.load.image("ship02", "assets/images/ship02.png");
        this.load.image("ship03", "assets/images/ship03.png")

    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start('playGame');
    }
    
}