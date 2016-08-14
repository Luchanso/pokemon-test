Engine.PokemonDB = {
  load: function(dataText) {
    this.pokemons = [];
    var data = Papa.parse(dataText).data;
    var fields = data[0];

    for (var i = 1; i < data.length; i++) {
      var pokemonData = data[i];
      var pokemonObj = {};

      for (var j = 0; j < fields.length; j++) {
        pokemonObj[fields[j]] = pokemonData[j];
      }

      this.pokemons.push(pokemonObj);
    }
  }
}
