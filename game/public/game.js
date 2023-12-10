var gameSettings = {
    playerSpeed: 200,
}


var config = {
    width: 256,
    height: 272,
    backgroundColor: 0x000000,
    scene: [Startup, Gameplay],
    pixelArt: true,
    //Arcade-preset on kevyt ja sopii pienikokoisille peleille
    physics: {
        default: "arcade",
        arcade:{
            debug: false
        }
    }
}

var game = new Phaser.Game(config);

