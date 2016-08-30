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
    VK.preroll.setupPreroll(app_id);
    // VK.setupPreroll(app_id, {preview: 8});

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcGFwYXJzZS5taW4uanMiLCJib290LmpzIiwicHJlbG9hZGVyLmpzIiwiYW5zd2VyLmpzIiwiZ2FtZS5qcyIsInBva2ViYWxsLXN5cy5qcyIsInNsaWRlLmpzIiwiY2FsY3VsYXRlLmpzIiwiZ2VuZXJhdG9yLmpzIiwiYXBwLmpzIiwicG9rZW1vbkRCLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXHJcblx0UGFwYSBQYXJzZVxyXG5cdHY0LjEuMlxyXG5cdGh0dHBzOi8vZ2l0aHViLmNvbS9taG9sdC9QYXBhUGFyc2VcclxuKi9cclxuIWZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCxyKXtpZihyPXJ8fHt9LHIud29ya2VyJiZTLldPUktFUlNfU1VQUE9SVEVEKXt2YXIgbj1mKCk7cmV0dXJuIG4udXNlclN0ZXA9ci5zdGVwLG4udXNlckNodW5rPXIuY2h1bmssbi51c2VyQ29tcGxldGU9ci5jb21wbGV0ZSxuLnVzZXJFcnJvcj1yLmVycm9yLHIuc3RlcD1tKHIuc3RlcCksci5jaHVuaz1tKHIuY2h1bmspLHIuY29tcGxldGU9bShyLmNvbXBsZXRlKSxyLmVycm9yPW0oci5lcnJvciksZGVsZXRlIHIud29ya2VyLHZvaWQgbi5wb3N0TWVzc2FnZSh7aW5wdXQ6dCxjb25maWc6cix3b3JrZXJJZDpuLmlkfSl9dmFyIG89bnVsbDtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgdD9vPXIuZG93bmxvYWQ/bmV3IGkocik6bmV3IGEocik6KGUuRmlsZSYmdCBpbnN0YW5jZW9mIEZpbGV8fHQgaW5zdGFuY2VvZiBPYmplY3QpJiYobz1uZXcgcyhyKSksby5zdHJlYW0odCl9ZnVuY3Rpb24gcihlLHQpe2Z1bmN0aW9uIHIoKXtcIm9iamVjdFwiPT10eXBlb2YgdCYmKFwic3RyaW5nXCI9PXR5cGVvZiB0LmRlbGltaXRlciYmMT09dC5kZWxpbWl0ZXIubGVuZ3RoJiYtMT09Uy5CQURfREVMSU1JVEVSUy5pbmRleE9mKHQuZGVsaW1pdGVyKSYmKHU9dC5kZWxpbWl0ZXIpLChcImJvb2xlYW5cIj09dHlwZW9mIHQucXVvdGVzfHx0LnF1b3RlcyBpbnN0YW5jZW9mIEFycmF5KSYmKG89dC5xdW90ZXMpLFwic3RyaW5nXCI9PXR5cGVvZiB0Lm5ld2xpbmUmJihoPXQubmV3bGluZSkpfWZ1bmN0aW9uIG4oZSl7aWYoXCJvYmplY3RcIiE9dHlwZW9mIGUpcmV0dXJuW107dmFyIHQ9W107Zm9yKHZhciByIGluIGUpdC5wdXNoKHIpO3JldHVybiB0fWZ1bmN0aW9uIGkoZSx0KXt2YXIgcj1cIlwiO1wic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1KU09OLnBhcnNlKGUpKSxcInN0cmluZ1wiPT10eXBlb2YgdCYmKHQ9SlNPTi5wYXJzZSh0KSk7dmFyIG49ZSBpbnN0YW5jZW9mIEFycmF5JiZlLmxlbmd0aD4wLGk9ISh0WzBdaW5zdGFuY2VvZiBBcnJheSk7aWYobil7Zm9yKHZhciBhPTA7YTxlLmxlbmd0aDthKyspYT4wJiYocis9dSkscis9cyhlW2FdLGEpO3QubGVuZ3RoPjAmJihyKz1oKX1mb3IodmFyIG89MDtvPHQubGVuZ3RoO28rKyl7Zm9yKHZhciBmPW4/ZS5sZW5ndGg6dFtvXS5sZW5ndGgsYz0wO2Y+YztjKyspe2M+MCYmKHIrPXUpO3ZhciBkPW4mJmk/ZVtjXTpjO3IrPXModFtvXVtkXSxjKX1vPHQubGVuZ3RoLTEmJihyKz1oKX1yZXR1cm4gcn1mdW5jdGlvbiBzKGUsdCl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIGV8fG51bGw9PT1lKXJldHVyblwiXCI7ZT1lLnRvU3RyaW5nKCkucmVwbGFjZSgvXCIvZywnXCJcIicpO3ZhciByPVwiYm9vbGVhblwiPT10eXBlb2YgbyYmb3x8byBpbnN0YW5jZW9mIEFycmF5JiZvW3RdfHxhKGUsUy5CQURfREVMSU1JVEVSUyl8fGUuaW5kZXhPZih1KT4tMXx8XCIgXCI9PWUuY2hhckF0KDApfHxcIiBcIj09ZS5jaGFyQXQoZS5sZW5ndGgtMSk7cmV0dXJuIHI/J1wiJytlKydcIic6ZX1mdW5jdGlvbiBhKGUsdCl7Zm9yKHZhciByPTA7cjx0Lmxlbmd0aDtyKyspaWYoZS5pbmRleE9mKHRbcl0pPi0xKXJldHVybiEwO3JldHVybiExfXZhciBvPSExLHU9XCIsXCIsaD1cIlxcclxcblwiO2lmKHIoKSxcInN0cmluZ1wiPT10eXBlb2YgZSYmKGU9SlNPTi5wYXJzZShlKSksZSBpbnN0YW5jZW9mIEFycmF5KXtpZighZS5sZW5ndGh8fGVbMF1pbnN0YW5jZW9mIEFycmF5KXJldHVybiBpKG51bGwsZSk7aWYoXCJvYmplY3RcIj09dHlwZW9mIGVbMF0pcmV0dXJuIGkobihlWzBdKSxlKX1lbHNlIGlmKFwib2JqZWN0XCI9PXR5cGVvZiBlKXJldHVyblwic3RyaW5nXCI9PXR5cGVvZiBlLmRhdGEmJihlLmRhdGE9SlNPTi5wYXJzZShlLmRhdGEpKSxlLmRhdGEgaW5zdGFuY2VvZiBBcnJheSYmKGUuZmllbGRzfHwoZS5maWVsZHM9ZS5kYXRhWzBdaW5zdGFuY2VvZiBBcnJheT9lLmZpZWxkczpuKGUuZGF0YVswXSkpLGUuZGF0YVswXWluc3RhbmNlb2YgQXJyYXl8fFwib2JqZWN0XCI9PXR5cGVvZiBlLmRhdGFbMF18fChlLmRhdGE9W2UuZGF0YV0pKSxpKGUuZmllbGRzfHxbXSxlLmRhdGF8fFtdKTt0aHJvd1wiZXhjZXB0aW9uOiBVbmFibGUgdG8gc2VyaWFsaXplIHVucmVjb2duaXplZCBpbnB1dFwifWZ1bmN0aW9uIG4odCl7ZnVuY3Rpb24gcihlKXt2YXIgdD1fKGUpO3QuY2h1bmtTaXplPXBhcnNlSW50KHQuY2h1bmtTaXplKSxlLnN0ZXB8fGUuY2h1bmt8fCh0LmNodW5rU2l6ZT1udWxsKSx0aGlzLl9oYW5kbGU9bmV3IG8odCksdGhpcy5faGFuZGxlLnN0cmVhbWVyPXRoaXMsdGhpcy5fY29uZmlnPXR9dGhpcy5faGFuZGxlPW51bGwsdGhpcy5fcGF1c2VkPSExLHRoaXMuX2ZpbmlzaGVkPSExLHRoaXMuX2lucHV0PW51bGwsdGhpcy5fYmFzZUluZGV4PTAsdGhpcy5fcGFydGlhbExpbmU9XCJcIix0aGlzLl9yb3dDb3VudD0wLHRoaXMuX3N0YXJ0PTAsdGhpcy5fbmV4dENodW5rPW51bGwsdGhpcy5pc0ZpcnN0Q2h1bms9ITAsdGhpcy5fY29tcGxldGVSZXN1bHRzPXtkYXRhOltdLGVycm9yczpbXSxtZXRhOnt9fSxyLmNhbGwodGhpcyx0KSx0aGlzLnBhcnNlQ2h1bms9ZnVuY3Rpb24odCl7aWYodGhpcy5pc0ZpcnN0Q2h1bmsmJm0odGhpcy5fY29uZmlnLmJlZm9yZUZpcnN0Q2h1bmspKXt2YXIgcj10aGlzLl9jb25maWcuYmVmb3JlRmlyc3RDaHVuayh0KTt2b2lkIDAhPT1yJiYodD1yKX10aGlzLmlzRmlyc3RDaHVuaz0hMTt2YXIgbj10aGlzLl9wYXJ0aWFsTGluZSt0O3RoaXMuX3BhcnRpYWxMaW5lPVwiXCI7dmFyIGk9dGhpcy5faGFuZGxlLnBhcnNlKG4sdGhpcy5fYmFzZUluZGV4LCF0aGlzLl9maW5pc2hlZCk7aWYoIXRoaXMuX2hhbmRsZS5wYXVzZWQoKSYmIXRoaXMuX2hhbmRsZS5hYm9ydGVkKCkpe3ZhciBzPWkubWV0YS5jdXJzb3I7dGhpcy5fZmluaXNoZWR8fCh0aGlzLl9wYXJ0aWFsTGluZT1uLnN1YnN0cmluZyhzLXRoaXMuX2Jhc2VJbmRleCksdGhpcy5fYmFzZUluZGV4PXMpLGkmJmkuZGF0YSYmKHRoaXMuX3Jvd0NvdW50Kz1pLmRhdGEubGVuZ3RoKTt2YXIgYT10aGlzLl9maW5pc2hlZHx8dGhpcy5fY29uZmlnLnByZXZpZXcmJnRoaXMuX3Jvd0NvdW50Pj10aGlzLl9jb25maWcucHJldmlldztpZih5KWUucG9zdE1lc3NhZ2Uoe3Jlc3VsdHM6aSx3b3JrZXJJZDpTLldPUktFUl9JRCxmaW5pc2hlZDphfSk7ZWxzZSBpZihtKHRoaXMuX2NvbmZpZy5jaHVuaykpe2lmKHRoaXMuX2NvbmZpZy5jaHVuayhpLHRoaXMuX2hhbmRsZSksdGhpcy5fcGF1c2VkKXJldHVybjtpPXZvaWQgMCx0aGlzLl9jb21wbGV0ZVJlc3VsdHM9dm9pZCAwfXJldHVybiB0aGlzLl9jb25maWcuc3RlcHx8dGhpcy5fY29uZmlnLmNodW5rfHwodGhpcy5fY29tcGxldGVSZXN1bHRzLmRhdGE9dGhpcy5fY29tcGxldGVSZXN1bHRzLmRhdGEuY29uY2F0KGkuZGF0YSksdGhpcy5fY29tcGxldGVSZXN1bHRzLmVycm9ycz10aGlzLl9jb21wbGV0ZVJlc3VsdHMuZXJyb3JzLmNvbmNhdChpLmVycm9ycyksdGhpcy5fY29tcGxldGVSZXN1bHRzLm1ldGE9aS5tZXRhKSwhYXx8IW0odGhpcy5fY29uZmlnLmNvbXBsZXRlKXx8aSYmaS5tZXRhLmFib3J0ZWR8fHRoaXMuX2NvbmZpZy5jb21wbGV0ZSh0aGlzLl9jb21wbGV0ZVJlc3VsdHMpLGF8fGkmJmkubWV0YS5wYXVzZWR8fHRoaXMuX25leHRDaHVuaygpLGl9fSx0aGlzLl9zZW5kRXJyb3I9ZnVuY3Rpb24odCl7bSh0aGlzLl9jb25maWcuZXJyb3IpP3RoaXMuX2NvbmZpZy5lcnJvcih0KTp5JiZ0aGlzLl9jb25maWcuZXJyb3ImJmUucG9zdE1lc3NhZ2Uoe3dvcmtlcklkOlMuV09SS0VSX0lELGVycm9yOnQsZmluaXNoZWQ6ITF9KX19ZnVuY3Rpb24gaShlKXtmdW5jdGlvbiB0KGUpe3ZhciB0PWUuZ2V0UmVzcG9uc2VIZWFkZXIoXCJDb250ZW50LVJhbmdlXCIpO3JldHVybiBwYXJzZUludCh0LnN1YnN0cih0Lmxhc3RJbmRleE9mKFwiL1wiKSsxKSl9ZT1lfHx7fSxlLmNodW5rU2l6ZXx8KGUuY2h1bmtTaXplPVMuUmVtb3RlQ2h1bmtTaXplKSxuLmNhbGwodGhpcyxlKTt2YXIgcjt0aGlzLl9uZXh0Q2h1bms9az9mdW5jdGlvbigpe3RoaXMuX3JlYWRDaHVuaygpLHRoaXMuX2NodW5rTG9hZGVkKCl9OmZ1bmN0aW9uKCl7dGhpcy5fcmVhZENodW5rKCl9LHRoaXMuc3RyZWFtPWZ1bmN0aW9uKGUpe3RoaXMuX2lucHV0PWUsdGhpcy5fbmV4dENodW5rKCl9LHRoaXMuX3JlYWRDaHVuaz1mdW5jdGlvbigpe2lmKHRoaXMuX2ZpbmlzaGVkKXJldHVybiB2b2lkIHRoaXMuX2NodW5rTG9hZGVkKCk7aWYocj1uZXcgWE1MSHR0cFJlcXVlc3Qsa3x8KHIub25sb2FkPWcodGhpcy5fY2h1bmtMb2FkZWQsdGhpcyksci5vbmVycm9yPWcodGhpcy5fY2h1bmtFcnJvcix0aGlzKSksci5vcGVuKFwiR0VUXCIsdGhpcy5faW5wdXQsIWspLHRoaXMuX2NvbmZpZy5jaHVua1NpemUpe3ZhciBlPXRoaXMuX3N0YXJ0K3RoaXMuX2NvbmZpZy5jaHVua1NpemUtMTtyLnNldFJlcXVlc3RIZWFkZXIoXCJSYW5nZVwiLFwiYnl0ZXM9XCIrdGhpcy5fc3RhcnQrXCItXCIrZSksci5zZXRSZXF1ZXN0SGVhZGVyKFwiSWYtTm9uZS1NYXRjaFwiLFwid2Via2l0LW5vLWNhY2hlXCIpfXRyeXtyLnNlbmQoKX1jYXRjaCh0KXt0aGlzLl9jaHVua0Vycm9yKHQubWVzc2FnZSl9ayYmMD09ci5zdGF0dXM/dGhpcy5fY2h1bmtFcnJvcigpOnRoaXMuX3N0YXJ0Kz10aGlzLl9jb25maWcuY2h1bmtTaXplfSx0aGlzLl9jaHVua0xvYWRlZD1mdW5jdGlvbigpe2lmKDQ9PXIucmVhZHlTdGF0ZSl7aWYoci5zdGF0dXM8MjAwfHxyLnN0YXR1cz49NDAwKXJldHVybiB2b2lkIHRoaXMuX2NodW5rRXJyb3IoKTt0aGlzLl9maW5pc2hlZD0hdGhpcy5fY29uZmlnLmNodW5rU2l6ZXx8dGhpcy5fc3RhcnQ+dChyKSx0aGlzLnBhcnNlQ2h1bmsoci5yZXNwb25zZVRleHQpfX0sdGhpcy5fY2h1bmtFcnJvcj1mdW5jdGlvbihlKXt2YXIgdD1yLnN0YXR1c1RleHR8fGU7dGhpcy5fc2VuZEVycm9yKHQpfX1mdW5jdGlvbiBzKGUpe2U9ZXx8e30sZS5jaHVua1NpemV8fChlLmNodW5rU2l6ZT1TLkxvY2FsQ2h1bmtTaXplKSxuLmNhbGwodGhpcyxlKTt2YXIgdCxyLGk9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEZpbGVSZWFkZXI7dGhpcy5zdHJlYW09ZnVuY3Rpb24oZSl7dGhpcy5faW5wdXQ9ZSxyPWUuc2xpY2V8fGUud2Via2l0U2xpY2V8fGUubW96U2xpY2UsaT8odD1uZXcgRmlsZVJlYWRlcix0Lm9ubG9hZD1nKHRoaXMuX2NodW5rTG9hZGVkLHRoaXMpLHQub25lcnJvcj1nKHRoaXMuX2NodW5rRXJyb3IsdGhpcykpOnQ9bmV3IEZpbGVSZWFkZXJTeW5jLHRoaXMuX25leHRDaHVuaygpfSx0aGlzLl9uZXh0Q2h1bms9ZnVuY3Rpb24oKXt0aGlzLl9maW5pc2hlZHx8dGhpcy5fY29uZmlnLnByZXZpZXcmJiEodGhpcy5fcm93Q291bnQ8dGhpcy5fY29uZmlnLnByZXZpZXcpfHx0aGlzLl9yZWFkQ2h1bmsoKX0sdGhpcy5fcmVhZENodW5rPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5faW5wdXQ7aWYodGhpcy5fY29uZmlnLmNodW5rU2l6ZSl7dmFyIG49TWF0aC5taW4odGhpcy5fc3RhcnQrdGhpcy5fY29uZmlnLmNodW5rU2l6ZSx0aGlzLl9pbnB1dC5zaXplKTtlPXIuY2FsbChlLHRoaXMuX3N0YXJ0LG4pfXZhciBzPXQucmVhZEFzVGV4dChlLHRoaXMuX2NvbmZpZy5lbmNvZGluZyk7aXx8dGhpcy5fY2h1bmtMb2FkZWQoe3RhcmdldDp7cmVzdWx0OnN9fSl9LHRoaXMuX2NodW5rTG9hZGVkPWZ1bmN0aW9uKGUpe3RoaXMuX3N0YXJ0Kz10aGlzLl9jb25maWcuY2h1bmtTaXplLHRoaXMuX2ZpbmlzaGVkPSF0aGlzLl9jb25maWcuY2h1bmtTaXplfHx0aGlzLl9zdGFydD49dGhpcy5faW5wdXQuc2l6ZSx0aGlzLnBhcnNlQ2h1bmsoZS50YXJnZXQucmVzdWx0KX0sdGhpcy5fY2h1bmtFcnJvcj1mdW5jdGlvbigpe3RoaXMuX3NlbmRFcnJvcih0LmVycm9yKX19ZnVuY3Rpb24gYShlKXtlPWV8fHt9LG4uY2FsbCh0aGlzLGUpO3ZhciB0LHI7dGhpcy5zdHJlYW09ZnVuY3Rpb24oZSl7cmV0dXJuIHQ9ZSxyPWUsdGhpcy5fbmV4dENodW5rKCl9LHRoaXMuX25leHRDaHVuaz1mdW5jdGlvbigpe2lmKCF0aGlzLl9maW5pc2hlZCl7dmFyIGU9dGhpcy5fY29uZmlnLmNodW5rU2l6ZSx0PWU/ci5zdWJzdHIoMCxlKTpyO3JldHVybiByPWU/ci5zdWJzdHIoZSk6XCJcIix0aGlzLl9maW5pc2hlZD0hcix0aGlzLnBhcnNlQ2h1bmsodCl9fX1mdW5jdGlvbiBvKGUpe2Z1bmN0aW9uIHQoKXtpZihiJiZkJiYoaChcIkRlbGltaXRlclwiLFwiVW5kZXRlY3RhYmxlRGVsaW1pdGVyXCIsXCJVbmFibGUgdG8gYXV0by1kZXRlY3QgZGVsaW1pdGluZyBjaGFyYWN0ZXI7IGRlZmF1bHRlZCB0byAnXCIrUy5EZWZhdWx0RGVsaW1pdGVyK1wiJ1wiKSxkPSExKSxlLnNraXBFbXB0eUxpbmVzKWZvcih2YXIgdD0wO3Q8Yi5kYXRhLmxlbmd0aDt0KyspMT09Yi5kYXRhW3RdLmxlbmd0aCYmXCJcIj09Yi5kYXRhW3RdWzBdJiZiLmRhdGEuc3BsaWNlKHQtLSwxKTtyZXR1cm4gcigpJiZuKCksaSgpfWZ1bmN0aW9uIHIoKXtyZXR1cm4gZS5oZWFkZXImJjA9PXkubGVuZ3RofWZ1bmN0aW9uIG4oKXtpZihiKXtmb3IodmFyIGU9MDtyKCkmJmU8Yi5kYXRhLmxlbmd0aDtlKyspZm9yKHZhciB0PTA7dDxiLmRhdGFbZV0ubGVuZ3RoO3QrKyl5LnB1c2goYi5kYXRhW2VdW3RdKTtiLmRhdGEuc3BsaWNlKDAsMSl9fWZ1bmN0aW9uIGkoKXtpZighYnx8IWUuaGVhZGVyJiYhZS5keW5hbWljVHlwaW5nKXJldHVybiBiO2Zvcih2YXIgdD0wO3Q8Yi5kYXRhLmxlbmd0aDt0Kyspe2Zvcih2YXIgcj17fSxuPTA7bjxiLmRhdGFbdF0ubGVuZ3RoO24rKyl7aWYoZS5keW5hbWljVHlwaW5nKXt2YXIgaT1iLmRhdGFbdF1bbl07Yi5kYXRhW3RdW25dPVwidHJ1ZVwiPT1pfHxcIlRSVUVcIj09aT8hMDpcImZhbHNlXCI9PWl8fFwiRkFMU0VcIj09aT8hMTpvKGkpfWUuaGVhZGVyJiYobj49eS5sZW5ndGg/KHIuX19wYXJzZWRfZXh0cmF8fChyLl9fcGFyc2VkX2V4dHJhPVtdKSxyLl9fcGFyc2VkX2V4dHJhLnB1c2goYi5kYXRhW3RdW25dKSk6clt5W25dXT1iLmRhdGFbdF1bbl0pfWUuaGVhZGVyJiYoYi5kYXRhW3RdPXIsbj55Lmxlbmd0aD9oKFwiRmllbGRNaXNtYXRjaFwiLFwiVG9vTWFueUZpZWxkc1wiLFwiVG9vIG1hbnkgZmllbGRzOiBleHBlY3RlZCBcIit5Lmxlbmd0aCtcIiBmaWVsZHMgYnV0IHBhcnNlZCBcIituLHQpOm48eS5sZW5ndGgmJmgoXCJGaWVsZE1pc21hdGNoXCIsXCJUb29GZXdGaWVsZHNcIixcIlRvbyBmZXcgZmllbGRzOiBleHBlY3RlZCBcIit5Lmxlbmd0aCtcIiBmaWVsZHMgYnV0IHBhcnNlZCBcIituLHQpKX1yZXR1cm4gZS5oZWFkZXImJmIubWV0YSYmKGIubWV0YS5maWVsZHM9eSksYn1mdW5jdGlvbiBzKHQpe2Zvcih2YXIgcixuLGkscz1bXCIsXCIsXCJcdFwiLFwifFwiLFwiO1wiLFMuUkVDT1JEX1NFUCxTLlVOSVRfU0VQXSxhPTA7YTxzLmxlbmd0aDthKyspe3ZhciBvPXNbYV0saD0wLGY9MDtpPXZvaWQgMDtmb3IodmFyIGM9bmV3IHUoe2RlbGltaXRlcjpvLHByZXZpZXc6MTB9KS5wYXJzZSh0KSxkPTA7ZDxjLmRhdGEubGVuZ3RoO2QrKyl7dmFyIGw9Yy5kYXRhW2RdLmxlbmd0aDtmKz1sLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpP2w+MSYmKGgrPU1hdGguYWJzKGwtaSksaT1sKTppPWx9Yy5kYXRhLmxlbmd0aD4wJiYoZi89Yy5kYXRhLmxlbmd0aCksKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBufHxuPmgpJiZmPjEuOTkmJihuPWgscj1vKX1yZXR1cm4gZS5kZWxpbWl0ZXI9cix7c3VjY2Vzc2Z1bDohIXIsYmVzdERlbGltaXRlcjpyfX1mdW5jdGlvbiBhKGUpe2U9ZS5zdWJzdHIoMCwxMDQ4NTc2KTt2YXIgdD1lLnNwbGl0KFwiXFxyXCIpO2lmKDE9PXQubGVuZ3RoKXJldHVyblwiXFxuXCI7Zm9yKHZhciByPTAsbj0wO248dC5sZW5ndGg7bisrKVwiXFxuXCI9PXRbbl1bMF0mJnIrKztyZXR1cm4gcj49dC5sZW5ndGgvMj9cIlxcclxcblwiOlwiXFxyXCJ9ZnVuY3Rpb24gbyhlKXt2YXIgdD1sLnRlc3QoZSk7cmV0dXJuIHQ/cGFyc2VGbG9hdChlKTplfWZ1bmN0aW9uIGgoZSx0LHIsbil7Yi5lcnJvcnMucHVzaCh7dHlwZTplLGNvZGU6dCxtZXNzYWdlOnIscm93Om59KX12YXIgZixjLGQsbD0vXlxccyotPyhcXGQqXFwuP1xcZCt8XFxkK1xcLj9cXGQqKShlWy0rXT9cXGQrKT9cXHMqJC9pLHA9dGhpcyxnPTAsdj0hMSxrPSExLHk9W10sYj17ZGF0YTpbXSxlcnJvcnM6W10sbWV0YTp7fX07aWYobShlLnN0ZXApKXt2YXIgUj1lLnN0ZXA7ZS5zdGVwPWZ1bmN0aW9uKG4pe2lmKGI9bixyKCkpdCgpO2Vsc2V7aWYodCgpLDA9PWIuZGF0YS5sZW5ndGgpcmV0dXJuO2crPW4uZGF0YS5sZW5ndGgsZS5wcmV2aWV3JiZnPmUucHJldmlldz9jLmFib3J0KCk6UihiLHApfX19dGhpcy5wYXJzZT1mdW5jdGlvbihyLG4saSl7aWYoZS5uZXdsaW5lfHwoZS5uZXdsaW5lPWEocikpLGQ9ITEsIWUuZGVsaW1pdGVyKXt2YXIgbz1zKHIpO28uc3VjY2Vzc2Z1bD9lLmRlbGltaXRlcj1vLmJlc3REZWxpbWl0ZXI6KGQ9ITAsZS5kZWxpbWl0ZXI9Uy5EZWZhdWx0RGVsaW1pdGVyKSxiLm1ldGEuZGVsaW1pdGVyPWUuZGVsaW1pdGVyfXZhciBoPV8oZSk7cmV0dXJuIGUucHJldmlldyYmZS5oZWFkZXImJmgucHJldmlldysrLGY9cixjPW5ldyB1KGgpLGI9Yy5wYXJzZShmLG4saSksdCgpLHY/e21ldGE6e3BhdXNlZDohMH19OmJ8fHttZXRhOntwYXVzZWQ6ITF9fX0sdGhpcy5wYXVzZWQ9ZnVuY3Rpb24oKXtyZXR1cm4gdn0sdGhpcy5wYXVzZT1mdW5jdGlvbigpe3Y9ITAsYy5hYm9ydCgpLGY9Zi5zdWJzdHIoYy5nZXRDaGFySW5kZXgoKSl9LHRoaXMucmVzdW1lPWZ1bmN0aW9uKCl7dj0hMSxwLnN0cmVhbWVyLnBhcnNlQ2h1bmsoZil9LHRoaXMuYWJvcnRlZD1mdW5jdGlvbigpe3JldHVybiBrfSx0aGlzLmFib3J0PWZ1bmN0aW9uKCl7az0hMCxjLmFib3J0KCksYi5tZXRhLmFib3J0ZWQ9ITAsbShlLmNvbXBsZXRlKSYmZS5jb21wbGV0ZShiKSxmPVwiXCJ9fWZ1bmN0aW9uIHUoZSl7ZT1lfHx7fTt2YXIgdD1lLmRlbGltaXRlcixyPWUubmV3bGluZSxuPWUuY29tbWVudHMsaT1lLnN0ZXAscz1lLnByZXZpZXcsYT1lLmZhc3RNb2RlO2lmKChcInN0cmluZ1wiIT10eXBlb2YgdHx8Uy5CQURfREVMSU1JVEVSUy5pbmRleE9mKHQpPi0xKSYmKHQ9XCIsXCIpLG49PT10KXRocm93XCJDb21tZW50IGNoYXJhY3RlciBzYW1lIGFzIGRlbGltaXRlclwiO249PT0hMD9uPVwiI1wiOihcInN0cmluZ1wiIT10eXBlb2Ygbnx8Uy5CQURfREVMSU1JVEVSUy5pbmRleE9mKG4pPi0xKSYmKG49ITEpLFwiXFxuXCIhPXImJlwiXFxyXCIhPXImJlwiXFxyXFxuXCIhPXImJihyPVwiXFxuXCIpO3ZhciBvPTAsdT0hMTt0aGlzLnBhcnNlPWZ1bmN0aW9uKGUsaCxmKXtmdW5jdGlvbiBjKGUpe2IucHVzaChlKSxTPW99ZnVuY3Rpb24gZCh0KXtyZXR1cm4gZj9wKCk6KFwidW5kZWZpbmVkXCI9PXR5cGVvZiB0JiYodD1lLnN1YnN0cihvKSksdy5wdXNoKHQpLG89ZyxjKHcpLHkmJl8oKSxwKCkpfWZ1bmN0aW9uIGwodCl7bz10LGModyksdz1bXSxPPWUuaW5kZXhPZihyLG8pfWZ1bmN0aW9uIHAoZSl7cmV0dXJue2RhdGE6YixlcnJvcnM6UixtZXRhOntkZWxpbWl0ZXI6dCxsaW5lYnJlYWs6cixhYm9ydGVkOnUsdHJ1bmNhdGVkOiEhZSxjdXJzb3I6UysoaHx8MCl9fX1mdW5jdGlvbiBfKCl7aShwKCkpLGI9W10sUj1bXX1pZihcInN0cmluZ1wiIT10eXBlb2YgZSl0aHJvd1wiSW5wdXQgbXVzdCBiZSBhIHN0cmluZ1wiO3ZhciBnPWUubGVuZ3RoLG09dC5sZW5ndGgsdj1yLmxlbmd0aCxrPW4ubGVuZ3RoLHk9XCJmdW5jdGlvblwiPT10eXBlb2YgaTtvPTA7dmFyIGI9W10sUj1bXSx3PVtdLFM9MDtpZighZSlyZXR1cm4gcCgpO2lmKGF8fGEhPT0hMSYmLTE9PT1lLmluZGV4T2YoJ1wiJykpe2Zvcih2YXIgQz1lLnNwbGl0KHIpLEU9MDtFPEMubGVuZ3RoO0UrKyl7dmFyIHc9Q1tFXTtpZihvKz13Lmxlbmd0aCxFIT09Qy5sZW5ndGgtMSlvKz1yLmxlbmd0aDtlbHNlIGlmKGYpcmV0dXJuIHAoKTtpZighbnx8dy5zdWJzdHIoMCxrKSE9bil7aWYoeSl7aWYoYj1bXSxjKHcuc3BsaXQodCkpLF8oKSx1KXJldHVybiBwKCl9ZWxzZSBjKHcuc3BsaXQodCkpO2lmKHMmJkU+PXMpcmV0dXJuIGI9Yi5zbGljZSgwLHMpLHAoITApfX1yZXR1cm4gcCgpfWZvcih2YXIgeD1lLmluZGV4T2YodCxvKSxPPWUuaW5kZXhPZihyLG8pOzspaWYoJ1wiJyE9ZVtvXSlpZihuJiYwPT09dy5sZW5ndGgmJmUuc3Vic3RyKG8sayk9PT1uKXtpZigtMT09TylyZXR1cm4gcCgpO289Tyt2LE89ZS5pbmRleE9mKHIsbykseD1lLmluZGV4T2YodCxvKX1lbHNlIGlmKC0xIT09eCYmKE8+eHx8LTE9PT1PKSl3LnB1c2goZS5zdWJzdHJpbmcobyx4KSksbz14K20seD1lLmluZGV4T2YodCxvKTtlbHNle2lmKC0xPT09TylicmVhaztpZih3LnB1c2goZS5zdWJzdHJpbmcobyxPKSksbChPK3YpLHkmJihfKCksdSkpcmV0dXJuIHAoKTtpZihzJiZiLmxlbmd0aD49cylyZXR1cm4gcCghMCl9ZWxzZXt2YXIgST1vO2ZvcihvKys7Oyl7dmFyIEk9ZS5pbmRleE9mKCdcIicsSSsxKTtpZigtMT09PUkpcmV0dXJuIGZ8fFIucHVzaCh7dHlwZTpcIlF1b3Rlc1wiLGNvZGU6XCJNaXNzaW5nUXVvdGVzXCIsbWVzc2FnZTpcIlF1b3RlZCBmaWVsZCB1bnRlcm1pbmF0ZWRcIixyb3c6Yi5sZW5ndGgsaW5kZXg6b30pLGQoKTtpZihJPT09Zy0xKXt2YXIgRD1lLnN1YnN0cmluZyhvLEkpLnJlcGxhY2UoL1wiXCIvZywnXCInKTtyZXR1cm4gZChEKX1pZignXCInIT1lW0krMV0pe2lmKGVbSSsxXT09dCl7dy5wdXNoKGUuc3Vic3RyaW5nKG8sSSkucmVwbGFjZSgvXCJcIi9nLCdcIicpKSxvPUkrMSttLHg9ZS5pbmRleE9mKHQsbyksTz1lLmluZGV4T2YocixvKTticmVha31pZihlLnN1YnN0cihJKzEsdik9PT1yKXtpZih3LnB1c2goZS5zdWJzdHJpbmcobyxJKS5yZXBsYWNlKC9cIlwiL2csJ1wiJykpLGwoSSsxK3YpLHg9ZS5pbmRleE9mKHQsbykseSYmKF8oKSx1KSlyZXR1cm4gcCgpO2lmKHMmJmIubGVuZ3RoPj1zKXJldHVybiBwKCEwKTticmVha319ZWxzZSBJKyt9fXJldHVybiBkKCl9LHRoaXMuYWJvcnQ9ZnVuY3Rpb24oKXt1PSEwfSx0aGlzLmdldENoYXJJbmRleD1mdW5jdGlvbigpe3JldHVybiBvfX1mdW5jdGlvbiBoKCl7dmFyIGU9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7cmV0dXJuIGUubGVuZ3RoP2VbZS5sZW5ndGgtMV0uc3JjOlwiXCJ9ZnVuY3Rpb24gZigpe2lmKCFTLldPUktFUlNfU1VQUE9SVEVEKXJldHVybiExO2lmKCFiJiZudWxsPT09Uy5TQ1JJUFRfUEFUSCl0aHJvdyBuZXcgRXJyb3IoXCJTY3JpcHQgcGF0aCBjYW5ub3QgYmUgZGV0ZXJtaW5lZCBhdXRvbWF0aWNhbGx5IHdoZW4gUGFwYSBQYXJzZSBpcyBsb2FkZWQgYXN5bmNocm9ub3VzbHkuIFlvdSBuZWVkIHRvIHNldCBQYXBhLlNDUklQVF9QQVRIIG1hbnVhbGx5LlwiKTt2YXIgdD1TLlNDUklQVF9QQVRIfHx2O3QrPSgtMSE9PXQuaW5kZXhPZihcIj9cIik/XCImXCI6XCI/XCIpK1wicGFwYXdvcmtlclwiO3ZhciByPW5ldyBlLldvcmtlcih0KTtyZXR1cm4gci5vbm1lc3NhZ2U9YyxyLmlkPXcrKyxSW3IuaWRdPXIscn1mdW5jdGlvbiBjKGUpe3ZhciB0PWUuZGF0YSxyPVJbdC53b3JrZXJJZF0sbj0hMTtpZih0LmVycm9yKXIudXNlckVycm9yKHQuZXJyb3IsdC5maWxlKTtlbHNlIGlmKHQucmVzdWx0cyYmdC5yZXN1bHRzLmRhdGEpe3ZhciBpPWZ1bmN0aW9uKCl7bj0hMCxkKHQud29ya2VySWQse2RhdGE6W10sZXJyb3JzOltdLG1ldGE6e2Fib3J0ZWQ6ITB9fSl9LHM9e2Fib3J0OmkscGF1c2U6bCxyZXN1bWU6bH07aWYobShyLnVzZXJTdGVwKSl7Zm9yKHZhciBhPTA7YTx0LnJlc3VsdHMuZGF0YS5sZW5ndGgmJihyLnVzZXJTdGVwKHtkYXRhOlt0LnJlc3VsdHMuZGF0YVthXV0sZXJyb3JzOnQucmVzdWx0cy5lcnJvcnMsbWV0YTp0LnJlc3VsdHMubWV0YX0scyksIW4pO2ErKyk7ZGVsZXRlIHQucmVzdWx0c31lbHNlIG0oci51c2VyQ2h1bmspJiYoci51c2VyQ2h1bmsodC5yZXN1bHRzLHMsdC5maWxlKSxkZWxldGUgdC5yZXN1bHRzKX10LmZpbmlzaGVkJiYhbiYmZCh0LndvcmtlcklkLHQucmVzdWx0cyl9ZnVuY3Rpb24gZChlLHQpe3ZhciByPVJbZV07bShyLnVzZXJDb21wbGV0ZSkmJnIudXNlckNvbXBsZXRlKHQpLHIudGVybWluYXRlKCksZGVsZXRlIFJbZV19ZnVuY3Rpb24gbCgpe3Rocm93XCJOb3QgaW1wbGVtZW50ZWQuXCJ9ZnVuY3Rpb24gcCh0KXt2YXIgcj10LmRhdGE7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFMuV09SS0VSX0lEJiZyJiYoUy5XT1JLRVJfSUQ9ci53b3JrZXJJZCksXCJzdHJpbmdcIj09dHlwZW9mIHIuaW5wdXQpZS5wb3N0TWVzc2FnZSh7d29ya2VySWQ6Uy5XT1JLRVJfSUQscmVzdWx0czpTLnBhcnNlKHIuaW5wdXQsci5jb25maWcpLGZpbmlzaGVkOiEwfSk7ZWxzZSBpZihlLkZpbGUmJnIuaW5wdXQgaW5zdGFuY2VvZiBGaWxlfHxyLmlucHV0IGluc3RhbmNlb2YgT2JqZWN0KXt2YXIgbj1TLnBhcnNlKHIuaW5wdXQsci5jb25maWcpO24mJmUucG9zdE1lc3NhZ2Uoe3dvcmtlcklkOlMuV09SS0VSX0lELHJlc3VsdHM6bixmaW5pc2hlZDohMH0pfX1mdW5jdGlvbiBfKGUpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiBlKXJldHVybiBlO3ZhciB0PWUgaW5zdGFuY2VvZiBBcnJheT9bXTp7fTtmb3IodmFyIHIgaW4gZSl0W3JdPV8oZVtyXSk7cmV0dXJuIHR9ZnVuY3Rpb24gZyhlLHQpe3JldHVybiBmdW5jdGlvbigpe2UuYXBwbHkodCxhcmd1bWVudHMpfX1mdW5jdGlvbiBtKGUpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGV9dmFyIHYsaz0hZS5kb2N1bWVudCYmISFlLnBvc3RNZXNzYWdlLHk9ayYmLyhcXD98JilwYXBhd29ya2VyKD18JnwkKS8udGVzdChlLmxvY2F0aW9uLnNlYXJjaCksYj0hMSxSPXt9LHc9MCxTPXt9O2lmKFMucGFyc2U9dCxTLnVucGFyc2U9cixTLlJFQ09SRF9TRVA9U3RyaW5nLmZyb21DaGFyQ29kZSgzMCksUy5VTklUX1NFUD1TdHJpbmcuZnJvbUNoYXJDb2RlKDMxKSxTLkJZVEVfT1JERVJfTUFSSz1cIu+7v1wiLFMuQkFEX0RFTElNSVRFUlM9W1wiXFxyXCIsXCJcXG5cIiwnXCInLFMuQllURV9PUkRFUl9NQVJLXSxTLldPUktFUlNfU1VQUE9SVEVEPSFrJiYhIWUuV29ya2VyLFMuU0NSSVBUX1BBVEg9bnVsbCxTLkxvY2FsQ2h1bmtTaXplPTEwNDg1NzYwLFMuUmVtb3RlQ2h1bmtTaXplPTUyNDI4ODAsUy5EZWZhdWx0RGVsaW1pdGVyPVwiLFwiLFMuUGFyc2VyPXUsUy5QYXJzZXJIYW5kbGU9byxTLk5ldHdvcmtTdHJlYW1lcj1pLFMuRmlsZVN0cmVhbWVyPXMsUy5TdHJpbmdTdHJlYW1lcj1hLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPVM6bShlLmRlZmluZSkmJmUuZGVmaW5lLmFtZD9kZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gU30pOmUuUGFwYT1TLGUualF1ZXJ5KXt2YXIgQz1lLmpRdWVyeTtDLmZuLnBhcnNlPWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIHIoKXtpZigwPT1hLmxlbmd0aClyZXR1cm4gdm9pZChtKHQuY29tcGxldGUpJiZ0LmNvbXBsZXRlKCkpO3ZhciBlPWFbMF07aWYobSh0LmJlZm9yZSkpe3ZhciByPXQuYmVmb3JlKGUuZmlsZSxlLmlucHV0RWxlbSk7aWYoXCJvYmplY3RcIj09dHlwZW9mIHIpe2lmKFwiYWJvcnRcIj09ci5hY3Rpb24pcmV0dXJuIHZvaWQgbihcIkFib3J0RXJyb3JcIixlLmZpbGUsZS5pbnB1dEVsZW0sci5yZWFzb24pO2lmKFwic2tpcFwiPT1yLmFjdGlvbilyZXR1cm4gdm9pZCBpKCk7XCJvYmplY3RcIj09dHlwZW9mIHIuY29uZmlnJiYoZS5pbnN0YW5jZUNvbmZpZz1DLmV4dGVuZChlLmluc3RhbmNlQ29uZmlnLHIuY29uZmlnKSl9ZWxzZSBpZihcInNraXBcIj09cilyZXR1cm4gdm9pZCBpKCl9dmFyIHM9ZS5pbnN0YW5jZUNvbmZpZy5jb21wbGV0ZTtlLmluc3RhbmNlQ29uZmlnLmNvbXBsZXRlPWZ1bmN0aW9uKHQpe20ocykmJnModCxlLmZpbGUsZS5pbnB1dEVsZW0pLGkoKX0sUy5wYXJzZShlLmZpbGUsZS5pbnN0YW5jZUNvbmZpZyl9ZnVuY3Rpb24gbihlLHIsbixpKXttKHQuZXJyb3IpJiZ0LmVycm9yKHtuYW1lOmV9LHIsbixpKX1mdW5jdGlvbiBpKCl7YS5zcGxpY2UoMCwxKSxyKCl9dmFyIHM9dC5jb25maWd8fHt9LGE9W107cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciB0PVwiSU5QVVRcIj09Qyh0aGlzKS5wcm9wKFwidGFnTmFtZVwiKS50b1VwcGVyQ2FzZSgpJiZcImZpbGVcIj09Qyh0aGlzKS5hdHRyKFwidHlwZVwiKS50b0xvd2VyQ2FzZSgpJiZlLkZpbGVSZWFkZXI7aWYoIXR8fCF0aGlzLmZpbGVzfHwwPT10aGlzLmZpbGVzLmxlbmd0aClyZXR1cm4hMDtmb3IodmFyIHI9MDtyPHRoaXMuZmlsZXMubGVuZ3RoO3IrKylhLnB1c2goe2ZpbGU6dGhpcy5maWxlc1tyXSxpbnB1dEVsZW06dGhpcyxpbnN0YW5jZUNvbmZpZzpDLmV4dGVuZCh7fSxzKX0pfSkscigpLHRoaXN9fXk/ZS5vbm1lc3NhZ2U9cDpTLldPUktFUlNfU1VQUE9SVEVEJiYodj1oKCksZG9jdW1lbnQuYm9keT9kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLGZ1bmN0aW9uKCl7Yj0hMH0sITApOmI9ITApLGkucHJvdG90eXBlPU9iamVjdC5jcmVhdGUobi5wcm90b3R5cGUpLGkucHJvdG90eXBlLmNvbnN0cnVjdG9yPWkscy5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShuLnByb3RvdHlwZSkscy5wcm90b3R5cGUuY29uc3RydWN0b3I9cyxhLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGEucHJvdG90eXBlKSxhLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1hfShcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp0aGlzKTsiLCJ2YXIgRW5naW5lID0ge307XHJcblxyXG5FbmdpbmUuQm9vdCA9IGZ1bmN0aW9uIChnYW1lKSB7IH07XHJcblxyXG5FbmdpbmUuQm9vdC5wcm90b3R5cGUgPSB7XHJcbiAgcHJlbG9hZDogZnVuY3Rpb24gKCkge1xyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5zY2FsZS5zY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLlNIT1dfQUxMO1xyXG4gICAgdGhpcy5zY2FsZS5wYWdlQWxpZ25Ib3Jpem9udGFsbHkgPSB0cnVlO1xyXG4gICAgdGhpcy5zY2FsZS5wYWdlQWxpZ25WZXJ0aWNhbGx5ID0gdHJ1ZTtcclxuICAgIHRoaXMuc3RhZ2UuZGlzYWJsZVZpc2liaWxpdHlDaGFuZ2UgPSB0cnVlO1xyXG4gICAgdGhpcy5zdGF0ZS5zdGFydCgnUHJlbG9hZGVyJyk7XHJcbiAgfVxyXG59XHJcbiIsIkVuZ2luZS5QcmVsb2FkZXIgPSBmdW5jdGlvbiAoZ2FtZSkge1xyXG4gIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbn07XHJcblxyXG5FbmdpbmUuUHJlbG9hZGVyLnByb3RvdHlwZSA9IHtcclxuICBwcmVsb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcclxuICAgIHRoaXMuc3RhZ2Uuc21vb3RoZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmFkZExvZ29MYWJsZSgpO1xyXG4gICAgdGhpcy5hZGRQcm9ncmVzc0xhYmxlKCk7XHJcblxyXG4gICAgaWYgKEVuZ2luZS5ERUJVRylcclxuICAgICAgdGhpcy5sb2FkLmVuYWJsZVBhcmFsbGVsID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5faW5pdFN0eWxlKCk7XHJcblxyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdwb2tlYmFsbCcsICdhc3NldHMvaW1hZ2VzL2JhY2tncm91bmQvcG9rZWJhbGwucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3NsaWRlLWJnJywgJ2Fzc2V0cy9pbWFnZXMvYmFja2dyb3VuZC9zbGlkZS1iZy5qcGcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnY2FsYy1iZycsICdhc3NldHMvaW1hZ2VzL2JhY2tncm91bmQvY2FsYy5qcGcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnc2hhcmUtYnRuJywgJ2Fzc2V0cy9pbWFnZXMvdWkvc2hhcmUtYnRuLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdyZXBlYXQtYnRuJywgJ2Fzc2V0cy9pbWFnZXMvdWkvcmVwZWF0LWJ0bi5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgncm5kLXBva2Vtb24nLCAnYXNzZXRzL2ltYWdlcy9wb2tlbW9ucy8nICsgRW5naW5lLnJuZFBva2Vtb24gKyAnLnBuZycpO1xyXG5cclxuICAgIHRoaXMuX2xvYWRQb2tlbW9ucygpO1xyXG5cclxuICAgIHRoaXMubG9hZC50ZXh0KCdwb2tlbW9uLmNzdicsICdhc3NldHMvZGF0YS9wb2tlbW9uLmNzdicpO1xyXG4gICAgdGhpcy5sb2FkLnRleHQoJ2RhdGEuanNvbicsICdhc3NldHMvZGF0YS9kYXRhLmpzb24nKTtcclxuXHJcbiAgICB0aGlzLmxvYWQub25GaWxlQ29tcGxldGUuYWRkKHRoaXMuZmlsZUNvbXBsZXRlLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICBfaW5pdFBva2Vtb25EQjogZnVuY3Rpb24oKSB7XHJcbiAgICBFbmdpbmUuUG9rZW1vbkRCLmxvYWQodGhpcy5jYWNoZS5nZXRUZXh0KCdwb2tlbW9uLmNzdicpKTtcclxuICB9LFxyXG5cclxuICBfbG9hZFBva2Vtb25zOiBmdW5jdGlvbigpIHtcclxuICAgIEVuZ2luZS5sb2FkZXIgPSBuZXcgUGhhc2VyLkxvYWRlcih0aGlzLmdhbWUpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgRW5naW5lLlJPTExfU0xJREVfQ09VTlQ7IGkrKykge1xyXG4gICAgICBFbmdpbmUubG9hZGVyLmltYWdlKCdwb2tlbW9uUm9sbCcgKyBpLCAnYXNzZXRzL2ltYWdlcy9wb2tlbW9ucy8nICsgdGhpcy5ybmQuYmV0d2VlbigxLCA3MjEpICsgJy5wbmcnKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBmaWxlQ29tcGxldGU6IGZ1bmN0aW9uIChwcm9ncmVzcywgY2FjaGVLZXksIHN1Y2Nlc3MsIHRvdGFsTG9hZGVkLCB0b3RhbEZpbGVzKSB7XHJcbiAgICB0aGlzLl9wcm9ncmVzc0xhYmxlLnRleHQgPSBwcm9ncmVzcyArICclICcgKyB0b3RhbExvYWRlZCArICcvJyArIHRvdGFsRmlsZXM7XHJcbiAgfSxcclxuXHJcbiAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLl9pbml0UG9rZW1vbkRCKCk7XHJcblxyXG4gICAgRW5naW5lLmRhdGEgPSBKU09OLnBhcnNlKHRoaXMuY2FjaGUuZ2V0VGV4dCgnZGF0YS5qc29uJykpO1xyXG5cclxuICAgIEVuZ2luZS5sb2FkZXIuc3RhcnQoKTtcclxuXHJcbiAgICB0aGlzLnN0YXRlLnN0YXJ0KCdHYW1lJyk7XHJcbiAgfSxcclxuXHJcbiAgX2luaXRTdHlsZTogZnVuY3Rpb24oKSB7XHJcbiAgICBFbmdpbmUudGV4dFN0eWxlID0ge1xyXG4gICAgICBmaWxsOiAnI2ZmZicsXHJcbiAgICAgIGZvbnQ6ICcyNnB4IE9wZW4gU2FucydcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBhZGRMb2dvTGFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzdHlsZSA9IHtcclxuICAgICAgZmlsbDogJyNGRkYnLFxyXG4gICAgICBmb250OiAnNDNweCBBcmlhbCdcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9sb2dvTGFibGUgPSB0aGlzLmFkZC50ZXh0KHRoaXMuZ2FtZS53aWR0aCAvIDIsIHRoaXMuZ2FtZS5oZWlnaHQgLyA0LCAnUG9rZW1vbiBUZXN0Jywgc3R5bGUpO1xyXG4gICAgdGhpcy5fbG9nb0xhYmxlLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gIH0sXHJcblxyXG4gIGFkZFByb2dyZXNzTGFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzdHlsZSA9IHtcclxuICAgICAgZmlsbDogJyNGRkYnLFxyXG4gICAgICBmb250OiAnMjFweCBBcmlhbCdcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9wcm9ncmVzc0xhYmxlID0gdGhpcy5hZGQudGV4dCh0aGlzLmdhbWUud2lkdGggLyAyLCB0aGlzLmdhbWUuaGVpZ2h0IC8gMiwgJ0NhbGN1bGF0ZWQuLi4nLCBzdHlsZSk7XHJcbiAgICB0aGlzLl9wcm9ncmVzc0xhYmxlLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gIH1cclxufVxyXG4iLCJFbmdpbmUuQW5zd2VyID0gZnVuY3Rpb24oZ2FtZSwgeCwgeSwgdGV4dCwgY2FsbGJhY2ssIGNvbnRleHQpIHtcclxuICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gIHRoaXMudGV4dCA9IHRleHQ7XHJcbiAgdGhpcy5fcGFkZGluZyA9IDU7XHJcblxyXG4gIHRoaXMuX2NyZWF0ZVRleHQoKTtcclxuXHJcbiAgUGhhc2VyLkJ1dHRvbi5jYWxsKHRoaXMsIGdhbWUsIHgsIHksIHRoaXMuX2NyZWF0ZUJhY2tncm91bmQoKSwgY2FsbGJhY2ssIGNvbnRleHQpO1xyXG4gIHRoaXMudGludCA9IDB4MDA5Njg4O1xyXG5cclxuICB0aGlzLmFkZENoaWxkKHRoaXMuX3RleHRTcHJpdGUpO1xyXG5cclxuICB0aGlzLm9uSW5wdXRPdmVyLmFkZChmdW5jdGlvbigpIHtcclxuICAgIHRoaXMudGludCA9IDB4MDBmZWU3O1xyXG4gIH0sIHRoaXMpO1xyXG5cclxuICB0aGlzLm9uSW5wdXRPdXQuYWRkKGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy50aW50ID0gMHgwMDk2ODg7XHJcbiAgfSwgdGhpcyk7XHJcbn1cclxuXHJcbkVuZ2luZS5BbnN3ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQaGFzZXIuQnV0dG9uLnByb3RvdHlwZSk7XHJcbkVuZ2luZS5BbnN3ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRW5naW5lLkFuc3dlcjtcclxuXHJcbkVuZ2luZS5BbnN3ZXIucHJvdG90eXBlLl9jcmVhdGVCYWNrZ3JvdW5kID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIGJvdHRvbVBhZGRpbmcgPSAtNztcclxuXHJcbiAgdmFyIGJtcCA9IHRoaXMuZ2FtZS5hZGQuYml0bWFwRGF0YSh0aGlzLl90ZXh0U3ByaXRlLndpZHRoICsgdGhpcy5fcGFkZGluZyAqIDIsIHRoaXMuX3RleHRTcHJpdGUuaGVpZ2h0ICsgdGhpcy5fcGFkZGluZyAvIDIpO1xyXG4gIGJtcC5jdHguYmVnaW5QYXRoKCk7XHJcbiAgYm1wLmN0eC5yZWN0KDAsIDAsIGJtcC53aWR0aCwgYm1wLmhlaWdodCArIGJvdHRvbVBhZGRpbmcpO1xyXG4gIGJtcC5jdHguZmlsbFN0eWxlID0gJyNmZmYnO1xyXG4gIGJtcC5jdHguZmlsbCgpO1xyXG5cclxuICByZXR1cm4gYm1wO1xyXG59XHJcblxyXG5FbmdpbmUuQW5zd2VyLnByb3RvdHlwZS5fY3JlYXRlVGV4dCA9IGZ1bmN0aW9uKCkge1xyXG4gIHRoaXMuX3RleHRTcHJpdGUgPSBuZXcgUGhhc2VyLlRleHQodGhpcy5nYW1lLCAwLCAwLCB0aGlzLnRleHQsIEVuZ2luZS50ZXh0U3R5bGUpO1xyXG4gIHRoaXMuX3RleHRTcHJpdGUuYW5jaG9yLnNldFRvKDAuNSwgMCk7XHJcbn1cclxuIiwiRW5naW5lLkdhbWUgPSBmdW5jdGlvbihnYW1lKSB7fVxyXG5cclxuRW5naW5lLkdhbWUucHJvdG90eXBlID0ge1xyXG4gIGNyZWF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJzsgLy8jZGRkXHJcblxyXG4gICAgdGhpcy5fYWRkQmFja2dyb3VuZCgpO1xyXG4gICAgdGhpcy5fYWRkUG9rZWJhbGxTeXN0ZW0oKTtcclxuICAgIHRoaXMuX2FkZFNsaWRlcygpO1xyXG4gICAgdGhpcy5fc2hvd0NoYWluU2xpZGVzKHRoaXMuc2xpZGVzKTtcclxuICAgIHRoaXMuX2FkZFByb2dyZXNzU2xpZGUoKTtcclxuXHJcbiAgICB0aGlzLl9kcmF3RGVidWcoKTtcclxuICB9LFxyXG5cclxuICBfYWRkU2xpZGVzOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc2xpZGVzID0gW1xyXG4gICAgICBuZXcgRW5naW5lLlNsaWRlKHRoaXMuZ2FtZSwgJ9CS0Ysg0LvRjtCx0LjRgtC1INC+0LLRgdGP0L3QvtC1INC/0LXRh9C10L3RjNC1PycsIFsn0JTQsCcsICfQndC10YInLCAn0J3QtSDQv9GA0L7QsdC+0LLQsNC7INC10LPQviddKSxcclxuICAgICAgbmV3IEVuZ2luZS5TbGlkZSh0aGlzLmdhbWUsICfQktCw0YEg0YfQsNGB0YLQviDQsdGM0ZHRgiDRgtC+0LrQvtC8PycsIFsn0JHRi9Cy0LDQtdGCJywgJ9Ce0YfQtdC90Ywg0YDQtdC00LrQvicsICfQndC1INC30L3QsNGOJywgJ9Ci0L7Qu9GM0LrQviDRh9GC0L4g0YPQtNCw0YDQuNC70L4hJ10pLFxyXG4gICAgICBuZXcgRW5naW5lLlNsaWRlKHRoaXMuZ2FtZSwgJ9Ca0LDQutCw0Y8g0YHRgtC40YXQuNGPINCy0LDQvCDQsdC+0LvRjNGI0LUg0L3RgNCw0LLQuNGC0YHRjz8nLCBbJ9CS0L7QtNCwJywgJ9Ce0LPQvtC90YwnLCAn0JLQtdGC0LXRgCcsICfQl9C10LzQu9GPJ10pLFxyXG4gICAgICBuZXcgRW5naW5lLlNsaWRlKHRoaXMuZ2FtZSwgJ9CS0YvQsdC40YDQuNGC0LUg0L7QtNC90L4g0LjQty4uLicsIFsn0KLRjNC80LAnLCAn0KHQstC10YInXSksXHJcbiAgICAgIG5ldyBFbmdpbmUuU2xpZGUodGhpcy5nYW1lLCAn0JLRiyDQsdC+0LjRgtC10YHRjCDQvdCw0YHQtdC60L7QvNGL0YU/JywgWyfQlNCwJywgJ9Cd0LXRgiddKSxcclxuICAgICAgbmV3IEVuZ2luZS5TbGlkZSh0aGlzLmdhbWUsICfQndC1INC/0YDQvtGC0LjQsiDQu9C4INCy0Ysg0LfQsNCy0LXRgdGC0Lgg0LTQvtC80LDRiNC90LXQs9C+INC00YDQsNC60L7QvdCwPycsIFsn0J/RhNGELCDQtdGJ0ZEg0YHQv9GA0LDRiNC40LLQsNC10YLQtScsICfQndC1INC70Y7QsdC70Y4g0LTRgNCw0LrQvtC90L7QsicsICfQkdC+0Y7RgdGMINC+0L0g0YHRitC10YHRgiDQvNC+0LXQs9C+INC/0LjRgtC+0LzRhtCwJ10pLFxyXG4gICAgICBuZXcgRW5naW5lLlNsaWRlKHRoaXMuZ2FtZSwgJ9Ca0LDQutC+0LUg0L/QtdGA0LXQtNCy0LjQttC10L3QuNC1INCy0Ysg0L/RgNC10LTQv9C+0YfQuNGC0LDQtdGC0LU/JywgWyfQn9C+INCy0L7Qt9C00YPRhdGDJywgJ9Cf0L4g0LfQtdC80LvQtScsICfQktC/0LvQsNCy0YwnLCAn0KLQtdC70LXQv9C+0YDRgtCw0YbQuNGPJ10pLFxyXG4gICAgICBuZXcgRW5naW5lLlNsaWRlKHRoaXMuZ2FtZSwgJ9CS0Ysg0LHQvtC40YLQtdGB0Ywg0L/RgNC40LLQtdC00LXQvdC40Lk/JywgWyfQlNCwJywgJ9Cd0LXRgicsICfQntC90Lgg0L3QtSDRgdGD0YnQtdGB0YLQstGD0Y7RgiEnXSksXHJcbiAgICAgIG5ldyBFbmdpbmUuU2xpZGUodGhpcy5nYW1lLCAn0JrQsNC60LjQtSDQstCw0Lwg0L3RgNCw0LLRj9GC0YHRjyDQttC40LLQvtGC0L3Ri9C1JywgWyfQkdC+0LvRjNGI0LjQtScsICfQnNCw0LvQtdC90YzQutC40LUnLCAn0KHRgNC10LTQvdC40LUnXSksXHJcbiAgICAgIG5ldyBFbmdpbmUuU2xpZGUodGhpcy5nYW1lLCAn0JLQsNC8INC90YDQsNCy0Y/RgtGB0Y8g0L/Rg9GF0LvQtdC90YzQutC40LUg0L/QuNGC0L7QvNGG0Ys/JywgWyfQlNCwJywgJ9Cd0LXRgicsICfQkdC10Lcg0YDQsNC30L3QuNGG0YsnXSksXHJcbiAgICBdO1xyXG4gIH0sXHJcblxyXG4gIF9zaG93Q2hhaW5TbGlkZXM6IGZ1bmN0aW9uKGNoYWluKSB7XHJcbiAgICB0aGlzLnNsaWRlQ291bnRlciA9IDA7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFpbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjaGFpbltpXS5zZXRDYWxsYmFja0NoZWNrKHRoaXMuX25leHRTbGlkZS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFpblswXS5zaG93KCk7XHJcbiAgfSxcclxuXHJcbiAgX25leHRTbGlkZTogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnNsaWRlQ291bnRlcisrO1xyXG5cclxuICAgIGlmICh0aGlzLnNsaWRlQ291bnRlciA+PSB0aGlzLnNsaWRlcy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5fZmluaXNoVGVzdCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zbGlkZXNbdGhpcy5zbGlkZUNvdW50ZXJdLnNob3coKTtcclxuICAgIHRoaXMuX3Byb2dyZXNzTGFibGUudGV4dCA9ICfQktC+0L/RgNC+0YEgJyArICh0aGlzLnNsaWRlQ291bnRlciArIDEpICsgJyDQuNC3ICcgKyB0aGlzLnNsaWRlcy5sZW5ndGg7XHJcbiAgfSxcclxuXHJcbiAgX2FkZEJhY2tncm91bmQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGJnID0gdGhpcy5nYW1lLmFkZC5zcHJpdGUoMCwgMCwgJ3NsaWRlLWJnJyk7XHJcbiAgfSxcclxuXHJcbiAgX2RyYXdEZWJ1ZzogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLl9saW5lViA9IG5ldyBQaGFzZXIuTGluZSh0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgMCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIHRoaXMuZ2FtZS5oZWlnaHQpO1xyXG4gICAgdGhpcy5fbGluZUggPSBuZXcgUGhhc2VyLkxpbmUoMCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclksIHRoaXMuZ2FtZS53aWR0aCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclkpO1xyXG4gIH0sXHJcblxyXG4gIF9hZGRQb2tlYmFsbFN5c3RlbTogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnBva2ViYWxsU3lzdGVtID0gbmV3IEVuZ2luZS5Qb2tlYmFsbFN5c3RlbSh0aGlzLmdhbWUpO1xyXG4gICAgdGhpcy5wb2tlYmFsbFN5c3RlbS5jcmVhdGUoKTtcclxuICB9LFxyXG5cclxuICBfZmluaXNoVGVzdDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnN0YXRlLnN0YXJ0KCdDYWxjdWxhdGUnKTtcclxuICB9LFxyXG5cclxuICBfYWRkUHJvZ3Jlc3NTbGlkZTogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLl9wcm9ncmVzc0xhYmxlID0gdGhpcy5hZGQudGV4dChFbmdpbmUuR0FNRV9XSURUSCAvIDIsIDI1LCAn0JLQvtC/0YDQvtGBIDEg0LjQtyAnICsgdGhpcy5zbGlkZXMubGVuZ3RoLCBFbmdpbmUudGV4dFN0eWxlKTtcclxuICAgIHRoaXMuX3Byb2dyZXNzTGFibGUuZm9udFNpemUgPSAxNjtcclxuICAgIHRoaXMuX3Byb2dyZXNzTGFibGUuYW5jaG9yLnNldFRvKDAuNSwgMCk7XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlOiBmdW5jdGlvbigpIHt9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gdGhpcy5nYW1lLmRlYnVnLmlucHV0SW5mbygxNSwgMTUsICcjZmZmJyk7XHJcbiAgICAvLyAvLyB0aGlzLmdhbWUuZGVidWcuc3ByaXRlQm91bmRzKHRoaXMudC5fc2xpZGVHcm91cCwgJ3JnYmEoMjEzLCA4MywgODMsIDAuMjUpJyk7XHJcbiAgICAvLyAvLyB0aGlzLmdhbWUuZGVidWcuc3ByaXRlQm91bmRzKHRoaXMudC5fYW5zd2VyR3JvdXAsICdyZ2JhKDM2LCAwLCAyNTUsIDAuMjUpJyk7XHJcbiAgICAvL1xyXG4gICAgLy8gZ2FtZS5kZWJ1Zy5nZW9tKHRoaXMuX2xpbmVWKTtcclxuICAgIC8vIGdhbWUuZGVidWcuZ2VvbSh0aGlzLl9saW5lSCk7XHJcbiAgfVxyXG59XHJcbiIsIkVuZ2luZS5Qb2tlYmFsbFN5c3RlbSA9IGZ1bmN0aW9uKGdhbWUpIHtcclxuICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gIHRoaXMuY291bnRFbGVtZW50cyA9IDE2O1xyXG59XHJcblxyXG5FbmdpbmUuUG9rZWJhbGxTeXN0ZW0ucHJvdG90eXBlID0ge1xyXG4gIGNyZWF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLl9hZGRQb2tlYmFsbHMoKTtcclxuICAgIHRoaXMuX3J1blRpbWVyKCk7XHJcbiAgfSxcclxuXHJcbiAgX2FkZFBva2ViYWxsczogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnBva2ViYWxscyA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY291bnRFbGVtZW50czsgaSsrKSB7XHJcbiAgICAgIHZhciBwb2tlYmFsbCA9IG5ldyBQaGFzZXIuU3ByaXRlKHRoaXMuZ2FtZSwgMCwgMCwgJ3Bva2ViYWxsJyk7XHJcblxyXG4gICAgICBwb2tlYmFsbC5hbmNob3Iuc2V0VG8oMC41KTtcclxuXHJcbiAgICAgIHRoaXMucG9rZWJhbGxzLmFkZChwb2tlYmFsbCk7XHJcblxyXG4gICAgICBwb2tlYmFsbC5raWxsKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgX3J1blRpbWVyOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuX3RpbWVyID0gdGhpcy5nYW1lLnRpbWUuY3JlYXRlKCk7XHJcbiAgICB0aGlzLl90aW1lci5sb29wKFBoYXNlci5UaW1lci5TRUNPTkQsIHRoaXMuZW1pdCwgdGhpcyk7XHJcbiAgICB0aGlzLl90aW1lci5zdGFydCgpO1xyXG4gIH0sXHJcblxyXG4gIGVtaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHBhZGRpbmdzID0gMjU7XHJcbiAgICB2YXIgc2NhbGUgPSB0aGlzLmdhbWUucm5kLnJlYWxJblJhbmdlKDAuMjUsIDAuOCk7XHJcbiAgICB2YXIgYWxwaGEgPSB0aGlzLmdhbWUucm5kLnJlYWxJblJhbmdlKDAuMDUsIDAuMTUpO1xyXG5cclxuICAgIHZhciBwb2tlYmFsbCA9IHRoaXMucG9rZWJhbGxzLmdldEZpcnN0RGVhZCgpO1xyXG5cclxuICAgIHBva2ViYWxsLnJldml2ZSgpO1xyXG4gICAgcG9rZWJhbGwucmVzZXQoXHJcbiAgICAgIHRoaXMuZ2FtZS5ybmQuYmV0d2VlbihwYWRkaW5ncywgdGhpcy5nYW1lLndpZHRoIC0gcGFkZGluZ3MpLFxyXG4gICAgICB0aGlzLmdhbWUucm5kLmJldHdlZW4ocGFkZGluZ3MsIHRoaXMuZ2FtZS5oZWlnaHQgLSBwYWRkaW5ncylcclxuICAgICk7XHJcblxyXG4gICAgcG9rZWJhbGwuYWxwaGEgPSAwO1xyXG4gICAgcG9rZWJhbGwucm90YXRpb24gPSAwO1xyXG4gICAgcG9rZWJhbGwuc2NhbGUuc2V0VG8oc2NhbGUsIHNjYWxlKTtcclxuXHJcbiAgICB2YXIgdGFyZ2V0WCA9IHRoaXMuZ2FtZS5ybmQuYmV0d2VlbigxMDAsIDMwMCk7XHJcbiAgICB2YXIgdGFyZ2V0WSA9IDA7XHJcblxyXG4gICAgaWYgKHBva2ViYWxsLnggPiB0aGlzLmdhbWUud2lkdGggLyAyKVxyXG4gICAgICB0YXJnZXRYICo9IC0xO1xyXG5cclxuICAgIHZhciBhbHBoYVR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbihwb2tlYmFsbClcclxuICAgICAgLnRvKHthbHBoYTogYWxwaGF9LCAyNTAwKTtcclxuXHJcbiAgICB2YXIgc3BlZWRUd2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4ocG9rZWJhbGwpXHJcbiAgICAgIC50byh7eDogcG9rZWJhbGwueCArIHRhcmdldFh9LCA2MDAwKTtcclxuXHJcbiAgICB2YXIgcm90YXRpb25Ud2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4ocG9rZWJhbGwpXHJcbiAgICAgIC50byh7cm90YXRpb246IE1hdGguUEkgKiAyICogdGhpcy5nYW1lLnJuZC5waWNrKFstMSwgMV0pfSwgNjAwMCk7XHJcblxyXG4gICAgdmFyIGRpZVR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbihwb2tlYmFsbClcclxuICAgICAgLnRvKHthbHBoYTogMH0sIDI1MDApO1xyXG5cclxuICAgIGFscGhhVHdlZW4uc3RhcnQoKTtcclxuICAgIHNwZWVkVHdlZW4uc3RhcnQoKTtcclxuICAgIHJvdGF0aW9uVHdlZW4uc3RhcnQoKTtcclxuXHJcbiAgICBhbHBoYVR3ZWVuLmNoYWluKGRpZVR3ZWVuLmRlbGF5KDEwMDApKTtcclxuXHJcbiAgICBkaWVUd2Vlbi5vbkNvbXBsZXRlXHJcbiAgICAgIC5hZGQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5raWxsKCk7XHJcbiAgICAgIH0sIHBva2ViYWxsKTtcclxuXHJcbiAgICAvLyBhbHBoYVR3ZWVuLm9uQ29tcGxldGUuYWRkKGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICB0aGlzLmtpbGwoKTtcclxuICAgIC8vIH0sIHBva2ViYWxsKTtcclxuICB9LFxyXG5cclxuICB1cGRhdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICB9LFxyXG59XHJcbiIsIkVuZ2luZS5TbGlkZSA9IGZ1bmN0aW9uKGdhbWUsIHRleHQsIGFuc3dlcnMpIHtcclxuICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gIHRoaXMuX21hcmdpblRvcEFuc3dlcnMgPSA3NTtcclxuICB0aGlzLl9saW5lU3BhY2luZ0Fuc3dlcnMgPSA2MDtcclxuICB0aGlzLl9tYXJnaW5Ub3BMYWJsZSA9IDIwMDtcclxuXHJcbiAgUGhhc2VyLlNwcml0ZS5jYWxsKHRoaXMsIGdhbWUsIDAsIDAsIHRoaXMuX2NyZWF0ZUJhY2tncm91bmQoKSk7XHJcblxyXG4gIHRoaXMudGV4dCA9IHRleHQ7XHJcbiAgdGhpcy5hbnN3ZXJzID0gYW5zd2VycztcclxuICB0aGlzLmFscGhhID0gMDtcclxuICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzKTtcclxuXHJcbiAgdGhpcy5fYWRkTGFibGUoKTtcclxuICB0aGlzLl9hZGRBbnN3ZXJzKCk7XHJcbn1cclxuXHJcbkVuZ2luZS5TbGlkZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBoYXNlci5TcHJpdGUucHJvdG90eXBlKTtcclxuRW5naW5lLlNsaWRlLmNvbnN0cnVjdG9yID0gRW5naW5lLlNsaWRlO1xyXG5cclxuRW5naW5lLlNsaWRlLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKSB7XHJcbiAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKS50byh7XHJcbiAgICBhbHBoYTogMVxyXG4gIH0sIDE1MCkuc3RhcnQoKTtcclxufVxyXG5cclxuRW5naW5lLlNsaWRlLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIHR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKS50byh7XHJcbiAgICBhbHBoYTogMFxyXG4gIH0sIDE1MCkuc3RhcnQoKTtcclxuXHJcbiAgdHdlZW4ub25Db21wbGV0ZS5hZGQoZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgIGlmICh0aGlzLmNhbGxiYWNrKSB7XHJcbiAgICAgIHRoaXMuY2FsbGJhY2soKTtcclxuICAgIH1cclxuICB9LCB0aGlzKTtcclxuXHJcbiAgcmV0dXJuIHR3ZWVuLm9uQ29tcGxldGU7XHJcbn1cclxuXHJcbkVuZ2luZS5TbGlkZS5wcm90b3R5cGUuc2V0Q2FsbGJhY2tDaGVjayA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG59XHJcblxyXG5FbmdpbmUuU2xpZGUucHJvdG90eXBlLl9hZGRMYWJsZSA9IGZ1bmN0aW9uKCkge1xyXG4gIHRoaXMuX2xhYmxlID0gbmV3IFBoYXNlci5UZXh0KHRoaXMuZ2FtZSwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIHRoaXMuX21hcmdpblRvcExhYmxlLCB0aGlzLnRleHQsIEVuZ2luZS50ZXh0U3R5bGUpO1xyXG4gIHRoaXMuX2xhYmxlLndvcmRXcmFwID0gdHJ1ZTtcclxuICB0aGlzLl9sYWJsZS53b3JkV3JhcFdpZHRoID0gNjAwO1xyXG4gIHRoaXMuX2xhYmxlLmFsaWduID0gJ2NlbnRlcic7XHJcbiAgdGhpcy5fbGFibGUuYW5jaG9yLnNldFRvKDAuNSk7XHJcblxyXG4gIHRoaXMuYWRkQ2hpbGQodGhpcy5fbGFibGUpO1xyXG59XHJcblxyXG5FbmdpbmUuU2xpZGUucHJvdG90eXBlLl9hZGRBbnN3ZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmFuc3dlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBhbnN3ZXIgPSBuZXcgRW5naW5lLkFuc3dlcihcclxuICAgICAgdGhpcy5nYW1lLFxyXG4gICAgICB0aGlzLmdhbWUud29ybGQuY2VudGVyWCxcclxuICAgICAgdGhpcy5fbGFibGUueSArIHRoaXMuX21hcmdpblRvcEFuc3dlcnMgKyB0aGlzLl9saW5lU3BhY2luZ0Fuc3dlcnMgKiBpLFxyXG4gICAgICB0aGlzLmFuc3dlcnNbaV0sXHJcbiAgICAgIHRoaXMuaGlkZSxcclxuICAgICAgdGhpc1xyXG4gICAgKTtcclxuXHJcbiAgICBhbnN3ZXIuYW5jaG9yLnNldFRvKDAuNSwgMCk7XHJcbiAgICB0aGlzLmFkZENoaWxkKGFuc3dlcik7XHJcbiAgfVxyXG59XHJcblxyXG5FbmdpbmUuU2xpZGUucHJvdG90eXBlLl9jcmVhdGVCYWNrZ3JvdW5kID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIGJtcCA9IHRoaXMuZ2FtZS5hZGQuYml0bWFwRGF0YShFbmdpbmUuR0FNRV9XSURUSCwgRW5naW5lLkdBTUVfSEVJR0hUKTtcclxuXHJcbiAgYm1wLmN0eC5iZWdpblBhdGgoKTtcclxuICBibXAuY3R4LnJlY3QoMCwgMCwgYm1wLndpZHRoLCBibXAuaGVpZ2h0KTtcclxuICBibXAuY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDAsIDAsIDAsIDApJztcclxuICBibXAuY3R4LmZpbGwoKTtcclxuXHJcbiAgcmV0dXJuIGJtcDtcclxufVxyXG4iLCJFbmdpbmUuQ2FsY3VsYXRlID0gZnVuY3Rpb24oZ2FtZSkge31cclxuXHJcbkVuZ2luZS5DYWxjdWxhdGUucHJvdG90eXBlID0ge1xyXG4gIGNyZWF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLl90aW1lUHJvZ3Jlc3MgPSA4MDAwO1xyXG4gICAgdGhpcy5fY291bnRUaWNrID0gNzM7XHJcbiAgICB0aGlzLl9wcm9ncmVzcyA9IDA7XHJcbiAgICB0aGlzLl9yZXN1bHRQb2tlbW9uID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICdybmQtcG9rZW1vbicpO1xyXG4gICAgdGhpcy5fcmVzdWx0UG9rZW1vbi52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fYWRkQmFja2dyb3VuZCgpO1xyXG4gICAgdGhpcy5fYWRkUm9sbGVyKCk7XHJcbiAgICB0aGlzLl9hZGRJbmZvTGFibGUoKTtcclxuICAgIHRoaXMuX2FkZFByb2dyZXNzTGFibGUoKTtcclxuXHJcbiAgICB0aGlzLl9zdGFydFJvbGwoKTtcclxuICAgIHRoaXMuX3N0YXJ0UHJvZ3Jlc3MoKTtcclxuICB9LFxyXG5cclxuICBfYWRkUm9sbGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciByb2xsU2l6ZSA9IDMwMDtcclxuICAgIHZhciBtYXJnaW5SaWdodCA9IDEwMDtcclxuXHJcbiAgICB0aGlzLl9yb2xscyA9IFtdO1xyXG4gICAgdGhpcy5fcm9sbEdyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKTtcclxuICAgIHRoaXMuX2FjdGl2ZVJvbGxTcHJpdGUgPSAtMTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IEVuZ2luZS5ST0xMX1NMSURFX0NPVU5UOyBpKyspIHtcclxuICAgICAgdmFyIHNwcml0ZSA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAncG9rZW1vblJvbGwnICsgaSk7XHJcblxyXG4gICAgICBzcHJpdGUudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgdGhpcy5fcm9sbEdyb3VwLmFkZChzcHJpdGUpO1xyXG4gICAgICB0aGlzLl9yb2xscy5wdXNoKHNwcml0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fcm9sbEdyb3VwLnggPSBtYXJnaW5SaWdodDtcclxuICAgIHRoaXMuX3JvbGxHcm91cC55ID0gdGhpcy5nYW1lLndvcmxkLmNlbnRlclkgLSByb2xsU2l6ZSAvIDI7XHJcblxyXG4gICAgdGhpcy5fcm9sbEdyb3VwLmFkZCh0aGlzLl9yZXN1bHRQb2tlbW9uKTtcclxuICAgIHRoaXMuX3JvbGxzLnB1c2godGhpcy5fcmVzdWx0UG9rZW1vbik7XHJcbiAgfSxcclxuXHJcbiAgX2FkZEJhY2tncm91bmQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5iZyA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAnY2FsYy1iZycpO1xyXG4gIH0sXHJcblxyXG4gIF9hZGRQcm9ncmVzc0xhYmxlOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciByb2xsU2l6ZSA9IDMwMDtcclxuICAgIHZhciBtYXJnaW5Ub3AgPSA1MDtcclxuXHJcbiAgICB0aGlzLl9wcm9ncmVzc0xhYmxlID0gdGhpcy5hZGQudGV4dChcclxuICAgICAgdGhpcy5fcm9sbEdyb3VwLnggKyByb2xsU2l6ZSAvIDIsXHJcbiAgICAgIHRoaXMuX3JvbGxHcm91cC55ICsgcm9sbFNpemUgKyBtYXJnaW5Ub3AsXHJcbiAgICAgICfQn9GA0L7Qs9GA0LXRgdGBIDAgJScsXHJcbiAgICAgIEVuZ2luZS50ZXh0U3R5bGVcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZS5hbmNob3Iuc2V0VG8oMC41KTtcclxuICB9LFxyXG5cclxuICBfYWRkSW5mb0xhYmxlOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBtYXJpZ25Ub3AgPSAyNTtcclxuXHJcbiAgICB0aGlzLl9pbmZvVGV4dCA9IHRoaXMuYWRkLnRleHQoXHJcbiAgICAgIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLFxyXG4gICAgICBtYXJpZ25Ub3AsXHJcbiAgICAgICfQktGL0YfQuNGB0LvQtdC90LjQtSDRgNC10LfRg9C70YzRgtCw0YLQsC4uLicsXHJcbiAgICAgIEVuZ2luZS50ZXh0U3R5bGVcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5faW5mb1RleHQuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgfSxcclxuXHJcbiAgX3N0YXJ0Um9sbDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLl9hY3RpdmVSb2xsU3ByaXRlID0gMDtcclxuICAgIHRoaXMuX3JvbGxzWzBdLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuX3RpbWVyID0gdGhpcy50aW1lLmNyZWF0ZSgpO1xyXG4gICAgdGhpcy5fdGltZXIubG9vcCg3NSwgdGhpcy5fcm9sbCwgdGhpcyk7XHJcbiAgICB0aGlzLl90aW1lci5zdGFydCgpO1xyXG4gIH0sXHJcblxyXG4gIF9yb2xsOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuX3JvbGxzW3RoaXMuX2FjdGl2ZVJvbGxTcHJpdGVdLnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9hY3RpdmVSb2xsU3ByaXRlKys7XHJcblxyXG4gICAgaWYgKHRoaXMuX2FjdGl2ZVJvbGxTcHJpdGUgPiBFbmdpbmUuUk9MTF9TTElERV9DT1VOVCAtIDEpIHtcclxuICAgICAgdGhpcy5fYWN0aXZlUm9sbFNwcml0ZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fcm9sbHNbdGhpcy5fYWN0aXZlUm9sbFNwcml0ZV0udmlzaWJsZSA9IHRydWU7XHJcbiAgfSxcclxuXHJcbiAgX3N0YXJ0UHJvZ3Jlc3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5fcHJvZ3Jlc3NUaW1lciA9IHRoaXMudGltZS5jcmVhdGUoKTtcclxuICAgIHRoaXMuX3Byb2dyZXNzVGltZXIucmVwZWF0KFxyXG4gICAgICB0aGlzLl90aW1lUHJvZ3Jlc3MgLyB0aGlzLl9jb3VudFRpY2ssXHJcbiAgICAgIHRoaXMuX2NvdW50VGljayxcclxuICAgICAgdGhpcy5fdXBkYXRlUHJvZ3Jlc3MsXHJcbiAgICAgIHRoaXNcclxuICAgICk7XHJcbiAgICB0aGlzLl9wcm9ncmVzc1RpbWVyLnN0YXJ0KCk7XHJcbiAgICB0aGlzLl9wcm9ncmVzc1RpbWVyLm9uQ29tcGxldGUuYWRkKHRoaXMuX2ZpbmlzaENhbGMsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIF91cGRhdGVQcm9ncmVzczogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLl9wcm9ncmVzcysrO1xyXG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZS50ZXh0ID0gJ9Cf0YDQvtCz0YDQtdGB0YEgJyArIE1hdGguZmxvb3IoKHRoaXMuX3Byb2dyZXNzIC8gdGhpcy5fY291bnRUaWNrKSAqIDEwMCkgKyAnICUnO1xyXG4gIH0sXHJcblxyXG4gIF9maW5pc2hDYWxjOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuX3RpbWVyLnN0b3AoKTtcclxuXHJcbiAgICB0aGlzLl9yb2xsc1t0aGlzLl9hY3RpdmVSb2xsU3ByaXRlXS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLl9yZXN1bHRQb2tlbW9uLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuX2luZm9UZXh0LnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICB2YXIgcG9rZW1vbk5hbWUgPSBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoRW5naW5lLlBva2Vtb25EQi5wb2tlbW9uc1tFbmdpbmUucm5kUG9rZW1vbiAtIDFdLmlkZW50aWZpZXIpO1xyXG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZS50ZXh0ID0gJ9CvINC/0L7RhdC+0LYg0L3QsCAnICsgcG9rZW1vbk5hbWU7XHJcblxyXG4gICAgdGhpcy5fYWRkQnRucygpO1xyXG4gIH0sXHJcblxyXG4gIF9hZGRBZHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgVksuc3RhcnRQcmVyb2xsKCk7XHJcblxyXG4gICAgLy8gaWYgKHRoaXMuZ2FtZS5ybmQucGljayhbLTEsIDFdKSA9PT0gMSkge1xyXG4gICAgLy8gICBWSy5zdGFydFByZXJvbGwoKTtcclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgIFZLLnN0YXJ0QWRzKCk7XHJcbiAgICAvLyB9XHJcbiAgfSxcclxuXHJcbiAgX2FkZEJ0bnM6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG1hcmdpbiA9IDUwO1xyXG4gICAgdmFyIGJ0blNoYXJlID0gdGhpcy5fYWRkU2hhcmVCdG4oKTtcclxuICAgIHZhciBidG5SZXBlYXQgPSB0aGlzLl9hZGRSZXBlYXRCdG4oKTtcclxuXHJcbiAgICBidG5TaGFyZS55IC09IG1hcmdpbjtcclxuICAgIGJ0blJlcGVhdC55ICs9IG1hcmdpbjtcclxuICB9LFxyXG5cclxuICBfYWRkU2hhcmVCdG46IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGJ0blNoYXJlID0gdGhpcy5hZGQuYnV0dG9uKFxyXG4gICAgICBFbmdpbmUuR0FNRV9XSURUSCAqIDAuNzUsXHJcbiAgICAgIEVuZ2luZS5HQU1FX0hFSUdIVCAvIDIsXHJcbiAgICAgICdzaGFyZS1idG4nLFxyXG4gICAgICB0aGlzLl9zaGFyZURhdGEsXHJcbiAgICAgIHRoaXNcclxuICAgICk7XHJcblxyXG4gICAgYnRuU2hhcmUuYW5jaG9yLnNldFRvKDAuNSk7XHJcblxyXG4gICAgcmV0dXJuIGJ0blNoYXJlO1xyXG4gIH0sXHJcblxyXG4gIF9hZGRSZXBlYXRCdG46IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGJ0blJlYXBlYXQgPSB0aGlzLmFkZC5idXR0b24oXHJcbiAgICAgIEVuZ2luZS5HQU1FX1dJRFRIICogMC43NSxcclxuICAgICAgRW5naW5lLkdBTUVfSEVJR0hUIC8gMixcclxuICAgICAgJ3JlcGVhdC1idG4nLFxyXG4gICAgICB0aGlzLl9yZXBlYXRHYW1lLFxyXG4gICAgICB0aGlzXHJcbiAgICApO1xyXG5cclxuICAgIGJ0blJlYXBlYXQuYW5jaG9yLnNldFRvKDAuNSk7XHJcblxyXG4gICAgcmV0dXJuIGJ0blJlYXBlYXQ7XHJcbiAgfSxcclxuXHJcbiAgX3NoYXJlRGF0YTogZnVuY3Rpb24oKSB7XHJcbiAgICBWSy5wdWJsaWNhdGVQaG90byhFbmdpbmUucm5kUG9rZW1vbik7XHJcbiAgfSxcclxuXHJcbiAgX3JlcGVhdEdhbWU6IGZ1bmN0aW9uKCkge1xyXG4gICAgRW5naW5lLnJuZFBva2Vtb24gPSB0aGlzLmdhbWUucm5kLmJldHdlZW4oMSwgNzIxKTtcclxuICAgIHRoaXMuc3RhdGUuc3RhcnQoJ1ByZWxvYWRlcicpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cmluZykge1xyXG4gICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcclxufVxyXG4iLCIvKipcclxuICogQ3JlYXRlIGltYWdlcyBvZiBwb2tlbW9uXHJcbiAqIEBwYXJhbSB7W3R5cGVdfSBnYW1lIFtkZXNjcmlwdGlvbl1cclxuICovXHJcbkVuZ2luZS5HZW5lcmF0b3IgPSBmdW5jdGlvbihnYW1lKSB7XHJcbiAgdGhpcy5jb3VudGVyID0gMDtcclxuICB0aGlzLl9sYXN0UG9rZW1vbiA9IG51bGw7XHJcbiAgZ2FtZS5wcmVzZXJ2ZURyYXdpbmdCdWZmZXIgPSB0cnVlO1xyXG59XHJcblxyXG5FbmdpbmUuR2VuZXJhdG9yLnByb3RvdHlwZSA9IHtcclxuICBwcmVsb2FkOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMubG9hZC50ZXh0KCdwb2tlbW9uLmNzdicsICdhc3NldHMvZGF0YS9wb2tlbW9uLmNzdicpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdway1iZycsICdhc3NldHMvaW1hZ2VzL2JhY2tncm91bmQvYmctcGsuanBnJyk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gNzIxOyBpKyspIHtcclxuICAgICAgdGhpcy5sb2FkLmltYWdlKCdway0nICsgaSwgJ2Fzc2V0cy9pbWFnZXMvcG9rZW1vbnMvJyArIGkgKyAnLnBuZycpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2luaXRTb2NrZXQoKTtcclxuICB9LFxyXG5cclxuICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgRW5naW5lLlBva2Vtb25EQi5sb2FkKHRoaXMuY2FjaGUuZ2V0VGV4dCgncG9rZW1vbi5jc3YnKSk7XHJcblxyXG4gICAgdGhpcy5fYWRkQkcoKTtcclxuICAgIHRoaXMuX2FkZFdhdGVybWFyaygpO1xyXG4gICAgdGhpcy5fYWRkTGFibGUoKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KHRoaXMuX25leHRQb2tlbW9uLmJpbmQodGhpcyksIDMwMDApO1xyXG4gIH0sXHJcblxyXG4gIF9pbml0U29ja2V0OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc29ja2V0ID0gaW8oJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MScpO1xyXG4gIH0sXHJcblxyXG4gIF9hZGRCRzogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLmJnID0gdGhpcy5hZGQuaW1hZ2UoMCwgMCwgJ3BrLWJnJyk7XHJcbiAgfSxcclxuXHJcbiAgX2FkZFdhdGVybWFyazogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc3R5bGUgPSB7XHJcbiAgICAgIGZpbGw6ICcjYmFiYWJhJyxcclxuICAgICAgZm9udDogJzMwcHggT3BlbiBTYW5zJyxcclxuICAgICAgYWxpZ246ICdjZW50ZXInXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciB3YXRlcm1hcmsgPSB0aGlzLmFkZC50ZXh0KEVuZ2luZS5HQU1FX1dJRFRIIC8gMiwgNTAsIEVuZ2luZS5BUFBfTkFNRSwgc3R5bGUpO1xyXG4gICAgd2F0ZXJtYXJrLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gIH0sXHJcblxyXG4gIF9hZGRMYWJsZTogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc3R5bGUgPSB7XHJcbiAgICAgIGZpbGw6ICcjMzMzMzMzJyxcclxuICAgICAgZm9udDogJzUwcHggT3BlbiBTYW5zJyxcclxuICAgICAgYWxpZ246ICdjZW50ZXInXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubGFibGUgPSB0aGlzLmFkZC50ZXh0KEVuZ2luZS5HQU1FX1dJRFRIIC8gNCwgRW5naW5lLkdBTUVfSEVJR0hUIC8gMiwgJycsIHN0eWxlKTtcclxuICAgIHRoaXMubGFibGUuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgfSxcclxuXHJcbiAgX2NyZWF0ZUJHOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBibWQgPSB0aGlzLmFkZC5iaXRtYXBEYXRhKEVuZ2luZS5HQU1FX1dJRFRILCBFbmdpbmUuR0FNRV9IRUlHSFQpO1xyXG5cclxuICAgIGJtZC5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICBibWQuY3R4LnJlY3QoMCwgMCwgRW5naW5lLkdBTUVfV0lEVEgsIEVuZ2luZS5HQU1FX0hFSUdIVCk7XHJcbiAgICBibWQuY3R4LmZpbGxTdHlsZSA9ICdyZ2IoMjU1LCAyNTUsIDI1NSknO1xyXG4gICAgYm1kLmN0eC5maWxsKCk7XHJcblxyXG4gICAgdGhpcy5jYWNoZS5hZGRCaXRtYXBEYXRhKCdway1iZycsIGJtZCk7XHJcbiAgfSxcclxuXHJcbiAgX25leHRQb2tlbW9uOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuY291bnRlcisrO1xyXG5cclxuICAgIHRoaXMuX2NoYW5nZVBva2Vtb24oKTtcclxuICAgIHRoaXMuX3NhdmUoKTtcclxuXHJcbiAgICBpZiAodGhpcy5jb3VudGVyIDwgNzIxKSB7XHJcbiAgICAgIHNldFRpbWVvdXQodGhpcy5fbmV4dFBva2Vtb24uYmluZCh0aGlzKSwgMzAwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygnSSBhbSBmaW5pc2ghKSknKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBfY2hhbmdlUG9rZW1vbjogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcG9rZW1vbiA9IHRoaXMuYWRkLnNwcml0ZSh0aGlzLmdhbWUud2lkdGggKiAzIC8gNCwgdGhpcy5nYW1lLmhlaWdodCAvIDIsICdway0nICsgdGhpcy5jb3VudGVyKTtcclxuICAgIHBva2Vtb24uYW5jaG9yLnNldFRvKDAuNSk7XHJcblxyXG4gICAgdmFyIHByZVN0cmluZyA9ICfQryDQv9C+INGF0LDRgNCw0LrRgtC10YDRg1xcclxcbic7XHJcbiAgICB2YXIgcG9rZW1vbk5hbWUgPSBFbmdpbmUuUG9rZW1vbkRCLnBva2Vtb25zW3RoaXMuY291bnRlciAtIDFdLmlkZW50aWZpZXI7XHJcblxyXG4gICAgdGhpcy5sYWJsZS50ZXh0ID0gcHJlU3RyaW5nICsgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHBva2Vtb25OYW1lKTtcclxuICAgIHRoaXMubGFibGUuYWRkRm9udFdlaWdodCgnYm9sZGVyJywgcHJlU3RyaW5nLmxlbmd0aCAtIDIpO1xyXG5cclxuICAgIGlmICh0aGlzLl9sYXN0UG9rZW1vbiAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLl9sYXN0UG9rZW1vbi5raWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fbGFzdFBva2Vtb24gPSBwb2tlbW9uO1xyXG4gIH0sXHJcblxyXG4gIF9zYXZlOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBpbWFnZSA9IHRoaXMuZ2FtZS5jYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xyXG4gICAgdmFyIGlkID0gdGhpcy5jb3VudGVyO1xyXG4gICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgIGJpbjogaW1hZ2UsXHJcbiAgICAgIGlkOiBpZFxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc29ja2V0LmVtaXQoJ2ltZycsIGRhdGEpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cmluZykge1xyXG4gICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcclxufVxyXG4iLCJFbmdpbmUuR0FNRV9XSURUSCA9IDEwMDA7XHJcbkVuZ2luZS5HQU1FX0hFSUdIVCA9IDY0MDtcclxuRW5naW5lLkFQUF9OQU1FID0gJ3ZrLmNvbS9hcHA1NTg3OTg5JztcclxuRW5naW5lLkRFQlVHID0gdHJ1ZTtcclxuXHJcbnZhciBnYW1lID0gbmV3IFBoYXNlci5HYW1lKEVuZ2luZS5HQU1FX1dJRFRILCBFbmdpbmUuR0FNRV9IRUlHSFQsIFBoYXNlci5BVVRPLCAnZ2FtZScpO1xyXG5cclxuRW5naW5lLlJPTExfU0xJREVfQ09VTlQgPSA1MDtcclxuRW5naW5lLnJuZFBva2Vtb24gPSBnYW1lLnJuZC5iZXR3ZWVuKDEsIDcyMSk7XHJcblxyXG5nYW1lLnN0YXRlLmFkZCgnQm9vdCcsIEVuZ2luZS5Cb290KTtcclxuZ2FtZS5zdGF0ZS5hZGQoJ1ByZWxvYWRlcicsIEVuZ2luZS5QcmVsb2FkZXIpO1xyXG5nYW1lLnN0YXRlLmFkZCgnR2FtZScsIEVuZ2luZS5HYW1lKTtcclxuZ2FtZS5zdGF0ZS5hZGQoJ0NhbGN1bGF0ZScsIEVuZ2luZS5DYWxjdWxhdGUpO1xyXG5cclxuZ2FtZS5zdGF0ZS5zdGFydCgnQm9vdCcpO1xyXG4iLCJFbmdpbmUuUG9rZW1vbkRCID0ge1xyXG4gIGxvYWQ6IGZ1bmN0aW9uKGRhdGFUZXh0KSB7XHJcbiAgICB0aGlzLnBva2Vtb25zID0gW107XHJcbiAgICB2YXIgZGF0YSA9IFBhcGEucGFyc2UoZGF0YVRleHQpLmRhdGE7XHJcbiAgICB2YXIgZmllbGRzID0gZGF0YVswXTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIHBva2Vtb25EYXRhID0gZGF0YVtpXTtcclxuICAgICAgdmFyIHBva2Vtb25PYmogPSB7fTtcclxuXHJcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZmllbGRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgcG9rZW1vbk9ialtmaWVsZHNbal1dID0gcG9rZW1vbkRhdGFbal07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMucG9rZW1vbnMucHVzaChwb2tlbW9uT2JqKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
