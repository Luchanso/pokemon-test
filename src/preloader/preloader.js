Engine.Preloader = function (game) {
  this.game = game;
};

Engine.Preloader.prototype = {
  preload: function () {
    this.stage.backgroundColor = '#000';
    this.stage.smoothed = false;

    this.addLogoLable();
    this.addProgressLable();

    if (Engine.DEBUG)
      this.load.enableParallel = false;

    this._initStyle();

    this.load.image('pokeball', 'assets/images/background/pokeball.png');
    this.load.image('slide-bg', 'assets/images/background/slide-bg.jpg');
    this.load.image('calc-bg', 'assets/images/background/calc.jpg');
    this.load.image('share-btn', 'assets/images/ui/share-btn.png');
    this.load.image('repeat-btn', 'assets/images/ui/repeat-btn.png');
    this.load.image('rnd-pokemon', 'assets/images/pokemons/' + Engine.rndPokemon + '.png');

    this._loadPokemons();

    this.load.text('pokemon.csv', 'assets/data/pokemon.csv');

    this.load.onFileComplete.add(this.fileComplete, this);
  },

  _initPokemonDB: function() {
    Engine.PokemonDB.load(this.cache.getText('pokemon.csv'));
  },

  _loadPokemons: function() {
    Engine.loader = new Phaser.Loader(this.game);

    for (var i = 0; i < Engine.ROLL_SLIDE_COUNT; i++) {
      Engine.loader.image('pokemonRoll' + i, 'assets/images/pokemons/' + this.rnd.between(1, 721) + '.png');
    }
  },

  fileComplete: function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this._progressLable.text = progress + '% ' + totalLoaded + '/' + totalFiles;
  },

  create: function () {
    this._initPokemonDB();
    Engine.loader.start();

    // TODO: TEMP
    Engine.loader.onLoadComplete.add(function() {
      this.state.start('Calculate');
    }, this);

    // this.state.start('Game');
  },

  _initStyle: function() {
    Engine.textStyle = {
      fill: '#fff',
      font: '26px Open Sans'
    }
  },

  addLogoLable: function () {
    var style = {
      fill: '#FFF',
      font: '43px Arial'
    }

    this._logoLable = this.add.text(this.game.width / 2, this.game.height / 4, 'Pokemon Test', style);
    this._logoLable.anchor.setTo(0.5);
  },

  addProgressLable: function () {
    var style = {
      fill: '#FFF',
      font: '21px Arial'
    }

    this._progressLable = this.add.text(this.game.width / 2, this.game.height / 2, 'Calculated...', style);
    this._progressLable.anchor.setTo(0.5);
  }
}
