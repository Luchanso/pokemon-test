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

if (isVkEnv()) {
  VK.init(function() {
    /**
     * Успешное иницирование VK API
     * @type {Boolean}
     */
    VK.succesInit = true;
    VK.publicatePhoto(game.canvas.toDataURL());
  }, function() {
    VK.succesInit = false;
  }, '5.53');
}

VK.publicatePhoto = function(image) {
  getWallUploadServer()
    .then(function(url) {
      return uploadData(image, url);
    })
    .then(function(data) {
      console.log(arguments);
    })
    .catch(function() {
      console.log(arguments);
    });
}

function getWallUploadServer() {
  return new Promise(function(res, rej) {
    VK.api("photos.getWallUploadServer", {"test_mode": 1}, function (data) {
      if (data.response) {
        res(data.response.upload_url);
      }
      else {
        rej(data);
      }
    });
  });
}

function uploadData(data, url) {
  return new Promise(function(res, rej) {
    var boundary = '----------Ij5ae0ae0KM7GI3KM7';
    var imageName = 'image.png';

    var bin = boundary + '\r\nContent-Disposition: form-data; name="file1"; filename="image.png"';
    bin += "\r\nContent-Type: image/png\r\n\r\n"
    bin += data;
    bin += "\r\n--" + boundary + '--\r\n';

    var byteArray = strToArrayBuffer(bin);

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", res);
    xhr.addEventListener("error", rej);
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
    xhr.send(byteArray);
  });
}

function strToArrayBuffer(str) {
  var buf = new ArrayBuffer(str.length * 2);
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function isVkEnv() {
  return (location.ancestorOrigins.length !== 0 && location.ancestorOrigins[0].indexOf('vk') !== -1);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcGFwYXJzZS5taW4uanMiLCJib290LmpzIiwicHJlbG9hZGVyLmpzIiwiYW5zd2VyLmpzIiwiZ2FtZS5qcyIsInBva2ViYWxsLXN5cy5qcyIsInBva2Vtb25EQi5qcyIsInNsaWRlLmpzIiwiY2FsY3VsYXRlLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXhFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuXHRQYXBhIFBhcnNlXG5cdHY0LjEuMlxuXHRodHRwczovL2dpdGh1Yi5jb20vbWhvbHQvUGFwYVBhcnNlXG4qL1xuIWZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCxyKXtpZihyPXJ8fHt9LHIud29ya2VyJiZTLldPUktFUlNfU1VQUE9SVEVEKXt2YXIgbj1mKCk7cmV0dXJuIG4udXNlclN0ZXA9ci5zdGVwLG4udXNlckNodW5rPXIuY2h1bmssbi51c2VyQ29tcGxldGU9ci5jb21wbGV0ZSxuLnVzZXJFcnJvcj1yLmVycm9yLHIuc3RlcD1tKHIuc3RlcCksci5jaHVuaz1tKHIuY2h1bmspLHIuY29tcGxldGU9bShyLmNvbXBsZXRlKSxyLmVycm9yPW0oci5lcnJvciksZGVsZXRlIHIud29ya2VyLHZvaWQgbi5wb3N0TWVzc2FnZSh7aW5wdXQ6dCxjb25maWc6cix3b3JrZXJJZDpuLmlkfSl9dmFyIG89bnVsbDtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgdD9vPXIuZG93bmxvYWQ/bmV3IGkocik6bmV3IGEocik6KGUuRmlsZSYmdCBpbnN0YW5jZW9mIEZpbGV8fHQgaW5zdGFuY2VvZiBPYmplY3QpJiYobz1uZXcgcyhyKSksby5zdHJlYW0odCl9ZnVuY3Rpb24gcihlLHQpe2Z1bmN0aW9uIHIoKXtcIm9iamVjdFwiPT10eXBlb2YgdCYmKFwic3RyaW5nXCI9PXR5cGVvZiB0LmRlbGltaXRlciYmMT09dC5kZWxpbWl0ZXIubGVuZ3RoJiYtMT09Uy5CQURfREVMSU1JVEVSUy5pbmRleE9mKHQuZGVsaW1pdGVyKSYmKHU9dC5kZWxpbWl0ZXIpLChcImJvb2xlYW5cIj09dHlwZW9mIHQucXVvdGVzfHx0LnF1b3RlcyBpbnN0YW5jZW9mIEFycmF5KSYmKG89dC5xdW90ZXMpLFwic3RyaW5nXCI9PXR5cGVvZiB0Lm5ld2xpbmUmJihoPXQubmV3bGluZSkpfWZ1bmN0aW9uIG4oZSl7aWYoXCJvYmplY3RcIiE9dHlwZW9mIGUpcmV0dXJuW107dmFyIHQ9W107Zm9yKHZhciByIGluIGUpdC5wdXNoKHIpO3JldHVybiB0fWZ1bmN0aW9uIGkoZSx0KXt2YXIgcj1cIlwiO1wic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1KU09OLnBhcnNlKGUpKSxcInN0cmluZ1wiPT10eXBlb2YgdCYmKHQ9SlNPTi5wYXJzZSh0KSk7dmFyIG49ZSBpbnN0YW5jZW9mIEFycmF5JiZlLmxlbmd0aD4wLGk9ISh0WzBdaW5zdGFuY2VvZiBBcnJheSk7aWYobil7Zm9yKHZhciBhPTA7YTxlLmxlbmd0aDthKyspYT4wJiYocis9dSkscis9cyhlW2FdLGEpO3QubGVuZ3RoPjAmJihyKz1oKX1mb3IodmFyIG89MDtvPHQubGVuZ3RoO28rKyl7Zm9yKHZhciBmPW4/ZS5sZW5ndGg6dFtvXS5sZW5ndGgsYz0wO2Y+YztjKyspe2M+MCYmKHIrPXUpO3ZhciBkPW4mJmk/ZVtjXTpjO3IrPXModFtvXVtkXSxjKX1vPHQubGVuZ3RoLTEmJihyKz1oKX1yZXR1cm4gcn1mdW5jdGlvbiBzKGUsdCl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIGV8fG51bGw9PT1lKXJldHVyblwiXCI7ZT1lLnRvU3RyaW5nKCkucmVwbGFjZSgvXCIvZywnXCJcIicpO3ZhciByPVwiYm9vbGVhblwiPT10eXBlb2YgbyYmb3x8byBpbnN0YW5jZW9mIEFycmF5JiZvW3RdfHxhKGUsUy5CQURfREVMSU1JVEVSUyl8fGUuaW5kZXhPZih1KT4tMXx8XCIgXCI9PWUuY2hhckF0KDApfHxcIiBcIj09ZS5jaGFyQXQoZS5sZW5ndGgtMSk7cmV0dXJuIHI/J1wiJytlKydcIic6ZX1mdW5jdGlvbiBhKGUsdCl7Zm9yKHZhciByPTA7cjx0Lmxlbmd0aDtyKyspaWYoZS5pbmRleE9mKHRbcl0pPi0xKXJldHVybiEwO3JldHVybiExfXZhciBvPSExLHU9XCIsXCIsaD1cIlxcclxcblwiO2lmKHIoKSxcInN0cmluZ1wiPT10eXBlb2YgZSYmKGU9SlNPTi5wYXJzZShlKSksZSBpbnN0YW5jZW9mIEFycmF5KXtpZighZS5sZW5ndGh8fGVbMF1pbnN0YW5jZW9mIEFycmF5KXJldHVybiBpKG51bGwsZSk7aWYoXCJvYmplY3RcIj09dHlwZW9mIGVbMF0pcmV0dXJuIGkobihlWzBdKSxlKX1lbHNlIGlmKFwib2JqZWN0XCI9PXR5cGVvZiBlKXJldHVyblwic3RyaW5nXCI9PXR5cGVvZiBlLmRhdGEmJihlLmRhdGE9SlNPTi5wYXJzZShlLmRhdGEpKSxlLmRhdGEgaW5zdGFuY2VvZiBBcnJheSYmKGUuZmllbGRzfHwoZS5maWVsZHM9ZS5kYXRhWzBdaW5zdGFuY2VvZiBBcnJheT9lLmZpZWxkczpuKGUuZGF0YVswXSkpLGUuZGF0YVswXWluc3RhbmNlb2YgQXJyYXl8fFwib2JqZWN0XCI9PXR5cGVvZiBlLmRhdGFbMF18fChlLmRhdGE9W2UuZGF0YV0pKSxpKGUuZmllbGRzfHxbXSxlLmRhdGF8fFtdKTt0aHJvd1wiZXhjZXB0aW9uOiBVbmFibGUgdG8gc2VyaWFsaXplIHVucmVjb2duaXplZCBpbnB1dFwifWZ1bmN0aW9uIG4odCl7ZnVuY3Rpb24gcihlKXt2YXIgdD1fKGUpO3QuY2h1bmtTaXplPXBhcnNlSW50KHQuY2h1bmtTaXplKSxlLnN0ZXB8fGUuY2h1bmt8fCh0LmNodW5rU2l6ZT1udWxsKSx0aGlzLl9oYW5kbGU9bmV3IG8odCksdGhpcy5faGFuZGxlLnN0cmVhbWVyPXRoaXMsdGhpcy5fY29uZmlnPXR9dGhpcy5faGFuZGxlPW51bGwsdGhpcy5fcGF1c2VkPSExLHRoaXMuX2ZpbmlzaGVkPSExLHRoaXMuX2lucHV0PW51bGwsdGhpcy5fYmFzZUluZGV4PTAsdGhpcy5fcGFydGlhbExpbmU9XCJcIix0aGlzLl9yb3dDb3VudD0wLHRoaXMuX3N0YXJ0PTAsdGhpcy5fbmV4dENodW5rPW51bGwsdGhpcy5pc0ZpcnN0Q2h1bms9ITAsdGhpcy5fY29tcGxldGVSZXN1bHRzPXtkYXRhOltdLGVycm9yczpbXSxtZXRhOnt9fSxyLmNhbGwodGhpcyx0KSx0aGlzLnBhcnNlQ2h1bms9ZnVuY3Rpb24odCl7aWYodGhpcy5pc0ZpcnN0Q2h1bmsmJm0odGhpcy5fY29uZmlnLmJlZm9yZUZpcnN0Q2h1bmspKXt2YXIgcj10aGlzLl9jb25maWcuYmVmb3JlRmlyc3RDaHVuayh0KTt2b2lkIDAhPT1yJiYodD1yKX10aGlzLmlzRmlyc3RDaHVuaz0hMTt2YXIgbj10aGlzLl9wYXJ0aWFsTGluZSt0O3RoaXMuX3BhcnRpYWxMaW5lPVwiXCI7dmFyIGk9dGhpcy5faGFuZGxlLnBhcnNlKG4sdGhpcy5fYmFzZUluZGV4LCF0aGlzLl9maW5pc2hlZCk7aWYoIXRoaXMuX2hhbmRsZS5wYXVzZWQoKSYmIXRoaXMuX2hhbmRsZS5hYm9ydGVkKCkpe3ZhciBzPWkubWV0YS5jdXJzb3I7dGhpcy5fZmluaXNoZWR8fCh0aGlzLl9wYXJ0aWFsTGluZT1uLnN1YnN0cmluZyhzLXRoaXMuX2Jhc2VJbmRleCksdGhpcy5fYmFzZUluZGV4PXMpLGkmJmkuZGF0YSYmKHRoaXMuX3Jvd0NvdW50Kz1pLmRhdGEubGVuZ3RoKTt2YXIgYT10aGlzLl9maW5pc2hlZHx8dGhpcy5fY29uZmlnLnByZXZpZXcmJnRoaXMuX3Jvd0NvdW50Pj10aGlzLl9jb25maWcucHJldmlldztpZih5KWUucG9zdE1lc3NhZ2Uoe3Jlc3VsdHM6aSx3b3JrZXJJZDpTLldPUktFUl9JRCxmaW5pc2hlZDphfSk7ZWxzZSBpZihtKHRoaXMuX2NvbmZpZy5jaHVuaykpe2lmKHRoaXMuX2NvbmZpZy5jaHVuayhpLHRoaXMuX2hhbmRsZSksdGhpcy5fcGF1c2VkKXJldHVybjtpPXZvaWQgMCx0aGlzLl9jb21wbGV0ZVJlc3VsdHM9dm9pZCAwfXJldHVybiB0aGlzLl9jb25maWcuc3RlcHx8dGhpcy5fY29uZmlnLmNodW5rfHwodGhpcy5fY29tcGxldGVSZXN1bHRzLmRhdGE9dGhpcy5fY29tcGxldGVSZXN1bHRzLmRhdGEuY29uY2F0KGkuZGF0YSksdGhpcy5fY29tcGxldGVSZXN1bHRzLmVycm9ycz10aGlzLl9jb21wbGV0ZVJlc3VsdHMuZXJyb3JzLmNvbmNhdChpLmVycm9ycyksdGhpcy5fY29tcGxldGVSZXN1bHRzLm1ldGE9aS5tZXRhKSwhYXx8IW0odGhpcy5fY29uZmlnLmNvbXBsZXRlKXx8aSYmaS5tZXRhLmFib3J0ZWR8fHRoaXMuX2NvbmZpZy5jb21wbGV0ZSh0aGlzLl9jb21wbGV0ZVJlc3VsdHMpLGF8fGkmJmkubWV0YS5wYXVzZWR8fHRoaXMuX25leHRDaHVuaygpLGl9fSx0aGlzLl9zZW5kRXJyb3I9ZnVuY3Rpb24odCl7bSh0aGlzLl9jb25maWcuZXJyb3IpP3RoaXMuX2NvbmZpZy5lcnJvcih0KTp5JiZ0aGlzLl9jb25maWcuZXJyb3ImJmUucG9zdE1lc3NhZ2Uoe3dvcmtlcklkOlMuV09SS0VSX0lELGVycm9yOnQsZmluaXNoZWQ6ITF9KX19ZnVuY3Rpb24gaShlKXtmdW5jdGlvbiB0KGUpe3ZhciB0PWUuZ2V0UmVzcG9uc2VIZWFkZXIoXCJDb250ZW50LVJhbmdlXCIpO3JldHVybiBwYXJzZUludCh0LnN1YnN0cih0Lmxhc3RJbmRleE9mKFwiL1wiKSsxKSl9ZT1lfHx7fSxlLmNodW5rU2l6ZXx8KGUuY2h1bmtTaXplPVMuUmVtb3RlQ2h1bmtTaXplKSxuLmNhbGwodGhpcyxlKTt2YXIgcjt0aGlzLl9uZXh0Q2h1bms9az9mdW5jdGlvbigpe3RoaXMuX3JlYWRDaHVuaygpLHRoaXMuX2NodW5rTG9hZGVkKCl9OmZ1bmN0aW9uKCl7dGhpcy5fcmVhZENodW5rKCl9LHRoaXMuc3RyZWFtPWZ1bmN0aW9uKGUpe3RoaXMuX2lucHV0PWUsdGhpcy5fbmV4dENodW5rKCl9LHRoaXMuX3JlYWRDaHVuaz1mdW5jdGlvbigpe2lmKHRoaXMuX2ZpbmlzaGVkKXJldHVybiB2b2lkIHRoaXMuX2NodW5rTG9hZGVkKCk7aWYocj1uZXcgWE1MSHR0cFJlcXVlc3Qsa3x8KHIub25sb2FkPWcodGhpcy5fY2h1bmtMb2FkZWQsdGhpcyksci5vbmVycm9yPWcodGhpcy5fY2h1bmtFcnJvcix0aGlzKSksci5vcGVuKFwiR0VUXCIsdGhpcy5faW5wdXQsIWspLHRoaXMuX2NvbmZpZy5jaHVua1NpemUpe3ZhciBlPXRoaXMuX3N0YXJ0K3RoaXMuX2NvbmZpZy5jaHVua1NpemUtMTtyLnNldFJlcXVlc3RIZWFkZXIoXCJSYW5nZVwiLFwiYnl0ZXM9XCIrdGhpcy5fc3RhcnQrXCItXCIrZSksci5zZXRSZXF1ZXN0SGVhZGVyKFwiSWYtTm9uZS1NYXRjaFwiLFwid2Via2l0LW5vLWNhY2hlXCIpfXRyeXtyLnNlbmQoKX1jYXRjaCh0KXt0aGlzLl9jaHVua0Vycm9yKHQubWVzc2FnZSl9ayYmMD09ci5zdGF0dXM/dGhpcy5fY2h1bmtFcnJvcigpOnRoaXMuX3N0YXJ0Kz10aGlzLl9jb25maWcuY2h1bmtTaXplfSx0aGlzLl9jaHVua0xvYWRlZD1mdW5jdGlvbigpe2lmKDQ9PXIucmVhZHlTdGF0ZSl7aWYoci5zdGF0dXM8MjAwfHxyLnN0YXR1cz49NDAwKXJldHVybiB2b2lkIHRoaXMuX2NodW5rRXJyb3IoKTt0aGlzLl9maW5pc2hlZD0hdGhpcy5fY29uZmlnLmNodW5rU2l6ZXx8dGhpcy5fc3RhcnQ+dChyKSx0aGlzLnBhcnNlQ2h1bmsoci5yZXNwb25zZVRleHQpfX0sdGhpcy5fY2h1bmtFcnJvcj1mdW5jdGlvbihlKXt2YXIgdD1yLnN0YXR1c1RleHR8fGU7dGhpcy5fc2VuZEVycm9yKHQpfX1mdW5jdGlvbiBzKGUpe2U9ZXx8e30sZS5jaHVua1NpemV8fChlLmNodW5rU2l6ZT1TLkxvY2FsQ2h1bmtTaXplKSxuLmNhbGwodGhpcyxlKTt2YXIgdCxyLGk9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEZpbGVSZWFkZXI7dGhpcy5zdHJlYW09ZnVuY3Rpb24oZSl7dGhpcy5faW5wdXQ9ZSxyPWUuc2xpY2V8fGUud2Via2l0U2xpY2V8fGUubW96U2xpY2UsaT8odD1uZXcgRmlsZVJlYWRlcix0Lm9ubG9hZD1nKHRoaXMuX2NodW5rTG9hZGVkLHRoaXMpLHQub25lcnJvcj1nKHRoaXMuX2NodW5rRXJyb3IsdGhpcykpOnQ9bmV3IEZpbGVSZWFkZXJTeW5jLHRoaXMuX25leHRDaHVuaygpfSx0aGlzLl9uZXh0Q2h1bms9ZnVuY3Rpb24oKXt0aGlzLl9maW5pc2hlZHx8dGhpcy5fY29uZmlnLnByZXZpZXcmJiEodGhpcy5fcm93Q291bnQ8dGhpcy5fY29uZmlnLnByZXZpZXcpfHx0aGlzLl9yZWFkQ2h1bmsoKX0sdGhpcy5fcmVhZENodW5rPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5faW5wdXQ7aWYodGhpcy5fY29uZmlnLmNodW5rU2l6ZSl7dmFyIG49TWF0aC5taW4odGhpcy5fc3RhcnQrdGhpcy5fY29uZmlnLmNodW5rU2l6ZSx0aGlzLl9pbnB1dC5zaXplKTtlPXIuY2FsbChlLHRoaXMuX3N0YXJ0LG4pfXZhciBzPXQucmVhZEFzVGV4dChlLHRoaXMuX2NvbmZpZy5lbmNvZGluZyk7aXx8dGhpcy5fY2h1bmtMb2FkZWQoe3RhcmdldDp7cmVzdWx0OnN9fSl9LHRoaXMuX2NodW5rTG9hZGVkPWZ1bmN0aW9uKGUpe3RoaXMuX3N0YXJ0Kz10aGlzLl9jb25maWcuY2h1bmtTaXplLHRoaXMuX2ZpbmlzaGVkPSF0aGlzLl9jb25maWcuY2h1bmtTaXplfHx0aGlzLl9zdGFydD49dGhpcy5faW5wdXQuc2l6ZSx0aGlzLnBhcnNlQ2h1bmsoZS50YXJnZXQucmVzdWx0KX0sdGhpcy5fY2h1bmtFcnJvcj1mdW5jdGlvbigpe3RoaXMuX3NlbmRFcnJvcih0LmVycm9yKX19ZnVuY3Rpb24gYShlKXtlPWV8fHt9LG4uY2FsbCh0aGlzLGUpO3ZhciB0LHI7dGhpcy5zdHJlYW09ZnVuY3Rpb24oZSl7cmV0dXJuIHQ9ZSxyPWUsdGhpcy5fbmV4dENodW5rKCl9LHRoaXMuX25leHRDaHVuaz1mdW5jdGlvbigpe2lmKCF0aGlzLl9maW5pc2hlZCl7dmFyIGU9dGhpcy5fY29uZmlnLmNodW5rU2l6ZSx0PWU/ci5zdWJzdHIoMCxlKTpyO3JldHVybiByPWU/ci5zdWJzdHIoZSk6XCJcIix0aGlzLl9maW5pc2hlZD0hcix0aGlzLnBhcnNlQ2h1bmsodCl9fX1mdW5jdGlvbiBvKGUpe2Z1bmN0aW9uIHQoKXtpZihiJiZkJiYoaChcIkRlbGltaXRlclwiLFwiVW5kZXRlY3RhYmxlRGVsaW1pdGVyXCIsXCJVbmFibGUgdG8gYXV0by1kZXRlY3QgZGVsaW1pdGluZyBjaGFyYWN0ZXI7IGRlZmF1bHRlZCB0byAnXCIrUy5EZWZhdWx0RGVsaW1pdGVyK1wiJ1wiKSxkPSExKSxlLnNraXBFbXB0eUxpbmVzKWZvcih2YXIgdD0wO3Q8Yi5kYXRhLmxlbmd0aDt0KyspMT09Yi5kYXRhW3RdLmxlbmd0aCYmXCJcIj09Yi5kYXRhW3RdWzBdJiZiLmRhdGEuc3BsaWNlKHQtLSwxKTtyZXR1cm4gcigpJiZuKCksaSgpfWZ1bmN0aW9uIHIoKXtyZXR1cm4gZS5oZWFkZXImJjA9PXkubGVuZ3RofWZ1bmN0aW9uIG4oKXtpZihiKXtmb3IodmFyIGU9MDtyKCkmJmU8Yi5kYXRhLmxlbmd0aDtlKyspZm9yKHZhciB0PTA7dDxiLmRhdGFbZV0ubGVuZ3RoO3QrKyl5LnB1c2goYi5kYXRhW2VdW3RdKTtiLmRhdGEuc3BsaWNlKDAsMSl9fWZ1bmN0aW9uIGkoKXtpZighYnx8IWUuaGVhZGVyJiYhZS5keW5hbWljVHlwaW5nKXJldHVybiBiO2Zvcih2YXIgdD0wO3Q8Yi5kYXRhLmxlbmd0aDt0Kyspe2Zvcih2YXIgcj17fSxuPTA7bjxiLmRhdGFbdF0ubGVuZ3RoO24rKyl7aWYoZS5keW5hbWljVHlwaW5nKXt2YXIgaT1iLmRhdGFbdF1bbl07Yi5kYXRhW3RdW25dPVwidHJ1ZVwiPT1pfHxcIlRSVUVcIj09aT8hMDpcImZhbHNlXCI9PWl8fFwiRkFMU0VcIj09aT8hMTpvKGkpfWUuaGVhZGVyJiYobj49eS5sZW5ndGg/KHIuX19wYXJzZWRfZXh0cmF8fChyLl9fcGFyc2VkX2V4dHJhPVtdKSxyLl9fcGFyc2VkX2V4dHJhLnB1c2goYi5kYXRhW3RdW25dKSk6clt5W25dXT1iLmRhdGFbdF1bbl0pfWUuaGVhZGVyJiYoYi5kYXRhW3RdPXIsbj55Lmxlbmd0aD9oKFwiRmllbGRNaXNtYXRjaFwiLFwiVG9vTWFueUZpZWxkc1wiLFwiVG9vIG1hbnkgZmllbGRzOiBleHBlY3RlZCBcIit5Lmxlbmd0aCtcIiBmaWVsZHMgYnV0IHBhcnNlZCBcIituLHQpOm48eS5sZW5ndGgmJmgoXCJGaWVsZE1pc21hdGNoXCIsXCJUb29GZXdGaWVsZHNcIixcIlRvbyBmZXcgZmllbGRzOiBleHBlY3RlZCBcIit5Lmxlbmd0aCtcIiBmaWVsZHMgYnV0IHBhcnNlZCBcIituLHQpKX1yZXR1cm4gZS5oZWFkZXImJmIubWV0YSYmKGIubWV0YS5maWVsZHM9eSksYn1mdW5jdGlvbiBzKHQpe2Zvcih2YXIgcixuLGkscz1bXCIsXCIsXCJcdFwiLFwifFwiLFwiO1wiLFMuUkVDT1JEX1NFUCxTLlVOSVRfU0VQXSxhPTA7YTxzLmxlbmd0aDthKyspe3ZhciBvPXNbYV0saD0wLGY9MDtpPXZvaWQgMDtmb3IodmFyIGM9bmV3IHUoe2RlbGltaXRlcjpvLHByZXZpZXc6MTB9KS5wYXJzZSh0KSxkPTA7ZDxjLmRhdGEubGVuZ3RoO2QrKyl7dmFyIGw9Yy5kYXRhW2RdLmxlbmd0aDtmKz1sLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpP2w+MSYmKGgrPU1hdGguYWJzKGwtaSksaT1sKTppPWx9Yy5kYXRhLmxlbmd0aD4wJiYoZi89Yy5kYXRhLmxlbmd0aCksKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBufHxuPmgpJiZmPjEuOTkmJihuPWgscj1vKX1yZXR1cm4gZS5kZWxpbWl0ZXI9cix7c3VjY2Vzc2Z1bDohIXIsYmVzdERlbGltaXRlcjpyfX1mdW5jdGlvbiBhKGUpe2U9ZS5zdWJzdHIoMCwxMDQ4NTc2KTt2YXIgdD1lLnNwbGl0KFwiXFxyXCIpO2lmKDE9PXQubGVuZ3RoKXJldHVyblwiXFxuXCI7Zm9yKHZhciByPTAsbj0wO248dC5sZW5ndGg7bisrKVwiXFxuXCI9PXRbbl1bMF0mJnIrKztyZXR1cm4gcj49dC5sZW5ndGgvMj9cIlxcclxcblwiOlwiXFxyXCJ9ZnVuY3Rpb24gbyhlKXt2YXIgdD1sLnRlc3QoZSk7cmV0dXJuIHQ/cGFyc2VGbG9hdChlKTplfWZ1bmN0aW9uIGgoZSx0LHIsbil7Yi5lcnJvcnMucHVzaCh7dHlwZTplLGNvZGU6dCxtZXNzYWdlOnIscm93Om59KX12YXIgZixjLGQsbD0vXlxccyotPyhcXGQqXFwuP1xcZCt8XFxkK1xcLj9cXGQqKShlWy0rXT9cXGQrKT9cXHMqJC9pLHA9dGhpcyxnPTAsdj0hMSxrPSExLHk9W10sYj17ZGF0YTpbXSxlcnJvcnM6W10sbWV0YTp7fX07aWYobShlLnN0ZXApKXt2YXIgUj1lLnN0ZXA7ZS5zdGVwPWZ1bmN0aW9uKG4pe2lmKGI9bixyKCkpdCgpO2Vsc2V7aWYodCgpLDA9PWIuZGF0YS5sZW5ndGgpcmV0dXJuO2crPW4uZGF0YS5sZW5ndGgsZS5wcmV2aWV3JiZnPmUucHJldmlldz9jLmFib3J0KCk6UihiLHApfX19dGhpcy5wYXJzZT1mdW5jdGlvbihyLG4saSl7aWYoZS5uZXdsaW5lfHwoZS5uZXdsaW5lPWEocikpLGQ9ITEsIWUuZGVsaW1pdGVyKXt2YXIgbz1zKHIpO28uc3VjY2Vzc2Z1bD9lLmRlbGltaXRlcj1vLmJlc3REZWxpbWl0ZXI6KGQ9ITAsZS5kZWxpbWl0ZXI9Uy5EZWZhdWx0RGVsaW1pdGVyKSxiLm1ldGEuZGVsaW1pdGVyPWUuZGVsaW1pdGVyfXZhciBoPV8oZSk7cmV0dXJuIGUucHJldmlldyYmZS5oZWFkZXImJmgucHJldmlldysrLGY9cixjPW5ldyB1KGgpLGI9Yy5wYXJzZShmLG4saSksdCgpLHY/e21ldGE6e3BhdXNlZDohMH19OmJ8fHttZXRhOntwYXVzZWQ6ITF9fX0sdGhpcy5wYXVzZWQ9ZnVuY3Rpb24oKXtyZXR1cm4gdn0sdGhpcy5wYXVzZT1mdW5jdGlvbigpe3Y9ITAsYy5hYm9ydCgpLGY9Zi5zdWJzdHIoYy5nZXRDaGFySW5kZXgoKSl9LHRoaXMucmVzdW1lPWZ1bmN0aW9uKCl7dj0hMSxwLnN0cmVhbWVyLnBhcnNlQ2h1bmsoZil9LHRoaXMuYWJvcnRlZD1mdW5jdGlvbigpe3JldHVybiBrfSx0aGlzLmFib3J0PWZ1bmN0aW9uKCl7az0hMCxjLmFib3J0KCksYi5tZXRhLmFib3J0ZWQ9ITAsbShlLmNvbXBsZXRlKSYmZS5jb21wbGV0ZShiKSxmPVwiXCJ9fWZ1bmN0aW9uIHUoZSl7ZT1lfHx7fTt2YXIgdD1lLmRlbGltaXRlcixyPWUubmV3bGluZSxuPWUuY29tbWVudHMsaT1lLnN0ZXAscz1lLnByZXZpZXcsYT1lLmZhc3RNb2RlO2lmKChcInN0cmluZ1wiIT10eXBlb2YgdHx8Uy5CQURfREVMSU1JVEVSUy5pbmRleE9mKHQpPi0xKSYmKHQ9XCIsXCIpLG49PT10KXRocm93XCJDb21tZW50IGNoYXJhY3RlciBzYW1lIGFzIGRlbGltaXRlclwiO249PT0hMD9uPVwiI1wiOihcInN0cmluZ1wiIT10eXBlb2Ygbnx8Uy5CQURfREVMSU1JVEVSUy5pbmRleE9mKG4pPi0xKSYmKG49ITEpLFwiXFxuXCIhPXImJlwiXFxyXCIhPXImJlwiXFxyXFxuXCIhPXImJihyPVwiXFxuXCIpO3ZhciBvPTAsdT0hMTt0aGlzLnBhcnNlPWZ1bmN0aW9uKGUsaCxmKXtmdW5jdGlvbiBjKGUpe2IucHVzaChlKSxTPW99ZnVuY3Rpb24gZCh0KXtyZXR1cm4gZj9wKCk6KFwidW5kZWZpbmVkXCI9PXR5cGVvZiB0JiYodD1lLnN1YnN0cihvKSksdy5wdXNoKHQpLG89ZyxjKHcpLHkmJl8oKSxwKCkpfWZ1bmN0aW9uIGwodCl7bz10LGModyksdz1bXSxPPWUuaW5kZXhPZihyLG8pfWZ1bmN0aW9uIHAoZSl7cmV0dXJue2RhdGE6YixlcnJvcnM6UixtZXRhOntkZWxpbWl0ZXI6dCxsaW5lYnJlYWs6cixhYm9ydGVkOnUsdHJ1bmNhdGVkOiEhZSxjdXJzb3I6UysoaHx8MCl9fX1mdW5jdGlvbiBfKCl7aShwKCkpLGI9W10sUj1bXX1pZihcInN0cmluZ1wiIT10eXBlb2YgZSl0aHJvd1wiSW5wdXQgbXVzdCBiZSBhIHN0cmluZ1wiO3ZhciBnPWUubGVuZ3RoLG09dC5sZW5ndGgsdj1yLmxlbmd0aCxrPW4ubGVuZ3RoLHk9XCJmdW5jdGlvblwiPT10eXBlb2YgaTtvPTA7dmFyIGI9W10sUj1bXSx3PVtdLFM9MDtpZighZSlyZXR1cm4gcCgpO2lmKGF8fGEhPT0hMSYmLTE9PT1lLmluZGV4T2YoJ1wiJykpe2Zvcih2YXIgQz1lLnNwbGl0KHIpLEU9MDtFPEMubGVuZ3RoO0UrKyl7dmFyIHc9Q1tFXTtpZihvKz13Lmxlbmd0aCxFIT09Qy5sZW5ndGgtMSlvKz1yLmxlbmd0aDtlbHNlIGlmKGYpcmV0dXJuIHAoKTtpZighbnx8dy5zdWJzdHIoMCxrKSE9bil7aWYoeSl7aWYoYj1bXSxjKHcuc3BsaXQodCkpLF8oKSx1KXJldHVybiBwKCl9ZWxzZSBjKHcuc3BsaXQodCkpO2lmKHMmJkU+PXMpcmV0dXJuIGI9Yi5zbGljZSgwLHMpLHAoITApfX1yZXR1cm4gcCgpfWZvcih2YXIgeD1lLmluZGV4T2YodCxvKSxPPWUuaW5kZXhPZihyLG8pOzspaWYoJ1wiJyE9ZVtvXSlpZihuJiYwPT09dy5sZW5ndGgmJmUuc3Vic3RyKG8sayk9PT1uKXtpZigtMT09TylyZXR1cm4gcCgpO289Tyt2LE89ZS5pbmRleE9mKHIsbykseD1lLmluZGV4T2YodCxvKX1lbHNlIGlmKC0xIT09eCYmKE8+eHx8LTE9PT1PKSl3LnB1c2goZS5zdWJzdHJpbmcobyx4KSksbz14K20seD1lLmluZGV4T2YodCxvKTtlbHNle2lmKC0xPT09TylicmVhaztpZih3LnB1c2goZS5zdWJzdHJpbmcobyxPKSksbChPK3YpLHkmJihfKCksdSkpcmV0dXJuIHAoKTtpZihzJiZiLmxlbmd0aD49cylyZXR1cm4gcCghMCl9ZWxzZXt2YXIgST1vO2ZvcihvKys7Oyl7dmFyIEk9ZS5pbmRleE9mKCdcIicsSSsxKTtpZigtMT09PUkpcmV0dXJuIGZ8fFIucHVzaCh7dHlwZTpcIlF1b3Rlc1wiLGNvZGU6XCJNaXNzaW5nUXVvdGVzXCIsbWVzc2FnZTpcIlF1b3RlZCBmaWVsZCB1bnRlcm1pbmF0ZWRcIixyb3c6Yi5sZW5ndGgsaW5kZXg6b30pLGQoKTtpZihJPT09Zy0xKXt2YXIgRD1lLnN1YnN0cmluZyhvLEkpLnJlcGxhY2UoL1wiXCIvZywnXCInKTtyZXR1cm4gZChEKX1pZignXCInIT1lW0krMV0pe2lmKGVbSSsxXT09dCl7dy5wdXNoKGUuc3Vic3RyaW5nKG8sSSkucmVwbGFjZSgvXCJcIi9nLCdcIicpKSxvPUkrMSttLHg9ZS5pbmRleE9mKHQsbyksTz1lLmluZGV4T2YocixvKTticmVha31pZihlLnN1YnN0cihJKzEsdik9PT1yKXtpZih3LnB1c2goZS5zdWJzdHJpbmcobyxJKS5yZXBsYWNlKC9cIlwiL2csJ1wiJykpLGwoSSsxK3YpLHg9ZS5pbmRleE9mKHQsbykseSYmKF8oKSx1KSlyZXR1cm4gcCgpO2lmKHMmJmIubGVuZ3RoPj1zKXJldHVybiBwKCEwKTticmVha319ZWxzZSBJKyt9fXJldHVybiBkKCl9LHRoaXMuYWJvcnQ9ZnVuY3Rpb24oKXt1PSEwfSx0aGlzLmdldENoYXJJbmRleD1mdW5jdGlvbigpe3JldHVybiBvfX1mdW5jdGlvbiBoKCl7dmFyIGU9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7cmV0dXJuIGUubGVuZ3RoP2VbZS5sZW5ndGgtMV0uc3JjOlwiXCJ9ZnVuY3Rpb24gZigpe2lmKCFTLldPUktFUlNfU1VQUE9SVEVEKXJldHVybiExO2lmKCFiJiZudWxsPT09Uy5TQ1JJUFRfUEFUSCl0aHJvdyBuZXcgRXJyb3IoXCJTY3JpcHQgcGF0aCBjYW5ub3QgYmUgZGV0ZXJtaW5lZCBhdXRvbWF0aWNhbGx5IHdoZW4gUGFwYSBQYXJzZSBpcyBsb2FkZWQgYXN5bmNocm9ub3VzbHkuIFlvdSBuZWVkIHRvIHNldCBQYXBhLlNDUklQVF9QQVRIIG1hbnVhbGx5LlwiKTt2YXIgdD1TLlNDUklQVF9QQVRIfHx2O3QrPSgtMSE9PXQuaW5kZXhPZihcIj9cIik/XCImXCI6XCI/XCIpK1wicGFwYXdvcmtlclwiO3ZhciByPW5ldyBlLldvcmtlcih0KTtyZXR1cm4gci5vbm1lc3NhZ2U9YyxyLmlkPXcrKyxSW3IuaWRdPXIscn1mdW5jdGlvbiBjKGUpe3ZhciB0PWUuZGF0YSxyPVJbdC53b3JrZXJJZF0sbj0hMTtpZih0LmVycm9yKXIudXNlckVycm9yKHQuZXJyb3IsdC5maWxlKTtlbHNlIGlmKHQucmVzdWx0cyYmdC5yZXN1bHRzLmRhdGEpe3ZhciBpPWZ1bmN0aW9uKCl7bj0hMCxkKHQud29ya2VySWQse2RhdGE6W10sZXJyb3JzOltdLG1ldGE6e2Fib3J0ZWQ6ITB9fSl9LHM9e2Fib3J0OmkscGF1c2U6bCxyZXN1bWU6bH07aWYobShyLnVzZXJTdGVwKSl7Zm9yKHZhciBhPTA7YTx0LnJlc3VsdHMuZGF0YS5sZW5ndGgmJihyLnVzZXJTdGVwKHtkYXRhOlt0LnJlc3VsdHMuZGF0YVthXV0sZXJyb3JzOnQucmVzdWx0cy5lcnJvcnMsbWV0YTp0LnJlc3VsdHMubWV0YX0scyksIW4pO2ErKyk7ZGVsZXRlIHQucmVzdWx0c31lbHNlIG0oci51c2VyQ2h1bmspJiYoci51c2VyQ2h1bmsodC5yZXN1bHRzLHMsdC5maWxlKSxkZWxldGUgdC5yZXN1bHRzKX10LmZpbmlzaGVkJiYhbiYmZCh0LndvcmtlcklkLHQucmVzdWx0cyl9ZnVuY3Rpb24gZChlLHQpe3ZhciByPVJbZV07bShyLnVzZXJDb21wbGV0ZSkmJnIudXNlckNvbXBsZXRlKHQpLHIudGVybWluYXRlKCksZGVsZXRlIFJbZV19ZnVuY3Rpb24gbCgpe3Rocm93XCJOb3QgaW1wbGVtZW50ZWQuXCJ9ZnVuY3Rpb24gcCh0KXt2YXIgcj10LmRhdGE7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFMuV09SS0VSX0lEJiZyJiYoUy5XT1JLRVJfSUQ9ci53b3JrZXJJZCksXCJzdHJpbmdcIj09dHlwZW9mIHIuaW5wdXQpZS5wb3N0TWVzc2FnZSh7d29ya2VySWQ6Uy5XT1JLRVJfSUQscmVzdWx0czpTLnBhcnNlKHIuaW5wdXQsci5jb25maWcpLGZpbmlzaGVkOiEwfSk7ZWxzZSBpZihlLkZpbGUmJnIuaW5wdXQgaW5zdGFuY2VvZiBGaWxlfHxyLmlucHV0IGluc3RhbmNlb2YgT2JqZWN0KXt2YXIgbj1TLnBhcnNlKHIuaW5wdXQsci5jb25maWcpO24mJmUucG9zdE1lc3NhZ2Uoe3dvcmtlcklkOlMuV09SS0VSX0lELHJlc3VsdHM6bixmaW5pc2hlZDohMH0pfX1mdW5jdGlvbiBfKGUpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiBlKXJldHVybiBlO3ZhciB0PWUgaW5zdGFuY2VvZiBBcnJheT9bXTp7fTtmb3IodmFyIHIgaW4gZSl0W3JdPV8oZVtyXSk7cmV0dXJuIHR9ZnVuY3Rpb24gZyhlLHQpe3JldHVybiBmdW5jdGlvbigpe2UuYXBwbHkodCxhcmd1bWVudHMpfX1mdW5jdGlvbiBtKGUpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGV9dmFyIHYsaz0hZS5kb2N1bWVudCYmISFlLnBvc3RNZXNzYWdlLHk9ayYmLyhcXD98JilwYXBhd29ya2VyKD18JnwkKS8udGVzdChlLmxvY2F0aW9uLnNlYXJjaCksYj0hMSxSPXt9LHc9MCxTPXt9O2lmKFMucGFyc2U9dCxTLnVucGFyc2U9cixTLlJFQ09SRF9TRVA9U3RyaW5nLmZyb21DaGFyQ29kZSgzMCksUy5VTklUX1NFUD1TdHJpbmcuZnJvbUNoYXJDb2RlKDMxKSxTLkJZVEVfT1JERVJfTUFSSz1cIu+7v1wiLFMuQkFEX0RFTElNSVRFUlM9W1wiXFxyXCIsXCJcXG5cIiwnXCInLFMuQllURV9PUkRFUl9NQVJLXSxTLldPUktFUlNfU1VQUE9SVEVEPSFrJiYhIWUuV29ya2VyLFMuU0NSSVBUX1BBVEg9bnVsbCxTLkxvY2FsQ2h1bmtTaXplPTEwNDg1NzYwLFMuUmVtb3RlQ2h1bmtTaXplPTUyNDI4ODAsUy5EZWZhdWx0RGVsaW1pdGVyPVwiLFwiLFMuUGFyc2VyPXUsUy5QYXJzZXJIYW5kbGU9byxTLk5ldHdvcmtTdHJlYW1lcj1pLFMuRmlsZVN0cmVhbWVyPXMsUy5TdHJpbmdTdHJlYW1lcj1hLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPVM6bShlLmRlZmluZSkmJmUuZGVmaW5lLmFtZD9kZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gU30pOmUuUGFwYT1TLGUualF1ZXJ5KXt2YXIgQz1lLmpRdWVyeTtDLmZuLnBhcnNlPWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIHIoKXtpZigwPT1hLmxlbmd0aClyZXR1cm4gdm9pZChtKHQuY29tcGxldGUpJiZ0LmNvbXBsZXRlKCkpO3ZhciBlPWFbMF07aWYobSh0LmJlZm9yZSkpe3ZhciByPXQuYmVmb3JlKGUuZmlsZSxlLmlucHV0RWxlbSk7aWYoXCJvYmplY3RcIj09dHlwZW9mIHIpe2lmKFwiYWJvcnRcIj09ci5hY3Rpb24pcmV0dXJuIHZvaWQgbihcIkFib3J0RXJyb3JcIixlLmZpbGUsZS5pbnB1dEVsZW0sci5yZWFzb24pO2lmKFwic2tpcFwiPT1yLmFjdGlvbilyZXR1cm4gdm9pZCBpKCk7XCJvYmplY3RcIj09dHlwZW9mIHIuY29uZmlnJiYoZS5pbnN0YW5jZUNvbmZpZz1DLmV4dGVuZChlLmluc3RhbmNlQ29uZmlnLHIuY29uZmlnKSl9ZWxzZSBpZihcInNraXBcIj09cilyZXR1cm4gdm9pZCBpKCl9dmFyIHM9ZS5pbnN0YW5jZUNvbmZpZy5jb21wbGV0ZTtlLmluc3RhbmNlQ29uZmlnLmNvbXBsZXRlPWZ1bmN0aW9uKHQpe20ocykmJnModCxlLmZpbGUsZS5pbnB1dEVsZW0pLGkoKX0sUy5wYXJzZShlLmZpbGUsZS5pbnN0YW5jZUNvbmZpZyl9ZnVuY3Rpb24gbihlLHIsbixpKXttKHQuZXJyb3IpJiZ0LmVycm9yKHtuYW1lOmV9LHIsbixpKX1mdW5jdGlvbiBpKCl7YS5zcGxpY2UoMCwxKSxyKCl9dmFyIHM9dC5jb25maWd8fHt9LGE9W107cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciB0PVwiSU5QVVRcIj09Qyh0aGlzKS5wcm9wKFwidGFnTmFtZVwiKS50b1VwcGVyQ2FzZSgpJiZcImZpbGVcIj09Qyh0aGlzKS5hdHRyKFwidHlwZVwiKS50b0xvd2VyQ2FzZSgpJiZlLkZpbGVSZWFkZXI7aWYoIXR8fCF0aGlzLmZpbGVzfHwwPT10aGlzLmZpbGVzLmxlbmd0aClyZXR1cm4hMDtmb3IodmFyIHI9MDtyPHRoaXMuZmlsZXMubGVuZ3RoO3IrKylhLnB1c2goe2ZpbGU6dGhpcy5maWxlc1tyXSxpbnB1dEVsZW06dGhpcyxpbnN0YW5jZUNvbmZpZzpDLmV4dGVuZCh7fSxzKX0pfSkscigpLHRoaXN9fXk/ZS5vbm1lc3NhZ2U9cDpTLldPUktFUlNfU1VQUE9SVEVEJiYodj1oKCksZG9jdW1lbnQuYm9keT9kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLGZ1bmN0aW9uKCl7Yj0hMH0sITApOmI9ITApLGkucHJvdG90eXBlPU9iamVjdC5jcmVhdGUobi5wcm90b3R5cGUpLGkucHJvdG90eXBlLmNvbnN0cnVjdG9yPWkscy5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShuLnByb3RvdHlwZSkscy5wcm90b3R5cGUuY29uc3RydWN0b3I9cyxhLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGEucHJvdG90eXBlKSxhLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1hfShcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp0aGlzKTsiLCJ2YXIgRW5naW5lID0ge307XG5cbkVuZ2luZS5Cb290ID0gZnVuY3Rpb24gKGdhbWUpIHsgfTtcblxuRW5naW5lLkJvb3QucHJvdG90eXBlID0ge1xuICBwcmVsb2FkOiBmdW5jdGlvbiAoKSB7XG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zY2FsZS5zY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLlNIT1dfQUxMO1xuICAgIHRoaXMuc2NhbGUucGFnZUFsaWduSG9yaXpvbnRhbGx5ID0gdHJ1ZTtcbiAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnblZlcnRpY2FsbHkgPSB0cnVlO1xuICAgIHRoaXMuc3RhZ2UuZGlzYWJsZVZpc2liaWxpdHlDaGFuZ2UgPSB0cnVlO1xuICAgIHRoaXMuc3RhdGUuc3RhcnQoJ1ByZWxvYWRlcicpO1xuICB9XG59XG4iLCJFbmdpbmUuUHJlbG9hZGVyID0gZnVuY3Rpb24gKGdhbWUpIHtcbiAgdGhpcy5nYW1lID0gZ2FtZTtcbn07XG5cbkVuZ2luZS5QcmVsb2FkZXIucHJvdG90eXBlID0ge1xuICBwcmVsb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XG4gICAgdGhpcy5zdGFnZS5zbW9vdGhlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5hZGRMb2dvTGFibGUoKTtcbiAgICB0aGlzLmFkZFByb2dyZXNzTGFibGUoKTtcblxuICAgIGlmIChFbmdpbmUuREVCVUcpXG4gICAgICB0aGlzLmxvYWQuZW5hYmxlUGFyYWxsZWwgPSBmYWxzZTtcblxuICAgIHRoaXMuX2luaXRTdHlsZSgpO1xuXG4gICAgdGhpcy5sb2FkLmltYWdlKCdwb2tlYmFsbCcsICdhc3NldHMvaW1hZ2VzL2JhY2tncm91bmQvcG9rZWJhbGwucG5nJyk7XG4gICAgdGhpcy5sb2FkLmltYWdlKCdzbGlkZS1iZycsICdhc3NldHMvaW1hZ2VzL2JhY2tncm91bmQvc2xpZGUtYmcuanBnJyk7XG4gICAgdGhpcy5sb2FkLmltYWdlKCdjYWxjLWJnJywgJ2Fzc2V0cy9pbWFnZXMvYmFja2dyb3VuZC9jYWxjLmpwZycpO1xuICAgIHRoaXMubG9hZC5pbWFnZSgnc2hhcmUtYnRuJywgJ2Fzc2V0cy9pbWFnZXMvdWkvc2hhcmUtYnRuLnBuZycpO1xuICAgIHRoaXMubG9hZC5pbWFnZSgncmVwZWF0LWJ0bicsICdhc3NldHMvaW1hZ2VzL3VpL3JlcGVhdC1idG4ucG5nJyk7XG4gICAgdGhpcy5sb2FkLmltYWdlKCdybmQtcG9rZW1vbicsICdhc3NldHMvaW1hZ2VzL3Bva2Vtb25zLycgKyBFbmdpbmUucm5kUG9rZW1vbiArICcucG5nJyk7XG5cbiAgICB0aGlzLl9sb2FkUG9rZW1vbnMoKTtcblxuICAgIHRoaXMubG9hZC50ZXh0KCdwb2tlbW9uLmNzdicsICdhc3NldHMvZGF0YS9wb2tlbW9uLmNzdicpO1xuXG4gICAgdGhpcy5sb2FkLm9uRmlsZUNvbXBsZXRlLmFkZCh0aGlzLmZpbGVDb21wbGV0ZSwgdGhpcyk7XG4gIH0sXG5cbiAgX2luaXRQb2tlbW9uREI6IGZ1bmN0aW9uKCkge1xuICAgIEVuZ2luZS5Qb2tlbW9uREIubG9hZCh0aGlzLmNhY2hlLmdldFRleHQoJ3Bva2Vtb24uY3N2JykpO1xuICB9LFxuXG4gIF9sb2FkUG9rZW1vbnM6IGZ1bmN0aW9uKCkge1xuICAgIEVuZ2luZS5sb2FkZXIgPSBuZXcgUGhhc2VyLkxvYWRlcih0aGlzLmdhbWUpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBFbmdpbmUuUk9MTF9TTElERV9DT1VOVDsgaSsrKSB7XG4gICAgICBFbmdpbmUubG9hZGVyLmltYWdlKCdwb2tlbW9uUm9sbCcgKyBpLCAnYXNzZXRzL2ltYWdlcy9wb2tlbW9ucy8nICsgdGhpcy5ybmQuYmV0d2VlbigxLCA3MjEpICsgJy5wbmcnKTtcbiAgICB9XG4gIH0sXG5cbiAgZmlsZUNvbXBsZXRlOiBmdW5jdGlvbiAocHJvZ3Jlc3MsIGNhY2hlS2V5LCBzdWNjZXNzLCB0b3RhbExvYWRlZCwgdG90YWxGaWxlcykge1xuICAgIHRoaXMuX3Byb2dyZXNzTGFibGUudGV4dCA9IHByb2dyZXNzICsgJyUgJyArIHRvdGFsTG9hZGVkICsgJy8nICsgdG90YWxGaWxlcztcbiAgfSxcblxuICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9pbml0UG9rZW1vbkRCKCk7XG4gICAgRW5naW5lLmxvYWRlci5zdGFydCgpO1xuXG4gICAgLy8gVE9ETzogVEVNUFxuICAgIEVuZ2luZS5sb2FkZXIub25Mb2FkQ29tcGxldGUuYWRkKGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5zdGF0ZS5zdGFydCgnQ2FsY3VsYXRlJyk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICAvLyB0aGlzLnN0YXRlLnN0YXJ0KCdHYW1lJyk7XG4gIH0sXG5cbiAgX2luaXRTdHlsZTogZnVuY3Rpb24oKSB7XG4gICAgRW5naW5lLnRleHRTdHlsZSA9IHtcbiAgICAgIGZpbGw6ICcjZmZmJyxcbiAgICAgIGZvbnQ6ICcyNnB4IE9wZW4gU2FucydcbiAgICB9XG4gIH0sXG5cbiAgYWRkTG9nb0xhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0eWxlID0ge1xuICAgICAgZmlsbDogJyNGRkYnLFxuICAgICAgZm9udDogJzQzcHggQXJpYWwnXG4gICAgfVxuXG4gICAgdGhpcy5fbG9nb0xhYmxlID0gdGhpcy5hZGQudGV4dCh0aGlzLmdhbWUud2lkdGggLyAyLCB0aGlzLmdhbWUuaGVpZ2h0IC8gNCwgJ1Bva2Vtb24gVGVzdCcsIHN0eWxlKTtcbiAgICB0aGlzLl9sb2dvTGFibGUuYW5jaG9yLnNldFRvKDAuNSk7XG4gIH0sXG5cbiAgYWRkUHJvZ3Jlc3NMYWJsZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdHlsZSA9IHtcbiAgICAgIGZpbGw6ICcjRkZGJyxcbiAgICAgIGZvbnQ6ICcyMXB4IEFyaWFsJ1xuICAgIH1cblxuICAgIHRoaXMuX3Byb2dyZXNzTGFibGUgPSB0aGlzLmFkZC50ZXh0KHRoaXMuZ2FtZS53aWR0aCAvIDIsIHRoaXMuZ2FtZS5oZWlnaHQgLyAyLCAnQ2FsY3VsYXRlZC4uLicsIHN0eWxlKTtcbiAgICB0aGlzLl9wcm9ncmVzc0xhYmxlLmFuY2hvci5zZXRUbygwLjUpO1xuICB9XG59XG4iLCJFbmdpbmUuQW5zd2VyID0gZnVuY3Rpb24oZ2FtZSwgeCwgeSwgdGV4dCwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgdGhpcy5fcGFkZGluZyA9IDU7XG5cbiAgdGhpcy5fY3JlYXRlVGV4dCgpO1xuXG4gIFBoYXNlci5CdXR0b24uY2FsbCh0aGlzLCBnYW1lLCB4LCB5LCB0aGlzLl9jcmVhdGVCYWNrZ3JvdW5kKCksIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgdGhpcy50aW50ID0gMHgwMDk2ODg7XG5cbiAgdGhpcy5hZGRDaGlsZCh0aGlzLl90ZXh0U3ByaXRlKTtcblxuICB0aGlzLm9uSW5wdXRPdmVyLmFkZChmdW5jdGlvbigpIHtcbiAgICB0aGlzLnRpbnQgPSAweDAwZmVlNztcbiAgfSwgdGhpcyk7XG5cbiAgdGhpcy5vbklucHV0T3V0LmFkZChmdW5jdGlvbigpIHtcbiAgICB0aGlzLnRpbnQgPSAweDAwOTY4ODtcbiAgfSwgdGhpcyk7XG59XG5cbkVuZ2luZS5BbnN3ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQaGFzZXIuQnV0dG9uLnByb3RvdHlwZSk7XG5FbmdpbmUuQW5zd2VyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEVuZ2luZS5BbnN3ZXI7XG5cbkVuZ2luZS5BbnN3ZXIucHJvdG90eXBlLl9jcmVhdGVCYWNrZ3JvdW5kID0gZnVuY3Rpb24oKSB7XG4gIHZhciBib3R0b21QYWRkaW5nID0gLTc7XG5cbiAgdmFyIGJtcCA9IHRoaXMuZ2FtZS5hZGQuYml0bWFwRGF0YSh0aGlzLl90ZXh0U3ByaXRlLndpZHRoICsgdGhpcy5fcGFkZGluZyAqIDIsIHRoaXMuX3RleHRTcHJpdGUuaGVpZ2h0ICsgdGhpcy5fcGFkZGluZyAvIDIpO1xuICBibXAuY3R4LmJlZ2luUGF0aCgpO1xuICBibXAuY3R4LnJlY3QoMCwgMCwgYm1wLndpZHRoLCBibXAuaGVpZ2h0ICsgYm90dG9tUGFkZGluZyk7XG4gIGJtcC5jdHguZmlsbFN0eWxlID0gJyNmZmYnO1xuICBibXAuY3R4LmZpbGwoKTtcblxuICByZXR1cm4gYm1wO1xufVxuXG5FbmdpbmUuQW5zd2VyLnByb3RvdHlwZS5fY3JlYXRlVGV4dCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl90ZXh0U3ByaXRlID0gbmV3IFBoYXNlci5UZXh0KHRoaXMuZ2FtZSwgMCwgMCwgdGhpcy50ZXh0LCBFbmdpbmUudGV4dFN0eWxlKTtcbiAgdGhpcy5fdGV4dFNwcml0ZS5hbmNob3Iuc2V0VG8oMC41LCAwKTtcbn1cbiIsIkVuZ2luZS5HYW1lID0gZnVuY3Rpb24oZ2FtZSkge31cblxuRW5naW5lLkdhbWUucHJvdG90eXBlID0ge1xuICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnOyAvLyNkZGRcblxuICAgIHRoaXMuX2FkZEJhY2tncm91bmQoKTtcbiAgICB0aGlzLl9hZGRQb2tlYmFsbFN5c3RlbSgpO1xuICAgIHRoaXMuX2FkZFNsaWRlcygpO1xuICAgIHRoaXMuX3Nob3dDaGFpblNsaWRlcyh0aGlzLnNsaWRlcyk7XG4gICAgdGhpcy5fYWRkUHJvZ3Jlc3NTbGlkZSgpO1xuXG4gICAgdGhpcy5fZHJhd0RlYnVnKCk7XG4gIH0sXG5cbiAgX2FkZFNsaWRlczogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zbGlkZXMgPSBbXG4gICAgICBuZXcgRW5naW5lLlNsaWRlKHRoaXMuZ2FtZSwgJ9CS0Ysg0LvRjtCx0LjRgtC1INC+0LLRgdGP0L3QvtC1INC/0LXRh9C10L3RjNC1PycsIFsn0JTQsCcsICfQndC10YInLCAn0J3QtSDQv9GA0L7QsdC+0LLQsNC7INC10LPQviddKSxcbiAgICAgIG5ldyBFbmdpbmUuU2xpZGUodGhpcy5nYW1lLCAn0JLQsNGBINGH0LDRgdGC0L4g0LHRjNGR0YIg0YLQvtC60L7QvD8nLCBbJ9CR0YvQstCw0LXRgicsICfQntGH0LXQvdGMINGA0LXQtNC60L4nLCAn0J3QtSDQt9C90LDRjicsICfQotC+0LvRjNC60L4g0YfRgtC+INGD0LTQsNGA0LjQu9C+ISddKSxcbiAgICAgIG5ldyBFbmdpbmUuU2xpZGUodGhpcy5nYW1lLCAn0JrQsNC60LDRjyDRgdGC0LjRhdC40Y8g0LLQsNC8INCx0L7Qu9GM0YjQtSDQvdGA0LDQstC40YLRgdGPPycsIFsn0JLQvtC00LAnLCAn0J7Qs9C+0L3RjCcsICfQktC10YLQtdGAJywgJ9CX0LXQvNC70Y8nXSksXG4gICAgICBuZXcgRW5naW5lLlNsaWRlKHRoaXMuZ2FtZSwgJ9CS0YvQsdC40YDQuNGC0LUg0L7QtNC90L4g0LjQty4uLicsIFsn0KLRjNC80LAnLCAn0KHQstC10YInXSksXG4gICAgICBuZXcgRW5naW5lLlNsaWRlKHRoaXMuZ2FtZSwgJ9CS0Ysg0LHQvtC40YLQtdGB0Ywg0L3QsNGB0LXQutC+0LzRi9GFPycsIFsn0JTQsCcsICfQndC10YInXSksXG4gICAgICBuZXcgRW5naW5lLlNsaWRlKHRoaXMuZ2FtZSwgJ9Cd0LUg0L/RgNC+0YLQuNCyINC70Lgg0LLRiyDQt9Cw0LLQtdGB0YLQuCDQtNC+0LzQsNGI0L3QtdCz0L4g0LTRgNCw0LrQvtC90LA/JywgWyfQn9GE0YQsINC10YnRkSDRgdC/0YDQsNGI0LjQstCw0LXRgtC1JywgJ9Cd0LUg0LvRjtCx0LvRjiDQtNGA0LDQutC+0L3QvtCyJywgJ9CR0L7RjtGB0Ywg0L7QvSDRgdGK0LXRgdGCINC80L7QtdCz0L4g0L/QuNGC0L7QvNGG0LAnXSksXG4gICAgICBuZXcgRW5naW5lLlNsaWRlKHRoaXMuZ2FtZSwgJ9Ca0LDQutC+0LUg0L/QtdGA0LXQtNCy0LjQttC10L3QuNC1INCy0Ysg0L/RgNC10LTQv9C+0YfQuNGC0LDQtdGC0LU/JywgWyfQn9C+INCy0L7Qt9C00YPRhdGDJywgJ9Cf0L4g0LfQtdC80LvQtScsICfQktC/0LvQsNCy0YwnLCAn0KLQtdC70LXQv9C+0YDRgtCw0YbQuNGPJ10pLFxuICAgICAgbmV3IEVuZ2luZS5TbGlkZSh0aGlzLmdhbWUsICfQktGLINCx0L7QuNGC0LXRgdGMINC/0YDQuNCy0LXQtNC10L3QuNC5PycsIFsn0JTQsCcsICfQndC10YInLCAn0J7QvdC4INC90LUg0YHRg9GJ0LXRgdGC0LLRg9GO0YIhJ10pLFxuICAgICAgbmV3IEVuZ2luZS5TbGlkZSh0aGlzLmdhbWUsICfQmtCw0LrQuNC1INCy0LDQvCDQvdGA0LDQstGP0YLRgdGPINC20LjQstC+0YLQvdGL0LUnLCBbJ9CR0L7Qu9GM0YjQuNC1JywgJ9Cc0LDQu9C10L3RjNC60LjQtScsICfQodGA0LXQtNC90LjQtSddKSxcbiAgICAgIG5ldyBFbmdpbmUuU2xpZGUodGhpcy5nYW1lLCAn0JLQsNC8INC90YDQsNCy0Y/RgtGB0Y8g0L/Rg9GF0LvQtdC90YzQutC40LUg0L/QuNGC0L7QvNGG0Ys/JywgWyfQlNCwJywgJ9Cd0LXRgicsICfQkdC10Lcg0YDQsNC30L3QuNGG0YsnXSksXG4gICAgXTtcbiAgfSxcblxuICBfc2hvd0NoYWluU2xpZGVzOiBmdW5jdGlvbihjaGFpbikge1xuICAgIHRoaXMuc2xpZGVDb3VudGVyID0gMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhaW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoYWluW2ldLnNldENhbGxiYWNrQ2hlY2sodGhpcy5fbmV4dFNsaWRlLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGNoYWluWzBdLnNob3coKTtcbiAgfSxcblxuICBfbmV4dFNsaWRlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNsaWRlQ291bnRlcisrO1xuXG4gICAgaWYgKHRoaXMuc2xpZGVDb3VudGVyID49IHRoaXMuc2xpZGVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5fZmluaXNoVGVzdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2xpZGVzW3RoaXMuc2xpZGVDb3VudGVyXS5zaG93KCk7XG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZS50ZXh0ID0gJ9CS0L7Qv9GA0L7RgSAnICsgKHRoaXMuc2xpZGVDb3VudGVyICsgMSkgKyAnINC40LcgJyArIHRoaXMuc2xpZGVzLmxlbmd0aDtcbiAgfSxcblxuICBfYWRkQmFja2dyb3VuZDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGJnID0gdGhpcy5nYW1lLmFkZC5zcHJpdGUoMCwgMCwgJ3NsaWRlLWJnJyk7XG4gIH0sXG5cbiAgX2RyYXdEZWJ1ZzogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fbGluZVYgPSBuZXcgUGhhc2VyLkxpbmUodGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIDAsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCB0aGlzLmdhbWUuaGVpZ2h0KTtcbiAgICB0aGlzLl9saW5lSCA9IG5ldyBQaGFzZXIuTGluZSgwLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWSwgdGhpcy5nYW1lLndpZHRoLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWSk7XG4gIH0sXG5cbiAgX2FkZFBva2ViYWxsU3lzdGVtOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnBva2ViYWxsU3lzdGVtID0gbmV3IEVuZ2luZS5Qb2tlYmFsbFN5c3RlbSh0aGlzLmdhbWUpO1xuICAgIHRoaXMucG9rZWJhbGxTeXN0ZW0uY3JlYXRlKCk7XG4gIH0sXG5cbiAgX2ZpbmlzaFRlc3Q6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc3RhdGUuc3RhcnQoJ0NhbGN1bGF0ZScpO1xuICB9LFxuXG4gIF9hZGRQcm9ncmVzc1NsaWRlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9wcm9ncmVzc0xhYmxlID0gdGhpcy5hZGQudGV4dChFbmdpbmUuR0FNRV9XSURUSCAvIDIsIDI1LCAn0JLQvtC/0YDQvtGBIDEg0LjQtyAnICsgdGhpcy5zbGlkZXMubGVuZ3RoLCBFbmdpbmUudGV4dFN0eWxlKTtcbiAgICB0aGlzLl9wcm9ncmVzc0xhYmxlLmZvbnRTaXplID0gMTY7XG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZS5hbmNob3Iuc2V0VG8oMC41LCAwKTtcbiAgfSxcblxuICB1cGRhdGU6IGZ1bmN0aW9uKCkge30sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAvLyB0aGlzLmdhbWUuZGVidWcuaW5wdXRJbmZvKDE1LCAxNSwgJyNmZmYnKTtcbiAgICAvLyAvLyB0aGlzLmdhbWUuZGVidWcuc3ByaXRlQm91bmRzKHRoaXMudC5fc2xpZGVHcm91cCwgJ3JnYmEoMjEzLCA4MywgODMsIDAuMjUpJyk7XG4gICAgLy8gLy8gdGhpcy5nYW1lLmRlYnVnLnNwcml0ZUJvdW5kcyh0aGlzLnQuX2Fuc3dlckdyb3VwLCAncmdiYSgzNiwgMCwgMjU1LCAwLjI1KScpO1xuICAgIC8vXG4gICAgLy8gZ2FtZS5kZWJ1Zy5nZW9tKHRoaXMuX2xpbmVWKTtcbiAgICAvLyBnYW1lLmRlYnVnLmdlb20odGhpcy5fbGluZUgpO1xuICB9XG59XG4iLCJFbmdpbmUuUG9rZWJhbGxTeXN0ZW0gPSBmdW5jdGlvbihnYW1lKSB7XG4gIHRoaXMuZ2FtZSA9IGdhbWU7XG4gIHRoaXMuY291bnRFbGVtZW50cyA9IDE2O1xufVxuXG5FbmdpbmUuUG9rZWJhbGxTeXN0ZW0ucHJvdG90eXBlID0ge1xuICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2FkZFBva2ViYWxscygpO1xuICAgIHRoaXMuX3J1blRpbWVyKCk7XG4gIH0sXG5cbiAgX2FkZFBva2ViYWxsczogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5wb2tlYmFsbHMgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY291bnRFbGVtZW50czsgaSsrKSB7XG4gICAgICB2YXIgcG9rZWJhbGwgPSBuZXcgUGhhc2VyLlNwcml0ZSh0aGlzLmdhbWUsIDAsIDAsICdwb2tlYmFsbCcpO1xuXG4gICAgICBwb2tlYmFsbC5hbmNob3Iuc2V0VG8oMC41KTtcblxuICAgICAgdGhpcy5wb2tlYmFsbHMuYWRkKHBva2ViYWxsKTtcblxuICAgICAgcG9rZWJhbGwua2lsbCgpO1xuICAgIH1cbiAgfSxcblxuICBfcnVuVGltZXI6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3RpbWVyID0gdGhpcy5nYW1lLnRpbWUuY3JlYXRlKCk7XG4gICAgdGhpcy5fdGltZXIubG9vcChQaGFzZXIuVGltZXIuU0VDT05ELCB0aGlzLmVtaXQsIHRoaXMpO1xuICAgIHRoaXMuX3RpbWVyLnN0YXJ0KCk7XG4gIH0sXG5cbiAgZW1pdDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBhZGRpbmdzID0gMjU7XG4gICAgdmFyIHNjYWxlID0gdGhpcy5nYW1lLnJuZC5yZWFsSW5SYW5nZSgwLjI1LCAwLjgpO1xuICAgIHZhciBhbHBoYSA9IHRoaXMuZ2FtZS5ybmQucmVhbEluUmFuZ2UoMC4wNSwgMC4xNSk7XG5cbiAgICB2YXIgcG9rZWJhbGwgPSB0aGlzLnBva2ViYWxscy5nZXRGaXJzdERlYWQoKTtcblxuICAgIHBva2ViYWxsLnJldml2ZSgpO1xuICAgIHBva2ViYWxsLnJlc2V0KFxuICAgICAgdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKHBhZGRpbmdzLCB0aGlzLmdhbWUud2lkdGggLSBwYWRkaW5ncyksXG4gICAgICB0aGlzLmdhbWUucm5kLmJldHdlZW4ocGFkZGluZ3MsIHRoaXMuZ2FtZS5oZWlnaHQgLSBwYWRkaW5ncylcbiAgICApO1xuXG4gICAgcG9rZWJhbGwuYWxwaGEgPSAwO1xuICAgIHBva2ViYWxsLnJvdGF0aW9uID0gMDtcbiAgICBwb2tlYmFsbC5zY2FsZS5zZXRUbyhzY2FsZSwgc2NhbGUpO1xuXG4gICAgdmFyIHRhcmdldFggPSB0aGlzLmdhbWUucm5kLmJldHdlZW4oMTAwLCAzMDApO1xuICAgIHZhciB0YXJnZXRZID0gMDtcblxuICAgIGlmIChwb2tlYmFsbC54ID4gdGhpcy5nYW1lLndpZHRoIC8gMilcbiAgICAgIHRhcmdldFggKj0gLTE7XG5cbiAgICB2YXIgYWxwaGFUd2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4ocG9rZWJhbGwpXG4gICAgICAudG8oe2FscGhhOiBhbHBoYX0sIDI1MDApO1xuXG4gICAgdmFyIHNwZWVkVHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHBva2ViYWxsKVxuICAgICAgLnRvKHt4OiBwb2tlYmFsbC54ICsgdGFyZ2V0WH0sIDYwMDApO1xuXG4gICAgdmFyIHJvdGF0aW9uVHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHBva2ViYWxsKVxuICAgICAgLnRvKHtyb3RhdGlvbjogTWF0aC5QSSAqIDIgKiB0aGlzLmdhbWUucm5kLnBpY2soWy0xLCAxXSl9LCA2MDAwKTtcblxuICAgIHZhciBkaWVUd2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4ocG9rZWJhbGwpXG4gICAgICAudG8oe2FscGhhOiAwfSwgMjUwMCk7XG5cbiAgICBhbHBoYVR3ZWVuLnN0YXJ0KCk7XG4gICAgc3BlZWRUd2Vlbi5zdGFydCgpO1xuICAgIHJvdGF0aW9uVHdlZW4uc3RhcnQoKTtcblxuICAgIGFscGhhVHdlZW4uY2hhaW4oZGllVHdlZW4uZGVsYXkoMTAwMCkpO1xuXG4gICAgZGllVHdlZW4ub25Db21wbGV0ZVxuICAgICAgLmFkZChmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5raWxsKCk7XG4gICAgICB9LCBwb2tlYmFsbCk7XG5cbiAgICAvLyBhbHBoYVR3ZWVuLm9uQ29tcGxldGUuYWRkKGZ1bmN0aW9uKCkge1xuICAgIC8vICAgdGhpcy5raWxsKCk7XG4gICAgLy8gfSwgcG9rZWJhbGwpO1xuICB9LFxuXG4gIHVwZGF0ZTogZnVuY3Rpb24oKSB7XG5cbiAgfSxcbn1cbiIsIkVuZ2luZS5Qb2tlbW9uREIgPSB7XG4gIGxvYWQ6IGZ1bmN0aW9uKGRhdGFUZXh0KSB7XG4gICAgdGhpcy5wb2tlbW9ucyA9IFtdO1xuICAgIHZhciBkYXRhID0gUGFwYS5wYXJzZShkYXRhVGV4dCkuZGF0YTtcbiAgICB2YXIgZmllbGRzID0gZGF0YVswXTtcblxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHBva2Vtb25EYXRhID0gZGF0YVtpXTtcbiAgICAgIHZhciBwb2tlbW9uT2JqID0ge307XG5cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZmllbGRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHBva2Vtb25PYmpbZmllbGRzW2pdXSA9IHBva2Vtb25EYXRhW2pdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBva2Vtb25zLnB1c2gocG9rZW1vbk9iaik7XG4gICAgfVxuICB9XG59XG4iLCJFbmdpbmUuU2xpZGUgPSBmdW5jdGlvbihnYW1lLCB0ZXh0LCBhbnN3ZXJzKSB7XG4gIHRoaXMuZ2FtZSA9IGdhbWU7XG4gIHRoaXMuX21hcmdpblRvcEFuc3dlcnMgPSA3NTtcbiAgdGhpcy5fbGluZVNwYWNpbmdBbnN3ZXJzID0gNjA7XG4gIHRoaXMuX21hcmdpblRvcExhYmxlID0gMjAwO1xuXG4gIFBoYXNlci5TcHJpdGUuY2FsbCh0aGlzLCBnYW1lLCAwLCAwLCB0aGlzLl9jcmVhdGVCYWNrZ3JvdW5kKCkpO1xuXG4gIHRoaXMudGV4dCA9IHRleHQ7XG4gIHRoaXMuYW5zd2VycyA9IGFuc3dlcnM7XG4gIHRoaXMuYWxwaGEgPSAwO1xuICB0aGlzLnZpc2libGUgPSBmYWxzZTtcblxuICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMpO1xuXG4gIHRoaXMuX2FkZExhYmxlKCk7XG4gIHRoaXMuX2FkZEFuc3dlcnMoKTtcbn1cblxuRW5naW5lLlNsaWRlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGhhc2VyLlNwcml0ZS5wcm90b3R5cGUpO1xuRW5naW5lLlNsaWRlLmNvbnN0cnVjdG9yID0gRW5naW5lLlNsaWRlO1xuXG5FbmdpbmUuU2xpZGUucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcblxuICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpLnRvKHtcbiAgICBhbHBoYTogMVxuICB9LCAxNTApLnN0YXJ0KCk7XG59XG5cbkVuZ2luZS5TbGlkZS5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpLnRvKHtcbiAgICBhbHBoYTogMFxuICB9LCAxNTApLnN0YXJ0KCk7XG5cbiAgdHdlZW4ub25Db21wbGV0ZS5hZGQoZnVuY3Rpb24oKSB7XG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuY2FsbGJhY2soKTtcbiAgICB9XG4gIH0sIHRoaXMpO1xuXG4gIHJldHVybiB0d2Vlbi5vbkNvbXBsZXRlO1xufVxuXG5FbmdpbmUuU2xpZGUucHJvdG90eXBlLnNldENhbGxiYWNrQ2hlY2sgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG59XG5cbkVuZ2luZS5TbGlkZS5wcm90b3R5cGUuX2FkZExhYmxlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2xhYmxlID0gbmV3IFBoYXNlci5UZXh0KHRoaXMuZ2FtZSwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIHRoaXMuX21hcmdpblRvcExhYmxlLCB0aGlzLnRleHQsIEVuZ2luZS50ZXh0U3R5bGUpO1xuICB0aGlzLl9sYWJsZS53b3JkV3JhcCA9IHRydWU7XG4gIHRoaXMuX2xhYmxlLndvcmRXcmFwV2lkdGggPSA2MDA7XG4gIHRoaXMuX2xhYmxlLmFsaWduID0gJ2NlbnRlcic7XG4gIHRoaXMuX2xhYmxlLmFuY2hvci5zZXRUbygwLjUpO1xuXG4gIHRoaXMuYWRkQ2hpbGQodGhpcy5fbGFibGUpO1xufVxuXG5FbmdpbmUuU2xpZGUucHJvdG90eXBlLl9hZGRBbnN3ZXJzID0gZnVuY3Rpb24oKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hbnN3ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGFuc3dlciA9IG5ldyBFbmdpbmUuQW5zd2VyKFxuICAgICAgdGhpcy5nYW1lLFxuICAgICAgdGhpcy5nYW1lLndvcmxkLmNlbnRlclgsXG4gICAgICB0aGlzLl9sYWJsZS55ICsgdGhpcy5fbWFyZ2luVG9wQW5zd2VycyArIHRoaXMuX2xpbmVTcGFjaW5nQW5zd2VycyAqIGksXG4gICAgICB0aGlzLmFuc3dlcnNbaV0sXG4gICAgICB0aGlzLmhpZGUsXG4gICAgICB0aGlzXG4gICAgKTtcblxuICAgIGFuc3dlci5hbmNob3Iuc2V0VG8oMC41LCAwKTtcbiAgICB0aGlzLmFkZENoaWxkKGFuc3dlcik7XG4gIH1cbn1cblxuRW5naW5lLlNsaWRlLnByb3RvdHlwZS5fY3JlYXRlQmFja2dyb3VuZCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYm1wID0gdGhpcy5nYW1lLmFkZC5iaXRtYXBEYXRhKEVuZ2luZS5HQU1FX1dJRFRILCBFbmdpbmUuR0FNRV9IRUlHSFQpO1xuXG4gIGJtcC5jdHguYmVnaW5QYXRoKCk7XG4gIGJtcC5jdHgucmVjdCgwLCAwLCBibXAud2lkdGgsIGJtcC5oZWlnaHQpO1xuICBibXAuY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDAsIDAsIDAsIDApJztcbiAgYm1wLmN0eC5maWxsKCk7XG5cbiAgcmV0dXJuIGJtcDtcbn1cbiIsIkVuZ2luZS5DYWxjdWxhdGUgPSBmdW5jdGlvbihnYW1lKSB7fVxuXG5FbmdpbmUuQ2FsY3VsYXRlLnByb3RvdHlwZSA9IHtcbiAgY3JlYXRlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl90aW1lUHJvZ3Jlc3MgPSA4MDAwO1xuICAgIHRoaXMuX2NvdW50VGljayA9IDczO1xuICAgIHRoaXMuX3Byb2dyZXNzID0gMDtcbiAgICB0aGlzLl9yZXN1bHRQb2tlbW9uID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICdybmQtcG9rZW1vbicpO1xuICAgIHRoaXMuX3Jlc3VsdFBva2Vtb24udmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5fYWRkQmFja2dyb3VuZCgpO1xuICAgIHRoaXMuX2FkZFJvbGxlcigpO1xuICAgIHRoaXMuX2FkZEluZm9MYWJsZSgpO1xuICAgIHRoaXMuX2FkZFByb2dyZXNzTGFibGUoKTtcblxuICAgIHRoaXMuX3N0YXJ0Um9sbCgpO1xuICAgIHRoaXMuX3N0YXJ0UHJvZ3Jlc3MoKTtcbiAgfSxcblxuICBfYWRkUm9sbGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcm9sbFNpemUgPSAzMDA7XG4gICAgdmFyIG1hcmdpblJpZ2h0ID0gMTAwO1xuXG4gICAgdGhpcy5fcm9sbHMgPSBbXTtcbiAgICB0aGlzLl9yb2xsR3JvdXAgPSB0aGlzLmFkZC5ncm91cCgpO1xuICAgIHRoaXMuX2FjdGl2ZVJvbGxTcHJpdGUgPSAtMTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgRW5naW5lLlJPTExfU0xJREVfQ09VTlQ7IGkrKykge1xuICAgICAgdmFyIHNwcml0ZSA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAncG9rZW1vblJvbGwnICsgaSk7XG5cbiAgICAgIHNwcml0ZS52aXNpYmxlID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuX3JvbGxHcm91cC5hZGQoc3ByaXRlKTtcbiAgICAgIHRoaXMuX3JvbGxzLnB1c2goc3ByaXRlKTtcbiAgICB9XG5cbiAgICB0aGlzLl9yb2xsR3JvdXAueCA9IG1hcmdpblJpZ2h0O1xuICAgIHRoaXMuX3JvbGxHcm91cC55ID0gdGhpcy5nYW1lLndvcmxkLmNlbnRlclkgLSByb2xsU2l6ZSAvIDI7XG5cbiAgICB0aGlzLl9yb2xsR3JvdXAuYWRkKHRoaXMuX3Jlc3VsdFBva2Vtb24pO1xuICAgIHRoaXMuX3JvbGxzLnB1c2godGhpcy5fcmVzdWx0UG9rZW1vbik7XG4gIH0sXG5cbiAgX2FkZEJhY2tncm91bmQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuYmcgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ2NhbGMtYmcnKTtcbiAgfSxcblxuICBfYWRkUHJvZ3Jlc3NMYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJvbGxTaXplID0gMzAwO1xuICAgIHZhciBtYXJnaW5Ub3AgPSA1MDtcblxuICAgIHRoaXMuX3Byb2dyZXNzTGFibGUgPSB0aGlzLmFkZC50ZXh0KFxuICAgICAgdGhpcy5fcm9sbEdyb3VwLnggKyByb2xsU2l6ZSAvIDIsXG4gICAgICB0aGlzLl9yb2xsR3JvdXAueSArIHJvbGxTaXplICsgbWFyZ2luVG9wLFxuICAgICAgJ9Cf0YDQvtCz0YDQtdGB0YEgMCAlJyxcbiAgICAgIEVuZ2luZS50ZXh0U3R5bGVcbiAgICApO1xuXG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZS5hbmNob3Iuc2V0VG8oMC41KTtcbiAgfSxcblxuICBfYWRkSW5mb0xhYmxlOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbWFyaWduVG9wID0gMjU7XG5cbiAgICB0aGlzLl9pbmZvVGV4dCA9IHRoaXMuYWRkLnRleHQoXG4gICAgICB0aGlzLmdhbWUud29ybGQuY2VudGVyWCxcbiAgICAgIG1hcmlnblRvcCxcbiAgICAgICfQktGL0YfQuNGB0LvQtdC90LjQtSDRgNC10LfRg9C70YzRgtCw0YLQsC4uLicsXG4gICAgICBFbmdpbmUudGV4dFN0eWxlXG4gICAgKTtcblxuICAgIHRoaXMuX2luZm9UZXh0LmFuY2hvci5zZXRUbygwLjUpO1xuICB9LFxuXG4gIF9zdGFydFJvbGw6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2FjdGl2ZVJvbGxTcHJpdGUgPSAwO1xuICAgIHRoaXMuX3JvbGxzWzBdLnZpc2libGUgPSB0cnVlO1xuXG4gICAgdGhpcy5fdGltZXIgPSB0aGlzLnRpbWUuY3JlYXRlKCk7XG4gICAgdGhpcy5fdGltZXIubG9vcCg3NSwgdGhpcy5fcm9sbCwgdGhpcyk7XG4gICAgdGhpcy5fdGltZXIuc3RhcnQoKTtcbiAgfSxcblxuICBfcm9sbDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fcm9sbHNbdGhpcy5fYWN0aXZlUm9sbFNwcml0ZV0udmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5fYWN0aXZlUm9sbFNwcml0ZSsrO1xuXG4gICAgaWYgKHRoaXMuX2FjdGl2ZVJvbGxTcHJpdGUgPiBFbmdpbmUuUk9MTF9TTElERV9DT1VOVCAtIDEpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZVJvbGxTcHJpdGUgPSAwO1xuICAgIH1cblxuICAgIHRoaXMuX3JvbGxzW3RoaXMuX2FjdGl2ZVJvbGxTcHJpdGVdLnZpc2libGUgPSB0cnVlO1xuICB9LFxuXG4gIF9zdGFydFByb2dyZXNzOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9wcm9ncmVzc1RpbWVyID0gdGhpcy50aW1lLmNyZWF0ZSgpO1xuICAgIHRoaXMuX3Byb2dyZXNzVGltZXIucmVwZWF0KFxuICAgICAgdGhpcy5fdGltZVByb2dyZXNzIC8gdGhpcy5fY291bnRUaWNrLFxuICAgICAgdGhpcy5fY291bnRUaWNrLFxuICAgICAgdGhpcy5fdXBkYXRlUHJvZ3Jlc3MsXG4gICAgICB0aGlzXG4gICAgKTtcbiAgICB0aGlzLl9wcm9ncmVzc1RpbWVyLnN0YXJ0KCk7XG4gICAgdGhpcy5fcHJvZ3Jlc3NUaW1lci5vbkNvbXBsZXRlLmFkZCh0aGlzLl9maW5pc2hDYWxjLCB0aGlzKTtcbiAgfSxcblxuICBfdXBkYXRlUHJvZ3Jlc3M6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3Byb2dyZXNzKys7XG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZS50ZXh0ID0gJ9Cf0YDQvtCz0YDQtdGB0YEgJyArIE1hdGguZmxvb3IoKHRoaXMuX3Byb2dyZXNzIC8gdGhpcy5fY291bnRUaWNrKSAqIDEwMCkgKyAnICUnO1xuICB9LFxuXG4gIF9maW5pc2hDYWxjOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl90aW1lci5zdG9wKCk7XG5cbiAgICB0aGlzLl9yb2xsc1t0aGlzLl9hY3RpdmVSb2xsU3ByaXRlXS52aXNpYmxlID0gZmFsc2U7XG4gICAgdGhpcy5fcmVzdWx0UG9rZW1vbi52aXNpYmxlID0gdHJ1ZTtcblxuICAgIHRoaXMuX2luZm9UZXh0LnZpc2libGUgPSBmYWxzZTtcblxuICAgIHZhciBwb2tlbW9uTmFtZSA9IGNhcGl0YWxpemVGaXJzdExldHRlcihFbmdpbmUuUG9rZW1vbkRCLnBva2Vtb25zW0VuZ2luZS5ybmRQb2tlbW9uIC0gMV0uaWRlbnRpZmllcik7XG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZS50ZXh0ID0gJ9CvINC/0L7RhdC+0LYg0L3QsCAnICsgcG9rZW1vbk5hbWU7XG5cbiAgICB0aGlzLl9hZGRCdG5zKCk7XG4gIH0sXG5cbiAgX2FkZEFkczogZnVuY3Rpb24oKSB7XG4gICAgLy8gVE9ETzogbWFrZSBBRFMgZnVuY3Rpb25cbiAgfSxcblxuICBfYWRkQnRuczogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1hcmdpbiA9IDUwO1xuICAgIHZhciBidG5TaGFyZSA9IHRoaXMuX2FkZFNoYXJlQnRuKCk7XG4gICAgdmFyIGJ0blJlcGVhdCA9IHRoaXMuX2FkZFJlcGVhdEJ0bigpO1xuXG4gICAgYnRuU2hhcmUueSAtPSBtYXJnaW47XG4gICAgYnRuUmVwZWF0LnkgKz0gbWFyZ2luO1xuICB9LFxuXG4gIF9hZGRTaGFyZUJ0bjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGJ0blNoYXJlID0gdGhpcy5hZGQuYnV0dG9uKFxuICAgICAgRW5naW5lLkdBTUVfV0lEVEggKiAwLjc1LFxuICAgICAgRW5naW5lLkdBTUVfSEVJR0hUIC8gMixcbiAgICAgICdzaGFyZS1idG4nLFxuICAgICAgdGhpcy5fc2hhcmVEYXRhLFxuICAgICAgdGhpc1xuICAgICk7XG5cbiAgICBidG5TaGFyZS5hbmNob3Iuc2V0VG8oMC41KTtcblxuICAgIHJldHVybiBidG5TaGFyZTtcbiAgfSxcblxuICBfYWRkUmVwZWF0QnRuOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYnRuUmVhcGVhdCA9IHRoaXMuYWRkLmJ1dHRvbihcbiAgICAgIEVuZ2luZS5HQU1FX1dJRFRIICogMC43NSxcbiAgICAgIEVuZ2luZS5HQU1FX0hFSUdIVCAvIDIsXG4gICAgICAncmVwZWF0LWJ0bicsXG4gICAgICB0aGlzLl9yZXBlYXRHYW1lLFxuICAgICAgdGhpc1xuICAgICk7XG5cbiAgICBidG5SZWFwZWF0LmFuY2hvci5zZXRUbygwLjUpO1xuXG4gICAgcmV0dXJuIGJ0blJlYXBlYXQ7XG4gIH0sXG5cbiAgX3NoYXJlRGF0YTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRhdGEgPSB0aGlzLmdhbWUuY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgIC8vIFRPRE86IG1ha2UgU2hhcmUgZGF0YVxuICB9LFxuXG4gIF9yZXBlYXRHYW1lOiBmdW5jdGlvbigpIHtcbiAgICBFbmdpbmUucm5kUG9rZW1vbiA9IHRoaXMuZ2FtZS5ybmQuYmV0d2VlbigxLCA3MjEpO1xuICAgIHRoaXMuc3RhdGUuc3RhcnQoJ1ByZWxvYWRlcicpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlcihzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xufVxuIiwiRW5naW5lLkdBTUVfV0lEVEggPSAxMDAwO1xuRW5naW5lLkdBTUVfSEVJR0hUID0gNjQwO1xuXG5FbmdpbmUuREVCVUcgPSB0cnVlO1xuXG52YXIgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZShFbmdpbmUuR0FNRV9XSURUSCwgRW5naW5lLkdBTUVfSEVJR0hULCBQaGFzZXIuQVVUTywgJ2dhbWUnKTtcblxuRW5naW5lLlJPTExfU0xJREVfQ09VTlQgPSA1MDtcbkVuZ2luZS5ybmRQb2tlbW9uID0gZ2FtZS5ybmQuYmV0d2VlbigxLCA3MjEpO1xuXG5nYW1lLnN0YXRlLmFkZCgnQm9vdCcsIEVuZ2luZS5Cb290KTtcbmdhbWUuc3RhdGUuYWRkKCdQcmVsb2FkZXInLCBFbmdpbmUuUHJlbG9hZGVyKTtcbmdhbWUuc3RhdGUuYWRkKCdHYW1lJywgRW5naW5lLkdhbWUpO1xuZ2FtZS5zdGF0ZS5hZGQoJ0NhbGN1bGF0ZScsIEVuZ2luZS5DYWxjdWxhdGUpO1xuXG5nYW1lLnN0YXRlLnN0YXJ0KCdCb290Jyk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
