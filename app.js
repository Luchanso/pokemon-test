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
    this.load.text('data.json', 'assets/data/data.json');

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

    Engine.data = JSON.parse(this.cache.getText('data.json'));

    Engine.loader.start();

    this.state.start('Game');
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
    this._adsIsRun = false;

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

    if ((this._progress / this._countTick) > 0.5 && !this._adsIsRun) {
      this._adsIsRun = true;
      this._addAds();
    }
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
    VK.startPreroll();

    // if (this.game.rnd.pick([-1, 1]) === 1) {
    //   VK.startPreroll();
    // } else {
    //   VK.startAds();
    // }
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
    VK.publicatePhoto(Engine.rndPokemon);
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
    VK.user_id = null;
    VK.app_id = 5587989;
    VK.preroll = new VKAdman();
    // VK.preroll.setupPreroll(VK.app_id);

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
  console.log(VK.preroll);

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcGFwYXJzZS5taW4uanMiLCJib290LmpzIiwicHJlbG9hZGVyLmpzIiwiYW5zd2VyLmpzIiwiZ2FtZS5qcyIsInBva2ViYWxsLXN5cy5qcyIsInNsaWRlLmpzIiwiY2FsY3VsYXRlLmpzIiwiZ2VuZXJhdG9yLmpzIiwiYXBwLmpzIiwicG9rZW1vbkRCLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcclxuXHRQYXBhIFBhcnNlXHJcblx0djQuMS4yXHJcblx0aHR0cHM6Ly9naXRodWIuY29tL21ob2x0L1BhcGFQYXJzZVxyXG4qL1xyXG4hZnVuY3Rpb24oZSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdCh0LHIpe2lmKHI9cnx8e30sci53b3JrZXImJlMuV09SS0VSU19TVVBQT1JURUQpe3ZhciBuPWYoKTtyZXR1cm4gbi51c2VyU3RlcD1yLnN0ZXAsbi51c2VyQ2h1bms9ci5jaHVuayxuLnVzZXJDb21wbGV0ZT1yLmNvbXBsZXRlLG4udXNlckVycm9yPXIuZXJyb3Isci5zdGVwPW0oci5zdGVwKSxyLmNodW5rPW0oci5jaHVuayksci5jb21wbGV0ZT1tKHIuY29tcGxldGUpLHIuZXJyb3I9bShyLmVycm9yKSxkZWxldGUgci53b3JrZXIsdm9pZCBuLnBvc3RNZXNzYWdlKHtpbnB1dDp0LGNvbmZpZzpyLHdvcmtlcklkOm4uaWR9KX12YXIgbz1udWxsO3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiB0P289ci5kb3dubG9hZD9uZXcgaShyKTpuZXcgYShyKTooZS5GaWxlJiZ0IGluc3RhbmNlb2YgRmlsZXx8dCBpbnN0YW5jZW9mIE9iamVjdCkmJihvPW5ldyBzKHIpKSxvLnN0cmVhbSh0KX1mdW5jdGlvbiByKGUsdCl7ZnVuY3Rpb24gcigpe1wib2JqZWN0XCI9PXR5cGVvZiB0JiYoXCJzdHJpbmdcIj09dHlwZW9mIHQuZGVsaW1pdGVyJiYxPT10LmRlbGltaXRlci5sZW5ndGgmJi0xPT1TLkJBRF9ERUxJTUlURVJTLmluZGV4T2YodC5kZWxpbWl0ZXIpJiYodT10LmRlbGltaXRlciksKFwiYm9vbGVhblwiPT10eXBlb2YgdC5xdW90ZXN8fHQucXVvdGVzIGluc3RhbmNlb2YgQXJyYXkpJiYobz10LnF1b3RlcyksXCJzdHJpbmdcIj09dHlwZW9mIHQubmV3bGluZSYmKGg9dC5uZXdsaW5lKSl9ZnVuY3Rpb24gbihlKXtpZihcIm9iamVjdFwiIT10eXBlb2YgZSlyZXR1cm5bXTt2YXIgdD1bXTtmb3IodmFyIHIgaW4gZSl0LnB1c2gocik7cmV0dXJuIHR9ZnVuY3Rpb24gaShlLHQpe3ZhciByPVwiXCI7XCJzdHJpbmdcIj09dHlwZW9mIGUmJihlPUpTT04ucGFyc2UoZSkpLFwic3RyaW5nXCI9PXR5cGVvZiB0JiYodD1KU09OLnBhcnNlKHQpKTt2YXIgbj1lIGluc3RhbmNlb2YgQXJyYXkmJmUubGVuZ3RoPjAsaT0hKHRbMF1pbnN0YW5jZW9mIEFycmF5KTtpZihuKXtmb3IodmFyIGE9MDthPGUubGVuZ3RoO2ErKylhPjAmJihyKz11KSxyKz1zKGVbYV0sYSk7dC5sZW5ndGg+MCYmKHIrPWgpfWZvcih2YXIgbz0wO288dC5sZW5ndGg7bysrKXtmb3IodmFyIGY9bj9lLmxlbmd0aDp0W29dLmxlbmd0aCxjPTA7Zj5jO2MrKyl7Yz4wJiYocis9dSk7dmFyIGQ9biYmaT9lW2NdOmM7cis9cyh0W29dW2RdLGMpfW88dC5sZW5ndGgtMSYmKHIrPWgpfXJldHVybiByfWZ1bmN0aW9uIHMoZSx0KXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgZXx8bnVsbD09PWUpcmV0dXJuXCJcIjtlPWUudG9TdHJpbmcoKS5yZXBsYWNlKC9cIi9nLCdcIlwiJyk7dmFyIHI9XCJib29sZWFuXCI9PXR5cGVvZiBvJiZvfHxvIGluc3RhbmNlb2YgQXJyYXkmJm9bdF18fGEoZSxTLkJBRF9ERUxJTUlURVJTKXx8ZS5pbmRleE9mKHUpPi0xfHxcIiBcIj09ZS5jaGFyQXQoMCl8fFwiIFwiPT1lLmNoYXJBdChlLmxlbmd0aC0xKTtyZXR1cm4gcj8nXCInK2UrJ1wiJzplfWZ1bmN0aW9uIGEoZSx0KXtmb3IodmFyIHI9MDtyPHQubGVuZ3RoO3IrKylpZihlLmluZGV4T2YodFtyXSk+LTEpcmV0dXJuITA7cmV0dXJuITF9dmFyIG89ITEsdT1cIixcIixoPVwiXFxyXFxuXCI7aWYocigpLFwic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1KU09OLnBhcnNlKGUpKSxlIGluc3RhbmNlb2YgQXJyYXkpe2lmKCFlLmxlbmd0aHx8ZVswXWluc3RhbmNlb2YgQXJyYXkpcmV0dXJuIGkobnVsbCxlKTtpZihcIm9iamVjdFwiPT10eXBlb2YgZVswXSlyZXR1cm4gaShuKGVbMF0pLGUpfWVsc2UgaWYoXCJvYmplY3RcIj09dHlwZW9mIGUpcmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGUuZGF0YSYmKGUuZGF0YT1KU09OLnBhcnNlKGUuZGF0YSkpLGUuZGF0YSBpbnN0YW5jZW9mIEFycmF5JiYoZS5maWVsZHN8fChlLmZpZWxkcz1lLmRhdGFbMF1pbnN0YW5jZW9mIEFycmF5P2UuZmllbGRzOm4oZS5kYXRhWzBdKSksZS5kYXRhWzBdaW5zdGFuY2VvZiBBcnJheXx8XCJvYmplY3RcIj09dHlwZW9mIGUuZGF0YVswXXx8KGUuZGF0YT1bZS5kYXRhXSkpLGkoZS5maWVsZHN8fFtdLGUuZGF0YXx8W10pO3Rocm93XCJleGNlcHRpb246IFVuYWJsZSB0byBzZXJpYWxpemUgdW5yZWNvZ25pemVkIGlucHV0XCJ9ZnVuY3Rpb24gbih0KXtmdW5jdGlvbiByKGUpe3ZhciB0PV8oZSk7dC5jaHVua1NpemU9cGFyc2VJbnQodC5jaHVua1NpemUpLGUuc3RlcHx8ZS5jaHVua3x8KHQuY2h1bmtTaXplPW51bGwpLHRoaXMuX2hhbmRsZT1uZXcgbyh0KSx0aGlzLl9oYW5kbGUuc3RyZWFtZXI9dGhpcyx0aGlzLl9jb25maWc9dH10aGlzLl9oYW5kbGU9bnVsbCx0aGlzLl9wYXVzZWQ9ITEsdGhpcy5fZmluaXNoZWQ9ITEsdGhpcy5faW5wdXQ9bnVsbCx0aGlzLl9iYXNlSW5kZXg9MCx0aGlzLl9wYXJ0aWFsTGluZT1cIlwiLHRoaXMuX3Jvd0NvdW50PTAsdGhpcy5fc3RhcnQ9MCx0aGlzLl9uZXh0Q2h1bms9bnVsbCx0aGlzLmlzRmlyc3RDaHVuaz0hMCx0aGlzLl9jb21wbGV0ZVJlc3VsdHM9e2RhdGE6W10sZXJyb3JzOltdLG1ldGE6e319LHIuY2FsbCh0aGlzLHQpLHRoaXMucGFyc2VDaHVuaz1mdW5jdGlvbih0KXtpZih0aGlzLmlzRmlyc3RDaHVuayYmbSh0aGlzLl9jb25maWcuYmVmb3JlRmlyc3RDaHVuaykpe3ZhciByPXRoaXMuX2NvbmZpZy5iZWZvcmVGaXJzdENodW5rKHQpO3ZvaWQgMCE9PXImJih0PXIpfXRoaXMuaXNGaXJzdENodW5rPSExO3ZhciBuPXRoaXMuX3BhcnRpYWxMaW5lK3Q7dGhpcy5fcGFydGlhbExpbmU9XCJcIjt2YXIgaT10aGlzLl9oYW5kbGUucGFyc2Uobix0aGlzLl9iYXNlSW5kZXgsIXRoaXMuX2ZpbmlzaGVkKTtpZighdGhpcy5faGFuZGxlLnBhdXNlZCgpJiYhdGhpcy5faGFuZGxlLmFib3J0ZWQoKSl7dmFyIHM9aS5tZXRhLmN1cnNvcjt0aGlzLl9maW5pc2hlZHx8KHRoaXMuX3BhcnRpYWxMaW5lPW4uc3Vic3RyaW5nKHMtdGhpcy5fYmFzZUluZGV4KSx0aGlzLl9iYXNlSW5kZXg9cyksaSYmaS5kYXRhJiYodGhpcy5fcm93Q291bnQrPWkuZGF0YS5sZW5ndGgpO3ZhciBhPXRoaXMuX2ZpbmlzaGVkfHx0aGlzLl9jb25maWcucHJldmlldyYmdGhpcy5fcm93Q291bnQ+PXRoaXMuX2NvbmZpZy5wcmV2aWV3O2lmKHkpZS5wb3N0TWVzc2FnZSh7cmVzdWx0czppLHdvcmtlcklkOlMuV09SS0VSX0lELGZpbmlzaGVkOmF9KTtlbHNlIGlmKG0odGhpcy5fY29uZmlnLmNodW5rKSl7aWYodGhpcy5fY29uZmlnLmNodW5rKGksdGhpcy5faGFuZGxlKSx0aGlzLl9wYXVzZWQpcmV0dXJuO2k9dm9pZCAwLHRoaXMuX2NvbXBsZXRlUmVzdWx0cz12b2lkIDB9cmV0dXJuIHRoaXMuX2NvbmZpZy5zdGVwfHx0aGlzLl9jb25maWcuY2h1bmt8fCh0aGlzLl9jb21wbGV0ZVJlc3VsdHMuZGF0YT10aGlzLl9jb21wbGV0ZVJlc3VsdHMuZGF0YS5jb25jYXQoaS5kYXRhKSx0aGlzLl9jb21wbGV0ZVJlc3VsdHMuZXJyb3JzPXRoaXMuX2NvbXBsZXRlUmVzdWx0cy5lcnJvcnMuY29uY2F0KGkuZXJyb3JzKSx0aGlzLl9jb21wbGV0ZVJlc3VsdHMubWV0YT1pLm1ldGEpLCFhfHwhbSh0aGlzLl9jb25maWcuY29tcGxldGUpfHxpJiZpLm1ldGEuYWJvcnRlZHx8dGhpcy5fY29uZmlnLmNvbXBsZXRlKHRoaXMuX2NvbXBsZXRlUmVzdWx0cyksYXx8aSYmaS5tZXRhLnBhdXNlZHx8dGhpcy5fbmV4dENodW5rKCksaX19LHRoaXMuX3NlbmRFcnJvcj1mdW5jdGlvbih0KXttKHRoaXMuX2NvbmZpZy5lcnJvcik/dGhpcy5fY29uZmlnLmVycm9yKHQpOnkmJnRoaXMuX2NvbmZpZy5lcnJvciYmZS5wb3N0TWVzc2FnZSh7d29ya2VySWQ6Uy5XT1JLRVJfSUQsZXJyb3I6dCxmaW5pc2hlZDohMX0pfX1mdW5jdGlvbiBpKGUpe2Z1bmN0aW9uIHQoZSl7dmFyIHQ9ZS5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtUmFuZ2VcIik7cmV0dXJuIHBhcnNlSW50KHQuc3Vic3RyKHQubGFzdEluZGV4T2YoXCIvXCIpKzEpKX1lPWV8fHt9LGUuY2h1bmtTaXplfHwoZS5jaHVua1NpemU9Uy5SZW1vdGVDaHVua1NpemUpLG4uY2FsbCh0aGlzLGUpO3ZhciByO3RoaXMuX25leHRDaHVuaz1rP2Z1bmN0aW9uKCl7dGhpcy5fcmVhZENodW5rKCksdGhpcy5fY2h1bmtMb2FkZWQoKX06ZnVuY3Rpb24oKXt0aGlzLl9yZWFkQ2h1bmsoKX0sdGhpcy5zdHJlYW09ZnVuY3Rpb24oZSl7dGhpcy5faW5wdXQ9ZSx0aGlzLl9uZXh0Q2h1bmsoKX0sdGhpcy5fcmVhZENodW5rPWZ1bmN0aW9uKCl7aWYodGhpcy5fZmluaXNoZWQpcmV0dXJuIHZvaWQgdGhpcy5fY2h1bmtMb2FkZWQoKTtpZihyPW5ldyBYTUxIdHRwUmVxdWVzdCxrfHwoci5vbmxvYWQ9Zyh0aGlzLl9jaHVua0xvYWRlZCx0aGlzKSxyLm9uZXJyb3I9Zyh0aGlzLl9jaHVua0Vycm9yLHRoaXMpKSxyLm9wZW4oXCJHRVRcIix0aGlzLl9pbnB1dCwhayksdGhpcy5fY29uZmlnLmNodW5rU2l6ZSl7dmFyIGU9dGhpcy5fc3RhcnQrdGhpcy5fY29uZmlnLmNodW5rU2l6ZS0xO3Iuc2V0UmVxdWVzdEhlYWRlcihcIlJhbmdlXCIsXCJieXRlcz1cIit0aGlzLl9zdGFydCtcIi1cIitlKSxyLnNldFJlcXVlc3RIZWFkZXIoXCJJZi1Ob25lLU1hdGNoXCIsXCJ3ZWJraXQtbm8tY2FjaGVcIil9dHJ5e3Iuc2VuZCgpfWNhdGNoKHQpe3RoaXMuX2NodW5rRXJyb3IodC5tZXNzYWdlKX1rJiYwPT1yLnN0YXR1cz90aGlzLl9jaHVua0Vycm9yKCk6dGhpcy5fc3RhcnQrPXRoaXMuX2NvbmZpZy5jaHVua1NpemV9LHRoaXMuX2NodW5rTG9hZGVkPWZ1bmN0aW9uKCl7aWYoND09ci5yZWFkeVN0YXRlKXtpZihyLnN0YXR1czwyMDB8fHIuc3RhdHVzPj00MDApcmV0dXJuIHZvaWQgdGhpcy5fY2h1bmtFcnJvcigpO3RoaXMuX2ZpbmlzaGVkPSF0aGlzLl9jb25maWcuY2h1bmtTaXplfHx0aGlzLl9zdGFydD50KHIpLHRoaXMucGFyc2VDaHVuayhyLnJlc3BvbnNlVGV4dCl9fSx0aGlzLl9jaHVua0Vycm9yPWZ1bmN0aW9uKGUpe3ZhciB0PXIuc3RhdHVzVGV4dHx8ZTt0aGlzLl9zZW5kRXJyb3IodCl9fWZ1bmN0aW9uIHMoZSl7ZT1lfHx7fSxlLmNodW5rU2l6ZXx8KGUuY2h1bmtTaXplPVMuTG9jYWxDaHVua1NpemUpLG4uY2FsbCh0aGlzLGUpO3ZhciB0LHIsaT1cInVuZGVmaW5lZFwiIT10eXBlb2YgRmlsZVJlYWRlcjt0aGlzLnN0cmVhbT1mdW5jdGlvbihlKXt0aGlzLl9pbnB1dD1lLHI9ZS5zbGljZXx8ZS53ZWJraXRTbGljZXx8ZS5tb3pTbGljZSxpPyh0PW5ldyBGaWxlUmVhZGVyLHQub25sb2FkPWcodGhpcy5fY2h1bmtMb2FkZWQsdGhpcyksdC5vbmVycm9yPWcodGhpcy5fY2h1bmtFcnJvcix0aGlzKSk6dD1uZXcgRmlsZVJlYWRlclN5bmMsdGhpcy5fbmV4dENodW5rKCl9LHRoaXMuX25leHRDaHVuaz1mdW5jdGlvbigpe3RoaXMuX2ZpbmlzaGVkfHx0aGlzLl9jb25maWcucHJldmlldyYmISh0aGlzLl9yb3dDb3VudDx0aGlzLl9jb25maWcucHJldmlldyl8fHRoaXMuX3JlYWRDaHVuaygpfSx0aGlzLl9yZWFkQ2h1bms9ZnVuY3Rpb24oKXt2YXIgZT10aGlzLl9pbnB1dDtpZih0aGlzLl9jb25maWcuY2h1bmtTaXplKXt2YXIgbj1NYXRoLm1pbih0aGlzLl9zdGFydCt0aGlzLl9jb25maWcuY2h1bmtTaXplLHRoaXMuX2lucHV0LnNpemUpO2U9ci5jYWxsKGUsdGhpcy5fc3RhcnQsbil9dmFyIHM9dC5yZWFkQXNUZXh0KGUsdGhpcy5fY29uZmlnLmVuY29kaW5nKTtpfHx0aGlzLl9jaHVua0xvYWRlZCh7dGFyZ2V0OntyZXN1bHQ6c319KX0sdGhpcy5fY2h1bmtMb2FkZWQ9ZnVuY3Rpb24oZSl7dGhpcy5fc3RhcnQrPXRoaXMuX2NvbmZpZy5jaHVua1NpemUsdGhpcy5fZmluaXNoZWQ9IXRoaXMuX2NvbmZpZy5jaHVua1NpemV8fHRoaXMuX3N0YXJ0Pj10aGlzLl9pbnB1dC5zaXplLHRoaXMucGFyc2VDaHVuayhlLnRhcmdldC5yZXN1bHQpfSx0aGlzLl9jaHVua0Vycm9yPWZ1bmN0aW9uKCl7dGhpcy5fc2VuZEVycm9yKHQuZXJyb3IpfX1mdW5jdGlvbiBhKGUpe2U9ZXx8e30sbi5jYWxsKHRoaXMsZSk7dmFyIHQscjt0aGlzLnN0cmVhbT1mdW5jdGlvbihlKXtyZXR1cm4gdD1lLHI9ZSx0aGlzLl9uZXh0Q2h1bmsoKX0sdGhpcy5fbmV4dENodW5rPWZ1bmN0aW9uKCl7aWYoIXRoaXMuX2ZpbmlzaGVkKXt2YXIgZT10aGlzLl9jb25maWcuY2h1bmtTaXplLHQ9ZT9yLnN1YnN0cigwLGUpOnI7cmV0dXJuIHI9ZT9yLnN1YnN0cihlKTpcIlwiLHRoaXMuX2ZpbmlzaGVkPSFyLHRoaXMucGFyc2VDaHVuayh0KX19fWZ1bmN0aW9uIG8oZSl7ZnVuY3Rpb24gdCgpe2lmKGImJmQmJihoKFwiRGVsaW1pdGVyXCIsXCJVbmRldGVjdGFibGVEZWxpbWl0ZXJcIixcIlVuYWJsZSB0byBhdXRvLWRldGVjdCBkZWxpbWl0aW5nIGNoYXJhY3RlcjsgZGVmYXVsdGVkIHRvICdcIitTLkRlZmF1bHREZWxpbWl0ZXIrXCInXCIpLGQ9ITEpLGUuc2tpcEVtcHR5TGluZXMpZm9yKHZhciB0PTA7dDxiLmRhdGEubGVuZ3RoO3QrKykxPT1iLmRhdGFbdF0ubGVuZ3RoJiZcIlwiPT1iLmRhdGFbdF1bMF0mJmIuZGF0YS5zcGxpY2UodC0tLDEpO3JldHVybiByKCkmJm4oKSxpKCl9ZnVuY3Rpb24gcigpe3JldHVybiBlLmhlYWRlciYmMD09eS5sZW5ndGh9ZnVuY3Rpb24gbigpe2lmKGIpe2Zvcih2YXIgZT0wO3IoKSYmZTxiLmRhdGEubGVuZ3RoO2UrKylmb3IodmFyIHQ9MDt0PGIuZGF0YVtlXS5sZW5ndGg7dCsrKXkucHVzaChiLmRhdGFbZV1bdF0pO2IuZGF0YS5zcGxpY2UoMCwxKX19ZnVuY3Rpb24gaSgpe2lmKCFifHwhZS5oZWFkZXImJiFlLmR5bmFtaWNUeXBpbmcpcmV0dXJuIGI7Zm9yKHZhciB0PTA7dDxiLmRhdGEubGVuZ3RoO3QrKyl7Zm9yKHZhciByPXt9LG49MDtuPGIuZGF0YVt0XS5sZW5ndGg7bisrKXtpZihlLmR5bmFtaWNUeXBpbmcpe3ZhciBpPWIuZGF0YVt0XVtuXTtiLmRhdGFbdF1bbl09XCJ0cnVlXCI9PWl8fFwiVFJVRVwiPT1pPyEwOlwiZmFsc2VcIj09aXx8XCJGQUxTRVwiPT1pPyExOm8oaSl9ZS5oZWFkZXImJihuPj15Lmxlbmd0aD8oci5fX3BhcnNlZF9leHRyYXx8KHIuX19wYXJzZWRfZXh0cmE9W10pLHIuX19wYXJzZWRfZXh0cmEucHVzaChiLmRhdGFbdF1bbl0pKTpyW3lbbl1dPWIuZGF0YVt0XVtuXSl9ZS5oZWFkZXImJihiLmRhdGFbdF09cixuPnkubGVuZ3RoP2goXCJGaWVsZE1pc21hdGNoXCIsXCJUb29NYW55RmllbGRzXCIsXCJUb28gbWFueSBmaWVsZHM6IGV4cGVjdGVkIFwiK3kubGVuZ3RoK1wiIGZpZWxkcyBidXQgcGFyc2VkIFwiK24sdCk6bjx5Lmxlbmd0aCYmaChcIkZpZWxkTWlzbWF0Y2hcIixcIlRvb0Zld0ZpZWxkc1wiLFwiVG9vIGZldyBmaWVsZHM6IGV4cGVjdGVkIFwiK3kubGVuZ3RoK1wiIGZpZWxkcyBidXQgcGFyc2VkIFwiK24sdCkpfXJldHVybiBlLmhlYWRlciYmYi5tZXRhJiYoYi5tZXRhLmZpZWxkcz15KSxifWZ1bmN0aW9uIHModCl7Zm9yKHZhciByLG4saSxzPVtcIixcIixcIlx0XCIsXCJ8XCIsXCI7XCIsUy5SRUNPUkRfU0VQLFMuVU5JVF9TRVBdLGE9MDthPHMubGVuZ3RoO2ErKyl7dmFyIG89c1thXSxoPTAsZj0wO2k9dm9pZCAwO2Zvcih2YXIgYz1uZXcgdSh7ZGVsaW1pdGVyOm8scHJldmlldzoxMH0pLnBhcnNlKHQpLGQ9MDtkPGMuZGF0YS5sZW5ndGg7ZCsrKXt2YXIgbD1jLmRhdGFbZF0ubGVuZ3RoO2YrPWwsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGk/bD4xJiYoaCs9TWF0aC5hYnMobC1pKSxpPWwpOmk9bH1jLmRhdGEubGVuZ3RoPjAmJihmLz1jLmRhdGEubGVuZ3RoKSwoXCJ1bmRlZmluZWRcIj09dHlwZW9mIG58fG4+aCkmJmY+MS45OSYmKG49aCxyPW8pfXJldHVybiBlLmRlbGltaXRlcj1yLHtzdWNjZXNzZnVsOiEhcixiZXN0RGVsaW1pdGVyOnJ9fWZ1bmN0aW9uIGEoZSl7ZT1lLnN1YnN0cigwLDEwNDg1NzYpO3ZhciB0PWUuc3BsaXQoXCJcXHJcIik7aWYoMT09dC5sZW5ndGgpcmV0dXJuXCJcXG5cIjtmb3IodmFyIHI9MCxuPTA7bjx0Lmxlbmd0aDtuKyspXCJcXG5cIj09dFtuXVswXSYmcisrO3JldHVybiByPj10Lmxlbmd0aC8yP1wiXFxyXFxuXCI6XCJcXHJcIn1mdW5jdGlvbiBvKGUpe3ZhciB0PWwudGVzdChlKTtyZXR1cm4gdD9wYXJzZUZsb2F0KGUpOmV9ZnVuY3Rpb24gaChlLHQscixuKXtiLmVycm9ycy5wdXNoKHt0eXBlOmUsY29kZTp0LG1lc3NhZ2U6cixyb3c6bn0pfXZhciBmLGMsZCxsPS9eXFxzKi0/KFxcZCpcXC4/XFxkK3xcXGQrXFwuP1xcZCopKGVbLStdP1xcZCspP1xccyokL2kscD10aGlzLGc9MCx2PSExLGs9ITEseT1bXSxiPXtkYXRhOltdLGVycm9yczpbXSxtZXRhOnt9fTtpZihtKGUuc3RlcCkpe3ZhciBSPWUuc3RlcDtlLnN0ZXA9ZnVuY3Rpb24obil7aWYoYj1uLHIoKSl0KCk7ZWxzZXtpZih0KCksMD09Yi5kYXRhLmxlbmd0aClyZXR1cm47Zys9bi5kYXRhLmxlbmd0aCxlLnByZXZpZXcmJmc+ZS5wcmV2aWV3P2MuYWJvcnQoKTpSKGIscCl9fX10aGlzLnBhcnNlPWZ1bmN0aW9uKHIsbixpKXtpZihlLm5ld2xpbmV8fChlLm5ld2xpbmU9YShyKSksZD0hMSwhZS5kZWxpbWl0ZXIpe3ZhciBvPXMocik7by5zdWNjZXNzZnVsP2UuZGVsaW1pdGVyPW8uYmVzdERlbGltaXRlcjooZD0hMCxlLmRlbGltaXRlcj1TLkRlZmF1bHREZWxpbWl0ZXIpLGIubWV0YS5kZWxpbWl0ZXI9ZS5kZWxpbWl0ZXJ9dmFyIGg9XyhlKTtyZXR1cm4gZS5wcmV2aWV3JiZlLmhlYWRlciYmaC5wcmV2aWV3KyssZj1yLGM9bmV3IHUoaCksYj1jLnBhcnNlKGYsbixpKSx0KCksdj97bWV0YTp7cGF1c2VkOiEwfX06Ynx8e21ldGE6e3BhdXNlZDohMX19fSx0aGlzLnBhdXNlZD1mdW5jdGlvbigpe3JldHVybiB2fSx0aGlzLnBhdXNlPWZ1bmN0aW9uKCl7dj0hMCxjLmFib3J0KCksZj1mLnN1YnN0cihjLmdldENoYXJJbmRleCgpKX0sdGhpcy5yZXN1bWU9ZnVuY3Rpb24oKXt2PSExLHAuc3RyZWFtZXIucGFyc2VDaHVuayhmKX0sdGhpcy5hYm9ydGVkPWZ1bmN0aW9uKCl7cmV0dXJuIGt9LHRoaXMuYWJvcnQ9ZnVuY3Rpb24oKXtrPSEwLGMuYWJvcnQoKSxiLm1ldGEuYWJvcnRlZD0hMCxtKGUuY29tcGxldGUpJiZlLmNvbXBsZXRlKGIpLGY9XCJcIn19ZnVuY3Rpb24gdShlKXtlPWV8fHt9O3ZhciB0PWUuZGVsaW1pdGVyLHI9ZS5uZXdsaW5lLG49ZS5jb21tZW50cyxpPWUuc3RlcCxzPWUucHJldmlldyxhPWUuZmFzdE1vZGU7aWYoKFwic3RyaW5nXCIhPXR5cGVvZiB0fHxTLkJBRF9ERUxJTUlURVJTLmluZGV4T2YodCk+LTEpJiYodD1cIixcIiksbj09PXQpdGhyb3dcIkNvbW1lbnQgY2hhcmFjdGVyIHNhbWUgYXMgZGVsaW1pdGVyXCI7bj09PSEwP249XCIjXCI6KFwic3RyaW5nXCIhPXR5cGVvZiBufHxTLkJBRF9ERUxJTUlURVJTLmluZGV4T2Yobik+LTEpJiYobj0hMSksXCJcXG5cIiE9ciYmXCJcXHJcIiE9ciYmXCJcXHJcXG5cIiE9ciYmKHI9XCJcXG5cIik7dmFyIG89MCx1PSExO3RoaXMucGFyc2U9ZnVuY3Rpb24oZSxoLGYpe2Z1bmN0aW9uIGMoZSl7Yi5wdXNoKGUpLFM9b31mdW5jdGlvbiBkKHQpe3JldHVybiBmP3AoKTooXCJ1bmRlZmluZWRcIj09dHlwZW9mIHQmJih0PWUuc3Vic3RyKG8pKSx3LnB1c2godCksbz1nLGModykseSYmXygpLHAoKSl9ZnVuY3Rpb24gbCh0KXtvPXQsYyh3KSx3PVtdLE89ZS5pbmRleE9mKHIsbyl9ZnVuY3Rpb24gcChlKXtyZXR1cm57ZGF0YTpiLGVycm9yczpSLG1ldGE6e2RlbGltaXRlcjp0LGxpbmVicmVhazpyLGFib3J0ZWQ6dSx0cnVuY2F0ZWQ6ISFlLGN1cnNvcjpTKyhofHwwKX19fWZ1bmN0aW9uIF8oKXtpKHAoKSksYj1bXSxSPVtdfWlmKFwic3RyaW5nXCIhPXR5cGVvZiBlKXRocm93XCJJbnB1dCBtdXN0IGJlIGEgc3RyaW5nXCI7dmFyIGc9ZS5sZW5ndGgsbT10Lmxlbmd0aCx2PXIubGVuZ3RoLGs9bi5sZW5ndGgseT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBpO289MDt2YXIgYj1bXSxSPVtdLHc9W10sUz0wO2lmKCFlKXJldHVybiBwKCk7aWYoYXx8YSE9PSExJiYtMT09PWUuaW5kZXhPZignXCInKSl7Zm9yKHZhciBDPWUuc3BsaXQociksRT0wO0U8Qy5sZW5ndGg7RSsrKXt2YXIgdz1DW0VdO2lmKG8rPXcubGVuZ3RoLEUhPT1DLmxlbmd0aC0xKW8rPXIubGVuZ3RoO2Vsc2UgaWYoZilyZXR1cm4gcCgpO2lmKCFufHx3LnN1YnN0cigwLGspIT1uKXtpZih5KXtpZihiPVtdLGMody5zcGxpdCh0KSksXygpLHUpcmV0dXJuIHAoKX1lbHNlIGMody5zcGxpdCh0KSk7aWYocyYmRT49cylyZXR1cm4gYj1iLnNsaWNlKDAscykscCghMCl9fXJldHVybiBwKCl9Zm9yKHZhciB4PWUuaW5kZXhPZih0LG8pLE89ZS5pbmRleE9mKHIsbyk7OylpZignXCInIT1lW29dKWlmKG4mJjA9PT13Lmxlbmd0aCYmZS5zdWJzdHIobyxrKT09PW4pe2lmKC0xPT1PKXJldHVybiBwKCk7bz1PK3YsTz1lLmluZGV4T2YocixvKSx4PWUuaW5kZXhPZih0LG8pfWVsc2UgaWYoLTEhPT14JiYoTz54fHwtMT09PU8pKXcucHVzaChlLnN1YnN0cmluZyhvLHgpKSxvPXgrbSx4PWUuaW5kZXhPZih0LG8pO2Vsc2V7aWYoLTE9PT1PKWJyZWFrO2lmKHcucHVzaChlLnN1YnN0cmluZyhvLE8pKSxsKE8rdikseSYmKF8oKSx1KSlyZXR1cm4gcCgpO2lmKHMmJmIubGVuZ3RoPj1zKXJldHVybiBwKCEwKX1lbHNle3ZhciBJPW87Zm9yKG8rKzs7KXt2YXIgST1lLmluZGV4T2YoJ1wiJyxJKzEpO2lmKC0xPT09SSlyZXR1cm4gZnx8Ui5wdXNoKHt0eXBlOlwiUXVvdGVzXCIsY29kZTpcIk1pc3NpbmdRdW90ZXNcIixtZXNzYWdlOlwiUXVvdGVkIGZpZWxkIHVudGVybWluYXRlZFwiLHJvdzpiLmxlbmd0aCxpbmRleDpvfSksZCgpO2lmKEk9PT1nLTEpe3ZhciBEPWUuc3Vic3RyaW5nKG8sSSkucmVwbGFjZSgvXCJcIi9nLCdcIicpO3JldHVybiBkKEQpfWlmKCdcIichPWVbSSsxXSl7aWYoZVtJKzFdPT10KXt3LnB1c2goZS5zdWJzdHJpbmcobyxJKS5yZXBsYWNlKC9cIlwiL2csJ1wiJykpLG89SSsxK20seD1lLmluZGV4T2YodCxvKSxPPWUuaW5kZXhPZihyLG8pO2JyZWFrfWlmKGUuc3Vic3RyKEkrMSx2KT09PXIpe2lmKHcucHVzaChlLnN1YnN0cmluZyhvLEkpLnJlcGxhY2UoL1wiXCIvZywnXCInKSksbChJKzErdikseD1lLmluZGV4T2YodCxvKSx5JiYoXygpLHUpKXJldHVybiBwKCk7aWYocyYmYi5sZW5ndGg+PXMpcmV0dXJuIHAoITApO2JyZWFrfX1lbHNlIEkrK319cmV0dXJuIGQoKX0sdGhpcy5hYm9ydD1mdW5jdGlvbigpe3U9ITB9LHRoaXMuZ2V0Q2hhckluZGV4PWZ1bmN0aW9uKCl7cmV0dXJuIG99fWZ1bmN0aW9uIGgoKXt2YXIgZT1kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtyZXR1cm4gZS5sZW5ndGg/ZVtlLmxlbmd0aC0xXS5zcmM6XCJcIn1mdW5jdGlvbiBmKCl7aWYoIVMuV09SS0VSU19TVVBQT1JURUQpcmV0dXJuITE7aWYoIWImJm51bGw9PT1TLlNDUklQVF9QQVRIKXRocm93IG5ldyBFcnJvcihcIlNjcmlwdCBwYXRoIGNhbm5vdCBiZSBkZXRlcm1pbmVkIGF1dG9tYXRpY2FsbHkgd2hlbiBQYXBhIFBhcnNlIGlzIGxvYWRlZCBhc3luY2hyb25vdXNseS4gWW91IG5lZWQgdG8gc2V0IFBhcGEuU0NSSVBUX1BBVEggbWFudWFsbHkuXCIpO3ZhciB0PVMuU0NSSVBUX1BBVEh8fHY7dCs9KC0xIT09dC5pbmRleE9mKFwiP1wiKT9cIiZcIjpcIj9cIikrXCJwYXBhd29ya2VyXCI7dmFyIHI9bmV3IGUuV29ya2VyKHQpO3JldHVybiByLm9ubWVzc2FnZT1jLHIuaWQ9dysrLFJbci5pZF09cixyfWZ1bmN0aW9uIGMoZSl7dmFyIHQ9ZS5kYXRhLHI9Ult0LndvcmtlcklkXSxuPSExO2lmKHQuZXJyb3Ipci51c2VyRXJyb3IodC5lcnJvcix0LmZpbGUpO2Vsc2UgaWYodC5yZXN1bHRzJiZ0LnJlc3VsdHMuZGF0YSl7dmFyIGk9ZnVuY3Rpb24oKXtuPSEwLGQodC53b3JrZXJJZCx7ZGF0YTpbXSxlcnJvcnM6W10sbWV0YTp7YWJvcnRlZDohMH19KX0scz17YWJvcnQ6aSxwYXVzZTpsLHJlc3VtZTpsfTtpZihtKHIudXNlclN0ZXApKXtmb3IodmFyIGE9MDthPHQucmVzdWx0cy5kYXRhLmxlbmd0aCYmKHIudXNlclN0ZXAoe2RhdGE6W3QucmVzdWx0cy5kYXRhW2FdXSxlcnJvcnM6dC5yZXN1bHRzLmVycm9ycyxtZXRhOnQucmVzdWx0cy5tZXRhfSxzKSwhbik7YSsrKTtkZWxldGUgdC5yZXN1bHRzfWVsc2UgbShyLnVzZXJDaHVuaykmJihyLnVzZXJDaHVuayh0LnJlc3VsdHMscyx0LmZpbGUpLGRlbGV0ZSB0LnJlc3VsdHMpfXQuZmluaXNoZWQmJiFuJiZkKHQud29ya2VySWQsdC5yZXN1bHRzKX1mdW5jdGlvbiBkKGUsdCl7dmFyIHI9UltlXTttKHIudXNlckNvbXBsZXRlKSYmci51c2VyQ29tcGxldGUodCksci50ZXJtaW5hdGUoKSxkZWxldGUgUltlXX1mdW5jdGlvbiBsKCl7dGhyb3dcIk5vdCBpbXBsZW1lbnRlZC5cIn1mdW5jdGlvbiBwKHQpe3ZhciByPXQuZGF0YTtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgUy5XT1JLRVJfSUQmJnImJihTLldPUktFUl9JRD1yLndvcmtlcklkKSxcInN0cmluZ1wiPT10eXBlb2Ygci5pbnB1dCllLnBvc3RNZXNzYWdlKHt3b3JrZXJJZDpTLldPUktFUl9JRCxyZXN1bHRzOlMucGFyc2Uoci5pbnB1dCxyLmNvbmZpZyksZmluaXNoZWQ6ITB9KTtlbHNlIGlmKGUuRmlsZSYmci5pbnB1dCBpbnN0YW5jZW9mIEZpbGV8fHIuaW5wdXQgaW5zdGFuY2VvZiBPYmplY3Qpe3ZhciBuPVMucGFyc2Uoci5pbnB1dCxyLmNvbmZpZyk7biYmZS5wb3N0TWVzc2FnZSh7d29ya2VySWQ6Uy5XT1JLRVJfSUQscmVzdWx0czpuLGZpbmlzaGVkOiEwfSl9fWZ1bmN0aW9uIF8oZSl7aWYoXCJvYmplY3RcIiE9dHlwZW9mIGUpcmV0dXJuIGU7dmFyIHQ9ZSBpbnN0YW5jZW9mIEFycmF5P1tdOnt9O2Zvcih2YXIgciBpbiBlKXRbcl09XyhlW3JdKTtyZXR1cm4gdH1mdW5jdGlvbiBnKGUsdCl7cmV0dXJuIGZ1bmN0aW9uKCl7ZS5hcHBseSh0LGFyZ3VtZW50cyl9fWZ1bmN0aW9uIG0oZSl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgZX12YXIgdixrPSFlLmRvY3VtZW50JiYhIWUucG9zdE1lc3NhZ2UseT1rJiYvKFxcP3wmKXBhcGF3b3JrZXIoPXwmfCQpLy50ZXN0KGUubG9jYXRpb24uc2VhcmNoKSxiPSExLFI9e30sdz0wLFM9e307aWYoUy5wYXJzZT10LFMudW5wYXJzZT1yLFMuUkVDT1JEX1NFUD1TdHJpbmcuZnJvbUNoYXJDb2RlKDMwKSxTLlVOSVRfU0VQPVN0cmluZy5mcm9tQ2hhckNvZGUoMzEpLFMuQllURV9PUkRFUl9NQVJLPVwi77u/XCIsUy5CQURfREVMSU1JVEVSUz1bXCJcXHJcIixcIlxcblwiLCdcIicsUy5CWVRFX09SREVSX01BUktdLFMuV09SS0VSU19TVVBQT1JURUQ9IWsmJiEhZS5Xb3JrZXIsUy5TQ1JJUFRfUEFUSD1udWxsLFMuTG9jYWxDaHVua1NpemU9MTA0ODU3NjAsUy5SZW1vdGVDaHVua1NpemU9NTI0Mjg4MCxTLkRlZmF1bHREZWxpbWl0ZXI9XCIsXCIsUy5QYXJzZXI9dSxTLlBhcnNlckhhbmRsZT1vLFMuTmV0d29ya1N0cmVhbWVyPWksUy5GaWxlU3RyZWFtZXI9cyxTLlN0cmluZ1N0cmVhbWVyPWEsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9UzptKGUuZGVmaW5lKSYmZS5kZWZpbmUuYW1kP2RlZmluZShmdW5jdGlvbigpe3JldHVybiBTfSk6ZS5QYXBhPVMsZS5qUXVlcnkpe3ZhciBDPWUualF1ZXJ5O0MuZm4ucGFyc2U9ZnVuY3Rpb24odCl7ZnVuY3Rpb24gcigpe2lmKDA9PWEubGVuZ3RoKXJldHVybiB2b2lkKG0odC5jb21wbGV0ZSkmJnQuY29tcGxldGUoKSk7dmFyIGU9YVswXTtpZihtKHQuYmVmb3JlKSl7dmFyIHI9dC5iZWZvcmUoZS5maWxlLGUuaW5wdXRFbGVtKTtpZihcIm9iamVjdFwiPT10eXBlb2Ygcil7aWYoXCJhYm9ydFwiPT1yLmFjdGlvbilyZXR1cm4gdm9pZCBuKFwiQWJvcnRFcnJvclwiLGUuZmlsZSxlLmlucHV0RWxlbSxyLnJlYXNvbik7aWYoXCJza2lwXCI9PXIuYWN0aW9uKXJldHVybiB2b2lkIGkoKTtcIm9iamVjdFwiPT10eXBlb2Ygci5jb25maWcmJihlLmluc3RhbmNlQ29uZmlnPUMuZXh0ZW5kKGUuaW5zdGFuY2VDb25maWcsci5jb25maWcpKX1lbHNlIGlmKFwic2tpcFwiPT1yKXJldHVybiB2b2lkIGkoKX12YXIgcz1lLmluc3RhbmNlQ29uZmlnLmNvbXBsZXRlO2UuaW5zdGFuY2VDb25maWcuY29tcGxldGU9ZnVuY3Rpb24odCl7bShzKSYmcyh0LGUuZmlsZSxlLmlucHV0RWxlbSksaSgpfSxTLnBhcnNlKGUuZmlsZSxlLmluc3RhbmNlQ29uZmlnKX1mdW5jdGlvbiBuKGUscixuLGkpe20odC5lcnJvcikmJnQuZXJyb3Ioe25hbWU6ZX0scixuLGkpfWZ1bmN0aW9uIGkoKXthLnNwbGljZSgwLDEpLHIoKX12YXIgcz10LmNvbmZpZ3x8e30sYT1bXTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIHQ9XCJJTlBVVFwiPT1DKHRoaXMpLnByb3AoXCJ0YWdOYW1lXCIpLnRvVXBwZXJDYXNlKCkmJlwiZmlsZVwiPT1DKHRoaXMpLmF0dHIoXCJ0eXBlXCIpLnRvTG93ZXJDYXNlKCkmJmUuRmlsZVJlYWRlcjtpZighdHx8IXRoaXMuZmlsZXN8fDA9PXRoaXMuZmlsZXMubGVuZ3RoKXJldHVybiEwO2Zvcih2YXIgcj0wO3I8dGhpcy5maWxlcy5sZW5ndGg7cisrKWEucHVzaCh7ZmlsZTp0aGlzLmZpbGVzW3JdLGlucHV0RWxlbTp0aGlzLGluc3RhbmNlQ29uZmlnOkMuZXh0ZW5kKHt9LHMpfSl9KSxyKCksdGhpc319eT9lLm9ubWVzc2FnZT1wOlMuV09SS0VSU19TVVBQT1JURUQmJih2PWgoKSxkb2N1bWVudC5ib2R5P2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsZnVuY3Rpb24oKXtiPSEwfSwhMCk6Yj0hMCksaS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShuLnByb3RvdHlwZSksaS5wcm90b3R5cGUuY29uc3RydWN0b3I9aSxzLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKG4ucHJvdG90eXBlKSxzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1zLGEucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYS5wcm90b3R5cGUpLGEucHJvdG90eXBlLmNvbnN0cnVjdG9yPWF9KFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93OnRoaXMpOyIsInZhciBFbmdpbmUgPSB7fTtcclxuXHJcbkVuZ2luZS5Cb290ID0gZnVuY3Rpb24gKGdhbWUpIHsgfTtcclxuXHJcbkVuZ2luZS5Cb290LnByb3RvdHlwZSA9IHtcclxuICBwcmVsb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgfSxcclxuXHJcbiAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnNjYWxlLnNjYWxlTW9kZSA9IFBoYXNlci5TY2FsZU1hbmFnZXIuU0hPV19BTEw7XHJcbiAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnbkhvcml6b250YWxseSA9IHRydWU7XHJcbiAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnblZlcnRpY2FsbHkgPSB0cnVlO1xyXG4gICAgdGhpcy5zdGFnZS5kaXNhYmxlVmlzaWJpbGl0eUNoYW5nZSA9IHRydWU7XHJcbiAgICB0aGlzLnN0YXRlLnN0YXJ0KCdQcmVsb2FkZXInKTtcclxuICB9XHJcbn1cclxuIiwiRW5naW5lLlByZWxvYWRlciA9IGZ1bmN0aW9uIChnYW1lKSB7XHJcbiAgdGhpcy5nYW1lID0gZ2FtZTtcclxufTtcclxuXHJcbkVuZ2luZS5QcmVsb2FkZXIucHJvdG90eXBlID0ge1xyXG4gIHByZWxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xyXG4gICAgdGhpcy5zdGFnZS5zbW9vdGhlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuYWRkTG9nb0xhYmxlKCk7XHJcbiAgICB0aGlzLmFkZFByb2dyZXNzTGFibGUoKTtcclxuXHJcbiAgICBpZiAoRW5naW5lLkRFQlVHKVxyXG4gICAgICB0aGlzLmxvYWQuZW5hYmxlUGFyYWxsZWwgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9pbml0U3R5bGUoKTtcclxuXHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Bva2ViYWxsJywgJ2Fzc2V0cy9pbWFnZXMvYmFja2dyb3VuZC9wb2tlYmFsbC5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnc2xpZGUtYmcnLCAnYXNzZXRzL2ltYWdlcy9iYWNrZ3JvdW5kL3NsaWRlLWJnLmpwZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdjYWxjLWJnJywgJ2Fzc2V0cy9pbWFnZXMvYmFja2dyb3VuZC9jYWxjLmpwZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdzaGFyZS1idG4nLCAnYXNzZXRzL2ltYWdlcy91aS9zaGFyZS1idG4ucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3JlcGVhdC1idG4nLCAnYXNzZXRzL2ltYWdlcy91aS9yZXBlYXQtYnRuLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdybmQtcG9rZW1vbicsICdhc3NldHMvaW1hZ2VzL3Bva2Vtb25zLycgKyBFbmdpbmUucm5kUG9rZW1vbiArICcucG5nJyk7XHJcblxyXG4gICAgdGhpcy5fbG9hZFBva2Vtb25zKCk7XHJcblxyXG4gICAgdGhpcy5sb2FkLnRleHQoJ3Bva2Vtb24uY3N2JywgJ2Fzc2V0cy9kYXRhL3Bva2Vtb24uY3N2Jyk7XHJcbiAgICB0aGlzLmxvYWQudGV4dCgnZGF0YS5qc29uJywgJ2Fzc2V0cy9kYXRhL2RhdGEuanNvbicpO1xyXG5cclxuICAgIHRoaXMubG9hZC5vbkZpbGVDb21wbGV0ZS5hZGQodGhpcy5maWxlQ29tcGxldGUsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIF9pbml0UG9rZW1vbkRCOiBmdW5jdGlvbigpIHtcclxuICAgIEVuZ2luZS5Qb2tlbW9uREIubG9hZCh0aGlzLmNhY2hlLmdldFRleHQoJ3Bva2Vtb24uY3N2JykpO1xyXG4gIH0sXHJcblxyXG4gIF9sb2FkUG9rZW1vbnM6IGZ1bmN0aW9uKCkge1xyXG4gICAgRW5naW5lLmxvYWRlciA9IG5ldyBQaGFzZXIuTG9hZGVyKHRoaXMuZ2FtZSk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBFbmdpbmUuUk9MTF9TTElERV9DT1VOVDsgaSsrKSB7XHJcbiAgICAgIEVuZ2luZS5sb2FkZXIuaW1hZ2UoJ3Bva2Vtb25Sb2xsJyArIGksICdhc3NldHMvaW1hZ2VzL3Bva2Vtb25zLycgKyB0aGlzLnJuZC5iZXR3ZWVuKDEsIDcyMSkgKyAnLnBuZycpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGZpbGVDb21wbGV0ZTogZnVuY3Rpb24gKHByb2dyZXNzLCBjYWNoZUtleSwgc3VjY2VzcywgdG90YWxMb2FkZWQsIHRvdGFsRmlsZXMpIHtcclxuICAgIHRoaXMuX3Byb2dyZXNzTGFibGUudGV4dCA9IHByb2dyZXNzICsgJyUgJyArIHRvdGFsTG9hZGVkICsgJy8nICsgdG90YWxGaWxlcztcclxuICB9LFxyXG5cclxuICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuX2luaXRQb2tlbW9uREIoKTtcclxuXHJcbiAgICBFbmdpbmUuZGF0YSA9IEpTT04ucGFyc2UodGhpcy5jYWNoZS5nZXRUZXh0KCdkYXRhLmpzb24nKSk7XHJcblxyXG4gICAgRW5naW5lLmxvYWRlci5zdGFydCgpO1xyXG5cclxuICAgIHRoaXMuc3RhdGUuc3RhcnQoJ0dhbWUnKTtcclxuICB9LFxyXG5cclxuICBfaW5pdFN0eWxlOiBmdW5jdGlvbigpIHtcclxuICAgIEVuZ2luZS50ZXh0U3R5bGUgPSB7XHJcbiAgICAgIGZpbGw6ICcjZmZmJyxcclxuICAgICAgZm9udDogJzI2cHggT3BlbiBTYW5zJ1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGFkZExvZ29MYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHN0eWxlID0ge1xyXG4gICAgICBmaWxsOiAnI0ZGRicsXHJcbiAgICAgIGZvbnQ6ICc0M3B4IEFyaWFsJ1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2xvZ29MYWJsZSA9IHRoaXMuYWRkLnRleHQodGhpcy5nYW1lLndpZHRoIC8gMiwgdGhpcy5nYW1lLmhlaWdodCAvIDQsICdQb2tlbW9uIFRlc3QnLCBzdHlsZSk7XHJcbiAgICB0aGlzLl9sb2dvTGFibGUuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgfSxcclxuXHJcbiAgYWRkUHJvZ3Jlc3NMYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHN0eWxlID0ge1xyXG4gICAgICBmaWxsOiAnI0ZGRicsXHJcbiAgICAgIGZvbnQ6ICcyMXB4IEFyaWFsJ1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3Byb2dyZXNzTGFibGUgPSB0aGlzLmFkZC50ZXh0KHRoaXMuZ2FtZS53aWR0aCAvIDIsIHRoaXMuZ2FtZS5oZWlnaHQgLyAyLCAnQ2FsY3VsYXRlZC4uLicsIHN0eWxlKTtcclxuICAgIHRoaXMuX3Byb2dyZXNzTGFibGUuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgfVxyXG59XHJcbiIsIkVuZ2luZS5BbnN3ZXIgPSBmdW5jdGlvbihnYW1lLCB4LCB5LCB0ZXh0LCBjYWxsYmFjaywgY29udGV4dCkge1xyXG4gIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICB0aGlzLl9wYWRkaW5nID0gNTtcclxuXHJcbiAgdGhpcy5fY3JlYXRlVGV4dCgpO1xyXG5cclxuICBQaGFzZXIuQnV0dG9uLmNhbGwodGhpcywgZ2FtZSwgeCwgeSwgdGhpcy5fY3JlYXRlQmFja2dyb3VuZCgpLCBjYWxsYmFjaywgY29udGV4dCk7XHJcbiAgdGhpcy50aW50ID0gMHgwMDk2ODg7XHJcblxyXG4gIHRoaXMuYWRkQ2hpbGQodGhpcy5fdGV4dFNwcml0ZSk7XHJcblxyXG4gIHRoaXMub25JbnB1dE92ZXIuYWRkKGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy50aW50ID0gMHgwMGZlZTc7XHJcbiAgfSwgdGhpcyk7XHJcblxyXG4gIHRoaXMub25JbnB1dE91dC5hZGQoZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnRpbnQgPSAweDAwOTY4ODtcclxuICB9LCB0aGlzKTtcclxufVxyXG5cclxuRW5naW5lLkFuc3dlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBoYXNlci5CdXR0b24ucHJvdG90eXBlKTtcclxuRW5naW5lLkFuc3dlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFbmdpbmUuQW5zd2VyO1xyXG5cclxuRW5naW5lLkFuc3dlci5wcm90b3R5cGUuX2NyZWF0ZUJhY2tncm91bmQgPSBmdW5jdGlvbigpIHtcclxuICB2YXIgYm90dG9tUGFkZGluZyA9IC03O1xyXG5cclxuICB2YXIgYm1wID0gdGhpcy5nYW1lLmFkZC5iaXRtYXBEYXRhKHRoaXMuX3RleHRTcHJpdGUud2lkdGggKyB0aGlzLl9wYWRkaW5nICogMiwgdGhpcy5fdGV4dFNwcml0ZS5oZWlnaHQgKyB0aGlzLl9wYWRkaW5nIC8gMik7XHJcbiAgYm1wLmN0eC5iZWdpblBhdGgoKTtcclxuICBibXAuY3R4LnJlY3QoMCwgMCwgYm1wLndpZHRoLCBibXAuaGVpZ2h0ICsgYm90dG9tUGFkZGluZyk7XHJcbiAgYm1wLmN0eC5maWxsU3R5bGUgPSAnI2ZmZic7XHJcbiAgYm1wLmN0eC5maWxsKCk7XHJcblxyXG4gIHJldHVybiBibXA7XHJcbn1cclxuXHJcbkVuZ2luZS5BbnN3ZXIucHJvdG90eXBlLl9jcmVhdGVUZXh0ID0gZnVuY3Rpb24oKSB7XHJcbiAgdGhpcy5fdGV4dFNwcml0ZSA9IG5ldyBQaGFzZXIuVGV4dCh0aGlzLmdhbWUsIDAsIDAsIHRoaXMudGV4dCwgRW5naW5lLnRleHRTdHlsZSk7XHJcbiAgdGhpcy5fdGV4dFNwcml0ZS5hbmNob3Iuc2V0VG8oMC41LCAwKTtcclxufVxyXG4iLCJFbmdpbmUuR2FtZSA9IGZ1bmN0aW9uKGdhbWUpIHt9XHJcblxyXG5FbmdpbmUuR2FtZS5wcm90b3R5cGUgPSB7XHJcbiAgY3JlYXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnOyAvLyNkZGRcclxuXHJcbiAgICB0aGlzLl9hZGRCYWNrZ3JvdW5kKCk7XHJcbiAgICB0aGlzLl9hZGRQb2tlYmFsbFN5c3RlbSgpO1xyXG4gICAgdGhpcy5fYWRkU2xpZGVzKCk7XHJcbiAgICB0aGlzLl9zaG93Q2hhaW5TbGlkZXModGhpcy5zbGlkZXMpO1xyXG4gICAgdGhpcy5fYWRkUHJvZ3Jlc3NTbGlkZSgpO1xyXG5cclxuICAgIHRoaXMuX2RyYXdEZWJ1ZygpO1xyXG4gIH0sXHJcblxyXG4gIF9hZGRTbGlkZXM6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5zbGlkZXMgPSBbXHJcbiAgICAgIG5ldyBFbmdpbmUuU2xpZGUodGhpcy5nYW1lLCAn0JLRiyDQu9GO0LHQuNGC0LUg0L7QstGB0Y/QvdC+0LUg0L/QtdGH0LXQvdGM0LU/JywgWyfQlNCwJywgJ9Cd0LXRgicsICfQndC1INC/0YDQvtCx0L7QstCw0Lsg0LXQs9C+J10pLFxyXG4gICAgICBuZXcgRW5naW5lLlNsaWRlKHRoaXMuZ2FtZSwgJ9CS0LDRgSDRh9Cw0YHRgtC+INCx0YzRkdGCINGC0L7QutC+0Lw/JywgWyfQkdGL0LLQsNC10YInLCAn0J7Rh9C10L3RjCDRgNC10LTQutC+JywgJ9Cd0LUg0LfQvdCw0Y4nLCAn0KLQvtC70YzQutC+INGH0YLQviDRg9C00LDRgNC40LvQviEnXSksXHJcbiAgICAgIG5ldyBFbmdpbmUuU2xpZGUodGhpcy5nYW1lLCAn0JrQsNC60LDRjyDRgdGC0LjRhdC40Y8g0LLQsNC8INCx0L7Qu9GM0YjQtSDQvdGA0LDQstC40YLRgdGPPycsIFsn0JLQvtC00LAnLCAn0J7Qs9C+0L3RjCcsICfQktC10YLQtdGAJywgJ9CX0LXQvNC70Y8nXSksXHJcbiAgICAgIG5ldyBFbmdpbmUuU2xpZGUodGhpcy5nYW1lLCAn0JLRi9Cx0LjRgNC40YLQtSDQvtC00L3QviDQuNC3Li4uJywgWyfQotGM0LzQsCcsICfQodCy0LXRgiddKSxcclxuICAgICAgbmV3IEVuZ2luZS5TbGlkZSh0aGlzLmdhbWUsICfQktGLINCx0L7QuNGC0LXRgdGMINC90LDRgdC10LrQvtC80YvRhT8nLCBbJ9CU0LAnLCAn0J3QtdGCJ10pLFxyXG4gICAgICBuZXcgRW5naW5lLlNsaWRlKHRoaXMuZ2FtZSwgJ9Cd0LUg0L/RgNC+0YLQuNCyINC70Lgg0LLRiyDQt9Cw0LLQtdGB0YLQuCDQtNC+0LzQsNGI0L3QtdCz0L4g0LTRgNCw0LrQvtC90LA/JywgWyfQn9GE0YQsINC10YnRkSDRgdC/0YDQsNGI0LjQstCw0LXRgtC1JywgJ9Cd0LUg0LvRjtCx0LvRjiDQtNGA0LDQutC+0L3QvtCyJywgJ9CR0L7RjtGB0Ywg0L7QvSDRgdGK0LXRgdGCINC80L7QtdCz0L4g0L/QuNGC0L7QvNGG0LAnXSksXHJcbiAgICAgIG5ldyBFbmdpbmUuU2xpZGUodGhpcy5nYW1lLCAn0JrQsNC60L7QtSDQv9C10YDQtdC00LLQuNC20LXQvdC40LUg0LLRiyDQv9GA0LXQtNC/0L7Rh9C40YLQsNC10YLQtT8nLCBbJ9Cf0L4g0LLQvtC30LTRg9GF0YMnLCAn0J/QviDQt9C10LzQu9C1JywgJ9CS0L/Qu9Cw0LLRjCcsICfQotC10LvQtdC/0L7RgNGC0LDRhtC40Y8nXSksXHJcbiAgICAgIG5ldyBFbmdpbmUuU2xpZGUodGhpcy5nYW1lLCAn0JLRiyDQsdC+0LjRgtC10YHRjCDQv9GA0LjQstC10LTQtdC90LjQuT8nLCBbJ9CU0LAnLCAn0J3QtdGCJywgJ9Ce0L3QuCDQvdC1INGB0YPRidC10YHRgtCy0YPRjtGCISddKSxcclxuICAgICAgbmV3IEVuZ2luZS5TbGlkZSh0aGlzLmdhbWUsICfQmtCw0LrQuNC1INCy0LDQvCDQvdGA0LDQstGP0YLRgdGPINC20LjQstC+0YLQvdGL0LUnLCBbJ9CR0L7Qu9GM0YjQuNC1JywgJ9Cc0LDQu9C10L3RjNC60LjQtScsICfQodGA0LXQtNC90LjQtSddKSxcclxuICAgICAgbmV3IEVuZ2luZS5TbGlkZSh0aGlzLmdhbWUsICfQktCw0Lwg0L3RgNCw0LLRj9GC0YHRjyDQv9GD0YXQu9C10L3RjNC60LjQtSDQv9C40YLQvtC80YbRiz8nLCBbJ9CU0LAnLCAn0J3QtdGCJywgJ9CR0LXQtyDRgNCw0LfQvdC40YbRiyddKSxcclxuICAgIF07XHJcbiAgfSxcclxuXHJcbiAgX3Nob3dDaGFpblNsaWRlczogZnVuY3Rpb24oY2hhaW4pIHtcclxuICAgIHRoaXMuc2xpZGVDb3VudGVyID0gMDtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYWluLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNoYWluW2ldLnNldENhbGxiYWNrQ2hlY2sodGhpcy5fbmV4dFNsaWRlLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYWluWzBdLnNob3coKTtcclxuICB9LFxyXG5cclxuICBfbmV4dFNsaWRlOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc2xpZGVDb3VudGVyKys7XHJcblxyXG4gICAgaWYgKHRoaXMuc2xpZGVDb3VudGVyID49IHRoaXMuc2xpZGVzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLl9maW5pc2hUZXN0KCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNsaWRlc1t0aGlzLnNsaWRlQ291bnRlcl0uc2hvdygpO1xyXG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZS50ZXh0ID0gJ9CS0L7Qv9GA0L7RgSAnICsgKHRoaXMuc2xpZGVDb3VudGVyICsgMSkgKyAnINC40LcgJyArIHRoaXMuc2xpZGVzLmxlbmd0aDtcclxuICB9LFxyXG5cclxuICBfYWRkQmFja2dyb3VuZDogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgYmcgPSB0aGlzLmdhbWUuYWRkLnNwcml0ZSgwLCAwLCAnc2xpZGUtYmcnKTtcclxuICB9LFxyXG5cclxuICBfZHJhd0RlYnVnOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuX2xpbmVWID0gbmV3IFBoYXNlci5MaW5lKHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCAwLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgdGhpcy5nYW1lLmhlaWdodCk7XHJcbiAgICB0aGlzLl9saW5lSCA9IG5ldyBQaGFzZXIuTGluZSgwLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWSwgdGhpcy5nYW1lLndpZHRoLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWSk7XHJcbiAgfSxcclxuXHJcbiAgX2FkZFBva2ViYWxsU3lzdGVtOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMucG9rZWJhbGxTeXN0ZW0gPSBuZXcgRW5naW5lLlBva2ViYWxsU3lzdGVtKHRoaXMuZ2FtZSk7XHJcbiAgICB0aGlzLnBva2ViYWxsU3lzdGVtLmNyZWF0ZSgpO1xyXG4gIH0sXHJcblxyXG4gIF9maW5pc2hUZXN0OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc3RhdGUuc3RhcnQoJ0NhbGN1bGF0ZScpO1xyXG4gIH0sXHJcblxyXG4gIF9hZGRQcm9ncmVzc1NsaWRlOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuX3Byb2dyZXNzTGFibGUgPSB0aGlzLmFkZC50ZXh0KEVuZ2luZS5HQU1FX1dJRFRIIC8gMiwgMjUsICfQktC+0L/RgNC+0YEgMSDQuNC3ICcgKyB0aGlzLnNsaWRlcy5sZW5ndGgsIEVuZ2luZS50ZXh0U3R5bGUpO1xyXG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZS5mb250U2l6ZSA9IDE2O1xyXG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZS5hbmNob3Iuc2V0VG8oMC41LCAwKTtcclxuICB9LFxyXG5cclxuICB1cGRhdGU6IGZ1bmN0aW9uKCkge30sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAvLyB0aGlzLmdhbWUuZGVidWcuaW5wdXRJbmZvKDE1LCAxNSwgJyNmZmYnKTtcclxuICAgIC8vIC8vIHRoaXMuZ2FtZS5kZWJ1Zy5zcHJpdGVCb3VuZHModGhpcy50Ll9zbGlkZUdyb3VwLCAncmdiYSgyMTMsIDgzLCA4MywgMC4yNSknKTtcclxuICAgIC8vIC8vIHRoaXMuZ2FtZS5kZWJ1Zy5zcHJpdGVCb3VuZHModGhpcy50Ll9hbnN3ZXJHcm91cCwgJ3JnYmEoMzYsIDAsIDI1NSwgMC4yNSknKTtcclxuICAgIC8vXHJcbiAgICAvLyBnYW1lLmRlYnVnLmdlb20odGhpcy5fbGluZVYpO1xyXG4gICAgLy8gZ2FtZS5kZWJ1Zy5nZW9tKHRoaXMuX2xpbmVIKTtcclxuICB9XHJcbn1cclxuIiwiRW5naW5lLlBva2ViYWxsU3lzdGVtID0gZnVuY3Rpb24oZ2FtZSkge1xyXG4gIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgdGhpcy5jb3VudEVsZW1lbnRzID0gMTY7XHJcbn1cclxuXHJcbkVuZ2luZS5Qb2tlYmFsbFN5c3RlbS5wcm90b3R5cGUgPSB7XHJcbiAgY3JlYXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuX2FkZFBva2ViYWxscygpO1xyXG4gICAgdGhpcy5fcnVuVGltZXIoKTtcclxuICB9LFxyXG5cclxuICBfYWRkUG9rZWJhbGxzOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMucG9rZWJhbGxzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jb3VudEVsZW1lbnRzOyBpKyspIHtcclxuICAgICAgdmFyIHBva2ViYWxsID0gbmV3IFBoYXNlci5TcHJpdGUodGhpcy5nYW1lLCAwLCAwLCAncG9rZWJhbGwnKTtcclxuXHJcbiAgICAgIHBva2ViYWxsLmFuY2hvci5zZXRUbygwLjUpO1xyXG5cclxuICAgICAgdGhpcy5wb2tlYmFsbHMuYWRkKHBva2ViYWxsKTtcclxuXHJcbiAgICAgIHBva2ViYWxsLmtpbGwoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBfcnVuVGltZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5fdGltZXIgPSB0aGlzLmdhbWUudGltZS5jcmVhdGUoKTtcclxuICAgIHRoaXMuX3RpbWVyLmxvb3AoUGhhc2VyLlRpbWVyLlNFQ09ORCwgdGhpcy5lbWl0LCB0aGlzKTtcclxuICAgIHRoaXMuX3RpbWVyLnN0YXJ0KCk7XHJcbiAgfSxcclxuXHJcbiAgZW1pdDogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcGFkZGluZ3MgPSAyNTtcclxuICAgIHZhciBzY2FsZSA9IHRoaXMuZ2FtZS5ybmQucmVhbEluUmFuZ2UoMC4yNSwgMC44KTtcclxuICAgIHZhciBhbHBoYSA9IHRoaXMuZ2FtZS5ybmQucmVhbEluUmFuZ2UoMC4wNSwgMC4xNSk7XHJcblxyXG4gICAgdmFyIHBva2ViYWxsID0gdGhpcy5wb2tlYmFsbHMuZ2V0Rmlyc3REZWFkKCk7XHJcblxyXG4gICAgcG9rZWJhbGwucmV2aXZlKCk7XHJcbiAgICBwb2tlYmFsbC5yZXNldChcclxuICAgICAgdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKHBhZGRpbmdzLCB0aGlzLmdhbWUud2lkdGggLSBwYWRkaW5ncyksXHJcbiAgICAgIHRoaXMuZ2FtZS5ybmQuYmV0d2VlbihwYWRkaW5ncywgdGhpcy5nYW1lLmhlaWdodCAtIHBhZGRpbmdzKVxyXG4gICAgKTtcclxuXHJcbiAgICBwb2tlYmFsbC5hbHBoYSA9IDA7XHJcbiAgICBwb2tlYmFsbC5yb3RhdGlvbiA9IDA7XHJcbiAgICBwb2tlYmFsbC5zY2FsZS5zZXRUbyhzY2FsZSwgc2NhbGUpO1xyXG5cclxuICAgIHZhciB0YXJnZXRYID0gdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKDEwMCwgMzAwKTtcclxuICAgIHZhciB0YXJnZXRZID0gMDtcclxuXHJcbiAgICBpZiAocG9rZWJhbGwueCA+IHRoaXMuZ2FtZS53aWR0aCAvIDIpXHJcbiAgICAgIHRhcmdldFggKj0gLTE7XHJcblxyXG4gICAgdmFyIGFscGhhVHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHBva2ViYWxsKVxyXG4gICAgICAudG8oe2FscGhhOiBhbHBoYX0sIDI1MDApO1xyXG5cclxuICAgIHZhciBzcGVlZFR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbihwb2tlYmFsbClcclxuICAgICAgLnRvKHt4OiBwb2tlYmFsbC54ICsgdGFyZ2V0WH0sIDYwMDApO1xyXG5cclxuICAgIHZhciByb3RhdGlvblR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbihwb2tlYmFsbClcclxuICAgICAgLnRvKHtyb3RhdGlvbjogTWF0aC5QSSAqIDIgKiB0aGlzLmdhbWUucm5kLnBpY2soWy0xLCAxXSl9LCA2MDAwKTtcclxuXHJcbiAgICB2YXIgZGllVHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHBva2ViYWxsKVxyXG4gICAgICAudG8oe2FscGhhOiAwfSwgMjUwMCk7XHJcblxyXG4gICAgYWxwaGFUd2Vlbi5zdGFydCgpO1xyXG4gICAgc3BlZWRUd2Vlbi5zdGFydCgpO1xyXG4gICAgcm90YXRpb25Ud2Vlbi5zdGFydCgpO1xyXG5cclxuICAgIGFscGhhVHdlZW4uY2hhaW4oZGllVHdlZW4uZGVsYXkoMTAwMCkpO1xyXG5cclxuICAgIGRpZVR3ZWVuLm9uQ29tcGxldGVcclxuICAgICAgLmFkZChmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmtpbGwoKTtcclxuICAgICAgfSwgcG9rZWJhbGwpO1xyXG5cclxuICAgIC8vIGFscGhhVHdlZW4ub25Db21wbGV0ZS5hZGQoZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgIHRoaXMua2lsbCgpO1xyXG4gICAgLy8gfSwgcG9rZWJhbGwpO1xyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gIH0sXHJcbn1cclxuIiwiRW5naW5lLlNsaWRlID0gZnVuY3Rpb24oZ2FtZSwgdGV4dCwgYW5zd2Vycykge1xyXG4gIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgdGhpcy5fbWFyZ2luVG9wQW5zd2VycyA9IDc1O1xyXG4gIHRoaXMuX2xpbmVTcGFjaW5nQW5zd2VycyA9IDYwO1xyXG4gIHRoaXMuX21hcmdpblRvcExhYmxlID0gMjAwO1xyXG5cclxuICBQaGFzZXIuU3ByaXRlLmNhbGwodGhpcywgZ2FtZSwgMCwgMCwgdGhpcy5fY3JlYXRlQmFja2dyb3VuZCgpKTtcclxuXHJcbiAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICB0aGlzLmFuc3dlcnMgPSBhbnN3ZXJzO1xyXG4gIHRoaXMuYWxwaGEgPSAwO1xyXG4gIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMpO1xyXG5cclxuICB0aGlzLl9hZGRMYWJsZSgpO1xyXG4gIHRoaXMuX2FkZEFuc3dlcnMoKTtcclxufVxyXG5cclxuRW5naW5lLlNsaWRlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGhhc2VyLlNwcml0ZS5wcm90b3R5cGUpO1xyXG5FbmdpbmUuU2xpZGUuY29uc3RydWN0b3IgPSBFbmdpbmUuU2xpZGU7XHJcblxyXG5FbmdpbmUuU2xpZGUucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcclxuICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpLnRvKHtcclxuICAgIGFscGhhOiAxXHJcbiAgfSwgMTUwKS5zdGFydCgpO1xyXG59XHJcblxyXG5FbmdpbmUuU2xpZGUucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcclxuICB2YXIgdHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpLnRvKHtcclxuICAgIGFscGhhOiAwXHJcbiAgfSwgMTUwKS5zdGFydCgpO1xyXG5cclxuICB0d2Vlbi5vbkNvbXBsZXRlLmFkZChmdW5jdGlvbigpIHtcclxuICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgaWYgKHRoaXMuY2FsbGJhY2spIHtcclxuICAgICAgdGhpcy5jYWxsYmFjaygpO1xyXG4gICAgfVxyXG4gIH0sIHRoaXMpO1xyXG5cclxuICByZXR1cm4gdHdlZW4ub25Db21wbGV0ZTtcclxufVxyXG5cclxuRW5naW5lLlNsaWRlLnByb3RvdHlwZS5zZXRDYWxsYmFja0NoZWNrID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbn1cclxuXHJcbkVuZ2luZS5TbGlkZS5wcm90b3R5cGUuX2FkZExhYmxlID0gZnVuY3Rpb24oKSB7XHJcbiAgdGhpcy5fbGFibGUgPSBuZXcgUGhhc2VyLlRleHQodGhpcy5nYW1lLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgdGhpcy5fbWFyZ2luVG9wTGFibGUsIHRoaXMudGV4dCwgRW5naW5lLnRleHRTdHlsZSk7XHJcbiAgdGhpcy5fbGFibGUud29yZFdyYXAgPSB0cnVlO1xyXG4gIHRoaXMuX2xhYmxlLndvcmRXcmFwV2lkdGggPSA2MDA7XHJcbiAgdGhpcy5fbGFibGUuYWxpZ24gPSAnY2VudGVyJztcclxuICB0aGlzLl9sYWJsZS5hbmNob3Iuc2V0VG8oMC41KTtcclxuXHJcbiAgdGhpcy5hZGRDaGlsZCh0aGlzLl9sYWJsZSk7XHJcbn1cclxuXHJcbkVuZ2luZS5TbGlkZS5wcm90b3R5cGUuX2FkZEFuc3dlcnMgPSBmdW5jdGlvbigpIHtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYW5zd2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGFuc3dlciA9IG5ldyBFbmdpbmUuQW5zd2VyKFxyXG4gICAgICB0aGlzLmdhbWUsXHJcbiAgICAgIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLFxyXG4gICAgICB0aGlzLl9sYWJsZS55ICsgdGhpcy5fbWFyZ2luVG9wQW5zd2VycyArIHRoaXMuX2xpbmVTcGFjaW5nQW5zd2VycyAqIGksXHJcbiAgICAgIHRoaXMuYW5zd2Vyc1tpXSxcclxuICAgICAgdGhpcy5oaWRlLFxyXG4gICAgICB0aGlzXHJcbiAgICApO1xyXG5cclxuICAgIGFuc3dlci5hbmNob3Iuc2V0VG8oMC41LCAwKTtcclxuICAgIHRoaXMuYWRkQ2hpbGQoYW5zd2VyKTtcclxuICB9XHJcbn1cclxuXHJcbkVuZ2luZS5TbGlkZS5wcm90b3R5cGUuX2NyZWF0ZUJhY2tncm91bmQgPSBmdW5jdGlvbigpIHtcclxuICB2YXIgYm1wID0gdGhpcy5nYW1lLmFkZC5iaXRtYXBEYXRhKEVuZ2luZS5HQU1FX1dJRFRILCBFbmdpbmUuR0FNRV9IRUlHSFQpO1xyXG5cclxuICBibXAuY3R4LmJlZ2luUGF0aCgpO1xyXG4gIGJtcC5jdHgucmVjdCgwLCAwLCBibXAud2lkdGgsIGJtcC5oZWlnaHQpO1xyXG4gIGJtcC5jdHguZmlsbFN0eWxlID0gJ3JnYmEoMCwgMCwgMCwgMCknO1xyXG4gIGJtcC5jdHguZmlsbCgpO1xyXG5cclxuICByZXR1cm4gYm1wO1xyXG59XHJcbiIsIkVuZ2luZS5DYWxjdWxhdGUgPSBmdW5jdGlvbihnYW1lKSB7fVxyXG5cclxuRW5naW5lLkNhbGN1bGF0ZS5wcm90b3R5cGUgPSB7XHJcbiAgY3JlYXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuX3RpbWVQcm9ncmVzcyA9IDgwMDA7XHJcbiAgICB0aGlzLl9jb3VudFRpY2sgPSA3MztcclxuICAgIHRoaXMuX3Byb2dyZXNzID0gMDtcclxuICAgIHRoaXMuX3Jlc3VsdFBva2Vtb24gPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ3JuZC1wb2tlbW9uJyk7XHJcbiAgICB0aGlzLl9yZXN1bHRQb2tlbW9uLnZpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMuX2Fkc0lzUnVuID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fYWRkQmFja2dyb3VuZCgpO1xyXG4gICAgdGhpcy5fYWRkUm9sbGVyKCk7XHJcbiAgICB0aGlzLl9hZGRJbmZvTGFibGUoKTtcclxuICAgIHRoaXMuX2FkZFByb2dyZXNzTGFibGUoKTtcclxuXHJcbiAgICB0aGlzLl9zdGFydFJvbGwoKTtcclxuICAgIHRoaXMuX3N0YXJ0UHJvZ3Jlc3MoKTtcclxuICB9LFxyXG5cclxuICBfYWRkUm9sbGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciByb2xsU2l6ZSA9IDMwMDtcclxuICAgIHZhciBtYXJnaW5SaWdodCA9IDEwMDtcclxuXHJcbiAgICB0aGlzLl9yb2xscyA9IFtdO1xyXG4gICAgdGhpcy5fcm9sbEdyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKTtcclxuICAgIHRoaXMuX2FjdGl2ZVJvbGxTcHJpdGUgPSAtMTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IEVuZ2luZS5ST0xMX1NMSURFX0NPVU5UOyBpKyspIHtcclxuICAgICAgdmFyIHNwcml0ZSA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAncG9rZW1vblJvbGwnICsgaSk7XHJcblxyXG4gICAgICBzcHJpdGUudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgdGhpcy5fcm9sbEdyb3VwLmFkZChzcHJpdGUpO1xyXG4gICAgICB0aGlzLl9yb2xscy5wdXNoKHNwcml0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fcm9sbEdyb3VwLnggPSBtYXJnaW5SaWdodDtcclxuICAgIHRoaXMuX3JvbGxHcm91cC55ID0gdGhpcy5nYW1lLndvcmxkLmNlbnRlclkgLSByb2xsU2l6ZSAvIDI7XHJcblxyXG4gICAgdGhpcy5fcm9sbEdyb3VwLmFkZCh0aGlzLl9yZXN1bHRQb2tlbW9uKTtcclxuICAgIHRoaXMuX3JvbGxzLnB1c2godGhpcy5fcmVzdWx0UG9rZW1vbik7XHJcbiAgfSxcclxuXHJcbiAgX2FkZEJhY2tncm91bmQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5iZyA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAnY2FsYy1iZycpO1xyXG4gIH0sXHJcblxyXG4gIF9hZGRQcm9ncmVzc0xhYmxlOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciByb2xsU2l6ZSA9IDMwMDtcclxuICAgIHZhciBtYXJnaW5Ub3AgPSA1MDtcclxuXHJcbiAgICB0aGlzLl9wcm9ncmVzc0xhYmxlID0gdGhpcy5hZGQudGV4dChcclxuICAgICAgdGhpcy5fcm9sbEdyb3VwLnggKyByb2xsU2l6ZSAvIDIsXHJcbiAgICAgIHRoaXMuX3JvbGxHcm91cC55ICsgcm9sbFNpemUgKyBtYXJnaW5Ub3AsXHJcbiAgICAgICfQn9GA0L7Qs9GA0LXRgdGBIDAgJScsXHJcbiAgICAgIEVuZ2luZS50ZXh0U3R5bGVcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZS5hbmNob3Iuc2V0VG8oMC41KTtcclxuICB9LFxyXG5cclxuICBfYWRkSW5mb0xhYmxlOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBtYXJpZ25Ub3AgPSAyNTtcclxuXHJcbiAgICB0aGlzLl9pbmZvVGV4dCA9IHRoaXMuYWRkLnRleHQoXHJcbiAgICAgIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLFxyXG4gICAgICBtYXJpZ25Ub3AsXHJcbiAgICAgICfQktGL0YfQuNGB0LvQtdC90LjQtSDRgNC10LfRg9C70YzRgtCw0YLQsC4uLicsXHJcbiAgICAgIEVuZ2luZS50ZXh0U3R5bGVcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5faW5mb1RleHQuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgfSxcclxuXHJcbiAgX3N0YXJ0Um9sbDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLl9hY3RpdmVSb2xsU3ByaXRlID0gMDtcclxuICAgIHRoaXMuX3JvbGxzWzBdLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuX3RpbWVyID0gdGhpcy50aW1lLmNyZWF0ZSgpO1xyXG4gICAgdGhpcy5fdGltZXIubG9vcCg3NSwgdGhpcy5fcm9sbCwgdGhpcyk7XHJcbiAgICB0aGlzLl90aW1lci5zdGFydCgpO1xyXG4gIH0sXHJcblxyXG4gIF9yb2xsOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuX3JvbGxzW3RoaXMuX2FjdGl2ZVJvbGxTcHJpdGVdLnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9hY3RpdmVSb2xsU3ByaXRlKys7XHJcblxyXG4gICAgaWYgKHRoaXMuX2FjdGl2ZVJvbGxTcHJpdGUgPiBFbmdpbmUuUk9MTF9TTElERV9DT1VOVCAtIDEpIHtcclxuICAgICAgdGhpcy5fYWN0aXZlUm9sbFNwcml0ZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fcm9sbHNbdGhpcy5fYWN0aXZlUm9sbFNwcml0ZV0udmlzaWJsZSA9IHRydWU7XHJcbiAgfSxcclxuXHJcbiAgX3N0YXJ0UHJvZ3Jlc3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5fcHJvZ3Jlc3NUaW1lciA9IHRoaXMudGltZS5jcmVhdGUoKTtcclxuICAgIHRoaXMuX3Byb2dyZXNzVGltZXIucmVwZWF0KFxyXG4gICAgICB0aGlzLl90aW1lUHJvZ3Jlc3MgLyB0aGlzLl9jb3VudFRpY2ssXHJcbiAgICAgIHRoaXMuX2NvdW50VGljayxcclxuICAgICAgdGhpcy5fdXBkYXRlUHJvZ3Jlc3MsXHJcbiAgICAgIHRoaXNcclxuICAgICk7XHJcbiAgICB0aGlzLl9wcm9ncmVzc1RpbWVyLnN0YXJ0KCk7XHJcbiAgICB0aGlzLl9wcm9ncmVzc1RpbWVyLm9uQ29tcGxldGUuYWRkKHRoaXMuX2ZpbmlzaENhbGMsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIF91cGRhdGVQcm9ncmVzczogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLl9wcm9ncmVzcysrO1xyXG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZS50ZXh0ID0gJ9Cf0YDQvtCz0YDQtdGB0YEgJyArIE1hdGguZmxvb3IoKHRoaXMuX3Byb2dyZXNzIC8gdGhpcy5fY291bnRUaWNrKSAqIDEwMCkgKyAnICUnO1xyXG5cclxuICAgIGlmICgodGhpcy5fcHJvZ3Jlc3MgLyB0aGlzLl9jb3VudFRpY2spID4gMC41ICYmICF0aGlzLl9hZHNJc1J1bikge1xyXG4gICAgICB0aGlzLl9hZHNJc1J1biA9IHRydWU7XHJcbiAgICAgIHRoaXMuX2FkZEFkcygpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIF9maW5pc2hDYWxjOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuX3RpbWVyLnN0b3AoKTtcclxuXHJcbiAgICB0aGlzLl9yb2xsc1t0aGlzLl9hY3RpdmVSb2xsU3ByaXRlXS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLl9yZXN1bHRQb2tlbW9uLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuX2luZm9UZXh0LnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICB2YXIgcG9rZW1vbk5hbWUgPSBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoRW5naW5lLlBva2Vtb25EQi5wb2tlbW9uc1tFbmdpbmUucm5kUG9rZW1vbiAtIDFdLmlkZW50aWZpZXIpO1xyXG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZS50ZXh0ID0gJ9CvINC/0L7RhdC+0LYg0L3QsCAnICsgcG9rZW1vbk5hbWU7XHJcblxyXG4gICAgdGhpcy5fYWRkQnRucygpO1xyXG4gIH0sXHJcblxyXG4gIF9hZGRBZHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgVksuc3RhcnRQcmVyb2xsKCk7XHJcblxyXG4gICAgLy8gaWYgKHRoaXMuZ2FtZS5ybmQucGljayhbLTEsIDFdKSA9PT0gMSkge1xyXG4gICAgLy8gICBWSy5zdGFydFByZXJvbGwoKTtcclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgIFZLLnN0YXJ0QWRzKCk7XHJcbiAgICAvLyB9XHJcbiAgfSxcclxuXHJcbiAgX2FkZEJ0bnM6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG1hcmdpbiA9IDUwO1xyXG4gICAgdmFyIGJ0blNoYXJlID0gdGhpcy5fYWRkU2hhcmVCdG4oKTtcclxuICAgIHZhciBidG5SZXBlYXQgPSB0aGlzLl9hZGRSZXBlYXRCdG4oKTtcclxuXHJcbiAgICBidG5TaGFyZS55IC09IG1hcmdpbjtcclxuICAgIGJ0blJlcGVhdC55ICs9IG1hcmdpbjtcclxuICB9LFxyXG5cclxuICBfYWRkU2hhcmVCdG46IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGJ0blNoYXJlID0gdGhpcy5hZGQuYnV0dG9uKFxyXG4gICAgICBFbmdpbmUuR0FNRV9XSURUSCAqIDAuNzUsXHJcbiAgICAgIEVuZ2luZS5HQU1FX0hFSUdIVCAvIDIsXHJcbiAgICAgICdzaGFyZS1idG4nLFxyXG4gICAgICB0aGlzLl9zaGFyZURhdGEsXHJcbiAgICAgIHRoaXNcclxuICAgICk7XHJcblxyXG4gICAgYnRuU2hhcmUuYW5jaG9yLnNldFRvKDAuNSk7XHJcblxyXG4gICAgcmV0dXJuIGJ0blNoYXJlO1xyXG4gIH0sXHJcblxyXG4gIF9hZGRSZXBlYXRCdG46IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGJ0blJlYXBlYXQgPSB0aGlzLmFkZC5idXR0b24oXHJcbiAgICAgIEVuZ2luZS5HQU1FX1dJRFRIICogMC43NSxcclxuICAgICAgRW5naW5lLkdBTUVfSEVJR0hUIC8gMixcclxuICAgICAgJ3JlcGVhdC1idG4nLFxyXG4gICAgICB0aGlzLl9yZXBlYXRHYW1lLFxyXG4gICAgICB0aGlzXHJcbiAgICApO1xyXG5cclxuICAgIGJ0blJlYXBlYXQuYW5jaG9yLnNldFRvKDAuNSk7XHJcblxyXG4gICAgcmV0dXJuIGJ0blJlYXBlYXQ7XHJcbiAgfSxcclxuXHJcbiAgX3NoYXJlRGF0YTogZnVuY3Rpb24oKSB7XHJcbiAgICBWSy5wdWJsaWNhdGVQaG90byhFbmdpbmUucm5kUG9rZW1vbik7XHJcbiAgfSxcclxuXHJcbiAgX3JlcGVhdEdhbWU6IGZ1bmN0aW9uKCkge1xyXG4gICAgRW5naW5lLnJuZFBva2Vtb24gPSB0aGlzLmdhbWUucm5kLmJldHdlZW4oMSwgNzIxKTtcclxuICAgIHRoaXMuc3RhdGUuc3RhcnQoJ1ByZWxvYWRlcicpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cmluZykge1xyXG4gICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcclxufVxyXG4iLCIvKipcclxuICogQ3JlYXRlIGltYWdlcyBvZiBwb2tlbW9uXHJcbiAqIEBwYXJhbSB7W3R5cGVdfSBnYW1lIFtkZXNjcmlwdGlvbl1cclxuICovXHJcbkVuZ2luZS5HZW5lcmF0b3IgPSBmdW5jdGlvbihnYW1lKSB7XHJcbiAgdGhpcy5jb3VudGVyID0gMDtcclxuICB0aGlzLl9sYXN0UG9rZW1vbiA9IG51bGw7XHJcbiAgZ2FtZS5wcmVzZXJ2ZURyYXdpbmdCdWZmZXIgPSB0cnVlO1xyXG59XHJcblxyXG5FbmdpbmUuR2VuZXJhdG9yLnByb3RvdHlwZSA9IHtcclxuICBwcmVsb2FkOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMubG9hZC50ZXh0KCdwb2tlbW9uLmNzdicsICdhc3NldHMvZGF0YS9wb2tlbW9uLmNzdicpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdway1iZycsICdhc3NldHMvaW1hZ2VzL2JhY2tncm91bmQvYmctcGsuanBnJyk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gNzIxOyBpKyspIHtcclxuICAgICAgdGhpcy5sb2FkLmltYWdlKCdway0nICsgaSwgJ2Fzc2V0cy9pbWFnZXMvcG9rZW1vbnMvJyArIGkgKyAnLnBuZycpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2luaXRTb2NrZXQoKTtcclxuICB9LFxyXG5cclxuICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgRW5naW5lLlBva2Vtb25EQi5sb2FkKHRoaXMuY2FjaGUuZ2V0VGV4dCgncG9rZW1vbi5jc3YnKSk7XHJcblxyXG4gICAgdGhpcy5fYWRkQkcoKTtcclxuICAgIHRoaXMuX2FkZFdhdGVybWFyaygpO1xyXG4gICAgdGhpcy5fYWRkTGFibGUoKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KHRoaXMuX25leHRQb2tlbW9uLmJpbmQodGhpcyksIDMwMDApO1xyXG4gIH0sXHJcblxyXG4gIF9pbml0U29ja2V0OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc29ja2V0ID0gaW8oJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MScpO1xyXG4gIH0sXHJcblxyXG4gIF9hZGRCRzogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLmJnID0gdGhpcy5hZGQuaW1hZ2UoMCwgMCwgJ3BrLWJnJyk7XHJcbiAgfSxcclxuXHJcbiAgX2FkZFdhdGVybWFyazogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc3R5bGUgPSB7XHJcbiAgICAgIGZpbGw6ICcjYmFiYWJhJyxcclxuICAgICAgZm9udDogJzMwcHggT3BlbiBTYW5zJyxcclxuICAgICAgYWxpZ246ICdjZW50ZXInXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciB3YXRlcm1hcmsgPSB0aGlzLmFkZC50ZXh0KEVuZ2luZS5HQU1FX1dJRFRIIC8gMiwgNTAsIEVuZ2luZS5BUFBfTkFNRSwgc3R5bGUpO1xyXG4gICAgd2F0ZXJtYXJrLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gIH0sXHJcblxyXG4gIF9hZGRMYWJsZTogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc3R5bGUgPSB7XHJcbiAgICAgIGZpbGw6ICcjMzMzMzMzJyxcclxuICAgICAgZm9udDogJzUwcHggT3BlbiBTYW5zJyxcclxuICAgICAgYWxpZ246ICdjZW50ZXInXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubGFibGUgPSB0aGlzLmFkZC50ZXh0KEVuZ2luZS5HQU1FX1dJRFRIIC8gNCwgRW5naW5lLkdBTUVfSEVJR0hUIC8gMiwgJycsIHN0eWxlKTtcclxuICAgIHRoaXMubGFibGUuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgfSxcclxuXHJcbiAgX2NyZWF0ZUJHOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBibWQgPSB0aGlzLmFkZC5iaXRtYXBEYXRhKEVuZ2luZS5HQU1FX1dJRFRILCBFbmdpbmUuR0FNRV9IRUlHSFQpO1xyXG5cclxuICAgIGJtZC5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICBibWQuY3R4LnJlY3QoMCwgMCwgRW5naW5lLkdBTUVfV0lEVEgsIEVuZ2luZS5HQU1FX0hFSUdIVCk7XHJcbiAgICBibWQuY3R4LmZpbGxTdHlsZSA9ICdyZ2IoMjU1LCAyNTUsIDI1NSknO1xyXG4gICAgYm1kLmN0eC5maWxsKCk7XHJcblxyXG4gICAgdGhpcy5jYWNoZS5hZGRCaXRtYXBEYXRhKCdway1iZycsIGJtZCk7XHJcbiAgfSxcclxuXHJcbiAgX25leHRQb2tlbW9uOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuY291bnRlcisrO1xyXG5cclxuICAgIHRoaXMuX2NoYW5nZVBva2Vtb24oKTtcclxuICAgIHRoaXMuX3NhdmUoKTtcclxuXHJcbiAgICBpZiAodGhpcy5jb3VudGVyIDwgNzIxKSB7XHJcbiAgICAgIHNldFRpbWVvdXQodGhpcy5fbmV4dFBva2Vtb24uYmluZCh0aGlzKSwgMzAwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygnSSBhbSBmaW5pc2ghKSknKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBfY2hhbmdlUG9rZW1vbjogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcG9rZW1vbiA9IHRoaXMuYWRkLnNwcml0ZSh0aGlzLmdhbWUud2lkdGggKiAzIC8gNCwgdGhpcy5nYW1lLmhlaWdodCAvIDIsICdway0nICsgdGhpcy5jb3VudGVyKTtcclxuICAgIHBva2Vtb24uYW5jaG9yLnNldFRvKDAuNSk7XHJcblxyXG4gICAgdmFyIHByZVN0cmluZyA9ICfQryDQv9C+INGF0LDRgNCw0LrRgtC10YDRg1xcclxcbic7XHJcbiAgICB2YXIgcG9rZW1vbk5hbWUgPSBFbmdpbmUuUG9rZW1vbkRCLnBva2Vtb25zW3RoaXMuY291bnRlciAtIDFdLmlkZW50aWZpZXI7XHJcblxyXG4gICAgdGhpcy5sYWJsZS50ZXh0ID0gcHJlU3RyaW5nICsgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHBva2Vtb25OYW1lKTtcclxuICAgIHRoaXMubGFibGUuYWRkRm9udFdlaWdodCgnYm9sZGVyJywgcHJlU3RyaW5nLmxlbmd0aCAtIDIpO1xyXG5cclxuICAgIGlmICh0aGlzLl9sYXN0UG9rZW1vbiAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLl9sYXN0UG9rZW1vbi5raWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fbGFzdFBva2Vtb24gPSBwb2tlbW9uO1xyXG4gIH0sXHJcblxyXG4gIF9zYXZlOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBpbWFnZSA9IHRoaXMuZ2FtZS5jYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xyXG4gICAgdmFyIGlkID0gdGhpcy5jb3VudGVyO1xyXG4gICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgIGJpbjogaW1hZ2UsXHJcbiAgICAgIGlkOiBpZFxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc29ja2V0LmVtaXQoJ2ltZycsIGRhdGEpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cmluZykge1xyXG4gICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcclxufVxyXG4iLCJFbmdpbmUuR0FNRV9XSURUSCA9IDEwMDA7XHJcbkVuZ2luZS5HQU1FX0hFSUdIVCA9IDY0MDtcclxuRW5naW5lLkFQUF9OQU1FID0gJ3ZrLmNvbS9hcHA1NTg3OTg5JztcclxuRW5naW5lLkRFQlVHID0gdHJ1ZTtcclxuXHJcbnZhciBnYW1lID0gbmV3IFBoYXNlci5HYW1lKEVuZ2luZS5HQU1FX1dJRFRILCBFbmdpbmUuR0FNRV9IRUlHSFQsIFBoYXNlci5BVVRPLCAnZ2FtZScpO1xyXG5cclxuRW5naW5lLlJPTExfU0xJREVfQ09VTlQgPSA1MDtcclxuRW5naW5lLnJuZFBva2Vtb24gPSBnYW1lLnJuZC5iZXR3ZWVuKDEsIDcyMSk7XHJcblxyXG5nYW1lLnN0YXRlLmFkZCgnQm9vdCcsIEVuZ2luZS5Cb290KTtcclxuZ2FtZS5zdGF0ZS5hZGQoJ1ByZWxvYWRlcicsIEVuZ2luZS5QcmVsb2FkZXIpO1xyXG5nYW1lLnN0YXRlLmFkZCgnR2FtZScsIEVuZ2luZS5HYW1lKTtcclxuZ2FtZS5zdGF0ZS5hZGQoJ0NhbGN1bGF0ZScsIEVuZ2luZS5DYWxjdWxhdGUpO1xyXG5cclxuZ2FtZS5zdGF0ZS5zdGFydCgnQm9vdCcpO1xyXG4iLCJFbmdpbmUuUG9rZW1vbkRCID0ge1xyXG4gIGxvYWQ6IGZ1bmN0aW9uKGRhdGFUZXh0KSB7XHJcbiAgICB0aGlzLnBva2Vtb25zID0gW107XHJcbiAgICB2YXIgZGF0YSA9IFBhcGEucGFyc2UoZGF0YVRleHQpLmRhdGE7XHJcbiAgICB2YXIgZmllbGRzID0gZGF0YVswXTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIHBva2Vtb25EYXRhID0gZGF0YVtpXTtcclxuICAgICAgdmFyIHBva2Vtb25PYmogPSB7fTtcclxuXHJcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZmllbGRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgcG9rZW1vbk9ialtmaWVsZHNbal1dID0gcG9rZW1vbkRhdGFbal07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMucG9rZW1vbnMucHVzaChwb2tlbW9uT2JqKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
