Engine.Calculate = function(game) {}

Engine.Calculate.prototype = {
  create: function() {
    this._timeProgress = 8000;
    this._countTick = 73;
    this._progress = 0;
    this._resultPokemon = this.add.sprite(0, 0, 'rnd-pokemon');
    this._resultPokemon.visible = false;

    this._addBackground();
    this._addRoller();
    this._addInfoLable();
    this._addProgressLable();

    this._startRoll();
    this._startProgress();
  },

  _addRoller: function() {
    var rollSize = 300;
    var marginRight = 100;

    this._rolls = [];
    this._rollGroup = this.add.group();
    this._activeRollSprite = -1;

    for (var i = 0; i < Engine.ROLL_SLIDE_COUNT; i++) {
      var sprite = this.add.sprite(0, 0, 'pokemonRoll' + i);

      sprite.visible = false;

      this._rollGroup.add(sprite);
      this._rolls.push(sprite);
    }

    this._rollGroup.x = marginRight;
    this._rollGroup.y = this.game.world.centerY - rollSize / 2;

    this._rollGroup.add(this._resultPokemon);
    this._rolls.push(this._resultPokemon);
  },

  _addBackground: function() {
    this.bg = this.add.sprite(0, 0, 'calc-bg');
  },

  _addProgressLable: function() {
    var rollSize = 300;
    var marginTop = 50;

    this._progressLable = this.add.text(
      this._rollGroup.x + rollSize / 2,
      this._rollGroup.y + rollSize + marginTop,
      'Прогресс 0 %',
      Engine.textStyle
    );

    this._progressLable.anchor.setTo(0.5);
  },

  _addInfoLable: function() {
    var marignTop = 25;

    this._infoText = this.add.text(
      this.game.world.centerX,
      marignTop,
      'Вычисление результата...',
      Engine.textStyle
    );

    this._infoText.anchor.setTo(0.5);
  },

  _startRoll: function() {
    this._activeRollSprite = 0;
    this._rolls[0].visible = true;

    this._timer = this.time.create();
    this._timer.loop(75, this._roll, this);
    this._timer.start();
  },

  _roll: function() {
    this._rolls[this._activeRollSprite].visible = false;

    this._activeRollSprite++;

    if (this._activeRollSprite > Engine.ROLL_SLIDE_COUNT - 1) {
      this._activeRollSprite = 0;
    }

    this._rolls[this._activeRollSprite].visible = true;
  },

  _startProgress: function() {
    this._progressTimer = this.time.create();
    this._progressTimer.repeat(
      this._timeProgress / this._countTick,
      this._countTick,
      this._updateProgress,
      this
    );
    this._progressTimer.start();
    this._progressTimer.onComplete.add(this._finishCalc, this);
  },

  _updateProgress: function() {
    this._progress++;
    this._progressLable.text = 'Прогресс ' + Math.floor((this._progress / this._countTick) * 100) + ' %';
  },

  _finishCalc: function() {
    this._timer.stop();

    this._rolls[this._activeRollSprite].visible = false;
    this._resultPokemon.visible = true;

    this._infoText.visible = false;

    var pokemonName = capitalizeFirstLetter(Engine.PokemonDB.pokemons[Engine.rndPokemon - 1].identifier);
    this._progressLable.text = 'Я похож на ' + pokemonName;

    this._addBtns();
  },

  _addAds: function() {
    // TODO: make ADS function
  },

  _addBtns: function() {
    var margin = 50;
    var btnShare = this._addShareBtn();
    var btnRepeat = this._addRepeatBtn();

    btnShare.y -= margin;
    btnRepeat.y += margin;
  },

  _addShareBtn: function() {
    var btnShare = this.add.button(
      Engine.GAME_WIDTH * 0.75,
      Engine.GAME_HEIGHT / 2,
      'share-btn',
      this._shareData,
      this
    );

    btnShare.anchor.setTo(0.5);

    return btnShare;
  },

  _addRepeatBtn: function() {
    var btnReapeat = this.add.button(
      Engine.GAME_WIDTH * 0.75,
      Engine.GAME_HEIGHT / 2,
      'repeat-btn',
      this._repeatGame,
      this
    );

    btnReapeat.anchor.setTo(0.5);

    return btnReapeat;
  },

  _shareData: function() {
    var data = this.game.canvas.toDataURL();
    // TODO: make Share data
  },

  _repeatGame: function() {
    Engine.rndPokemon = this.game.rnd.between(1, 721);
    this.state.start('Preloader');
  }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
