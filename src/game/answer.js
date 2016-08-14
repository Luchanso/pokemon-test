Engine.Answer = function(game, x, y, text, callback, context) {
  this.game = game;
  this.text = text;
  this._padding = 5;

  this._createText();

  Phaser.Button.call(this, game, x, y, this._createBackground(), callback, context);
  this.tint = 0x009688;

  this.addChild(this._textSprite);

  this.onInputOver.add(function() {
    this.tint = 0x00fee7;
  }, this);

  this.onInputOut.add(function() {
    this.tint = 0x009688;
  }, this);
}

Engine.Answer.prototype = Object.create(Phaser.Button.prototype);
Engine.Answer.prototype.constructor = Engine.Answer;

Engine.Answer.prototype._createBackground = function() {
  var bottomPadding = -7;

  var bmp = this.game.add.bitmapData(this._textSprite.width + this._padding * 2, this._textSprite.height + this._padding / 2);
  bmp.ctx.beginPath();
  bmp.ctx.rect(0, 0, bmp.width, bmp.height + bottomPadding);
  bmp.ctx.fillStyle = '#fff';
  bmp.ctx.fill();

  return bmp;
}

Engine.Answer.prototype._createText = function() {
  this._textSprite = new Phaser.Text(this.game, 0, 0, this.text, Engine.textStyle);
  this._textSprite.anchor.setTo(0.5, 0);
}
