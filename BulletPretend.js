BulletPretend = function (game, x, y, direction, speed) {
    Phaser.Sprite.call(this, game, x, y, "gavel");
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.xSpeed = direction * speed;
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(0.875, 0.875);
    this.myRotation = direction * 10;
};

BulletPretend.prototype = Object.create(Phaser.Sprite.prototype);
BulletPretend.prototype.constructor = BulletPretend;

BulletPretend.prototype.update = function() {

    this.angle += this.myRotation;

    game.physics.arcade.collide(this, player, function (bullet2, player) {
        Health.hit();
        SoundFX.hitCar();
        setTimeout(() => bullet2.destroy(), 1);
    });

    if (this.body == null) {
        return;
    } else {
        this.body.velocity.y = 0;
        this.body.velocity.x = this.xSpeed;
    }

    if(this.x < 0 || this.x > 1000) {
        this.destroy();
    }

};

function shootBulletPretend() {
    if (bullets2.length < 5) {
        SoundFX.shoot();
        var bullet2 = new BulletPretend(game, player2.x + (direction2 == 1 ? 45 : 0), player2.y + 40, direction2, bulletXSpeed);
        bullets2.add(bullet2);
    }
}