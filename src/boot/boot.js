var Engine = {};

Engine.Boot = function (game) { };

Engine.Boot.prototype = {
  preload: function () {
  },

  create: function () {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.stage.disableVisibilityChange = true;
    this.state.start('Preloader');
  }
}
