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
  }, 50).start();
}

Engine.Slide.prototype.hide = function() {
  var tween = this.game.add.tween(this).to({
    alpha: 0
  }, 50).start();

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
    var metricValue = 1;
    ga('set', 'metric7', metricValue);
    VK.publicatePhoto(Engine.rndPokemon);
  },

  _repeatGame: function() {
    var metricValue = 1;
    ga('set', 'metric6', metricValue);

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
  if (VK.adsIsShowing || !VK.preroll) {
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

Engine.GAME_WIDTH = 1000;
Engine.GAME_HEIGHT = 640;
Engine.APP_NAME = 'vk.com/app5587989';

Engine.DEBUG = false;
Engine.ADS_IS_ACTIVE = false;

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcGFwYXJzZS5taW4uanMiLCJib290LmpzIiwicHJlbG9hZGVyLmpzIiwiYW5zd2VyLmpzIiwiZ2FtZS5qcyIsInBva2ViYWxsLXN5cy5qcyIsInNsaWRlLmpzIiwiY2FsY3VsYXRlLmpzIiwiZ2VuZXJhdG9yLmpzIiwiYXBwLmpzIiwicG9rZW1vbkRCLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxyXG5cdFBhcGEgUGFyc2VcclxuXHR2NC4xLjJcclxuXHRodHRwczovL2dpdGh1Yi5jb20vbWhvbHQvUGFwYVBhcnNlXHJcbiovXHJcbiFmdW5jdGlvbihlKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQscil7aWYocj1yfHx7fSxyLndvcmtlciYmUy5XT1JLRVJTX1NVUFBPUlRFRCl7dmFyIG49ZigpO3JldHVybiBuLnVzZXJTdGVwPXIuc3RlcCxuLnVzZXJDaHVuaz1yLmNodW5rLG4udXNlckNvbXBsZXRlPXIuY29tcGxldGUsbi51c2VyRXJyb3I9ci5lcnJvcixyLnN0ZXA9bShyLnN0ZXApLHIuY2h1bms9bShyLmNodW5rKSxyLmNvbXBsZXRlPW0oci5jb21wbGV0ZSksci5lcnJvcj1tKHIuZXJyb3IpLGRlbGV0ZSByLndvcmtlcix2b2lkIG4ucG9zdE1lc3NhZ2Uoe2lucHV0OnQsY29uZmlnOnIsd29ya2VySWQ6bi5pZH0pfXZhciBvPW51bGw7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIHQ/bz1yLmRvd25sb2FkP25ldyBpKHIpOm5ldyBhKHIpOihlLkZpbGUmJnQgaW5zdGFuY2VvZiBGaWxlfHx0IGluc3RhbmNlb2YgT2JqZWN0KSYmKG89bmV3IHMocikpLG8uc3RyZWFtKHQpfWZ1bmN0aW9uIHIoZSx0KXtmdW5jdGlvbiByKCl7XCJvYmplY3RcIj09dHlwZW9mIHQmJihcInN0cmluZ1wiPT10eXBlb2YgdC5kZWxpbWl0ZXImJjE9PXQuZGVsaW1pdGVyLmxlbmd0aCYmLTE9PVMuQkFEX0RFTElNSVRFUlMuaW5kZXhPZih0LmRlbGltaXRlcikmJih1PXQuZGVsaW1pdGVyKSwoXCJib29sZWFuXCI9PXR5cGVvZiB0LnF1b3Rlc3x8dC5xdW90ZXMgaW5zdGFuY2VvZiBBcnJheSkmJihvPXQucXVvdGVzKSxcInN0cmluZ1wiPT10eXBlb2YgdC5uZXdsaW5lJiYoaD10Lm5ld2xpbmUpKX1mdW5jdGlvbiBuKGUpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiBlKXJldHVybltdO3ZhciB0PVtdO2Zvcih2YXIgciBpbiBlKXQucHVzaChyKTtyZXR1cm4gdH1mdW5jdGlvbiBpKGUsdCl7dmFyIHI9XCJcIjtcInN0cmluZ1wiPT10eXBlb2YgZSYmKGU9SlNPTi5wYXJzZShlKSksXCJzdHJpbmdcIj09dHlwZW9mIHQmJih0PUpTT04ucGFyc2UodCkpO3ZhciBuPWUgaW5zdGFuY2VvZiBBcnJheSYmZS5sZW5ndGg+MCxpPSEodFswXWluc3RhbmNlb2YgQXJyYXkpO2lmKG4pe2Zvcih2YXIgYT0wO2E8ZS5sZW5ndGg7YSsrKWE+MCYmKHIrPXUpLHIrPXMoZVthXSxhKTt0Lmxlbmd0aD4wJiYocis9aCl9Zm9yKHZhciBvPTA7bzx0Lmxlbmd0aDtvKyspe2Zvcih2YXIgZj1uP2UubGVuZ3RoOnRbb10ubGVuZ3RoLGM9MDtmPmM7YysrKXtjPjAmJihyKz11KTt2YXIgZD1uJiZpP2VbY106YztyKz1zKHRbb11bZF0sYyl9bzx0Lmxlbmd0aC0xJiYocis9aCl9cmV0dXJuIHJ9ZnVuY3Rpb24gcyhlLHQpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBlfHxudWxsPT09ZSlyZXR1cm5cIlwiO2U9ZS50b1N0cmluZygpLnJlcGxhY2UoL1wiL2csJ1wiXCInKTt2YXIgcj1cImJvb2xlYW5cIj09dHlwZW9mIG8mJm98fG8gaW5zdGFuY2VvZiBBcnJheSYmb1t0XXx8YShlLFMuQkFEX0RFTElNSVRFUlMpfHxlLmluZGV4T2YodSk+LTF8fFwiIFwiPT1lLmNoYXJBdCgwKXx8XCIgXCI9PWUuY2hhckF0KGUubGVuZ3RoLTEpO3JldHVybiByPydcIicrZSsnXCInOmV9ZnVuY3Rpb24gYShlLHQpe2Zvcih2YXIgcj0wO3I8dC5sZW5ndGg7cisrKWlmKGUuaW5kZXhPZih0W3JdKT4tMSlyZXR1cm4hMDtyZXR1cm4hMX12YXIgbz0hMSx1PVwiLFwiLGg9XCJcXHJcXG5cIjtpZihyKCksXCJzdHJpbmdcIj09dHlwZW9mIGUmJihlPUpTT04ucGFyc2UoZSkpLGUgaW5zdGFuY2VvZiBBcnJheSl7aWYoIWUubGVuZ3RofHxlWzBdaW5zdGFuY2VvZiBBcnJheSlyZXR1cm4gaShudWxsLGUpO2lmKFwib2JqZWN0XCI9PXR5cGVvZiBlWzBdKXJldHVybiBpKG4oZVswXSksZSl9ZWxzZSBpZihcIm9iamVjdFwiPT10eXBlb2YgZSlyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgZS5kYXRhJiYoZS5kYXRhPUpTT04ucGFyc2UoZS5kYXRhKSksZS5kYXRhIGluc3RhbmNlb2YgQXJyYXkmJihlLmZpZWxkc3x8KGUuZmllbGRzPWUuZGF0YVswXWluc3RhbmNlb2YgQXJyYXk/ZS5maWVsZHM6bihlLmRhdGFbMF0pKSxlLmRhdGFbMF1pbnN0YW5jZW9mIEFycmF5fHxcIm9iamVjdFwiPT10eXBlb2YgZS5kYXRhWzBdfHwoZS5kYXRhPVtlLmRhdGFdKSksaShlLmZpZWxkc3x8W10sZS5kYXRhfHxbXSk7dGhyb3dcImV4Y2VwdGlvbjogVW5hYmxlIHRvIHNlcmlhbGl6ZSB1bnJlY29nbml6ZWQgaW5wdXRcIn1mdW5jdGlvbiBuKHQpe2Z1bmN0aW9uIHIoZSl7dmFyIHQ9XyhlKTt0LmNodW5rU2l6ZT1wYXJzZUludCh0LmNodW5rU2l6ZSksZS5zdGVwfHxlLmNodW5rfHwodC5jaHVua1NpemU9bnVsbCksdGhpcy5faGFuZGxlPW5ldyBvKHQpLHRoaXMuX2hhbmRsZS5zdHJlYW1lcj10aGlzLHRoaXMuX2NvbmZpZz10fXRoaXMuX2hhbmRsZT1udWxsLHRoaXMuX3BhdXNlZD0hMSx0aGlzLl9maW5pc2hlZD0hMSx0aGlzLl9pbnB1dD1udWxsLHRoaXMuX2Jhc2VJbmRleD0wLHRoaXMuX3BhcnRpYWxMaW5lPVwiXCIsdGhpcy5fcm93Q291bnQ9MCx0aGlzLl9zdGFydD0wLHRoaXMuX25leHRDaHVuaz1udWxsLHRoaXMuaXNGaXJzdENodW5rPSEwLHRoaXMuX2NvbXBsZXRlUmVzdWx0cz17ZGF0YTpbXSxlcnJvcnM6W10sbWV0YTp7fX0sci5jYWxsKHRoaXMsdCksdGhpcy5wYXJzZUNodW5rPWZ1bmN0aW9uKHQpe2lmKHRoaXMuaXNGaXJzdENodW5rJiZtKHRoaXMuX2NvbmZpZy5iZWZvcmVGaXJzdENodW5rKSl7dmFyIHI9dGhpcy5fY29uZmlnLmJlZm9yZUZpcnN0Q2h1bmsodCk7dm9pZCAwIT09ciYmKHQ9cil9dGhpcy5pc0ZpcnN0Q2h1bms9ITE7dmFyIG49dGhpcy5fcGFydGlhbExpbmUrdDt0aGlzLl9wYXJ0aWFsTGluZT1cIlwiO3ZhciBpPXRoaXMuX2hhbmRsZS5wYXJzZShuLHRoaXMuX2Jhc2VJbmRleCwhdGhpcy5fZmluaXNoZWQpO2lmKCF0aGlzLl9oYW5kbGUucGF1c2VkKCkmJiF0aGlzLl9oYW5kbGUuYWJvcnRlZCgpKXt2YXIgcz1pLm1ldGEuY3Vyc29yO3RoaXMuX2ZpbmlzaGVkfHwodGhpcy5fcGFydGlhbExpbmU9bi5zdWJzdHJpbmcocy10aGlzLl9iYXNlSW5kZXgpLHRoaXMuX2Jhc2VJbmRleD1zKSxpJiZpLmRhdGEmJih0aGlzLl9yb3dDb3VudCs9aS5kYXRhLmxlbmd0aCk7dmFyIGE9dGhpcy5fZmluaXNoZWR8fHRoaXMuX2NvbmZpZy5wcmV2aWV3JiZ0aGlzLl9yb3dDb3VudD49dGhpcy5fY29uZmlnLnByZXZpZXc7aWYoeSllLnBvc3RNZXNzYWdlKHtyZXN1bHRzOmksd29ya2VySWQ6Uy5XT1JLRVJfSUQsZmluaXNoZWQ6YX0pO2Vsc2UgaWYobSh0aGlzLl9jb25maWcuY2h1bmspKXtpZih0aGlzLl9jb25maWcuY2h1bmsoaSx0aGlzLl9oYW5kbGUpLHRoaXMuX3BhdXNlZClyZXR1cm47aT12b2lkIDAsdGhpcy5fY29tcGxldGVSZXN1bHRzPXZvaWQgMH1yZXR1cm4gdGhpcy5fY29uZmlnLnN0ZXB8fHRoaXMuX2NvbmZpZy5jaHVua3x8KHRoaXMuX2NvbXBsZXRlUmVzdWx0cy5kYXRhPXRoaXMuX2NvbXBsZXRlUmVzdWx0cy5kYXRhLmNvbmNhdChpLmRhdGEpLHRoaXMuX2NvbXBsZXRlUmVzdWx0cy5lcnJvcnM9dGhpcy5fY29tcGxldGVSZXN1bHRzLmVycm9ycy5jb25jYXQoaS5lcnJvcnMpLHRoaXMuX2NvbXBsZXRlUmVzdWx0cy5tZXRhPWkubWV0YSksIWF8fCFtKHRoaXMuX2NvbmZpZy5jb21wbGV0ZSl8fGkmJmkubWV0YS5hYm9ydGVkfHx0aGlzLl9jb25maWcuY29tcGxldGUodGhpcy5fY29tcGxldGVSZXN1bHRzKSxhfHxpJiZpLm1ldGEucGF1c2VkfHx0aGlzLl9uZXh0Q2h1bmsoKSxpfX0sdGhpcy5fc2VuZEVycm9yPWZ1bmN0aW9uKHQpe20odGhpcy5fY29uZmlnLmVycm9yKT90aGlzLl9jb25maWcuZXJyb3IodCk6eSYmdGhpcy5fY29uZmlnLmVycm9yJiZlLnBvc3RNZXNzYWdlKHt3b3JrZXJJZDpTLldPUktFUl9JRCxlcnJvcjp0LGZpbmlzaGVkOiExfSl9fWZ1bmN0aW9uIGkoZSl7ZnVuY3Rpb24gdChlKXt2YXIgdD1lLmdldFJlc3BvbnNlSGVhZGVyKFwiQ29udGVudC1SYW5nZVwiKTtyZXR1cm4gcGFyc2VJbnQodC5zdWJzdHIodC5sYXN0SW5kZXhPZihcIi9cIikrMSkpfWU9ZXx8e30sZS5jaHVua1NpemV8fChlLmNodW5rU2l6ZT1TLlJlbW90ZUNodW5rU2l6ZSksbi5jYWxsKHRoaXMsZSk7dmFyIHI7dGhpcy5fbmV4dENodW5rPWs/ZnVuY3Rpb24oKXt0aGlzLl9yZWFkQ2h1bmsoKSx0aGlzLl9jaHVua0xvYWRlZCgpfTpmdW5jdGlvbigpe3RoaXMuX3JlYWRDaHVuaygpfSx0aGlzLnN0cmVhbT1mdW5jdGlvbihlKXt0aGlzLl9pbnB1dD1lLHRoaXMuX25leHRDaHVuaygpfSx0aGlzLl9yZWFkQ2h1bms9ZnVuY3Rpb24oKXtpZih0aGlzLl9maW5pc2hlZClyZXR1cm4gdm9pZCB0aGlzLl9jaHVua0xvYWRlZCgpO2lmKHI9bmV3IFhNTEh0dHBSZXF1ZXN0LGt8fChyLm9ubG9hZD1nKHRoaXMuX2NodW5rTG9hZGVkLHRoaXMpLHIub25lcnJvcj1nKHRoaXMuX2NodW5rRXJyb3IsdGhpcykpLHIub3BlbihcIkdFVFwiLHRoaXMuX2lucHV0LCFrKSx0aGlzLl9jb25maWcuY2h1bmtTaXplKXt2YXIgZT10aGlzLl9zdGFydCt0aGlzLl9jb25maWcuY2h1bmtTaXplLTE7ci5zZXRSZXF1ZXN0SGVhZGVyKFwiUmFuZ2VcIixcImJ5dGVzPVwiK3RoaXMuX3N0YXJ0K1wiLVwiK2UpLHIuc2V0UmVxdWVzdEhlYWRlcihcIklmLU5vbmUtTWF0Y2hcIixcIndlYmtpdC1uby1jYWNoZVwiKX10cnl7ci5zZW5kKCl9Y2F0Y2godCl7dGhpcy5fY2h1bmtFcnJvcih0Lm1lc3NhZ2UpfWsmJjA9PXIuc3RhdHVzP3RoaXMuX2NodW5rRXJyb3IoKTp0aGlzLl9zdGFydCs9dGhpcy5fY29uZmlnLmNodW5rU2l6ZX0sdGhpcy5fY2h1bmtMb2FkZWQ9ZnVuY3Rpb24oKXtpZig0PT1yLnJlYWR5U3RhdGUpe2lmKHIuc3RhdHVzPDIwMHx8ci5zdGF0dXM+PTQwMClyZXR1cm4gdm9pZCB0aGlzLl9jaHVua0Vycm9yKCk7dGhpcy5fZmluaXNoZWQ9IXRoaXMuX2NvbmZpZy5jaHVua1NpemV8fHRoaXMuX3N0YXJ0PnQociksdGhpcy5wYXJzZUNodW5rKHIucmVzcG9uc2VUZXh0KX19LHRoaXMuX2NodW5rRXJyb3I9ZnVuY3Rpb24oZSl7dmFyIHQ9ci5zdGF0dXNUZXh0fHxlO3RoaXMuX3NlbmRFcnJvcih0KX19ZnVuY3Rpb24gcyhlKXtlPWV8fHt9LGUuY2h1bmtTaXplfHwoZS5jaHVua1NpemU9Uy5Mb2NhbENodW5rU2l6ZSksbi5jYWxsKHRoaXMsZSk7dmFyIHQscixpPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBGaWxlUmVhZGVyO3RoaXMuc3RyZWFtPWZ1bmN0aW9uKGUpe3RoaXMuX2lucHV0PWUscj1lLnNsaWNlfHxlLndlYmtpdFNsaWNlfHxlLm1velNsaWNlLGk/KHQ9bmV3IEZpbGVSZWFkZXIsdC5vbmxvYWQ9Zyh0aGlzLl9jaHVua0xvYWRlZCx0aGlzKSx0Lm9uZXJyb3I9Zyh0aGlzLl9jaHVua0Vycm9yLHRoaXMpKTp0PW5ldyBGaWxlUmVhZGVyU3luYyx0aGlzLl9uZXh0Q2h1bmsoKX0sdGhpcy5fbmV4dENodW5rPWZ1bmN0aW9uKCl7dGhpcy5fZmluaXNoZWR8fHRoaXMuX2NvbmZpZy5wcmV2aWV3JiYhKHRoaXMuX3Jvd0NvdW50PHRoaXMuX2NvbmZpZy5wcmV2aWV3KXx8dGhpcy5fcmVhZENodW5rKCl9LHRoaXMuX3JlYWRDaHVuaz1mdW5jdGlvbigpe3ZhciBlPXRoaXMuX2lucHV0O2lmKHRoaXMuX2NvbmZpZy5jaHVua1NpemUpe3ZhciBuPU1hdGgubWluKHRoaXMuX3N0YXJ0K3RoaXMuX2NvbmZpZy5jaHVua1NpemUsdGhpcy5faW5wdXQuc2l6ZSk7ZT1yLmNhbGwoZSx0aGlzLl9zdGFydCxuKX12YXIgcz10LnJlYWRBc1RleHQoZSx0aGlzLl9jb25maWcuZW5jb2RpbmcpO2l8fHRoaXMuX2NodW5rTG9hZGVkKHt0YXJnZXQ6e3Jlc3VsdDpzfX0pfSx0aGlzLl9jaHVua0xvYWRlZD1mdW5jdGlvbihlKXt0aGlzLl9zdGFydCs9dGhpcy5fY29uZmlnLmNodW5rU2l6ZSx0aGlzLl9maW5pc2hlZD0hdGhpcy5fY29uZmlnLmNodW5rU2l6ZXx8dGhpcy5fc3RhcnQ+PXRoaXMuX2lucHV0LnNpemUsdGhpcy5wYXJzZUNodW5rKGUudGFyZ2V0LnJlc3VsdCl9LHRoaXMuX2NodW5rRXJyb3I9ZnVuY3Rpb24oKXt0aGlzLl9zZW5kRXJyb3IodC5lcnJvcil9fWZ1bmN0aW9uIGEoZSl7ZT1lfHx7fSxuLmNhbGwodGhpcyxlKTt2YXIgdCxyO3RoaXMuc3RyZWFtPWZ1bmN0aW9uKGUpe3JldHVybiB0PWUscj1lLHRoaXMuX25leHRDaHVuaygpfSx0aGlzLl9uZXh0Q2h1bms9ZnVuY3Rpb24oKXtpZighdGhpcy5fZmluaXNoZWQpe3ZhciBlPXRoaXMuX2NvbmZpZy5jaHVua1NpemUsdD1lP3Iuc3Vic3RyKDAsZSk6cjtyZXR1cm4gcj1lP3Iuc3Vic3RyKGUpOlwiXCIsdGhpcy5fZmluaXNoZWQ9IXIsdGhpcy5wYXJzZUNodW5rKHQpfX19ZnVuY3Rpb24gbyhlKXtmdW5jdGlvbiB0KCl7aWYoYiYmZCYmKGgoXCJEZWxpbWl0ZXJcIixcIlVuZGV0ZWN0YWJsZURlbGltaXRlclwiLFwiVW5hYmxlIHRvIGF1dG8tZGV0ZWN0IGRlbGltaXRpbmcgY2hhcmFjdGVyOyBkZWZhdWx0ZWQgdG8gJ1wiK1MuRGVmYXVsdERlbGltaXRlcitcIidcIiksZD0hMSksZS5za2lwRW1wdHlMaW5lcylmb3IodmFyIHQ9MDt0PGIuZGF0YS5sZW5ndGg7dCsrKTE9PWIuZGF0YVt0XS5sZW5ndGgmJlwiXCI9PWIuZGF0YVt0XVswXSYmYi5kYXRhLnNwbGljZSh0LS0sMSk7cmV0dXJuIHIoKSYmbigpLGkoKX1mdW5jdGlvbiByKCl7cmV0dXJuIGUuaGVhZGVyJiYwPT15Lmxlbmd0aH1mdW5jdGlvbiBuKCl7aWYoYil7Zm9yKHZhciBlPTA7cigpJiZlPGIuZGF0YS5sZW5ndGg7ZSsrKWZvcih2YXIgdD0wO3Q8Yi5kYXRhW2VdLmxlbmd0aDt0KyspeS5wdXNoKGIuZGF0YVtlXVt0XSk7Yi5kYXRhLnNwbGljZSgwLDEpfX1mdW5jdGlvbiBpKCl7aWYoIWJ8fCFlLmhlYWRlciYmIWUuZHluYW1pY1R5cGluZylyZXR1cm4gYjtmb3IodmFyIHQ9MDt0PGIuZGF0YS5sZW5ndGg7dCsrKXtmb3IodmFyIHI9e30sbj0wO248Yi5kYXRhW3RdLmxlbmd0aDtuKyspe2lmKGUuZHluYW1pY1R5cGluZyl7dmFyIGk9Yi5kYXRhW3RdW25dO2IuZGF0YVt0XVtuXT1cInRydWVcIj09aXx8XCJUUlVFXCI9PWk/ITA6XCJmYWxzZVwiPT1pfHxcIkZBTFNFXCI9PWk/ITE6byhpKX1lLmhlYWRlciYmKG4+PXkubGVuZ3RoPyhyLl9fcGFyc2VkX2V4dHJhfHwoci5fX3BhcnNlZF9leHRyYT1bXSksci5fX3BhcnNlZF9leHRyYS5wdXNoKGIuZGF0YVt0XVtuXSkpOnJbeVtuXV09Yi5kYXRhW3RdW25dKX1lLmhlYWRlciYmKGIuZGF0YVt0XT1yLG4+eS5sZW5ndGg/aChcIkZpZWxkTWlzbWF0Y2hcIixcIlRvb01hbnlGaWVsZHNcIixcIlRvbyBtYW55IGZpZWxkczogZXhwZWN0ZWQgXCIreS5sZW5ndGgrXCIgZmllbGRzIGJ1dCBwYXJzZWQgXCIrbix0KTpuPHkubGVuZ3RoJiZoKFwiRmllbGRNaXNtYXRjaFwiLFwiVG9vRmV3RmllbGRzXCIsXCJUb28gZmV3IGZpZWxkczogZXhwZWN0ZWQgXCIreS5sZW5ndGgrXCIgZmllbGRzIGJ1dCBwYXJzZWQgXCIrbix0KSl9cmV0dXJuIGUuaGVhZGVyJiZiLm1ldGEmJihiLm1ldGEuZmllbGRzPXkpLGJ9ZnVuY3Rpb24gcyh0KXtmb3IodmFyIHIsbixpLHM9W1wiLFwiLFwiXHRcIixcInxcIixcIjtcIixTLlJFQ09SRF9TRVAsUy5VTklUX1NFUF0sYT0wO2E8cy5sZW5ndGg7YSsrKXt2YXIgbz1zW2FdLGg9MCxmPTA7aT12b2lkIDA7Zm9yKHZhciBjPW5ldyB1KHtkZWxpbWl0ZXI6byxwcmV2aWV3OjEwfSkucGFyc2UodCksZD0wO2Q8Yy5kYXRhLmxlbmd0aDtkKyspe3ZhciBsPWMuZGF0YVtkXS5sZW5ndGg7Zis9bCxcInVuZGVmaW5lZFwiIT10eXBlb2YgaT9sPjEmJihoKz1NYXRoLmFicyhsLWkpLGk9bCk6aT1sfWMuZGF0YS5sZW5ndGg+MCYmKGYvPWMuZGF0YS5sZW5ndGgpLChcInVuZGVmaW5lZFwiPT10eXBlb2Ygbnx8bj5oKSYmZj4xLjk5JiYobj1oLHI9byl9cmV0dXJuIGUuZGVsaW1pdGVyPXIse3N1Y2Nlc3NmdWw6ISFyLGJlc3REZWxpbWl0ZXI6cn19ZnVuY3Rpb24gYShlKXtlPWUuc3Vic3RyKDAsMTA0ODU3Nik7dmFyIHQ9ZS5zcGxpdChcIlxcclwiKTtpZigxPT10Lmxlbmd0aClyZXR1cm5cIlxcblwiO2Zvcih2YXIgcj0wLG49MDtuPHQubGVuZ3RoO24rKylcIlxcblwiPT10W25dWzBdJiZyKys7cmV0dXJuIHI+PXQubGVuZ3RoLzI/XCJcXHJcXG5cIjpcIlxcclwifWZ1bmN0aW9uIG8oZSl7dmFyIHQ9bC50ZXN0KGUpO3JldHVybiB0P3BhcnNlRmxvYXQoZSk6ZX1mdW5jdGlvbiBoKGUsdCxyLG4pe2IuZXJyb3JzLnB1c2goe3R5cGU6ZSxjb2RlOnQsbWVzc2FnZTpyLHJvdzpufSl9dmFyIGYsYyxkLGw9L15cXHMqLT8oXFxkKlxcLj9cXGQrfFxcZCtcXC4/XFxkKikoZVstK10/XFxkKyk/XFxzKiQvaSxwPXRoaXMsZz0wLHY9ITEsaz0hMSx5PVtdLGI9e2RhdGE6W10sZXJyb3JzOltdLG1ldGE6e319O2lmKG0oZS5zdGVwKSl7dmFyIFI9ZS5zdGVwO2Uuc3RlcD1mdW5jdGlvbihuKXtpZihiPW4scigpKXQoKTtlbHNle2lmKHQoKSwwPT1iLmRhdGEubGVuZ3RoKXJldHVybjtnKz1uLmRhdGEubGVuZ3RoLGUucHJldmlldyYmZz5lLnByZXZpZXc/Yy5hYm9ydCgpOlIoYixwKX19fXRoaXMucGFyc2U9ZnVuY3Rpb24ocixuLGkpe2lmKGUubmV3bGluZXx8KGUubmV3bGluZT1hKHIpKSxkPSExLCFlLmRlbGltaXRlcil7dmFyIG89cyhyKTtvLnN1Y2Nlc3NmdWw/ZS5kZWxpbWl0ZXI9by5iZXN0RGVsaW1pdGVyOihkPSEwLGUuZGVsaW1pdGVyPVMuRGVmYXVsdERlbGltaXRlciksYi5tZXRhLmRlbGltaXRlcj1lLmRlbGltaXRlcn12YXIgaD1fKGUpO3JldHVybiBlLnByZXZpZXcmJmUuaGVhZGVyJiZoLnByZXZpZXcrKyxmPXIsYz1uZXcgdShoKSxiPWMucGFyc2UoZixuLGkpLHQoKSx2P3ttZXRhOntwYXVzZWQ6ITB9fTpifHx7bWV0YTp7cGF1c2VkOiExfX19LHRoaXMucGF1c2VkPWZ1bmN0aW9uKCl7cmV0dXJuIHZ9LHRoaXMucGF1c2U9ZnVuY3Rpb24oKXt2PSEwLGMuYWJvcnQoKSxmPWYuc3Vic3RyKGMuZ2V0Q2hhckluZGV4KCkpfSx0aGlzLnJlc3VtZT1mdW5jdGlvbigpe3Y9ITEscC5zdHJlYW1lci5wYXJzZUNodW5rKGYpfSx0aGlzLmFib3J0ZWQ9ZnVuY3Rpb24oKXtyZXR1cm4ga30sdGhpcy5hYm9ydD1mdW5jdGlvbigpe2s9ITAsYy5hYm9ydCgpLGIubWV0YS5hYm9ydGVkPSEwLG0oZS5jb21wbGV0ZSkmJmUuY29tcGxldGUoYiksZj1cIlwifX1mdW5jdGlvbiB1KGUpe2U9ZXx8e307dmFyIHQ9ZS5kZWxpbWl0ZXIscj1lLm5ld2xpbmUsbj1lLmNvbW1lbnRzLGk9ZS5zdGVwLHM9ZS5wcmV2aWV3LGE9ZS5mYXN0TW9kZTtpZigoXCJzdHJpbmdcIiE9dHlwZW9mIHR8fFMuQkFEX0RFTElNSVRFUlMuaW5kZXhPZih0KT4tMSkmJih0PVwiLFwiKSxuPT09dCl0aHJvd1wiQ29tbWVudCBjaGFyYWN0ZXIgc2FtZSBhcyBkZWxpbWl0ZXJcIjtuPT09ITA/bj1cIiNcIjooXCJzdHJpbmdcIiE9dHlwZW9mIG58fFMuQkFEX0RFTElNSVRFUlMuaW5kZXhPZihuKT4tMSkmJihuPSExKSxcIlxcblwiIT1yJiZcIlxcclwiIT1yJiZcIlxcclxcblwiIT1yJiYocj1cIlxcblwiKTt2YXIgbz0wLHU9ITE7dGhpcy5wYXJzZT1mdW5jdGlvbihlLGgsZil7ZnVuY3Rpb24gYyhlKXtiLnB1c2goZSksUz1vfWZ1bmN0aW9uIGQodCl7cmV0dXJuIGY/cCgpOihcInVuZGVmaW5lZFwiPT10eXBlb2YgdCYmKHQ9ZS5zdWJzdHIobykpLHcucHVzaCh0KSxvPWcsYyh3KSx5JiZfKCkscCgpKX1mdW5jdGlvbiBsKHQpe289dCxjKHcpLHc9W10sTz1lLmluZGV4T2YocixvKX1mdW5jdGlvbiBwKGUpe3JldHVybntkYXRhOmIsZXJyb3JzOlIsbWV0YTp7ZGVsaW1pdGVyOnQsbGluZWJyZWFrOnIsYWJvcnRlZDp1LHRydW5jYXRlZDohIWUsY3Vyc29yOlMrKGh8fDApfX19ZnVuY3Rpb24gXygpe2kocCgpKSxiPVtdLFI9W119aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGUpdGhyb3dcIklucHV0IG11c3QgYmUgYSBzdHJpbmdcIjt2YXIgZz1lLmxlbmd0aCxtPXQubGVuZ3RoLHY9ci5sZW5ndGgsaz1uLmxlbmd0aCx5PVwiZnVuY3Rpb25cIj09dHlwZW9mIGk7bz0wO3ZhciBiPVtdLFI9W10sdz1bXSxTPTA7aWYoIWUpcmV0dXJuIHAoKTtpZihhfHxhIT09ITEmJi0xPT09ZS5pbmRleE9mKCdcIicpKXtmb3IodmFyIEM9ZS5zcGxpdChyKSxFPTA7RTxDLmxlbmd0aDtFKyspe3ZhciB3PUNbRV07aWYobys9dy5sZW5ndGgsRSE9PUMubGVuZ3RoLTEpbys9ci5sZW5ndGg7ZWxzZSBpZihmKXJldHVybiBwKCk7aWYoIW58fHcuc3Vic3RyKDAsaykhPW4pe2lmKHkpe2lmKGI9W10sYyh3LnNwbGl0KHQpKSxfKCksdSlyZXR1cm4gcCgpfWVsc2UgYyh3LnNwbGl0KHQpKTtpZihzJiZFPj1zKXJldHVybiBiPWIuc2xpY2UoMCxzKSxwKCEwKX19cmV0dXJuIHAoKX1mb3IodmFyIHg9ZS5pbmRleE9mKHQsbyksTz1lLmluZGV4T2YocixvKTs7KWlmKCdcIichPWVbb10paWYobiYmMD09PXcubGVuZ3RoJiZlLnN1YnN0cihvLGspPT09bil7aWYoLTE9PU8pcmV0dXJuIHAoKTtvPU8rdixPPWUuaW5kZXhPZihyLG8pLHg9ZS5pbmRleE9mKHQsbyl9ZWxzZSBpZigtMSE9PXgmJihPPnh8fC0xPT09Tykpdy5wdXNoKGUuc3Vic3RyaW5nKG8seCkpLG89eCttLHg9ZS5pbmRleE9mKHQsbyk7ZWxzZXtpZigtMT09PU8pYnJlYWs7aWYody5wdXNoKGUuc3Vic3RyaW5nKG8sTykpLGwoTyt2KSx5JiYoXygpLHUpKXJldHVybiBwKCk7aWYocyYmYi5sZW5ndGg+PXMpcmV0dXJuIHAoITApfWVsc2V7dmFyIEk9bztmb3IobysrOzspe3ZhciBJPWUuaW5kZXhPZignXCInLEkrMSk7aWYoLTE9PT1JKXJldHVybiBmfHxSLnB1c2goe3R5cGU6XCJRdW90ZXNcIixjb2RlOlwiTWlzc2luZ1F1b3Rlc1wiLG1lc3NhZ2U6XCJRdW90ZWQgZmllbGQgdW50ZXJtaW5hdGVkXCIscm93OmIubGVuZ3RoLGluZGV4Om99KSxkKCk7aWYoST09PWctMSl7dmFyIEQ9ZS5zdWJzdHJpbmcobyxJKS5yZXBsYWNlKC9cIlwiL2csJ1wiJyk7cmV0dXJuIGQoRCl9aWYoJ1wiJyE9ZVtJKzFdKXtpZihlW0krMV09PXQpe3cucHVzaChlLnN1YnN0cmluZyhvLEkpLnJlcGxhY2UoL1wiXCIvZywnXCInKSksbz1JKzErbSx4PWUuaW5kZXhPZih0LG8pLE89ZS5pbmRleE9mKHIsbyk7YnJlYWt9aWYoZS5zdWJzdHIoSSsxLHYpPT09cil7aWYody5wdXNoKGUuc3Vic3RyaW5nKG8sSSkucmVwbGFjZSgvXCJcIi9nLCdcIicpKSxsKEkrMSt2KSx4PWUuaW5kZXhPZih0LG8pLHkmJihfKCksdSkpcmV0dXJuIHAoKTtpZihzJiZiLmxlbmd0aD49cylyZXR1cm4gcCghMCk7YnJlYWt9fWVsc2UgSSsrfX1yZXR1cm4gZCgpfSx0aGlzLmFib3J0PWZ1bmN0aW9uKCl7dT0hMH0sdGhpcy5nZXRDaGFySW5kZXg9ZnVuY3Rpb24oKXtyZXR1cm4gb319ZnVuY3Rpb24gaCgpe3ZhciBlPWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO3JldHVybiBlLmxlbmd0aD9lW2UubGVuZ3RoLTFdLnNyYzpcIlwifWZ1bmN0aW9uIGYoKXtpZighUy5XT1JLRVJTX1NVUFBPUlRFRClyZXR1cm4hMTtpZighYiYmbnVsbD09PVMuU0NSSVBUX1BBVEgpdGhyb3cgbmV3IEVycm9yKFwiU2NyaXB0IHBhdGggY2Fubm90IGJlIGRldGVybWluZWQgYXV0b21hdGljYWxseSB3aGVuIFBhcGEgUGFyc2UgaXMgbG9hZGVkIGFzeW5jaHJvbm91c2x5LiBZb3UgbmVlZCB0byBzZXQgUGFwYS5TQ1JJUFRfUEFUSCBtYW51YWxseS5cIik7dmFyIHQ9Uy5TQ1JJUFRfUEFUSHx8djt0Kz0oLTEhPT10LmluZGV4T2YoXCI/XCIpP1wiJlwiOlwiP1wiKStcInBhcGF3b3JrZXJcIjt2YXIgcj1uZXcgZS5Xb3JrZXIodCk7cmV0dXJuIHIub25tZXNzYWdlPWMsci5pZD13KyssUltyLmlkXT1yLHJ9ZnVuY3Rpb24gYyhlKXt2YXIgdD1lLmRhdGEscj1SW3Qud29ya2VySWRdLG49ITE7aWYodC5lcnJvcilyLnVzZXJFcnJvcih0LmVycm9yLHQuZmlsZSk7ZWxzZSBpZih0LnJlc3VsdHMmJnQucmVzdWx0cy5kYXRhKXt2YXIgaT1mdW5jdGlvbigpe249ITAsZCh0LndvcmtlcklkLHtkYXRhOltdLGVycm9yczpbXSxtZXRhOnthYm9ydGVkOiEwfX0pfSxzPXthYm9ydDppLHBhdXNlOmwscmVzdW1lOmx9O2lmKG0oci51c2VyU3RlcCkpe2Zvcih2YXIgYT0wO2E8dC5yZXN1bHRzLmRhdGEubGVuZ3RoJiYoci51c2VyU3RlcCh7ZGF0YTpbdC5yZXN1bHRzLmRhdGFbYV1dLGVycm9yczp0LnJlc3VsdHMuZXJyb3JzLG1ldGE6dC5yZXN1bHRzLm1ldGF9LHMpLCFuKTthKyspO2RlbGV0ZSB0LnJlc3VsdHN9ZWxzZSBtKHIudXNlckNodW5rKSYmKHIudXNlckNodW5rKHQucmVzdWx0cyxzLHQuZmlsZSksZGVsZXRlIHQucmVzdWx0cyl9dC5maW5pc2hlZCYmIW4mJmQodC53b3JrZXJJZCx0LnJlc3VsdHMpfWZ1bmN0aW9uIGQoZSx0KXt2YXIgcj1SW2VdO20oci51c2VyQ29tcGxldGUpJiZyLnVzZXJDb21wbGV0ZSh0KSxyLnRlcm1pbmF0ZSgpLGRlbGV0ZSBSW2VdfWZ1bmN0aW9uIGwoKXt0aHJvd1wiTm90IGltcGxlbWVudGVkLlwifWZ1bmN0aW9uIHAodCl7dmFyIHI9dC5kYXRhO2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBTLldPUktFUl9JRCYmciYmKFMuV09SS0VSX0lEPXIud29ya2VySWQpLFwic3RyaW5nXCI9PXR5cGVvZiByLmlucHV0KWUucG9zdE1lc3NhZ2Uoe3dvcmtlcklkOlMuV09SS0VSX0lELHJlc3VsdHM6Uy5wYXJzZShyLmlucHV0LHIuY29uZmlnKSxmaW5pc2hlZDohMH0pO2Vsc2UgaWYoZS5GaWxlJiZyLmlucHV0IGluc3RhbmNlb2YgRmlsZXx8ci5pbnB1dCBpbnN0YW5jZW9mIE9iamVjdCl7dmFyIG49Uy5wYXJzZShyLmlucHV0LHIuY29uZmlnKTtuJiZlLnBvc3RNZXNzYWdlKHt3b3JrZXJJZDpTLldPUktFUl9JRCxyZXN1bHRzOm4sZmluaXNoZWQ6ITB9KX19ZnVuY3Rpb24gXyhlKXtpZihcIm9iamVjdFwiIT10eXBlb2YgZSlyZXR1cm4gZTt2YXIgdD1lIGluc3RhbmNlb2YgQXJyYXk/W106e307Zm9yKHZhciByIGluIGUpdFtyXT1fKGVbcl0pO3JldHVybiB0fWZ1bmN0aW9uIGcoZSx0KXtyZXR1cm4gZnVuY3Rpb24oKXtlLmFwcGx5KHQsYXJndW1lbnRzKX19ZnVuY3Rpb24gbShlKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBlfXZhciB2LGs9IWUuZG9jdW1lbnQmJiEhZS5wb3N0TWVzc2FnZSx5PWsmJi8oXFw/fCYpcGFwYXdvcmtlcig9fCZ8JCkvLnRlc3QoZS5sb2NhdGlvbi5zZWFyY2gpLGI9ITEsUj17fSx3PTAsUz17fTtpZihTLnBhcnNlPXQsUy51bnBhcnNlPXIsUy5SRUNPUkRfU0VQPVN0cmluZy5mcm9tQ2hhckNvZGUoMzApLFMuVU5JVF9TRVA9U3RyaW5nLmZyb21DaGFyQ29kZSgzMSksUy5CWVRFX09SREVSX01BUks9XCLvu79cIixTLkJBRF9ERUxJTUlURVJTPVtcIlxcclwiLFwiXFxuXCIsJ1wiJyxTLkJZVEVfT1JERVJfTUFSS10sUy5XT1JLRVJTX1NVUFBPUlRFRD0hayYmISFlLldvcmtlcixTLlNDUklQVF9QQVRIPW51bGwsUy5Mb2NhbENodW5rU2l6ZT0xMDQ4NTc2MCxTLlJlbW90ZUNodW5rU2l6ZT01MjQyODgwLFMuRGVmYXVsdERlbGltaXRlcj1cIixcIixTLlBhcnNlcj11LFMuUGFyc2VySGFuZGxlPW8sUy5OZXR3b3JrU3RyZWFtZXI9aSxTLkZpbGVTdHJlYW1lcj1zLFMuU3RyaW5nU3RyZWFtZXI9YSxcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1TOm0oZS5kZWZpbmUpJiZlLmRlZmluZS5hbWQ/ZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIFN9KTplLlBhcGE9UyxlLmpRdWVyeSl7dmFyIEM9ZS5qUXVlcnk7Qy5mbi5wYXJzZT1mdW5jdGlvbih0KXtmdW5jdGlvbiByKCl7aWYoMD09YS5sZW5ndGgpcmV0dXJuIHZvaWQobSh0LmNvbXBsZXRlKSYmdC5jb21wbGV0ZSgpKTt2YXIgZT1hWzBdO2lmKG0odC5iZWZvcmUpKXt2YXIgcj10LmJlZm9yZShlLmZpbGUsZS5pbnB1dEVsZW0pO2lmKFwib2JqZWN0XCI9PXR5cGVvZiByKXtpZihcImFib3J0XCI9PXIuYWN0aW9uKXJldHVybiB2b2lkIG4oXCJBYm9ydEVycm9yXCIsZS5maWxlLGUuaW5wdXRFbGVtLHIucmVhc29uKTtpZihcInNraXBcIj09ci5hY3Rpb24pcmV0dXJuIHZvaWQgaSgpO1wib2JqZWN0XCI9PXR5cGVvZiByLmNvbmZpZyYmKGUuaW5zdGFuY2VDb25maWc9Qy5leHRlbmQoZS5pbnN0YW5jZUNvbmZpZyxyLmNvbmZpZykpfWVsc2UgaWYoXCJza2lwXCI9PXIpcmV0dXJuIHZvaWQgaSgpfXZhciBzPWUuaW5zdGFuY2VDb25maWcuY29tcGxldGU7ZS5pbnN0YW5jZUNvbmZpZy5jb21wbGV0ZT1mdW5jdGlvbih0KXttKHMpJiZzKHQsZS5maWxlLGUuaW5wdXRFbGVtKSxpKCl9LFMucGFyc2UoZS5maWxlLGUuaW5zdGFuY2VDb25maWcpfWZ1bmN0aW9uIG4oZSxyLG4saSl7bSh0LmVycm9yKSYmdC5lcnJvcih7bmFtZTplfSxyLG4saSl9ZnVuY3Rpb24gaSgpe2Euc3BsaWNlKDAsMSkscigpfXZhciBzPXQuY29uZmlnfHx7fSxhPVtdO3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgdD1cIklOUFVUXCI9PUModGhpcykucHJvcChcInRhZ05hbWVcIikudG9VcHBlckNhc2UoKSYmXCJmaWxlXCI9PUModGhpcykuYXR0cihcInR5cGVcIikudG9Mb3dlckNhc2UoKSYmZS5GaWxlUmVhZGVyO2lmKCF0fHwhdGhpcy5maWxlc3x8MD09dGhpcy5maWxlcy5sZW5ndGgpcmV0dXJuITA7Zm9yKHZhciByPTA7cjx0aGlzLmZpbGVzLmxlbmd0aDtyKyspYS5wdXNoKHtmaWxlOnRoaXMuZmlsZXNbcl0saW5wdXRFbGVtOnRoaXMsaW5zdGFuY2VDb25maWc6Qy5leHRlbmQoe30scyl9KX0pLHIoKSx0aGlzfX15P2Uub25tZXNzYWdlPXA6Uy5XT1JLRVJTX1NVUFBPUlRFRCYmKHY9aCgpLGRvY3VtZW50LmJvZHk/ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIixmdW5jdGlvbigpe2I9ITB9LCEwKTpiPSEwKSxpLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKG4ucHJvdG90eXBlKSxpLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1pLHMucHJvdG90eXBlPU9iamVjdC5jcmVhdGUobi5wcm90b3R5cGUpLHMucHJvdG90eXBlLmNvbnN0cnVjdG9yPXMsYS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShhLnByb3RvdHlwZSksYS5wcm90b3R5cGUuY29uc3RydWN0b3I9YX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6dGhpcyk7IiwidmFyIEVuZ2luZSA9IHt9O1xyXG5cclxuRW5naW5lLkJvb3QgPSBmdW5jdGlvbiAoZ2FtZSkgeyB9O1xyXG5cclxuRW5naW5lLkJvb3QucHJvdG90eXBlID0ge1xyXG4gIHByZWxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICB9LFxyXG5cclxuICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuc2NhbGUuc2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5TSE9XX0FMTDtcclxuICAgIHRoaXMuc2NhbGUucGFnZUFsaWduSG9yaXpvbnRhbGx5ID0gdHJ1ZTtcclxuICAgIHRoaXMuc2NhbGUucGFnZUFsaWduVmVydGljYWxseSA9IHRydWU7XHJcbiAgICB0aGlzLnN0YWdlLmRpc2FibGVWaXNpYmlsaXR5Q2hhbmdlID0gdHJ1ZTtcclxuICAgIHRoaXMuc3RhdGUuc3RhcnQoJ1ByZWxvYWRlcicpO1xyXG4gIH1cclxufVxyXG4iLCJFbmdpbmUuUHJlbG9hZGVyID0gZnVuY3Rpb24gKGdhbWUpIHtcclxuICB0aGlzLmdhbWUgPSBnYW1lO1xyXG59O1xyXG5cclxuRW5naW5lLlByZWxvYWRlci5wcm90b3R5cGUgPSB7XHJcbiAgcHJlbG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XHJcbiAgICB0aGlzLnN0YWdlLnNtb290aGVkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5hZGRMb2dvTGFibGUoKTtcclxuICAgIHRoaXMuYWRkUHJvZ3Jlc3NMYWJsZSgpO1xyXG5cclxuICAgIGlmIChFbmdpbmUuREVCVUcpXHJcbiAgICAgIHRoaXMubG9hZC5lbmFibGVQYXJhbGxlbCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX2luaXRTdHlsZSgpO1xyXG5cclxuICAgIHRoaXMubG9hZC5pbWFnZSgncG9rZWJhbGwnLCAnYXNzZXRzL2ltYWdlcy9iYWNrZ3JvdW5kL3Bva2ViYWxsLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdzbGlkZS1iZycsICdhc3NldHMvaW1hZ2VzL2JhY2tncm91bmQvc2xpZGUtYmcuanBnJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ2NhbGMtYmcnLCAnYXNzZXRzL2ltYWdlcy9iYWNrZ3JvdW5kL2NhbGMuanBnJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3NoYXJlLWJ0bicsICdhc3NldHMvaW1hZ2VzL3VpL3NoYXJlLWJ0bi5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgncmVwZWF0LWJ0bicsICdhc3NldHMvaW1hZ2VzL3VpL3JlcGVhdC1idG4ucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3JuZC1wb2tlbW9uJywgJ2Fzc2V0cy9pbWFnZXMvcG9rZW1vbnMvJyArIEVuZ2luZS5ybmRQb2tlbW9uICsgJy5wbmcnKTtcclxuXHJcbiAgICB0aGlzLl9sb2FkUG9rZW1vbnMoKTtcclxuXHJcbiAgICB0aGlzLmxvYWQudGV4dCgncG9rZW1vbi5jc3YnLCAnYXNzZXRzL2RhdGEvcG9rZW1vbi5jc3YnKTtcclxuICAgIHRoaXMubG9hZC50ZXh0KCdkYXRhLmpzb24nLCAnYXNzZXRzL2RhdGEvZGF0YS5qc29uJyk7XHJcblxyXG4gICAgdGhpcy5sb2FkLm9uRmlsZUNvbXBsZXRlLmFkZCh0aGlzLmZpbGVDb21wbGV0ZSwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgX2luaXRQb2tlbW9uREI6IGZ1bmN0aW9uKCkge1xyXG4gICAgRW5naW5lLlBva2Vtb25EQi5sb2FkKHRoaXMuY2FjaGUuZ2V0VGV4dCgncG9rZW1vbi5jc3YnKSk7XHJcbiAgfSxcclxuXHJcbiAgX2xvYWRQb2tlbW9uczogZnVuY3Rpb24oKSB7XHJcbiAgICBFbmdpbmUubG9hZGVyID0gbmV3IFBoYXNlci5Mb2FkZXIodGhpcy5nYW1lKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IEVuZ2luZS5ST0xMX1NMSURFX0NPVU5UOyBpKyspIHtcclxuICAgICAgRW5naW5lLmxvYWRlci5pbWFnZSgncG9rZW1vblJvbGwnICsgaSwgJ2Fzc2V0cy9pbWFnZXMvcG9rZW1vbnMvJyArIHRoaXMucm5kLmJldHdlZW4oMSwgNzIxKSArICcucG5nJyk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZmlsZUNvbXBsZXRlOiBmdW5jdGlvbiAocHJvZ3Jlc3MsIGNhY2hlS2V5LCBzdWNjZXNzLCB0b3RhbExvYWRlZCwgdG90YWxGaWxlcykge1xyXG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZS50ZXh0ID0gcHJvZ3Jlc3MgKyAnJSAnICsgdG90YWxMb2FkZWQgKyAnLycgKyB0b3RhbEZpbGVzO1xyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5faW5pdFBva2Vtb25EQigpO1xyXG5cclxuICAgIEVuZ2luZS5kYXRhID0gSlNPTi5wYXJzZSh0aGlzLmNhY2hlLmdldFRleHQoJ2RhdGEuanNvbicpKTtcclxuXHJcbiAgICBFbmdpbmUubG9hZGVyLnN0YXJ0KCk7XHJcblxyXG4gICAgdGhpcy5zdGF0ZS5zdGFydCgnR2FtZScpO1xyXG4gIH0sXHJcblxyXG4gIF9pbml0U3R5bGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgRW5naW5lLnRleHRTdHlsZSA9IHtcclxuICAgICAgZmlsbDogJyNmZmYnLFxyXG4gICAgICBmb250OiAnMjZweCBPcGVuIFNhbnMnXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYWRkTG9nb0xhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc3R5bGUgPSB7XHJcbiAgICAgIGZpbGw6ICcjRkZGJyxcclxuICAgICAgZm9udDogJzQzcHggQXJpYWwnXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fbG9nb0xhYmxlID0gdGhpcy5hZGQudGV4dCh0aGlzLmdhbWUud2lkdGggLyAyLCB0aGlzLmdhbWUuaGVpZ2h0IC8gNCwgJ1Bva2Vtb24gVGVzdCcsIHN0eWxlKTtcclxuICAgIHRoaXMuX2xvZ29MYWJsZS5hbmNob3Iuc2V0VG8oMC41KTtcclxuICB9LFxyXG5cclxuICBhZGRQcm9ncmVzc0xhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc3R5bGUgPSB7XHJcbiAgICAgIGZpbGw6ICcjRkZGJyxcclxuICAgICAgZm9udDogJzIxcHggQXJpYWwnXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZSA9IHRoaXMuYWRkLnRleHQodGhpcy5nYW1lLndpZHRoIC8gMiwgdGhpcy5nYW1lLmhlaWdodCAvIDIsICdDYWxjdWxhdGVkLi4uJywgc3R5bGUpO1xyXG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZS5hbmNob3Iuc2V0VG8oMC41KTtcclxuICB9XHJcbn1cclxuIiwiRW5naW5lLkFuc3dlciA9IGZ1bmN0aW9uKGdhbWUsIHgsIHksIHRleHQsIGNhbGxiYWNrLCBjb250ZXh0KSB7XHJcbiAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gIHRoaXMuX3BhZGRpbmcgPSA1O1xyXG5cclxuICB0aGlzLl9jcmVhdGVUZXh0KCk7XHJcblxyXG4gIFBoYXNlci5CdXR0b24uY2FsbCh0aGlzLCBnYW1lLCB4LCB5LCB0aGlzLl9jcmVhdGVCYWNrZ3JvdW5kKCksIGNhbGxiYWNrLCBjb250ZXh0KTtcclxuICB0aGlzLnRpbnQgPSAweDAwOTY4ODtcclxuXHJcbiAgdGhpcy5hZGRDaGlsZCh0aGlzLl90ZXh0U3ByaXRlKTtcclxuXHJcbiAgdGhpcy5vbklucHV0T3Zlci5hZGQoZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnRpbnQgPSAweDAwZmVlNztcclxuICB9LCB0aGlzKTtcclxuXHJcbiAgdGhpcy5vbklucHV0T3V0LmFkZChmdW5jdGlvbigpIHtcclxuICAgIHRoaXMudGludCA9IDB4MDA5Njg4O1xyXG4gIH0sIHRoaXMpO1xyXG59XHJcblxyXG5FbmdpbmUuQW5zd2VyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGhhc2VyLkJ1dHRvbi5wcm90b3R5cGUpO1xyXG5FbmdpbmUuQW5zd2VyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEVuZ2luZS5BbnN3ZXI7XHJcblxyXG5FbmdpbmUuQW5zd2VyLnByb3RvdHlwZS5fY3JlYXRlQmFja2dyb3VuZCA9IGZ1bmN0aW9uKCkge1xyXG4gIHZhciBib3R0b21QYWRkaW5nID0gLTc7XHJcblxyXG4gIHZhciBibXAgPSB0aGlzLmdhbWUuYWRkLmJpdG1hcERhdGEodGhpcy5fdGV4dFNwcml0ZS53aWR0aCArIHRoaXMuX3BhZGRpbmcgKiAyLCB0aGlzLl90ZXh0U3ByaXRlLmhlaWdodCArIHRoaXMuX3BhZGRpbmcgLyAyKTtcclxuICBibXAuY3R4LmJlZ2luUGF0aCgpO1xyXG4gIGJtcC5jdHgucmVjdCgwLCAwLCBibXAud2lkdGgsIGJtcC5oZWlnaHQgKyBib3R0b21QYWRkaW5nKTtcclxuICBibXAuY3R4LmZpbGxTdHlsZSA9ICcjZmZmJztcclxuICBibXAuY3R4LmZpbGwoKTtcclxuXHJcbiAgcmV0dXJuIGJtcDtcclxufVxyXG5cclxuRW5naW5lLkFuc3dlci5wcm90b3R5cGUuX2NyZWF0ZVRleHQgPSBmdW5jdGlvbigpIHtcclxuICB0aGlzLl90ZXh0U3ByaXRlID0gbmV3IFBoYXNlci5UZXh0KHRoaXMuZ2FtZSwgMCwgMCwgdGhpcy50ZXh0LCBFbmdpbmUudGV4dFN0eWxlKTtcclxuICB0aGlzLl90ZXh0U3ByaXRlLmFuY2hvci5zZXRUbygwLjUsIDApO1xyXG59XHJcbiIsIkVuZ2luZS5HYW1lID0gZnVuY3Rpb24oZ2FtZSkge31cclxuXHJcbkVuZ2luZS5HYW1lLnByb3RvdHlwZSA9IHtcclxuICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7IC8vI2RkZFxyXG5cclxuICAgIHRoaXMuX2FkZEJhY2tncm91bmQoKTtcclxuICAgIHRoaXMuX2FkZFBva2ViYWxsU3lzdGVtKCk7XHJcbiAgICB0aGlzLl9hZGRTbGlkZXMoKTtcclxuICAgIHRoaXMuX3Nob3dDaGFpblNsaWRlcyh0aGlzLnNsaWRlcyk7XHJcbiAgICB0aGlzLl9hZGRQcm9ncmVzc1NsaWRlKCk7XHJcblxyXG4gICAgdGhpcy5fZHJhd0RlYnVnKCk7XHJcbiAgfSxcclxuXHJcbiAgX2FkZFNsaWRlczogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnNsaWRlcyA9IFtcclxuICAgICAgbmV3IEVuZ2luZS5TbGlkZSh0aGlzLmdhbWUsICfQktGLINC70Y7QsdC40YLQtSDQvtCy0YHRj9C90L7QtSDQv9C10YfQtdC90YzQtT8nLCBbJ9CU0LAnLCAn0J3QtdGCJywgJ9Cd0LUg0L/RgNC+0LHQvtCy0LDQuyDQtdCz0L4nXSksXHJcbiAgICAgIG5ldyBFbmdpbmUuU2xpZGUodGhpcy5nYW1lLCAn0JLQsNGBINGH0LDRgdGC0L4g0LHRjNGR0YIg0YLQvtC60L7QvD8nLCBbJ9CR0YvQstCw0LXRgicsICfQntGH0LXQvdGMINGA0LXQtNC60L4nLCAn0J3QtSDQt9C90LDRjicsICfQotC+0LvRjNC60L4g0YfRgtC+INGD0LTQsNGA0LjQu9C+ISddKSxcclxuICAgICAgbmV3IEVuZ2luZS5TbGlkZSh0aGlzLmdhbWUsICfQmtCw0LrQsNGPINGB0YLQuNGF0LjRjyDQstCw0Lwg0LHQvtC70YzRiNC1INC90YDQsNCy0LjRgtGB0Y8/JywgWyfQktC+0LTQsCcsICfQntCz0L7QvdGMJywgJ9CS0LXRgtC10YAnLCAn0JfQtdC80LvRjyddKSxcclxuICAgICAgbmV3IEVuZ2luZS5TbGlkZSh0aGlzLmdhbWUsICfQktGL0LHQuNGA0LjRgtC1INC+0LTQvdC+INC40LcuLi4nLCBbJ9Ci0YzQvNCwJywgJ9Ch0LLQtdGCJ10pLFxyXG4gICAgICBuZXcgRW5naW5lLlNsaWRlKHRoaXMuZ2FtZSwgJ9CS0Ysg0LHQvtC40YLQtdGB0Ywg0L3QsNGB0LXQutC+0LzRi9GFPycsIFsn0JTQsCcsICfQndC10YInXSksXHJcbiAgICAgIG5ldyBFbmdpbmUuU2xpZGUodGhpcy5nYW1lLCAn0J3QtSDQv9GA0L7RgtC40LIg0LvQuCDQstGLINC30LDQstC10YHRgtC4INC00L7QvNCw0YjQvdC10LPQviDQtNGA0LDQutC+0L3QsD8nLCBbJ9Cf0YTRhCwg0LXRidGRINGB0L/RgNCw0YjQuNCy0LDQtdGC0LUnLCAn0J3QtSDQu9GO0LHQu9GOINC00YDQsNC60L7QvdC+0LInLCAn0JHQvtGO0YHRjCDQvtC9INGB0YrQtdGB0YIg0LzQvtC10LPQviDQv9C40YLQvtC80YbQsCddKSxcclxuICAgICAgbmV3IEVuZ2luZS5TbGlkZSh0aGlzLmdhbWUsICfQmtCw0LrQvtC1INC/0LXRgNC10LTQstC40LbQtdC90LjQtSDQstGLINC/0YDQtdC00L/QvtGH0LjRgtCw0LXRgtC1PycsIFsn0J/QviDQstC+0LfQtNGD0YXRgycsICfQn9C+INC30LXQvNC70LUnLCAn0JLQv9C70LDQstGMJywgJ9Ci0LXQu9C10L/QvtGA0YLQsNGG0LjRjyddKSxcclxuICAgICAgbmV3IEVuZ2luZS5TbGlkZSh0aGlzLmdhbWUsICfQktGLINCx0L7QuNGC0LXRgdGMINC/0YDQuNCy0LXQtNC10L3QuNC5PycsIFsn0JTQsCcsICfQndC10YInLCAn0J7QvdC4INC90LUg0YHRg9GJ0LXRgdGC0LLRg9GO0YIhJ10pLFxyXG4gICAgICBuZXcgRW5naW5lLlNsaWRlKHRoaXMuZ2FtZSwgJ9Ca0LDQutC40LUg0LLQsNC8INC90YDQsNCy0Y/RgtGB0Y8g0LbQuNCy0L7RgtC90YvQtScsIFsn0JHQvtC70YzRiNC40LUnLCAn0JzQsNC70LXQvdGM0LrQuNC1JywgJ9Ch0YDQtdC00L3QuNC1J10pLFxyXG4gICAgICBuZXcgRW5naW5lLlNsaWRlKHRoaXMuZ2FtZSwgJ9CS0LDQvCDQvdGA0LDQstGP0YLRgdGPINC/0YPRhdC70LXQvdGM0LrQuNC1INC/0LjRgtC+0LzRhtGLPycsIFsn0JTQsCcsICfQndC10YInLCAn0JHQtdC3INGA0LDQt9C90LjRhtGLJ10pLFxyXG4gICAgXTtcclxuICB9LFxyXG5cclxuICBfc2hvd0NoYWluU2xpZGVzOiBmdW5jdGlvbihjaGFpbikge1xyXG4gICAgdGhpcy5zbGlkZUNvdW50ZXIgPSAwO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhaW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY2hhaW5baV0uc2V0Q2FsbGJhY2tDaGVjayh0aGlzLl9uZXh0U2xpZGUuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhaW5bMF0uc2hvdygpO1xyXG4gIH0sXHJcblxyXG4gIF9uZXh0U2xpZGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5zbGlkZUNvdW50ZXIrKztcclxuXHJcbiAgICBpZiAodGhpcy5zbGlkZUNvdW50ZXIgPj0gdGhpcy5zbGlkZXMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuX2ZpbmlzaFRlc3QoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2xpZGVzW3RoaXMuc2xpZGVDb3VudGVyXS5zaG93KCk7XHJcbiAgICB0aGlzLl9wcm9ncmVzc0xhYmxlLnRleHQgPSAn0JLQvtC/0YDQvtGBICcgKyAodGhpcy5zbGlkZUNvdW50ZXIgKyAxKSArICcg0LjQtyAnICsgdGhpcy5zbGlkZXMubGVuZ3RoO1xyXG4gIH0sXHJcblxyXG4gIF9hZGRCYWNrZ3JvdW5kOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBiZyA9IHRoaXMuZ2FtZS5hZGQuc3ByaXRlKDAsIDAsICdzbGlkZS1iZycpO1xyXG4gIH0sXHJcblxyXG4gIF9kcmF3RGVidWc6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5fbGluZVYgPSBuZXcgUGhhc2VyLkxpbmUodGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIDAsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCB0aGlzLmdhbWUuaGVpZ2h0KTtcclxuICAgIHRoaXMuX2xpbmVIID0gbmV3IFBoYXNlci5MaW5lKDAsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZLCB0aGlzLmdhbWUud2lkdGgsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZKTtcclxuICB9LFxyXG5cclxuICBfYWRkUG9rZWJhbGxTeXN0ZW06IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5wb2tlYmFsbFN5c3RlbSA9IG5ldyBFbmdpbmUuUG9rZWJhbGxTeXN0ZW0odGhpcy5nYW1lKTtcclxuICAgIHRoaXMucG9rZWJhbGxTeXN0ZW0uY3JlYXRlKCk7XHJcbiAgfSxcclxuXHJcbiAgX2ZpbmlzaFRlc3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5zdGF0ZS5zdGFydCgnQ2FsY3VsYXRlJyk7XHJcbiAgfSxcclxuXHJcbiAgX2FkZFByb2dyZXNzU2xpZGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZSA9IHRoaXMuYWRkLnRleHQoRW5naW5lLkdBTUVfV0lEVEggLyAyLCAyNSwgJ9CS0L7Qv9GA0L7RgSAxINC40LcgJyArIHRoaXMuc2xpZGVzLmxlbmd0aCwgRW5naW5lLnRleHRTdHlsZSk7XHJcbiAgICB0aGlzLl9wcm9ncmVzc0xhYmxlLmZvbnRTaXplID0gMTY7XHJcbiAgICB0aGlzLl9wcm9ncmVzc0xhYmxlLmFuY2hvci5zZXRUbygwLjUsIDApO1xyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZTogZnVuY3Rpb24oKSB7fSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIC8vIHRoaXMuZ2FtZS5kZWJ1Zy5pbnB1dEluZm8oMTUsIDE1LCAnI2ZmZicpO1xyXG4gICAgLy8gLy8gdGhpcy5nYW1lLmRlYnVnLnNwcml0ZUJvdW5kcyh0aGlzLnQuX3NsaWRlR3JvdXAsICdyZ2JhKDIxMywgODMsIDgzLCAwLjI1KScpO1xyXG4gICAgLy8gLy8gdGhpcy5nYW1lLmRlYnVnLnNwcml0ZUJvdW5kcyh0aGlzLnQuX2Fuc3dlckdyb3VwLCAncmdiYSgzNiwgMCwgMjU1LCAwLjI1KScpO1xyXG4gICAgLy9cclxuICAgIC8vIGdhbWUuZGVidWcuZ2VvbSh0aGlzLl9saW5lVik7XHJcbiAgICAvLyBnYW1lLmRlYnVnLmdlb20odGhpcy5fbGluZUgpO1xyXG4gIH1cclxufVxyXG4iLCJFbmdpbmUuUG9rZWJhbGxTeXN0ZW0gPSBmdW5jdGlvbihnYW1lKSB7XHJcbiAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICB0aGlzLmNvdW50RWxlbWVudHMgPSAxNjtcclxufVxyXG5cclxuRW5naW5lLlBva2ViYWxsU3lzdGVtLnByb3RvdHlwZSA9IHtcclxuICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5fYWRkUG9rZWJhbGxzKCk7XHJcbiAgICB0aGlzLl9ydW5UaW1lcigpO1xyXG4gIH0sXHJcblxyXG4gIF9hZGRQb2tlYmFsbHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5wb2tlYmFsbHMgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNvdW50RWxlbWVudHM7IGkrKykge1xyXG4gICAgICB2YXIgcG9rZWJhbGwgPSBuZXcgUGhhc2VyLlNwcml0ZSh0aGlzLmdhbWUsIDAsIDAsICdwb2tlYmFsbCcpO1xyXG5cclxuICAgICAgcG9rZWJhbGwuYW5jaG9yLnNldFRvKDAuNSk7XHJcblxyXG4gICAgICB0aGlzLnBva2ViYWxscy5hZGQocG9rZWJhbGwpO1xyXG5cclxuICAgICAgcG9rZWJhbGwua2lsbCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIF9ydW5UaW1lcjogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLl90aW1lciA9IHRoaXMuZ2FtZS50aW1lLmNyZWF0ZSgpO1xyXG4gICAgdGhpcy5fdGltZXIubG9vcChQaGFzZXIuVGltZXIuU0VDT05ELCB0aGlzLmVtaXQsIHRoaXMpO1xyXG4gICAgdGhpcy5fdGltZXIuc3RhcnQoKTtcclxuICB9LFxyXG5cclxuICBlbWl0OiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBwYWRkaW5ncyA9IDI1O1xyXG4gICAgdmFyIHNjYWxlID0gdGhpcy5nYW1lLnJuZC5yZWFsSW5SYW5nZSgwLjI1LCAwLjgpO1xyXG4gICAgdmFyIGFscGhhID0gdGhpcy5nYW1lLnJuZC5yZWFsSW5SYW5nZSgwLjA1LCAwLjE1KTtcclxuXHJcbiAgICB2YXIgcG9rZWJhbGwgPSB0aGlzLnBva2ViYWxscy5nZXRGaXJzdERlYWQoKTtcclxuXHJcbiAgICBwb2tlYmFsbC5yZXZpdmUoKTtcclxuICAgIHBva2ViYWxsLnJlc2V0KFxyXG4gICAgICB0aGlzLmdhbWUucm5kLmJldHdlZW4ocGFkZGluZ3MsIHRoaXMuZ2FtZS53aWR0aCAtIHBhZGRpbmdzKSxcclxuICAgICAgdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKHBhZGRpbmdzLCB0aGlzLmdhbWUuaGVpZ2h0IC0gcGFkZGluZ3MpXHJcbiAgICApO1xyXG5cclxuICAgIHBva2ViYWxsLmFscGhhID0gMDtcclxuICAgIHBva2ViYWxsLnJvdGF0aW9uID0gMDtcclxuICAgIHBva2ViYWxsLnNjYWxlLnNldFRvKHNjYWxlLCBzY2FsZSk7XHJcblxyXG4gICAgdmFyIHRhcmdldFggPSB0aGlzLmdhbWUucm5kLmJldHdlZW4oMTAwLCAzMDApO1xyXG4gICAgdmFyIHRhcmdldFkgPSAwO1xyXG5cclxuICAgIGlmIChwb2tlYmFsbC54ID4gdGhpcy5nYW1lLndpZHRoIC8gMilcclxuICAgICAgdGFyZ2V0WCAqPSAtMTtcclxuXHJcbiAgICB2YXIgYWxwaGFUd2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4ocG9rZWJhbGwpXHJcbiAgICAgIC50byh7YWxwaGE6IGFscGhhfSwgMjUwMCk7XHJcblxyXG4gICAgdmFyIHNwZWVkVHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHBva2ViYWxsKVxyXG4gICAgICAudG8oe3g6IHBva2ViYWxsLnggKyB0YXJnZXRYfSwgNjAwMCk7XHJcblxyXG4gICAgdmFyIHJvdGF0aW9uVHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHBva2ViYWxsKVxyXG4gICAgICAudG8oe3JvdGF0aW9uOiBNYXRoLlBJICogMiAqIHRoaXMuZ2FtZS5ybmQucGljayhbLTEsIDFdKX0sIDYwMDApO1xyXG5cclxuICAgIHZhciBkaWVUd2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4ocG9rZWJhbGwpXHJcbiAgICAgIC50byh7YWxwaGE6IDB9LCAyNTAwKTtcclxuXHJcbiAgICBhbHBoYVR3ZWVuLnN0YXJ0KCk7XHJcbiAgICBzcGVlZFR3ZWVuLnN0YXJ0KCk7XHJcbiAgICByb3RhdGlvblR3ZWVuLnN0YXJ0KCk7XHJcblxyXG4gICAgYWxwaGFUd2Vlbi5jaGFpbihkaWVUd2Vlbi5kZWxheSgxMDAwKSk7XHJcblxyXG4gICAgZGllVHdlZW4ub25Db21wbGV0ZVxyXG4gICAgICAuYWRkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMua2lsbCgpO1xyXG4gICAgICB9LCBwb2tlYmFsbCk7XHJcblxyXG4gICAgLy8gYWxwaGFUd2Vlbi5vbkNvbXBsZXRlLmFkZChmdW5jdGlvbigpIHtcclxuICAgIC8vICAgdGhpcy5raWxsKCk7XHJcbiAgICAvLyB9LCBwb2tlYmFsbCk7XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgfSxcclxufVxyXG4iLCJFbmdpbmUuU2xpZGUgPSBmdW5jdGlvbihnYW1lLCB0ZXh0LCBhbnN3ZXJzKSB7XHJcbiAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICB0aGlzLl9tYXJnaW5Ub3BBbnN3ZXJzID0gNzU7XHJcbiAgdGhpcy5fbGluZVNwYWNpbmdBbnN3ZXJzID0gNjA7XHJcbiAgdGhpcy5fbWFyZ2luVG9wTGFibGUgPSAyMDA7XHJcblxyXG4gIFBoYXNlci5TcHJpdGUuY2FsbCh0aGlzLCBnYW1lLCAwLCAwLCB0aGlzLl9jcmVhdGVCYWNrZ3JvdW5kKCkpO1xyXG5cclxuICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gIHRoaXMuYW5zd2VycyA9IGFuc3dlcnM7XHJcbiAgdGhpcy5hbHBoYSA9IDA7XHJcbiAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcyk7XHJcblxyXG4gIHRoaXMuX2FkZExhYmxlKCk7XHJcbiAgdGhpcy5fYWRkQW5zd2VycygpO1xyXG59XHJcblxyXG5FbmdpbmUuU2xpZGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQaGFzZXIuU3ByaXRlLnByb3RvdHlwZSk7XHJcbkVuZ2luZS5TbGlkZS5jb25zdHJ1Y3RvciA9IEVuZ2luZS5TbGlkZTtcclxuXHJcbkVuZ2luZS5TbGlkZS5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xyXG4gIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcblxyXG4gIHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcykudG8oe1xyXG4gICAgYWxwaGE6IDFcclxuICB9LCA1MCkuc3RhcnQoKTtcclxufVxyXG5cclxuRW5naW5lLlNsaWRlLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIHR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKS50byh7XHJcbiAgICBhbHBoYTogMFxyXG4gIH0sIDUwKS5zdGFydCgpO1xyXG5cclxuICB0d2Vlbi5vbkNvbXBsZXRlLmFkZChmdW5jdGlvbigpIHtcclxuICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgaWYgKHRoaXMuY2FsbGJhY2spIHtcclxuICAgICAgdGhpcy5jYWxsYmFjaygpO1xyXG4gICAgfVxyXG4gIH0sIHRoaXMpO1xyXG5cclxuICByZXR1cm4gdHdlZW4ub25Db21wbGV0ZTtcclxufVxyXG5cclxuRW5naW5lLlNsaWRlLnByb3RvdHlwZS5zZXRDYWxsYmFja0NoZWNrID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbn1cclxuXHJcbkVuZ2luZS5TbGlkZS5wcm90b3R5cGUuX2FkZExhYmxlID0gZnVuY3Rpb24oKSB7XHJcbiAgdGhpcy5fbGFibGUgPSBuZXcgUGhhc2VyLlRleHQodGhpcy5nYW1lLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgdGhpcy5fbWFyZ2luVG9wTGFibGUsIHRoaXMudGV4dCwgRW5naW5lLnRleHRTdHlsZSk7XHJcbiAgdGhpcy5fbGFibGUud29yZFdyYXAgPSB0cnVlO1xyXG4gIHRoaXMuX2xhYmxlLndvcmRXcmFwV2lkdGggPSA2MDA7XHJcbiAgdGhpcy5fbGFibGUuYWxpZ24gPSAnY2VudGVyJztcclxuICB0aGlzLl9sYWJsZS5hbmNob3Iuc2V0VG8oMC41KTtcclxuXHJcbiAgdGhpcy5hZGRDaGlsZCh0aGlzLl9sYWJsZSk7XHJcbn1cclxuXHJcbkVuZ2luZS5TbGlkZS5wcm90b3R5cGUuX2FkZEFuc3dlcnMgPSBmdW5jdGlvbigpIHtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYW5zd2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGFuc3dlciA9IG5ldyBFbmdpbmUuQW5zd2VyKFxyXG4gICAgICB0aGlzLmdhbWUsXHJcbiAgICAgIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLFxyXG4gICAgICB0aGlzLl9sYWJsZS55ICsgdGhpcy5fbWFyZ2luVG9wQW5zd2VycyArIHRoaXMuX2xpbmVTcGFjaW5nQW5zd2VycyAqIGksXHJcbiAgICAgIHRoaXMuYW5zd2Vyc1tpXSxcclxuICAgICAgdGhpcy5oaWRlLFxyXG4gICAgICB0aGlzXHJcbiAgICApO1xyXG5cclxuICAgIGFuc3dlci5hbmNob3Iuc2V0VG8oMC41LCAwKTtcclxuICAgIHRoaXMuYWRkQ2hpbGQoYW5zd2VyKTtcclxuICB9XHJcbn1cclxuXHJcbkVuZ2luZS5TbGlkZS5wcm90b3R5cGUuX2NyZWF0ZUJhY2tncm91bmQgPSBmdW5jdGlvbigpIHtcclxuICB2YXIgYm1wID0gdGhpcy5nYW1lLmFkZC5iaXRtYXBEYXRhKEVuZ2luZS5HQU1FX1dJRFRILCBFbmdpbmUuR0FNRV9IRUlHSFQpO1xyXG5cclxuICBibXAuY3R4LmJlZ2luUGF0aCgpO1xyXG4gIGJtcC5jdHgucmVjdCgwLCAwLCBibXAud2lkdGgsIGJtcC5oZWlnaHQpO1xyXG4gIGJtcC5jdHguZmlsbFN0eWxlID0gJ3JnYmEoMCwgMCwgMCwgMCknO1xyXG4gIGJtcC5jdHguZmlsbCgpO1xyXG5cclxuICByZXR1cm4gYm1wO1xyXG59XHJcbiIsIkVuZ2luZS5DYWxjdWxhdGUgPSBmdW5jdGlvbihnYW1lKSB7fVxyXG5cclxuRW5naW5lLkNhbGN1bGF0ZS5wcm90b3R5cGUgPSB7XHJcbiAgY3JlYXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuX3RpbWVQcm9ncmVzcyA9IDgwMDA7XHJcbiAgICB0aGlzLl9jb3VudFRpY2sgPSA3MztcclxuICAgIHRoaXMuX3Byb2dyZXNzID0gMDtcclxuICAgIHRoaXMuX3Jlc3VsdFBva2Vtb24gPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ3JuZC1wb2tlbW9uJyk7XHJcbiAgICB0aGlzLl9yZXN1bHRQb2tlbW9uLnZpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMuX2Fkc0lzUnVuID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fYWRkQmFja2dyb3VuZCgpO1xyXG4gICAgdGhpcy5fYWRkUm9sbGVyKCk7XHJcbiAgICB0aGlzLl9hZGRJbmZvTGFibGUoKTtcclxuICAgIHRoaXMuX2FkZFByb2dyZXNzTGFibGUoKTtcclxuXHJcbiAgICB0aGlzLl9zdGFydFJvbGwoKTtcclxuICAgIHRoaXMuX3N0YXJ0UHJvZ3Jlc3MoKTtcclxuICB9LFxyXG5cclxuICBfYWRkUm9sbGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciByb2xsU2l6ZSA9IDMwMDtcclxuICAgIHZhciBtYXJnaW5SaWdodCA9IDEwMDtcclxuXHJcbiAgICB0aGlzLl9yb2xscyA9IFtdO1xyXG4gICAgdGhpcy5fcm9sbEdyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKTtcclxuICAgIHRoaXMuX2FjdGl2ZVJvbGxTcHJpdGUgPSAtMTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IEVuZ2luZS5ST0xMX1NMSURFX0NPVU5UOyBpKyspIHtcclxuICAgICAgdmFyIHNwcml0ZSA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAncG9rZW1vblJvbGwnICsgaSk7XHJcblxyXG4gICAgICBzcHJpdGUudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgdGhpcy5fcm9sbEdyb3VwLmFkZChzcHJpdGUpO1xyXG4gICAgICB0aGlzLl9yb2xscy5wdXNoKHNwcml0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fcm9sbEdyb3VwLnggPSBtYXJnaW5SaWdodDtcclxuICAgIHRoaXMuX3JvbGxHcm91cC55ID0gdGhpcy5nYW1lLndvcmxkLmNlbnRlclkgLSByb2xsU2l6ZSAvIDI7XHJcblxyXG4gICAgdGhpcy5fcm9sbEdyb3VwLmFkZCh0aGlzLl9yZXN1bHRQb2tlbW9uKTtcclxuICAgIHRoaXMuX3JvbGxzLnB1c2godGhpcy5fcmVzdWx0UG9rZW1vbik7XHJcbiAgfSxcclxuXHJcbiAgX2FkZEJhY2tncm91bmQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5iZyA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAnY2FsYy1iZycpO1xyXG4gIH0sXHJcblxyXG4gIF9hZGRQcm9ncmVzc0xhYmxlOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciByb2xsU2l6ZSA9IDMwMDtcclxuICAgIHZhciBtYXJnaW5Ub3AgPSA1MDtcclxuXHJcbiAgICB0aGlzLl9wcm9ncmVzc0xhYmxlID0gdGhpcy5hZGQudGV4dChcclxuICAgICAgdGhpcy5fcm9sbEdyb3VwLnggKyByb2xsU2l6ZSAvIDIsXHJcbiAgICAgIHRoaXMuX3JvbGxHcm91cC55ICsgcm9sbFNpemUgKyBtYXJnaW5Ub3AsXHJcbiAgICAgICfQn9GA0L7Qs9GA0LXRgdGBIDAgJScsXHJcbiAgICAgIEVuZ2luZS50ZXh0U3R5bGVcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZS5hbmNob3Iuc2V0VG8oMC41KTtcclxuICB9LFxyXG5cclxuICBfYWRkSW5mb0xhYmxlOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBtYXJpZ25Ub3AgPSAyNTtcclxuXHJcbiAgICB0aGlzLl9pbmZvVGV4dCA9IHRoaXMuYWRkLnRleHQoXHJcbiAgICAgIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLFxyXG4gICAgICBtYXJpZ25Ub3AsXHJcbiAgICAgICfQktGL0YfQuNGB0LvQtdC90LjQtSDRgNC10LfRg9C70YzRgtCw0YLQsC4uLicsXHJcbiAgICAgIEVuZ2luZS50ZXh0U3R5bGVcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5faW5mb1RleHQuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgfSxcclxuXHJcbiAgX3N0YXJ0Um9sbDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLl9hY3RpdmVSb2xsU3ByaXRlID0gMDtcclxuICAgIHRoaXMuX3JvbGxzWzBdLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuX3RpbWVyID0gdGhpcy50aW1lLmNyZWF0ZSgpO1xyXG4gICAgdGhpcy5fdGltZXIubG9vcCg3NSwgdGhpcy5fcm9sbCwgdGhpcyk7XHJcbiAgICB0aGlzLl90aW1lci5zdGFydCgpO1xyXG4gIH0sXHJcblxyXG4gIF9yb2xsOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuX3JvbGxzW3RoaXMuX2FjdGl2ZVJvbGxTcHJpdGVdLnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl9hY3RpdmVSb2xsU3ByaXRlKys7XHJcblxyXG4gICAgaWYgKHRoaXMuX2FjdGl2ZVJvbGxTcHJpdGUgPiBFbmdpbmUuUk9MTF9TTElERV9DT1VOVCAtIDEpIHtcclxuICAgICAgdGhpcy5fYWN0aXZlUm9sbFNwcml0ZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fcm9sbHNbdGhpcy5fYWN0aXZlUm9sbFNwcml0ZV0udmlzaWJsZSA9IHRydWU7XHJcbiAgfSxcclxuXHJcbiAgX3N0YXJ0UHJvZ3Jlc3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5fcHJvZ3Jlc3NUaW1lciA9IHRoaXMudGltZS5jcmVhdGUoKTtcclxuICAgIHRoaXMuX3Byb2dyZXNzVGltZXIucmVwZWF0KFxyXG4gICAgICB0aGlzLl90aW1lUHJvZ3Jlc3MgLyB0aGlzLl9jb3VudFRpY2ssXHJcbiAgICAgIHRoaXMuX2NvdW50VGljayxcclxuICAgICAgdGhpcy5fdXBkYXRlUHJvZ3Jlc3MsXHJcbiAgICAgIHRoaXNcclxuICAgICk7XHJcbiAgICB0aGlzLl9wcm9ncmVzc1RpbWVyLnN0YXJ0KCk7XHJcbiAgICB0aGlzLl9wcm9ncmVzc1RpbWVyLm9uQ29tcGxldGUuYWRkKHRoaXMuX2ZpbmlzaENhbGMsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIF91cGRhdGVQcm9ncmVzczogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLl9wcm9ncmVzcysrO1xyXG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZS50ZXh0ID0gJ9Cf0YDQvtCz0YDQtdGB0YEgJyArIE1hdGguZmxvb3IoKHRoaXMuX3Byb2dyZXNzIC8gdGhpcy5fY291bnRUaWNrKSAqIDEwMCkgKyAnICUnO1xyXG5cclxuICAgIGlmICgodGhpcy5fcHJvZ3Jlc3MgLyB0aGlzLl9jb3VudFRpY2spID4gMC41ICYmICF0aGlzLl9hZHNJc1J1bikge1xyXG4gICAgICB0aGlzLl9hZHNJc1J1biA9IHRydWU7XHJcbiAgICAgIHRoaXMuX2FkZEFkcygpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIF9maW5pc2hDYWxjOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuX3RpbWVyLnN0b3AoKTtcclxuXHJcbiAgICB0aGlzLl9yb2xsc1t0aGlzLl9hY3RpdmVSb2xsU3ByaXRlXS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLl9yZXN1bHRQb2tlbW9uLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuX2luZm9UZXh0LnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICB2YXIgcG9rZW1vbk5hbWUgPSBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoRW5naW5lLlBva2Vtb25EQi5wb2tlbW9uc1tFbmdpbmUucm5kUG9rZW1vbiAtIDFdLmlkZW50aWZpZXIpO1xyXG4gICAgdGhpcy5fcHJvZ3Jlc3NMYWJsZS50ZXh0ID0gJ9CvINC/0L7RhdC+0LYg0L3QsCAnICsgcG9rZW1vbk5hbWU7XHJcblxyXG4gICAgdGhpcy5fYWRkQnRucygpO1xyXG4gIH0sXHJcblxyXG4gIF9hZGRBZHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgVksuc3RhcnRQcmVyb2xsKCk7XHJcblxyXG4gICAgLy8gaWYgKHRoaXMuZ2FtZS5ybmQucGljayhbLTEsIDFdKSA9PT0gMSkge1xyXG4gICAgLy8gICBWSy5zdGFydFByZXJvbGwoKTtcclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgIFZLLnN0YXJ0QWRzKCk7XHJcbiAgICAvLyB9XHJcbiAgfSxcclxuXHJcbiAgX2FkZEJ0bnM6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG1hcmdpbiA9IDUwO1xyXG4gICAgdmFyIGJ0blNoYXJlID0gdGhpcy5fYWRkU2hhcmVCdG4oKTtcclxuICAgIHZhciBidG5SZXBlYXQgPSB0aGlzLl9hZGRSZXBlYXRCdG4oKTtcclxuXHJcbiAgICBidG5TaGFyZS55IC09IG1hcmdpbjtcclxuICAgIGJ0blJlcGVhdC55ICs9IG1hcmdpbjtcclxuICB9LFxyXG5cclxuICBfYWRkU2hhcmVCdG46IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGJ0blNoYXJlID0gdGhpcy5hZGQuYnV0dG9uKFxyXG4gICAgICBFbmdpbmUuR0FNRV9XSURUSCAqIDAuNzUsXHJcbiAgICAgIEVuZ2luZS5HQU1FX0hFSUdIVCAvIDIsXHJcbiAgICAgICdzaGFyZS1idG4nLFxyXG4gICAgICB0aGlzLl9zaGFyZURhdGEsXHJcbiAgICAgIHRoaXNcclxuICAgICk7XHJcblxyXG4gICAgYnRuU2hhcmUuYW5jaG9yLnNldFRvKDAuNSk7XHJcblxyXG4gICAgcmV0dXJuIGJ0blNoYXJlO1xyXG4gIH0sXHJcblxyXG4gIF9hZGRSZXBlYXRCdG46IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGJ0blJlYXBlYXQgPSB0aGlzLmFkZC5idXR0b24oXHJcbiAgICAgIEVuZ2luZS5HQU1FX1dJRFRIICogMC43NSxcclxuICAgICAgRW5naW5lLkdBTUVfSEVJR0hUIC8gMixcclxuICAgICAgJ3JlcGVhdC1idG4nLFxyXG4gICAgICB0aGlzLl9yZXBlYXRHYW1lLFxyXG4gICAgICB0aGlzXHJcbiAgICApO1xyXG5cclxuICAgIGJ0blJlYXBlYXQuYW5jaG9yLnNldFRvKDAuNSk7XHJcblxyXG4gICAgcmV0dXJuIGJ0blJlYXBlYXQ7XHJcbiAgfSxcclxuXHJcbiAgX3NoYXJlRGF0YTogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbWV0cmljVmFsdWUgPSAxO1xyXG4gICAgZ2EoJ3NldCcsICdtZXRyaWM3JywgbWV0cmljVmFsdWUpO1xyXG4gICAgVksucHVibGljYXRlUGhvdG8oRW5naW5lLnJuZFBva2Vtb24pO1xyXG4gIH0sXHJcblxyXG4gIF9yZXBlYXRHYW1lOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBtZXRyaWNWYWx1ZSA9IDE7XHJcbiAgICBnYSgnc2V0JywgJ21ldHJpYzYnLCBtZXRyaWNWYWx1ZSk7XHJcblxyXG4gICAgRW5naW5lLnJuZFBva2Vtb24gPSB0aGlzLmdhbWUucm5kLmJldHdlZW4oMSwgNzIxKTtcclxuICAgIHRoaXMuc3RhdGUuc3RhcnQoJ1ByZWxvYWRlcicpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cmluZykge1xyXG4gICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcclxufVxyXG4iLCIvKipcclxuICogQ3JlYXRlIGltYWdlcyBvZiBwb2tlbW9uXHJcbiAqIEBwYXJhbSB7W3R5cGVdfSBnYW1lIFtkZXNjcmlwdGlvbl1cclxuICovXHJcbkVuZ2luZS5HZW5lcmF0b3IgPSBmdW5jdGlvbihnYW1lKSB7XHJcbiAgdGhpcy5jb3VudGVyID0gMDtcclxuICB0aGlzLl9sYXN0UG9rZW1vbiA9IG51bGw7XHJcbiAgZ2FtZS5wcmVzZXJ2ZURyYXdpbmdCdWZmZXIgPSB0cnVlO1xyXG59XHJcblxyXG5FbmdpbmUuR2VuZXJhdG9yLnByb3RvdHlwZSA9IHtcclxuICBwcmVsb2FkOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMubG9hZC50ZXh0KCdwb2tlbW9uLmNzdicsICdhc3NldHMvZGF0YS9wb2tlbW9uLmNzdicpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdway1iZycsICdhc3NldHMvaW1hZ2VzL2JhY2tncm91bmQvYmctcGsuanBnJyk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gNzIxOyBpKyspIHtcclxuICAgICAgdGhpcy5sb2FkLmltYWdlKCdway0nICsgaSwgJ2Fzc2V0cy9pbWFnZXMvcG9rZW1vbnMvJyArIGkgKyAnLnBuZycpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2luaXRTb2NrZXQoKTtcclxuICB9LFxyXG5cclxuICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgRW5naW5lLlBva2Vtb25EQi5sb2FkKHRoaXMuY2FjaGUuZ2V0VGV4dCgncG9rZW1vbi5jc3YnKSk7XHJcblxyXG4gICAgdGhpcy5fYWRkQkcoKTtcclxuICAgIHRoaXMuX2FkZFdhdGVybWFyaygpO1xyXG4gICAgdGhpcy5fYWRkTGFibGUoKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KHRoaXMuX25leHRQb2tlbW9uLmJpbmQodGhpcyksIDMwMDApO1xyXG4gIH0sXHJcblxyXG4gIF9pbml0U29ja2V0OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc29ja2V0ID0gaW8oJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MScpO1xyXG4gIH0sXHJcblxyXG4gIF9hZGRCRzogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLmJnID0gdGhpcy5hZGQuaW1hZ2UoMCwgMCwgJ3BrLWJnJyk7XHJcbiAgfSxcclxuXHJcbiAgX2FkZFdhdGVybWFyazogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc3R5bGUgPSB7XHJcbiAgICAgIGZpbGw6ICcjYmFiYWJhJyxcclxuICAgICAgZm9udDogJzMwcHggT3BlbiBTYW5zJyxcclxuICAgICAgYWxpZ246ICdjZW50ZXInXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciB3YXRlcm1hcmsgPSB0aGlzLmFkZC50ZXh0KEVuZ2luZS5HQU1FX1dJRFRIIC8gMiwgNTAsIEVuZ2luZS5BUFBfTkFNRSwgc3R5bGUpO1xyXG4gICAgd2F0ZXJtYXJrLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gIH0sXHJcblxyXG4gIF9hZGRMYWJsZTogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc3R5bGUgPSB7XHJcbiAgICAgIGZpbGw6ICcjMzMzMzMzJyxcclxuICAgICAgZm9udDogJzUwcHggT3BlbiBTYW5zJyxcclxuICAgICAgYWxpZ246ICdjZW50ZXInXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubGFibGUgPSB0aGlzLmFkZC50ZXh0KEVuZ2luZS5HQU1FX1dJRFRIIC8gNCwgRW5naW5lLkdBTUVfSEVJR0hUIC8gMiwgJycsIHN0eWxlKTtcclxuICAgIHRoaXMubGFibGUuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgfSxcclxuXHJcbiAgX2NyZWF0ZUJHOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBibWQgPSB0aGlzLmFkZC5iaXRtYXBEYXRhKEVuZ2luZS5HQU1FX1dJRFRILCBFbmdpbmUuR0FNRV9IRUlHSFQpO1xyXG5cclxuICAgIGJtZC5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICBibWQuY3R4LnJlY3QoMCwgMCwgRW5naW5lLkdBTUVfV0lEVEgsIEVuZ2luZS5HQU1FX0hFSUdIVCk7XHJcbiAgICBibWQuY3R4LmZpbGxTdHlsZSA9ICdyZ2IoMjU1LCAyNTUsIDI1NSknO1xyXG4gICAgYm1kLmN0eC5maWxsKCk7XHJcblxyXG4gICAgdGhpcy5jYWNoZS5hZGRCaXRtYXBEYXRhKCdway1iZycsIGJtZCk7XHJcbiAgfSxcclxuXHJcbiAgX25leHRQb2tlbW9uOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuY291bnRlcisrO1xyXG5cclxuICAgIHRoaXMuX2NoYW5nZVBva2Vtb24oKTtcclxuICAgIHRoaXMuX3NhdmUoKTtcclxuXHJcbiAgICBpZiAodGhpcy5jb3VudGVyIDwgNzIxKSB7XHJcbiAgICAgIHNldFRpbWVvdXQodGhpcy5fbmV4dFBva2Vtb24uYmluZCh0aGlzKSwgMzAwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZygnSSBhbSBmaW5pc2ghKSknKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBfY2hhbmdlUG9rZW1vbjogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcG9rZW1vbiA9IHRoaXMuYWRkLnNwcml0ZSh0aGlzLmdhbWUud2lkdGggKiAzIC8gNCwgdGhpcy5nYW1lLmhlaWdodCAvIDIsICdway0nICsgdGhpcy5jb3VudGVyKTtcclxuICAgIHBva2Vtb24uYW5jaG9yLnNldFRvKDAuNSk7XHJcblxyXG4gICAgdmFyIHByZVN0cmluZyA9ICfQryDQv9C+INGF0LDRgNCw0LrRgtC10YDRg1xcclxcbic7XHJcbiAgICB2YXIgcG9rZW1vbk5hbWUgPSBFbmdpbmUuUG9rZW1vbkRCLnBva2Vtb25zW3RoaXMuY291bnRlciAtIDFdLmlkZW50aWZpZXI7XHJcblxyXG4gICAgdGhpcy5sYWJsZS50ZXh0ID0gcHJlU3RyaW5nICsgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHBva2Vtb25OYW1lKTtcclxuICAgIHRoaXMubGFibGUuYWRkRm9udFdlaWdodCgnYm9sZGVyJywgcHJlU3RyaW5nLmxlbmd0aCAtIDIpO1xyXG5cclxuICAgIGlmICh0aGlzLl9sYXN0UG9rZW1vbiAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLl9sYXN0UG9rZW1vbi5raWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fbGFzdFBva2Vtb24gPSBwb2tlbW9uO1xyXG4gIH0sXHJcblxyXG4gIF9zYXZlOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBpbWFnZSA9IHRoaXMuZ2FtZS5jYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xyXG4gICAgdmFyIGlkID0gdGhpcy5jb3VudGVyO1xyXG4gICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgIGJpbjogaW1hZ2UsXHJcbiAgICAgIGlkOiBpZFxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc29ja2V0LmVtaXQoJ2ltZycsIGRhdGEpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cmluZykge1xyXG4gICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcclxufVxyXG4iLCJFbmdpbmUuR0FNRV9XSURUSCA9IDEwMDA7XHJcbkVuZ2luZS5HQU1FX0hFSUdIVCA9IDY0MDtcclxuRW5naW5lLkFQUF9OQU1FID0gJ3ZrLmNvbS9hcHA1NTg3OTg5JztcclxuXHJcbkVuZ2luZS5ERUJVRyA9IGZhbHNlO1xyXG5FbmdpbmUuQURTX0lTX0FDVElWRSA9IGZhbHNlO1xyXG5cclxudmFyIGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoRW5naW5lLkdBTUVfV0lEVEgsIEVuZ2luZS5HQU1FX0hFSUdIVCwgUGhhc2VyLkFVVE8sICdnYW1lJyk7XHJcblxyXG5FbmdpbmUuUk9MTF9TTElERV9DT1VOVCA9IDUwO1xyXG5FbmdpbmUucm5kUG9rZW1vbiA9IGdhbWUucm5kLmJldHdlZW4oMSwgNzIxKTtcclxuXHJcbmdhbWUuc3RhdGUuYWRkKCdCb290JywgRW5naW5lLkJvb3QpO1xyXG5nYW1lLnN0YXRlLmFkZCgnUHJlbG9hZGVyJywgRW5naW5lLlByZWxvYWRlcik7XHJcbmdhbWUuc3RhdGUuYWRkKCdHYW1lJywgRW5naW5lLkdhbWUpO1xyXG5nYW1lLnN0YXRlLmFkZCgnQ2FsY3VsYXRlJywgRW5naW5lLkNhbGN1bGF0ZSk7XHJcblxyXG5nYW1lLnN0YXRlLnN0YXJ0KCdCb290Jyk7XHJcbiIsIkVuZ2luZS5Qb2tlbW9uREIgPSB7XHJcbiAgbG9hZDogZnVuY3Rpb24oZGF0YVRleHQpIHtcclxuICAgIHRoaXMucG9rZW1vbnMgPSBbXTtcclxuICAgIHZhciBkYXRhID0gUGFwYS5wYXJzZShkYXRhVGV4dCkuZGF0YTtcclxuICAgIHZhciBmaWVsZHMgPSBkYXRhWzBdO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgcG9rZW1vbkRhdGEgPSBkYXRhW2ldO1xyXG4gICAgICB2YXIgcG9rZW1vbk9iaiA9IHt9O1xyXG5cclxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBmaWVsZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBwb2tlbW9uT2JqW2ZpZWxkc1tqXV0gPSBwb2tlbW9uRGF0YVtqXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5wb2tlbW9ucy5wdXNoKHBva2Vtb25PYmopO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
