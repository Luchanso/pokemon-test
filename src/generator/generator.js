/**
 * Create images of pokemon
 * @param {[type]} game [description]
 */
Engine.Generator = function(game) {
  this.counter = 0;
  this._lastPokemon = null;
}

Engine.Generator.prototype = {
  preload: function() {
    for (var i = 1; i <= 721; i++) {
      this.load.image('pk-' + i, 'assets/images/pokemons/' + i + '.png');
    }

    var bmd = this.add.bitmapData(Engine.GAME_WIDTH, Engine.GAME_HEIGHT);

    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, Engine.GAME_WIDTH, Engine.GAME_HEIGHT);
    bmd.ctx.fillStyle = 'rgb(255, 255, 255)';
    bmd.ctx.fill();

    this.cache.addBitmapData('pk-bg', bmd);
    // TODO: Добавить надпись: "Я похож на Pikachu"
    // TODO: Добавить Watermark vk.com/app2312341234
    // this.load.image('pk-bg', 'assets/images/background/calc.jpg')
  },

  create: function() {
    this.bg = this.add.image(0, 0, game.cache.getBitmapData('pk-bg'));

    this._nextPokemon();
  },

  _nextPokemon: function() {
    this.counter++;
    this._addPokemon();
    this._save();
  },

  _addPokemon: function() {
    var pokemon = this.add.sprite(this.game.width * 3 / 4, this.game.height / 2, 'pk-' + this.counter);
    pokemon.anchor.setTo(0.5);

    if (this._lastPokemon !== null) {
      this._lastPokemon.kill();
    }

    this._lastPokemon = pokemon;
  },

  _save: function() {

  }
}
