Engine.Game = function(game) {}

Engine.Game.prototype = {
  create: function() {
    this.stage.backgroundColor = '#000'; //#ddd

    this._addBackground();
    this._addPokeballSystem();
    this._addSlides();
    this._showChainSlides(this.slides);
    this._addProgressSlide();

    this._drawDebug();
  },

  _addSlides: function() {
    this.slides = [
      new Engine.Slide(this.game, 'Вы любите овсяное печенье?', ['Да', 'Нет', 'Не пробовал его']),
      new Engine.Slide(this.game, 'Вас часто бьёт током?', ['Бывает', 'Очень редко', 'Не знаю', 'Только что ударило!']),
      new Engine.Slide(this.game, 'Какая стихия вам больше нравится?', ['Вода', 'Огонь', 'Ветер', 'Земля']),
      new Engine.Slide(this.game, 'Выбирите одно из...', ['Тьма', 'Свет']),
      new Engine.Slide(this.game, 'Вы боитесь насекомых?', ['Да', 'Нет']),
      new Engine.Slide(this.game, 'Не против ли вы завести домашнего дракона?', ['Пфф, ещё спрашиваете', 'Не люблю драконов', 'Боюсь он съест моего питомца']),
      new Engine.Slide(this.game, 'Какое передвижение вы предпочитаете?', ['По воздуху', 'По земле', 'Вплавь', 'Телепортация']),
      new Engine.Slide(this.game, 'Вы боитесь приведений?', ['Да', 'Нет', 'Они не существуют!']),
      new Engine.Slide(this.game, 'Какие вам нравятся животные', ['Большие', 'Маленькие', 'Средние']),
      new Engine.Slide(this.game, 'Вам нравятся пухленькие питомцы?', ['Да', 'Нет', 'Без разницы']),
    ];
  },

  _showChainSlides: function(chain) {
    this.slideCounter = 0;

    for (var i = 0; i < chain.length; i++) {
      chain[i].setCallbackCheck(this._nextSlide.bind(this));
    }

    chain[0].show();
  },

  _nextSlide: function() {
    this.slideCounter++;

    if (this.slideCounter >= this.slides.length) {
      this._finishTest();
      return;
    }

    this.slides[this.slideCounter].show();
    this._progressLable.text = 'Вопрос ' + (this.slideCounter + 1) + ' из ' + this.slides.length;
  },

  _addBackground: function() {
    var bg = this.game.add.sprite(0, 0, 'slide-bg');
  },

  _drawDebug: function() {
    this._lineV = new Phaser.Line(this.game.world.centerX, 0, this.game.world.centerX, this.game.height);
    this._lineH = new Phaser.Line(0, this.game.world.centerY, this.game.width, this.game.world.centerY);
  },

  _addPokeballSystem: function() {
    this.pokeballSystem = new Engine.PokeballSystem(this.game);
    this.pokeballSystem.create();
  },

  _finishTest: function() {
    this.state.start('Calculate');
  },

  _addProgressSlide: function() {
    this._progressLable = this.add.text(Engine.GAME_WIDTH / 2, 25, 'Вопрос 1 из ' + this.slides.length, Engine.textStyle);
    this._progressLable.fontSize = 16;
    this._progressLable.anchor.setTo(0.5, 0);
  },

  update: function() {},

  render: function() {
    // this.game.debug.inputInfo(15, 15, '#fff');
    // // this.game.debug.spriteBounds(this.t._slideGroup, 'rgba(213, 83, 83, 0.25)');
    // // this.game.debug.spriteBounds(this.t._answerGroup, 'rgba(36, 0, 255, 0.25)');
    //
    // game.debug.geom(this._lineV);
    // game.debug.geom(this._lineH);
  }
}
