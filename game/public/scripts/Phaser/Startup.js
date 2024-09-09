class Startup extends Phaser.Scene {
  constructor() {
    super("startGame");
  }

  preload() {
    this.load.image("sky", "assets/images/clouds_merged_night.png");

    this.load.image("meteor01", "assets/images/Meteor01.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image("meteor02", "assets/images/Meteor02.png", {
      frameWidth: 32,
      frameHeight: 16,
    });
    this.load.image("meteor03", "assets/images/Meteor03.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet(
      "explosion",
      "assets/spritesheets/explosion_new.png",
      {
        frameWidth: 65,
        frameHeight: 65,
      }
    );
    this.load.spritesheet("player", "assets/spritesheets/player_new2.png", {
      frameWidth: 33,
      frameHeight: 50,
    });
    this.load.spritesheet("missile", "assets/spritesheets/missile.png", {
      frameWidth: 16,
      frameHeight: 32,
    });
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("playGame");

    //Lisätään animaatiot

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 24,
      repeat: 0,
      hideOnComplete: true,
    });

    this.anims.create({
      key: "player_anim",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "missile_anim",
      frames: this.anims.generateFrameNumbers("missile"),
      frameRate: 10,
      repeat: -1,
    });
  }
}
