if (isVkEnv()) {
  VK.init(function() {
    /**
     * Успешное иницирование VK API
     * @type {Boolean}
     */
    VK.succesInit = true;
    VK.publicatePhoto(pokemonId);
  }, function() {
    VK.succesInit = false;
  }, '5.53');
}

VK.publicatePhoto = function(pokemonId) {

}

function isVkEnv() {
  return (location.ancestorOrigins.length !== 0 && location.ancestorOrigins[0].indexOf('vk') !== -1);
}
