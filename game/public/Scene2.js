class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        /*Lisätään scenen taustakuva*/
        this.background = this.add.tileSprite(0,0, config.width, config.height, "background");
        this.background.setOrigin(0,0);

        /*Lisätään taustakuvaan avaruusalukset*/
        this.ship01 = this.add.image(config.width/2 - 50, config.height/2, "ship01");
        this.ship02 = this.add.image(config.width/2, config.height/2, "ship02");
        this.ship03 = this.add.image(config.width/2 + 50, config.height/2, "ship03");

        this.add.text(20, 20, "Playing game", {
            font: "25px Arial",
            fill: "Yellow"
        });

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
}