Engine.PokeballSystem = function(game) {
  this.game = game;
  this.countElements = 16;
}

Engine.PokeballSystem.prototype = {
  create: function() {
    this._addPokeballs();
    this._runTimer();
  },

  _addPokeballs: function() {
    this.pokeballs = this.game.add.group();

    for (var i = 0; i < this.countElements; i++) {
      var pokeball = new Phaser.Sprite(this.game, 0, 0, 'pokeball');

      pokeball.anchor.setTo(0.5);

      this.pokeballs.add(pokeball);

      pokeball.kill();
    }
  },

  _runTimer: function() {
    this._timer = this.game.time.create();
    this._timer.loop(Phaser.Timer.SECOND, this.emit, this);
    this._timer.start();
  },

  emit: function() {
    var paddings = 25;
    var scale = this.game.rnd.realInRange(0.25, 0.8);
    var alpha = this.game.rnd.realInRange(0.05, 0.15);

    var pokeball = this.pokeballs.getFirstDead();

    pokeball.revive();
    pokeball.reset(
      this.game.rnd.between(paddings, this.game.width - paddings),
      this.game.rnd.between(paddings, this.game.height - paddings)
    );

    pokeball.alpha = 0;
    pokeball.rotation = 0;
    pokeball.scale.setTo(scale, scale);

    var targetX = this.game.rnd.between(100, 300);
    var targetY = 0;

    if (pokeball.x > this.game.width / 2)
      targetX *= -1;

    var alphaTween = this.game.add.tween(pokeball)
      .to({alpha: alpha}, 2500);

    var speedTween = this.game.add.tween(pokeball)
      .to({x: pokeball.x + targetX}, 6000);

    var rotationTween = this.game.add.tween(pokeball)
      .to({rotation: Math.PI * 2 * this.game.rnd.pick([-1, 1])}, 6000);

    var dieTween = this.game.add.tween(pokeball)
      .to({alpha: 0}, 2500);

    alphaTween.start();
    speedTween.start();
    rotationTween.start();

    alphaTween.chain(dieTween.delay(1000));

    dieTween.onComplete
      .add(function() {
        this.kill();
      }, pokeball);

    // alphaTween.onComplete.add(function() {
    //   this.kill();
    // }, pokeball);
  },

  update: function() {

  },
}
