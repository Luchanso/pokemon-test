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

/**
 * Create images of pokemon
 * @param {[type]} game [description]
 */
Engine.Generator = function(game) {
  this.counter = 0;
  this._lastPokemon = null;
  game.preserveDrawingBuffer = true;
}

Engine.Generator.prototype = {
  preload: function() {
    this.load.text('pokemon.csv', 'assets/data/pokemon.csv');
    this.load.image('pk-bg', 'assets/images/background/bg-pk.jpg');

    for (var i = 1; i <= 721; i++) {
      this.load.image('pk-' + i, 'assets/images/pokemons/' + i + '.png');
    }

    this._initSocket();
  },

  create: function() {
    Engine.PokemonDB.load(this.cache.getText('pokemon.csv'));

    this._addBG();
    this._addWatermark();
    this._addLable();

    setTimeout(this._nextPokemon.bind(this), 3000);
  },

  _initSocket: function() {
    this.socket = io('http://localhost:8081');
  },

  _addBG: function() {
    this.bg = this.add.image(0, 0, 'pk-bg');
  },

  _addWatermark: function() {
    var style = {
      fill: '#bababa',
      font: '30px Open Sans',
      align: 'center'
    };

    var watermark = this.add.text(Engine.GAME_WIDTH / 2, 50, Engine.APP_NAME, style);
    watermark.anchor.setTo(0.5);
  },

  _addLable: function() {
    var style = {
      fill: '#333333',
      font: '50px Open Sans',
      align: 'center'
    };

    this.lable = this.add.text(Engine.GAME_WIDTH / 4, Engine.GAME_HEIGHT / 2, '', style);
    this.lable.anchor.setTo(0.5);
  },

  _createBG: function() {
    var bmd = this.add.bitmapData(Engine.GAME_WIDTH, Engine.GAME_HEIGHT);

    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, Engine.GAME_WIDTH, Engine.GAME_HEIGHT);
    bmd.ctx.fillStyle = 'rgb(255, 255, 255)';
    bmd.ctx.fill();

    this.cache.addBitmapData('pk-bg', bmd);
  },

  _nextPokemon: function() {
    this.counter++;

    this._changePokemon();
    this._save();

    if (this.counter < 721) {
      setTimeout(this._nextPokemon.bind(this), 3000);
    } else {
      console.log('I am finish!))');
    }
  },

  _changePokemon: function() {
    var pokemon = this.add.sprite(this.game.width * 3 / 4, this.game.height / 2, 'pk-' + this.counter);
    pokemon.anchor.setTo(0.5);

    var preString = 'Я по характеру\r\n';
    var pokemonName = Engine.PokemonDB.pokemons[this.counter - 1].identifier;

    this.lable.text = preString + capitalizeFirstLetter(pokemonName);
    this.lable.addFontWeight('bolder', preString.length - 2);

    if (this._lastPokemon !== null) {
      this._lastPokemon.kill();
    }

    this._lastPokemon = pokemon;
  },

  _save: function() {
    var image = this.game.canvas.toDataURL("image/png");
    var id = this.counter;
    var data = {
      bin: image,
      id: id
    }

    this.socket.emit('img', data);
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

Engine.GAME_WIDTH = 1000;
Engine.GAME_HEIGHT = 640;
Engine.APP_NAME = 'vk.com/app5587989';
Engine.DEBUG = true;

var game = new Phaser.Game(Engine.GAME_WIDTH, Engine.GAME_HEIGHT, Phaser.AUTO, 'game');

Engine.ROLL_SLIDE_COUNT = 50;
Engine.rndPokemon = game.rnd.between(1, 721);

game.state.add('Boot', Engine.Boot);
game.state.add('Preloader', Engine.Preloader);
game.state.add('Game', Engine.Game);
game.state.add('Calculate', Engine.Calculate);

game.state.start('Boot');
// game.state.start('Gen');

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcGFwYXJzZS5taW4uanMiLCJib290LmpzIiwicHJlbG9hZGVyLmpzIiwiYW5zd2VyLmpzIiwiZ2FtZS5qcyIsInBva2ViYWxsLXN5cy5qcyIsInNsaWRlLmpzIiwiY2FsY3VsYXRlLmpzIiwiZ2VuZXJhdG9yLmpzIiwiYXBwLmpzIiwicG9rZW1vbkRCLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXBCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG5cdFBhcGEgUGFyc2Vcblx0djQuMS4yXG5cdGh0dHBzOi8vZ2l0aHViLmNvbS9taG9sdC9QYXBhUGFyc2VcbiovXG4hZnVuY3Rpb24oZSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdCh0LHIpe2lmKHI9cnx8e30sci53b3JrZXImJlMuV09SS0VSU19TVVBQT1JURUQpe3ZhciBuPWYoKTtyZXR1cm4gbi51c2VyU3RlcD1yLnN0ZXAsbi51c2VyQ2h1bms9ci5jaHVuayxuLnVzZXJDb21wbGV0ZT1yLmNvbXBsZXRlLG4udXNlckVycm9yPXIuZXJyb3Isci5zdGVwPW0oci5zdGVwKSxyLmNodW5rPW0oci5jaHVuayksci5jb21wbGV0ZT1tKHIuY29tcGxldGUpLHIuZXJyb3I9bShyLmVycm9yKSxkZWxldGUgci53b3JrZXIsdm9pZCBuLnBvc3RNZXNzYWdlKHtpbnB1dDp0LGNvbmZpZzpyLHdvcmtlcklkOm4uaWR9KX12YXIgbz1udWxsO3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiB0P289ci5kb3dubG9hZD9uZXcgaShyKTpuZXcgYShyKTooZS5GaWxlJiZ0IGluc3RhbmNlb2YgRmlsZXx8dCBpbnN0YW5jZW9mIE9iamVjdCkmJihvPW5ldyBzKHIpKSxvLnN0cmVhbSh0KX1mdW5jdGlvbiByKGUsdCl7ZnVuY3Rpb24gcigpe1wib2JqZWN0XCI9PXR5cGVvZiB0JiYoXCJzdHJpbmdcIj09dHlwZW9mIHQuZGVsaW1pdGVyJiYxPT10LmRlbGltaXRlci5sZW5ndGgmJi0xPT1TLkJBRF9ERUxJTUlURVJTLmluZGV4T2YodC5kZWxpbWl0ZXIpJiYodT10LmRlbGltaXRlciksKFwiYm9vbGVhblwiPT10eXBlb2YgdC5xdW90ZXN8fHQucXVvdGVzIGluc3RhbmNlb2YgQXJyYXkpJiYobz10LnF1b3RlcyksXCJzdHJpbmdcIj09dHlwZW9mIHQubmV3bGluZSYmKGg9dC5uZXdsaW5lKSl9ZnVuY3Rpb24gbihlKXtpZihcIm9iamVjdFwiIT10eXBlb2YgZSlyZXR1cm5bXTt2YXIgdD1bXTtmb3IodmFyIHIgaW4gZSl0LnB1c2gocik7cmV0dXJuIHR9ZnVuY3Rpb24gaShlLHQpe3ZhciByPVwiXCI7XCJzdHJpbmdcIj09dHlwZW9mIGUmJihlPUpTT04ucGFyc2UoZSkpLFwic3RyaW5nXCI9PXR5cGVvZiB0JiYodD1KU09OLnBhcnNlKHQpKTt2YXIgbj1lIGluc3RhbmNlb2YgQXJyYXkmJmUubGVuZ3RoPjAsaT0hKHRbMF1pbnN0YW5jZW9mIEFycmF5KTtpZihuKXtmb3IodmFyIGE9MDthPGUubGVuZ3RoO2ErKylhPjAmJihyKz11KSxyKz1zKGVbYV0sYSk7dC5sZW5ndGg+MCYmKHIrPWgpfWZvcih2YXIgbz0wO288dC5sZW5ndGg7bysrKXtmb3IodmFyIGY9bj9lLmxlbmd0aDp0W29dLmxlbmd0aCxjPTA7Zj5jO2MrKyl7Yz4wJiYocis9dSk7dmFyIGQ9biYmaT9lW2NdOmM7cis9cyh0W29dW2RdLGMpfW88dC5sZW5ndGgtMSYmKHIrPWgpfXJldHVybiByfWZ1bmN0aW9uIHMoZSx0KXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgZXx8bnVsbD09PWUpcmV0dXJuXCJcIjtlPWUudG9TdHJpbmcoKS5yZXBsYWNlKC9cIi9nLCdcIlwiJyk7dmFyIHI9XCJib29sZWFuXCI9PXR5cGVvZiBvJiZvfHxvIGluc3RhbmNlb2YgQXJyYXkmJm9bdF18fGEoZSxTLkJBRF9ERUxJTUlURVJTKXx8ZS5pbmRleE9mKHUpPi0xfHxcIiBcIj09ZS5jaGFyQXQoMCl8fFwiIFwiPT1lLmNoYXJBdChlLmxlbmd0aC0xKTtyZXR1cm4gcj8nXCInK2UrJ1wiJzplfWZ1bmN0aW9uIGEoZSx0KXtmb3IodmFyIHI9MDtyPHQubGVuZ3RoO3IrKylpZihlLmluZGV4T2YodFtyXSk+LTEpcmV0dXJuITA7cmV0dXJuITF9dmFyIG89ITEsdT1cIixcIixoPVwiXFxyXFxuXCI7aWYocigpLFwic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1KU09OLnBhcnNlKGUpKSxlIGluc3RhbmNlb2YgQXJyYXkpe2lmKCFlLmxlbmd0aHx8ZVswXWluc3RhbmNlb2YgQXJyYXkpcmV0dXJuIGkobnVsbCxlKTtpZihcIm9iamVjdFwiPT10eXBlb2YgZVswXSlyZXR1cm4gaShuKGVbMF0pLGUpfWVsc2UgaWYoXCJvYmplY3RcIj09dHlwZW9mIGUpcmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGUuZGF0YSYmKGUuZGF0YT1KU09OLnBhcnNlKGUuZGF0YSkpLGUuZGF0YSBpbnN0YW5jZW9mIEFycmF5JiYoZS5maWVsZHN8fChlLmZpZWxkcz1lLmRhdGFbMF1pbnN0YW5jZW9mIEFycmF5P2UuZmllbGRzOm4oZS5kYXRhWzBdKSksZS5kYXRhWzBdaW5zdGFuY2VvZiBBcnJheXx8XCJvYmplY3RcIj09dHlwZW9mIGUuZGF0YVswXXx8KGUuZGF0YT1bZS5kYXRhXSkpLGkoZS5maWVsZHN8fFtdLGUuZGF0YXx8W10pO3Rocm93XCJleGNlcHRpb246IFVuYWJsZSB0byBzZXJpYWxpemUgdW5yZWNvZ25pemVkIGlucHV0XCJ9ZnVuY3Rpb24gbih0KXtmdW5jdGlvbiByKGUpe3ZhciB0PV8oZSk7dC5jaHVua1NpemU9cGFyc2VJbnQodC5jaHVua1NpemUpLGUuc3RlcHx8ZS5jaHVua3x8KHQuY2h1bmtTaXplPW51bGwpLHRoaXMuX2hhbmRsZT1uZXcgbyh0KSx0aGlzLl9oYW5kbGUuc3RyZWFtZXI9dGhpcyx0aGlzLl9jb25maWc9dH10aGlzLl9oYW5kbGU9bnVsbCx0aGlzLl9wYXVzZWQ9ITEsdGhpcy5fZmluaXNoZWQ9ITEsdGhpcy5faW5wdXQ9bnVsbCx0aGlzLl9iYXNlSW5kZXg9MCx0aGlzLl9wYXJ0aWFsTGluZT1cIlwiLHRoaXMuX3Jvd0NvdW50PTAsdGhpcy5fc3RhcnQ9MCx0aGlzLl9uZXh0Q2h1bms9bnVsbCx0aGlzLmlzRmlyc3RDaHVuaz0hMCx0aGlzLl9jb21wbGV0ZVJlc3VsdHM9e2RhdGE6W10sZXJyb3JzOltdLG1ldGE6e319LHIuY2FsbCh0aGlzLHQpLHRoaXMucGFyc2VDaHVuaz1mdW5jdGlvbih0KXtpZih0aGlzLmlzRmlyc3RDaHVuayYmbSh0aGlzLl9jb25maWcuYmVmb3JlRmlyc3RDaHVuaykpe3ZhciByPXRoaXMuX2NvbmZpZy5iZWZvcmVGaXJzdENodW5rKHQpO3ZvaWQgMCE9PXImJih0PXIpfXRoaXMuaXNGaXJzdENodW5rPSExO3ZhciBuPXRoaXMuX3BhcnRpYWxMaW5lK3Q7dGhpcy5fcGFydGlhbExpbmU9XCJcIjt2YXIgaT10aGlzLl9oYW5kbGUucGFyc2Uobix0aGlzLl9iYXNlSW5kZXgsIXRoaXMuX2ZpbmlzaGVkKTtpZighdGhpcy5faGFuZGxlLnBhdXNlZCgpJiYhdGhpcy5faGFuZGxlLmFib3J0ZWQoKSl7dmFyIHM9aS5tZXRhLmN1cnNvcjt0aGlzLl9maW5pc2hlZHx8KHRoaXMuX3BhcnRpYWxMaW5lPW4uc3Vic3RyaW5nKHMtdGhpcy5fYmFzZUluZGV4KSx0aGlzLl9iYXNlSW5kZXg9cyksaSYmaS5kYXRhJiYodGhpcy5fcm93Q291bnQrPWkuZGF0YS5sZW5ndGgpO3ZhciBhPXRoaXMuX2ZpbmlzaGVkfHx0aGlzLl9jb25maWcucHJldmlldyYmdGhpcy5fcm93Q291bnQ+PXRoaXMuX2NvbmZpZy5wcmV2aWV3O2lmKHkpZS5wb3N0TWVzc2FnZSh7cmVzdWx0czppLHdvcmtlcklkOlMuV09SS0VSX0lELGZpbmlzaGVkOmF9KTtlbHNlIGlmKG0odGhpcy5fY29uZmlnLmNodW5rKSl7aWYodGhpcy5fY29uZmlnLmNodW5rKGksdGhpcy5faGFuZGxlKSx0aGlzLl9wYXVzZWQpcmV0dXJuO2k9dm9pZCAwLHRoaXMuX2NvbXBsZXRlUmVzdWx0cz12b2lkIDB9cmV0dXJuIHRoaXMuX2NvbmZpZy5zdGVwfHx0aGlzLl9jb25maWcuY2h1bmt8fCh0aGlzLl9jb21wbGV0ZVJlc3VsdHMuZGF0YT10aGlzLl9jb21wbGV0ZVJlc3VsdHMuZGF0YS5jb25jYXQoaS5kYXRhKSx0aGlzLl9jb21wbGV0ZVJlc3VsdHMuZXJyb3JzPXRoaXMuX2NvbXBsZXRlUmVzdWx0cy5lcnJvcnMuY29uY2F0KGkuZXJyb3JzKSx0aGlzLl9jb21wbGV0ZVJlc3VsdHMubWV0YT1pLm1ldGEpLCFhfHwhbSh0aGlzLl9jb25maWcuY29tcGxldGUpfHxpJiZpLm1ldGEuYWJvcnRlZHx8dGhpcy5fY29uZmlnLmNvbXBsZXRlKHRoaXMuX2NvbXBsZXRlUmVzdWx0cyksYXx8aSYmaS5tZXRhLnBhdXNlZHx8dGhpcy5fbmV4dENodW5rKCksaX19LHRoaXMuX3NlbmRFcnJvcj1mdW5jdGlvbih0KXttKHRoaXMuX2NvbmZpZy5lcnJvcik/dGhpcy5fY29uZmlnLmVycm9yKHQpOnkmJnRoaXMuX2NvbmZpZy5lcnJvciYmZS5wb3N0TWVzc2FnZSh7d29ya2VySWQ6Uy5XT1JLRVJfSUQsZXJyb3I6dCxmaW5pc2hlZDohMX0pfX1mdW5jdGlvbiBpKGUpe2Z1bmN0aW9uIHQoZSl7dmFyIHQ9ZS5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtUmFuZ2VcIik7cmV0dXJuIHBhcnNlSW50KHQuc3Vic3RyKHQubGFzdEluZGV4T2YoXCIvXCIpKzEpKX1lPWV8fHt9LGUuY2h1bmtTaXplfHwoZS5jaHVua1NpemU9Uy5SZW1vdGVDaHVua1NpemUpLG4uY2FsbCh0aGlzLGUpO3ZhciByO3RoaXMuX25leHRDaHVuaz1rP2Z1bmN0aW9uKCl7dGhpcy5fcmVhZENodW5rKCksdGhpcy5fY2h1bmtMb2FkZWQoKX06ZnVuY3Rpb24oKXt0aGlzLl9yZWFkQ2h1bmsoKX0sdGhpcy5zdHJlYW09ZnVuY3Rpb24oZSl7dGhpcy5faW5wdXQ9ZSx0aGlzLl9uZXh0Q2h1bmsoKX0sdGhpcy5fcmVhZENodW5rPWZ1bmN0aW9uKCl7aWYodGhpcy5fZmluaXNoZWQpcmV0dXJuIHZvaWQgdGhpcy5fY2h1bmtMb2FkZWQoKTtpZihyPW5ldyBYTUxIdHRwUmVxdWVzdCxrfHwoci5vbmxvYWQ9Zyh0aGlzLl9jaHVua0xvYWRlZCx0aGlzKSxyLm9uZXJyb3I9Zyh0aGlzLl9jaHVua0Vycm9yLHRoaXMpKSxyLm9wZW4oXCJHRVRcIix0aGlzLl9pbnB1dCwhayksdGhpcy5fY29uZmlnLmNodW5rU2l6ZSl7dmFyIGU9dGhpcy5fc3RhcnQrdGhpcy5fY29uZmlnLmNodW5rU2l6ZS0xO3Iuc2V0UmVxdWVzdEhlYWRlcihcIlJhbmdlXCIsXCJieXRlcz1cIit0aGlzLl9zdGFydCtcIi1cIitlKSxyLnNldFJlcXVlc3RIZWFkZXIoXCJJZi1Ob25lLU1hdGNoXCIsXCJ3ZWJraXQtbm8tY2FjaGVcIil9dHJ5e3Iuc2VuZCgpfWNhdGNoKHQpe3RoaXMuX2NodW5rRXJyb3IodC5tZXNzYWdlKX1rJiYwPT1yLnN0YXR1cz90aGlzLl9jaHVua0Vycm9yKCk6dGhpcy5fc3RhcnQrPXRoaXMuX2NvbmZpZy5jaHVua1NpemV9LHRoaXMuX2NodW5rTG9hZGVkPWZ1bmN0aW9uKCl7aWYoND09ci5yZWFkeVN0YXRlKXtpZihyLnN0YXR1czwyMDB8fHIuc3RhdHVzPj00MDApcmV0dXJuIHZvaWQgdGhpcy5fY2h1bmtFcnJvcigpO3RoaXMuX2ZpbmlzaGVkPSF0aGlzLl9jb25maWcuY2h1bmtTaXplfHx0aGlzLl9zdGFydD50KHIpLHRoaXMucGFyc2VDaHVuayhyLnJlc3BvbnNlVGV4dCl9fSx0aGlzLl9jaHVua0Vycm9yPWZ1bmN0aW9uKGUpe3ZhciB0PXIuc3RhdHVzVGV4dHx8ZTt0aGlzLl9zZW5kRXJyb3IodCl9fWZ1bmN0aW9uIHMoZSl7ZT1lfHx7fSxlLmNodW5rU2l6ZXx8KGUuY2h1bmtTaXplPVMuTG9jYWxDaHVua1NpemUpLG4uY2FsbCh0aGlzLGUpO3ZhciB0LHIsaT1cInVuZGVmaW5lZFwiIT10eXBlb2YgRmlsZVJlYWRlcjt0aGlzLnN0cmVhbT1mdW5jdGlvbihlKXt0aGlzLl9pbnB1dD1lLHI9ZS5zbGljZXx8ZS53ZWJraXRTbGljZXx8ZS5tb3pTbGljZSxpPyh0PW5ldyBGaWxlUmVhZGVyLHQub25sb2FkPWcodGhpcy5fY2h1bmtMb2FkZWQsdGhpcyksdC5vbmVycm9yPWcodGhpcy5fY2h1bmtFcnJvcix0aGlzKSk6dD1uZXcgRmlsZVJlYWRlclN5bmMsdGhpcy5fbmV4dENodW5rKCl9LHRoaXMuX25leHRDaHVuaz1mdW5jdGlvbigpe3RoaXMuX2ZpbmlzaGVkfHx0aGlzLl9jb25maWcucHJldmlldyYmISh0aGlzLl9yb3dDb3VudDx0aGlzLl9jb25maWcucHJldmlldyl8fHRoaXMuX3JlYWRDaHVuaygpfSx0aGlzLl9yZWFkQ2h1bms9ZnVuY3Rpb24oKXt2YXIgZT10aGlzLl9pbnB1dDtpZih0aGlzLl9jb25maWcuY2h1bmtTaXplKXt2YXIgbj1NYXRoLm1pbih0aGlzLl9zdGFydCt0aGlzLl9jb25maWcuY2h1bmtTaXplLHRoaXMuX2lucHV0LnNpemUpO2U9ci5jYWxsKGUsdGhpcy5fc3RhcnQsbil9dmFyIHM9dC5yZWFkQXNUZXh0KGUsdGhpcy5fY29uZmlnLmVuY29kaW5nKTtpfHx0aGlzLl9jaHVua0xvYWRlZCh7dGFyZ2V0OntyZXN1bHQ6c319KX0sdGhpcy5fY2h1bmtMb2FkZWQ9ZnVuY3Rpb24oZSl7dGhpcy5fc3RhcnQrPXRoaXMuX2NvbmZpZy5jaHVua1NpemUsdGhpcy5fZmluaXNoZWQ9IXRoaXMuX2NvbmZpZy5jaHVua1NpemV8fHRoaXMuX3N0YXJ0Pj10aGlzLl9pbnB1dC5zaXplLHRoaXMucGFyc2VDaHVuayhlLnRhcmdldC5yZXN1bHQpfSx0aGlzLl9jaHVua0Vycm9yPWZ1bmN0aW9uKCl7dGhpcy5fc2VuZEVycm9yKHQuZXJyb3IpfX1mdW5jdGlvbiBhKGUpe2U9ZXx8e30sbi5jYWxsKHRoaXMsZSk7dmFyIHQscjt0aGlzLnN0cmVhbT1mdW5jdGlvbihlKXtyZXR1cm4gdD1lLHI9ZSx0aGlzLl9uZXh0Q2h1bmsoKX0sdGhpcy5fbmV4dENodW5rPWZ1bmN0aW9uKCl7aWYoIXRoaXMuX2ZpbmlzaGVkKXt2YXIgZT10aGlzLl9jb25maWcuY2h1bmtTaXplLHQ9ZT9yLnN1YnN0cigwLGUpOnI7cmV0dXJuIHI9ZT9yLnN1YnN0cihlKTpcIlwiLHRoaXMuX2ZpbmlzaGVkPSFyLHRoaXMucGFyc2VDaHVuayh0KX19fWZ1bmN0aW9uIG8oZSl7ZnVuY3Rpb24gdCgpe2lmKGImJmQmJihoKFwiRGVsaW1pdGVyXCIsXCJVbmRldGVjdGFibGVEZWxpbWl0ZXJcIixcIlVuYWJsZSB0byBhdXRvLWRldGVjdCBkZWxpbWl0aW5nIGNoYXJhY3RlcjsgZGVmYXVsdGVkIHRvICdcIitTLkRlZmF1bHREZWxpbWl0ZXIrXCInXCIpLGQ9ITEpLGUuc2tpcEVtcHR5TGluZXMpZm9yKHZhciB0PTA7dDxiLmRhdGEubGVuZ3RoO3QrKykxPT1iLmRhdGFbdF0ubGVuZ3RoJiZcIlwiPT1iLmRhdGFbdF1bMF0mJmIuZGF0YS5zcGxpY2UodC0tLDEpO3JldHVybiByKCkmJm4oKSxpKCl9ZnVuY3Rpb24gcigpe3JldHVybiBlLmhlYWRlciYmMD09eS5sZW5ndGh9ZnVuY3Rpb24gbigpe2lmKGIpe2Zvcih2YXIgZT0wO3IoKSYmZTxiLmRhdGEubGVuZ3RoO2UrKylmb3IodmFyIHQ9MDt0PGIuZGF0YVtlXS5sZW5ndGg7dCsrKXkucHVzaChiLmRhdGFbZV1bdF0pO2IuZGF0YS5zcGxpY2UoMCwxKX19ZnVuY3Rpb24gaSgpe2lmKCFifHwhZS5oZWFkZXImJiFlLmR5bmFtaWNUeXBpbmcpcmV0dXJuIGI7Zm9yKHZhciB0PTA7dDxiLmRhdGEubGVuZ3RoO3QrKyl7Zm9yKHZhciByPXt9LG49MDtuPGIuZGF0YVt0XS5sZW5ndGg7bisrKXtpZihlLmR5bmFtaWNUeXBpbmcpe3ZhciBpPWIuZGF0YVt0XVtuXTtiLmRhdGFbdF1bbl09XCJ0cnVlXCI9PWl8fFwiVFJVRVwiPT1pPyEwOlwiZmFsc2VcIj09aXx8XCJGQUxTRVwiPT1pPyExOm8oaSl9ZS5oZWFkZXImJihuPj15Lmxlbmd0aD8oci5fX3BhcnNlZF9leHRyYXx8KHIuX19wYXJzZWRfZXh0cmE9W10pLHIuX19wYXJzZWRfZXh0cmEucHVzaChiLmRhdGFbdF1bbl0pKTpyW3lbbl1dPWIuZGF0YVt0XVtuXSl9ZS5oZWFkZXImJihiLmRhdGFbdF09cixuPnkubGVuZ3RoP2goXCJGaWVsZE1pc21hdGNoXCIsXCJUb29NYW55RmllbGRzXCIsXCJUb28gbWFueSBmaWVsZHM6IGV4cGVjdGVkIFwiK3kubGVuZ3RoK1wiIGZpZWxkcyBidXQgcGFyc2VkIFwiK24sdCk6bjx5Lmxlbmd0aCYmaChcIkZpZWxkTWlzbWF0Y2hcIixcIlRvb0Zld0ZpZWxkc1wiLFwiVG9vIGZldyBmaWVsZHM6IGV4cGVjdGVkIFwiK3kubGVuZ3RoK1wiIGZpZWxkcyBidXQgcGFyc2VkIFwiK24sdCkpfXJldHVybiBlLmhlYWRlciYmYi5tZXRhJiYoYi5tZXRhLmZpZWxkcz15KSxifWZ1bmN0aW9uIHModCl7Zm9yKHZhciByLG4saSxzPVtcIixcIixcIlx0XCIsXCJ8XCIsXCI7XCIsUy5SRUNPUkRfU0VQLFMuVU5JVF9TRVBdLGE9MDthPHMubGVuZ3RoO2ErKyl7dmFyIG89c1thXSxoPTAsZj0wO2k9dm9pZCAwO2Zvcih2YXIgYz1uZXcgdSh7ZGVsaW1pdGVyOm8scHJldmlldzoxMH0pLnBhcnNlKHQpLGQ9MDtkPGMuZGF0YS5sZW5ndGg7ZCsrKXt2YXIgbD1jLmRhdGFbZF0ubGVuZ3RoO2YrPWwsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGk/bD4xJiYoaCs9TWF0aC5hYnMobC1pKSxpPWwpOmk9bH1jLmRhdGEubGVuZ3RoPjAmJihmLz1jLmRhdGEubGVuZ3RoKSwoXCJ1bmRlZmluZWRcIj09dHlwZW9mIG58fG4+aCkmJmY+MS45OSYmKG49aCxyPW8pfXJldHVybiBlLmRlbGltaXRlcj1yLHtzdWNjZXNzZnVsOiEhcixiZXN0RGVsaW1pdGVyOnJ9fWZ1bmN0aW9uIGEoZSl7ZT1lLnN1YnN0cigwLDEwNDg1NzYpO3ZhciB0PWUuc3BsaXQoXCJcXHJcIik7aWYoMT09dC5sZW5ndGgpcmV0dXJuXCJcXG5cIjtmb3IodmFyIHI9MCxuPTA7bjx0Lmxlbmd0aDtuKyspXCJcXG5cIj09dFtuXVswXSYmcisrO3JldHVybiByPj10Lmxlbmd0aC8yP1wiXFxyXFxuXCI6XCJcXHJcIn1mdW5jdGlvbiBvKGUpe3ZhciB0PWwudGVzdChlKTtyZXR1cm4gdD9wYXJzZUZsb2F0KGUpOmV9ZnVuY3Rpb24gaChlLHQscixuKXtiLmVycm9ycy5wdXNoKHt0eXBlOmUsY29kZTp0LG1lc3NhZ2U6cixyb3c6bn0pfXZhciBmLGMsZCxsPS9eXFxzKi0/KFxcZCpcXC4/XFxkK3xcXGQrXFwuP1xcZCopKGVbLStdP1xcZCspP1xccyokL2kscD10aGlzLGc9MCx2PSExLGs9ITEseT1bXSxiPXtkYXRhOltdLGVycm9yczpbXSxtZXRhOnt9fTtpZihtKGUuc3RlcCkpe3ZhciBSPWUuc3RlcDtlLnN0ZXA9ZnVuY3Rpb24obil7aWYoYj1uLHIoKSl0KCk7ZWxzZXtpZih0KCksMD09Yi5kYXRhLmxlbmd0aClyZXR1cm47Zys9bi5kYXRhLmxlbmd0aCxlLnByZXZpZXcmJmc+ZS5wcmV2aWV3P2MuYWJvcnQoKTpSKGIscCl9fX10aGlzLnBhcnNlPWZ1bmN0aW9uKHIsbixpKXtpZihlLm5ld2xpbmV8fChlLm5ld2xpbmU9YShyKSksZD0hMSwhZS5kZWxpbWl0ZXIpe3ZhciBvPXMocik7by5zdWNjZXNzZnVsP2UuZGVsaW1pdGVyPW8uYmVzdERlbGltaXRlcjooZD0hMCxlLmRlbGltaXRlcj1TLkRlZmF1bHREZWxpbWl0ZXIpLGIubWV0YS5kZWxpbWl0ZXI9ZS5kZWxpbWl0ZXJ9dmFyIGg9XyhlKTtyZXR1cm4gZS5wcmV2aWV3JiZlLmhlYWRlciYmaC5wcmV2aWV3KyssZj1yLGM9bmV3IHUoaCksYj1jLnBhcnNlKGYsbixpKSx0KCksdj97bWV0YTp7cGF1c2VkOiEwfX06Ynx8e21ldGE6e3BhdXNlZDohMX19fSx0aGlzLnBhdXNlZD1mdW5jdGlvbigpe3JldHVybiB2fSx0aGlzLnBhdXNlPWZ1bmN0aW9uKCl7dj0hMCxjLmFib3J0KCksZj1mLnN1YnN0cihjLmdldENoYXJJbmRleCgpKX0sdGhpcy5yZXN1bWU9ZnVuY3Rpb24oKXt2PSExLHAuc3RyZWFtZXIucGFyc2VDaHVuayhmKX0sdGhpcy5hYm9ydGVkPWZ1bmN0aW9uKCl7cmV0dXJuIGt9LHRoaXMuYWJvcnQ9ZnVuY3Rpb24oKXtrPSEwLGMuYWJvcnQoKSxiLm1ldGEuYWJvcnRlZD0hMCxtKGUuY29tcGxldGUpJiZlLmNvbXBsZXRlKGIpLGY9XCJcIn19ZnVuY3Rpb24gdShlKXtlPWV8fHt9O3ZhciB0PWUuZGVsaW1pdGVyLHI9ZS5uZXdsaW5lLG49ZS5jb21tZW50cyxpPWUuc3RlcCxzPWUucHJldmlldyxhPWUuZmFzdE1vZGU7aWYoKFwic3RyaW5nXCIhPXR5cGVvZiB0fHxTLkJBRF9ERUxJTUlURVJTLmluZGV4T2YodCk+LTEpJiYodD1cIixcIiksbj09PXQpdGhyb3dcIkNvbW1lbnQgY2hhcmFjdGVyIHNhbWUgYXMgZGVsaW1pdGVyXCI7bj09PSEwP249XCIjXCI6KFwic3RyaW5nXCIhPXR5cGVvZiBufHxTLkJBRF9ERUxJTUlURVJTLmluZGV4T2Yobik+LTEpJiYobj0hMSksXCJcXG5cIiE9ciYmXCJcXHJcIiE9ciYmXCJcXHJcXG5cIiE9ciYmKHI9XCJcXG5cIik7dmFyIG89MCx1PSExO3RoaXMucGFyc2U9ZnVuY3Rpb24oZSxoLGYpe2Z1bmN0aW9uIGMoZSl7Yi5wdXNoKGUpLFM9b31mdW5jdGlvbiBkKHQpe3JldHVybiBmP3AoKTooXCJ1bmRlZmluZWRcIj09dHlwZW9mIHQmJih0PWUuc3Vic3RyKG8pKSx3LnB1c2godCksbz1nLGModykseSYmXygpLHAoKSl9ZnVuY3Rpb24gbCh0KXtvPXQsYyh3KSx3PVtdLE89ZS5pbmRleE9mKHIsbyl9ZnVuY3Rpb24gcChlKXtyZXR1cm57ZGF0YTpiLGVycm9yczpSLG1ldGE6e2RlbGltaXRlcjp0LGxpbmVicmVhazpyLGFib3J0ZWQ6dSx0cnVuY2F0ZWQ6ISFlLGN1cnNvcjpTKyhofHwwKX19fWZ1bmN0aW9uIF8oKXtpKHAoKSksYj1bXSxSPVtdfWlmKFwic3RyaW5nXCIhPXR5cGVvZiBlKXRocm93XCJJbnB1dCBtdXN0IGJlIGEgc3RyaW5nXCI7dmFyIGc9ZS5sZW5ndGgsbT10Lmxlbmd0aCx2PXIubGVuZ3RoLGs9bi5sZW5ndGgseT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBpO289MDt2YXIgYj1bXSxSPVtdLHc9W10sUz0wO2lmKCFlKXJldHVybiBwKCk7aWYoYXx8YSE9PSExJiYtMT09PWUuaW5kZXhPZignXCInKSl7Zm9yKHZhciBDPWUuc3BsaXQociksRT0wO0U8Qy5sZW5ndGg7RSsrKXt2YXIgdz1DW0VdO2lmKG8rPXcubGVuZ3RoLEUhPT1DLmxlbmd0aC0xKW8rPXIubGVuZ3RoO2Vsc2UgaWYoZilyZXR1cm4gcCgpO2lmKCFufHx3LnN1YnN0cigwLGspIT1uKXtpZih5KXtpZihiPVtdLGMody5zcGxpdCh0KSksXygpLHUpcmV0dXJuIHAoKX1lbHNlIGMody5zcGxpdCh0KSk7aWYocyYmRT49cylyZXR1cm4gYj1iLnNsaWNlKDAscykscCghMCl9fXJldHVybiBwKCl9Zm9yKHZhciB4PWUuaW5kZXhPZih0LG8pLE89ZS5pbmRleE9mKHIsbyk7OylpZignXCInIT1lW29dKWlmKG4mJjA9PT13Lmxlbmd0aCYmZS5zdWJzdHIobyxrKT09PW4pe2lmKC0xPT1PKXJldHVybiBwKCk7bz1PK3YsTz1lLmluZGV4T2YocixvKSx4PWUuaW5kZXhPZih0LG8pfWVsc2UgaWYoLTEhPT14JiYoTz54fHwtMT09PU8pKXcucHVzaChlLnN1YnN0cmluZyhvLHgpKSxvPXgrbSx4PWUuaW5kZXhPZih0LG8pO2Vsc2V7aWYoLTE9PT1PKWJyZWFrO2lmKHcucHVzaChlLnN1YnN0cmluZyhvLE8pKSxsKE8rdikseSYmKF8oKSx1KSlyZXR1cm4gcCgpO2lmKHMmJmIubGVuZ3RoPj1zKXJldHVybiBwKCEwKX1lbHNle3ZhciBJPW87Zm9yKG8rKzs7KXt2YXIgST1lLmluZGV4T2YoJ1wiJyxJKzEpO2lmKC0xPT09SSlyZXR1cm4gZnx8Ui5wdXNoKHt0eXBlOlwiUXVvdGVzXCIsY29kZTpcIk1pc3NpbmdRdW90ZXNcIixtZXNzYWdlOlwiUXVvdGVkIGZpZWxkIHVudGVybWluYXRlZFwiLHJvdzpiLmxlbmd0aCxpbmRleDpvfSksZCgpO2lmKEk9PT1nLTEpe3ZhciBEPWUuc3Vic3RyaW5nKG8sSSkucmVwbGFjZSgvXCJcIi9nLCdcIicpO3JldHVybiBkKEQpfWlmKCdcIichPWVbSSsxXSl7aWYoZVtJKzFdPT10KXt3LnB1c2goZS5zdWJzdHJpbmcobyxJKS5yZXBsYWNlKC9cIlwiL2csJ1wiJykpLG89SSsxK20seD1lLmluZGV4T2YodCxvKSxPPWUuaW5kZXhPZihyLG8pO2JyZWFrfWlmKGUuc3Vic3RyKEkrMSx2KT09PXIpe2lmKHcucHVzaChlLnN1YnN0cmluZyhvLEkpLnJlcGxhY2UoL1wiXCIvZywnXCInKSksbChJKzErdikseD1lLmluZGV4T2YodCxvKSx5JiYoXygpLHUpKXJldHVybiBwKCk7aWYocyYmYi5sZW5ndGg+PXMpcmV0dXJuIHAoITApO2JyZWFrfX1lbHNlIEkrK319cmV0dXJuIGQoKX0sdGhpcy5hYm9ydD1mdW5jdGlvbigpe3U9ITB9LHRoaXMuZ2V0Q2hhckluZGV4PWZ1bmN0aW9uKCl7cmV0dXJuIG99fWZ1bmN0aW9uIGgoKXt2YXIgZT1kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtyZXR1cm4gZS5sZW5ndGg/ZVtlLmxlbmd0aC0xXS5zcmM6XCJcIn1mdW5jdGlvbiBmKCl7aWYoIVMuV09SS0VSU19TVVBQT1JURUQpcmV0dXJuITE7aWYoIWImJm51bGw9PT1TLlNDUklQVF9QQVRIKXRocm93IG5ldyBFcnJvcihcIlNjcmlwdCBwYXRoIGNhbm5vdCBiZSBkZXRlcm1pbmVkIGF1dG9tYXRpY2FsbHkgd2hlbiBQYXBhIFBhcnNlIGlzIGxvYWRlZCBhc3luY2hyb25vdXNseS4gWW91IG5lZWQgdG8gc2V0IFBhcGEuU0NSSVBUX1BBVEggbWFudWFsbHkuXCIpO3ZhciB0PVMuU0NSSVBUX1BBVEh8fHY7dCs9KC0xIT09dC5pbmRleE9mKFwiP1wiKT9cIiZcIjpcIj9cIikrXCJwYXBhd29ya2VyXCI7dmFyIHI9bmV3IGUuV29ya2VyKHQpO3JldHVybiByLm9ubWVzc2FnZT1jLHIuaWQ9dysrLFJbci5pZF09cixyfWZ1bmN0aW9uIGMoZSl7dmFyIHQ9ZS5kYXRhLHI9Ult0LndvcmtlcklkXSxuPSExO2lmKHQuZXJyb3Ipci51c2VyRXJyb3IodC5lcnJvcix0LmZpbGUpO2Vsc2UgaWYodC5yZXN1bHRzJiZ0LnJlc3VsdHMuZGF0YSl7dmFyIGk9ZnVuY3Rpb24oKXtuPSEwLGQodC53b3JrZXJJZCx7ZGF0YTpbXSxlcnJvcnM6W10sbWV0YTp7YWJvcnRlZDohMH19KX0scz17YWJvcnQ6aSxwYXVzZTpsLHJlc3VtZTpsfTtpZihtKHIudXNlclN0ZXApKXtmb3IodmFyIGE9MDthPHQucmVzdWx0cy5kYXRhLmxlbmd0aCYmKHIudXNlclN0ZXAoe2RhdGE6W3QucmVzdWx0cy5kYXRhW2FdXSxlcnJvcnM6dC5yZXN1bHRzLmVycm9ycyxtZXRhOnQucmVzdWx0cy5tZXRhfSxzKSwhbik7YSsrKTtkZWxldGUgdC5yZXN1bHRzfWVsc2UgbShyLnVzZXJDaHVuaykmJihyLnVzZXJDaHVuayh0LnJlc3VsdHMscyx0LmZpbGUpLGRlbGV0ZSB0LnJlc3VsdHMpfXQuZmluaXNoZWQmJiFuJiZkKHQud29ya2VySWQsdC5yZXN1bHRzKX1mdW5jdGlvbiBkKGUsdCl7dmFyIHI9UltlXTttKHIudXNlckNvbXBsZXRlKSYmci51c2VyQ29tcGxldGUodCksci50ZXJtaW5hdGUoKSxkZWxldGUgUltlXX1mdW5jdGlvbiBsKCl7dGhyb3dcIk5vdCBpbXBsZW1lbnRlZC5cIn1mdW5jdGlvbiBwKHQpe3ZhciByPXQuZGF0YTtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgUy5XT1JLRVJfSUQmJnImJihTLldPUktFUl9JRD1yLndvcmtlcklkKSxcInN0cmluZ1wiPT10eXBlb2Ygci5pbnB1dCllLnBvc3RNZXNzYWdlKHt3b3JrZXJJZDpTLldPUktFUl9JRCxyZXN1bHRzOlMucGFyc2Uoci5pbnB1dCxyLmNvbmZpZyksZmluaXNoZWQ6ITB9KTtlbHNlIGlmKGUuRmlsZSYmci5pbnB1dCBpbnN0YW5jZW9mIEZpbGV8fHIuaW5wdXQgaW5zdGFuY2VvZiBPYmplY3Qpe3ZhciBuPVMucGFyc2Uoci5pbnB1dCxyLmNvbmZpZyk7biYmZS5wb3N0TWVzc2FnZSh7d29ya2VySWQ6Uy5XT1JLRVJfSUQscmVzdWx0czpuLGZpbmlzaGVkOiEwfSl9fWZ1bmN0aW9uIF8oZSl7aWYoXCJvYmplY3RcIiE9dHlwZW9mIGUpcmV0dXJuIGU7dmFyIHQ9ZSBpbnN0YW5jZW9mIEFycmF5P1tdOnt9O2Zvcih2YXIgciBpbiBlKXRbcl09XyhlW3JdKTtyZXR1cm4gdH1mdW5jdGlvbiBnKGUsdCl7cmV0dXJuIGZ1bmN0aW9uKCl7ZS5hcHBseSh0LGFyZ3VtZW50cyl9fWZ1bmN0aW9uIG0oZSl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgZX12YXIgdixrPSFlLmRvY3VtZW50JiYhIWUucG9zdE1lc3NhZ2UseT1rJiYvKFxcP3wmKXBhcGF3b3JrZXIoPXwmfCQpLy50ZXN0KGUubG9jYXRpb24uc2VhcmNoKSxiPSExLFI9e30sdz0wLFM9e307aWYoUy5wYXJzZT10LFMudW5wYXJzZT1yLFMuUkVDT1JEX1NFUD1TdHJpbmcuZnJvbUNoYXJDb2RlKDMwKSxTLlVOSVRfU0VQPVN0cmluZy5mcm9tQ2hhckNvZGUoMzEpLFMuQllURV9PUkRFUl9NQVJLPVwi77u/XCIsUy5CQURfREVMSU1JVEVSUz1bXCJcXHJcIixcIlxcblwiLCdcIicsUy5CWVRFX09SREVSX01BUktdLFMuV09SS0VSU19TVVBQT1JURUQ9IWsmJiEhZS5Xb3JrZXIsUy5TQ1JJUFRfUEFUSD1udWxsLFMuTG9jYWxDaHVua1NpemU9MTA0ODU3NjAsUy5SZW1vdGVDaHVua1NpemU9NTI0Mjg4MCxTLkRlZmF1bHREZWxpbWl0ZXI9XCIsXCIsUy5QYXJzZXI9dSxTLlBhcnNlckhhbmRsZT1vLFMuTmV0d29ya1N0cmVhbWVyPWksUy5GaWxlU3RyZWFtZXI9cyxTLlN0cmluZ1N0cmVhbWVyPWEsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9UzptKGUuZGVmaW5lKSYmZS5kZWZpbmUuYW1kP2RlZmluZShmdW5jdGlvbigpe3JldHVybiBTfSk6ZS5QYXBhPVMsZS5qUXVlcnkpe3ZhciBDPWUualF1ZXJ5O0MuZm4ucGFyc2U9ZnVuY3Rpb24odCl7ZnVuY3Rpb24gcigpe2lmKDA9PWEubGVuZ3RoKXJldHVybiB2b2lkKG0odC5jb21wbGV0ZSkmJnQuY29tcGxldGUoKSk7dmFyIGU9YVswXTtpZihtKHQuYmVmb3JlKSl7dmFyIHI9dC5iZWZvcmUoZS5maWxlLGUuaW5wdXRFbGVtKTtpZihcIm9iamVjdFwiPT10eXBlb2Ygcil7aWYoXCJhYm9ydFwiPT1yLmFjdGlvbilyZXR1cm4gdm9pZCBuKFwiQWJvcnRFcnJvclwiLGUuZmlsZSxlLmlucHV0RWxlbSxyLnJlYXNvbik7aWYoXCJza2lwXCI9PXIuYWN0aW9uKXJldHVybiB2b2lkIGkoKTtcIm9iamVjdFwiPT10eXBlb2Ygci5jb25maWcmJihlLmluc3RhbmNlQ29uZmlnPUMuZXh0ZW5kKGUuaW5zdGFuY2VDb25maWcsci5jb25maWcpKX1lbHNlIGlmKFwic2tpcFwiPT1yKXJldHVybiB2b2lkIGkoKX12YXIgcz1lLmluc3RhbmNlQ29uZmlnLmNvbXBsZXRlO2UuaW5zdGFuY2VDb25maWcuY29tcGxldGU9ZnVuY3Rpb24odCl7bShzKSYmcyh0LGUuZmlsZSxlLmlucHV0RWxlbSksaSgpfSxTLnBhcnNlKGUuZmlsZSxlLmluc3RhbmNlQ29uZmlnKX1mdW5jdGlvbiBuKGUscixuLGkpe20odC5lcnJvcikmJnQuZXJyb3Ioe25hbWU6ZX0scixuLGkpfWZ1bmN0aW9uIGkoKXthLnNwbGljZSgwLDEpLHIoKX12YXIgcz10LmNvbmZpZ3x8e30sYT1bXTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIHQ9XCJJTlBVVFwiPT1DKHRoaXMpLnByb3AoXCJ0YWdOYW1lXCIpLnRvVXBwZXJDYXNlKCkmJlwiZmlsZVwiPT1DKHRoaXMpLmF0dHIoXCJ0eXBlXCIpLnRvTG93ZXJDYXNlKCkmJmUuRmlsZVJlYWRlcjtpZighdHx8IXRoaXMuZmlsZXN8fDA9PXRoaXMuZmlsZXMubGVuZ3RoKXJldHVybiEwO2Zvcih2YXIgcj0wO3I8dGhpcy5maWxlcy5sZW5ndGg7cisrKWEucHVzaCh7ZmlsZTp0aGlzLmZpbGVzW3JdLGlucHV0RWxlbTp0aGlzLGluc3RhbmNlQ29uZmlnOkMuZXh0ZW5kKHt9LHMpfSl9KSxyKCksdGhpc319eT9lLm9ubWVzc2FnZT1wOlMuV09SS0VSU19TVVBQT1JURUQmJih2PWgoKSxkb2N1bWVudC5ib2R5P2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsZnVuY3Rpb24oKXtiPSEwfSwhMCk6Yj0hMCksaS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShuLnByb3RvdHlwZSksaS5wcm90b3R5cGUuY29uc3RydWN0b3I9aSxzLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKG4ucHJvdG90eXBlKSxzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1zLGEucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYS5wcm90b3R5cGUpLGEucHJvdG90eXBlLmNvbnN0cnVjdG9yPWF9KFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93OnRoaXMpOyIsInZhciBFbmdpbmUgPSB7fTtcblxuRW5naW5lLkJvb3QgPSBmdW5jdGlvbiAoZ2FtZSkgeyB9O1xuXG5FbmdpbmUuQm9vdC5wcm90b3R5cGUgPSB7XG4gIHByZWxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgfSxcblxuICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNjYWxlLnNjYWxlTW9kZSA9IFBoYXNlci5TY2FsZU1hbmFnZXIuU0hPV19BTEw7XG4gICAgdGhpcy5zY2FsZS5wYWdlQWxpZ25Ib3Jpem9udGFsbHkgPSB0cnVlO1xuICAgIHRoaXMuc2NhbGUucGFnZUFsaWduVmVydGljYWxseSA9IHRydWU7XG4gICAgdGhpcy5zdGFnZS5kaXNhYmxlVmlzaWJpbGl0eUNoYW5nZSA9IHRydWU7XG4gICAgdGhpcy5zdGF0ZS5zdGFydCgnUHJlbG9hZGVyJyk7XG4gIH1cbn1cbiIsIkVuZ2luZS5QcmVsb2FkZXIgPSBmdW5jdGlvbiAoZ2FtZSkge1xuICB0aGlzLmdhbWUgPSBnYW1lO1xufTtcblxuRW5naW5lLlByZWxvYWRlci5wcm90b3R5cGUgPSB7XG4gIHByZWxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcbiAgICB0aGlzLnN0YWdlLnNtb290aGVkID0gZmFsc2U7XG5cbiAgICB0aGlzLmFkZExvZ29MYWJsZSgpO1xuICAgIHRoaXMuYWRkUHJvZ3Jlc3NMYWJsZSgpO1xuXG4gICAgaWYgKEVuZ2luZS5ERUJVRylcbiAgICAgIHRoaXMubG9hZC5lbmFibGVQYXJhbGxlbCA9IGZhbHNlO1xuXG4gICAgdGhpcy5faW5pdFN0eWxlKCk7XG5cbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Bva2ViYWxsJywgJ2Fzc2V0cy9pbWFnZXMvYmFja2dyb3VuZC9wb2tlYmFsbC5wbmcnKTtcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3NsaWRlLWJnJywgJ2Fzc2V0cy9pbWFnZXMvYmFja2dyb3VuZC9zbGlkZS1iZy5qcGcnKTtcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ2NhbGMtYmcnLCAnYXNzZXRzL2ltYWdlcy9iYWNrZ3JvdW5kL2NhbGMuanBnJyk7XG4gICAgdGhpcy5sb2FkLmltYWdlKCdzaGFyZS1idG4nLCAnYXNzZXRzL2ltYWdlcy91aS9zaGFyZS1idG4ucG5nJyk7XG4gICAgdGhpcy5sb2FkLmltYWdlKCdyZXBlYXQtYnRuJywgJ2Fzc2V0cy9pbWFnZXMvdWkvcmVwZWF0LWJ0bi5wbmcnKTtcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3JuZC1wb2tlbW9uJywgJ2Fzc2V0cy9pbWFnZXMvcG9rZW1vbnMvJyArIEVuZ2luZS5ybmRQb2tlbW9uICsgJy5wbmcnKTtcblxuICAgIHRoaXMuX2xvYWRQb2tlbW9ucygpO1xuXG4gICAgdGhpcy5sb2FkLnRleHQoJ3Bva2Vtb24uY3N2JywgJ2Fzc2V0cy9kYXRhL3Bva2Vtb24uY3N2Jyk7XG5cbiAgICB0aGlzLmxvYWQub25GaWxlQ29tcGxldGUuYWRkKHRoaXMuZmlsZUNvbXBsZXRlLCB0aGlzKTtcbiAgfSxcblxuICBfaW5pdFBva2Vtb25EQjogZnVuY3Rpb24oKSB7XG4gICAgRW5naW5lLlBva2Vtb25EQi5sb2FkKHRoaXMuY2FjaGUuZ2V0VGV4dCgncG9rZW1vbi5jc3YnKSk7XG4gIH0sXG5cbiAgX2xvYWRQb2tlbW9uczogZnVuY3Rpb24oKSB7XG4gICAgRW5naW5lLmxvYWRlciA9IG5ldyBQaGFzZXIuTG9hZGVyKHRoaXMuZ2FtZSk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IEVuZ2luZS5ST0xMX1NMSURFX0NPVU5UOyBpKyspIHtcbiAgICAgIEVuZ2luZS5sb2FkZXIuaW1hZ2UoJ3Bva2Vtb25Sb2xsJyArIGksICdhc3NldHMvaW1hZ2VzL3Bva2Vtb25zLycgKyB0aGlzLnJuZC5iZXR3ZWVuKDEsIDcyMSkgKyAnLnBuZycpO1xuICAgIH1cbiAgfSxcblxuICBmaWxlQ29tcGxldGU6IGZ1bmN0aW9uIChwcm9ncmVzcywgY2FjaGVLZXksIHN1Y2Nlc3MsIHRvdGFsTG9hZGVkLCB0b3RhbEZpbGVzKSB7XG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZS50ZXh0ID0gcHJvZ3Jlc3MgKyAnJSAnICsgdG90YWxMb2FkZWQgKyAnLycgKyB0b3RhbEZpbGVzO1xuICB9LFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2luaXRQb2tlbW9uREIoKTtcbiAgICBFbmdpbmUubG9hZGVyLnN0YXJ0KCk7XG5cbiAgICAvLyBUT0RPOiBURU1QXG4gICAgRW5naW5lLmxvYWRlci5vbkxvYWRDb21wbGV0ZS5hZGQoZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnN0YXRlLnN0YXJ0KCdDYWxjdWxhdGUnKTtcbiAgICB9LCB0aGlzKTtcblxuICAgIC8vIHRoaXMuc3RhdGUuc3RhcnQoJ0dhbWUnKTtcbiAgfSxcblxuICBfaW5pdFN0eWxlOiBmdW5jdGlvbigpIHtcbiAgICBFbmdpbmUudGV4dFN0eWxlID0ge1xuICAgICAgZmlsbDogJyNmZmYnLFxuICAgICAgZm9udDogJzI2cHggT3BlbiBTYW5zJ1xuICAgIH1cbiAgfSxcblxuICBhZGRMb2dvTGFibGU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3R5bGUgPSB7XG4gICAgICBmaWxsOiAnI0ZGRicsXG4gICAgICBmb250OiAnNDNweCBBcmlhbCdcbiAgICB9XG5cbiAgICB0aGlzLl9sb2dvTGFibGUgPSB0aGlzLmFkZC50ZXh0KHRoaXMuZ2FtZS53aWR0aCAvIDIsIHRoaXMuZ2FtZS5oZWlnaHQgLyA0LCAnUG9rZW1vbiBUZXN0Jywgc3R5bGUpO1xuICAgIHRoaXMuX2xvZ29MYWJsZS5hbmNob3Iuc2V0VG8oMC41KTtcbiAgfSxcblxuICBhZGRQcm9ncmVzc0xhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0eWxlID0ge1xuICAgICAgZmlsbDogJyNGRkYnLFxuICAgICAgZm9udDogJzIxcHggQXJpYWwnXG4gICAgfVxuXG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZSA9IHRoaXMuYWRkLnRleHQodGhpcy5nYW1lLndpZHRoIC8gMiwgdGhpcy5nYW1lLmhlaWdodCAvIDIsICdDYWxjdWxhdGVkLi4uJywgc3R5bGUpO1xuICAgIHRoaXMuX3Byb2dyZXNzTGFibGUuYW5jaG9yLnNldFRvKDAuNSk7XG4gIH1cbn1cbiIsIkVuZ2luZS5BbnN3ZXIgPSBmdW5jdGlvbihnYW1lLCB4LCB5LCB0ZXh0LCBjYWxsYmFjaywgY29udGV4dCkge1xuICB0aGlzLmdhbWUgPSBnYW1lO1xuICB0aGlzLnRleHQgPSB0ZXh0O1xuICB0aGlzLl9wYWRkaW5nID0gNTtcblxuICB0aGlzLl9jcmVhdGVUZXh0KCk7XG5cbiAgUGhhc2VyLkJ1dHRvbi5jYWxsKHRoaXMsIGdhbWUsIHgsIHksIHRoaXMuX2NyZWF0ZUJhY2tncm91bmQoKSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuICB0aGlzLnRpbnQgPSAweDAwOTY4ODtcblxuICB0aGlzLmFkZENoaWxkKHRoaXMuX3RleHRTcHJpdGUpO1xuXG4gIHRoaXMub25JbnB1dE92ZXIuYWRkKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudGludCA9IDB4MDBmZWU3O1xuICB9LCB0aGlzKTtcblxuICB0aGlzLm9uSW5wdXRPdXQuYWRkKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudGludCA9IDB4MDA5Njg4O1xuICB9LCB0aGlzKTtcbn1cblxuRW5naW5lLkFuc3dlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBoYXNlci5CdXR0b24ucHJvdG90eXBlKTtcbkVuZ2luZS5BbnN3ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRW5naW5lLkFuc3dlcjtcblxuRW5naW5lLkFuc3dlci5wcm90b3R5cGUuX2NyZWF0ZUJhY2tncm91bmQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJvdHRvbVBhZGRpbmcgPSAtNztcblxuICB2YXIgYm1wID0gdGhpcy5nYW1lLmFkZC5iaXRtYXBEYXRhKHRoaXMuX3RleHRTcHJpdGUud2lkdGggKyB0aGlzLl9wYWRkaW5nICogMiwgdGhpcy5fdGV4dFNwcml0ZS5oZWlnaHQgKyB0aGlzLl9wYWRkaW5nIC8gMik7XG4gIGJtcC5jdHguYmVnaW5QYXRoKCk7XG4gIGJtcC5jdHgucmVjdCgwLCAwLCBibXAud2lkdGgsIGJtcC5oZWlnaHQgKyBib3R0b21QYWRkaW5nKTtcbiAgYm1wLmN0eC5maWxsU3R5bGUgPSAnI2ZmZic7XG4gIGJtcC5jdHguZmlsbCgpO1xuXG4gIHJldHVybiBibXA7XG59XG5cbkVuZ2luZS5BbnN3ZXIucHJvdG90eXBlLl9jcmVhdGVUZXh0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX3RleHRTcHJpdGUgPSBuZXcgUGhhc2VyLlRleHQodGhpcy5nYW1lLCAwLCAwLCB0aGlzLnRleHQsIEVuZ2luZS50ZXh0U3R5bGUpO1xuICB0aGlzLl90ZXh0U3ByaXRlLmFuY2hvci5zZXRUbygwLjUsIDApO1xufVxuIiwiRW5naW5lLkdhbWUgPSBmdW5jdGlvbihnYW1lKSB7fVxuXG5FbmdpbmUuR2FtZS5wcm90b3R5cGUgPSB7XG4gIGNyZWF0ZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7IC8vI2RkZFxuXG4gICAgdGhpcy5fYWRkQmFja2dyb3VuZCgpO1xuICAgIHRoaXMuX2FkZFBva2ViYWxsU3lzdGVtKCk7XG4gICAgdGhpcy5fYWRkU2xpZGVzKCk7XG4gICAgdGhpcy5fc2hvd0NoYWluU2xpZGVzKHRoaXMuc2xpZGVzKTtcbiAgICB0aGlzLl9hZGRQcm9ncmVzc1NsaWRlKCk7XG5cbiAgICB0aGlzLl9kcmF3RGVidWcoKTtcbiAgfSxcblxuICBfYWRkU2xpZGVzOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNsaWRlcyA9IFtcbiAgICAgIG5ldyBFbmdpbmUuU2xpZGUodGhpcy5nYW1lLCAn0JLRiyDQu9GO0LHQuNGC0LUg0L7QstGB0Y/QvdC+0LUg0L/QtdGH0LXQvdGM0LU/JywgWyfQlNCwJywgJ9Cd0LXRgicsICfQndC1INC/0YDQvtCx0L7QstCw0Lsg0LXQs9C+J10pLFxuICAgICAgbmV3IEVuZ2luZS5TbGlkZSh0aGlzLmdhbWUsICfQktCw0YEg0YfQsNGB0YLQviDQsdGM0ZHRgiDRgtC+0LrQvtC8PycsIFsn0JHRi9Cy0LDQtdGCJywgJ9Ce0YfQtdC90Ywg0YDQtdC00LrQvicsICfQndC1INC30L3QsNGOJywgJ9Ci0L7Qu9GM0LrQviDRh9GC0L4g0YPQtNCw0YDQuNC70L4hJ10pLFxuICAgICAgbmV3IEVuZ2luZS5TbGlkZSh0aGlzLmdhbWUsICfQmtCw0LrQsNGPINGB0YLQuNGF0LjRjyDQstCw0Lwg0LHQvtC70YzRiNC1INC90YDQsNCy0LjRgtGB0Y8/JywgWyfQktC+0LTQsCcsICfQntCz0L7QvdGMJywgJ9CS0LXRgtC10YAnLCAn0JfQtdC80LvRjyddKSxcbiAgICAgIG5ldyBFbmdpbmUuU2xpZGUodGhpcy5nYW1lLCAn0JLRi9Cx0LjRgNC40YLQtSDQvtC00L3QviDQuNC3Li4uJywgWyfQotGM0LzQsCcsICfQodCy0LXRgiddKSxcbiAgICAgIG5ldyBFbmdpbmUuU2xpZGUodGhpcy5nYW1lLCAn0JLRiyDQsdC+0LjRgtC10YHRjCDQvdCw0YHQtdC60L7QvNGL0YU/JywgWyfQlNCwJywgJ9Cd0LXRgiddKSxcbiAgICAgIG5ldyBFbmdpbmUuU2xpZGUodGhpcy5nYW1lLCAn0J3QtSDQv9GA0L7RgtC40LIg0LvQuCDQstGLINC30LDQstC10YHRgtC4INC00L7QvNCw0YjQvdC10LPQviDQtNGA0LDQutC+0L3QsD8nLCBbJ9Cf0YTRhCwg0LXRidGRINGB0L/RgNCw0YjQuNCy0LDQtdGC0LUnLCAn0J3QtSDQu9GO0LHQu9GOINC00YDQsNC60L7QvdC+0LInLCAn0JHQvtGO0YHRjCDQvtC9INGB0YrQtdGB0YIg0LzQvtC10LPQviDQv9C40YLQvtC80YbQsCddKSxcbiAgICAgIG5ldyBFbmdpbmUuU2xpZGUodGhpcy5nYW1lLCAn0JrQsNC60L7QtSDQv9C10YDQtdC00LLQuNC20LXQvdC40LUg0LLRiyDQv9GA0LXQtNC/0L7Rh9C40YLQsNC10YLQtT8nLCBbJ9Cf0L4g0LLQvtC30LTRg9GF0YMnLCAn0J/QviDQt9C10LzQu9C1JywgJ9CS0L/Qu9Cw0LLRjCcsICfQotC10LvQtdC/0L7RgNGC0LDRhtC40Y8nXSksXG4gICAgICBuZXcgRW5naW5lLlNsaWRlKHRoaXMuZ2FtZSwgJ9CS0Ysg0LHQvtC40YLQtdGB0Ywg0L/RgNC40LLQtdC00LXQvdC40Lk/JywgWyfQlNCwJywgJ9Cd0LXRgicsICfQntC90Lgg0L3QtSDRgdGD0YnQtdGB0YLQstGD0Y7RgiEnXSksXG4gICAgICBuZXcgRW5naW5lLlNsaWRlKHRoaXMuZ2FtZSwgJ9Ca0LDQutC40LUg0LLQsNC8INC90YDQsNCy0Y/RgtGB0Y8g0LbQuNCy0L7RgtC90YvQtScsIFsn0JHQvtC70YzRiNC40LUnLCAn0JzQsNC70LXQvdGM0LrQuNC1JywgJ9Ch0YDQtdC00L3QuNC1J10pLFxuICAgICAgbmV3IEVuZ2luZS5TbGlkZSh0aGlzLmdhbWUsICfQktCw0Lwg0L3RgNCw0LLRj9GC0YHRjyDQv9GD0YXQu9C10L3RjNC60LjQtSDQv9C40YLQvtC80YbRiz8nLCBbJ9CU0LAnLCAn0J3QtdGCJywgJ9CR0LXQtyDRgNCw0LfQvdC40YbRiyddKSxcbiAgICBdO1xuICB9LFxuXG4gIF9zaG93Q2hhaW5TbGlkZXM6IGZ1bmN0aW9uKGNoYWluKSB7XG4gICAgdGhpcy5zbGlkZUNvdW50ZXIgPSAwO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFpbi5sZW5ndGg7IGkrKykge1xuICAgICAgY2hhaW5baV0uc2V0Q2FsbGJhY2tDaGVjayh0aGlzLl9uZXh0U2xpZGUuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgY2hhaW5bMF0uc2hvdygpO1xuICB9LFxuXG4gIF9uZXh0U2xpZGU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2xpZGVDb3VudGVyKys7XG5cbiAgICBpZiAodGhpcy5zbGlkZUNvdW50ZXIgPj0gdGhpcy5zbGlkZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9maW5pc2hUZXN0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zbGlkZXNbdGhpcy5zbGlkZUNvdW50ZXJdLnNob3coKTtcbiAgICB0aGlzLl9wcm9ncmVzc0xhYmxlLnRleHQgPSAn0JLQvtC/0YDQvtGBICcgKyAodGhpcy5zbGlkZUNvdW50ZXIgKyAxKSArICcg0LjQtyAnICsgdGhpcy5zbGlkZXMubGVuZ3RoO1xuICB9LFxuXG4gIF9hZGRCYWNrZ3JvdW5kOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYmcgPSB0aGlzLmdhbWUuYWRkLnNwcml0ZSgwLCAwLCAnc2xpZGUtYmcnKTtcbiAgfSxcblxuICBfZHJhd0RlYnVnOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9saW5lViA9IG5ldyBQaGFzZXIuTGluZSh0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgMCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIHRoaXMuZ2FtZS5oZWlnaHQpO1xuICAgIHRoaXMuX2xpbmVIID0gbmV3IFBoYXNlci5MaW5lKDAsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZLCB0aGlzLmdhbWUud2lkdGgsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZKTtcbiAgfSxcblxuICBfYWRkUG9rZWJhbGxTeXN0ZW06IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucG9rZWJhbGxTeXN0ZW0gPSBuZXcgRW5naW5lLlBva2ViYWxsU3lzdGVtKHRoaXMuZ2FtZSk7XG4gICAgdGhpcy5wb2tlYmFsbFN5c3RlbS5jcmVhdGUoKTtcbiAgfSxcblxuICBfZmluaXNoVGVzdDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zdGF0ZS5zdGFydCgnQ2FsY3VsYXRlJyk7XG4gIH0sXG5cbiAgX2FkZFByb2dyZXNzU2xpZGU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3Byb2dyZXNzTGFibGUgPSB0aGlzLmFkZC50ZXh0KEVuZ2luZS5HQU1FX1dJRFRIIC8gMiwgMjUsICfQktC+0L/RgNC+0YEgMSDQuNC3ICcgKyB0aGlzLnNsaWRlcy5sZW5ndGgsIEVuZ2luZS50ZXh0U3R5bGUpO1xuICAgIHRoaXMuX3Byb2dyZXNzTGFibGUuZm9udFNpemUgPSAxNjtcbiAgICB0aGlzLl9wcm9ncmVzc0xhYmxlLmFuY2hvci5zZXRUbygwLjUsIDApO1xuICB9LFxuXG4gIHVwZGF0ZTogZnVuY3Rpb24oKSB7fSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIC8vIHRoaXMuZ2FtZS5kZWJ1Zy5pbnB1dEluZm8oMTUsIDE1LCAnI2ZmZicpO1xuICAgIC8vIC8vIHRoaXMuZ2FtZS5kZWJ1Zy5zcHJpdGVCb3VuZHModGhpcy50Ll9zbGlkZUdyb3VwLCAncmdiYSgyMTMsIDgzLCA4MywgMC4yNSknKTtcbiAgICAvLyAvLyB0aGlzLmdhbWUuZGVidWcuc3ByaXRlQm91bmRzKHRoaXMudC5fYW5zd2VyR3JvdXAsICdyZ2JhKDM2LCAwLCAyNTUsIDAuMjUpJyk7XG4gICAgLy9cbiAgICAvLyBnYW1lLmRlYnVnLmdlb20odGhpcy5fbGluZVYpO1xuICAgIC8vIGdhbWUuZGVidWcuZ2VvbSh0aGlzLl9saW5lSCk7XG4gIH1cbn1cbiIsIkVuZ2luZS5Qb2tlYmFsbFN5c3RlbSA9IGZ1bmN0aW9uKGdhbWUpIHtcbiAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgdGhpcy5jb3VudEVsZW1lbnRzID0gMTY7XG59XG5cbkVuZ2luZS5Qb2tlYmFsbFN5c3RlbS5wcm90b3R5cGUgPSB7XG4gIGNyZWF0ZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fYWRkUG9rZWJhbGxzKCk7XG4gICAgdGhpcy5fcnVuVGltZXIoKTtcbiAgfSxcblxuICBfYWRkUG9rZWJhbGxzOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnBva2ViYWxscyA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jb3VudEVsZW1lbnRzOyBpKyspIHtcbiAgICAgIHZhciBwb2tlYmFsbCA9IG5ldyBQaGFzZXIuU3ByaXRlKHRoaXMuZ2FtZSwgMCwgMCwgJ3Bva2ViYWxsJyk7XG5cbiAgICAgIHBva2ViYWxsLmFuY2hvci5zZXRUbygwLjUpO1xuXG4gICAgICB0aGlzLnBva2ViYWxscy5hZGQocG9rZWJhbGwpO1xuXG4gICAgICBwb2tlYmFsbC5raWxsKCk7XG4gICAgfVxuICB9LFxuXG4gIF9ydW5UaW1lcjogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fdGltZXIgPSB0aGlzLmdhbWUudGltZS5jcmVhdGUoKTtcbiAgICB0aGlzLl90aW1lci5sb29wKFBoYXNlci5UaW1lci5TRUNPTkQsIHRoaXMuZW1pdCwgdGhpcyk7XG4gICAgdGhpcy5fdGltZXIuc3RhcnQoKTtcbiAgfSxcblxuICBlbWl0OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGFkZGluZ3MgPSAyNTtcbiAgICB2YXIgc2NhbGUgPSB0aGlzLmdhbWUucm5kLnJlYWxJblJhbmdlKDAuMjUsIDAuOCk7XG4gICAgdmFyIGFscGhhID0gdGhpcy5nYW1lLnJuZC5yZWFsSW5SYW5nZSgwLjA1LCAwLjE1KTtcblxuICAgIHZhciBwb2tlYmFsbCA9IHRoaXMucG9rZWJhbGxzLmdldEZpcnN0RGVhZCgpO1xuXG4gICAgcG9rZWJhbGwucmV2aXZlKCk7XG4gICAgcG9rZWJhbGwucmVzZXQoXG4gICAgICB0aGlzLmdhbWUucm5kLmJldHdlZW4ocGFkZGluZ3MsIHRoaXMuZ2FtZS53aWR0aCAtIHBhZGRpbmdzKSxcbiAgICAgIHRoaXMuZ2FtZS5ybmQuYmV0d2VlbihwYWRkaW5ncywgdGhpcy5nYW1lLmhlaWdodCAtIHBhZGRpbmdzKVxuICAgICk7XG5cbiAgICBwb2tlYmFsbC5hbHBoYSA9IDA7XG4gICAgcG9rZWJhbGwucm90YXRpb24gPSAwO1xuICAgIHBva2ViYWxsLnNjYWxlLnNldFRvKHNjYWxlLCBzY2FsZSk7XG5cbiAgICB2YXIgdGFyZ2V0WCA9IHRoaXMuZ2FtZS5ybmQuYmV0d2VlbigxMDAsIDMwMCk7XG4gICAgdmFyIHRhcmdldFkgPSAwO1xuXG4gICAgaWYgKHBva2ViYWxsLnggPiB0aGlzLmdhbWUud2lkdGggLyAyKVxuICAgICAgdGFyZ2V0WCAqPSAtMTtcblxuICAgIHZhciBhbHBoYVR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbihwb2tlYmFsbClcbiAgICAgIC50byh7YWxwaGE6IGFscGhhfSwgMjUwMCk7XG5cbiAgICB2YXIgc3BlZWRUd2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4ocG9rZWJhbGwpXG4gICAgICAudG8oe3g6IHBva2ViYWxsLnggKyB0YXJnZXRYfSwgNjAwMCk7XG5cbiAgICB2YXIgcm90YXRpb25Ud2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4ocG9rZWJhbGwpXG4gICAgICAudG8oe3JvdGF0aW9uOiBNYXRoLlBJICogMiAqIHRoaXMuZ2FtZS5ybmQucGljayhbLTEsIDFdKX0sIDYwMDApO1xuXG4gICAgdmFyIGRpZVR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbihwb2tlYmFsbClcbiAgICAgIC50byh7YWxwaGE6IDB9LCAyNTAwKTtcblxuICAgIGFscGhhVHdlZW4uc3RhcnQoKTtcbiAgICBzcGVlZFR3ZWVuLnN0YXJ0KCk7XG4gICAgcm90YXRpb25Ud2Vlbi5zdGFydCgpO1xuXG4gICAgYWxwaGFUd2Vlbi5jaGFpbihkaWVUd2Vlbi5kZWxheSgxMDAwKSk7XG5cbiAgICBkaWVUd2Vlbi5vbkNvbXBsZXRlXG4gICAgICAuYWRkKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmtpbGwoKTtcbiAgICAgIH0sIHBva2ViYWxsKTtcblxuICAgIC8vIGFscGhhVHdlZW4ub25Db21wbGV0ZS5hZGQoZnVuY3Rpb24oKSB7XG4gICAgLy8gICB0aGlzLmtpbGwoKTtcbiAgICAvLyB9LCBwb2tlYmFsbCk7XG4gIH0sXG5cbiAgdXBkYXRlOiBmdW5jdGlvbigpIHtcblxuICB9LFxufVxuIiwiRW5naW5lLlNsaWRlID0gZnVuY3Rpb24oZ2FtZSwgdGV4dCwgYW5zd2Vycykge1xuICB0aGlzLmdhbWUgPSBnYW1lO1xuICB0aGlzLl9tYXJnaW5Ub3BBbnN3ZXJzID0gNzU7XG4gIHRoaXMuX2xpbmVTcGFjaW5nQW5zd2VycyA9IDYwO1xuICB0aGlzLl9tYXJnaW5Ub3BMYWJsZSA9IDIwMDtcblxuICBQaGFzZXIuU3ByaXRlLmNhbGwodGhpcywgZ2FtZSwgMCwgMCwgdGhpcy5fY3JlYXRlQmFja2dyb3VuZCgpKTtcblxuICB0aGlzLnRleHQgPSB0ZXh0O1xuICB0aGlzLmFuc3dlcnMgPSBhbnN3ZXJzO1xuICB0aGlzLmFscGhhID0gMDtcbiAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG5cbiAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzKTtcblxuICB0aGlzLl9hZGRMYWJsZSgpO1xuICB0aGlzLl9hZGRBbnN3ZXJzKCk7XG59XG5cbkVuZ2luZS5TbGlkZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBoYXNlci5TcHJpdGUucHJvdG90eXBlKTtcbkVuZ2luZS5TbGlkZS5jb25zdHJ1Y3RvciA9IEVuZ2luZS5TbGlkZTtcblxuRW5naW5lLlNsaWRlLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMudmlzaWJsZSA9IHRydWU7XG5cbiAgdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKS50byh7XG4gICAgYWxwaGE6IDFcbiAgfSwgMTUwKS5zdGFydCgpO1xufVxuXG5FbmdpbmUuU2xpZGUucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKS50byh7XG4gICAgYWxwaGE6IDBcbiAgfSwgMTUwKS5zdGFydCgpO1xuXG4gIHR3ZWVuLm9uQ29tcGxldGUuYWRkKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmNhbGxiYWNrKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrKCk7XG4gICAgfVxuICB9LCB0aGlzKTtcblxuICByZXR1cm4gdHdlZW4ub25Db21wbGV0ZTtcbn1cblxuRW5naW5lLlNsaWRlLnByb3RvdHlwZS5zZXRDYWxsYmFja0NoZWNrID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xufVxuXG5FbmdpbmUuU2xpZGUucHJvdG90eXBlLl9hZGRMYWJsZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9sYWJsZSA9IG5ldyBQaGFzZXIuVGV4dCh0aGlzLmdhbWUsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCB0aGlzLl9tYXJnaW5Ub3BMYWJsZSwgdGhpcy50ZXh0LCBFbmdpbmUudGV4dFN0eWxlKTtcbiAgdGhpcy5fbGFibGUud29yZFdyYXAgPSB0cnVlO1xuICB0aGlzLl9sYWJsZS53b3JkV3JhcFdpZHRoID0gNjAwO1xuICB0aGlzLl9sYWJsZS5hbGlnbiA9ICdjZW50ZXInO1xuICB0aGlzLl9sYWJsZS5hbmNob3Iuc2V0VG8oMC41KTtcblxuICB0aGlzLmFkZENoaWxkKHRoaXMuX2xhYmxlKTtcbn1cblxuRW5naW5lLlNsaWRlLnByb3RvdHlwZS5fYWRkQW5zd2VycyA9IGZ1bmN0aW9uKCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYW5zd2Vycy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBhbnN3ZXIgPSBuZXcgRW5naW5lLkFuc3dlcihcbiAgICAgIHRoaXMuZ2FtZSxcbiAgICAgIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLFxuICAgICAgdGhpcy5fbGFibGUueSArIHRoaXMuX21hcmdpblRvcEFuc3dlcnMgKyB0aGlzLl9saW5lU3BhY2luZ0Fuc3dlcnMgKiBpLFxuICAgICAgdGhpcy5hbnN3ZXJzW2ldLFxuICAgICAgdGhpcy5oaWRlLFxuICAgICAgdGhpc1xuICAgICk7XG5cbiAgICBhbnN3ZXIuYW5jaG9yLnNldFRvKDAuNSwgMCk7XG4gICAgdGhpcy5hZGRDaGlsZChhbnN3ZXIpO1xuICB9XG59XG5cbkVuZ2luZS5TbGlkZS5wcm90b3R5cGUuX2NyZWF0ZUJhY2tncm91bmQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJtcCA9IHRoaXMuZ2FtZS5hZGQuYml0bWFwRGF0YShFbmdpbmUuR0FNRV9XSURUSCwgRW5naW5lLkdBTUVfSEVJR0hUKTtcblxuICBibXAuY3R4LmJlZ2luUGF0aCgpO1xuICBibXAuY3R4LnJlY3QoMCwgMCwgYm1wLndpZHRoLCBibXAuaGVpZ2h0KTtcbiAgYm1wLmN0eC5maWxsU3R5bGUgPSAncmdiYSgwLCAwLCAwLCAwKSc7XG4gIGJtcC5jdHguZmlsbCgpO1xuXG4gIHJldHVybiBibXA7XG59XG4iLCJFbmdpbmUuQ2FsY3VsYXRlID0gZnVuY3Rpb24oZ2FtZSkge31cblxuRW5naW5lLkNhbGN1bGF0ZS5wcm90b3R5cGUgPSB7XG4gIGNyZWF0ZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fdGltZVByb2dyZXNzID0gODAwMDtcbiAgICB0aGlzLl9jb3VudFRpY2sgPSA3MztcbiAgICB0aGlzLl9wcm9ncmVzcyA9IDA7XG4gICAgdGhpcy5fcmVzdWx0UG9rZW1vbiA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAncm5kLXBva2Vtb24nKTtcbiAgICB0aGlzLl9yZXN1bHRQb2tlbW9uLnZpc2libGUgPSBmYWxzZTtcblxuICAgIHRoaXMuX2FkZEJhY2tncm91bmQoKTtcbiAgICB0aGlzLl9hZGRSb2xsZXIoKTtcbiAgICB0aGlzLl9hZGRJbmZvTGFibGUoKTtcbiAgICB0aGlzLl9hZGRQcm9ncmVzc0xhYmxlKCk7XG5cbiAgICB0aGlzLl9zdGFydFJvbGwoKTtcbiAgICB0aGlzLl9zdGFydFByb2dyZXNzKCk7XG4gIH0sXG5cbiAgX2FkZFJvbGxlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJvbGxTaXplID0gMzAwO1xuICAgIHZhciBtYXJnaW5SaWdodCA9IDEwMDtcblxuICAgIHRoaXMuX3JvbGxzID0gW107XG4gICAgdGhpcy5fcm9sbEdyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKTtcbiAgICB0aGlzLl9hY3RpdmVSb2xsU3ByaXRlID0gLTE7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IEVuZ2luZS5ST0xMX1NMSURFX0NPVU5UOyBpKyspIHtcbiAgICAgIHZhciBzcHJpdGUgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ3Bva2Vtb25Sb2xsJyArIGkpO1xuXG4gICAgICBzcHJpdGUudmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICB0aGlzLl9yb2xsR3JvdXAuYWRkKHNwcml0ZSk7XG4gICAgICB0aGlzLl9yb2xscy5wdXNoKHNwcml0ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5fcm9sbEdyb3VwLnggPSBtYXJnaW5SaWdodDtcbiAgICB0aGlzLl9yb2xsR3JvdXAueSA9IHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZIC0gcm9sbFNpemUgLyAyO1xuXG4gICAgdGhpcy5fcm9sbEdyb3VwLmFkZCh0aGlzLl9yZXN1bHRQb2tlbW9uKTtcbiAgICB0aGlzLl9yb2xscy5wdXNoKHRoaXMuX3Jlc3VsdFBva2Vtb24pO1xuICB9LFxuXG4gIF9hZGRCYWNrZ3JvdW5kOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmJnID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICdjYWxjLWJnJyk7XG4gIH0sXG5cbiAgX2FkZFByb2dyZXNzTGFibGU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciByb2xsU2l6ZSA9IDMwMDtcbiAgICB2YXIgbWFyZ2luVG9wID0gNTA7XG5cbiAgICB0aGlzLl9wcm9ncmVzc0xhYmxlID0gdGhpcy5hZGQudGV4dChcbiAgICAgIHRoaXMuX3JvbGxHcm91cC54ICsgcm9sbFNpemUgLyAyLFxuICAgICAgdGhpcy5fcm9sbEdyb3VwLnkgKyByb2xsU2l6ZSArIG1hcmdpblRvcCxcbiAgICAgICfQn9GA0L7Qs9GA0LXRgdGBIDAgJScsXG4gICAgICBFbmdpbmUudGV4dFN0eWxlXG4gICAgKTtcblxuICAgIHRoaXMuX3Byb2dyZXNzTGFibGUuYW5jaG9yLnNldFRvKDAuNSk7XG4gIH0sXG5cbiAgX2FkZEluZm9MYWJsZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1hcmlnblRvcCA9IDI1O1xuXG4gICAgdGhpcy5faW5mb1RleHQgPSB0aGlzLmFkZC50ZXh0KFxuICAgICAgdGhpcy5nYW1lLndvcmxkLmNlbnRlclgsXG4gICAgICBtYXJpZ25Ub3AsXG4gICAgICAn0JLRi9GH0LjRgdC70LXQvdC40LUg0YDQtdC30YPQu9GM0YLQsNGC0LAuLi4nLFxuICAgICAgRW5naW5lLnRleHRTdHlsZVxuICAgICk7XG5cbiAgICB0aGlzLl9pbmZvVGV4dC5hbmNob3Iuc2V0VG8oMC41KTtcbiAgfSxcblxuICBfc3RhcnRSb2xsOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9hY3RpdmVSb2xsU3ByaXRlID0gMDtcbiAgICB0aGlzLl9yb2xsc1swXS52aXNpYmxlID0gdHJ1ZTtcblxuICAgIHRoaXMuX3RpbWVyID0gdGhpcy50aW1lLmNyZWF0ZSgpO1xuICAgIHRoaXMuX3RpbWVyLmxvb3AoNzUsIHRoaXMuX3JvbGwsIHRoaXMpO1xuICAgIHRoaXMuX3RpbWVyLnN0YXJ0KCk7XG4gIH0sXG5cbiAgX3JvbGw6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3JvbGxzW3RoaXMuX2FjdGl2ZVJvbGxTcHJpdGVdLnZpc2libGUgPSBmYWxzZTtcblxuICAgIHRoaXMuX2FjdGl2ZVJvbGxTcHJpdGUrKztcblxuICAgIGlmICh0aGlzLl9hY3RpdmVSb2xsU3ByaXRlID4gRW5naW5lLlJPTExfU0xJREVfQ09VTlQgLSAxKSB7XG4gICAgICB0aGlzLl9hY3RpdmVSb2xsU3ByaXRlID0gMDtcbiAgICB9XG5cbiAgICB0aGlzLl9yb2xsc1t0aGlzLl9hY3RpdmVSb2xsU3ByaXRlXS52aXNpYmxlID0gdHJ1ZTtcbiAgfSxcblxuICBfc3RhcnRQcm9ncmVzczogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fcHJvZ3Jlc3NUaW1lciA9IHRoaXMudGltZS5jcmVhdGUoKTtcbiAgICB0aGlzLl9wcm9ncmVzc1RpbWVyLnJlcGVhdChcbiAgICAgIHRoaXMuX3RpbWVQcm9ncmVzcyAvIHRoaXMuX2NvdW50VGljayxcbiAgICAgIHRoaXMuX2NvdW50VGljayxcbiAgICAgIHRoaXMuX3VwZGF0ZVByb2dyZXNzLFxuICAgICAgdGhpc1xuICAgICk7XG4gICAgdGhpcy5fcHJvZ3Jlc3NUaW1lci5zdGFydCgpO1xuICAgIHRoaXMuX3Byb2dyZXNzVGltZXIub25Db21wbGV0ZS5hZGQodGhpcy5fZmluaXNoQ2FsYywgdGhpcyk7XG4gIH0sXG5cbiAgX3VwZGF0ZVByb2dyZXNzOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9wcm9ncmVzcysrO1xuICAgIHRoaXMuX3Byb2dyZXNzTGFibGUudGV4dCA9ICfQn9GA0L7Qs9GA0LXRgdGBICcgKyBNYXRoLmZsb29yKCh0aGlzLl9wcm9ncmVzcyAvIHRoaXMuX2NvdW50VGljaykgKiAxMDApICsgJyAlJztcbiAgfSxcblxuICBfZmluaXNoQ2FsYzogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fdGltZXIuc3RvcCgpO1xuXG4gICAgdGhpcy5fcm9sbHNbdGhpcy5fYWN0aXZlUm9sbFNwcml0ZV0udmlzaWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuX3Jlc3VsdFBva2Vtb24udmlzaWJsZSA9IHRydWU7XG5cbiAgICB0aGlzLl9pbmZvVGV4dC52aXNpYmxlID0gZmFsc2U7XG5cbiAgICB2YXIgcG9rZW1vbk5hbWUgPSBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoRW5naW5lLlBva2Vtb25EQi5wb2tlbW9uc1tFbmdpbmUucm5kUG9rZW1vbiAtIDFdLmlkZW50aWZpZXIpO1xuICAgIHRoaXMuX3Byb2dyZXNzTGFibGUudGV4dCA9ICfQryDQv9C+0YXQvtC2INC90LAgJyArIHBva2Vtb25OYW1lO1xuXG4gICAgdGhpcy5fYWRkQnRucygpO1xuICB9LFxuXG4gIF9hZGRBZHM6IGZ1bmN0aW9uKCkge1xuICAgIC8vIFRPRE86IG1ha2UgQURTIGZ1bmN0aW9uXG4gIH0sXG5cbiAgX2FkZEJ0bnM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBtYXJnaW4gPSA1MDtcbiAgICB2YXIgYnRuU2hhcmUgPSB0aGlzLl9hZGRTaGFyZUJ0bigpO1xuICAgIHZhciBidG5SZXBlYXQgPSB0aGlzLl9hZGRSZXBlYXRCdG4oKTtcblxuICAgIGJ0blNoYXJlLnkgLT0gbWFyZ2luO1xuICAgIGJ0blJlcGVhdC55ICs9IG1hcmdpbjtcbiAgfSxcblxuICBfYWRkU2hhcmVCdG46IGZ1bmN0aW9uKCkge1xuICAgIHZhciBidG5TaGFyZSA9IHRoaXMuYWRkLmJ1dHRvbihcbiAgICAgIEVuZ2luZS5HQU1FX1dJRFRIICogMC43NSxcbiAgICAgIEVuZ2luZS5HQU1FX0hFSUdIVCAvIDIsXG4gICAgICAnc2hhcmUtYnRuJyxcbiAgICAgIHRoaXMuX3NoYXJlRGF0YSxcbiAgICAgIHRoaXNcbiAgICApO1xuXG4gICAgYnRuU2hhcmUuYW5jaG9yLnNldFRvKDAuNSk7XG5cbiAgICByZXR1cm4gYnRuU2hhcmU7XG4gIH0sXG5cbiAgX2FkZFJlcGVhdEJ0bjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGJ0blJlYXBlYXQgPSB0aGlzLmFkZC5idXR0b24oXG4gICAgICBFbmdpbmUuR0FNRV9XSURUSCAqIDAuNzUsXG4gICAgICBFbmdpbmUuR0FNRV9IRUlHSFQgLyAyLFxuICAgICAgJ3JlcGVhdC1idG4nLFxuICAgICAgdGhpcy5fcmVwZWF0R2FtZSxcbiAgICAgIHRoaXNcbiAgICApO1xuXG4gICAgYnRuUmVhcGVhdC5hbmNob3Iuc2V0VG8oMC41KTtcblxuICAgIHJldHVybiBidG5SZWFwZWF0O1xuICB9LFxuXG4gIF9zaGFyZURhdGE6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXRhID0gdGhpcy5nYW1lLmNhbnZhcy50b0RhdGFVUkwoKTtcbiAgICAvLyBUT0RPOiBtYWtlIFNoYXJlIGRhdGFcbiAgfSxcblxuICBfcmVwZWF0R2FtZTogZnVuY3Rpb24oKSB7XG4gICAgRW5naW5lLnJuZFBva2Vtb24gPSB0aGlzLmdhbWUucm5kLmJldHdlZW4oMSwgNzIxKTtcbiAgICB0aGlzLnN0YXRlLnN0YXJ0KCdQcmVsb2FkZXInKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcbn1cbiIsIi8qKlxuICogQ3JlYXRlIGltYWdlcyBvZiBwb2tlbW9uXG4gKiBAcGFyYW0ge1t0eXBlXX0gZ2FtZSBbZGVzY3JpcHRpb25dXG4gKi9cbkVuZ2luZS5HZW5lcmF0b3IgPSBmdW5jdGlvbihnYW1lKSB7XG4gIHRoaXMuY291bnRlciA9IDA7XG4gIHRoaXMuX2xhc3RQb2tlbW9uID0gbnVsbDtcbiAgZ2FtZS5wcmVzZXJ2ZURyYXdpbmdCdWZmZXIgPSB0cnVlO1xufVxuXG5FbmdpbmUuR2VuZXJhdG9yLnByb3RvdHlwZSA9IHtcbiAgcHJlbG9hZDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5sb2FkLnRleHQoJ3Bva2Vtb24uY3N2JywgJ2Fzc2V0cy9kYXRhL3Bva2Vtb24uY3N2Jyk7XG4gICAgdGhpcy5sb2FkLmltYWdlKCdway1iZycsICdhc3NldHMvaW1hZ2VzL2JhY2tncm91bmQvYmctcGsuanBnJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSA3MjE7IGkrKykge1xuICAgICAgdGhpcy5sb2FkLmltYWdlKCdway0nICsgaSwgJ2Fzc2V0cy9pbWFnZXMvcG9rZW1vbnMvJyArIGkgKyAnLnBuZycpO1xuICAgIH1cblxuICAgIHRoaXMuX2luaXRTb2NrZXQoKTtcbiAgfSxcblxuICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xuICAgIEVuZ2luZS5Qb2tlbW9uREIubG9hZCh0aGlzLmNhY2hlLmdldFRleHQoJ3Bva2Vtb24uY3N2JykpO1xuXG4gICAgdGhpcy5fYWRkQkcoKTtcbiAgICB0aGlzLl9hZGRXYXRlcm1hcmsoKTtcbiAgICB0aGlzLl9hZGRMYWJsZSgpO1xuXG4gICAgc2V0VGltZW91dCh0aGlzLl9uZXh0UG9rZW1vbi5iaW5kKHRoaXMpLCAzMDAwKTtcbiAgfSxcblxuICBfaW5pdFNvY2tldDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zb2NrZXQgPSBpbygnaHR0cDovL2xvY2FsaG9zdDo4MDgxJyk7XG4gIH0sXG5cbiAgX2FkZEJHOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmJnID0gdGhpcy5hZGQuaW1hZ2UoMCwgMCwgJ3BrLWJnJyk7XG4gIH0sXG5cbiAgX2FkZFdhdGVybWFyazogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0eWxlID0ge1xuICAgICAgZmlsbDogJyNiYWJhYmEnLFxuICAgICAgZm9udDogJzMwcHggT3BlbiBTYW5zJyxcbiAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgIH07XG5cbiAgICB2YXIgd2F0ZXJtYXJrID0gdGhpcy5hZGQudGV4dChFbmdpbmUuR0FNRV9XSURUSCAvIDIsIDUwLCBFbmdpbmUuQVBQX05BTUUsIHN0eWxlKTtcbiAgICB3YXRlcm1hcmsuYW5jaG9yLnNldFRvKDAuNSk7XG4gIH0sXG5cbiAgX2FkZExhYmxlOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3R5bGUgPSB7XG4gICAgICBmaWxsOiAnIzMzMzMzMycsXG4gICAgICBmb250OiAnNTBweCBPcGVuIFNhbnMnLFxuICAgICAgYWxpZ246ICdjZW50ZXInXG4gICAgfTtcblxuICAgIHRoaXMubGFibGUgPSB0aGlzLmFkZC50ZXh0KEVuZ2luZS5HQU1FX1dJRFRIIC8gNCwgRW5naW5lLkdBTUVfSEVJR0hUIC8gMiwgJycsIHN0eWxlKTtcbiAgICB0aGlzLmxhYmxlLmFuY2hvci5zZXRUbygwLjUpO1xuICB9LFxuXG4gIF9jcmVhdGVCRzogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGJtZCA9IHRoaXMuYWRkLmJpdG1hcERhdGEoRW5naW5lLkdBTUVfV0lEVEgsIEVuZ2luZS5HQU1FX0hFSUdIVCk7XG5cbiAgICBibWQuY3R4LmJlZ2luUGF0aCgpO1xuICAgIGJtZC5jdHgucmVjdCgwLCAwLCBFbmdpbmUuR0FNRV9XSURUSCwgRW5naW5lLkdBTUVfSEVJR0hUKTtcbiAgICBibWQuY3R4LmZpbGxTdHlsZSA9ICdyZ2IoMjU1LCAyNTUsIDI1NSknO1xuICAgIGJtZC5jdHguZmlsbCgpO1xuXG4gICAgdGhpcy5jYWNoZS5hZGRCaXRtYXBEYXRhKCdway1iZycsIGJtZCk7XG4gIH0sXG5cbiAgX25leHRQb2tlbW9uOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmNvdW50ZXIrKztcblxuICAgIHRoaXMuX2NoYW5nZVBva2Vtb24oKTtcbiAgICB0aGlzLl9zYXZlKCk7XG5cbiAgICBpZiAodGhpcy5jb3VudGVyIDwgNzIxKSB7XG4gICAgICBzZXRUaW1lb3V0KHRoaXMuX25leHRQb2tlbW9uLmJpbmQodGhpcyksIDMwMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnSSBhbSBmaW5pc2ghKSknKTtcbiAgICB9XG4gIH0sXG5cbiAgX2NoYW5nZVBva2Vtb246IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwb2tlbW9uID0gdGhpcy5hZGQuc3ByaXRlKHRoaXMuZ2FtZS53aWR0aCAqIDMgLyA0LCB0aGlzLmdhbWUuaGVpZ2h0IC8gMiwgJ3BrLScgKyB0aGlzLmNvdW50ZXIpO1xuICAgIHBva2Vtb24uYW5jaG9yLnNldFRvKDAuNSk7XG5cbiAgICB2YXIgcHJlU3RyaW5nID0gJ9CvINC/0L4g0YXQsNGA0LDQutGC0LXRgNGDXFxyXFxuJztcbiAgICB2YXIgcG9rZW1vbk5hbWUgPSBFbmdpbmUuUG9rZW1vbkRCLnBva2Vtb25zW3RoaXMuY291bnRlciAtIDFdLmlkZW50aWZpZXI7XG5cbiAgICB0aGlzLmxhYmxlLnRleHQgPSBwcmVTdHJpbmcgKyBjYXBpdGFsaXplRmlyc3RMZXR0ZXIocG9rZW1vbk5hbWUpO1xuICAgIHRoaXMubGFibGUuYWRkRm9udFdlaWdodCgnYm9sZGVyJywgcHJlU3RyaW5nLmxlbmd0aCAtIDIpO1xuXG4gICAgaWYgKHRoaXMuX2xhc3RQb2tlbW9uICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9sYXN0UG9rZW1vbi5raWxsKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fbGFzdFBva2Vtb24gPSBwb2tlbW9uO1xuICB9LFxuXG4gIF9zYXZlOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaW1hZ2UgPSB0aGlzLmdhbWUuY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTtcbiAgICB2YXIgaWQgPSB0aGlzLmNvdW50ZXI7XG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBiaW46IGltYWdlLFxuICAgICAgaWQ6IGlkXG4gICAgfVxuXG4gICAgdGhpcy5zb2NrZXQuZW1pdCgnaW1nJywgZGF0YSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG59XG4iLCJFbmdpbmUuR0FNRV9XSURUSCA9IDEwMDA7XG5FbmdpbmUuR0FNRV9IRUlHSFQgPSA2NDA7XG5FbmdpbmUuQVBQX05BTUUgPSAndmsuY29tL2FwcDU1ODc5ODknO1xuRW5naW5lLkRFQlVHID0gdHJ1ZTtcblxudmFyIGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoRW5naW5lLkdBTUVfV0lEVEgsIEVuZ2luZS5HQU1FX0hFSUdIVCwgUGhhc2VyLkFVVE8sICdnYW1lJyk7XG5cbkVuZ2luZS5ST0xMX1NMSURFX0NPVU5UID0gNTA7XG5FbmdpbmUucm5kUG9rZW1vbiA9IGdhbWUucm5kLmJldHdlZW4oMSwgNzIxKTtcblxuZ2FtZS5zdGF0ZS5hZGQoJ0Jvb3QnLCBFbmdpbmUuQm9vdCk7XG5nYW1lLnN0YXRlLmFkZCgnUHJlbG9hZGVyJywgRW5naW5lLlByZWxvYWRlcik7XG5nYW1lLnN0YXRlLmFkZCgnR2FtZScsIEVuZ2luZS5HYW1lKTtcbmdhbWUuc3RhdGUuYWRkKCdDYWxjdWxhdGUnLCBFbmdpbmUuQ2FsY3VsYXRlKTtcblxuZ2FtZS5zdGF0ZS5zdGFydCgnQm9vdCcpO1xuLy8gZ2FtZS5zdGF0ZS5zdGFydCgnR2VuJyk7XG4iLCJFbmdpbmUuUG9rZW1vbkRCID0ge1xuICBsb2FkOiBmdW5jdGlvbihkYXRhVGV4dCkge1xuICAgIHRoaXMucG9rZW1vbnMgPSBbXTtcbiAgICB2YXIgZGF0YSA9IFBhcGEucGFyc2UoZGF0YVRleHQpLmRhdGE7XG4gICAgdmFyIGZpZWxkcyA9IGRhdGFbMF07XG5cbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwb2tlbW9uRGF0YSA9IGRhdGFbaV07XG4gICAgICB2YXIgcG9rZW1vbk9iaiA9IHt9O1xuXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGZpZWxkcy5sZW5ndGg7IGorKykge1xuICAgICAgICBwb2tlbW9uT2JqW2ZpZWxkc1tqXV0gPSBwb2tlbW9uRGF0YVtqXTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wb2tlbW9ucy5wdXNoKHBva2Vtb25PYmopO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
