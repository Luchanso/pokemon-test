if (isVkEnv()) {
  VK.init(function() {
    var user_id = null;
    var app_id = 5587989;
    VK.preroll = new VKAdman();
    VK.preroll.setupPreroll(app_id);
    VK.setupPreroll(app_id, {preview: 8});

    admanStat(app_id, user_id);

    /**
     * Успешное иницирование VK API
     * @type {Boolean}
     */
    VK.succesInit = true;
    // VK.publicatePhoto(pokemonId);
  }, function() {
    VK.succesInit = false;
  }, '5.53');
}

VK.startPreroll = function() {

}

VK.startAds = function() {
  // TODO: Write this
}

VK.publicatePhoto = function(pokemonId) {
  var pokemonName = Engine.PokemonDB.pokemons[pokemonId - 1].identifier;
  VK.api('wall.post', {message: 'Тест на покемона: https://' + Engine.APP_NAME, attachments: Engine.data[pokemonId - 1].url});
}

function isVkEnv() {
  return (location.ancestorOrigins.length !== 0 && location.ancestorOrigins[0].indexOf('vk') !== -1);
}
