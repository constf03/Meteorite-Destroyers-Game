class Beam extends Phaser.GameObjects.Sprite{
    constructor(scene){
        //plasmaluoti lähtee liikkeelle siitä kohdasta, jossa pelaajan koordinaatit ovat
        var x = scene.player.x;
        var y = scene.player.y - 1;

        super(scene, x, y, "beam");

        scene.add.existing(this);

        this.play("beam_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.y = -250; //velocity.x = 0 default

        scene.projectiles.add(this);
    }
    //Beam-luodit tuhoutuvat, kun ne ovat liikkuneet 22 yksikköä y-suuntaan
    update(){
        if(this.y < 22){
          this.destroy();
        }
      }
}