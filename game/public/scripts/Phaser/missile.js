class Missile extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    //Ohjukset lähtevät liikkeelle siitä kohdasta, jossa pelaajan koordinaatit ovat (suurinpiirtein)
    var x = scene.player.x;
    var y = scene.player.y - 1;

    super(scene, x, y, "missile");

    scene.add.existing(this);

    this.play("missile_anim");
    scene.physics.world.enableBody(this);
    this.body.velocity.y = -250; //velocity.x = 0 default

    scene.projectiles.add(this);
  }
  //Ohjukset tuhoutuvat, kun ne ovat liikkuneet 22 yksikköä y-suuntaan
  update() {
    if (this.y < 22) {
      this.destroy();
    }
  }
}
