Engine.GAME_WIDTH = 1000;
Engine.GAME_HEIGHT = 640;

Engine.DEBUG = true;

var game = new Phaser.Game(Engine.GAME_WIDTH, Engine.GAME_HEIGHT, Phaser.AUTO, 'game');

Engine.ROLL_SLIDE_COUNT = 50;
Engine.rndPokemon = game.rnd.between(1, 721);

game.state.add('Boot', Engine.Boot);
game.state.add('Preloader', Engine.Preloader);
game.state.add('Game', Engine.Game);
game.state.add('Calculate', Engine.Calculate);

game.state.start('Boot');
