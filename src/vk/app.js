if (isVkEnv()) {
  VK.init(function() {
    if (Engine.ADS_IS_ACTIVE) {
      VK.user_id = null;
      VK.app_id = 5587989;
      VK.preroll = new VKAdman();
      VK.adsIsShowing = false;
    }

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
  if (Engine.ADS_IS_ACTIVE) {
    return;
  }
  if (VK.adsIsShowing) {
    return;
  }

  VK.preroll.onStarted(function() {
    console.log("Adman: Started");
    var metricValue = 1;
    ga('set', 'metric1', metricValue);
  });
  VK.preroll.onSkipped(function() {
    console.log("Adman: Skipped");
    var metricValue = 1;
    ga('set', 'metric2', metricValue);
  });
  VK.preroll.onNoAds(function() {
    console.log("Adman: No ads");
    var metricValue = 1;
    ga('set', 'metric3', metricValue);
  });
  VK.preroll.onCompleted(function() {
    console.log("Adman: Completed");
    var metricValue = 1;
    ga('set', 'metric4', metricValue);
  });
  VK.preroll.onClicked(function() {
    console.log("Adman: Clicked");
    var metricValue = 1;
    ga('set', 'metric5', metricValue);
  });

  VK.preroll.setupPreroll(VK.app_id);
  admanStat(VK.app_id, VK.user_id);

  VK.adsIsShowing = true;
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
