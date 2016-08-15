/*!
	Papa Parse
	v4.1.2
	https://github.com/mholt/PapaParse
*/
!function(e){"use strict";function t(t,r){if(r=r||{},r.worker&&S.WORKERS_SUPPORTED){var n=f();return n.userStep=r.step,n.userChunk=r.chunk,n.userComplete=r.complete,n.userError=r.error,r.step=m(r.step),r.chunk=m(r.chunk),r.complete=m(r.complete),r.error=m(r.error),delete r.worker,void n.postMessage({input:t,config:r,workerId:n.id})}var o=null;return"string"==typeof t?o=r.download?new i(r):new a(r):(e.File&&t instanceof File||t instanceof Object)&&(o=new s(r)),o.stream(t)}function r(e,t){function r(){"object"==typeof t&&("string"==typeof t.delimiter&&1==t.delimiter.length&&-1==S.BAD_DELIMITERS.indexOf(t.delimiter)&&(u=t.delimiter),("boolean"==typeof t.quotes||t.quotes instanceof Array)&&(o=t.quotes),"string"==typeof t.newline&&(h=t.newline))}function n(e){if("object"!=typeof e)return[];var t=[];for(var r in e)t.push(r);return t}function i(e,t){var r="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var n=e instanceof Array&&e.length>0,i=!(t[0]instanceof Array);if(n){for(var a=0;a<e.length;a++)a>0&&(r+=u),r+=s(e[a],a);t.length>0&&(r+=h)}for(var o=0;o<t.length;o++){for(var f=n?e.length:t[o].length,c=0;f>c;c++){c>0&&(r+=u);var d=n&&i?e[c]:c;r+=s(t[o][d],c)}o<t.length-1&&(r+=h)}return r}function s(e,t){if("undefined"==typeof e||null===e)return"";e=e.toString().replace(/"/g,'""');var r="boolean"==typeof o&&o||o instanceof Array&&o[t]||a(e,S.BAD_DELIMITERS)||e.indexOf(u)>-1||" "==e.charAt(0)||" "==e.charAt(e.length-1);return r?'"'+e+'"':e}function a(e,t){for(var r=0;r<t.length;r++)if(e.indexOf(t[r])>-1)return!0;return!1}var o=!1,u=",",h="\r\n";if(r(),"string"==typeof e&&(e=JSON.parse(e)),e instanceof Array){if(!e.length||e[0]instanceof Array)return i(null,e);if("object"==typeof e[0])return i(n(e[0]),e)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),e.data instanceof Array&&(e.fields||(e.fields=e.data[0]instanceof Array?e.fields:n(e.data[0])),e.data[0]instanceof Array||"object"==typeof e.data[0]||(e.data=[e.data])),i(e.fields||[],e.data||[]);throw"exception: Unable to serialize unrecognized input"}function n(t){function r(e){var t=_(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null),this._handle=new o(t),this._handle.streamer=this,this._config=t}this._handle=null,this._paused=!1,this._finished=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},r.call(this,t),this.parseChunk=function(t){if(this.isFirstChunk&&m(this._config.beforeFirstChunk)){var r=this._config.beforeFirstChunk(t);void 0!==r&&(t=r)}this.isFirstChunk=!1;var n=this._partialLine+t;this._partialLine="";var i=this._handle.parse(n,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var s=i.meta.cursor;this._finished||(this._partialLine=n.substring(s-this._baseIndex),this._baseIndex=s),i&&i.data&&(this._rowCount+=i.data.length);var a=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(y)e.postMessage({results:i,workerId:S.WORKER_ID,finished:a});else if(m(this._config.chunk)){if(this._config.chunk(i,this._handle),this._paused)return;i=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(i.data),this._completeResults.errors=this._completeResults.errors.concat(i.errors),this._completeResults.meta=i.meta),!a||!m(this._config.complete)||i&&i.meta.aborted||this._config.complete(this._completeResults),a||i&&i.meta.paused||this._nextChunk(),i}},this._sendError=function(t){m(this._config.error)?this._config.error(t):y&&this._config.error&&e.postMessage({workerId:S.WORKER_ID,error:t,finished:!1})}}function i(e){function t(e){var t=e.getResponseHeader("Content-Range");return parseInt(t.substr(t.lastIndexOf("/")+1))}e=e||{},e.chunkSize||(e.chunkSize=S.RemoteChunkSize),n.call(this,e);var r;this._nextChunk=k?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)return void this._chunkLoaded();if(r=new XMLHttpRequest,k||(r.onload=g(this._chunkLoaded,this),r.onerror=g(this._chunkError,this)),r.open("GET",this._input,!k),this._config.chunkSize){var e=this._start+this._config.chunkSize-1;r.setRequestHeader("Range","bytes="+this._start+"-"+e),r.setRequestHeader("If-None-Match","webkit-no-cache")}try{r.send()}catch(t){this._chunkError(t.message)}k&&0==r.status?this._chunkError():this._start+=this._config.chunkSize},this._chunkLoaded=function(){if(4==r.readyState){if(r.status<200||r.status>=400)return void this._chunkError();this._finished=!this._config.chunkSize||this._start>t(r),this.parseChunk(r.responseText)}},this._chunkError=function(e){var t=r.statusText||e;this._sendError(t)}}function s(e){e=e||{},e.chunkSize||(e.chunkSize=S.LocalChunkSize),n.call(this,e);var t,r,i="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,r=e.slice||e.webkitSlice||e.mozSlice,i?(t=new FileReader,t.onload=g(this._chunkLoaded,this),t.onerror=g(this._chunkError,this)):t=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var n=Math.min(this._start+this._config.chunkSize,this._input.size);e=r.call(e,this._start,n)}var s=t.readAsText(e,this._config.encoding);i||this._chunkLoaded({target:{result:s}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(t.error)}}function a(e){e=e||{},n.call(this,e);var t,r;this.stream=function(e){return t=e,r=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e=this._config.chunkSize,t=e?r.substr(0,e):r;return r=e?r.substr(e):"",this._finished=!r,this.parseChunk(t)}}}function o(e){function t(){if(b&&d&&(h("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+S.DefaultDelimiter+"'"),d=!1),e.skipEmptyLines)for(var t=0;t<b.data.length;t++)1==b.data[t].length&&""==b.data[t][0]&&b.data.splice(t--,1);return r()&&n(),i()}function r(){return e.header&&0==y.length}function n(){if(b){for(var e=0;r()&&e<b.data.length;e++)for(var t=0;t<b.data[e].length;t++)y.push(b.data[e][t]);b.data.splice(0,1)}}function i(){if(!b||!e.header&&!e.dynamicTyping)return b;for(var t=0;t<b.data.length;t++){for(var r={},n=0;n<b.data[t].length;n++){if(e.dynamicTyping){var i=b.data[t][n];b.data[t][n]="true"==i||"TRUE"==i?!0:"false"==i||"FALSE"==i?!1:o(i)}e.header&&(n>=y.length?(r.__parsed_extra||(r.__parsed_extra=[]),r.__parsed_extra.push(b.data[t][n])):r[y[n]]=b.data[t][n])}e.header&&(b.data[t]=r,n>y.length?h("FieldMismatch","TooManyFields","Too many fields: expected "+y.length+" fields but parsed "+n,t):n<y.length&&h("FieldMismatch","TooFewFields","Too few fields: expected "+y.length+" fields but parsed "+n,t))}return e.header&&b.meta&&(b.meta.fields=y),b}function s(t){for(var r,n,i,s=[",","	","|",";",S.RECORD_SEP,S.UNIT_SEP],a=0;a<s.length;a++){var o=s[a],h=0,f=0;i=void 0;for(var c=new u({delimiter:o,preview:10}).parse(t),d=0;d<c.data.length;d++){var l=c.data[d].length;f+=l,"undefined"!=typeof i?l>1&&(h+=Math.abs(l-i),i=l):i=l}c.data.length>0&&(f/=c.data.length),("undefined"==typeof n||n>h)&&f>1.99&&(n=h,r=o)}return e.delimiter=r,{successful:!!r,bestDelimiter:r}}function a(e){e=e.substr(0,1048576);var t=e.split("\r");if(1==t.length)return"\n";for(var r=0,n=0;n<t.length;n++)"\n"==t[n][0]&&r++;return r>=t.length/2?"\r\n":"\r"}function o(e){var t=l.test(e);return t?parseFloat(e):e}function h(e,t,r,n){b.errors.push({type:e,code:t,message:r,row:n})}var f,c,d,l=/^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,p=this,g=0,v=!1,k=!1,y=[],b={data:[],errors:[],meta:{}};if(m(e.step)){var R=e.step;e.step=function(n){if(b=n,r())t();else{if(t(),0==b.data.length)return;g+=n.data.length,e.preview&&g>e.preview?c.abort():R(b,p)}}}this.parse=function(r,n,i){if(e.newline||(e.newline=a(r)),d=!1,!e.delimiter){var o=s(r);o.successful?e.delimiter=o.bestDelimiter:(d=!0,e.delimiter=S.DefaultDelimiter),b.meta.delimiter=e.delimiter}var h=_(e);return e.preview&&e.header&&h.preview++,f=r,c=new u(h),b=c.parse(f,n,i),t(),v?{meta:{paused:!0}}:b||{meta:{paused:!1}}},this.paused=function(){return v},this.pause=function(){v=!0,c.abort(),f=f.substr(c.getCharIndex())},this.resume=function(){v=!1,p.streamer.parseChunk(f)},this.aborted=function(){return k},this.abort=function(){k=!0,c.abort(),b.meta.aborted=!0,m(e.complete)&&e.complete(b),f=""}}function u(e){e=e||{};var t=e.delimiter,r=e.newline,n=e.comments,i=e.step,s=e.preview,a=e.fastMode;if(("string"!=typeof t||S.BAD_DELIMITERS.indexOf(t)>-1)&&(t=","),n===t)throw"Comment character same as delimiter";n===!0?n="#":("string"!=typeof n||S.BAD_DELIMITERS.indexOf(n)>-1)&&(n=!1),"\n"!=r&&"\r"!=r&&"\r\n"!=r&&(r="\n");var o=0,u=!1;this.parse=function(e,h,f){function c(e){b.push(e),S=o}function d(t){return f?p():("undefined"==typeof t&&(t=e.substr(o)),w.push(t),o=g,c(w),y&&_(),p())}function l(t){o=t,c(w),w=[],O=e.indexOf(r,o)}function p(e){return{data:b,errors:R,meta:{delimiter:t,linebreak:r,aborted:u,truncated:!!e,cursor:S+(h||0)}}}function _(){i(p()),b=[],R=[]}if("string"!=typeof e)throw"Input must be a string";var g=e.length,m=t.length,v=r.length,k=n.length,y="function"==typeof i;o=0;var b=[],R=[],w=[],S=0;if(!e)return p();if(a||a!==!1&&-1===e.indexOf('"')){for(var C=e.split(r),E=0;E<C.length;E++){var w=C[E];if(o+=w.length,E!==C.length-1)o+=r.length;else if(f)return p();if(!n||w.substr(0,k)!=n){if(y){if(b=[],c(w.split(t)),_(),u)return p()}else c(w.split(t));if(s&&E>=s)return b=b.slice(0,s),p(!0)}}return p()}for(var x=e.indexOf(t,o),O=e.indexOf(r,o);;)if('"'!=e[o])if(n&&0===w.length&&e.substr(o,k)===n){if(-1==O)return p();o=O+v,O=e.indexOf(r,o),x=e.indexOf(t,o)}else if(-1!==x&&(O>x||-1===O))w.push(e.substring(o,x)),o=x+m,x=e.indexOf(t,o);else{if(-1===O)break;if(w.push(e.substring(o,O)),l(O+v),y&&(_(),u))return p();if(s&&b.length>=s)return p(!0)}else{var I=o;for(o++;;){var I=e.indexOf('"',I+1);if(-1===I)return f||R.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:b.length,index:o}),d();if(I===g-1){var D=e.substring(o,I).replace(/""/g,'"');return d(D)}if('"'!=e[I+1]){if(e[I+1]==t){w.push(e.substring(o,I).replace(/""/g,'"')),o=I+1+m,x=e.indexOf(t,o),O=e.indexOf(r,o);break}if(e.substr(I+1,v)===r){if(w.push(e.substring(o,I).replace(/""/g,'"')),l(I+1+v),x=e.indexOf(t,o),y&&(_(),u))return p();if(s&&b.length>=s)return p(!0);break}}else I++}}return d()},this.abort=function(){u=!0},this.getCharIndex=function(){return o}}function h(){var e=document.getElementsByTagName("script");return e.length?e[e.length-1].src:""}function f(){if(!S.WORKERS_SUPPORTED)return!1;if(!b&&null===S.SCRIPT_PATH)throw new Error("Script path cannot be determined automatically when Papa Parse is loaded asynchronously. You need to set Papa.SCRIPT_PATH manually.");var t=S.SCRIPT_PATH||v;t+=(-1!==t.indexOf("?")?"&":"?")+"papaworker";var r=new e.Worker(t);return r.onmessage=c,r.id=w++,R[r.id]=r,r}function c(e){var t=e.data,r=R[t.workerId],n=!1;if(t.error)r.userError(t.error,t.file);else if(t.results&&t.results.data){var i=function(){n=!0,d(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},s={abort:i,pause:l,resume:l};if(m(r.userStep)){for(var a=0;a<t.results.data.length&&(r.userStep({data:[t.results.data[a]],errors:t.results.errors,meta:t.results.meta},s),!n);a++);delete t.results}else m(r.userChunk)&&(r.userChunk(t.results,s,t.file),delete t.results)}t.finished&&!n&&d(t.workerId,t.results)}function d(e,t){var r=R[e];m(r.userComplete)&&r.userComplete(t),r.terminate(),delete R[e]}function l(){throw"Not implemented."}function p(t){var r=t.data;if("undefined"==typeof S.WORKER_ID&&r&&(S.WORKER_ID=r.workerId),"string"==typeof r.input)e.postMessage({workerId:S.WORKER_ID,results:S.parse(r.input,r.config),finished:!0});else if(e.File&&r.input instanceof File||r.input instanceof Object){var n=S.parse(r.input,r.config);n&&e.postMessage({workerId:S.WORKER_ID,results:n,finished:!0})}}function _(e){if("object"!=typeof e)return e;var t=e instanceof Array?[]:{};for(var r in e)t[r]=_(e[r]);return t}function g(e,t){return function(){e.apply(t,arguments)}}function m(e){return"function"==typeof e}var v,k=!e.document&&!!e.postMessage,y=k&&/(\?|&)papaworker(=|&|$)/.test(e.location.search),b=!1,R={},w=0,S={};if(S.parse=t,S.unparse=r,S.RECORD_SEP=String.fromCharCode(30),S.UNIT_SEP=String.fromCharCode(31),S.BYTE_ORDER_MARK="﻿",S.BAD_DELIMITERS=["\r","\n",'"',S.BYTE_ORDER_MARK],S.WORKERS_SUPPORTED=!k&&!!e.Worker,S.SCRIPT_PATH=null,S.LocalChunkSize=10485760,S.RemoteChunkSize=5242880,S.DefaultDelimiter=",",S.Parser=u,S.ParserHandle=o,S.NetworkStreamer=i,S.FileStreamer=s,S.StringStreamer=a,"undefined"!=typeof module&&module.exports?module.exports=S:m(e.define)&&e.define.amd?define(function(){return S}):e.Papa=S,e.jQuery){var C=e.jQuery;C.fn.parse=function(t){function r(){if(0==a.length)return void(m(t.complete)&&t.complete());var e=a[0];if(m(t.before)){var r=t.before(e.file,e.inputElem);if("object"==typeof r){if("abort"==r.action)return void n("AbortError",e.file,e.inputElem,r.reason);if("skip"==r.action)return void i();"object"==typeof r.config&&(e.instanceConfig=C.extend(e.instanceConfig,r.config))}else if("skip"==r)return void i()}var s=e.instanceConfig.complete;e.instanceConfig.complete=function(t){m(s)&&s(t,e.file,e.inputElem),i()},S.parse(e.file,e.instanceConfig)}function n(e,r,n,i){m(t.error)&&t.error({name:e},r,n,i)}function i(){a.splice(0,1),r()}var s=t.config||{},a=[];return this.each(function(){var t="INPUT"==C(this).prop("tagName").toUpperCase()&&"file"==C(this).attr("type").toLowerCase()&&e.FileReader;if(!t||!this.files||0==this.files.length)return!0;for(var r=0;r<this.files.length;r++)a.push({file:this.files[r],inputElem:this,instanceConfig:C.extend({},s)})}),r(),this}}y?e.onmessage=p:S.WORKERS_SUPPORTED&&(v=h(),document.body?document.addEventListener("DOMContentLoaded",function(){b=!0},!0):b=!0),i.prototype=Object.create(n.prototype),i.prototype.constructor=i,s.prototype=Object.create(n.prototype),s.prototype.constructor=s,a.prototype=Object.create(a.prototype),a.prototype.constructor=a}("undefined"!=typeof window?window:this);
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

Engine.PokeballSystem = function(game) {
  this.game = game;
  this.countElements = 16;
}

Engine.PokeballSystem.prototype = {
  create: function() {
    this._addPokeballs();
    this._runTimer();
  },

  _addPokeballs: function() {
    this.pokeballs = this.game.add.group();

    for (var i = 0; i < this.countElements; i++) {
      var pokeball = new Phaser.Sprite(this.game, 0, 0, 'pokeball');

      pokeball.anchor.setTo(0.5);

      this.pokeballs.add(pokeball);

      pokeball.kill();
    }
  },

  _runTimer: function() {
    this._timer = this.game.time.create();
    this._timer.loop(Phaser.Timer.SECOND, this.emit, this);
    this._timer.start();
  },

  emit: function() {
    var paddings = 25;
    var scale = this.game.rnd.realInRange(0.25, 0.8);
    var alpha = this.game.rnd.realInRange(0.05, 0.15);

    var pokeball = this.pokeballs.getFirstDead();

    pokeball.revive();
    pokeball.reset(
      this.game.rnd.between(paddings, this.game.width - paddings),
      this.game.rnd.between(paddings, this.game.height - paddings)
    );

    pokeball.alpha = 0;
    pokeball.rotation = 0;
    pokeball.scale.setTo(scale, scale);

    var targetX = this.game.rnd.between(100, 300);
    var targetY = 0;

    if (pokeball.x > this.game.width / 2)
      targetX *= -1;

    var alphaTween = this.game.add.tween(pokeball)
      .to({alpha: alpha}, 2500);

    var speedTween = this.game.add.tween(pokeball)
      .to({x: pokeball.x + targetX}, 6000);

    var rotationTween = this.game.add.tween(pokeball)
      .to({rotation: Math.PI * 2 * this.game.rnd.pick([-1, 1])}, 6000);

    var dieTween = this.game.add.tween(pokeball)
      .to({alpha: 0}, 2500);

    alphaTween.start();
    speedTween.start();
    rotationTween.start();

    alphaTween.chain(dieTween.delay(1000));

    dieTween.onComplete
      .add(function() {
        this.kill();
      }, pokeball);

    // alphaTween.onComplete.add(function() {
    //   this.kill();
    // }, pokeball);
  },

  update: function() {

  },
}

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

Engine.Slide = function(game, text, answers) {
  this.game = game;
  this._marginTopAnswers = 75;
  this._lineSpacingAnswers = 60;
  this._marginTopLable = 200;

  Phaser.Sprite.call(this, game, 0, 0, this._createBackground());

  this.text = text;
  this.answers = answers;
  this.alpha = 0;
  this.visible = false;

  this.game.add.existing(this);

  this._addLable();
  this._addAnswers();
}

Engine.Slide.prototype = Object.create(Phaser.Sprite.prototype);
Engine.Slide.constructor = Engine.Slide;

Engine.Slide.prototype.show = function() {
  this.visible = true;

  this.game.add.tween(this).to({
    alpha: 1
  }, 150).start();
}

Engine.Slide.prototype.hide = function() {
  var tween = this.game.add.tween(this).to({
    alpha: 0
  }, 150).start();

  tween.onComplete.add(function() {
    this.visible = false;
    if (this.callback) {
      this.callback();
    }
  }, this);

  return tween.onComplete;
}

Engine.Slide.prototype.setCallbackCheck = function(callback) {
  this.callback = callback;
}

Engine.Slide.prototype._addLable = function() {
  this._lable = new Phaser.Text(this.game, this.game.world.centerX, this._marginTopLable, this.text, Engine.textStyle);
  this._lable.wordWrap = true;
  this._lable.wordWrapWidth = 600;
  this._lable.align = 'center';
  this._lable.anchor.setTo(0.5);

  this.addChild(this._lable);
}

Engine.Slide.prototype._addAnswers = function() {
  for (var i = 0; i < this.answers.length; i++) {
    var answer = new Engine.Answer(
      this.game,
      this.game.world.centerX,
      this._lable.y + this._marginTopAnswers + this._lineSpacingAnswers * i,
      this.answers[i],
      this.hide,
      this
    );

    answer.anchor.setTo(0.5, 0);
    this.addChild(answer);
  }
}

Engine.Slide.prototype._createBackground = function() {
  var bmp = this.game.add.bitmapData(Engine.GAME_WIDTH, Engine.GAME_HEIGHT);

  bmp.ctx.beginPath();
  bmp.ctx.rect(0, 0, bmp.width, bmp.height);
  bmp.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  bmp.ctx.fill();

  return bmp;
}

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

VK.init(function() {
  /**
   * Успешное иницирование VK API
   * @type {Boolean}
   */
  VK.succesInit = true;
  VK.publicatePhoto();
}, function() {
  VK.succesInit = false;
}, '5.53');

VK.publicatePhoto = function(image) {
  getWallUploadServer()
    .then(function(url) {
      // console.log(url);
      console.log('test');
      console.trace(url);
    });
}

function getWallUploadServer() {
  return new Promise(function(res, rej) {
    VK.api("photos.getWallUploadServer", {}, function (data) {
      res(data);
    });
  });
}

function uploadData(data, url) {
  var boundary = '----------Ij5ae0ae0KM7GI3KM7';
  var imageName = 'image.png';

  var bin = boundary + '\r\nContent-Disposition: form-data; name="file1"; filename="image.png"';
  bin += "\r\nContent-Type: image/png\r\n\r\n"
  bin += data;
  bin += "\r\n--" + boundary + '--\r\n';

  var byteArray = strToArrayBuffer(bin);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
  xhr.send(byteArray);
}

function strToArrayBuffer(str) {
  var buf = new ArrayBuffer(str.length * 2);
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcGFwYXJzZS5taW4uanMiLCJib290LmpzIiwicHJlbG9hZGVyLmpzIiwiYW5zd2VyLmpzIiwiZ2FtZS5qcyIsInBva2ViYWxsLXN5cy5qcyIsInBva2Vtb25EQi5qcyIsInNsaWRlLmpzIiwiY2FsY3VsYXRlLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcblx0UGFwYSBQYXJzZVxuXHR2NC4xLjJcblx0aHR0cHM6Ly9naXRodWIuY29tL21ob2x0L1BhcGFQYXJzZVxuKi9cbiFmdW5jdGlvbihlKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQscil7aWYocj1yfHx7fSxyLndvcmtlciYmUy5XT1JLRVJTX1NVUFBPUlRFRCl7dmFyIG49ZigpO3JldHVybiBuLnVzZXJTdGVwPXIuc3RlcCxuLnVzZXJDaHVuaz1yLmNodW5rLG4udXNlckNvbXBsZXRlPXIuY29tcGxldGUsbi51c2VyRXJyb3I9ci5lcnJvcixyLnN0ZXA9bShyLnN0ZXApLHIuY2h1bms9bShyLmNodW5rKSxyLmNvbXBsZXRlPW0oci5jb21wbGV0ZSksci5lcnJvcj1tKHIuZXJyb3IpLGRlbGV0ZSByLndvcmtlcix2b2lkIG4ucG9zdE1lc3NhZ2Uoe2lucHV0OnQsY29uZmlnOnIsd29ya2VySWQ6bi5pZH0pfXZhciBvPW51bGw7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIHQ/bz1yLmRvd25sb2FkP25ldyBpKHIpOm5ldyBhKHIpOihlLkZpbGUmJnQgaW5zdGFuY2VvZiBGaWxlfHx0IGluc3RhbmNlb2YgT2JqZWN0KSYmKG89bmV3IHMocikpLG8uc3RyZWFtKHQpfWZ1bmN0aW9uIHIoZSx0KXtmdW5jdGlvbiByKCl7XCJvYmplY3RcIj09dHlwZW9mIHQmJihcInN0cmluZ1wiPT10eXBlb2YgdC5kZWxpbWl0ZXImJjE9PXQuZGVsaW1pdGVyLmxlbmd0aCYmLTE9PVMuQkFEX0RFTElNSVRFUlMuaW5kZXhPZih0LmRlbGltaXRlcikmJih1PXQuZGVsaW1pdGVyKSwoXCJib29sZWFuXCI9PXR5cGVvZiB0LnF1b3Rlc3x8dC5xdW90ZXMgaW5zdGFuY2VvZiBBcnJheSkmJihvPXQucXVvdGVzKSxcInN0cmluZ1wiPT10eXBlb2YgdC5uZXdsaW5lJiYoaD10Lm5ld2xpbmUpKX1mdW5jdGlvbiBuKGUpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiBlKXJldHVybltdO3ZhciB0PVtdO2Zvcih2YXIgciBpbiBlKXQucHVzaChyKTtyZXR1cm4gdH1mdW5jdGlvbiBpKGUsdCl7dmFyIHI9XCJcIjtcInN0cmluZ1wiPT10eXBlb2YgZSYmKGU9SlNPTi5wYXJzZShlKSksXCJzdHJpbmdcIj09dHlwZW9mIHQmJih0PUpTT04ucGFyc2UodCkpO3ZhciBuPWUgaW5zdGFuY2VvZiBBcnJheSYmZS5sZW5ndGg+MCxpPSEodFswXWluc3RhbmNlb2YgQXJyYXkpO2lmKG4pe2Zvcih2YXIgYT0wO2E8ZS5sZW5ndGg7YSsrKWE+MCYmKHIrPXUpLHIrPXMoZVthXSxhKTt0Lmxlbmd0aD4wJiYocis9aCl9Zm9yKHZhciBvPTA7bzx0Lmxlbmd0aDtvKyspe2Zvcih2YXIgZj1uP2UubGVuZ3RoOnRbb10ubGVuZ3RoLGM9MDtmPmM7YysrKXtjPjAmJihyKz11KTt2YXIgZD1uJiZpP2VbY106YztyKz1zKHRbb11bZF0sYyl9bzx0Lmxlbmd0aC0xJiYocis9aCl9cmV0dXJuIHJ9ZnVuY3Rpb24gcyhlLHQpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBlfHxudWxsPT09ZSlyZXR1cm5cIlwiO2U9ZS50b1N0cmluZygpLnJlcGxhY2UoL1wiL2csJ1wiXCInKTt2YXIgcj1cImJvb2xlYW5cIj09dHlwZW9mIG8mJm98fG8gaW5zdGFuY2VvZiBBcnJheSYmb1t0XXx8YShlLFMuQkFEX0RFTElNSVRFUlMpfHxlLmluZGV4T2YodSk+LTF8fFwiIFwiPT1lLmNoYXJBdCgwKXx8XCIgXCI9PWUuY2hhckF0KGUubGVuZ3RoLTEpO3JldHVybiByPydcIicrZSsnXCInOmV9ZnVuY3Rpb24gYShlLHQpe2Zvcih2YXIgcj0wO3I8dC5sZW5ndGg7cisrKWlmKGUuaW5kZXhPZih0W3JdKT4tMSlyZXR1cm4hMDtyZXR1cm4hMX12YXIgbz0hMSx1PVwiLFwiLGg9XCJcXHJcXG5cIjtpZihyKCksXCJzdHJpbmdcIj09dHlwZW9mIGUmJihlPUpTT04ucGFyc2UoZSkpLGUgaW5zdGFuY2VvZiBBcnJheSl7aWYoIWUubGVuZ3RofHxlWzBdaW5zdGFuY2VvZiBBcnJheSlyZXR1cm4gaShudWxsLGUpO2lmKFwib2JqZWN0XCI9PXR5cGVvZiBlWzBdKXJldHVybiBpKG4oZVswXSksZSl9ZWxzZSBpZihcIm9iamVjdFwiPT10eXBlb2YgZSlyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgZS5kYXRhJiYoZS5kYXRhPUpTT04ucGFyc2UoZS5kYXRhKSksZS5kYXRhIGluc3RhbmNlb2YgQXJyYXkmJihlLmZpZWxkc3x8KGUuZmllbGRzPWUuZGF0YVswXWluc3RhbmNlb2YgQXJyYXk/ZS5maWVsZHM6bihlLmRhdGFbMF0pKSxlLmRhdGFbMF1pbnN0YW5jZW9mIEFycmF5fHxcIm9iamVjdFwiPT10eXBlb2YgZS5kYXRhWzBdfHwoZS5kYXRhPVtlLmRhdGFdKSksaShlLmZpZWxkc3x8W10sZS5kYXRhfHxbXSk7dGhyb3dcImV4Y2VwdGlvbjogVW5hYmxlIHRvIHNlcmlhbGl6ZSB1bnJlY29nbml6ZWQgaW5wdXRcIn1mdW5jdGlvbiBuKHQpe2Z1bmN0aW9uIHIoZSl7dmFyIHQ9XyhlKTt0LmNodW5rU2l6ZT1wYXJzZUludCh0LmNodW5rU2l6ZSksZS5zdGVwfHxlLmNodW5rfHwodC5jaHVua1NpemU9bnVsbCksdGhpcy5faGFuZGxlPW5ldyBvKHQpLHRoaXMuX2hhbmRsZS5zdHJlYW1lcj10aGlzLHRoaXMuX2NvbmZpZz10fXRoaXMuX2hhbmRsZT1udWxsLHRoaXMuX3BhdXNlZD0hMSx0aGlzLl9maW5pc2hlZD0hMSx0aGlzLl9pbnB1dD1udWxsLHRoaXMuX2Jhc2VJbmRleD0wLHRoaXMuX3BhcnRpYWxMaW5lPVwiXCIsdGhpcy5fcm93Q291bnQ9MCx0aGlzLl9zdGFydD0wLHRoaXMuX25leHRDaHVuaz1udWxsLHRoaXMuaXNGaXJzdENodW5rPSEwLHRoaXMuX2NvbXBsZXRlUmVzdWx0cz17ZGF0YTpbXSxlcnJvcnM6W10sbWV0YTp7fX0sci5jYWxsKHRoaXMsdCksdGhpcy5wYXJzZUNodW5rPWZ1bmN0aW9uKHQpe2lmKHRoaXMuaXNGaXJzdENodW5rJiZtKHRoaXMuX2NvbmZpZy5iZWZvcmVGaXJzdENodW5rKSl7dmFyIHI9dGhpcy5fY29uZmlnLmJlZm9yZUZpcnN0Q2h1bmsodCk7dm9pZCAwIT09ciYmKHQ9cil9dGhpcy5pc0ZpcnN0Q2h1bms9ITE7dmFyIG49dGhpcy5fcGFydGlhbExpbmUrdDt0aGlzLl9wYXJ0aWFsTGluZT1cIlwiO3ZhciBpPXRoaXMuX2hhbmRsZS5wYXJzZShuLHRoaXMuX2Jhc2VJbmRleCwhdGhpcy5fZmluaXNoZWQpO2lmKCF0aGlzLl9oYW5kbGUucGF1c2VkKCkmJiF0aGlzLl9oYW5kbGUuYWJvcnRlZCgpKXt2YXIgcz1pLm1ldGEuY3Vyc29yO3RoaXMuX2ZpbmlzaGVkfHwodGhpcy5fcGFydGlhbExpbmU9bi5zdWJzdHJpbmcocy10aGlzLl9iYXNlSW5kZXgpLHRoaXMuX2Jhc2VJbmRleD1zKSxpJiZpLmRhdGEmJih0aGlzLl9yb3dDb3VudCs9aS5kYXRhLmxlbmd0aCk7dmFyIGE9dGhpcy5fZmluaXNoZWR8fHRoaXMuX2NvbmZpZy5wcmV2aWV3JiZ0aGlzLl9yb3dDb3VudD49dGhpcy5fY29uZmlnLnByZXZpZXc7aWYoeSllLnBvc3RNZXNzYWdlKHtyZXN1bHRzOmksd29ya2VySWQ6Uy5XT1JLRVJfSUQsZmluaXNoZWQ6YX0pO2Vsc2UgaWYobSh0aGlzLl9jb25maWcuY2h1bmspKXtpZih0aGlzLl9jb25maWcuY2h1bmsoaSx0aGlzLl9oYW5kbGUpLHRoaXMuX3BhdXNlZClyZXR1cm47aT12b2lkIDAsdGhpcy5fY29tcGxldGVSZXN1bHRzPXZvaWQgMH1yZXR1cm4gdGhpcy5fY29uZmlnLnN0ZXB8fHRoaXMuX2NvbmZpZy5jaHVua3x8KHRoaXMuX2NvbXBsZXRlUmVzdWx0cy5kYXRhPXRoaXMuX2NvbXBsZXRlUmVzdWx0cy5kYXRhLmNvbmNhdChpLmRhdGEpLHRoaXMuX2NvbXBsZXRlUmVzdWx0cy5lcnJvcnM9dGhpcy5fY29tcGxldGVSZXN1bHRzLmVycm9ycy5jb25jYXQoaS5lcnJvcnMpLHRoaXMuX2NvbXBsZXRlUmVzdWx0cy5tZXRhPWkubWV0YSksIWF8fCFtKHRoaXMuX2NvbmZpZy5jb21wbGV0ZSl8fGkmJmkubWV0YS5hYm9ydGVkfHx0aGlzLl9jb25maWcuY29tcGxldGUodGhpcy5fY29tcGxldGVSZXN1bHRzKSxhfHxpJiZpLm1ldGEucGF1c2VkfHx0aGlzLl9uZXh0Q2h1bmsoKSxpfX0sdGhpcy5fc2VuZEVycm9yPWZ1bmN0aW9uKHQpe20odGhpcy5fY29uZmlnLmVycm9yKT90aGlzLl9jb25maWcuZXJyb3IodCk6eSYmdGhpcy5fY29uZmlnLmVycm9yJiZlLnBvc3RNZXNzYWdlKHt3b3JrZXJJZDpTLldPUktFUl9JRCxlcnJvcjp0LGZpbmlzaGVkOiExfSl9fWZ1bmN0aW9uIGkoZSl7ZnVuY3Rpb24gdChlKXt2YXIgdD1lLmdldFJlc3BvbnNlSGVhZGVyKFwiQ29udGVudC1SYW5nZVwiKTtyZXR1cm4gcGFyc2VJbnQodC5zdWJzdHIodC5sYXN0SW5kZXhPZihcIi9cIikrMSkpfWU9ZXx8e30sZS5jaHVua1NpemV8fChlLmNodW5rU2l6ZT1TLlJlbW90ZUNodW5rU2l6ZSksbi5jYWxsKHRoaXMsZSk7dmFyIHI7dGhpcy5fbmV4dENodW5rPWs/ZnVuY3Rpb24oKXt0aGlzLl9yZWFkQ2h1bmsoKSx0aGlzLl9jaHVua0xvYWRlZCgpfTpmdW5jdGlvbigpe3RoaXMuX3JlYWRDaHVuaygpfSx0aGlzLnN0cmVhbT1mdW5jdGlvbihlKXt0aGlzLl9pbnB1dD1lLHRoaXMuX25leHRDaHVuaygpfSx0aGlzLl9yZWFkQ2h1bms9ZnVuY3Rpb24oKXtpZih0aGlzLl9maW5pc2hlZClyZXR1cm4gdm9pZCB0aGlzLl9jaHVua0xvYWRlZCgpO2lmKHI9bmV3IFhNTEh0dHBSZXF1ZXN0LGt8fChyLm9ubG9hZD1nKHRoaXMuX2NodW5rTG9hZGVkLHRoaXMpLHIub25lcnJvcj1nKHRoaXMuX2NodW5rRXJyb3IsdGhpcykpLHIub3BlbihcIkdFVFwiLHRoaXMuX2lucHV0LCFrKSx0aGlzLl9jb25maWcuY2h1bmtTaXplKXt2YXIgZT10aGlzLl9zdGFydCt0aGlzLl9jb25maWcuY2h1bmtTaXplLTE7ci5zZXRSZXF1ZXN0SGVhZGVyKFwiUmFuZ2VcIixcImJ5dGVzPVwiK3RoaXMuX3N0YXJ0K1wiLVwiK2UpLHIuc2V0UmVxdWVzdEhlYWRlcihcIklmLU5vbmUtTWF0Y2hcIixcIndlYmtpdC1uby1jYWNoZVwiKX10cnl7ci5zZW5kKCl9Y2F0Y2godCl7dGhpcy5fY2h1bmtFcnJvcih0Lm1lc3NhZ2UpfWsmJjA9PXIuc3RhdHVzP3RoaXMuX2NodW5rRXJyb3IoKTp0aGlzLl9zdGFydCs9dGhpcy5fY29uZmlnLmNodW5rU2l6ZX0sdGhpcy5fY2h1bmtMb2FkZWQ9ZnVuY3Rpb24oKXtpZig0PT1yLnJlYWR5U3RhdGUpe2lmKHIuc3RhdHVzPDIwMHx8ci5zdGF0dXM+PTQwMClyZXR1cm4gdm9pZCB0aGlzLl9jaHVua0Vycm9yKCk7dGhpcy5fZmluaXNoZWQ9IXRoaXMuX2NvbmZpZy5jaHVua1NpemV8fHRoaXMuX3N0YXJ0PnQociksdGhpcy5wYXJzZUNodW5rKHIucmVzcG9uc2VUZXh0KX19LHRoaXMuX2NodW5rRXJyb3I9ZnVuY3Rpb24oZSl7dmFyIHQ9ci5zdGF0dXNUZXh0fHxlO3RoaXMuX3NlbmRFcnJvcih0KX19ZnVuY3Rpb24gcyhlKXtlPWV8fHt9LGUuY2h1bmtTaXplfHwoZS5jaHVua1NpemU9Uy5Mb2NhbENodW5rU2l6ZSksbi5jYWxsKHRoaXMsZSk7dmFyIHQscixpPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBGaWxlUmVhZGVyO3RoaXMuc3RyZWFtPWZ1bmN0aW9uKGUpe3RoaXMuX2lucHV0PWUscj1lLnNsaWNlfHxlLndlYmtpdFNsaWNlfHxlLm1velNsaWNlLGk/KHQ9bmV3IEZpbGVSZWFkZXIsdC5vbmxvYWQ9Zyh0aGlzLl9jaHVua0xvYWRlZCx0aGlzKSx0Lm9uZXJyb3I9Zyh0aGlzLl9jaHVua0Vycm9yLHRoaXMpKTp0PW5ldyBGaWxlUmVhZGVyU3luYyx0aGlzLl9uZXh0Q2h1bmsoKX0sdGhpcy5fbmV4dENodW5rPWZ1bmN0aW9uKCl7dGhpcy5fZmluaXNoZWR8fHRoaXMuX2NvbmZpZy5wcmV2aWV3JiYhKHRoaXMuX3Jvd0NvdW50PHRoaXMuX2NvbmZpZy5wcmV2aWV3KXx8dGhpcy5fcmVhZENodW5rKCl9LHRoaXMuX3JlYWRDaHVuaz1mdW5jdGlvbigpe3ZhciBlPXRoaXMuX2lucHV0O2lmKHRoaXMuX2NvbmZpZy5jaHVua1NpemUpe3ZhciBuPU1hdGgubWluKHRoaXMuX3N0YXJ0K3RoaXMuX2NvbmZpZy5jaHVua1NpemUsdGhpcy5faW5wdXQuc2l6ZSk7ZT1yLmNhbGwoZSx0aGlzLl9zdGFydCxuKX12YXIgcz10LnJlYWRBc1RleHQoZSx0aGlzLl9jb25maWcuZW5jb2RpbmcpO2l8fHRoaXMuX2NodW5rTG9hZGVkKHt0YXJnZXQ6e3Jlc3VsdDpzfX0pfSx0aGlzLl9jaHVua0xvYWRlZD1mdW5jdGlvbihlKXt0aGlzLl9zdGFydCs9dGhpcy5fY29uZmlnLmNodW5rU2l6ZSx0aGlzLl9maW5pc2hlZD0hdGhpcy5fY29uZmlnLmNodW5rU2l6ZXx8dGhpcy5fc3RhcnQ+PXRoaXMuX2lucHV0LnNpemUsdGhpcy5wYXJzZUNodW5rKGUudGFyZ2V0LnJlc3VsdCl9LHRoaXMuX2NodW5rRXJyb3I9ZnVuY3Rpb24oKXt0aGlzLl9zZW5kRXJyb3IodC5lcnJvcil9fWZ1bmN0aW9uIGEoZSl7ZT1lfHx7fSxuLmNhbGwodGhpcyxlKTt2YXIgdCxyO3RoaXMuc3RyZWFtPWZ1bmN0aW9uKGUpe3JldHVybiB0PWUscj1lLHRoaXMuX25leHRDaHVuaygpfSx0aGlzLl9uZXh0Q2h1bms9ZnVuY3Rpb24oKXtpZighdGhpcy5fZmluaXNoZWQpe3ZhciBlPXRoaXMuX2NvbmZpZy5jaHVua1NpemUsdD1lP3Iuc3Vic3RyKDAsZSk6cjtyZXR1cm4gcj1lP3Iuc3Vic3RyKGUpOlwiXCIsdGhpcy5fZmluaXNoZWQ9IXIsdGhpcy5wYXJzZUNodW5rKHQpfX19ZnVuY3Rpb24gbyhlKXtmdW5jdGlvbiB0KCl7aWYoYiYmZCYmKGgoXCJEZWxpbWl0ZXJcIixcIlVuZGV0ZWN0YWJsZURlbGltaXRlclwiLFwiVW5hYmxlIHRvIGF1dG8tZGV0ZWN0IGRlbGltaXRpbmcgY2hhcmFjdGVyOyBkZWZhdWx0ZWQgdG8gJ1wiK1MuRGVmYXVsdERlbGltaXRlcitcIidcIiksZD0hMSksZS5za2lwRW1wdHlMaW5lcylmb3IodmFyIHQ9MDt0PGIuZGF0YS5sZW5ndGg7dCsrKTE9PWIuZGF0YVt0XS5sZW5ndGgmJlwiXCI9PWIuZGF0YVt0XVswXSYmYi5kYXRhLnNwbGljZSh0LS0sMSk7cmV0dXJuIHIoKSYmbigpLGkoKX1mdW5jdGlvbiByKCl7cmV0dXJuIGUuaGVhZGVyJiYwPT15Lmxlbmd0aH1mdW5jdGlvbiBuKCl7aWYoYil7Zm9yKHZhciBlPTA7cigpJiZlPGIuZGF0YS5sZW5ndGg7ZSsrKWZvcih2YXIgdD0wO3Q8Yi5kYXRhW2VdLmxlbmd0aDt0KyspeS5wdXNoKGIuZGF0YVtlXVt0XSk7Yi5kYXRhLnNwbGljZSgwLDEpfX1mdW5jdGlvbiBpKCl7aWYoIWJ8fCFlLmhlYWRlciYmIWUuZHluYW1pY1R5cGluZylyZXR1cm4gYjtmb3IodmFyIHQ9MDt0PGIuZGF0YS5sZW5ndGg7dCsrKXtmb3IodmFyIHI9e30sbj0wO248Yi5kYXRhW3RdLmxlbmd0aDtuKyspe2lmKGUuZHluYW1pY1R5cGluZyl7dmFyIGk9Yi5kYXRhW3RdW25dO2IuZGF0YVt0XVtuXT1cInRydWVcIj09aXx8XCJUUlVFXCI9PWk/ITA6XCJmYWxzZVwiPT1pfHxcIkZBTFNFXCI9PWk/ITE6byhpKX1lLmhlYWRlciYmKG4+PXkubGVuZ3RoPyhyLl9fcGFyc2VkX2V4dHJhfHwoci5fX3BhcnNlZF9leHRyYT1bXSksci5fX3BhcnNlZF9leHRyYS5wdXNoKGIuZGF0YVt0XVtuXSkpOnJbeVtuXV09Yi5kYXRhW3RdW25dKX1lLmhlYWRlciYmKGIuZGF0YVt0XT1yLG4+eS5sZW5ndGg/aChcIkZpZWxkTWlzbWF0Y2hcIixcIlRvb01hbnlGaWVsZHNcIixcIlRvbyBtYW55IGZpZWxkczogZXhwZWN0ZWQgXCIreS5sZW5ndGgrXCIgZmllbGRzIGJ1dCBwYXJzZWQgXCIrbix0KTpuPHkubGVuZ3RoJiZoKFwiRmllbGRNaXNtYXRjaFwiLFwiVG9vRmV3RmllbGRzXCIsXCJUb28gZmV3IGZpZWxkczogZXhwZWN0ZWQgXCIreS5sZW5ndGgrXCIgZmllbGRzIGJ1dCBwYXJzZWQgXCIrbix0KSl9cmV0dXJuIGUuaGVhZGVyJiZiLm1ldGEmJihiLm1ldGEuZmllbGRzPXkpLGJ9ZnVuY3Rpb24gcyh0KXtmb3IodmFyIHIsbixpLHM9W1wiLFwiLFwiXHRcIixcInxcIixcIjtcIixTLlJFQ09SRF9TRVAsUy5VTklUX1NFUF0sYT0wO2E8cy5sZW5ndGg7YSsrKXt2YXIgbz1zW2FdLGg9MCxmPTA7aT12b2lkIDA7Zm9yKHZhciBjPW5ldyB1KHtkZWxpbWl0ZXI6byxwcmV2aWV3OjEwfSkucGFyc2UodCksZD0wO2Q8Yy5kYXRhLmxlbmd0aDtkKyspe3ZhciBsPWMuZGF0YVtkXS5sZW5ndGg7Zis9bCxcInVuZGVmaW5lZFwiIT10eXBlb2YgaT9sPjEmJihoKz1NYXRoLmFicyhsLWkpLGk9bCk6aT1sfWMuZGF0YS5sZW5ndGg+MCYmKGYvPWMuZGF0YS5sZW5ndGgpLChcInVuZGVmaW5lZFwiPT10eXBlb2Ygbnx8bj5oKSYmZj4xLjk5JiYobj1oLHI9byl9cmV0dXJuIGUuZGVsaW1pdGVyPXIse3N1Y2Nlc3NmdWw6ISFyLGJlc3REZWxpbWl0ZXI6cn19ZnVuY3Rpb24gYShlKXtlPWUuc3Vic3RyKDAsMTA0ODU3Nik7dmFyIHQ9ZS5zcGxpdChcIlxcclwiKTtpZigxPT10Lmxlbmd0aClyZXR1cm5cIlxcblwiO2Zvcih2YXIgcj0wLG49MDtuPHQubGVuZ3RoO24rKylcIlxcblwiPT10W25dWzBdJiZyKys7cmV0dXJuIHI+PXQubGVuZ3RoLzI/XCJcXHJcXG5cIjpcIlxcclwifWZ1bmN0aW9uIG8oZSl7dmFyIHQ9bC50ZXN0KGUpO3JldHVybiB0P3BhcnNlRmxvYXQoZSk6ZX1mdW5jdGlvbiBoKGUsdCxyLG4pe2IuZXJyb3JzLnB1c2goe3R5cGU6ZSxjb2RlOnQsbWVzc2FnZTpyLHJvdzpufSl9dmFyIGYsYyxkLGw9L15cXHMqLT8oXFxkKlxcLj9cXGQrfFxcZCtcXC4/XFxkKikoZVstK10/XFxkKyk/XFxzKiQvaSxwPXRoaXMsZz0wLHY9ITEsaz0hMSx5PVtdLGI9e2RhdGE6W10sZXJyb3JzOltdLG1ldGE6e319O2lmKG0oZS5zdGVwKSl7dmFyIFI9ZS5zdGVwO2Uuc3RlcD1mdW5jdGlvbihuKXtpZihiPW4scigpKXQoKTtlbHNle2lmKHQoKSwwPT1iLmRhdGEubGVuZ3RoKXJldHVybjtnKz1uLmRhdGEubGVuZ3RoLGUucHJldmlldyYmZz5lLnByZXZpZXc/Yy5hYm9ydCgpOlIoYixwKX19fXRoaXMucGFyc2U9ZnVuY3Rpb24ocixuLGkpe2lmKGUubmV3bGluZXx8KGUubmV3bGluZT1hKHIpKSxkPSExLCFlLmRlbGltaXRlcil7dmFyIG89cyhyKTtvLnN1Y2Nlc3NmdWw/ZS5kZWxpbWl0ZXI9by5iZXN0RGVsaW1pdGVyOihkPSEwLGUuZGVsaW1pdGVyPVMuRGVmYXVsdERlbGltaXRlciksYi5tZXRhLmRlbGltaXRlcj1lLmRlbGltaXRlcn12YXIgaD1fKGUpO3JldHVybiBlLnByZXZpZXcmJmUuaGVhZGVyJiZoLnByZXZpZXcrKyxmPXIsYz1uZXcgdShoKSxiPWMucGFyc2UoZixuLGkpLHQoKSx2P3ttZXRhOntwYXVzZWQ6ITB9fTpifHx7bWV0YTp7cGF1c2VkOiExfX19LHRoaXMucGF1c2VkPWZ1bmN0aW9uKCl7cmV0dXJuIHZ9LHRoaXMucGF1c2U9ZnVuY3Rpb24oKXt2PSEwLGMuYWJvcnQoKSxmPWYuc3Vic3RyKGMuZ2V0Q2hhckluZGV4KCkpfSx0aGlzLnJlc3VtZT1mdW5jdGlvbigpe3Y9ITEscC5zdHJlYW1lci5wYXJzZUNodW5rKGYpfSx0aGlzLmFib3J0ZWQ9ZnVuY3Rpb24oKXtyZXR1cm4ga30sdGhpcy5hYm9ydD1mdW5jdGlvbigpe2s9ITAsYy5hYm9ydCgpLGIubWV0YS5hYm9ydGVkPSEwLG0oZS5jb21wbGV0ZSkmJmUuY29tcGxldGUoYiksZj1cIlwifX1mdW5jdGlvbiB1KGUpe2U9ZXx8e307dmFyIHQ9ZS5kZWxpbWl0ZXIscj1lLm5ld2xpbmUsbj1lLmNvbW1lbnRzLGk9ZS5zdGVwLHM9ZS5wcmV2aWV3LGE9ZS5mYXN0TW9kZTtpZigoXCJzdHJpbmdcIiE9dHlwZW9mIHR8fFMuQkFEX0RFTElNSVRFUlMuaW5kZXhPZih0KT4tMSkmJih0PVwiLFwiKSxuPT09dCl0aHJvd1wiQ29tbWVudCBjaGFyYWN0ZXIgc2FtZSBhcyBkZWxpbWl0ZXJcIjtuPT09ITA/bj1cIiNcIjooXCJzdHJpbmdcIiE9dHlwZW9mIG58fFMuQkFEX0RFTElNSVRFUlMuaW5kZXhPZihuKT4tMSkmJihuPSExKSxcIlxcblwiIT1yJiZcIlxcclwiIT1yJiZcIlxcclxcblwiIT1yJiYocj1cIlxcblwiKTt2YXIgbz0wLHU9ITE7dGhpcy5wYXJzZT1mdW5jdGlvbihlLGgsZil7ZnVuY3Rpb24gYyhlKXtiLnB1c2goZSksUz1vfWZ1bmN0aW9uIGQodCl7cmV0dXJuIGY/cCgpOihcInVuZGVmaW5lZFwiPT10eXBlb2YgdCYmKHQ9ZS5zdWJzdHIobykpLHcucHVzaCh0KSxvPWcsYyh3KSx5JiZfKCkscCgpKX1mdW5jdGlvbiBsKHQpe289dCxjKHcpLHc9W10sTz1lLmluZGV4T2YocixvKX1mdW5jdGlvbiBwKGUpe3JldHVybntkYXRhOmIsZXJyb3JzOlIsbWV0YTp7ZGVsaW1pdGVyOnQsbGluZWJyZWFrOnIsYWJvcnRlZDp1LHRydW5jYXRlZDohIWUsY3Vyc29yOlMrKGh8fDApfX19ZnVuY3Rpb24gXygpe2kocCgpKSxiPVtdLFI9W119aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGUpdGhyb3dcIklucHV0IG11c3QgYmUgYSBzdHJpbmdcIjt2YXIgZz1lLmxlbmd0aCxtPXQubGVuZ3RoLHY9ci5sZW5ndGgsaz1uLmxlbmd0aCx5PVwiZnVuY3Rpb25cIj09dHlwZW9mIGk7bz0wO3ZhciBiPVtdLFI9W10sdz1bXSxTPTA7aWYoIWUpcmV0dXJuIHAoKTtpZihhfHxhIT09ITEmJi0xPT09ZS5pbmRleE9mKCdcIicpKXtmb3IodmFyIEM9ZS5zcGxpdChyKSxFPTA7RTxDLmxlbmd0aDtFKyspe3ZhciB3PUNbRV07aWYobys9dy5sZW5ndGgsRSE9PUMubGVuZ3RoLTEpbys9ci5sZW5ndGg7ZWxzZSBpZihmKXJldHVybiBwKCk7aWYoIW58fHcuc3Vic3RyKDAsaykhPW4pe2lmKHkpe2lmKGI9W10sYyh3LnNwbGl0KHQpKSxfKCksdSlyZXR1cm4gcCgpfWVsc2UgYyh3LnNwbGl0KHQpKTtpZihzJiZFPj1zKXJldHVybiBiPWIuc2xpY2UoMCxzKSxwKCEwKX19cmV0dXJuIHAoKX1mb3IodmFyIHg9ZS5pbmRleE9mKHQsbyksTz1lLmluZGV4T2YocixvKTs7KWlmKCdcIichPWVbb10paWYobiYmMD09PXcubGVuZ3RoJiZlLnN1YnN0cihvLGspPT09bil7aWYoLTE9PU8pcmV0dXJuIHAoKTtvPU8rdixPPWUuaW5kZXhPZihyLG8pLHg9ZS5pbmRleE9mKHQsbyl9ZWxzZSBpZigtMSE9PXgmJihPPnh8fC0xPT09Tykpdy5wdXNoKGUuc3Vic3RyaW5nKG8seCkpLG89eCttLHg9ZS5pbmRleE9mKHQsbyk7ZWxzZXtpZigtMT09PU8pYnJlYWs7aWYody5wdXNoKGUuc3Vic3RyaW5nKG8sTykpLGwoTyt2KSx5JiYoXygpLHUpKXJldHVybiBwKCk7aWYocyYmYi5sZW5ndGg+PXMpcmV0dXJuIHAoITApfWVsc2V7dmFyIEk9bztmb3IobysrOzspe3ZhciBJPWUuaW5kZXhPZignXCInLEkrMSk7aWYoLTE9PT1JKXJldHVybiBmfHxSLnB1c2goe3R5cGU6XCJRdW90ZXNcIixjb2RlOlwiTWlzc2luZ1F1b3Rlc1wiLG1lc3NhZ2U6XCJRdW90ZWQgZmllbGQgdW50ZXJtaW5hdGVkXCIscm93OmIubGVuZ3RoLGluZGV4Om99KSxkKCk7aWYoST09PWctMSl7dmFyIEQ9ZS5zdWJzdHJpbmcobyxJKS5yZXBsYWNlKC9cIlwiL2csJ1wiJyk7cmV0dXJuIGQoRCl9aWYoJ1wiJyE9ZVtJKzFdKXtpZihlW0krMV09PXQpe3cucHVzaChlLnN1YnN0cmluZyhvLEkpLnJlcGxhY2UoL1wiXCIvZywnXCInKSksbz1JKzErbSx4PWUuaW5kZXhPZih0LG8pLE89ZS5pbmRleE9mKHIsbyk7YnJlYWt9aWYoZS5zdWJzdHIoSSsxLHYpPT09cil7aWYody5wdXNoKGUuc3Vic3RyaW5nKG8sSSkucmVwbGFjZSgvXCJcIi9nLCdcIicpKSxsKEkrMSt2KSx4PWUuaW5kZXhPZih0LG8pLHkmJihfKCksdSkpcmV0dXJuIHAoKTtpZihzJiZiLmxlbmd0aD49cylyZXR1cm4gcCghMCk7YnJlYWt9fWVsc2UgSSsrfX1yZXR1cm4gZCgpfSx0aGlzLmFib3J0PWZ1bmN0aW9uKCl7dT0hMH0sdGhpcy5nZXRDaGFySW5kZXg9ZnVuY3Rpb24oKXtyZXR1cm4gb319ZnVuY3Rpb24gaCgpe3ZhciBlPWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO3JldHVybiBlLmxlbmd0aD9lW2UubGVuZ3RoLTFdLnNyYzpcIlwifWZ1bmN0aW9uIGYoKXtpZighUy5XT1JLRVJTX1NVUFBPUlRFRClyZXR1cm4hMTtpZighYiYmbnVsbD09PVMuU0NSSVBUX1BBVEgpdGhyb3cgbmV3IEVycm9yKFwiU2NyaXB0IHBhdGggY2Fubm90IGJlIGRldGVybWluZWQgYXV0b21hdGljYWxseSB3aGVuIFBhcGEgUGFyc2UgaXMgbG9hZGVkIGFzeW5jaHJvbm91c2x5LiBZb3UgbmVlZCB0byBzZXQgUGFwYS5TQ1JJUFRfUEFUSCBtYW51YWxseS5cIik7dmFyIHQ9Uy5TQ1JJUFRfUEFUSHx8djt0Kz0oLTEhPT10LmluZGV4T2YoXCI/XCIpP1wiJlwiOlwiP1wiKStcInBhcGF3b3JrZXJcIjt2YXIgcj1uZXcgZS5Xb3JrZXIodCk7cmV0dXJuIHIub25tZXNzYWdlPWMsci5pZD13KyssUltyLmlkXT1yLHJ9ZnVuY3Rpb24gYyhlKXt2YXIgdD1lLmRhdGEscj1SW3Qud29ya2VySWRdLG49ITE7aWYodC5lcnJvcilyLnVzZXJFcnJvcih0LmVycm9yLHQuZmlsZSk7ZWxzZSBpZih0LnJlc3VsdHMmJnQucmVzdWx0cy5kYXRhKXt2YXIgaT1mdW5jdGlvbigpe249ITAsZCh0LndvcmtlcklkLHtkYXRhOltdLGVycm9yczpbXSxtZXRhOnthYm9ydGVkOiEwfX0pfSxzPXthYm9ydDppLHBhdXNlOmwscmVzdW1lOmx9O2lmKG0oci51c2VyU3RlcCkpe2Zvcih2YXIgYT0wO2E8dC5yZXN1bHRzLmRhdGEubGVuZ3RoJiYoci51c2VyU3RlcCh7ZGF0YTpbdC5yZXN1bHRzLmRhdGFbYV1dLGVycm9yczp0LnJlc3VsdHMuZXJyb3JzLG1ldGE6dC5yZXN1bHRzLm1ldGF9LHMpLCFuKTthKyspO2RlbGV0ZSB0LnJlc3VsdHN9ZWxzZSBtKHIudXNlckNodW5rKSYmKHIudXNlckNodW5rKHQucmVzdWx0cyxzLHQuZmlsZSksZGVsZXRlIHQucmVzdWx0cyl9dC5maW5pc2hlZCYmIW4mJmQodC53b3JrZXJJZCx0LnJlc3VsdHMpfWZ1bmN0aW9uIGQoZSx0KXt2YXIgcj1SW2VdO20oci51c2VyQ29tcGxldGUpJiZyLnVzZXJDb21wbGV0ZSh0KSxyLnRlcm1pbmF0ZSgpLGRlbGV0ZSBSW2VdfWZ1bmN0aW9uIGwoKXt0aHJvd1wiTm90IGltcGxlbWVudGVkLlwifWZ1bmN0aW9uIHAodCl7dmFyIHI9dC5kYXRhO2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBTLldPUktFUl9JRCYmciYmKFMuV09SS0VSX0lEPXIud29ya2VySWQpLFwic3RyaW5nXCI9PXR5cGVvZiByLmlucHV0KWUucG9zdE1lc3NhZ2Uoe3dvcmtlcklkOlMuV09SS0VSX0lELHJlc3VsdHM6Uy5wYXJzZShyLmlucHV0LHIuY29uZmlnKSxmaW5pc2hlZDohMH0pO2Vsc2UgaWYoZS5GaWxlJiZyLmlucHV0IGluc3RhbmNlb2YgRmlsZXx8ci5pbnB1dCBpbnN0YW5jZW9mIE9iamVjdCl7dmFyIG49Uy5wYXJzZShyLmlucHV0LHIuY29uZmlnKTtuJiZlLnBvc3RNZXNzYWdlKHt3b3JrZXJJZDpTLldPUktFUl9JRCxyZXN1bHRzOm4sZmluaXNoZWQ6ITB9KX19ZnVuY3Rpb24gXyhlKXtpZihcIm9iamVjdFwiIT10eXBlb2YgZSlyZXR1cm4gZTt2YXIgdD1lIGluc3RhbmNlb2YgQXJyYXk/W106e307Zm9yKHZhciByIGluIGUpdFtyXT1fKGVbcl0pO3JldHVybiB0fWZ1bmN0aW9uIGcoZSx0KXtyZXR1cm4gZnVuY3Rpb24oKXtlLmFwcGx5KHQsYXJndW1lbnRzKX19ZnVuY3Rpb24gbShlKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBlfXZhciB2LGs9IWUuZG9jdW1lbnQmJiEhZS5wb3N0TWVzc2FnZSx5PWsmJi8oXFw/fCYpcGFwYXdvcmtlcig9fCZ8JCkvLnRlc3QoZS5sb2NhdGlvbi5zZWFyY2gpLGI9ITEsUj17fSx3PTAsUz17fTtpZihTLnBhcnNlPXQsUy51bnBhcnNlPXIsUy5SRUNPUkRfU0VQPVN0cmluZy5mcm9tQ2hhckNvZGUoMzApLFMuVU5JVF9TRVA9U3RyaW5nLmZyb21DaGFyQ29kZSgzMSksUy5CWVRFX09SREVSX01BUks9XCLvu79cIixTLkJBRF9ERUxJTUlURVJTPVtcIlxcclwiLFwiXFxuXCIsJ1wiJyxTLkJZVEVfT1JERVJfTUFSS10sUy5XT1JLRVJTX1NVUFBPUlRFRD0hayYmISFlLldvcmtlcixTLlNDUklQVF9QQVRIPW51bGwsUy5Mb2NhbENodW5rU2l6ZT0xMDQ4NTc2MCxTLlJlbW90ZUNodW5rU2l6ZT01MjQyODgwLFMuRGVmYXVsdERlbGltaXRlcj1cIixcIixTLlBhcnNlcj11LFMuUGFyc2VySGFuZGxlPW8sUy5OZXR3b3JrU3RyZWFtZXI9aSxTLkZpbGVTdHJlYW1lcj1zLFMuU3RyaW5nU3RyZWFtZXI9YSxcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1TOm0oZS5kZWZpbmUpJiZlLmRlZmluZS5hbWQ/ZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIFN9KTplLlBhcGE9UyxlLmpRdWVyeSl7dmFyIEM9ZS5qUXVlcnk7Qy5mbi5wYXJzZT1mdW5jdGlvbih0KXtmdW5jdGlvbiByKCl7aWYoMD09YS5sZW5ndGgpcmV0dXJuIHZvaWQobSh0LmNvbXBsZXRlKSYmdC5jb21wbGV0ZSgpKTt2YXIgZT1hWzBdO2lmKG0odC5iZWZvcmUpKXt2YXIgcj10LmJlZm9yZShlLmZpbGUsZS5pbnB1dEVsZW0pO2lmKFwib2JqZWN0XCI9PXR5cGVvZiByKXtpZihcImFib3J0XCI9PXIuYWN0aW9uKXJldHVybiB2b2lkIG4oXCJBYm9ydEVycm9yXCIsZS5maWxlLGUuaW5wdXRFbGVtLHIucmVhc29uKTtpZihcInNraXBcIj09ci5hY3Rpb24pcmV0dXJuIHZvaWQgaSgpO1wib2JqZWN0XCI9PXR5cGVvZiByLmNvbmZpZyYmKGUuaW5zdGFuY2VDb25maWc9Qy5leHRlbmQoZS5pbnN0YW5jZUNvbmZpZyxyLmNvbmZpZykpfWVsc2UgaWYoXCJza2lwXCI9PXIpcmV0dXJuIHZvaWQgaSgpfXZhciBzPWUuaW5zdGFuY2VDb25maWcuY29tcGxldGU7ZS5pbnN0YW5jZUNvbmZpZy5jb21wbGV0ZT1mdW5jdGlvbih0KXttKHMpJiZzKHQsZS5maWxlLGUuaW5wdXRFbGVtKSxpKCl9LFMucGFyc2UoZS5maWxlLGUuaW5zdGFuY2VDb25maWcpfWZ1bmN0aW9uIG4oZSxyLG4saSl7bSh0LmVycm9yKSYmdC5lcnJvcih7bmFtZTplfSxyLG4saSl9ZnVuY3Rpb24gaSgpe2Euc3BsaWNlKDAsMSkscigpfXZhciBzPXQuY29uZmlnfHx7fSxhPVtdO3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgdD1cIklOUFVUXCI9PUModGhpcykucHJvcChcInRhZ05hbWVcIikudG9VcHBlckNhc2UoKSYmXCJmaWxlXCI9PUModGhpcykuYXR0cihcInR5cGVcIikudG9Mb3dlckNhc2UoKSYmZS5GaWxlUmVhZGVyO2lmKCF0fHwhdGhpcy5maWxlc3x8MD09dGhpcy5maWxlcy5sZW5ndGgpcmV0dXJuITA7Zm9yKHZhciByPTA7cjx0aGlzLmZpbGVzLmxlbmd0aDtyKyspYS5wdXNoKHtmaWxlOnRoaXMuZmlsZXNbcl0saW5wdXRFbGVtOnRoaXMsaW5zdGFuY2VDb25maWc6Qy5leHRlbmQoe30scyl9KX0pLHIoKSx0aGlzfX15P2Uub25tZXNzYWdlPXA6Uy5XT1JLRVJTX1NVUFBPUlRFRCYmKHY9aCgpLGRvY3VtZW50LmJvZHk/ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIixmdW5jdGlvbigpe2I9ITB9LCEwKTpiPSEwKSxpLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKG4ucHJvdG90eXBlKSxpLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1pLHMucHJvdG90eXBlPU9iamVjdC5jcmVhdGUobi5wcm90b3R5cGUpLHMucHJvdG90eXBlLmNvbnN0cnVjdG9yPXMsYS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShhLnByb3RvdHlwZSksYS5wcm90b3R5cGUuY29uc3RydWN0b3I9YX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6dGhpcyk7IiwidmFyIEVuZ2luZSA9IHt9O1xuXG5FbmdpbmUuQm9vdCA9IGZ1bmN0aW9uIChnYW1lKSB7IH07XG5cbkVuZ2luZS5Cb290LnByb3RvdHlwZSA9IHtcbiAgcHJlbG9hZDogZnVuY3Rpb24gKCkge1xuICB9LFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2NhbGUuc2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5TSE9XX0FMTDtcbiAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnbkhvcml6b250YWxseSA9IHRydWU7XG4gICAgdGhpcy5zY2FsZS5wYWdlQWxpZ25WZXJ0aWNhbGx5ID0gdHJ1ZTtcbiAgICB0aGlzLnN0YWdlLmRpc2FibGVWaXNpYmlsaXR5Q2hhbmdlID0gdHJ1ZTtcbiAgICB0aGlzLnN0YXRlLnN0YXJ0KCdQcmVsb2FkZXInKTtcbiAgfVxufVxuIiwiRW5naW5lLlByZWxvYWRlciA9IGZ1bmN0aW9uIChnYW1lKSB7XG4gIHRoaXMuZ2FtZSA9IGdhbWU7XG59O1xuXG5FbmdpbmUuUHJlbG9hZGVyLnByb3RvdHlwZSA9IHtcbiAgcHJlbG9hZDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xuICAgIHRoaXMuc3RhZ2Uuc21vb3RoZWQgPSBmYWxzZTtcblxuICAgIHRoaXMuYWRkTG9nb0xhYmxlKCk7XG4gICAgdGhpcy5hZGRQcm9ncmVzc0xhYmxlKCk7XG5cbiAgICBpZiAoRW5naW5lLkRFQlVHKVxuICAgICAgdGhpcy5sb2FkLmVuYWJsZVBhcmFsbGVsID0gZmFsc2U7XG5cbiAgICB0aGlzLl9pbml0U3R5bGUoKTtcblxuICAgIHRoaXMubG9hZC5pbWFnZSgncG9rZWJhbGwnLCAnYXNzZXRzL2ltYWdlcy9iYWNrZ3JvdW5kL3Bva2ViYWxsLnBuZycpO1xuICAgIHRoaXMubG9hZC5pbWFnZSgnc2xpZGUtYmcnLCAnYXNzZXRzL2ltYWdlcy9iYWNrZ3JvdW5kL3NsaWRlLWJnLmpwZycpO1xuICAgIHRoaXMubG9hZC5pbWFnZSgnY2FsYy1iZycsICdhc3NldHMvaW1hZ2VzL2JhY2tncm91bmQvY2FsYy5qcGcnKTtcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3NoYXJlLWJ0bicsICdhc3NldHMvaW1hZ2VzL3VpL3NoYXJlLWJ0bi5wbmcnKTtcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3JlcGVhdC1idG4nLCAnYXNzZXRzL2ltYWdlcy91aS9yZXBlYXQtYnRuLnBuZycpO1xuICAgIHRoaXMubG9hZC5pbWFnZSgncm5kLXBva2Vtb24nLCAnYXNzZXRzL2ltYWdlcy9wb2tlbW9ucy8nICsgRW5naW5lLnJuZFBva2Vtb24gKyAnLnBuZycpO1xuXG4gICAgdGhpcy5fbG9hZFBva2Vtb25zKCk7XG5cbiAgICB0aGlzLmxvYWQudGV4dCgncG9rZW1vbi5jc3YnLCAnYXNzZXRzL2RhdGEvcG9rZW1vbi5jc3YnKTtcblxuICAgIHRoaXMubG9hZC5vbkZpbGVDb21wbGV0ZS5hZGQodGhpcy5maWxlQ29tcGxldGUsIHRoaXMpO1xuICB9LFxuXG4gIF9pbml0UG9rZW1vbkRCOiBmdW5jdGlvbigpIHtcbiAgICBFbmdpbmUuUG9rZW1vbkRCLmxvYWQodGhpcy5jYWNoZS5nZXRUZXh0KCdwb2tlbW9uLmNzdicpKTtcbiAgfSxcblxuICBfbG9hZFBva2Vtb25zOiBmdW5jdGlvbigpIHtcbiAgICBFbmdpbmUubG9hZGVyID0gbmV3IFBoYXNlci5Mb2FkZXIodGhpcy5nYW1lKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgRW5naW5lLlJPTExfU0xJREVfQ09VTlQ7IGkrKykge1xuICAgICAgRW5naW5lLmxvYWRlci5pbWFnZSgncG9rZW1vblJvbGwnICsgaSwgJ2Fzc2V0cy9pbWFnZXMvcG9rZW1vbnMvJyArIHRoaXMucm5kLmJldHdlZW4oMSwgNzIxKSArICcucG5nJyk7XG4gICAgfVxuICB9LFxuXG4gIGZpbGVDb21wbGV0ZTogZnVuY3Rpb24gKHByb2dyZXNzLCBjYWNoZUtleSwgc3VjY2VzcywgdG90YWxMb2FkZWQsIHRvdGFsRmlsZXMpIHtcbiAgICB0aGlzLl9wcm9ncmVzc0xhYmxlLnRleHQgPSBwcm9ncmVzcyArICclICcgKyB0b3RhbExvYWRlZCArICcvJyArIHRvdGFsRmlsZXM7XG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5faW5pdFBva2Vtb25EQigpO1xuICAgIEVuZ2luZS5sb2FkZXIuc3RhcnQoKTtcblxuICAgIC8vIFRPRE86IFRFTVBcbiAgICBFbmdpbmUubG9hZGVyLm9uTG9hZENvbXBsZXRlLmFkZChmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuc3RhdGUuc3RhcnQoJ0NhbGN1bGF0ZScpO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgLy8gdGhpcy5zdGF0ZS5zdGFydCgnR2FtZScpO1xuICB9LFxuXG4gIF9pbml0U3R5bGU6IGZ1bmN0aW9uKCkge1xuICAgIEVuZ2luZS50ZXh0U3R5bGUgPSB7XG4gICAgICBmaWxsOiAnI2ZmZicsXG4gICAgICBmb250OiAnMjZweCBPcGVuIFNhbnMnXG4gICAgfVxuICB9LFxuXG4gIGFkZExvZ29MYWJsZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdHlsZSA9IHtcbiAgICAgIGZpbGw6ICcjRkZGJyxcbiAgICAgIGZvbnQ6ICc0M3B4IEFyaWFsJ1xuICAgIH1cblxuICAgIHRoaXMuX2xvZ29MYWJsZSA9IHRoaXMuYWRkLnRleHQodGhpcy5nYW1lLndpZHRoIC8gMiwgdGhpcy5nYW1lLmhlaWdodCAvIDQsICdQb2tlbW9uIFRlc3QnLCBzdHlsZSk7XG4gICAgdGhpcy5fbG9nb0xhYmxlLmFuY2hvci5zZXRUbygwLjUpO1xuICB9LFxuXG4gIGFkZFByb2dyZXNzTGFibGU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3R5bGUgPSB7XG4gICAgICBmaWxsOiAnI0ZGRicsXG4gICAgICBmb250OiAnMjFweCBBcmlhbCdcbiAgICB9XG5cbiAgICB0aGlzLl9wcm9ncmVzc0xhYmxlID0gdGhpcy5hZGQudGV4dCh0aGlzLmdhbWUud2lkdGggLyAyLCB0aGlzLmdhbWUuaGVpZ2h0IC8gMiwgJ0NhbGN1bGF0ZWQuLi4nLCBzdHlsZSk7XG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZS5hbmNob3Iuc2V0VG8oMC41KTtcbiAgfVxufVxuIiwiRW5naW5lLkFuc3dlciA9IGZ1bmN0aW9uKGdhbWUsIHgsIHksIHRleHQsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIHRoaXMuZ2FtZSA9IGdhbWU7XG4gIHRoaXMudGV4dCA9IHRleHQ7XG4gIHRoaXMuX3BhZGRpbmcgPSA1O1xuXG4gIHRoaXMuX2NyZWF0ZVRleHQoKTtcblxuICBQaGFzZXIuQnV0dG9uLmNhbGwodGhpcywgZ2FtZSwgeCwgeSwgdGhpcy5fY3JlYXRlQmFja2dyb3VuZCgpLCBjYWxsYmFjaywgY29udGV4dCk7XG4gIHRoaXMudGludCA9IDB4MDA5Njg4O1xuXG4gIHRoaXMuYWRkQ2hpbGQodGhpcy5fdGV4dFNwcml0ZSk7XG5cbiAgdGhpcy5vbklucHV0T3Zlci5hZGQoZnVuY3Rpb24oKSB7XG4gICAgdGhpcy50aW50ID0gMHgwMGZlZTc7XG4gIH0sIHRoaXMpO1xuXG4gIHRoaXMub25JbnB1dE91dC5hZGQoZnVuY3Rpb24oKSB7XG4gICAgdGhpcy50aW50ID0gMHgwMDk2ODg7XG4gIH0sIHRoaXMpO1xufVxuXG5FbmdpbmUuQW5zd2VyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGhhc2VyLkJ1dHRvbi5wcm90b3R5cGUpO1xuRW5naW5lLkFuc3dlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFbmdpbmUuQW5zd2VyO1xuXG5FbmdpbmUuQW5zd2VyLnByb3RvdHlwZS5fY3JlYXRlQmFja2dyb3VuZCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYm90dG9tUGFkZGluZyA9IC03O1xuXG4gIHZhciBibXAgPSB0aGlzLmdhbWUuYWRkLmJpdG1hcERhdGEodGhpcy5fdGV4dFNwcml0ZS53aWR0aCArIHRoaXMuX3BhZGRpbmcgKiAyLCB0aGlzLl90ZXh0U3ByaXRlLmhlaWdodCArIHRoaXMuX3BhZGRpbmcgLyAyKTtcbiAgYm1wLmN0eC5iZWdpblBhdGgoKTtcbiAgYm1wLmN0eC5yZWN0KDAsIDAsIGJtcC53aWR0aCwgYm1wLmhlaWdodCArIGJvdHRvbVBhZGRpbmcpO1xuICBibXAuY3R4LmZpbGxTdHlsZSA9ICcjZmZmJztcbiAgYm1wLmN0eC5maWxsKCk7XG5cbiAgcmV0dXJuIGJtcDtcbn1cblxuRW5naW5lLkFuc3dlci5wcm90b3R5cGUuX2NyZWF0ZVRleHQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fdGV4dFNwcml0ZSA9IG5ldyBQaGFzZXIuVGV4dCh0aGlzLmdhbWUsIDAsIDAsIHRoaXMudGV4dCwgRW5naW5lLnRleHRTdHlsZSk7XG4gIHRoaXMuX3RleHRTcHJpdGUuYW5jaG9yLnNldFRvKDAuNSwgMCk7XG59XG4iLCJFbmdpbmUuR2FtZSA9IGZ1bmN0aW9uKGdhbWUpIHt9XG5cbkVuZ2luZS5HYW1lLnByb3RvdHlwZSA9IHtcbiAgY3JlYXRlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJzsgLy8jZGRkXG5cbiAgICB0aGlzLl9hZGRCYWNrZ3JvdW5kKCk7XG4gICAgdGhpcy5fYWRkUG9rZWJhbGxTeXN0ZW0oKTtcbiAgICB0aGlzLl9hZGRTbGlkZXMoKTtcbiAgICB0aGlzLl9zaG93Q2hhaW5TbGlkZXModGhpcy5zbGlkZXMpO1xuICAgIHRoaXMuX2FkZFByb2dyZXNzU2xpZGUoKTtcblxuICAgIHRoaXMuX2RyYXdEZWJ1ZygpO1xuICB9LFxuXG4gIF9hZGRTbGlkZXM6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2xpZGVzID0gW1xuICAgICAgbmV3IEVuZ2luZS5TbGlkZSh0aGlzLmdhbWUsICfQktGLINC70Y7QsdC40YLQtSDQvtCy0YHRj9C90L7QtSDQv9C10YfQtdC90YzQtT8nLCBbJ9CU0LAnLCAn0J3QtdGCJywgJ9Cd0LUg0L/RgNC+0LHQvtCy0LDQuyDQtdCz0L4nXSksXG4gICAgICBuZXcgRW5naW5lLlNsaWRlKHRoaXMuZ2FtZSwgJ9CS0LDRgSDRh9Cw0YHRgtC+INCx0YzRkdGCINGC0L7QutC+0Lw/JywgWyfQkdGL0LLQsNC10YInLCAn0J7Rh9C10L3RjCDRgNC10LTQutC+JywgJ9Cd0LUg0LfQvdCw0Y4nLCAn0KLQvtC70YzQutC+INGH0YLQviDRg9C00LDRgNC40LvQviEnXSksXG4gICAgICBuZXcgRW5naW5lLlNsaWRlKHRoaXMuZ2FtZSwgJ9Ca0LDQutCw0Y8g0YHRgtC40YXQuNGPINCy0LDQvCDQsdC+0LvRjNGI0LUg0L3RgNCw0LLQuNGC0YHRjz8nLCBbJ9CS0L7QtNCwJywgJ9Ce0LPQvtC90YwnLCAn0JLQtdGC0LXRgCcsICfQl9C10LzQu9GPJ10pLFxuICAgICAgbmV3IEVuZ2luZS5TbGlkZSh0aGlzLmdhbWUsICfQktGL0LHQuNGA0LjRgtC1INC+0LTQvdC+INC40LcuLi4nLCBbJ9Ci0YzQvNCwJywgJ9Ch0LLQtdGCJ10pLFxuICAgICAgbmV3IEVuZ2luZS5TbGlkZSh0aGlzLmdhbWUsICfQktGLINCx0L7QuNGC0LXRgdGMINC90LDRgdC10LrQvtC80YvRhT8nLCBbJ9CU0LAnLCAn0J3QtdGCJ10pLFxuICAgICAgbmV3IEVuZ2luZS5TbGlkZSh0aGlzLmdhbWUsICfQndC1INC/0YDQvtGC0LjQsiDQu9C4INCy0Ysg0LfQsNCy0LXRgdGC0Lgg0LTQvtC80LDRiNC90LXQs9C+INC00YDQsNC60L7QvdCwPycsIFsn0J/RhNGELCDQtdGJ0ZEg0YHQv9GA0LDRiNC40LLQsNC10YLQtScsICfQndC1INC70Y7QsdC70Y4g0LTRgNCw0LrQvtC90L7QsicsICfQkdC+0Y7RgdGMINC+0L0g0YHRitC10YHRgiDQvNC+0LXQs9C+INC/0LjRgtC+0LzRhtCwJ10pLFxuICAgICAgbmV3IEVuZ2luZS5TbGlkZSh0aGlzLmdhbWUsICfQmtCw0LrQvtC1INC/0LXRgNC10LTQstC40LbQtdC90LjQtSDQstGLINC/0YDQtdC00L/QvtGH0LjRgtCw0LXRgtC1PycsIFsn0J/QviDQstC+0LfQtNGD0YXRgycsICfQn9C+INC30LXQvNC70LUnLCAn0JLQv9C70LDQstGMJywgJ9Ci0LXQu9C10L/QvtGA0YLQsNGG0LjRjyddKSxcbiAgICAgIG5ldyBFbmdpbmUuU2xpZGUodGhpcy5nYW1lLCAn0JLRiyDQsdC+0LjRgtC10YHRjCDQv9GA0LjQstC10LTQtdC90LjQuT8nLCBbJ9CU0LAnLCAn0J3QtdGCJywgJ9Ce0L3QuCDQvdC1INGB0YPRidC10YHRgtCy0YPRjtGCISddKSxcbiAgICAgIG5ldyBFbmdpbmUuU2xpZGUodGhpcy5nYW1lLCAn0JrQsNC60LjQtSDQstCw0Lwg0L3RgNCw0LLRj9GC0YHRjyDQttC40LLQvtGC0L3Ri9C1JywgWyfQkdC+0LvRjNGI0LjQtScsICfQnNCw0LvQtdC90YzQutC40LUnLCAn0KHRgNC10LTQvdC40LUnXSksXG4gICAgICBuZXcgRW5naW5lLlNsaWRlKHRoaXMuZ2FtZSwgJ9CS0LDQvCDQvdGA0LDQstGP0YLRgdGPINC/0YPRhdC70LXQvdGM0LrQuNC1INC/0LjRgtC+0LzRhtGLPycsIFsn0JTQsCcsICfQndC10YInLCAn0JHQtdC3INGA0LDQt9C90LjRhtGLJ10pLFxuICAgIF07XG4gIH0sXG5cbiAgX3Nob3dDaGFpblNsaWRlczogZnVuY3Rpb24oY2hhaW4pIHtcbiAgICB0aGlzLnNsaWRlQ291bnRlciA9IDA7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYWluLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGFpbltpXS5zZXRDYWxsYmFja0NoZWNrKHRoaXMuX25leHRTbGlkZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBjaGFpblswXS5zaG93KCk7XG4gIH0sXG5cbiAgX25leHRTbGlkZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zbGlkZUNvdW50ZXIrKztcblxuICAgIGlmICh0aGlzLnNsaWRlQ291bnRlciA+PSB0aGlzLnNsaWRlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX2ZpbmlzaFRlc3QoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNsaWRlc1t0aGlzLnNsaWRlQ291bnRlcl0uc2hvdygpO1xuICAgIHRoaXMuX3Byb2dyZXNzTGFibGUudGV4dCA9ICfQktC+0L/RgNC+0YEgJyArICh0aGlzLnNsaWRlQ291bnRlciArIDEpICsgJyDQuNC3ICcgKyB0aGlzLnNsaWRlcy5sZW5ndGg7XG4gIH0sXG5cbiAgX2FkZEJhY2tncm91bmQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBiZyA9IHRoaXMuZ2FtZS5hZGQuc3ByaXRlKDAsIDAsICdzbGlkZS1iZycpO1xuICB9LFxuXG4gIF9kcmF3RGVidWc6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2xpbmVWID0gbmV3IFBoYXNlci5MaW5lKHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCAwLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgdGhpcy5nYW1lLmhlaWdodCk7XG4gICAgdGhpcy5fbGluZUggPSBuZXcgUGhhc2VyLkxpbmUoMCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclksIHRoaXMuZ2FtZS53aWR0aCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclkpO1xuICB9LFxuXG4gIF9hZGRQb2tlYmFsbFN5c3RlbTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5wb2tlYmFsbFN5c3RlbSA9IG5ldyBFbmdpbmUuUG9rZWJhbGxTeXN0ZW0odGhpcy5nYW1lKTtcbiAgICB0aGlzLnBva2ViYWxsU3lzdGVtLmNyZWF0ZSgpO1xuICB9LFxuXG4gIF9maW5pc2hUZXN0OiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0YXRlLnN0YXJ0KCdDYWxjdWxhdGUnKTtcbiAgfSxcblxuICBfYWRkUHJvZ3Jlc3NTbGlkZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZSA9IHRoaXMuYWRkLnRleHQoRW5naW5lLkdBTUVfV0lEVEggLyAyLCAyNSwgJ9CS0L7Qv9GA0L7RgSAxINC40LcgJyArIHRoaXMuc2xpZGVzLmxlbmd0aCwgRW5naW5lLnRleHRTdHlsZSk7XG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZS5mb250U2l6ZSA9IDE2O1xuICAgIHRoaXMuX3Byb2dyZXNzTGFibGUuYW5jaG9yLnNldFRvKDAuNSwgMCk7XG4gIH0sXG5cbiAgdXBkYXRlOiBmdW5jdGlvbigpIHt9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgLy8gdGhpcy5nYW1lLmRlYnVnLmlucHV0SW5mbygxNSwgMTUsICcjZmZmJyk7XG4gICAgLy8gLy8gdGhpcy5nYW1lLmRlYnVnLnNwcml0ZUJvdW5kcyh0aGlzLnQuX3NsaWRlR3JvdXAsICdyZ2JhKDIxMywgODMsIDgzLCAwLjI1KScpO1xuICAgIC8vIC8vIHRoaXMuZ2FtZS5kZWJ1Zy5zcHJpdGVCb3VuZHModGhpcy50Ll9hbnN3ZXJHcm91cCwgJ3JnYmEoMzYsIDAsIDI1NSwgMC4yNSknKTtcbiAgICAvL1xuICAgIC8vIGdhbWUuZGVidWcuZ2VvbSh0aGlzLl9saW5lVik7XG4gICAgLy8gZ2FtZS5kZWJ1Zy5nZW9tKHRoaXMuX2xpbmVIKTtcbiAgfVxufVxuIiwiRW5naW5lLlBva2ViYWxsU3lzdGVtID0gZnVuY3Rpb24oZ2FtZSkge1xuICB0aGlzLmdhbWUgPSBnYW1lO1xuICB0aGlzLmNvdW50RWxlbWVudHMgPSAxNjtcbn1cblxuRW5naW5lLlBva2ViYWxsU3lzdGVtLnByb3RvdHlwZSA9IHtcbiAgY3JlYXRlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9hZGRQb2tlYmFsbHMoKTtcbiAgICB0aGlzLl9ydW5UaW1lcigpO1xuICB9LFxuXG4gIF9hZGRQb2tlYmFsbHM6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucG9rZWJhbGxzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNvdW50RWxlbWVudHM7IGkrKykge1xuICAgICAgdmFyIHBva2ViYWxsID0gbmV3IFBoYXNlci5TcHJpdGUodGhpcy5nYW1lLCAwLCAwLCAncG9rZWJhbGwnKTtcblxuICAgICAgcG9rZWJhbGwuYW5jaG9yLnNldFRvKDAuNSk7XG5cbiAgICAgIHRoaXMucG9rZWJhbGxzLmFkZChwb2tlYmFsbCk7XG5cbiAgICAgIHBva2ViYWxsLmtpbGwoKTtcbiAgICB9XG4gIH0sXG5cbiAgX3J1blRpbWVyOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl90aW1lciA9IHRoaXMuZ2FtZS50aW1lLmNyZWF0ZSgpO1xuICAgIHRoaXMuX3RpbWVyLmxvb3AoUGhhc2VyLlRpbWVyLlNFQ09ORCwgdGhpcy5lbWl0LCB0aGlzKTtcbiAgICB0aGlzLl90aW1lci5zdGFydCgpO1xuICB9LFxuXG4gIGVtaXQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYWRkaW5ncyA9IDI1O1xuICAgIHZhciBzY2FsZSA9IHRoaXMuZ2FtZS5ybmQucmVhbEluUmFuZ2UoMC4yNSwgMC44KTtcbiAgICB2YXIgYWxwaGEgPSB0aGlzLmdhbWUucm5kLnJlYWxJblJhbmdlKDAuMDUsIDAuMTUpO1xuXG4gICAgdmFyIHBva2ViYWxsID0gdGhpcy5wb2tlYmFsbHMuZ2V0Rmlyc3REZWFkKCk7XG5cbiAgICBwb2tlYmFsbC5yZXZpdmUoKTtcbiAgICBwb2tlYmFsbC5yZXNldChcbiAgICAgIHRoaXMuZ2FtZS5ybmQuYmV0d2VlbihwYWRkaW5ncywgdGhpcy5nYW1lLndpZHRoIC0gcGFkZGluZ3MpLFxuICAgICAgdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKHBhZGRpbmdzLCB0aGlzLmdhbWUuaGVpZ2h0IC0gcGFkZGluZ3MpXG4gICAgKTtcblxuICAgIHBva2ViYWxsLmFscGhhID0gMDtcbiAgICBwb2tlYmFsbC5yb3RhdGlvbiA9IDA7XG4gICAgcG9rZWJhbGwuc2NhbGUuc2V0VG8oc2NhbGUsIHNjYWxlKTtcblxuICAgIHZhciB0YXJnZXRYID0gdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKDEwMCwgMzAwKTtcbiAgICB2YXIgdGFyZ2V0WSA9IDA7XG5cbiAgICBpZiAocG9rZWJhbGwueCA+IHRoaXMuZ2FtZS53aWR0aCAvIDIpXG4gICAgICB0YXJnZXRYICo9IC0xO1xuXG4gICAgdmFyIGFscGhhVHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHBva2ViYWxsKVxuICAgICAgLnRvKHthbHBoYTogYWxwaGF9LCAyNTAwKTtcblxuICAgIHZhciBzcGVlZFR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbihwb2tlYmFsbClcbiAgICAgIC50byh7eDogcG9rZWJhbGwueCArIHRhcmdldFh9LCA2MDAwKTtcblxuICAgIHZhciByb3RhdGlvblR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbihwb2tlYmFsbClcbiAgICAgIC50byh7cm90YXRpb246IE1hdGguUEkgKiAyICogdGhpcy5nYW1lLnJuZC5waWNrKFstMSwgMV0pfSwgNjAwMCk7XG5cbiAgICB2YXIgZGllVHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHBva2ViYWxsKVxuICAgICAgLnRvKHthbHBoYTogMH0sIDI1MDApO1xuXG4gICAgYWxwaGFUd2Vlbi5zdGFydCgpO1xuICAgIHNwZWVkVHdlZW4uc3RhcnQoKTtcbiAgICByb3RhdGlvblR3ZWVuLnN0YXJ0KCk7XG5cbiAgICBhbHBoYVR3ZWVuLmNoYWluKGRpZVR3ZWVuLmRlbGF5KDEwMDApKTtcblxuICAgIGRpZVR3ZWVuLm9uQ29tcGxldGVcbiAgICAgIC5hZGQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMua2lsbCgpO1xuICAgICAgfSwgcG9rZWJhbGwpO1xuXG4gICAgLy8gYWxwaGFUd2Vlbi5vbkNvbXBsZXRlLmFkZChmdW5jdGlvbigpIHtcbiAgICAvLyAgIHRoaXMua2lsbCgpO1xuICAgIC8vIH0sIHBva2ViYWxsKTtcbiAgfSxcblxuICB1cGRhdGU6IGZ1bmN0aW9uKCkge1xuXG4gIH0sXG59XG4iLCJFbmdpbmUuUG9rZW1vbkRCID0ge1xuICBsb2FkOiBmdW5jdGlvbihkYXRhVGV4dCkge1xuICAgIHRoaXMucG9rZW1vbnMgPSBbXTtcbiAgICB2YXIgZGF0YSA9IFBhcGEucGFyc2UoZGF0YVRleHQpLmRhdGE7XG4gICAgdmFyIGZpZWxkcyA9IGRhdGFbMF07XG5cbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwb2tlbW9uRGF0YSA9IGRhdGFbaV07XG4gICAgICB2YXIgcG9rZW1vbk9iaiA9IHt9O1xuXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGZpZWxkcy5sZW5ndGg7IGorKykge1xuICAgICAgICBwb2tlbW9uT2JqW2ZpZWxkc1tqXV0gPSBwb2tlbW9uRGF0YVtqXTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wb2tlbW9ucy5wdXNoKHBva2Vtb25PYmopO1xuICAgIH1cbiAgfVxufVxuIiwiRW5naW5lLlNsaWRlID0gZnVuY3Rpb24oZ2FtZSwgdGV4dCwgYW5zd2Vycykge1xuICB0aGlzLmdhbWUgPSBnYW1lO1xuICB0aGlzLl9tYXJnaW5Ub3BBbnN3ZXJzID0gNzU7XG4gIHRoaXMuX2xpbmVTcGFjaW5nQW5zd2VycyA9IDYwO1xuICB0aGlzLl9tYXJnaW5Ub3BMYWJsZSA9IDIwMDtcblxuICBQaGFzZXIuU3ByaXRlLmNhbGwodGhpcywgZ2FtZSwgMCwgMCwgdGhpcy5fY3JlYXRlQmFja2dyb3VuZCgpKTtcblxuICB0aGlzLnRleHQgPSB0ZXh0O1xuICB0aGlzLmFuc3dlcnMgPSBhbnN3ZXJzO1xuICB0aGlzLmFscGhhID0gMDtcbiAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG5cbiAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzKTtcblxuICB0aGlzLl9hZGRMYWJsZSgpO1xuICB0aGlzLl9hZGRBbnN3ZXJzKCk7XG59XG5cbkVuZ2luZS5TbGlkZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBoYXNlci5TcHJpdGUucHJvdG90eXBlKTtcbkVuZ2luZS5TbGlkZS5jb25zdHJ1Y3RvciA9IEVuZ2luZS5TbGlkZTtcblxuRW5naW5lLlNsaWRlLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMudmlzaWJsZSA9IHRydWU7XG5cbiAgdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKS50byh7XG4gICAgYWxwaGE6IDFcbiAgfSwgMTUwKS5zdGFydCgpO1xufVxuXG5FbmdpbmUuU2xpZGUucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKS50byh7XG4gICAgYWxwaGE6IDBcbiAgfSwgMTUwKS5zdGFydCgpO1xuXG4gIHR3ZWVuLm9uQ29tcGxldGUuYWRkKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmNhbGxiYWNrKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrKCk7XG4gICAgfVxuICB9LCB0aGlzKTtcblxuICByZXR1cm4gdHdlZW4ub25Db21wbGV0ZTtcbn1cblxuRW5naW5lLlNsaWRlLnByb3RvdHlwZS5zZXRDYWxsYmFja0NoZWNrID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xufVxuXG5FbmdpbmUuU2xpZGUucHJvdG90eXBlLl9hZGRMYWJsZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9sYWJsZSA9IG5ldyBQaGFzZXIuVGV4dCh0aGlzLmdhbWUsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCB0aGlzLl9tYXJnaW5Ub3BMYWJsZSwgdGhpcy50ZXh0LCBFbmdpbmUudGV4dFN0eWxlKTtcbiAgdGhpcy5fbGFibGUud29yZFdyYXAgPSB0cnVlO1xuICB0aGlzLl9sYWJsZS53b3JkV3JhcFdpZHRoID0gNjAwO1xuICB0aGlzLl9sYWJsZS5hbGlnbiA9ICdjZW50ZXInO1xuICB0aGlzLl9sYWJsZS5hbmNob3Iuc2V0VG8oMC41KTtcblxuICB0aGlzLmFkZENoaWxkKHRoaXMuX2xhYmxlKTtcbn1cblxuRW5naW5lLlNsaWRlLnByb3RvdHlwZS5fYWRkQW5zd2VycyA9IGZ1bmN0aW9uKCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYW5zd2Vycy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBhbnN3ZXIgPSBuZXcgRW5naW5lLkFuc3dlcihcbiAgICAgIHRoaXMuZ2FtZSxcbiAgICAgIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLFxuICAgICAgdGhpcy5fbGFibGUueSArIHRoaXMuX21hcmdpblRvcEFuc3dlcnMgKyB0aGlzLl9saW5lU3BhY2luZ0Fuc3dlcnMgKiBpLFxuICAgICAgdGhpcy5hbnN3ZXJzW2ldLFxuICAgICAgdGhpcy5oaWRlLFxuICAgICAgdGhpc1xuICAgICk7XG5cbiAgICBhbnN3ZXIuYW5jaG9yLnNldFRvKDAuNSwgMCk7XG4gICAgdGhpcy5hZGRDaGlsZChhbnN3ZXIpO1xuICB9XG59XG5cbkVuZ2luZS5TbGlkZS5wcm90b3R5cGUuX2NyZWF0ZUJhY2tncm91bmQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJtcCA9IHRoaXMuZ2FtZS5hZGQuYml0bWFwRGF0YShFbmdpbmUuR0FNRV9XSURUSCwgRW5naW5lLkdBTUVfSEVJR0hUKTtcblxuICBibXAuY3R4LmJlZ2luUGF0aCgpO1xuICBibXAuY3R4LnJlY3QoMCwgMCwgYm1wLndpZHRoLCBibXAuaGVpZ2h0KTtcbiAgYm1wLmN0eC5maWxsU3R5bGUgPSAncmdiYSgwLCAwLCAwLCAwKSc7XG4gIGJtcC5jdHguZmlsbCgpO1xuXG4gIHJldHVybiBibXA7XG59XG4iLCJFbmdpbmUuQ2FsY3VsYXRlID0gZnVuY3Rpb24oZ2FtZSkge31cblxuRW5naW5lLkNhbGN1bGF0ZS5wcm90b3R5cGUgPSB7XG4gIGNyZWF0ZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fdGltZVByb2dyZXNzID0gODAwMDtcbiAgICB0aGlzLl9jb3VudFRpY2sgPSA3MztcbiAgICB0aGlzLl9wcm9ncmVzcyA9IDA7XG4gICAgdGhpcy5fcmVzdWx0UG9rZW1vbiA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAncm5kLXBva2Vtb24nKTtcbiAgICB0aGlzLl9yZXN1bHRQb2tlbW9uLnZpc2libGUgPSBmYWxzZTtcblxuICAgIHRoaXMuX2FkZEJhY2tncm91bmQoKTtcbiAgICB0aGlzLl9hZGRSb2xsZXIoKTtcbiAgICB0aGlzLl9hZGRJbmZvTGFibGUoKTtcbiAgICB0aGlzLl9hZGRQcm9ncmVzc0xhYmxlKCk7XG5cbiAgICB0aGlzLl9zdGFydFJvbGwoKTtcbiAgICB0aGlzLl9zdGFydFByb2dyZXNzKCk7XG4gIH0sXG5cbiAgX2FkZFJvbGxlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJvbGxTaXplID0gMzAwO1xuICAgIHZhciBtYXJnaW5SaWdodCA9IDEwMDtcblxuICAgIHRoaXMuX3JvbGxzID0gW107XG4gICAgdGhpcy5fcm9sbEdyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKTtcbiAgICB0aGlzLl9hY3RpdmVSb2xsU3ByaXRlID0gLTE7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IEVuZ2luZS5ST0xMX1NMSURFX0NPVU5UOyBpKyspIHtcbiAgICAgIHZhciBzcHJpdGUgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ3Bva2Vtb25Sb2xsJyArIGkpO1xuXG4gICAgICBzcHJpdGUudmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICB0aGlzLl9yb2xsR3JvdXAuYWRkKHNwcml0ZSk7XG4gICAgICB0aGlzLl9yb2xscy5wdXNoKHNwcml0ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5fcm9sbEdyb3VwLnggPSBtYXJnaW5SaWdodDtcbiAgICB0aGlzLl9yb2xsR3JvdXAueSA9IHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZIC0gcm9sbFNpemUgLyAyO1xuXG4gICAgdGhpcy5fcm9sbEdyb3VwLmFkZCh0aGlzLl9yZXN1bHRQb2tlbW9uKTtcbiAgICB0aGlzLl9yb2xscy5wdXNoKHRoaXMuX3Jlc3VsdFBva2Vtb24pO1xuICB9LFxuXG4gIF9hZGRCYWNrZ3JvdW5kOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmJnID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICdjYWxjLWJnJyk7XG4gIH0sXG5cbiAgX2FkZFByb2dyZXNzTGFibGU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciByb2xsU2l6ZSA9IDMwMDtcbiAgICB2YXIgbWFyZ2luVG9wID0gNTA7XG5cbiAgICB0aGlzLl9wcm9ncmVzc0xhYmxlID0gdGhpcy5hZGQudGV4dChcbiAgICAgIHRoaXMuX3JvbGxHcm91cC54ICsgcm9sbFNpemUgLyAyLFxuICAgICAgdGhpcy5fcm9sbEdyb3VwLnkgKyByb2xsU2l6ZSArIG1hcmdpblRvcCxcbiAgICAgICfQn9GA0L7Qs9GA0LXRgdGBIDAgJScsXG4gICAgICBFbmdpbmUudGV4dFN0eWxlXG4gICAgKTtcblxuICAgIHRoaXMuX3Byb2dyZXNzTGFibGUuYW5jaG9yLnNldFRvKDAuNSk7XG4gIH0sXG5cbiAgX2FkZEluZm9MYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1hcmlnblRvcCA9IDI1O1xuXG4gICAgdGhpcy5faW5mb1RleHQgPSB0aGlzLmFkZC50ZXh0KFxuICAgICAgdGhpcy5nYW1lLndvcmxkLmNlbnRlclgsXG4gICAgICBtYXJpZ25Ub3AsXG4gICAgICAn0JLRi9GH0LjRgdC70LXQvdC40LUg0YDQtdC30YPQu9GM0YLQsNGC0LAuLi4nLFxuICAgICAgRW5naW5lLnRleHRTdHlsZVxuICAgICk7XG5cbiAgICB0aGlzLl9pbmZvVGV4dC5hbmNob3Iuc2V0VG8oMC41KTtcbiAgfSxcblxuICBfc3RhcnRSb2xsOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9hY3RpdmVSb2xsU3ByaXRlID0gMDtcbiAgICB0aGlzLl9yb2xsc1swXS52aXNpYmxlID0gdHJ1ZTtcblxuICAgIHRoaXMuX3RpbWVyID0gdGhpcy50aW1lLmNyZWF0ZSgpO1xuICAgIHRoaXMuX3RpbWVyLmxvb3AoNzUsIHRoaXMuX3JvbGwsIHRoaXMpO1xuICAgIHRoaXMuX3RpbWVyLnN0YXJ0KCk7XG4gIH0sXG5cbiAgX3JvbGw6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3JvbGxzW3RoaXMuX2FjdGl2ZVJvbGxTcHJpdGVdLnZpc2libGUgPSBmYWxzZTtcblxuICAgIHRoaXMuX2FjdGl2ZVJvbGxTcHJpdGUrKztcblxuICAgIGlmICh0aGlzLl9hY3RpdmVSb2xsU3ByaXRlID4gRW5naW5lLlJPTExfU0xJREVfQ09VTlQgLSAxKSB7XG4gICAgICB0aGlzLl9hY3RpdmVSb2xsU3ByaXRlID0gMDtcbiAgICB9XG5cbiAgICB0aGlzLl9yb2xsc1t0aGlzLl9hY3RpdmVSb2xsU3ByaXRlXS52aXNpYmxlID0gdHJ1ZTtcbiAgfSxcblxuICBfc3RhcnRQcm9ncmVzczogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fcHJvZ3Jlc3NUaW1lciA9IHRoaXMudGltZS5jcmVhdGUoKTtcbiAgICB0aGlzLl9wcm9ncmVzc1RpbWVyLnJlcGVhdChcbiAgICAgIHRoaXMuX3RpbWVQcm9ncmVzcyAvIHRoaXMuX2NvdW50VGljayxcbiAgICAgIHRoaXMuX2NvdW50VGljayxcbiAgICAgIHRoaXMuX3VwZGF0ZVByb2dyZXNzLFxuICAgICAgdGhpc1xuICAgICk7XG4gICAgdGhpcy5fcHJvZ3Jlc3NUaW1lci5zdGFydCgpO1xuICAgIHRoaXMuX3Byb2dyZXNzVGltZXIub25Db21wbGV0ZS5hZGQodGhpcy5fZmluaXNoQ2FsYywgdGhpcyk7XG4gIH0sXG5cbiAgX3VwZGF0ZVByb2dyZXNzOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9wcm9ncmVzcysrO1xuICAgIHRoaXMuX3Byb2dyZXNzTGFibGUudGV4dCA9ICfQn9GA0L7Qs9GA0LXRgdGBICcgKyBNYXRoLmZsb29yKCh0aGlzLl9wcm9ncmVzcyAvIHRoaXMuX2NvdW50VGljaykgKiAxMDApICsgJyAlJztcbiAgfSxcblxuICBfZmluaXNoQ2FsYzogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fdGltZXIuc3RvcCgpO1xuXG4gICAgdGhpcy5fcm9sbHNbdGhpcy5fYWN0aXZlUm9sbFNwcml0ZV0udmlzaWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuX3Jlc3VsdFBva2Vtb24udmlzaWJsZSA9IHRydWU7XG5cbiAgICB0aGlzLl9pbmZvVGV4dC52aXNpYmxlID0gZmFsc2U7XG5cbiAgICB2YXIgcG9rZW1vbk5hbWUgPSBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoRW5naW5lLlBva2Vtb25EQi5wb2tlbW9uc1tFbmdpbmUucm5kUG9rZW1vbiAtIDFdLmlkZW50aWZpZXIpO1xuICAgIHRoaXMuX3Byb2dyZXNzTGFibGUudGV4dCA9ICfQryDQv9C+0YXQvtC2INC90LAgJyArIHBva2Vtb25OYW1lO1xuXG4gICAgdGhpcy5fYWRkQnRucygpO1xuICB9LFxuXG4gIF9hZGRBZHM6IGZ1bmN0aW9uKCkge1xuICAgIC8vIFRPRE86IG1ha2UgQURTIGZ1bmN0aW9uXG4gIH0sXG5cbiAgX2FkZEJ0bnM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBtYXJnaW4gPSA1MDtcbiAgICB2YXIgYnRuU2hhcmUgPSB0aGlzLl9hZGRTaGFyZUJ0bigpO1xuICAgIHZhciBidG5SZXBlYXQgPSB0aGlzLl9hZGRSZXBlYXRCdG4oKTtcblxuICAgIGJ0blNoYXJlLnkgLT0gbWFyZ2luO1xuICAgIGJ0blJlcGVhdC55ICs9IG1hcmdpbjtcbiAgfSxcblxuICBfYWRkU2hhcmVCdG46IGZ1bmN0aW9uKCkge1xuICAgIHZhciBidG5TaGFyZSA9IHRoaXMuYWRkLmJ1dHRvbihcbiAgICAgIEVuZ2luZS5HQU1FX1dJRFRIICogMC43NSxcbiAgICAgIEVuZ2luZS5HQU1FX0hFSUdIVCAvIDIsXG4gICAgICAnc2hhcmUtYnRuJyxcbiAgICAgIHRoaXMuX3NoYXJlRGF0YSxcbiAgICAgIHRoaXNcbiAgICApO1xuXG4gICAgYnRuU2hhcmUuYW5jaG9yLnNldFRvKDAuNSk7XG5cbiAgICByZXR1cm4gYnRuU2hhcmU7XG4gIH0sXG5cbiAgX2FkZFJlcGVhdEJ0bjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGJ0blJlYXBlYXQgPSB0aGlzLmFkZC5idXR0b24oXG4gICAgICBFbmdpbmUuR0FNRV9XSURUSCAqIDAuNzUsXG4gICAgICBFbmdpbmUuR0FNRV9IRUlHSFQgLyAyLFxuICAgICAgJ3JlcGVhdC1idG4nLFxuICAgICAgdGhpcy5fcmVwZWF0R2FtZSxcbiAgICAgIHRoaXNcbiAgICApO1xuXG4gICAgYnRuUmVhcGVhdC5hbmNob3Iuc2V0VG8oMC41KTtcblxuICAgIHJldHVybiBidG5SZWFwZWF0O1xuICB9LFxuXG4gIF9zaGFyZURhdGE6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXRhID0gdGhpcy5nYW1lLmNhbnZhcy50b0RhdGFVUkwoKTtcbiAgICAvLyBUT0RPOiBtYWtlIFNoYXJlIGRhdGFcbiAgfSxcblxuICBfcmVwZWF0R2FtZTogZnVuY3Rpb24oKSB7XG4gICAgRW5naW5lLnJuZFBva2Vtb24gPSB0aGlzLmdhbWUucm5kLmJldHdlZW4oMSwgNzIxKTtcbiAgICB0aGlzLnN0YXRlLnN0YXJ0KCdQcmVsb2FkZXInKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcbn1cbiIsIkVuZ2luZS5HQU1FX1dJRFRIID0gMTAwMDtcbkVuZ2luZS5HQU1FX0hFSUdIVCA9IDY0MDtcblxuRW5naW5lLkRFQlVHID0gdHJ1ZTtcblxudmFyIGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoRW5naW5lLkdBTUVfV0lEVEgsIEVuZ2luZS5HQU1FX0hFSUdIVCwgUGhhc2VyLkFVVE8sICdnYW1lJyk7XG5cbkVuZ2luZS5ST0xMX1NMSURFX0NPVU5UID0gNTA7XG5FbmdpbmUucm5kUG9rZW1vbiA9IGdhbWUucm5kLmJldHdlZW4oMSwgNzIxKTtcblxuZ2FtZS5zdGF0ZS5hZGQoJ0Jvb3QnLCBFbmdpbmUuQm9vdCk7XG5nYW1lLnN0YXRlLmFkZCgnUHJlbG9hZGVyJywgRW5naW5lLlByZWxvYWRlcik7XG5nYW1lLnN0YXRlLmFkZCgnR2FtZScsIEVuZ2luZS5HYW1lKTtcbmdhbWUuc3RhdGUuYWRkKCdDYWxjdWxhdGUnLCBFbmdpbmUuQ2FsY3VsYXRlKTtcblxuZ2FtZS5zdGF0ZS5zdGFydCgnQm9vdCcpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
