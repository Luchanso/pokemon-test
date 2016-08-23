/**
 * Create images of pokemon
 * @param {[type]} game [description]
 */
Engine.Generator = function(game) {
  this.counter = 0;
  this._lastPokemon = null;
  game.preserveDrawingBuffer = true;
}

Engine.Generator.prototype = {
  preload: function() {
    this.load.text('pokemon.csv', 'assets/data/pokemon.csv');
    this.load.image('pk-bg', 'assets/images/background/bg-pk.jpg');

    for (var i = 1; i <= 721; i++) {
      this.load.image('pk-' + i, 'assets/images/pokemons/' + i + '.png');
    }

    this._initSocket();
  },

  create: function() {
    Engine.PokemonDB.load(this.cache.getText('pokemon.csv'));

    this._addBG();
    this._addWatermark();
    this._addLable();

    setTimeout(this._nextPokemon.bind(this), 3000);
  },

  _initSocket: function() {
    this.socket = io('http://localhost:8081');
  },

  _addBG: function() {
    this.bg = this.add.image(0, 0, 'pk-bg');
  },

  _addWatermark: function() {
    var style = {
      fill: '#bababa',
      font: '30px Open Sans',
      align: 'center'
    };

    var watermark = this.add.text(Engine.GAME_WIDTH / 2, 50, Engine.APP_NAME, style);
    watermark.anchor.setTo(0.5);
  },

  _addLable: function() {
    var style = {
      fill: '#333333',
      font: '50px Open Sans',
      align: 'center'
    };

    this.lable = this.add.text(Engine.GAME_WIDTH / 4, Engine.GAME_HEIGHT / 2, '', style);
    this.lable.anchor.setTo(0.5);
  },

  _createBG: function() {
    var bmd = this.add.bitmapData(Engine.GAME_WIDTH, Engine.GAME_HEIGHT);

    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, Engine.GAME_WIDTH, Engine.GAME_HEIGHT);
    bmd.ctx.fillStyle = 'rgb(255, 255, 255)';
    bmd.ctx.fill();

    this.cache.addBitmapData('pk-bg', bmd);
  },

  _nextPokemon: function() {
    this.counter++;

    this._changePokemon();
    this._save();

    if (this.counter < 721) {
      setTimeout(this._nextPokemon.bind(this), 3000);
    } else {
      console.log('I am finish!))');
    }
  },

  _changePokemon: function() {
    var pokemon = this.add.sprite(this.game.width * 3 / 4, this.game.height / 2, 'pk-' + this.counter);
    pokemon.anchor.setTo(0.5);

    var preString = 'Я по характеру\r\n';
    var pokemonName = Engine.PokemonDB.pokemons[this.counter - 1].identifier;

    this.lable.text = preString + capitalizeFirstLetter(pokemonName);
    this.lable.addFontWeight('bolder', preString.length - 2);

    if (this._lastPokemon !== null) {
      this._lastPokemon.kill();
    }

    this._lastPokemon = pokemon;
  },

  _save: function() {
    var image = this.game.canvas.toDataURL("image/png");
    var id = this.counter;
    var data = {
      bin: image,
      id: id
    }

    this.socket.emit('img', data);
  }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
