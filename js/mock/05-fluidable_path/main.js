/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var Config, DatGUI, Main, PaperStage, Scene, SimpleEventDispatcher, SoundManager,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	Config = __webpack_require__(11);
	
	SimpleEventDispatcher = __webpack_require__(7);
	
	PaperStage = __webpack_require__(16);
	
	SoundManager = __webpack_require__(17);
	
	Scene = __webpack_require__(87);
	
	DatGUI = __webpack_require__(88);
	
	
	/*
	auth: Kimura
	data: 2016/05/20
	 */
	
	Main = (function() {
	  function Main() {
	    this.onResize = bind(this.onResize, this);
	    this.onUpdate = bind(this.onUpdate, this);
	    this.gotoNextScene = bind(this.gotoNextScene, this);
	    this.dpr = window.devicePixelRatio === void 0 ? 1 : window.devicePixelRatio;
	    this.$window = $(window);
	    $("#Canvas").append('<canvas id="' + Config.Canvas.paper + '">');
	    this.$canvas = $("#" + Config.Canvas.paper);
	    this.canvas = this.$canvas.get(0);
	    this.context = this.canvas.getContext('2d');
	    this.isFirstScene = true;
	    this.paper = new PaperStage(this.$canvas, this.dpr);
	    this.$window.on('resize', this.onResize).trigger('resize');
	    this.scenes = {
	      "Scene": new Scene(this.gotoNextScene)
	    };
	    this.dat = new DatGUI([this.scenes['Scene'].fluid]);
	    this.scenesLen = Object.keys(this.scenes).length;
	    this.sceneIndex = -1;
	    this.gotoNextScene();
	    paper.view.onFrame = this.onUpdate;
	    return;
	  }
	
	  Main.prototype.gotoNextScene = function() {
	    var _i, _key, key, ref, ref1, scene;
	    if (location.hash === "") {
	      this.sceneIndex = Math.floor(Math.random() * this.scenesLen);
	    } else if (location.hash === "#all") {
	      this.sceneIndex += 1;
	      this.sceneIndex %= this.scenesLen;
	    } else if (location.hash !== "") {
	      this.isFirstScene = false;
	      _key = location.hash.replace("#", "");
	      _i = 0;
	      ref = this.scenes;
	      for (key in ref) {
	        scene = ref[key];
	        if (key === _key) {
	          this.sceneIndex = _i;
	          break;
	        }
	        _i += 1;
	      }
	    }
	    _i = 0;
	    ref1 = this.scenes;
	    for (key in ref1) {
	      scene = ref1[key];
	      if (_i === this.sceneIndex) {
	        this.isFirstScene = false;
	        this.currentScene = scene;
	        this.currentScene.start();
	        break;
	      }
	      _i += 1;
	    }
	  };
	
	  Main.prototype.onUpdate = function() {
	    var ref;
	    TWEEN.update();
	    this.paper.update();
	    if ((ref = this.currentScene) != null) {
	      ref.update();
	    }
	    paper.view.update(true);
	  };
	
	  Main.prototype.onResize = function() {
	    this.stageWidth = this.$window.width();
	    this.stageHeight = this.$window.height();
	    this.paper.resize(this.stageWidth, this.stageHeight);
	  };
	
	  return Main;
	
	})();
	
	$(function() {
	  return window.main = new Main();
	});


/***/ },

/***/ 2:
/***/ function(module, exports) {

	var NORMAL, SECRET;
	
	module.exports = {};
	
	module.exports.transformInit = function(object, pivotReset) {
	  var i, len, obj;
	  if (pivotReset == null) {
	    pivotReset = true;
	  }
	  if (object instanceof Array) {
	    for (i = 0, len = object.length; i < len; i++) {
	      obj = object[i];
	      obj.transformContent = false;
	      if (pivotReset) {
	        obj.pivot = new paper.Point(0, 0);
	      }
	    }
	  } else {
	    object.transformContent = false;
	    if (pivotReset) {
	      object.pivot = new paper.Point(0, 0);
	    }
	  }
	};
	
	module.exports.getSvgChild = function(SVG, num) {
	  var path, svg;
	  if (num == null) {
	    num = 0;
	  }
	  svg = paper.project.activeLayer.importSVG(SVG);
	  svg.remove();
	  if (num !== -1) {
	    path = svg.children[num];
	  } else {
	    path = svg.children;
	  }
	  return path;
	};
	
	module.exports.wait = function(time) {
	  var df;
	  df = $.Deferred();
	  setTimeout(df.resolve, time);
	  return df.promise();
	};
	
	module.exports.normRand = function(m, s) {
	  var a, b, c;
	  a = 1 - Math.random();
	  b = 1 - Math.random();
	  c = Math.sqrt(-2 * Math.log(a));
	  if (0.5 - Math.random() > 0) {
	    return c * Math.sin(Math.PI * 2 * b) * s + m;
	  } else {
	    return c * Math.cos(Math.PI * 2 * b) * s + m;
	  }
	};
	
	module.exports.secretMode = false;
	
	NORMAL = "NORMAL";
	
	SECRET = "SECRET";
	
	module.exports.getSE = function(seList) {
	  seList = !module.exports.secretMode ? seList[NORMAL] : seList[SECRET];
	  return seList[Math.floor(Math.random() * seList.length)];
	};
	
	module.exports.getSElist = function(sound) {
	  var num, soundLength;
	  soundLength = Object.keys(sound).length;
	  num = Math.floor(Math.random() * soundLength);
	  return sound["SE_GROUP" + num];
	};
	
	module.exports.ua = (function(u) {
	  return {
	    fb: u.indexOf("fban/fbios;fbav") !== -1,
	    tw: u.indexOf("twitter") !== -1
	  };
	})(window.navigator.userAgent.toLowerCase());


/***/ },

/***/ 7:
/***/ function(module, exports) {

	
	/*
	auth: Kimura
	data: 2016/01/16
	 */
	var SimpleEvent, SimpleEventDispatcher, SimpleEventListener;
	
	SimpleEventDispatcher = (function() {
	  function SimpleEventDispatcher() {
	    this.listeners = {};
	  }
	
	  SimpleEventDispatcher.prototype.addEventListener = function(name, callback, args) {
	    if (args == null) {
	      args = [];
	    }
	    if (this.listeners == null) {
	      this.listeners = {};
	    }
	    if (this.listeners[name] == null) {
	      this.listeners[name] = [];
	    }
	    this.listeners[name].push(new SimpleEventListener(name, callback, args));
	  };
	
	  SimpleEventDispatcher.prototype.removeEventListener = function(name, callback) {
	    var i;
	    if ((this.listeners == null) || (this.listeners[name] == null)) {
	      return;
	    }
	    if (callback === null) {
	      this.listeners[name] = [];
	      return;
	    }
	    while ((i = this.indexOfCallback(name, callback)) >= 0) {
	      this.listeners[name].splice(i, 1);
	    }
	  };
	
	  SimpleEventDispatcher.prototype.dispatchEvent = function(name, data) {
	    var event, j, len, listener, ref;
	    if (data == null) {
	      data = {};
	    }
	    if ((this.listeners == null) || (this.listeners[name] == null)) {
	      return;
	    }
	    event = new SimpleEvent(this, name, data);
	    ref = this.listeners[name];
	    for (j = 0, len = ref.length; j < len; j++) {
	      listener = ref[j];
	      listener.dispatchEvent(event);
	    }
	  };
	
	  SimpleEventDispatcher.prototype.indexOfCallback = function(name, callback) {
	    var i, j, len, listener, ref, ref1;
	    ref1 = (ref = this.listeners) != null ? ref[name] : void 0;
	    for (i = j = 0, len = ref1.length; j < len; i = ++j) {
	      listener = ref1[i];
	      if (listener.callback === callback) {
	        return i;
	      }
	    }
	    return -1;
	  };
	
	  return SimpleEventDispatcher;
	
	})();
	
	SimpleEvent = (function() {
	  function SimpleEvent(target, name, data) {
	    if (data == null) {
	      data = {};
	    }
	    this.target = target;
	    this.name = name;
	    this.data = data;
	    return;
	  }
	
	  return SimpleEvent;
	
	})();
	
	SimpleEventListener = (function() {
	  function SimpleEventListener(name, callback, args) {
	    if (args == null) {
	      args = null;
	    }
	    this.name = name;
	    this.callback = callback;
	    this.args = args;
	    return;
	  }
	
	  SimpleEventListener.prototype.dispatchEvent = function(event) {
	    if (typeof this.callback !== 'function') {
	      return;
	    }
	    if (this.args && this.args.length > 0) {
	      this.callback.apply(null, this.args);
	    } else {
	      this.callback.apply(null, [event]);
	    }
	  };
	
	  return SimpleEventListener;
	
	})();
	
	module.exports = SimpleEventDispatcher;


/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	var Btn, Config, MorphablePath, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	MorphablePath = __webpack_require__(12);
	
	Btn = (function(superClass) {
	  extend(Btn, superClass);
	
	  function Btn(pathes, morph) {
	    var i, len, path;
	    if (morph == null) {
	      morph = 1;
	    }
	    this.up = bind(this.up, this);
	    this.down = bind(this.down, this);
	    this.update = bind(this.update, this);
	    Btn.__super__.constructor.call(this);
	    Utils.transformInit(this);
	    this.morph = morph;
	    this.PressSVG = this.importSVG(Config.SVG.PRESS);
	    this.PressSVG.remove();
	    this.Press = this.PressSVG.children[0];
	    this.baseSVG = this.importSVG(Config.SVG.BASE);
	    this.baseSVG.remove();
	    this.base = this.baseSVG.children[0];
	    this.pullSVG = this.importSVG(Config.SVG.PULL);
	    this.pullSVG.remove();
	    this.pull = this.pullSVG.children[0];
	    this.pathes = [];
	    if (pathes != null) {
	      for (i = 0, len = pathes.length; i < len; i++) {
	        path = pathes[i];
	        this.pathes.push(path);
	      }
	    } else {
	      this.pathes = [this.pull.clone(), this.base.clone(), this.Press.clone()];
	    }
	    this.stroke = new MorphablePath(this.pathes, this.morph);
	    this.stroke.fillColor = new paper.Color(0, 0, 0, 0);
	    this.stroke.strokeColor = Config.COLOR.BTN_PATH;
	    this.stroke.strokeWidth = Config.LINE_WIDTH;
	    this.addChild(this.stroke);
	    this.fill = new MorphablePath(this.pathes, this.morph);
	    this.fill.fillColor = Config.COLOR.BTN_FILL;
	    this.fill.strokeWidth = 0;
	    this.insertChild(0, this.fill);
	    this.pressOffset = 0;
	    this.press = 0;
	    this.pressWeight = 0;
	    this.soft = 0.4;
	    this.init();
	    return;
	  }
	
	  Btn.prototype.init = function() {
	    this._onInit();
	  };
	
	  Btn.prototype.update = function() {
	    var press, y;
	    if (this.press < -1) {
	      this.press = -1;
	    } else if (this.press > 2) {
	      this.press = 2;
	    }
	    press = this.press * 0.75 + this.pressOffset * 0.25;
	    y = press;
	    if (y < 0) {
	      y = 0;
	    } else if (y > 1) {
	      y = 1;
	    }
	    y = y * (1 - this.pressWeight);
	    this.position.y = TWEEN.Easing.Sinusoidal.InOut(y) * 20;
	    if (this.press < 0) {
	      this.morph = this.press + 1;
	      this.stroke.update(this.morph);
	      this.fill.update(this.morph);
	    } else if (this.press > 1) {
	      this.morph = 1 + ((this.press - 1) * this.soft);
	      this.stroke.update(this.morph);
	      this.fill.update(this.morph);
	    }
	    this._onUpdate();
	  };
	
	  Btn.prototype.down = function() {
	    this.downTween = new TWEEN.Tween(this).to({
	      'pressOffset': 1
	    }, 150).easing(TWEEN.Easing.Expo.Out).start();
	    this._onDown();
	  };
	
	  Btn.prototype.up = function() {
	    this.tween = new TWEEN.Tween(this).to({
	      'press': 0,
	      'pressOffset': 0
	    }, 100).onUpdate((function(_this) {
	      return function() {
	        return _this.update();
	      };
	    })(this)).easing(TWEEN.Easing.Back.Out).start();
	    this._onUp();
	  };
	
	  Btn.prototype.reset = function(morph) {
	    if (morph == null) {
	      morph = 1;
	    }
	    this.visible = true;
	    this.morph = morph;
	    this.press = 0;
	    this.pressOffset = 0;
	    this.position.set(0, 0);
	    this.stroke.visible = true;
	    this.stroke.opacity = 1;
	    this.stroke.position.set(0, 0);
	    this.stroke.update(this.morph);
	    this.stroke.strokeColor = Config.COLOR.BTN_PATH;
	    this.fill.visible = true;
	    this.fill.opacity = 1;
	    this.fill.position.set(0, 0);
	    this.fill.update(this.morph);
	    this.fill.fillColor = Config.COLOR.BTN_FILL;
	  };
	
	  Btn.prototype._onInit = function() {};
	
	  Btn.prototype._onUpdate = function() {};
	
	  Btn.prototype._onDown = function() {};
	
	  Btn.prototype._onUp = function() {};
	
	  return Btn;
	
	})(paper.Group);
	
	module.exports = Btn;


/***/ },

/***/ 11:
/***/ function(module, exports) {

	
	/*
	auth: Kimura
	data: 2016/05/20
	 */
	var Config;
	
	Config = {};
	
	Config.KONAMI_COMMAND = '↑ ↑ ↓ ↓ ← → ← → b a';
	
	Config.LINE_WIDTH = 5.5;
	
	Config.BASE_STAGE_WIDTH = 400;
	
	Config.COLOR = {
	  BASE_PATH: 'black',
	  BASE_FILL: '#e2eced',
	  BTN_PATH: 'black',
	  BTN_FILL: '#fdf663',
	  LOGO_TYPE_FILL: 'black'
	};
	
	Config.Canvas = {
	  wrap: "Canvas",
	  paper: "Play"
	};
	
	Config.SoundJson = {
	  'default': '/sound/default.json',
	  'secret': '/sound/secret.json'
	};
	
	Config.SVG = {};
	
	Config.SVG.BASE = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <!-- [0] ボタン --> <path class="st0" d="M-51.1-16l1.2-31.3c0.3-4.8,4.2-8.6,9-8.7c9.7-0.5,20.2-0.5,32.3-0.5s22.7,0,32.3,0.5c4.8,0.1,8.7,3.9,9,8.7L33.9-16"/> <!-- [1] 土台 --> <polyline class="st0" points="-81.1,4 -66.1,4 -61.1,-16 43.9,-16 48.9,4 63.9,4 "/> <!--<path class="st0" d="M-81.1,11.7l15-7.7c0,0-3.5-11.5,5-20s79.1-57.3,105,0c5.4,11.9,5,20,5,20h15"/>--> </svg>';
	
	Config.SVG.PULL = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st2" d="M-51-16l1.2-33.3c0.3-4.8,4.2-8.6,9-8.7c9.7-0.5,20.2-1.5,32.3-1.5s22.7,1,32.3,1.5c4.8,0.1,8.7,3.9,9,8.7L34-16"/> </svg>';
	
	Config.SVG.PRESS = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st3" d="M-53-16l1.2-33.3c0.3-4.8,4.2-8.6,9-8.7c9.7-0.5,22.2,3.5,34.3,3.5s24.7-4,34.3-3.5c4.8,0.1,8.7,3.9,9,8.7L36-16"/> </svg>';
	
	Config.SVG.LOGO_TYPE = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path d="M-29.4,44L-29.4,44c0-6.8,5.3-12.4,12.7-12.4s12.6,5.5,12.6,12.2v0.1c0,6.8-5.3,12.3-12.7,12.3S-29.4,50.7-29.4,44z M-9.4,44L-9.4,44c0-4.3-3.1-7.8-7.4-7.8s-7.4,3.4-7.4,7.6v0.1c0,4.2,3.1,7.7,7.4,7.7C-12.4,51.6-9.4,48.2-9.4,44z"/> <path d="M4.9,32h3.7c0.2,0,0.5,0.1,0.6,0.3l10.9,14.4v-14c0-0.4,0.3-0.8,0.8-0.8h3.7c0.4,0,0.8,0.3,0.8,0.8V55 c0,0.4-0.3,0.8-0.8,0.8h-3.3c-0.2,0-0.5-0.1-0.6-0.3L9.3,40.7v14.4c0,0.4-0.3,0.8-0.8,0.8H4.9c-0.4,0-0.8-0.3-0.8-0.8V32.7 C4.1,32.3,4.5,32,4.9,32z"/> <path d="M-128.3,32.7c0-0.4,0.3-0.8,0.8-0.8h8.1c2.7,0,4.9,0.7,6.2,2.1c1.1,1.1,1.6,2.4,1.6,4v0.2c0,2.8-1.5,4.3-3.2,5.2 c2.5,1,4.2,2.5,4.2,5.7v0.2c0,4.3-3.4,6.5-8.6,6.5h-8.3c-0.4,0-0.8-0.3-0.8-0.8C-128.3,55-128.3,32.7-128.3,32.7z M-116.5,39 c0-1.7-1.2-2.7-3.3-2.7h-3.7v5.4h3.4C-117.9,41.7-116.5,40.8-116.5,39L-116.5,39z M-119.1,45.9h-4.3v5.6h4.4c2.2,0,3.6-1,3.6-2.8 l0,0C-115.4,46.9-116.7,45.9-119.1,45.9z"/> <path d="M-102.7,46.5V32.7c0-0.4,0.3-0.8,0.8-0.8h3.4c0.4,0,0.8,0.3,0.8,0.8v13.8c0,3.4,1.6,5,4.1,5s4.1-1.6,4.1-4.9V32.7 c0-0.4,0.3-0.8,0.8-0.8h3.4c0.4,0,0.8,0.3,0.8,0.8v13.7c0,6.6-3.6,9.7-9.1,9.7C-99.2,56.2-102.7,53-102.7,46.5z"/> <path d="M-70.5,36.5h-5.2c-0.4,0-0.8-0.3-0.8-0.8v-3.1c0-0.4,0.3-0.8,0.8-0.8h15.4c0.4,0,0.8,0.3,0.8,0.8v3.1c0,0.4-0.3,0.8-0.8,0.8 h-5.2V55c0,0.4-0.3,0.8-0.8,0.8h-3.4c-0.4,0-0.8-0.3-0.8-0.8V36.5z"/> <path d="M-46.6,36.5h-5.2c-0.4,0-0.8-0.3-0.8-0.8v-3.1c0-0.4,0.3-0.8,0.8-0.8h15.4c0.4,0,0.8,0.3,0.8,0.8v3.1c0,0.4-0.3,0.8-0.8,0.8 h-5.2V55c0,0.4-0.3,0.8-0.8,0.8h-3.4c-0.4,0-0.8-0.3-0.8-0.8C-46.6,55-46.6,36.5-46.6,36.5z"/> <path d="M48.4,32h3.4c0.4,0,0.8,0.3,0.8,0.8v22.3c0,0.4-0.3,0.8-0.8,0.8h-3.4c-0.4,0-0.8-0.3-0.8-0.8V32.7C47.6,32.3,48,32,48.4,32z "/> <path d="M90.7,44.4v-0.3c0-7.2,4.5-12.1,10.8-12.1c3.2,0,5.4,1.1,7.2,2.7c0.3,0.3,0.3,0.7,0.1,1l-2,2.6c-0.3,0.3-0.8,0.4-1.1,0.1 c-1.3-1.1-2.6-1.8-4.3-1.8c-3.2,0-5.5,3-5.5,7.6v0.1c0,4.7,2.4,7.6,5.6,7.6c1.7,0,3-0.7,4.3-2c0.3-0.3,0.8-0.2,1.1,0.1l2,2.4 c0.3,0.3,0.2,0.7,0,1c-2,1.9-4.2,3.1-7.6,3.1C94.9,56.4,90.7,51.6,90.7,44.4z"/> <path d="M115.7,50.9h3.8c0.4,0,0.8,0.3,0.8,0.8v3.7c0,0.4-0.3,0.8-0.8,0.8h-3.8c-0.4,0-0.8-0.3-0.8-0.8v-3.7 C115,51.2,115.3,50.9,115.7,50.9z"/> <path d="M62.6,32h3.7c0.2,0,0.5,0.1,0.6,0.3l10.9,14.4v-14c0-0.4,0.3-0.8,0.8-0.8h3.7c0.4,0,0.8,0.3,0.8,0.8V55 c0,0.4-0.3,0.8-0.8,0.8h-3.4c-0.2,0-0.5-0.1-0.6-0.3L67,40.7v14.4c0,0.4-0.3,0.8-0.8,0.8h-3.7c-0.4,0-0.8-0.3-0.8-0.8V32.7 C61.9,32.3,62.2,32,62.6,32z"/> </svg>';
	
	Config.Pudding = {};
	
	Config.Pudding.COLOR = {
	  CARAMEL: "#592c00",
	  BASE: "#FDF663"
	};
	
	Config.Pudding.SOUND = {
	  "SE1": {
	    "NORMAL": ["Pudding_0", "Pudding_1", "Pudding_2", "Pudding_3"],
	    "SECRET": ["S_Pudding_0", "S_Pudding_1", "S_Pudding_2", "S_Pudding_4", "S_Pudding_5", "S_Pudding_6"]
	  }
	};
	
	Config.Pudding.SVG = {};
	
	Config.Pudding.SVG.Base = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M-53-16l1.2-33.3c0.2-4.8,4.2-8.4,9-8.7c9.7-0.5,22.2,3.5,34.3,3.5s24.7-4,34.3-3.5c4.8,0.2,8.8,3.8,9,8.7 L36-16"/> <path class="st1" d="M-9-54.8c-13.6,0-28.6-3.9-30.5-3.9c-4.1,0.1-9.8,0.9-11,4.4c-0.4,1.1-0.7,2.2-0.9,3c-0.5,1.8-0.7,2.9-0.7,2.9 l43.1,2c0,0,15.4,0.2,17.3,0.7c1.8,0.6,5.2,3.3,7.5,3.3s5.3-2.3,7.4-3.3c2.1-0.9,11.9-2.7,11.9-2.7s0-3.4-1.2-5.2s-3.7-4.9-8.1-5.1 C23.5-58.8,5.9-54.8-9-54.8z"/> </svg>';
	
	Config.Pudding.SVG.Stretch = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M40.3,0c0,0-3.9-38.1-9.4-49.9c-2.2-4.7-4.4-5.6-9.3-5.9c-9.7-0.5-18.7-0.5-30.8-0.5s-21.2,0-30.8,0.5 c-4.8,0.2-7.1,1.2-9.3,5.9C-54.8-38.1-58.7,0-58.7,0"/> <path class="st1" d="M-9.2-56.3c-12.1,0-21.2,0-30.8,0.5c-4.8,0.2-7.1,1.2-9.3,5.9c-0.4,0.8-0.7,1.7-1.1,2.7c16.7-1.1,42.1,1,42.1,1 s6.4,0,13,1.2c3.5,0.6,6.4,2.8,9.9,2.8s6.4-1.9,9.2-2.7c4.3-1.2,7.7-1.9,7.7-1.9h0.7c-0.4-1.2-0.8-2.3-1.3-3.2 c-2.2-4.7-4.4-5.6-9.3-5.9C11.9-56.3,2.9-56.3-9.2-56.3z"/> </svg>';
	
	Config.Pudding.SVG.Press = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M39.9-0.5c0,0,2.7-36-8.4-46c-3.3-2.9-5.9-3.7-10.5-2.5c-9.4,2.5-18.5,7.2-30.6,7.2s-21.3-4.7-30.6-7.2 c-4.6-1.2-7.2-0.4-10.5,2.5c-11,9.9-8.4,46-8.4,46"/> <path class="st1" d="M-9.6-41.8c-12.1,0-21.3-4.7-30.6-7.2c-4.6-1.2-7.2-0.4-10.5,2.5c-0.6,0.5-1.2,1.2-1.7,1.9 c6.7,3.8,24.9,12.9,44.8,12.9c7.4,0,10.5-0.1,16.5-3.1c6.6-3.3,6.3-0.6,9.7,0c4,0.7,5-3.4,6.8-5.8c2.3-3,3.8-3.7,6.7-4.2 c0.3-0.1,0.6-0.1,0.9-0.2c-0.4-0.5-0.9-1-1.4-1.5c-3.3-2.9-5.9-3.7-10.5-2.5C11.7-46.5,2.5-41.8-9.6-41.8z"/> </svg>';
	
	Config.Pudding.SVG.Pull = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M40,0c0,0-6.8-24.1-9.2-53.4c-0.6-7.2-3.5-10.5-7.9-12.4c-7.6-3.3-20.2-4.5-32.3-4.5s-24.8,1.2-32.3,4.5 c-4.4,1.9-7.3,5.2-7.9,12.4C-52.2-24.1-59,0-59,0"/> <path class="st1" d="M-9.5-70.3c-12.1,0-24.7,1.2-32.3,4.5c-1.4,0.6-2.7,1.4-3.8,2.4c-1.5,1.3-2.6,3-3.3,5.4 c7.1-1.8,20.5-4.1,41.4-4.1c6.7,0,9.3,0.5,14.5,1.7c3.5,0.9,4.9,3.7,8.3,4.4c4.5,0.8,6.4-1.2,9.2-2c1.6-0.4,3-0.3,4.2,0.1 c0.5,0.1,1,0.3,1.4,0.5c-0.6-2.2-1.5-3.8-2.7-5.2c-1.2-1.4-2.8-2.4-4.5-3.1C15.3-69.1,2.6-70.3-9.5-70.3z"/> </svg>';
	
	Config.Pudding.SVG.Drip = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M40.3,0c0,0-3.9-38.1-9.4-49.9c-2.2-4.7-4.4-5.6-9.3-5.9C12-56.3,2.9-56.3-9.2-56.3s-21.2,0-30.8,0.5 c-4.8,0.2-7.1,1.2-9.3,5.9C-54.8-38.1-58.7,0-58.7,0"/> <path class="st1" d="M-9.2-56.3c-12.1,0-21.2,0-30.8,0.5c-4.8,0.2-7.1,1.2-9.3,5.9c-0.4,0.8-0.8,1.8-1.2,2.9 c18.3-0.7,37.8,0.3,42.2,0.3c4.8,0,10.9,0.6,14.5,2.8c4.7,2.8,5.4,13.2,8.9,13.2s3.8-9.8,7.2-13c1.9-1.9,6.4-2.9,9.2-2.9 c0.2,0,0.5,0,0.7,0c-0.4-1.2-0.8-2.3-1.3-3.2c-2.2-4.7-4.4-5.6-9.3-5.9C12-56.3,2.9-56.3-9.2-56.3z"/> </svg>';
	
	Config.Explosion = {};
	
	Config.Explosion.COLOR = {
	  PRESS_FILL: "#FF0300"
	};
	
	Config.Explosion.SOUND = {
	  "SE1": {
	    "NORMAL": ["Explosion_0"],
	    "SECRET": ["S_Explosion_0_1", "S_Explosion_0_2", "S_Explosion_0_3", "S_Explosion_0_4", "S_Explosion_0_5"]
	  },
	  "SE2": {
	    "NORMAL": ["Explosion_1"],
	    "SECRET": ["S_Gohst_0_0", "S_Gohst_0_1", "S_Gohst_0_2", "S_Gohst_0_3"]
	  },
	  "SE3": {
	    "NORMAL": ["Explosion_2"],
	    "SECRET": ["S_Explosion_2_0", "S_Explosion_2_1", "S_Explosion_2_2", "S_Explosion_2_3", "S_Explosion_2_4"]
	  }
	};
	
	Config.Explosion.SVG = {};
	
	Config.Explosion.SVG.Inflated = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M-50.8-16.2c0.3-10.7,0.7-21.4,1-32.1c0.2-4.9,3.7-11.2,8.4-13.9c9.3-5.4,20.3-8.7,33.1-8.7c12.8,0,23.8,3.3,33.1,8.7c4.6,2.7,8.2,8.9,8.4,13.9c0.4,10.7,0.7,21.4,1,32.1"/> </svg>';
	
	Config.Explosion.SVG.ExplosionBefore = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <style type="text/css"> .st0{fill:#FDF663;stroke:#231815;stroke-width:5.5;stroke-linejoin:miter;stroke-miterlimit:10;} </style> <path class="st0" d="M-12.1-32l-15,6l-3-12l-21.1,5.5c0,0-0.4,10.9-0.5,16.3h50.8C-4-20.7-12.1-32-12.1-32z"/> <path class="st0" d="M34.4-46.4C29.8-44,20-40.2,20-40.2s10.2,8.5,15,13.1C34.8-33.5,34.6-40,34.4-46.4z"/> <path class="st0" d="M-48-56.8c0,0-2.5,5.4-2.6,7.9c-0.2,5.3-0.5,15.8-0.5,15.8l19.8-4.4C-31.3-37.8-48-56.8-48-56.8z"/> <path class="st0" d="M-12.5-32.3c0,0-6.9-11.2-8.6-13.7c-1.6-2.5-6.8-7.1-6.8-7.1L-31-37.9l4,11L-12.5-32.3z"/> <path class="st0" d="M-11.1-40.7l6.4-5.1L6.4-58.4l-0.2-13c0,0-9.3-1.5-14.3-1.5c-2.1,0-6.1,0.3-6.1,0.3l3.1,12.6l-7-4l-2.1,16.9l3.1,4.7L-11.1-40.7z"/> <polygon class="st0" points="13.3,-49.5 11.3,-45.5 6.4,-57.5 -11.7,-40.2 -17.6,-42.1 -9.7,-30.6 17.3,-40.5 "/> <path class="st0" d="M25.7-33.9C25.4-34.6,16-40,16-40l-27,10c0,0,6.1,8.3,9.1,12.8h8.6C6.7-17.2,25.4-34.6,25.7-33.9z"/> <path class="st0" d="M27.6-33.7L9.4-17.9h25.7c0,0-0.2-6.4-0.3-9.7C32.5-29.8,27.6-33.7,27.6-33.7z"/> <path class="st0" d="M34.1-46.2c0,0-0.1-2.1-0.1-3.2c-0.2-4.9-3.7-11.2-8.4-13.9c-0.1-0.1-0.3-0.1-0.4-0.2c-3.3,3.7-9.3,12-9.3,12v3.6l2.6,7.9c0,0,0.7,0,1,0C24.1-42.7,34.1-46.2,34.1-46.2z"/> <path class="st0" d="M18.4-53.6c0,0,3-7,6.3-10.7c-5.5-3.1-18.4-7-18.4-7l0.7,14L12.2-46l2-4l3.4,2.1L18.4-53.6z"/> <path class="st0" d="M-41.1-64.2c-2.3,1.3-4.3,3.5-5.8,6C-42.9-50.8-30-39-30-39s2.5-17.4,3-19c0.8,1.5,5.4,7.3,6.9,10.8l0.1,0.1l2-16.9l7,4l-3.2-12.6C-14.1-72.7-28.4-71.5-41.1-64.2z"/> <path class="st0" d="M28.8-53.1"/> </svg>';
	
	Config.Explosion.SVG.ExplosionBaseBefore = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <style type="text/css"> .st0{fill:#E2ECED;stroke:#231815;stroke-width:5.5;stroke-miterlimit:10;} .st1{fill:none;stroke:#231815;stroke-width:5.5;stroke-miterlimit:10;} </style> <polyline class="st0" points="-40.7,4 -38.1,-2.4 -28.1,-4.5 -43.1,-8.4 -33.1,-16 -60.7,-16 -65.7,4 "/> <path class="st0" d="M-12.3,4l4.7-9.5l8.5-2.7L2.2-16h-34.8c0,0.2-10,7.6-10,7.6l11,3l-6,3L-40.1,4"/> <polyline class="st0" points="18.4,4 21.4,-7.4 26.4,-12.4 14.4,-16 2.7,-16 0.4,-8.4 -7.8,-5.5 -12.3,4 "/> <path class="st0" d="M49.4,4l-5-20H19c1,1.2,7.1,3.6,7.1,3.6l-4,5L19.1,4"/> <polyline class="st1" points="44.4,-15.8 49.4,4.2 64.4,4.2 "/> <polyline class="st1" points="-80.6,4.2 -65.6,4.2 -60.6,-15.8 "/> </svg>';
	
	Config.Jump = {};
	
	Config.Jump.SOUND = {
	  "SE1": {
	    "NORMAL": ["Jump_0_0", "Jump_0_1"],
	    "SECRET": ["S_Jump_0_0", "S_Jump_0_1"]
	  },
	  "SE2": {
	    "NORMAL": ["Jump_1_0", "Jump_1_1", "Jump_1_2"],
	    "SECRET": ["S_Jump_1_1"]
	  },
	  "SE3": {
	    "NORMAL": ["Jump_2_0", "Jump_2_1", "Jump_2_2"],
	    "SECRET": ["S_Jump_2_0", "S_Jump_2_1", "S_Jump_2_2", "S_Jump_2_3", "S_Jump_2_4"]
	  }
	};
	
	Config.Jump.SVG = {};
	
	Config.Jump.SVG.BasePress = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <polyline class="st0" points="-83.1,4 -68.1,4 -61.1,-14 43.9,-14 50.9,4 65.9,4 "/> </svg>';
	
	Config.Delivery = {};
	
	Config.Delivery.COLOR = {
	  BOX_FILL: "#E6DBC3",
	  BOX_PATH: "#231815",
	  TAPE_FILL: "#BF9C73"
	};
	
	Config.Delivery.SOUND = {
	  "SE1": {
	    "NORMAL": ["Delivery_0_0"],
	    "SECRET": ["S_Delivery_0_0", "S_Delivery_0_1"]
	  },
	  "SE2": {
	    "NORMAL": ["Delivery_1_0"],
	    "SECRET": ["S_Delivery_1_0", "S_Delivery_1_1", "S_Delivery_1_2", "S_Delivery_1_3"]
	  }
	};
	
	Config.Delivery.SVG = {};
	
	Config.Delivery.SVG.Box1_1 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <polyline class="st0" points="69.1,18.6 69.1,-102 -9.2,-102.2 -9.2,-135.9 48.5,-136.1 69.5,-103.2 "/> <polyline class="st0" points="-87.8,-103.2 -66.8,-136.1 -9.2,-135.9 -9.2,-102.2 -87.5,-102.1 -87.5,18.6 "/> <polygon class="st0" points="69,18.5 69,-102.2 -87.7,-102.2 -87.7,18.6 "/> <polygon class="st1" points="6.9,-74.2 2.9,-70.2 -1.1,-74.2 -5.1,-70.2 -9.1,-74.2 -13.1,-70.2 -17.1,-74.2 -21.1,-70.2 -25.1,-74.2 -25.1,-102.2 6.9,-102.2 "/> <polygon class="st1" points="-25.1,-9.4 -21.1,-13.4 -17.1,-9.4 -13.1,-13.4 -9.1,-9.4 -5.1,-13.4 -1.1,-9.4 2.9,-13.4 6.9,-9.4 6.9,18.6 -25.1,18.6 "/> <polygon class="st1" points="2.5,-135.5 -9,-135.5 -9.3,-135.5 -20.9,-135.5 -25.2,-102.5 -9.3,-102.5 -9,-102.5 6.8,-102.5 "/> </svg>';
	
	Config.Delivery.SVG.Box2_1 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <polygon class="st0" points="56.5,-122.2 47,-135.8 -66.2,-135.8 -74.3,-122.2 "/> <polyline class="st0" points="-88.2,-102.5 -75.2,-123.2 56.5,-123.2 68.3,-103.5 "/> <polyline class="st0" points="69.1,18.6 69.1,-102 -9.1,-102.2 -9.1,-135.9 48.5,-136.1 69.5,-103.2 "/> <polyline class="st0" points="-87.8,-103.2 -66.8,-136.1 -9.2,-135.9 -9.2,-102.2 -87.5,-102.1 -87.5,18.6 "/> <polygon class="st0" points="69,18.5 69,-102.2 -87.6,-102.2 -87.6,18.6 "/> <polygon class="st1" points="7.1,-74.2 3.1,-70.2 -0.9,-74.2 -4.9,-70.2 -8.9,-74.2 -12.9,-70.2 -16.9,-74.2 -20.9,-70.2 -24.9,-74.2 -24.9,-102.2 7.1,-102.2 "/> <polygon class="st1" points="-24.9,-9.4 -20.9,-13.4 -16.9,-9.4 -12.9,-13.4 -8.9,-9.4 -4.9,-13.4 -0.9,-9.4 3.1,-13.4 7.1,-9.4 7.1,18.6 -24.9,18.6 "/> </svg>';
	
	Config.Delivery.SVG.Box2_2 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <polygon class="st0" points="55.8,-122.2 46.3,-135.8 -66.9,-135.8 -75,-122.2 "/> <polyline class="st0" points="-88,-102.5 -75,-123.2 56.6,-123.2 68.5,-103.5 "/> <polyline class="st0" points="69.1,18.6 69.1,-102 -9.1,-102.2 -9.1,-135.9 48.5,-136.1 69.5,-103.2 "/> <polyline class="st0" points="-87.9,-103.2 -66.9,-136.1 -67.4,-180.2 -87.9,-180.2 -87.6,-102.1 -87.6,18.6 "/> <polygon class="st0" points="68.9,18.5 68.9,-102.2 -87.8,-102.2 -87.8,18.6 "/> <polygon class="st1" points="7,-74.2 3,-70.2 -1,-74.2 -5,-70.2 -9,-74.2 -13,-70.2 -17,-74.2 -21,-70.2 -25,-74.2 -25,-102.2 7,-102.2 "/> <polygon class="st1" points="-25,-9.4 -21,-13.4 -17,-9.4 -13,-13.4 -9,-9.4 -5,-13.4 -1,-9.4 3,-13.4 7,-9.4 7,18.6 -25,18.6 "/> </svg>';
	
	Config.Delivery.SVG.Box2_3 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <polygon class="st0" points="55.8,-122.2 46.3,-135.8 -66.9,-135.8 -75,-122.2 "/> <polyline class="st0" points="-88,-102.5 -75,-123.2 56.6,-123.2 68.5,-103.5 "/> <polyline class="st0" points="69,18.6 69,-102 69.4,-179.7 48.4,-179.7 48.4,-136.1 69.4,-103.2 "/> <polyline class="st0" points="-87.9,-103.2 -66.9,-136.1 -67.4,-180.2 -87.9,-180.2 -87.6,-102.1 -87.6,18.6 "/> <polygon class="st0" points="68.9,18.5 68.9,-102.2 -87.8,-102.2 -87.8,18.6 "/> <polygon class="st1" points="7,-74.2 3,-70.2 -1,-74.2 -5,-70.2 -9,-74.2 -13,-70.2 -17,-74.2 -21,-70.2 -25,-74.2 -25,-102.2 7,-102.2 "/> <polygon class="st1" points="-25,-9.4 -21,-13.4 -17,-9.4 -13,-13.4 -9,-9.4 -5,-13.4 -1,-9.4 3,-13.4 7,-9.4 7,18.6 -25,18.6 "/> </svg>';
	
	Config.Delivery.SVG.Box3_1 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <polygon class="st0" points="55.8,-122.2 46.3,-135.8 -66.9,-135.8 -75,-122.2 "/> <polyline class="st0" points="69,18.6 69,-102 69.4,-179.7 48.4,-179.7 48.4,-136.1 69.4,-103.2 "/> <polyline class="st0" points="-87.9,-103.2 -66.9,-136.1 -67.4,-180.2 -87.9,-180.2 -87.6,-102.1 -87.6,18.6 "/> <polygon class="st0" points="68.9,18.5 68.9,-102.2 -87.8,-102.2 -87.8,18.6 "/> <polygon class="st1" points="7,-74.2 3,-70.2 -1,-74.2 -5,-70.2 -9,-74.2 -13,-70.2 -17,-74.2 -21,-70.2 -25,-74.2 -25,-102.2 7,-102.2 "/> <polygon class="st1" points="-25,-9.4 -21,-13.4 -17,-9.4 -13,-13.4 -9,-9.4 -5,-13.4 -1,-9.4 3,-13.4 7,-9.4 7,18.6 -25,18.6 "/> <polyline class="st0" points="68.5,-103.5 56.6,-123.2 -75,-123.2 -88,-102.5 "/> <line class="st2" x1="-87.3" y1="-101.5" x2="68.7" y2="-101.5"/> </svg>';
	
	Config.Delivery.SVG.Box3_2 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <polygon class="st0" points="47.3,-179.7 46.3,-135.8 -67,-135.8 -67.5,-179.7 "/> <polyline class="st0" points="69,18.6 69,-102 68.6,-178.7 48.3,-179.7 48.3,-136.1 69.3,-103.2 "/> <polyline class="st0" points="-88,-103.2 -67,-136.1 -67.4,-180.2 -88,-180.2 -87.6,-102.1 -87.6,18.6 "/> <polygon class="st0" points="68.8,18.5 68.8,-102.2 -87.8,-102.2 -87.8,18.6 "/> <polygon class="st1" points="7,-74.2 3,-70.2 -1,-74.2 -5,-70.2 -9,-74.2 -13,-70.2 -17,-74.2 -21,-70.2 -25,-74.2 -25,-102.2 7,-102.2 "/> <polygon class="st1" points="-25,-9.4 -21,-13.4 -17,-9.4 -13,-13.4 -9,-9.4 -5,-13.4 -1,-9.4 3,-13.4 7,-9.4 7,18.6 -25,18.6 "/> <polyline class="st0" points="68.6,-103.5 68.6,-180.2 -87.4,-180.2 -87.4,-102.5 "/> <line class="st2" x1="-87.3" y1="-101.5" x2="68.7" y2="-101.5"/> </svg>';
	
	Config.Delivery.SVG.Box4_1 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M-51.7-15.7l1.2-31.3c0.2-4.8,4.2-8.4,9-8.7c9.7-0.5,20.2-0.5,32.3-0.5s22.7,0,32.3,0.5c4.8,0.2,8.8,3.8,9,8.7 l1.2,31.3"/> <path class="st1" d="M-51.7-15.7l1.2-31.3c0.2-4.8,4.2-8.4,9-8.7c9.7-0.5,20.2-0.5,32.3-0.5s22.7,0,32.3,0.5c4.8,0.2,8.8,3.8,9,8.7 l1.2,31.3"/> <polyline class="st2" points="-67.4,6 -61.7,-16.7 43.3,-16.7 49,6 "/> <polyline class="st3" points="-81.7,4.3 -66.7,4.3 -61.7,-15.7 43.3,-15.7 48.3,4.3 63.3,4.3 "/> <polygon class="st4" points="69.3,18.5 69.3,-102.2 -87.3,-102.2 -87.3,18.6 "/> <polygon class="st5" points="6.8,-74.2 2.8,-70.2 -1.2,-74.2 -5.2,-70.2 -9.2,-74.2 -13.2,-70.2 -17.2,-74.2 -21.2,-70.2 -25.2,-74.2 -25.2,-102.2 6.8,-102.2 "/> <polygon class="st5" points="-25.2,-9.4 -21.2,-13.4 -17.2,-9.4 -13.2,-13.4 -9.2,-9.4 -5.2,-13.4 -1.2,-9.4 2.8,-13.4 6.8,-9.4 6.8,18.6 -25.2,18.6 "/> <polyline class="st4" points="69.2,-103 69.2,-179.7 -87.4,-180.2 -87.4,-102.5 "/> <line class="st3" x1="-87.5" y1="-101.5" x2="68.5" y2="-101.5"/> <line class="st3" x1="68.6" y1="18.5" x2="68.6" y2="-179.7"/> <line class="st3" x1="-88" y1="18.5" x2="-88" y2="-179.7"/> </svg>';
	
	Config.Delivery.SVG.Box4_2 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M-51-15.9l1.2-31.3c0.2-4.8,4.2-8.4,9-8.7c9.7-0.5,20.2-0.5,32.3-0.5s22.7,0,32.3,0.5c4.8,0.2,8.8,3.8,9,8.7 L34-15.9"/> <path class="st1" d="M-51-15.9l1.2-31.3c0.2-4.8,4.2-8.4,9-8.7c9.7-0.5,20.2-0.5,32.3-0.5s22.7,0,32.3,0.5c4.8,0.2,8.8,3.8,9,8.7 L34-15.9"/> <polyline class="st2" points="-66.7,6.8 -61,-15.9 44,-15.9 49.7,6.8 "/> <polyline class="st3" points="-81,4.1 -66,4.1 -61,-15.9 44,-15.9 49,4.1 64,4.1 "/> <polygon class="st4" points="68.6,18.6 111.3,18.5 -124.5,18.5 -88.1,18.6 "/> <polygon class="st5" points="13.9,18.6 8.2,18.6 3.2,18.6 -2.4,18.6 -7.6,18.6 -13,18.6 -18.4,18.6 -23.6,18.6 -29.1,18.6 -30.7,18.5 17.5,18.5 "/> <polygon class="st5" points="-26.6,18.6 -22.3,18.6 -17.9,18.6 -13.6,18.6 -9.3,18.6 -4.8,18.6 -0.6,18.6 4,18.6 8.1,18.6 6.2,18.6 -25.8,18.6 "/> <polyline class="st4" points="111.3,18.5 138.8,18.5 -148.9,18.5 -124.9,18.5 "/> <line class="st3" x1="-124.5" y1="18.5" x2="110.2" y2="18.5"/> <line class="st3" x1="67.3" y1="18.5" x2="165.5" y2="18.5"/> <line class="st3" x1="-83.3" y1="18.5" x2="-181.5" y2="18.5"/> </svg>';
	
	Config.PatrolLamp = {};
	
	Config.PatrolLamp.COLOR = {
	  BTN: "#FF0000",
	  LIGHT: "#FF6400",
	  PATH: "#231815"
	};
	
	Config.PatrolLamp.SOUND = {
	  "SE1": {
	    "NORMAL": ["PatrolRamp_0_0"],
	    "SECRET": ["PatrolRamp_0_0"]
	  },
	  "SE2": {
	    "NORMAL": ["PatrolRamp_1_0"],
	    "SECRET": ["S_PatrolRamp_1_0", "S_PatrolRamp_1_1", "S_PatrolRamp_1_2", "S_PatrolRamp_1_3", "S_PatrolRamp_1_4"]
	  }
	};
	
	Config.PatrolLamp.SVG = {};
	
	Config.PatrolLamp.SVG.Lamp = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <style type="text/css"> .st0{fill:#DC0000;stroke:#DC0000;stroke-width:4;stroke-miterlimit:10;} </style> <path class="st0" d="M0.1-2.8l-0.3-31.9c0-3.8-0.9-6.7-1.9-6.9C-4.1-42-6.3-42-8.9-42s-4.8,0-6.9,0.4c-1,0.2-1.9,3-1.9,6.9L-18-2.8"/> </svg>';
	
	Config.PatrolLamp.SVG.Light1 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <polygon class="st0" points="-47.4,-44.9 30.8,-21.7 29.9,-44.9 -47.9,-21.8 "/> </svg>';
	
	Config.PatrolLamp.SVG.Light2 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <polygon class="st0" points="30.3,-44.9 -47.9,-21.7 -47,-44.9 30.8,-21.8 "/> </svg>';
	
	Config.PatrolLamp.SVG.TireLeft = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <style type="text/css"> .st0{fill:#666666;stroke:#231815;stroke-width:5.5;stroke-miterlimit:10;} .st1{fill:#FFFFFF;stroke:#000000;stroke-width:4;stroke-miterlimit:10;} .st2{fill:#999999;} </style> <circle class="st0" cx="-48.7" cy="13.9" r="15.9"/> <circle class="st1" cx="-48.7" cy="13.9" r="5.1"/> <path class="st2" d="M-47.5,24.2c-0.2-0.9,0.3-1.8,1.2-2l0,0c0.9-0.2,1.8,0.3,2,1.2l0,0c0.2,0.9-0.4,1.8-1.2,2l0,0c0,0,0,0,0,0l0,0c-0.1,0-0.3,0-0.4,0l0,0C-46.7,25.5-47.4,25-47.5,24.2z M-55.6,23.2c-0.7-0.6-0.8-1.6-0.3-2.3l0,0c0.6-0.7,1.6-0.8,2.3-0.3l0,0c0.7,0.6,0.8,1.6,0.3,2.3l0,0c-0.3,0.4-0.8,0.6-1.3,0.6l0,0C-54.9,23.5-55.3,23.4-55.6,23.2z M-39.7,19.8c-0.8-0.4-1.2-1.4-0.8-2.2l0,0c0.4-0.8,1.4-1.2,2.2-0.8l0,0c0.8,0.4,1.2,1.4,0.8,2.2l0,0c-0.3,0.6-0.9,0.9-1.5,0.9l0,0C-39.3,19.9-39.5,19.9-39.7,19.8z M-60.1,13.9C-60.1,13.9-60.1,13.9-60.1,13.9L-60.1,13.9L-60.1,13.9L-60.1,13.9c0-1,0.7-1.7,1.7-1.7l0,0c0.9,0,1.7,0.7,1.7,1.6l0,0c0,0,0,0,0,0l0,0c0,0,0,0,0,0l0,0c0,0.9-0.7,1.6-1.6,1.6l0,0C-59.4,15.6-60.1,14.8-60.1,13.9z M-40.5,10.1c-0.4-0.8-0.1-1.8,0.8-2.2l0,0c0.8-0.4,1.8-0.1,2.2,0.8l0,0c0.4,0.8,0.1,1.8-0.8,2.2l0,0c-0.2,0.1-0.5,0.2-0.7,0.2l0,0C-39.6,11.1-40.2,10.7-40.5,10.1z M-55.9,6.9c-0.6-0.7-0.5-1.7,0.3-2.3l0,0c0.7-0.6,1.7-0.5,2.3,0.3l0,0c0.6,0.7,0.5,1.7-0.3,2.3l0,0c-0.3,0.2-0.7,0.4-1,0.4l0,0C-55.1,7.5-55.6,7.3-55.9,6.9z M-46.3,5.5L-46.3,5.5c-0.9-0.2-1.4-1.1-1.2-2l0,0c0.2-0.9,1.1-1.4,2-1.2l0,0l0,0l0,0c0.9,0.2,1.5,1.1,1.2,2l0,0C-44.5,5-45.2,5.6-46,5.6l0,0C-46.1,5.6-46.2,5.5-46.3,5.5z"/> </svg>';
	
	Config.PatrolLamp.SVG.TireRight = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <style type="text/css"> .st0{fill:#666666;stroke:#231815;stroke-width:5.5;stroke-miterlimit:10;} .st1{fill:#FFFFFF;stroke:#000000;stroke-width:4;stroke-miterlimit:10;} .st2{fill:#999999;} </style> <circle class="st0" cx="32.6" cy="13.9" r="15.9"/> <circle class="st1" cx="32.6" cy="13.9" r="5.1"/> <path class="st2" d="M33.8,24.2c-0.2-0.9,0.3-1.8,1.2-2l0,0c0.9-0.2,1.8,0.3,2,1.2l0,0c0.2,0.9-0.4,1.8-1.2,2l0,0c0,0,0,0,0,0l0,0c-0.1,0-0.2,0-0.4,0l0,0C34.6,25.5,34,25,33.8,24.2z M25.7,23.2c-0.7-0.6-0.8-1.6-0.3-2.3l0,0c0.6-0.7,1.6-0.8,2.3-0.3v0c0.7,0.6,0.8,1.6,0.3,2.3l0,0c-0.3,0.4-0.8,0.6-1.3,0.6l0,0C26.4,23.5,26,23.4,25.7,23.2z M41.6,19.8c-0.8-0.4-1.2-1.4-0.8-2.2h0c0.4-0.8,1.4-1.2,2.2-0.8l0,0c0.8,0.4,1.2,1.4,0.8,2.2l0,0l0,0l0,0c-0.3,0.6-0.9,0.9-1.5,0.9l0,0C42.1,19.9,41.8,19.9,41.6,19.8z M21.2,13.9C21.2,13.9,21.2,13.9,21.2,13.9L21.2,13.9L21.2,13.9L21.2,13.9c0-1,0.7-1.7,1.7-1.7l0,0c0.9,0,1.6,0.7,1.6,1.6l0,0v0l0,0c0,0,0,0,0,0l0,0c0,0.9-0.7,1.6-1.6,1.6l0,0h0l0,0C22,15.6,21.2,14.8,21.2,13.9z M40.8,10.1L40.8,10.1c-0.4-0.8-0.1-1.8,0.8-2.2l0,0c0.8-0.4,1.8-0.1,2.2,0.8l0,0c0.4,0.8,0.1,1.8-0.8,2.2l0,0c-0.2,0.1-0.5,0.2-0.7,0.2l0,0C41.7,11.1,41.1,10.7,40.8,10.1z M25.4,6.9c-0.6-0.7-0.5-1.7,0.3-2.3l0,0C26.4,4,27.4,4.1,28,4.9l0,0c0.6,0.7,0.5,1.7-0.3,2.3l0,0c-0.3,0.2-0.7,0.4-1,0.4l0,0C26.2,7.5,25.7,7.3,25.4,6.9z M35,5.5L35,5.5c-0.9-0.2-1.4-1.1-1.2-2l0,0c0.2-0.9,1.1-1.4,2-1.2l0,0l0,0l0,0c0.9,0.2,1.5,1.1,1.2,2l0,0c-0.2,0.8-0.8,1.3-1.6,1.3l0,0C35.2,5.6,35.1,5.5,35,5.5z"/> </svg>';
	
	Config.PatrolLamp.SVG.Alert = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <style type="text/css"> .st0{fill:none;stroke:#231815;stroke-miterlimit:10;} </style> <polyline class="st0" points="-81.6,-52 -110.1,-66.8 -138.7,-81.7 "/> <polyline class="st0" points="57.9,-52 86.5,-66.8 115,-81.7 "/> <polyline class="st0" points="-83.1,-19.4 -110.9,-7.2 -138.7,5 "/> <polyline class="st0" points="59.5,-19.4 87.3,-7.2 115,5 "/> </svg>';
	
	Config.Squash = {};
	
	Config.Squash.SOUND = {
	  "SE1": {
	    "NORMAL": ["Squash_0_0", "Squash_0_1"],
	    "SECRET": ["S_Squash_0_0", "S_Squash_0_1"]
	  },
	  "SE2": {
	    "NORMAL": ["Squash_1_0", "Squash_1_1", "Squash_1_2"],
	    "SECRET": ["S_Squash_1_0", "S_Squash_1_1", "S_Squash_1_2", "S_Squash_1_3", "S_Squash_1_4", "S_Squash_1_5"]
	  }
	};
	
	Config.Squash.SVG = {};
	
	Config.Squash.SVG.Press = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <style type="text/css"> .st0{fill:none;stroke:#231815;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:none;stroke:#231815;stroke-miterlimit:10;} </style> <path class="st0" d="M-44.2-29.1c-7.9-3.9-13.5-6.6-16.4-14.1s-0.9-20.3,9.9-23C-31.6-71-26.3-50.7-9.6-49.4 c19.2,1.5,26.5-10.2,34.9-14.3c10.7-5.2,19.8-0.2,19.8,12.3s-11.2,20.2-19.8,23"/> </svg>';
	
	Config.Squash.SVG.Before = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M-82.1,57.8c-4,4.6-10.2,5.2-12.8,0.8c-2.8-4.6,1.8-10.3,4.2-11.8c3.4-2.3,27.6-11.2,18.8-27.9 c-2-3.7-7.4-9.6-18.9-4.4c-5.5,2.5-8.8-1.7-9.6-4.6c-0.8-3,1.4-8.7,6-8.8C-78.7,0.8-78-5.6-78.3-9.7c-1.3-19.8,5.6-24.2,2-31.2 c-1.9-3.6-39.6-25.5-48.9-29.7s-12-14.2-6.2-20.1s14.9-3.7,19.8,2.9c4.8,6.6,42.2,41.9,54.7,21.5c5.3-8.6-0.6-16.2-7-23.8 c-1.8-2.1-1.1-5.3,0.5-6.5c1.6-1.2,4.7-2.1,6.5,1.1c3,5.5,10,21.7,20.8,8.2c6-7.5,5.9-15.3,0.2-22.1c-5.2-6.1-2.4-15.3,4.1-16.6 c5.6-1.1,12.6,6.4,10.4,14.7c-3.6,12.8,9.7,19.2,15,15.9C11.4-106,9.4-134.5,9.1-141.6c-0.3-7.6,5.2-10.5,8.3-10.1 c3,0.4,8.9,3.8,6.5,11.7c-1.3,4.4-12.7,32.1-0.1,48.4c1.2,1.5,3.4,4.8,7.5,4c3.6-0.8,6.5-5.6,7.3-9.9c0.6-3.4,4.2-5.5,6.6-4.4 c2,1,5.3,4.6,1.7,8.9c-3.4,4-6.2,8-3.8,11.6c1.2,1.9,3.5,4.4,7.1,5.5c19.5,6.2,53.5-30.2,59.3-38.4c4.1-5.9,11.8-12.6,17.8-5.5 c6,7-4,14.5-9.2,17.8c-5,3.2-55.5,44.1-48.1,50.2c3.2,2.7,13.4-3.2,15.6-5c1.7-1.4,5-1.2,5.9,0.6c1.2,2.5,0.2,5.3-2.4,5.7 c-3.5,0.7-16.1,7.8-14.3,12.6c2.9,7.9,2.7,4.6,3.4,16.3c0.4,6.9,4.4,14.4,22.7,11.2c4.5-0.8,10.3,1.6,9.6,7.7 c-0.8,6.6-6.8,7-11.3,5.9C83-0.7,77.6,2.9,73.9,7.2c-3,3.4-8,12.7,13.1,15.3c7.2,0.9,10.4,6.5,8.5,10.6c-3,6.5-11.6,2.6-15.4-0.1 c-13.5-9.5-17.4-0.3-20.7,2.3C36.2,52.7,72.6,84.3,78,88.7c3.6,2.9,10.6,12.1,4.1,17.9c-5.8,5.2-13.2-2.7-15.7-8.8 c-2-5.2-26-48.6-42.2-38.2c-3.5,2.3-9.8,6.1-17.1,4.8c-9.8-1.7-12.2,8-11.1,15.8c0.7,4.8-2.5,13.6-9.7,13s-8.2-10.6-6.2-15 c3.7-8.2,3.7-17.4-5.8-19c-16.9-2.8-44.3,50.4-47.5,58c-3.7,8.7-11.6,13.1-16.3,9.2c-5.5-4.6-1.4-13.7,2.2-17.1 c14.8-14,43.3-57,34.8-65.2C-64.6,32.4-79.2,54.5-82.1,57.8z"/> <path class="st0" d="M-71.3-106.7c-0.7,0.9-1.6,1.5-2.6,1.7c-1.1,0.1-2.1,0-3-0.7c-0.9-0.7-1.5-1.6-1.7-2.6c-0.1-1.1,0-2.1,0.7-3 c0.7-0.9,1.6-1.5,2.6-1.7c1.1-0.1,2.1,0,3,0.7c0.9,0.7,1.5,1.6,1.7,2.6C-70.5-108.7-70.6-107.6-71.3-106.7z"/> <path class="st0" d="M-40-139.8c-0.8,1.1-1.8,1.7-2.9,1.9c-1.1,0.2-2.4,0-3.4-0.8c-1.1-0.8-1.7-1.8-1.9-2.9 c-0.2-1.1,0.1-2.4,0.8-3.4c0.8-1.1,1.8-1.7,2.9-1.9c1.1-0.2,2.4,0,3.4,0.8c1.1,0.8,1.7,1.8,1.9,2.9S-39.3-140.7-40-139.8z"/> <path class="st0" d="M42.9-144.7c0.8-1.1,1.9-1.9,3.2-2.1c1.3-0.2,2.6,0.1,3.8,0.8c1.1,0.8,1.9,1.9,2.1,3.2c0.2,1.3-0.1,2.6-0.8,3.8 c-0.8,1.1-1.9,1.9-3.2,2.1c-1.3,0.2-2.6-0.1-3.8-0.8c-1.1-0.8-1.9-1.9-2.1-3.2C41.8-142.2,42.1-143.5,42.9-144.7z"/> <path class="st0" d="M120.6-58.1c-0.9,1.3-2.2,2-3.6,2.2c-1.4,0.2-2.9-0.1-4.1-0.9c-1.3-0.9-2-2.2-2.2-3.6c-0.2-1.4,0.1-2.9,0.9-4.1 c0.9-1.3,2.2-2,3.6-2.2c1.4-0.2,2.9,0.1,4.1,0.9c1.3,0.9,2,2.2,2.2,3.6C121.8-60.8,121.5-59.3,120.6-58.1z"/> <path class="st0" d="M102.3,58.7c0.6-0.9,1.5-1.4,2.5-1.6c0.9-0.1,1.9,0,2.8,0.7c0.9,0.6,1.3,1.5,1.6,2.5c0.2,1,0,2-0.7,2.8 c-0.6,0.9-1.5,1.4-2.5,1.6c-0.9,0.1-2,0-2.8-0.7c-0.9-0.6-1.3-1.5-1.6-2.5C101.5,60.6,101.7,59.6,102.3,58.7z"/> <path class="st0" d="M18.9,95.5c-0.8,1.2-2.1,1.9-3.4,2.1c-1.2,0.2-2.7,0-3.9-0.9c-1.2-0.8-1.9-2.1-2.1-3.4c-0.2-1.3,0-2.8,0.9-3.9 c0.8-1.2,2.1-1.9,3.4-2.1c1.2-0.2,2.8,0,3.9,0.9c1.2,0.8,1.9,2.1,2.1,3.4C20,93,19.8,94.4,18.9,95.5z"/> <path class="st0" d="M-112.1,70.1c-0.8,1.1-1.9,1.9-3.2,2.1c-1.3,0.2-2.6-0.1-3.8-0.8c-1.1-0.8-1.9-1.9-2.1-3.2 c-0.2-1.3,0.1-2.6,0.8-3.8c0.8-1.1,2-1.9,3.2-2.1c1.3-0.2,2.6,0.1,3.8,0.8c1.1,0.8,1.9,2,2.1,3.2C-111,67.5-111.3,68.8-112.1,70.1z" /> <path class="st0" d="M-119.8,0.6c-0.7,1-1.8,1.7-2.9,1.9s-2.4,0-3.4-0.8c-1-0.7-1.7-1.8-1.9-2.9s0-2.4,0.8-3.4 c0.7-1,1.8-1.7,2.9-1.9s2.4,0,3.4,0.8c1,0.7,1.7,1.8,1.9,2.9S-119-0.5-119.8,0.6z"/> </svg>';
	
	Config.Squash.SVG.Halfway = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M-85.3,60.7c-4,4.6-10.2,5.2-12.8,0.8c-2.8-4.6,1.8-10.3,4.2-11.8c3.4-2.3,30.4-14,21.5-30.7 c-2-3.7-12-8.9-23.6-3.7c-5.5,2.5-8.8-1.7-9.6-4.6c-0.8-3,1.4-8.7,6-8.8c15.9-0.3,21.2-7.4,20.9-11.5c-1.3-19.8,5.6-24.2,2-31.2 c-1.9-3.6-43.1-28-52.4-32.2c-9.2-4.2-12-14.2-6.2-20.1s14.9-3.7,19.8,2.9c4.8,6.6,45.7,44.5,58.2,24c5.3-8.6-2.4-19-8.8-26.6 c-1.8-2.1-1.1-5.3,0.5-6.5s4.7-2.1,6.5,1.1c3,5.5,11.8,24.5,22.6,11c6-7.5,5.4-18.4-0.3-25.2c-5.2-6.1-2.4-15.3,4.1-16.6 c5.6-1.1,12.6,6.4,10.4,14.7C-25.9-101.5-12.1-92-6.7-95.2C11-105.9,9.3-137.6,9-144.7c-0.3-7.6,5.2-10.5,8.3-10.1 c3,0.4,8.9,3.8,6.5,11.7c-1.3,4.4-13.1,35.3-0.5,51.5c1.2,1.5,3.4,4.8,7.5,4c3.6-0.8,6.9-6.8,7.7-11.1c0.6-3.4,4.2-5.5,6.6-4.4 c2,1,5.3,4.6,1.7,8.9c-3.4,4-6.5,9.1-4.1,12.7c1.2,1.9,3.5,4.4,7.1,5.5c19.5,6.2,59.1-35.8,64.9-44c4.1-5.9,11.8-12.6,17.8-5.5 c6,7-4,14.5-9.2,17.8c-5,3.2-61.1,49.7-53.8,55.8c3.2,2.7,16.3-5.1,18.5-6.9c1.7-1.4,5-1.2,5.9,0.6c1.2,2.5,0.2,5.3-2.4,5.7 c-3.5,0.7-18.9,9.7-17.1,14.6c2.9,7.9,2.7,4.6,3.4,16.3c0.4,6.9,7.4,14.6,25.7,11.3c4.5-0.8,10.3,1.6,9.6,7.7 c-0.8,6.6-6.8,7-11.3,5.9C85.6-0.6,78.2,3.6,74.4,7.9c-3,3.4-5.6,13.1,15.4,15.7c7.2,0.9,10.4,6.5,8.5,10.6 c-3,6.5-11.6,2.6-15.4-0.1c-13.5-9.5-20.7-1.4-24,1.2C35.8,52.8,75,88,80.5,92.3c3.6,2.9,10.6,12.1,4.1,17.9 c-5.8,5.2-13.2-2.7-15.7-8.8c-2-5.2-28.9-52.2-45.1-41.8c-3.5,2.3-9.8,6.1-17.1,4.8C-3,62.7-6.2,76.3-5.1,84 c0.7,4.8-2.5,13.6-9.7,13S-23,86.4-21,82c3.7-8.2,4.4-21.3-5.1-22.9c-16.9-2.8-46.7,54-49.9,61.6c-3.7,8.7-11.6,13.1-16.3,9.2 c-5.5-4.6-1.4-13.7,2.2-17.1c14.8-14,45.7-60.6,37.2-68.7C-65.1,32.4-82.4,57.4-85.3,60.7z"/> <path class="st0" d="M-70.6-105.9c-0.9,1.2-2.1,2-3.5,2.2s-2.8,0-4-0.9s-2-2.1-2.2-3.5s0-2.8,0.9-4s2.1-2,3.5-2.2s2.8,0,4,0.9 s2,2.1,2.2,3.5S-69.8-107.1-70.6-105.9z"/> <path class="st0" d="M-39.2-138.8c-1,1.4-2.4,2.2-3.9,2.5s-3.2,0-4.5-1c-1.4-1-2.2-2.4-2.5-3.9s0.1-3.2,1-4.5c1-1.4,2.4-2.2,3.9-2.5 s3.2,0,4.5,1c1.4,1,2.2,2.4,2.5,3.9S-38.3-140.2-39.2-138.8z"/> <path class="st0" d="M41.1-145.6c1.1-1.5,2.6-2.5,4.3-2.8s3.5,0.1,5,1.1c1.5,1.1,2.5,2.6,2.8,4.3s-0.1,3.5-1.1,5 c-1.1,1.5-2.6,2.5-4.3,2.8s-3.5-0.1-5-1.1c-1.5-1.1-2.5-2.6-2.8-4.3S40-144.1,41.1-145.6z"/> <path class="st0" d="M121.7-56.9c-1.2,1.7-2.9,2.7-4.8,3s-3.9-0.1-5.5-1.2c-1.7-1.2-2.7-2.9-3-4.8c-0.3-1.9,0.1-3.9,1.2-5.5 c1.2-1.7,2.9-2.7,4.8-3s3.9,0.1,5.5,1.2c1.7,1.2,2.7,2.9,3,4.8C123.2-60.6,122.9-58.6,121.7-56.9z"/> <path class="st0" d="M100.8,58c0.8-1.2,2-1.8,3.3-2.1c1.2-0.1,2.5,0,3.8,0.9c1.2,0.8,1.8,2,2.1,3.3c0.2,1.2,0,2.7-0.9,3.8 c-0.8,1.2-2,1.8-3.3,2.1c-1.2,0.2-2.7,0-3.8-0.9c-1.2-0.8-1.8-2-2.1-3.3C99.8,60.4,99.9,59,100.8,58z"/> <path class="st0" d="M19.9,96.5c-1.1,1.7-2.9,2.5-4.5,2.9c-1.8,0.3-3.6,0-5.2-1.2c-1.7-1-2.5-2.9-2.8-4.5c-0.3-1.8,0-3.8,1.2-5.2 c1-1.7,2.8-2.5,4.5-2.9c1.7-0.3,3.8,0,5.3,1.2c1.6,1,2.6,2.9,2.8,4.5C21.4,93.1,21,95,19.9,96.5z"/> <path class="st0" d="M-111.2,71c-1.1,1.5-2.6,2.5-4.3,2.8c-1.7,0.3-3.5-0.1-5-1.1c-1.5-1.1-2.5-2.6-2.8-4.3c-0.3-1.7,0.1-3.5,1.1-5 c1.1-1.5,2.7-2.5,4.3-2.8c1.7-0.3,3.5,0.1,5,1.1c1.5,1.1,2.5,2.6,2.8,4.3C-109.7,67.7-110.1,69.5-111.2,71z"/> <path class="st0" d="M-118.9,1.5c-0.9,1.3-2.4,2.2-3.9,2.5s-3.2,0-4.5-1.1c-1.4-0.9-2.2-2.4-2.6-3.9c-0.3-1.5,0-3.2,1.1-4.5 c0.9-1.4,2.4-2.2,3.9-2.5c1.5-0.3,3.2,0,4.5,1c1.4,0.9,2.2,2.4,2.5,3.9C-117.6-1.6-118,0.1-118.9,1.5z"/> </svg>';
	
	Config.Squash.SVG.After = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M-85.8,68.9c-4,4.6-10.2-1.6-12.8-6c-2.8-4.6,2.3-11.6,4.6-13.2c3.4-2.3,29-6.8,20.2-23.5 c-2-3.7-10.7-15.2-22.2-10c-5.5,2.5-8.8-2.6-9.6-5.5c-0.8-3,1.4-8.7,6-8.8c15.9-0.3,21.2-0.7,20.9-4.7c-1.3-19.8,5.6-19.7,2-26.7 c-1.9-3.6-42.7-37.2-52.4-43.5c-8.5-5.5-12-14.2-6.2-20.1s14.9-3.7,19.8,2.9c8.8,12.1,41.7,62.2,58.2,35.3 c5.3-8.6-2.4-30.2-8.8-37.9c-1.8-2.1-1.1-5.3,0.5-6.5s4.7-2.1,6.5,1.1c3,5.5,11.8,29,22.6,15.5c6-7.5,5.4-22.9-0.3-29.7 c-5.2-6.1-2.4-15.3,4.1-16.6c5.6-1.1,12.6,6.4,10.4,14.7c-3.6,12.8,10.2,26.8,15.6,23.6C11-101.3,9.3-137.4,9-144.5 c-0.3-7.6,5.2-10.5,8.3-10.1c3,0.4,8.9,3.8,6.5,11.7c-1.3,4.4-13.1,39.8-0.5,56c1.2,1.5,3.4,4.8,7.5,4c3.6-0.8,6.9-11.3,7.7-15.6 c0.6-3.4,4.2-5.5,6.6-4.4c2,1,5,3.4,1.7,8.9c-2.7,4.5-5.2,13.1-4.1,17.2c0.7,2.8,3.5,11.1,7.1,12.3c19.5,6.2,59.5-46.2,64.8-54.7 c3.8-6.1,11-13.3,17.4-6.6c6.4,6.7-3.1,14.7-8.1,18.4c-4.8,3.5-61.7,56.4-54.4,62.5c3.2,2.7,16.1-10.1,17.8-12.4 c2.2-3,5.5-2.1,6.9-0.7c2,1.9,1,5.5-1.3,6.8C89.7-49.5,73.4-37.9,74.3-31c1.2,8.3,2.6,6.6,3.4,16.3c0.5,6.9,7.4,7.8,25.7,4.6 c4.5-0.8,10.3,1.6,9.6,7.7c-0.8,6.6-6.8,8.4-11.3,7.3C85.6,1,75.5,9.3,74.4,14.8c-1,5.1,0.1,6.9,15.4,9c7.2,1,10.5,8,8.5,13.7 c-2.4,6.7-8.6,9.7-15.4,5.4c-14-8.8-20.7-0.5-24,2.1C35.8,62.4,75.4,87.7,80.5,92.5c9.5,9.1,11.4,18.6,4.3,22.4 c-6,3.2-13.3-3.8-15.9-11.5C65.5,93.6,40,63.3,23.8,73.7C20.3,76,14,79.8,6.7,78.5C-3,76.8-5.9,79.1-5.1,86.9c0.8,7-2.5,13.6-9.7,13 s-9.3-8.7-6.2-15c4.1-8,0.2-11.5-6.8-12.8c-16.8-3.3-42.9,45.4-46.1,53c-3.7,8.7-13.1,12.9-18.4,6.8c-4.8-5.4-3-13.7,2.2-18.9 c14.6-14.8,43.9-49.3,35.4-57.5C-66.9,43.8-82.9,65.7-85.8,68.9z"/> <path class="st0" d="M-70.6-105.7c-0.9,1.2-2.1,2-3.5,2.2s-2.8,0-4-0.9s-2-2.1-2.2-3.5s0-2.8,0.9-4s2.1-2,3.5-2.2s2.8,0,4,0.9 s2,2.1,2.2,3.5C-69.5-108.3-69.8-106.9-70.6-105.7z"/> <path class="st0" d="M-39.2-137.3c-1,1.4-2.4,2.2-3.9,2.5s-3.2,0-4.5-1c-1.4-1-2.2-2.7-2.5-4.6c-0.3-1.9,0.1-3.8,1-5.2 c1-1.4,2.4-2.2,3.9-2.5s3.2,0,4.5,1c1.4,1,2.2,2.7,2.5,4.6C-37.9-140.6-38.3-138.7-39.2-137.3z"/> <path class="st0" d="M41.1-145.4c1.1-1.5,2.6-2.5,4.3-2.8s3.5,0.1,5,1.1c1.5,1.1,2.5,3.3,2.8,5.7s-0.1,4.9-1.1,6.4 c-1.1,1.5-2.6,2.5-4.3,2.8s-3.5-0.1-5-1.1c-1.5-1.1-2.5-3.3-2.8-5.7S40-143.9,41.1-145.4z"/> <path class="st0" d="M121.7-54.9c-1.2,1.7-2.9,2.7-4.8,3s-3.9-0.1-5.5-1.2c-1.7-1.2-2.7-3.4-3-5.7s0.1-4.8,1.2-6.4 c1.2-1.7,2.9-2.7,4.8-3s3.9,0.1,5.5,1.2c1.7,1.2,2.7,3.4,3,5.7S122.9-56.6,121.7-54.9z"/> <path class="st0" d="M100.8,57.4c0.8-1.2,2-1.8,3.3-2.1c1.2-0.1,2.5,0,3.8,0.9c1.2,0.8,1.8,2.1,2.1,3.6c0.1,1.5,0,3-0.9,4.1 c-0.8,1.2-2,1.8-3.3,2.1c-1.2,0.2-2.7,0-3.8-0.9c-1.2-0.8-1.8-2.1-2.1-3.6C99.6,59.9,99.9,58.6,100.8,57.4z"/> <path class="st0" d="M19.9,99c-1.1,1.6-2.9,2.5-4.5,2.8c-1.7,0.3-3.6,0-5.2-1.2c-1.7-1-2.5-3.5-2.8-5.8c-0.3-2.4,0-5.1,1.2-6.6 c1-1.6,2.8-2.5,4.5-2.8c1.8-0.3,3.8,0,5.3,1.2c1.6,1,2.6,3.5,2.8,5.8C21.4,94.8,21,97.5,19.9,99z"/> <path class="st0" d="M-111.2,72.5c-1.1,1.5-2.6,2.5-4.3,2.8s-3.5-0.1-5-1.1c-1.5-1.1-2.5-3-2.8-5s0.1-4.2,1.1-5.7 c1.1-1.5,2.7-2.5,4.3-2.8c1.7-0.3,3.5,0.1,5,1.1c1.5,1.1,2.5,3,2.8,5C-109.7,68.9-110.1,71-111.2,72.5z"/> <path class="st0" d="M-118.9,1.6c-0.9,1.4-2.4,2.2-3.9,2.6c-1.5,0.3-3.2,0-4.5-1.1c-1.4-0.9-2.2-2.4-2.6-3.9c-0.3-1.5,0-3.1,1.1-4.5 c0.9-1.3,2.4-2.2,3.9-2.6s3.2,0,4.5,1c1.4,0.9,2.2,2.4,2.5,3.9S-118,0.3-118.9,1.6z"/> </svg>';
	
	Config.Escape = {};
	
	Config.Escape.SOUND = {
	  "SE_GROUP0": {
	    "SE1": {
	      "NORMAL": ["Escape_0_0_0", "Escape_0_0_1", "Escape_0_0_2", "Escape_0_0_3", "Escape_0_0_4"],
	      "SECRET": ["S_Escape_0_0_0", "S_Escape_0_0_1", "S_Escape_0_0_2", "S_Escape_0_0_3"]
	    },
	    "SE2": {
	      "NORMAL": ["Escape_0_1_0"],
	      "SECRET": ["S_Escape_0_1_0", "S_Escape_0_1_1"]
	    },
	    "SE3": {
	      "NORMAL": ["Escape_0_2_0"],
	      "SECRET": ["S_Escape_0_2_0", "S_Escape_0_2_1"]
	    }
	  },
	  "SE_GROUP1": {
	    "SE1": {
	      "NORMAL": ["Escape_1_0_0", "Escape_1_0_1", "Escape_1_0_2", "Escape_1_0_3", "Escape_1_0_4"],
	      "SECRET": ["S_Escape_1_0_0", "S_Escape_1_0_1", "S_Escape_1_0_2", "S_Escape_1_0_3"]
	    },
	    "SE2": {
	      "NORMAL": ["Escape_1_1_0"],
	      "SECRET": ["S_Escape_1_1_0", "S_Escape_1_1_1"]
	    },
	    "SE3": {
	      "NORMAL": ["Escape_1_2_0"],
	      "SECRET": ["S_Escape_1_2_0", "S_Escape_1_2_1"]
	    }
	  }
	};
	
	Config.Escape.SVG = {};
	
	Config.Escape.SVG.Right = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <!-- [0] ボタン --> <path d="M-46.3-14.6c0,0,2.6-4.3,2.1-12.4c-0.4-7-2.5-15.4,3.9-19.2c3.2-1.8,17.6-4.2,32.1-6.1c15.1-2,30.1-3.5,32.6-3.6c10-0.3,15.4,11.3,13.3,31.6C36.6-12.4,24.4-8.9,24.4-8.9"/> <!-- [1] 土台 --> <path class="st0" d="M-76.3,4.1H-61l5.8-18.9L48.3-21V4.9H63"/> </svg>';
	
	Config.Escape.SVG.Left = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <!-- [0] ボタン --> <path class="st0" d="M-41.2-8.9c0,0-15.1-5-13.5-23.7c0.7-8.1,1-24.2,14.1-23.5c13.5,0.8,26.5,3.2,31.7,3.9S16-49,24.8-45.7c6.4,2.4,2.6,15.7,2.9,21.8c0.3,8.8,3.1,14.9,3.1,14.9"/> <!-- [1] 土台 --> <path class="st0" d="M-80.2,4.1h15.1V-21l104.3,6.2L45,4.1h15.4"/> </svg>';
	
	Config.Ghost = {};
	
	Config.Ghost.SVG = {};
	
	Config.Ghost.COLOR = {
	  FILL: "#FFFFFF",
	  STROKE: "#000000",
	  BG: "#000000"
	};
	
	Config.Ghost.SOUND = {
	  "SE1": {
	    "NORMAL": ["Gohst_0_0"],
	    "SECRET": ["S_Gohst_0_0", "S_Gohst_0_1", "S_Gohst_0_2", "S_Gohst_0_3"]
	  },
	  "SE2": {
	    "NORMAL": ["Gohst_1_0", "Gohst_1_1"],
	    "SECRET": ["S_Gohst_1_0", "S_Gohst_1_1", "S_Gohst_1_2", "S_Gohst_1_3", "S_Gohst_1_4"]
	  }
	};
	
	Config.Ghost.SVG.Eye = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <style type="text/css"> .st0{fill:#FFFFFF;stroke:#000000;stroke-width:4;stroke-miterlimit:10;} .st1{stroke:#000000;stroke-width:5.6368;stroke-miterlimit:10;} </style> <path class="st0" d="M9.1-42c0,2.8-1.1,5.2-2.9,7.1C4.4-33.2,1.9-32-0.9-32s-5.2-1.1-7.1-2.9c-1.8-1.8-2.9-4.3-2.9-7.1 s1.1-5.2,2.9-7.1S-3.6-52-0.9-52s5.2,1.1,7.1,2.9S9.1-44.8,9.1-42z"/> <path class="st0" d="M-21.3-42c0,2.8-1.1,5.2-2.9,7.1c-1.8,1.8-4.3,2.9-7.1,2.9s-5.2-1.1-7.1-2.9c-1.8-1.8-2.9-4.3-2.9-7.1 s1.1-5.2,2.9-7.1S-34-52-31.2-52s5.2,1.1,7.1,2.9C-22.4-47.3-21.3-44.8-21.3-42z"/> <path class="st1" d="M-33-42.8c0,0.6-0.2,1.2-0.7,1.6c-0.4,0.4-1,0.7-1.6,0.7s-1.2-0.2-1.6-0.7c-0.4-0.4-0.7-1-0.7-1.6 s0.2-1.2,0.7-1.6c0.4-0.4,1-0.7,1.6-0.7s1.2,0.2,1.6,0.7C-33.2-43.9-33-43.4-33-42.8z"/> <path class="st1" d="M-2.8-42.8c0,0.6-0.2,1.2-0.7,1.6s-1,0.7-1.6,0.7s-1.2-0.2-1.6-0.7c-0.4-0.4-0.7-1-0.7-1.6s0.2-1.2,0.7-1.6 c0.4-0.4,1-0.7,1.6-0.7s1.2,0.2,1.6,0.7C-3.1-43.9-2.8-43.4-2.8-42.8z"/> </svg>';
	
	Config.Ghost.SVG.Ghost1 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M32.5,76.7c-46.3,0-84.4-35.9-84.4-89.9c0-41.3,17.1-68.7,51-68.7c24.8,0,46.5,21.4,43.3,53.7 C38.7,10.9,32.6,43.3,53,43.3c10.3,0,13.7-6.2,24.8-6.2c9,0,16.6,8,13.6,12.9c-3.4,5.5-10.1-2.5-19,6.6 C65.6,63.5,53.2,76.7,32.5,76.7z"/> <path class="st1" d="M11.6,5.6c0,0-9.3,9-12.8,20.4C-3,32-2.1,36.1,0.9,37.7c3.9,2.2,8-1,12.4-5.4c4-4,5.7-5.6,10.5-8"/> <path class="st1" d="M-45.9,4.7c0,0-9.3,9-12.8,20.4c-1.8,6-0.9,10.1,2.1,11.7c3.9,2.2,8-1,12.4-5.4c4-4,5.7-5.6,10.5-8"/> <path class="st2" d="M-0.9-52c2.8,0,5.3,1.1,7.1,2.9C8-47.3,9.1-44.8,9.1-42S8-36.7,6.2-34.9C4.4-33.1,1.9-32-0.9-32 s-5.3-1.1-7.1-2.9c-1.8-1.8-2.9-4.3-2.9-7.1s1.1-5.3,2.9-7.1C-6.2-50.9-3.7-52-0.9-52z"/> <path class="st2" d="M-31.2-52c2.8,0,5.3,1.1,7.1,2.9c1.8,1.8,2.9,4.3,2.9,7.1s-1.1,5.3-2.9,7.1s-4.3,2.9-7.1,2.9s-5.3-1.1-7.1-2.9 c-1.8-1.8-2.9-4.3-2.9-7.1s1.1-5.3,2.9-7.1C-36.5-50.9-34-52-31.2-52z"/> <path class="st3" d="M-35.2-44.9c0.6,0,1.2,0.2,1.6,0.6c0.4,0.4,0.6,0.9,0.6,1.6s-0.2,1.2-0.6,1.6c-0.4,0.4-0.9,0.6-1.6,0.6 s-1.2-0.2-1.6-0.6c-0.4-0.4-0.6-0.9-0.6-1.6s0.2-1.2,0.6-1.6S-35.8-44.9-35.2-44.9z"/> <path class="st3" d="M-5-44.9c0.6,0,1.2,0.2,1.6,0.6c0.4,0.4,0.6,0.9,0.6,1.6s-0.2,1.2-0.6,1.6c-0.4,0.4-0.9,0.6-1.6,0.6 s-1.2-0.2-1.6-0.6C-7-41.5-7.2-42-7.2-42.7s0.2-1.2,0.6-1.6S-5.6-44.9-5-44.9z"/> </svg>';
	
	Config.Ghost.SVG.Ghost2 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M32.8,76.7c-46.3,0-84.4-35.9-84.4-89.9c0-41.3,17.1-68.7,51-68.7c24.8,0,46.5,21.4,43.3,53.7 C39,10.9,35.1,38.7,52.8,48.9c8.2,4.7,14.4,5.2,24.9,1.6c9.1-3.1,13.4,3.4,10.8,8.5c-2.6,5.2-9.2,9.2-19.4,12.7 C59.6,75.1,51.9,76.7,32.8,76.7z"/> <path class="st1" d="M11.8,5.6c0,0-9.3,9-12.8,20.4c-1.8,6-0.9,10.1,2.1,11.7c3.9,2.2,8-1,12.4-5.4c4-4,5.7-5.6,10.5-8"/> <path class="st1" d="M-45.7,4.7c0,0-9.3,9-12.8,20.4c-1.8,6-0.9,10.1,2.1,11.7c3.9,2.2,8-1,12.4-5.4c4-4,5.7-5.6,10.5-8"/> <path class="st2" d="M-0.9-52c2.8,0,5.3,1.1,7.1,2.9C8-47.3,9.1-44.8,9.1-42S8-36.7,6.2-34.9C4.4-33.1,1.9-32-0.9-32 s-5.3-1.1-7.1-2.9c-1.8-1.8-2.9-4.3-2.9-7.1s1.1-5.3,2.9-7.1C-6.2-50.9-3.7-52-0.9-52z"/> <path class="st2" d="M-31.2-52c2.8,0,5.3,1.1,7.1,2.9c1.8,1.8,2.9,4.3,2.9,7.1s-1.1,5.3-2.9,7.1s-4.3,2.9-7.1,2.9s-5.3-1.1-7.1-2.9 c-1.8-1.8-2.9-4.3-2.9-7.1s1.1-5.3,2.9-7.1C-36.5-50.9-34-52-31.2-52z"/> <path class="st3" d="M-35.2-44.9c0.6,0,1.2,0.2,1.6,0.6c0.4,0.4,0.6,0.9,0.6,1.6s-0.2,1.2-0.6,1.6c-0.4,0.4-0.9,0.6-1.6,0.6 s-1.2-0.2-1.6-0.6c-0.4-0.4-0.6-0.9-0.6-1.6s0.2-1.2,0.6-1.6S-35.8-44.9-35.2-44.9z"/> <path class="st3" d="M-5-44.9c0.6,0,1.2,0.2,1.6,0.6c0.4,0.4,0.6,0.9,0.6,1.6s-0.2,1.2-0.6,1.6c-0.4,0.4-0.9,0.6-1.6,0.6 s-1.2-0.2-1.6-0.6C-7-41.5-7.2-42-7.2-42.7s0.2-1.2,0.6-1.6S-5.6-44.9-5-44.9z"/> </svg>';
	
	Config.Ghost.SVG.Ghost3 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M32.2,76.7c-46.3,0-84.4-35.9-84.4-89.9c0-41.3,17.1-68.7,51-68.7c24.8,0,46.5,21.4,43.3,53.7 c-3.8,39.1-9.5,69.5,10.6,65.7c11.5-2.2,21.6,0.8,30.2,7.3c8.1,6.1,11,11.4,6,15.4c-6.3,5-15.3-8-27.7,3.7 C54.2,70.5,45.6,76.7,32.2,76.7z"/> <path class="st1" d="M11.3,5.6c0,0-9.3,9-12.8,20.4c-1.8,6-0.9,10.1,2.1,11.7c3.9,2.2,8-1,12.4-5.4c4-4,5.7-5.6,10.5-8"/> <path class="st1" d="M-46.2,4.7c0,0-9.3,9-12.8,20.4c-1.8,6-0.9,10.1,2.1,11.7c3.9,2.2,8-1,12.4-5.4c4-4,5.7-5.6,10.5-8"/> <path class="st2" d="M-0.9-52c2.8,0,5.3,1.1,7.1,2.9C8-47.3,9.1-44.8,9.1-42S8-36.7,6.2-34.9C4.4-33.1,1.9-32-0.9-32 s-5.3-1.1-7.1-2.9c-1.8-1.8-2.9-4.3-2.9-7.1s1.1-5.3,2.9-7.1C-6.2-50.9-3.7-52-0.9-52z"/> <path class="st2" d="M-31.2-52c2.8,0,5.3,1.1,7.1,2.9c1.8,1.8,2.9,4.3,2.9,7.1s-1.1,5.3-2.9,7.1s-4.3,2.9-7.1,2.9s-5.3-1.1-7.1-2.9 c-1.8-1.8-2.9-4.3-2.9-7.1s1.1-5.3,2.9-7.1C-36.5-50.9-34-52-31.2-52z"/> <path class="st3" d="M-35.2-44.9c0.6,0,1.2,0.2,1.6,0.6c0.4,0.4,0.6,0.9,0.6,1.6s-0.2,1.2-0.6,1.6c-0.4,0.4-0.9,0.6-1.6,0.6 s-1.2-0.2-1.6-0.6c-0.4-0.4-0.6-0.9-0.6-1.6s0.2-1.2,0.6-1.6S-35.8-44.9-35.2-44.9z"/> <path class="st3" d="M-5-44.9c0.6,0,1.2,0.2,1.6,0.6c0.4,0.4,0.6,0.9,0.6,1.6s-0.2,1.2-0.6,1.6c-0.4,0.4-0.9,0.6-1.6,0.6 s-1.2-0.2-1.6-0.6C-7-41.5-7.2-42-7.2-42.7s0.2-1.2,0.6-1.6S-5.6-44.9-5-44.9z"/> </svg>';
	
	Config.Ghost.SVG.Dashed = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <style type="text/css"> .st0{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:0.5111,3.0665;} .st1{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:0.4859,2.9157;} .st2{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-linejoin:round;} .st3{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:0.4966,2.9794;} .st4{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:0.4984,2.9906;} .st5{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:0.4893,2.9358;} .st6{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:0.3748,2.2486;} .st7{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:0.4859,2.9152;} .st8{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:0.3904,2.3424;} .st9{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:0.5481,3.2888;} .st10{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:0.4984,2.9904;} .st11{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:0.5235,3.1411;} .st12{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:0.5087,3.0521;} .st13{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:0.5012,3.0074;} .st14{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:0.4998,2.9989;} .st15{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:0.4689,2.8132;} .st16{fill:none;stroke:#FFFFFF;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:0.669,4.0138;} </style> <g> <path d="M-28.4,43.9L-28.4,43.9c0-6.8,5.3-12.4,12.7-12.4S-3.1,37-3.1,43.8v0.1c0,6.8-5.3,12.3-12.7,12.3S-28.4,50.7-28.4,43.9z M-8.4,43.9L-8.4,43.9c0-4.3-3.1-7.8-7.4-7.8s-7.4,3.4-7.4,7.6v0.1c0,4.2,3.1,7.7,7.4,7.7C-11.4,51.6-8.4,48.2-8.4,43.9z"/> <g> <path class="st0" d="M-28.4,43.9L-28.4,43.9c0-6.8,5.3-12.4,12.7-12.4S-3.1,37-3.1,43.8v0.1c0,6.8-5.3,12.3-12.7,12.3 S-28.4,50.7-28.4,43.9z"/> <path class="st1" d="M-8.4,43.9L-8.4,43.9c0-4.3-3.1-7.8-7.4-7.8s-7.4,3.4-7.4,7.6v0.1c0,4.2,3.1,7.7,7.4,7.7 C-11.4,51.6-8.4,48.2-8.4,43.9z"/> </g> </g> <g> <path d="M5.9,32h3.7c0.2,0,0.5,0.1,0.6,0.3l10.9,14.4V32.7c0-0.4,0.3-0.8,0.8-0.8h3.7c0.4,0,0.8,0.3,0.8,0.8V55 c0,0.4-0.3,0.8-0.8,0.8h-3.3c-0.2,0-0.5-0.1-0.6-0.3L10.3,40.7V55c0,0.4-0.3,0.8-0.8,0.8H5.9c-0.4,0-0.8-0.3-0.8-0.8V32.7 C5.1,32.3,5.5,32,5.9,32z"/> <g> <g> <polyline class="st2" points="21,46.4 21.1,46.6 21.1,46.4 			"/> <path class="st3" d="M21.1,43.4V32.7c0-0.4,0.3-0.7,0.8-0.7h3.7c0.4,0,0.8,0.3,0.8,0.7V55c0,0.4-0.3,0.8-0.8,0.8h-3.3 c-0.2,0-0.5-0.1-0.6-0.3L11.3,42"/> <polyline class="st2" points="10.4,40.8 10.3,40.7 10.3,40.9 			"/> <path class="st4" d="M10.3,43.9V55c0,0.4-0.3,0.8-0.8,0.8H5.9c-0.4,0-0.8-0.3-0.8-0.8V32.7c0-0.4,0.3-0.7,0.8-0.7h3.7 c0.2,0,0.5,0.1,0.6,0.3l9.9,13"/> </g> </g> </g> <g> <path d="M-127.2,32.7c0-0.4,0.3-0.8,0.8-0.8h8.1c2.7,0,4.9,0.7,6.2,2.1c1.1,1.1,1.6,2.4,1.6,4v0.1c0,2.8-1.5,4.3-3.2,5.2 c2.5,1,4.2,2.5,4.2,5.7v0.2c0,4.3-3.4,6.5-8.6,6.5h-8.3c-0.4,0-0.8-0.3-0.8-0.8V32.7z M-115.4,39c0-1.7-1.2-2.7-3.3-2.7h-3.7v5.4 h3.4C-116.8,41.7-115.4,40.8-115.4,39L-115.4,39z M-118.1,45.9h-4.3v5.6h4.4c2.2,0,3.6-1,3.6-2.8v0 C-114.4,46.9-115.7,45.9-118.1,45.9z"/> <g> <g> <path class="st2" d="M-113.6,43.3c-0.1,0-0.1,0.1-0.2,0.1c0.1,0,0.2,0.1,0.2,0.1"/> <path class="st5" d="M-111.1,45c1,1,1.5,2.2,1.5,4v0.2c0,4.3-3.4,6.5-8.6,6.5h-8.3c-0.4,0-0.8-0.3-0.8-0.8V32.7 c0-0.4,0.3-0.7,0.8-0.7h8.1c2.7,0,4.9,0.7,6.2,2.1c1.1,1.1,1.6,2.4,1.6,4v0.1c0,2-0.8,3.3-1.8,4.2"/> </g> <g> <polyline class="st2" points="-122.2,36.3 -122.5,36.3 -122.5,36.6 			"/> <line class="st6" x1="-122.5" y1="38.8" x2="-122.5" y2="40.3"/> <polyline class="st2" points="-122.5,41.5 -122.5,41.7 -122.2,41.7 			"/> <path class="st7" d="M-119.3,41.7h0.3c2.2,0,3.6-0.9,3.6-2.7v0c0-1.7-1.2-2.7-3.3-2.7h-2"/> </g> <g> <polyline class="st2" points="-122.2,45.9 -122.5,45.9 -122.5,46.1 			"/> <line class="st8" x1="-122.5" y1="48.4" x2="-122.5" y2="50"/> <polyline class="st2" points="-122.5,51.2 -122.5,51.4 -122.2,51.4 			"/> <path class="st9" d="M-118.9,51.4h0.9c2.2,0,3.6-1,3.6-2.8v0c0-1.7-1.3-2.8-3.7-2.8h-2.4"/> </g> </g> </g> <g> <path d="M-101.7,46.5V32.7c0-0.4,0.3-0.8,0.8-0.8h3.4c0.4,0,0.8,0.3,0.8,0.8v13.8c0,3.4,1.6,5,4.1,5s4.1-1.6,4.1-4.9V32.7 c0-0.4,0.3-0.8,0.8-0.8h3.4c0.4,0,0.8,0.3,0.8,0.8v13.7c0,6.6-3.6,9.7-9.1,9.7C-98.2,56.2-101.7,53-101.7,46.5z"/> <g> <path class="st10" d="M-101.7,46.5V32.7c0-0.4,0.3-0.7,0.8-0.7h3.4c0.4,0,0.8,0.3,0.8,0.7v13.8c0,3.4,1.6,5,4.1,5s4.1-1.6,4.1-4.9 V32.7c0-0.4,0.3-0.7,0.8-0.7h3.4c0.4,0,0.8,0.3,0.8,0.7v13.7c0,6.6-3.6,9.7-9.1,9.7C-98.2,56.2-101.7,53-101.7,46.5z"/> </g> </g> <g> <path d="M-69.5,36.5h-5.2c-0.4,0-0.8-0.3-0.8-0.8v-3.1c0-0.4,0.3-0.8,0.8-0.8h15.4c0.4,0,0.8,0.3,0.8,0.8v3.1 c0,0.4-0.3,0.8-0.8,0.8h-5.2V55c0,0.4-0.3,0.8-0.8,0.8h-3.4c-0.4,0-0.8-0.3-0.8-0.8V36.5z"/> <g> <g> <polyline class="st2" points="-69.5,36.8 -69.5,36.5 -69.7,36.5 			"/> <path class="st11" d="M-72.9,36.5h-1.8c-0.4,0-0.8-0.3-0.8-0.8v-3.1c0-0.4,0.3-0.7,0.8-0.7h15.4c0.4,0,0.8,0.3,0.8,0.7v3.1 c0,0.4-0.3,0.8-0.8,0.8h-3.4"/> <polyline class="st2" points="-64.3,36.5 -64.6,36.5 -64.6,36.8 			"/> <path class="st12" d="M-64.6,39.8V55c0,0.4-0.3,0.8-0.8,0.8h-3.4c-0.4,0-0.8-0.3-0.8-0.8V38.3"/> </g> </g> </g> <g> <path d="M-45.6,36.5h-5.2c-0.4,0-0.8-0.3-0.8-0.8v-3.1c0-0.4,0.3-0.8,0.8-0.8h15.4c0.4,0,0.8,0.3,0.8,0.8v3.1 c0,0.4-0.3,0.8-0.8,0.8h-5.2V55c0,0.4-0.3,0.8-0.8,0.8h-3.4c-0.4,0-0.8-0.3-0.8-0.8V36.5z"/> <g> <g> <polyline class="st2" points="-45.6,36.8 -45.6,36.5 -45.9,36.5 			"/> <path class="st11" d="M-49,36.5h-1.8c-0.4,0-0.8-0.3-0.8-0.8v-3.1c0-0.4,0.3-0.7,0.8-0.7h15.4c0.4,0,0.8,0.3,0.8,0.7v3.1 c0,0.4-0.3,0.8-0.8,0.8h-3.4"/> <polyline class="st2" points="-40.5,36.5 -40.7,36.5 -40.7,36.8 			"/> <path class="st12" d="M-40.7,39.8V55c0,0.4-0.3,0.8-0.8,0.8h-3.4c-0.4,0-0.8-0.3-0.8-0.8V38.3"/> </g> </g> </g> <g> <path d="M49.4,32h3.4c0.4,0,0.8,0.3,0.8,0.8V55c0,0.4-0.3,0.8-0.8,0.8h-3.4c-0.4,0-0.8-0.3-0.8-0.8V32.7C48.6,32.3,49,32,49.4,32z" /> <g> <path class="st13" d="M49.4,32h3.4c0.4,0,0.8,0.3,0.8,0.7V55c0,0.4-0.3,0.8-0.8,0.8h-3.4c-0.4,0-0.8-0.3-0.8-0.8V32.7 C48.6,32.3,49,32,49.4,32z"/> </g> </g> <g> <path d="M91.7,44.4V44c0-7.2,4.5-12.1,10.8-12.1c3.2,0,5.4,1.1,7.2,2.7c0.3,0.3,0.3,0.7,0.1,1l-2,2.6c-0.3,0.3-0.8,0.4-1.1,0.1 c-1.3-1.1-2.6-1.8-4.3-1.8c-3.2,0-5.5,3-5.5,7.6v0.1c0,4.7,2.4,7.6,5.6,7.6c1.7,0,3-0.7,4.3-2c0.3-0.3,0.8-0.2,1.1,0.1l2,2.4 c0.3,0.3,0.2,0.7,0,1c-2,1.9-4.2,3.1-7.6,3.1C95.9,56.4,91.7,51.6,91.7,44.4z"/> <g> <path class="st14" d="M91.7,44.4V44c0-7.2,4.5-12.1,10.8-12.1c3.2,0,5.4,1.1,7.2,2.7c0.3,0.3,0.3,0.7,0.1,1l-2,2.6 c-0.3,0.3-0.8,0.4-1.1,0.1c-1.3-1.1-2.6-1.8-4.3-1.8c-3.2,0-5.5,3-5.5,7.6v0.1c0,4.7,2.4,7.6,5.6,7.6c1.7,0,3-0.7,4.3-2 c0.3-0.3,0.8-0.2,1.1,0.1l2,2.4c0.3,0.3,0.2,0.7,0,1c-2,1.9-4.2,3.1-7.6,3.1C95.9,56.4,91.7,51.6,91.7,44.4z"/> </g> </g> <g> <path d="M116.7,50.8h3.8c0.4,0,0.8,0.3,0.8,0.8v3.7c0,0.4-0.3,0.8-0.8,0.8h-3.8c-0.4,0-0.8-0.3-0.8-0.8v-3.7 C116,51.2,116.3,50.8,116.7,50.8z"/> <g> <path class="st15" d="M116.7,50.8h3.8c0.4,0,0.8,0.3,0.8,0.8v3.7c0,0.4-0.3,0.8-0.8,0.8h-3.8c-0.4,0-0.8-0.3-0.8-0.8v-3.7 C116,51.2,116.3,50.8,116.7,50.8z"/> </g> </g> <g> <path d="M63.6,32h3.7c0.2,0,0.5,0.1,0.6,0.3l10.9,14.4V32.7c0-0.4,0.3-0.8,0.8-0.8h3.7c0.4,0,0.8,0.3,0.8,0.8V55 c0,0.4-0.3,0.8-0.8,0.8H80c-0.2,0-0.5-0.1-0.6-0.3L68.1,40.7V55c0,0.4-0.3,0.8-0.8,0.8h-3.7c-0.4,0-0.8-0.3-0.8-0.8V32.7 C62.9,32.3,63.2,32,63.6,32z"/> <g> <g> <polyline class="st2" points="78.7,46.4 78.9,46.6 78.9,46.4 			"/> <path class="st3" d="M78.9,43.4V32.7c0-0.4,0.3-0.7,0.8-0.7h3.7c0.4,0,0.8,0.3,0.8,0.7V55c0,0.4-0.3,0.8-0.8,0.8H80 c-0.2,0-0.5-0.1-0.6-0.3L69.1,42"/> <polyline class="st2" points="68.2,40.8 68.1,40.7 68.1,40.9 			"/> <path class="st4" d="M68.1,43.9V55c0,0.4-0.3,0.8-0.8,0.8h-3.7c-0.4,0-0.8-0.3-0.8-0.8V32.7c0-0.4,0.3-0.7,0.8-0.7h3.7 c0.2,0,0.5,0.1,0.6,0.3l9.9,13"/> </g> </g> </g> <g> <circle class="st16" cx="-68.7" cy="55" r="0.8"/> </g> <g> <circle class="st16" cx="-126.5" cy="55" r="0.8"/> </g> <g> <circle class="st16" cx="-65.3" cy="55" r="0.8"/> </g> <g> <circle class="st16" cx="-44.9" cy="55" r="0.8"/> </g> <g> <circle class="st16" cx="-41.5" cy="55" r="0.8"/> </g> <g> <circle class="st16" cx="49.4" cy="55" r="0.8"/> </g> <g> <circle class="st16" cx="52.8" cy="55" r="0.8"/> </g> <g> <circle class="st16" cx="25.5" cy="55" r="0.8"/> </g> <g> <circle class="st16" cx="22.2" cy="55" r="0.8"/> </g> <g> <circle class="st16" cx="9.5" cy="55" r="0.8"/> </g> <g> <circle class="st16" cx="5.9" cy="55" r="0.8"/> </g> <g> <circle class="st16" cx="83.3" cy="55" r="0.8"/> </g> <g> <circle class="st16" cx="80" cy="55" r="0.8"/> </g> <g> <circle class="st16" cx="67.3" cy="55" r="0.8"/> </g> <g> <circle class="st16" cx="63.6" cy="55" r="0.8"/> </g> <g> <path d="M-28.4,43.9L-28.4,43.9c0-6.8,5.3-12.4,12.7-12.4S-3.1,37-3.1,43.8v0.1c0,6.8-5.3,12.3-12.7,12.3S-28.4,50.7-28.4,43.9z M-8.4,43.9L-8.4,43.9c0-4.3-3.1-7.8-7.4-7.8s-7.4,3.4-7.4,7.6v0.1c0,4.2,3.1,7.7,7.4,7.7C-11.4,51.6-8.4,48.2-8.4,43.9z"/> <g> <path class="st0" d="M-28.4,43.9L-28.4,43.9c0-6.8,5.3-12.4,12.7-12.4S-3.1,37-3.1,43.8v0.1c0,6.8-5.3,12.3-12.7,12.3 S-28.4,50.7-28.4,43.9z"/> <path class="st1" d="M-8.4,43.9L-8.4,43.9c0-4.3-3.1-7.8-7.4-7.8s-7.4,3.4-7.4,7.6v0.1c0,4.2,3.1,7.7,7.4,7.7 C-11.4,51.6-8.4,48.2-8.4,43.9z"/> </g> </g> <g> <path d="M5.9,32h3.7c0.2,0,0.5,0.1,0.6,0.3l10.9,14.4V32.7c0-0.4,0.3-0.8,0.8-0.8h3.7c0.4,0,0.8,0.3,0.8,0.8V55 c0,0.4-0.3,0.8-0.8,0.8h-3.3c-0.2,0-0.5-0.1-0.6-0.3L10.3,40.7V55c0,0.4-0.3,0.8-0.8,0.8H5.9c-0.4,0-0.8-0.3-0.8-0.8V32.7 C5.1,32.3,5.5,32,5.9,32z"/> <g> <g> <polyline class="st2" points="21,46.4 21.1,46.6 21.1,46.4 			"/> <path class="st3" d="M21.1,43.4V32.7c0-0.4,0.3-0.7,0.8-0.7h3.7c0.4,0,0.8,0.3,0.8,0.7V55c0,0.4-0.3,0.8-0.8,0.8h-3.3 c-0.2,0-0.5-0.1-0.6-0.3L11.3,42"/> <polyline class="st2" points="10.4,40.8 10.3,40.7 10.3,40.9 			"/> <path class="st4" d="M10.3,43.9V55c0,0.4-0.3,0.8-0.8,0.8H5.9c-0.4,0-0.8-0.3-0.8-0.8V32.7c0-0.4,0.3-0.7,0.8-0.7h3.7 c0.2,0,0.5,0.1,0.6,0.3l9.9,13"/> </g> </g> </g> <g> <path d="M-127.2,32.7c0-0.4,0.3-0.8,0.8-0.8h8.1c2.7,0,4.9,0.7,6.2,2.1c1.1,1.1,1.6,2.4,1.6,4v0.1c0,2.8-1.5,4.3-3.2,5.2 c2.5,1,4.2,2.5,4.2,5.7v0.2c0,4.3-3.4,6.5-8.6,6.5h-8.3c-0.4,0-0.8-0.3-0.8-0.8V32.7z M-115.4,39c0-1.7-1.2-2.7-3.3-2.7h-3.7v5.4 h3.4C-116.8,41.7-115.4,40.8-115.4,39L-115.4,39z M-118.1,45.9h-4.3v5.6h4.4c2.2,0,3.6-1,3.6-2.8v0 C-114.4,46.9-115.7,45.9-118.1,45.9z"/> <g> <g> <path class="st2" d="M-113.6,43.3c-0.1,0-0.1,0.1-0.2,0.1c0.1,0,0.2,0.1,0.2,0.1"/> <path class="st5" d="M-111.1,45c1,1,1.5,2.2,1.5,4v0.2c0,4.3-3.4,6.5-8.6,6.5h-8.3c-0.4,0-0.8-0.3-0.8-0.8V32.7 c0-0.4,0.3-0.7,0.8-0.7h8.1c2.7,0,4.9,0.7,6.2,2.1c1.1,1.1,1.6,2.4,1.6,4v0.1c0,2-0.8,3.3-1.8,4.2"/> </g> <g> <polyline class="st2" points="-122.2,36.3 -122.5,36.3 -122.5,36.6 			"/> <line class="st6" x1="-122.5" y1="38.8" x2="-122.5" y2="40.3"/> <polyline class="st2" points="-122.5,41.5 -122.5,41.7 -122.2,41.7 			"/> <path class="st7" d="M-119.3,41.7h0.3c2.2,0,3.6-0.9,3.6-2.7v0c0-1.7-1.2-2.7-3.3-2.7h-2"/> </g> <g> <polyline class="st2" points="-122.2,45.9 -122.5,45.9 -122.5,46.1 			"/> <line class="st8" x1="-122.5" y1="48.4" x2="-122.5" y2="50"/> <polyline class="st2" points="-122.5,51.2 -122.5,51.4 -122.2,51.4 			"/> <path class="st9" d="M-118.9,51.4h0.9c2.2,0,3.6-1,3.6-2.8v0c0-1.7-1.3-2.8-3.7-2.8h-2.4"/> </g> </g> </g> <g> <path d="M-101.7,46.5V32.7c0-0.4,0.3-0.8,0.8-0.8h3.4c0.4,0,0.8,0.3,0.8,0.8v13.8c0,3.4,1.6,5,4.1,5s4.1-1.6,4.1-4.9V32.7 c0-0.4,0.3-0.8,0.8-0.8h3.4c0.4,0,0.8,0.3,0.8,0.8v13.7c0,6.6-3.6,9.7-9.1,9.7C-98.2,56.2-101.7,53-101.7,46.5z"/> <g> <path class="st10" d="M-101.7,46.5V32.7c0-0.4,0.3-0.7,0.8-0.7h3.4c0.4,0,0.8,0.3,0.8,0.7v13.8c0,3.4,1.6,5,4.1,5s4.1-1.6,4.1-4.9 V32.7c0-0.4,0.3-0.7,0.8-0.7h3.4c0.4,0,0.8,0.3,0.8,0.7v13.7c0,6.6-3.6,9.7-9.1,9.7C-98.2,56.2-101.7,53-101.7,46.5z"/> </g> </g> <g> <path d="M-69.5,36.5h-5.2c-0.4,0-0.8-0.3-0.8-0.8v-3.1c0-0.4,0.3-0.8,0.8-0.8h15.4c0.4,0,0.8,0.3,0.8,0.8v3.1 c0,0.4-0.3,0.8-0.8,0.8h-5.2V55c0,0.4-0.3,0.8-0.8,0.8h-3.4c-0.4,0-0.8-0.3-0.8-0.8V36.5z"/> <g> <g> <polyline class="st2" points="-69.5,36.8 -69.5,36.5 -69.7,36.5 			"/> <path class="st11" d="M-72.9,36.5h-1.8c-0.4,0-0.8-0.3-0.8-0.8v-3.1c0-0.4,0.3-0.7,0.8-0.7h15.4c0.4,0,0.8,0.3,0.8,0.7v3.1 c0,0.4-0.3,0.8-0.8,0.8h-3.4"/> <polyline class="st2" points="-64.3,36.5 -64.6,36.5 -64.6,36.8 			"/> <path class="st12" d="M-64.6,39.8V55c0,0.4-0.3,0.8-0.8,0.8h-3.4c-0.4,0-0.8-0.3-0.8-0.8V38.3"/> </g> </g> </g> <g> <path d="M-45.6,36.5h-5.2c-0.4,0-0.8-0.3-0.8-0.8v-3.1c0-0.4,0.3-0.8,0.8-0.8h15.4c0.4,0,0.8,0.3,0.8,0.8v3.1 c0,0.4-0.3,0.8-0.8,0.8h-5.2V55c0,0.4-0.3,0.8-0.8,0.8h-3.4c-0.4,0-0.8-0.3-0.8-0.8V36.5z"/> <g> <g> <polyline class="st2" points="-45.6,36.8 -45.6,36.5 -45.9,36.5 			"/> <path class="st11" d="M-49,36.5h-1.8c-0.4,0-0.8-0.3-0.8-0.8v-3.1c0-0.4,0.3-0.7,0.8-0.7h15.4c0.4,0,0.8,0.3,0.8,0.7v3.1 c0,0.4-0.3,0.8-0.8,0.8h-3.4"/> <polyline class="st2" points="-40.5,36.5 -40.7,36.5 -40.7,36.8 			"/> <path class="st12" d="M-40.7,39.8V55c0,0.4-0.3,0.8-0.8,0.8h-3.4c-0.4,0-0.8-0.3-0.8-0.8V38.3"/> </g> </g> </g> <g> <path d="M49.4,32h3.4c0.4,0,0.8,0.3,0.8,0.8V55c0,0.4-0.3,0.8-0.8,0.8h-3.4c-0.4,0-0.8-0.3-0.8-0.8V32.7C48.6,32.3,49,32,49.4,32z" /> <g> <path class="st13" d="M49.4,32h3.4c0.4,0,0.8,0.3,0.8,0.7V55c0,0.4-0.3,0.8-0.8,0.8h-3.4c-0.4,0-0.8-0.3-0.8-0.8V32.7 C48.6,32.3,49,32,49.4,32z"/> </g> </g> <g> <path d="M91.7,44.4V44c0-7.2,4.5-12.1,10.8-12.1c3.2,0,5.4,1.1,7.2,2.7c0.3,0.3,0.3,0.7,0.1,1l-2,2.6c-0.3,0.3-0.8,0.4-1.1,0.1 c-1.3-1.1-2.6-1.8-4.3-1.8c-3.2,0-5.5,3-5.5,7.6v0.1c0,4.7,2.4,7.6,5.6,7.6c1.7,0,3-0.7,4.3-2c0.3-0.3,0.8-0.2,1.1,0.1l2,2.4 c0.3,0.3,0.2,0.7,0,1c-2,1.9-4.2,3.1-7.6,3.1C95.9,56.4,91.7,51.6,91.7,44.4z"/> <g> <path class="st14" d="M91.7,44.4V44c0-7.2,4.5-12.1,10.8-12.1c3.2,0,5.4,1.1,7.2,2.7c0.3,0.3,0.3,0.7,0.1,1l-2,2.6 c-0.3,0.3-0.8,0.4-1.1,0.1c-1.3-1.1-2.6-1.8-4.3-1.8c-3.2,0-5.5,3-5.5,7.6v0.1c0,4.7,2.4,7.6,5.6,7.6c1.7,0,3-0.7,4.3-2 c0.3-0.3,0.8-0.2,1.1,0.1l2,2.4c0.3,0.3,0.2,0.7,0,1c-2,1.9-4.2,3.1-7.6,3.1C95.9,56.4,91.7,51.6,91.7,44.4z"/> </g> </g> <g> <path d="M116.7,50.8h3.8c0.4,0,0.8,0.3,0.8,0.8v3.7c0,0.4-0.3,0.8-0.8,0.8h-3.8c-0.4,0-0.8-0.3-0.8-0.8v-3.7 C116,51.2,116.3,50.8,116.7,50.8z"/> <g> <path class="st15" d="M116.7,50.8h3.8c0.4,0,0.8,0.3,0.8,0.8v3.7c0,0.4-0.3,0.8-0.8,0.8h-3.8c-0.4,0-0.8-0.3-0.8-0.8v-3.7 C116,51.2,116.3,50.8,116.7,50.8z"/> </g> </g> <g> <path d="M63.6,32h3.7c0.2,0,0.5,0.1,0.6,0.3l10.9,14.4V32.7c0-0.4,0.3-0.8,0.8-0.8h3.7c0.4,0,0.8,0.3,0.8,0.8V55 c0,0.4-0.3,0.8-0.8,0.8H80c-0.2,0-0.5-0.1-0.6-0.3L68.1,40.7V55c0,0.4-0.3,0.8-0.8,0.8h-3.7c-0.4,0-0.8-0.3-0.8-0.8V32.7 C62.9,32.3,63.2,32,63.6,32z"/> <g> <g> <polyline class="st2" points="78.7,46.4 78.9,46.6 78.9,46.4 			"/> <path class="st3" d="M78.9,43.4V32.7c0-0.4,0.3-0.7,0.8-0.7h3.7c0.4,0,0.8,0.3,0.8,0.7V55c0,0.4-0.3,0.8-0.8,0.8H80 c-0.2,0-0.5-0.1-0.6-0.3L69.1,42"/> <polyline class="st2" points="68.2,40.8 68.1,40.7 68.1,40.9 			"/> <path class="st4" d="M68.1,43.9V55c0,0.4-0.3,0.8-0.8,0.8h-3.7c-0.4,0-0.8-0.3-0.8-0.8V32.7c0-0.4,0.3-0.7,0.8-0.7h3.7 c0.2,0,0.5,0.1,0.6,0.3l9.9,13"/> </g> </g> </g> </svg>';
	
	Config.Ufo = {};
	
	Config.Ufo.SOUND = {
	  "SE1": {
	    "NORMAL": ["Ufo_0_0", "Ufo_0_1", "Ufo_0_2"],
	    "SECRET": ["S_Ufo_0_0", "S_Ufo_0_1", "S_Ufo_0_2"]
	  },
	  "SE2": {
	    "NORMAL": ["Ufo_1_0", "Ufo_1_1"],
	    "SECRET": ["S_Ufo_1_0", "S_Ufo_1_1", "S_Ufo_1_2"]
	  },
	  "SE3": {
	    "NORMAL": ["Ufo_2_0", "Ufo_2_1"],
	    "SECRET": ["S_Ufo_2_0", "S_Ufo_2_1", "S_Ufo_2_2", "S_Ufo_2_3"]
	  }
	};
	
	Config.Ufo.SVG = {};
	
	Config.Ufo.SVG.Btn = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M-50.9-16.2c-0.4-9.1,2.2-18.7,5.7-25.1c3.4-6.2,8.4-10.8,12.9-13.7c7.6-4.9,15.7-7.4,24.7-7.4c8.8,0,15.9,2.9,22.8,6.8c5.2,2.9,10.7,8.9,13,13.1c4.9,8.8,6.3,14.5,6.3,26.4"/> </svg>';
	
	Config.Ufo.SVG.Base1 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <polyline class="st0" points="-80.9,4.3 -73.9,4.3 -65.9,4.3 -60.9,-15.7 44.1,-15.7 49.1,4.3 58.1,4.3 64.1,4.3 "/> </svg>';
	
	Config.Ufo.SVG.Base2 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M-80.4,28.6c-3.3-0.6-5.8-6-2.6-9.4C-80.6,16.8-68.4,7-66.6,4.4c2.5-3.5,3.4-17.9,8.6-19.9s93-2.9,99.2,0.2c4.1,2.1,5.8,15.6,7.9,19.2s13.2,11.8,16.4,15.2c2.4,2.6,2.4,9.6-4.5,9.6C57.4,28.8-77,29.3-80.4,28.6z"/> </svg>';
	
	Config.Ufo.SVG.Circle = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M-30.8,26.6c0,4.8-2,9.2-5.1,12.4c-3.2,3.2-7.5,5.1-12.4,5.1s-9.2-2-12.4-5.1c-3.2-3.2-5.1-7.5-5.1-12.4s2-9.2,5.1-12.4c3.2-3.2,7.5-5.1,12.4-5.1s9.2,2,12.4,5.1C-32.8,17.4-30.8,21.7-30.8,26.6z"/> <path class="st0" d="M8.6,26.6c0,4.8-2,9.2-5.1,12.4C0.3,42.1-4.1,44-8.9,44s-9.2-2-12.4-5.1c-3.2-3.2-5.1-7.5-5.1-12.4s2-9.2,5.1-12.4s7.5-5.1,12.4-5.1s9.2,2,12.4,5.1S8.6,21.7,8.6,26.6z"/> <path class="st0" d="M47.6,26.6c0,4.8-2,9.2-5.1,12.4c-3.2,3.2-7.5,5.1-12.4,5.1s-9.2-2-12.4-5.1c-3.2-3.2-5.1-7.5-5.1-12.4s2-9.2,5.1-12.4s7.5-5.1,12.4-5.1s9.2,2,12.4,5.1C45.6,17.4,47.6,21.7,47.6,26.6z"/> </svg>';
	
	Config.Ufo.SVG.Line = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <line class="st0" x1="-57.7" y1="60" x2="-93" y2="144.9"/> <line class="st0" x1="41.1" y1="61.8" x2="76.4" y2="146.8"/> </svg>';
	
	Config.Rocket = {};
	
	Config.Rocket.SVG = {};
	
	Config.Rocket.COLOR = {
	  FIRE_STROKE: "#231815",
	  FIRE_OUT: "#F15A24",
	  FIRE_IN: "#FDF663",
	  SMOKE_FILL1: "#9FC6E3",
	  SMOKE_FILL2: "#7CB7DA"
	};
	
	Config.Rocket.SOUND = {
	  "SE1": {
	    "NORMAL": ["Rocket_0"],
	    "SECRET": ["S_Rocket_1", "S_Rocket_2", "S_Rocket_3", "S_Rocket_4", "S_Rocket_5"]
	  }
	};
	
	Config.Rocket.SVG.Fire1 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <!-- 外の炎--> <path class="st0" d="M5.5,34.3C5.5,48.5-7,64-7,64s-12.6-15.5-12.6-29.7S-12,12.5-7,12.5S5.5,20.1,5.5,34.3z"/> <path class="st0" d="M-19.7,4.4c0,14.2-12.6,29.8-12.6,29.8S-44.8,18.6-44.8,4.4s7.6-21.8,12.6-21.8S-19.7-9.9-19.7,4.4z"/> <path class="st0" d="M30.1,3.4c0,14.2-12.6,29.8-12.6,29.8S5,17.6,5,3.4s7.6-21.8,12.6-21.8S30.1-10.9,30.1,3.4z"/> <!-- 内の炎--> <path class="st1" d="M-1.4,28.6c0,8.7-5.6,18.3-5.6,18.3s-5.6-9.5-5.6-18.3S-9.8,15.2-7,15.2S-1.4,19.8-1.4,28.6z"/> <path class="st1" d="M23.2-2.3c0,8.7-5.6,18.3-5.6,18.3S12,6.5,12-2.3s2.8-13.4,5.6-13.4S23.2-11.1,23.2-2.3z"/> <path class="st1" d="M-26.6-1.3c0,8.7-5.6,18.3-5.6,18.3s-5.6-9.5-5.6-18.3s2.8-13.4,5.6-13.4S-26.6-10.1-26.6-1.3z"/> </svg>';
	
	Config.Rocket.SVG.Fire2 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <!-- 外の炎--> <path class="st0" d="M5.4,30.6c0,11.5-12.6,24-12.6,24s-12.6-12.5-12.6-24S-12.1,13-7.1,13S5.4,19.1,5.4,30.6z"/> <path class="st0" d="M-19.8,0.7c0,11.5-12.6,24-12.6,24S-45,12.2-45,0.7s7.6-17.6,12.6-17.6S-19.8-10.8-19.8,0.7z"/> <path class="st0" d="M30.5,0c0,11.5-12.6,24-12.6,24S5.4,11.5,5.4,0S13-17.6,17.9-17.6S30.5-11.4,30.5,0z"/> <!-- 内の炎--> <path class="st1" d="M-1.5,26c0,7-5.6,14.8-5.6,14.8s-5.6-7.7-5.6-14.8s2.8-10.8,5.6-10.8S-1.5,18.9-1.5,26z"/> <path class="st1" d="M23.5-4.6c0,7-5.6,14.8-5.6,14.8s-5.6-7.7-5.6-14.8s2.8-10.8,5.6-10.8S23.5-11.7,23.5-4.6z"/> <path class="st1" d="M-26.7-4c0,7-5.6,14.8-5.6,14.8S-37.9,3.1-37.9-4s2.8-10.8,5.6-10.8S-26.7-11-26.7-4z"/> </svg>';
	
	Config.Rocket.SVG.Before = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <style type="text/css"> .st0{fill:none;stroke:#231815;stroke-linejoin:round;stroke-miterlimit:10;} </style> <path class="st0" d="M33.7-16l-1.2-31.3c-0.2-4.8-4.2-8.4-9-8.7c-9.7-0.5-20.2-0.5-32.3-0.5s-22.7,0-32.3,0.5c-4.8,0.2-8.8,3.8-9,8.7L-51.3-16h42.5H33.7z"/> </svg>';
	
	Config.Rocket.SVG.After = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M13.5-48.5c0,0,13.1-28,13.2-50.7c0-10.8-1.6-21-4.4-30.1c-7-23.4-20.9-39.5-30.2-39.5s-23.2,16.1-30.2,39.5 c-2.7,9.1-4.4,19.3-4.4,30.1c0.1,22.7,13.2,50.7,13.2,50.7c6.4-1.5,13.7-2.4,21.4-2.4S7.1-50,13.5-48.5z"/> </svg>';
	
	Config.Rocket.SVG.Parts1 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <style type="text/css"> .st0{fill:#FFFFFF;stroke:#231815;stroke-width:5.5;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:none;stroke:#231815;stroke-width:5.5;stroke-linejoin:round;stroke-miterlimit:10;} </style> <circle class="st0" cx="-8.4" cy="-97.8" r="19.2"/> </svg>';
	
	Config.Rocket.SVG.Parts2 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <style type="text/css"> .st0{fill:#FFFFFF;stroke:#231815;stroke-width:4.5;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:none;stroke:#231815;stroke-width:4.5;stroke-linejoin:round;stroke-miterlimit:10;} </style> <line class="st1" x1="-23.6" y1="-136.5" x2="7.7" y2="-136.5"/> <path class="st1" d="M-34.8-38.8c0,0,11.4-4,26.9-4s25.9,4,25.9,4"/> </svg>';
	
	Config.Rocket.SVG.Parts3 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <style type="text/css"> .st0{fill:#E2ECED;stroke:#231815;stroke-width:5.5;stroke-linejoin:round;stroke-miterlimit:10;} </style> <polygon class="st0" points="21.8,-71.1 36.7,-56.2 33.3,-21.2 14,-39.1 "/> <polygon class="st0" points="-37.6,-71.1 -52.5,-56.2 -49,-21.2 -29.8,-39.1 "/> </svg>';
	
	Config.Rocket.SVG.Count1 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path d="M-10.3-102.1l-3.1,2.7c-0.3,0.3-0.8,0.1-0.8-0.4v-3.2c0-0.1,0.1-0.3,0.2-0.4l3.6-3.1c0.1-0.1,0.2-0.1,0.3-0.1h3.6 c0.3,0,0.5,0.2,0.5,0.5v17.5c0,0.3-0.2,0.5-0.5,0.5h-3.3c-0.3,0-0.5-0.2-0.5-0.5V-102.1z"/> </svg>';
	
	Config.Rocket.SVG.Count2 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path d="M-14.1-88.7v-3.1c0-0.1,0-0.2,0.1-0.3l6.6-7.2c0.7-0.7,0.9-1.2,0.9-2c0-1-0.6-1.7-1.7-1.7c-0.7,0-1.5,0.3-1.7,1.4 c0,0.2-0.2,0.4-0.5,0.4l-3.3,0c-0.3,0-0.5-0.2-0.5-0.5c0.3-3.3,2.8-5.1,6-5.1c3.4,0,5.9,2.1,5.9,5.6c0,1.9-0.8,3-2.3,4.5L-8.9-92 h6.2c0.3,0,0.5,0.2,0.5,0.5v2.8c0,0.3-0.2,0.5-0.5,0.5h-10.9C-13.9-88.2-14.1-88.4-14.1-88.7z"/> </svg>';
	
	Config.Rocket.SVG.Count3 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path d="M-4.3-98c0.9-0.6,1.9-1.6,1.9-3.6c0-3.2-2.5-5.5-5.9-5.5c-3.1,0-5.6,1.9-5.9,5.1c0,0.3,0.2,0.5,0.5,0.5h3.3 c0.2,0,0.4-0.2,0.5-0.4c0.2-0.9,0.9-1.3,1.7-1.3c0.9,0,1.7,0.6,1.7,1.8c0,0.8-0.5,1.7-1.8,1.7h-0.1c-0.3,0-0.5,0.2-0.5,0.5v2.7 c0,0.3,0.2,0.5,0.5,0.5h0.1c1.2,0,2,0.8,2,1.9c0,1.4-0.8,2-1.9,2c-1,0-1.7-0.5-1.9-1.5c0-0.2-0.3-0.4-0.5-0.4h-3.3 c-0.3,0-0.5,0.2-0.5,0.5c0.2,3.8,3.1,5.3,6.1,5.3c3.3,0,6.2-1.8,6.1-5.8C-2.2-96.2-3.3-97.3-4.3-98z"/> </svg>';
	
	Config.Rocket.SVG.Smoke1 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <style type="text/css"> .st0{fill:#FFFFFF;stroke:#231815;stroke-width:5.5;stroke-linejoin:round;stroke-miterlimit:10;} </style> <path class="st0" d="M23.1-23.6c0,3.6-1.5,6.8-3.8,9.2s-5.6,3.8-9.2,3.8S3.3-12.1,1-14.4s-3.8-5.6-3.8-9.2s1.5-6.8,3.8-9.2 s5.6-3.8,9.2-3.8s6.8,1.5,9.2,3.8S23.1-27.2,23.1-23.6z"/> <path class="st0" d="M-15.5-23.6c0,3.6-1.5,6.8-3.8,9.2s-5.6,3.8-9.2,3.8s-6.8-1.5-9.2-3.8s-3.8-5.6-3.8-9.2s1.5-6.8,3.8-9.2 s5.6-3.8,9.2-3.8s6.8,1.5,9.2,3.8S-15.5-27.2-15.5-23.6z"/> </svg>';
	
	Config.Rocket.SVG.Smoke2 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <style type="text/css"> .st0{fill:#FFFFFF;stroke:#000000;stroke-width:5.5;stroke-linejoin:round;stroke-miterlimit:10;} </style> <circle class="st0" cx="29.1" cy="-29.2" r="11.7"/> <circle class="st0" cx="13" cy="-23.7" r="14.4"/> <circle class="st0" cx="-29.9" cy="-23.7" r="14.4"/> <circle class="st0" cx="-51.2" cy="-29" r="19.8"/> </svg>';
	
	Config.Rocket.SVG.Smoke3 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <style type="text/css"> .st0{fill:#FFFFFF;stroke:#000000;stroke-width:5.5;stroke-linejoin:round;stroke-miterlimit:10;} </style> <circle class="st0" cx="48.9" cy="-35.5" r="19.3"/> <circle class="st0" cx="16.2" cy="-24" r="16"/> <circle class="st0" cx="-31.4" cy="-24" r="16"/> <circle class="st0" cx="-60.4" cy="-29.5" r="24.5"/> <circle class="st0" cx="-38.9" cy="-37.1" r="14.9"/> <circle class="st0" cx="28.3" cy="-39.8" r="11.9"/> </svg>';
	
	Config.Rocket.SVG.Smoke4 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <style type="text/css"> .st0{fill:#FFFFFF;stroke:#000000;stroke-width:5.5;stroke-linejoin:round;stroke-miterlimit:10;} </style> <circle class="st0" cx="54.7" cy="-39.4" r="23.3"/> <circle class="st0" cx="18.9" cy="-25.9" r="17.6"/> <circle class="st0" cx="-33.4" cy="-25.9" r="17.6"/> <circle class="st0" cx="-65.3" cy="-31.9" r="27"/> <circle class="st0" cx="-42" cy="-40.3" r="16.5"/> <circle class="st0" cx="-47" cy="-53.3" r="14.4"/> <circle class="st0" cx="32.6" cy="-43.3" r="13.3"/> <circle class="st0" cx="45" cy="-25.7" r="16.4"/> </svg>';
	
	Config.Rocket.SVG.Smoke5 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <style type="text/css"> .st0{fill:#FFFFFF;stroke:#000000;stroke-width:5.5;stroke-linejoin:round;stroke-miterlimit:10;} </style> <circle class="st0" cx="70" cy="-47.2" r="26"/> <circle class="st0" cx="81.7" cy="-30.1" r="18.8"/> <circle class="st0" cx="24.7" cy="-27.8" r="19.4"/> <circle class="st0" cx="-41.9" cy="-27.8" r="19.4"/> <circle class="st0" cx="-77" cy="-34.5" r="29.6"/> <circle class="st0" cx="-51.4" cy="-43.7" r="18.1"/> <circle class="st0" cx="-62.3" cy="-60.3" r="17.8"/> <circle class="st0" cx="-80.6" cy="-62.6" r="16"/> <circle class="st0" cx="39.7" cy="-47" r="14.6"/> <circle class="st0" cx="52.8" cy="-28.1" r="18.3"/> </svg>';
	
	Config.Rocket.SVG.Smoke6 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <style type="text/css"> .st0{fill:#FFFFFF;stroke:#000000;stroke-width:5.5;stroke-linejoin:round;stroke-miterlimit:10;} </style> <circle class="st0" cx="47.5" cy="-48.6" r="17.5"/> <circle class="st0" cx="74" cy="-59.8" r="31.1"/> <circle class="st0" cx="26.2" cy="-29.4" r="23.4"/> <circle class="st0" cx="-43.5" cy="-29.4" r="23.4"/> <circle class="st0" cx="-72.5" cy="-38.4" r="29.6"/> <circle class="st0" cx="-54.9" cy="-48.6" r="22"/> <circle class="st0" cx="-68.2" cy="-68.6" r="21.6"/> <circle class="st0" cx="-91.1" cy="-71.8" r="19.6"/> <circle class="st0" cx="-99.5" cy="-36.2" r="30.6"/> <circle class="st0" cx="39.6" cy="-51.7" r="16.1"/> <circle class="st0" cx="58.7" cy="-30.1" r="22.3"/> <circle class="st0" cx="89" cy="-38.6" r="30.2"/> </svg>';
	
	Config.Elevator = {};
	
	Config.Elevator.SOUND = {
	  "SE_GROUP0": {
	    "SE1": {
	      "NORMAL": ["Elevator_0_0"],
	      "SECRET": ["S_Elevator_0_0"]
	    },
	    "SE2": {
	      "NORMAL": ["Elevator_1_0"],
	      "SECRET": ["S_Elevator_1_0"]
	    },
	    "SE3": {
	      "NORMAL": ["Elevator_2_0"],
	      "SECRET": ["S_Elevator_2_0"]
	    }
	  },
	  "SE_GROUP1": {
	    "SE1": {
	      "NORMAL": ["Elevator_0_1"],
	      "SECRET": ["S_Elevator_0_1"]
	    },
	    "SE2": {
	      "NORMAL": ["Elevator_1_1"],
	      "SECRET": ["S_Elevator_1_1"]
	    },
	    "SE3": {
	      "NORMAL": ["Elevator_2_1"],
	      "SECRET": ["S_Elevator_2_1"]
	    }
	  },
	  "SE_GROUP2": {
	    "SE1": {
	      "NORMAL": ["Elevator_0_2"],
	      "SECRET": ["S_Elevator_0_2", "S_Elevator_0_3"]
	    },
	    "SE2": {
	      "NORMAL": ["Elevator_1_2"],
	      "SECRET": ["S_Elevator_1_2", "S_Elevator_1_3"]
	    },
	    "SE3": {
	      "NORMAL": ["Elevator_2_1"],
	      "SECRET": ["S_Elevator_2_2", "S_Elevator_2_3"]
	    }
	  }
	};
	
	Config.Elevator.SVG = {};
	
	Config.Elevator.SVG.Open = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path fill="#FDF663" stroke="#231815" stroke-width="5.5" stroke-miterlimit="10" d="M52.2-126.7v257H147v-257H52.2z M118.5,25.9 H79.7c-4.4,0-8-3.6-8-8v-108c0-4.4,3.6-8,8-8h38.8c4.4,0,8,3.6,8,8v108C126.5,22.3,123,25.9,118.5,25.9z"/> <path fill="#FDF663" stroke="#231815" stroke-width="5.5" stroke-miterlimit="10" d="M-163.5-126.7v257h94.8v-257H-163.5z M-96.2,25.9h-38.9c-4.4,0-8-3.6-8-8v-108c0-4.4,3.6-8,8-8h38.8c4.4,0,8,3.6,8,8v108C-88.2,22.3-91.8,25.9-96.2,25.9z"/> </svg>';
	
	Config.Fall = {};
	
	Config.Fall.SOUND = {
	  "SE1": {
	    "NORMAL": ["Fall_0", "Fall_1", "Fall_2"],
	    "SECRET": ["S_Fall_0", "S_Fall_1", "S_Fall_2", "S_Fall_3", "S_Fall_4"]
	  }
	};
	
	Config.BalloonFailure = {};
	
	Config.BalloonFailure.SOUND = {
	  "SE1": {
	    "NORMAL": ["BaloonFailed_0", "BaloonFailed_1", "BaloonFailed_2"],
	    "SECRET": ["S_BaloonFailed_0", "S_BaloonFailed_1", "S_BaloonFailed_2", "S_BaloonFailed_3", "S_BaloonFailed_4"]
	  }
	};
	
	Config.BalloonFailure.SVG = {};
	
	Config.BalloonFailure.SVG.Inflate = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M-61.3-16.2c-58-21.4-99.4-77.3-99.4-142.8c0-28.5,7.8-55.1,21.5-77.9C-112.7-281.3-64.1-311-8.6-311 c55.5,0,104.1,29.8,130.7,74.2c13.6,22.8,21.5,49.4,21.5,77.9c0,65.5-41.4,121.3-99.4,142.7"/> </svg>';
	
	Config.BalloonFailure.SVG.Bang = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <style type="text/css"> .st0{fill:#FDF663;stroke:#231815;stroke-width:5.5;stroke-linejoin:round;stroke-miterlimit:10;} </style> <path class="st0" d="M-28.8-138.5c0,0,21,37.7,63.5,14c0,0-25,37.2,19.5,57.8c0,0-44.8,8-45,43.5c0,0-21.5-31.5-60.3-9.5c0,0,18.3-41.5-20.7-56.5C-71.8-89.2-20.7-86.7-28.8-138.5z"/> </svg>';
	
	Config.BalloonAway = {};
	
	Config.BalloonAway.SOUND = {
	  "SE1": {
	    "NORMAL": ["BaloonSuccess_0_0", "BaloonSuccess_0_1", "BaloonSuccess_0_2"],
	    "SECRET": ["S_BaloonSuccess_0_0", "S_BaloonSuccess_0_1"]
	  },
	  "SE2": {
	    "NORMAL": ["BaloonSuccess_1_0", "BaloonSuccess_1_1", "BaloonSuccess_1_2"],
	    "SECRET": ["S_BaloonSuccess_1_0", "S_BaloonSuccess_1_1", "S_BaloonSuccess_1_2", "S_BaloonSuccess_1_3"]
	  }
	};
	
	Config.BalloonAway.SVG = {};
	
	Config.BalloonAway.SVG.Inflate = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M-7.4,3.5C-27.8,3.5-45.4-7-55-21.8C-63.3-34.6-67.4-45.2-67.4-66c0-32.8,26.6-61.9,59.4-61.9 S51.4-98.8,51.4-66c0,14.3-5,31.2-12.9,43.5C28.2-6.6,13.4,3.5-9.9,3.5"/> </svg>';
	
	Config.BalloonAway.SVG.Handle1 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M-4.6,14.1c1.3,6.2,2.3,12.5,2.1,18.9c-0.2,6.7-2.3,13.2-3.8,19.7c-1.6,6.5-2.6,18.8,1.1,26.5"/> <path class="st1" d="M1.3,3.5c0,0,11,8.8,5.1,8.8S1.1,14.8-4,14.8s-7-2.1-11.8-1.5c-4,0.5,4.6-9.7,4.6-9.7"/> </svg>';
	
	Config.BalloonAway.SVG.Handle2 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M-4.6,14.1c-1.5,7.6-2.3,12.4-2,19.2c0.3,6.7,2.7,12.7,3.7,19.3c2,12.8-0.2,21.8-2.4,26.5"/> <path class="st1" d="M1.3,3.5c0,0,11,8.8,5.1,8.8S1.1,14.8-4,14.8s-7-2.1-11.8-1.5c-4,0.5,4.6-9.7,4.6-9.7"/> </svg>';
	
	Config.BalloonAway.SVG.Handle3 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M-4.6,14.1c1.3,6.2,2.3,12.5,2.1,18.9c-0.2,6.7-2.3,13.2-3.8,19.7c-1.6,6.5-2.6,18.8,1.1,26.5"/> <path class="st1" d="M1.4,3.5c0,0,11,8.8,5.1,8.8s-5.3,2.5-10.4,2.5s-7-2.1-11.8-1.5c-4,0.5,4.6-9.7,4.6-9.7"/> </svg>';
	
	Config.BalloonAway.SVG.Handle4 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M-4.6,14.1c-1.5,7.6-2.3,12.4-2,19.2c0.3,6.7,2.7,12.7,3.7,19.3c2,12.8-0.2,21.8-2.4,26.5"/> <path class="st1" d="M1.4,3.6c0,0,11,8.8,5.1,8.8S1.2,14.8-4,14.8s-7-2.1-11.8-1.5c-4,0.5,4.6-9.7,4.6-9.7"/> </svg>';
	
	Config.Poo = {};
	
	Config.Poo.SOUND = {
	  "SE1": {
	    "NORMAL": ["Poo_0", "Poo_1", "Poo_2", "Poo_3"],
	    "SECRET": ["S_Poo_0", "S_Poo_1", "S_Poo_2", "S_Poo_3", "S_Poo_4", "S_Poo_5", "S_Poo_6", "S_Poo_7"]
	  }
	};
	
	Config.Poo.SVG = {};
	
	Config.Poo.SVG.Poo1 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M-29.5-19.2c0,0-15.6,6.7-15.7,18.2c-0.1,11.7,12.8,15.2,36,15.4c24,0.2,41.1-4.8,41.1-15.8 S18.7-19.9,18.7-19.9"/> <path class="st1" d="M-4.2-9c18-0.1,29.5-3.9,30.2-13.6s-9.8-12.5-10-16.5c-0.2-3.4,4.1-3.8,2.3-10.2c-1.5-5.4-8.4-4.8-5.5-15.4 c0,0-8.5,3.5-16.1,5c-12.4,2.3-20.7,7.3-21,13.8c-0.2,4.3,3.2,5.3,0.1,8.8C-28-33-36.8-31.6-36.9-20.7c-0.1,7.5,7.1,9.2,7.1,9.2"/> <path class="st2" d="M17.4-42.4c-0.6,1.3-5.3,6.3-13.1,8.2"/> </svg>';
	
	Config.Poo.SVG.Poo2 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M-29.6-11.7c0,0-15.6,5.1-15.7,13.9c-0.1,8.9,12.8,11.6,36,11.7c24,0.1,41.1-3.7,41.1-12.1S18.7-12.2,18.7-12.2 "/> <path class="st1" d="M-4.2-3.9c18-0.1,29.5-3,30.2-10.3s-9.8-9.5-10-12.5c-0.2-2.6,4.1-2.9,2.3-7.8c-1.5-4.1-8.4-3.6-5.5-11.7 c0,0-8.5,2.7-16.1,3.8c-12.4,1.8-20.7,5.5-21,10.5c-0.2,3.3,3.2,4.1,0.1,6.7c-3.8,3.2-12.6,4.3-12.8,12.6c-0.1,5.7,7.1,7,7.1,7"/> <path class="st2" d="M17.4-29.4c-0.6,1-5.3,4.8-13.1,6.3"/> </svg>';
	
	Config.Poo.SVG.Poo3 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M-28.9-22.9c0,0-15.6,7.3-15.7,20C-44.7,10-31.8,13.9-8.6,14c24,0.2,41.1-5.3,41.1-17.4S19.4-23.7,19.4-23.7"/> <path class="st1" d="M-3.5-11.7c18-0.1,29.5-4.3,30.2-14.9s-9.8-13.7-10-18.1c-0.2-3.7,4.1-4.2,2.3-11.3c-1.5-5.9-11.1-9.4-15.8-20 c0,0-3.8,8.4-11.5,10c-12.4,2.6-15,6.5-15.3,13.7c-0.2,4.7,3.2,5.9,0.1,9.6c-3.8,4.6-12.6,6.2-12.8,18.2c-0.1,8.2,7.1,10.1,7.1,10.1 "/> <path class="st2" d="M18.1-48.4c-0.6,1.4-5.3,7-13.1,9.1"/> </svg>';
	
	Config.Poo.SVG.Poo4 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M-28.6-19.6c0,0-15.6,6.7-15.7,18.2c-0.1,11.7,12.8,15.2,36,15.4c24,0.2,41.1-4.8,41.1-15.8 S19.7-20.3,19.7-20.3"/> <path class="st1" d="M-3.2-9.4C14.8-9.5,26.3-13.3,27-23s-9.8-12.5-10-16.5c-0.2-3.4,4.1-3.8,2.3-10.2c-1.5-5.4-8.4-4.8-5.5-15.4 c0,0-8.5,3.5-16.1,5c-12.4,2.3-20.7,7.3-21,13.8c-0.2,4.3,3.2,5.3,0.1,8.8C-27-33.5-35.8-32-35.9-21.1c-0.1,7.5,7.1,9.2,7.1,9.2"/> <path class="st2" d="M18.4-42.8c-0.6,1.3-5.3,6.3-13.1,8.2"/> </svg>';
	
	Config.Poo.SVG.Poo5 = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox="0 0 145 61"> <path class="st0" d="M-28.6-19.7c0,0-15.6,6.7-15.7,18.2c-0.1,11.7,12.8,15.2,36,15.4c24,0.2,41.1-4.8,41.1-15.8 S19.7-20.4,19.7-20.4"/> <path class="st1" d="M-3.2-9.5c18-0.1,29.5-3.9,30.2-13.6s-9.8-12.5-10-16.5c-0.2-3.4,3.6-3.8,1.8-10.2c-1.5-5.4-6.9-4.4-7.5-15.4 c0,0-8,3.5-15.6,5c-12.4,2.3-19.2,7.3-19.5,13.8c-0.2,4.3,3.2,5.3,0.1,8.8c-3.8,4.2-12.1,5.6-12.3,16.6c-0.1,7.5,7.1,9.2,7.1,9.2"/> <path class="st2" d="M18.4-42.9c-0.6,1.3-5.3,6.3-13.1,8.2"/> </svg>';
	
	Config.Loading = {};
	
	Config.Loading.COLOR = {
	  "BG": "#FFFFFF",
	  "ENTER": "#FDF663",
	  "LEAVE": "#FFFFFF"
	};
	
	Config.Loading.SVG = {};
	
	Config.Loading.SVG.Text = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100"> <g> <path d="M-45.8-272.2v-0.1c0-13.5,10.7-24.6,25.4-24.6S4.8-286,4.8-272.5v0.1c0,13.5-10.7,24.6-25.4,24.6S-45.8-258.7-45.8-272.2z M-5.7-272.2v-0.1c0-8.4-6.2-15.4-14.9-15.4s-14.7,6.9-14.7,15.3v0.1c0,8.4,6.2,15.4,14.9,15.4C-11.7-256.9-5.7-263.8-5.7-272.2z" /> <path d="M22.7-296.1h7.4c0.5,0,0.9,0.2,1.2,0.6l21.9,28.7v-27.8c0-0.8,0.7-1.5,1.5-1.5H62c0.8,0,1.5,0.7,1.5,1.5v44.6 c0,0.8-0.7,1.5-1.5,1.5h-6.7c-0.5,0-0.9-0.2-1.2-0.6l-22.6-29.7v28.8c0,0.8-0.7,1.5-1.5,1.5h-7.3c-0.8,0-1.5-0.7-1.5-1.5v-44.6 C21.2-295.5,21.9-296.1,22.7-296.1z"/> <path d="M-243.5-294.6c0-0.8,0.7-1.5,1.5-1.5h16.2c5.3,0,9.7,1.4,12.4,4.1c2.1,2.2,3.2,4.8,3.2,8.1v0.2c0,5.6-3.1,8.6-6.5,10.4 c5.1,2,8.5,5.1,8.5,11.4v0.3c0,8.6-6.9,13.1-17.2,13.1H-242c-0.8,0-1.5-0.7-1.5-1.5V-294.6z M-219.9-282.1c0-3.5-2.4-5.3-6.7-5.3 h-7.3v10.7h6.9C-222.7-276.7-219.9-278.5-219.9-282.1L-219.9-282.1z M-225.3-268.4h-8.6v11.2h8.8c4.4,0,7.2-1.9,7.2-5.6v-0.1 C-217.9-266.3-220.4-268.4-225.3-268.4z"/> <path d="M-192.4-267v-27.6c0-0.8,0.7-1.5,1.5-1.5h6.9c0.8,0,1.5,0.7,1.5,1.5v27.7c0,6.7,3.2,10.1,8.3,10.1s8.3-3.3,8.3-9.9v-27.9 c0-0.8,0.7-1.5,1.5-1.5h6.8c0.8,0,1.5,0.7,1.5,1.5v27.4c0,13.1-7.2,19.4-18.2,19.4C-185.3-247.8-192.4-254.2-192.4-267z"/> <path d="M-127.9-287h-10.5c-0.8,0-1.5-0.7-1.5-1.5v-6.1c0-0.8,0.7-1.5,1.5-1.5h30.7c0.8,0,1.5,0.7,1.5,1.5v6.1 c0,0.8-0.7,1.5-1.5,1.5h-10.5v37c0,0.8-0.7,1.5-1.5,1.5h-6.8c-0.8,0-1.5-0.7-1.5-1.5V-287z"/> <path d="M-80.2-287h-10.5c-0.8,0-1.5-0.7-1.5-1.5v-6.1c0-0.8,0.7-1.5,1.5-1.5h30.7c0.8,0,1.5,0.7,1.5,1.5v6.1 c0,0.8-0.7,1.5-1.5,1.5h-10.5v37c0,0.8-0.7,1.5-1.5,1.5h-6.8c-0.8,0-1.5-0.7-1.5-1.5V-287z"/> <path d="M109.8-296.1h6.9c0.8,0,1.5,0.7,1.5,1.5v44.6c0,0.8-0.7,1.5-1.5,1.5h-6.9c-0.8,0-1.5-0.7-1.5-1.5v-44.6 C108.3-295.5,109-296.1,109.8-296.1z"/> <path d="M194.3-271.4v-0.6c0-14.4,9-24.2,21.6-24.2c6.5,0,10.8,2.2,14.3,5.4c0.6,0.5,0.6,1.4,0.1,2l-4.1,5.2 c-0.5,0.7-1.5,0.8-2.2,0.2c-2.5-2.3-5.2-3.7-8.6-3.7c-6.4,0-11.1,5.9-11.1,15.2v0.2c0,9.5,4.9,15.2,11.2,15.2 c3.4,0,5.9-1.4,8.7-3.9c0.6-0.6,1.6-0.5,2.1,0.2l4,4.7c0.5,0.6,0.5,1.5-0.1,2c-4,3.8-8.4,6.2-15.1,6.2 C202.8-247.2,194.3-256.8,194.3-271.4z"/> <path d="M244.5-258.4h7.5c0.8,0,1.5,0.7,1.5,1.5v7.5c0,0.8-0.7,1.5-1.5,1.5h-7.5c-0.8,0-1.5-0.7-1.5-1.5v-7.5 C243-257.7,243.6-258.4,244.5-258.4z"/> <path d="M138.3-296.1h7.4c0.5,0,0.9,0.2,1.2,0.6l21.9,28.7v-27.8c0-0.8,0.7-1.5,1.5-1.5h7.3c0.8,0,1.5,0.7,1.5,1.5v44.6 c0,0.8-0.7,1.5-1.5,1.5h-6.7c-0.5,0-0.9-0.2-1.2-0.6l-22.6-29.7v28.8c0,0.8-0.7,1.5-1.5,1.5h-7.3c-0.8,0-1.5-0.7-1.5-1.5v-44.6 C136.8-295.5,137.5-296.1,138.3-296.1z"/> <path d="M-60.9-171.7c0-0.7,0-1.2-0.1-1.8h1.2c1.6-0.9,2.2-1.4,3.9-3H-65c-1.2,0-2,0-2.8,0.1v-2.7c0.8,0.1,1.6,0.1,2.8,0.1h10.4 c1.2,0,1.5,0,2-0.1l1.5,1.7c-0.6,0.6-0.6,0.6-2.2,2.1c-1.1,1.1-2.9,2.4-4.9,3.6v1h5.6c1.5,0,2.4,0,3.1-0.1v2.8 c-0.9-0.1-1.7-0.1-3.1-0.1h-5.6v6.7c0,2-0.8,2.5-3.9,2.5c-0.5,0-0.8,0-2.6-0.1c-0.2-1.3-0.3-1.8-0.7-2.8c1.4,0.2,2.2,0.3,3.4,0.3 c0.9,0,1.1-0.1,1.1-0.6v-6.1h-6.2c-1.4,0-2.2,0-3.1,0.1v-2.8c0.8,0.1,1.7,0.1,3.2,0.1h6.1V-171.7z"/> <path d="M-31.9-171.7c-0.3-1.1-0.4-1.7-0.7-4.7c-0.1-1.2-0.2-1.7-0.4-2.5c1.5,0,2.4,0.1,3,0.3c0.4,0.1,0.5,0.3,0.5,0.5 c0,0.1,0,0.2-0.1,0.4c-0.2,0.6-0.2,1-0.2,1.6c0,1.2,0.2,3.1,0.5,3.9c0.1,0.5,0.3,0.6,0.6,0.6c0.6,0,2.7-1.1,3.8-2 c0.3-0.2,0.4-0.3,0.5-0.3c0.2,0,0.4,0.2,0.8,0.6c0.6,0.8,1.1,1.7,1.1,2c0,0.3-0.2,0.4-0.6,0.6c-1.5,0.4-3.9,1.4-5.6,2.2 c-2.9,1.4-4.2,2.8-4.2,4.2c0,1.5,1.2,2.1,4.3,2.1c1.8,0,3.4-0.2,5.6-0.5c0.1,0,0.3,0,0.3,0c0.2,0,0.3,0.1,0.4,0.3 c0.1,0.2,0.2,1.7,0.2,2.3c0,0.3-0.1,0.5-0.4,0.6c-0.5,0.1-3.4,0.3-5.3,0.3c-3.1,0-5.1-0.4-6.4-1.3c-1.1-0.7-1.7-1.9-1.7-3.4 c0-1.1,0.3-2.1,1-3c0.8-1.2,1.8-2,3.8-3.2C-31.5-170.6-31.7-170.9-31.9-171.7z M-23.2-177.1c0.2-0.1,0.3-0.2,0.5-0.2 c0.3,0,2.4,2.2,2.4,2.6c0,0.1-0.2,0.4-0.6,0.7c-0.5,0.4-0.5,0.4-0.6,0.4c-0.1,0-0.2,0-0.6-0.7c-0.5-0.7-1.2-1.4-1.7-1.9 c-0.1-0.1-0.1-0.1-0.1-0.2C-24-176.4-23.8-176.6-23.2-177.1z M-18-176.4c0,0.1-0.1,0.2-0.4,0.5c-0.3,0.3-0.8,0.6-0.9,0.6 c-0.1,0-0.2-0.1-0.5-0.5c-0.6-0.8-0.9-1.2-1.8-2c-0.1-0.1-0.1-0.1-0.1-0.2c0-0.2,0.9-0.9,1.2-0.9C-19.9-178.9-18-176.8-18-176.4z" /> <path d="M-1.7-172.1c-1.7-0.3-3-0.8-3.9-1.5c-0.4-0.3-0.5-0.4-0.5-0.6c0-0.3,0.2-0.7,0.9-2.1c1.2,0.7,2.5,1.3,4,1.6 c0.3-1.7,0.5-3.1,0.5-4.6c1.2,0.2,2.3,0.6,2.9,0.9c0.3,0.1,0.4,0.3,0.3,0.5c0,0.1,0,0.2-0.2,0.4c-0.4,0.7-0.4,0.8-0.9,3.2 c0.2,0,0.6,0,0.7,0c0,0,0.1,0,0.2,0c0.6,0,1,0,1.2,0h0.1c0.2,0,0.3,0.1,0.3,0.4c0,1.1-0.1,1.9-0.2,2.1c-0.1,0.1-0.4,0.2-1.4,0.2 c-0.5,0-0.8,0-1.5,0c-0.5,2.5-0.5,2.5-0.7,3.8c0.8,0.1,1,0.1,1.4,0.1l1.3,0c0.2,0,0.4,0,0.4,0.2c0.1,0.1,0.2,0.9,0.2,1.8 c0,0.4,0,0.6-0.2,0.6c-0.1,0-0.6,0.1-1.6,0.1c-0.4,0-1.1,0-1.9-0.1c0,0.4,0,0.7,0,0.9c0,2.2,1,3.2,3.3,3.2c2.5,0,4-1.2,4-3.3 c0-0.7-0.2-1.4-0.6-2.2c-0.5-0.9-0.9-1.4-2.1-2.4c0.1,0,0.2,0,0.2,0c0.4,0,1.2-0.1,1.9-0.3c0.4-0.1,0.5-0.1,0.6-0.1 c0.4,0,0.6,0.2,1.1,0.8c1.1,1.3,1.7,2.8,1.7,4.2c0,3.4-2.7,5.6-6.9,5.6c-3.9,0-5.8-1.9-5.8-5.9c0-0.3,0-0.6,0-1 c-2.4-0.5-3.7-1.7-3.7-3.4c0-0.9,0.3-1.5,0.9-2.2c0.1-0.1,0.2-0.1,0.3-0.1c0.1,0,0.3,0.1,0.9,0.6c0.4,0.4,0.5,0.4,0.5,0.6 c0,0.1,0,0.1-0.1,0.3c-0.1,0.2-0.2,0.4-0.2,0.6c0,0.3,0.2,0.6,0.6,0.7c0.3,0.2,0.4,0.2,1.2,0.4L-1.7-172.1z"/> <path d="M28.1-171.7c-0.3-1.1-0.4-1.7-0.7-4.7c-0.1-1.2-0.2-1.7-0.4-2.5c1.5,0,2.4,0.1,3,0.3c0.4,0.1,0.5,0.3,0.5,0.5 c0,0.1,0,0.2-0.1,0.4c-0.2,0.6-0.2,1-0.2,1.6c0,1.2,0.2,3.1,0.5,3.9c0.1,0.5,0.3,0.6,0.6,0.6c0.6,0,2.7-1.1,3.8-2 c0.3-0.2,0.4-0.3,0.5-0.3c0.2,0,0.4,0.2,0.8,0.6c0.6,0.8,1.1,1.7,1.1,2c0,0.3-0.2,0.4-0.6,0.6c-1.5,0.4-3.9,1.4-5.6,2.2 c-2.9,1.4-4.2,2.8-4.2,4.2c0,1.5,1.2,2.1,4.3,2.1c1.8,0,3.4-0.2,5.6-0.5c0.1,0,0.3,0,0.3,0c0.2,0,0.3,0.1,0.4,0.3 c0.1,0.2,0.2,1.7,0.2,2.3c0,0.3-0.1,0.5-0.4,0.6c-0.5,0.1-3.4,0.3-5.3,0.3c-3.1,0-5.1-0.4-6.4-1.3c-1.1-0.7-1.7-1.9-1.7-3.4 c0-1.1,0.3-2.1,1-3c0.8-1.2,1.8-2,3.8-3.2C28.5-170.6,28.3-170.9,28.1-171.7z"/> <path d="M59.7-164.3c-1.2,2-2.7,3.1-4.4,3.1c-2.5,0-4.3-2.4-4.3-5.9c0-3.8,1.9-7.1,5.2-8.8c1.6-0.9,3.3-1.2,5.6-1.2 c5,0,8.7,3.6,8.7,8.3c0,4.2-2.1,7.2-6,8.9c-0.8,0.3-1.4,0.5-1.7,0.5c-0.3,0-0.4-0.1-0.7-0.6c-0.4-0.6-0.9-1.1-1.5-1.5 c4.9-1.3,7.2-3.6,7.2-7.5c0-2-0.8-3.7-2.3-4.7c-0.8-0.6-1.5-0.8-2.8-1C62-169.6,61.2-166.8,59.7-164.3z M56.3-172.8 c-1.6,1.4-2.5,3.4-2.5,5.7c0,1.8,0.6,2.9,1.6,2.9c1.2,0,2.4-1.7,3.3-4.5c0.6-1.8,0.9-3.2,1.2-5.8C58.2-174.2,57.4-173.8,56.3-172.8 z"/> <path d="M-267.7-122c-1,0-1.5,0-2.1,0.1v-2.5c0.6,0.1,1.1,0.1,2.1,0.1h0.6c-0.3-1.3-0.5-1.9-1-2.7l2-0.5h-1.1c-1,0-1.6,0-2.2,0.1 v-2.5c0.6,0.1,1.1,0.1,2.2,0.1h1.8v-0.3c0-0.8,0-1.1-0.1-1.7h2.8c-0.1,0.5-0.1,0.9-0.1,1.7v0.4h1.6c1.1,0,1.5,0,2.1-0.1v2.5 c-0.6-0.1-1.2-0.1-2.2-0.1h-0.9l1.9,0.6c-0.5,1.2-1,2.3-1.2,2.7h0.5c1,0,1.5,0,2.1-0.1v2.5c-0.6-0.1-1.2-0.1-2.1-0.1h-1.9v1.6h1.8 c1,0,1.5,0,2.1-0.1v2.4c-0.6-0.1-1.1-0.1-2.1-0.1h-0.8c0.6,0.8,1.2,1.3,2.4,2c-0.5,0.9-0.7,1.3-1.1,2.2c-1.2-1-1.5-1.4-2.2-2.5 c0,1.1,0,1.7,0,1.8v2.3c0,0.8,0,1.4,0.1,1.9h-2.6c0.1-0.5,0.1-1.1,0.1-1.8v-2.3c0-0.5,0-0.9,0-1.6c-0.9,1.8-2,3-3.8,4.3 c-0.3-1-0.6-1.6-1.2-2.4c1.8-1.1,3.1-2.4,4-4h-1.5c-1,0-1.5,0-2.1,0.1v-2.4c0.6,0.1,1.1,0.1,2.2,0.1h2.3v-1.2c0-0.4,0-0.4,0-0.5 H-267.7z M-265.9-127.5c0.5,1,0.7,1.5,1,2.7l-2.1,0.6h3.2c0.6-1.1,1-2,1.3-3.2H-265.9z M-250.6-124.7c1,0,1.6,0,2.1-0.1v2.6 c-0.6-0.1-0.9-0.1-1.8-0.1h-0.6v9.3c0,1.4,0,2,0.1,2.7h-2.7c0.1-0.7,0.1-1.4,0.1-2.7v-9.3h-2.4c0,2.9-0.3,5.3-0.8,7.4 c-0.5,1.8-1.2,3.4-2.1,4.6c-0.9-0.8-1.3-1-2.3-1.5c2.2-2.7,2.8-5.7,2.8-14.4c0-1.9,0-2.8-0.1-3.6c2.6-0.1,6.6-1.1,7.7-2l1.9,2.2 c-0.2,0.1-0.3,0.1-0.8,0.3c-1.8,0.7-3.3,1-6.3,1.6v3H-250.6z"/> <path d="M-230.6-130.6c0.6,0.2,0.8,0.3,0.8,0.6c0,0.2,0,0.2-0.1,0.6c-0.3,0.7-0.5,1.9-0.6,3.6c-0.2,3.9-0.3,6.9-0.3,9.2 c0,0.8,0.1,1.3,0.2,1.7c0.3,0.8,1.1,1.2,2.4,1.2c2.2,0,4.2-0.9,6.1-2.6c0.9-0.8,1.4-1.5,2.3-2.8c0.1,0.8,0.3,1.3,0.9,2.4 c0.1,0.2,0.1,0.3,0.1,0.6c0,0.4-0.5,1-1.7,2.1c-2.4,2.1-5,3.2-7.8,3.2c-1.8,0-3.2-0.5-4-1.3c-0.9-1-1.3-2.2-1.3-4.6 c0-1.9,0-3.3,0.2-8.9c0-0.8,0-1.3,0-1.6c0-2,0-2.6-0.2-3.7C-232.3-130.9-231.3-130.8-230.6-130.6z"/> <path d="M-206.5-126.6c0-0.7,0-1.6-0.1-2.2c1.1,0.1,1.9,0.3,2.6,0.5c0.6,0.2,0.8,0.4,0.8,0.6c0,0.1,0,0.1-0.1,0.4 c-0.3,0.8-0.4,1.7-0.4,3.9c0,3.1,0.2,5,0.7,6.5c0.4,1.1,0.9,1.8,1.6,1.8c1,0,1.8-1.2,2.7-3.8c0.5,1.2,0.6,1.6,1.3,2.4 c0.1,0.2,0.2,0.3,0.2,0.5c0,0.4-0.4,1.2-0.8,1.9c-0.9,1.4-2.1,2.1-3.4,2.1c-1.8,0-3.2-1.5-4.1-4.4c-0.6-1.9-0.8-4.3-0.8-7.7V-126.6 z M-192.2-126.2c0.1,0,0.3,0.1,0.5,0.2c1.2,1.2,2.4,3.1,3.2,4.9c0.5,1.3,1,3,1,3.5c0,0.2-0.1,0.4-0.6,0.6c-0.6,0.3-1.7,0.7-2,0.7 c-0.2,0-0.3-0.1-0.4-0.6c-0.3-1.8-0.7-3.2-1.5-4.8c-0.7-1.4-0.7-1.5-2.4-3.5C-193.3-125.8-192.5-126.2-192.2-126.2z"/> <path d="M-161.1-125.3h-2c-4.9,0-8.6,0.1-9.7,0.3c-0.2,0-0.3,0-0.4,0c-0.2,0-0.3-0.1-0.4-0.3c-0.1-0.6-0.2-1.2-0.3-3 c1.4,0.2,3.1,0.2,6.6,0.2c6.1,0,6.7,0,9-0.1c0,2.3-0.1,3.6-0.1,7.5c0,1.8,0.1,5.7,0.1,6.9c0,0,0,0.1,0,0.1c0,0.3-0.1,0.5-0.2,0.6 c-0.2,0.1-1.2,0.1-1.9,0.1c-0.9,0-0.9,0-0.9-0.6c0,0,0-0.1,0-1h-1.3c-6.4,0-9.4,0.1-10.8,0.3c-0.1,0-0.1,0-0.2,0 c-0.3,0-0.4-0.1-0.4-0.6c-0.1-0.5-0.2-1.3-0.2-2.6c1.6,0.1,3.2,0.2,7,0.2c2.4,0,2.7,0,6,0V-125.3z"/> <path d="M-139.9-117.4c2.4,0.4,5.3,1.2,8,2.3c2,0.8,2.4,1,2.4,1.3c0,0.3-0.3,1.4-0.6,2.1c-0.2,0.4-0.3,0.6-0.5,0.6 c-0.1,0-0.1,0-2.6-1.1c-2.3-1.1-6.8-2.3-9.5-2.6c-0.9-0.1-1-0.1-1-0.4c0-0.2,0.3-1.3,0.6-2c0.1-0.3,0.3-0.5,0.5-0.5 C-142.5-117.8-140.6-117.5-139.9-117.4z M-132.1-125.5c-1.3-0.6-3.2-1.2-4.7-1.6c-1.5-0.4-3.9-0.9-4.8-1c-0.4,0-0.5-0.1-0.5-0.4 c0-0.3,0.3-1.6,0.5-2.1c0.1-0.2,0.2-0.3,0.5-0.3c0.1,0,0.2,0,0.3,0c0,0,0.3,0,0.7,0.1c2.5,0.4,5.4,1.1,7.7,1.8 c1.4,0.5,1.6,0.6,1.6,0.9c0,0.2-0.4,1.7-0.6,2.2c-0.1,0.3-0.2,0.4-0.4,0.4C-131.8-125.4-131.9-125.5-132.1-125.5z M-133.9-122.7 c1.2,0.5,1.5,0.6,1.5,1c0,0.2-0.4,1.7-0.6,2.1c-0.1,0.3-0.2,0.3-0.4,0.3c-0.1,0-0.2,0-0.4-0.1c-0.9-0.4-2-0.9-3.1-1.2 c-1.4-0.4-3.7-1-4.6-1.1c-0.4-0.1-0.5-0.1-0.5-0.4c0-0.4,0.4-1.8,0.6-2.2c0.1-0.1,0.2-0.2,0.4-0.2 C-140.2-124.6-135.7-123.4-133.9-122.7z"/> <path d="M-109.5-121.3c-0.9,0-1.4,0-2,0.1c-0.1,0-0.1,0-0.2,0c-0.2,0-0.4-0.1-0.4-0.4c-0.1-0.5-0.2-1.3-0.2-2.4 c0.8,0.2,2.3,0.2,4.9,0.2c2.2,0,2.4,0,2.8-0.2c0.1,0,0.2,0,0.3,0c0.4,0,0.8,0.2,1.4,0.7c0.5,0.5,0.8,0.9,0.8,1.2 c0,0.1,0,0.2-0.2,0.4c-0.3,0.4-0.3,0.4-0.7,2.7c-0.3,1.9-0.4,2.7-0.6,3.5c0,0.1,0,0.1,0,0.1c2.1,0,2.5,0,3.6-0.1c0,0,0.1,0,0.1,0 c0.3,0,0.4,0.2,0.4,1.5c0,1,0,1.1-0.4,1.1c-0.1,0-0.2,0-1.2,0c-0.8,0-3.4-0.1-5.6-0.1c-3.7,0-6.5,0.1-7.5,0.2c-0.1,0-0.1,0-0.2,0 c-0.3,0-0.5-0.1-0.6-0.3c-0.1-0.3-0.2-1-0.3-2.5c1.7,0.1,2.4,0.2,8.9,0.2c0-0.2,0-0.2,0.1-0.4c0.3-1.5,0.6-3.5,0.8-5.6H-109.5z"/> <path d="M-78.2-117.3c4.4,0,8-0.1,9.7-0.2c0.3,0,0.4,0,0.5,0c0.1,0,0.2,0,0.3,0c0.2,0.1,0.2,0.5,0.2,1.8c0,1.2,0,1.3-0.5,1.3 c0,0,0,0-0.4,0c-1.3-0.1-2.7-0.1-5.8-0.1c-6.6,0-9.8,0.1-11.2,0.3c-0.2,0-0.3,0-0.4,0c-0.6,0-0.6-0.4-0.8-3.3 C-84.7-117.4-82.4-117.3-78.2-117.3z M-77.5-127.7c3.2,0,5.1-0.1,6.4-0.2c0.1,0,0.2,0,0.3,0c0.3,0,0.4,0.1,0.4,0.4c0,0.2,0,1,0,1.7 c0,0.8-0.1,1-0.4,1c-0.1,0-0.2,0-0.4,0c-0.5,0-4,0-6.8,0c-1.8,0-3.1,0-4.4,0.1c-0.3,0-0.7,0-0.7,0c-0.3,0-0.5-0.1-0.6-0.4 c-0.1-0.3-0.2-1.8-0.2-2.9C-82.4-127.7-80.8-127.7-77.5-127.7z"/> <path d="M-46.5-126.2c1.4,0,6.3-0.1,7.2-0.1c0.8,0,1.1,0,1.9-0.1c0,0,0.1,0,0.1,0c0.3,0,0.4,0.2,0.4,2.1c0,0.6,0,0.6-0.3,0.7 c-0.2,0-0.2,0-0.6,0c-1.1-0.1-1.3-0.1-5.2-0.1c-0.1,3.6-0.8,6.2-2.2,8.5c-0.9,1.5-2.4,3-3.7,3.8c-0.4,0.2-0.7,0.3-0.8,0.3 c-0.3,0-0.3,0-0.9-0.5c-0.6-0.5-0.7-0.6-1.6-1.1c2.3-1.2,4.1-3,5-4.9c0.7-1.5,1.2-3.8,1.3-6.2c-0.4,0-4.2,0-4.9,0 c-1.5,2.4-2.9,4.2-3.5,4.2c-0.1,0-0.3-0.1-0.5-0.2c-0.6-0.4-1.2-0.7-1.9-1c2-1.8,3.5-3.8,4.5-6.3c0.6-1.4,1-3,1.1-3.9 c1.1,0.2,2,0.6,2.8,0.9c0.2,0.1,0.4,0.3,0.4,0.4c0,0.1,0,0.2-0.3,0.5c-0.2,0.2-0.3,0.5-0.7,1.5c-0.3,0.8-0.4,1-0.6,1.5H-46.5z"/> <path d="M-16.5-122.5c4.4,0,6.9,0,9.3-0.2c0.1,0,0.2,0,0.3,0c0.7,0,0.7,0,0.7,1.9c0,1-0.1,1.2-0.5,1.2c0,0-0.1,0-0.1,0 c-1.6-0.1-2.5-0.1-9.4-0.1c-2.5,0-3.8,0-6,0.1c-0.2,0-0.4,0-0.7,0c-0.8,0-0.9,0-1.3,0.1c-0.1,0-0.2,0-0.3,0c-0.3,0-0.4-0.1-0.5-0.3 c-0.1-0.6-0.2-1.8-0.2-2.9C-23.2-122.6-21.5-122.5-16.5-122.5z"/> <path d="M12.7-120.5c-0.3,0.5-0.4,0.6-0.6,0.6c-0.2,0-0.2,0-1.2-0.7c-0.8-0.6-1.9-1.1-3.6-1.7c-0.4-0.1-0.5-0.2-0.5-0.4 c0-0.1,0.2-0.5,0.6-1.2c0.1-0.2,0.2-0.3,0.2-0.5c0.3-0.5,0.4-0.6,0.6-0.6c0.4,0,2.2,0.7,3.5,1.3c0.7,0.4,1.6,0.9,1.8,1 c0.1,0.1,0.1,0.2,0.1,0.3C13.6-122,13.2-121.4,12.7-120.5z M25-123.2c0.1,0.2,0.1,0.4,0.1,0.5c0,0.3-0.1,0.5-0.6,1 c-2,2.2-4,4-6.5,5.7c-2.1,1.4-4.5,2.7-6.8,3.7c-0.7,0.3-0.9,0.4-1.2,0.6c-0.2,0.2-0.3,0.2-0.4,0.2c-0.5,0-1.3-1.3-2-3.2 c2.3-0.4,5.1-1.5,7.8-3.2c1.7-1,3.8-2.6,5.3-4c1.3-1.2,2.1-2.1,3.5-4.1C24.4-124.9,24.5-124.6,25-123.2z M15-125.2 c-0.3,0.4-0.4,0.5-0.6,0.5c-0.1,0-0.2,0-0.4-0.2c-1.5-1.3-2.9-2.2-4.4-2.8c-0.2-0.1-0.3-0.2-0.3-0.3c0-0.1,0-0.2,0.1-0.4 c1.2-1.8,1.2-1.8,1.5-1.8c0.5,0,2.5,1,3.8,1.9c1.2,0.8,1.4,1,1.4,1.2C16.1-126.9,15.6-125.9,15-125.2z"/> <path d="M48.6-117.6c-0.6,0-1.1,0-1.5,0c-2.9,0-5.5,0.1-6.4,0.2c-0.4,0-0.6,0.1-0.7,0.1c-0.3,0-0.4-0.1-0.5-2.6 c1.1,0.1,2.6,0.1,5.7,0.1c0.5,0,2.8,0,3.4,0v-2.5h-2c-2.2,0-4.2,0-5.3,0.1c-0.5,0-0.8,0-0.9,0c-0.3,0-0.3,0-0.5,0 c-0.1,0-0.2,0-0.3,0c-0.2,0-0.3-0.1-0.4-0.2c-0.1-0.3-0.1-1.1-0.2-2.4c1.2,0.1,2.5,0.2,7.3,0.2c2.7,0,3.6,0,4.9-0.1 c-0.1,1.4-0.1,3-0.1,6.2c0,1.7,0,5.4,0.1,6.5c0,0,0,0.1,0,0.1c0,0.2-0.1,0.3-0.2,0.4c-0.1,0.1-0.9,0.1-1.6,0.1 c-0.9,0-0.9,0-0.9-0.6c0,0,0-0.1,0-0.2v-0.5c-0.8,0-1.5,0-1.9,0c-3.7,0-6.5,0.1-7.3,0.2c-0.1,0-0.1,0-0.1,0c-0.4,0-0.4-0.1-0.6-2.6 c1.1,0.1,2.9,0.1,5.7,0.1c0.5,0,3.6,0,4.2,0V-117.6z"/> <path d="M83.1-124.5c0.1,0.2,0.2,0.4,0.2,0.6c0,0.2-0.1,0.4-0.4,0.8c-1.3,1.7-2.7,3.1-4.9,4.8c-2.4,1.9-4.4,3.1-7.3,4.5 c-1.8,0.9-1.9,0.9-2.2,1.2c-0.2,0.2-0.3,0.2-0.4,0.2c-0.2,0-0.4-0.2-0.8-0.7c-0.5-0.7-0.9-1.7-1.2-2.5c2.4-0.6,5.3-1.8,8.1-3.6 c3.7-2.3,6-4.6,7.8-7.8C82.3-126.2,82.5-125.7,83.1-124.5z M67.1-128.5c0.4-0.5,0.6-0.6,0.8-0.6c0.5,0,2.3,1.2,3.7,2.4 c0.9,0.7,1.2,1.1,1.2,1.3c0,0.2-0.4,0.8-1,1.5c-0.5,0.6-0.8,0.8-1,0.8c-0.2,0-0.2,0-1.2-0.9c-0.6-0.6-1.9-1.6-2.5-2 c-0.8-0.6-0.8-0.6-1-0.6c-0.1-0.1-0.1-0.1-0.1-0.2C66.1-127.2,66.5-127.8,67.1-128.5z"/> <path d="M105-117.9c-2.4,1.4-3,2.1-3,3.1c0,0.4,0.2,0.7,0.5,0.9c0.5,0.3,1.7,0.5,3.2,0.5c1.3,0,3.1-0.1,4.3-0.3 c0.5-0.1,0.8-0.1,1.8-0.4c0,0,0.1,0,0.1,0c0.2,0,0.3,0.1,0.4,0.3c0.1,0.5,0.2,1.2,0.2,2.1c0,0.4-0.1,0.5-0.4,0.6 c-0.6,0.1-3.2,0.3-5,0.3c-2.9,0-4.5-0.2-5.6-0.7c-1.4-0.6-2.1-1.7-2.1-3.2c0-1.4,0.6-2.6,1.9-3.6c1-0.8,1.3-1,3.5-2.2 c-0.2-0.8-0.6-1.1-1.3-1.1c-1,0-2,0.4-3.1,1.1c-0.7,0.5-1.5,1.2-2,1.7c-0.7,0.7-0.8,0.8-1,0.8c-0.2,0-0.7-0.6-1.2-1.4 c-0.2-0.4-0.4-0.7-0.4-0.9c0-0.2,0-0.3,0.6-0.6c2-1.3,3.6-3,4.6-4.7c-1.7,0.1-2.6,0.1-3.5,0.1c-0.4,0-0.4-0.1-0.6-0.5 c-0.1-0.3-0.2-1.6-0.2-2.2c0.8,0.1,1.3,0.1,2.4,0.1c0.9,0,2,0,3-0.1c0.5-1.4,0.7-2.2,0.7-3.4c2.1,0.4,3.1,0.7,3.1,1.1 c0,0.1,0,0.1-0.1,0.3c-0.2,0.3-0.4,0.7-0.7,1.4c0,0.1,0,0.1-0.1,0.2c1.4-0.2,2.6-0.4,3.4-0.6c0.5-0.1,0.6-0.2,0.8-0.2 c0.2,0,0.3,0.1,0.3,0.2c0.1,0.4,0.2,1.5,0.2,1.9c0,0.3-0.1,0.4-0.4,0.5c-0.8,0.2-3.4,0.6-5.6,0.8c-0.7,1.3-1.2,2.1-2,2.9 c1.1-0.5,1.9-0.7,2.9-0.7c1.1,0,1.8,0.6,2.3,2c2.4-1.3,3.6-2,3.8-2.1c1.1-0.6,1.6-1,2.1-1.6c1,1,2,2.5,2,2.9c0,0.1-0.1,0.2-0.4,0.3 c-1.2,0.3-3.4,1.2-7,3c0,0.4,0.1,1.5,0.1,2.3c0,0.1,0,0.3,0,0.5c0,0.1,0,0.2,0,0.2v0.4c0,0.3,0,0.4-0.2,0.5 c-0.1,0.1-0.8,0.2-1.5,0.2c-0.8,0-1-0.1-1-0.5c0,0,0,0,0-0.1c0-0.7,0.1-1.6,0.1-2.2V-117.9z"/> <path d="M131.2-126.4c4-1.1,6-1.5,8.3-1.5c2.4,0,4.3,0.6,5.6,1.9c1.1,1.1,1.6,2.6,1.6,4.3c0,3.1-1.7,5.7-4.5,7.2 c-1.5,0.8-3.1,1.3-5.2,1.7c-0.9,0.2-1.4,0.3-1.8,0.3c-0.3,0-0.4-0.1-0.6-0.4c-0.6-1.1-0.8-1.4-1.5-2.2c3.6-0.4,5.5-0.9,7.4-1.8 c2-1,3.2-2.7,3.2-4.7c0-2.3-1.5-3.7-3.9-3.7c-2.9,0-6,0.8-9.7,2.5c-0.6,0.3-1,0.5-1.2,0.6c-0.4,0.2-0.6,0.3-0.7,0.3 c-0.5,0-1.3-1.5-1.8-3.3C127.5-125.5,128.6-125.7,131.2-126.4z"/> <path d="M171.3-129.3c0,0.2-0.1,0.3-0.5,0.5c-0.2,0.1-0.4,0.3-0.6,0.6c-1.5,1.7-3.6,4.1-5.5,6c-0.4,0.4-0.6,0.7-0.6,1 c0,0.3,0.2,0.6,0.6,1c1.4,1.3,3.7,3.6,5.4,5.6c1.2,1.3,1.5,1.8,1.5,2c0,0.3-0.4,0.7-1.4,1.4c-0.5,0.4-0.7,0.5-0.9,0.5 c-0.2,0-0.3-0.1-0.6-0.5c-1-1.6-3.6-4.7-5.5-6.6c-1.1-1.1-1.3-1.3-1.6-1.8c-0.4-0.6-0.6-1.1-0.6-1.6c0-0.5,0.1-1,0.4-1.5 c0.3-0.4,0.3-0.4,1.7-2c1.4-1.4,2.9-3.3,3.8-4.6c0.6-0.9,0.9-1.5,1.2-2.3C170.2-130.6,171.3-129.8,171.3-129.3z"/> <path d="M196.5-123.3c3.4,0,5.8,2.3,5.8,5.6c0,2.2-1.2,4.2-3.1,5.4c-1.4,0.8-3,1.2-4.9,1.2c-3,0-4.8-1.2-4.8-3.3 c0-1.9,1.6-3.2,3.8-3.2c2,0,3.5,1,4.5,3.1c1.2-0.9,1.7-1.8,1.7-3.1c0-2.1-1.5-3.4-3.8-3.4c-2.4,0-4.9,1.2-7,3.3 c-0.4,0.4-0.7,0.8-1.2,1.3c-0.2,0.2-0.3,0.3-0.4,0.3c-0.4,0-2.1-1.7-2.1-2.1c0-0.2,0.1-0.3,0.6-0.7c0.6-0.4,1.3-1.1,2.4-2.1 c2.3-2.2,4-4.1,6.6-7.1c-3,0.4-5,0.7-5.8,1c-0.1,0-0.2,0-0.3,0c-0.2,0-0.3-0.1-0.5-0.5c-0.3-0.7-0.4-1.5-0.5-2.6 c0.6,0.1,1.1,0.1,1.6,0.1c1.2,0,3.1-0.2,5.6-0.5c0.9-0.1,1.2-0.2,1.8-0.4c0.2-0.1,0.3-0.1,0.5-0.1c0.3,0,0.7,0.3,1.3,1.2 c0.5,0.6,0.6,0.9,0.6,1.1c0,0.3-0.1,0.4-0.6,0.7c-0.4,0.3-0.7,0.5-1.2,1c-1.2,1.2-1.2,1.2-2.7,2.7c-1.1,1.1-1.2,1.2-2.1,2.2 C193.9-122.9,195.1-123.3,196.5-123.3z M194.2-115c-0.4-0.2-0.8-0.4-1.2-0.4c-0.7,0-1.2,0.4-1.2,0.9c0,0.7,0.7,1.1,1.9,1.1 c0.5,0,1,0,1.6-0.2C195-114.3,194.7-114.6,194.2-115z"/> <path d="M220.3-124.2c-1.5,1-2.1,1.2-3.7,2c-0.4-0.9-0.8-1.6-1.3-2.4c2.4-1,4.1-1.8,5.8-3.2c1.5-1.2,2.7-2.4,3.6-3.9h2.7 c1.2,1.7,2.2,2.6,3.9,3.8c1.9,1.4,3.8,2.4,5.9,3.1c-0.6,1-1,1.6-1.3,2.6c-1.4-0.6-2.3-1.1-3.9-2.1v1.8c-0.6-0.1-1.2-0.1-2.1-0.1 h-7.7c-0.6,0-1.3,0-2,0.1V-124.2z M219-118.3c-1.2,0-2,0-2.7,0.1v-2.7c0.7,0.1,1.6,0.1,2.7,0.1h14.3c1.2,0,1.9,0,2.7-0.1v2.7 c-0.8-0.1-1.5-0.1-2.7-0.1h-7.9c-0.8,1.8-1.5,3.1-2.4,4.5c4-0.2,4-0.2,7.3-0.6c-0.7-0.8-1.2-1.2-2.4-2.5l2.3-1 c2.5,2.5,3.5,3.7,5.3,6.1l-2.2,1.5c-0.6-1-0.8-1.3-1.4-2c-1.9,0.2-3.3,0.4-4.2,0.5c-2.4,0.2-6.8,0.6-7.8,0.7 c-1.3,0.1-2.4,0.2-3,0.3l-0.4-2.8c0.7,0,1,0.1,1.3,0.1c0.2,0,0.9,0,2.1-0.1c1.1-1.7,1.8-3.1,2.4-4.6H219z M229.9-124.9 c0.3,0,0.5,0,1,0c-2.1-1.4-3.4-2.6-4.8-4.5c-1.2,1.6-2.6,3-4.8,4.5c0.4,0,0.6,0,0.9,0H229.9z"/> <path d="M255-112.8c0,1.1,0,1.7,0.1,2.4h-2.8c0.1-0.7,0.1-1.3,0.1-2.4v-5.8c-0.9,0.8-1.4,1.2-2.6,2c-0.3-0.9-0.7-1.7-1.2-2.4 c1.6-0.9,2.7-1.8,4-3.1c1.1-1.1,1.8-2.1,2.5-3.6h-3.7c-0.8,0-1.4,0-1.9,0.1v-2.6c0.6,0.1,1.1,0.1,1.8,0.1h1.2v-1.9 c0-0.6,0-1.2-0.1-1.8h2.8c-0.1,0.5-0.1,1.1-0.1,1.8v1.9h1c0.7,0,1,0,1.3-0.1l1.1,1.2c-0.2,0.3-0.3,0.6-0.5,1 c-0.8,1.7-1.2,2.4-2.3,3.9c1.1,1.2,2.1,2.1,3.6,2.9c-0.5,0.7-0.9,1.4-1.2,2.3c-1.2-0.8-1.9-1.4-3-2.6V-112.8z M264.8-113.9h2.8 c1.2,0,1.9,0,2.6-0.1v2.8c-0.8-0.1-1.7-0.1-2.6-0.1h-7.9c-1,0-1.8,0-2.6,0.1v-2.8c0.7,0.1,1.5,0.1,2.6,0.1h2.5v-9h-1.7 c-0.8,0-1.5,0-2.3,0.1v-2.6c0.6,0.1,1.3,0.1,2.3,0.1h1.7v-4.1c0-1,0-1.5-0.1-2.4h2.9c-0.1,0.9-0.1,1.4-0.1,2.4v4.1h2.4 c1.1,0,1.7,0,2.3-0.1v2.6c-0.7-0.1-1.5-0.1-2.3-0.1h-2.4V-113.9z"/> <path d="M-59.1-186.3c0.8,0,1.7-0.1,2.6-0.4c0,0,0.1,0,0.1,0c0.1,0,0.1,0,0.1,0.1c0,0.2,0,0.5,0,0.9c0,0.2,0,0.3-0.1,0.3 c-0.3,0.2-1.6,0.3-2.8,0.3c-1.5,0-2.4-0.2-3.1-0.9c-0.3-0.3-0.7-0.8-0.7-1.1c0-0.1,0.1-0.2,0.9-0.7 C-61.6-186.7-60.8-186.3-59.1-186.3z M-59-192.1c0.6,0,0.9,0,1.6-0.1c0,0,0.1,0,0.1,0c0.1,0,0.1,0,0.1,0.1c0,0.1,0,0.4,0,0.8 c0,0.2,0,0.3-0.1,0.4c-0.1,0-1,0.1-1.6,0.1c-0.9,0-1.6-0.1-2.5-0.2c-0.6-0.1-0.6-0.1-0.6-0.5c0-0.2,0-0.6,0.1-0.9 C-61-192.2-60.1-192.1-59-192.1z"/> <path d="M-266.1-142.8c-0.4,0-1,0-1.4,0c-0.3,0-0.3,0-0.4-0.1c0-0.1,0-0.5,0-0.7c0,0,0-0.1,0-0.2c0.5,0,0.6,0,0.9,0 c0.2,0,0.6,0,0.9,0c0-0.6,0.1-0.8,0.1-1c0-0.1,0-0.2,0-0.3c0.5,0,0.9,0,1.1,0.1c0.1,0,0.1,0.1,0.1,0.1c0,0,0,0.1-0.1,0.2 c-0.1,0.2-0.1,0.4-0.2,0.8c1-0.1,1.7-0.2,2.7-0.4c0,0,0,0,0,0c0,0,0.1,0,0.1,0.1c0,0.1,0.1,0.5,0.1,0.7c0,0.2,0,0.2-0.1,0.2 c-0.6,0.1-1.8,0.3-2.9,0.4c0,0,0,0.1,0,0.2c0,0.2,0,0.2,0,0.7c0.4-0.1,0.8-0.1,1.3-0.1c0.1-0.3,0.1-0.4,0.1-0.6 c0.8,0.2,1.2,0.3,1.2,0.4c0,0,0,0.1-0.1,0.2c0,0,0,0.1-0.1,0.1c1.3,0.3,2.1,1.3,2.1,2.5c0,1.1-0.6,2-1.7,2.6 c-0.4,0.2-1,0.4-1.2,0.4c-0.1,0-0.2,0-0.2-0.1c-0.2-0.3-0.3-0.4-0.7-0.7c1-0.2,1.5-0.4,2-0.8c0.5-0.4,0.7-0.8,0.7-1.4 c0-0.8-0.5-1.4-1.3-1.6c-0.6,1.4-1,2-1.7,2.8c0.1,0.2,0.1,0.3,0.2,0.5c0,0.1,0,0.1,0,0.1c0,0.1-0.1,0.2-0.4,0.3 c-0.2,0.1-0.4,0.2-0.5,0.2c-0.1,0-0.1,0-0.2-0.3c-0.6,0.4-1.2,0.6-1.8,0.6c-0.7,0-1.1-0.6-1.1-1.4c0-1.2,0.9-2.5,2.4-3.2 C-266.1-142.1-266.1-142.6-266.1-142.8z M-267.5-138.6c0,0.2,0.2,0.4,0.4,0.4c0.3,0,0.8-0.2,1.2-0.5c-0.1-0.7-0.2-1.1-0.2-1.9 C-267-139.9-267.5-139.2-267.5-138.6z M-264-141.3c-0.4,0-0.7,0.1-1.1,0.2c0,0.7,0,1,0.1,1.5C-264.5-140.1-264.3-140.6-264-141.3z" /> <path d="M-256.3-142C-256.3-142-256.3-142-256.3-142c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2-0.2c-0.1-0.2-0.1-0.6-0.1-0.9 c0.1,0,0.2,0,0.3,0c0.5,0,1.2,0,1.7-0.1c0.1-0.7,0.1-1.2,0.1-1.6c0,0,0-0.1,0-0.2c1.2,0.1,1.4,0.2,1.4,0.4c0,0.1,0,0.1-0.1,0.2 c-0.1,0.2-0.1,0.3-0.3,1.1c0.4-0.1,0.9-0.2,1.1-0.3c0,0,0,0,0.1,0c0.1,0,0.1,0,0.2,0.4c0,0.2,0.1,0.5,0.1,0.6c0,0.1,0,0.1-0.1,0.1 c-0.2,0.1-0.2,0.1-1.6,0.3c-0.5,2-0.9,3.5-1.7,5.3c0,0.1-0.1,0.2-0.2,0.2c-0.1,0-0.5-0.1-0.8-0.3c-0.2-0.1-0.2-0.1-0.2-0.2 c0,0,0-0.1,0.1-0.2c0.8-1.4,1.3-3,1.7-4.6C-255.4-142.1-255.7-142.1-256.3-142z M-252-138.2c0.3,0.2,0.7,0.3,1.3,0.3 c0.6,0,1.2-0.1,1.5-0.2c0.1,0,0.1,0,0.1,0c0.1,0,0.1,0,0.2,0.1c0.1,0.2,0.1,0.6,0.1,0.9c0,0.1,0,0.2-0.2,0.2 c-0.3,0.1-0.9,0.1-1.5,0.1c-1.2,0-2-0.2-2.4-0.7c-0.2-0.2-0.3-0.4-0.4-0.7c-0.1-0.1-0.1-0.3-0.1-0.4c0-0.2,0.3-0.4,0.8-0.5 C-252.4-138.6-252.3-138.4-252-138.2z M-249.2-141.1c-0.2,0-0.6,0-1,0c-0.7,0-1.1,0-1.9,0.2c0,0,0,0-0.1,0c-0.1,0-0.1,0-0.1-0.1 c0-0.1-0.1-0.6-0.1-0.8c0-0.1,0-0.2,0.1-0.2c0,0,0.1,0,0.3-0.1c0.7-0.1,1.2-0.2,1.9-0.2c0.6,0,0.9,0,1,0.1c0,0,0.1,0.1,0.1,0.5 c0,0.3,0,0.5,0,0.6C-249-141.1-249.1-141.1-249.2-141.1C-249.1-141.1-249.2-141.1-249.2-141.1z"/> <path d="M216.7-141.5c-0.1,0-0.1,0-0.2,0.1c0,0-0.1,0-0.1,0c-0.2,0-0.4-0.4-0.5-1.1c0.1,0,0.2,0,0.2,0c0.4,0,1.5-0.1,2.1-0.3 c0.2-0.9,0.3-1.5,0.3-2c0,0,0-0.1,0-0.2c0.4,0.1,0.8,0.1,1.1,0.2c0.2,0.1,0.2,0.2,0.2,0.2c0,0.1,0,0.1-0.1,0.2 c-0.2,0.3-0.2,0.3-0.5,1.4c0.2,0,0.5-0.1,0.7-0.1c0.4,0,0.7,0.1,1,0.2c0.4,0.3,0.6,0.9,0.6,1.8c0,1.5-0.3,2.8-0.7,3.4 c-0.3,0.4-0.7,0.6-1.3,0.6c-0.4,0-0.7-0.1-0.8-0.1c-0.1-0.1-0.1-0.1-0.1-0.4c0-0.3-0.1-0.5-0.2-0.8c0.5,0.2,0.7,0.2,1,0.2 c0.5,0,0.7-0.2,0.9-1c0.2-0.5,0.2-1.2,0.2-2c0-0.8-0.2-1.1-0.7-1.1c-0.2,0-0.5,0-0.7,0.1c0,0.1,0,0.1-0.1,0.3 c-0.3,1-0.8,2.4-1.3,3.5c-0.5,1.1-0.7,1.3-0.8,1.3c-0.1,0-0.3-0.1-0.6-0.3c-0.2-0.1-0.3-0.2-0.3-0.3c0,0,0,0,0.4-0.7 c0.5-0.9,1.3-2.5,1.5-3.5C217.2-141.6,216.8-141.5,216.7-141.5z M221.8-142.6c0-0.1,0.1-0.2,0.4-0.4c0.2-0.1,0.3-0.2,0.4-0.2 c0.1,0,0.1,0,0.2,0.2c0.6,0.6,1.1,1.3,1.5,2c0.1,0.2,0.2,0.4,0.2,0.4c0,0.1,0,0.1-0.4,0.4c-0.2,0.2-0.4,0.3-0.5,0.3 c-0.1,0-0.1,0-0.2-0.2c-0.2-0.5-0.4-0.9-0.6-1.2c-0.3-0.4-0.3-0.5-0.9-1.1C221.9-142.6,221.8-142.6,221.8-142.6z"/> <path d="M228.4-143.1c0-0.3,0-0.7,0-0.9c0.5,0.1,0.8,0.1,1.1,0.2c0.2,0.1,0.3,0.1,0.3,0.3c0,0.1,0,0.1,0,0.2 c-0.1,0.3-0.2,0.7-0.2,1.6c0,1.3,0.1,2.1,0.3,2.7c0.1,0.5,0.4,0.7,0.6,0.7c0.4,0,0.8-0.5,1.1-1.6c0.2,0.5,0.3,0.7,0.5,1 c0,0.1,0.1,0.1,0.1,0.2c0,0.2-0.2,0.5-0.3,0.8c-0.4,0.6-0.9,0.9-1.4,0.9c-0.8,0-1.3-0.6-1.7-1.9c-0.2-0.8-0.3-1.8-0.3-3.2V-143.1z M234.4-142.9c0.1,0,0.1,0,0.2,0.1c0.5,0.5,1,1.3,1.3,2.1c0.2,0.5,0.4,1.2,0.4,1.5c0,0.1,0,0.1-0.3,0.3c-0.2,0.1-0.7,0.3-0.8,0.3 c-0.1,0-0.1-0.1-0.2-0.2c-0.1-0.8-0.3-1.3-0.6-2c-0.3-0.6-0.3-0.6-1-1.4C233.9-142.8,234.3-142.9,234.4-142.9z"/> <path d="M253.8-144.8c0.2,0.1,0.3,0.1,0.3,0.2c0,0.1,0,0.1-0.1,0.2c-0.1,0.3-0.2,0.8-0.2,1.5c-0.1,1.6-0.1,2.9-0.1,3.9 c0,0.3,0,0.6,0.1,0.7c0.1,0.3,0.5,0.5,1,0.5c0.9,0,1.8-0.4,2.5-1.1c0.4-0.3,0.6-0.6,1-1.2c0.1,0.3,0.1,0.5,0.4,1 c0,0.1,0.1,0.1,0.1,0.2c0,0.2-0.2,0.4-0.7,0.9c-1,0.9-2.1,1.4-3.2,1.4c-0.8,0-1.3-0.2-1.7-0.6c-0.4-0.4-0.5-0.9-0.5-1.9 c0-0.8,0-1.4,0.1-3.7c0-0.3,0-0.6,0-0.6c0-0.9,0-1.1-0.1-1.5C253.1-144.9,253.5-144.9,253.8-144.8z"/> <path d="M267.9-142.1c1,0,1.7,0.7,1.7,1.7c0,0.6-0.3,1.1-0.7,1.3c-0.3,0.2-0.8,0.3-1.3,0.3c-0.3,0-0.5,0-0.6-0.1 c-0.1,0-0.1-0.1-0.1-0.2c0-0.3-0.1-0.5-0.3-0.8c0.5,0.1,0.8,0.2,1.1,0.2c0.6,0,0.9-0.3,0.9-0.7c0-0.4-0.3-0.7-0.8-0.7 c-0.4,0-0.9,0.2-2.2,0.7c0.8,2.1,1.3,3.5,1.3,3.6c0,0.1-0.1,0.1-0.3,0.2c-0.3,0.1-0.5,0.2-0.6,0.2c-0.1,0-0.1,0-0.1-0.1 c-0.2-1-0.5-1.9-1.2-3.5c0,0,0,0-0.1,0c-0.3,0.2-0.6,0.3-0.8,0.5c-0.1,0.1-0.2,0.1-0.3,0.1c-0.1,0-0.2-0.1-0.3-0.2 c-0.1-0.1-0.4-0.6-0.5-0.8c0.5-0.1,0.9-0.2,1.5-0.5c-0.3-0.6-0.5-1-0.8-1.4c0.5-0.2,0.9-0.3,1.1-0.3c0.2,0,0.2,0.1,0.2,0.2 c0,0.3,0,0.3,0.4,1.1c0.5-0.2,0.8-0.3,1.4-0.5c0,0,0,0,0-0.1c-0.2-0.3-0.4-0.5-0.7-0.8c0,0-0.1-0.1-0.1-0.1c0-0.1,0-0.1,0.2-0.3 c0.2-0.2,0.4-0.3,0.4-0.3c0.2,0,0.9,0.7,0.9,0.9c0,0.1-0.2,0.3-0.5,0.5C267.3-142.1,267.6-142.1,267.9-142.1z"/> <path d="M-129,291.3c1.6,0,3.5-0.2,5.3-0.7c0.1,0,0.2,0,0.2,0c0.1,0,0.2,0.1,0.2,0.3c0.1,0.4,0.1,1.1,0.1,1.7c0,0.4,0,0.5-0.2,0.6 c-0.6,0.3-3.3,0.6-5.6,0.6c-3,0-4.7-0.5-6.1-1.8c-0.7-0.6-1.3-1.7-1.3-2.1c0-0.3,0.2-0.4,1.8-1.4 C-133.9,290.5-132.3,291.3-129,291.3z M-128.8,279.8c1.2,0,1.8,0,3.2-0.2c0,0,0.1,0,0.1,0c0.2,0,0.2,0.1,0.3,0.2 c0,0.2,0.1,0.8,0.1,1.6c0,0.5,0,0.6-0.2,0.7c-0.2,0.1-1.9,0.2-3.2,0.2c-1.8,0-3.3-0.1-4.9-0.5c-1.1-0.2-1.2-0.3-1.2-1 c0-0.5,0-1.2,0.1-1.8C-132.8,279.6-130.9,279.8-128.8,279.8z"/> <path d="M-109.6,290.4c-1,1.7-2.3,2.6-3.6,2.6c-2.1,0-3.6-2-3.6-4.9c0-3.2,1.6-5.9,4.3-7.3c1.3-0.7,2.8-1,4.7-1 c4.2,0,7.3,3,7.3,6.9c0,3.5-1.7,6-5,7.4c-0.7,0.3-1.2,0.4-1.4,0.4c-0.2,0-0.3-0.1-0.6-0.5c-0.3-0.5-0.7-0.9-1.3-1.3 c4.1-1.1,6-3,6-6.2c0-1.7-0.7-3.1-1.9-3.9c-0.7-0.5-1.3-0.7-2.4-0.9C-107.7,286-108.3,288.3-109.6,290.4z M-112.4,283.3 c-1.3,1.2-2.1,2.9-2.1,4.7c0,1.5,0.5,2.4,1.3,2.4c1,0,2-1.4,2.8-3.8c0.5-1.5,0.7-2.6,1-4.9C-110.8,282.1-111.5,282.5-112.4,283.3z" /> <path d="M-90.6,283.7c1-1.1,1.2-1.3,1.5-1.6c0.4-0.3,0.7-0.4,1.3-0.4c0.6,0,0.9,0.1,1.4,0.4c0.3,0.2,0.3,0.2,1.6,1.5 c1.3,1.3,3.1,3,4.6,4.1c1,0.8,1.6,1.2,2.9,2c0.2,0.1,0.3,0.2,0.3,0.3c0,0.1-0.2,0.5-0.6,1.2c-0.5,0.8-0.7,1.1-0.9,1.1 c-0.1,0-0.2,0-0.3-0.1c-2.5-1.8-4.9-3.9-7.6-6.8c-1-1.1-1.1-1.1-1.4-1.1c-0.2,0-0.4,0.1-0.6,0.3c-0.2,0.2-1.4,1.8-2.1,2.7 c-0.5,0.7-0.5,0.7-1,1.2c-0.3,0.3-0.4,0.4-0.5,0.6c-0.1,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.6-0.3-1.1-0.8c-0.3-0.4-0.5-0.6-1-1.3 C-93.4,286.9-92.7,286.1-90.6,283.7z M-78.8,281.8c0,1.2-0.9,2.1-2.1,2.1c-1.2,0-2.1-0.9-2.1-2.1s0.9-2.1,2.1-2.1 C-79.8,279.7-78.8,280.6-78.8,281.8z M-82,281.8c0,0.6,0.5,1.1,1.1,1.1c0.6,0,1.1-0.5,1.1-1.1s-0.5-1.1-1.1-1.1 C-81.5,280.8-82,281.2-82,281.8z"/> <path d="M-64.6,285.2c3.7,0,5.8,0,7.8-0.2c0.1,0,0.2,0,0.3,0c0.6,0,0.6,0,0.6,1.6c0,0.8-0.1,1-0.4,1c0,0-0.1,0-0.1,0 c-1.3-0.1-2.1-0.1-7.8-0.1c-2.1,0-3.2,0-5,0.1c-0.1,0-0.3,0-0.6,0c-0.6,0-0.7,0-1.1,0.1c-0.1,0-0.2,0-0.2,0c-0.2,0-0.4-0.1-0.4-0.3 c-0.1-0.5-0.2-1.5-0.2-2.4C-70.2,285.1-68.8,285.2-64.6,285.2z"/> <path d="M-44.3,286.9c-0.3,0.4-0.4,0.5-0.5,0.5c-0.1,0-0.1,0-1-0.6c-0.7-0.5-1.6-0.9-3-1.4c-0.3-0.1-0.4-0.2-0.4-0.3 c0-0.1,0.2-0.4,0.5-1c0.1-0.2,0.2-0.3,0.2-0.4c0.2-0.4,0.3-0.5,0.5-0.5c0.3,0,1.8,0.6,2.9,1.1c0.6,0.3,1.4,0.7,1.5,0.9 c0.1,0.1,0.1,0.1,0.1,0.2C-43.5,285.6-43.8,286.1-44.3,286.9z M-34,284.6c0.1,0.2,0.1,0.3,0.1,0.4c0,0.3-0.1,0.4-0.5,0.8 c-1.7,1.8-3.4,3.3-5.4,4.7c-1.7,1.2-3.7,2.2-5.7,3.1c-0.6,0.2-0.8,0.3-1,0.5c-0.2,0.1-0.2,0.2-0.3,0.2c-0.4,0-1.1-1.1-1.7-2.7 c1.9-0.3,4.2-1.3,6.5-2.7c1.4-0.9,3.2-2.2,4.4-3.3c1.1-1,1.7-1.8,2.9-3.4C-34.5,283.2-34.4,283.5-34,284.6z M-42.4,282.9 c-0.3,0.3-0.4,0.4-0.5,0.4c-0.1,0-0.2,0-0.3-0.2c-1.2-1.1-2.4-1.8-3.7-2.3c-0.2-0.1-0.3-0.2-0.3-0.3c0-0.1,0-0.1,0.1-0.3 c1-1.5,1-1.5,1.2-1.5c0.4,0,2.1,0.8,3.2,1.6c1,0.6,1.2,0.8,1.2,1C-41.4,281.5-41.9,282.3-42.4,282.9z M-35.7,281.6 c-0.5-0.8-0.9-1.4-1.5-2c-0.1-0.1-0.1-0.1-0.1-0.2c0-0.1,0.1-0.3,0.5-0.5c0.3-0.2,0.4-0.3,0.6-0.3c0.2,0,0.4,0.2,0.9,0.7 c0.6,0.7,1.1,1.3,1.1,1.5c0,0.2-0.9,0.9-1.2,0.9C-35.6,281.8-35.7,281.7-35.7,281.6z M-32.9,280.1c-0.3,0.2-0.4,0.3-0.5,0.3 c-0.1,0-0.1,0-0.2-0.2c-0.5-0.9-0.9-1.3-1.5-2c-0.1-0.1-0.1-0.1-0.1-0.1c0-0.2,0.8-0.7,1-0.7c0.2,0,0.4,0.2,0.8,0.7 c0.6,0.6,1.1,1.3,1.1,1.5C-32.3,279.7-32.5,279.8-32.9,280.1z"/> <path d="M-22.1,289.8c0.1,0.1,0.1,0.1,0.1,0.2c0,0.1,0,0.1-0.3,1c-0.4,1.2-0.7,2.2-0.8,3c0,0.3-0.1,0.4-0.4,0.4 c-0.3,0.1-0.8,0.1-1.3,0.1c-0.2,0-0.3,0-0.4-0.2c-0.2-0.4-0.5-1.8-0.7-2.9c-0.1-0.9-0.2-1.9-0.2-2.9c0-2.3,0.3-4.5,1-8.4 c0.1-0.6,0.2-0.9,0.2-1.6c0.9,0.1,1.6,0.3,2.1,0.6c0.3,0.2,0.4,0.3,0.4,0.5c0,0.1,0,0.2-0.1,0.4c-0.8,1.4-1.6,5.7-1.6,8.9 c0,0.5,0,1.2,0.1,2.2c0.5-1.2,0.7-1.8,1.1-2.8C-22.7,289-22.5,289.2-22.1,289.8z M-18.8,284.5c-1,0-1.2,0-1.2-0.3 c-0.1-0.2-0.1-0.8-0.1-1.3c0-0.2,0-0.3,0-0.7c0.5,0,0.9,0.1,1.5,0.1c1.1,0,1.8,0,2.8-0.1c0-2.5,0-2.9-0.2-3.8c1,0,1.7,0.1,2.4,0.3 c0.3,0.1,0.4,0.2,0.4,0.4c0,0.1,0,0.1-0.1,0.3c-0.2,0.5-0.3,1.2-0.3,2.6c0.7-0.1,1.4-0.2,2.6-0.5c0.1,0,0.1,0,0.2,0 c0.1,0,0.2,0.1,0.2,0.2c0,0.2,0.1,0.9,0.1,1.4c0,0.5,0,0.6-0.2,0.7c-0.3,0.2-1.2,0.3-2.9,0.5c0,1.4,0.1,3.7,0.3,5 c1.3,0.5,2.1,1,3,1.6c0.6,0.4,0.7,0.5,0.7,0.7c0,0.2-0.4,0.9-0.8,1.5c-0.2,0.3-0.4,0.4-0.5,0.4c-0.1,0-0.1,0-0.6-0.4 c-0.4-0.4-0.9-0.8-1.8-1.4c0,0.1,0,0.1,0,0.2c0,1.8-1.5,2.9-3.7,2.9c-2.3,0-3.7-1.2-3.7-3c0-1.8,1.5-3.1,3.5-3.1 c0.7,0,1.1,0,1.7,0.1c-0.1-1.6-0.1-1.6-0.1-4.2C-16.6,284.5-18,284.5-18.8,284.5z M-17.1,290.4c-1,0-1.7,0.5-1.7,1.2 c0,0.6,0.6,1,1.6,1c1.1,0,1.6-0.5,1.6-1.4c0-0.3,0-0.5,0-0.5C-16.1,290.5-16.6,290.4-17.1,290.4z"/> <path d="M0.1,290.3c-0.4,2.2-1,3.6-2.4,5c-0.6-0.6-1.1-1-1.9-1.5c1.7-1.4,2.4-3.5,2.4-7.3c0-0.8,0-1.2-0.1-1.7 c0.6,0.1,0.9,0.1,1.9,0.1h10.1c1.1,0,1.3,0,1.9-0.1c-0.1,0.5-0.1,0.9-0.1,1.7v2.8c0,0.9,0,1.4,0.1,2H9.8v-1H0.1z M3.7,279 c0-0.7,0-1.1-0.1-1.5H6c-0.1,0.4-0.1,0.8-0.1,1.5v0.1h5.4c1,0,1.8,0,2.3-0.1v2c-0.7-0.1-1.3-0.1-2.2-0.1H5.9v1.2h4.5 c1,0,1.6,0,2-0.1v1.9c-0.6-0.1-1.2-0.1-2.1-0.1H-0.4c-0.9,0-1.4,0-2,0.1V282c0.4,0.1,1,0.1,2,0.1h4.1v-1.2h-4.9c-1,0-1.7,0-2.3,0.1 v-2c0.5,0.1,1.2,0.1,2.3,0.1h4.8V279z M3.9,288.6v-1.9H0.3c0,0.8,0,1.3-0.1,1.9H3.9z M9.8,288.6v-1.9H6v1.9H9.8z"/> <path d="M21.6,285.4c-0.2,0-0.2,0.1-0.4,0.1c-0.1,0.1-0.2,0.1-0.2,0.1c-0.4,0-0.8-0.8-1-2.2c0.2,0,0.3,0,0.4,0c0.8,0,3-0.3,4.3-0.5 c0.4-1.7,0.6-3.1,0.6-4c0-0.1,0-0.2,0-0.3c0.9,0.1,1.7,0.3,2.2,0.5c0.3,0.1,0.5,0.3,0.5,0.5c0,0.1,0,0.2-0.1,0.3 c-0.3,0.5-0.3,0.5-0.9,2.7c0.5-0.1,1-0.1,1.4-0.1c0.8,0,1.5,0.2,1.9,0.5c0.8,0.6,1.2,1.8,1.2,3.6c0,3-0.5,5.5-1.5,6.8 c-0.6,0.9-1.5,1.3-2.7,1.3c-0.7,0-1.4-0.1-1.6-0.2c-0.2-0.1-0.2-0.1-0.2-0.8c-0.1-0.5-0.2-1-0.4-1.6c1,0.4,1.3,0.4,1.9,0.4 c1,0,1.4-0.5,1.8-2.1c0.3-1.1,0.5-2.4,0.5-3.9c0-1.6-0.4-2.1-1.4-2.1c-0.4,0-0.9,0.1-1.4,0.1c-0.1,0.2-0.1,0.3-0.2,0.5 c-0.6,2.1-1.6,4.7-2.6,6.9c-1.1,2.2-1.3,2.6-1.6,2.6c-0.2,0-0.7-0.3-1.3-0.7c-0.5-0.3-0.6-0.4-0.6-0.6c0-0.1,0-0.1,0.8-1.4 c1.1-1.7,2.5-5,3-7C22.6,285.2,21.7,285.3,21.6,285.4z M34.1,281.3c-0.3,0.2-0.5,0.3-0.6,0.3c-0.1,0-0.1,0-0.2-0.1 c-0.4-0.7-1.1-1.5-1.7-2c0,0-0.1-0.1-0.1-0.1c0-0.1,0.1-0.2,0.5-0.5c0.3-0.2,0.4-0.3,0.6-0.3c0.3,0,2.1,1.8,2.1,2.1 C34.7,280.9,34.5,281,34.1,281.3z M32,283.4c0-0.1,0.2-0.3,0.8-0.8c0.4-0.3,0.6-0.4,0.8-0.4c0.3,0,1.2,1,2,2.1 c0.7,1,1.5,2.4,1.5,2.8c0,0.2-0.1,0.3-0.7,0.8c-0.4,0.3-0.9,0.6-1,0.6c-0.1,0-0.2-0.1-0.3-0.4c-0.4-1-0.7-1.6-1.3-2.5 c-0.5-0.9-0.6-0.9-1.5-1.9C32,283.6,32,283.5,32,283.4z M34.6,277.3c0.3,0,2,1.7,2,2c0,0.1-0.1,0.2-0.5,0.5 c-0.4,0.3-0.5,0.4-0.6,0.4c-0.1,0-0.1,0-0.5-0.6c-0.3-0.5-1-1.1-1.3-1.4c-0.1-0.1-0.1-0.1-0.1-0.2 C33.6,277.9,34.4,277.3,34.6,277.3z"/> <path d="M50.2,279.5c0-0.9,0-1.4-0.1-1.9h2.4c-0.1,0.6-0.1,1-0.1,1.9v4.2h4.1v-3.1c0-0.6,0-1-0.1-1.5h2.3c-0.1,0.6-0.1,1-0.1,1.7 v3.8c0,0.5,0,0.9,0.1,1.2c-0.4,0-0.9-0.1-1.4-0.1h-4.9v6.3h4.7v-3.2c0-0.7,0-1.2-0.1-1.7h2.3c-0.1,0.5-0.1,1.1-0.1,1.8v4.1 c0,0.9,0,1.4,0.1,1.9h-2.2v-1H45.7v1h-2.3c0.1-0.6,0.1-1.1,0.1-1.9v-4c0-0.8,0-1.3-0.1-1.8h2.3c-0.1,0.5-0.1,0.9-0.1,1.6v3.1h4.5 v-6.3h-4.6c-0.5,0-1,0-1.4,0.1c0-0.5,0.1-0.8,0.1-1.2v-3.8c0-0.7,0-1.2-0.1-1.7h2.3c-0.1,0.4-0.1,0.9-0.1,1.5v3.1h3.8V279.5z"/> <path d="M72.6,285c0-1,0-1-0.1-2.2c-0.2,0-0.4,0-0.4,0c-1.3,0-3-0.1-3.7-0.3c-0.2-0.1-0.2-0.1-0.2-0.3c0-0.4,0.1-1,0.2-1.8 c1.1,0.2,2.5,0.4,3.7,0.4c0.1,0,0.3,0,0.5,0v-1.3c0-0.7,0-1-0.1-1.7c1,0.1,1.7,0.1,2.2,0.2c0.4,0.1,0.5,0.2,0.5,0.4 c0,0.1,0,0.1-0.2,0.5c-0.1,0.3-0.2,0.4-0.2,1.8c1.2-0.1,2.2-0.3,3.1-0.6c0.1,0,0.1,0,0.1,0c0.1,0,0.1,0,0.4,0.7 c0.1,0.4,0.3,0.9,0.3,1.1c0,0.1-0.1,0.2-0.3,0.3c-0.7,0.2-2.4,0.5-3.6,0.7c0,1.4,0,1.5,0,2.2c1.4-0.2,2.2-0.4,3.7-1 c0.1,0,0.1-0.1,0.2-0.1c0.1,0,0.2,0.1,0.4,0.5c0.2,0.5,0.4,1.1,0.4,1.3c0,0.1-0.1,0.2-0.2,0.2c-1.1,0.4-3.1,0.9-4.4,1 c0,0.8,0.1,1.2,0.2,2.7c1.1,0.3,1.6,0.5,2.4,1c1,0.5,1.5,0.8,2.3,1.5c0.2,0.1,0.2,0.2,0.2,0.4c0,0.1-0.2,0.5-0.6,1.1 c-0.4,0.7-0.7,0.9-0.8,0.9c-0.1,0-0.1,0-0.2-0.1c-1.2-1.1-2-1.7-3.3-2.4c-0.1,1-0.3,1.5-0.8,2c-0.7,0.7-1.8,1-3.2,1 c-2.5,0-4-1.1-4-2.8c0-0.8,0.3-1.5,0.9-2c0.8-0.7,2-1.1,3.5-1.1c0.5,0,0.9,0,1.4,0.1c-0.1-1.3-0.1-1.8-0.2-2.2c-0.5,0-0.7,0-1,0 c-1.4,0-3.1-0.2-4-0.5c-0.2-0.1-0.3-0.2-0.3-0.3c0-0.3,0.1-0.9,0.3-1.8c1.2,0.3,2.8,0.5,4.3,0.5c0,0,0.1,0,0.4,0H72.6z M71.2,291.1 c-1.3,0-2,0.4-2,1.1c0,0.6,0.6,0.9,1.7,0.9c1.3,0,1.9-0.5,1.9-1.5c0-0.1,0-0.3,0-0.3C72.3,291.1,71.9,291.1,71.2,291.1z"/> <path d="M94.2,282.7c-4.4,0.3-6.1,0.5-7.3,0.8c-0.1,0-0.2,0-0.2,0c-0.1,0-0.3-0.1-0.3-0.3c-0.2-0.5-0.3-1.2-0.3-2.2 c0.2,0,0.4,0,0.5,0c0.6,0,1.2,0,3.2-0.1c1.5-0.1,2.7-0.1,4.5-0.2c0-1.8,0-2.1-0.2-3c1.5,0,2.3,0.1,2.6,0.2c0.1,0.1,0.2,0.2,0.2,0.4 c0,0,0,0.1-0.1,0.2c-0.2,0.4-0.2,0.9-0.3,2.1c2.9-0.1,3.4-0.1,5.4-0.1c0.5,0,0.6,0,0.7,0.1c0.1,0.1,0.1,0.4,0.1,1.1 c0,0.9,0,1-0.3,1c0,0,0,0-0.1,0c-0.9-0.1-3-0.2-4.4-0.2c-0.5,0-0.5,0-1.5,0l0,3.3c0.3,0.7,0.4,1.2,0.4,2.2c0,2.5-0.9,4.4-2.9,5.8 c-0.8,0.6-1.8,1.1-2.2,1.1c-0.2,0-0.3-0.1-0.4-0.2c-0.6-0.6-1-1-1.7-1.4c1.2-0.3,1.8-0.6,2.6-1.1c0.6-0.4,1.1-0.8,1.5-1.2 c0.3-0.3,0.5-0.6,0.8-1.3c-0.6,0.6-1.1,0.8-1.8,0.8c-1.7,0-2.8-1.3-2.8-3.2c0-2,1.3-3.5,3.1-3.5c0.6,0,0.9,0.1,1.3,0.3V282.7z M91.8,287.4c0,0.8,0.5,1.4,1.2,1.4c0.8,0,1.2-0.5,1.2-1.5c0-0.9-0.4-1.5-1.2-1.5C92.3,285.9,91.8,286.5,91.8,287.4z"/> <path d="M-0.7,270.7c0.8,0,1.7-0.1,2.6-0.3c0,0,0.1,0,0.1,0c0.1,0,0.1,0,0.1,0.1c0,0.2,0,0.5,0,0.9c0,0.2,0,0.3-0.1,0.3 c-0.3,0.2-1.6,0.3-2.8,0.3c-1.5,0-2.4-0.2-3.1-0.9c-0.3-0.3-0.7-0.8-0.7-1.1c0-0.2,0.1-0.2,0.9-0.7C-3.2,270.3-2.3,270.7-0.7,270.7 z M-0.6,264.9c0.6,0,0.9,0,1.6-0.1c0,0,0.1,0,0.1,0c0.1,0,0.1,0,0.1,0.1c0,0.1,0,0.4,0,0.8c0,0.2,0,0.3-0.1,0.4 c-0.1,0-1,0.1-1.6,0.1c-0.9,0-1.6-0.1-2.5-0.2c-0.6-0.1-0.6-0.1-0.6-0.5c0-0.2,0-0.6,0.1-0.9C-2.6,264.8-1.7,264.9-0.6,264.9z"/> <path d="M10.2,269c0.2-0.1,0.4-0.1,0.6-0.1c0.7,0,1,0.4,1.1,1.4c0.1,0.6,0.1,0.7,0.2,0.8c0.1,0.1,0.3,0.2,0.7,0.2 c0.5,0,0.7,0,1.5-0.3c0,0,0,0,0.1,0c0.1,0,0.1,0,0.1,0.1c0.1,0.2,0.1,0.7,0.1,1c0,0.1,0,0.1-0.1,0.2c-0.3,0.1-1.2,0.1-1.8,0.1 c-0.9,0-1.3-0.2-1.6-0.6c-0.2-0.3-0.2-0.6-0.3-1.2c-0.1-0.8-0.2-1-0.6-1c-0.4,0-0.6,0.2-1.2,0.8c-0.6,0.6-1.1,1.2-1.4,1.7 c-0.1,0.1-0.1,0.2-0.2,0.2c-0.1,0-0.1-0.1-0.5-0.4c-0.3-0.3-0.4-0.5-0.4-0.5c0-0.1,0-0.1,0.2-0.2C7,271,7,271,10.7,267 c-1.6,0.3-2.6,0.5-2.9,0.6c-0.1,0-0.2,0.1-0.2,0.1c-0.1,0-0.1,0-0.2-0.2c-0.1-0.3-0.2-0.6-0.2-1c0.2,0,0.3,0,0.3,0 c0.4,0,1.7-0.1,2.8-0.3c0.8-0.1,1-0.1,1.2-0.2c0.1,0,0.1,0,0.2,0c0.2,0,0.8,0.6,0.8,0.9c0,0.1,0,0.2-0.2,0.2 c-0.1,0.1-0.4,0.2-0.5,0.3c-0.1,0.1-0.4,0.4-0.5,0.5L10.2,269z M9,264c0-0.1,0.1-0.2,0.1-0.2c0,0,0.1,0,0.1,0 c0.4,0.1,0.8,0.2,1.2,0.3c0.6,0.1,0.7,0.1,1.8,0.2c0.1,0,0.1,0,0.1,0.3c0,0.3,0,0.7-0.1,0.8c0,0.1-0.1,0.1-0.1,0.1 s-1.1-0.1-1.3-0.1c-0.7-0.1-1.4-0.3-1.9-0.5c-0.1,0-0.1-0.1-0.1-0.1C8.8,264.7,8.9,264.4,9,264z"/> <path d="M47.8,265.8c-0.3,0.1-0.4,0.1-0.7,0.2c-0.1,0-0.2,0.1-0.3,0.1c-0.2,0-0.4-0.4-0.6-1.3c0.6,0,0.9-0.1,2-0.2 c1.2-0.2,2.7-0.4,3.5-0.5c0.9-0.1,1.6-0.2,2-0.3c0.1,0,0.1,0,0.2,0c0.1,0,0.2,0.1,0.3,0.3c0.1,0.2,0.1,0.5,0.1,0.6 c0,0.1,0,0.2-0.2,0.2c-0.2,0-0.4,0-0.6,0c-1.7,0.3-3,1.8-3,3.3c0,1.2,0.9,1.9,2.5,2.1c0.1,0,0.2,0.1,0.2,0.2c0,0.2-0.1,0.7-0.2,1 c0,0.1-0.1,0.2-0.3,0.2c-0.1,0-0.4-0.1-0.7-0.2c-1.7-0.5-2.6-1.6-2.6-3.1c0-0.8,0.3-1.6,0.8-2.3c0.3-0.4,0.5-0.6,1.1-0.9 C49.9,265.4,48.6,265.6,47.8,265.8z M52.9,266.1c0.1,0,1,1,1,1.1c0,0.1-0.1,0.1-0.2,0.3c-0.2,0.2-0.2,0.2-0.3,0.2c0,0,0,0-0.1,0 c0,0,0,0-0.2-0.3c-0.2-0.2-0.3-0.5-0.7-0.8c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0.2-0.2,0.2-0.2C52.8,266.1,52.8,266.1,52.9,266.1 C52.8,266.1,52.9,266.1,52.9,266.1L52.9,266.1L52.9,266.1z M54.6,266.8c-0.2,0.1-0.2,0.2-0.3,0.2c0,0-0.1,0-0.1-0.1 c-0.3-0.5-0.5-0.6-0.8-1c0,0,0-0.1,0-0.1c0,0,0.1-0.1,0.2-0.2c0.1-0.1,0.3-0.2,0.3-0.2c0.1,0,0.2,0.1,0.4,0.3 c0.3,0.3,0.6,0.7,0.6,0.8C54.9,266.5,54.8,266.6,54.6,266.8z"/> <path d="M123.2,291.9h-3c-1.1,0-2-0.9-2-2v-6c0-1.1,0.9-2,2-2h3V291.9z"/> <rect x="136.2" y="282.9" width="2" height="8"/> <rect x="141.2" y="280.9" width="2" height="12"/> <rect x="146.2" y="278.9" width="2" height="16"/> <polygon points="131.2,296.9 123.2,291.9 123.2,281.9 131.2,276.9 	"/> </g> </svg>';
	
	Config.Loading.SVG.Button = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100"> <style type="text/css"> .st0{fill:none;stroke:#000000;stroke-width:5.5;stroke-miterlimit:10;} </style> <path fill="none" stroke="#000000" stroke-width="5.5" stroke-miterlimit="10" d="M5,22.5c27.6,0,52.6,11.2,70.7,29.3 s29.3,43,29.3,70.7s-11.2,52.6-29.3,70.7S32.6,222.5,5,222.5s-52.6-11.2-70.7-29.3S-95,150.1-95,122.5s11.2-52.6,29.3-70.7 S-22.6,22.5,5,22.5z"/> <g> <path d="M0.7,113c0-0.4,0.3-0.6,0.6-0.6h6.6c6.5,0,10.7,4.5,10.7,11v0.3c0,6.5-4.2,11-10.7,11H1.3c-0.4,0-0.6-0.3-0.6-0.6V113z M5.3,116.5v14h2.6c3.5,0,5.9-2.5,5.9-6.9v-0.2c0-4.4-2.4-6.9-5.9-6.9H5.3z"/> <path d="M62.6,123.7v-0.3c0-6.6,4.4-11.4,10.4-11.4c2.9,0,4.9,0.8,6.8,2.2c0.3,0.2,0.3,0.6,0.1,0.9l-2,2.6 c-0.2,0.3-0.6,0.3-0.9,0.1c-1.1-0.9-2.3-1.5-4.1-1.5c-3.2,0-5.6,2.9-5.6,7v0.3c0,4.6,2.5,7.2,5.8,7.2c1.3,0,2.5-0.3,3.3-0.9v-4 h-3.4c-0.4,0-0.6-0.3-0.6-0.6v-2.7c0-0.4,0.3-0.6,0.6-0.6h7.2c0.4,0,0.6,0.3,0.6,0.6v9.4c0,0.2-0.1,0.4-0.3,0.5 c-2,1.4-4.5,2.6-7.7,2.6C67,135,62.6,130.7,62.6,123.7z"/> <path d="M-70.3,112.3h3.4c0.4,0,0.6,0.3,0.6,0.6v17.5h8.4c0.4,0,0.6,0.3,0.6,0.6v3c0,0.4-0.3,0.6-0.6,0.6h-12.4 c-0.4,0-0.6-0.3-0.6-0.6V113C-70.9,112.6-70.6,112.3-70.3,112.3z"/> <path d="M-53.3,123.6L-53.3,123.6c0-6.4,5-11.6,11.9-11.6c6.9,0,11.8,5.1,11.8,11.5v0.1c0,6.3-5,11.6-11.9,11.6 S-53.3,129.9-53.3,123.6z M-34.5,123.6L-34.5,123.6c0-4-2.9-7.2-6.9-7.2s-6.8,3.2-6.8,7.1v0.1c0,3.9,2.9,7.2,6.9,7.2 C-37.3,130.7-34.5,127.5-34.5,123.6z"/> <path d="M-17.4,112.2h3.5c0.3,0,0.5,0.2,0.6,0.4l7.6,21.2c0.1,0.4-0.2,0.9-0.6,0.9h-3.4c-0.3,0-0.5-0.2-0.6-0.4l-1.5-4.4h-7.7 l-1.5,4.4c-0.1,0.3-0.3,0.4-0.6,0.4H-25c-0.4,0-0.8-0.4-0.6-0.9l7.6-21.2C-17.9,112.4-17.7,112.2-17.4,112.2z M-13.3,125.7 l-2.4-7.3l-2.5,7.3H-13.3z"/> <path d="M26.3,112.3h3.4c0.4,0,0.6,0.3,0.6,0.6V134c0,0.4-0.3,0.6-0.6,0.6h-3.4c-0.4,0-0.6-0.3-0.6-0.6V113 C25.7,112.6,26,112.3,26.3,112.3z"/> <path d="M38.9,112.3h3.3c0.2,0,0.4,0.1,0.5,0.3l8.4,12.7V113c0-0.4,0.3-0.6,0.6-0.6H55c0.4,0,0.6,0.3,0.6,0.6V134 c0,0.4-0.3,0.6-0.6,0.6h-3c-0.2,0-0.4-0.1-0.5-0.3l-8.6-13.2V134c0,0.4-0.3,0.6-0.6,0.6h-3.3c-0.4,0-0.6-0.3-0.6-0.6V113 C38.3,112.6,38.6,112.3,38.9,112.3z"/> </g> <g> <path d="M-23.8,104.2h5.3c0.6,0,1,0.4,1,1v27.4h13.2c0.6,0,1,0.4,1,1v4.7c0,0.6-0.4,1-1,1h-19.4c-0.6,0-1-0.4-1-1v-33 C-24.8,104.6-24.3,104.2-23.8,104.2z"/> <path d="M50,125.4l-10.6-19.7c-0.4-0.7,0.1-1.5,0.9-1.5h5.9c0.4,0,0.7,0.2,0.9,0.6l6.6,13.2l6.7-13.2c0.2-0.3,0.5-0.5,0.9-0.5H67 c0.8,0,1.2,0.8,0.9,1.5l-10.6,19.6v12.9c0,0.6-0.4,1-1,1H51c-0.6,0-1-0.4-1-1V125.4z"/> <path d="M18,104h5.5c0.4,0,0.8,0.3,0.9,0.7l11.8,33.2c0.2,0.7-0.3,1.3-0.9,1.3H30c-0.4,0-0.8-0.3-0.9-0.7l-2.4-6.9H14.6l-2.3,6.9 c-0.1,0.4-0.5,0.7-0.9,0.7H6.2c-0.7,0-1.2-0.7-0.9-1.3l11.8-33.2C17.2,104.3,17.6,104,18,104z M24.5,125.2l-3.8-11.4l-3.9,11.4 H24.5z"/> <path d="M-59,105.2c0-0.6,0.4-1,1-1h10.7c7.8,0,12.8,4.6,12.8,12v0.1c0,8.1-5.8,12.1-13.1,12.3h-4.1v9.7c0,0.6-0.4,1-1,1H-58 c-0.6,0-1-0.4-1-1V105.2z M-47.7,122c3.8,0,5.9-2.4,5.9-5.6v0c0-3.7-2.1-5.7-6-5.7h-4V122H-47.7z"/> </g> </svg>';
	
	module.exports = Config;


/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	var MorphablePath, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Utils = __webpack_require__(2);
	
	MorphablePath = (function(superClass) {
	  extend(MorphablePath, superClass);
	
	  function MorphablePath(pathes, morph) {
	    var j, k, len, len1, path, ref, ref1, segmant, segments;
	    if (morph == null) {
	      morph = 0;
	    }
	    this.update = bind(this.update, this);
	    this.pathes = pathes;
	    this.morph = morph;
	    Utils.transformInit(this);
	    ref = this.pathes;
	    for (j = 0, len = ref.length; j < len; j++) {
	      path = ref[j];
	      Utils.transformInit(path);
	    }
	    segments = [];
	    ref1 = this.pathes[0].segments;
	    for (k = 0, len1 = ref1.length; k < len1; k++) {
	      segmant = ref1[k];
	      segments.push(segmant.clone());
	    }
	    MorphablePath.__super__.constructor.call(this, segments);
	    this.checkVertices();
	    if (this.pathes[0].closed) {
	      this.closed = true;
	    }
	    this.update();
	    return;
	  }
	
	  MorphablePath.prototype.checkVertices = function() {
	    var j, len, path, ref;
	    ref = this.pathes;
	    for (j = 0, len = ref.length; j < len; j++) {
	      path = ref[j];
	      if (this.segments.length !== path.segments.length) {
	        alert("アンカーポイントの数が違います");
	        throw "アンカーポイントの数が違います";
	        break;
	      }
	    }
	  };
	
	  MorphablePath.prototype.update = function(morph) {
	    var _from, _to, fromIndex, i, j, len, p, ref, segment, toIndex;
	    if (morph == null) {
	      morph = this.morph;
	    }
	    if (this.pathes.length <= 1) {
	      return;
	    }
	    if (morph !== this.morph) {
	      this.morph = morph;
	    }
	    fromIndex = Math.floor(this.morph);
	    if (fromIndex < 0) {
	      fromIndex = 0;
	    } else if (fromIndex > this.pathes.length - 2) {
	      fromIndex = this.pathes.length - 2;
	    }
	    toIndex = fromIndex + 1;
	    _from = this.pathes[fromIndex];
	    _to = this.pathes[toIndex];
	    p = this.morph - fromIndex;
	    ref = this.segments;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      segment = ref[i];
	      segment.point.x = _from.segments[i].point.x + (_to.segments[i].point.x - _from.segments[i].point.x) * p + this.position.x;
	      segment.point.y = _from.segments[i].point.y + (_to.segments[i].point.y - _from.segments[i].point.y) * p + this.position.y;
	      segment.handleIn.x = _from.segments[i].handleIn.x + (_to.segments[i].handleIn.x - _from.segments[i].handleIn.x) * p;
	      segment.handleIn.y = _from.segments[i].handleIn.y + (_to.segments[i].handleIn.y - _from.segments[i].handleIn.y) * p;
	      segment.handleOut.x = _from.segments[i].handleOut.x + (_to.segments[i].handleOut.x - _from.segments[i].handleOut.x) * p;
	      segment.handleOut.y = _from.segments[i].handleOut.y + (_to.segments[i].handleOut.y - _from.segments[i].handleOut.y) * p;
	      if (p <= 0) {
	        if (_from.segments[i].handleIn.x === 0 && _from.segments[i].handleIn.y === 0) {
	          segment.handleIn.x = _from.segments[i].handleIn.x;
	          segment.handleIn.y = _from.segments[i].handleIn.y;
	        }
	        if (_from.segments[i].handleOut.x === 0 && _from.segments[i].handleOut.y === 0) {
	          segment.handleOut.x = _from.segments[i].handleOut.x;
	          segment.handleOut.y = _from.segments[i].handleOut.y;
	        }
	      }
	      if (p >= 1) {
	        if (_to.segments[i].handleIn.x === 0 && _to.segments[i].handleIn.y === 0) {
	          segment.handleIn.x = _to.segments[i].handleIn.x;
	          segment.handleIn.y = _to.segments[i].handleIn.y;
	        }
	        if (_to.segments[i].handleOut.x === 0 && _to.segments[i].handleOut.y === 0) {
	          segment.handleOut.x = _to.segments[i].handleOut.x;
	          segment.handleOut.y = _to.segments[i].handleOut.y;
	        }
	      }
	    }
	  };
	
	  MorphablePath.prototype.reset = function() {
	    this.morph = 0;
	    this.update();
	  };
	
	  return MorphablePath;
	
	})(paper.Path);
	
	module.exports = MorphablePath;


/***/ },

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	var Base, Config, CustomStroke, MorphablePath, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	MorphablePath = __webpack_require__(12);
	
	CustomStroke = __webpack_require__(14);
	
	Base = (function(superClass) {
	  extend(Base, superClass);
	
	  function Base(pathes, morph) {
	    var _fill, i, j, len, len1, path, ref, settings;
	    if (morph == null) {
	      morph = 0;
	    }
	    this.up = bind(this.up, this);
	    this.down = bind(this.down, this);
	    this.update = bind(this.update, this);
	    Base.__super__.constructor.call(this);
	    Utils.transformInit(this);
	    this.morph = morph;
	    this.baseSVG = this.importSVG(Config.SVG.BASE);
	    this.baseSVG.remove();
	    this.base = this.baseSVG.children[1];
	    this.pathes = [];
	    if (pathes != null) {
	      for (i = 0, len = pathes.length; i < len; i++) {
	        path = pathes[i];
	        this.pathes.push(path);
	      }
	    } else {
	      this.pathes = [this.base];
	    }
	    this.boneStroke = new MorphablePath(this.pathes, this.morph);
	    this.boneStroke.strokeWidth = 0.2;
	    this.boneStroke.strokeColor = new paper.Color(255, 0, 0, 1);
	    this.boneStroke.remove();
	    settings = [[1.0, 1.0], [0, 0], [2.75, 0], [2.75, 0], [0, 0], [1.0, 1.0]];
	    this.stroke = new CustomStroke(this.boneStroke, Config.LINE_WIDTH, settings);
	    this.stroke.strokeWidth = 0;
	    this.stroke.fillColor = new paper.Color(0, 0, 0, 1);
	    this.addChild(this.stroke);
	    this.fillPathes = [];
	    ref = this.pathes;
	    for (j = 0, len1 = ref.length; j < len1; j++) {
	      path = ref[j];
	      _fill = path.clone();
	      this.fillInit(_fill);
	      this.fillPathes.push(_fill);
	    }
	    this.fill = new MorphablePath(this.fillPathes, this.morph);
	    this.fill.strokeWidth = 0;
	    this.fill.fillColor = Config.COLOR.BASE_FILL;
	    this.insertChild(0, this.fill);
	    Utils.transformInit([this.boneStroke, this.fill, this.stroke]);
	    this.press = 0;
	    this.init();
	    return;
	  }
	
	  Base.prototype.fillInit = function(path) {
	    var last, vector;
	    path.segments.pop();
	    path.segments.shift();
	    path.closed = true;
	    vector = path.segments[0].point.subtract(path.segments[1].point);
	    vector.length = Config.LINE_WIDTH * 0.5;
	    path.segments[0].point = path.segments[0].point.add(vector);
	    last = path.segments.length - 1;
	    vector = path.segments[last].point.subtract(path.segments[last - 1].point);
	    vector.length = Config.LINE_WIDTH * 0.5;
	    path.segments[last].point = path.segments[last].point.add(vector);
	  };
	
	  Base.prototype.init = function() {
	    this._onInit();
	  };
	
	  Base.prototype.update = function() {
	    this._onUpdate();
	  };
	
	  Base.prototype.down = function() {
	    this._onDown();
	  };
	
	  Base.prototype.up = function() {
	    this._onUp();
	  };
	
	  Base.prototype.reset = function(morph) {
	    if (morph == null) {
	      morph = 0;
	    }
	    this.morph = morph;
	    this.press = 0;
	    this.position.set(0, 0);
	    this.boneStroke.visible = true;
	    this.boneStroke.opacity = 1;
	    this.boneStroke.position.set(0, 0);
	    this.boneStroke.update(this.morph);
	    this.boneStroke.strokeColor = Config.COLOR.BASE_PATH;
	    this.stroke.visible = true;
	    this.stroke.fillColor = new paper.Color(0, 0, 0, 1);
	    this.stroke.update();
	    this.fill.visible = true;
	    this.fill.opacity = 1;
	    this.fill.position.set(0, 0);
	    this.fill.update(this.morph);
	    this.fill.fillColor = Config.COLOR.BASE_FILL;
	  };
	
	  Base.prototype._onInit = function() {};
	
	  Base.prototype._onUpdate = function() {};
	
	  Base.prototype._onDown = function() {};
	
	  Base.prototype._onUp = function() {};
	
	  return Base;
	
	})(paper.Group);
	
	module.exports = Base;


/***/ },

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

	var CustomStroke, DEGREE_TO_RADIAN, RADIAN_TO_DEGREE, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Utils = __webpack_require__(2);
	
	RADIAN_TO_DEGREE = 180 / Math.PI;
	
	DEGREE_TO_RADIAN = Math.PI / 180;
	
	CustomStroke = (function(superClass) {
	  extend(CustomStroke, superClass);
	
	  function CustomStroke(path, width, settings) {
	    this.update = bind(this.update, this);
	    CustomStroke.__super__.constructor.call(this);
	    Utils.transformInit(this);
	    this.width = width;
	    this.path = path;
	    this.settings = settings;
	    this.update();
	    return;
	  }
	
	  CustomStroke.prototype.getCrossingPoint = function(point1, radian1, point2, radian2) {
	    var a1, a2, b1, b2, x, y;
	    a1 = Math.tan(radian1);
	    b1 = point1.y + (-point1.x * a1);
	    a2 = Math.tan(radian2);
	    b2 = point2.y + (-point2.x * a2);
	    x = (b1 - b2) / (a2 - a1);
	    y = (a2 * b1 - a1 * b2) / (a2 - a1);
	    return new paper.Point(x, y);
	  };
	
	  CustomStroke.prototype.getAnchorPoint = function(point, radian1, radian2) {
	    var point1, point2, r1, r2;
	    r1 = radian1 + Math.PI * 0.5;
	    r2 = radian2 - Math.PI * 0.5;
	    point1 = point.add(new paper.Point(Math.cos(r1) * this.width * 0.5, Math.sin(r1) * this.width * 0.5));
	    point2 = point.add(new paper.Point(Math.cos(r2) * this.width * 0.5, Math.sin(r2) * this.width * 0.5));
	    return this.getCrossingPoint(point1, radian1, point2, radian2);
	  };
	
	  CustomStroke.prototype.getRoundedCornerAnchorPoints = function(radius, point, prevPoint, nextPoint) {
	    var circleCenter, distanceFromPoint, length, nextRadian, point1, point2, prevRadian, radian, radian1, radian2, radianOffset, segment1, segment2;
	    if (radius <= 0) {
	      return [point];
	    }
	    prevRadian = Math.atan2(prevPoint.y - point.y, prevPoint.x - point.x);
	    nextRadian = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x);
	    radianOffset = (prevRadian - nextRadian) * 0.5;
	    if (radianOffset > Math.PI * 0.5 || (radianOffset < 0 && radianOffset > Math.PI * -0.5)) {
	      return [point];
	    }
	    distanceFromPoint = radius / Math.sin(radianOffset);
	    radian = nextRadian + radianOffset;
	    circleCenter = point.add(new paper.Point(Math.cos(radian) * distanceFromPoint, Math.sin(radian) * distanceFromPoint));
	    radian1 = prevRadian + Math.PI * 0.5;
	    point1 = circleCenter.add(new paper.Point(Math.cos(radian1) * radius, Math.sin(radian1) * radius));
	    segment1 = new paper.Segment(point1);
	    length = point.subtract(point1).length * 0.55228;
	    segment1.handleOut = new paper.Point({
	      angle: (prevRadian + Math.PI) * RADIAN_TO_DEGREE,
	      length: length
	    });
	    radian2 = nextRadian - Math.PI * 0.5;
	    point2 = circleCenter.add(new paper.Point(Math.cos(radian2) * radius, Math.sin(radian2) * radius));
	    segment2 = new paper.Segment(point2);
	    length = point.subtract(point2).length * 0.55228;
	    segment2.handleIn = new paper.Point({
	      angle: (nextRadian + Math.PI) * RADIAN_TO_DEGREE,
	      length: length
	    });
	    return [segment1, segment2];
	  };
	
	  CustomStroke.prototype.update = function() {
	    var distance, i, innerSegments, j, k, l, len, len1, m, n, nextPoint, nextRadian, nextSegment, o, outerSegments, p, point, points, prevPoint, prevRadian, prevSegment, prevStrokeSegment, q, r, radian, ratio, ref, ref1, ref2, ref3, ref4, ref5, segment, strokeDistance, strokeSegment;
	    this.segments = [];
	    outerSegments = [];
	    segment = this.path.segments[0];
	    nextSegment = this.path.segments[1];
	    radian = Math.atan2(nextSegment.point.y - segment.point.y, nextSegment.point.x - segment.point.x);
	    radian -= Math.PI * 0.5;
	    strokeSegment = new paper.Segment(new paper.Point(segment.point.add(new paper.Point({
	      angle: radian * RADIAN_TO_DEGREE,
	      length: this.width * 0.5
	    }))));
	    outerSegments.push(strokeSegment);
	    for (i = j = 1, ref = this.path.segments.length - 2; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
	      prevSegment = this.path.segments[i - 1];
	      segment = this.path.segments[i];
	      nextSegment = this.path.segments[i + 1];
	      if (segment.handleIn.length === 0 && segment.handleOut.length === 0) {
	        prevPoint = prevSegment.handleOut.length === 0 ? prevSegment.point : prevSegment.point.add(prevSegment.handleOut);
	        nextPoint = nextSegment.handleIn.length === 0 ? nextSegment.point : nextSegment.point.add(nextSegment.handleIn);
	        prevRadian = Math.atan2(prevPoint.y - segment.point.y, prevPoint.x - segment.point.x);
	        nextRadian = Math.atan2(nextPoint.y - segment.point.y, nextPoint.x - segment.point.x);
	        strokeSegment = new paper.Segment(this.getAnchorPoint(segment.point, prevRadian, nextRadian));
	      } else {
	        prevPoint = prevSegment.point;
	        if (segment.handleIn.length !== 0) {
	          prevPoint = segment.point.add(segment.handleIn);
	        } else if (prevSegment.handleOut.length !== 0) {
	          prevPoint = prevSegment.point.add(prevSegment.handleOut);
	        }
	        nextPoint = nextSegment.point;
	        if (segment.handleIn.length !== 0) {
	          nextPoint = segment.point.add(segment.handleIn);
	        } else if (nextSegment.handleOut.length !== 0) {
	          nextPoint = nextSegment.point.add(nextSegment.handleOut);
	        }
	        prevRadian = Math.atan2(prevPoint.y - segment.point.y, prevPoint.x - segment.point.x);
	        nextRadian = Math.atan2(nextPoint.y - segment.point.y, nextPoint.x - segment.point.x);
	        radian = prevRadian + (nextRadian - prevRadian) * 0.5 + Math.PI * 0.5;
	        if (prevRadian > nextRadian) {
	          radian += Math.PI;
	        }
	        strokeSegment = new paper.Segment(new paper.Point(segment.point.add(new paper.Point({
	          angle: radian * RADIAN_TO_DEGREE,
	          length: this.width * 0.5
	        }))));
	      }
	      outerSegments.push(strokeSegment);
	    }
	    segment = this.path.segments[this.path.segments.length - 1];
	    prevSegment = this.path.segments[this.path.segments.length - 2];
	    radian = Math.atan2(prevSegment.point.y - segment.point.y, prevSegment.point.x - segment.point.x);
	    radian += Math.PI * 0.5;
	    strokeSegment = new paper.Segment(new paper.Point(segment.point.add(new paper.Point({
	      angle: radian * RADIAN_TO_DEGREE,
	      length: this.width * 0.5
	    }))));
	    outerSegments.push(strokeSegment);
	    for (i = k = 0, ref1 = outerSegments.length; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
	      segment = this.path.segments[i];
	      strokeSegment = outerSegments[i];
	      if (i > 0 && segment.handleIn.length !== 0) {
	        prevSegment = this.path.segments[i - 1];
	        prevStrokeSegment = outerSegments[i - 1];
	        distance = segment.point.getDistance(prevSegment.point);
	        strokeDistance = strokeSegment.point.getDistance(prevStrokeSegment.point);
	        ratio = strokeDistance / distance;
	        strokeSegment.handleIn = new paper.Point({
	          angle: segment.handleIn.angle,
	          length: segment.handleIn.length * ratio
	        });
	      }
	      if (i < this.path.segments.length - 1 && segment.handleOut !== 0) {
	        nextSegment = this.path.segments[i + 1];
	        distance = segment.point.getDistance(nextSegment.point);
	        strokeDistance = segment.point.getDistance(nextSegment.point);
	        ratio = strokeDistance / distance;
	        strokeSegment.handleOut = new paper.Point({
	          angle: segment.handleOut.angle,
	          length: segment.handleOut.length * ratio
	        });
	      }
	    }
	    innerSegments = [];
	    segment = this.path.segments[this.path.segments.length - 1];
	    nextSegment = this.path.segments[this.path.segments.length - 2];
	    radian = Math.atan2(nextSegment.point.y - segment.point.y, nextSegment.point.x - segment.point.x);
	    radian -= Math.PI * 0.5;
	    strokeSegment = new paper.Segment(new paper.Point(segment.point.add(new paper.Point({
	      angle: radian * RADIAN_TO_DEGREE,
	      length: this.width * 0.5
	    }))));
	    innerSegments.unshift(strokeSegment);
	    for (i = l = ref2 = this.path.segments.length - 2; ref2 <= 1 ? l <= 1 : l >= 1; i = ref2 <= 1 ? ++l : --l) {
	      prevSegment = this.path.segments[i - 1];
	      segment = this.path.segments[i];
	      nextSegment = this.path.segments[i + 1];
	      if (segment.handleIn.length === 0 && segment.handleOut.length === 0) {
	        prevPoint = prevSegment.handleOut.length === 0 ? prevSegment.point : prevSegment.point.add(prevSegment.handleOut);
	        nextPoint = nextSegment.handleIn.length === 0 ? nextSegment.point : nextSegment.point.add(nextSegment.handleIn);
	        prevRadian = Math.atan2(prevPoint.y - segment.point.y, prevPoint.x - segment.point.x);
	        nextRadian = Math.atan2(nextPoint.y - segment.point.y, nextPoint.x - segment.point.x);
	        strokeSegment = new paper.Segment(this.getAnchorPoint(segment.point, nextRadian, prevRadian));
	      } else {
	        prevPoint = prevSegment.point;
	        if (segment.handleIn.length !== 0) {
	          prevPoint = segment.point.add(segment.handleIn);
	        } else if (prevSegment.handleOut.length !== 0) {
	          prevPoint = prevSegment.point.add(prevSegment.handleOut);
	        }
	        nextPoint = nextSegment.point;
	        if (segment.handleIn.length !== 0) {
	          nextPoint = segment.point.add(segment.handleIn);
	        } else if (nextSegment.handleOut.length !== 0) {
	          nextPoint = nextSegment.point.add(nextSegment.handleOut);
	        }
	        prevRadian = Math.atan2(prevPoint.y - segment.point.y, prevPoint.x - segment.point.x);
	        nextRadian = Math.atan2(nextPoint.y - segment.point.y, nextPoint.x - segment.point.x);
	        radian = prevRadian + (nextRadian - prevRadian) * 0.5 - Math.PI * 0.5;
	        if (prevRadian > nextRadian) {
	          radian += Math.PI;
	        }
	        strokeSegment = new paper.Segment(new paper.Point(segment.point.add(new paper.Point({
	          angle: radian * RADIAN_TO_DEGREE,
	          length: this.width * 0.5
	        }))));
	      }
	      innerSegments.unshift(strokeSegment);
	    }
	    segment = this.path.segments[0];
	    prevSegment = this.path.segments[1];
	    radian = Math.atan2(prevSegment.point.y - segment.point.y, prevSegment.point.x - segment.point.x);
	    radian += Math.PI * 0.5;
	    strokeSegment = new paper.Segment(new paper.Point(segment.point.add(new paper.Point({
	      angle: radian * RADIAN_TO_DEGREE,
	      length: this.width * 0.5
	    }))));
	    innerSegments.unshift(strokeSegment);
	    for (i = m = 0, ref3 = innerSegments.length; 0 <= ref3 ? m < ref3 : m > ref3; i = 0 <= ref3 ? ++m : --m) {
	      segment = this.path.segments[i];
	      strokeSegment = innerSegments[i];
	      if (i > 0 && segment.handleOut.length !== 0) {
	        prevSegment = this.path.segments[i - 1];
	        prevStrokeSegment = innerSegments[i - 1];
	        distance = segment.point.getDistance(prevSegment.point);
	        strokeDistance = strokeSegment.point.getDistance(prevStrokeSegment.point);
	        ratio = strokeDistance / distance;
	        strokeSegment.handleIn = new paper.Point({
	          angle: segment.handleOut.angle,
	          length: segment.handleOut.length * ratio
	        });
	      }
	      if (i < this.path.segments.length - 1 && segment.handleIn !== 0) {
	        nextSegment = this.path.segments[i + 1];
	        distance = segment.point.getDistance(nextSegment.point);
	        strokeDistance = segment.point.getDistance(nextSegment.point);
	        ratio = strokeDistance / distance;
	        strokeSegment.handleOut = new paper.Point({
	          angle: segment.handleIn.angle,
	          length: segment.handleIn.length * ratio
	        });
	      }
	    }
	    for (i = n = 0, ref4 = outerSegments.length; 0 <= ref4 ? n < ref4 : n > ref4; i = 0 <= ref4 ? ++n : --n) {
	      strokeSegment = outerSegments[i];
	      if (i > 0) {
	        prevPoint = outerSegments[i - 1].point;
	      } else {
	        prevPoint = this.path.segments[0].point;
	      }
	      if (i < outerSegments.length - 1) {
	        nextPoint = outerSegments[i + 1].point;
	      } else {
	        nextPoint = this.path.segments[this.path.segments.length - 1].point;
	      }
	      r = i >= this.settings.length ? 0 : this.settings[i][0];
	      points = this.getRoundedCornerAnchorPoints(r, strokeSegment.point, prevPoint, nextPoint);
	      for (o = 0, len = points.length; o < len; o++) {
	        point = points[o];
	        this.add(point);
	      }
	    }
	    for (i = p = ref5 = innerSegments.length - 1; ref5 <= 0 ? p <= 0 : p >= 0; i = ref5 <= 0 ? ++p : --p) {
	      strokeSegment = innerSegments[i];
	      if (i > 0) {
	        prevPoint = innerSegments[i - 1].point;
	      } else {
	        prevPoint = this.path.segments[0].point;
	      }
	      if (i < innerSegments.length - 1) {
	        nextPoint = innerSegments[i + 1].point;
	      } else {
	        nextPoint = this.path.segments[this.path.segments.length - 1].point;
	      }
	      r = i >= this.settings.length ? 0 : this.settings[i][1];
	      points = this.getRoundedCornerAnchorPoints(r, strokeSegment.point, nextPoint, prevPoint);
	      for (q = 0, len1 = points.length; q < len1; q++) {
	        point = points[q];
	        this.add(point);
	      }
	    }
	  };
	
	  return CustomStroke;
	
	})(paper.Path);
	
	module.exports = CustomStroke;


/***/ },

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	var Config, LogoType, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	LogoType = (function(superClass) {
	  extend(LogoType, superClass);
	
	  function LogoType(pathes) {
	    this.up = bind(this.up, this);
	    this.down = bind(this.down, this);
	    this.update = bind(this.update, this);
	    var i, len, path, ref;
	    LogoType.__super__.constructor.call(this);
	    this.pathes = [];
	    Utils.transformInit(this);
	    this.logoTypeSVG = this.importSVG(Config.SVG.LOGO_TYPE);
	    this.logoTypeSVG.remove();
	    ref = this.logoTypeSVG.children;
	    for (i = 0, len = ref.length; i < len; i++) {
	      path = ref[i];
	      Utils.transformInit(path, false);
	      path.fillColor = Config.COLOR.LOGO_TYPE_FILL;
	      path.strokeWidth = 0;
	      this.pathes.push(path);
	    }
	    this.addChildren(this.pathes);
	    this.press = 0;
	    this.init();
	    return;
	  }
	
	  LogoType.prototype.init = function() {
	    this._onInit();
	  };
	
	  LogoType.prototype.update = function() {
	    this._onUpdate();
	  };
	
	  LogoType.prototype.down = function() {
	    this._onDown();
	  };
	
	  LogoType.prototype.up = function() {
	    this._onUp();
	  };
	
	  LogoType.prototype._onInit = function() {};
	
	  LogoType.prototype._onUpdate = function() {};
	
	  LogoType.prototype._onDown = function() {};
	
	  LogoType.prototype._onUp = function() {};
	
	  return LogoType;
	
	})(paper.Group);
	
	module.exports = LogoType;


/***/ },

/***/ 16:
/***/ function(module, exports, __webpack_require__) {

	var Config, PaperStage, Utils;
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	PaperStage = (function() {
	  PaperStage.instance = null;
	
	  PaperStage.HIDE = 1;
	
	  PaperStage.SHOW = 2;
	
	  PaperStage.SHOW_ALL = 3;
	
	  function PaperStage($canvas) {
	    this.$canvas = $canvas;
	    this.canvas = this.$canvas.get(0);
	    this.anchorShowStatus = PaperStage.HIDE;
	    paper.setup(this.canvas);
	    this.stage = paper.project.activeLayer;
	    Utils.transformInit(this.stage);
	    PaperStage.instance = this;
	  }
	
	  PaperStage.prototype.resize = function(width, height) {
	    var _x, _y;
	    this._width = width;
	    this._height = height;
	    this.dpr = window.devicePixelRatio === void 0 ? 1 : window.devicePixelRatio;
	    if (UA.career !== UA.IPHONE && UA.career !== UA.IPAD) {
	      paper.view.setViewSize(this._width / this.dpr, this._height / this.dpr);
	      this.$canvas.css({
	        width: this._width,
	        height: this._height
	      });
	      this.$canvas.attr({
	        width: this._width,
	        height: this._height
	      });
	    } else {
	      paper.view.setViewSize(this._width, this._height);
	    }
	    this.scale = (this._width < this._height ? this._width : this._height) / Config.BASE_STAGE_WIDTH;
	    if (this.scale > 2) {
	      this.scale = 2;
	    }
	    this.stage.matrix = new paper.Matrix();
	    this.stage.scale(this.scale, this.scale);
	    _x = this._width / 2;
	    _y = this._height / 2;
	    this.width = width / this.scale;
	    this.height = height / this.scale;
	    this.stage.position = new paper.Point(_x, _y);
	  };
	
	  PaperStage.prototype.update = function() {
	    switch (parseInt(this.anchorShowStatus)) {
	      case PaperStage.HIDE:
	        this.stage.selected = false;
	        this.stage.fullySelected = false;
	        break;
	      case PaperStage.SHOW:
	        this.stage.fullySelected = false;
	        this.stage.selected = true;
	        break;
	      case PaperStage.SHOW_ALL:
	        this.stage.selected = false;
	        this.stage.fullySelected = true;
	    }
	  };
	
	  return PaperStage;
	
	})();
	
	module.exports = PaperStage;


/***/ },

/***/ 17:
/***/ function(module, exports, __webpack_require__) {

	var Config, SoundManager, Utils;
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	SoundManager = (function() {
	  function SoundManager() {}
	
	  SoundManager.sharedInstance = null;
	
	  SoundManager.init = function() {
	    SoundManager.isInitialized = false;
	    SoundManager.isSecretLoaded = false;
	    SoundManager.instances = {};
	    SoundManager.getDefaultJson();
	  };
	
	  SoundManager.getDefaultJson = function() {
	    $.ajax({
	      type: 'GET',
	      url: Config.SoundJson["default"],
	      dataType: 'json'
	    }).done(this.onLoadJson).fail(this.onFailJson);
	  };
	
	  SoundManager.getSecretJson = function() {
	    this.isSecretLoaded = true;
	    $.ajax({
	      type: 'GET',
	      url: Config.SoundJson.secret,
	      dataType: 'json'
	    }).done(this.initSound).fail(this.onFailJson);
	  };
	
	  SoundManager.onLoadJson = function(json) {
	    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
	      $(window).on('touchstart.SoundManager', function() {
	        return SoundManager.initSound(json);
	      });
	    } else {
	      SoundManager.initSound(json);
	    }
	  };
	
	  SoundManager.onFailJson = function() {
	    throw "jsonの読み込みに失敗しました。";
	  };
	
	  SoundManager.initSound = function(json) {
	    var assetPath, sounds;
	    $(window).off('touchstart.SoundManager');
	    createjs.Sound.initializeDefaultPlugins();
	    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
	      createjs.WebAudioPlugin.playEmptySound();
	    }
	    sounds = [json];
	    assetPath = '';
	    createjs.Sound.alternateExtensions = ['mp3'];
	    createjs.Sound.on('fileload', SoundManager.onLoadResource);
	    createjs.Sound.registerSounds(sounds, assetPath);
	  };
	
	  SoundManager.onLoadResource = function() {
	    SoundManager.isInitialized = true;
	    if (!SoundManager.isSecretLoaded) {
	      SoundManager.getSecretJson();
	    }
	  };
	
	  SoundManager.play = function(id, duration, isLooped, onEnd, onPlay) {
	    var instance, params;
	    if (!this.isInitialized) {
	      return;
	    }
	    if (typeof id === "undefined") {
	      return;
	    }
	    if (this.instances[id] != null) {
	      return;
	    }
	    params = {};
	    if (isLooped) {
	      params.loop = -1;
	    }
	    instance = createjs.Sound.play(id, params);
	    this.instances[id] = instance;
	    instance.isPlaying = true;
	    if (duration != null) {
	      if (instance.tween != null) {
	        instance.tween.stop();
	      }
	      instance.volume = 0;
	      instance.fadeVolume = 0;
	      instance.tween = new TWEEN.Tween(instance).easing(TWEEN.Easing.Cubic.InOut).to({
	        fadeVolume: 1
	      }, duration).onUpdate(function() {
	        return instance.setVolume(instance.fadeVolume);
	      }).start();
	    }
	    instance.addEventListener('complete', (function(_this) {
	      return function() {
	        _this.instances[id] = null;
	      };
	    })(this));
	    if (onEnd != null) {
	      instance.addEventListener('complete', onEnd);
	    }
	    if (onPlay != null) {
	      instance.addEventListener('succeeded', onPlay);
	    }
	  };
	
	  SoundManager.stop = function(id, duration) {
	    var instance;
	    if (duration == null) {
	      duration = 100;
	    }
	    if (!SoundManager.isInitialized) {
	      return;
	    }
	    if (typeof id === "undefined") {
	      return;
	    }
	    instance = SoundManager.instances[id];
	    if (instance == null) {
	      return;
	    }
	    if (!instance.isPlaying) {
	      return;
	    }
	    instance.removeAllEventListeners();
	    instance.isPlaying = false;
	    if (duration != null) {
	      if (instance.tween != null) {
	        instance.tween.stop();
	      }
	      instance.fadeVolume = 1;
	      instance.tween = new TWEEN.Tween(instance).easing(TWEEN.Easing.Cubic.InOut).to({
	        fadeVolume: 0
	      }, duration).onUpdate(function() {
	        return instance.setVolume(instance.fadeVolume);
	      }).onComplete(function() {
	        instance.position = 0;
	        return instance.stop();
	      }).start();
	    } else {
	      instance.position = 0;
	      instance.stop();
	    }
	    SoundManager.instances[id] = null;
	  };
	
	  SoundManager.mute = function() {
	    createjs.Sound.setMute(true);
	  };
	
	  SoundManager.unmute = function() {
	    createjs.Sound.setMute(false);
	  };
	
	  SoundManager.onWindowBlur = function(event) {
	    SoundManager.mute();
	  };
	
	  SoundManager.onWindowFocus = function(event) {
	    SoundManager.unmute();
	  };
	
	  return SoundManager;
	
	})();
	
	module.exports = SoundManager;


/***/ },

/***/ 21:
/***/ function(module, exports) {

	
	/*
	auth: Kimura
	data: 2016/01/16
	 */
	TWEEN.Easing.Quad = TWEEN.Easing.Quadratic;
	
	TWEEN.Easing.Quart = TWEEN.Easing.Quartic;
	
	TWEEN.Easing.Quint = TWEEN.Easing.Quintic;
	
	TWEEN.Easing.Sine = TWEEN.Easing.Sinusoidal;
	
	TWEEN.Easing.Expo = TWEEN.Easing.Exponential;
	
	TWEEN.Easing.Circ = TWEEN.Easing.Circular;


/***/ },

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

	var Base, Btn, Config, LogoType, PaperStage, SceneBase, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	Btn = __webpack_require__(10);
	
	Base = __webpack_require__(13);
	
	LogoType = __webpack_require__(15);
	
	PaperStage = __webpack_require__(16);
	
	SceneBase = (function(superClass) {
	  extend(SceneBase, superClass);
	
	  SceneBase.Mode = {
	    NotAdded: 0,
	    Standby: 1,
	    Touching: 2,
	    Effect: 3,
	    Swapping: 4
	  };
	
	  function SceneBase(onEnd) {
	    this.swap = bind(this.swap, this);
	    this.touchUp = bind(this.touchUp, this);
	    this.touchMove = bind(this.touchMove, this);
	    this.touchDown = bind(this.touchDown, this);
	    this.end = bind(this.end, this);
	    SceneBase.__super__.constructor.call(this);
	    Utils.transformInit(this);
	    this.paper = PaperStage.instance;
	    this.onEnd = onEnd;
	    this.press = 0;
	    this.changeMode(SceneBase.Mode.NotAdded);
	    this.container = new paper.Group();
	    this.container.remove();
	    this.nextContainer = new paper.Group();
	    this.nextContainer.remove();
	    Utils.transformInit([this.container, this.nextContainer]);
	    this.init();
	    return;
	  }
	
	  SceneBase.prototype.init = function() {
	    var base, btn, logoType;
	    btn = new Btn();
	    base = new Base();
	    logoType = new LogoType();
	    this.nextContainer.addChild(btn);
	    this.nextContainer.addChild(base);
	    this.nextContainer.addChild(logoType);
	    this._onInit();
	  };
	
	  SceneBase.prototype.start = function() {
	    this.position.x = this.basePosX = 8;
	    this.press = 0;
	    this.paper.stage.insertChild(0, this);
	    this._onStart();
	    this.changeMode(SceneBase.Mode.Standby);
	  };
	
	  SceneBase.prototype.end = function() {
	    this.press = 0;
	    this.removeChildren();
	    this.remove();
	    this.changeMode(SceneBase.Mode.NotAdded);
	    this._onEnd();
	    if (typeof this.onEnd === "function") {
	      this.onEnd();
	    }
	  };
	
	  SceneBase.prototype.resize = function() {
	    this._onResize();
	  };
	
	  SceneBase.prototype.update = function() {
	    this._onUpdate();
	  };
	
	  SceneBase.prototype.touchDown = function(point, press) {
	    if (this.mode !== SceneBase.Mode.Standby) {
	      return;
	    }
	    this.changeMode(SceneBase.Mode.Touching);
	    this.point = point;
	    this.press = press;
	    this._onTouchDown();
	  };
	
	  SceneBase.prototype.touchMove = function(vector, point, press) {
	    if (this.mode !== SceneBase.Mode.Touching) {
	      return;
	    }
	    this.vector = vector;
	    this.point = point;
	    this.press = press;
	    this._onTouchMove();
	  };
	
	  SceneBase.prototype.touchUp = function(vector, point, press) {
	    if (this.mode !== SceneBase.Mode.Touching) {
	      return;
	    }
	    this.vector = vector;
	    this.point = point;
	    this.press = press;
	    if (this.press >= 1) {
	      this.changeMode(SceneBase.Mode.Effect);
	    } else {
	      this.changeMode(SceneBase.Mode.Standby);
	    }
	    this._onTouchUp();
	  };
	
	  SceneBase.prototype.swap = function() {
	    this.changeMode(SceneBase.Mode.Swapping);
	  };
	
	  SceneBase.prototype.changeMode = function(mode) {
	    this.mode = mode;
	    this._onModeChange(this.mode);
	    if (this.mode === SceneBase.Mode.NotAdded) {
	      this._onNotAdded();
	    } else if (this.mode === SceneBase.Mode.Standby) {
	      this._onStandby();
	    } else if (this.mode === SceneBase.Mode.Touching) {
	      this._onTouching();
	    } else if (this.mode === SceneBase.Mode.Effect) {
	      this._onEffect();
	    } else if (this.mode === SceneBase.Mode.Swapping) {
	      this._onSwapping();
	    }
	  };
	
	  SceneBase.prototype._onModeChange = function(mode) {};
	
	  SceneBase.prototype._onStandby = function() {};
	
	  SceneBase.prototype._onTouching = function() {};
	
	  SceneBase.prototype._onEffect = function() {};
	
	  SceneBase.prototype._onSwapping = function() {};
	
	  SceneBase.prototype._onNotAdded = function() {};
	
	  SceneBase.prototype._onInit = function() {};
	
	  SceneBase.prototype._onResize = function() {};
	
	  SceneBase.prototype._onStart = function(isAnimate) {};
	
	  SceneBase.prototype._onEnd = function() {};
	
	  SceneBase.prototype._onUpdate = function() {};
	
	  SceneBase.prototype._onTouchDown = function() {
	    var ref, ref1, ref2;
	    if ((ref = this.btn) != null) {
	      ref.down();
	    }
	    if ((ref1 = this.base) != null) {
	      ref1.down();
	    }
	    if ((ref2 = this.logoType) != null) {
	      ref2.down();
	    }
	  };
	
	  SceneBase.prototype._onTouchMove = function() {
	    var ref, ref1, ref2;
	    if ((ref = this.btn) != null) {
	      ref.press = this.press;
	    }
	    if ((ref1 = this.base) != null) {
	      ref1.press = this.press;
	    }
	    if ((ref2 = this.logoType) != null) {
	      ref2.press = this.press;
	    }
	  };
	
	  SceneBase.prototype._onTouchUp = function() {
	    var ref, ref1, ref2;
	    if ((ref = this.btn) != null) {
	      ref.up();
	    }
	    if ((ref1 = this.base) != null) {
	      ref1.up();
	    }
	    if ((ref2 = this.logoType) != null) {
	      ref2.up();
	    }
	  };
	
	  return SceneBase;
	
	})(paper.Group);
	
	module.exports = SceneBase;


/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

	var DEGREE_TO_RADIAN, FluidablePath, RADIAN_TO_DEGREE,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	RADIAN_TO_DEGREE = 180 / Math.PI;
	
	DEGREE_TO_RADIAN = Math.PI / 180;
	
	FluidablePath = (function(superClass) {
	  extend(FluidablePath, superClass);
	
	  function FluidablePath(path) {
	    FluidablePath.__super__.constructor.call(this);
	    this.path = path;
	    this.fluidPath = new paper.Path();
	    this.fluidPath.remove();
	    this.flexibility = 1;
	    this.speed = 0.01;
	    this.amplitude = 1;
	    this.numWaves = 5;
	    this.smoothFactor = 0.3;
	    this.fixEnds = true;
	    this.setPath(this.path);
	  }
	
	  FluidablePath.prototype.setPath = function(path) {
	    var i, j, k, l, len, len1, len2, radian, radianL, radianR, ref, ref1, ref2, segment;
	    this.path = path;
	    this.segments = [];
	    this.fluidPath.segments = [];
	    this.fluidRadians = [];
	    ref = this.path.segments;
	    for (j = 0, len = ref.length; j < len; j++) {
	      segment = ref[j];
	      this.add(segment.clone());
	      this.fluidPath.segments.push(segment.clone());
	    }
	    ref1 = this.segments;
	    for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
	      segment = ref1[i];
	      radian = 0;
	      if (i <= 0) {
	        if ((segment.handleOut != null) && !segment.handleOut.isZero()) {
	          radian = segment.handleOut.angleInRadians + Math.PI * 0.5;
	        } else {
	          radian = segment.point.getAngleInRadians(this.segments[i + 1].point) + Math.PI * 0.5;
	        }
	      } else if (i >= this.segments.length - 1) {
	        if ((segment.handleIn != null) && !segment.handleIn.isZero()) {
	          radian = segment.handleIn.angleInRadians - Math.PI * 0.5;
	        } else {
	          radian = segment.point.getAngleInRadians(this.segments[i - 1].point) - Math.PI * 0.5;
	        }
	      } else {
	        if ((segment.handleIn != null) && !segment.handleIn.isZero()) {
	          radianL = segment.handleIn.angleInRadians;
	        } else {
	          radianL = segment.point.getAngleInRadians(this.segments[i - 1].point);
	        }
	        if ((segment.handleOut != null) && !segment.handleOut.isZero()) {
	          radianR = segment.handleOut.angleInRadians;
	        } else {
	          radianR = segment.point.getAngleInRadians(this.segments[i + 1].point);
	        }
	        radian = radianL + (radianR - radianL) * 0.5;
	      }
	      this.fluidRadians.push(radian);
	    }
	    ref2 = this.fluidPath.segments;
	    for (i = l = 0, len2 = ref2.length; l < len2; i = ++l) {
	      segment = ref2[i];
	      segment.handleIn.x = segment.handleIn.y = 0;
	      segment.handleOut.x = segment.handleOut.y = 0;
	    }
	    this.update();
	  };
	
	  FluidablePath.prototype.smoothSegment = function(segment, left, right, factor) {
	    var distanceL, distanceR, radian, radianL, radianR;
	    distanceL = left != null ? segment.point.getDistance(left) : 0;
	    distanceR = right != null ? segment.point.getDistance(right) : 0;
	    radian = 0;
	    if ((left != null) && (right != null)) {
	      radianL = segment.point.getAngleInRadians(left);
	      radianR = segment.point.getAngleInRadians(right);
	      radian = radianL + (radianR - radianL) * 0.5 + Math.PI * 0.5;
	    } else if (left != null) {
	      radian = segment.point.getAngleInRadians(left);
	    } else if (right != null) {
	      radian = segment.point.getAngleInRadians(right);
	    }
	    if ((left != null) && (right != null)) {
	      if (radian < Math.PI * -0.5 || radian > Math.PI * 0.5) {
	        distanceR *= -1;
	      } else {
	        distanceL *= -1;
	      }
	    }
	    segment.handleIn.x = Math.cos(radian) * distanceL * factor;
	    segment.handleIn.y = Math.sin(radian) * distanceL * factor;
	    segment.handleOut.x = Math.cos(radian) * distanceR * factor;
	    segment.handleOut.y = Math.sin(radian) * distanceR * factor;
	  };
	
	  FluidablePath.prototype.update = function() {
	    var baseSegment, distance, fluidSegment, i, j, k, len, len1, now, phase, radian, ref, ref1, results;
	    now = new Date().getTime();
	    phase = now * this.speed;
	    ref = this.fluidPath.segments;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      fluidSegment = ref[i];
	      baseSegment = this.path.segments[i];
	      distance = Math.sin(phase + i / this.fluidPath.segments.length * this.numWaves * Math.PI * 2) * this.amplitude;
	      radian = this.fluidRadians[i];
	      if (!this.closed && this.fixEnds && (i === 0 || i === this.fluidPath.segments.length - 1)) {
	        distance = 0;
	      }
	      fluidSegment.point.x = baseSegment.point.x + Math.cos(radian) * distance;
	      fluidSegment.point.y = baseSegment.point.y + Math.sin(radian) * distance;
	      fluidSegment.handleIn.x = baseSegment.handleIn.x;
	      fluidSegment.handleIn.y = baseSegment.handleIn.y;
	      fluidSegment.handleOut.x = baseSegment.handleOut.x;
	      fluidSegment.handleOut.y = baseSegment.handleOut.y;
	    }
	    ref1 = this.fluidPath.segments;
	    results = [];
	    for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
	      fluidSegment = ref1[i];
	      baseSegment = this.path.segments[i];
	      this.segments[i].point.x = baseSegment.point.x + (fluidSegment.point.x - baseSegment.point.x) * this.flexibility;
	      this.segments[i].point.y = baseSegment.point.y + (fluidSegment.point.y - baseSegment.point.y) * this.flexibility;
	      this.segments[i].handleIn.x = baseSegment.handleIn.x + (fluidSegment.handleIn.x - baseSegment.handleIn.x) * this.flexibility;
	      this.segments[i].handleIn.y = baseSegment.handleIn.y + (fluidSegment.handleIn.y - baseSegment.handleIn.y) * this.flexibility;
	      this.segments[i].handleOut.x = baseSegment.handleOut.x + (fluidSegment.handleOut.x - baseSegment.handleOut.x) * this.flexibility;
	      results.push(this.segments[i].handleOut.y = baseSegment.handleOut.y + (fluidSegment.handleOut.y - baseSegment.handleOut.y) * this.flexibility);
	    }
	    return results;
	  };
	
	  return FluidablePath;
	
	})(paper.Path);
	
	module.exports = FluidablePath;


/***/ },

/***/ 87:
/***/ function(module, exports, __webpack_require__) {

	var Config, CustomStroke, FluidablePath, Scene, SceneBase, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	SceneBase = __webpack_require__(22);
	
	CustomStroke = __webpack_require__(14);
	
	FluidablePath = __webpack_require__(71);
	
	Scene = (function(superClass) {
	  extend(Scene, superClass);
	
	  function Scene() {
	    this._onSwapping = bind(this._onSwapping, this);
	    this._onEnd = bind(this._onEnd, this);
	    return Scene.__super__.constructor.apply(this, arguments);
	  }
	
	  Scene.prototype._onInit = function() {
	    this.baseSVG = this.importSVG(Config.SVG.BASE);
	    this.baseSVG.remove();
	    this.bone = this.baseSVG.children[1];
	    this.bone.strokeWidth = 0.25;
	    this.bone.strokeColor = '#ff0000';
	    this.bone.fillColor = new paper.Color(0, 0, 0, 0);
	    this.container.addChild(this.bone);
	    this.fluid = new FluidablePath(this.bone);
	    this.fluid.strokeWidth = 0.25;
	    this.fluid.strokeColor = '#0000ff';
	    this.fluid.fillColor = new paper.Color(0, 0, 0, 0);
	    this.container.addChild(this.fluid);
	    this.fluid.selected = true;
	    this.fluid.fullySelected = true;
	    this.scale(4);
	  };
	
	  Scene.prototype._onStart = function() {
	    this.container.position.x = 0;
	    this.addChild(this.container);
	  };
	
	  Scene.prototype._onEnd = function() {
	    this.removeChildren();
	  };
	
	  Scene.prototype._onUpdate = function() {
	    this.fluid.update();
	  };
	
	  Scene.prototype._onStandby = function() {};
	
	  Scene.prototype._onEffect = function() {};
	
	  Scene.prototype._onSwapping = function() {};
	
	  return Scene;
	
	})(SceneBase);
	
	module.exports = Scene;


/***/ },

/***/ 88:
/***/ function(module, exports) {

	var DatGUI, DatOption,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	DatOption = (function() {
	  function DatOption() {
	    this.anchor = false;
	    this.flexibility = 1;
	    this.speed = 0.01;
	    this.amplitude = 1;
	    this.numWaves = 10;
	    this.smoothFactor = 0.3;
	    this.fixEnds = true;
	    return;
	  }
	
	  return DatOption;
	
	})();
	
	DatGUI = (function(superClass) {
	  extend(DatGUI, superClass);
	
	  DatGUI.ID = 'DatGUI';
	
	  function DatGUI(fulidables) {
	    DatGUI.__super__.constructor.call(this);
	    this.datOption = new DatOption();
	    this.domElement.id = DatGUI.ID;
	    this.fulidables = fulidables;
	    $("#" + DatGUI.ID).css({
	      "padding-top": 50
	    });
	    console.log(fulidables);
	    this.add(this.datOption, 'flexibility', 0, 1).onChange((function(_this) {
	      return function() {
	        var fulidable, i, len, ref, results;
	        ref = _this.fulidables;
	        results = [];
	        for (i = 0, len = ref.length; i < len; i++) {
	          fulidable = ref[i];
	          results.push(fulidable.flexibility = _this.datOption.flexibility);
	        }
	        return results;
	      };
	    })(this));
	    this.add(this.datOption, 'speed', 0.001, 0.05).onChange((function(_this) {
	      return function() {
	        var fulidable, i, len, ref, results;
	        ref = _this.fulidables;
	        results = [];
	        for (i = 0, len = ref.length; i < len; i++) {
	          fulidable = ref[i];
	          results.push(fulidable.speed = _this.datOption.speed);
	        }
	        return results;
	      };
	    })(this));
	    this.add(this.datOption, 'amplitude', 0, 10).onChange((function(_this) {
	      return function() {
	        var fulidable, i, len, ref, results;
	        ref = _this.fulidables;
	        results = [];
	        for (i = 0, len = ref.length; i < len; i++) {
	          fulidable = ref[i];
	          results.push(fulidable.amplitude = _this.datOption.amplitude);
	        }
	        return results;
	      };
	    })(this));
	    this.add(this.datOption, 'numWaves', 0, 30).onChange((function(_this) {
	      return function() {
	        var fulidable, i, len, ref, results;
	        ref = _this.fulidables;
	        results = [];
	        for (i = 0, len = ref.length; i < len; i++) {
	          fulidable = ref[i];
	          results.push(fulidable.numWaves = _this.datOption.numWaves);
	        }
	        return results;
	      };
	    })(this));
	    this.add(this.datOption, 'smoothFactor', 0, 1).onChange((function(_this) {
	      return function() {
	        var fulidable, i, len, ref, results;
	        ref = _this.fulidables;
	        results = [];
	        for (i = 0, len = ref.length; i < len; i++) {
	          fulidable = ref[i];
	          results.push(fulidable.smoothFactor = _this.datOption.smoothFactor);
	        }
	        return results;
	      };
	    })(this));
	    this.add(this.datOption, 'fixEnds').onChange((function(_this) {
	      return function() {
	        var fulidable, i, len, ref, results;
	        ref = _this.fulidables;
	        results = [];
	        for (i = 0, len = ref.length; i < len; i++) {
	          fulidable = ref[i];
	          results.push(fulidable.fixEnds = _this.datOption.fixEnds);
	        }
	        return results;
	      };
	    })(this));
	  }
	
	  return DatGUI;
	
	})(dat.GUI);
	
	module.exports = DatGUI;


/***/ }

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDQ4ZjUzZmI4ZjNkYzZiZWY0OWE/MDg5ZCoqKioqIiwid2VicGFjazovLy8uL19jb2ZmZWUvX21vY2svMDUtZmx1aWRhYmxlX3BhdGgvbWFpbi5jb2ZmZWUiLCJ3ZWJwYWNrOi8vLy4vX2NvZmZlZS91dGlscy91dGlscy5jb2ZmZWU/YTBhZSoqIiwid2VicGFjazovLy8uL19jb2ZmZWUvdXRpbHMvZXZlbnQuY29mZmVlPzcwMzEqKiIsIndlYnBhY2s6Ly8vLi9fY29mZmVlL2Zvcm1hdC9idG4uY29mZmVlPzE0OGQqKiIsIndlYnBhY2s6Ly8vLi9fY29mZmVlL2NvbmZpZy5jb2ZmZWU/OTZkYioqIiwid2VicGFjazovLy8uL19jb2ZmZWUvZm9ybWF0L21vcnBoYWJsZS1wYXRoLmNvZmZlZT9iZTEyKioiLCJ3ZWJwYWNrOi8vLy4vX2NvZmZlZS9mb3JtYXQvYmFzZS5jb2ZmZWU/OGQwMSoqIiwid2VicGFjazovLy8uL19jb2ZmZWUvZm9ybWF0L2N1c3RvbS1zdHJva2UuY29mZmVlPzk0YzUqKiIsIndlYnBhY2s6Ly8vLi9fY29mZmVlL2Zvcm1hdC9sb2dvLXR5cGUuY29mZmVlPzg3ZTkqKiIsIndlYnBhY2s6Ly8vLi9fY29mZmVlL3N0YWdlL3BhcGVyLXN0YWdlLmNvZmZlZT8yYzMyKiIsIndlYnBhY2s6Ly8vLi9fY29mZmVlL3V0aWxzL3NvdW5kLW1hbmFnZXIuY29mZmVlP2I2ZWMiLCJ3ZWJwYWNrOi8vLy4vX2NvZmZlZS91dGlscy9leHRlbnNpb24uY29mZmVlP2I2NmIiLCJ3ZWJwYWNrOi8vLy4vX2NvZmZlZS9zY2VuZS9zY2VuZS1iYXNlLmNvZmZlZT8yYWNmIiwid2VicGFjazovLy8uL19jb2ZmZWUvZm9ybWF0L2ZsdWlkYWJsZS1wYXRoLmNvZmZlZT81OTkzIiwid2VicGFjazovLy8uL19jb2ZmZWUvX21vY2svMDUtZmx1aWRhYmxlX3BhdGgvc2NlbmUuY29mZmVlIiwid2VicGFjazovLy8uL19j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RUFBaUIsY0FBakIsRUFBaUMsQ0FBakMsRUFBb0MsQ0FBcEMsQ0FBc0MsQ0FBQyxRQUF2QyxDQUFnRDtjQUFBO0FBQy9DO0FBQUE7QUFBQTtjQUFBOzt3QkFDQyxTQUFTLENBQUMsWUFBVixHQUF5QixLQUFDLFVBQVMsQ0FBQztBQURyQzs7T0FEK0M7S0FBQSxRQUFoRDtLQUlBLElBQUMsSUFBRCxDQUFLLElBQUMsVUFBTixFQUFpQixTQUFqQixDQUEyQixDQUFDLFFBQTVCLENBQXFDO2NBQUE7QUFDcEM7QUFBQTtBQUFBO2NBQUE7O3dCQUNDLFNBQVMsQ0FBQyxPQUFWLEdBQW9CLEtBQUMsVUFBUyxDQUFDO0FBRGhDOztPQURvQztLQUFBLFFBQXJDO0dBN0JZOzs7O0lBRk8sR0FBRyxDQUFDOztBQW1DekIsT0FBTSxDQUFDLE9BQVAsR0FBaUIiLCJmaWxlIjoibW9jay8wNS1mbHVpZGFibGVfcGF0aC9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0NDhmNTNmYjhmM2RjNmJlZjQ5YVxuICoqLyIsIkNvbmZpZ1x0XHRcdFx0XHRcdFx0XHQ9IHJlcXVpcmUgJ2NvbmZpZydcblNpbXBsZUV2ZW50RGlzcGF0Y2hlclx0PSByZXF1aXJlICdldmVudCdcblBhcGVyU3RhZ2VcdFx0XHRcdFx0XHQ9IHJlcXVpcmUgJ3BhcGVyLXN0YWdlJ1xuU291bmRNYW5hZ2VyXHRcdFx0XHRcdD0gcmVxdWlyZSAnc291bmQtbWFuYWdlcidcblNjZW5lXHRcdFx0XHRcdFx0XHRcdFx0PSByZXF1aXJlICcuL3NjZW5lJ1xuRGF0R1VJXHRcdFx0XHRcdFx0XHRcdD0gcmVxdWlyZSAnLi9kYXQnXG5cbiMjI1xuYXV0aDogS2ltdXJhXG5kYXRhOiAyMDE2LzA1LzIwXG4jIyNcblxuY2xhc3MgTWFpblxuXHRjb25zdHJ1Y3RvcjogKCkgLT5cblx0XHRAZHByID0gaWYgd2luZG93LmRldmljZVBpeGVsUmF0aW8gPT0gdW5kZWZpbmVkIHRoZW4gMSBlbHNlIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvXG5cdFx0QCR3aW5kb3cgPSAkKHdpbmRvdylcblx0XHQkKFwiI0NhbnZhc1wiKS5hcHBlbmQoJzxjYW52YXMgaWQ9XCInK0NvbmZpZy5DYW52YXMucGFwZXIrJ1wiPicpXG5cdFx0QCRjYW52YXMgPSAkKFwiI1wiICsgQ29uZmlnLkNhbnZhcy5wYXBlcilcblx0XHRAY2FudmFzID0gQCRjYW52YXMuZ2V0KDApXG5cdFx0QGNvbnRleHQgPSBAY2FudmFzLmdldENvbnRleHQoJzJkJylcblx0XHRAaXNGaXJzdFNjZW5lID0gdHJ1ZVxuXG5cdFx0IyBwYXBlci5qcyDoqK3lrppcblx0XHRAcGFwZXIgPSBuZXcgUGFwZXJTdGFnZShAJGNhbnZhcyxAZHByKVxuXG5cdFx0IyDjgqTjg5njg7Pjg4joqK3lrppcblx0XHRAJHdpbmRvdy5vbigncmVzaXplJywgQG9uUmVzaXplKS50cmlnZ2VyKCdyZXNpemUnKVxuXHRcdFxuXHRcdCMg44OH44OQ44OD44Kw55So44Kz44Oz44K944O844OrXG5cblxuXHRcdCMg44K344O844Oz6Kit5a6aXG5cdFx0QHNjZW5lcyA9IFxuXHRcdFx0XCJTY2VuZVwiXHRcdFx0OiBuZXcgU2NlbmUgQGdvdG9OZXh0U2NlbmVcblxuXHRcdEBkYXQgPSBuZXcgRGF0R1VJKFtAc2NlbmVzWydTY2VuZSddLmZsdWlkXSlcblx0XHRAc2NlbmVzTGVuID0gT2JqZWN0LmtleXMoQHNjZW5lcykubGVuZ3RoXG5cdFx0QHNjZW5lSW5kZXggPSAtMVxuXHRcdEBnb3RvTmV4dFNjZW5lKClcblxuXHRcdCMgdXBkYXRlXG5cdFx0cGFwZXIudmlldy5vbkZyYW1lID0gQG9uVXBkYXRlXG5cblx0XHRyZXR1cm5cblxuXHQjIFxuXHQjIOOCouOCr+ODhuOCo+ODluOCt+ODvOODs+OBruWkieabtFxuXHQjIFxuXHRnb3RvTmV4dFNjZW5lOiAoKT0+XG5cblx0XHRpZiBsb2NhdGlvbi5oYXNoID09IFwiXCIgI+ODqeODs+ODgOODoFxuXHRcdFx0QHNjZW5lSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBAc2NlbmVzTGVuKVxuXG5cdFx0ZWxzZSBpZiBsb2NhdGlvbi5oYXNoID09IFwiI2FsbFwiICPpoIbnlapcblx0XHRcdEBzY2VuZUluZGV4ICs9IDFcblx0XHRcdEBzY2VuZUluZGV4ICU9IEBzY2VuZXNMZW5cblxuXHRcdGVsc2UgaWYgbG9jYXRpb24uaGFzaCAhPSBcIlwiICPpgbjmip5cblx0XHRcdEBpc0ZpcnN0U2NlbmUgPSBmYWxzZVxuXHRcdFx0X2tleSA9IGxvY2F0aW9uLmhhc2gucmVwbGFjZSBcIiNcIiwgXCJcIlxuXHRcdFx0X2kgPSAwXG5cdFx0XHRmb3Iga2V5LCBzY2VuZSBvZiBAc2NlbmVzXG5cdFx0XHRcdGlmIGtleSA9PSBfa2V5IFxuXHRcdFx0XHRcdEBzY2VuZUluZGV4ID0gX2lcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRfaSArPSAxXG5cblx0XHRfaSA9IDBcblx0XHRmb3Iga2V5LCBzY2VuZSBvZiBAc2NlbmVzXG5cdFx0XHRpZiBfaSA9PSBAc2NlbmVJbmRleFxuXHRcdFx0XHRAaXNGaXJzdFNjZW5lID0gZmFsc2Vcblx0XHRcdFx0QGN1cnJlbnRTY2VuZSA9IHNjZW5lXG5cdFx0XHRcdEBjdXJyZW50U2NlbmUuc3RhcnQoKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0X2kgKz0gMVxuXG5cdFx0cmV0dXJuXG5cblx0IyBcblx0IyDjg6HjgqTjg7N1cGRhdGVcblx0IyBcblx0b25VcGRhdGU6ID0+XG5cdFx0VFdFRU4udXBkYXRlKClcblx0XHRAcGFwZXIudXBkYXRlKClcblx0XHRAY3VycmVudFNjZW5lPy51cGRhdGUoKVxuXG5cdFx0cGFwZXIudmlldy51cGRhdGUodHJ1ZSlcblxuXHRcdHJldHVyblxuXG5cdCMgXG5cdCMg44Oq44K144Kk44K65Yem55CGXG5cdCMgXG5cdG9uUmVzaXplOiA9PlxuXHRcdCMg44K544OG44O844K444K144Kk44K66Kit5a6aXG5cdFx0QHN0YWdlV2lkdGggPSBAJHdpbmRvdy53aWR0aCgpXG5cdFx0QHN0YWdlSGVpZ2h0ID0gQCR3aW5kb3cuaGVpZ2h0KClcblx0XHRcblx0XHQjIHBhcGVy44Oq44K144Kk44K6XG5cdFx0QHBhcGVyLnJlc2l6ZShAc3RhZ2VXaWR0aCwgQHN0YWdlSGVpZ2h0KVxuXG5cdFx0cmV0dXJuXG5cblx0XG4jXG4jIERPTSBSRUFEWVxuI1xuJCgoKS0+XG5cdHdpbmRvdy5tYWluID0gbmV3IE1haW4oKVxuKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9fY29mZmVlL19tb2NrLzA1LWZsdWlkYWJsZV9wYXRoL21haW4uY29mZmVlXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7fVxuXG4jIFxuIyDjg5rjg7zjg5Hjg7zjgqrjg5bjgrjjgqfjgq/jg4jotbfngrnoqr/mlbRcbiMgQHBhcmFtIHtPYmplY3Qgb3IgQXJyYXl9IG9iamVjdDogcGFwZXIuanPjga7jgqrjg5bjgrjjgqfjgq/jg4hcbiMgQHBhcmFtIHtCb29sZWFufSBwaXZvdFJlc2V0OiB0cnVl44Gq44KJcGl2b3TjgoLlpInmm7RcbiMgXG5tb2R1bGUuZXhwb3J0cy50cmFuc2Zvcm1Jbml0ID0gKG9iamVjdCwgcGl2b3RSZXNldCA9IHRydWUpLT5cblx0aWYgb2JqZWN0IGluc3RhbmNlb2YgQXJyYXlcblx0XHRmb3Igb2JqIGluIG9iamVjdFxuXHRcdFx0b2JqLnRyYW5zZm9ybUNvbnRlbnQgPSBmYWxzZVxuXHRcdFx0aWYgcGl2b3RSZXNldCB0aGVuIG9iai5waXZvdCA9IG5ldyBwYXBlci5Qb2ludCAwLCAwXG5cdGVsc2Vcblx0XHRvYmplY3QudHJhbnNmb3JtQ29udGVudCA9IGZhbHNlXG5cdFx0aWYgcGl2b3RSZXNldCB0aGVuIG9iamVjdC5waXZvdCA9IG5ldyBwYXBlci5Qb2ludCAwLCAwXG5cdHJldHVyblxuXG4jIFxuIyBpbXBvcnTjgZfjgZ9TVkfjga7lrZDopoHntKDjgpLlj5blvpdcbiMgQHBhcmFtIHtPYmplY3R9IFNWRzogU1ZH5oOF5aCxXG4jIEBwYXJhbSB7TnVtYmVyfSBubzog5Y+W5b6X44GZ44KL5a2Q6KaB57Sg44Gu55Wq5Y+3IC0x44Gu5aC05ZCI6YWN5YiX44Gn6L+U44GZXG4jIEByZXR1cm5zIHtPYmplY3Qgb3IgQXJyYXl9OiDmjIflrprjgZfjgZ/jg5HjgrnjgoLjgZfjgY/jga/lhajjgabjga7jg5Hjgrnmg4XloLFcbiMgXG5tb2R1bGUuZXhwb3J0cy5nZXRTdmdDaGlsZCA9IChTVkcsIG51bSA9IDApLT5cblx0c3ZnID0gcGFwZXIucHJvamVjdC5hY3RpdmVMYXllci5pbXBvcnRTVkcgU1ZHXG5cdHN2Zy5yZW1vdmUoKVxuXHRpZiBudW0gIT0gLTFcblx0XHRwYXRoID0gc3ZnLmNoaWxkcmVuW251bV1cblx0ZWxzZVxuXHRcdHBhdGggPSBzdmcuY2hpbGRyZW5cblxuXHRyZXR1cm4gcGF0aFxuXG4jIFxuIyDmjIflrprmmYLplpPlvoXmqZ9cbiMgQHBhcmFtIHtOdW1iZXJ9IHRpbWU6IOW+heapn+aZgumWkyhtcylcbiMgXG5tb2R1bGUuZXhwb3J0cy53YWl0ID0gKHRpbWUpLT5cblx0ZGYgPSAkLkRlZmVycmVkKClcblx0c2V0VGltZW91dCBkZi5yZXNvbHZlLCB0aW1lXG5cdHJldHVybiBkZi5wcm9taXNlKClcblxuXG4jIFxuIyDmraPopo/liIbluINcbiMgXG5tb2R1bGUuZXhwb3J0cy5ub3JtUmFuZCA9IChtLCBzKSAtPlxuXHRhID0gMSAtIE1hdGgucmFuZG9tKClcblx0YiA9IDEgLSBNYXRoLnJhbmRvbSgpXG5cdGMgPSBNYXRoLnNxcnQoLTIgKiBNYXRoLmxvZyhhKSlcblx0aWYgMC41IC0gTWF0aC5yYW5kb20oKSA+IDBcblx0XHRyZXR1cm4gYyAqIE1hdGguc2luKE1hdGguUEkgKiAyICogYikgKiBzICsgbVxuXHRlbHNlXG5cdFx0cmV0dXJuIGMgKiBNYXRoLmNvcyhNYXRoLlBJICogMiAqIGIpICogcyArIG1cblxuXG4jIFxuIyDjgqTjg7zjgrnjgr/jg7zjgqjjg4PjgrDnlKjjg6Ljg7zjg4nnrqHnkIZcbiMgXG5tb2R1bGUuZXhwb3J0cy5zZWNyZXRNb2RlID0gZmFsc2VcblxuIyBcbiMgU0Xlj5blvpdcbiMgQHByYW1zIFtBcnJheV0gc2VMaXN0OiBTReODquOCueODiFxuIyBAcmV0dXJucyB7U3RyaW5nfSBTReOCkjHjgaTov5TjgZlcbiMgXG5OT1JNQUwgPSBcIk5PUk1BTFwiXG5TRUNSRVQgPSBcIlNFQ1JFVFwiXG5tb2R1bGUuZXhwb3J0cy5nZXRTRSA9IChzZUxpc3QpIC0+XG5cdHNlTGlzdCA9IGlmICFtb2R1bGUuZXhwb3J0cy5zZWNyZXRNb2RlIHRoZW4gc2VMaXN0W05PUk1BTF0gZWxzZSBzZUxpc3RbU0VDUkVUXVxuXHRyZXR1cm4gc2VMaXN0W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNlTGlzdC5sZW5ndGgpXVxuXG5cbiMgXG4jIFNF44Kw44Or44O844OX5Y+W5b6XXG4jIEBwcmFtcyBbT2JqZWN0XSBzb3VuZDog44K344O844Oz44GuU09VTkTjgrPjg7Pjg5XjgqPjgrBcbiMgQHJldHVybnMge2FycmF5fSBTReODquOCueODiOOCsOODq+ODvOODl+OCkui/lOOBmVxuIyBcbm1vZHVsZS5leHBvcnRzLmdldFNFbGlzdCA9IChzb3VuZCkgLT5cblx0c291bmRMZW5ndGggPSBPYmplY3Qua2V5cyhzb3VuZCkubGVuZ3RoXG5cdG51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNvdW5kTGVuZ3RoKVxuXHRyZXR1cm4gc291bmRbXCJTRV9HUk9VUCN7bnVtfVwiXVxuXG5cbiMgXG4jIOOCouODl+ODquWGheODluODqeOCpuOCtuWIpOWumlxuIyBcbm1vZHVsZS5leHBvcnRzLnVhID0gKCh1KS0+XG5cdHJldHVybiB7XG5cdFx0ZmI6KHUuaW5kZXhPZihcImZiYW4vZmJpb3M7ZmJhdlwiKSAhPSAtMSlcblx0XHR0dzoodS5pbmRleE9mKFwidHdpdHRlclwiKSAhPSAtMSlcblx0fVxuKSh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9fY29mZmVlL3V0aWxzL3V0aWxzLmNvZmZlZVxuICoqLyIsIiMjI1xuYXV0aDogS2ltdXJhXG5kYXRhOiAyMDE2LzAxLzE2XG4jIyNcblxuI1xuIyBTaW1wbGVFdmVudERpc3BhdGNoZXLjgq/jg6njgrlcbiNcblxuY2xhc3MgU2ltcGxlRXZlbnREaXNwYXRjaGVyXG5cdGNvbnN0cnVjdG9yOiAoKSAtPlxuXHRcdEBsaXN0ZW5lcnMgPSB7fVxuXHRcblx0YWRkRXZlbnRMaXN0ZW5lcjogKG5hbWUsY2FsbGJhY2ssYXJncz1bXSkgLT5cblx0XHRpZiAhQGxpc3RlbmVycz8gdGhlbiBAbGlzdGVuZXJzID0ge31cblx0XHRpZiAhQGxpc3RlbmVyc1tuYW1lXT8gdGhlbiBAbGlzdGVuZXJzW25hbWVdID0gW11cblx0XHQjIFRPRE86IOmHjeikh+ODquOCueODiuODvOODgeOCp+ODg+OCr1xuXHRcdEBsaXN0ZW5lcnNbbmFtZV0ucHVzaCggbmV3IFNpbXBsZUV2ZW50TGlzdGVuZXIobmFtZSxjYWxsYmFjayxhcmdzKSApXG5cdFx0cmV0dXJuXG5cblx0cmVtb3ZlRXZlbnRMaXN0ZW5lcjogKG5hbWUsY2FsbGJhY2spIC0+XG5cdFx0aWYgIUBsaXN0ZW5lcnM/IHx8ICFAbGlzdGVuZXJzW25hbWVdPyB0aGVuIHJldHVyblxuXHRcdGlmICggY2FsbGJhY2sgPT0gbnVsbCApXG5cdFx0XHRAbGlzdGVuZXJzW25hbWVdID0gW11cblx0XHRcdHJldHVyblxuXHRcdHdoaWxlICggKGkgPSBAaW5kZXhPZkNhbGxiYWNrKG5hbWUsY2FsbGJhY2spKSA+PSAwIClcblx0XHRcdEBsaXN0ZW5lcnNbbmFtZV0uc3BsaWNlKGksMSlcblx0XHRyZXR1cm5cblxuXHRkaXNwYXRjaEV2ZW50OiAobmFtZSxkYXRhPXt9KSAtPlxuXHRcdGlmICFAbGlzdGVuZXJzPyB8fCAhQGxpc3RlbmVyc1tuYW1lXT8gdGhlbiByZXR1cm5cblx0XHRldmVudCA9IG5ldyBTaW1wbGVFdmVudCh0aGlzLG5hbWUsZGF0YSlcblx0XHRmb3IgbGlzdGVuZXIgaW4gQGxpc3RlbmVyc1tuYW1lXVxuXHRcdFx0bGlzdGVuZXIuZGlzcGF0Y2hFdmVudChldmVudClcblx0XHRyZXR1cm5cblxuXHRpbmRleE9mQ2FsbGJhY2s6IChuYW1lLGNhbGxiYWNrKSAtPlxuXHRcdGZvciBsaXN0ZW5lcixpIGluIEBsaXN0ZW5lcnM/W25hbWVdXG5cdFx0XHRpZiBsaXN0ZW5lci5jYWxsYmFjayA9PSBjYWxsYmFjayB0aGVuIHJldHVybiBpXG5cdFx0cmV0dXJuIC0xXG5cbmNsYXNzIFNpbXBsZUV2ZW50XG5cdGNvbnN0cnVjdG9yOiAodGFyZ2V0LG5hbWUsZGF0YT17fSkgLT5cblx0XHRAdGFyZ2V0ID0gdGFyZ2V0XG5cdFx0QG5hbWUgPSBuYW1lXG5cdFx0QGRhdGEgPSBkYXRhXG5cdFx0cmV0dXJuXG5cblxuY2xhc3MgU2ltcGxlRXZlbnRMaXN0ZW5lclxuXHRjb25zdHJ1Y3RvcjogKG5hbWUsY2FsbGJhY2ssYXJncz1udWxsKSAtPlxuXHRcdEBuYW1lID0gbmFtZVxuXHRcdEBjYWxsYmFjayA9IGNhbGxiYWNrXG5cdFx0QGFyZ3MgPSBhcmdzXG5cdFx0cmV0dXJuXG5cblx0ZGlzcGF0Y2hFdmVudDogKGV2ZW50KSAtPlxuXHRcdGlmIHR5cGVvZihAY2FsbGJhY2spICE9ICdmdW5jdGlvbicgdGhlbiByZXR1cm5cblx0XHRpZiBAYXJncyAmJiBAYXJncy5sZW5ndGggPiAwXG5cdFx0XHRAY2FsbGJhY2suYXBwbHkobnVsbCwgQGFyZ3MpXG5cdFx0ZWxzZVxuXHRcdFx0QGNhbGxiYWNrLmFwcGx5KG51bGwsIFtldmVudF0pXG5cdFx0cmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gU2ltcGxlRXZlbnREaXNwYXRjaGVyXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9fY29mZmVlL3V0aWxzL2V2ZW50LmNvZmZlZVxuICoqLyIsIkNvbmZpZ1x0XHRcdFx0PSByZXF1aXJlICdjb25maWcnXG5VdGlsc1x0XHRcdFx0XHQ9IHJlcXVpcmUgJ3V0aWxzJ1xuTW9ycGhhYmxlUGF0aFx0PSByZXF1aXJlICdtb3JwaGFibGUtcGF0aCdcblxuIyBcbiMg44Oc44K/44Oz44Kq44OW44K444Kn44Kv44OIXG4jIEBwYXJhbSB7T2JqZWN0fSBwYXRoOiDjg5Hjgrnjg4fjg7zjgr9cbiMgQHBhcmFtIHtOdW1iZXJ9IG1vcnBoOiDjg6Ljg7zjg5XjgqPjg7PjgrDjga7liJ3mnJ/kvY3nva4o44OH44OV44Kp44Or44OIOjEpXG4jIFxuY2xhc3MgQnRuIGV4dGVuZHMgcGFwZXIuR3JvdXBcblxuXHRjb25zdHJ1Y3RvcjogKHBhdGhlcywgbW9ycGggPSAxKSAtPlxuXHRcdHN1cGVyKClcblxuXHRcdFV0aWxzLnRyYW5zZm9ybUluaXQgQFxuXHRcdEBtb3JwaCA9IG1vcnBoXG5cblx0XHRAUHJlc3NTVkcgPSBAaW1wb3J0U1ZHIENvbmZpZy5TVkcuUFJFU1Ncblx0XHRAUHJlc3NTVkcucmVtb3ZlKClcblx0XHRAUHJlc3MgPSBAUHJlc3NTVkcuY2hpbGRyZW5bMF1cblxuXHRcdEBiYXNlU1ZHID0gQGltcG9ydFNWRyBDb25maWcuU1ZHLkJBU0Vcblx0XHRAYmFzZVNWRy5yZW1vdmUoKVxuXHRcdEBiYXNlID0gQGJhc2VTVkcuY2hpbGRyZW5bMF1cblxuXHRcdEBwdWxsU1ZHID0gQGltcG9ydFNWRyBDb25maWcuU1ZHLlBVTExcblx0XHRAcHVsbFNWRy5yZW1vdmUoKVxuXHRcdEBwdWxsID0gQHB1bGxTVkcuY2hpbGRyZW5bMF1cblxuXHRcdEBwYXRoZXMgPSBbXVxuXG5cdFx0IyDlvJXmlbDjgafjg5HjgrnjgYzjgYLjgozjgbDkuIrmm7jjgY3jgarjgZHjgozjgbDjg5njg7zjgrfjg4Pjgq9cblx0XHRpZiBwYXRoZXM/XG5cdFx0XHRmb3IgcGF0aCBpbiBwYXRoZXNcblx0XHRcdFx0QHBhdGhlcy5wdXNoIHBhdGhcblx0XHRlbHNlXG5cdFx0XHRAcGF0aGVzID0gW1xuXHRcdFx0XHRAcHVsbC5jbG9uZSgpXG5cdFx0XHRcdEBiYXNlLmNsb25lKClcblx0XHRcdFx0QFByZXNzLmNsb25lKClcblx0XHRcdF1cblxuXHRcdCMg57eaXG5cdFx0QHN0cm9rZSA9IG5ldyBNb3JwaGFibGVQYXRoIEBwYXRoZXMsIEBtb3JwaFxuXHRcdEBzdHJva2UuZmlsbENvbG9yID0gbmV3IHBhcGVyLkNvbG9yKDAsMCwwLDApXG5cdFx0QHN0cm9rZS5zdHJva2VDb2xvciA9IENvbmZpZy5DT0xPUi5CVE5fUEFUSFxuXHRcdEBzdHJva2Uuc3Ryb2tlV2lkdGggPSBDb25maWcuTElORV9XSURUSFxuXHRcdEBhZGRDaGlsZCBAc3Ryb2tlXG5cblx0XHQjIOWhl1xuXHRcdEBmaWxsID0gbmV3IE1vcnBoYWJsZVBhdGggQHBhdGhlcywgQG1vcnBoXG5cdFx0QGZpbGwuZmlsbENvbG9yID0gQ29uZmlnLkNPTE9SLkJUTl9GSUxMXG5cdFx0QGZpbGwuc3Ryb2tlV2lkdGggPSAwXG5cdFx0QGluc2VydENoaWxkKDAsIEBmaWxsKVxuXG5cdFx0QHByZXNzT2Zmc2V0ID0gMFxuXHRcdEBwcmVzcyA9IDBcblxuXHRcdCMg44Oc44K/44Oz44Gu5oq85LiL44Gu5oq844GX5Yqg5ribKHZhbDoxIH4gMClcblx0XHRAcHJlc3NXZWlnaHQgPSAwXG5cblx0XHQjIOODnOOCv+ODs+OBruaKvOS4i+OBruaflOOCieOBi+OBlSh2YWw6MSB+IDApXG5cdFx0QHNvZnQgPSAwLjRcblxuXHRcdEBpbml0KClcblxuXHRcdHJldHVyblxuXG5cdCMgXG5cdCMg44Kk44OL44K344Oj44Op44Kk44K6XG5cdCMgXG5cdGluaXQ6IC0+XG5cdFx0QF9vbkluaXQoKVxuXHRcdHJldHVyblxuXG5cdCMgXG5cdCMg44Ki44OD44OX44OH44O844OIXG5cdCMgXG5cdHVwZGF0ZTogPT5cblx0XHRpZiBAcHJlc3MgPCAtMSB0aGVuIEBwcmVzcyA9IC0xXG5cdFx0ZWxzZSBpZiBAcHJlc3MgPiAyIHRoZW4gQHByZXNzID0gMlxuXG5cdFx0cHJlc3MgPSBAcHJlc3MgKiAwLjc1ICsgQHByZXNzT2Zmc2V0ICogMC4yNVxuXHRcdFxuXHRcdCMgeeW6p+aomVxuXHRcdHkgPSBwcmVzc1xuXHRcdGlmIHkgPCAwIHRoZW4geSA9IDBcblx0XHRlbHNlIGlmIHkgPiAxIHRoZW4geSA9IDFcblxuXHRcdCMg5oq844GX5Yqg5rib6Kq/5pW0XG5cdFx0eSA9IHkgKiAoMSAtIEBwcmVzc1dlaWdodClcblxuXHRcdEBwb3NpdGlvbi55ID0gVFdFRU4uRWFzaW5nLlNpbnVzb2lkYWwuSW5PdXQoeSkgKiAyMFxuXHRcdFxuXHRcdGlmIEBwcmVzcyA8IDBcblx0XHRcdEBtb3JwaCA9IEBwcmVzcyArIDFcblx0XHRcdEBzdHJva2UudXBkYXRlIEBtb3JwaFxuXHRcdFx0QGZpbGwudXBkYXRlIEBtb3JwaFxuXG5cdFx0ZWxzZSBpZiBAcHJlc3MgPiAxXG5cdFx0XHQjIOaflOOCieOBi+OBleiqv+aVtFxuXHRcdFx0QG1vcnBoID0gMSArICgoQHByZXNzIC0gMSkgKiBAc29mdClcblx0XHRcdEBzdHJva2UudXBkYXRlIEBtb3JwaFxuXHRcdFx0QGZpbGwudXBkYXRlIEBtb3JwaFxuXG5cdFx0QF9vblVwZGF0ZSgpXG5cdFx0cmV0dXJuXG5cblx0IyBcblx0IyDjg57jgqbjgrnjgpLmirzjgZfjgZ/mmYJcblx0IyBcblx0ZG93bjogPT5cblx0XHRAZG93blR3ZWVuID0gbmV3IFRXRUVOLlR3ZWVuKEApXG5cdFx0XHQudG8oeydwcmVzc09mZnNldCc6IDF9LCAxNTApXG5cdFx0XHQuZWFzaW5nKFRXRUVOLkVhc2luZy5FeHBvLk91dClcblx0XHRcdC5zdGFydCgpXG5cblx0XHRAX29uRG93bigpXG5cdFx0cmV0dXJuXG5cdFxuXHQjIFxuXHQjIOODnuOCpuOCueOCkumbouOBl+OBn+aZglxuXHQjIFxuXHR1cDogPT5cblx0XHRAdHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4oQClcblx0XHRcdC50byh7J3ByZXNzJzogMCwgJ3ByZXNzT2Zmc2V0JzogMH0sIDEwMClcblx0XHRcdC5vblVwZGF0ZSggPT5cblx0XHRcdFx0QHVwZGF0ZSgpXG5cdFx0XHQpXG5cdFx0XHQuZWFzaW5nKFRXRUVOLkVhc2luZy5CYWNrLk91dClcblx0XHRcdC5zdGFydCgpXG5cblx0XHRAX29uVXAoKVxuXHRcdHJldHVyblxuXG5cdCMgXG5cdCMg44Oq44K744OD44OIXG5cdCMgQHBhcmFtIHtOdW1iZXJ9IG1vcnBoOiDjg6Ljg7zjg5XjgqPjg7PjgrDkvY3nva5cblx0IyBcblx0cmVzZXQ6IChtb3JwaCA9IDEpLT5cblx0XHRAdmlzaWJsZSA9IHRydWVcblx0XHRAbW9ycGggPSBtb3JwaFxuXHRcdEBwcmVzcyA9IDBcblx0XHRAcHJlc3NPZmZzZXQgPSAwXG5cdFx0QHBvc2l0aW9uLnNldCAwLCAwXG5cdFx0XG5cdFx0QHN0cm9rZS52aXNpYmxlID0gdHJ1ZVxuXHRcdEBzdHJva2Uub3BhY2l0eSA9IDFcblx0XHRAc3Ryb2tlLnBvc2l0aW9uLnNldCAwLCAwXG5cdFx0QHN0cm9rZS51cGRhdGUgQG1vcnBoXG5cdFx0QHN0cm9rZS5zdHJva2VDb2xvciA9IENvbmZpZy5DT0xPUi5CVE5fUEFUSFxuXG5cdFx0QGZpbGwudmlzaWJsZSA9IHRydWVcblx0XHRAZmlsbC5vcGFjaXR5ID0gMVxuXHRcdEBmaWxsLnBvc2l0aW9uLnNldCAwLCAwXG5cdFx0QGZpbGwudXBkYXRlIEBtb3JwaFxuXHRcdEBmaWxsLmZpbGxDb2xvciA9IENvbmZpZy5DT0xPUi5CVE5fRklMTFxuXHRcdHJldHVyblxuXG5cbiMqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4jIOOCteODluOCr+ODqeOCueOBp+Wun+ijheOBmeOBueOBjeODoeOCveODg+ODiVxuIyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblx0IyBcblx0IyBcblx0IyBcblx0X29uSW5pdDogLT5cblx0XHRyZXR1cm5cblxuXHQjIFxuXHQjIFxuXHQjIFxuXHRfb25VcGRhdGU6IC0+XG5cdFx0cmV0dXJuXG5cblx0IyBcblx0IyBcblx0IyBcblx0X29uRG93bjogLT5cblx0XHRyZXR1cm5cblxuXHQjIFxuXHQjIFxuXHQjIFxuXHRfb25VcDogLT5cblx0XHRyZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBCdG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vX2NvZmZlZS9mb3JtYXQvYnRuLmNvZmZlZVxuICoqLyIsIiMjI1xuYXV0aDogS2ltdXJhXG5kYXRhOiAyMDE2LzA1LzIwXG4jIyNcblxuQ29uZmlnID0ge31cbkNvbmZpZy5LT05BTUlfQ09NTUFORCA9ICfihpEg4oaRIOKGkyDihpMg4oaQIOKGkiDihpAg4oaSIGIgYSdcbkNvbmZpZy5MSU5FX1dJRFRIID0gNS41XG5Db25maWcuQkFTRV9TVEFHRV9XSURUSCA9IDQwMFxuXG5Db25maWcuQ09MT1IgPSB7XG5cdEJBU0VfUEFUSCAgICAgIDogJ2JsYWNrJ1xuXHRCQVNFX0ZJTEwgICAgICA6ICcjZTJlY2VkJ1xuXHRCVE5fUEFUSCAgICAgICA6ICdibGFjaydcblx0QlROX0ZJTEwgICAgICAgOiAnI2ZkZjY2Mydcblx0TE9HT19UWVBFX0ZJTEwgOiAnYmxhY2snXG59XG5cbkNvbmZpZy5DYW52YXMgPSB7XG5cdHdyYXAgIDogXCJDYW52YXNcIlxuXHRwYXBlciA6IFwiUGxheVwiXG59XG5cbiMg44K144Km44Oz44OJanNvblxuQ29uZmlnLlNvdW5kSnNvbiA9XG5cdCdkZWZhdWx0JzogJy9zb3VuZC9kZWZhdWx0Lmpzb24nXG5cdCdzZWNyZXQnOiAnL3NvdW5kL3NlY3JldC5qc29uJ1xuXG4jIOODmeODvOOCuVNWR1xuQ29uZmlnLlNWRyA9IHt9XG5cbiMg44Oc44K/44Oz77yI5Zyf5Y+wICsg44Oc44K/44OzKVxuQ29uZmlnLlNWRy5CQVNFID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG5cdDwhLS0gWzBdIOODnOOCv+ODsyAtLT5cblx0PHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTS01MS4xLTE2bDEuMi0zMS4zYzAuMy00LjgsNC4yLTguNiw5LTguN2M5LjctMC41LDIwLjItMC41LDMyLjMtMC41czIyLjcsMCwzMi4zLDAuNWM0LjgsMC4xLDguNywzLjksOSw4LjdMMzMuOS0xNlwiLz5cblx0PCEtLSBbMV0g5Zyf5Y+wIC0tPlxuXHQ8cG9seWxpbmUgY2xhc3M9XCJzdDBcIiBwb2ludHM9XCItODEuMSw0IC02Ni4xLDQgLTYxLjEsLTE2IDQzLjksLTE2IDQ4LjksNCA2My45LDQgXCIvPlxuXHQ8IS0tPHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTS04MS4xLDExLjdsMTUtNy43YzAsMC0zLjUtMTEuNSw1LTIwczc5LjEtNTcuMywxMDUsMGM1LjQsMTEuOSw1LDIwLDUsMjBoMTVcIi8+LS0+XG48L3N2Zz4nXG5cbiMg44Oc44K/44Oz5byV44Gj5by144KJ44KM44Gf5b2iXG5Db25maWcuU1ZHLlBVTEwgPSAnPHN2ZyBpZD1cIlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE0NVwiIGhlaWdodD1cIjYxXCIgdmlld0JveD1cIjAgMCAxNDUgNjFcIj5cblx0PHBhdGggY2xhc3M9XCJzdDJcIiBkPVwiTS01MS0xNmwxLjItMzMuM2MwLjMtNC44LDQuMi04LjYsOS04LjdjOS43LTAuNSwyMC4yLTEuNSwzMi4zLTEuNXMyMi43LDEsMzIuMywxLjVjNC44LDAuMSw4LjcsMy45LDksOC43TDM0LTE2XCIvPlxuPC9zdmc+J1xuXG4jIOODnOOCv+ODs+aKvOOBleOCjOOBn+W9olxuQ29uZmlnLlNWRy5QUkVTUyA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuXHQ8cGF0aCBjbGFzcz1cInN0M1wiIGQ9XCJNLTUzLTE2bDEuMi0zMy4zYzAuMy00LjgsNC4yLTguNiw5LTguN2M5LjctMC41LDIyLjIsMy41LDM0LjMsMy41czI0LjctNCwzNC4zLTMuNWM0LjgsMC4xLDguNywzLjksOSw4LjdMMzYtMTZcIi8+XG48L3N2Zz4nXG5cbiMg44Ot44K044OG44Kt44K544OIKEJVVFRPTiBJTkMuKVxuIyBAcGF0aGVzWzJdICMgQlxuIyBAcGF0aGVzWzNdICMgVVxuIyBAcGF0aGVzWzRdICMgVFxuIyBAcGF0aGVzWzVdICMgVFxuIyBAcGF0aGVzWzBdICMgT1xuIyBAcGF0aGVzWzFdICMgTlxuIyBAcGF0aGVzWzZdICMgSVxuIyBAcGF0aGVzWzldICMgTlxuIyBAcGF0aGVzWzddICMgQ1xuIyBAcGF0aGVzWzhdICMgLlxuQ29uZmlnLlNWRy5MT0dPX1RZUEUgPSAnPHN2ZyBpZD1cIlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE0NVwiIGhlaWdodD1cIjYxXCIgdmlld0JveD1cIjAgMCAxNDUgNjFcIj5cbjxwYXRoIGQ9XCJNLTI5LjQsNDRMLTI5LjQsNDRjMC02LjgsNS4zLTEyLjQsMTIuNy0xMi40czEyLjYsNS41LDEyLjYsMTIuMnYwLjFjMCw2LjgtNS4zLDEyLjMtMTIuNywxMi4zUy0yOS40LDUwLjctMjkuNCw0NHpcblx0IE0tOS40LDQ0TC05LjQsNDRjMC00LjMtMy4xLTcuOC03LjQtNy44cy03LjQsMy40LTcuNCw3LjZ2MC4xYzAsNC4yLDMuMSw3LjcsNy40LDcuN0MtMTIuNCw1MS42LTkuNCw0OC4yLTkuNCw0NHpcIi8+XG48cGF0aCBkPVwiTTQuOSwzMmgzLjdjMC4yLDAsMC41LDAuMSwwLjYsMC4zbDEwLjksMTQuNHYtMTRjMC0wLjQsMC4zLTAuOCwwLjgtMC44aDMuN2MwLjQsMCwwLjgsMC4zLDAuOCwwLjhWNTVcblx0YzAsMC40LTAuMywwLjgtMC44LDAuOGgtMy4zYy0wLjIsMC0wLjUtMC4xLTAuNi0wLjNMOS4zLDQwLjd2MTQuNGMwLDAuNC0wLjMsMC44LTAuOCwwLjhINC45Yy0wLjQsMC0wLjgtMC4zLTAuOC0wLjhWMzIuN1xuXHRDNC4xLDMyLjMsNC41LDMyLDQuOSwzMnpcIi8+XG48cGF0aCBkPVwiTS0xMjguMywzMi43YzAtMC40LDAuMy0wLjgsMC44LTAuOGg4LjFjMi43LDAsNC45LDAuNyw2LjIsMi4xYzEuMSwxLjEsMS42LDIuNCwxLjYsNHYwLjJjMCwyLjgtMS41LDQuMy0zLjIsNS4yXG5cdGMyLjUsMSw0LjIsMi41LDQuMiw1Ljd2MC4yYzAsNC4zLTMuNCw2LjUtOC42LDYuNWgtOC4zYy0wLjQsMC0wLjgtMC4zLTAuOC0wLjhDLTEyOC4zLDU1LTEyOC4zLDMyLjctMTI4LjMsMzIuN3ogTS0xMTYuNSwzOVxuXHRjMC0xLjctMS4yLTIuNy0zLjMtMi43aC0zLjd2NS40aDMuNEMtMTE3LjksNDEuNy0xMTYuNSw0MC44LTExNi41LDM5TC0xMTYuNSwzOXogTS0xMTkuMSw0NS45aC00LjN2NS42aDQuNGMyLjIsMCwzLjYtMSwzLjYtMi44XG5cdGwwLDBDLTExNS40LDQ2LjktMTE2LjcsNDUuOS0xMTkuMSw0NS45elwiLz5cbjxwYXRoIGQ9XCJNLTEwMi43LDQ2LjVWMzIuN2MwLTAuNCwwLjMtMC44LDAuOC0wLjhoMy40YzAuNCwwLDAuOCwwLjMsMC44LDAuOHYxMy44YzAsMy40LDEuNiw1LDQuMSw1czQuMS0xLjYsNC4xLTQuOVYzMi43XG5cdGMwLTAuNCwwLjMtMC44LDAuOC0wLjhoMy40YzAuNCwwLDAuOCwwLjMsMC44LDAuOHYxMy43YzAsNi42LTMuNiw5LjctOS4xLDkuN0MtOTkuMiw1Ni4yLTEwMi43LDUzLTEwMi43LDQ2LjV6XCIvPlxuPHBhdGggZD1cIk0tNzAuNSwzNi41aC01LjJjLTAuNCwwLTAuOC0wLjMtMC44LTAuOHYtMy4xYzAtMC40LDAuMy0wLjgsMC44LTAuOGgxNS40YzAuNCwwLDAuOCwwLjMsMC44LDAuOHYzLjFjMCwwLjQtMC4zLDAuOC0wLjgsMC44XG5cdGgtNS4yVjU1YzAsMC40LTAuMywwLjgtMC44LDAuOGgtMy40Yy0wLjQsMC0wLjgtMC4zLTAuOC0wLjhWMzYuNXpcIi8+XG48cGF0aCBkPVwiTS00Ni42LDM2LjVoLTUuMmMtMC40LDAtMC44LTAuMy0wLjgtMC44di0zLjFjMC0wLjQsMC4zLTAuOCwwLjgtMC44aDE1LjRjMC40LDAsMC44LDAuMywwLjgsMC44djMuMWMwLDAuNC0wLjMsMC44LTAuOCwwLjhcblx0aC01LjJWNTVjMCwwLjQtMC4zLDAuOC0wLjgsMC44aC0zLjRjLTAuNCwwLTAuOC0wLjMtMC44LTAuOEMtNDYuNiw1NS00Ni42LDM2LjUtNDYuNiwzNi41elwiLz5cbjxwYXRoIGQ9XCJNNDguNCwzMmgzLjRjMC40LDAsMC44LDAuMywwLjgsMC44djIyLjNjMCwwLjQtMC4zLDAuOC0wLjgsMC44aC0zLjRjLTAuNCwwLTAuOC0wLjMtMC44LTAuOFYzMi43QzQ3LjYsMzIuMyw0OCwzMiw0OC40LDMyelxuXHRcIi8+XG48cGF0aCBkPVwiTTkwLjcsNDQuNHYtMC4zYzAtNy4yLDQuNS0xMi4xLDEwLjgtMTIuMWMzLjIsMCw1LjQsMS4xLDcuMiwyLjdjMC4zLDAuMywwLjMsMC43LDAuMSwxbC0yLDIuNmMtMC4zLDAuMy0wLjgsMC40LTEuMSwwLjFcblx0Yy0xLjMtMS4xLTIuNi0xLjgtNC4zLTEuOGMtMy4yLDAtNS41LDMtNS41LDcuNnYwLjFjMCw0LjcsMi40LDcuNiw1LjYsNy42YzEuNywwLDMtMC43LDQuMy0yYzAuMy0wLjMsMC44LTAuMiwxLjEsMC4xbDIsMi40XG5cdGMwLjMsMC4zLDAuMiwwLjcsMCwxYy0yLDEuOS00LjIsMy4xLTcuNiwzLjFDOTQuOSw1Ni40LDkwLjcsNTEuNiw5MC43LDQ0LjR6XCIvPlxuPHBhdGggZD1cIk0xMTUuNyw1MC45aDMuOGMwLjQsMCwwLjgsMC4zLDAuOCwwLjh2My43YzAsMC40LTAuMywwLjgtMC44LDAuOGgtMy44Yy0wLjQsMC0wLjgtMC4zLTAuOC0wLjh2LTMuN1xuXHRDMTE1LDUxLjIsMTE1LjMsNTAuOSwxMTUuNyw1MC45elwiLz5cbjxwYXRoIGQ9XCJNNjIuNiwzMmgzLjdjMC4yLDAsMC41LDAuMSwwLjYsMC4zbDEwLjksMTQuNHYtMTRjMC0wLjQsMC4zLTAuOCwwLjgtMC44aDMuN2MwLjQsMCwwLjgsMC4zLDAuOCwwLjhWNTVcblx0YzAsMC40LTAuMywwLjgtMC44LDAuOGgtMy40Yy0wLjIsMC0wLjUtMC4xLTAuNi0wLjNMNjcsNDAuN3YxNC40YzAsMC40LTAuMywwLjgtMC44LDAuOGgtMy43Yy0wLjQsMC0wLjgtMC4zLTAuOC0wLjhWMzIuN1xuXHRDNjEuOSwzMi4zLDYyLjIsMzIsNjIuNiwzMnpcIi8+XG48L3N2Zz5cbidcblxuIyMjIyMjIyMjIyMjIyMjI1xuIyDjg5fjg6rjg7NcbiMjIyMjIyMjIyMjIyMjIyNcbkNvbmZpZy5QdWRkaW5nID0ge31cbkNvbmZpZy5QdWRkaW5nLkNPTE9SID0gXG5cdENBUkFNRUxcdDogXCIjNTkyYzAwXCJcblx0QkFTRVx0XHQ6IFwiI0ZERjY2M1wiXG5cbkNvbmZpZy5QdWRkaW5nLlNPVU5EID0ge1xuXHRcIlNFMVwiOiB7XG5cdFx0XCJOT1JNQUxcIjogW1xuXHRcdFx0XCJQdWRkaW5nXzBcIlxuXHRcdFx0XCJQdWRkaW5nXzFcIlxuXHRcdFx0XCJQdWRkaW5nXzJcIlxuXHRcdFx0XCJQdWRkaW5nXzNcIlxuXHRcdF1cblx0XHRcIlNFQ1JFVFwiOiBbXG5cdFx0XHRcIlNfUHVkZGluZ18wXCJcblx0XHRcdFwiU19QdWRkaW5nXzFcIlxuXHRcdFx0XCJTX1B1ZGRpbmdfMlwiXG5cdFx0XHRcIlNfUHVkZGluZ180XCJcblx0XHRcdFwiU19QdWRkaW5nXzVcIlxuXHRcdFx0XCJTX1B1ZGRpbmdfNlwiXG5cdFx0XVxuXHR9XG59XG5Db25maWcuUHVkZGluZy5TVkcgPSB7fVxuXG4jIOODmeODvOOCuVxuQ29uZmlnLlB1ZGRpbmcuU1ZHLkJhc2UgPSAnPHN2ZyBpZD1cIlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE0NVwiIGhlaWdodD1cIjYxXCIgdmlld0JveD1cIjAgMCAxNDUgNjFcIj5cbjxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0tNTMtMTZsMS4yLTMzLjNjMC4yLTQuOCw0LjItOC40LDktOC43YzkuNy0wLjUsMjIuMiwzLjUsMzQuMywzLjVzMjQuNy00LDM0LjMtMy41YzQuOCwwLjIsOC44LDMuOCw5LDguN1xuXHRMMzYtMTZcIi8+XG48cGF0aCBjbGFzcz1cInN0MVwiIGQ9XCJNLTktNTQuOGMtMTMuNiwwLTI4LjYtMy45LTMwLjUtMy45Yy00LjEsMC4xLTkuOCwwLjktMTEsNC40Yy0wLjQsMS4xLTAuNywyLjItMC45LDNjLTAuNSwxLjgtMC43LDIuOS0wLjcsMi45XG5cdGw0My4xLDJjMCwwLDE1LjQsMC4yLDE3LjMsMC43YzEuOCwwLjYsNS4yLDMuMyw3LjUsMy4zczUuMy0yLjMsNy40LTMuM2MyLjEtMC45LDExLjktMi43LDExLjktMi43czAtMy40LTEuMi01LjJzLTMuNy00LjktOC4xLTUuMVxuXHRDMjMuNS01OC44LDUuOS01NC44LTktNTQuOHpcIi8+XG48L3N2Zz4nXG5cbiMg6JC944Gh44Gm5bqD44GM44Gj44Gf5b2iXG5Db25maWcuUHVkZGluZy5TVkcuU3RyZXRjaCA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuPHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTTQwLjMsMGMwLDAtMy45LTM4LjEtOS40LTQ5LjljLTIuMi00LjctNC40LTUuNi05LjMtNS45Yy05LjctMC41LTE4LjctMC41LTMwLjgtMC41cy0yMS4yLDAtMzAuOCwwLjVcblx0Yy00LjgsMC4yLTcuMSwxLjItOS4zLDUuOUMtNTQuOC0zOC4xLTU4LjcsMC01OC43LDBcIi8+XG48cGF0aCBjbGFzcz1cInN0MVwiIGQ9XCJNLTkuMi01Ni4zYy0xMi4xLDAtMjEuMiwwLTMwLjgsMC41Yy00LjgsMC4yLTcuMSwxLjItOS4zLDUuOWMtMC40LDAuOC0wLjcsMS43LTEuMSwyLjdjMTYuNy0xLjEsNDIuMSwxLDQyLjEsMVxuXHRzNi40LDAsMTMsMS4yYzMuNSwwLjYsNi40LDIuOCw5LjksMi44czYuNC0xLjksOS4yLTIuN2M0LjMtMS4yLDcuNy0xLjksNy43LTEuOWgwLjdjLTAuNC0xLjItMC44LTIuMy0xLjMtMy4yXG5cdGMtMi4yLTQuNy00LjQtNS42LTkuMy01LjlDMTEuOS01Ni4zLDIuOS01Ni4zLTkuMi01Ni4zelwiLz5cbjwvc3ZnPidcblxuIyDlh7lcbkNvbmZpZy5QdWRkaW5nLlNWRy5QcmVzcyA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuPHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTTM5LjktMC41YzAsMCwyLjctMzYtOC40LTQ2Yy0zLjMtMi45LTUuOS0zLjctMTAuNS0yLjVjLTkuNCwyLjUtMTguNSw3LjItMzAuNiw3LjJzLTIxLjMtNC43LTMwLjYtNy4yXG5cdGMtNC42LTEuMi03LjItMC40LTEwLjUsMi41Yy0xMSw5LjktOC40LDQ2LTguNCw0NlwiLz5cbjxwYXRoIGNsYXNzPVwic3QxXCIgZD1cIk0tOS42LTQxLjhjLTEyLjEsMC0yMS4zLTQuNy0zMC42LTcuMmMtNC42LTEuMi03LjItMC40LTEwLjUsMi41Yy0wLjYsMC41LTEuMiwxLjItMS43LDEuOVxuXHRjNi43LDMuOCwyNC45LDEyLjksNDQuOCwxMi45YzcuNCwwLDEwLjUtMC4xLDE2LjUtMy4xYzYuNi0zLjMsNi4zLTAuNiw5LjcsMGM0LDAuNyw1LTMuNCw2LjgtNS44YzIuMy0zLDMuOC0zLjcsNi43LTQuMlxuXHRjMC4zLTAuMSwwLjYtMC4xLDAuOS0wLjJjLTAuNC0wLjUtMC45LTEtMS40LTEuNWMtMy4zLTIuOS01LjktMy43LTEwLjUtMi41QzExLjctNDYuNSwyLjUtNDEuOC05LjYtNDEuOHpcIi8+XG48L3N2Zz4nXG5cbiMg5Ye4XG5Db25maWcuUHVkZGluZy5TVkcuUHVsbCA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuPHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTTQwLDBjMCwwLTYuOC0yNC4xLTkuMi01My40Yy0wLjYtNy4yLTMuNS0xMC41LTcuOS0xMi40Yy03LjYtMy4zLTIwLjItNC41LTMyLjMtNC41cy0yNC44LDEuMi0zMi4zLDQuNVxuXHRjLTQuNCwxLjktNy4zLDUuMi03LjksMTIuNEMtNTIuMi0yNC4xLTU5LDAtNTksMFwiLz5cbjxwYXRoIGNsYXNzPVwic3QxXCIgZD1cIk0tOS41LTcwLjNjLTEyLjEsMC0yNC43LDEuMi0zMi4zLDQuNWMtMS40LDAuNi0yLjcsMS40LTMuOCwyLjRjLTEuNSwxLjMtMi42LDMtMy4zLDUuNFxuXHRjNy4xLTEuOCwyMC41LTQuMSw0MS40LTQuMWM2LjcsMCw5LjMsMC41LDE0LjUsMS43YzMuNSwwLjksNC45LDMuNyw4LjMsNC40YzQuNSwwLjgsNi40LTEuMiw5LjItMmMxLjYtMC40LDMtMC4zLDQuMiwwLjFcblx0YzAuNSwwLjEsMSwwLjMsMS40LDAuNWMtMC42LTIuMi0xLjUtMy44LTIuNy01LjJjLTEuMi0xLjQtMi44LTIuNC00LjUtMy4xQzE1LjMtNjkuMSwyLjYtNzAuMy05LjUtNzAuM3pcIi8+XG48L3N2Zz4nXG5cbiMg5Z6C44KM44KLXG5Db25maWcuUHVkZGluZy5TVkcuRHJpcCA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuPHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTTQwLjMsMGMwLDAtMy45LTM4LjEtOS40LTQ5LjljLTIuMi00LjctNC40LTUuNi05LjMtNS45QzEyLTU2LjMsMi45LTU2LjMtOS4yLTU2LjNzLTIxLjIsMC0zMC44LDAuNVxuXHRjLTQuOCwwLjItNy4xLDEuMi05LjMsNS45Qy01NC44LTM4LjEtNTguNywwLTU4LjcsMFwiLz5cbjxwYXRoIGNsYXNzPVwic3QxXCIgZD1cIk0tOS4yLTU2LjNjLTEyLjEsMC0yMS4yLDAtMzAuOCwwLjVjLTQuOCwwLjItNy4xLDEuMi05LjMsNS45Yy0wLjQsMC44LTAuOCwxLjgtMS4yLDIuOVxuXHRjMTguMy0wLjcsMzcuOCwwLjMsNDIuMiwwLjNjNC44LDAsMTAuOSwwLjYsMTQuNSwyLjhjNC43LDIuOCw1LjQsMTMuMiw4LjksMTMuMnMzLjgtOS44LDcuMi0xM2MxLjktMS45LDYuNC0yLjksOS4yLTIuOVxuXHRjMC4yLDAsMC41LDAsMC43LDBjLTAuNC0xLjItMC44LTIuMy0xLjMtMy4yYy0yLjItNC43LTQuNC01LjYtOS4zLTUuOUMxMi01Ni4zLDIuOS01Ni4zLTkuMi01Ni4zelwiLz5cbjwvc3ZnPidcblxuIyMjIyMjIyMjIyMjIyMjI1xuIyDniIbnmbpcbiMjIyMjIyMjIyMjIyMjIyNcbkNvbmZpZy5FeHBsb3Npb24gPSB7fVxuQ29uZmlnLkV4cGxvc2lvbi5DT0xPUiA9IFxuXHRQUkVTU19GSUxMOiBcIiNGRjAzMDBcIlxuXG5Db25maWcuRXhwbG9zaW9uLlNPVU5EID0ge1xuXHRcIlNFMVwiOiB7XG5cdFx0XCJOT1JNQUxcIjogW1wiRXhwbG9zaW9uXzBcIl1cblx0XHRcIlNFQ1JFVFwiOiBbXG5cdFx0XHRcIlNfRXhwbG9zaW9uXzBfMVwiXG5cdFx0XHRcIlNfRXhwbG9zaW9uXzBfMlwiXG5cdFx0XHRcIlNfRXhwbG9zaW9uXzBfM1wiXG5cdFx0XHRcIlNfRXhwbG9zaW9uXzBfNFwiXG5cdFx0XHRcIlNfRXhwbG9zaW9uXzBfNVwiXG5cdFx0XVxuXHR9XG5cdFwiU0UyXCI6IHtcblx0XHRcIk5PUk1BTFwiOiBbXCJFeHBsb3Npb25fMVwiXVxuXHRcdFwiU0VDUkVUXCI6IFtcblx0XHRcdFwiU19Hb2hzdF8wXzBcIlxuXHRcdFx0XCJTX0dvaHN0XzBfMVwiXG5cdFx0XHRcIlNfR29oc3RfMF8yXCJcblx0XHRcdFwiU19Hb2hzdF8wXzNcIlxuXHRcdF1cblx0fVxuXHRcIlNFM1wiOiB7XG5cdFx0XCJOT1JNQUxcIjogW1wiRXhwbG9zaW9uXzJcIl1cblx0XHRcIlNFQ1JFVFwiOiBbXG5cdFx0XHRcIlNfRXhwbG9zaW9uXzJfMFwiXG5cdFx0XHRcIlNfRXhwbG9zaW9uXzJfMVwiXG5cdFx0XHRcIlNfRXhwbG9zaW9uXzJfMlwiXG5cdFx0XHRcIlNfRXhwbG9zaW9uXzJfM1wiXG5cdFx0XHRcIlNfRXhwbG9zaW9uXzJfNFwiXG5cdFx0XVxuXHR9XG59XG5Db25maWcuRXhwbG9zaW9uLlNWRyA9IHt9XG5cbkNvbmZpZy5FeHBsb3Npb24uU1ZHLkluZmxhdGVkID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG5cdDxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0tNTAuOC0xNi4yYzAuMy0xMC43LDAuNy0yMS40LDEtMzIuMWMwLjItNC45LDMuNy0xMS4yLDguNC0xMy45YzkuMy01LjQsMjAuMy04LjcsMzMuMS04LjdjMTIuOCwwLDIzLjgsMy4zLDMzLjEsOC43YzQuNiwyLjcsOC4yLDguOSw4LjQsMTMuOWMwLjQsMTAuNywwLjcsMjEuNCwxLDMyLjFcIi8+XG48L3N2Zz4nXG5cbkNvbmZpZy5FeHBsb3Npb24uU1ZHLkV4cGxvc2lvbkJlZm9yZSA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuXHQ8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+XG5cdFx0LnN0MHtmaWxsOiNGREY2NjM7c3Ryb2tlOiMyMzE4MTU7c3Ryb2tlLXdpZHRoOjUuNTtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fVxuXHQ8L3N0eWxlPlxuXHQ8cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTEyLjEtMzJsLTE1LDZsLTMtMTJsLTIxLjEsNS41YzAsMC0wLjQsMTAuOS0wLjUsMTYuM2g1MC44Qy00LTIwLjctMTIuMS0zMi0xMi4xLTMyelwiLz5cblx0PHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTTM0LjQtNDYuNEMyOS44LTQ0LDIwLTQwLjIsMjAtNDAuMnMxMC4yLDguNSwxNSwxMy4xQzM0LjgtMzMuNSwzNC42LTQwLDM0LjQtNDYuNHpcIi8+XG5cdDxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0tNDgtNTYuOGMwLDAtMi41LDUuNC0yLjYsNy45Yy0wLjIsNS4zLTAuNSwxNS44LTAuNSwxNS44bDE5LjgtNC40Qy0zMS4zLTM3LjgtNDgtNTYuOC00OC01Ni44elwiLz5cblx0PHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTS0xMi41LTMyLjNjMCwwLTYuOS0xMS4yLTguNi0xMy43Yy0xLjYtMi41LTYuOC03LjEtNi44LTcuMUwtMzEtMzcuOWw0LDExTC0xMi41LTMyLjN6XCIvPlxuXHQ8cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTExLjEtNDAuN2w2LjQtNS4xTDYuNC01OC40bC0wLjItMTNjMCwwLTkuMy0xLjUtMTQuMy0xLjVjLTIuMSwwLTYuMSwwLjMtNi4xLDAuM2wzLjEsMTIuNmwtNy00bC0yLjEsMTYuOWwzLjEsNC43TC0xMS4xLTQwLjd6XCIvPlxuXHQ8cG9seWdvbiBjbGFzcz1cInN0MFwiIHBvaW50cz1cIjEzLjMsLTQ5LjUgMTEuMywtNDUuNSA2LjQsLTU3LjUgLTExLjcsLTQwLjIgLTE3LjYsLTQyLjEgLTkuNywtMzAuNiAxNy4zLC00MC41IFwiLz5cblx0PHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTTI1LjctMzMuOUMyNS40LTM0LjYsMTYtNDAsMTYtNDBsLTI3LDEwYzAsMCw2LjEsOC4zLDkuMSwxMi44aDguNkM2LjctMTcuMiwyNS40LTM0LjYsMjUuNy0zMy45elwiLz5cblx0PHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTTI3LjYtMzMuN0w5LjQtMTcuOWgyNS43YzAsMC0wLjItNi40LTAuMy05LjdDMzIuNS0yOS44LDI3LjYtMzMuNywyNy42LTMzLjd6XCIvPlxuXHQ8cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNMzQuMS00Ni4yYzAsMC0wLjEtMi4xLTAuMS0zLjJjLTAuMi00LjktMy43LTExLjItOC40LTEzLjljLTAuMS0wLjEtMC4zLTAuMS0wLjQtMC4yYy0zLjMsMy43LTkuMywxMi05LjMsMTJ2My42bDIuNiw3LjljMCwwLDAuNywwLDEsMEMyNC4xLTQyLjcsMzQuMS00Ni4yLDM0LjEtNDYuMnpcIi8+XG5cdDxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0xOC40LTUzLjZjMCwwLDMtNyw2LjMtMTAuN2MtNS41LTMuMS0xOC40LTctMTguNC03bDAuNywxNEwxMi4yLTQ2bDItNGwzLjQsMi4xTDE4LjQtNTMuNnpcIi8+XG5cdDxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0tNDEuMS02NC4yYy0yLjMsMS4zLTQuMywzLjUtNS44LDZDLTQyLjktNTAuOC0zMC0zOS0zMC0zOXMyLjUtMTcuNCwzLTE5YzAuOCwxLjUsNS40LDcuMyw2LjksMTAuOGwwLjEsMC4xbDItMTYuOWw3LDRsLTMuMi0xMi42Qy0xNC4xLTcyLjctMjguNC03MS41LTQxLjEtNjQuMnpcIi8+XG5cdDxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0yOC44LTUzLjFcIi8+XG48L3N2Zz4nXG5cbkNvbmZpZy5FeHBsb3Npb24uU1ZHLkV4cGxvc2lvbkJhc2VCZWZvcmUgPSAnPHN2ZyBpZD1cIlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE0NVwiIGhlaWdodD1cIjYxXCIgdmlld0JveD1cIjAgMCAxNDUgNjFcIj5cblx0PHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuXHRcdC5zdDB7ZmlsbDojRTJFQ0VEO3N0cm9rZTojMjMxODE1O3N0cm9rZS13aWR0aDo1LjU7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fVxuXHRcdC5zdDF7ZmlsbDpub25lO3N0cm9rZTojMjMxODE1O3N0cm9rZS13aWR0aDo1LjU7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fVxuXHQ8L3N0eWxlPlxuXHQ8cG9seWxpbmUgY2xhc3M9XCJzdDBcIiBwb2ludHM9XCItNDAuNyw0IC0zOC4xLC0yLjQgLTI4LjEsLTQuNSAtNDMuMSwtOC40IC0zMy4xLC0xNiAtNjAuNywtMTYgLTY1LjcsNCBcIi8+XG5cdDxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0tMTIuMyw0bDQuNy05LjVsOC41LTIuN0wyLjItMTZoLTM0LjhjMCwwLjItMTAsNy42LTEwLDcuNmwxMSwzbC02LDNMLTQwLjEsNFwiLz5cblx0PHBvbHlsaW5lIGNsYXNzPVwic3QwXCIgcG9pbnRzPVwiMTguNCw0IDIxLjQsLTcuNCAyNi40LC0xMi40IDE0LjQsLTE2IDIuNywtMTYgMC40LC04LjQgLTcuOCwtNS41IC0xMi4zLDQgXCIvPlxuXHQ8cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNNDkuNCw0bC01LTIwSDE5YzEsMS4yLDcuMSwzLjYsNy4xLDMuNmwtNCw1TDE5LjEsNFwiLz5cblx0PHBvbHlsaW5lIGNsYXNzPVwic3QxXCIgcG9pbnRzPVwiNDQuNCwtMTUuOCA0OS40LDQuMiA2NC40LDQuMiBcIi8+XG5cdDxwb2x5bGluZSBjbGFzcz1cInN0MVwiIHBvaW50cz1cIi04MC42LDQuMiAtNjUuNiw0LjIgLTYwLjYsLTE1LjggXCIvPlxuPC9zdmc+J1xuXG4jIyMjIyMjIyMjIyMjIyMjXG4jIOOCuOODo+ODs+ODl1xuIyMjIyMjIyMjIyMjIyMjI1xuQ29uZmlnLkp1bXAgPSB7fVxuQ29uZmlnLkp1bXAuU09VTkQgPSB7XG5cdFwiU0UxXCI6IHtcblx0XHRcIk5PUk1BTFwiOiBbXG5cdFx0XHRcIkp1bXBfMF8wXCJcblx0XHRcdFwiSnVtcF8wXzFcIlxuXHRcdF1cblx0XHRcIlNFQ1JFVFwiOiBbXG5cdFx0XHRcIlNfSnVtcF8wXzBcIlxuXHRcdFx0XCJTX0p1bXBfMF8xXCJcblx0XHRdXG5cdH1cblx0XCJTRTJcIjoge1xuXHRcdFwiTk9STUFMXCI6IFtcblx0XHRcdFwiSnVtcF8xXzBcIlxuXHRcdFx0XCJKdW1wXzFfMVwiXG5cdFx0XHRcIkp1bXBfMV8yXCJcblx0XHRdXG5cdFx0XCJTRUNSRVRcIjogW1xuXHRcdFx0XCJTX0p1bXBfMV8xXCJcblx0XHRdXG5cdH1cblx0XCJTRTNcIjoge1xuXHRcdFwiTk9STUFMXCI6IFtcblx0XHRcdFwiSnVtcF8yXzBcIlxuXHRcdFx0XCJKdW1wXzJfMVwiXG5cdFx0XHRcIkp1bXBfMl8yXCJcblx0XHRdXG5cdFx0XCJTRUNSRVRcIjogW1xuXHRcdFx0XCJTX0p1bXBfMl8wXCJcblx0XHRcdFwiU19KdW1wXzJfMVwiXG5cdFx0XHRcIlNfSnVtcF8yXzJcIlxuXHRcdFx0XCJTX0p1bXBfMl8zXCJcblx0XHRcdFwiU19KdW1wXzJfNFwiXG5cdFx0XVxuXHR9XG59XG5Db25maWcuSnVtcC5TVkcgPSB7fVxuXG5Db25maWcuSnVtcC5TVkcuQmFzZVByZXNzID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG5cdDxwb2x5bGluZSBjbGFzcz1cInN0MFwiIHBvaW50cz1cIi04My4xLDQgLTY4LjEsNCAtNjEuMSwtMTQgNDMuOSwtMTQgNTAuOSw0IDY1LjksNCBcIi8+XG48L3N2Zz4nXG5cbiMjIyMjIyMjIyMjIyMjIyNcbiMg44OA44Oz44Oc44O844OrXG4jIyMjIyMjIyMjIyMjIyMjXG5Db25maWcuRGVsaXZlcnkgPSB7fVxuQ29uZmlnLkRlbGl2ZXJ5LkNPTE9SID0gXG5cdEJPWF9GSUxMXHQ6IFwiI0U2REJDM1wiXG5cdEJPWF9QQVRIXHQ6IFwiIzIzMTgxNVwiXG5cdFRBUEVfRklMTFx0OiBcIiNCRjlDNzNcIlxuXG5Db25maWcuRGVsaXZlcnkuU09VTkQgPSB7XG5cdFwiU0UxXCI6IHtcblx0XHRcIk5PUk1BTFwiOiBbXCJEZWxpdmVyeV8wXzBcIl1cblx0XHRcIlNFQ1JFVFwiOiBbXG5cdFx0XHRcIlNfRGVsaXZlcnlfMF8wXCJcblx0XHRcdFwiU19EZWxpdmVyeV8wXzFcIlxuXHRcdF1cblx0fVxuXHRcIlNFMlwiOiB7XG5cdFx0XCJOT1JNQUxcIjogW1wiRGVsaXZlcnlfMV8wXCJdXG5cdFx0XCJTRUNSRVRcIjogW1xuXHRcdFx0XCJTX0RlbGl2ZXJ5XzFfMFwiXG5cdFx0XHRcIlNfRGVsaXZlcnlfMV8xXCJcblx0XHRcdFwiU19EZWxpdmVyeV8xXzJcIlxuXHRcdFx0XCJTX0RlbGl2ZXJ5XzFfM1wiXG5cdFx0XVxuXHR9XG59XG5cbkNvbmZpZy5EZWxpdmVyeS5TVkcgPSB7fVxuXG5Db25maWcuRGVsaXZlcnkuU1ZHLkJveDFfMSA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuPHBvbHlsaW5lIGNsYXNzPVwic3QwXCIgcG9pbnRzPVwiNjkuMSwxOC42IDY5LjEsLTEwMiAtOS4yLC0xMDIuMiAtOS4yLC0xMzUuOSA0OC41LC0xMzYuMSA2OS41LC0xMDMuMiBcIi8+XG48cG9seWxpbmUgY2xhc3M9XCJzdDBcIiBwb2ludHM9XCItODcuOCwtMTAzLjIgLTY2LjgsLTEzNi4xIC05LjIsLTEzNS45IC05LjIsLTEwMi4yIC04Ny41LC0xMDIuMSAtODcuNSwxOC42IFwiLz5cbjxwb2x5Z29uIGNsYXNzPVwic3QwXCIgcG9pbnRzPVwiNjksMTguNSA2OSwtMTAyLjIgLTg3LjcsLTEwMi4yIC04Ny43LDE4LjYgXCIvPlxuPHBvbHlnb24gY2xhc3M9XCJzdDFcIiBwb2ludHM9XCI2LjksLTc0LjIgMi45LC03MC4yIC0xLjEsLTc0LjIgLTUuMSwtNzAuMiAtOS4xLC03NC4yIC0xMy4xLC03MC4yIC0xNy4xLC03NC4yIC0yMS4xLC03MC4yIFxuXHQtMjUuMSwtNzQuMiAtMjUuMSwtMTAyLjIgNi45LC0xMDIuMiBcIi8+XG48cG9seWdvbiBjbGFzcz1cInN0MVwiIHBvaW50cz1cIi0yNS4xLC05LjQgLTIxLjEsLTEzLjQgLTE3LjEsLTkuNCAtMTMuMSwtMTMuNCAtOS4xLC05LjQgLTUuMSwtMTMuNCAtMS4xLC05LjQgMi45LC0xMy40IDYuOSwtOS40IFxuXHQ2LjksMTguNiAtMjUuMSwxOC42IFwiLz5cbjxwb2x5Z29uIGNsYXNzPVwic3QxXCIgcG9pbnRzPVwiMi41LC0xMzUuNSAtOSwtMTM1LjUgLTkuMywtMTM1LjUgLTIwLjksLTEzNS41IC0yNS4yLC0xMDIuNSAtOS4zLC0xMDIuNSAtOSwtMTAyLjUgNi44LC0xMDIuNSBcIi8+XG48L3N2Zz4nXG5cbkNvbmZpZy5EZWxpdmVyeS5TVkcuQm94Ml8xID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG48cG9seWdvbiBjbGFzcz1cInN0MFwiIHBvaW50cz1cIjU2LjUsLTEyMi4yIDQ3LC0xMzUuOCAtNjYuMiwtMTM1LjggLTc0LjMsLTEyMi4yIFwiLz5cbjxwb2x5bGluZSBjbGFzcz1cInN0MFwiIHBvaW50cz1cIi04OC4yLC0xMDIuNSAtNzUuMiwtMTIzLjIgNTYuNSwtMTIzLjIgNjguMywtMTAzLjUgXCIvPlxuPHBvbHlsaW5lIGNsYXNzPVwic3QwXCIgcG9pbnRzPVwiNjkuMSwxOC42IDY5LjEsLTEwMiAtOS4xLC0xMDIuMiAtOS4xLC0xMzUuOSA0OC41LC0xMzYuMSA2OS41LC0xMDMuMiBcIi8+XG48cG9seWxpbmUgY2xhc3M9XCJzdDBcIiBwb2ludHM9XCItODcuOCwtMTAzLjIgLTY2LjgsLTEzNi4xIC05LjIsLTEzNS45IC05LjIsLTEwMi4yIC04Ny41LC0xMDIuMSAtODcuNSwxOC42IFwiLz5cbjxwb2x5Z29uIGNsYXNzPVwic3QwXCIgcG9pbnRzPVwiNjksMTguNSA2OSwtMTAyLjIgLTg3LjYsLTEwMi4yIC04Ny42LDE4LjYgXCIvPlxuPHBvbHlnb24gY2xhc3M9XCJzdDFcIiBwb2ludHM9XCI3LjEsLTc0LjIgMy4xLC03MC4yIC0wLjksLTc0LjIgLTQuOSwtNzAuMiAtOC45LC03NC4yIC0xMi45LC03MC4yIC0xNi45LC03NC4yIC0yMC45LC03MC4yIFxuXHQtMjQuOSwtNzQuMiAtMjQuOSwtMTAyLjIgNy4xLC0xMDIuMiBcIi8+XG48cG9seWdvbiBjbGFzcz1cInN0MVwiIHBvaW50cz1cIi0yNC45LC05LjQgLTIwLjksLTEzLjQgLTE2LjksLTkuNCAtMTIuOSwtMTMuNCAtOC45LC05LjQgLTQuOSwtMTMuNCAtMC45LC05LjQgMy4xLC0xMy40IDcuMSwtOS40IFxuXHQ3LjEsMTguNiAtMjQuOSwxOC42IFwiLz5cbjwvc3ZnPidcblxuQ29uZmlnLkRlbGl2ZXJ5LlNWRy5Cb3gyXzIgPSAnPHN2ZyBpZD1cIlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE0NVwiIGhlaWdodD1cIjYxXCIgdmlld0JveD1cIjAgMCAxNDUgNjFcIj5cbjxwb2x5Z29uIGNsYXNzPVwic3QwXCIgcG9pbnRzPVwiNTUuOCwtMTIyLjIgNDYuMywtMTM1LjggLTY2LjksLTEzNS44IC03NSwtMTIyLjIgXCIvPlxuPHBvbHlsaW5lIGNsYXNzPVwic3QwXCIgcG9pbnRzPVwiLTg4LC0xMDIuNSAtNzUsLTEyMy4yIDU2LjYsLTEyMy4yIDY4LjUsLTEwMy41IFwiLz5cbjxwb2x5bGluZSBjbGFzcz1cInN0MFwiIHBvaW50cz1cIjY5LjEsMTguNiA2OS4xLC0xMDIgLTkuMSwtMTAyLjIgLTkuMSwtMTM1LjkgNDguNSwtMTM2LjEgNjkuNSwtMTAzLjIgXCIvPlxuPHBvbHlsaW5lIGNsYXNzPVwic3QwXCIgcG9pbnRzPVwiLTg3LjksLTEwMy4yIC02Ni45LC0xMzYuMSAtNjcuNCwtMTgwLjIgLTg3LjksLTE4MC4yIC04Ny42LC0xMDIuMSAtODcuNiwxOC42IFwiLz5cbjxwb2x5Z29uIGNsYXNzPVwic3QwXCIgcG9pbnRzPVwiNjguOSwxOC41IDY4LjksLTEwMi4yIC04Ny44LC0xMDIuMiAtODcuOCwxOC42IFwiLz5cbjxwb2x5Z29uIGNsYXNzPVwic3QxXCIgcG9pbnRzPVwiNywtNzQuMiAzLC03MC4yIC0xLC03NC4yIC01LC03MC4yIC05LC03NC4yIC0xMywtNzAuMiAtMTcsLTc0LjIgLTIxLC03MC4yIC0yNSwtNzQuMiAtMjUsLTEwMi4yIFxuXHQ3LC0xMDIuMiBcIi8+XG48cG9seWdvbiBjbGFzcz1cInN0MVwiIHBvaW50cz1cIi0yNSwtOS40IC0yMSwtMTMuNCAtMTcsLTkuNCAtMTMsLTEzLjQgLTksLTkuNCAtNSwtMTMuNCAtMSwtOS40IDMsLTEzLjQgNywtOS40IDcsMTguNiAtMjUsMTguNiBcIi8+XG48L3N2Zz4nXG5cbkNvbmZpZy5EZWxpdmVyeS5TVkcuQm94Ml8zID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG48cG9seWdvbiBjbGFzcz1cInN0MFwiIHBvaW50cz1cIjU1LjgsLTEyMi4yIDQ2LjMsLTEzNS44IC02Ni45LC0xMzUuOCAtNzUsLTEyMi4yIFwiLz5cbjxwb2x5bGluZSBjbGFzcz1cInN0MFwiIHBvaW50cz1cIi04OCwtMTAyLjUgLTc1LC0xMjMuMiA1Ni42LC0xMjMuMiA2OC41LC0xMDMuNSBcIi8+XG48cG9seWxpbmUgY2xhc3M9XCJzdDBcIiBwb2ludHM9XCI2OSwxOC42IDY5LC0xMDIgNjkuNCwtMTc5LjcgNDguNCwtMTc5LjcgNDguNCwtMTM2LjEgNjkuNCwtMTAzLjIgXCIvPlxuPHBvbHlsaW5lIGNsYXNzPVwic3QwXCIgcG9pbnRzPVwiLTg3LjksLTEwMy4yIC02Ni45LC0xMzYuMSAtNjcuNCwtMTgwLjIgLTg3LjksLTE4MC4yIC04Ny42LC0xMDIuMSAtODcuNiwxOC42IFwiLz5cbjxwb2x5Z29uIGNsYXNzPVwic3QwXCIgcG9pbnRzPVwiNjguOSwxOC41IDY4LjksLTEwMi4yIC04Ny44LC0xMDIuMiAtODcuOCwxOC42IFwiLz5cbjxwb2x5Z29uIGNsYXNzPVwic3QxXCIgcG9pbnRzPVwiNywtNzQuMiAzLC03MC4yIC0xLC03NC4yIC01LC03MC4yIC05LC03NC4yIC0xMywtNzAuMiAtMTcsLTc0LjIgLTIxLC03MC4yIC0yNSwtNzQuMiAtMjUsLTEwMi4yIFxuXHQ3LC0xMDIuMiBcIi8+XG48cG9seWdvbiBjbGFzcz1cInN0MVwiIHBvaW50cz1cIi0yNSwtOS40IC0yMSwtMTMuNCAtMTcsLTkuNCAtMTMsLTEzLjQgLTksLTkuNCAtNSwtMTMuNCAtMSwtOS40IDMsLTEzLjQgNywtOS40IDcsMTguNiAtMjUsMTguNiBcIi8+XG48L3N2Zz4nXG5cbkNvbmZpZy5EZWxpdmVyeS5TVkcuQm94M18xID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG48cG9seWdvbiBjbGFzcz1cInN0MFwiIHBvaW50cz1cIjU1LjgsLTEyMi4yIDQ2LjMsLTEzNS44IC02Ni45LC0xMzUuOCAtNzUsLTEyMi4yIFwiLz5cbjxwb2x5bGluZSBjbGFzcz1cInN0MFwiIHBvaW50cz1cIjY5LDE4LjYgNjksLTEwMiA2OS40LC0xNzkuNyA0OC40LC0xNzkuNyA0OC40LC0xMzYuMSA2OS40LC0xMDMuMiBcIi8+XG48cG9seWxpbmUgY2xhc3M9XCJzdDBcIiBwb2ludHM9XCItODcuOSwtMTAzLjIgLTY2LjksLTEzNi4xIC02Ny40LC0xODAuMiAtODcuOSwtMTgwLjIgLTg3LjYsLTEwMi4xIC04Ny42LDE4LjYgXCIvPlxuPHBvbHlnb24gY2xhc3M9XCJzdDBcIiBwb2ludHM9XCI2OC45LDE4LjUgNjguOSwtMTAyLjIgLTg3LjgsLTEwMi4yIC04Ny44LDE4LjYgXCIvPlxuPHBvbHlnb24gY2xhc3M9XCJzdDFcIiBwb2ludHM9XCI3LC03NC4yIDMsLTcwLjIgLTEsLTc0LjIgLTUsLTcwLjIgLTksLTc0LjIgLTEzLC03MC4yIC0xNywtNzQuMiAtMjEsLTcwLjIgLTI1LC03NC4yIC0yNSwtMTAyLjIgXG5cdDcsLTEwMi4yIFwiLz5cbjxwb2x5Z29uIGNsYXNzPVwic3QxXCIgcG9pbnRzPVwiLTI1LC05LjQgLTIxLC0xMy40IC0xNywtOS40IC0xMywtMTMuNCAtOSwtOS40IC01LC0xMy40IC0xLC05LjQgMywtMTMuNCA3LC05LjQgNywxOC42IC0yNSwxOC42IFwiLz5cbjxwb2x5bGluZSBjbGFzcz1cInN0MFwiIHBvaW50cz1cIjY4LjUsLTEwMy41IDU2LjYsLTEyMy4yIC03NSwtMTIzLjIgLTg4LC0xMDIuNSBcIi8+XG48bGluZSBjbGFzcz1cInN0MlwiIHgxPVwiLTg3LjNcIiB5MT1cIi0xMDEuNVwiIHgyPVwiNjguN1wiIHkyPVwiLTEwMS41XCIvPlxuPC9zdmc+J1xuXG5Db25maWcuRGVsaXZlcnkuU1ZHLkJveDNfMiA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuPHBvbHlnb24gY2xhc3M9XCJzdDBcIiBwb2ludHM9XCI0Ny4zLC0xNzkuNyA0Ni4zLC0xMzUuOCAtNjcsLTEzNS44IC02Ny41LC0xNzkuNyBcIi8+XG48cG9seWxpbmUgY2xhc3M9XCJzdDBcIiBwb2ludHM9XCI2OSwxOC42IDY5LC0xMDIgNjguNiwtMTc4LjcgNDguMywtMTc5LjcgNDguMywtMTM2LjEgNjkuMywtMTAzLjIgXCIvPlxuPHBvbHlsaW5lIGNsYXNzPVwic3QwXCIgcG9pbnRzPVwiLTg4LC0xMDMuMiAtNjcsLTEzNi4xIC02Ny40LC0xODAuMiAtODgsLTE4MC4yIC04Ny42LC0xMDIuMSAtODcuNiwxOC42IFwiLz5cbjxwb2x5Z29uIGNsYXNzPVwic3QwXCIgcG9pbnRzPVwiNjguOCwxOC41IDY4LjgsLTEwMi4yIC04Ny44LC0xMDIuMiAtODcuOCwxOC42IFwiLz5cbjxwb2x5Z29uIGNsYXNzPVwic3QxXCIgcG9pbnRzPVwiNywtNzQuMiAzLC03MC4yIC0xLC03NC4yIC01LC03MC4yIC05LC03NC4yIC0xMywtNzAuMiAtMTcsLTc0LjIgLTIxLC03MC4yIC0yNSwtNzQuMiAtMjUsLTEwMi4yIFxuXHQ3LC0xMDIuMiBcIi8+XG48cG9seWdvbiBjbGFzcz1cInN0MVwiIHBvaW50cz1cIi0yNSwtOS40IC0yMSwtMTMuNCAtMTcsLTkuNCAtMTMsLTEzLjQgLTksLTkuNCAtNSwtMTMuNCAtMSwtOS40IDMsLTEzLjQgNywtOS40IDcsMTguNiAtMjUsMTguNiBcIi8+XG48cG9seWxpbmUgY2xhc3M9XCJzdDBcIiBwb2ludHM9XCI2OC42LC0xMDMuNSA2OC42LC0xODAuMiAtODcuNCwtMTgwLjIgLTg3LjQsLTEwMi41IFwiLz5cbjxsaW5lIGNsYXNzPVwic3QyXCIgeDE9XCItODcuM1wiIHkxPVwiLTEwMS41XCIgeDI9XCI2OC43XCIgeTI9XCItMTAxLjVcIi8+XG48L3N2Zz4nXG5cbkNvbmZpZy5EZWxpdmVyeS5TVkcuQm94NF8xID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTUxLjctMTUuN2wxLjItMzEuM2MwLjItNC44LDQuMi04LjQsOS04LjdjOS43LTAuNSwyMC4yLTAuNSwzMi4zLTAuNXMyMi43LDAsMzIuMywwLjVjNC44LDAuMiw4LjgsMy44LDksOC43XG5cdGwxLjIsMzEuM1wiLz5cbjxwYXRoIGNsYXNzPVwic3QxXCIgZD1cIk0tNTEuNy0xNS43bDEuMi0zMS4zYzAuMi00LjgsNC4yLTguNCw5LTguN2M5LjctMC41LDIwLjItMC41LDMyLjMtMC41czIyLjcsMCwzMi4zLDAuNWM0LjgsMC4yLDguOCwzLjgsOSw4Ljdcblx0bDEuMiwzMS4zXCIvPlxuPHBvbHlsaW5lIGNsYXNzPVwic3QyXCIgcG9pbnRzPVwiLTY3LjQsNiAtNjEuNywtMTYuNyA0My4zLC0xNi43IDQ5LDYgXCIvPlxuPHBvbHlsaW5lIGNsYXNzPVwic3QzXCIgcG9pbnRzPVwiLTgxLjcsNC4zIC02Ni43LDQuMyAtNjEuNywtMTUuNyA0My4zLC0xNS43IDQ4LjMsNC4zIDYzLjMsNC4zIFwiLz5cbjxwb2x5Z29uIGNsYXNzPVwic3Q0XCIgcG9pbnRzPVwiNjkuMywxOC41IDY5LjMsLTEwMi4yIC04Ny4zLC0xMDIuMiAtODcuMywxOC42IFwiLz5cbjxwb2x5Z29uIGNsYXNzPVwic3Q1XCIgcG9pbnRzPVwiNi44LC03NC4yIDIuOCwtNzAuMiAtMS4yLC03NC4yIC01LjIsLTcwLjIgLTkuMiwtNzQuMiAtMTMuMiwtNzAuMiAtMTcuMiwtNzQuMiAtMjEuMiwtNzAuMiBcblx0LTI1LjIsLTc0LjIgLTI1LjIsLTEwMi4yIDYuOCwtMTAyLjIgXCIvPlxuPHBvbHlnb24gY2xhc3M9XCJzdDVcIiBwb2ludHM9XCItMjUuMiwtOS40IC0yMS4yLC0xMy40IC0xNy4yLC05LjQgLTEzLjIsLTEzLjQgLTkuMiwtOS40IC01LjIsLTEzLjQgLTEuMiwtOS40IDIuOCwtMTMuNCA2LjgsLTkuNCBcblx0Ni44LDE4LjYgLTI1LjIsMTguNiBcIi8+XG48cG9seWxpbmUgY2xhc3M9XCJzdDRcIiBwb2ludHM9XCI2OS4yLC0xMDMgNjkuMiwtMTc5LjcgLTg3LjQsLTE4MC4yIC04Ny40LC0xMDIuNSBcIi8+XG48bGluZSBjbGFzcz1cInN0M1wiIHgxPVwiLTg3LjVcIiB5MT1cIi0xMDEuNVwiIHgyPVwiNjguNVwiIHkyPVwiLTEwMS41XCIvPlxuPGxpbmUgY2xhc3M9XCJzdDNcIiB4MT1cIjY4LjZcIiB5MT1cIjE4LjVcIiB4Mj1cIjY4LjZcIiB5Mj1cIi0xNzkuN1wiLz5cbjxsaW5lIGNsYXNzPVwic3QzXCIgeDE9XCItODhcIiB5MT1cIjE4LjVcIiB4Mj1cIi04OFwiIHkyPVwiLTE3OS43XCIvPlxuPC9zdmc+J1xuXG5Db25maWcuRGVsaXZlcnkuU1ZHLkJveDRfMiA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuPHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTS01MS0xNS45bDEuMi0zMS4zYzAuMi00LjgsNC4yLTguNCw5LTguN2M5LjctMC41LDIwLjItMC41LDMyLjMtMC41czIyLjcsMCwzMi4zLDAuNWM0LjgsMC4yLDguOCwzLjgsOSw4Ljdcblx0TDM0LTE1LjlcIi8+XG48cGF0aCBjbGFzcz1cInN0MVwiIGQ9XCJNLTUxLTE1LjlsMS4yLTMxLjNjMC4yLTQuOCw0LjItOC40LDktOC43YzkuNy0wLjUsMjAuMi0wLjUsMzIuMy0wLjVzMjIuNywwLDMyLjMsMC41YzQuOCwwLjIsOC44LDMuOCw5LDguN1xuXHRMMzQtMTUuOVwiLz5cbjxwb2x5bGluZSBjbGFzcz1cInN0MlwiIHBvaW50cz1cIi02Ni43LDYuOCAtNjEsLTE1LjkgNDQsLTE1LjkgNDkuNyw2LjggXCIvPlxuPHBvbHlsaW5lIGNsYXNzPVwic3QzXCIgcG9pbnRzPVwiLTgxLDQuMSAtNjYsNC4xIC02MSwtMTUuOSA0NCwtMTUuOSA0OSw0LjEgNjQsNC4xIFwiLz5cbjxwb2x5Z29uIGNsYXNzPVwic3Q0XCIgcG9pbnRzPVwiNjguNiwxOC42IDExMS4zLDE4LjUgLTEyNC41LDE4LjUgLTg4LjEsMTguNiBcIi8+XG48cG9seWdvbiBjbGFzcz1cInN0NVwiIHBvaW50cz1cIjEzLjksMTguNiA4LjIsMTguNiAzLjIsMTguNiAtMi40LDE4LjYgLTcuNiwxOC42IC0xMywxOC42IC0xOC40LDE4LjYgLTIzLjYsMTguNiAtMjkuMSwxOC42IFxuXHQtMzAuNywxOC41IDE3LjUsMTguNSBcIi8+XG48cG9seWdvbiBjbGFzcz1cInN0NVwiIHBvaW50cz1cIi0yNi42LDE4LjYgLTIyLjMsMTguNiAtMTcuOSwxOC42IC0xMy42LDE4LjYgLTkuMywxOC42IC00LjgsMTguNiAtMC42LDE4LjYgNCwxOC42IDguMSwxOC42IDYuMiwxOC42IFxuXHQtMjUuOCwxOC42IFwiLz5cbjxwb2x5bGluZSBjbGFzcz1cInN0NFwiIHBvaW50cz1cIjExMS4zLDE4LjUgMTM4LjgsMTguNSAtMTQ4LjksMTguNSAtMTI0LjksMTguNSBcIi8+XG48bGluZSBjbGFzcz1cInN0M1wiIHgxPVwiLTEyNC41XCIgeTE9XCIxOC41XCIgeDI9XCIxMTAuMlwiIHkyPVwiMTguNVwiLz5cbjxsaW5lIGNsYXNzPVwic3QzXCIgeDE9XCI2Ny4zXCIgeTE9XCIxOC41XCIgeDI9XCIxNjUuNVwiIHkyPVwiMTguNVwiLz5cbjxsaW5lIGNsYXNzPVwic3QzXCIgeDE9XCItODMuM1wiIHkxPVwiMTguNVwiIHgyPVwiLTE4MS41XCIgeTI9XCIxOC41XCIvPlxuPC9zdmc+J1xuXG4jIyMjIyMjIyMjIyMjIyMjXG4jIOODkeODiOODqeODs+ODl1xuIyMjIyMjIyMjIyMjIyMjI1xuQ29uZmlnLlBhdHJvbExhbXAgPSB7fVxuQ29uZmlnLlBhdHJvbExhbXAuQ09MT1IgPSBcblx0QlROXHRcdFx0XHQ6IFwiI0ZGMDAwMFwiXG5cdExJR0hUXHRcdFx0OiBcIiNGRjY0MDBcIlxuXHRQQVRIXHRcdFx0OiBcIiMyMzE4MTVcIlxuXG5Db25maWcuUGF0cm9sTGFtcC5TT1VORCA9IHtcblx0XCJTRTFcIjoge1xuXHRcdFwiTk9STUFMXCI6IFtcIlBhdHJvbFJhbXBfMF8wXCJdXG5cdFx0XCJTRUNSRVRcIjogW1wiUGF0cm9sUmFtcF8wXzBcIl1cblx0fVxuXHRcIlNFMlwiOiB7XG5cdFx0XCJOT1JNQUxcIjogW1wiUGF0cm9sUmFtcF8xXzBcIl1cblx0XHRcIlNFQ1JFVFwiOiBbXG5cdFx0XHRcIlNfUGF0cm9sUmFtcF8xXzBcIlxuXHRcdFx0XCJTX1BhdHJvbFJhbXBfMV8xXCJcblx0XHRcdFwiU19QYXRyb2xSYW1wXzFfMlwiXG5cdFx0XHRcIlNfUGF0cm9sUmFtcF8xXzNcIlxuXHRcdFx0XCJTX1BhdHJvbFJhbXBfMV80XCJcblx0XHRdXG5cdH1cbn1cblxuQ29uZmlnLlBhdHJvbExhbXAuU1ZHID0ge31cblxuIyDjg5Hjg4jjg6njg7Pjg5fjg5Hjg7zjg4RcbkNvbmZpZy5QYXRyb2xMYW1wLlNWRy5MYW1wID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG5cdDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj5cblx0XHQuc3Qwe2ZpbGw6I0RDMDAwMDtzdHJva2U6I0RDMDAwMDtzdHJva2Utd2lkdGg6NDtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9XG5cdDwvc3R5bGU+XG5cdDxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0wLjEtMi44bC0wLjMtMzEuOWMwLTMuOC0wLjktNi43LTEuOS02LjlDLTQuMS00Mi02LjMtNDItOC45LTQycy00LjgsMC02LjksMC40Yy0xLDAuMi0xLjksMy0xLjksNi45TC0xOC0yLjhcIi8+XG48L3N2Zz4nXG5cbiMg44Op44Kk44OIXG5Db25maWcuUGF0cm9sTGFtcC5TVkcuTGlnaHQxID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG5cdDxwb2x5Z29uIGNsYXNzPVwic3QwXCIgcG9pbnRzPVwiLTQ3LjQsLTQ0LjkgMzAuOCwtMjEuNyAyOS45LC00NC45IC00Ny45LC0yMS44IFwiLz5cbjwvc3ZnPidcblxuQ29uZmlnLlBhdHJvbExhbXAuU1ZHLkxpZ2h0MiA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuXHQ8cG9seWdvbiBjbGFzcz1cInN0MFwiIHBvaW50cz1cIjMwLjMsLTQ0LjkgLTQ3LjksLTIxLjcgLTQ3LC00NC45IDMwLjgsLTIxLjggXCIvPlxuPC9zdmc+J1xuXG4jIOOCv+OCpOODpFxuQ29uZmlnLlBhdHJvbExhbXAuU1ZHLlRpcmVMZWZ0ID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG5cdDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj5cblx0XHQuc3Qwe2ZpbGw6IzY2NjY2NjtzdHJva2U6IzIzMTgxNTtzdHJva2Utd2lkdGg6NS41O3N0cm9rZS1taXRlcmxpbWl0OjEwO31cblx0XHQuc3Qxe2ZpbGw6I0ZGRkZGRjtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6NDtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9XG5cdFx0LnN0MntmaWxsOiM5OTk5OTk7fVxuXHQ8L3N0eWxlPlxuXHQ8Y2lyY2xlIGNsYXNzPVwic3QwXCIgY3g9XCItNDguN1wiIGN5PVwiMTMuOVwiIHI9XCIxNS45XCIvPlxuXHQ8Y2lyY2xlIGNsYXNzPVwic3QxXCIgY3g9XCItNDguN1wiIGN5PVwiMTMuOVwiIHI9XCI1LjFcIi8+XG5cdDxwYXRoIGNsYXNzPVwic3QyXCIgZD1cIk0tNDcuNSwyNC4yYy0wLjItMC45LDAuMy0xLjgsMS4yLTJsMCwwYzAuOS0wLjIsMS44LDAuMywyLDEuMmwwLDBjMC4yLDAuOS0wLjQsMS44LTEuMiwybDAsMGMwLDAsMCwwLDAsMGwwLDBjLTAuMSwwLTAuMywwLTAuNCwwbDAsMEMtNDYuNywyNS41LTQ3LjQsMjUtNDcuNSwyNC4yeiBNLTU1LjYsMjMuMmMtMC43LTAuNi0wLjgtMS42LTAuMy0yLjNsMCwwYzAuNi0wLjcsMS42LTAuOCwyLjMtMC4zbDAsMGMwLjcsMC42LDAuOCwxLjYsMC4zLDIuM2wwLDBjLTAuMywwLjQtMC44LDAuNi0xLjMsMC42bDAsMEMtNTQuOSwyMy41LTU1LjMsMjMuNC01NS42LDIzLjJ6IE0tMzkuNywxOS44Yy0wLjgtMC40LTEuMi0xLjQtMC44LTIuMmwwLDBjMC40LTAuOCwxLjQtMS4yLDIuMi0wLjhsMCwwYzAuOCwwLjQsMS4yLDEuNCwwLjgsMi4ybDAsMGMtMC4zLDAuNi0wLjksMC45LTEuNSwwLjlsMCwwQy0zOS4zLDE5LjktMzkuNSwxOS45LTM5LjcsMTkuOHogTS02MC4xLDEzLjlDLTYwLjEsMTMuOS02MC4xLDEzLjktNjAuMSwxMy45TC02MC4xLDEzLjlMLTYwLjEsMTMuOUwtNjAuMSwxMy45YzAtMSwwLjctMS43LDEuNy0xLjdsMCwwYzAuOSwwLDEuNywwLjcsMS43LDEuNmwwLDBjMCwwLDAsMCwwLDBsMCwwYzAsMCwwLDAsMCwwbDAsMGMwLDAuOS0wLjcsMS42LTEuNiwxLjZsMCwwQy01OS40LDE1LjYtNjAuMSwxNC44LTYwLjEsMTMuOXogTS00MC41LDEwLjFjLTAuNC0wLjgtMC4xLTEuOCwwLjgtMi4ybDAsMGMwLjgtMC40LDEuOC0wLjEsMi4yLDAuOGwwLDBjMC40LDAuOCwwLjEsMS44LTAuOCwyLjJsMCwwYy0wLjIsMC4xLTAuNSwwLjItMC43LDAuMmwwLDBDLTM5LjYsMTEuMS00MC4yLDEwLjctNDAuNSwxMC4xeiBNLTU1LjksNi45Yy0wLjYtMC43LTAuNS0xLjcsMC4zLTIuM2wwLDBjMC43LTAuNiwxLjctMC41LDIuMywwLjNsMCwwYzAuNiwwLjcsMC41LDEuNy0wLjMsMi4zbDAsMGMtMC4zLDAuMi0wLjcsMC40LTEsMC40bDAsMEMtNTUuMSw3LjUtNTUuNiw3LjMtNTUuOSw2Ljl6IE0tNDYuMyw1LjVMLTQ2LjMsNS41Yy0wLjktMC4yLTEuNC0xLjEtMS4yLTJsMCwwYzAuMi0wLjksMS4xLTEuNCwyLTEuMmwwLDBsMCwwbDAsMGMwLjksMC4yLDEuNSwxLjEsMS4yLDJsMCwwQy00NC41LDUtNDUuMiw1LjYtNDYsNS42bDAsMEMtNDYuMSw1LjYtNDYuMiw1LjUtNDYuMyw1LjV6XCIvPlxuPC9zdmc+J1xuXG5Db25maWcuUGF0cm9sTGFtcC5TVkcuVGlyZVJpZ2h0ID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG5cdDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj5cblx0XHQuc3Qwe2ZpbGw6IzY2NjY2NjtzdHJva2U6IzIzMTgxNTtzdHJva2Utd2lkdGg6NS41O3N0cm9rZS1taXRlcmxpbWl0OjEwO31cblx0XHQuc3Qxe2ZpbGw6I0ZGRkZGRjtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6NDtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9XG5cdFx0LnN0MntmaWxsOiM5OTk5OTk7fVxuXHQ8L3N0eWxlPlxuXHQ8Y2lyY2xlIGNsYXNzPVwic3QwXCIgY3g9XCIzMi42XCIgY3k9XCIxMy45XCIgcj1cIjE1LjlcIi8+XG5cdDxjaXJjbGUgY2xhc3M9XCJzdDFcIiBjeD1cIjMyLjZcIiBjeT1cIjEzLjlcIiByPVwiNS4xXCIvPlxuXHQ8cGF0aCBjbGFzcz1cInN0MlwiIGQ9XCJNMzMuOCwyNC4yYy0wLjItMC45LDAuMy0xLjgsMS4yLTJsMCwwYzAuOS0wLjIsMS44LDAuMywyLDEuMmwwLDBjMC4yLDAuOS0wLjQsMS44LTEuMiwybDAsMGMwLDAsMCwwLDAsMGwwLDBjLTAuMSwwLTAuMiwwLTAuNCwwbDAsMEMzNC42LDI1LjUsMzQsMjUsMzMuOCwyNC4yeiBNMjUuNywyMy4yYy0wLjctMC42LTAuOC0xLjYtMC4zLTIuM2wwLDBjMC42LTAuNywxLjYtMC44LDIuMy0wLjN2MGMwLjcsMC42LDAuOCwxLjYsMC4zLDIuM2wwLDBjLTAuMywwLjQtMC44LDAuNi0xLjMsMC42bDAsMEMyNi40LDIzLjUsMjYsMjMuNCwyNS43LDIzLjJ6IE00MS42LDE5LjhjLTAuOC0wLjQtMS4yLTEuNC0wLjgtMi4yaDBjMC40LTAuOCwxLjQtMS4yLDIuMi0wLjhsMCwwYzAuOCwwLjQsMS4yLDEuNCwwLjgsMi4ybDAsMGwwLDBsMCwwYy0wLjMsMC42LTAuOSwwLjktMS41LDAuOWwwLDBDNDIuMSwxOS45LDQxLjgsMTkuOSw0MS42LDE5Ljh6IE0yMS4yLDEzLjlDMjEuMiwxMy45LDIxLjIsMTMuOSwyMS4yLDEzLjlMMjEuMiwxMy45TDIxLjIsMTMuOUwyMS4yLDEzLjljMC0xLDAuNy0xLjcsMS43LTEuN2wwLDBjMC45LDAsMS42LDAuNywxLjYsMS42bDAsMHYwbDAsMGMwLDAsMCwwLDAsMGwwLDBjMCwwLjktMC43LDEuNi0xLjYsMS42bDAsMGgwbDAsMEMyMiwxNS42LDIxLjIsMTQuOCwyMS4yLDEzLjl6IE00MC44LDEwLjFMNDAuOCwxMC4xYy0wLjQtMC44LTAuMS0xLjgsMC44LTIuMmwwLDBjMC44LTAuNCwxLjgtMC4xLDIuMiwwLjhsMCwwYzAuNCwwLjgsMC4xLDEuOC0wLjgsMi4ybDAsMGMtMC4yLDAuMS0wLjUsMC4yLTAuNywwLjJsMCwwQzQxLjcsMTEuMSw0MS4xLDEwLjcsNDAuOCwxMC4xeiBNMjUuNCw2LjljLTAuNi0wLjctMC41LTEuNywwLjMtMi4zbDAsMEMyNi40LDQsMjcuNCw0LjEsMjgsNC45bDAsMGMwLjYsMC43LDAuNSwxLjctMC4zLDIuM2wwLDBjLTAuMywwLjItMC43LDAuNC0xLDAuNGwwLDBDMjYuMiw3LjUsMjUuNyw3LjMsMjUuNCw2Ljl6IE0zNSw1LjVMMzUsNS41Yy0wLjktMC4yLTEuNC0xLjEtMS4yLTJsMCwwYzAuMi0wLjksMS4xLTEuNCwyLTEuMmwwLDBsMCwwbDAsMGMwLjksMC4yLDEuNSwxLjEsMS4yLDJsMCwwYy0wLjIsMC44LTAuOCwxLjMtMS42LDEuM2wwLDBDMzUuMiw1LjYsMzUuMSw1LjUsMzUsNS41elwiLz5cbjwvc3ZnPidcblxuIyDorablkYrpn7Pjga7nt5pcbkNvbmZpZy5QYXRyb2xMYW1wLlNWRy5BbGVydCA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuXHQ8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+XG5cdFx0LnN0MHtmaWxsOm5vbmU7c3Ryb2tlOiMyMzE4MTU7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fVxuXHQ8L3N0eWxlPlxuXHQ8cG9seWxpbmUgY2xhc3M9XCJzdDBcIiBwb2ludHM9XCItODEuNiwtNTIgLTExMC4xLC02Ni44IC0xMzguNywtODEuNyBcIi8+XG5cdDxwb2x5bGluZSBjbGFzcz1cInN0MFwiIHBvaW50cz1cIjU3LjksLTUyIDg2LjUsLTY2LjggMTE1LC04MS43IFwiLz5cblx0PHBvbHlsaW5lIGNsYXNzPVwic3QwXCIgcG9pbnRzPVwiLTgzLjEsLTE5LjQgLTExMC45LC03LjIgLTEzOC43LDUgXCIvPlxuXHQ8cG9seWxpbmUgY2xhc3M9XCJzdDBcIiBwb2ludHM9XCI1OS41LC0xOS40IDg3LjMsLTcuMiAxMTUsNSBcIi8+XG48L3N2Zz4nXG5cbiMjIyMjIyMjIyMjIyMjIyNcbiMg44Gk44G244KM44KLXG4jIyMjIyMjIyMjIyMjIyMjXG5Db25maWcuU3F1YXNoID0ge31cbkNvbmZpZy5TcXVhc2guU09VTkQgPSB7XG5cdFwiU0UxXCI6IHtcblx0XHRcIk5PUk1BTFwiOiBbXG5cdFx0XHRcIlNxdWFzaF8wXzBcIlxuXHRcdFx0XCJTcXVhc2hfMF8xXCJcblx0XHRdXG5cdFx0XCJTRUNSRVRcIjogW1xuXHRcdFx0XCJTX1NxdWFzaF8wXzBcIlxuXHRcdFx0XCJTX1NxdWFzaF8wXzFcIlxuXHRcdF1cblx0fVxuXHRcIlNFMlwiOiB7XG5cdFx0XCJOT1JNQUxcIjogW1xuXHRcdFx0XCJTcXVhc2hfMV8wXCJcblx0XHRcdFwiU3F1YXNoXzFfMVwiXG5cdFx0XHRcIlNxdWFzaF8xXzJcIlxuXHRcdF1cblx0XHRcIlNFQ1JFVFwiOiBbXG5cdFx0XHRcIlNfU3F1YXNoXzFfMFwiXG5cdFx0XHRcIlNfU3F1YXNoXzFfMVwiXG5cdFx0XHRcIlNfU3F1YXNoXzFfMlwiXG5cdFx0XHRcIlNfU3F1YXNoXzFfM1wiXG5cdFx0XHRcIlNfU3F1YXNoXzFfNFwiXG5cdFx0XHRcIlNfU3F1YXNoXzFfNVwiXG5cdFx0XVxuXHR9XG59XG5Db25maWcuU3F1YXNoLlNWRyA9IHt9XG5cbkNvbmZpZy5TcXVhc2guU1ZHLlByZXNzID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG5cdDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj5cblx0XHQuc3Qwe2ZpbGw6bm9uZTtzdHJva2U6IzIzMTgxNTtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fVxuXHRcdC5zdDF7ZmlsbDpub25lO3N0cm9rZTojMjMxODE1O3N0cm9rZS1taXRlcmxpbWl0OjEwO31cblx0PC9zdHlsZT5cblx0PHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTS00NC4yLTI5LjFjLTcuOS0zLjktMTMuNS02LjYtMTYuNC0xNC4xcy0wLjktMjAuMyw5LjktMjNDLTMxLjYtNzEtMjYuMy01MC43LTkuNi00OS40XG5cdGMxOS4yLDEuNSwyNi41LTEwLjIsMzQuOS0xNC4zYzEwLjctNS4yLDE5LjgtMC4yLDE5LjgsMTIuM3MtMTEuMiwyMC4yLTE5LjgsMjNcIi8+XG48L3N2Zz4nXG5cbkNvbmZpZy5TcXVhc2guU1ZHLkJlZm9yZSA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuPHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTS04Mi4xLDU3LjhjLTQsNC42LTEwLjIsNS4yLTEyLjgsMC44Yy0yLjgtNC42LDEuOC0xMC4zLDQuMi0xMS44YzMuNC0yLjMsMjcuNi0xMS4yLDE4LjgtMjcuOVxuXHRjLTItMy43LTcuNC05LjYtMTguOS00LjRjLTUuNSwyLjUtOC44LTEuNy05LjYtNC42Yy0wLjgtMywxLjQtOC43LDYtOC44Qy03OC43LDAuOC03OC01LjYtNzguMy05LjdjLTEuMy0xOS44LDUuNi0yNC4yLDItMzEuMlxuXHRjLTEuOS0zLjYtMzkuNi0yNS41LTQ4LjktMjkuN3MtMTItMTQuMi02LjItMjAuMXMxNC45LTMuNywxOS44LDIuOWM0LjgsNi42LDQyLjIsNDEuOSw1NC43LDIxLjVjNS4zLTguNi0wLjYtMTYuMi03LTIzLjhcblx0Yy0xLjgtMi4xLTEuMS01LjMsMC41LTYuNWMxLjYtMS4yLDQuNy0yLjEsNi41LDEuMWMzLDUuNSwxMCwyMS43LDIwLjgsOC4yYzYtNy41LDUuOS0xNS4zLDAuMi0yMi4xYy01LjItNi4xLTIuNC0xNS4zLDQuMS0xNi42XG5cdGM1LjYtMS4xLDEyLjYsNi40LDEwLjQsMTQuN2MtMy42LDEyLjgsOS43LDE5LjIsMTUsMTUuOUMxMS40LTEwNiw5LjQtMTM0LjUsOS4xLTE0MS42Yy0wLjMtNy42LDUuMi0xMC41LDguMy0xMC4xXG5cdGMzLDAuNCw4LjksMy44LDYuNSwxMS43Yy0xLjMsNC40LTEyLjcsMzIuMS0wLjEsNDguNGMxLjIsMS41LDMuNCw0LjgsNy41LDRjMy42LTAuOCw2LjUtNS42LDcuMy05LjljMC42LTMuNCw0LjItNS41LDYuNi00LjRcblx0YzIsMSw1LjMsNC42LDEuNyw4LjljLTMuNCw0LTYuMiw4LTMuOCwxMS42YzEuMiwxLjksMy41LDQuNCw3LjEsNS41YzE5LjUsNi4yLDUzLjUtMzAuMiw1OS4zLTM4LjRjNC4xLTUuOSwxMS44LTEyLjYsMTcuOC01LjVcblx0YzYsNy00LDE0LjUtOS4yLDE3LjhjLTUsMy4yLTU1LjUsNDQuMS00OC4xLDUwLjJjMy4yLDIuNywxMy40LTMuMiwxNS42LTVjMS43LTEuNCw1LTEuMiw1LjksMC42YzEuMiwyLjUsMC4yLDUuMy0yLjQsNS43XG5cdGMtMy41LDAuNy0xNi4xLDcuOC0xNC4zLDEyLjZjMi45LDcuOSwyLjcsNC42LDMuNCwxNi4zYzAuNCw2LjksNC40LDE0LjQsMjIuNywxMS4yYzQuNS0wLjgsMTAuMywxLjYsOS42LDcuN1xuXHRjLTAuOCw2LjYtNi44LDctMTEuMyw1LjlDODMtMC43LDc3LjYsMi45LDczLjksNy4yYy0zLDMuNC04LDEyLjcsMTMuMSwxNS4zYzcuMiwwLjksMTAuNCw2LjUsOC41LDEwLjZjLTMsNi41LTExLjYsMi42LTE1LjQtMC4xXG5cdGMtMTMuNS05LjUtMTcuNC0wLjMtMjAuNywyLjNDMzYuMiw1Mi43LDcyLjYsODQuMyw3OCw4OC43YzMuNiwyLjksMTAuNiwxMi4xLDQuMSwxNy45Yy01LjgsNS4yLTEzLjItMi43LTE1LjctOC44XG5cdGMtMi01LjItMjYtNDguNi00Mi4yLTM4LjJjLTMuNSwyLjMtOS44LDYuMS0xNy4xLDQuOGMtOS44LTEuNy0xMi4yLDgtMTEuMSwxNS44YzAuNyw0LjgtMi41LDEzLjYtOS43LDEzcy04LjItMTAuNi02LjItMTVcblx0YzMuNy04LjIsMy43LTE3LjQtNS44LTE5Yy0xNi45LTIuOC00NC4zLDUwLjQtNDcuNSw1OGMtMy43LDguNy0xMS42LDEzLjEtMTYuMyw5LjJjLTUuNS00LjYtMS40LTEzLjcsMi4yLTE3LjFcblx0YzE0LjgtMTQsNDMuMy01NywzNC44LTY1LjJDLTY0LjYsMzIuNC03OS4yLDU0LjUtODIuMSw1Ny44elwiLz5cbjxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0tNzEuMy0xMDYuN2MtMC43LDAuOS0xLjYsMS41LTIuNiwxLjdjLTEuMSwwLjEtMi4xLDAtMy0wLjdjLTAuOS0wLjctMS41LTEuNi0xLjctMi42Yy0wLjEtMS4xLDAtMi4xLDAuNy0zXG5cdGMwLjctMC45LDEuNi0xLjUsMi42LTEuN2MxLjEtMC4xLDIuMSwwLDMsMC43YzAuOSwwLjcsMS41LDEuNiwxLjcsMi42Qy03MC41LTEwOC43LTcwLjYtMTA3LjYtNzEuMy0xMDYuN3pcIi8+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTQwLTEzOS44Yy0wLjgsMS4xLTEuOCwxLjctMi45LDEuOWMtMS4xLDAuMi0yLjQsMC0zLjQtMC44Yy0xLjEtMC44LTEuNy0xLjgtMS45LTIuOVxuXHRjLTAuMi0xLjEsMC4xLTIuNCwwLjgtMy40YzAuOC0xLjEsMS44LTEuNywyLjktMS45YzEuMS0wLjIsMi40LDAsMy40LDAuOGMxLjEsMC44LDEuNywxLjgsMS45LDIuOVMtMzkuMy0xNDAuNy00MC0xMzkuOHpcIi8+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNNDIuOS0xNDQuN2MwLjgtMS4xLDEuOS0xLjksMy4yLTIuMWMxLjMtMC4yLDIuNiwwLjEsMy44LDAuOGMxLjEsMC44LDEuOSwxLjksMi4xLDMuMmMwLjIsMS4zLTAuMSwyLjYtMC44LDMuOFxuXHRjLTAuOCwxLjEtMS45LDEuOS0zLjIsMi4xYy0xLjMsMC4yLTIuNi0wLjEtMy44LTAuOGMtMS4xLTAuOC0xLjktMS45LTIuMS0zLjJDNDEuOC0xNDIuMiw0Mi4xLTE0My41LDQyLjktMTQ0Ljd6XCIvPlxuPHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTTEyMC42LTU4LjFjLTAuOSwxLjMtMi4yLDItMy42LDIuMmMtMS40LDAuMi0yLjktMC4xLTQuMS0wLjljLTEuMy0wLjktMi0yLjItMi4yLTMuNmMtMC4yLTEuNCwwLjEtMi45LDAuOS00LjFcblx0YzAuOS0xLjMsMi4yLTIsMy42LTIuMmMxLjQtMC4yLDIuOSwwLjEsNC4xLDAuOWMxLjMsMC45LDIsMi4yLDIuMiwzLjZDMTIxLjgtNjAuOCwxMjEuNS01OS4zLDEyMC42LTU4LjF6XCIvPlxuPHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTTEwMi4zLDU4LjdjMC42LTAuOSwxLjUtMS40LDIuNS0xLjZjMC45LTAuMSwxLjksMCwyLjgsMC43YzAuOSwwLjYsMS4zLDEuNSwxLjYsMi41YzAuMiwxLDAsMi0wLjcsMi44XG5cdGMtMC42LDAuOS0xLjUsMS40LTIuNSwxLjZjLTAuOSwwLjEtMiwwLTIuOC0wLjdjLTAuOS0wLjYtMS4zLTEuNS0xLjYtMi41QzEwMS41LDYwLjYsMTAxLjcsNTkuNiwxMDIuMyw1OC43elwiLz5cbjxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0xOC45LDk1LjVjLTAuOCwxLjItMi4xLDEuOS0zLjQsMi4xYy0xLjIsMC4yLTIuNywwLTMuOS0wLjljLTEuMi0wLjgtMS45LTIuMS0yLjEtMy40Yy0wLjItMS4zLDAtMi44LDAuOS0zLjlcblx0YzAuOC0xLjIsMi4xLTEuOSwzLjQtMi4xYzEuMi0wLjIsMi44LDAsMy45LDAuOWMxLjIsMC44LDEuOSwyLjEsMi4xLDMuNEMyMCw5MywxOS44LDk0LjQsMTguOSw5NS41elwiLz5cbjxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0tMTEyLjEsNzAuMWMtMC44LDEuMS0xLjksMS45LTMuMiwyLjFjLTEuMywwLjItMi42LTAuMS0zLjgtMC44Yy0xLjEtMC44LTEuOS0xLjktMi4xLTMuMlxuXHRjLTAuMi0xLjMsMC4xLTIuNiwwLjgtMy44YzAuOC0xLjEsMi0xLjksMy4yLTIuMWMxLjMtMC4yLDIuNiwwLjEsMy44LDAuOGMxLjEsMC44LDEuOSwyLDIuMSwzLjJDLTExMSw2Ny41LTExMS4zLDY4LjgtMTEyLjEsNzAuMXpcIlxuXHQvPlxuPHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTS0xMTkuOCwwLjZjLTAuNywxLTEuOCwxLjctMi45LDEuOXMtMi40LDAtMy40LTAuOGMtMS0wLjctMS43LTEuOC0xLjktMi45czAtMi40LDAuOC0zLjRcblx0YzAuNy0xLDEuOC0xLjcsMi45LTEuOXMyLjQsMCwzLjQsMC44YzEsMC43LDEuNywxLjgsMS45LDIuOVMtMTE5LTAuNS0xMTkuOCwwLjZ6XCIvPlxuPC9zdmc+J1xuXG4jaGFsZndheVxuQ29uZmlnLlNxdWFzaC5TVkcuSGFsZndheSA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuPHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTS04NS4zLDYwLjdjLTQsNC42LTEwLjIsNS4yLTEyLjgsMC44Yy0yLjgtNC42LDEuOC0xMC4zLDQuMi0xMS44YzMuNC0yLjMsMzAuNC0xNCwyMS41LTMwLjdcblx0Yy0yLTMuNy0xMi04LjktMjMuNi0zLjdjLTUuNSwyLjUtOC44LTEuNy05LjYtNC42Yy0wLjgtMywxLjQtOC43LDYtOC44YzE1LjktMC4zLDIxLjItNy40LDIwLjktMTEuNWMtMS4zLTE5LjgsNS42LTI0LjIsMi0zMS4yXG5cdGMtMS45LTMuNi00My4xLTI4LTUyLjQtMzIuMmMtOS4yLTQuMi0xMi0xNC4yLTYuMi0yMC4xczE0LjktMy43LDE5LjgsMi45YzQuOCw2LjYsNDUuNyw0NC41LDU4LjIsMjRjNS4zLTguNi0yLjQtMTktOC44LTI2LjZcblx0Yy0xLjgtMi4xLTEuMS01LjMsMC41LTYuNXM0LjctMi4xLDYuNSwxLjFjMyw1LjUsMTEuOCwyNC41LDIyLjYsMTFjNi03LjUsNS40LTE4LjQtMC4zLTI1LjJjLTUuMi02LjEtMi40LTE1LjMsNC4xLTE2LjZcblx0YzUuNi0xLjEsMTIuNiw2LjQsMTAuNCwxNC43Qy0yNS45LTEwMS41LTEyLjEtOTItNi43LTk1LjJDMTEtMTA1LjksOS4zLTEzNy42LDktMTQ0LjdjLTAuMy03LjYsNS4yLTEwLjUsOC4zLTEwLjFcblx0YzMsMC40LDguOSwzLjgsNi41LDExLjdjLTEuMyw0LjQtMTMuMSwzNS4zLTAuNSw1MS41YzEuMiwxLjUsMy40LDQuOCw3LjUsNGMzLjYtMC44LDYuOS02LjgsNy43LTExLjFjMC42LTMuNCw0LjItNS41LDYuNi00LjRcblx0YzIsMSw1LjMsNC42LDEuNyw4LjljLTMuNCw0LTYuNSw5LjEtNC4xLDEyLjdjMS4yLDEuOSwzLjUsNC40LDcuMSw1LjVjMTkuNSw2LjIsNTkuMS0zNS44LDY0LjktNDRjNC4xLTUuOSwxMS44LTEyLjYsMTcuOC01LjVcblx0YzYsNy00LDE0LjUtOS4yLDE3LjhjLTUsMy4yLTYxLjEsNDkuNy01My44LDU1LjhjMy4yLDIuNywxNi4zLTUuMSwxOC41LTYuOWMxLjctMS40LDUtMS4yLDUuOSwwLjZjMS4yLDIuNSwwLjIsNS4zLTIuNCw1Ljdcblx0Yy0zLjUsMC43LTE4LjksOS43LTE3LjEsMTQuNmMyLjksNy45LDIuNyw0LjYsMy40LDE2LjNjMC40LDYuOSw3LjQsMTQuNiwyNS43LDExLjNjNC41LTAuOCwxMC4zLDEuNiw5LjYsNy43XG5cdGMtMC44LDYuNi02LjgsNy0xMS4zLDUuOUM4NS42LTAuNiw3OC4yLDMuNiw3NC40LDcuOWMtMywzLjQtNS42LDEzLjEsMTUuNCwxNS43YzcuMiwwLjksMTAuNCw2LjUsOC41LDEwLjZcblx0Yy0zLDYuNS0xMS42LDIuNi0xNS40LTAuMWMtMTMuNS05LjUtMjAuNy0xLjQtMjQsMS4yQzM1LjgsNTIuOCw3NSw4OCw4MC41LDkyLjNjMy42LDIuOSwxMC42LDEyLjEsNC4xLDE3Ljlcblx0Yy01LjgsNS4yLTEzLjItMi43LTE1LjctOC44Yy0yLTUuMi0yOC45LTUyLjItNDUuMS00MS44Yy0zLjUsMi4zLTkuOCw2LjEtMTcuMSw0LjhDLTMsNjIuNy02LjIsNzYuMy01LjEsODRcblx0YzAuNyw0LjgtMi41LDEzLjYtOS43LDEzUy0yMyw4Ni40LTIxLDgyYzMuNy04LjIsNC40LTIxLjMtNS4xLTIyLjljLTE2LjktMi44LTQ2LjcsNTQtNDkuOSw2MS42Yy0zLjcsOC43LTExLjYsMTMuMS0xNi4zLDkuMlxuXHRjLTUuNS00LjYtMS40LTEzLjcsMi4yLTE3LjFjMTQuOC0xNCw0NS43LTYwLjYsMzcuMi02OC43Qy02NS4xLDMyLjQtODIuNCw1Ny40LTg1LjMsNjAuN3pcIi8+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTcwLjYtMTA1LjljLTAuOSwxLjItMi4xLDItMy41LDIuMnMtMi44LDAtNC0wLjlzLTItMi4xLTIuMi0zLjVzMC0yLjgsMC45LTRzMi4xLTIsMy41LTIuMnMyLjgsMCw0LDAuOVxuXHRzMiwyLjEsMi4yLDMuNVMtNjkuOC0xMDcuMS03MC42LTEwNS45elwiLz5cbjxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0tMzkuMi0xMzguOGMtMSwxLjQtMi40LDIuMi0zLjksMi41cy0zLjIsMC00LjUtMWMtMS40LTEtMi4yLTIuNC0yLjUtMy45czAuMS0zLjIsMS00LjVjMS0xLjQsMi40LTIuMiwzLjktMi41XG5cdHMzLjIsMCw0LjUsMWMxLjQsMSwyLjIsMi40LDIuNSwzLjlTLTM4LjMtMTQwLjItMzkuMi0xMzguOHpcIi8+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNNDEuMS0xNDUuNmMxLjEtMS41LDIuNi0yLjUsNC4zLTIuOHMzLjUsMC4xLDUsMS4xYzEuNSwxLjEsMi41LDIuNiwyLjgsNC4zcy0wLjEsMy41LTEuMSw1XG5cdGMtMS4xLDEuNS0yLjYsMi41LTQuMywyLjhzLTMuNS0wLjEtNS0xLjFjLTEuNS0xLjEtMi41LTIuNi0yLjgtNC4zUzQwLTE0NC4xLDQxLjEtMTQ1LjZ6XCIvPlxuPHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTTEyMS43LTU2LjljLTEuMiwxLjctMi45LDIuNy00LjgsM3MtMy45LTAuMS01LjUtMS4yYy0xLjctMS4yLTIuNy0yLjktMy00LjhjLTAuMy0xLjksMC4xLTMuOSwxLjItNS41XG5cdGMxLjItMS43LDIuOS0yLjcsNC44LTNzMy45LDAuMSw1LjUsMS4yYzEuNywxLjIsMi43LDIuOSwzLDQuOEMxMjMuMi02MC42LDEyMi45LTU4LjYsMTIxLjctNTYuOXpcIi8+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNMTAwLjgsNThjMC44LTEuMiwyLTEuOCwzLjMtMi4xYzEuMi0wLjEsMi41LDAsMy44LDAuOWMxLjIsMC44LDEuOCwyLDIuMSwzLjNjMC4yLDEuMiwwLDIuNy0wLjksMy44XG5cdGMtMC44LDEuMi0yLDEuOC0zLjMsMi4xYy0xLjIsMC4yLTIuNywwLTMuOC0wLjljLTEuMi0wLjgtMS44LTItMi4xLTMuM0M5OS44LDYwLjQsOTkuOSw1OSwxMDAuOCw1OHpcIi8+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNMTkuOSw5Ni41Yy0xLjEsMS43LTIuOSwyLjUtNC41LDIuOWMtMS44LDAuMy0zLjYsMC01LjItMS4yYy0xLjctMS0yLjUtMi45LTIuOC00LjVjLTAuMy0xLjgsMC0zLjgsMS4yLTUuMlxuXHRjMS0xLjcsMi44LTIuNSw0LjUtMi45YzEuNy0wLjMsMy44LDAsNS4zLDEuMmMxLjYsMSwyLjYsMi45LDIuOCw0LjVDMjEuNCw5My4xLDIxLDk1LDE5LjksOTYuNXpcIi8+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTExMS4yLDcxYy0xLjEsMS41LTIuNiwyLjUtNC4zLDIuOGMtMS43LDAuMy0zLjUtMC4xLTUtMS4xYy0xLjUtMS4xLTIuNS0yLjYtMi44LTQuM2MtMC4zLTEuNywwLjEtMy41LDEuMS01XG5cdGMxLjEtMS41LDIuNy0yLjUsNC4zLTIuOGMxLjctMC4zLDMuNSwwLjEsNSwxLjFjMS41LDEuMSwyLjUsMi42LDIuOCw0LjNDLTEwOS43LDY3LjctMTEwLjEsNjkuNS0xMTEuMiw3MXpcIi8+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTExOC45LDEuNWMtMC45LDEuMy0yLjQsMi4yLTMuOSwyLjVzLTMuMiwwLTQuNS0xLjFjLTEuNC0wLjktMi4yLTIuNC0yLjYtMy45Yy0wLjMtMS41LDAtMy4yLDEuMS00LjVcblx0YzAuOS0xLjQsMi40LTIuMiwzLjktMi41YzEuNS0wLjMsMy4yLDAsNC41LDFjMS40LDAuOSwyLjIsMi40LDIuNSwzLjlDLTExNy42LTEuNi0xMTgsMC4xLTExOC45LDEuNXpcIi8+XG48L3N2Zz4nXG5cbiMgQWZ0ZXJcbkNvbmZpZy5TcXVhc2guU1ZHLkFmdGVyID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTg1LjgsNjguOWMtNCw0LjYtMTAuMi0xLjYtMTIuOC02Yy0yLjgtNC42LDIuMy0xMS42LDQuNi0xMy4yYzMuNC0yLjMsMjktNi44LDIwLjItMjMuNVxuXHRjLTItMy43LTEwLjctMTUuMi0yMi4yLTEwYy01LjUsMi41LTguOC0yLjYtOS42LTUuNWMtMC44LTMsMS40LTguNyw2LTguOGMxNS45LTAuMywyMS4yLTAuNywyMC45LTQuN2MtMS4zLTE5LjgsNS42LTE5LjcsMi0yNi43XG5cdGMtMS45LTMuNi00Mi43LTM3LjItNTIuNC00My41Yy04LjUtNS41LTEyLTE0LjItNi4yLTIwLjFzMTQuOS0zLjcsMTkuOCwyLjljOC44LDEyLjEsNDEuNyw2Mi4yLDU4LjIsMzUuM1xuXHRjNS4zLTguNi0yLjQtMzAuMi04LjgtMzcuOWMtMS44LTIuMS0xLjEtNS4zLDAuNS02LjVzNC43LTIuMSw2LjUsMS4xYzMsNS41LDExLjgsMjksMjIuNiwxNS41YzYtNy41LDUuNC0yMi45LTAuMy0yOS43XG5cdGMtNS4yLTYuMS0yLjQtMTUuMyw0LjEtMTYuNmM1LjYtMS4xLDEyLjYsNi40LDEwLjQsMTQuN2MtMy42LDEyLjgsMTAuMiwyNi44LDE1LjYsMjMuNkMxMS0xMDEuMyw5LjMtMTM3LjQsOS0xNDQuNVxuXHRjLTAuMy03LjYsNS4yLTEwLjUsOC4zLTEwLjFjMywwLjQsOC45LDMuOCw2LjUsMTEuN2MtMS4zLDQuNC0xMy4xLDM5LjgtMC41LDU2YzEuMiwxLjUsMy40LDQuOCw3LjUsNGMzLjYtMC44LDYuOS0xMS4zLDcuNy0xNS42XG5cdGMwLjYtMy40LDQuMi01LjUsNi42LTQuNGMyLDEsNSwzLjQsMS43LDguOWMtMi43LDQuNS01LjIsMTMuMS00LjEsMTcuMmMwLjcsMi44LDMuNSwxMS4xLDcuMSwxMi4zYzE5LjUsNi4yLDU5LjUtNDYuMiw2NC44LTU0Ljdcblx0YzMuOC02LjEsMTEtMTMuMywxNy40LTYuNmM2LjQsNi43LTMuMSwxNC43LTguMSwxOC40Yy00LjgsMy41LTYxLjcsNTYuNC01NC40LDYyLjVjMy4yLDIuNywxNi4xLTEwLjEsMTcuOC0xMi40XG5cdGMyLjItMyw1LjUtMi4xLDYuOS0wLjdjMiwxLjksMSw1LjUtMS4zLDYuOEM4OS43LTQ5LjUsNzMuNC0zNy45LDc0LjMtMzFjMS4yLDguMywyLjYsNi42LDMuNCwxNi4zYzAuNSw2LjksNy40LDcuOCwyNS43LDQuNlxuXHRjNC41LTAuOCwxMC4zLDEuNiw5LjYsNy43Yy0wLjgsNi42LTYuOCw4LjQtMTEuMyw3LjNDODUuNiwxLDc1LjUsOS4zLDc0LjQsMTQuOGMtMSw1LjEsMC4xLDYuOSwxNS40LDljNy4yLDEsMTAuNSw4LDguNSwxMy43XG5cdGMtMi40LDYuNy04LjYsOS43LTE1LjQsNS40Yy0xNC04LjgtMjAuNy0wLjUtMjQsMi4xQzM1LjgsNjIuNCw3NS40LDg3LjcsODAuNSw5Mi41YzkuNSw5LjEsMTEuNCwxOC42LDQuMywyMi40XG5cdGMtNiwzLjItMTMuMy0zLjgtMTUuOS0xMS41QzY1LjUsOTMuNiw0MCw2My4zLDIzLjgsNzMuN0MyMC4zLDc2LDE0LDc5LjgsNi43LDc4LjVDLTMsNzYuOC01LjksNzkuMS01LjEsODYuOWMwLjgsNy0yLjUsMTMuNi05LjcsMTNcblx0cy05LjMtOC43LTYuMi0xNWM0LjEtOCwwLjItMTEuNS02LjgtMTIuOGMtMTYuOC0zLjMtNDIuOSw0NS40LTQ2LjEsNTNjLTMuNyw4LjctMTMuMSwxMi45LTE4LjQsNi44Yy00LjgtNS40LTMtMTMuNywyLjItMTguOVxuXHRjMTQuNi0xNC44LDQzLjktNDkuMywzNS40LTU3LjVDLTY2LjksNDMuOC04Mi45LDY1LjctODUuOCw2OC45elwiLz5cbjxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0tNzAuNi0xMDUuN2MtMC45LDEuMi0yLjEsMi0zLjUsMi4ycy0yLjgsMC00LTAuOXMtMi0yLjEtMi4yLTMuNXMwLTIuOCwwLjktNHMyLjEtMiwzLjUtMi4yczIuOCwwLDQsMC45XG5cdHMyLDIuMSwyLjIsMy41Qy02OS41LTEwOC4zLTY5LjgtMTA2LjktNzAuNi0xMDUuN3pcIi8+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTM5LjItMTM3LjNjLTEsMS40LTIuNCwyLjItMy45LDIuNXMtMy4yLDAtNC41LTFjLTEuNC0xLTIuMi0yLjctMi41LTQuNmMtMC4zLTEuOSwwLjEtMy44LDEtNS4yXG5cdGMxLTEuNCwyLjQtMi4yLDMuOS0yLjVzMy4yLDAsNC41LDFjMS40LDEsMi4yLDIuNywyLjUsNC42Qy0zNy45LTE0MC42LTM4LjMtMTM4LjctMzkuMi0xMzcuM3pcIi8+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNNDEuMS0xNDUuNGMxLjEtMS41LDIuNi0yLjUsNC4zLTIuOHMzLjUsMC4xLDUsMS4xYzEuNSwxLjEsMi41LDMuMywyLjgsNS43cy0wLjEsNC45LTEuMSw2LjRcblx0Yy0xLjEsMS41LTIuNiwyLjUtNC4zLDIuOHMtMy41LTAuMS01LTEuMWMtMS41LTEuMS0yLjUtMy4zLTIuOC01LjdTNDAtMTQzLjksNDEuMS0xNDUuNHpcIi8+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNMTIxLjctNTQuOWMtMS4yLDEuNy0yLjksMi43LTQuOCwzcy0zLjktMC4xLTUuNS0xLjJjLTEuNy0xLjItMi43LTMuNC0zLTUuN3MwLjEtNC44LDEuMi02LjRcblx0YzEuMi0xLjcsMi45LTIuNyw0LjgtM3MzLjksMC4xLDUuNSwxLjJjMS43LDEuMiwyLjcsMy40LDMsNS43UzEyMi45LTU2LjYsMTIxLjctNTQuOXpcIi8+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNMTAwLjgsNTcuNGMwLjgtMS4yLDItMS44LDMuMy0yLjFjMS4yLTAuMSwyLjUsMCwzLjgsMC45YzEuMiwwLjgsMS44LDIuMSwyLjEsMy42YzAuMSwxLjUsMCwzLTAuOSw0LjFcblx0Yy0wLjgsMS4yLTIsMS44LTMuMywyLjFjLTEuMiwwLjItMi43LDAtMy44LTAuOWMtMS4yLTAuOC0xLjgtMi4xLTIuMS0zLjZDOTkuNiw1OS45LDk5LjksNTguNiwxMDAuOCw1Ny40elwiLz5cbjxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0xOS45LDk5Yy0xLjEsMS42LTIuOSwyLjUtNC41LDIuOGMtMS43LDAuMy0zLjYsMC01LjItMS4yYy0xLjctMS0yLjUtMy41LTIuOC01LjhjLTAuMy0yLjQsMC01LjEsMS4yLTYuNlxuXHRjMS0xLjYsMi44LTIuNSw0LjUtMi44YzEuOC0wLjMsMy44LDAsNS4zLDEuMmMxLjYsMSwyLjYsMy41LDIuOCw1LjhDMjEuNCw5NC44LDIxLDk3LjUsMTkuOSw5OXpcIi8+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTExMS4yLDcyLjVjLTEuMSwxLjUtMi42LDIuNS00LjMsMi44cy0zLjUtMC4xLTUtMS4xYy0xLjUtMS4xLTIuNS0zLTIuOC01czAuMS00LjIsMS4xLTUuN1xuXHRjMS4xLTEuNSwyLjctMi41LDQuMy0yLjhjMS43LTAuMywzLjUsMC4xLDUsMS4xYzEuNSwxLjEsMi41LDMsMi44LDVDLTEwOS43LDY4LjktMTEwLjEsNzEtMTExLjIsNzIuNXpcIi8+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTExOC45LDEuNmMtMC45LDEuNC0yLjQsMi4yLTMuOSwyLjZjLTEuNSwwLjMtMy4yLDAtNC41LTEuMWMtMS40LTAuOS0yLjItMi40LTIuNi0zLjljLTAuMy0xLjUsMC0zLjEsMS4xLTQuNVxuXHRjMC45LTEuMywyLjQtMi4yLDMuOS0yLjZzMy4yLDAsNC41LDFjMS40LDAuOSwyLjIsMi40LDIuNSwzLjlTLTExOCwwLjMtMTE4LjksMS42elwiLz5cbjwvc3ZnPidcblxuIyMjIyMjIyMjIyMjIyMjI1xuIyDpgb/jgZHjgotcbiMjIyMjIyMjIyMjIyMjIyNcbkNvbmZpZy5Fc2NhcGUgPSB7fVxuXG5Db25maWcuRXNjYXBlLlNPVU5EID0ge1xuXHRcIlNFX0dST1VQMFwiOiB7XG5cdFx0XCJTRTFcIjoge1xuXHRcdFx0XCJOT1JNQUxcIjogW1xuXHRcdFx0XHRcIkVzY2FwZV8wXzBfMFwiXG5cdFx0XHRcdFwiRXNjYXBlXzBfMF8xXCJcblx0XHRcdFx0XCJFc2NhcGVfMF8wXzJcIlxuXHRcdFx0XHRcIkVzY2FwZV8wXzBfM1wiXG5cdFx0XHRcdFwiRXNjYXBlXzBfMF80XCJcblx0XHRcdF1cblx0XHRcdFwiU0VDUkVUXCI6IFtcblx0XHRcdFx0XCJTX0VzY2FwZV8wXzBfMFwiXG5cdFx0XHRcdFwiU19Fc2NhcGVfMF8wXzFcIlxuXHRcdFx0XHRcIlNfRXNjYXBlXzBfMF8yXCJcblx0XHRcdFx0XCJTX0VzY2FwZV8wXzBfM1wiXG5cdFx0XHRdXG5cdFx0fVxuXHRcdFwiU0UyXCI6IHtcblx0XHRcdFwiTk9STUFMXCI6IFtcIkVzY2FwZV8wXzFfMFwiXVxuXHRcdFx0XCJTRUNSRVRcIjogW1xuXHRcdFx0XHRcIlNfRXNjYXBlXzBfMV8wXCJcblx0XHRcdFx0XCJTX0VzY2FwZV8wXzFfMVwiXG5cdFx0XHRdXG5cdFx0fVxuXHRcdFwiU0UzXCI6IHtcblx0XHRcdFwiTk9STUFMXCI6IFtcIkVzY2FwZV8wXzJfMFwiXVxuXHRcdFx0XCJTRUNSRVRcIjogW1xuXHRcdFx0XHRcIlNfRXNjYXBlXzBfMl8wXCJcblx0XHRcdFx0XCJTX0VzY2FwZV8wXzJfMVwiXG5cdFx0XHRdXG5cdFx0fVxuXHR9XG5cdFwiU0VfR1JPVVAxXCI6IHtcblx0XHRcIlNFMVwiOiB7XG5cdFx0XHRcIk5PUk1BTFwiOiBbXG5cdFx0XHRcdFwiRXNjYXBlXzFfMF8wXCJcblx0XHRcdFx0XCJFc2NhcGVfMV8wXzFcIlxuXHRcdFx0XHRcIkVzY2FwZV8xXzBfMlwiXG5cdFx0XHRcdFwiRXNjYXBlXzFfMF8zXCJcblx0XHRcdFx0XCJFc2NhcGVfMV8wXzRcIlxuXHRcdFx0XVxuXHRcdFx0XCJTRUNSRVRcIjogW1xuXHRcdFx0XHRcIlNfRXNjYXBlXzFfMF8wXCJcblx0XHRcdFx0XCJTX0VzY2FwZV8xXzBfMVwiXG5cdFx0XHRcdFwiU19Fc2NhcGVfMV8wXzJcIlxuXHRcdFx0XHRcIlNfRXNjYXBlXzFfMF8zXCJcblx0XHRcdF1cblx0XHR9XG5cdFx0XCJTRTJcIjoge1xuXHRcdFx0XCJOT1JNQUxcIjogW1wiRXNjYXBlXzFfMV8wXCJdXG5cdFx0XHRcIlNFQ1JFVFwiOiBbXG5cdFx0XHRcdFwiU19Fc2NhcGVfMV8xXzBcIlxuXHRcdFx0XHRcIlNfRXNjYXBlXzFfMV8xXCJcblx0XHRcdF1cblx0XHR9XG5cdFx0XCJTRTNcIjoge1xuXHRcdFx0XCJOT1JNQUxcIjogW1wiRXNjYXBlXzFfMl8wXCJdXG5cdFx0XHRcIlNFQ1JFVFwiOiBbXG5cdFx0XHRcdFwiU19Fc2NhcGVfMV8yXzBcIlxuXHRcdFx0XHRcIlNfRXNjYXBlXzFfMl8xXCJcblx0XHRcdF1cblx0XHR9XG5cdH1cblxufVxuQ29uZmlnLkVzY2FwZS5TVkcgPSB7fVxuXG4jIOWPs+OBq+mBv+OBkeOBn+aZglxuQ29uZmlnLkVzY2FwZS5TVkcuUmlnaHQgPSAnPHN2ZyBpZD1cIlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE0NVwiIGhlaWdodD1cIjYxXCIgdmlld0JveD1cIjAgMCAxNDUgNjFcIj5cblx0PCEtLSBbMF0g44Oc44K/44OzIC0tPlxuXHQ8cGF0aCBkPVwiTS00Ni4zLTE0LjZjMCwwLDIuNi00LjMsMi4xLTEyLjRjLTAuNC03LTIuNS0xNS40LDMuOS0xOS4yYzMuMi0xLjgsMTcuNi00LjIsMzIuMS02LjFjMTUuMS0yLDMwLjEtMy41LDMyLjYtMy42YzEwLTAuMywxNS40LDExLjMsMTMuMywzMS42QzM2LjYtMTIuNCwyNC40LTguOSwyNC40LTguOVwiLz5cblx0PCEtLSBbMV0g5Zyf5Y+wIC0tPlxuXHQ8cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTc2LjMsNC4xSC02MWw1LjgtMTguOUw0OC4zLTIxVjQuOUg2M1wiLz5cbjwvc3ZnPidcblxuIyDlt6bjgavpgb/jgZHjgZ/mmYJcbkNvbmZpZy5Fc2NhcGUuU1ZHLkxlZnQgPSAnPHN2ZyBpZD1cIlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE0NVwiIGhlaWdodD1cIjYxXCIgdmlld0JveD1cIjAgMCAxNDUgNjFcIj5cblx0PCEtLSBbMF0g44Oc44K/44OzIC0tPlxuXHQ8cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTQxLjItOC45YzAsMC0xNS4xLTUtMTMuNS0yMy43YzAuNy04LjEsMS0yNC4yLDE0LjEtMjMuNWMxMy41LDAuOCwyNi41LDMuMiwzMS43LDMuOVMxNi00OSwyNC44LTQ1LjdjNi40LDIuNCwyLjYsMTUuNywyLjksMjEuOGMwLjMsOC44LDMuMSwxNC45LDMuMSwxNC45XCIvPlxuXHQ8IS0tIFsxXSDlnJ/lj7AgLS0+XG5cdDxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0tODAuMiw0LjFoMTUuMVYtMjFsMTA0LjMsNi4yTDQ1LDQuMWgxNS40XCIvPlxuPC9zdmc+J1xuXG4jIyMjIyMjIyMjIyMjIyMjXG4jIOOBiuOBsOOBkVxuIyMjIyMjIyMjIyMjIyMjI1xuQ29uZmlnLkdob3N0ID0ge31cbkNvbmZpZy5HaG9zdC5TVkcgPSB7fVxuQ29uZmlnLkdob3N0LkNPTE9SID0gXG5cdEZJTExcdFx0OiBcIiNGRkZGRkZcIlxuXHRTVFJPS0VcdDogXCIjMDAwMDAwXCJcblx0QkdcdFx0XHQ6IFwiIzAwMDAwMFwiXG5cbkNvbmZpZy5HaG9zdC5TT1VORCA9IHtcblx0XCJTRTFcIjoge1xuXHRcdFwiTk9STUFMXCI6IFtcIkdvaHN0XzBfMFwiXVxuXHRcdFwiU0VDUkVUXCI6IFtcblx0XHRcdFwiU19Hb2hzdF8wXzBcIlxuXHRcdFx0XCJTX0dvaHN0XzBfMVwiXG5cdFx0XHRcIlNfR29oc3RfMF8yXCJcblx0XHRcdFwiU19Hb2hzdF8wXzNcIlxuXHRcdF1cblx0fVxuXHRcIlNFMlwiOiB7XG5cdFx0XCJOT1JNQUxcIjogW1xuXHRcdFx0XCJHb2hzdF8xXzBcIlxuXHRcdFx0XCJHb2hzdF8xXzFcIlxuXHRcdF1cblx0XHRcIlNFQ1JFVFwiOiBbXG5cdFx0XHRcIlNfR29oc3RfMV8wXCJcblx0XHRcdFwiU19Hb2hzdF8xXzFcIlxuXHRcdFx0XCJTX0dvaHN0XzFfMlwiXG5cdFx0XHRcIlNfR29oc3RfMV8zXCJcblx0XHRcdFwiU19Hb2hzdF8xXzRcIlxuXHRcdF1cblx0fVxufVxuXG5Db25maWcuR2hvc3QuU1ZHLkV5ZSA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuXHQuc3Qwe2ZpbGw6I0ZGRkZGRjtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6NDtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9XG5cdC5zdDF7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjUuNjM2ODtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9XG48L3N0eWxlPlxuPHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTTkuMS00MmMwLDIuOC0xLjEsNS4yLTIuOSw3LjFDNC40LTMzLjIsMS45LTMyLTAuOS0zMnMtNS4yLTEuMS03LjEtMi45Yy0xLjgtMS44LTIuOS00LjMtMi45LTcuMVxuXHRzMS4xLTUuMiwyLjktNy4xUy0zLjYtNTItMC45LTUyczUuMiwxLjEsNy4xLDIuOVM5LjEtNDQuOCw5LjEtNDJ6XCIvPlxuPHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTS0yMS4zLTQyYzAsMi44LTEuMSw1LjItMi45LDcuMWMtMS44LDEuOC00LjMsMi45LTcuMSwyLjlzLTUuMi0xLjEtNy4xLTIuOWMtMS44LTEuOC0yLjktNC4zLTIuOS03LjFcblx0czEuMS01LjIsMi45LTcuMVMtMzQtNTItMzEuMi01MnM1LjIsMS4xLDcuMSwyLjlDLTIyLjQtNDcuMy0yMS4zLTQ0LjgtMjEuMy00MnpcIi8+XG48cGF0aCBjbGFzcz1cInN0MVwiIGQ9XCJNLTMzLTQyLjhjMCwwLjYtMC4yLDEuMi0wLjcsMS42Yy0wLjQsMC40LTEsMC43LTEuNiwwLjdzLTEuMi0wLjItMS42LTAuN2MtMC40LTAuNC0wLjctMS0wLjctMS42XG5cdHMwLjItMS4yLDAuNy0xLjZjMC40LTAuNCwxLTAuNywxLjYtMC43czEuMiwwLjIsMS42LDAuN0MtMzMuMi00My45LTMzLTQzLjQtMzMtNDIuOHpcIi8+XG48cGF0aCBjbGFzcz1cInN0MVwiIGQ9XCJNLTIuOC00Mi44YzAsMC42LTAuMiwxLjItMC43LDEuNnMtMSwwLjctMS42LDAuN3MtMS4yLTAuMi0xLjYtMC43Yy0wLjQtMC40LTAuNy0xLTAuNy0xLjZzMC4yLTEuMiwwLjctMS42XG5cdGMwLjQtMC40LDEtMC43LDEuNi0wLjdzMS4yLDAuMiwxLjYsMC43Qy0zLjEtNDMuOS0yLjgtNDMuNC0yLjgtNDIuOHpcIi8+XG48L3N2Zz4nXG5cbkNvbmZpZy5HaG9zdC5TVkcuR2hvc3QxID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNMzIuNSw3Ni43Yy00Ni4zLDAtODQuNC0zNS45LTg0LjQtODkuOWMwLTQxLjMsMTcuMS02OC43LDUxLTY4LjdjMjQuOCwwLDQ2LjUsMjEuNCw0My4zLDUzLjdcblx0QzM4LjcsMTAuOSwzMi42LDQzLjMsNTMsNDMuM2MxMC4zLDAsMTMuNy02LjIsMjQuOC02LjJjOSwwLDE2LjYsOCwxMy42LDEyLjljLTMuNCw1LjUtMTAuMS0yLjUtMTksNi42XG5cdEM2NS42LDYzLjUsNTMuMiw3Ni43LDMyLjUsNzYuN3pcIi8+XG48cGF0aCBjbGFzcz1cInN0MVwiIGQ9XCJNMTEuNiw1LjZjMCwwLTkuMyw5LTEyLjgsMjAuNEMtMywzMi0yLjEsMzYuMSwwLjksMzcuN2MzLjksMi4yLDgtMSwxMi40LTUuNGM0LTQsNS43LTUuNiwxMC41LThcIi8+XG48cGF0aCBjbGFzcz1cInN0MVwiIGQ9XCJNLTQ1LjksNC43YzAsMC05LjMsOS0xMi44LDIwLjRjLTEuOCw2LTAuOSwxMC4xLDIuMSwxMS43YzMuOSwyLjIsOC0xLDEyLjQtNS40YzQtNCw1LjctNS42LDEwLjUtOFwiLz5cbjxwYXRoIGNsYXNzPVwic3QyXCIgZD1cIk0tMC45LTUyYzIuOCwwLDUuMywxLjEsNy4xLDIuOUM4LTQ3LjMsOS4xLTQ0LjgsOS4xLTQyUzgtMzYuNyw2LjItMzQuOUM0LjQtMzMuMSwxLjktMzItMC45LTMyXG5cdHMtNS4zLTEuMS03LjEtMi45Yy0xLjgtMS44LTIuOS00LjMtMi45LTcuMXMxLjEtNS4zLDIuOS03LjFDLTYuMi01MC45LTMuNy01Mi0wLjktNTJ6XCIvPlxuPHBhdGggY2xhc3M9XCJzdDJcIiBkPVwiTS0zMS4yLTUyYzIuOCwwLDUuMywxLjEsNy4xLDIuOWMxLjgsMS44LDIuOSw0LjMsMi45LDcuMXMtMS4xLDUuMy0yLjksNy4xcy00LjMsMi45LTcuMSwyLjlzLTUuMy0xLjEtNy4xLTIuOVxuXHRjLTEuOC0xLjgtMi45LTQuMy0yLjktNy4xczEuMS01LjMsMi45LTcuMUMtMzYuNS01MC45LTM0LTUyLTMxLjItNTJ6XCIvPlxuPHBhdGggY2xhc3M9XCJzdDNcIiBkPVwiTS0zNS4yLTQ0LjljMC42LDAsMS4yLDAuMiwxLjYsMC42YzAuNCwwLjQsMC42LDAuOSwwLjYsMS42cy0wLjIsMS4yLTAuNiwxLjZjLTAuNCwwLjQtMC45LDAuNi0xLjYsMC42XG5cdHMtMS4yLTAuMi0xLjYtMC42Yy0wLjQtMC40LTAuNi0wLjktMC42LTEuNnMwLjItMS4yLDAuNi0xLjZTLTM1LjgtNDQuOS0zNS4yLTQ0Ljl6XCIvPlxuPHBhdGggY2xhc3M9XCJzdDNcIiBkPVwiTS01LTQ0LjljMC42LDAsMS4yLDAuMiwxLjYsMC42YzAuNCwwLjQsMC42LDAuOSwwLjYsMS42cy0wLjIsMS4yLTAuNiwxLjZjLTAuNCwwLjQtMC45LDAuNi0xLjYsMC42XG5cdHMtMS4yLTAuMi0xLjYtMC42Qy03LTQxLjUtNy4yLTQyLTcuMi00Mi43czAuMi0xLjIsMC42LTEuNlMtNS42LTQ0LjktNS00NC45elwiLz5cbjwvc3ZnPidcblxuQ29uZmlnLkdob3N0LlNWRy5HaG9zdDIgPSAnPHN2ZyBpZD1cIlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE0NVwiIGhlaWdodD1cIjYxXCIgdmlld0JveD1cIjAgMCAxNDUgNjFcIj5cbjxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0zMi44LDc2LjdjLTQ2LjMsMC04NC40LTM1LjktODQuNC04OS45YzAtNDEuMywxNy4xLTY4LjcsNTEtNjguN2MyNC44LDAsNDYuNSwyMS40LDQzLjMsNTMuN1xuXHRDMzksMTAuOSwzNS4xLDM4LjcsNTIuOCw0OC45YzguMiw0LjcsMTQuNCw1LjIsMjQuOSwxLjZjOS4xLTMuMSwxMy40LDMuNCwxMC44LDguNWMtMi42LDUuMi05LjIsOS4yLTE5LjQsMTIuN1xuXHRDNTkuNiw3NS4xLDUxLjksNzYuNywzMi44LDc2Ljd6XCIvPlxuPHBhdGggY2xhc3M9XCJzdDFcIiBkPVwiTTExLjgsNS42YzAsMC05LjMsOS0xMi44LDIwLjRjLTEuOCw2LTAuOSwxMC4xLDIuMSwxMS43YzMuOSwyLjIsOC0xLDEyLjQtNS40YzQtNCw1LjctNS42LDEwLjUtOFwiLz5cbjxwYXRoIGNsYXNzPVwic3QxXCIgZD1cIk0tNDUuNyw0LjdjMCwwLTkuMyw5LTEyLjgsMjAuNGMtMS44LDYtMC45LDEwLjEsMi4xLDExLjdjMy45LDIuMiw4LTEsMTIuNC01LjRjNC00LDUuNy01LjYsMTAuNS04XCIvPlxuPHBhdGggY2xhc3M9XCJzdDJcIiBkPVwiTS0wLjktNTJjMi44LDAsNS4zLDEuMSw3LjEsMi45QzgtNDcuMyw5LjEtNDQuOCw5LjEtNDJTOC0zNi43LDYuMi0zNC45QzQuNC0zMy4xLDEuOS0zMi0wLjktMzJcblx0cy01LjMtMS4xLTcuMS0yLjljLTEuOC0xLjgtMi45LTQuMy0yLjktNy4xczEuMS01LjMsMi45LTcuMUMtNi4yLTUwLjktMy43LTUyLTAuOS01MnpcIi8+XG48cGF0aCBjbGFzcz1cInN0MlwiIGQ9XCJNLTMxLjItNTJjMi44LDAsNS4zLDEuMSw3LjEsMi45YzEuOCwxLjgsMi45LDQuMywyLjksNy4xcy0xLjEsNS4zLTIuOSw3LjFzLTQuMywyLjktNy4xLDIuOXMtNS4zLTEuMS03LjEtMi45XG5cdGMtMS44LTEuOC0yLjktNC4zLTIuOS03LjFzMS4xLTUuMywyLjktNy4xQy0zNi41LTUwLjktMzQtNTItMzEuMi01MnpcIi8+XG48cGF0aCBjbGFzcz1cInN0M1wiIGQ9XCJNLTM1LjItNDQuOWMwLjYsMCwxLjIsMC4yLDEuNiwwLjZjMC40LDAuNCwwLjYsMC45LDAuNiwxLjZzLTAuMiwxLjItMC42LDEuNmMtMC40LDAuNC0wLjksMC42LTEuNiwwLjZcblx0cy0xLjItMC4yLTEuNi0wLjZjLTAuNC0wLjQtMC42LTAuOS0wLjYtMS42czAuMi0xLjIsMC42LTEuNlMtMzUuOC00NC45LTM1LjItNDQuOXpcIi8+XG48cGF0aCBjbGFzcz1cInN0M1wiIGQ9XCJNLTUtNDQuOWMwLjYsMCwxLjIsMC4yLDEuNiwwLjZjMC40LDAuNCwwLjYsMC45LDAuNiwxLjZzLTAuMiwxLjItMC42LDEuNmMtMC40LDAuNC0wLjksMC42LTEuNiwwLjZcblx0cy0xLjItMC4yLTEuNi0wLjZDLTctNDEuNS03LjItNDItNy4yLTQyLjdzMC4yLTEuMiwwLjYtMS42Uy01LjYtNDQuOS01LTQ0Ljl6XCIvPlxuPC9zdmc+J1xuXG5Db25maWcuR2hvc3QuU1ZHLkdob3N0MyA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuPHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTTMyLjIsNzYuN2MtNDYuMywwLTg0LjQtMzUuOS04NC40LTg5LjljMC00MS4zLDE3LjEtNjguNyw1MS02OC43YzI0LjgsMCw0Ni41LDIxLjQsNDMuMyw1My43XG5cdGMtMy44LDM5LjEtOS41LDY5LjUsMTAuNiw2NS43YzExLjUtMi4yLDIxLjYsMC44LDMwLjIsNy4zYzguMSw2LjEsMTEsMTEuNCw2LDE1LjRjLTYuMyw1LTE1LjMtOC0yNy43LDMuN1xuXHRDNTQuMiw3MC41LDQ1LjYsNzYuNywzMi4yLDc2Ljd6XCIvPlxuPHBhdGggY2xhc3M9XCJzdDFcIiBkPVwiTTExLjMsNS42YzAsMC05LjMsOS0xMi44LDIwLjRjLTEuOCw2LTAuOSwxMC4xLDIuMSwxMS43YzMuOSwyLjIsOC0xLDEyLjQtNS40YzQtNCw1LjctNS42LDEwLjUtOFwiLz5cbjxwYXRoIGNsYXNzPVwic3QxXCIgZD1cIk0tNDYuMiw0LjdjMCwwLTkuMyw5LTEyLjgsMjAuNGMtMS44LDYtMC45LDEwLjEsMi4xLDExLjdjMy45LDIuMiw4LTEsMTIuNC01LjRjNC00LDUuNy01LjYsMTAuNS04XCIvPlxuPHBhdGggY2xhc3M9XCJzdDJcIiBkPVwiTS0wLjktNTJjMi44LDAsNS4zLDEuMSw3LjEsMi45QzgtNDcuMyw5LjEtNDQuOCw5LjEtNDJTOC0zNi43LDYuMi0zNC45QzQuNC0zMy4xLDEuOS0zMi0wLjktMzJcblx0cy01LjMtMS4xLTcuMS0yLjljLTEuOC0xLjgtMi45LTQuMy0yLjktNy4xczEuMS01LjMsMi45LTcuMUMtNi4yLTUwLjktMy43LTUyLTAuOS01MnpcIi8+XG48cGF0aCBjbGFzcz1cInN0MlwiIGQ9XCJNLTMxLjItNTJjMi44LDAsNS4zLDEuMSw3LjEsMi45YzEuOCwxLjgsMi45LDQuMywyLjksNy4xcy0xLjEsNS4zLTIuOSw3LjFzLTQuMywyLjktNy4xLDIuOXMtNS4zLTEuMS03LjEtMi45XG5cdGMtMS44LTEuOC0yLjktNC4zLTIuOS03LjFzMS4xLTUuMywyLjktNy4xQy0zNi41LTUwLjktMzQtNTItMzEuMi01MnpcIi8+XG48cGF0aCBjbGFzcz1cInN0M1wiIGQ9XCJNLTM1LjItNDQuOWMwLjYsMCwxLjIsMC4yLDEuNiwwLjZjMC40LDAuNCwwLjYsMC45LDAuNiwxLjZzLTAuMiwxLjItMC42LDEuNmMtMC40LDAuNC0wLjksMC42LTEuNiwwLjZcblx0cy0xLjItMC4yLTEuNi0wLjZjLTAuNC0wLjQtMC42LTAuOS0wLjYtMS42czAuMi0xLjIsMC42LTEuNlMtMzUuOC00NC45LTM1LjItNDQuOXpcIi8+XG48cGF0aCBjbGFzcz1cInN0M1wiIGQ9XCJNLTUtNDQuOWMwLjYsMCwxLjIsMC4yLDEuNiwwLjZjMC40LDAuNCwwLjYsMC45LDAuNiwxLjZzLTAuMiwxLjItMC42LDEuNmMtMC40LDAuNC0wLjksMC42LTEuNiwwLjZcblx0cy0xLjItMC4yLTEuNi0wLjZDLTctNDEuNS03LjItNDItNy4yLTQyLjdzMC4yLTEuMiwwLjYtMS42Uy01LjYtNDQuOS01LTQ0Ljl6XCIvPlxuPC9zdmc+J1xuXG5Db25maWcuR2hvc3QuU1ZHLkRhc2hlZCA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuXHQuc3Qwe2ZpbGw6bm9uZTtzdHJva2U6I0ZGRkZGRjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLWRhc2hhcnJheTowLjUxMTEsMy4wNjY1O31cblx0LnN0MXtmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1kYXNoYXJyYXk6MC40ODU5LDIuOTE1Nzt9XG5cdC5zdDJ7ZmlsbDpub25lO3N0cm9rZTojRkZGRkZGO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9XG5cdC5zdDN7ZmlsbDpub25lO3N0cm9rZTojRkZGRkZGO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtZGFzaGFycmF5OjAuNDk2NiwyLjk3OTQ7fVxuXHQuc3Q0e2ZpbGw6bm9uZTtzdHJva2U6I0ZGRkZGRjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLWRhc2hhcnJheTowLjQ5ODQsMi45OTA2O31cblx0LnN0NXtmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1kYXNoYXJyYXk6MC40ODkzLDIuOTM1ODt9XG5cdC5zdDZ7ZmlsbDpub25lO3N0cm9rZTojRkZGRkZGO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtZGFzaGFycmF5OjAuMzc0OCwyLjI0ODY7fVxuXHQuc3Q3e2ZpbGw6bm9uZTtzdHJva2U6I0ZGRkZGRjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLWRhc2hhcnJheTowLjQ4NTksMi45MTUyO31cblx0LnN0OHtmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1kYXNoYXJyYXk6MC4zOTA0LDIuMzQyNDt9XG5cdC5zdDl7ZmlsbDpub25lO3N0cm9rZTojRkZGRkZGO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtZGFzaGFycmF5OjAuNTQ4MSwzLjI4ODg7fVxuXHQuc3QxMHtmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1kYXNoYXJyYXk6MC40OTg0LDIuOTkwNDt9XG5cdC5zdDExe2ZpbGw6bm9uZTtzdHJva2U6I0ZGRkZGRjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLWRhc2hhcnJheTowLjUyMzUsMy4xNDExO31cblx0LnN0MTJ7ZmlsbDpub25lO3N0cm9rZTojRkZGRkZGO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtZGFzaGFycmF5OjAuNTA4NywzLjA1MjE7fVxuXHQuc3QxM3tmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1kYXNoYXJyYXk6MC41MDEyLDMuMDA3NDt9XG5cdC5zdDE0e2ZpbGw6bm9uZTtzdHJva2U6I0ZGRkZGRjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLWRhc2hhcnJheTowLjQ5OTgsMi45OTg5O31cblx0LnN0MTV7ZmlsbDpub25lO3N0cm9rZTojRkZGRkZGO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtZGFzaGFycmF5OjAuNDY4OSwyLjgxMzI7fVxuXHQuc3QxNntmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLXdpZHRoOjAuMTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLWRhc2hhcnJheTowLjY2OSw0LjAxMzg7fVxuPC9zdHlsZT5cbjxnPlxuXHQ8cGF0aCBkPVwiTS0yOC40LDQzLjlMLTI4LjQsNDMuOWMwLTYuOCw1LjMtMTIuNCwxMi43LTEyLjRTLTMuMSwzNy0zLjEsNDMuOHYwLjFjMCw2LjgtNS4zLDEyLjMtMTIuNywxMi4zUy0yOC40LDUwLjctMjguNCw0My45elxuXHRcdCBNLTguNCw0My45TC04LjQsNDMuOWMwLTQuMy0zLjEtNy44LTcuNC03LjhzLTcuNCwzLjQtNy40LDcuNnYwLjFjMCw0LjIsMy4xLDcuNyw3LjQsNy43Qy0xMS40LDUxLjYtOC40LDQ4LjItOC40LDQzLjl6XCIvPlxuXHQ8Zz5cblx0XHQ8cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTI4LjQsNDMuOUwtMjguNCw0My45YzAtNi44LDUuMy0xMi40LDEyLjctMTIuNFMtMy4xLDM3LTMuMSw0My44djAuMWMwLDYuOC01LjMsMTIuMy0xMi43LDEyLjNcblx0XHRcdFMtMjguNCw1MC43LTI4LjQsNDMuOXpcIi8+XG5cdFx0PHBhdGggY2xhc3M9XCJzdDFcIiBkPVwiTS04LjQsNDMuOUwtOC40LDQzLjljMC00LjMtMy4xLTcuOC03LjQtNy44cy03LjQsMy40LTcuNCw3LjZ2MC4xYzAsNC4yLDMuMSw3LjcsNy40LDcuN1xuXHRcdFx0Qy0xMS40LDUxLjYtOC40LDQ4LjItOC40LDQzLjl6XCIvPlxuXHQ8L2c+XG48L2c+XG48Zz5cblx0PHBhdGggZD1cIk01LjksMzJoMy43YzAuMiwwLDAuNSwwLjEsMC42LDAuM2wxMC45LDE0LjRWMzIuN2MwLTAuNCwwLjMtMC44LDAuOC0wLjhoMy43YzAuNCwwLDAuOCwwLjMsMC44LDAuOFY1NVxuXHRcdGMwLDAuNC0wLjMsMC44LTAuOCwwLjhoLTMuM2MtMC4yLDAtMC41LTAuMS0wLjYtMC4zTDEwLjMsNDAuN1Y1NWMwLDAuNC0wLjMsMC44LTAuOCwwLjhINS45Yy0wLjQsMC0wLjgtMC4zLTAuOC0wLjhWMzIuN1xuXHRcdEM1LjEsMzIuMyw1LjUsMzIsNS45LDMyelwiLz5cblx0PGc+XG5cdFx0PGc+XG5cdFx0XHQ8cG9seWxpbmUgY2xhc3M9XCJzdDJcIiBwb2ludHM9XCIyMSw0Ni40IDIxLjEsNDYuNiAyMS4xLDQ2LjQgXHRcdFx0XCIvPlxuXHRcdFx0PHBhdGggY2xhc3M9XCJzdDNcIiBkPVwiTTIxLjEsNDMuNFYzMi43YzAtMC40LDAuMy0wLjcsMC44LTAuN2gzLjdjMC40LDAsMC44LDAuMywwLjgsMC43VjU1YzAsMC40LTAuMywwLjgtMC44LDAuOGgtMy4zXG5cdFx0XHRcdGMtMC4yLDAtMC41LTAuMS0wLjYtMC4zTDExLjMsNDJcIi8+XG5cdFx0XHQ8cG9seWxpbmUgY2xhc3M9XCJzdDJcIiBwb2ludHM9XCIxMC40LDQwLjggMTAuMyw0MC43IDEwLjMsNDAuOSBcdFx0XHRcIi8+XG5cdFx0XHQ8cGF0aCBjbGFzcz1cInN0NFwiIGQ9XCJNMTAuMyw0My45VjU1YzAsMC40LTAuMywwLjgtMC44LDAuOEg1LjljLTAuNCwwLTAuOC0wLjMtMC44LTAuOFYzMi43YzAtMC40LDAuMy0wLjcsMC44LTAuN2gzLjdcblx0XHRcdFx0YzAuMiwwLDAuNSwwLjEsMC42LDAuM2w5LjksMTNcIi8+XG5cdFx0PC9nPlxuXHQ8L2c+XG48L2c+XG48Zz5cblx0PHBhdGggZD1cIk0tMTI3LjIsMzIuN2MwLTAuNCwwLjMtMC44LDAuOC0wLjhoOC4xYzIuNywwLDQuOSwwLjcsNi4yLDIuMWMxLjEsMS4xLDEuNiwyLjQsMS42LDR2MC4xYzAsMi44LTEuNSw0LjMtMy4yLDUuMlxuXHRcdGMyLjUsMSw0LjIsMi41LDQuMiw1Ljd2MC4yYzAsNC4zLTMuNCw2LjUtOC42LDYuNWgtOC4zYy0wLjQsMC0wLjgtMC4zLTAuOC0wLjhWMzIuN3ogTS0xMTUuNCwzOWMwLTEuNy0xLjItMi43LTMuMy0yLjdoLTMuN3Y1LjRcblx0XHRoMy40Qy0xMTYuOCw0MS43LTExNS40LDQwLjgtMTE1LjQsMzlMLTExNS40LDM5eiBNLTExOC4xLDQ1LjloLTQuM3Y1LjZoNC40YzIuMiwwLDMuNi0xLDMuNi0yLjh2MFxuXHRcdEMtMTE0LjQsNDYuOS0xMTUuNyw0NS45LTExOC4xLDQ1Ljl6XCIvPlxuXHQ8Zz5cblx0XHQ8Zz5cblx0XHRcdDxwYXRoIGNsYXNzPVwic3QyXCIgZD1cIk0tMTEzLjYsNDMuM2MtMC4xLDAtMC4xLDAuMS0wLjIsMC4xYzAuMSwwLDAuMiwwLjEsMC4yLDAuMVwiLz5cblx0XHRcdDxwYXRoIGNsYXNzPVwic3Q1XCIgZD1cIk0tMTExLjEsNDVjMSwxLDEuNSwyLjIsMS41LDR2MC4yYzAsNC4zLTMuNCw2LjUtOC42LDYuNWgtOC4zYy0wLjQsMC0wLjgtMC4zLTAuOC0wLjhWMzIuN1xuXHRcdFx0XHRjMC0wLjQsMC4zLTAuNywwLjgtMC43aDguMWMyLjcsMCw0LjksMC43LDYuMiwyLjFjMS4xLDEuMSwxLjYsMi40LDEuNiw0djAuMWMwLDItMC44LDMuMy0xLjgsNC4yXCIvPlxuXHRcdDwvZz5cblx0XHQ8Zz5cblx0XHRcdDxwb2x5bGluZSBjbGFzcz1cInN0MlwiIHBvaW50cz1cIi0xMjIuMiwzNi4zIC0xMjIuNSwzNi4zIC0xMjIuNSwzNi42IFx0XHRcdFwiLz5cblx0XHRcdDxsaW5lIGNsYXNzPVwic3Q2XCIgeDE9XCItMTIyLjVcIiB5MT1cIjM4LjhcIiB4Mj1cIi0xMjIuNVwiIHkyPVwiNDAuM1wiLz5cblx0XHRcdDxwb2x5bGluZSBjbGFzcz1cInN0MlwiIHBvaW50cz1cIi0xMjIuNSw0MS41IC0xMjIuNSw0MS43IC0xMjIuMiw0MS43IFx0XHRcdFwiLz5cblx0XHRcdDxwYXRoIGNsYXNzPVwic3Q3XCIgZD1cIk0tMTE5LjMsNDEuN2gwLjNjMi4yLDAsMy42LTAuOSwzLjYtMi43djBjMC0xLjctMS4yLTIuNy0zLjMtMi43aC0yXCIvPlxuXHRcdDwvZz5cblx0XHQ8Zz5cblx0XHRcdDxwb2x5bGluZSBjbGFzcz1cInN0MlwiIHBvaW50cz1cIi0xMjIuMiw0NS45IC0xMjIuNSw0NS45IC0xMjIuNSw0Ni4xIFx0XHRcdFwiLz5cblx0XHRcdDxsaW5lIGNsYXNzPVwic3Q4XCIgeDE9XCItMTIyLjVcIiB5MT1cIjQ4LjRcIiB4Mj1cIi0xMjIuNVwiIHkyPVwiNTBcIi8+XG5cdFx0XHQ8cG9seWxpbmUgY2xhc3M9XCJzdDJcIiBwb2ludHM9XCItMTIyLjUsNTEuMiAtMTIyLjUsNTEuNCAtMTIyLjIsNTEuNCBcdFx0XHRcIi8+XG5cdFx0XHQ8cGF0aCBjbGFzcz1cInN0OVwiIGQ9XCJNLTExOC45LDUxLjRoMC45YzIuMiwwLDMuNi0xLDMuNi0yLjh2MGMwLTEuNy0xLjMtMi44LTMuNy0yLjhoLTIuNFwiLz5cblx0XHQ8L2c+XG5cdDwvZz5cbjwvZz5cbjxnPlxuXHQ8cGF0aCBkPVwiTS0xMDEuNyw0Ni41VjMyLjdjMC0wLjQsMC4zLTAuOCwwLjgtMC44aDMuNGMwLjQsMCwwLjgsMC4zLDAuOCwwLjh2MTMuOGMwLDMuNCwxLjYsNSw0LjEsNXM0LjEtMS42LDQuMS00LjlWMzIuN1xuXHRcdGMwLTAuNCwwLjMtMC44LDAuOC0wLjhoMy40YzAuNCwwLDAuOCwwLjMsMC44LDAuOHYxMy43YzAsNi42LTMuNiw5LjctOS4xLDkuN0MtOTguMiw1Ni4yLTEwMS43LDUzLTEwMS43LDQ2LjV6XCIvPlxuXHQ8Zz5cblx0XHQ8cGF0aCBjbGFzcz1cInN0MTBcIiBkPVwiTS0xMDEuNyw0Ni41VjMyLjdjMC0wLjQsMC4zLTAuNywwLjgtMC43aDMuNGMwLjQsMCwwLjgsMC4zLDAuOCwwLjd2MTMuOGMwLDMuNCwxLjYsNSw0LjEsNXM0LjEtMS42LDQuMS00Ljlcblx0XHRcdFYzMi43YzAtMC40LDAuMy0wLjcsMC44LTAuN2gzLjRjMC40LDAsMC44LDAuMywwLjgsMC43djEzLjdjMCw2LjYtMy42LDkuNy05LjEsOS43Qy05OC4yLDU2LjItMTAxLjcsNTMtMTAxLjcsNDYuNXpcIi8+XG5cdDwvZz5cbjwvZz5cbjxnPlxuXHQ8cGF0aCBkPVwiTS02OS41LDM2LjVoLTUuMmMtMC40LDAtMC44LTAuMy0wLjgtMC44di0zLjFjMC0wLjQsMC4zLTAuOCwwLjgtMC44aDE1LjRjMC40LDAsMC44LDAuMywwLjgsMC44djMuMVxuXHRcdGMwLDAuNC0wLjMsMC44LTAuOCwwLjhoLTUuMlY1NWMwLDAuNC0wLjMsMC44LTAuOCwwLjhoLTMuNGMtMC40LDAtMC44LTAuMy0wLjgtMC44VjM2LjV6XCIvPlxuXHQ8Zz5cblx0XHQ8Zz5cblx0XHRcdDxwb2x5bGluZSBjbGFzcz1cInN0MlwiIHBvaW50cz1cIi02OS41LDM2LjggLTY5LjUsMzYuNSAtNjkuNywzNi41IFx0XHRcdFwiLz5cblx0XHRcdDxwYXRoIGNsYXNzPVwic3QxMVwiIGQ9XCJNLTcyLjksMzYuNWgtMS44Yy0wLjQsMC0wLjgtMC4zLTAuOC0wLjh2LTMuMWMwLTAuNCwwLjMtMC43LDAuOC0wLjdoMTUuNGMwLjQsMCwwLjgsMC4zLDAuOCwwLjd2My4xXG5cdFx0XHRcdGMwLDAuNC0wLjMsMC44LTAuOCwwLjhoLTMuNFwiLz5cblx0XHRcdDxwb2x5bGluZSBjbGFzcz1cInN0MlwiIHBvaW50cz1cIi02NC4zLDM2LjUgLTY0LjYsMzYuNSAtNjQuNiwzNi44IFx0XHRcdFwiLz5cblx0XHRcdDxwYXRoIGNsYXNzPVwic3QxMlwiIGQ9XCJNLTY0LjYsMzkuOFY1NWMwLDAuNC0wLjMsMC44LTAuOCwwLjhoLTMuNGMtMC40LDAtMC44LTAuMy0wLjgtMC44VjM4LjNcIi8+XG5cdFx0PC9nPlxuXHQ8L2c+XG48L2c+XG48Zz5cblx0PHBhdGggZD1cIk0tNDUuNiwzNi41aC01LjJjLTAuNCwwLTAuOC0wLjMtMC44LTAuOHYtMy4xYzAtMC40LDAuMy0wLjgsMC44LTAuOGgxNS40YzAuNCwwLDAuOCwwLjMsMC44LDAuOHYzLjFcblx0XHRjMCwwLjQtMC4zLDAuOC0wLjgsMC44aC01LjJWNTVjMCwwLjQtMC4zLDAuOC0wLjgsMC44aC0zLjRjLTAuNCwwLTAuOC0wLjMtMC44LTAuOFYzNi41elwiLz5cblx0PGc+XG5cdFx0PGc+XG5cdFx0XHQ8cG9seWxpbmUgY2xhc3M9XCJzdDJcIiBwb2ludHM9XCItNDUuNiwzNi44IC00NS42LDM2LjUgLTQ1LjksMzYuNSBcdFx0XHRcIi8+XG5cdFx0XHQ8cGF0aCBjbGFzcz1cInN0MTFcIiBkPVwiTS00OSwzNi41aC0xLjhjLTAuNCwwLTAuOC0wLjMtMC44LTAuOHYtMy4xYzAtMC40LDAuMy0wLjcsMC44LTAuN2gxNS40YzAuNCwwLDAuOCwwLjMsMC44LDAuN3YzLjFcblx0XHRcdFx0YzAsMC40LTAuMywwLjgtMC44LDAuOGgtMy40XCIvPlxuXHRcdFx0PHBvbHlsaW5lIGNsYXNzPVwic3QyXCIgcG9pbnRzPVwiLTQwLjUsMzYuNSAtNDAuNywzNi41IC00MC43LDM2LjggXHRcdFx0XCIvPlxuXHRcdFx0PHBhdGggY2xhc3M9XCJzdDEyXCIgZD1cIk0tNDAuNywzOS44VjU1YzAsMC40LTAuMywwLjgtMC44LDAuOGgtMy40Yy0wLjQsMC0wLjgtMC4zLTAuOC0wLjhWMzguM1wiLz5cblx0XHQ8L2c+XG5cdDwvZz5cbjwvZz5cbjxnPlxuXHQ8cGF0aCBkPVwiTTQ5LjQsMzJoMy40YzAuNCwwLDAuOCwwLjMsMC44LDAuOFY1NWMwLDAuNC0wLjMsMC44LTAuOCwwLjhoLTMuNGMtMC40LDAtMC44LTAuMy0wLjgtMC44VjMyLjdDNDguNiwzMi4zLDQ5LDMyLDQ5LjQsMzJ6XCJcblx0XHQvPlxuXHQ8Zz5cblx0XHQ8cGF0aCBjbGFzcz1cInN0MTNcIiBkPVwiTTQ5LjQsMzJoMy40YzAuNCwwLDAuOCwwLjMsMC44LDAuN1Y1NWMwLDAuNC0wLjMsMC44LTAuOCwwLjhoLTMuNGMtMC40LDAtMC44LTAuMy0wLjgtMC44VjMyLjdcblx0XHRcdEM0OC42LDMyLjMsNDksMzIsNDkuNCwzMnpcIi8+XG5cdDwvZz5cbjwvZz5cbjxnPlxuXHQ8cGF0aCBkPVwiTTkxLjcsNDQuNFY0NGMwLTcuMiw0LjUtMTIuMSwxMC44LTEyLjFjMy4yLDAsNS40LDEuMSw3LjIsMi43YzAuMywwLjMsMC4zLDAuNywwLjEsMWwtMiwyLjZjLTAuMywwLjMtMC44LDAuNC0xLjEsMC4xXG5cdFx0Yy0xLjMtMS4xLTIuNi0xLjgtNC4zLTEuOGMtMy4yLDAtNS41LDMtNS41LDcuNnYwLjFjMCw0LjcsMi40LDcuNiw1LjYsNy42YzEuNywwLDMtMC43LDQuMy0yYzAuMy0wLjMsMC44LTAuMiwxLjEsMC4xbDIsMi40XG5cdFx0YzAuMywwLjMsMC4yLDAuNywwLDFjLTIsMS45LTQuMiwzLjEtNy42LDMuMUM5NS45LDU2LjQsOTEuNyw1MS42LDkxLjcsNDQuNHpcIi8+XG5cdDxnPlxuXHRcdDxwYXRoIGNsYXNzPVwic3QxNFwiIGQ9XCJNOTEuNyw0NC40VjQ0YzAtNy4yLDQuNS0xMi4xLDEwLjgtMTIuMWMzLjIsMCw1LjQsMS4xLDcuMiwyLjdjMC4zLDAuMywwLjMsMC43LDAuMSwxbC0yLDIuNlxuXHRcdFx0Yy0wLjMsMC4zLTAuOCwwLjQtMS4xLDAuMWMtMS4zLTEuMS0yLjYtMS44LTQuMy0xLjhjLTMuMiwwLTUuNSwzLTUuNSw3LjZ2MC4xYzAsNC43LDIuNCw3LjYsNS42LDcuNmMxLjcsMCwzLTAuNyw0LjMtMlxuXHRcdFx0YzAuMy0wLjMsMC44LTAuMiwxLjEsMC4xbDIsMi40YzAuMywwLjMsMC4yLDAuNywwLDFjLTIsMS45LTQuMiwzLjEtNy42LDMuMUM5NS45LDU2LjQsOTEuNyw1MS42LDkxLjcsNDQuNHpcIi8+XG5cdDwvZz5cbjwvZz5cbjxnPlxuXHQ8cGF0aCBkPVwiTTExNi43LDUwLjhoMy44YzAuNCwwLDAuOCwwLjMsMC44LDAuOHYzLjdjMCwwLjQtMC4zLDAuOC0wLjgsMC44aC0zLjhjLTAuNCwwLTAuOC0wLjMtMC44LTAuOHYtMy43XG5cdFx0QzExNiw1MS4yLDExNi4zLDUwLjgsMTE2LjcsNTAuOHpcIi8+XG5cdDxnPlxuXHRcdDxwYXRoIGNsYXNzPVwic3QxNVwiIGQ9XCJNMTE2LjcsNTAuOGgzLjhjMC40LDAsMC44LDAuMywwLjgsMC44djMuN2MwLDAuNC0wLjMsMC44LTAuOCwwLjhoLTMuOGMtMC40LDAtMC44LTAuMy0wLjgtMC44di0zLjdcblx0XHRcdEMxMTYsNTEuMiwxMTYuMyw1MC44LDExNi43LDUwLjh6XCIvPlxuXHQ8L2c+XG48L2c+XG48Zz5cblx0PHBhdGggZD1cIk02My42LDMyaDMuN2MwLjIsMCwwLjUsMC4xLDAuNiwwLjNsMTAuOSwxNC40VjMyLjdjMC0wLjQsMC4zLTAuOCwwLjgtMC44aDMuN2MwLjQsMCwwLjgsMC4zLDAuOCwwLjhWNTVcblx0XHRjMCwwLjQtMC4zLDAuOC0wLjgsMC44SDgwYy0wLjIsMC0wLjUtMC4xLTAuNi0wLjNMNjguMSw0MC43VjU1YzAsMC40LTAuMywwLjgtMC44LDAuOGgtMy43Yy0wLjQsMC0wLjgtMC4zLTAuOC0wLjhWMzIuN1xuXHRcdEM2Mi45LDMyLjMsNjMuMiwzMiw2My42LDMyelwiLz5cblx0PGc+XG5cdFx0PGc+XG5cdFx0XHQ8cG9seWxpbmUgY2xhc3M9XCJzdDJcIiBwb2ludHM9XCI3OC43LDQ2LjQgNzguOSw0Ni42IDc4LjksNDYuNCBcdFx0XHRcIi8+XG5cdFx0XHQ8cGF0aCBjbGFzcz1cInN0M1wiIGQ9XCJNNzguOSw0My40VjMyLjdjMC0wLjQsMC4zLTAuNywwLjgtMC43aDMuN2MwLjQsMCwwLjgsMC4zLDAuOCwwLjdWNTVjMCwwLjQtMC4zLDAuOC0wLjgsMC44SDgwXG5cdFx0XHRcdGMtMC4yLDAtMC41LTAuMS0wLjYtMC4zTDY5LjEsNDJcIi8+XG5cdFx0XHQ8cG9seWxpbmUgY2xhc3M9XCJzdDJcIiBwb2ludHM9XCI2OC4yLDQwLjggNjguMSw0MC43IDY4LjEsNDAuOSBcdFx0XHRcIi8+XG5cdFx0XHQ8cGF0aCBjbGFzcz1cInN0NFwiIGQ9XCJNNjguMSw0My45VjU1YzAsMC40LTAuMywwLjgtMC44LDAuOGgtMy43Yy0wLjQsMC0wLjgtMC4zLTAuOC0wLjhWMzIuN2MwLTAuNCwwLjMtMC43LDAuOC0wLjdoMy43XG5cdFx0XHRcdGMwLjIsMCwwLjUsMC4xLDAuNiwwLjNsOS45LDEzXCIvPlxuXHRcdDwvZz5cblx0PC9nPlxuPC9nPlxuPGc+XG5cdDxjaXJjbGUgY2xhc3M9XCJzdDE2XCIgY3g9XCItNjguN1wiIGN5PVwiNTVcIiByPVwiMC44XCIvPlxuPC9nPlxuPGc+XG5cdDxjaXJjbGUgY2xhc3M9XCJzdDE2XCIgY3g9XCItMTI2LjVcIiBjeT1cIjU1XCIgcj1cIjAuOFwiLz5cbjwvZz5cbjxnPlxuXHQ8Y2lyY2xlIGNsYXNzPVwic3QxNlwiIGN4PVwiLTY1LjNcIiBjeT1cIjU1XCIgcj1cIjAuOFwiLz5cbjwvZz5cbjxnPlxuXHQ8Y2lyY2xlIGNsYXNzPVwic3QxNlwiIGN4PVwiLTQ0LjlcIiBjeT1cIjU1XCIgcj1cIjAuOFwiLz5cbjwvZz5cbjxnPlxuXHQ8Y2lyY2xlIGNsYXNzPVwic3QxNlwiIGN4PVwiLTQxLjVcIiBjeT1cIjU1XCIgcj1cIjAuOFwiLz5cbjwvZz5cbjxnPlxuXHQ8Y2lyY2xlIGNsYXNzPVwic3QxNlwiIGN4PVwiNDkuNFwiIGN5PVwiNTVcIiByPVwiMC44XCIvPlxuPC9nPlxuPGc+XG5cdDxjaXJjbGUgY2xhc3M9XCJzdDE2XCIgY3g9XCI1Mi44XCIgY3k9XCI1NVwiIHI9XCIwLjhcIi8+XG48L2c+XG48Zz5cblx0PGNpcmNsZSBjbGFzcz1cInN0MTZcIiBjeD1cIjI1LjVcIiBjeT1cIjU1XCIgcj1cIjAuOFwiLz5cbjwvZz5cbjxnPlxuXHQ8Y2lyY2xlIGNsYXNzPVwic3QxNlwiIGN4PVwiMjIuMlwiIGN5PVwiNTVcIiByPVwiMC44XCIvPlxuPC9nPlxuPGc+XG5cdDxjaXJjbGUgY2xhc3M9XCJzdDE2XCIgY3g9XCI5LjVcIiBjeT1cIjU1XCIgcj1cIjAuOFwiLz5cbjwvZz5cbjxnPlxuXHQ8Y2lyY2xlIGNsYXNzPVwic3QxNlwiIGN4PVwiNS45XCIgY3k9XCI1NVwiIHI9XCIwLjhcIi8+XG48L2c+XG48Zz5cblx0PGNpcmNsZSBjbGFzcz1cInN0MTZcIiBjeD1cIjgzLjNcIiBjeT1cIjU1XCIgcj1cIjAuOFwiLz5cbjwvZz5cbjxnPlxuXHQ8Y2lyY2xlIGNsYXNzPVwic3QxNlwiIGN4PVwiODBcIiBjeT1cIjU1XCIgcj1cIjAuOFwiLz5cbjwvZz5cbjxnPlxuXHQ8Y2lyY2xlIGNsYXNzPVwic3QxNlwiIGN4PVwiNjcuM1wiIGN5PVwiNTVcIiByPVwiMC44XCIvPlxuPC9nPlxuPGc+XG5cdDxjaXJjbGUgY2xhc3M9XCJzdDE2XCIgY3g9XCI2My42XCIgY3k9XCI1NVwiIHI9XCIwLjhcIi8+XG48L2c+XG48Zz5cblx0PHBhdGggZD1cIk0tMjguNCw0My45TC0yOC40LDQzLjljMC02LjgsNS4zLTEyLjQsMTIuNy0xMi40Uy0zLjEsMzctMy4xLDQzLjh2MC4xYzAsNi44LTUuMywxMi4zLTEyLjcsMTIuM1MtMjguNCw1MC43LTI4LjQsNDMuOXpcblx0XHQgTS04LjQsNDMuOUwtOC40LDQzLjljMC00LjMtMy4xLTcuOC03LjQtNy44cy03LjQsMy40LTcuNCw3LjZ2MC4xYzAsNC4yLDMuMSw3LjcsNy40LDcuN0MtMTEuNCw1MS42LTguNCw0OC4yLTguNCw0My45elwiLz5cblx0PGc+XG5cdFx0PHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTS0yOC40LDQzLjlMLTI4LjQsNDMuOWMwLTYuOCw1LjMtMTIuNCwxMi43LTEyLjRTLTMuMSwzNy0zLjEsNDMuOHYwLjFjMCw2LjgtNS4zLDEyLjMtMTIuNywxMi4zXG5cdFx0XHRTLTI4LjQsNTAuNy0yOC40LDQzLjl6XCIvPlxuXHRcdDxwYXRoIGNsYXNzPVwic3QxXCIgZD1cIk0tOC40LDQzLjlMLTguNCw0My45YzAtNC4zLTMuMS03LjgtNy40LTcuOHMtNy40LDMuNC03LjQsNy42djAuMWMwLDQuMiwzLjEsNy43LDcuNCw3Ljdcblx0XHRcdEMtMTEuNCw1MS42LTguNCw0OC4yLTguNCw0My45elwiLz5cblx0PC9nPlxuPC9nPlxuPGc+XG5cdDxwYXRoIGQ9XCJNNS45LDMyaDMuN2MwLjIsMCwwLjUsMC4xLDAuNiwwLjNsMTAuOSwxNC40VjMyLjdjMC0wLjQsMC4zLTAuOCwwLjgtMC44aDMuN2MwLjQsMCwwLjgsMC4zLDAuOCwwLjhWNTVcblx0XHRjMCwwLjQtMC4zLDAuOC0wLjgsMC44aC0zLjNjLTAuMiwwLTAuNS0wLjEtMC42LTAuM0wxMC4zLDQwLjdWNTVjMCwwLjQtMC4zLDAuOC0wLjgsMC44SDUuOWMtMC40LDAtMC44LTAuMy0wLjgtMC44VjMyLjdcblx0XHRDNS4xLDMyLjMsNS41LDMyLDUuOSwzMnpcIi8+XG5cdDxnPlxuXHRcdDxnPlxuXHRcdFx0PHBvbHlsaW5lIGNsYXNzPVwic3QyXCIgcG9pbnRzPVwiMjEsNDYuNCAyMS4xLDQ2LjYgMjEuMSw0Ni40IFx0XHRcdFwiLz5cblx0XHRcdDxwYXRoIGNsYXNzPVwic3QzXCIgZD1cIk0yMS4xLDQzLjRWMzIuN2MwLTAuNCwwLjMtMC43LDAuOC0wLjdoMy43YzAuNCwwLDAuOCwwLjMsMC44LDAuN1Y1NWMwLDAuNC0wLjMsMC44LTAuOCwwLjhoLTMuM1xuXHRcdFx0XHRjLTAuMiwwLTAuNS0wLjEtMC42LTAuM0wxMS4zLDQyXCIvPlxuXHRcdFx0PHBvbHlsaW5lIGNsYXNzPVwic3QyXCIgcG9pbnRzPVwiMTAuNCw0MC44IDEwLjMsNDAuNyAxMC4zLDQwLjkgXHRcdFx0XCIvPlxuXHRcdFx0PHBhdGggY2xhc3M9XCJzdDRcIiBkPVwiTTEwLjMsNDMuOVY1NWMwLDAuNC0wLjMsMC44LTAuOCwwLjhINS45Yy0wLjQsMC0wLjgtMC4zLTAuOC0wLjhWMzIuN2MwLTAuNCwwLjMtMC43LDAuOC0wLjdoMy43XG5cdFx0XHRcdGMwLjIsMCwwLjUsMC4xLDAuNiwwLjNsOS45LDEzXCIvPlxuXHRcdDwvZz5cblx0PC9nPlxuPC9nPlxuPGc+XG5cdDxwYXRoIGQ9XCJNLTEyNy4yLDMyLjdjMC0wLjQsMC4zLTAuOCwwLjgtMC44aDguMWMyLjcsMCw0LjksMC43LDYuMiwyLjFjMS4xLDEuMSwxLjYsMi40LDEuNiw0djAuMWMwLDIuOC0xLjUsNC4zLTMuMiw1LjJcblx0XHRjMi41LDEsNC4yLDIuNSw0LjIsNS43djAuMmMwLDQuMy0zLjQsNi41LTguNiw2LjVoLTguM2MtMC40LDAtMC44LTAuMy0wLjgtMC44VjMyLjd6IE0tMTE1LjQsMzljMC0xLjctMS4yLTIuNy0zLjMtMi43aC0zLjd2NS40XG5cdFx0aDMuNEMtMTE2LjgsNDEuNy0xMTUuNCw0MC44LTExNS40LDM5TC0xMTUuNCwzOXogTS0xMTguMSw0NS45aC00LjN2NS42aDQuNGMyLjIsMCwzLjYtMSwzLjYtMi44djBcblx0XHRDLTExNC40LDQ2LjktMTE1LjcsNDUuOS0xMTguMSw0NS45elwiLz5cblx0PGc+XG5cdFx0PGc+XG5cdFx0XHQ8cGF0aCBjbGFzcz1cInN0MlwiIGQ9XCJNLTExMy42LDQzLjNjLTAuMSwwLTAuMSwwLjEtMC4yLDAuMWMwLjEsMCwwLjIsMC4xLDAuMiwwLjFcIi8+XG5cdFx0XHQ8cGF0aCBjbGFzcz1cInN0NVwiIGQ9XCJNLTExMS4xLDQ1YzEsMSwxLjUsMi4yLDEuNSw0djAuMmMwLDQuMy0zLjQsNi41LTguNiw2LjVoLTguM2MtMC40LDAtMC44LTAuMy0wLjgtMC44VjMyLjdcblx0XHRcdFx0YzAtMC40LDAuMy0wLjcsMC44LTAuN2g4LjFjMi43LDAsNC45LDAuNyw2LjIsMi4xYzEuMSwxLjEsMS42LDIuNCwxLjYsNHYwLjFjMCwyLTAuOCwzLjMtMS44LDQuMlwiLz5cblx0XHQ8L2c+XG5cdFx0PGc+XG5cdFx0XHQ8cG9seWxpbmUgY2xhc3M9XCJzdDJcIiBwb2ludHM9XCItMTIyLjIsMzYuMyAtMTIyLjUsMzYuMyAtMTIyLjUsMzYuNiBcdFx0XHRcIi8+XG5cdFx0XHQ8bGluZSBjbGFzcz1cInN0NlwiIHgxPVwiLTEyMi41XCIgeTE9XCIzOC44XCIgeDI9XCItMTIyLjVcIiB5Mj1cIjQwLjNcIi8+XG5cdFx0XHQ8cG9seWxpbmUgY2xhc3M9XCJzdDJcIiBwb2ludHM9XCItMTIyLjUsNDEuNSAtMTIyLjUsNDEuNyAtMTIyLjIsNDEuNyBcdFx0XHRcIi8+XG5cdFx0XHQ8cGF0aCBjbGFzcz1cInN0N1wiIGQ9XCJNLTExOS4zLDQxLjdoMC4zYzIuMiwwLDMuNi0wLjksMy42LTIuN3YwYzAtMS43LTEuMi0yLjctMy4zLTIuN2gtMlwiLz5cblx0XHQ8L2c+XG5cdFx0PGc+XG5cdFx0XHQ8cG9seWxpbmUgY2xhc3M9XCJzdDJcIiBwb2ludHM9XCItMTIyLjIsNDUuOSAtMTIyLjUsNDUuOSAtMTIyLjUsNDYuMSBcdFx0XHRcIi8+XG5cdFx0XHQ8bGluZSBjbGFzcz1cInN0OFwiIHgxPVwiLTEyMi41XCIgeTE9XCI0OC40XCIgeDI9XCItMTIyLjVcIiB5Mj1cIjUwXCIvPlxuXHRcdFx0PHBvbHlsaW5lIGNsYXNzPVwic3QyXCIgcG9pbnRzPVwiLTEyMi41LDUxLjIgLTEyMi41LDUxLjQgLTEyMi4yLDUxLjQgXHRcdFx0XCIvPlxuXHRcdFx0PHBhdGggY2xhc3M9XCJzdDlcIiBkPVwiTS0xMTguOSw1MS40aDAuOWMyLjIsMCwzLjYtMSwzLjYtMi44djBjMC0xLjctMS4zLTIuOC0zLjctMi44aC0yLjRcIi8+XG5cdFx0PC9nPlxuXHQ8L2c+XG48L2c+XG48Zz5cblx0PHBhdGggZD1cIk0tMTAxLjcsNDYuNVYzMi43YzAtMC40LDAuMy0wLjgsMC44LTAuOGgzLjRjMC40LDAsMC44LDAuMywwLjgsMC44djEzLjhjMCwzLjQsMS42LDUsNC4xLDVzNC4xLTEuNiw0LjEtNC45VjMyLjdcblx0XHRjMC0wLjQsMC4zLTAuOCwwLjgtMC44aDMuNGMwLjQsMCwwLjgsMC4zLDAuOCwwLjh2MTMuN2MwLDYuNi0zLjYsOS43LTkuMSw5LjdDLTk4LjIsNTYuMi0xMDEuNyw1My0xMDEuNyw0Ni41elwiLz5cblx0PGc+XG5cdFx0PHBhdGggY2xhc3M9XCJzdDEwXCIgZD1cIk0tMTAxLjcsNDYuNVYzMi43YzAtMC40LDAuMy0wLjcsMC44LTAuN2gzLjRjMC40LDAsMC44LDAuMywwLjgsMC43djEzLjhjMCwzLjQsMS42LDUsNC4xLDVzNC4xLTEuNiw0LjEtNC45XG5cdFx0XHRWMzIuN2MwLTAuNCwwLjMtMC43LDAuOC0wLjdoMy40YzAuNCwwLDAuOCwwLjMsMC44LDAuN3YxMy43YzAsNi42LTMuNiw5LjctOS4xLDkuN0MtOTguMiw1Ni4yLTEwMS43LDUzLTEwMS43LDQ2LjV6XCIvPlxuXHQ8L2c+XG48L2c+XG48Zz5cblx0PHBhdGggZD1cIk0tNjkuNSwzNi41aC01LjJjLTAuNCwwLTAuOC0wLjMtMC44LTAuOHYtMy4xYzAtMC40LDAuMy0wLjgsMC44LTAuOGgxNS40YzAuNCwwLDAuOCwwLjMsMC44LDAuOHYzLjFcblx0XHRjMCwwLjQtMC4zLDAuOC0wLjgsMC44aC01LjJWNTVjMCwwLjQtMC4zLDAuOC0wLjgsMC44aC0zLjRjLTAuNCwwLTAuOC0wLjMtMC44LTAuOFYzNi41elwiLz5cblx0PGc+XG5cdFx0PGc+XG5cdFx0XHQ8cG9seWxpbmUgY2xhc3M9XCJzdDJcIiBwb2ludHM9XCItNjkuNSwzNi44IC02OS41LDM2LjUgLTY5LjcsMzYuNSBcdFx0XHRcIi8+XG5cdFx0XHQ8cGF0aCBjbGFzcz1cInN0MTFcIiBkPVwiTS03Mi45LDM2LjVoLTEuOGMtMC40LDAtMC44LTAuMy0wLjgtMC44di0zLjFjMC0wLjQsMC4zLTAuNywwLjgtMC43aDE1LjRjMC40LDAsMC44LDAuMywwLjgsMC43djMuMVxuXHRcdFx0XHRjMCwwLjQtMC4zLDAuOC0wLjgsMC44aC0zLjRcIi8+XG5cdFx0XHQ8cG9seWxpbmUgY2xhc3M9XCJzdDJcIiBwb2ludHM9XCItNjQuMywzNi41IC02NC42LDM2LjUgLTY0LjYsMzYuOCBcdFx0XHRcIi8+XG5cdFx0XHQ8cGF0aCBjbGFzcz1cInN0MTJcIiBkPVwiTS02NC42LDM5LjhWNTVjMCwwLjQtMC4zLDAuOC0wLjgsMC44aC0zLjRjLTAuNCwwLTAuOC0wLjMtMC44LTAuOFYzOC4zXCIvPlxuXHRcdDwvZz5cblx0PC9nPlxuPC9nPlxuPGc+XG5cdDxwYXRoIGQ9XCJNLTQ1LjYsMzYuNWgtNS4yYy0wLjQsMC0wLjgtMC4zLTAuOC0wLjh2LTMuMWMwLTAuNCwwLjMtMC44LDAuOC0wLjhoMTUuNGMwLjQsMCwwLjgsMC4zLDAuOCwwLjh2My4xXG5cdFx0YzAsMC40LTAuMywwLjgtMC44LDAuOGgtNS4yVjU1YzAsMC40LTAuMywwLjgtMC44LDAuOGgtMy40Yy0wLjQsMC0wLjgtMC4zLTAuOC0wLjhWMzYuNXpcIi8+XG5cdDxnPlxuXHRcdDxnPlxuXHRcdFx0PHBvbHlsaW5lIGNsYXNzPVwic3QyXCIgcG9pbnRzPVwiLTQ1LjYsMzYuOCAtNDUuNiwzNi41IC00NS45LDM2LjUgXHRcdFx0XCIvPlxuXHRcdFx0PHBhdGggY2xhc3M9XCJzdDExXCIgZD1cIk0tNDksMzYuNWgtMS44Yy0wLjQsMC0wLjgtMC4zLTAuOC0wLjh2LTMuMWMwLTAuNCwwLjMtMC43LDAuOC0wLjdoMTUuNGMwLjQsMCwwLjgsMC4zLDAuOCwwLjd2My4xXG5cdFx0XHRcdGMwLDAuNC0wLjMsMC44LTAuOCwwLjhoLTMuNFwiLz5cblx0XHRcdDxwb2x5bGluZSBjbGFzcz1cInN0MlwiIHBvaW50cz1cIi00MC41LDM2LjUgLTQwLjcsMzYuNSAtNDAuNywzNi44IFx0XHRcdFwiLz5cblx0XHRcdDxwYXRoIGNsYXNzPVwic3QxMlwiIGQ9XCJNLTQwLjcsMzkuOFY1NWMwLDAuNC0wLjMsMC44LTAuOCwwLjhoLTMuNGMtMC40LDAtMC44LTAuMy0wLjgtMC44VjM4LjNcIi8+XG5cdFx0PC9nPlxuXHQ8L2c+XG48L2c+XG48Zz5cblx0PHBhdGggZD1cIk00OS40LDMyaDMuNGMwLjQsMCwwLjgsMC4zLDAuOCwwLjhWNTVjMCwwLjQtMC4zLDAuOC0wLjgsMC44aC0zLjRjLTAuNCwwLTAuOC0wLjMtMC44LTAuOFYzMi43QzQ4LjYsMzIuMyw0OSwzMiw0OS40LDMyelwiXG5cdFx0Lz5cblx0PGc+XG5cdFx0PHBhdGggY2xhc3M9XCJzdDEzXCIgZD1cIk00OS40LDMyaDMuNGMwLjQsMCwwLjgsMC4zLDAuOCwwLjdWNTVjMCwwLjQtMC4zLDAuOC0wLjgsMC44aC0zLjRjLTAuNCwwLTAuOC0wLjMtMC44LTAuOFYzMi43XG5cdFx0XHRDNDguNiwzMi4zLDQ5LDMyLDQ5LjQsMzJ6XCIvPlxuXHQ8L2c+XG48L2c+XG48Zz5cblx0PHBhdGggZD1cIk05MS43LDQ0LjRWNDRjMC03LjIsNC41LTEyLjEsMTAuOC0xMi4xYzMuMiwwLDUuNCwxLjEsNy4yLDIuN2MwLjMsMC4zLDAuMywwLjcsMC4xLDFsLTIsMi42Yy0wLjMsMC4zLTAuOCwwLjQtMS4xLDAuMVxuXHRcdGMtMS4zLTEuMS0yLjYtMS44LTQuMy0xLjhjLTMuMiwwLTUuNSwzLTUuNSw3LjZ2MC4xYzAsNC43LDIuNCw3LjYsNS42LDcuNmMxLjcsMCwzLTAuNyw0LjMtMmMwLjMtMC4zLDAuOC0wLjIsMS4xLDAuMWwyLDIuNFxuXHRcdGMwLjMsMC4zLDAuMiwwLjcsMCwxYy0yLDEuOS00LjIsMy4xLTcuNiwzLjFDOTUuOSw1Ni40LDkxLjcsNTEuNiw5MS43LDQ0LjR6XCIvPlxuXHQ8Zz5cblx0XHQ8cGF0aCBjbGFzcz1cInN0MTRcIiBkPVwiTTkxLjcsNDQuNFY0NGMwLTcuMiw0LjUtMTIuMSwxMC44LTEyLjFjMy4yLDAsNS40LDEuMSw3LjIsMi43YzAuMywwLjMsMC4zLDAuNywwLjEsMWwtMiwyLjZcblx0XHRcdGMtMC4zLDAuMy0wLjgsMC40LTEuMSwwLjFjLTEuMy0xLjEtMi42LTEuOC00LjMtMS44Yy0zLjIsMC01LjUsMy01LjUsNy42djAuMWMwLDQuNywyLjQsNy42LDUuNiw3LjZjMS43LDAsMy0wLjcsNC4zLTJcblx0XHRcdGMwLjMtMC4zLDAuOC0wLjIsMS4xLDAuMWwyLDIuNGMwLjMsMC4zLDAuMiwwLjcsMCwxYy0yLDEuOS00LjIsMy4xLTcuNiwzLjFDOTUuOSw1Ni40LDkxLjcsNTEuNiw5MS43LDQ0LjR6XCIvPlxuXHQ8L2c+XG48L2c+XG48Zz5cblx0PHBhdGggZD1cIk0xMTYuNyw1MC44aDMuOGMwLjQsMCwwLjgsMC4zLDAuOCwwLjh2My43YzAsMC40LTAuMywwLjgtMC44LDAuOGgtMy44Yy0wLjQsMC0wLjgtMC4zLTAuOC0wLjh2LTMuN1xuXHRcdEMxMTYsNTEuMiwxMTYuMyw1MC44LDExNi43LDUwLjh6XCIvPlxuXHQ8Zz5cblx0XHQ8cGF0aCBjbGFzcz1cInN0MTVcIiBkPVwiTTExNi43LDUwLjhoMy44YzAuNCwwLDAuOCwwLjMsMC44LDAuOHYzLjdjMCwwLjQtMC4zLDAuOC0wLjgsMC44aC0zLjhjLTAuNCwwLTAuOC0wLjMtMC44LTAuOHYtMy43XG5cdFx0XHRDMTE2LDUxLjIsMTE2LjMsNTAuOCwxMTYuNyw1MC44elwiLz5cblx0PC9nPlxuPC9nPlxuPGc+XG5cdDxwYXRoIGQ9XCJNNjMuNiwzMmgzLjdjMC4yLDAsMC41LDAuMSwwLjYsMC4zbDEwLjksMTQuNFYzMi43YzAtMC40LDAuMy0wLjgsMC44LTAuOGgzLjdjMC40LDAsMC44LDAuMywwLjgsMC44VjU1XG5cdFx0YzAsMC40LTAuMywwLjgtMC44LDAuOEg4MGMtMC4yLDAtMC41LTAuMS0wLjYtMC4zTDY4LjEsNDAuN1Y1NWMwLDAuNC0wLjMsMC44LTAuOCwwLjhoLTMuN2MtMC40LDAtMC44LTAuMy0wLjgtMC44VjMyLjdcblx0XHRDNjIuOSwzMi4zLDYzLjIsMzIsNjMuNiwzMnpcIi8+XG5cdDxnPlxuXHRcdDxnPlxuXHRcdFx0PHBvbHlsaW5lIGNsYXNzPVwic3QyXCIgcG9pbnRzPVwiNzguNyw0Ni40IDc4LjksNDYuNiA3OC45LDQ2LjQgXHRcdFx0XCIvPlxuXHRcdFx0PHBhdGggY2xhc3M9XCJzdDNcIiBkPVwiTTc4LjksNDMuNFYzMi43YzAtMC40LDAuMy0wLjcsMC44LTAuN2gzLjdjMC40LDAsMC44LDAuMywwLjgsMC43VjU1YzAsMC40LTAuMywwLjgtMC44LDAuOEg4MFxuXHRcdFx0XHRjLTAuMiwwLTAuNS0wLjEtMC42LTAuM0w2OS4xLDQyXCIvPlxuXHRcdFx0PHBvbHlsaW5lIGNsYXNzPVwic3QyXCIgcG9pbnRzPVwiNjguMiw0MC44IDY4LjEsNDAuNyA2OC4xLDQwLjkgXHRcdFx0XCIvPlxuXHRcdFx0PHBhdGggY2xhc3M9XCJzdDRcIiBkPVwiTTY4LjEsNDMuOVY1NWMwLDAuNC0wLjMsMC44LTAuOCwwLjhoLTMuN2MtMC40LDAtMC44LTAuMy0wLjgtMC44VjMyLjdjMC0wLjQsMC4zLTAuNywwLjgtMC43aDMuN1xuXHRcdFx0XHRjMC4yLDAsMC41LDAuMSwwLjYsMC4zbDkuOSwxM1wiLz5cblx0XHQ8L2c+XG5cdDwvZz5cbjwvZz5cbjwvc3ZnPidcblxuIyMjIyMjIyMjIyMjIyMjI1xuIyBVRk9cbiMjIyMjIyMjIyMjIyMjIyNcbkNvbmZpZy5VZm8gPSB7fVxuQ29uZmlnLlVmby5TT1VORCA9IHtcblx0XCJTRTFcIjp7XG5cdFx0XCJOT1JNQUxcIjogW1xuXHRcdFx0XCJVZm9fMF8wXCJcblx0XHRcdFwiVWZvXzBfMVwiXG5cdFx0XHRcIlVmb18wXzJcIlxuXHRcdF1cblx0XHRcIlNFQ1JFVFwiOiBbXG5cdFx0XHRcIlNfVWZvXzBfMFwiXG5cdFx0XHRcIlNfVWZvXzBfMVwiXG5cdFx0XHRcIlNfVWZvXzBfMlwiXG5cdFx0XVxuXHR9XG5cdFwiU0UyXCI6IHtcblx0XHRcIk5PUk1BTFwiOiBbXG5cdFx0XHRcIlVmb18xXzBcIlxuXHRcdFx0XCJVZm9fMV8xXCJcblx0XHRdXG5cdFx0XCJTRUNSRVRcIjogW1xuXHRcdFx0XCJTX1Vmb18xXzBcIlxuXHRcdFx0XCJTX1Vmb18xXzFcIlxuXHRcdFx0XCJTX1Vmb18xXzJcIlxuXHRcdF1cblx0fVxuXHRcIlNFM1wiOiB7XG5cdFx0XCJOT1JNQUxcIjogW1xuXHRcdFx0XCJVZm9fMl8wXCJcblx0XHRcdFwiVWZvXzJfMVwiXG5cdFx0XVxuXHRcdFwiU0VDUkVUXCI6IFtcblx0XHRcdFwiU19VZm9fMl8wXCJcblx0XHRcdFwiU19VZm9fMl8xXCJcblx0XHRcdFwiU19VZm9fMl8yXCJcblx0XHRcdFwiU19VZm9fMl8zXCJcblx0XHRdXG5cdH1cbn1cbkNvbmZpZy5VZm8uU1ZHID0ge31cblxuI+WkieW9ouW+jFxuQ29uZmlnLlVmby5TVkcuQnRuID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG5cdDxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0tNTAuOS0xNi4yYy0wLjQtOS4xLDIuMi0xOC43LDUuNy0yNS4xYzMuNC02LjIsOC40LTEwLjgsMTIuOS0xMy43YzcuNi00LjksMTUuNy03LjQsMjQuNy03LjRjOC44LDAsMTUuOSwyLjksMjIuOCw2LjhjNS4yLDIuOSwxMC43LDguOSwxMywxMy4xYzQuOSw4LjgsNi4zLDE0LjUsNi4zLDI2LjRcIi8+XG48L3N2Zz4nXG5cbiPlpInlvaLliY1cbkNvbmZpZy5VZm8uU1ZHLkJhc2UxID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG5cdDxwb2x5bGluZSBjbGFzcz1cInN0MFwiIHBvaW50cz1cIi04MC45LDQuMyAtNzMuOSw0LjMgLTY1LjksNC4zIC02MC45LC0xNS43IDQ0LjEsLTE1LjcgNDkuMSw0LjMgNTguMSw0LjMgNjQuMSw0LjMgXCIvPlxuPC9zdmc+J1xuXG4j5aSJ5b2i5b6MXG5Db25maWcuVWZvLlNWRy5CYXNlMiA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuXHQ8cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTgwLjQsMjguNmMtMy4zLTAuNi01LjgtNi0yLjYtOS40Qy04MC42LDE2LjgtNjguNCw3LTY2LjYsNC40YzIuNS0zLjUsMy40LTE3LjksOC42LTE5LjlzOTMtMi45LDk5LjIsMC4yYzQuMSwyLjEsNS44LDE1LjYsNy45LDE5LjJzMTMuMiwxMS44LDE2LjQsMTUuMmMyLjQsMi42LDIuNCw5LjYtNC41LDkuNkM1Ny40LDI4LjgtNzcsMjkuMy04MC40LDI4LjZ6XCIvPlxuXG48L3N2Zz4nXG5cblxuI1VGT+OBl+OBn+mDqOWIhuOBruODkeODvOODhFxuQ29uZmlnLlVmby5TVkcuQ2lyY2xlID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG5cdDxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0tMzAuOCwyNi42YzAsNC44LTIsOS4yLTUuMSwxMi40Yy0zLjIsMy4yLTcuNSw1LjEtMTIuNCw1LjFzLTkuMi0yLTEyLjQtNS4xYy0zLjItMy4yLTUuMS03LjUtNS4xLTEyLjRzMi05LjIsNS4xLTEyLjRjMy4yLTMuMiw3LjUtNS4xLDEyLjQtNS4xczkuMiwyLDEyLjQsNS4xQy0zMi44LDE3LjQtMzAuOCwyMS43LTMwLjgsMjYuNnpcIi8+XG5cdDxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk04LjYsMjYuNmMwLDQuOC0yLDkuMi01LjEsMTIuNEMwLjMsNDIuMS00LjEsNDQtOC45LDQ0cy05LjItMi0xMi40LTUuMWMtMy4yLTMuMi01LjEtNy41LTUuMS0xMi40czItOS4yLDUuMS0xMi40czcuNS01LjEsMTIuNC01LjFzOS4yLDIsMTIuNCw1LjFTOC42LDIxLjcsOC42LDI2LjZ6XCIvPlxuXHQ8cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNNDcuNiwyNi42YzAsNC44LTIsOS4yLTUuMSwxMi40Yy0zLjIsMy4yLTcuNSw1LjEtMTIuNCw1LjFzLTkuMi0yLTEyLjQtNS4xYy0zLjItMy4yLTUuMS03LjUtNS4xLTEyLjRzMi05LjIsNS4xLTEyLjRzNy41LTUuMSwxMi40LTUuMXM5LjIsMiwxMi40LDUuMUM0NS42LDE3LjQsNDcuNiwyMS43LDQ3LjYsMjYuNnpcIi8+XG48L3N2Zz4nXG5cbiNVRk8g5YWJ57eaP1xuQ29uZmlnLlVmby5TVkcuTGluZSA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuXHQ8bGluZSBjbGFzcz1cInN0MFwiIHgxPVwiLTU3LjdcIiB5MT1cIjYwXCIgeDI9XCItOTNcIiB5Mj1cIjE0NC45XCIvPlxuXHQ8bGluZSBjbGFzcz1cInN0MFwiIHgxPVwiNDEuMVwiIHkxPVwiNjEuOFwiIHgyPVwiNzYuNFwiIHkyPVwiMTQ2LjhcIi8+XG48L3N2Zz4nXG5cblxuXG4jIyMjIyMjIyMjIyMjIyMjXG4jIOODreOCseODg+ODiFxuIyMjIyMjIyMjIyMjIyMjI1xuQ29uZmlnLlJvY2tldCA9IHt9XG5Db25maWcuUm9ja2V0LlNWRyA9IHt9XG5Db25maWcuUm9ja2V0LkNPTE9SID1cblx0RklSRV9TVFJPS0VcdFx0OiBcIiMyMzE4MTVcIlxuXHRGSVJFX09VVFx0XHRcdDogXCIjRjE1QTI0XCJcblx0RklSRV9JTlx0XHRcdFx0OiBcIiNGREY2NjNcIlxuXHRTTU9LRV9GSUxMMVx0XHQ6IFwiIzlGQzZFM1wiXG5cdFNNT0tFX0ZJTEwyXHRcdDogXCIjN0NCN0RBXCJcblxuQ29uZmlnLlJvY2tldC5TT1VORCA9IHtcblx0XCJTRTFcIjoge1xuXHRcdFwiTk9STUFMXCI6IFtcIlJvY2tldF8wXCJdXG5cdFx0XCJTRUNSRVRcIjogW1xuXHRcdFx0XCJTX1JvY2tldF8xXCJcblx0XHRcdFwiU19Sb2NrZXRfMlwiXG5cdFx0XHRcIlNfUm9ja2V0XzNcIlxuXHRcdFx0XCJTX1JvY2tldF80XCJcblx0XHRcdFwiU19Sb2NrZXRfNVwiXG5cdFx0XVxuXHR9XG59XG5cbiMg54KOXG5Db25maWcuUm9ja2V0LlNWRy5GaXJlMSA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuPCEtLSDlpJbjga7ngo4tLT5cbjxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk01LjUsMzQuM0M1LjUsNDguNS03LDY0LTcsNjRzLTEyLjYtMTUuNS0xMi42LTI5LjdTLTEyLDEyLjUtNywxMi41UzUuNSwyMC4xLDUuNSwzNC4zelwiLz5cbjxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0tMTkuNyw0LjRjMCwxNC4yLTEyLjYsMjkuOC0xMi42LDI5LjhTLTQ0LjgsMTguNi00NC44LDQuNHM3LjYtMjEuOCwxMi42LTIxLjhTLTE5LjctOS45LTE5LjcsNC40elwiLz5cbjxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0zMC4xLDMuNGMwLDE0LjItMTIuNiwyOS44LTEyLjYsMjkuOFM1LDE3LjYsNSwzLjRzNy42LTIxLjgsMTIuNi0yMS44UzMwLjEtMTAuOSwzMC4xLDMuNHpcIi8+XG48IS0tIOWGheOBrueCji0tPlxuPHBhdGggY2xhc3M9XCJzdDFcIiBkPVwiTS0xLjQsMjguNmMwLDguNy01LjYsMTguMy01LjYsMTguM3MtNS42LTkuNS01LjYtMTguM1MtOS44LDE1LjItNywxNS4yUy0xLjQsMTkuOC0xLjQsMjguNnpcIi8+XG48cGF0aCBjbGFzcz1cInN0MVwiIGQ9XCJNMjMuMi0yLjNjMCw4LjctNS42LDE4LjMtNS42LDE4LjNTMTIsNi41LDEyLTIuM3MyLjgtMTMuNCw1LjYtMTMuNFMyMy4yLTExLjEsMjMuMi0yLjN6XCIvPlxuPHBhdGggY2xhc3M9XCJzdDFcIiBkPVwiTS0yNi42LTEuM2MwLDguNy01LjYsMTguMy01LjYsMTguM3MtNS42LTkuNS01LjYtMTguM3MyLjgtMTMuNCw1LjYtMTMuNFMtMjYuNi0xMC4xLTI2LjYtMS4zelwiLz5cbjwvc3ZnPidcblxuQ29uZmlnLlJvY2tldC5TVkcuRmlyZTIgPSAnPHN2ZyBpZD1cIlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE0NVwiIGhlaWdodD1cIjYxXCIgdmlld0JveD1cIjAgMCAxNDUgNjFcIj5cbjwhLS0g5aSW44Gu54KOLS0+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNNS40LDMwLjZjMCwxMS41LTEyLjYsMjQtMTIuNiwyNHMtMTIuNi0xMi41LTEyLjYtMjRTLTEyLjEsMTMtNy4xLDEzUzUuNCwxOS4xLDUuNCwzMC42elwiLz5cbjxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0tMTkuOCwwLjdjMCwxMS41LTEyLjYsMjQtMTIuNiwyNFMtNDUsMTIuMi00NSwwLjdzNy42LTE3LjYsMTIuNi0xNy42Uy0xOS44LTEwLjgtMTkuOCwwLjd6XCIvPlxuPHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTTMwLjUsMGMwLDExLjUtMTIuNiwyNC0xMi42LDI0UzUuNCwxMS41LDUuNCwwUzEzLTE3LjYsMTcuOS0xNy42UzMwLjUtMTEuNCwzMC41LDB6XCIvPlxuPCEtLSDlhoXjga7ngo4tLT5cbjxwYXRoIGNsYXNzPVwic3QxXCIgZD1cIk0tMS41LDI2YzAsNy01LjYsMTQuOC01LjYsMTQuOHMtNS42LTcuNy01LjYtMTQuOHMyLjgtMTAuOCw1LjYtMTAuOFMtMS41LDE4LjktMS41LDI2elwiLz5cbjxwYXRoIGNsYXNzPVwic3QxXCIgZD1cIk0yMy41LTQuNmMwLDctNS42LDE0LjgtNS42LDE0LjhzLTUuNi03LjctNS42LTE0LjhzMi44LTEwLjgsNS42LTEwLjhTMjMuNS0xMS43LDIzLjUtNC42elwiLz5cbjxwYXRoIGNsYXNzPVwic3QxXCIgZD1cIk0tMjYuNy00YzAsNy01LjYsMTQuOC01LjYsMTQuOFMtMzcuOSwzLjEtMzcuOS00czIuOC0xMC44LDUuNi0xMC44Uy0yNi43LTExLTI2LjctNHpcIi8+XG48L3N2Zz4nXG5cblxuIyDnmbrou4rliY1cbkNvbmZpZy5Sb2NrZXQuU1ZHLkJlZm9yZSA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuXHQ8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+XG5cdFx0LnN0MHtmaWxsOm5vbmU7c3Ryb2tlOiMyMzE4MTU7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwO31cblx0PC9zdHlsZT5cblx0PHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTTMzLjctMTZsLTEuMi0zMS4zYy0wLjItNC44LTQuMi04LjQtOS04LjdjLTkuNy0wLjUtMjAuMi0wLjUtMzIuMy0wLjVzLTIyLjcsMC0zMi4zLDAuNWMtNC44LDAuMi04LjgsMy44LTksOC43TC01MS4zLTE2aDQyLjVIMzMuN3pcIi8+XG48L3N2Zz4nXG5cbiMg55m66LuK5b6MXG5Db25maWcuUm9ja2V0LlNWRy5BZnRlciA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuPHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTTEzLjUtNDguNWMwLDAsMTMuMS0yOCwxMy4yLTUwLjdjMC0xMC44LTEuNi0yMS00LjQtMzAuMWMtNy0yMy40LTIwLjktMzkuNS0zMC4yLTM5LjVzLTIzLjIsMTYuMS0zMC4yLDM5LjVcblx0Yy0yLjcsOS4xLTQuNCwxOS4zLTQuNCwzMC4xYzAuMSwyMi43LDEzLjIsNTAuNywxMy4yLDUwLjdjNi40LTEuNSwxMy43LTIuNCwyMS40LTIuNFM3LjEtNTAsMTMuNS00OC41elwiLz5cbjwvc3ZnPidcblxuQ29uZmlnLlJvY2tldC5TVkcuUGFydHMxID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG48c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+XG5cdC5zdDB7ZmlsbDojRkZGRkZGO3N0cm9rZTojMjMxODE1O3N0cm9rZS13aWR0aDo1LjU7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwO31cblx0LnN0MXtmaWxsOm5vbmU7c3Ryb2tlOiMyMzE4MTU7c3Ryb2tlLXdpZHRoOjUuNTtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fVxuPC9zdHlsZT5cbjxjaXJjbGUgY2xhc3M9XCJzdDBcIiBjeD1cIi04LjRcIiBjeT1cIi05Ny44XCIgcj1cIjE5LjJcIi8+XG48L3N2Zz4nXG5cbkNvbmZpZy5Sb2NrZXQuU1ZHLlBhcnRzMiA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuXHQuc3Qwe2ZpbGw6I0ZGRkZGRjtzdHJva2U6IzIzMTgxNTtzdHJva2Utd2lkdGg6NC41O3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9XG5cdC5zdDF7ZmlsbDpub25lO3N0cm9rZTojMjMxODE1O3N0cm9rZS13aWR0aDo0LjU7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwO31cbjwvc3R5bGU+XG48bGluZSBjbGFzcz1cInN0MVwiIHgxPVwiLTIzLjZcIiB5MT1cIi0xMzYuNVwiIHgyPVwiNy43XCIgeTI9XCItMTM2LjVcIi8+XG48cGF0aCBjbGFzcz1cInN0MVwiIGQ9XCJNLTM0LjgtMzguOGMwLDAsMTEuNC00LDI2LjktNHMyNS45LDQsMjUuOSw0XCIvPlxuPC9zdmc+J1xuXG5Db25maWcuUm9ja2V0LlNWRy5QYXJ0czMgPSAnPHN2ZyBpZD1cIlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE0NVwiIGhlaWdodD1cIjYxXCIgdmlld0JveD1cIjAgMCAxNDUgNjFcIj5cbjxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj5cblx0LnN0MHtmaWxsOiNFMkVDRUQ7c3Ryb2tlOiMyMzE4MTU7c3Ryb2tlLXdpZHRoOjUuNTtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fVxuPC9zdHlsZT5cbjxwb2x5Z29uIGNsYXNzPVwic3QwXCIgcG9pbnRzPVwiMjEuOCwtNzEuMSAzNi43LC01Ni4yIDMzLjMsLTIxLjIgMTQsLTM5LjEgXCIvPlxuPHBvbHlnb24gY2xhc3M9XCJzdDBcIiBwb2ludHM9XCItMzcuNiwtNzEuMSAtNTIuNSwtNTYuMiAtNDksLTIxLjIgLTI5LjgsLTM5LjEgXCIvPlxuPC9zdmc+J1xuXG5Db25maWcuUm9ja2V0LlNWRy5Db3VudDEgPSAnPHN2ZyBpZD1cIlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE0NVwiIGhlaWdodD1cIjYxXCIgdmlld0JveD1cIjAgMCAxNDUgNjFcIj5cbjxwYXRoIGQ9XCJNLTEwLjMtMTAyLjFsLTMuMSwyLjdjLTAuMywwLjMtMC44LDAuMS0wLjgtMC40di0zLjJjMC0wLjEsMC4xLTAuMywwLjItMC40bDMuNi0zLjFjMC4xLTAuMSwwLjItMC4xLDAuMy0wLjFoMy42XG5cdFx0YzAuMywwLDAuNSwwLjIsMC41LDAuNXYxNy41YzAsMC4zLTAuMiwwLjUtMC41LDAuNWgtMy4zYy0wLjMsMC0wLjUtMC4yLTAuNS0wLjVWLTEwMi4xelwiLz5cbjwvc3ZnPidcblxuQ29uZmlnLlJvY2tldC5TVkcuQ291bnQyID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG48cGF0aCBkPVwiTS0xNC4xLTg4Ljd2LTMuMWMwLTAuMSwwLTAuMiwwLjEtMC4zbDYuNi03LjJjMC43LTAuNywwLjktMS4yLDAuOS0yYzAtMS0wLjYtMS43LTEuNy0xLjdjLTAuNywwLTEuNSwwLjMtMS43LDEuNFxuXHRjMCwwLjItMC4yLDAuNC0wLjUsMC40bC0zLjMsMGMtMC4zLDAtMC41LTAuMi0wLjUtMC41YzAuMy0zLjMsMi44LTUuMSw2LTUuMWMzLjQsMCw1LjksMi4xLDUuOSw1LjZjMCwxLjktMC44LDMtMi4zLDQuNUwtOC45LTkyXG5cdGg2LjJjMC4zLDAsMC41LDAuMiwwLjUsMC41djIuOGMwLDAuMy0wLjIsMC41LTAuNSwwLjVoLTEwLjlDLTEzLjktODguMi0xNC4xLTg4LjQtMTQuMS04OC43elwiLz5cbjwvc3ZnPidcblxuQ29uZmlnLlJvY2tldC5TVkcuQ291bnQzID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG48cGF0aCBkPVwiTS00LjMtOThjMC45LTAuNiwxLjktMS42LDEuOS0zLjZjMC0zLjItMi41LTUuNS01LjktNS41Yy0zLjEsMC01LjYsMS45LTUuOSw1LjFjMCwwLjMsMC4yLDAuNSwwLjUsMC41aDMuM1xuXHRjMC4yLDAsMC40LTAuMiwwLjUtMC40YzAuMi0wLjksMC45LTEuMywxLjctMS4zYzAuOSwwLDEuNywwLjYsMS43LDEuOGMwLDAuOC0wLjUsMS43LTEuOCwxLjdoLTAuMWMtMC4zLDAtMC41LDAuMi0wLjUsMC41djIuN1xuXHRjMCwwLjMsMC4yLDAuNSwwLjUsMC41aDAuMWMxLjIsMCwyLDAuOCwyLDEuOWMwLDEuNC0wLjgsMi0xLjksMmMtMSwwLTEuNy0wLjUtMS45LTEuNWMwLTAuMi0wLjMtMC40LTAuNS0wLjRoLTMuM1xuXHRjLTAuMywwLTAuNSwwLjItMC41LDAuNWMwLjIsMy44LDMuMSw1LjMsNi4xLDUuM2MzLjMsMCw2LjItMS44LDYuMS01LjhDLTIuMi05Ni4yLTMuMy05Ny4zLTQuMy05OHpcIi8+XG48L3N2Zz4nXG5cblxuQ29uZmlnLlJvY2tldC5TVkcuU21va2UxID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG48c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+XG5cdC5zdDB7ZmlsbDojRkZGRkZGO3N0cm9rZTojMjMxODE1O3N0cm9rZS13aWR0aDo1LjU7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwO31cbjwvc3R5bGU+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNMjMuMS0yMy42YzAsMy42LTEuNSw2LjgtMy44LDkuMnMtNS42LDMuOC05LjIsMy44UzMuMy0xMi4xLDEtMTQuNHMtMy44LTUuNi0zLjgtOS4yczEuNS02LjgsMy44LTkuMlxuXHRzNS42LTMuOCw5LjItMy44czYuOCwxLjUsOS4yLDMuOFMyMy4xLTI3LjIsMjMuMS0yMy42elwiLz5cbjxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0tMTUuNS0yMy42YzAsMy42LTEuNSw2LjgtMy44LDkuMnMtNS42LDMuOC05LjIsMy44cy02LjgtMS41LTkuMi0zLjhzLTMuOC01LjYtMy44LTkuMnMxLjUtNi44LDMuOC05LjJcblx0czUuNi0zLjgsOS4yLTMuOHM2LjgsMS41LDkuMiwzLjhTLTE1LjUtMjcuMi0xNS41LTIzLjZ6XCIvPlxuPC9zdmc+J1xuXG5Db25maWcuUm9ja2V0LlNWRy5TbW9rZTIgPSAnPHN2ZyBpZD1cIlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE0NVwiIGhlaWdodD1cIjYxXCIgdmlld0JveD1cIjAgMCAxNDUgNjFcIj5cbjxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj5cblx0LnN0MHtmaWxsOiNGRkZGRkY7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjUuNTtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fVxuPC9zdHlsZT5cbjxjaXJjbGUgY2xhc3M9XCJzdDBcIiBjeD1cIjI5LjFcIiBjeT1cIi0yOS4yXCIgcj1cIjExLjdcIi8+XG48Y2lyY2xlIGNsYXNzPVwic3QwXCIgY3g9XCIxM1wiIGN5PVwiLTIzLjdcIiByPVwiMTQuNFwiLz5cbjxjaXJjbGUgY2xhc3M9XCJzdDBcIiBjeD1cIi0yOS45XCIgY3k9XCItMjMuN1wiIHI9XCIxNC40XCIvPlxuPGNpcmNsZSBjbGFzcz1cInN0MFwiIGN4PVwiLTUxLjJcIiBjeT1cIi0yOVwiIHI9XCIxOS44XCIvPlxuPC9zdmc+J1xuXG5Db25maWcuUm9ja2V0LlNWRy5TbW9rZTMgPSAnPHN2ZyBpZD1cIlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE0NVwiIGhlaWdodD1cIjYxXCIgdmlld0JveD1cIjAgMCAxNDUgNjFcIj5cbjxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj5cblx0LnN0MHtmaWxsOiNGRkZGRkY7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjUuNTtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fVxuPC9zdHlsZT5cbjxjaXJjbGUgY2xhc3M9XCJzdDBcIiBjeD1cIjQ4LjlcIiBjeT1cIi0zNS41XCIgcj1cIjE5LjNcIi8+XG48Y2lyY2xlIGNsYXNzPVwic3QwXCIgY3g9XCIxNi4yXCIgY3k9XCItMjRcIiByPVwiMTZcIi8+XG48Y2lyY2xlIGNsYXNzPVwic3QwXCIgY3g9XCItMzEuNFwiIGN5PVwiLTI0XCIgcj1cIjE2XCIvPlxuPGNpcmNsZSBjbGFzcz1cInN0MFwiIGN4PVwiLTYwLjRcIiBjeT1cIi0yOS41XCIgcj1cIjI0LjVcIi8+XG48Y2lyY2xlIGNsYXNzPVwic3QwXCIgY3g9XCItMzguOVwiIGN5PVwiLTM3LjFcIiByPVwiMTQuOVwiLz5cbjxjaXJjbGUgY2xhc3M9XCJzdDBcIiBjeD1cIjI4LjNcIiBjeT1cIi0zOS44XCIgcj1cIjExLjlcIi8+XG48L3N2Zz4nXG5cbkNvbmZpZy5Sb2NrZXQuU1ZHLlNtb2tlNCA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuXHQuc3Qwe2ZpbGw6I0ZGRkZGRjtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6NS41O3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9XG48L3N0eWxlPlxuPGNpcmNsZSBjbGFzcz1cInN0MFwiIGN4PVwiNTQuN1wiIGN5PVwiLTM5LjRcIiByPVwiMjMuM1wiLz5cbjxjaXJjbGUgY2xhc3M9XCJzdDBcIiBjeD1cIjE4LjlcIiBjeT1cIi0yNS45XCIgcj1cIjE3LjZcIi8+XG48Y2lyY2xlIGNsYXNzPVwic3QwXCIgY3g9XCItMzMuNFwiIGN5PVwiLTI1LjlcIiByPVwiMTcuNlwiLz5cbjxjaXJjbGUgY2xhc3M9XCJzdDBcIiBjeD1cIi02NS4zXCIgY3k9XCItMzEuOVwiIHI9XCIyN1wiLz5cbjxjaXJjbGUgY2xhc3M9XCJzdDBcIiBjeD1cIi00MlwiIGN5PVwiLTQwLjNcIiByPVwiMTYuNVwiLz5cbjxjaXJjbGUgY2xhc3M9XCJzdDBcIiBjeD1cIi00N1wiIGN5PVwiLTUzLjNcIiByPVwiMTQuNFwiLz5cbjxjaXJjbGUgY2xhc3M9XCJzdDBcIiBjeD1cIjMyLjZcIiBjeT1cIi00My4zXCIgcj1cIjEzLjNcIi8+XG48Y2lyY2xlIGNsYXNzPVwic3QwXCIgY3g9XCI0NVwiIGN5PVwiLTI1LjdcIiByPVwiMTYuNFwiLz5cbjwvc3ZnPidcblxuQ29uZmlnLlJvY2tldC5TVkcuU21va2U1ID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG48c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+XG5cdC5zdDB7ZmlsbDojRkZGRkZGO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDo1LjU7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwO31cbjwvc3R5bGU+XG48Y2lyY2xlIGNsYXNzPVwic3QwXCIgY3g9XCI3MFwiIGN5PVwiLTQ3LjJcIiByPVwiMjZcIi8+XG48Y2lyY2xlIGNsYXNzPVwic3QwXCIgY3g9XCI4MS43XCIgY3k9XCItMzAuMVwiIHI9XCIxOC44XCIvPlxuPGNpcmNsZSBjbGFzcz1cInN0MFwiIGN4PVwiMjQuN1wiIGN5PVwiLTI3LjhcIiByPVwiMTkuNFwiLz5cbjxjaXJjbGUgY2xhc3M9XCJzdDBcIiBjeD1cIi00MS45XCIgY3k9XCItMjcuOFwiIHI9XCIxOS40XCIvPlxuPGNpcmNsZSBjbGFzcz1cInN0MFwiIGN4PVwiLTc3XCIgY3k9XCItMzQuNVwiIHI9XCIyOS42XCIvPlxuPGNpcmNsZSBjbGFzcz1cInN0MFwiIGN4PVwiLTUxLjRcIiBjeT1cIi00My43XCIgcj1cIjE4LjFcIi8+XG48Y2lyY2xlIGNsYXNzPVwic3QwXCIgY3g9XCItNjIuM1wiIGN5PVwiLTYwLjNcIiByPVwiMTcuOFwiLz5cbjxjaXJjbGUgY2xhc3M9XCJzdDBcIiBjeD1cIi04MC42XCIgY3k9XCItNjIuNlwiIHI9XCIxNlwiLz5cbjxjaXJjbGUgY2xhc3M9XCJzdDBcIiBjeD1cIjM5LjdcIiBjeT1cIi00N1wiIHI9XCIxNC42XCIvPlxuPGNpcmNsZSBjbGFzcz1cInN0MFwiIGN4PVwiNTIuOFwiIGN5PVwiLTI4LjFcIiByPVwiMTguM1wiLz5cbjwvc3ZnPidcblxuQ29uZmlnLlJvY2tldC5TVkcuU21va2U2ID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG48c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+XG5cdC5zdDB7ZmlsbDojRkZGRkZGO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDo1LjU7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwO31cbjwvc3R5bGU+XG48Y2lyY2xlIGNsYXNzPVwic3QwXCIgY3g9XCI0Ny41XCIgY3k9XCItNDguNlwiIHI9XCIxNy41XCIvPlxuPGNpcmNsZSBjbGFzcz1cInN0MFwiIGN4PVwiNzRcIiBjeT1cIi01OS44XCIgcj1cIjMxLjFcIi8+XG48Y2lyY2xlIGNsYXNzPVwic3QwXCIgY3g9XCIyNi4yXCIgY3k9XCItMjkuNFwiIHI9XCIyMy40XCIvPlxuPGNpcmNsZSBjbGFzcz1cInN0MFwiIGN4PVwiLTQzLjVcIiBjeT1cIi0yOS40XCIgcj1cIjIzLjRcIi8+XG48Y2lyY2xlIGNsYXNzPVwic3QwXCIgY3g9XCItNzIuNVwiIGN5PVwiLTM4LjRcIiByPVwiMjkuNlwiLz5cbjxjaXJjbGUgY2xhc3M9XCJzdDBcIiBjeD1cIi01NC45XCIgY3k9XCItNDguNlwiIHI9XCIyMlwiLz5cbjxjaXJjbGUgY2xhc3M9XCJzdDBcIiBjeD1cIi02OC4yXCIgY3k9XCItNjguNlwiIHI9XCIyMS42XCIvPlxuPGNpcmNsZSBjbGFzcz1cInN0MFwiIGN4PVwiLTkxLjFcIiBjeT1cIi03MS44XCIgcj1cIjE5LjZcIi8+XG48Y2lyY2xlIGNsYXNzPVwic3QwXCIgY3g9XCItOTkuNVwiIGN5PVwiLTM2LjJcIiByPVwiMzAuNlwiLz5cbjxjaXJjbGUgY2xhc3M9XCJzdDBcIiBjeD1cIjM5LjZcIiBjeT1cIi01MS43XCIgcj1cIjE2LjFcIi8+XG48Y2lyY2xlIGNsYXNzPVwic3QwXCIgY3g9XCI1OC43XCIgY3k9XCItMzAuMVwiIHI9XCIyMi4zXCIvPlxuPGNpcmNsZSBjbGFzcz1cInN0MFwiIGN4PVwiODlcIiBjeT1cIi0zOC42XCIgcj1cIjMwLjJcIi8+XG48L3N2Zz4nXG5cbiMjIyMjIyMjIyMjIyMjIyNcbiMg44Ko44Os44OZ44O844K/44O8XG4jIyMjIyMjIyMjIyMjIyMjXG5Db25maWcuRWxldmF0b3IgPSB7fVxuQ29uZmlnLkVsZXZhdG9yLlNPVU5EID0ge1xuXHRcIlNFX0dST1VQMFwiOiB7XG5cdFx0XCJTRTFcIjoge1xuXHRcdFx0XCJOT1JNQUxcIjogW1wiRWxldmF0b3JfMF8wXCJdXG5cdFx0XHRcIlNFQ1JFVFwiOiBbXG5cdFx0XHRcdFwiU19FbGV2YXRvcl8wXzBcIlxuXHRcdFx0XVxuXHRcdH1cblx0XHRcIlNFMlwiOiB7XG5cdFx0XHRcIk5PUk1BTFwiOiBbXCJFbGV2YXRvcl8xXzBcIl1cblx0XHRcdFwiU0VDUkVUXCI6IFtcblx0XHRcdFx0XCJTX0VsZXZhdG9yXzFfMFwiXG5cdFx0XHRdXG5cdFx0fVxuXHRcdFwiU0UzXCI6IHtcblx0XHRcdFwiTk9STUFMXCI6IFtcIkVsZXZhdG9yXzJfMFwiXVxuXHRcdFx0XCJTRUNSRVRcIjogW1xuXHRcdFx0XHRcIlNfRWxldmF0b3JfMl8wXCJcblx0XHRcdF1cblx0XHR9XG5cdH1cblx0XCJTRV9HUk9VUDFcIjoge1xuXHRcdFwiU0UxXCI6IHtcblx0XHRcdFwiTk9STUFMXCI6IFtcIkVsZXZhdG9yXzBfMVwiXVxuXHRcdFx0XCJTRUNSRVRcIjogW1xuXHRcdFx0XHRcIlNfRWxldmF0b3JfMF8xXCJcblx0XHRcdF1cblx0XHR9XG5cdFx0XCJTRTJcIjoge1xuXHRcdFx0XCJOT1JNQUxcIjogW1wiRWxldmF0b3JfMV8xXCJdXG5cdFx0XHRcIlNFQ1JFVFwiOiBbXG5cdFx0XHRcdFwiU19FbGV2YXRvcl8xXzFcIlxuXHRcdFx0XVxuXHRcdH1cblx0XHRcIlNFM1wiOiB7XG5cdFx0XHRcIk5PUk1BTFwiOiBbXCJFbGV2YXRvcl8yXzFcIl1cblx0XHRcdFwiU0VDUkVUXCI6IFtcblx0XHRcdFx0XCJTX0VsZXZhdG9yXzJfMVwiXG5cdFx0XHRdXG5cdFx0fVxuXHR9XG5cdFwiU0VfR1JPVVAyXCI6IHtcblx0XHRcIlNFMVwiOiB7XG5cdFx0XHRcIk5PUk1BTFwiOiBbXCJFbGV2YXRvcl8wXzJcIl1cblx0XHRcdFwiU0VDUkVUXCI6IFtcblx0XHRcdFx0XCJTX0VsZXZhdG9yXzBfMlwiXG5cdFx0XHRcdFwiU19FbGV2YXRvcl8wXzNcIlxuXHRcdFx0XVxuXHRcdH1cblx0XHRcIlNFMlwiOiB7XG5cdFx0XHRcIk5PUk1BTFwiOiBbXCJFbGV2YXRvcl8xXzJcIl1cblx0XHRcdFwiU0VDUkVUXCI6IFtcblx0XHRcdFx0XCJTX0VsZXZhdG9yXzFfMlwiXG5cdFx0XHRcdFwiU19FbGV2YXRvcl8xXzNcIlxuXHRcdFx0XVxuXHRcdH1cblx0XHRcIlNFM1wiOiB7XG5cdFx0XHRcIk5PUk1BTFwiOiBbXCJFbGV2YXRvcl8yXzFcIl1cblx0XHRcdFwiU0VDUkVUXCI6IFtcblx0XHRcdFx0XCJTX0VsZXZhdG9yXzJfMlwiXG5cdFx0XHRcdFwiU19FbGV2YXRvcl8yXzNcIlxuXHRcdFx0XVxuXHRcdH1cblx0fVxufVxuQ29uZmlnLkVsZXZhdG9yLlNWRyA9IHt9XG5cbiMgT3BlblxuQ29uZmlnLkVsZXZhdG9yLlNWRy5PcGVuID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG48cGF0aCBmaWxsPVwiI0ZERjY2M1wiIHN0cm9rZT1cIiMyMzE4MTVcIiBzdHJva2Utd2lkdGg9XCI1LjVcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEwXCIgZD1cIk01Mi4yLTEyNi43djI1N0gxNDd2LTI1N0g1Mi4yeiBNMTE4LjUsMjUuOVxuXHRINzkuN2MtNC40LDAtOC0zLjYtOC04di0xMDhjMC00LjQsMy42LTgsOC04aDM4LjhjNC40LDAsOCwzLjYsOCw4djEwOEMxMjYuNSwyMi4zLDEyMywyNS45LDExOC41LDI1Ljl6XCIvPlxuPHBhdGggZmlsbD1cIiNGREY2NjNcIiBzdHJva2U9XCIjMjMxODE1XCIgc3Ryb2tlLXdpZHRoPVwiNS41XCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxMFwiIGQ9XCJNLTE2My41LTEyNi43djI1N2g5NC44di0yNTdILTE2My41elxuXHQgTS05Ni4yLDI1LjloLTM4LjljLTQuNCwwLTgtMy42LTgtOHYtMTA4YzAtNC40LDMuNi04LDgtOGgzOC44YzQuNCwwLDgsMy42LDgsOHYxMDhDLTg4LjIsMjIuMy05MS44LDI1LjktOTYuMiwyNS45elwiLz5cbjwvc3ZnPidcblxuIyMjIyMjIyMjIyMjIyMjI1xuIyDokL3jgaHjgotcbiMjIyMjIyMjIyMjIyMjIyNcbkNvbmZpZy5GYWxsID0ge31cbkNvbmZpZy5GYWxsLlNPVU5EID0ge1xuXHRcIlNFMVwiOiB7XG5cdFx0XCJOT1JNQUxcIjogW1xuXHRcdFx0XCJGYWxsXzBcIlxuXHRcdFx0XCJGYWxsXzFcIlxuXHRcdFx0XCJGYWxsXzJcIlxuXHRcdF1cblx0XHRcIlNFQ1JFVFwiOiBbXG5cdFx0XHRcIlNfRmFsbF8wXCJcblx0XHRcdFwiU19GYWxsXzFcIlxuXHRcdFx0XCJTX0ZhbGxfMlwiXG5cdFx0XHRcIlNfRmFsbF8zXCJcblx0XHRcdFwiU19GYWxsXzRcIlxuXHRcdF1cblx0fVxufVxuXG5cbiMjIyMjIyMjIyMjIyMjIyNcbiMg6aKo6Ii55Ymy44KM44KLXG4jIyMjIyMjIyMjIyMjIyMjXG5Db25maWcuQmFsbG9vbkZhaWx1cmUgPSB7fVxuQ29uZmlnLkJhbGxvb25GYWlsdXJlLlNPVU5EID0ge1xuXHRcIlNFMVwiOiB7XG5cdFx0XCJOT1JNQUxcIjogW1xuXHRcdFx0XCJCYWxvb25GYWlsZWRfMFwiXG5cdFx0XHRcIkJhbG9vbkZhaWxlZF8xXCJcblx0XHRcdFwiQmFsb29uRmFpbGVkXzJcIlxuXHRcdF1cblx0XHRcIlNFQ1JFVFwiOiBbXG5cdFx0XHRcIlNfQmFsb29uRmFpbGVkXzBcIlxuXHRcdFx0XCJTX0JhbG9vbkZhaWxlZF8xXCJcblx0XHRcdFwiU19CYWxvb25GYWlsZWRfMlwiXG5cdFx0XHRcIlNfQmFsb29uRmFpbGVkXzNcIlxuXHRcdFx0XCJTX0JhbG9vbkZhaWxlZF80XCJcblx0XHRdXG5cdH1cbn1cbkNvbmZpZy5CYWxsb29uRmFpbHVyZS5TVkcgPSB7fVxuQ29uZmlnLkJhbGxvb25GYWlsdXJlLlNWRy5JbmZsYXRlID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTYxLjMtMTYuMmMtNTgtMjEuNC05OS40LTc3LjMtOTkuNC0xNDIuOGMwLTI4LjUsNy44LTU1LjEsMjEuNS03Ny45Qy0xMTIuNy0yODEuMy02NC4xLTMxMS04LjYtMzExXG5cdGM1NS41LDAsMTA0LjEsMjkuOCwxMzAuNyw3NC4yYzEzLjYsMjIuOCwyMS41LDQ5LjQsMjEuNSw3Ny45YzAsNjUuNS00MS40LDEyMS4zLTk5LjQsMTQyLjdcIi8+XG48L3N2Zz4nXG5cbkNvbmZpZy5CYWxsb29uRmFpbHVyZS5TVkcuQmFuZyA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuXHQ8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+XG5cdFx0LnN0MHtmaWxsOiNGREY2NjM7c3Ryb2tlOiMyMzE4MTU7c3Ryb2tlLXdpZHRoOjUuNTtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fVxuXHQ8L3N0eWxlPlxuXHQ8cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTI4LjgtMTM4LjVjMCwwLDIxLDM3LjcsNjMuNSwxNGMwLDAtMjUsMzcuMiwxOS41LDU3LjhjMCwwLTQ0LjgsOC00NSw0My41YzAsMC0yMS41LTMxLjUtNjAuMy05LjVjMCwwLDE4LjMtNDEuNS0yMC43LTU2LjVDLTcxLjgtODkuMi0yMC43LTg2LjctMjguOC0xMzguNXpcIi8+XG48L3N2Zz4nXG5cbiMjIyMjIyMjIyMjIyMjIyNcbiMg6aKo6Ii56aOb44KT44Gn6KGM44GPXG4jIyMjIyMjIyMjIyMjIyMjXG5Db25maWcuQmFsbG9vbkF3YXkgPSB7fVxuQ29uZmlnLkJhbGxvb25Bd2F5LlNPVU5EID0ge1xuXHRcIlNFMVwiOiB7XG5cdFx0XCJOT1JNQUxcIjogW1xuXHRcdFx0XCJCYWxvb25TdWNjZXNzXzBfMFwiXG5cdFx0XHRcIkJhbG9vblN1Y2Nlc3NfMF8xXCJcblx0XHRcdFwiQmFsb29uU3VjY2Vzc18wXzJcIlxuXHRcdF1cblx0XHRcIlNFQ1JFVFwiOiBbXG5cdFx0XHRcIlNfQmFsb29uU3VjY2Vzc18wXzBcIlxuXHRcdFx0XCJTX0JhbG9vblN1Y2Nlc3NfMF8xXCJcblx0XHRdXG5cblx0fVxuXHRcIlNFMlwiOiB7XG5cdFx0XCJOT1JNQUxcIjogW1xuXHRcdFx0XCJCYWxvb25TdWNjZXNzXzFfMFwiXG5cdFx0XHRcIkJhbG9vblN1Y2Nlc3NfMV8xXCJcblx0XHRcdFwiQmFsb29uU3VjY2Vzc18xXzJcIlxuXHRcdF1cblx0XHRcIlNFQ1JFVFwiOiBbXG5cdFx0XHRcIlNfQmFsb29uU3VjY2Vzc18xXzBcIlxuXHRcdFx0XCJTX0JhbG9vblN1Y2Nlc3NfMV8xXCJcblx0XHRcdFwiU19CYWxvb25TdWNjZXNzXzFfMlwiXG5cdFx0XHRcIlNfQmFsb29uU3VjY2Vzc18xXzNcIlxuXHRcdF1cblx0fVxufVxuXG5Db25maWcuQmFsbG9vbkF3YXkuU1ZHID0ge31cblxuQ29uZmlnLkJhbGxvb25Bd2F5LlNWRy5JbmZsYXRlID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTcuNCwzLjVDLTI3LjgsMy41LTQ1LjQtNy01NS0yMS44Qy02My4zLTM0LjYtNjcuNC00NS4yLTY3LjQtNjZjMC0zMi44LDI2LjYtNjEuOSw1OS40LTYxLjlcblx0UzUxLjQtOTguOCw1MS40LTY2YzAsMTQuMy01LDMxLjItMTIuOSw0My41QzI4LjItNi42LDEzLjQsMy41LTkuOSwzLjVcIi8+XG48L3N2Zz4nXG5cblxuQ29uZmlnLkJhbGxvb25Bd2F5LlNWRy5IYW5kbGUxID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTQuNiwxNC4xYzEuMyw2LjIsMi4zLDEyLjUsMi4xLDE4LjljLTAuMiw2LjctMi4zLDEzLjItMy44LDE5LjdjLTEuNiw2LjUtMi42LDE4LjgsMS4xLDI2LjVcIi8+XG48cGF0aCBjbGFzcz1cInN0MVwiIGQ9XCJNMS4zLDMuNWMwLDAsMTEsOC44LDUuMSw4LjhTMS4xLDE0LjgtNCwxNC44cy03LTIuMS0xMS44LTEuNWMtNCwwLjUsNC42LTkuNyw0LjYtOS43XCIvPlxuPC9zdmc+J1xuXG5cbkNvbmZpZy5CYWxsb29uQXdheS5TVkcuSGFuZGxlMiA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuPHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTS00LjYsMTQuMWMtMS41LDcuNi0yLjMsMTIuNC0yLDE5LjJjMC4zLDYuNywyLjcsMTIuNywzLjcsMTkuM2MyLDEyLjgtMC4yLDIxLjgtMi40LDI2LjVcIi8+XG48cGF0aCBjbGFzcz1cInN0MVwiIGQ9XCJNMS4zLDMuNWMwLDAsMTEsOC44LDUuMSw4LjhTMS4xLDE0LjgtNCwxNC44cy03LTIuMS0xMS44LTEuNWMtNCwwLjUsNC42LTkuNyw0LjYtOS43XCIvPlxuPC9zdmc+J1xuXG5Db25maWcuQmFsbG9vbkF3YXkuU1ZHLkhhbmRsZTMgPSAnPHN2ZyBpZD1cIlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE0NVwiIGhlaWdodD1cIjYxXCIgdmlld0JveD1cIjAgMCAxNDUgNjFcIj5cbjxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0tNC42LDE0LjFjMS4zLDYuMiwyLjMsMTIuNSwyLjEsMTguOWMtMC4yLDYuNy0yLjMsMTMuMi0zLjgsMTkuN2MtMS42LDYuNS0yLjYsMTguOCwxLjEsMjYuNVwiLz5cbjxwYXRoIGNsYXNzPVwic3QxXCIgZD1cIk0xLjQsMy41YzAsMCwxMSw4LjgsNS4xLDguOHMtNS4zLDIuNS0xMC40LDIuNXMtNy0yLjEtMTEuOC0xLjVjLTQsMC41LDQuNi05LjcsNC42LTkuN1wiLz5cbjwvc3ZnPidcblxuQ29uZmlnLkJhbGxvb25Bd2F5LlNWRy5IYW5kbGU0ID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTQuNiwxNC4xYy0xLjUsNy42LTIuMywxMi40LTIsMTkuMmMwLjMsNi43LDIuNywxMi43LDMuNywxOS4zYzIsMTIuOC0wLjIsMjEuOC0yLjQsMjYuNVwiLz5cbjxwYXRoIGNsYXNzPVwic3QxXCIgZD1cIk0xLjQsMy42YzAsMCwxMSw4LjgsNS4xLDguOFMxLjIsMTQuOC00LDE0LjhzLTctMi4xLTExLjgtMS41Yy00LDAuNSw0LjYtOS43LDQuNi05LjdcIi8+XG48L3N2Zz4nXG5cbiMjIyMjIyMjIyMjIyMjIyNcbiMg44GG44KT44GhXG4jIyMjIyMjIyMjIyMjIyMjXG5Db25maWcuUG9vID0ge31cbkNvbmZpZy5Qb28uU09VTkQgPSB7XG5cdFwiU0UxXCI6IHtcblx0XHRcIk5PUk1BTFwiOltcblx0XHRcdFwiUG9vXzBcIlxuXHRcdFx0XCJQb29fMVwiXG5cdFx0XHRcIlBvb18yXCJcblx0XHRcdFwiUG9vXzNcIlxuXHRcdF1cblx0XHRcIlNFQ1JFVFwiOltcblx0XHRcdFwiU19Qb29fMFwiXG5cdFx0XHRcIlNfUG9vXzFcIlxuXHRcdFx0XCJTX1Bvb18yXCJcblx0XHRcdFwiU19Qb29fM1wiXG5cdFx0XHRcIlNfUG9vXzRcIlxuXHRcdFx0XCJTX1Bvb181XCJcblx0XHRcdFwiU19Qb29fNlwiXG5cdFx0XHRcIlNfUG9vXzdcIlxuXHRcdF1cblx0fVxufVxuXG5Db25maWcuUG9vLlNWRyA9IHt9XG5cbkNvbmZpZy5Qb28uU1ZHLlBvbzEgPSAnPHN2ZyBpZD1cIlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE0NVwiIGhlaWdodD1cIjYxXCIgdmlld0JveD1cIjAgMCAxNDUgNjFcIj5cbjxwYXRoIGNsYXNzPVwic3QwXCIgZD1cIk0tMjkuNS0xOS4yYzAsMC0xNS42LDYuNy0xNS43LDE4LjJjLTAuMSwxMS43LDEyLjgsMTUuMiwzNiwxNS40YzI0LDAuMiw0MS4xLTQuOCw0MS4xLTE1Ljhcblx0UzE4LjctMTkuOSwxOC43LTE5LjlcIi8+XG48cGF0aCBjbGFzcz1cInN0MVwiIGQ9XCJNLTQuMi05YzE4LTAuMSwyOS41LTMuOSwzMC4yLTEzLjZzLTkuOC0xMi41LTEwLTE2LjVjLTAuMi0zLjQsNC4xLTMuOCwyLjMtMTAuMmMtMS41LTUuNC04LjQtNC44LTUuNS0xNS40XG5cdGMwLDAtOC41LDMuNS0xNi4xLDVjLTEyLjQsMi4zLTIwLjcsNy4zLTIxLDEzLjhjLTAuMiw0LjMsMy4yLDUuMywwLjEsOC44Qy0yOC0zMy0zNi44LTMxLjYtMzYuOS0yMC43Yy0wLjEsNy41LDcuMSw5LjIsNy4xLDkuMlwiLz5cbjxwYXRoIGNsYXNzPVwic3QyXCIgZD1cIk0xNy40LTQyLjRjLTAuNiwxLjMtNS4zLDYuMy0xMy4xLDguMlwiLz5cbjwvc3ZnPidcblxuQ29uZmlnLlBvby5TVkcuUG9vMiA9ICc8c3ZnIGlkPVwiXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTQ1XCIgaGVpZ2h0PVwiNjFcIiB2aWV3Qm94PVwiMCAwIDE0NSA2MVwiPlxuPHBhdGggY2xhc3M9XCJzdDBcIiBkPVwiTS0yOS42LTExLjdjMCwwLTE1LjYsNS4xLTE1LjcsMTMuOWMtMC4xLDguOSwxMi44LDExLjYsMzYsMTEuN2MyNCwwLjEsNDEuMS0zLjcsNDEuMS0xMi4xUzE4LjctMTIuMiwxOC43LTEyLjJcblx0XCIvPlxuPHBhdGggY2xhc3M9XCJzdDFcIiBkPVwiTS00LjItMy45YzE4LTAuMSwyOS41LTMsMzAuMi0xMC4zcy05LjgtOS41LTEwLTEyLjVjLTAuMi0yLjYsNC4xLTIuOSwyLjMtNy44Yy0xLjUtNC4xLTguNC0zLjYtNS41LTExLjdcblx0YzAsMC04LjUsMi43LTE2LjEsMy44Yy0xMi40LDEuOC0yMC43LDUuNS0yMSwxMC41Yy0wLjIsMy4zLDMuMiw0LjEsMC4xLDYuN2MtMy44LDMuMi0xMi42LDQuMy0xMi44LDEyLjZjLTAuMSw1LjcsNy4xLDcsNy4xLDdcIi8+XG48cGF0aCBjbGFzcz1cInN0MlwiIGQ9XCJNMTcuNC0yOS40Yy0wLjYsMS01LjMsNC44LTEzLjEsNi4zXCIvPlxuPC9zdmc+J1xuXG5Db25maWcuUG9vLlNWRy5Qb28zID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTI4LjktMjIuOWMwLDAtMTUuNiw3LjMtMTUuNywyMEMtNDQuNywxMC0zMS44LDEzLjktOC42LDE0YzI0LDAuMiw0MS4xLTUuMyw0MS4xLTE3LjRTMTkuNC0yMy43LDE5LjQtMjMuN1wiLz5cbjxwYXRoIGNsYXNzPVwic3QxXCIgZD1cIk0tMy41LTExLjdjMTgtMC4xLDI5LjUtNC4zLDMwLjItMTQuOXMtOS44LTEzLjctMTAtMTguMWMtMC4yLTMuNyw0LjEtNC4yLDIuMy0xMS4zYy0xLjUtNS45LTExLjEtOS40LTE1LjgtMjBcblx0YzAsMC0zLjgsOC40LTExLjUsMTBjLTEyLjQsMi42LTE1LDYuNS0xNS4zLDEzLjdjLTAuMiw0LjcsMy4yLDUuOSwwLjEsOS42Yy0zLjgsNC42LTEyLjYsNi4yLTEyLjgsMTguMmMtMC4xLDguMiw3LjEsMTAuMSw3LjEsMTAuMVxuXHRcIi8+XG48cGF0aCBjbGFzcz1cInN0MlwiIGQ9XCJNMTguMS00OC40Yy0wLjYsMS40LTUuMyw3LTEzLjEsOS4xXCIvPlxuPC9zdmc+J1xuXG5Db25maWcuUG9vLlNWRy5Qb280ID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTI4LjYtMTkuNmMwLDAtMTUuNiw2LjctMTUuNywxOC4yYy0wLjEsMTEuNywxMi44LDE1LjIsMzYsMTUuNGMyNCwwLjIsNDEuMS00LjgsNDEuMS0xNS44XG5cdFMxOS43LTIwLjMsMTkuNy0yMC4zXCIvPlxuPHBhdGggY2xhc3M9XCJzdDFcIiBkPVwiTS0zLjItOS40QzE0LjgtOS41LDI2LjMtMTMuMywyNy0yM3MtOS44LTEyLjUtMTAtMTYuNWMtMC4yLTMuNCw0LjEtMy44LDIuMy0xMC4yYy0xLjUtNS40LTguNC00LjgtNS41LTE1LjRcblx0YzAsMC04LjUsMy41LTE2LjEsNWMtMTIuNCwyLjMtMjAuNyw3LjMtMjEsMTMuOGMtMC4yLDQuMywzLjIsNS4zLDAuMSw4LjhDLTI3LTMzLjUtMzUuOC0zMi0zNS45LTIxLjFjLTAuMSw3LjUsNy4xLDkuMiw3LjEsOS4yXCIvPlxuPHBhdGggY2xhc3M9XCJzdDJcIiBkPVwiTTE4LjQtNDIuOGMtMC42LDEuMy01LjMsNi4zLTEzLjEsOC4yXCIvPlxuPC9zdmc+J1xuXG5Db25maWcuUG9vLlNWRy5Qb281ID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCIwIDAgMTQ1IDYxXCI+XG48cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNLTI4LjYtMTkuN2MwLDAtMTUuNiw2LjctMTUuNywxOC4yYy0wLjEsMTEuNywxMi44LDE1LjIsMzYsMTUuNGMyNCwwLjIsNDEuMS00LjgsNDEuMS0xNS44XG5cdFMxOS43LTIwLjQsMTkuNy0yMC40XCIvPlxuPHBhdGggY2xhc3M9XCJzdDFcIiBkPVwiTS0zLjItOS41YzE4LTAuMSwyOS41LTMuOSwzMC4yLTEzLjZzLTkuOC0xMi41LTEwLTE2LjVjLTAuMi0zLjQsMy42LTMuOCwxLjgtMTAuMmMtMS41LTUuNC02LjktNC40LTcuNS0xNS40XG5cdGMwLDAtOCwzLjUtMTUuNiw1Yy0xMi40LDIuMy0xOS4yLDcuMy0xOS41LDEzLjhjLTAuMiw0LjMsMy4yLDUuMywwLjEsOC44Yy0zLjgsNC4yLTEyLjEsNS42LTEyLjMsMTYuNmMtMC4xLDcuNSw3LjEsOS4yLDcuMSw5LjJcIi8+XG48cGF0aCBjbGFzcz1cInN0MlwiIGQ9XCJNMTguNC00Mi45Yy0wLjYsMS4zLTUuMyw2LjMtMTMuMSw4LjJcIi8+XG48L3N2Zz4nXG5cblxuIyMjIyMjIyMjIyMjIyMjI1xuIyDjg63jg7zjg4fjgqPjg7PjgrBcbiMjIyMjIyMjIyMjIyMjIyNcbkNvbmZpZy5Mb2FkaW5nID0ge31cbkNvbmZpZy5Mb2FkaW5nLkNPTE9SID0gXG5cdFwiQkdcIlx0XHQ6IFwiI0ZGRkZGRlwiXG5cdFwiRU5URVJcIlx0OiBcIiNGREY2NjNcIlxuXHRcIkxFQVZFXCJcdDogXCIjRkZGRkZGXCJcblxuQ29uZmlnLkxvYWRpbmcuU1ZHID0ge31cblxuQ29uZmlnLkxvYWRpbmcuU1ZHLlRleHQgPSAnPHN2ZyBpZD1cIlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjEwMHB4XCIgaGVpZ2h0PVwiMTAwcHhcIiB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIj5cbjxnPlxuXHQ8cGF0aCBkPVwiTS00NS44LTI3Mi4ydi0wLjFjMC0xMy41LDEwLjctMjQuNiwyNS40LTI0LjZTNC44LTI4Niw0LjgtMjcyLjV2MC4xYzAsMTMuNS0xMC43LDI0LjYtMjUuNCwyNC42Uy00NS44LTI1OC43LTQ1LjgtMjcyLjJ6XG5cdFx0IE0tNS43LTI3Mi4ydi0wLjFjMC04LjQtNi4yLTE1LjQtMTQuOS0xNS40cy0xNC43LDYuOS0xNC43LDE1LjN2MC4xYzAsOC40LDYuMiwxNS40LDE0LjksMTUuNEMtMTEuNy0yNTYuOS01LjctMjYzLjgtNS43LTI3Mi4yelwiXG5cdFx0Lz5cblx0PHBhdGggZD1cIk0yMi43LTI5Ni4xaDcuNGMwLjUsMCwwLjksMC4yLDEuMiwwLjZsMjEuOSwyOC43di0yNy44YzAtMC44LDAuNy0xLjUsMS41LTEuNUg2MmMwLjgsMCwxLjUsMC43LDEuNSwxLjV2NDQuNlxuXHRcdGMwLDAuOC0wLjcsMS41LTEuNSwxLjVoLTYuN2MtMC41LDAtMC45LTAuMi0xLjItMC42bC0yMi42LTI5Ljd2MjguOGMwLDAuOC0wLjcsMS41LTEuNSwxLjVoLTcuM2MtMC44LDAtMS41LTAuNy0xLjUtMS41di00NC42XG5cdFx0QzIxLjItMjk1LjUsMjEuOS0yOTYuMSwyMi43LTI5Ni4xelwiLz5cblx0PHBhdGggZD1cIk0tMjQzLjUtMjk0LjZjMC0wLjgsMC43LTEuNSwxLjUtMS41aDE2LjJjNS4zLDAsOS43LDEuNCwxMi40LDQuMWMyLjEsMi4yLDMuMiw0LjgsMy4yLDguMXYwLjJjMCw1LjYtMy4xLDguNi02LjUsMTAuNFxuXHRcdGM1LjEsMiw4LjUsNS4xLDguNSwxMS40djAuM2MwLDguNi02LjksMTMuMS0xNy4yLDEzLjFILTI0MmMtMC44LDAtMS41LTAuNy0xLjUtMS41Vi0yOTQuNnogTS0yMTkuOS0yODIuMWMwLTMuNS0yLjQtNS4zLTYuNy01LjNcblx0XHRoLTcuM3YxMC43aDYuOUMtMjIyLjctMjc2LjctMjE5LjktMjc4LjUtMjE5LjktMjgyLjFMLTIxOS45LTI4Mi4xeiBNLTIyNS4zLTI2OC40aC04LjZ2MTEuMmg4LjhjNC40LDAsNy4yLTEuOSw3LjItNS42di0wLjFcblx0XHRDLTIxNy45LTI2Ni4zLTIyMC40LTI2OC40LTIyNS4zLTI2OC40elwiLz5cblx0PHBhdGggZD1cIk0tMTkyLjQtMjY3di0yNy42YzAtMC44LDAuNy0xLjUsMS41LTEuNWg2LjljMC44LDAsMS41LDAuNywxLjUsMS41djI3LjdjMCw2LjcsMy4yLDEwLjEsOC4zLDEwLjFzOC4zLTMuMyw4LjMtOS45di0yNy45XG5cdFx0YzAtMC44LDAuNy0xLjUsMS41LTEuNWg2LjhjMC44LDAsMS41LDAuNywxLjUsMS41djI3LjRjMCwxMy4xLTcuMiwxOS40LTE4LjIsMTkuNEMtMTg1LjMtMjQ3LjgtMTkyLjQtMjU0LjItMTkyLjQtMjY3elwiLz5cblx0PHBhdGggZD1cIk0tMTI3LjktMjg3aC0xMC41Yy0wLjgsMC0xLjUtMC43LTEuNS0xLjV2LTYuMWMwLTAuOCwwLjctMS41LDEuNS0xLjVoMzAuN2MwLjgsMCwxLjUsMC43LDEuNSwxLjV2Ni4xXG5cdFx0YzAsMC44LTAuNywxLjUtMS41LDEuNWgtMTAuNXYzN2MwLDAuOC0wLjcsMS41LTEuNSwxLjVoLTYuOGMtMC44LDAtMS41LTAuNy0xLjUtMS41Vi0yODd6XCIvPlxuXHQ8cGF0aCBkPVwiTS04MC4yLTI4N2gtMTAuNWMtMC44LDAtMS41LTAuNy0xLjUtMS41di02LjFjMC0wLjgsMC43LTEuNSwxLjUtMS41aDMwLjdjMC44LDAsMS41LDAuNywxLjUsMS41djYuMVxuXHRcdGMwLDAuOC0wLjcsMS41LTEuNSwxLjVoLTEwLjV2MzdjMCwwLjgtMC43LDEuNS0xLjUsMS41aC02LjhjLTAuOCwwLTEuNS0wLjctMS41LTEuNVYtMjg3elwiLz5cblx0PHBhdGggZD1cIk0xMDkuOC0yOTYuMWg2LjljMC44LDAsMS41LDAuNywxLjUsMS41djQ0LjZjMCwwLjgtMC43LDEuNS0xLjUsMS41aC02LjljLTAuOCwwLTEuNS0wLjctMS41LTEuNXYtNDQuNlxuXHRcdEMxMDguMy0yOTUuNSwxMDktMjk2LjEsMTA5LjgtMjk2LjF6XCIvPlxuXHQ8cGF0aCBkPVwiTTE5NC4zLTI3MS40di0wLjZjMC0xNC40LDktMjQuMiwyMS42LTI0LjJjNi41LDAsMTAuOCwyLjIsMTQuMyw1LjRjMC42LDAuNSwwLjYsMS40LDAuMSwybC00LjEsNS4yXG5cdFx0Yy0wLjUsMC43LTEuNSwwLjgtMi4yLDAuMmMtMi41LTIuMy01LjItMy43LTguNi0zLjdjLTYuNCwwLTExLjEsNS45LTExLjEsMTUuMnYwLjJjMCw5LjUsNC45LDE1LjIsMTEuMiwxNS4yXG5cdFx0YzMuNCwwLDUuOS0xLjQsOC43LTMuOWMwLjYtMC42LDEuNi0wLjUsMi4xLDAuMmw0LDQuN2MwLjUsMC42LDAuNSwxLjUtMC4xLDJjLTQsMy44LTguNCw2LjItMTUuMSw2LjJcblx0XHRDMjAyLjgtMjQ3LjIsMTk0LjMtMjU2LjgsMTk0LjMtMjcxLjR6XCIvPlxuXHQ8cGF0aCBkPVwiTTI0NC41LTI1OC40aDcuNWMwLjgsMCwxLjUsMC43LDEuNSwxLjV2Ny41YzAsMC44LTAuNywxLjUtMS41LDEuNWgtNy41Yy0wLjgsMC0xLjUtMC43LTEuNS0xLjV2LTcuNVxuXHRcdEMyNDMtMjU3LjcsMjQzLjYtMjU4LjQsMjQ0LjUtMjU4LjR6XCIvPlxuXHQ8cGF0aCBkPVwiTTEzOC4zLTI5Ni4xaDcuNGMwLjUsMCwwLjksMC4yLDEuMiwwLjZsMjEuOSwyOC43di0yNy44YzAtMC44LDAuNy0xLjUsMS41LTEuNWg3LjNjMC44LDAsMS41LDAuNywxLjUsMS41djQ0LjZcblx0XHRjMCwwLjgtMC43LDEuNS0xLjUsMS41aC02LjdjLTAuNSwwLTAuOS0wLjItMS4yLTAuNmwtMjIuNi0yOS43djI4LjhjMCwwLjgtMC43LDEuNS0xLjUsMS41aC03LjNjLTAuOCwwLTEuNS0wLjctMS41LTEuNXYtNDQuNlxuXHRcdEMxMzYuOC0yOTUuNSwxMzcuNS0yOTYuMSwxMzguMy0yOTYuMXpcIi8+XG5cdDxwYXRoIGQ9XCJNLTYwLjktMTcxLjdjMC0wLjcsMC0xLjItMC4xLTEuOGgxLjJjMS42LTAuOSwyLjItMS40LDMuOS0zSC02NWMtMS4yLDAtMiwwLTIuOCwwLjF2LTIuN2MwLjgsMC4xLDEuNiwwLjEsMi44LDAuMWgxMC40XG5cdFx0YzEuMiwwLDEuNSwwLDItMC4xbDEuNSwxLjdjLTAuNiwwLjYtMC42LDAuNi0yLjIsMi4xYy0xLjEsMS4xLTIuOSwyLjQtNC45LDMuNnYxaDUuNmMxLjUsMCwyLjQsMCwzLjEtMC4xdjIuOFxuXHRcdGMtMC45LTAuMS0xLjctMC4xLTMuMS0wLjFoLTUuNnY2LjdjMCwyLTAuOCwyLjUtMy45LDIuNWMtMC41LDAtMC44LDAtMi42LTAuMWMtMC4yLTEuMy0wLjMtMS44LTAuNy0yLjhjMS40LDAuMiwyLjIsMC4zLDMuNCwwLjNcblx0XHRjMC45LDAsMS4xLTAuMSwxLjEtMC42di02LjFoLTYuMmMtMS40LDAtMi4yLDAtMy4xLDAuMXYtMi44YzAuOCwwLjEsMS43LDAuMSwzLjIsMC4xaDYuMVYtMTcxLjd6XCIvPlxuXHQ8cGF0aCBkPVwiTS0zMS45LTE3MS43Yy0wLjMtMS4xLTAuNC0xLjctMC43LTQuN2MtMC4xLTEuMi0wLjItMS43LTAuNC0yLjVjMS41LDAsMi40LDAuMSwzLDAuM2MwLjQsMC4xLDAuNSwwLjMsMC41LDAuNVxuXHRcdGMwLDAuMSwwLDAuMi0wLjEsMC40Yy0wLjIsMC42LTAuMiwxLTAuMiwxLjZjMCwxLjIsMC4yLDMuMSwwLjUsMy45YzAuMSwwLjUsMC4zLDAuNiwwLjYsMC42YzAuNiwwLDIuNy0xLjEsMy44LTJcblx0XHRjMC4zLTAuMiwwLjQtMC4zLDAuNS0wLjNjMC4yLDAsMC40LDAuMiwwLjgsMC42YzAuNiwwLjgsMS4xLDEuNywxLjEsMmMwLDAuMy0wLjIsMC40LTAuNiwwLjZjLTEuNSwwLjQtMy45LDEuNC01LjYsMi4yXG5cdFx0Yy0yLjksMS40LTQuMiwyLjgtNC4yLDQuMmMwLDEuNSwxLjIsMi4xLDQuMywyLjFjMS44LDAsMy40LTAuMiw1LjYtMC41YzAuMSwwLDAuMywwLDAuMywwYzAuMiwwLDAuMywwLjEsMC40LDAuM1xuXHRcdGMwLjEsMC4yLDAuMiwxLjcsMC4yLDIuM2MwLDAuMy0wLjEsMC41LTAuNCwwLjZjLTAuNSwwLjEtMy40LDAuMy01LjMsMC4zYy0zLjEsMC01LjEtMC40LTYuNC0xLjNjLTEuMS0wLjctMS43LTEuOS0xLjctMy40XG5cdFx0YzAtMS4xLDAuMy0yLjEsMS0zYzAuOC0xLjIsMS44LTIsMy44LTMuMkMtMzEuNS0xNzAuNi0zMS43LTE3MC45LTMxLjktMTcxLjd6IE0tMjMuMi0xNzcuMWMwLjItMC4xLDAuMy0wLjIsMC41LTAuMlxuXHRcdGMwLjMsMCwyLjQsMi4yLDIuNCwyLjZjMCwwLjEtMC4yLDAuNC0wLjYsMC43Yy0wLjUsMC40LTAuNSwwLjQtMC42LDAuNGMtMC4xLDAtMC4yLDAtMC42LTAuN2MtMC41LTAuNy0xLjItMS40LTEuNy0xLjlcblx0XHRjLTAuMS0wLjEtMC4xLTAuMS0wLjEtMC4yQy0yNC0xNzYuNC0yMy44LTE3Ni42LTIzLjItMTc3LjF6IE0tMTgtMTc2LjRjMCwwLjEtMC4xLDAuMi0wLjQsMC41Yy0wLjMsMC4zLTAuOCwwLjYtMC45LDAuNlxuXHRcdGMtMC4xLDAtMC4yLTAuMS0wLjUtMC41Yy0wLjYtMC44LTAuOS0xLjItMS44LTJjLTAuMS0wLjEtMC4xLTAuMS0wLjEtMC4yYzAtMC4yLDAuOS0wLjksMS4yLTAuOUMtMTkuOS0xNzguOS0xOC0xNzYuOC0xOC0xNzYuNHpcIlxuXHRcdC8+XG5cdDxwYXRoIGQ9XCJNLTEuNy0xNzIuMWMtMS43LTAuMy0zLTAuOC0zLjktMS41Yy0wLjQtMC4zLTAuNS0wLjQtMC41LTAuNmMwLTAuMywwLjItMC43LDAuOS0yLjFjMS4yLDAuNywyLjUsMS4zLDQsMS42XG5cdFx0YzAuMy0xLjcsMC41LTMuMSwwLjUtNC42YzEuMiwwLjIsMi4zLDAuNiwyLjksMC45YzAuMywwLjEsMC40LDAuMywwLjMsMC41YzAsMC4xLDAsMC4yLTAuMiwwLjRjLTAuNCwwLjctMC40LDAuOC0wLjksMy4yXG5cdFx0YzAuMiwwLDAuNiwwLDAuNywwYzAsMCwwLjEsMCwwLjIsMGMwLjYsMCwxLDAsMS4yLDBoMC4xYzAuMiwwLDAuMywwLjEsMC4zLDAuNGMwLDEuMS0wLjEsMS45LTAuMiwyLjFjLTAuMSwwLjEtMC40LDAuMi0xLjQsMC4yXG5cdFx0Yy0wLjUsMC0wLjgsMC0xLjUsMGMtMC41LDIuNS0wLjUsMi41LTAuNywzLjhjMC44LDAuMSwxLDAuMSwxLjQsMC4xbDEuMywwYzAuMiwwLDAuNCwwLDAuNCwwLjJjMC4xLDAuMSwwLjIsMC45LDAuMiwxLjhcblx0XHRjMCwwLjQsMCwwLjYtMC4yLDAuNmMtMC4xLDAtMC42LDAuMS0xLjYsMC4xYy0wLjQsMC0xLjEsMC0xLjktMC4xYzAsMC40LDAsMC43LDAsMC45YzAsMi4yLDEsMy4yLDMuMywzLjJjMi41LDAsNC0xLjIsNC0zLjNcblx0XHRjMC0wLjctMC4yLTEuNC0wLjYtMi4yYy0wLjUtMC45LTAuOS0xLjQtMi4xLTIuNGMwLjEsMCwwLjIsMCwwLjIsMGMwLjQsMCwxLjItMC4xLDEuOS0wLjNjMC40LTAuMSwwLjUtMC4xLDAuNi0wLjFcblx0XHRjMC40LDAsMC42LDAuMiwxLjEsMC44YzEuMSwxLjMsMS43LDIuOCwxLjcsNC4yYzAsMy40LTIuNyw1LjYtNi45LDUuNmMtMy45LDAtNS44LTEuOS01LjgtNS45YzAtMC4zLDAtMC42LDAtMVxuXHRcdGMtMi40LTAuNS0zLjctMS43LTMuNy0zLjRjMC0wLjksMC4zLTEuNSwwLjktMi4yYzAuMS0wLjEsMC4yLTAuMSwwLjMtMC4xYzAuMSwwLDAuMywwLjEsMC45LDAuNmMwLjQsMC40LDAuNSwwLjQsMC41LDAuNlxuXHRcdGMwLDAuMSwwLDAuMS0wLjEsMC4zYy0wLjEsMC4yLTAuMiwwLjQtMC4yLDAuNmMwLDAuMywwLjIsMC42LDAuNiwwLjdjMC4zLDAuMiwwLjQsMC4yLDEuMiwwLjRMLTEuNy0xNzIuMXpcIi8+XG5cdDxwYXRoIGQ9XCJNMjguMS0xNzEuN2MtMC4zLTEuMS0wLjQtMS43LTAuNy00LjdjLTAuMS0xLjItMC4yLTEuNy0wLjQtMi41YzEuNSwwLDIuNCwwLjEsMywwLjNjMC40LDAuMSwwLjUsMC4zLDAuNSwwLjVcblx0XHRjMCwwLjEsMCwwLjItMC4xLDAuNGMtMC4yLDAuNi0wLjIsMS0wLjIsMS42YzAsMS4yLDAuMiwzLjEsMC41LDMuOWMwLjEsMC41LDAuMywwLjYsMC42LDAuNmMwLjYsMCwyLjctMS4xLDMuOC0yXG5cdFx0YzAuMy0wLjIsMC40LTAuMywwLjUtMC4zYzAuMiwwLDAuNCwwLjIsMC44LDAuNmMwLjYsMC44LDEuMSwxLjcsMS4xLDJjMCwwLjMtMC4yLDAuNC0wLjYsMC42Yy0xLjUsMC40LTMuOSwxLjQtNS42LDIuMlxuXHRcdGMtMi45LDEuNC00LjIsMi44LTQuMiw0LjJjMCwxLjUsMS4yLDIuMSw0LjMsMi4xYzEuOCwwLDMuNC0wLjIsNS42LTAuNWMwLjEsMCwwLjMsMCwwLjMsMGMwLjIsMCwwLjMsMC4xLDAuNCwwLjNcblx0XHRjMC4xLDAuMiwwLjIsMS43LDAuMiwyLjNjMCwwLjMtMC4xLDAuNS0wLjQsMC42Yy0wLjUsMC4xLTMuNCwwLjMtNS4zLDAuM2MtMy4xLDAtNS4xLTAuNC02LjQtMS4zYy0xLjEtMC43LTEuNy0xLjktMS43LTMuNFxuXHRcdGMwLTEuMSwwLjMtMi4xLDEtM2MwLjgtMS4yLDEuOC0yLDMuOC0zLjJDMjguNS0xNzAuNiwyOC4zLTE3MC45LDI4LjEtMTcxLjd6XCIvPlxuXHQ8cGF0aCBkPVwiTTU5LjctMTY0LjNjLTEuMiwyLTIuNywzLjEtNC40LDMuMWMtMi41LDAtNC4zLTIuNC00LjMtNS45YzAtMy44LDEuOS03LjEsNS4yLTguOGMxLjYtMC45LDMuMy0xLjIsNS42LTEuMlxuXHRcdGM1LDAsOC43LDMuNiw4LjcsOC4zYzAsNC4yLTIuMSw3LjItNiw4LjljLTAuOCwwLjMtMS40LDAuNS0xLjcsMC41Yy0wLjMsMC0wLjQtMC4xLTAuNy0wLjZjLTAuNC0wLjYtMC45LTEuMS0xLjUtMS41XG5cdFx0YzQuOS0xLjMsNy4yLTMuNiw3LjItNy41YzAtMi0wLjgtMy43LTIuMy00LjdjLTAuOC0wLjYtMS41LTAuOC0yLjgtMUM2Mi0xNjkuNiw2MS4yLTE2Ni44LDU5LjctMTY0LjN6IE01Ni4zLTE3Mi44XG5cdFx0Yy0xLjYsMS40LTIuNSwzLjQtMi41LDUuN2MwLDEuOCwwLjYsMi45LDEuNiwyLjljMS4yLDAsMi40LTEuNywzLjMtNC41YzAuNi0xLjgsMC45LTMuMiwxLjItNS44QzU4LjItMTc0LjIsNTcuNC0xNzMuOCw1Ni4zLTE3Mi44XG5cdFx0elwiLz5cblx0PHBhdGggZD1cIk0tMjY3LjctMTIyYy0xLDAtMS41LDAtMi4xLDAuMXYtMi41YzAuNiwwLjEsMS4xLDAuMSwyLjEsMC4xaDAuNmMtMC4zLTEuMy0wLjUtMS45LTEtMi43bDItMC41aC0xLjFjLTEsMC0xLjYsMC0yLjIsMC4xXG5cdFx0di0yLjVjMC42LDAuMSwxLjEsMC4xLDIuMiwwLjFoMS44di0wLjNjMC0wLjgsMC0xLjEtMC4xLTEuN2gyLjhjLTAuMSwwLjUtMC4xLDAuOS0wLjEsMS43djAuNGgxLjZjMS4xLDAsMS41LDAsMi4xLTAuMXYyLjVcblx0XHRjLTAuNi0wLjEtMS4yLTAuMS0yLjItMC4xaC0wLjlsMS45LDAuNmMtMC41LDEuMi0xLDIuMy0xLjIsMi43aDAuNWMxLDAsMS41LDAsMi4xLTAuMXYyLjVjLTAuNi0wLjEtMS4yLTAuMS0yLjEtMC4xaC0xLjl2MS42aDEuOFxuXHRcdGMxLDAsMS41LDAsMi4xLTAuMXYyLjRjLTAuNi0wLjEtMS4xLTAuMS0yLjEtMC4xaC0wLjhjMC42LDAuOCwxLjIsMS4zLDIuNCwyYy0wLjUsMC45LTAuNywxLjMtMS4xLDIuMmMtMS4yLTEtMS41LTEuNC0yLjItMi41XG5cdFx0YzAsMS4xLDAsMS43LDAsMS44djIuM2MwLDAuOCwwLDEuNCwwLjEsMS45aC0yLjZjMC4xLTAuNSwwLjEtMS4xLDAuMS0xLjh2LTIuM2MwLTAuNSwwLTAuOSwwLTEuNmMtMC45LDEuOC0yLDMtMy44LDQuM1xuXHRcdGMtMC4zLTEtMC42LTEuNi0xLjItMi40YzEuOC0xLjEsMy4xLTIuNCw0LTRoLTEuNWMtMSwwLTEuNSwwLTIuMSwwLjF2LTIuNGMwLjYsMC4xLDEuMSwwLjEsMi4yLDAuMWgyLjN2LTEuMmMwLTAuNCwwLTAuNCwwLTAuNVxuXHRcdEgtMjY3Ljd6IE0tMjY1LjktMTI3LjVjMC41LDEsMC43LDEuNSwxLDIuN2wtMi4xLDAuNmgzLjJjMC42LTEuMSwxLTIsMS4zLTMuMkgtMjY1Ljl6IE0tMjUwLjYtMTI0LjdjMSwwLDEuNiwwLDIuMS0wLjF2Mi42XG5cdFx0Yy0wLjYtMC4xLTAuOS0wLjEtMS44LTAuMWgtMC42djkuM2MwLDEuNCwwLDIsMC4xLDIuN2gtMi43YzAuMS0wLjcsMC4xLTEuNCwwLjEtMi43di05LjNoLTIuNGMwLDIuOS0wLjMsNS4zLTAuOCw3LjRcblx0XHRjLTAuNSwxLjgtMS4yLDMuNC0yLjEsNC42Yy0wLjktMC44LTEuMy0xLTIuMy0xLjVjMi4yLTIuNywyLjgtNS43LDIuOC0xNC40YzAtMS45LDAtMi44LTAuMS0zLjZjMi42LTAuMSw2LjYtMS4xLDcuNy0ybDEuOSwyLjJcblx0XHRjLTAuMiwwLjEtMC4zLDAuMS0wLjgsMC4zYy0xLjgsMC43LTMuMywxLTYuMywxLjZ2M0gtMjUwLjZ6XCIvPlxuXHQ8cGF0aCBkPVwiTS0yMzAuNi0xMzAuNmMwLjYsMC4yLDAuOCwwLjMsMC44LDAuNmMwLDAuMiwwLDAuMi0wLjEsMC42Yy0wLjMsMC43LTAuNSwxLjktMC42LDMuNmMtMC4yLDMuOS0wLjMsNi45LTAuMyw5LjJcblx0XHRjMCwwLjgsMC4xLDEuMywwLjIsMS43YzAuMywwLjgsMS4xLDEuMiwyLjQsMS4yYzIuMiwwLDQuMi0wLjksNi4xLTIuNmMwLjktMC44LDEuNC0xLjUsMi4zLTIuOGMwLjEsMC44LDAuMywxLjMsMC45LDIuNFxuXHRcdGMwLjEsMC4yLDAuMSwwLjMsMC4xLDAuNmMwLDAuNC0wLjUsMS0xLjcsMi4xYy0yLjQsMi4xLTUsMy4yLTcuOCwzLjJjLTEuOCwwLTMuMi0wLjUtNC0xLjNjLTAuOS0xLTEuMy0yLjItMS4zLTQuNlxuXHRcdGMwLTEuOSwwLTMuMywwLjItOC45YzAtMC44LDAtMS4zLDAtMS42YzAtMiwwLTIuNi0wLjItMy43Qy0yMzIuMy0xMzAuOS0yMzEuMy0xMzAuOC0yMzAuNi0xMzAuNnpcIi8+XG5cdDxwYXRoIGQ9XCJNLTIwNi41LTEyNi42YzAtMC43LDAtMS42LTAuMS0yLjJjMS4xLDAuMSwxLjksMC4zLDIuNiwwLjVjMC42LDAuMiwwLjgsMC40LDAuOCwwLjZjMCwwLjEsMCwwLjEtMC4xLDAuNFxuXHRcdGMtMC4zLDAuOC0wLjQsMS43LTAuNCwzLjljMCwzLjEsMC4yLDUsMC43LDYuNWMwLjQsMS4xLDAuOSwxLjgsMS42LDEuOGMxLDAsMS44LTEuMiwyLjctMy44YzAuNSwxLjIsMC42LDEuNiwxLjMsMi40XG5cdFx0YzAuMSwwLjIsMC4yLDAuMywwLjIsMC41YzAsMC40LTAuNCwxLjItMC44LDEuOWMtMC45LDEuNC0yLjEsMi4xLTMuNCwyLjFjLTEuOCwwLTMuMi0xLjUtNC4xLTQuNGMtMC42LTEuOS0wLjgtNC4zLTAuOC03LjdWLTEyNi42XG5cdFx0eiBNLTE5Mi4yLTEyNi4yYzAuMSwwLDAuMywwLjEsMC41LDAuMmMxLjIsMS4yLDIuNCwzLjEsMy4yLDQuOWMwLjUsMS4zLDEsMywxLDMuNWMwLDAuMi0wLjEsMC40LTAuNiwwLjZjLTAuNiwwLjMtMS43LDAuNy0yLDAuN1xuXHRcdGMtMC4yLDAtMC4zLTAuMS0wLjQtMC42Yy0wLjMtMS44LTAuNy0zLjItMS41LTQuOGMtMC43LTEuNC0wLjctMS41LTIuNC0zLjVDLTE5My4zLTEyNS44LTE5Mi41LTEyNi4yLTE5Mi4yLTEyNi4yelwiLz5cblx0PHBhdGggZD1cIk0tMTYxLjEtMTI1LjNoLTJjLTQuOSwwLTguNiwwLjEtOS43LDAuM2MtMC4yLDAtMC4zLDAtMC40LDBjLTAuMiwwLTAuMy0wLjEtMC40LTAuM2MtMC4xLTAuNi0wLjItMS4yLTAuMy0zXG5cdFx0YzEuNCwwLjIsMy4xLDAuMiw2LjYsMC4yYzYuMSwwLDYuNywwLDktMC4xYzAsMi4zLTAuMSwzLjYtMC4xLDcuNWMwLDEuOCwwLjEsNS43LDAuMSw2LjljMCwwLDAsMC4xLDAsMC4xYzAsMC4zLTAuMSwwLjUtMC4yLDAuNlxuXHRcdGMtMC4yLDAuMS0xLjIsMC4xLTEuOSwwLjFjLTAuOSwwLTAuOSwwLTAuOS0wLjZjMCwwLDAtMC4xLDAtMWgtMS4zYy02LjQsMC05LjQsMC4xLTEwLjgsMC4zYy0wLjEsMC0wLjEsMC0wLjIsMFxuXHRcdGMtMC4zLDAtMC40LTAuMS0wLjQtMC42Yy0wLjEtMC41LTAuMi0xLjMtMC4yLTIuNmMxLjYsMC4xLDMuMiwwLjIsNywwLjJjMi40LDAsMi43LDAsNiwwVi0xMjUuM3pcIi8+XG5cdDxwYXRoIGQ9XCJNLTEzOS45LTExNy40YzIuNCwwLjQsNS4zLDEuMiw4LDIuM2MyLDAuOCwyLjQsMSwyLjQsMS4zYzAsMC4zLTAuMywxLjQtMC42LDIuMWMtMC4yLDAuNC0wLjMsMC42LTAuNSwwLjZcblx0XHRjLTAuMSwwLTAuMSwwLTIuNi0xLjFjLTIuMy0xLjEtNi44LTIuMy05LjUtMi42Yy0wLjktMC4xLTEtMC4xLTEtMC40YzAtMC4yLDAuMy0xLjMsMC42LTJjMC4xLTAuMywwLjMtMC41LDAuNS0wLjVcblx0XHRDLTE0Mi41LTExNy44LTE0MC42LTExNy41LTEzOS45LTExNy40eiBNLTEzMi4xLTEyNS41Yy0xLjMtMC42LTMuMi0xLjItNC43LTEuNmMtMS41LTAuNC0zLjktMC45LTQuOC0xYy0wLjQsMC0wLjUtMC4xLTAuNS0wLjRcblx0XHRjMC0wLjMsMC4zLTEuNiwwLjUtMi4xYzAuMS0wLjIsMC4yLTAuMywwLjUtMC4zYzAuMSwwLDAuMiwwLDAuMywwYzAsMCwwLjMsMCwwLjcsMC4xYzIuNSwwLjQsNS40LDEuMSw3LjcsMS44XG5cdFx0YzEuNCwwLjUsMS42LDAuNiwxLjYsMC45YzAsMC4yLTAuNCwxLjctMC42LDIuMmMtMC4xLDAuMy0wLjIsMC40LTAuNCwwLjRDLTEzMS44LTEyNS40LTEzMS45LTEyNS41LTEzMi4xLTEyNS41eiBNLTEzMy45LTEyMi43XG5cdFx0YzEuMiwwLjUsMS41LDAuNiwxLjUsMWMwLDAuMi0wLjQsMS43LTAuNiwyLjFjLTAuMSwwLjMtMC4yLDAuMy0wLjQsMC4zYy0wLjEsMC0wLjIsMC0wLjQtMC4xYy0wLjktMC40LTItMC45LTMuMS0xLjJcblx0XHRjLTEuNC0wLjQtMy43LTEtNC42LTEuMWMtMC40LTAuMS0wLjUtMC4xLTAuNS0wLjRjMC0wLjQsMC40LTEuOCwwLjYtMi4yYzAuMS0wLjEsMC4yLTAuMiwwLjQtMC4yXG5cdFx0Qy0xNDAuMi0xMjQuNi0xMzUuNy0xMjMuNC0xMzMuOS0xMjIuN3pcIi8+XG5cdDxwYXRoIGQ9XCJNLTEwOS41LTEyMS4zYy0wLjksMC0xLjQsMC0yLDAuMWMtMC4xLDAtMC4xLDAtMC4yLDBjLTAuMiwwLTAuNC0wLjEtMC40LTAuNGMtMC4xLTAuNS0wLjItMS4zLTAuMi0yLjRcblx0XHRjMC44LDAuMiwyLjMsMC4yLDQuOSwwLjJjMi4yLDAsMi40LDAsMi44LTAuMmMwLjEsMCwwLjIsMCwwLjMsMGMwLjQsMCwwLjgsMC4yLDEuNCwwLjdjMC41LDAuNSwwLjgsMC45LDAuOCwxLjJcblx0XHRjMCwwLjEsMCwwLjItMC4yLDAuNGMtMC4zLDAuNC0wLjMsMC40LTAuNywyLjdjLTAuMywxLjktMC40LDIuNy0wLjYsMy41YzAsMC4xLDAsMC4xLDAsMC4xYzIuMSwwLDIuNSwwLDMuNi0wLjFjMCwwLDAuMSwwLDAuMSwwXG5cdFx0YzAuMywwLDAuNCwwLjIsMC40LDEuNWMwLDEsMCwxLjEtMC40LDEuMWMtMC4xLDAtMC4yLDAtMS4yLDBjLTAuOCwwLTMuNC0wLjEtNS42LTAuMWMtMy43LDAtNi41LDAuMS03LjUsMC4yYy0wLjEsMC0wLjEsMC0wLjIsMFxuXHRcdGMtMC4zLDAtMC41LTAuMS0wLjYtMC4zYy0wLjEtMC4zLTAuMi0xLTAuMy0yLjVjMS43LDAuMSwyLjQsMC4yLDguOSwwLjJjMC0wLjIsMC0wLjIsMC4xLTAuNGMwLjMtMS41LDAuNi0zLjUsMC44LTUuNkgtMTA5LjV6XCIvPlxuXHQ8cGF0aCBkPVwiTS03OC4yLTExNy4zYzQuNCwwLDgtMC4xLDkuNy0wLjJjMC4zLDAsMC40LDAsMC41LDBjMC4xLDAsMC4yLDAsMC4zLDBjMC4yLDAuMSwwLjIsMC41LDAuMiwxLjhjMCwxLjIsMCwxLjMtMC41LDEuM1xuXHRcdGMwLDAsMCwwLTAuNCwwYy0xLjMtMC4xLTIuNy0wLjEtNS44LTAuMWMtNi42LDAtOS44LDAuMS0xMS4yLDAuM2MtMC4yLDAtMC4zLDAtMC40LDBjLTAuNiwwLTAuNi0wLjQtMC44LTMuM1xuXHRcdEMtODQuNy0xMTcuNC04Mi40LTExNy4zLTc4LjItMTE3LjN6IE0tNzcuNS0xMjcuN2MzLjIsMCw1LjEtMC4xLDYuNC0wLjJjMC4xLDAsMC4yLDAsMC4zLDBjMC4zLDAsMC40LDAuMSwwLjQsMC40YzAsMC4yLDAsMSwwLDEuN1xuXHRcdGMwLDAuOC0wLjEsMS0wLjQsMWMtMC4xLDAtMC4yLDAtMC40LDBjLTAuNSwwLTQsMC02LjgsMGMtMS44LDAtMy4xLDAtNC40LDAuMWMtMC4zLDAtMC43LDAtMC43LDBjLTAuMywwLTAuNS0wLjEtMC42LTAuNFxuXHRcdGMtMC4xLTAuMy0wLjItMS44LTAuMi0yLjlDLTgyLjQtMTI3LjctODAuOC0xMjcuNy03Ny41LTEyNy43elwiLz5cblx0PHBhdGggZD1cIk0tNDYuNS0xMjYuMmMxLjQsMCw2LjMtMC4xLDcuMi0wLjFjMC44LDAsMS4xLDAsMS45LTAuMWMwLDAsMC4xLDAsMC4xLDBjMC4zLDAsMC40LDAuMiwwLjQsMi4xYzAsMC42LDAsMC42LTAuMywwLjdcblx0XHRjLTAuMiwwLTAuMiwwLTAuNiwwYy0xLjEtMC4xLTEuMy0wLjEtNS4yLTAuMWMtMC4xLDMuNi0wLjgsNi4yLTIuMiw4LjVjLTAuOSwxLjUtMi40LDMtMy43LDMuOGMtMC40LDAuMi0wLjcsMC4zLTAuOCwwLjNcblx0XHRjLTAuMywwLTAuMywwLTAuOS0wLjVjLTAuNi0wLjUtMC43LTAuNi0xLjYtMS4xYzIuMy0xLjIsNC4xLTMsNS00LjljMC43LTEuNSwxLjItMy44LDEuMy02LjJjLTAuNCwwLTQuMiwwLTQuOSwwXG5cdFx0Yy0xLjUsMi40LTIuOSw0LjItMy41LDQuMmMtMC4xLDAtMC4zLTAuMS0wLjUtMC4yYy0wLjYtMC40LTEuMi0wLjctMS45LTFjMi0xLjgsMy41LTMuOCw0LjUtNi4zYzAuNi0xLjQsMS0zLDEuMS0zLjlcblx0XHRjMS4xLDAuMiwyLDAuNiwyLjgsMC45YzAuMiwwLjEsMC40LDAuMywwLjQsMC40YzAsMC4xLDAsMC4yLTAuMywwLjVjLTAuMiwwLjItMC4zLDAuNS0wLjcsMS41Yy0wLjMsMC44LTAuNCwxLTAuNiwxLjVILTQ2LjV6XCIvPlxuXHQ8cGF0aCBkPVwiTS0xNi41LTEyMi41YzQuNCwwLDYuOSwwLDkuMy0wLjJjMC4xLDAsMC4yLDAsMC4zLDBjMC43LDAsMC43LDAsMC43LDEuOWMwLDEtMC4xLDEuMi0wLjUsMS4yYzAsMC0wLjEsMC0wLjEsMFxuXHRcdGMtMS42LTAuMS0yLjUtMC4xLTkuNC0wLjFjLTIuNSwwLTMuOCwwLTYsMC4xYy0wLjIsMC0wLjQsMC0wLjcsMGMtMC44LDAtMC45LDAtMS4zLDAuMWMtMC4xLDAtMC4yLDAtMC4zLDBjLTAuMywwLTAuNC0wLjEtMC41LTAuM1xuXHRcdGMtMC4xLTAuNi0wLjItMS44LTAuMi0yLjlDLTIzLjItMTIyLjYtMjEuNS0xMjIuNS0xNi41LTEyMi41elwiLz5cblx0PHBhdGggZD1cIk0xMi43LTEyMC41Yy0wLjMsMC41LTAuNCwwLjYtMC42LDAuNmMtMC4yLDAtMC4yLDAtMS4yLTAuN2MtMC44LTAuNi0xLjktMS4xLTMuNi0xLjdjLTAuNC0wLjEtMC41LTAuMi0wLjUtMC40XG5cdFx0YzAtMC4xLDAuMi0wLjUsMC42LTEuMmMwLjEtMC4yLDAuMi0wLjMsMC4yLTAuNWMwLjMtMC41LDAuNC0wLjYsMC42LTAuNmMwLjQsMCwyLjIsMC43LDMuNSwxLjNjMC43LDAuNCwxLjYsMC45LDEuOCwxXG5cdFx0YzAuMSwwLjEsMC4xLDAuMiwwLjEsMC4zQzEzLjYtMTIyLDEzLjItMTIxLjQsMTIuNy0xMjAuNXogTTI1LTEyMy4yYzAuMSwwLjIsMC4xLDAuNCwwLjEsMC41YzAsMC4zLTAuMSwwLjUtMC42LDFcblx0XHRjLTIsMi4yLTQsNC02LjUsNS43Yy0yLjEsMS40LTQuNSwyLjctNi44LDMuN2MtMC43LDAuMy0wLjksMC40LTEuMiwwLjZjLTAuMiwwLjItMC4zLDAuMi0wLjQsMC4yYy0wLjUsMC0xLjMtMS4zLTItMy4yXG5cdFx0YzIuMy0wLjQsNS4xLTEuNSw3LjgtMy4yYzEuNy0xLDMuOC0yLjYsNS4zLTRjMS4zLTEuMiwyLjEtMi4xLDMuNS00LjFDMjQuNC0xMjQuOSwyNC41LTEyNC42LDI1LTEyMy4yeiBNMTUtMTI1LjJcblx0XHRjLTAuMywwLjQtMC40LDAuNS0wLjYsMC41Yy0wLjEsMC0wLjIsMC0wLjQtMC4yYy0xLjUtMS4zLTIuOS0yLjItNC40LTIuOGMtMC4yLTAuMS0wLjMtMC4yLTAuMy0wLjNjMC0wLjEsMC0wLjIsMC4xLTAuNFxuXHRcdGMxLjItMS44LDEuMi0xLjgsMS41LTEuOGMwLjUsMCwyLjUsMSwzLjgsMS45YzEuMiwwLjgsMS40LDEsMS40LDEuMkMxNi4xLTEyNi45LDE1LjYtMTI1LjksMTUtMTI1LjJ6XCIvPlxuXHQ8cGF0aCBkPVwiTTQ4LjYtMTE3LjZjLTAuNiwwLTEuMSwwLTEuNSwwYy0yLjksMC01LjUsMC4xLTYuNCwwLjJjLTAuNCwwLTAuNiwwLjEtMC43LDAuMWMtMC4zLDAtMC40LTAuMS0wLjUtMi42XG5cdFx0YzEuMSwwLjEsMi42LDAuMSw1LjcsMC4xYzAuNSwwLDIuOCwwLDMuNCwwdi0yLjVoLTJjLTIuMiwwLTQuMiwwLTUuMywwLjFjLTAuNSwwLTAuOCwwLTAuOSwwYy0wLjMsMC0wLjMsMC0wLjUsMFxuXHRcdGMtMC4xLDAtMC4yLDAtMC4zLDBjLTAuMiwwLTAuMy0wLjEtMC40LTAuMmMtMC4xLTAuMy0wLjEtMS4xLTAuMi0yLjRjMS4yLDAuMSwyLjUsMC4yLDcuMywwLjJjMi43LDAsMy42LDAsNC45LTAuMVxuXHRcdGMtMC4xLDEuNC0wLjEsMy0wLjEsNi4yYzAsMS43LDAsNS40LDAuMSw2LjVjMCwwLDAsMC4xLDAsMC4xYzAsMC4yLTAuMSwwLjMtMC4yLDAuNGMtMC4xLDAuMS0wLjksMC4xLTEuNiwwLjFcblx0XHRjLTAuOSwwLTAuOSwwLTAuOS0wLjZjMCwwLDAtMC4xLDAtMC4ydi0wLjVjLTAuOCwwLTEuNSwwLTEuOSwwYy0zLjcsMC02LjUsMC4xLTcuMywwLjJjLTAuMSwwLTAuMSwwLTAuMSwwYy0wLjQsMC0wLjQtMC4xLTAuNi0yLjZcblx0XHRjMS4xLDAuMSwyLjksMC4xLDUuNywwLjFjMC41LDAsMy42LDAsNC4yLDBWLTExNy42elwiLz5cblx0PHBhdGggZD1cIk04My4xLTEyNC41YzAuMSwwLjIsMC4yLDAuNCwwLjIsMC42YzAsMC4yLTAuMSwwLjQtMC40LDAuOGMtMS4zLDEuNy0yLjcsMy4xLTQuOSw0LjhjLTIuNCwxLjktNC40LDMuMS03LjMsNC41XG5cdFx0Yy0xLjgsMC45LTEuOSwwLjktMi4yLDEuMmMtMC4yLDAuMi0wLjMsMC4yLTAuNCwwLjJjLTAuMiwwLTAuNC0wLjItMC44LTAuN2MtMC41LTAuNy0wLjktMS43LTEuMi0yLjVjMi40LTAuNiw1LjMtMS44LDguMS0zLjZcblx0XHRjMy43LTIuMyw2LTQuNiw3LjgtNy44QzgyLjMtMTI2LjIsODIuNS0xMjUuNyw4My4xLTEyNC41eiBNNjcuMS0xMjguNWMwLjQtMC41LDAuNi0wLjYsMC44LTAuNmMwLjUsMCwyLjMsMS4yLDMuNywyLjRcblx0XHRjMC45LDAuNywxLjIsMS4xLDEuMiwxLjNjMCwwLjItMC40LDAuOC0xLDEuNWMtMC41LDAuNi0wLjgsMC44LTEsMC44Yy0wLjIsMC0wLjIsMC0xLjItMC45Yy0wLjYtMC42LTEuOS0xLjYtMi41LTJcblx0XHRjLTAuOC0wLjYtMC44LTAuNi0xLTAuNmMtMC4xLTAuMS0wLjEtMC4xLTAuMS0wLjJDNjYuMS0xMjcuMiw2Ni41LTEyNy44LDY3LjEtMTI4LjV6XCIvPlxuXHQ8cGF0aCBkPVwiTTEwNS0xMTcuOWMtMi40LDEuNC0zLDIuMS0zLDMuMWMwLDAuNCwwLjIsMC43LDAuNSwwLjljMC41LDAuMywxLjcsMC41LDMuMiwwLjVjMS4zLDAsMy4xLTAuMSw0LjMtMC4zXG5cdFx0YzAuNS0wLjEsMC44LTAuMSwxLjgtMC40YzAsMCwwLjEsMCwwLjEsMGMwLjIsMCwwLjMsMC4xLDAuNCwwLjNjMC4xLDAuNSwwLjIsMS4yLDAuMiwyLjFjMCwwLjQtMC4xLDAuNS0wLjQsMC42XG5cdFx0Yy0wLjYsMC4xLTMuMiwwLjMtNSwwLjNjLTIuOSwwLTQuNS0wLjItNS42LTAuN2MtMS40LTAuNi0yLjEtMS43LTIuMS0zLjJjMC0xLjQsMC42LTIuNiwxLjktMy42YzEtMC44LDEuMy0xLDMuNS0yLjJcblx0XHRjLTAuMi0wLjgtMC42LTEuMS0xLjMtMS4xYy0xLDAtMiwwLjQtMy4xLDEuMWMtMC43LDAuNS0xLjUsMS4yLTIsMS43Yy0wLjcsMC43LTAuOCwwLjgtMSwwLjhjLTAuMiwwLTAuNy0wLjYtMS4yLTEuNFxuXHRcdGMtMC4yLTAuNC0wLjQtMC43LTAuNC0wLjljMC0wLjIsMC0wLjMsMC42LTAuNmMyLTEuMywzLjYtMyw0LjYtNC43Yy0xLjcsMC4xLTIuNiwwLjEtMy41LDAuMWMtMC40LDAtMC40LTAuMS0wLjYtMC41XG5cdFx0Yy0wLjEtMC4zLTAuMi0xLjYtMC4yLTIuMmMwLjgsMC4xLDEuMywwLjEsMi40LDAuMWMwLjksMCwyLDAsMy0wLjFjMC41LTEuNCwwLjctMi4yLDAuNy0zLjRjMi4xLDAuNCwzLjEsMC43LDMuMSwxLjFcblx0XHRjMCwwLjEsMCwwLjEtMC4xLDAuM2MtMC4yLDAuMy0wLjQsMC43LTAuNywxLjRjMCwwLjEsMCwwLjEtMC4xLDAuMmMxLjQtMC4yLDIuNi0wLjQsMy40LTAuNmMwLjUtMC4xLDAuNi0wLjIsMC44LTAuMlxuXHRcdGMwLjIsMCwwLjMsMC4xLDAuMywwLjJjMC4xLDAuNCwwLjIsMS41LDAuMiwxLjljMCwwLjMtMC4xLDAuNC0wLjQsMC41Yy0wLjgsMC4yLTMuNCwwLjYtNS42LDAuOGMtMC43LDEuMy0xLjIsMi4xLTIsMi45XG5cdFx0YzEuMS0wLjUsMS45LTAuNywyLjktMC43YzEuMSwwLDEuOCwwLjYsMi4zLDJjMi40LTEuMywzLjYtMiwzLjgtMi4xYzEuMS0wLjYsMS42LTEsMi4xLTEuNmMxLDEsMiwyLjUsMiwyLjljMCwwLjEtMC4xLDAuMi0wLjQsMC4zXG5cdFx0Yy0xLjIsMC4zLTMuNCwxLjItNywzYzAsMC40LDAuMSwxLjUsMC4xLDIuM2MwLDAuMSwwLDAuMywwLDAuNWMwLDAuMSwwLDAuMiwwLDAuMnYwLjRjMCwwLjMsMCwwLjQtMC4yLDAuNVxuXHRcdGMtMC4xLDAuMS0wLjgsMC4yLTEuNSwwLjJjLTAuOCwwLTEtMC4xLTEtMC41YzAsMCwwLDAsMC0wLjFjMC0wLjcsMC4xLTEuNiwwLjEtMi4yVi0xMTcuOXpcIi8+XG5cdDxwYXRoIGQ9XCJNMTMxLjItMTI2LjRjNC0xLjEsNi0xLjUsOC4zLTEuNWMyLjQsMCw0LjMsMC42LDUuNiwxLjljMS4xLDEuMSwxLjYsMi42LDEuNiw0LjNjMCwzLjEtMS43LDUuNy00LjUsNy4yXG5cdFx0Yy0xLjUsMC44LTMuMSwxLjMtNS4yLDEuN2MtMC45LDAuMi0xLjQsMC4zLTEuOCwwLjNjLTAuMywwLTAuNC0wLjEtMC42LTAuNGMtMC42LTEuMS0wLjgtMS40LTEuNS0yLjJjMy42LTAuNCw1LjUtMC45LDcuNC0xLjhcblx0XHRjMi0xLDMuMi0yLjcsMy4yLTQuN2MwLTIuMy0xLjUtMy43LTMuOS0zLjdjLTIuOSwwLTYsMC44LTkuNywyLjVjLTAuNiwwLjMtMSwwLjUtMS4yLDAuNmMtMC40LDAuMi0wLjYsMC4zLTAuNywwLjNcblx0XHRjLTAuNSwwLTEuMy0xLjUtMS44LTMuM0MxMjcuNS0xMjUuNSwxMjguNi0xMjUuNywxMzEuMi0xMjYuNHpcIi8+XG5cdDxwYXRoIGQ9XCJNMTcxLjMtMTI5LjNjMCwwLjItMC4xLDAuMy0wLjUsMC41Yy0wLjIsMC4xLTAuNCwwLjMtMC42LDAuNmMtMS41LDEuNy0zLjYsNC4xLTUuNSw2Yy0wLjQsMC40LTAuNiwwLjctMC42LDFcblx0XHRjMCwwLjMsMC4yLDAuNiwwLjYsMWMxLjQsMS4zLDMuNywzLjYsNS40LDUuNmMxLjIsMS4zLDEuNSwxLjgsMS41LDJjMCwwLjMtMC40LDAuNy0xLjQsMS40Yy0wLjUsMC40LTAuNywwLjUtMC45LDAuNVxuXHRcdGMtMC4yLDAtMC4zLTAuMS0wLjYtMC41Yy0xLTEuNi0zLjYtNC43LTUuNS02LjZjLTEuMS0xLjEtMS4zLTEuMy0xLjYtMS44Yy0wLjQtMC42LTAuNi0xLjEtMC42LTEuNmMwLTAuNSwwLjEtMSwwLjQtMS41XG5cdFx0YzAuMy0wLjQsMC4zLTAuNCwxLjctMmMxLjQtMS40LDIuOS0zLjMsMy44LTQuNmMwLjYtMC45LDAuOS0xLjUsMS4yLTIuM0MxNzAuMi0xMzAuNiwxNzEuMy0xMjkuOCwxNzEuMy0xMjkuM3pcIi8+XG5cdDxwYXRoIGQ9XCJNMTk2LjUtMTIzLjNjMy40LDAsNS44LDIuMyw1LjgsNS42YzAsMi4yLTEuMiw0LjItMy4xLDUuNGMtMS40LDAuOC0zLDEuMi00LjksMS4yYy0zLDAtNC44LTEuMi00LjgtMy4zXG5cdFx0YzAtMS45LDEuNi0zLjIsMy44LTMuMmMyLDAsMy41LDEsNC41LDMuMWMxLjItMC45LDEuNy0xLjgsMS43LTMuMWMwLTIuMS0xLjUtMy40LTMuOC0zLjRjLTIuNCwwLTQuOSwxLjItNywzLjNcblx0XHRjLTAuNCwwLjQtMC43LDAuOC0xLjIsMS4zYy0wLjIsMC4yLTAuMywwLjMtMC40LDAuM2MtMC40LDAtMi4xLTEuNy0yLjEtMi4xYzAtMC4yLDAuMS0wLjMsMC42LTAuN2MwLjYtMC40LDEuMy0xLjEsMi40LTIuMVxuXHRcdGMyLjMtMi4yLDQtNC4xLDYuNi03LjFjLTMsMC40LTUsMC43LTUuOCwxYy0wLjEsMC0wLjIsMC0wLjMsMGMtMC4yLDAtMC4zLTAuMS0wLjUtMC41Yy0wLjMtMC43LTAuNC0xLjUtMC41LTIuNlxuXHRcdGMwLjYsMC4xLDEuMSwwLjEsMS42LDAuMWMxLjIsMCwzLjEtMC4yLDUuNi0wLjVjMC45LTAuMSwxLjItMC4yLDEuOC0wLjRjMC4yLTAuMSwwLjMtMC4xLDAuNS0wLjFjMC4zLDAsMC43LDAuMywxLjMsMS4yXG5cdFx0YzAuNSwwLjYsMC42LDAuOSwwLjYsMS4xYzAsMC4zLTAuMSwwLjQtMC42LDAuN2MtMC40LDAuMy0wLjcsMC41LTEuMiwxYy0xLjIsMS4yLTEuMiwxLjItMi43LDIuN2MtMS4xLDEuMS0xLjIsMS4yLTIuMSwyLjJcblx0XHRDMTkzLjktMTIyLjksMTk1LjEtMTIzLjMsMTk2LjUtMTIzLjN6IE0xOTQuMi0xMTVjLTAuNC0wLjItMC44LTAuNC0xLjItMC40Yy0wLjcsMC0xLjIsMC40LTEuMiwwLjljMCwwLjcsMC43LDEuMSwxLjksMS4xXG5cdFx0YzAuNSwwLDEsMCwxLjYtMC4yQzE5NS0xMTQuMywxOTQuNy0xMTQuNiwxOTQuMi0xMTV6XCIvPlxuXHQ8cGF0aCBkPVwiTTIyMC4zLTEyNC4yYy0xLjUsMS0yLjEsMS4yLTMuNywyYy0wLjQtMC45LTAuOC0xLjYtMS4zLTIuNGMyLjQtMSw0LjEtMS44LDUuOC0zLjJjMS41LTEuMiwyLjctMi40LDMuNi0zLjloMi43XG5cdFx0YzEuMiwxLjcsMi4yLDIuNiwzLjksMy44YzEuOSwxLjQsMy44LDIuNCw1LjksMy4xYy0wLjYsMS0xLDEuNi0xLjMsMi42Yy0xLjQtMC42LTIuMy0xLjEtMy45LTIuMXYxLjhjLTAuNi0wLjEtMS4yLTAuMS0yLjEtMC4xXG5cdFx0aC03LjdjLTAuNiwwLTEuMywwLTIsMC4xVi0xMjQuMnogTTIxOS0xMTguM2MtMS4yLDAtMiwwLTIuNywwLjF2LTIuN2MwLjcsMC4xLDEuNiwwLjEsMi43LDAuMWgxNC4zYzEuMiwwLDEuOSwwLDIuNy0wLjF2Mi43XG5cdFx0Yy0wLjgtMC4xLTEuNS0wLjEtMi43LTAuMWgtNy45Yy0wLjgsMS44LTEuNSwzLjEtMi40LDQuNWM0LTAuMiw0LTAuMiw3LjMtMC42Yy0wLjctMC44LTEuMi0xLjItMi40LTIuNWwyLjMtMVxuXHRcdGMyLjUsMi41LDMuNSwzLjcsNS4zLDYuMWwtMi4yLDEuNWMtMC42LTEtMC44LTEuMy0xLjQtMmMtMS45LDAuMi0zLjMsMC40LTQuMiwwLjVjLTIuNCwwLjItNi44LDAuNi03LjgsMC43XG5cdFx0Yy0xLjMsMC4xLTIuNCwwLjItMywwLjNsLTAuNC0yLjhjMC43LDAsMSwwLjEsMS4zLDAuMWMwLjIsMCwwLjksMCwyLjEtMC4xYzEuMS0xLjcsMS44LTMuMSwyLjQtNC42SDIxOXogTTIyOS45LTEyNC45XG5cdFx0YzAuMywwLDAuNSwwLDEsMGMtMi4xLTEuNC0zLjQtMi42LTQuOC00LjVjLTEuMiwxLjYtMi42LDMtNC44LDQuNWMwLjQsMCwwLjYsMCwwLjksMEgyMjkuOXpcIi8+XG5cdDxwYXRoIGQ9XCJNMjU1LTExMi44YzAsMS4xLDAsMS43LDAuMSwyLjRoLTIuOGMwLjEtMC43LDAuMS0xLjMsMC4xLTIuNHYtNS44Yy0wLjksMC44LTEuNCwxLjItMi42LDJjLTAuMy0wLjktMC43LTEuNy0xLjItMi40XG5cdFx0YzEuNi0wLjksMi43LTEuOCw0LTMuMWMxLjEtMS4xLDEuOC0yLjEsMi41LTMuNmgtMy43Yy0wLjgsMC0xLjQsMC0xLjksMC4xdi0yLjZjMC42LDAuMSwxLjEsMC4xLDEuOCwwLjFoMS4ydi0xLjlcblx0XHRjMC0wLjYsMC0xLjItMC4xLTEuOGgyLjhjLTAuMSwwLjUtMC4xLDEuMS0wLjEsMS44djEuOWgxYzAuNywwLDEsMCwxLjMtMC4xbDEuMSwxLjJjLTAuMiwwLjMtMC4zLDAuNi0wLjUsMVxuXHRcdGMtMC44LDEuNy0xLjIsMi40LTIuMywzLjljMS4xLDEuMiwyLjEsMi4xLDMuNiwyLjljLTAuNSwwLjctMC45LDEuNC0xLjIsMi4zYy0xLjItMC44LTEuOS0xLjQtMy0yLjZWLTExMi44eiBNMjY0LjgtMTEzLjloMi44XG5cdFx0YzEuMiwwLDEuOSwwLDIuNi0wLjF2Mi44Yy0wLjgtMC4xLTEuNy0wLjEtMi42LTAuMWgtNy45Yy0xLDAtMS44LDAtMi42LDAuMXYtMi44YzAuNywwLjEsMS41LDAuMSwyLjYsMC4xaDIuNXYtOWgtMS43XG5cdFx0Yy0wLjgsMC0xLjUsMC0yLjMsMC4xdi0yLjZjMC42LDAuMSwxLjMsMC4xLDIuMywwLjFoMS43di00LjFjMC0xLDAtMS41LTAuMS0yLjRoMi45Yy0wLjEsMC45LTAuMSwxLjQtMC4xLDIuNHY0LjFoMi40XG5cdFx0YzEuMSwwLDEuNywwLDIuMy0wLjF2Mi42Yy0wLjctMC4xLTEuNS0wLjEtMi4zLTAuMWgtMi40Vi0xMTMuOXpcIi8+XG5cdDxwYXRoIGQ9XCJNLTU5LjEtMTg2LjNjMC44LDAsMS43LTAuMSwyLjYtMC40YzAsMCwwLjEsMCwwLjEsMGMwLjEsMCwwLjEsMCwwLjEsMC4xYzAsMC4yLDAsMC41LDAsMC45YzAsMC4yLDAsMC4zLTAuMSwwLjNcblx0XHRjLTAuMywwLjItMS42LDAuMy0yLjgsMC4zYy0xLjUsMC0yLjQtMC4yLTMuMS0wLjljLTAuMy0wLjMtMC43LTAuOC0wLjctMS4xYzAtMC4xLDAuMS0wLjIsMC45LTAuN1xuXHRcdEMtNjEuNi0xODYuNy02MC44LTE4Ni4zLTU5LjEtMTg2LjN6IE0tNTktMTkyLjFjMC42LDAsMC45LDAsMS42LTAuMWMwLDAsMC4xLDAsMC4xLDBjMC4xLDAsMC4xLDAsMC4xLDAuMWMwLDAuMSwwLDAuNCwwLDAuOFxuXHRcdGMwLDAuMiwwLDAuMy0wLjEsMC40Yy0wLjEsMC0xLDAuMS0xLjYsMC4xYy0wLjksMC0xLjYtMC4xLTIuNS0wLjJjLTAuNi0wLjEtMC42LTAuMS0wLjYtMC41YzAtMC4yLDAtMC42LDAuMS0wLjlcblx0XHRDLTYxLTE5Mi4yLTYwLjEtMTkyLjEtNTktMTkyLjF6XCIvPlxuXHQ8cGF0aCBkPVwiTS0yNjYuMS0xNDIuOGMtMC40LDAtMSwwLTEuNCwwYy0wLjMsMC0wLjMsMC0wLjQtMC4xYzAtMC4xLDAtMC41LDAtMC43YzAsMCwwLTAuMSwwLTAuMmMwLjUsMCwwLjYsMCwwLjksMFxuXHRcdGMwLjIsMCwwLjYsMCwwLjksMGMwLTAuNiwwLjEtMC44LDAuMS0xYzAtMC4xLDAtMC4yLDAtMC4zYzAuNSwwLDAuOSwwLDEuMSwwLjFjMC4xLDAsMC4xLDAuMSwwLjEsMC4xYzAsMCwwLDAuMS0wLjEsMC4yXG5cdFx0Yy0wLjEsMC4yLTAuMSwwLjQtMC4yLDAuOGMxLTAuMSwxLjctMC4yLDIuNy0wLjRjMCwwLDAsMCwwLDBjMCwwLDAuMSwwLDAuMSwwLjFjMCwwLjEsMC4xLDAuNSwwLjEsMC43YzAsMC4yLDAsMC4yLTAuMSwwLjJcblx0XHRjLTAuNiwwLjEtMS44LDAuMy0yLjksMC40YzAsMCwwLDAuMSwwLDAuMmMwLDAuMiwwLDAuMiwwLDAuN2MwLjQtMC4xLDAuOC0wLjEsMS4zLTAuMWMwLjEtMC4zLDAuMS0wLjQsMC4xLTAuNlxuXHRcdGMwLjgsMC4yLDEuMiwwLjMsMS4yLDAuNGMwLDAsMCwwLjEtMC4xLDAuMmMwLDAsMCwwLjEtMC4xLDAuMWMxLjMsMC4zLDIuMSwxLjMsMi4xLDIuNWMwLDEuMS0wLjYsMi0xLjcsMi42XG5cdFx0Yy0wLjQsMC4yLTEsMC40LTEuMiwwLjRjLTAuMSwwLTAuMiwwLTAuMi0wLjFjLTAuMi0wLjMtMC4zLTAuNC0wLjctMC43YzEtMC4yLDEuNS0wLjQsMi0wLjhjMC41LTAuNCwwLjctMC44LDAuNy0xLjRcblx0XHRjMC0wLjgtMC41LTEuNC0xLjMtMS42Yy0wLjYsMS40LTEsMi0xLjcsMi44YzAuMSwwLjIsMC4xLDAuMywwLjIsMC41YzAsMC4xLDAsMC4xLDAsMC4xYzAsMC4xLTAuMSwwLjItMC40LDAuM1xuXHRcdGMtMC4yLDAuMS0wLjQsMC4yLTAuNSwwLjJjLTAuMSwwLTAuMSwwLTAuMi0wLjNjLTAuNiwwLjQtMS4yLDAuNi0xLjgsMC42Yy0wLjcsMC0xLjEtMC42LTEuMS0xLjRjMC0xLjIsMC45LTIuNSwyLjQtMy4yXG5cdFx0Qy0yNjYuMS0xNDIuMS0yNjYuMS0xNDIuNi0yNjYuMS0xNDIuOHogTS0yNjcuNS0xMzguNmMwLDAuMiwwLjIsMC40LDAuNCwwLjRjMC4zLDAsMC44LTAuMiwxLjItMC41Yy0wLjEtMC43LTAuMi0xLjEtMC4yLTEuOVxuXHRcdEMtMjY3LTEzOS45LTI2Ny41LTEzOS4yLTI2Ny41LTEzOC42eiBNLTI2NC0xNDEuM2MtMC40LDAtMC43LDAuMS0xLjEsMC4yYzAsMC43LDAsMSwwLjEsMS41Qy0yNjQuNS0xNDAuMS0yNjQuMy0xNDAuNi0yNjQtMTQxLjN6XCJcblx0XHQvPlxuXHQ8cGF0aCBkPVwiTS0yNTYuMy0xNDJDLTI1Ni4zLTE0Mi0yNTYuMy0xNDItMjU2LjMtMTQyYy0wLjEsMC0wLjEsMC0wLjIsMGMtMC4xLDAtMC4xLDAtMC4yLTAuMmMtMC4xLTAuMi0wLjEtMC42LTAuMS0wLjlcblx0XHRjMC4xLDAsMC4yLDAsMC4zLDBjMC41LDAsMS4yLDAsMS43LTAuMWMwLjEtMC43LDAuMS0xLjIsMC4xLTEuNmMwLDAsMC0wLjEsMC0wLjJjMS4yLDAuMSwxLjQsMC4yLDEuNCwwLjRjMCwwLjEsMCwwLjEtMC4xLDAuMlxuXHRcdGMtMC4xLDAuMi0wLjEsMC4zLTAuMywxLjFjMC40LTAuMSwwLjktMC4yLDEuMS0wLjNjMCwwLDAsMCwwLjEsMGMwLjEsMCwwLjEsMCwwLjIsMC40YzAsMC4yLDAuMSwwLjUsMC4xLDAuNmMwLDAuMSwwLDAuMS0wLjEsMC4xXG5cdFx0Yy0wLjIsMC4xLTAuMiwwLjEtMS42LDAuM2MtMC41LDItMC45LDMuNS0xLjcsNS4zYzAsMC4xLTAuMSwwLjItMC4yLDAuMmMtMC4xLDAtMC41LTAuMS0wLjgtMC4zYy0wLjItMC4xLTAuMi0wLjEtMC4yLTAuMlxuXHRcdGMwLDAsMC0wLjEsMC4xLTAuMmMwLjgtMS40LDEuMy0zLDEuNy00LjZDLTI1NS40LTE0Mi4xLTI1NS43LTE0Mi4xLTI1Ni4zLTE0MnogTS0yNTItMTM4LjJjMC4zLDAuMiwwLjcsMC4zLDEuMywwLjNcblx0XHRjMC42LDAsMS4yLTAuMSwxLjUtMC4yYzAuMSwwLDAuMSwwLDAuMSwwYzAuMSwwLDAuMSwwLDAuMiwwLjFjMC4xLDAuMiwwLjEsMC42LDAuMSwwLjljMCwwLjEsMCwwLjItMC4yLDAuMlxuXHRcdGMtMC4zLDAuMS0wLjksMC4xLTEuNSwwLjFjLTEuMiwwLTItMC4yLTIuNC0wLjdjLTAuMi0wLjItMC4zLTAuNC0wLjQtMC43Yy0wLjEtMC4xLTAuMS0wLjMtMC4xLTAuNGMwLTAuMiwwLjMtMC40LDAuOC0wLjVcblx0XHRDLTI1Mi40LTEzOC42LTI1Mi4zLTEzOC40LTI1Mi0xMzguMnogTS0yNDkuMi0xNDEuMWMtMC4yLDAtMC42LDAtMSwwYy0wLjcsMC0xLjEsMC0xLjksMC4yYzAsMCwwLDAtMC4xLDBjLTAuMSwwLTAuMSwwLTAuMS0wLjFcblx0XHRjMC0wLjEtMC4xLTAuNi0wLjEtMC44YzAtMC4xLDAtMC4yLDAuMS0wLjJjMCwwLDAuMSwwLDAuMy0wLjFjMC43LTAuMSwxLjItMC4yLDEuOS0wLjJjMC42LDAsMC45LDAsMSwwLjFjMCwwLDAuMSwwLjEsMC4xLDAuNVxuXHRcdGMwLDAuMywwLDAuNSwwLDAuNkMtMjQ5LTE0MS4xLTI0OS4xLTE0MS4xLTI0OS4yLTE0MS4xQy0yNDkuMS0xNDEuMS0yNDkuMi0xNDEuMS0yNDkuMi0xNDEuMXpcIi8+XG5cdDxwYXRoIGQ9XCJNMjE2LjctMTQxLjVjLTAuMSwwLTAuMSwwLTAuMiwwLjFjMCwwLTAuMSwwLTAuMSwwYy0wLjIsMC0wLjQtMC40LTAuNS0xLjFjMC4xLDAsMC4yLDAsMC4yLDBjMC40LDAsMS41LTAuMSwyLjEtMC4zXG5cdFx0YzAuMi0wLjksMC4zLTEuNSwwLjMtMmMwLDAsMC0wLjEsMC0wLjJjMC40LDAuMSwwLjgsMC4xLDEuMSwwLjJjMC4yLDAuMSwwLjIsMC4yLDAuMiwwLjJjMCwwLjEsMCwwLjEtMC4xLDAuMlxuXHRcdGMtMC4yLDAuMy0wLjIsMC4zLTAuNSwxLjRjMC4yLDAsMC41LTAuMSwwLjctMC4xYzAuNCwwLDAuNywwLjEsMSwwLjJjMC40LDAuMywwLjYsMC45LDAuNiwxLjhjMCwxLjUtMC4zLDIuOC0wLjcsMy40XG5cdFx0Yy0wLjMsMC40LTAuNywwLjYtMS4zLDAuNmMtMC40LDAtMC43LTAuMS0wLjgtMC4xYy0wLjEtMC4xLTAuMS0wLjEtMC4xLTAuNGMwLTAuMy0wLjEtMC41LTAuMi0wLjhjMC41LDAuMiwwLjcsMC4yLDEsMC4yXG5cdFx0YzAuNSwwLDAuNy0wLjIsMC45LTFjMC4yLTAuNSwwLjItMS4yLDAuMi0yYzAtMC44LTAuMi0xLjEtMC43LTEuMWMtMC4yLDAtMC41LDAtMC43LDAuMWMwLDAuMSwwLDAuMS0wLjEsMC4zXG5cdFx0Yy0wLjMsMS0wLjgsMi40LTEuMywzLjVjLTAuNSwxLjEtMC43LDEuMy0wLjgsMS4zYy0wLjEsMC0wLjMtMC4xLTAuNi0wLjNjLTAuMi0wLjEtMC4zLTAuMi0wLjMtMC4zYzAsMCwwLDAsMC40LTAuN1xuXHRcdGMwLjUtMC45LDEuMy0yLjUsMS41LTMuNUMyMTcuMi0xNDEuNiwyMTYuOC0xNDEuNSwyMTYuNy0xNDEuNXogTTIyMS44LTE0Mi42YzAtMC4xLDAuMS0wLjIsMC40LTAuNGMwLjItMC4xLDAuMy0wLjIsMC40LTAuMlxuXHRcdGMwLjEsMCwwLjEsMCwwLjIsMC4yYzAuNiwwLjYsMS4xLDEuMywxLjUsMmMwLjEsMC4yLDAuMiwwLjQsMC4yLDAuNGMwLDAuMSwwLDAuMS0wLjQsMC40Yy0wLjIsMC4yLTAuNCwwLjMtMC41LDAuM1xuXHRcdGMtMC4xLDAtMC4xLDAtMC4yLTAuMmMtMC4yLTAuNS0wLjQtMC45LTAuNi0xLjJjLTAuMy0wLjQtMC4zLTAuNS0wLjktMS4xQzIyMS45LTE0Mi42LDIyMS44LTE0Mi42LDIyMS44LTE0Mi42elwiLz5cblx0PHBhdGggZD1cIk0yMjguNC0xNDMuMWMwLTAuMywwLTAuNywwLTAuOWMwLjUsMC4xLDAuOCwwLjEsMS4xLDAuMmMwLjIsMC4xLDAuMywwLjEsMC4zLDAuM2MwLDAuMSwwLDAuMSwwLDAuMlxuXHRcdGMtMC4xLDAuMy0wLjIsMC43LTAuMiwxLjZjMCwxLjMsMC4xLDIuMSwwLjMsMi43YzAuMSwwLjUsMC40LDAuNywwLjYsMC43YzAuNCwwLDAuOC0wLjUsMS4xLTEuNmMwLjIsMC41LDAuMywwLjcsMC41LDFcblx0XHRjMCwwLjEsMC4xLDAuMSwwLjEsMC4yYzAsMC4yLTAuMiwwLjUtMC4zLDAuOGMtMC40LDAuNi0wLjksMC45LTEuNCwwLjljLTAuOCwwLTEuMy0wLjYtMS43LTEuOWMtMC4yLTAuOC0wLjMtMS44LTAuMy0zLjJWLTE0My4xelxuXHRcdCBNMjM0LjQtMTQyLjljMC4xLDAsMC4xLDAsMC4yLDAuMWMwLjUsMC41LDEsMS4zLDEuMywyLjFjMC4yLDAuNSwwLjQsMS4yLDAuNCwxLjVjMCwwLjEsMCwwLjEtMC4zLDAuM2MtMC4yLDAuMS0wLjcsMC4zLTAuOCwwLjNcblx0XHRjLTAuMSwwLTAuMS0wLjEtMC4yLTAuMmMtMC4xLTAuOC0wLjMtMS4zLTAuNi0yYy0wLjMtMC42LTAuMy0wLjYtMS0xLjRDMjMzLjktMTQyLjgsMjM0LjMtMTQyLjksMjM0LjQtMTQyLjl6XCIvPlxuXHQ8cGF0aCBkPVwiTTI1My44LTE0NC44YzAuMiwwLjEsMC4zLDAuMSwwLjMsMC4yYzAsMC4xLDAsMC4xLTAuMSwwLjJjLTAuMSwwLjMtMC4yLDAuOC0wLjIsMS41Yy0wLjEsMS42LTAuMSwyLjktMC4xLDMuOVxuXHRcdGMwLDAuMywwLDAuNiwwLjEsMC43YzAuMSwwLjMsMC41LDAuNSwxLDAuNWMwLjksMCwxLjgtMC40LDIuNS0xLjFjMC40LTAuMywwLjYtMC42LDEtMS4yYzAuMSwwLjMsMC4xLDAuNSwwLjQsMVxuXHRcdGMwLDAuMSwwLjEsMC4xLDAuMSwwLjJjMCwwLjItMC4yLDAuNC0wLjcsMC45Yy0xLDAuOS0yLjEsMS40LTMuMiwxLjRjLTAuOCwwLTEuMy0wLjItMS43LTAuNmMtMC40LTAuNC0wLjUtMC45LTAuNS0xLjlcblx0XHRjMC0wLjgsMC0xLjQsMC4xLTMuN2MwLTAuMywwLTAuNiwwLTAuNmMwLTAuOSwwLTEuMS0wLjEtMS41QzI1My4xLTE0NC45LDI1My41LTE0NC45LDI1My44LTE0NC44elwiLz5cblx0PHBhdGggZD1cIk0yNjcuOS0xNDIuMWMxLDAsMS43LDAuNywxLjcsMS43YzAsMC42LTAuMywxLjEtMC43LDEuM2MtMC4zLDAuMi0wLjgsMC4zLTEuMywwLjNjLTAuMywwLTAuNSwwLTAuNi0wLjFcblx0XHRjLTAuMSwwLTAuMS0wLjEtMC4xLTAuMmMwLTAuMy0wLjEtMC41LTAuMy0wLjhjMC41LDAuMSwwLjgsMC4yLDEuMSwwLjJjMC42LDAsMC45LTAuMywwLjktMC43YzAtMC40LTAuMy0wLjctMC44LTAuN1xuXHRcdGMtMC40LDAtMC45LDAuMi0yLjIsMC43YzAuOCwyLjEsMS4zLDMuNSwxLjMsMy42YzAsMC4xLTAuMSwwLjEtMC4zLDAuMmMtMC4zLDAuMS0wLjUsMC4yLTAuNiwwLjJjLTAuMSwwLTAuMSwwLTAuMS0wLjFcblx0XHRjLTAuMi0xLTAuNS0xLjktMS4yLTMuNWMwLDAsMCwwLTAuMSwwYy0wLjMsMC4yLTAuNiwwLjMtMC44LDAuNWMtMC4xLDAuMS0wLjIsMC4xLTAuMywwLjFjLTAuMSwwLTAuMi0wLjEtMC4zLTAuMlxuXHRcdGMtMC4xLTAuMS0wLjQtMC42LTAuNS0wLjhjMC41LTAuMSwwLjktMC4yLDEuNS0wLjVjLTAuMy0wLjYtMC41LTEtMC44LTEuNGMwLjUtMC4yLDAuOS0wLjMsMS4xLTAuM2MwLjIsMCwwLjIsMC4xLDAuMiwwLjJcblx0XHRjMCwwLjMsMCwwLjMsMC40LDEuMWMwLjUtMC4yLDAuOC0wLjMsMS40LTAuNWMwLDAsMCwwLDAtMC4xYy0wLjItMC4zLTAuNC0wLjUtMC43LTAuOGMwLDAtMC4xLTAuMS0wLjEtMC4xYzAtMC4xLDAtMC4xLDAuMi0wLjNcblx0XHRjMC4yLTAuMiwwLjQtMC4zLDAuNC0wLjNjMC4yLDAsMC45LDAuNywwLjksMC45YzAsMC4xLTAuMiwwLjMtMC41LDAuNUMyNjcuMy0xNDIuMSwyNjcuNi0xNDIuMSwyNjcuOS0xNDIuMXpcIi8+XG5cdDxwYXRoIGQ9XCJNLTEyOSwyOTEuM2MxLjYsMCwzLjUtMC4yLDUuMy0wLjdjMC4xLDAsMC4yLDAsMC4yLDBjMC4xLDAsMC4yLDAuMSwwLjIsMC4zYzAuMSwwLjQsMC4xLDEuMSwwLjEsMS43YzAsMC40LDAsMC41LTAuMiwwLjZcblx0XHRjLTAuNiwwLjMtMy4zLDAuNi01LjYsMC42Yy0zLDAtNC43LTAuNS02LjEtMS44Yy0wLjctMC42LTEuMy0xLjctMS4zLTIuMWMwLTAuMywwLjItMC40LDEuOC0xLjRcblx0XHRDLTEzMy45LDI5MC41LTEzMi4zLDI5MS4zLTEyOSwyOTEuM3ogTS0xMjguOCwyNzkuOGMxLjIsMCwxLjgsMCwzLjItMC4yYzAsMCwwLjEsMCwwLjEsMGMwLjIsMCwwLjIsMC4xLDAuMywwLjJcblx0XHRjMCwwLjIsMC4xLDAuOCwwLjEsMS42YzAsMC41LDAsMC42LTAuMiwwLjdjLTAuMiwwLjEtMS45LDAuMi0zLjIsMC4yYy0xLjgsMC0zLjMtMC4xLTQuOS0wLjVjLTEuMS0wLjItMS4yLTAuMy0xLjItMVxuXHRcdGMwLTAuNSwwLTEuMiwwLjEtMS44Qy0xMzIuOCwyNzkuNi0xMzAuOSwyNzkuOC0xMjguOCwyNzkuOHpcIi8+XG5cdDxwYXRoIGQ9XCJNLTEwOS42LDI5MC40Yy0xLDEuNy0yLjMsMi42LTMuNiwyLjZjLTIuMSwwLTMuNi0yLTMuNi00LjljMC0zLjIsMS42LTUuOSw0LjMtNy4zYzEuMy0wLjcsMi44LTEsNC43LTFcblx0XHRjNC4yLDAsNy4zLDMsNy4zLDYuOWMwLDMuNS0xLjcsNi01LDcuNGMtMC43LDAuMy0xLjIsMC40LTEuNCwwLjRjLTAuMiwwLTAuMy0wLjEtMC42LTAuNWMtMC4zLTAuNS0wLjctMC45LTEuMy0xLjNcblx0XHRjNC4xLTEuMSw2LTMsNi02LjJjMC0xLjctMC43LTMuMS0xLjktMy45Yy0wLjctMC41LTEuMy0wLjctMi40LTAuOUMtMTA3LjcsMjg2LTEwOC4zLDI4OC4zLTEwOS42LDI5MC40eiBNLTExMi40LDI4My4zXG5cdFx0Yy0xLjMsMS4yLTIuMSwyLjktMi4xLDQuN2MwLDEuNSwwLjUsMi40LDEuMywyLjRjMSwwLDItMS40LDIuOC0zLjhjMC41LTEuNSwwLjctMi42LDEtNC45Qy0xMTAuOCwyODIuMS0xMTEuNSwyODIuNS0xMTIuNCwyODMuM3pcIlxuXHRcdC8+XG5cdDxwYXRoIGQ9XCJNLTkwLjYsMjgzLjdjMS0xLjEsMS4yLTEuMywxLjUtMS42YzAuNC0wLjMsMC43LTAuNCwxLjMtMC40YzAuNiwwLDAuOSwwLjEsMS40LDAuNGMwLjMsMC4yLDAuMywwLjIsMS42LDEuNVxuXHRcdGMxLjMsMS4zLDMuMSwzLDQuNiw0LjFjMSwwLjgsMS42LDEuMiwyLjksMmMwLjIsMC4xLDAuMywwLjIsMC4zLDAuM2MwLDAuMS0wLjIsMC41LTAuNiwxLjJjLTAuNSwwLjgtMC43LDEuMS0wLjksMS4xXG5cdFx0Yy0wLjEsMC0wLjIsMC0wLjMtMC4xYy0yLjUtMS44LTQuOS0zLjktNy42LTYuOGMtMS0xLjEtMS4xLTEuMS0xLjQtMS4xYy0wLjIsMC0wLjQsMC4xLTAuNiwwLjNjLTAuMiwwLjItMS40LDEuOC0yLjEsMi43XG5cdFx0Yy0wLjUsMC43LTAuNSwwLjctMSwxLjJjLTAuMywwLjMtMC40LDAuNC0wLjUsMC42Yy0wLjEsMC4yLTAuMiwwLjMtMC40LDAuM2MtMC4yLDAtMC42LTAuMy0xLjEtMC44Yy0wLjMtMC40LTAuNS0wLjYtMS0xLjNcblx0XHRDLTkzLjQsMjg2LjktOTIuNywyODYuMS05MC42LDI4My43eiBNLTc4LjgsMjgxLjhjMCwxLjItMC45LDIuMS0yLjEsMi4xYy0xLjIsMC0yLjEtMC45LTIuMS0yLjFzMC45LTIuMSwyLjEtMi4xXG5cdFx0Qy03OS44LDI3OS43LTc4LjgsMjgwLjYtNzguOCwyODEuOHogTS04MiwyODEuOGMwLDAuNiwwLjUsMS4xLDEuMSwxLjFjMC42LDAsMS4xLTAuNSwxLjEtMS4xcy0wLjUtMS4xLTEuMS0xLjFcblx0XHRDLTgxLjUsMjgwLjgtODIsMjgxLjItODIsMjgxLjh6XCIvPlxuXHQ8cGF0aCBkPVwiTS02NC42LDI4NS4yYzMuNywwLDUuOCwwLDcuOC0wLjJjMC4xLDAsMC4yLDAsMC4zLDBjMC42LDAsMC42LDAsMC42LDEuNmMwLDAuOC0wLjEsMS0wLjQsMWMwLDAtMC4xLDAtMC4xLDBcblx0XHRjLTEuMy0wLjEtMi4xLTAuMS03LjgtMC4xYy0yLjEsMC0zLjIsMC01LDAuMWMtMC4xLDAtMC4zLDAtMC42LDBjLTAuNiwwLTAuNywwLTEuMSwwLjFjLTAuMSwwLTAuMiwwLTAuMiwwYy0wLjIsMC0wLjQtMC4xLTAuNC0wLjNcblx0XHRjLTAuMS0wLjUtMC4yLTEuNS0wLjItMi40Qy03MC4yLDI4NS4xLTY4LjgsMjg1LjItNjQuNiwyODUuMnpcIi8+XG5cdDxwYXRoIGQ9XCJNLTQ0LjMsMjg2LjljLTAuMywwLjQtMC40LDAuNS0wLjUsMC41Yy0wLjEsMC0wLjEsMC0xLTAuNmMtMC43LTAuNS0xLjYtMC45LTMtMS40Yy0wLjMtMC4xLTAuNC0wLjItMC40LTAuM1xuXHRcdGMwLTAuMSwwLjItMC40LDAuNS0xYzAuMS0wLjIsMC4yLTAuMywwLjItMC40YzAuMi0wLjQsMC4zLTAuNSwwLjUtMC41YzAuMywwLDEuOCwwLjYsMi45LDEuMWMwLjYsMC4zLDEuNCwwLjcsMS41LDAuOVxuXHRcdGMwLjEsMC4xLDAuMSwwLjEsMC4xLDAuMkMtNDMuNSwyODUuNi00My44LDI4Ni4xLTQ0LjMsMjg2Ljl6IE0tMzQsMjg0LjZjMC4xLDAuMiwwLjEsMC4zLDAuMSwwLjRjMCwwLjMtMC4xLDAuNC0wLjUsMC44XG5cdFx0Yy0xLjcsMS44LTMuNCwzLjMtNS40LDQuN2MtMS43LDEuMi0zLjcsMi4yLTUuNywzLjFjLTAuNiwwLjItMC44LDAuMy0xLDAuNWMtMC4yLDAuMS0wLjIsMC4yLTAuMywwLjJjLTAuNCwwLTEuMS0xLjEtMS43LTIuN1xuXHRcdGMxLjktMC4zLDQuMi0xLjMsNi41LTIuN2MxLjQtMC45LDMuMi0yLjIsNC40LTMuM2MxLjEtMSwxLjctMS44LDIuOS0zLjRDLTM0LjUsMjgzLjItMzQuNCwyODMuNS0zNCwyODQuNnogTS00Mi40LDI4Mi45XG5cdFx0Yy0wLjMsMC4zLTAuNCwwLjQtMC41LDAuNGMtMC4xLDAtMC4yLDAtMC4zLTAuMmMtMS4yLTEuMS0yLjQtMS44LTMuNy0yLjNjLTAuMi0wLjEtMC4zLTAuMi0wLjMtMC4zYzAtMC4xLDAtMC4xLDAuMS0wLjNcblx0XHRjMS0xLjUsMS0xLjUsMS4yLTEuNWMwLjQsMCwyLjEsMC44LDMuMiwxLjZjMSwwLjYsMS4yLDAuOCwxLjIsMUMtNDEuNCwyODEuNS00MS45LDI4Mi4zLTQyLjQsMjgyLjl6IE0tMzUuNywyODEuNlxuXHRcdGMtMC41LTAuOC0wLjktMS40LTEuNS0yYy0wLjEtMC4xLTAuMS0wLjEtMC4xLTAuMmMwLTAuMSwwLjEtMC4zLDAuNS0wLjVjMC4zLTAuMiwwLjQtMC4zLDAuNi0wLjNjMC4yLDAsMC40LDAuMiwwLjksMC43XG5cdFx0YzAuNiwwLjcsMS4xLDEuMywxLjEsMS41YzAsMC4yLTAuOSwwLjktMS4yLDAuOUMtMzUuNiwyODEuOC0zNS43LDI4MS43LTM1LjcsMjgxLjZ6IE0tMzIuOSwyODAuMWMtMC4zLDAuMi0wLjQsMC4zLTAuNSwwLjNcblx0XHRjLTAuMSwwLTAuMSwwLTAuMi0wLjJjLTAuNS0wLjktMC45LTEuMy0xLjUtMmMtMC4xLTAuMS0wLjEtMC4xLTAuMS0wLjFjMC0wLjIsMC44LTAuNywxLTAuN2MwLjIsMCwwLjQsMC4yLDAuOCwwLjdcblx0XHRjMC42LDAuNiwxLjEsMS4zLDEuMSwxLjVDLTMyLjMsMjc5LjctMzIuNSwyNzkuOC0zMi45LDI4MC4xelwiLz5cblx0PHBhdGggZD1cIk0tMjIuMSwyODkuOGMwLjEsMC4xLDAuMSwwLjEsMC4xLDAuMmMwLDAuMSwwLDAuMS0wLjMsMWMtMC40LDEuMi0wLjcsMi4yLTAuOCwzYzAsMC4zLTAuMSwwLjQtMC40LDAuNFxuXHRcdGMtMC4zLDAuMS0wLjgsMC4xLTEuMywwLjFjLTAuMiwwLTAuMywwLTAuNC0wLjJjLTAuMi0wLjQtMC41LTEuOC0wLjctMi45Yy0wLjEtMC45LTAuMi0xLjktMC4yLTIuOWMwLTIuMywwLjMtNC41LDEtOC40XG5cdFx0YzAuMS0wLjYsMC4yLTAuOSwwLjItMS42YzAuOSwwLjEsMS42LDAuMywyLjEsMC42YzAuMywwLjIsMC40LDAuMywwLjQsMC41YzAsMC4xLDAsMC4yLTAuMSwwLjRjLTAuOCwxLjQtMS42LDUuNy0xLjYsOC45XG5cdFx0YzAsMC41LDAsMS4yLDAuMSwyLjJjMC41LTEuMiwwLjctMS44LDEuMS0yLjhDLTIyLjcsMjg5LTIyLjUsMjg5LjItMjIuMSwyODkuOHogTS0xOC44LDI4NC41Yy0xLDAtMS4yLDAtMS4yLTAuM1xuXHRcdGMtMC4xLTAuMi0wLjEtMC44LTAuMS0xLjNjMC0wLjIsMC0wLjMsMC0wLjdjMC41LDAsMC45LDAuMSwxLjUsMC4xYzEuMSwwLDEuOCwwLDIuOC0wLjFjMC0yLjUsMC0yLjktMC4yLTMuOGMxLDAsMS43LDAuMSwyLjQsMC4zXG5cdFx0YzAuMywwLjEsMC40LDAuMiwwLjQsMC40YzAsMC4xLDAsMC4xLTAuMSwwLjNjLTAuMiwwLjUtMC4zLDEuMi0wLjMsMi42YzAuNy0wLjEsMS40LTAuMiwyLjYtMC41YzAuMSwwLDAuMSwwLDAuMiwwXG5cdFx0YzAuMSwwLDAuMiwwLjEsMC4yLDAuMmMwLDAuMiwwLjEsMC45LDAuMSwxLjRjMCwwLjUsMCwwLjYtMC4yLDAuN2MtMC4zLDAuMi0xLjIsMC4zLTIuOSwwLjVjMCwxLjQsMC4xLDMuNywwLjMsNVxuXHRcdGMxLjMsMC41LDIuMSwxLDMsMS42YzAuNiwwLjQsMC43LDAuNSwwLjcsMC43YzAsMC4yLTAuNCwwLjktMC44LDEuNWMtMC4yLDAuMy0wLjQsMC40LTAuNSwwLjRjLTAuMSwwLTAuMSwwLTAuNi0wLjRcblx0XHRjLTAuNC0wLjQtMC45LTAuOC0xLjgtMS40YzAsMC4xLDAsMC4xLDAsMC4yYzAsMS44LTEuNSwyLjktMy43LDIuOWMtMi4zLDAtMy43LTEuMi0zLjctM2MwLTEuOCwxLjUtMy4xLDMuNS0zLjFcblx0XHRjMC43LDAsMS4xLDAsMS43LDAuMWMtMC4xLTEuNi0wLjEtMS42LTAuMS00LjJDLTE2LjYsMjg0LjUtMTgsMjg0LjUtMTguOCwyODQuNXogTS0xNy4xLDI5MC40Yy0xLDAtMS43LDAuNS0xLjcsMS4yXG5cdFx0YzAsMC42LDAuNiwxLDEuNiwxYzEuMSwwLDEuNi0wLjUsMS42LTEuNGMwLTAuMywwLTAuNSwwLTAuNUMtMTYuMSwyOTAuNS0xNi42LDI5MC40LTE3LjEsMjkwLjR6XCIvPlxuXHQ8cGF0aCBkPVwiTTAuMSwyOTAuM2MtMC40LDIuMi0xLDMuNi0yLjQsNWMtMC42LTAuNi0xLjEtMS0xLjktMS41YzEuNy0xLjQsMi40LTMuNSwyLjQtNy4zYzAtMC44LDAtMS4yLTAuMS0xLjdcblx0XHRjMC42LDAuMSwwLjksMC4xLDEuOSwwLjFoMTAuMWMxLjEsMCwxLjMsMCwxLjktMC4xYy0wLjEsMC41LTAuMSwwLjktMC4xLDEuN3YyLjhjMCwwLjksMCwxLjQsMC4xLDJIOS44di0xSDAuMXogTTMuNywyNzlcblx0XHRjMC0wLjcsMC0xLjEtMC4xLTEuNUg2Yy0wLjEsMC40LTAuMSwwLjgtMC4xLDEuNXYwLjFoNS40YzEsMCwxLjgsMCwyLjMtMC4xdjJjLTAuNy0wLjEtMS4zLTAuMS0yLjItMC4xSDUuOXYxLjJoNC41XG5cdFx0YzEsMCwxLjYsMCwyLTAuMXYxLjljLTAuNi0wLjEtMS4yLTAuMS0yLjEtMC4xSC0wLjRjLTAuOSwwLTEuNCwwLTIsMC4xVjI4MmMwLjQsMC4xLDEsMC4xLDIsMC4xaDQuMXYtMS4yaC00LjljLTEsMC0xLjcsMC0yLjMsMC4xXG5cdFx0di0yYzAuNSwwLjEsMS4yLDAuMSwyLjMsMC4xaDQuOFYyNzl6IE0zLjksMjg4LjZ2LTEuOUgwLjNjMCwwLjgsMCwxLjMtMC4xLDEuOUgzLjl6IE05LjgsMjg4LjZ2LTEuOUg2djEuOUg5Ljh6XCIvPlxuXHQ8cGF0aCBkPVwiTTIxLjYsMjg1LjRjLTAuMiwwLTAuMiwwLjEtMC40LDAuMWMtMC4xLDAuMS0wLjIsMC4xLTAuMiwwLjFjLTAuNCwwLTAuOC0wLjgtMS0yLjJjMC4yLDAsMC4zLDAsMC40LDBjMC44LDAsMy0wLjMsNC4zLTAuNVxuXHRcdGMwLjQtMS43LDAuNi0zLjEsMC42LTRjMC0wLjEsMC0wLjIsMC0wLjNjMC45LDAuMSwxLjcsMC4zLDIuMiwwLjVjMC4zLDAuMSwwLjUsMC4zLDAuNSwwLjVjMCwwLjEsMCwwLjItMC4xLDAuM1xuXHRcdGMtMC4zLDAuNS0wLjMsMC41LTAuOSwyLjdjMC41LTAuMSwxLTAuMSwxLjQtMC4xYzAuOCwwLDEuNSwwLjIsMS45LDAuNWMwLjgsMC42LDEuMiwxLjgsMS4yLDMuNmMwLDMtMC41LDUuNS0xLjUsNi44XG5cdFx0Yy0wLjYsMC45LTEuNSwxLjMtMi43LDEuM2MtMC43LDAtMS40LTAuMS0xLjYtMC4yYy0wLjItMC4xLTAuMi0wLjEtMC4yLTAuOGMtMC4xLTAuNS0wLjItMS0wLjQtMS42YzEsMC40LDEuMywwLjQsMS45LDAuNFxuXHRcdGMxLDAsMS40LTAuNSwxLjgtMi4xYzAuMy0xLjEsMC41LTIuNCwwLjUtMy45YzAtMS42LTAuNC0yLjEtMS40LTIuMWMtMC40LDAtMC45LDAuMS0xLjQsMC4xYy0wLjEsMC4yLTAuMSwwLjMtMC4yLDAuNVxuXHRcdGMtMC42LDIuMS0xLjYsNC43LTIuNiw2LjljLTEuMSwyLjItMS4zLDIuNi0xLjYsMi42Yy0wLjIsMC0wLjctMC4zLTEuMy0wLjdjLTAuNS0wLjMtMC42LTAuNC0wLjYtMC42YzAtMC4xLDAtMC4xLDAuOC0xLjRcblx0XHRjMS4xLTEuNywyLjUtNSwzLTdDMjIuNiwyODUuMiwyMS43LDI4NS4zLDIxLjYsMjg1LjR6IE0zNC4xLDI4MS4zYy0wLjMsMC4yLTAuNSwwLjMtMC42LDAuM2MtMC4xLDAtMC4xLDAtMC4yLTAuMVxuXHRcdGMtMC40LTAuNy0xLjEtMS41LTEuNy0yYzAsMC0wLjEtMC4xLTAuMS0wLjFjMC0wLjEsMC4xLTAuMiwwLjUtMC41YzAuMy0wLjIsMC40LTAuMywwLjYtMC4zYzAuMywwLDIuMSwxLjgsMi4xLDIuMVxuXHRcdEMzNC43LDI4MC45LDM0LjUsMjgxLDM0LjEsMjgxLjN6IE0zMiwyODMuNGMwLTAuMSwwLjItMC4zLDAuOC0wLjhjMC40LTAuMywwLjYtMC40LDAuOC0wLjRjMC4zLDAsMS4yLDEsMiwyLjFcblx0XHRjMC43LDEsMS41LDIuNCwxLjUsMi44YzAsMC4yLTAuMSwwLjMtMC43LDAuOGMtMC40LDAuMy0wLjksMC42LTEsMC42Yy0wLjEsMC0wLjItMC4xLTAuMy0wLjRjLTAuNC0xLTAuNy0xLjYtMS4zLTIuNVxuXHRcdGMtMC41LTAuOS0wLjYtMC45LTEuNS0xLjlDMzIsMjgzLjYsMzIsMjgzLjUsMzIsMjgzLjR6IE0zNC42LDI3Ny4zYzAuMywwLDIsMS43LDIsMmMwLDAuMS0wLjEsMC4yLTAuNSwwLjVcblx0XHRjLTAuNCwwLjMtMC41LDAuNC0wLjYsMC40Yy0wLjEsMC0wLjEsMC0wLjUtMC42Yy0wLjMtMC41LTEtMS4xLTEuMy0xLjRjLTAuMS0wLjEtMC4xLTAuMS0wLjEtMC4yXG5cdFx0QzMzLjYsMjc3LjksMzQuNCwyNzcuMywzNC42LDI3Ny4zelwiLz5cblx0PHBhdGggZD1cIk01MC4yLDI3OS41YzAtMC45LDAtMS40LTAuMS0xLjloMi40Yy0wLjEsMC42LTAuMSwxLTAuMSwxLjl2NC4yaDQuMXYtMy4xYzAtMC42LDAtMS0wLjEtMS41aDIuM2MtMC4xLDAuNi0wLjEsMS0wLjEsMS43XG5cdFx0djMuOGMwLDAuNSwwLDAuOSwwLjEsMS4yYy0wLjQsMC0wLjktMC4xLTEuNC0wLjFoLTQuOXY2LjNoNC43di0zLjJjMC0wLjcsMC0xLjItMC4xLTEuN2gyLjNjLTAuMSwwLjUtMC4xLDEuMS0wLjEsMS44djQuMVxuXHRcdGMwLDAuOSwwLDEuNCwwLjEsMS45aC0yLjJ2LTFINDUuN3YxaC0yLjNjMC4xLTAuNiwwLjEtMS4xLDAuMS0xLjl2LTRjMC0wLjgsMC0xLjMtMC4xLTEuOGgyLjNjLTAuMSwwLjUtMC4xLDAuOS0wLjEsMS42djMuMWg0LjVcblx0XHR2LTYuM2gtNC42Yy0wLjUsMC0xLDAtMS40LDAuMWMwLTAuNSwwLjEtMC44LDAuMS0xLjJ2LTMuOGMwLTAuNywwLTEuMi0wLjEtMS43aDIuM2MtMC4xLDAuNC0wLjEsMC45LTAuMSwxLjV2My4xaDMuOFYyNzkuNXpcIi8+XG5cdDxwYXRoIGQ9XCJNNzIuNiwyODVjMC0xLDAtMS0wLjEtMi4yYy0wLjIsMC0wLjQsMC0wLjQsMGMtMS4zLDAtMy0wLjEtMy43LTAuM2MtMC4yLTAuMS0wLjItMC4xLTAuMi0wLjNjMC0wLjQsMC4xLTEsMC4yLTEuOFxuXHRcdGMxLjEsMC4yLDIuNSwwLjQsMy43LDAuNGMwLjEsMCwwLjMsMCwwLjUsMHYtMS4zYzAtMC43LDAtMS0wLjEtMS43YzEsMC4xLDEuNywwLjEsMi4yLDAuMmMwLjQsMC4xLDAuNSwwLjIsMC41LDAuNFxuXHRcdGMwLDAuMSwwLDAuMS0wLjIsMC41Yy0wLjEsMC4zLTAuMiwwLjQtMC4yLDEuOGMxLjItMC4xLDIuMi0wLjMsMy4xLTAuNmMwLjEsMCwwLjEsMCwwLjEsMGMwLjEsMCwwLjEsMCwwLjQsMC43XG5cdFx0YzAuMSwwLjQsMC4zLDAuOSwwLjMsMS4xYzAsMC4xLTAuMSwwLjItMC4zLDAuM2MtMC43LDAuMi0yLjQsMC41LTMuNiwwLjdjMCwxLjQsMCwxLjUsMCwyLjJjMS40LTAuMiwyLjItMC40LDMuNy0xXG5cdFx0YzAuMSwwLDAuMS0wLjEsMC4yLTAuMWMwLjEsMCwwLjIsMC4xLDAuNCwwLjVjMC4yLDAuNSwwLjQsMS4xLDAuNCwxLjNjMCwwLjEtMC4xLDAuMi0wLjIsMC4yYy0xLjEsMC40LTMuMSwwLjktNC40LDFcblx0XHRjMCwwLjgsMC4xLDEuMiwwLjIsMi43YzEuMSwwLjMsMS42LDAuNSwyLjQsMWMxLDAuNSwxLjUsMC44LDIuMywxLjVjMC4yLDAuMSwwLjIsMC4yLDAuMiwwLjRjMCwwLjEtMC4yLDAuNS0wLjYsMS4xXG5cdFx0Yy0wLjQsMC43LTAuNywwLjktMC44LDAuOWMtMC4xLDAtMC4xLDAtMC4yLTAuMWMtMS4yLTEuMS0yLTEuNy0zLjMtMi40Yy0wLjEsMS0wLjMsMS41LTAuOCwyYy0wLjcsMC43LTEuOCwxLTMuMiwxXG5cdFx0Yy0yLjUsMC00LTEuMS00LTIuOGMwLTAuOCwwLjMtMS41LDAuOS0yYzAuOC0wLjcsMi0xLjEsMy41LTEuMWMwLjUsMCwwLjksMCwxLjQsMC4xYy0wLjEtMS4zLTAuMS0xLjgtMC4yLTIuMmMtMC41LDAtMC43LDAtMSwwXG5cdFx0Yy0xLjQsMC0zLjEtMC4yLTQtMC41Yy0wLjItMC4xLTAuMy0wLjItMC4zLTAuM2MwLTAuMywwLjEtMC45LDAuMy0xLjhjMS4yLDAuMywyLjgsMC41LDQuMywwLjVjMCwwLDAuMSwwLDAuNCwwSDcyLjZ6IE03MS4yLDI5MS4xXG5cdFx0Yy0xLjMsMC0yLDAuNC0yLDEuMWMwLDAuNiwwLjYsMC45LDEuNywwLjljMS4zLDAsMS45LTAuNSwxLjktMS41YzAtMC4xLDAtMC4zLDAtMC4zQzcyLjMsMjkxLjEsNzEuOSwyOTEuMSw3MS4yLDI5MS4xelwiLz5cblx0PHBhdGggZD1cIk05NC4yLDI4Mi43Yy00LjQsMC4zLTYuMSwwLjUtNy4zLDAuOGMtMC4xLDAtMC4yLDAtMC4yLDBjLTAuMSwwLTAuMy0wLjEtMC4zLTAuM2MtMC4yLTAuNS0wLjMtMS4yLTAuMy0yLjJcblx0XHRjMC4yLDAsMC40LDAsMC41LDBjMC42LDAsMS4yLDAsMy4yLTAuMWMxLjUtMC4xLDIuNy0wLjEsNC41LTAuMmMwLTEuOCwwLTIuMS0wLjItM2MxLjUsMCwyLjMsMC4xLDIuNiwwLjJjMC4xLDAuMSwwLjIsMC4yLDAuMiwwLjRcblx0XHRjMCwwLDAsMC4xLTAuMSwwLjJjLTAuMiwwLjQtMC4yLDAuOS0wLjMsMi4xYzIuOS0wLjEsMy40LTAuMSw1LjQtMC4xYzAuNSwwLDAuNiwwLDAuNywwLjFjMC4xLDAuMSwwLjEsMC40LDAuMSwxLjFcblx0XHRjMCwwLjksMCwxLTAuMywxYzAsMCwwLDAtMC4xLDBjLTAuOS0wLjEtMy0wLjItNC40LTAuMmMtMC41LDAtMC41LDAtMS41LDBsMCwzLjNjMC4zLDAuNywwLjQsMS4yLDAuNCwyLjJjMCwyLjUtMC45LDQuNC0yLjksNS44XG5cdFx0Yy0wLjgsMC42LTEuOCwxLjEtMi4yLDEuMWMtMC4yLDAtMC4zLTAuMS0wLjQtMC4yYy0wLjYtMC42LTEtMS0xLjctMS40YzEuMi0wLjMsMS44LTAuNiwyLjYtMS4xYzAuNi0wLjQsMS4xLTAuOCwxLjUtMS4yXG5cdFx0YzAuMy0wLjMsMC41LTAuNiwwLjgtMS4zYy0wLjYsMC42LTEuMSwwLjgtMS44LDAuOGMtMS43LDAtMi44LTEuMy0yLjgtMy4yYzAtMiwxLjMtMy41LDMuMS0zLjVjMC42LDAsMC45LDAuMSwxLjMsMC4zVjI4Mi43elxuXHRcdCBNOTEuOCwyODcuNGMwLDAuOCwwLjUsMS40LDEuMiwxLjRjMC44LDAsMS4yLTAuNSwxLjItMS41YzAtMC45LTAuNC0xLjUtMS4yLTEuNUM5Mi4zLDI4NS45LDkxLjgsMjg2LjUsOTEuOCwyODcuNHpcIi8+XG5cdDxwYXRoIGQ9XCJNLTAuNywyNzAuN2MwLjgsMCwxLjctMC4xLDIuNi0wLjNjMCwwLDAuMSwwLDAuMSwwYzAuMSwwLDAuMSwwLDAuMSwwLjFjMCwwLjIsMCwwLjUsMCwwLjljMCwwLjIsMCwwLjMtMC4xLDAuM1xuXHRcdGMtMC4zLDAuMi0xLjYsMC4zLTIuOCwwLjNjLTEuNSwwLTIuNC0wLjItMy4xLTAuOWMtMC4zLTAuMy0wLjctMC44LTAuNy0xLjFjMC0wLjIsMC4xLTAuMiwwLjktMC43Qy0zLjIsMjcwLjMtMi4zLDI3MC43LTAuNywyNzAuN1xuXHRcdHogTS0wLjYsMjY0LjljMC42LDAsMC45LDAsMS42LTAuMWMwLDAsMC4xLDAsMC4xLDBjMC4xLDAsMC4xLDAsMC4xLDAuMWMwLDAuMSwwLDAuNCwwLDAuOGMwLDAuMiwwLDAuMy0wLjEsMC40XG5cdFx0Yy0wLjEsMC0xLDAuMS0xLjYsMC4xYy0wLjksMC0xLjYtMC4xLTIuNS0wLjJjLTAuNi0wLjEtMC42LTAuMS0wLjYtMC41YzAtMC4yLDAtMC42LDAuMS0wLjlDLTIuNiwyNjQuOC0xLjcsMjY0LjktMC42LDI2NC45elwiLz5cblx0PHBhdGggZD1cIk0xMC4yLDI2OWMwLjItMC4xLDAuNC0wLjEsMC42LTAuMWMwLjcsMCwxLDAuNCwxLjEsMS40YzAuMSwwLjYsMC4xLDAuNywwLjIsMC44YzAuMSwwLjEsMC4zLDAuMiwwLjcsMC4yXG5cdFx0YzAuNSwwLDAuNywwLDEuNS0wLjNjMCwwLDAsMCwwLjEsMGMwLjEsMCwwLjEsMCwwLjEsMC4xYzAuMSwwLjIsMC4xLDAuNywwLjEsMWMwLDAuMSwwLDAuMS0wLjEsMC4yYy0wLjMsMC4xLTEuMiwwLjEtMS44LDAuMVxuXHRcdGMtMC45LDAtMS4zLTAuMi0xLjYtMC42Yy0wLjItMC4zLTAuMi0wLjYtMC4zLTEuMmMtMC4xLTAuOC0wLjItMS0wLjYtMWMtMC40LDAtMC42LDAuMi0xLjIsMC44Yy0wLjYsMC42LTEuMSwxLjItMS40LDEuN1xuXHRcdGMtMC4xLDAuMS0wLjEsMC4yLTAuMiwwLjJjLTAuMSwwLTAuMS0wLjEtMC41LTAuNGMtMC4zLTAuMy0wLjQtMC41LTAuNC0wLjVjMC0wLjEsMC0wLjEsMC4yLTAuMkM3LDI3MSw3LDI3MSwxMC43LDI2N1xuXHRcdGMtMS42LDAuMy0yLjYsMC41LTIuOSwwLjZjLTAuMSwwLTAuMiwwLjEtMC4yLDAuMWMtMC4xLDAtMC4xLDAtMC4yLTAuMmMtMC4xLTAuMy0wLjItMC42LTAuMi0xYzAuMiwwLDAuMywwLDAuMywwXG5cdFx0YzAuNCwwLDEuNy0wLjEsMi44LTAuM2MwLjgtMC4xLDEtMC4xLDEuMi0wLjJjMC4xLDAsMC4xLDAsMC4yLDBjMC4yLDAsMC44LDAuNiwwLjgsMC45YzAsMC4xLDAsMC4yLTAuMiwwLjJcblx0XHRjLTAuMSwwLjEtMC40LDAuMi0wLjUsMC4zYy0wLjEsMC4xLTAuNCwwLjQtMC41LDAuNUwxMC4yLDI2OXogTTksMjY0YzAtMC4xLDAuMS0wLjIsMC4xLTAuMmMwLDAsMC4xLDAsMC4xLDBcblx0XHRjMC40LDAuMSwwLjgsMC4yLDEuMiwwLjNjMC42LDAuMSwwLjcsMC4xLDEuOCwwLjJjMC4xLDAsMC4xLDAsMC4xLDAuM2MwLDAuMywwLDAuNy0wLjEsMC44YzAsMC4xLTAuMSwwLjEtMC4xLDAuMVxuXHRcdHMtMS4xLTAuMS0xLjMtMC4xYy0wLjctMC4xLTEuNC0wLjMtMS45LTAuNWMtMC4xLDAtMC4xLTAuMS0wLjEtMC4xQzguOCwyNjQuNyw4LjksMjY0LjQsOSwyNjR6XCIvPlxuXHQ8cGF0aCBkPVwiTTQ3LjgsMjY1LjhjLTAuMywwLjEtMC40LDAuMS0wLjcsMC4yYy0wLjEsMC0wLjIsMC4xLTAuMywwLjFjLTAuMiwwLTAuNC0wLjQtMC42LTEuM2MwLjYsMCwwLjktMC4xLDItMC4yXG5cdFx0YzEuMi0wLjIsMi43LTAuNCwzLjUtMC41YzAuOS0wLjEsMS42LTAuMiwyLTAuM2MwLjEsMCwwLjEsMCwwLjIsMGMwLjEsMCwwLjIsMC4xLDAuMywwLjNjMC4xLDAuMiwwLjEsMC41LDAuMSwwLjZcblx0XHRjMCwwLjEsMCwwLjItMC4yLDAuMmMtMC4yLDAtMC40LDAtMC42LDBjLTEuNywwLjMtMywxLjgtMywzLjNjMCwxLjIsMC45LDEuOSwyLjUsMi4xYzAuMSwwLDAuMiwwLjEsMC4yLDAuMmMwLDAuMi0wLjEsMC43LTAuMiwxXG5cdFx0YzAsMC4xLTAuMSwwLjItMC4zLDAuMmMtMC4xLDAtMC40LTAuMS0wLjctMC4yYy0xLjctMC41LTIuNi0xLjYtMi42LTMuMWMwLTAuOCwwLjMtMS42LDAuOC0yLjNjMC4zLTAuNCwwLjUtMC42LDEuMS0wLjlcblx0XHRDNDkuOSwyNjUuNCw0OC42LDI2NS42LDQ3LjgsMjY1Ljh6IE01Mi45LDI2Ni4xYzAuMSwwLDEsMSwxLDEuMWMwLDAuMS0wLjEsMC4xLTAuMiwwLjNjLTAuMiwwLjItMC4yLDAuMi0wLjMsMC4yYzAsMCwwLDAtMC4xLDBcblx0XHRjMCwwLDAsMC0wLjItMC4zYy0wLjItMC4yLTAuMy0wLjUtMC43LTAuOGMwLDAsMC0wLjEsMC0wLjFjMCwwLDAtMC4xLDAtMC4xYzAsMCwwLjItMC4yLDAuMi0wLjJDNTIuOCwyNjYuMSw1Mi44LDI2Ni4xLDUyLjksMjY2LjFcblx0XHRDNTIuOCwyNjYuMSw1Mi45LDI2Ni4xLDUyLjksMjY2LjFMNTIuOSwyNjYuMUw1Mi45LDI2Ni4xeiBNNTQuNiwyNjYuOGMtMC4yLDAuMS0wLjIsMC4yLTAuMywwLjJjMCwwLTAuMSwwLTAuMS0wLjFcblx0XHRjLTAuMy0wLjUtMC41LTAuNi0wLjgtMWMwLDAsMC0wLjEsMC0wLjFjMCwwLDAuMS0wLjEsMC4yLTAuMmMwLjEtMC4xLDAuMy0wLjIsMC4zLTAuMmMwLjEsMCwwLjIsMC4xLDAuNCwwLjNcblx0XHRjMC4zLDAuMywwLjYsMC43LDAuNiwwLjhDNTQuOSwyNjYuNSw1NC44LDI2Ni42LDU0LjYsMjY2Ljh6XCIvPlxuXHQ8cGF0aCBkPVwiTTEyMy4yLDI5MS45aC0zYy0xLjEsMC0yLTAuOS0yLTJ2LTZjMC0xLjEsMC45LTIsMi0yaDNWMjkxLjl6XCIvPlxuXHQ8cmVjdCB4PVwiMTM2LjJcIiB5PVwiMjgyLjlcIiB3aWR0aD1cIjJcIiBoZWlnaHQ9XCI4XCIvPlxuXHQ8cmVjdCB4PVwiMTQxLjJcIiB5PVwiMjgwLjlcIiB3aWR0aD1cIjJcIiBoZWlnaHQ9XCIxMlwiLz5cblx0PHJlY3QgeD1cIjE0Ni4yXCIgeT1cIjI3OC45XCIgd2lkdGg9XCIyXCIgaGVpZ2h0PVwiMTZcIi8+XG5cdDxwb2x5Z29uIHBvaW50cz1cIjEzMS4yLDI5Ni45IDEyMy4yLDI5MS45IDEyMy4yLDI4MS45IDEzMS4yLDI3Ni45IFx0XCIvPlxuPC9nPlxuPC9zdmc+J1xuXG5Db25maWcuTG9hZGluZy5TVkcuQnV0dG9uID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxMDBweFwiIGhlaWdodD1cIjEwMHB4XCIgdmlld0JveD1cIjAgMCAxMDAgMTAwXCI+XG48c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+XG5cdC5zdDB7ZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDo1LjU7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fVxuPC9zdHlsZT5cbjxwYXRoIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjUuNVwiIHN0cm9rZS1taXRlcmxpbWl0PVwiMTBcIiBkPVwiTTUsMjIuNWMyNy42LDAsNTIuNiwxMS4yLDcwLjcsMjkuM1xuXHRzMjkuMyw0MywyOS4zLDcwLjdzLTExLjIsNTIuNi0yOS4zLDcwLjdTMzIuNiwyMjIuNSw1LDIyMi41cy01Mi42LTExLjItNzAuNy0yOS4zUy05NSwxNTAuMS05NSwxMjIuNXMxMS4yLTUyLjYsMjkuMy03MC43XG5cdFMtMjIuNiwyMi41LDUsMjIuNXpcIi8+XG48Zz5cblx0PHBhdGggZD1cIk0wLjcsMTEzYzAtMC40LDAuMy0wLjYsMC42LTAuNmg2LjZjNi41LDAsMTAuNyw0LjUsMTAuNywxMXYwLjNjMCw2LjUtNC4yLDExLTEwLjcsMTFIMS4zYy0wLjQsMC0wLjYtMC4zLTAuNi0wLjZWMTEzelxuXHRcdCBNNS4zLDExNi41djE0aDIuNmMzLjUsMCw1LjktMi41LDUuOS02Ljl2LTAuMmMwLTQuNC0yLjQtNi45LTUuOS02LjlINS4zelwiLz5cblx0PHBhdGggZD1cIk02Mi42LDEyMy43di0wLjNjMC02LjYsNC40LTExLjQsMTAuNC0xMS40YzIuOSwwLDQuOSwwLjgsNi44LDIuMmMwLjMsMC4yLDAuMywwLjYsMC4xLDAuOWwtMiwyLjZcblx0XHRjLTAuMiwwLjMtMC42LDAuMy0wLjksMC4xYy0xLjEtMC45LTIuMy0xLjUtNC4xLTEuNWMtMy4yLDAtNS42LDIuOS01LjYsN3YwLjNjMCw0LjYsMi41LDcuMiw1LjgsNy4yYzEuMywwLDIuNS0wLjMsMy4zLTAuOXYtNFxuXHRcdGgtMy40Yy0wLjQsMC0wLjYtMC4zLTAuNi0wLjZ2LTIuN2MwLTAuNCwwLjMtMC42LDAuNi0wLjZoNy4yYzAuNCwwLDAuNiwwLjMsMC42LDAuNnY5LjRjMCwwLjItMC4xLDAuNC0wLjMsMC41XG5cdFx0Yy0yLDEuNC00LjUsMi42LTcuNywyLjZDNjcsMTM1LDYyLjYsMTMwLjcsNjIuNiwxMjMuN3pcIi8+XG5cdDxwYXRoIGQ9XCJNLTcwLjMsMTEyLjNoMy40YzAuNCwwLDAuNiwwLjMsMC42LDAuNnYxNy41aDguNGMwLjQsMCwwLjYsMC4zLDAuNiwwLjZ2M2MwLDAuNC0wLjMsMC42LTAuNiwwLjZoLTEyLjRcblx0XHRjLTAuNCwwLTAuNi0wLjMtMC42LTAuNlYxMTNDLTcwLjksMTEyLjYtNzAuNiwxMTIuMy03MC4zLDExMi4zelwiLz5cblx0PHBhdGggZD1cIk0tNTMuMywxMjMuNkwtNTMuMywxMjMuNmMwLTYuNCw1LTExLjYsMTEuOS0xMS42YzYuOSwwLDExLjgsNS4xLDExLjgsMTEuNXYwLjFjMCw2LjMtNSwxMS42LTExLjksMTEuNlxuXHRcdFMtNTMuMywxMjkuOS01My4zLDEyMy42eiBNLTM0LjUsMTIzLjZMLTM0LjUsMTIzLjZjMC00LTIuOS03LjItNi45LTcuMnMtNi44LDMuMi02LjgsNy4xdjAuMWMwLDMuOSwyLjksNy4yLDYuOSw3LjJcblx0XHRDLTM3LjMsMTMwLjctMzQuNSwxMjcuNS0zNC41LDEyMy42elwiLz5cblx0PHBhdGggZD1cIk0tMTcuNCwxMTIuMmgzLjVjMC4zLDAsMC41LDAuMiwwLjYsMC40bDcuNiwyMS4yYzAuMSwwLjQtMC4yLDAuOS0wLjYsMC45aC0zLjRjLTAuMywwLTAuNS0wLjItMC42LTAuNGwtMS41LTQuNGgtNy43XG5cdFx0bC0xLjUsNC40Yy0wLjEsMC4zLTAuMywwLjQtMC42LDAuNEgtMjVjLTAuNCwwLTAuOC0wLjQtMC42LTAuOWw3LjYtMjEuMkMtMTcuOSwxMTIuNC0xNy43LDExMi4yLTE3LjQsMTEyLjJ6IE0tMTMuMywxMjUuN1xuXHRcdGwtMi40LTcuM2wtMi41LDcuM0gtMTMuM3pcIi8+XG5cdDxwYXRoIGQ9XCJNMjYuMywxMTIuM2gzLjRjMC40LDAsMC42LDAuMywwLjYsMC42VjEzNGMwLDAuNC0wLjMsMC42LTAuNiwwLjZoLTMuNGMtMC40LDAtMC42LTAuMy0wLjYtMC42VjExM1xuXHRcdEMyNS43LDExMi42LDI2LDExMi4zLDI2LjMsMTEyLjN6XCIvPlxuXHQ8cGF0aCBkPVwiTTM4LjksMTEyLjNoMy4zYzAuMiwwLDAuNCwwLjEsMC41LDAuM2w4LjQsMTIuN1YxMTNjMC0wLjQsMC4zLTAuNiwwLjYtMC42SDU1YzAuNCwwLDAuNiwwLjMsMC42LDAuNlYxMzRcblx0XHRjMCwwLjQtMC4zLDAuNi0wLjYsMC42aC0zYy0wLjIsMC0wLjQtMC4xLTAuNS0wLjNsLTguNi0xMy4yVjEzNGMwLDAuNC0wLjMsMC42LTAuNiwwLjZoLTMuM2MtMC40LDAtMC42LTAuMy0wLjYtMC42VjExM1xuXHRcdEMzOC4zLDExMi42LDM4LjYsMTEyLjMsMzguOSwxMTIuM3pcIi8+XG48L2c+XG48Zz5cblx0PHBhdGggZD1cIk0tMjMuOCwxMDQuMmg1LjNjMC42LDAsMSwwLjQsMSwxdjI3LjRoMTMuMmMwLjYsMCwxLDAuNCwxLDF2NC43YzAsMC42LTAuNCwxLTEsMWgtMTkuNGMtMC42LDAtMS0wLjQtMS0xdi0zM1xuXHRcdEMtMjQuOCwxMDQuNi0yNC4zLDEwNC4yLTIzLjgsMTA0LjJ6XCIvPlxuXHQ8cGF0aCBkPVwiTTUwLDEyNS40bC0xMC42LTE5LjdjLTAuNC0wLjcsMC4xLTEuNSwwLjktMS41aDUuOWMwLjQsMCwwLjcsMC4yLDAuOSwwLjZsNi42LDEzLjJsNi43LTEzLjJjMC4yLTAuMywwLjUtMC41LDAuOS0wLjVINjdcblx0XHRjMC44LDAsMS4yLDAuOCwwLjksMS41bC0xMC42LDE5LjZ2MTIuOWMwLDAuNi0wLjQsMS0xLDFINTFjLTAuNiwwLTEtMC40LTEtMVYxMjUuNHpcIi8+XG5cdDxwYXRoIGQ9XCJNMTgsMTA0aDUuNWMwLjQsMCwwLjgsMC4zLDAuOSwwLjdsMTEuOCwzMy4yYzAuMiwwLjctMC4zLDEuMy0wLjksMS4zSDMwYy0wLjQsMC0wLjgtMC4zLTAuOS0wLjdsLTIuNC02LjlIMTQuNmwtMi4zLDYuOVxuXHRcdGMtMC4xLDAuNC0wLjUsMC43LTAuOSwwLjdINi4yYy0wLjcsMC0xLjItMC43LTAuOS0xLjNsMTEuOC0zMy4yQzE3LjIsMTA0LjMsMTcuNiwxMDQsMTgsMTA0eiBNMjQuNSwxMjUuMmwtMy44LTExLjRsLTMuOSwxMS40XG5cdFx0SDI0LjV6XCIvPlxuXHQ8cGF0aCBkPVwiTS01OSwxMDUuMmMwLTAuNiwwLjQtMSwxLTFoMTAuN2M3LjgsMCwxMi44LDQuNiwxMi44LDEydjAuMWMwLDguMS01LjgsMTIuMS0xMy4xLDEyLjNoLTQuMXY5LjdjMCwwLjYtMC40LDEtMSwxSC01OFxuXHRcdGMtMC42LDAtMS0wLjQtMS0xVjEwNS4yeiBNLTQ3LjcsMTIyYzMuOCwwLDUuOS0yLjQsNS45LTUuNnYwYzAtMy43LTIuMS01LjctNi01LjdoLTRWMTIySC00Ny43elwiLz5cbjwvZz5cbjwvc3ZnPidcblxubW9kdWxlLmV4cG9ydHMgPSBDb25maWdcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL19jb2ZmZWUvY29uZmlnLmNvZmZlZVxuICoqLyIsIlV0aWxzID0gcmVxdWlyZSAndXRpbHMnXG4jIFxuIyDjgrfjgqfjgqTjg5fjg4jjgqXjgqTjg7zjg7PnlKjjgq/jg6njgrlcbiMgQHBhcmFtIHtPYmplY3R9IHBhdGhlczog5aSJ5b2i5oOF5aCxXG4jIEBwYXJhbSB7TnVtYmVyfSBtb3JwaDog5aSJ5b2i54q25oWLXG4jXG5jbGFzcyBNb3JwaGFibGVQYXRoIGV4dGVuZHMgcGFwZXIuUGF0aFxuXHRjb25zdHJ1Y3RvcjogKHBhdGhlcywgbW9ycGggPSAwKS0+XG5cdFx0QHBhdGhlcyA9IHBhdGhlc1xuXHRcdEBtb3JwaCA9IG1vcnBoXG5cblx0XHRVdGlscy50cmFuc2Zvcm1Jbml0IEBcblxuXHRcdCMg44OR44K56LW354K56Kit5a6aXG5cdFx0Zm9yIHBhdGggaW4gQHBhdGhlc1xuXHRcdFx0VXRpbHMudHJhbnNmb3JtSW5pdCBwYXRoXG5cblx0XHQjIOOCouODs+OCq+ODvOOCkuOCs+ODlOODvFxuXHRcdHNlZ21lbnRzID0gW11cblx0XHRmb3Igc2VnbWFudCBpbiBAcGF0aGVzWzBdLnNlZ21lbnRzXG5cdFx0XHRzZWdtZW50cy5wdXNoIHNlZ21hbnQuY2xvbmUoKVxuXG5cdFx0IyDkvZzmiJBcblx0XHRzdXBlcihzZWdtZW50cylcblxuXHRcdCMg44Ki44Oz44Kr44O844Od44Kk44Oz44OI44Gu5pWw44KS44OB44Kn44OD44KvXG5cdFx0QGNoZWNrVmVydGljZXMoKVxuXG5cdFx0IyDjg5Hjgrnjga7jgq/jg63jg7zjgrrnirbmhYvjgpLnorroqo1cblx0XHRpZiBAcGF0aGVzWzBdLmNsb3NlZFxuXHRcdFx0QGNsb3NlZCA9IHRydWVcblx0XHRAdXBkYXRlKClcblxuXHRcdHJldHVyblxuXG5cdCMgXG5cdCMg5YWo44Gm44Gu44OR44K544Gu44Ki44Oz44Kr44O844Od44Kk44Oz44OI44Gu5pWw44GM5ZCM44GY44Gn44Gq44GR44KM44Gw44Ko44Op44O844KS6L+U44GZXG5cdCMgXG5cdGNoZWNrVmVydGljZXM6LT5cblx0XHRmb3IgcGF0aCBpbiBAcGF0aGVzXG5cdFx0XHRpZiBAc2VnbWVudHMubGVuZ3RoICE9IHBhdGguc2VnbWVudHMubGVuZ3RoXG5cdFx0XHRcdGFsZXJ0IFwi44Ki44Oz44Kr44O844Od44Kk44Oz44OI44Gu5pWw44GM6YGV44GE44G+44GZXCJcblx0XHRcdFx0dGhyb3cgXCLjgqLjg7Pjgqvjg7zjg53jgqTjg7Pjg4jjga7mlbDjgYzpgZXjgYTjgb7jgZlcIlxuXHRcdFx0XHRicmVha1xuXHRcdHJldHVyblxuXG5cdCMgXG5cdCMg44K344Kn44Kk44OX44OI44Kl44Kk44O844OzXG5cdCMgQHBhcmFtIHtOdW1iZXJ9IG1vcnBoOiDlpInlvaLnirbmhYtcblx0I1xuXHR1cGRhdGU6IChtb3JwaCA9IEBtb3JwaCk9PlxuXHRcdGlmIEBwYXRoZXMubGVuZ3RoIDw9IDEgdGhlbiByZXR1cm5cblx0XHRpZiBtb3JwaCAhPSBAbW9ycGggdGhlbiBAbW9ycGggPSBtb3JwaFxuXHRcdGZyb21JbmRleCA9IE1hdGguZmxvb3IoQG1vcnBoKVxuXHRcdGlmIGZyb21JbmRleCA8IDAgdGhlbiBmcm9tSW5kZXggPSAwXG5cdFx0ZWxzZSBpZiBmcm9tSW5kZXggPiBAcGF0aGVzLmxlbmd0aCAtIDIgdGhlbiBmcm9tSW5kZXggPSBAcGF0aGVzLmxlbmd0aCAtIDJcblx0XHR0b0luZGV4ID0gZnJvbUluZGV4ICsgMVxuXHRcdF9mcm9tID0gQHBhdGhlc1tmcm9tSW5kZXhdXG5cdFx0X3RvID0gQHBhdGhlc1t0b0luZGV4XVxuXHRcdHAgPSBAbW9ycGggLSBmcm9tSW5kZXhcblxuXHRcdGZvciBzZWdtZW50LCBpIGluIEBzZWdtZW50c1xuXHRcdFx0c2VnbWVudC5wb2ludC54ID0gX2Zyb20uc2VnbWVudHNbaV0ucG9pbnQueCArIChfdG8uc2VnbWVudHNbaV0ucG9pbnQueCAtIF9mcm9tLnNlZ21lbnRzW2ldLnBvaW50LngpICogcCArIEBwb3NpdGlvbi54XG5cdFx0XHRzZWdtZW50LnBvaW50LnkgPSBfZnJvbS5zZWdtZW50c1tpXS5wb2ludC55ICsgKF90by5zZWdtZW50c1tpXS5wb2ludC55IC0gX2Zyb20uc2VnbWVudHNbaV0ucG9pbnQueSkgKiBwICsgQHBvc2l0aW9uLnlcblx0XHRcdHNlZ21lbnQuaGFuZGxlSW4ueCA9IF9mcm9tLnNlZ21lbnRzW2ldLmhhbmRsZUluLnggKyAoX3RvLnNlZ21lbnRzW2ldLmhhbmRsZUluLnggLSBfZnJvbS5zZWdtZW50c1tpXS5oYW5kbGVJbi54KSAqIHBcblx0XHRcdHNlZ21lbnQuaGFuZGxlSW4ueSA9IF9mcm9tLnNlZ21lbnRzW2ldLmhhbmRsZUluLnkgKyAoX3RvLnNlZ21lbnRzW2ldLmhhbmRsZUluLnkgLSBfZnJvbS5zZWdtZW50c1tpXS5oYW5kbGVJbi55KSAqIHBcblx0XHRcdHNlZ21lbnQuaGFuZGxlT3V0LnggPSBfZnJvbS5zZWdtZW50c1tpXS5oYW5kbGVPdXQueCArIChfdG8uc2VnbWVudHNbaV0uaGFuZGxlT3V0LnggLSBfZnJvbS5zZWdtZW50c1tpXS5oYW5kbGVPdXQueCkgKiBwXG5cdFx0XHRzZWdtZW50LmhhbmRsZU91dC55ID0gX2Zyb20uc2VnbWVudHNbaV0uaGFuZGxlT3V0LnkgKyAoX3RvLnNlZ21lbnRzW2ldLmhhbmRsZU91dC55IC0gX2Zyb20uc2VnbWVudHNbaV0uaGFuZGxlT3V0LnkpICogcFxuXG5cdFx0XHRpZiBwIDw9IDBcblx0XHRcdFx0aWYgX2Zyb20uc2VnbWVudHNbaV0uaGFuZGxlSW4ueCA9PSAwICYmIF9mcm9tLnNlZ21lbnRzW2ldLmhhbmRsZUluLnkgPT0gMFxuXHRcdFx0XHRcdHNlZ21lbnQuaGFuZGxlSW4ueCA9IF9mcm9tLnNlZ21lbnRzW2ldLmhhbmRsZUluLnhcblx0XHRcdFx0XHRzZWdtZW50LmhhbmRsZUluLnkgPSBfZnJvbS5zZWdtZW50c1tpXS5oYW5kbGVJbi55XG5cdFx0XHRcdGlmIF9mcm9tLnNlZ21lbnRzW2ldLmhhbmRsZU91dC54ID09IDAgJiYgX2Zyb20uc2VnbWVudHNbaV0uaGFuZGxlT3V0LnkgPT0gMFxuXHRcdFx0XHRcdHNlZ21lbnQuaGFuZGxlT3V0LnggPSBfZnJvbS5zZWdtZW50c1tpXS5oYW5kbGVPdXQueFxuXHRcdFx0XHRcdHNlZ21lbnQuaGFuZGxlT3V0LnkgPSBfZnJvbS5zZWdtZW50c1tpXS5oYW5kbGVPdXQueVxuXHRcdFx0aWYgcCA+PSAxXG5cdFx0XHRcdGlmIF90by5zZWdtZW50c1tpXS5oYW5kbGVJbi54ID09IDAgJiYgX3RvLnNlZ21lbnRzW2ldLmhhbmRsZUluLnkgPT0gMFxuXHRcdFx0XHRcdHNlZ21lbnQuaGFuZGxlSW4ueCA9IF90by5zZWdtZW50c1tpXS5oYW5kbGVJbi54XG5cdFx0XHRcdFx0c2VnbWVudC5oYW5kbGVJbi55ID0gX3RvLnNlZ21lbnRzW2ldLmhhbmRsZUluLnlcblx0XHRcdFx0aWYgX3RvLnNlZ21lbnRzW2ldLmhhbmRsZU91dC54ID09IDAgJiYgX3RvLnNlZ21lbnRzW2ldLmhhbmRsZU91dC55ID09IDBcblx0XHRcdFx0XHRzZWdtZW50LmhhbmRsZU91dC54ID0gX3RvLnNlZ21lbnRzW2ldLmhhbmRsZU91dC54XG5cdFx0XHRcdFx0c2VnbWVudC5oYW5kbGVPdXQueSA9IF90by5zZWdtZW50c1tpXS5oYW5kbGVPdXQueVxuXG5cdFx0cmV0dXJuXG5cblx0I1xuXHQjIOODquOCu+ODg+ODiOWHpueQhlxuXHQjXG5cdHJlc2V0OiAtPlxuXHRcdEBtb3JwaCA9IDBcblx0XHRAdXBkYXRlKClcblx0XHRyZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBNb3JwaGFibGVQYXRoXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9fY29mZmVlL2Zvcm1hdC9tb3JwaGFibGUtcGF0aC5jb2ZmZWVcbiAqKi8iLCJDb25maWdcdFx0XHRcdD0gcmVxdWlyZSAnY29uZmlnJ1xuVXRpbHNcdFx0XHRcdFx0PSByZXF1aXJlICd1dGlscydcbk1vcnBoYWJsZVBhdGhcdD0gcmVxdWlyZSAnbW9ycGhhYmxlLXBhdGgnXG5DdXN0b21TdHJva2VcdD0gcmVxdWlyZSAnY3VzdG9tLXN0cm9rZSdcblxuIyBcbiMg5Zyf5Y+w44Kq44OW44K444Kn44Kv44OIXG4jIEBwYXJhbSB7T2JqZWN0fSBwYXRoZXM6IOODkeOCueODh+ODvOOCv1xuIyBAcGFyYW0ge051bWJlcn0gbW9ycGg6IOODouODvOODleOCo+ODs+OCsOOBruWIneacn+S9jee9rijjg4fjg5Xjgqnjg6vjg4g6MClcbiMgXG5jbGFzcyBCYXNlIGV4dGVuZHMgcGFwZXIuR3JvdXBcblx0Y29uc3RydWN0b3I6IChwYXRoZXMsIG1vcnBoID0gMCkgLT5cblx0XHRzdXBlcigpXG5cblx0XHRVdGlscy50cmFuc2Zvcm1Jbml0IEBcblx0XHRAbW9ycGggPSBtb3JwaFxuXG5cdFx0IyDjg5njg7zjgrlcblx0XHRAYmFzZVNWRyA9IEBpbXBvcnRTVkcgQ29uZmlnLlNWRy5CQVNFXG5cdFx0QGJhc2VTVkcucmVtb3ZlKClcblx0XHRAYmFzZSA9IEBiYXNlU1ZHLmNoaWxkcmVuWzFdXG5cblx0XHRAcGF0aGVzID0gW11cblx0XHRcblx0XHQjIOW8leaVsOOBp+ODkeOCueOBjOOBguOCjOOBsOS4iuabuOOBjeOBquOBkeOCjOOBsOODmeODvOOCt+ODg+OCr1xuXHRcdGlmIHBhdGhlcz9cblx0XHRcdGZvciBwYXRoIGluIHBhdGhlc1xuXHRcdFx0XHRAcGF0aGVzLnB1c2ggcGF0aFxuXHRcdGVsc2Vcblx0XHRcdEBwYXRoZXMgPSBbXG5cdFx0XHRcdEBiYXNlXG5cdFx0XHRdXG5cblx0XHQjIOe3muioreWumlxuXHRcdEBib25lU3Ryb2tlID0gbmV3IE1vcnBoYWJsZVBhdGggQHBhdGhlcywgQG1vcnBoXG5cdFx0QGJvbmVTdHJva2Uuc3Ryb2tlV2lkdGggPSAwLjJcblx0XHRAYm9uZVN0cm9rZS5zdHJva2VDb2xvciA9IG5ldyBwYXBlci5Db2xvcigyNTUsMCwwLDEpXG5cdFx0QGJvbmVTdHJva2UucmVtb3ZlKClcblxuXHRcdCMg6KeS5Li4XG5cdFx0c2V0dGluZ3MgPSBbXG5cdFx0XHRbMS4wLFx0XHQxLjBdXG5cdFx0XHRbMCxcdFx0XHQwXVxuXHRcdFx0WzIuNzUsXHQwXVxuXHRcdFx0WzIuNzUsXHQwXVxuXHRcdFx0WzAsXHRcdFx0MF1cblx0XHRcdFsxLjAsXHRcdDEuMF1cblx0XHRdXG5cdFx0QHN0cm9rZSA9IG5ldyBDdXN0b21TdHJva2UgQGJvbmVTdHJva2UsIENvbmZpZy5MSU5FX1dJRFRILCBzZXR0aW5nc1xuXHRcdEBzdHJva2Uuc3Ryb2tlV2lkdGggPSAwXG5cdFx0QHN0cm9rZS5maWxsQ29sb3IgPSBuZXcgcGFwZXIuQ29sb3IgMCwwLDAsMVxuXHRcdEBhZGRDaGlsZCBAc3Ryb2tlXG5cdFx0IyBAYWRkQ2hpbGQgQGJvbmVTdHJva2Vcblx0XHQjIEBzdHJva2UuZnVsbHlTZWxlY3RlZCA9IHRydWVcblxuXHRcdCMg5aGX44KK6Kit5a6aXG5cdFx0QGZpbGxQYXRoZXMgPSBbXVxuXHRcdGZvciBwYXRoIGluIEBwYXRoZXNcblx0XHRcdF9maWxsID0gcGF0aC5jbG9uZSgpXG5cdFx0XHRAZmlsbEluaXQgX2ZpbGxcblx0XHRcdEBmaWxsUGF0aGVzLnB1c2ggX2ZpbGxcblxuXHRcdEBmaWxsID0gbmV3IE1vcnBoYWJsZVBhdGggQGZpbGxQYXRoZXMsIEBtb3JwaFxuXHRcdEBmaWxsLnN0cm9rZVdpZHRoID0gMFxuXHRcdEBmaWxsLmZpbGxDb2xvciA9IENvbmZpZy5DT0xPUi5CQVNFX0ZJTExcblx0XHRAaW5zZXJ0Q2hpbGQgMCwgQGZpbGxcblxuXHRcdFV0aWxzLnRyYW5zZm9ybUluaXQgW0Bib25lU3Ryb2tlLCBAZmlsbCwgQHN0cm9rZV1cblx0XHRcblxuXHRcdEBwcmVzcyA9IDBcblx0XHRAaW5pdCgpXG5cblx0XHRyZXR1cm5cblxuXHQjIFxuXHQjIOWhl+OCiueUqOOBruODkeOCueOBruOCpOODi+OCt+ODo+ODqeOCpOOCulxuXHQjIEBwYXJhbSB7T2JqZWN0fSBwYXRoOiDjg5Hjgrnmg4XloLFcblx0IyBcblx0ZmlsbEluaXQ6IChwYXRoKS0+XG5cdFx0IyDloZfjgorjgavlv4XopoHjgarjgYTkuKHnq6/jga7jg53jgqTjg7Pjg4jjgpLliYrpmaRcblx0XHRwYXRoLnNlZ21lbnRzLnBvcCgpXG5cdFx0cGF0aC5zZWdtZW50cy5zaGlmdCgpXG5cdFx0cGF0aC5jbG9zZWQgPSB0cnVlXG5cblx0XHQjIOe3muW5heWIhuOBoOOBkeWhl+OCiuOCkuS8uOOBsOOBmVxuXHRcdCMg5bemXG5cdFx0dmVjdG9yID0gcGF0aC5zZWdtZW50c1swXS5wb2ludC5zdWJ0cmFjdChwYXRoLnNlZ21lbnRzWzFdLnBvaW50KVxuXHRcdHZlY3Rvci5sZW5ndGggPSBDb25maWcuTElORV9XSURUSCAqIDAuNVxuXHRcdHBhdGguc2VnbWVudHNbMF0ucG9pbnQgPSBwYXRoLnNlZ21lbnRzWzBdLnBvaW50LmFkZCh2ZWN0b3IpXG5cdFx0XG5cdFx0IyDlj7Ncblx0XHRsYXN0ID0gcGF0aC5zZWdtZW50cy5sZW5ndGggLSAxXG5cdFx0dmVjdG9yID0gcGF0aC5zZWdtZW50c1tsYXN0XS5wb2ludC5zdWJ0cmFjdChwYXRoLnNlZ21lbnRzW2xhc3QgLSAxXS5wb2ludClcblx0XHR2ZWN0b3IubGVuZ3RoID0gQ29uZmlnLkxJTkVfV0lEVEggKiAwLjVcblx0XHRwYXRoLnNlZ21lbnRzW2xhc3RdLnBvaW50ID0gcGF0aC5zZWdtZW50c1tsYXN0XS5wb2ludC5hZGQodmVjdG9yKVxuXHRcdHJldHVyblxuXG5cdCMgXG5cdCMg44Kk44OL44K344Oj44Op44Kk44K6XG5cdCMgXG5cdGluaXQ6IC0+XG5cdFx0QF9vbkluaXQoKVxuXHRcdHJldHVyblxuXG5cdCMgXG5cdCMg44Ki44OD44OX44OH44O844OIXG5cdCMgXG5cdHVwZGF0ZTogPT5cblx0XHRAX29uVXBkYXRlKClcblx0XHRyZXR1cm5cblxuXHQjIFxuXHQjIOODnuOCpuOCueOCkuaKvOOBl+OBn+aZglxuXHQjIFxuXHRkb3duOiA9PlxuXHRcdEBfb25Eb3duKClcblx0XHRyZXR1cm5cblx0XG5cdCMgXG5cdCMg44Oe44Km44K544KS6Zui44GX44Gf5pmCXG5cdCMgXG5cdHVwOiA9PlxuXHRcdEBfb25VcCgpXG5cdFx0cmV0dXJuXG5cblx0IyBcblx0IyDjg6rjgrvjg4Pjg4hcblx0IyBAcGFyYW0ge051bWJlcn0gbW9ycGg6IOODouODvOODleOCo+ODs+OCsOS9jee9rlxuXHQjIFxuXHRyZXNldDogKG1vcnBoID0gMCktPlxuXHRcdEBtb3JwaCA9IG1vcnBoXG5cdFx0QHByZXNzID0gMFxuXHRcdEBwb3NpdGlvbi5zZXQgMCwgMFxuXHRcdFxuXHRcdEBib25lU3Ryb2tlLnZpc2libGUgPSB0cnVlXG5cdFx0QGJvbmVTdHJva2Uub3BhY2l0eSA9IDFcblx0XHRAYm9uZVN0cm9rZS5wb3NpdGlvbi5zZXQgMCwgMFxuXHRcdEBib25lU3Ryb2tlLnVwZGF0ZSBAbW9ycGhcblx0XHRAYm9uZVN0cm9rZS5zdHJva2VDb2xvciA9IENvbmZpZy5DT0xPUi5CQVNFX1BBVEhcblxuXHRcdEBzdHJva2UudmlzaWJsZSA9IHRydWVcblx0XHRAc3Ryb2tlLmZpbGxDb2xvciA9IG5ldyBwYXBlci5Db2xvciAwLDAsMCwxXG5cdFx0QHN0cm9rZS51cGRhdGUoKVxuXG5cdFx0QGZpbGwudmlzaWJsZSA9IHRydWVcblx0XHRAZmlsbC5vcGFjaXR5ID0gMVxuXHRcdEBmaWxsLnBvc2l0aW9uLnNldCAwLCAwXG5cdFx0QGZpbGwudXBkYXRlIEBtb3JwaFxuXHRcdEBmaWxsLmZpbGxDb2xvciA9IENvbmZpZy5DT0xPUi5CQVNFX0ZJTExcblxuXHRcdHJldHVyblxuXG4jKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIyDjgrXjg5bjgq/jg6njgrnjgaflrp/oo4XjgZnjgbnjgY3jg6Hjgr3jg4Pjg4lcbiMqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cdCMgXG5cdCMgXG5cdCMgXG5cdF9vbkluaXQ6IC0+XG5cdFx0cmV0dXJuXG5cblx0IyBcblx0IyBcblx0IyBcblx0X29uVXBkYXRlOiAtPlxuXHRcdHJldHVyblxuXG5cdCMgXG5cdCMgXG5cdCMgXG5cdF9vbkRvd246IC0+XG5cdFx0cmV0dXJuXG5cblx0IyBcblx0IyBcblx0IyBcblx0X29uVXA6IC0+XG5cdFx0cmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vX2NvZmZlZS9mb3JtYXQvYmFzZS5jb2ZmZWVcbiAqKi8iLCJVdGlscyA9IHJlcXVpcmUgJ3V0aWxzJ1xuXG5SQURJQU5fVE9fREVHUkVFID0gMTgwIC8gTWF0aC5QSVxuREVHUkVFX1RPX1JBRElBTiA9IE1hdGguUEkgLyAxODBcblxuIyBcbiMg44K344Kn44Kk44OX44OI44Kl44Kk44O844Oz55So44Kv44Op44K5XG4jIEBwYXJhbSB7T2JqZWN0fSBwYXRoZXM6IOWkieW9ouaDheWgsVxuIyBAcGFyYW0ge051bWJlcn0gbW9ycGg6IOWkieW9oueKtuaFi1xuI1xuY2xhc3MgQ3VzdG9tU3Ryb2tlIGV4dGVuZHMgcGFwZXIuUGF0aFxuXHRjb25zdHJ1Y3RvcjogKHBhdGgsIHdpZHRoLCBzZXR0aW5ncyktPlxuXHRcdHN1cGVyKClcblx0XHRVdGlscy50cmFuc2Zvcm1Jbml0IEBcblx0XHRAd2lkdGggPSB3aWR0aFxuXHRcdEBwYXRoID0gcGF0aFxuXHRcdEBzZXR0aW5ncyA9IHNldHRpbmdzXG5cblx0XHRAdXBkYXRlKClcblx0XHRyZXR1cm5cblxuXHQjXG5cdCMg5Lqk54K544KS5rGC44KB44KLXG5cdCNcblx0Z2V0Q3Jvc3NpbmdQb2ludDogKHBvaW50MSwgcmFkaWFuMSwgcG9pbnQyLCByYWRpYW4yKSAtPlxuXHRcdGExID0gTWF0aC50YW4ocmFkaWFuMSlcblx0XHRiMSA9IHBvaW50MS55ICsgKC1wb2ludDEueCAqIGExKVxuXHRcdGEyID0gTWF0aC50YW4ocmFkaWFuMilcblx0XHRiMiA9IHBvaW50Mi55ICsgKC1wb2ludDIueCAqIGEyKVxuXHRcdHggPSAoYjEgLSBiMikgLyAoYTIgLSBhMSlcblx0XHR5ID0gKGEyICogYjEgLSBhMSAqIGIyKSAvIChhMiAtIGExKVxuXHRcdHJldHVybiBuZXcgcGFwZXIuUG9pbnQgeCwgeVxuXG5cdCNcblx0I1xuXHQjXG5cdGdldEFuY2hvclBvaW50OiAocG9pbnQscmFkaWFuMSxyYWRpYW4yKSAtPlxuXHRcdHIxID0gcmFkaWFuMSArIE1hdGguUEkgKiAwLjVcblx0XHRyMiA9IHJhZGlhbjIgLSBNYXRoLlBJICogMC41XG5cdFx0cG9pbnQxID0gcG9pbnQuYWRkIG5ldyBwYXBlci5Qb2ludCBNYXRoLmNvcyhyMSkgKiBAd2lkdGggKiAwLjUsIE1hdGguc2luKHIxKSAqIEB3aWR0aCAqIDAuNVxuXHRcdHBvaW50MiA9IHBvaW50LmFkZCBuZXcgcGFwZXIuUG9pbnQgTWF0aC5jb3MocjIpICogQHdpZHRoICogMC41LCBNYXRoLnNpbihyMikgKiBAd2lkdGggKiAwLjVcblx0XHRyZXR1cm4gQGdldENyb3NzaW5nUG9pbnQgcG9pbnQxLCByYWRpYW4xLCBwb2ludDIsIHJhZGlhbjJcblxuXHQjXG5cdCMg6KeS5Li444Gu44Ki44Oz44Kr44O844Od44Kk44Oz44OI44KS5rGC44KB44KLXG5cdCNcblx0Z2V0Um91bmRlZENvcm5lckFuY2hvclBvaW50czogKHJhZGl1cyxwb2ludCxwcmV2UG9pbnQsbmV4dFBvaW50KSAtPlxuXHRcdGlmIHJhZGl1cyA8PSAwIHRoZW4gcmV0dXJuIFtwb2ludF1cblx0XHRwcmV2UmFkaWFuID0gTWF0aC5hdGFuMihwcmV2UG9pbnQueS1wb2ludC55LCBwcmV2UG9pbnQueC1wb2ludC54KVxuXHRcdG5leHRSYWRpYW4gPSBNYXRoLmF0YW4yKG5leHRQb2ludC55LXBvaW50LnksIG5leHRQb2ludC54LXBvaW50LngpXG5cdFx0cmFkaWFuT2Zmc2V0ID0gKHByZXZSYWRpYW4tbmV4dFJhZGlhbikgKiAwLjVcblx0XHRpZiByYWRpYW5PZmZzZXQgPiBNYXRoLlBJICogMC41IHx8ICggcmFkaWFuT2Zmc2V0IDwgMCAmJiByYWRpYW5PZmZzZXQgPiBNYXRoLlBJICogLTAuNSApXG5cdFx0XHRyZXR1cm4gW3BvaW50XVxuXHRcdGRpc3RhbmNlRnJvbVBvaW50ID0gcmFkaXVzIC8gTWF0aC5zaW4ocmFkaWFuT2Zmc2V0KVxuXG5cdFx0cmFkaWFuID0gbmV4dFJhZGlhbiArIHJhZGlhbk9mZnNldFxuXHRcdGNpcmNsZUNlbnRlciA9IHBvaW50LmFkZCBuZXcgcGFwZXIuUG9pbnQgTWF0aC5jb3MocmFkaWFuKSpkaXN0YW5jZUZyb21Qb2ludCwgTWF0aC5zaW4ocmFkaWFuKSpkaXN0YW5jZUZyb21Qb2ludFxuXG5cdFx0cmFkaWFuMSA9IHByZXZSYWRpYW4gKyBNYXRoLlBJICogMC41XG5cdFx0cG9pbnQxID0gY2lyY2xlQ2VudGVyLmFkZCBuZXcgcGFwZXIuUG9pbnQgTWF0aC5jb3MocmFkaWFuMSkqcmFkaXVzLCBNYXRoLnNpbihyYWRpYW4xKSpyYWRpdXNcblx0XHRzZWdtZW50MSA9IG5ldyBwYXBlci5TZWdtZW50IHBvaW50MVxuXHRcdGxlbmd0aCA9IHBvaW50LnN1YnRyYWN0KHBvaW50MSkubGVuZ3RoICogMC41NTIyOFxuXHRcdHNlZ21lbnQxLmhhbmRsZU91dCA9IG5ldyBwYXBlci5Qb2ludCB7IGFuZ2xlOihwcmV2UmFkaWFuK01hdGguUEkpKlJBRElBTl9UT19ERUdSRUUsIGxlbmd0aDpsZW5ndGggfVxuXG5cdFx0cmFkaWFuMiA9IG5leHRSYWRpYW4gLSBNYXRoLlBJICogMC41XG5cdFx0cG9pbnQyID0gY2lyY2xlQ2VudGVyLmFkZCBuZXcgcGFwZXIuUG9pbnQgTWF0aC5jb3MocmFkaWFuMikqcmFkaXVzLCBNYXRoLnNpbihyYWRpYW4yKSpyYWRpdXNcblx0XHRzZWdtZW50MiA9IG5ldyBwYXBlci5TZWdtZW50IHBvaW50MlxuXHRcdGxlbmd0aCA9IHBvaW50LnN1YnRyYWN0KHBvaW50MikubGVuZ3RoICogMC41NTIyOFxuXHRcdHNlZ21lbnQyLmhhbmRsZUluID0gbmV3IHBhcGVyLlBvaW50IHsgYW5nbGU6KG5leHRSYWRpYW4rTWF0aC5QSSkqUkFESUFOX1RPX0RFR1JFRSwgbGVuZ3RoOmxlbmd0aCB9XG5cdFx0cmV0dXJuIFtzZWdtZW50MSxzZWdtZW50Ml1cblxuXG5cdCMgXG5cdCMg5pu05pawXG5cdCNcblx0dXBkYXRlOiA9PlxuXHRcdCNcblx0XHQjIOaZguioiOWbnuOCiuOBruWkluWBtFxuXHRcdCNcblxuXHRcdEBzZWdtZW50cyA9IFtdXG5cblx0XHRvdXRlclNlZ21lbnRzID0gW11cblxuXHRcdCMg5aeL54K544GL44KJ5aSW5ZGo44G+44Gn44Gu57eaXG5cdFx0c2VnbWVudCA9IEBwYXRoLnNlZ21lbnRzWzBdXG5cdFx0bmV4dFNlZ21lbnQgPSBAcGF0aC5zZWdtZW50c1sxXVxuXHRcdHJhZGlhbiA9IE1hdGguYXRhbjIobmV4dFNlZ21lbnQucG9pbnQueS1zZWdtZW50LnBvaW50LnksIG5leHRTZWdtZW50LnBvaW50Lngtc2VnbWVudC5wb2ludC54KVxuXHRcdHJhZGlhbiAtPSBNYXRoLlBJICogMC41XG5cdFx0c3Ryb2tlU2VnbWVudCA9IG5ldyBwYXBlci5TZWdtZW50IG5ldyBwYXBlci5Qb2ludCBzZWdtZW50LnBvaW50LmFkZCBuZXcgcGFwZXIuUG9pbnQgeyBhbmdsZTpyYWRpYW4gKiBSQURJQU5fVE9fREVHUkVFLCBsZW5ndGg6IEB3aWR0aCowLjUgfVxuXHRcdG91dGVyU2VnbWVudHMucHVzaCBzdHJva2VTZWdtZW50XG5cblx0XHQjIOWQhOODneOCpOODs+ODiOOBrue3mlxuXHRcdGZvciBpIGluIFsxLi5AcGF0aC5zZWdtZW50cy5sZW5ndGgtMl1cblx0XHRcdHByZXZTZWdtZW50ID0gQHBhdGguc2VnbWVudHNbaS0xXVxuXHRcdFx0c2VnbWVudCA9IEBwYXRoLnNlZ21lbnRzW2ldXG5cdFx0XHRuZXh0U2VnbWVudCA9IEBwYXRoLnNlZ21lbnRzW2krMV1cblxuXHRcdFx0aWYgc2VnbWVudC5oYW5kbGVJbi5sZW5ndGggPT0gMCAmJiBzZWdtZW50LmhhbmRsZU91dC5sZW5ndGggPT0gMFxuXHRcdFx0XHQjIOebtOe3muOBruWgtOWQiFxuXHRcdFx0XHRwcmV2UG9pbnQgPSBpZiBwcmV2U2VnbWVudC5oYW5kbGVPdXQubGVuZ3RoID09IDAgdGhlbiBwcmV2U2VnbWVudC5wb2ludCBlbHNlIHByZXZTZWdtZW50LnBvaW50LmFkZCBwcmV2U2VnbWVudC5oYW5kbGVPdXRcblx0XHRcdFx0bmV4dFBvaW50ID0gaWYgbmV4dFNlZ21lbnQuaGFuZGxlSW4ubGVuZ3RoID09IDAgdGhlbiBuZXh0U2VnbWVudC5wb2ludCBlbHNlIG5leHRTZWdtZW50LnBvaW50LmFkZCBuZXh0U2VnbWVudC5oYW5kbGVJblxuXHRcdFx0XHRwcmV2UmFkaWFuID0gTWF0aC5hdGFuMihwcmV2UG9pbnQueS1zZWdtZW50LnBvaW50LnksIHByZXZQb2ludC54LXNlZ21lbnQucG9pbnQueClcblx0XHRcdFx0bmV4dFJhZGlhbiA9IE1hdGguYXRhbjIobmV4dFBvaW50Lnktc2VnbWVudC5wb2ludC55LCBuZXh0UG9pbnQueC1zZWdtZW50LnBvaW50LngpXG5cdFx0XHRcdHN0cm9rZVNlZ21lbnQgPSBuZXcgcGFwZXIuU2VnbWVudCBAZ2V0QW5jaG9yUG9pbnQgc2VnbWVudC5wb2ludCwgcHJldlJhZGlhbiwgbmV4dFJhZGlhblxuXHRcdFx0ZWxzZVxuXHRcdFx0XHQjIOabsue3muOBruWgtOWQiFxuXHRcdFx0XHRwcmV2UG9pbnQgPSBwcmV2U2VnbWVudC5wb2ludFxuXHRcdFx0XHRpZiBzZWdtZW50LmhhbmRsZUluLmxlbmd0aCAhPSAwIHRoZW4gcHJldlBvaW50ID0gc2VnbWVudC5wb2ludC5hZGQgc2VnbWVudC5oYW5kbGVJblxuXHRcdFx0XHRlbHNlIGlmIHByZXZTZWdtZW50LmhhbmRsZU91dC5sZW5ndGggIT0gMCB0aGVuIHByZXZQb2ludCA9IHByZXZTZWdtZW50LnBvaW50LmFkZCBwcmV2U2VnbWVudC5oYW5kbGVPdXRcblx0XHRcdFx0bmV4dFBvaW50ID0gbmV4dFNlZ21lbnQucG9pbnRcblx0XHRcdFx0aWYgc2VnbWVudC5oYW5kbGVJbi5sZW5ndGggIT0gMCB0aGVuIG5leHRQb2ludCA9IHNlZ21lbnQucG9pbnQuYWRkIHNlZ21lbnQuaGFuZGxlSW5cblx0XHRcdFx0ZWxzZSBpZiBuZXh0U2VnbWVudC5oYW5kbGVPdXQubGVuZ3RoICE9IDAgdGhlbiBuZXh0UG9pbnQgPSBuZXh0U2VnbWVudC5wb2ludC5hZGQgbmV4dFNlZ21lbnQuaGFuZGxlT3V0XG5cblx0XHRcdFx0cHJldlJhZGlhbiA9IE1hdGguYXRhbjIocHJldlBvaW50Lnktc2VnbWVudC5wb2ludC55LCBwcmV2UG9pbnQueC1zZWdtZW50LnBvaW50LngpXG5cdFx0XHRcdG5leHRSYWRpYW4gPSBNYXRoLmF0YW4yKG5leHRQb2ludC55LXNlZ21lbnQucG9pbnQueSwgbmV4dFBvaW50Lngtc2VnbWVudC5wb2ludC54KVxuXHRcdFx0XHRyYWRpYW4gPSBwcmV2UmFkaWFuICsgKG5leHRSYWRpYW4gLSBwcmV2UmFkaWFuKSAqIDAuNSArIE1hdGguUEkgKiAwLjVcblx0XHRcdFx0aWYgcHJldlJhZGlhbiA+IG5leHRSYWRpYW5cblx0XHRcdFx0XHRyYWRpYW4gKz0gTWF0aC5QSVxuXHRcdFx0XHRzdHJva2VTZWdtZW50ID0gbmV3IHBhcGVyLlNlZ21lbnQgbmV3IHBhcGVyLlBvaW50IHNlZ21lbnQucG9pbnQuYWRkIG5ldyBwYXBlci5Qb2ludCB7IGFuZ2xlOnJhZGlhbiAqIFJBRElBTl9UT19ERUdSRUUsIGxlbmd0aDogQHdpZHRoKjAuNSB9XG5cblx0XHRcdG91dGVyU2VnbWVudHMucHVzaCBzdHJva2VTZWdtZW50XG5cblx0XHQjIOe1gueCuVxuXHRcdHNlZ21lbnQgPSBAcGF0aC5zZWdtZW50c1tAcGF0aC5zZWdtZW50cy5sZW5ndGgtMV1cblx0XHRwcmV2U2VnbWVudCA9IEBwYXRoLnNlZ21lbnRzW0BwYXRoLnNlZ21lbnRzLmxlbmd0aC0yXVxuXHRcdHJhZGlhbiA9IE1hdGguYXRhbjIocHJldlNlZ21lbnQucG9pbnQueS1zZWdtZW50LnBvaW50LnksIHByZXZTZWdtZW50LnBvaW50Lngtc2VnbWVudC5wb2ludC54KVxuXHRcdHJhZGlhbiArPSBNYXRoLlBJICogMC41XG5cdFx0c3Ryb2tlU2VnbWVudCA9IG5ldyBwYXBlci5TZWdtZW50IG5ldyBwYXBlci5Qb2ludCBzZWdtZW50LnBvaW50LmFkZCBuZXcgcGFwZXIuUG9pbnQgeyBhbmdsZTpyYWRpYW4gKiBSQURJQU5fVE9fREVHUkVFLCBsZW5ndGg6IEB3aWR0aCowLjUgfVxuXHRcdG91dGVyU2VnbWVudHMucHVzaCBzdHJva2VTZWdtZW50XG5cblx0XHQjIOODj+ODs+ODieODq+OBruOCs+ODlOODvFxuXHRcdGZvciBpIGluIFswLi4ub3V0ZXJTZWdtZW50cy5sZW5ndGhdXG5cdFx0XHRzZWdtZW50ID0gQHBhdGguc2VnbWVudHNbaV1cblx0XHRcdHN0cm9rZVNlZ21lbnQgPSBvdXRlclNlZ21lbnRzW2ldXG5cblx0XHRcdGlmIGkgPiAwICYmIHNlZ21lbnQuaGFuZGxlSW4ubGVuZ3RoICE9IDAgXG5cdFx0XHRcdHByZXZTZWdtZW50ID0gQHBhdGguc2VnbWVudHNbaS0xXVxuXHRcdFx0XHRwcmV2U3Ryb2tlU2VnbWVudCA9IG91dGVyU2VnbWVudHNbaS0xXVxuXHRcdFx0XHRkaXN0YW5jZSA9IHNlZ21lbnQucG9pbnQuZ2V0RGlzdGFuY2UocHJldlNlZ21lbnQucG9pbnQpXG5cdFx0XHRcdHN0cm9rZURpc3RhbmNlID0gc3Ryb2tlU2VnbWVudC5wb2ludC5nZXREaXN0YW5jZShwcmV2U3Ryb2tlU2VnbWVudC5wb2ludClcblx0XHRcdFx0cmF0aW8gPSBzdHJva2VEaXN0YW5jZSAvIGRpc3RhbmNlXG5cdFx0XHRcdHN0cm9rZVNlZ21lbnQuaGFuZGxlSW4gPSBuZXcgcGFwZXIuUG9pbnQge2FuZ2xlOiBzZWdtZW50LmhhbmRsZUluLmFuZ2xlLCBsZW5ndGg6IHNlZ21lbnQuaGFuZGxlSW4ubGVuZ3RoKnJhdGlvfVxuXG5cdFx0XHRpZiBpIDwgQHBhdGguc2VnbWVudHMubGVuZ3RoLTEgJiYgc2VnbWVudC5oYW5kbGVPdXQgIT0gMFxuXHRcdFx0XHRuZXh0U2VnbWVudCA9IEBwYXRoLnNlZ21lbnRzW2krMV1cblx0XHRcdFx0ZGlzdGFuY2UgPSBzZWdtZW50LnBvaW50LmdldERpc3RhbmNlKG5leHRTZWdtZW50LnBvaW50KVxuXHRcdFx0XHRzdHJva2VEaXN0YW5jZSA9IHNlZ21lbnQucG9pbnQuZ2V0RGlzdGFuY2UobmV4dFNlZ21lbnQucG9pbnQpXG5cdFx0XHRcdHJhdGlvID0gc3Ryb2tlRGlzdGFuY2UgLyBkaXN0YW5jZVxuXHRcdFx0XHRzdHJva2VTZWdtZW50LmhhbmRsZU91dCA9IG5ldyBwYXBlci5Qb2ludCB7YW5nbGU6IHNlZ21lbnQuaGFuZGxlT3V0LmFuZ2xlLCBsZW5ndGg6IHNlZ21lbnQuaGFuZGxlT3V0Lmxlbmd0aCpyYXRpb31cblxuXG5cdFx0I1xuXHRcdCMg5pmC6KiI5Zue44KK44Gu5YaF5YG0XG5cdFx0I1xuXG5cdFx0aW5uZXJTZWdtZW50cyA9IFtdXG5cdFx0XG5cdFx0IyDlp4vngrlcblx0XHRzZWdtZW50ID0gQHBhdGguc2VnbWVudHNbQHBhdGguc2VnbWVudHMubGVuZ3RoLTFdXG5cdFx0bmV4dFNlZ21lbnQgPSBAcGF0aC5zZWdtZW50c1tAcGF0aC5zZWdtZW50cy5sZW5ndGgtMl1cblx0XHRyYWRpYW4gPSBNYXRoLmF0YW4yKG5leHRTZWdtZW50LnBvaW50Lnktc2VnbWVudC5wb2ludC55LCBuZXh0U2VnbWVudC5wb2ludC54LXNlZ21lbnQucG9pbnQueClcblx0XHRyYWRpYW4gLT0gTWF0aC5QSSAqIDAuNVxuXHRcdHN0cm9rZVNlZ21lbnQgPSBuZXcgcGFwZXIuU2VnbWVudCBuZXcgcGFwZXIuUG9pbnQgc2VnbWVudC5wb2ludC5hZGQgbmV3IHBhcGVyLlBvaW50IHsgYW5nbGU6cmFkaWFuICogUkFESUFOX1RPX0RFR1JFRSwgbGVuZ3RoOiBAd2lkdGgqMC41IH1cblx0XHRpbm5lclNlZ21lbnRzLnVuc2hpZnQgc3Ryb2tlU2VnbWVudFxuXHRcdFxuXHRcdCMg5ZCE44Od44Kk44Oz44OI44Gu57eaXG5cdFx0Zm9yIGkgaW4gW0BwYXRoLnNlZ21lbnRzLmxlbmd0aC0yLi4xXVxuXHRcdFx0cHJldlNlZ21lbnQgPSBAcGF0aC5zZWdtZW50c1tpLTFdXG5cdFx0XHRzZWdtZW50ID0gQHBhdGguc2VnbWVudHNbaV1cblx0XHRcdG5leHRTZWdtZW50ID0gQHBhdGguc2VnbWVudHNbaSsxXVxuXG5cdFx0XHRpZiBzZWdtZW50LmhhbmRsZUluLmxlbmd0aCA9PSAwICYmIHNlZ21lbnQuaGFuZGxlT3V0Lmxlbmd0aCA9PSAwXG5cdFx0XHRcdCMg55u057ea44Gu5aC05ZCIXG5cdFx0XHRcdHByZXZQb2ludCA9IGlmIHByZXZTZWdtZW50LmhhbmRsZU91dC5sZW5ndGggPT0gMCB0aGVuIHByZXZTZWdtZW50LnBvaW50IGVsc2UgcHJldlNlZ21lbnQucG9pbnQuYWRkIHByZXZTZWdtZW50LmhhbmRsZU91dFxuXHRcdFx0XHRuZXh0UG9pbnQgPSBpZiBuZXh0U2VnbWVudC5oYW5kbGVJbi5sZW5ndGggPT0gMCB0aGVuIG5leHRTZWdtZW50LnBvaW50IGVsc2UgbmV4dFNlZ21lbnQucG9pbnQuYWRkIG5leHRTZWdtZW50LmhhbmRsZUluXG5cdFx0XHRcdHByZXZSYWRpYW4gPSBNYXRoLmF0YW4yKHByZXZQb2ludC55LXNlZ21lbnQucG9pbnQueSwgcHJldlBvaW50Lngtc2VnbWVudC5wb2ludC54KVxuXHRcdFx0XHRuZXh0UmFkaWFuID0gTWF0aC5hdGFuMihuZXh0UG9pbnQueS1zZWdtZW50LnBvaW50LnksIG5leHRQb2ludC54LXNlZ21lbnQucG9pbnQueClcblx0XHRcdFx0c3Ryb2tlU2VnbWVudCA9IG5ldyBwYXBlci5TZWdtZW50IEBnZXRBbmNob3JQb2ludCBzZWdtZW50LnBvaW50LCBuZXh0UmFkaWFuLCBwcmV2UmFkaWFuXG5cdFx0XHRlbHNlXG5cdFx0XHRcdCMg5puy57ea44Gu5aC05ZCIXG5cdFx0XHRcdHByZXZQb2ludCA9IHByZXZTZWdtZW50LnBvaW50XG5cdFx0XHRcdGlmIHNlZ21lbnQuaGFuZGxlSW4ubGVuZ3RoICE9IDAgdGhlbiBwcmV2UG9pbnQgPSBzZWdtZW50LnBvaW50LmFkZCBzZWdtZW50LmhhbmRsZUluXG5cdFx0XHRcdGVsc2UgaWYgcHJldlNlZ21lbnQuaGFuZGxlT3V0Lmxlbmd0aCAhPSAwIHRoZW4gcHJldlBvaW50ID0gcHJldlNlZ21lbnQucG9pbnQuYWRkIHByZXZTZWdtZW50LmhhbmRsZU91dFxuXHRcdFx0XHRuZXh0UG9pbnQgPSBuZXh0U2VnbWVudC5wb2ludFxuXHRcdFx0XHRpZiBzZWdtZW50LmhhbmRsZUluLmxlbmd0aCAhPSAwIHRoZW4gbmV4dFBvaW50ID0gc2VnbWVudC5wb2ludC5hZGQgc2VnbWVudC5oYW5kbGVJblxuXHRcdFx0XHRlbHNlIGlmIG5leHRTZWdtZW50LmhhbmRsZU91dC5sZW5ndGggIT0gMCB0aGVuIG5leHRQb2ludCA9IG5leHRTZWdtZW50LnBvaW50LmFkZCBuZXh0U2VnbWVudC5oYW5kbGVPdXRcblxuXHRcdFx0XHRwcmV2UmFkaWFuID0gTWF0aC5hdGFuMihwcmV2UG9pbnQueS1zZWdtZW50LnBvaW50LnksIHByZXZQb2ludC54LXNlZ21lbnQucG9pbnQueClcblx0XHRcdFx0bmV4dFJhZGlhbiA9IE1hdGguYXRhbjIobmV4dFBvaW50Lnktc2VnbWVudC5wb2ludC55LCBuZXh0UG9pbnQueC1zZWdtZW50LnBvaW50LngpXG5cdFx0XHRcdHJhZGlhbiA9IHByZXZSYWRpYW4gKyAobmV4dFJhZGlhbiAtIHByZXZSYWRpYW4pICogMC41IC0gTWF0aC5QSSAqIDAuNVxuXHRcdFx0XHRpZiBwcmV2UmFkaWFuID4gbmV4dFJhZGlhblxuXHRcdFx0XHRcdHJhZGlhbiArPSBNYXRoLlBJXG5cdFx0XHRcdHN0cm9rZVNlZ21lbnQgPSBuZXcgcGFwZXIuU2VnbWVudCBuZXcgcGFwZXIuUG9pbnQgc2VnbWVudC5wb2ludC5hZGQgbmV3IHBhcGVyLlBvaW50IHsgYW5nbGU6cmFkaWFuICogUkFESUFOX1RPX0RFR1JFRSwgbGVuZ3RoOiBAd2lkdGgqMC41IH1cblxuXHRcdFx0aW5uZXJTZWdtZW50cy51bnNoaWZ0IHN0cm9rZVNlZ21lbnRcblxuXHRcdCMg57WC54K5XG5cdFx0c2VnbWVudCA9IEBwYXRoLnNlZ21lbnRzWzBdXG5cdFx0cHJldlNlZ21lbnQgPSBAcGF0aC5zZWdtZW50c1sxXVxuXHRcdHJhZGlhbiA9IE1hdGguYXRhbjIocHJldlNlZ21lbnQucG9pbnQueS1zZWdtZW50LnBvaW50LnksIHByZXZTZWdtZW50LnBvaW50Lngtc2VnbWVudC5wb2ludC54KVxuXHRcdHJhZGlhbiArPSBNYXRoLlBJICogMC41XG5cdFx0c3Ryb2tlU2VnbWVudCA9IG5ldyBwYXBlci5TZWdtZW50IG5ldyBwYXBlci5Qb2ludCBzZWdtZW50LnBvaW50LmFkZCBuZXcgcGFwZXIuUG9pbnQgeyBhbmdsZTpyYWRpYW4gKiBSQURJQU5fVE9fREVHUkVFLCBsZW5ndGg6IEB3aWR0aCowLjUgfVxuXHRcdGlubmVyU2VnbWVudHMudW5zaGlmdCBzdHJva2VTZWdtZW50XG5cdFx0XG5cdFx0IyDjg4/jg7Pjg4njg6vjga7jgrPjg5Tjg7xcblx0XHRmb3IgaSBpbiBbMC4uLmlubmVyU2VnbWVudHMubGVuZ3RoXVxuXHRcdFx0c2VnbWVudCA9IEBwYXRoLnNlZ21lbnRzW2ldXG5cdFx0XHRzdHJva2VTZWdtZW50ID0gaW5uZXJTZWdtZW50c1tpXVxuXG5cdFx0XHRpZiBpID4gMCAmJiBzZWdtZW50LmhhbmRsZU91dC5sZW5ndGggIT0gMCBcblx0XHRcdFx0cHJldlNlZ21lbnQgPSBAcGF0aC5zZWdtZW50c1tpLTFdXG5cdFx0XHRcdHByZXZTdHJva2VTZWdtZW50ID0gaW5uZXJTZWdtZW50c1tpLTFdXG5cdFx0XHRcdGRpc3RhbmNlID0gc2VnbWVudC5wb2ludC5nZXREaXN0YW5jZShwcmV2U2VnbWVudC5wb2ludClcblx0XHRcdFx0c3Ryb2tlRGlzdGFuY2UgPSBzdHJva2VTZWdtZW50LnBvaW50LmdldERpc3RhbmNlKHByZXZTdHJva2VTZWdtZW50LnBvaW50KVxuXHRcdFx0XHRyYXRpbyA9IHN0cm9rZURpc3RhbmNlIC8gZGlzdGFuY2Vcblx0XHRcdFx0c3Ryb2tlU2VnbWVudC5oYW5kbGVJbiA9IG5ldyBwYXBlci5Qb2ludCB7YW5nbGU6IHNlZ21lbnQuaGFuZGxlT3V0LmFuZ2xlLCBsZW5ndGg6IHNlZ21lbnQuaGFuZGxlT3V0Lmxlbmd0aCpyYXRpb31cblxuXHRcdFx0aWYgaSA8IEBwYXRoLnNlZ21lbnRzLmxlbmd0aC0xICYmIHNlZ21lbnQuaGFuZGxlSW4gIT0gMFxuXHRcdFx0XHRuZXh0U2VnbWVudCA9IEBwYXRoLnNlZ21lbnRzW2krMV1cblx0XHRcdFx0ZGlzdGFuY2UgPSBzZWdtZW50LnBvaW50LmdldERpc3RhbmNlKG5leHRTZWdtZW50LnBvaW50KVxuXHRcdFx0XHRzdHJva2VEaXN0YW5jZSA9IHNlZ21lbnQucG9pbnQuZ2V0RGlzdGFuY2UobmV4dFNlZ21lbnQucG9pbnQpXG5cdFx0XHRcdHJhdGlvID0gc3Ryb2tlRGlzdGFuY2UgLyBkaXN0YW5jZVxuXHRcdFx0XHRzdHJva2VTZWdtZW50LmhhbmRsZU91dCA9IG5ldyBwYXBlci5Qb2ludCB7YW5nbGU6IHNlZ21lbnQuaGFuZGxlSW4uYW5nbGUsIGxlbmd0aDogc2VnbWVudC5oYW5kbGVJbi5sZW5ndGgqcmF0aW99XG5cblxuXHRcdCNcblx0XHQjIOinkuS4uOWHpueQhlxuXHRcdCNcblx0XHRmb3IgaSBpbiBbMC4uLm91dGVyU2VnbWVudHMubGVuZ3RoXVxuXHRcdFx0c3Ryb2tlU2VnbWVudCA9IG91dGVyU2VnbWVudHNbaV1cblx0XHRcdGlmIGkgPiAwIHRoZW4gcHJldlBvaW50ID0gb3V0ZXJTZWdtZW50c1tpLTFdLnBvaW50XG5cdFx0XHRlbHNlIHByZXZQb2ludCA9IEBwYXRoLnNlZ21lbnRzWzBdLnBvaW50XG5cdFx0XHRpZiBpIDwgb3V0ZXJTZWdtZW50cy5sZW5ndGggLSAxIHRoZW4gbmV4dFBvaW50ID0gb3V0ZXJTZWdtZW50c1tpKzFdLnBvaW50XG5cdFx0XHRlbHNlIG5leHRQb2ludCA9IEBwYXRoLnNlZ21lbnRzW0BwYXRoLnNlZ21lbnRzLmxlbmd0aC0xXS5wb2ludFxuXHRcdFx0ciA9IGlmIGkgPj0gQHNldHRpbmdzLmxlbmd0aCB0aGVuIDAgZWxzZSBAc2V0dGluZ3NbaV1bMF1cblx0XHRcdHBvaW50cyA9IEBnZXRSb3VuZGVkQ29ybmVyQW5jaG9yUG9pbnRzKCByLCBzdHJva2VTZWdtZW50LnBvaW50LCBwcmV2UG9pbnQsIG5leHRQb2ludClcblx0XHRcdGZvciBwb2ludCBpbiBwb2ludHMgXG5cdFx0XHRcdEBhZGQgcG9pbnRcblxuXHRcdGZvciBpIGluIFtpbm5lclNlZ21lbnRzLmxlbmd0aC0xLi4wXVxuXHRcdFx0c3Ryb2tlU2VnbWVudCA9IGlubmVyU2VnbWVudHNbaV1cblx0XHRcdGlmIGkgPiAwIHRoZW4gcHJldlBvaW50ID0gaW5uZXJTZWdtZW50c1tpLTFdLnBvaW50XG5cdFx0XHRlbHNlIHByZXZQb2ludCA9IEBwYXRoLnNlZ21lbnRzWzBdLnBvaW50XG5cdFx0XHRpZiBpIDwgaW5uZXJTZWdtZW50cy5sZW5ndGggLSAxIHRoZW4gbmV4dFBvaW50ID0gaW5uZXJTZWdtZW50c1tpKzFdLnBvaW50XG5cdFx0XHRlbHNlIG5leHRQb2ludCA9IEBwYXRoLnNlZ21lbnRzW0BwYXRoLnNlZ21lbnRzLmxlbmd0aC0xXS5wb2ludFxuXHRcdFx0ciA9IGlmIGkgPj0gQHNldHRpbmdzLmxlbmd0aCB0aGVuIDAgZWxzZSBAc2V0dGluZ3NbaV1bMV1cblx0XHRcdHBvaW50cyA9IEBnZXRSb3VuZGVkQ29ybmVyQW5jaG9yUG9pbnRzKCByLCBzdHJva2VTZWdtZW50LnBvaW50LCBuZXh0UG9pbnQsIHByZXZQb2ludClcblx0XHRcdGZvciBwb2ludCBpbiBwb2ludHMgXG5cdFx0XHRcdEBhZGQgcG9pbnRcblxuXHRcdCMgQGFkZCBAc2VnbWVudHNbMF0uY2xvbmUoKVxuXG5cdFx0cmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gQ3VzdG9tU3Ryb2tlXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9fY29mZmVlL2Zvcm1hdC9jdXN0b20tc3Ryb2tlLmNvZmZlZVxuICoqLyIsIkNvbmZpZ1x0PSByZXF1aXJlICdjb25maWcnXG5VdGlsc1x0XHQ9IHJlcXVpcmUgJ3V0aWxzJ1xuXG4jIFxuIyDjg63jgrTjgr/jgqTjg5fjgqrjg5bjgrjjgqfjgq/jg4hcbiMgQHBhcmFtIHtPYmplY3R9IHBhdGg6IOODkeOCueODh+ODvOOCv1xuIyBcbmNsYXNzIExvZ29UeXBlIGV4dGVuZHMgcGFwZXIuR3JvdXBcblx0Y29uc3RydWN0b3I6IChwYXRoZXMpIC0+XG5cdFx0c3VwZXIoKVxuXHRcdEBwYXRoZXMgPSBbXVxuXG5cdFx0VXRpbHMudHJhbnNmb3JtSW5pdCBAXG5cblx0XHRAbG9nb1R5cGVTVkcgPSBAaW1wb3J0U1ZHIENvbmZpZy5TVkcuTE9HT19UWVBFXG5cdFx0QGxvZ29UeXBlU1ZHLnJlbW92ZSgpXG5cblx0XHQjIOODkeOCueioreWumlxuXHRcdGZvciBwYXRoIGluIEBsb2dvVHlwZVNWRy5jaGlsZHJlblxuXHRcdFx0VXRpbHMudHJhbnNmb3JtSW5pdCBwYXRoLCBmYWxzZVxuXHRcdFx0cGF0aC5maWxsQ29sb3IgPSBDb25maWcuQ09MT1IuTE9HT19UWVBFX0ZJTExcblx0XHRcdHBhdGguc3Ryb2tlV2lkdGggPSAwXG5cdFx0XHRAcGF0aGVzLnB1c2ggcGF0aFxuXG5cdFx0QGFkZENoaWxkcmVuIEBwYXRoZXNcblxuXHRcdEBwcmVzcyA9IDBcblxuXHRcdEBpbml0KClcblxuXHRcdHJldHVyblxuXG5cdCMgXG5cdCMg44Kk44OL44K344Oj44Op44Kk44K6XG5cdCMgXG5cdGluaXQ6IC0+XG5cdFx0QF9vbkluaXQoKVxuXHRcdHJldHVyblxuXG5cdCMgXG5cdCMg44Ki44OD44OX44OH44O844OIXG5cdCMgXG5cdHVwZGF0ZTogPT5cblx0XHRAX29uVXBkYXRlKClcblx0XHRyZXR1cm5cblxuXHQjIFxuXHQjIOODnuOCpuOCueOCkuaKvOOBl+OBn+aZglxuXHQjIFxuXHRkb3duOiA9PlxuXHRcdEBfb25Eb3duKClcblx0XHRyZXR1cm5cblx0XG5cdCMgXG5cdCMg44Oe44Km44K544KS6Zui44GX44Gf5pmCXG5cdCMgXG5cdHVwOiA9PlxuXHRcdEBfb25VcCgpXG5cdFx0cmV0dXJuXG5cbiMqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4jIOOCteODluOCr+ODqeOCueOBp+Wun+ijheOBmeOBueOBjeODoeOCveODg+ODiVxuIyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblx0IyBcblx0IyBcblx0IyBcblx0X29uSW5pdDogLT5cblx0XHRyZXR1cm5cblxuXHQjIFxuXHQjIFxuXHQjIFxuXHRfb25VcGRhdGU6IC0+XG5cdFx0cmV0dXJuXG5cblx0IyBcblx0IyBcblx0IyBcblx0X29uRG93bjogLT5cblx0XHRyZXR1cm5cblxuXHQjIFxuXHQjIFxuXHQjIFxuXHRfb25VcDogLT5cblx0XHRyZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBMb2dvVHlwZVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vX2NvZmZlZS9mb3JtYXQvbG9nby10eXBlLmNvZmZlZVxuICoqLyIsIkNvbmZpZ1x0PSByZXF1aXJlICdjb25maWcnXG5VdGlsc1x0XHQ9IHJlcXVpcmUgJ3V0aWxzJ1xuXG4jIFxuIyBwYXBlci5qc+eUqENhbnZhc+OCr+ODqeOCuVxuIyBAcGFyYW0ge09iamVjdH0gY2FudmFzOiBwYXBlci5qc+aPj+eUu+eUqGNhbnZhc1xuIyBcbmNsYXNzIFBhcGVyU3RhZ2Vcblx0QGluc3RhbmNlOiBudWxsICMg44Gp44GT44GL44KJ44Gn44KC44Ki44Kv44K744K544Gn44GN44KL44KI44GG44GrXG5cdEBISURFOiAxXG5cdEBTSE9XOiAyXG5cdEBTSE9XX0FMTDogM1xuXHRjb25zdHJ1Y3RvcjogKCRjYW52YXMpIC0+XG5cdFx0QCRjYW52YXMgPSAkY2FudmFzXG5cdFx0QGNhbnZhcyA9IEAkY2FudmFzLmdldCgwKVxuXHRcdEBhbmNob3JTaG93U3RhdHVzID0gUGFwZXJTdGFnZS5ISURFXG5cdFx0cGFwZXIuc2V0dXAoQGNhbnZhcylcblxuXHRcdCMg44Or44O844OI44Os44Kk44Ok6Kit5a6aXG5cdFx0QHN0YWdlID0gcGFwZXIucHJvamVjdC5hY3RpdmVMYXllclxuXG5cdFx0VXRpbHMudHJhbnNmb3JtSW5pdCBAc3RhZ2VcblxuXHRcdFBhcGVyU3RhZ2UuaW5zdGFuY2UgPSBAXG5cblx0IyBcblx0IyDjg6rjgrXjgqTjgrpcblx0IyBcblx0cmVzaXplOiAod2lkdGgsIGhlaWdodCktPlxuXHRcdEBfd2lkdGggPSB3aWR0aFxuXHRcdEBfaGVpZ2h0ID0gaGVpZ2h0XG5cdFx0QGRwciA9IGlmIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID09IHVuZGVmaW5lZCB0aGVuIDEgZWxzZSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb1xuXHRcdFxuXHRcdCMgQ2FudmFz44K144Kk44K66Kit5a6aXG5cdFx0aWYgVUEuY2FyZWVyICE9IFVBLklQSE9ORSAmJiBVQS5jYXJlZXIgIT0gVUEuSVBBRFxuXHRcdFx0cGFwZXIudmlldy5zZXRWaWV3U2l6ZShAX3dpZHRoIC8gQGRwciwgQF9oZWlnaHQgLyBAZHByKVxuXHRcdFx0QCRjYW52YXMuY3NzKFxuXHRcdFx0XHR3aWR0aDogQF93aWR0aFxuXHRcdFx0XHRoZWlnaHQ6IEBfaGVpZ2h0XG5cdFx0XHQpXG5cdFx0XHRAJGNhbnZhcy5hdHRyXHQoXG5cdFx0XHRcdHdpZHRoOiBAX3dpZHRoXG5cdFx0XHRcdGhlaWdodDogQF9oZWlnaHRcblx0XHRcdClcblx0XHRlbHNlXG5cdFx0XHRwYXBlci52aWV3LnNldFZpZXdTaXplKEBfd2lkdGgsIEBfaGVpZ2h0KVxuXG5cdFx0IyDjg5zjgr/jg7PjgrnjgrHjg7zjg6voqK3lrppcblx0XHRAc2NhbGUgPSAoIChpZiBAX3dpZHRoIDwgQF9oZWlnaHQgdGhlbiBAX3dpZHRoIGVsc2UgQF9oZWlnaHQpIC8gQ29uZmlnLkJBU0VfU1RBR0VfV0lEVEggKVxuXHRcdGlmIEBzY2FsZSA+IDIgdGhlbiBAc2NhbGUgPSAyXG5cblx0XHRAc3RhZ2UubWF0cml4ID0gbmV3IHBhcGVyLk1hdHJpeCgpXG5cdFx0QHN0YWdlLnNjYWxlKEBzY2FsZSwgQHNjYWxlKVxuXG5cdFx0IyDjg5zjgr/jg7PkvY3nva7oqK3lrppcblx0XHRfeCA9IEBfd2lkdGggLyAyXG5cdFx0X3kgPSBAX2hlaWdodCAvIDJcblxuXHRcdCMg44K544Kx44O844Oq44Oz44Kw44GV44KM44Gf5aSn44GN44GVXG5cdFx0QHdpZHRoID0gd2lkdGggLyBAc2NhbGVcblx0XHRAaGVpZ2h0ID0gaGVpZ2h0IC8gQHNjYWxlXG5cblx0XHRAc3RhZ2UucG9zaXRpb24gPSBuZXcgcGFwZXIuUG9pbnQoX3gsIF95KVxuXHRcdHJldHVyblxuXG5cdCMgXG5cdCMg44Ki44OD44OX44OH44O844OIXG5cdCMgXG5cdHVwZGF0ZTogKCktPlxuXHRcdHN3aXRjaCBwYXJzZUludChAYW5jaG9yU2hvd1N0YXR1cylcblx0XHRcdHdoZW4gUGFwZXJTdGFnZS5ISURFXG5cdFx0XHRcdEBzdGFnZS5zZWxlY3RlZCA9IGZhbHNlXG5cdFx0XHRcdEBzdGFnZS5mdWxseVNlbGVjdGVkID0gZmFsc2VcblxuXHRcdFx0d2hlbiBQYXBlclN0YWdlLlNIT1dcblx0XHRcdFx0QHN0YWdlLmZ1bGx5U2VsZWN0ZWQgPSBmYWxzZVxuXHRcdFx0XHRAc3RhZ2Uuc2VsZWN0ZWQgPSB0cnVlXG5cblx0XHRcdHdoZW4gUGFwZXJTdGFnZS5TSE9XX0FMTFxuXHRcdFx0XHRAc3RhZ2Uuc2VsZWN0ZWQgPSBmYWxzZVxuXHRcdFx0XHRAc3RhZ2UuZnVsbHlTZWxlY3RlZCA9IHRydWVcblxuXHRcdHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhcGVyU3RhZ2VcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL19jb2ZmZWUvc3RhZ2UvcGFwZXItc3RhZ2UuY29mZmVlXG4gKiovIiwiQ29uZmlnXHQ9IHJlcXVpcmUgJ2NvbmZpZydcblV0aWxzXHRcdD0gcmVxdWlyZSAndXRpbHMnXG5cbiNcbiMgU291bmRNYW5hZ2Vy44Kv44Op44K5XG4jXG5jbGFzcyBTb3VuZE1hbmFnZXJcblx0QHNoYXJlZEluc3RhbmNlOiBudWxsXG5cblx0QGluaXQ6ID0+XG5cdFx0QGlzSW5pdGlhbGl6ZWQgPSBmYWxzZVxuXHRcdEBpc1NlY3JldExvYWRlZCA9IGZhbHNlXG5cdFx0QGluc3RhbmNlcyA9IHt9XG5cdFx0QGdldERlZmF1bHRKc29uKClcblx0XHRyZXR1cm5cblxuXHQjIFxuXHQjIGRlZmF1bHQuanNvbuiqreOBv+i+vOOBv1xuXHQjIFxuXHRAZ2V0RGVmYXVsdEpzb246IC0+XG5cdFx0IyDjgrXjgqbjg7Pjg4kganNvbiDoqq3jgb/ovrzjgb9cblx0XHQkLmFqYXgoe1xuXHRcdFx0dHlwZSA6ICdHRVQnXG5cdFx0XHR1cmwgOiBDb25maWcuU291bmRKc29uLmRlZmF1bHRcblx0XHRcdGRhdGFUeXBlOiAnanNvbidcblx0XHR9KVxuXHRcdC5kb25lKEBvbkxvYWRKc29uKVxuXHRcdC5mYWlsKEBvbkZhaWxKc29uKVxuXHRcdHJldHVyblxuXG5cdCMgXG5cdCMgc2VjcmV0Lmpzb27oqq3jgb/ovrzjgb9cblx0IyBcblx0QGdldFNlY3JldEpzb246IC0+XG5cdFx0QGlzU2VjcmV0TG9hZGVkID0gdHJ1ZVxuXHRcdCQuYWpheCh7XG5cdFx0XHR0eXBlIDogJ0dFVCdcblx0XHRcdHVybCA6IENvbmZpZy5Tb3VuZEpzb24uc2VjcmV0XG5cdFx0XHRkYXRhVHlwZTogJ2pzb24nXG5cdFx0fSlcblx0XHQuZG9uZShAaW5pdFNvdW5kKVxuXHRcdC5mYWlsKEBvbkZhaWxKc29uKVxuXHRcdHJldHVyblxuXG5cblx0IyBcblx0IyBqc29u6Kqt44G/6L6844G/5pmCXG5cdCMgQHBhcmFtIHtPYmplY3R9IGpzb246IOOCquODvOODh+OCo+OCquOCueODl+ODqeOCpOODiOaDheWgsUpTT05cblx0IyBcblx0QG9uTG9hZEpzb246IChqc29uKT0+XG5cdFx0IyDpn7Pps7TjgonjgZnjgZ/jgoHjgavmnIDliJ3jga7jgr/jg4Pjg4Hjgqjjg7Pjg4njgadTb3VuZE1hbmFnZXLjga5pbml044KS44Kz44O844Or44GZ44KLXG5cdFx0aWYgL2lQaG9uZXxpUGFkfGlQb2QvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXG5cdFx0XHQkKHdpbmRvdykub24gJ3RvdWNoc3RhcnQuU291bmRNYW5hZ2VyJywgKCk9PiBAaW5pdFNvdW5kIGpzb25cblx0XHRlbHNlXG5cdFx0XHRAaW5pdFNvdW5kIGpzb25cblxuXHRcdHJldHVyblxuXG5cdCMgXG5cdCMganNvbuWPluW+l+WkseaVl1xuXHQjIFxuXHRAb25GYWlsSnNvbjogKCk9PlxuXHRcdHRocm93IFwianNvbuOBruiqreOBv+i+vOOBv+OBq+WkseaVl+OBl+OBvuOBl+OBn+OAglwiXG5cdFx0cmV0dXJuXG5cblx0IyBcblx0IyDjgrnjg5fjg6njgqTjg4joqK3lrppcblx0IyBAcGFyYW0ge09iamVjdH0ganNvbjog44Kq44O844OH44Kj44Kq44K544OX44Op44Kk44OI5oOF5aCxSlNPTlxuXHQjIFxuXHRAaW5pdFNvdW5kOiAoanNvbik9PlxuXHRcdCQod2luZG93KS5vZmYgJ3RvdWNoc3RhcnQuU291bmRNYW5hZ2VyJ1xuXG5cdFx0Y3JlYXRlanMuU291bmQuaW5pdGlhbGl6ZURlZmF1bHRQbHVnaW5zKClcblx0XHRpZiAvaVBob25lfGlQYWR8aVBvZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcblx0XHRcdGNyZWF0ZWpzLldlYkF1ZGlvUGx1Z2luLnBsYXlFbXB0eVNvdW5kKClcblxuXHRcdHNvdW5kcyA9IFtqc29uXVxuXHRcdGFzc2V0UGF0aCA9ICcnXG5cdFx0Y3JlYXRlanMuU291bmQuYWx0ZXJuYXRlRXh0ZW5zaW9ucyA9IFsnbXAzJ11cblx0XHRjcmVhdGVqcy5Tb3VuZC5vbignZmlsZWxvYWQnLCBAb25Mb2FkUmVzb3VyY2UpXG5cdFx0Y3JlYXRlanMuU291bmQucmVnaXN0ZXJTb3VuZHMoc291bmRzLCBhc3NldFBhdGgpXG5cblx0XHRyZXR1cm5cblxuXHQjIFxuXHQjIOOCueODl+ODqeOCpOODiOODleOCoeOCpOODq+iqreOBv+i+vOOBv+aZglxuXHQjIFxuXHRAb25Mb2FkUmVzb3VyY2U6ID0+XG5cdFx0QGlzSW5pdGlhbGl6ZWQgPSB0cnVlXG5cblx0XHQjIOOCt+ODvOOCr+ODrOODg+ODiOeUqGpzb27oqq3jgb/ovrzjgb9cblx0XHRpZiAhQGlzU2VjcmV0TG9hZGVkIHRoZW4gQGdldFNlY3JldEpzb24oKVxuXG5cdFx0IyBUT0RP5LiA5pem44KE44KB44KLXG5cdFx0IyAkKHdpbmRvdylcblx0XHQjIFx0Lm9uICdmb2N1cycsIEBvbldpbmRvd0ZvY3VzXG5cdFx0IyBcdC5vbiAnYmx1cicsIEBvbldpbmRvd0JsdXJcblx0XHQjIFx0Lm9uICdwYWdlc2hvdycsIEBvbldpbmRvd0ZvY3VzXG5cdFx0IyBcdC5vbiAncGFnZWhpZGUnLCBAb25XaW5kb3dCbHVyXG5cblx0XHRyZXR1cm5cblxuXHQjIFxuXHQjIOWGjeeUn1xuXHQjIEBwYXJhbSB7U3RyaW5nfSBpZDog5YaN55Sf44GZ44KL44K544OX44Op44Kk44OISURcblx0IyBAcGFyYW0ge2Zsb29yfSBkdXJhdGlvbjog44OV44Kn44O844OJ44Kk44Oz5pmC6ZaTKG1zKVxuXHQjIEBwYXJhbSB7Qm9vbGVhbn0gaXNMb29wZWQ6IOODq+ODvOODl+ODleODqeOCsFxuXHQjIEBwYXJhbSB7T2JqZWN0fSBvblBsYXk6IOWGjeeUn+e1guS6huaZguOBruOCs+ODvOODq+ODkOODg+OCr1xuXHQjIEBwYXJhbSB7T2JqZWN0fSBvbkVuZDog5YaN55Sf6ZaL5aeL5pmC44Gu44Kz44O844Or44OQ44OD44KvXG5cdCMgXG5cdEBwbGF5OiAoaWQsIGR1cmF0aW9uLCBpc0xvb3BlZCwgb25FbmQsIG9uUGxheSktPlxuXHRcdGlmICFAaXNJbml0aWFsaXplZCB0aGVuIHJldHVyblxuXHRcdGlmIHR5cGVvZiBpZCA9PSBcInVuZGVmaW5lZFwiIHRoZW4gcmV0dXJuXG5cdFx0aWYgQGluc3RhbmNlc1tpZF0/IHRoZW4gcmV0dXJuXG5cblx0XHRwYXJhbXMgPSB7fVxuXHRcdGlmIGlzTG9vcGVkIHRoZW4gcGFyYW1zLmxvb3AgPSAtMVxuXG5cdFx0aW5zdGFuY2UgPSBjcmVhdGVqcy5Tb3VuZC5wbGF5KGlkLHBhcmFtcylcblx0XHRAaW5zdGFuY2VzW2lkXSA9IGluc3RhbmNlXG5cdFx0aW5zdGFuY2UuaXNQbGF5aW5nID0gdHJ1ZVxuXG5cdFx0IyDjg5Xjgqfjg7zjg4njgqTjg7Ncblx0XHRpZiBkdXJhdGlvbj9cblx0XHRcdGlmIGluc3RhbmNlLnR3ZWVuPyB0aGVuIGluc3RhbmNlLnR3ZWVuLnN0b3AoKVxuXHRcdFx0aW5zdGFuY2Uudm9sdW1lID0gMFxuXHRcdFx0aW5zdGFuY2UuZmFkZVZvbHVtZSA9IDBcblx0XHRcdGluc3RhbmNlLnR3ZWVuID0gbmV3IFRXRUVOLlR3ZWVuKGluc3RhbmNlKVxuXHRcdFx0XHQuZWFzaW5nKCBUV0VFTi5FYXNpbmcuQ3ViaWMuSW5PdXQgKVxuXHRcdFx0XHQudG8oe2ZhZGVWb2x1bWU6MX0sZHVyYXRpb24pXG5cdFx0XHRcdC5vblVwZGF0ZSAtPlxuXHRcdFx0XHRcdGluc3RhbmNlLnNldFZvbHVtZShpbnN0YW5jZS5mYWRlVm9sdW1lKVxuXHRcdFx0XHQuc3RhcnQoKVxuXG5cdFx0IyBJROOCr+ODquOCouWHpueQhlxuXHRcdGluc3RhbmNlLmFkZEV2ZW50TGlzdGVuZXIgJ2NvbXBsZXRlJywgKCk9PlxuXHRcdFx0QGluc3RhbmNlc1tpZF0gPSBudWxsXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMg44Kk44OZ44Oz44OI6L+95YqgXG5cdFx0aWYgb25FbmQ/IHRoZW4gaW5zdGFuY2UuYWRkRXZlbnRMaXN0ZW5lciAnY29tcGxldGUnLCBvbkVuZFxuXHRcdGlmIG9uUGxheT8gdGhlbiBpbnN0YW5jZS5hZGRFdmVudExpc3RlbmVyICdzdWNjZWVkZWQnLCBvblBsYXlcblxuXHRcdHJldHVyblxuXG5cdCMgXG5cdCMg5YGc5q2iXG5cdCMgQHBhcmFtIHtTdHJpbmd9IGlkOiDlho3nlJ/jgZnjgovjgrnjg5fjg6njgqTjg4hJRFxuXHQjIEBwYXJhbSB7Zmxvb3J9IGR1cmF0aW9uOiDjg5Xjgqfjg7zjg4njgqTjg7PmmYLplpMobXMpXG5cdCMgXG5cdEBzdG9wOiAoaWQsZHVyYXRpb24gPSAxMDApPT5cblx0XHRpZiAhQGlzSW5pdGlhbGl6ZWQgdGhlbiByZXR1cm5cblx0XHRpZiB0eXBlb2YgaWQgPT0gXCJ1bmRlZmluZWRcIiB0aGVuIHJldHVyblxuXHRcdGluc3RhbmNlID0gQGluc3RhbmNlc1tpZF1cblx0XHRpZiAhaW5zdGFuY2U/IHRoZW4gcmV0dXJuXG5cdFx0aWYgIWluc3RhbmNlLmlzUGxheWluZyB0aGVuIHJldHVyblxuXG5cdFx0aW5zdGFuY2UucmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnMoKVxuXHRcdGluc3RhbmNlLmlzUGxheWluZyA9IGZhbHNlXG5cblx0XHQjIOODleOCp+ODvOODieOCouOCpuODiFxuXHRcdGlmIGR1cmF0aW9uP1xuXHRcdFx0aWYgaW5zdGFuY2UudHdlZW4/IHRoZW4gaW5zdGFuY2UudHdlZW4uc3RvcCgpXG5cdFx0XHRpbnN0YW5jZS5mYWRlVm9sdW1lID0gMVxuXHRcdFx0aW5zdGFuY2UudHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4oaW5zdGFuY2UpXG5cdFx0XHRcdC5lYXNpbmcoIFRXRUVOLkVhc2luZy5DdWJpYy5Jbk91dCApXG5cdFx0XHRcdC50byh7ZmFkZVZvbHVtZTowfSxkdXJhdGlvbilcblx0XHRcdFx0Lm9uVXBkYXRlIC0+XG5cdFx0XHRcdFx0aW5zdGFuY2Uuc2V0Vm9sdW1lKGluc3RhbmNlLmZhZGVWb2x1bWUpXG5cdFx0XHRcdC5vbkNvbXBsZXRlIC0+XG5cdFx0XHRcdFx0aW5zdGFuY2UucG9zaXRpb24gPSAwXG5cdFx0XHRcdFx0aW5zdGFuY2Uuc3RvcCgpXG5cdFx0XHRcdC5zdGFydCgpXG5cdFx0ZWxzZVxuXHRcdFx0aW5zdGFuY2UucG9zaXRpb24gPSAwXG5cdFx0XHRpbnN0YW5jZS5zdG9wKClcblxuXHRcdEBpbnN0YW5jZXNbaWRdID0gbnVsbFxuXHRcdHJldHVyblxuXG5cdCMgXG5cdCMg44Of44Ol44O844OIXG5cdCMgXG5cdEBtdXRlOiAtPlxuXHRcdGNyZWF0ZWpzLlNvdW5kLnNldE11dGUodHJ1ZSlcblx0XHRyZXR1cm5cblxuXHQjIFxuXHQjIOODn+ODpeODvOODiOino+mZpFxuXHQjIFxuXHRAdW5tdXRlOiAtPlxuXHRcdGNyZWF0ZWpzLlNvdW5kLnNldE11dGUoZmFsc2UpXG5cdFx0cmV0dXJuXG5cblx0IyBcblx0IyDjgqbjgqPjg7Pjg4njgqbjgYzpnZ7jgqLjgq/jg4bjgqPjg5bjgavjgarjgaPjgZ/mmYJcblx0IyBcblx0QG9uV2luZG93Qmx1cjogKGV2ZW50KSA9PlxuXHRcdEBtdXRlKClcblx0XHRyZXR1cm5cblxuXHQjIFxuXHQjIOOCpuOCo+ODs+ODieOCpuOBjOOCouOCr+ODhuOCo+ODluOBq+OBquOBo+OBn+aZglxuXHQjIFxuXHRAb25XaW5kb3dGb2N1czogKGV2ZW50KSA9PlxuXHRcdEB1bm11dGUoKVxuXHRcdHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNvdW5kTWFuYWdlclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9fY29mZmVlL3V0aWxzL3NvdW5kLW1hbmFnZXIuY29mZmVlXG4gKiovIiwiIyMjXG5hdXRoOiBLaW11cmFcbmRhdGE6IDIwMTYvMDEvMTZcbiMjI1xuXG4jXG4jIFRXRUVOLkpT44GuRWFzaW5n44Gu44K344On44O844OI44OP44Oz44OJXG4jXG5cblRXRUVOLkVhc2luZy5RdWFkXHRcdD0gVFdFRU4uRWFzaW5nLlF1YWRyYXRpY1xuVFdFRU4uRWFzaW5nLlF1YXJ0XHQ9IFRXRUVOLkVhc2luZy5RdWFydGljXG5UV0VFTi5FYXNpbmcuUXVpbnRcdD0gVFdFRU4uRWFzaW5nLlF1aW50aWNcblRXRUVOLkVhc2luZy5TaW5lXHRcdD0gVFdFRU4uRWFzaW5nLlNpbnVzb2lkYWxcblRXRUVOLkVhc2luZy5FeHBvXHRcdD0gVFdFRU4uRWFzaW5nLkV4cG9uZW50aWFsXG5UV0VFTi5FYXNpbmcuQ2lyY1x0XHQ9IFRXRUVOLkVhc2luZy5DaXJjdWxhclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9fY29mZmVlL3V0aWxzL2V4dGVuc2lvbi5jb2ZmZWVcbiAqKi8iLCJDb25maWdcdFx0XHQ9IHJlcXVpcmUgJ2NvbmZpZydcblV0aWxzXHRcdFx0XHQ9IHJlcXVpcmUgJ3V0aWxzJ1xuQnRuXHRcdFx0XHRcdD0gcmVxdWlyZSAnYnRuJ1xuQmFzZVx0XHRcdFx0PSByZXF1aXJlICdiYXNlJ1xuTG9nb1R5cGVcdFx0PSByZXF1aXJlICdsb2dvLXR5cGUnXG4jIFBpeGlTdGFnZVx0XHQ9IHJlcXVpcmUgJ3BpeGktc3RhZ2UnXG5QYXBlclN0YWdlXHQ9IHJlcXVpcmUgJ3BhcGVyLXN0YWdlJ1xuI1xuIyBTY2VuZUJhc2Xjgq/jg6njgrlcbiMgQHBhcmFtIHtPYmplY3R9IG9uRW5kOiDjgrfjg7zjg7PntYLkuobmmYLjgrPjg7zjg6vjg5Djg4Pjgq9cbiMgXG5jbGFzcyBTY2VuZUJhc2UgZXh0ZW5kcyBwYXBlci5Hcm91cFxuXG5cdEBNb2RlOiB7XG5cdFx0Tm90QWRkZWRcdDogMFxuXHRcdFN0YW5kYnlcdFx0OiAxXG5cdFx0VG91Y2hpbmdcdDogMlxuXHRcdEVmZmVjdFx0XHQ6IDNcblx0XHRTd2FwcGluZ1x0OiA0XG5cdH1cblxuXHRjb25zdHJ1Y3RvcjogKG9uRW5kKS0+XG5cdFx0c3VwZXIoKVxuXG5cdFx0IyDotbfngrnjga7oqK3lrppcblx0XHRVdGlscy50cmFuc2Zvcm1Jbml0IEBcblx0XHRcblx0XHRAcGFwZXIgPSBQYXBlclN0YWdlLmluc3RhbmNlXG5cdFx0IyBAcGl4aSA9IFBpeGlTdGFnZS5pbnN0YW5jZVxuXHRcdEBvbkVuZCA9IG9uRW5kXG5cdFx0QHByZXNzID0gMFxuXHRcdEBjaGFuZ2VNb2RlKFNjZW5lQmFzZS5Nb2RlLk5vdEFkZGVkKVxuXHRcdFxuXHRcdEBjb250YWluZXIgPSBuZXcgcGFwZXIuR3JvdXAoKVxuXHRcdEBjb250YWluZXIucmVtb3ZlKClcblxuXHRcdEBuZXh0Q29udGFpbmVyID0gbmV3IHBhcGVyLkdyb3VwKClcblx0XHRAbmV4dENvbnRhaW5lci5yZW1vdmUoKVxuXG5cdFx0IyDotbfngrnjga7oqK3lrppcblx0XHRVdGlscy50cmFuc2Zvcm1Jbml0IFtAY29udGFpbmVyLCBAbmV4dENvbnRhaW5lcl1cblx0XHRAaW5pdCgpXG5cdFx0cmV0dXJuXG5cblx0I1xuXHQjIGluaXRcblx0I1xuXHRpbml0OiAtPlxuXHRcdCMg5qyh44K344O844Oz55So44Gu44Kq44OW44K444Kn44Kv44OI44Go44Kz44Oz44OG44OK6Kit5a6aXG5cdFx0YnRuID0gbmV3IEJ0bigpXG5cdFx0YmFzZSA9IG5ldyBCYXNlKClcblx0XHRsb2dvVHlwZSA9IG5ldyBMb2dvVHlwZSgpXG5cdFx0QG5leHRDb250YWluZXIuYWRkQ2hpbGQgYnRuXG5cdFx0QG5leHRDb250YWluZXIuYWRkQ2hpbGQgYmFzZVxuXHRcdEBuZXh0Q29udGFpbmVyLmFkZENoaWxkIGxvZ29UeXBlXG5cblx0XHRAX29uSW5pdCgpXG5cdFx0cmV0dXJuXG5cblx0IyBcblx0IyDjgqLjgq/jg4bjgqPjg5bjgrfjg7zjg7PjgavjgarjgovmmYJcblx0IyBcblx0c3RhcnQ6ICgpLT5cblx0XHRAcG9zaXRpb24ueCA9IEBiYXNlUG9zWCA9IDggIyDjg5zjgr/jg7PkuK3lpK7phY3nva7lvq7oqr/mlbRcblx0XHRAcHJlc3MgPSAwXG5cdFx0QHBhcGVyLnN0YWdlLmluc2VydENoaWxkIDAsIEBcblx0XHRAX29uU3RhcnQoKVxuXHRcdEBjaGFuZ2VNb2RlKFNjZW5lQmFzZS5Nb2RlLlN0YW5kYnkpXG5cdFx0cmV0dXJuXG5cblx0IyBcblx0IyDpnZ7jgqLjgq/jg4bjgqPjg5bjgrfjg7zjg7PjgavjgarjgovmmYJcblx0IyBcblx0ZW5kOiA9PlxuXHRcdEBwcmVzcyA9IDBcblx0XHRAcmVtb3ZlQ2hpbGRyZW4oKVxuXHRcdEByZW1vdmUoKVxuXHRcdEBjaGFuZ2VNb2RlKFNjZW5lQmFzZS5Nb2RlLk5vdEFkZGVkKVxuXHRcdEBfb25FbmQoKSAj44K144OW44Kv44Op44K555So44Oh44K944OD44OJXG5cdFx0QG9uRW5kPygpICPjgrPjg7zjg6vln7rjgafoqK3lrprjgZXjgozjgZ/jgrPjg7zjg6vjg5Djg4Pjgq/jg6Hjgr3jg4Pjg4lcblx0XHRyZXR1cm5cblxuXHQjIFxuXHQjIOODquOCteOCpOOCulxuXHQjIFxuXHRyZXNpemUgOiAtPlxuXHRcdEBfb25SZXNpemUoKVxuXHRcdHJldHVyblxuXG5cdCNcblx0IyDjgqLjg4Pjg5fjg4fjg7zjg4hcblx0I1xuXHR1cGRhdGUgOiAtPlxuXHRcdEBfb25VcGRhdGUoKVxuXHRcdHJldHVyblxuXG5cdCMgXG5cdCMg44Oe44Km44K5L+OCv+ODg+ODgSDjg4Djgqbjg7Ncblx0IyBcblx0dG91Y2hEb3duOiAocG9pbnQsIHByZXNzKSA9PlxuXHRcdGlmIEBtb2RlICE9IFNjZW5lQmFzZS5Nb2RlLlN0YW5kYnkgdGhlbiByZXR1cm5cblx0XHRAY2hhbmdlTW9kZShTY2VuZUJhc2UuTW9kZS5Ub3VjaGluZylcblx0XHRAcG9pbnQgPSBwb2ludFxuXHRcdEBwcmVzcyA9IHByZXNzXG5cdFx0QF9vblRvdWNoRG93bigpXG5cdFx0cmV0dXJuXG5cblx0IyBcblx0IyDjg57jgqbjgrkv44K/44OD44OBIOODoOODvOODllxuXHQjIFxuXHR0b3VjaE1vdmU6ICh2ZWN0b3IsIHBvaW50LCBwcmVzcykgPT5cblx0XHRpZiBAbW9kZSAhPSBTY2VuZUJhc2UuTW9kZS5Ub3VjaGluZyB0aGVuIHJldHVyblxuXHRcdEB2ZWN0b3IgPSB2ZWN0b3Jcblx0XHRAcG9pbnQgPSBwb2ludFxuXHRcdEBwcmVzcyA9IHByZXNzXG5cdFx0QF9vblRvdWNoTW92ZSgpXG5cdFx0cmV0dXJuXG5cblx0IyBcblx0IyDjg57jgqbjgrkv44K/44OD44OBIOOCouODg+ODl1xuXHQjIFxuXHR0b3VjaFVwOiAodmVjdG9yLCBwb2ludCwgcHJlc3MpID0+XG5cdFx0aWYgQG1vZGUgIT0gU2NlbmVCYXNlLk1vZGUuVG91Y2hpbmcgdGhlbiByZXR1cm5cblx0XHRAdmVjdG9yID0gdmVjdG9yXG5cdFx0QHBvaW50ID0gcG9pbnRcblx0XHRAcHJlc3MgPSBwcmVzc1xuXHRcdGlmIEBwcmVzcyA+PSAxXG5cdFx0XHRAY2hhbmdlTW9kZShTY2VuZUJhc2UuTW9kZS5FZmZlY3QpXG5cdFx0ZWxzZVxuXHRcdFx0QGNoYW5nZU1vZGUoU2NlbmVCYXNlLk1vZGUuU3RhbmRieSlcblx0XHRAX29uVG91Y2hVcCgpXG5cblx0XHRyZXR1cm5cblxuXHQjXG5cdCNcblx0I1xuXHRzd2FwOiAoKSA9PlxuXHRcdEBjaGFuZ2VNb2RlKFNjZW5lQmFzZS5Nb2RlLlN3YXBwaW5nKVxuXHRcdHJldHVyblxuXHRcdFxuXHQjXG5cdCMg44K344O844Oz44K544OG44O844K/44K5566h55CGXG5cdCMgQHBhcmFtIHtOdW1iZXJ9IG1vZGU6IOOCt+ODvOODs+eKtuaFi1xuXHQjXG5cdGNoYW5nZU1vZGU6IChtb2RlKSAtPlxuXHRcdEBtb2RlID0gbW9kZVxuXHRcdEBfb25Nb2RlQ2hhbmdlKEBtb2RlKVxuXG5cdFx0aWYgQG1vZGUgPT1cdFx0XHRcdFNjZW5lQmFzZS5Nb2RlLk5vdEFkZGVkXHRcdHRoZW4gQF9vbk5vdEFkZGVkKClcblx0XHRlbHNlIGlmIEBtb2RlID09XHRTY2VuZUJhc2UuTW9kZS5TdGFuZGJ5XHRcdHRoZW4gQF9vblN0YW5kYnkoKVxuXHRcdGVsc2UgaWYgQG1vZGUgPT1cdFNjZW5lQmFzZS5Nb2RlLlRvdWNoaW5nXHRcdHRoZW4gQF9vblRvdWNoaW5nKClcblx0XHRlbHNlIGlmIEBtb2RlID09XHRTY2VuZUJhc2UuTW9kZS5FZmZlY3RcdFx0XHR0aGVuIEBfb25FZmZlY3QoKVxuXHRcdGVsc2UgaWYgQG1vZGUgPT1cdFNjZW5lQmFzZS5Nb2RlLlN3YXBwaW5nXHRcdHRoZW4gQF9vblN3YXBwaW5nKClcblx0XHRyZXR1cm5cblxuXG5cbiMqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4jIOOCteODluOCr+ODqeOCueOBp+Wun+ijheOBmeOBueOBjeODoeOCveODg+ODiVxuIyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuXHQjIFxuXHQjIOODouODvOODieWkieabtFxuXHQjIFxuXHRfb25Nb2RlQ2hhbmdlOiAobW9kZSkgLT5cblx0XHRyZXR1cm5cblxuXHQjXG5cdCNcblx0I1xuXHRfb25TdGFuZGJ5OiAoKSAtPlxuXHRcdHJldHVyblxuXG5cdCNcblx0I1xuXHQjXG5cdF9vblRvdWNoaW5nOiAoKSAtPlxuXHRcdHJldHVyblxuXG5cdCNcblx0I1xuXHQjXG5cdF9vbkVmZmVjdDogKCkgLT5cblx0XHRyZXR1cm5cblxuXHQjXG5cdCNcblx0I1xuXHRfb25Td2FwcGluZzogKCkgLT5cblx0XHRyZXR1cm5cblxuXHQjXG5cdCNcblx0I1xuXHRfb25Ob3RBZGRlZDogKCkgLT5cblx0XHRyZXR1cm5cblxuXHQjIOWIneacn+WMluODu+ODquOCteOCpOOCuuOBquOBqVxuXG5cdCMgXG5cdCMgXG5cdCMgXG5cdF9vbkluaXQ6IC0+XG5cdFx0cmV0dXJuXG5cblx0IyBcblx0IyBcblx0IyBcblx0X29uUmVzaXplOiAtPlxuXHRcdHJldHVyblxuXG5cdCMgXG5cdCMgXG5cdCMgXG5cdF9vblN0YXJ0OiAoaXNBbmltYXRlKS0+XG5cdFx0cmV0dXJuXG5cblx0IyBcblx0IyBcblx0IyBcblx0X29uRW5kOi0+XG5cdFx0cmV0dXJuXG5cblx0IyBcblx0IyBcblx0IyBcblx0X29uVXBkYXRlOiAtPlxuXHRcdHJldHVyblxuXG5cblx0IyDjgr/jg4Pjg4HjgqTjg5njg7Pjg4hcblxuXHQjIFxuXHQjIFxuXHQjIFxuXHRfb25Ub3VjaERvd246IC0+XG5cdFx0QGJ0bj8uZG93bigpXG5cdFx0QGJhc2U/LmRvd24oKVxuXHRcdEBsb2dvVHlwZT8uZG93bigpXG5cdFx0cmV0dXJuXG5cblx0IyBcblx0IyBcblx0IyBcblx0X29uVG91Y2hNb3ZlOiAtPlxuXHRcdEBidG4/LnByZXNzID0gQHByZXNzXG5cdFx0QGJhc2U/LnByZXNzID0gQHByZXNzXG5cdFx0QGxvZ29UeXBlPy5wcmVzcyA9IEBwcmVzc1xuXHRcdHJldHVyblxuXG5cdCMgXG5cdCMgXG5cdCMgXG5cdF9vblRvdWNoVXA6IC0+XG5cdFx0QGJ0bj8udXAoKVxuXHRcdEBiYXNlPy51cCgpXG5cdFx0QGxvZ29UeXBlPy51cCgpXG5cdFx0cmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gU2NlbmVCYXNlXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9fY29mZmVlL3NjZW5lL3NjZW5lLWJhc2UuY29mZmVlXG4gKiovIiwicmVxdWlyZSAnZXh0ZW5zaW9uJ1xuXG5SQURJQU5fVE9fREVHUkVFID0gMTgwIC8gTWF0aC5QSVxuREVHUkVFX1RPX1JBRElBTiA9IE1hdGguUEkgLyAxODBcbiMgXG4jIOODkeOCueOBrui8qumDreOCkua2suS9k+OBo+OBveOBj+OCouODi+ODoeODvOOCt+ODp+ODs+OBleOBm+OCi+OCr+ODqeOCuVxuIyBAcGFyYW0ge09iamVjdH0gcGF0aDog44Ki44OL44Oh44O844K344On44Oz44GZ44KL44OR44K5XG4jXG5jbGFzcyBGbHVpZGFibGVQYXRoIGV4dGVuZHMgcGFwZXIuUGF0aFxuXHRjb25zdHJ1Y3RvcjogKHBhdGgpLT5cblx0XHRzdXBlcigpXG5cdFx0QHBhdGggPSBwYXRoXG5cdFx0QGZsdWlkUGF0aCA9IG5ldyBwYXBlci5QYXRoKClcblx0XHRAZmx1aWRQYXRoLnJlbW92ZSgpXG5cdFx0QGZsZXhpYmlsaXR5ID0gMVxuXHRcdEBzcGVlZCA9IDAuMDFcblx0XHRAYW1wbGl0dWRlID0gMVxuXHRcdEBudW1XYXZlcyA9IDVcblx0XHRAc21vb3RoRmFjdG9yID0gMC4zXG5cdFx0QGZpeEVuZHMgPSB0cnVlICMg57ea44Gu56uv44KS5Zu65a6a44GZ44KL44OV44Op44KwXG5cdFx0QHNldFBhdGgoQHBhdGgpXG5cblxuXHQjXG5cdCMg44OR44K544KS5aSJ5pu0XG5cdCNcblx0c2V0UGF0aDogKHBhdGgpIC0+XG5cdFx0QHBhdGggPSBwYXRoXG5cdFx0QHNlZ21lbnRzID0gW11cblx0XHRAZmx1aWRQYXRoLnNlZ21lbnRzID0gW11cblx0XHRAZmx1aWRSYWRpYW5zID0gW11cblxuXHRcdCMg44Ki44Oz44Kr44O844KS44Kz44OU44O8XG5cdFx0Zm9yIHNlZ21lbnQgaW4gQHBhdGguc2VnbWVudHNcblx0XHRcdEBhZGQgc2VnbWVudC5jbG9uZSgpXG5cdFx0XHRAZmx1aWRQYXRoLnNlZ21lbnRzLnB1c2ggc2VnbWVudC5jbG9uZSgpXG5cblx0XHQjIOaPuuOCieOBmeaWueWQkeOCkuioiOeul1xuXHRcdGZvciBzZWdtZW50LGkgaW4gQHNlZ21lbnRzXG5cblx0XHRcdHJhZGlhbiA9IDBcblx0XHRcdGlmIGkgPD0gMFxuXHRcdFx0XHRpZiBzZWdtZW50LmhhbmRsZU91dD8gJiYgIXNlZ21lbnQuaGFuZGxlT3V0LmlzWmVybygpXG5cdFx0XHRcdFx0cmFkaWFuID0gc2VnbWVudC5oYW5kbGVPdXQuYW5nbGVJblJhZGlhbnMgKyBNYXRoLlBJICogMC41XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRyYWRpYW4gPSBzZWdtZW50LnBvaW50LmdldEFuZ2xlSW5SYWRpYW5zKEBzZWdtZW50c1tpKzFdLnBvaW50KSArIE1hdGguUEkgKiAwLjVcblx0XHRcdGVsc2UgaWYgaSA+PSBAc2VnbWVudHMubGVuZ3RoIC0gMVxuXHRcdFx0XHRpZiBzZWdtZW50LmhhbmRsZUluPyAmJiAhc2VnbWVudC5oYW5kbGVJbi5pc1plcm8oKVxuXHRcdFx0XHRcdHJhZGlhbiA9IHNlZ21lbnQuaGFuZGxlSW4uYW5nbGVJblJhZGlhbnMgLSBNYXRoLlBJICogMC41XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRyYWRpYW4gPSBzZWdtZW50LnBvaW50LmdldEFuZ2xlSW5SYWRpYW5zKEBzZWdtZW50c1tpLTFdLnBvaW50KSAtIE1hdGguUEkgKiAwLjVcblx0XHRcdGVsc2Vcblx0XHRcdFx0aWYgc2VnbWVudC5oYW5kbGVJbj8gJiYgIXNlZ21lbnQuaGFuZGxlSW4uaXNaZXJvKClcblx0XHRcdFx0XHRyYWRpYW5MID0gc2VnbWVudC5oYW5kbGVJbi5hbmdsZUluUmFkaWFuc1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0cmFkaWFuTCA9IHNlZ21lbnQucG9pbnQuZ2V0QW5nbGVJblJhZGlhbnMoQHNlZ21lbnRzW2ktMV0ucG9pbnQpXG5cdFx0XHRcdGlmIHNlZ21lbnQuaGFuZGxlT3V0PyAmJiAhc2VnbWVudC5oYW5kbGVPdXQuaXNaZXJvKClcblx0XHRcdFx0XHRyYWRpYW5SID0gc2VnbWVudC5oYW5kbGVPdXQuYW5nbGVJblJhZGlhbnNcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHJhZGlhblIgPSBzZWdtZW50LnBvaW50LmdldEFuZ2xlSW5SYWRpYW5zKEBzZWdtZW50c1tpKzFdLnBvaW50KVxuXG5cdFx0XHRcdHJhZGlhbiA9IHJhZGlhbkwgKyAocmFkaWFuUi1yYWRpYW5MKSAqIDAuNVxuXG5cdFx0XHRAZmx1aWRSYWRpYW5zLnB1c2gocmFkaWFuKVxuXG5cdFx0I1xuXHRcdGZvciBzZWdtZW50LGkgaW4gQGZsdWlkUGF0aC5zZWdtZW50c1xuXHRcdFx0c2VnbWVudC5oYW5kbGVJbi54ID0gc2VnbWVudC5oYW5kbGVJbi55ID0gMFxuXHRcdFx0c2VnbWVudC5oYW5kbGVPdXQueCA9IHNlZ21lbnQuaGFuZGxlT3V0LnkgPSAwXG5cblxuXHRcdEB1cGRhdGUoKVxuXHRcdHJldHVyblxuXG5cblx0I1xuXHQjIOWJjeW+jOOBruOCouODs+OCq+ODvOODneOCpOODs+ODiOOBruS9jee9ruOCkuWFg+OBq+e3muOBjOOCueODoOODvOOCueOBq+OBquOCi+OCiOOBhuOBq+OCs+ODs+ODiOODreODvOODq+ODneOCpOODs+ODiOOCkuiqv+aVtOOBmeOCi1xuXHQjXG5cdHNtb290aFNlZ21lbnQ6IChzZWdtZW50LGxlZnQscmlnaHQsZmFjdG9yKSAtPlxuXHRcdGRpc3RhbmNlTCA9IGlmIGxlZnQ/IHRoZW4gc2VnbWVudC5wb2ludC5nZXREaXN0YW5jZShsZWZ0KSBlbHNlIDBcblx0XHRkaXN0YW5jZVIgPSBpZiByaWdodD8gdGhlbiBzZWdtZW50LnBvaW50LmdldERpc3RhbmNlKHJpZ2h0KSBlbHNlIDBcblxuXHRcdHJhZGlhbiA9IDBcblx0XHRpZiBsZWZ0PyAmJiByaWdodD9cblx0XHRcdHJhZGlhbkwgPSBzZWdtZW50LnBvaW50LmdldEFuZ2xlSW5SYWRpYW5zKGxlZnQpXG5cdFx0XHRyYWRpYW5SID0gc2VnbWVudC5wb2ludC5nZXRBbmdsZUluUmFkaWFucyhyaWdodClcblx0XHRcdHJhZGlhbiA9IHJhZGlhbkwgKyAocmFkaWFuUi1yYWRpYW5MKSAqIDAuNSArIE1hdGguUEkgKiAwLjVcblx0XHRlbHNlIGlmIGxlZnQ/XG5cdFx0XHRyYWRpYW4gPSBzZWdtZW50LnBvaW50LmdldEFuZ2xlSW5SYWRpYW5zKGxlZnQpXG5cdFx0ZWxzZSBpZiByaWdodD9cblx0XHRcdHJhZGlhbiA9IHNlZ21lbnQucG9pbnQuZ2V0QW5nbGVJblJhZGlhbnMocmlnaHQpXG5cblxuXHRcdGlmIGxlZnQ/ICYmIHJpZ2h0P1xuXHRcdFx0aWYgcmFkaWFuIDwgTWF0aC5QSSAqIC0wLjUgfHwgcmFkaWFuID4gTWF0aC5QSSAqIDAuNSB0aGVuIGRpc3RhbmNlUiAqPSAtMVxuXHRcdFx0ZWxzZSBkaXN0YW5jZUwgKj0gLTFcblxuXHRcdHNlZ21lbnQuaGFuZGxlSW4ueCA9IE1hdGguY29zKHJhZGlhbikgKiBkaXN0YW5jZUwgKiBmYWN0b3Jcblx0XHRzZWdtZW50LmhhbmRsZUluLnkgPSBNYXRoLnNpbihyYWRpYW4pICogZGlzdGFuY2VMICogZmFjdG9yXG5cdFx0c2VnbWVudC5oYW5kbGVPdXQueCA9IE1hdGguY29zKHJhZGlhbikgKiBkaXN0YW5jZVIgKiBmYWN0b3Jcblx0XHRzZWdtZW50LmhhbmRsZU91dC55ID0gTWF0aC5zaW4ocmFkaWFuKSAqIGRpc3RhbmNlUiAqIGZhY3RvclxuXHRcdHJldHVyblxuXG5cdCMgXG5cdCMg44OH44O844K/5pu05pawXG5cdCNcblx0dXBkYXRlOiAoKS0+XG5cblx0XHRub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuXHRcdHBoYXNlID0gbm93ICogQHNwZWVkXG5cblx0XHQjIGNvbnNvbGUubG9nICdwaGFzZTonK3BoYXNlKycgc3BlZWQ6JytAc3BlZWRcblxuXHRcdGZvciBmbHVpZFNlZ21lbnQsaSBpbiBAZmx1aWRQYXRoLnNlZ21lbnRzXG5cdFx0XHRiYXNlU2VnbWVudCA9IEBwYXRoLnNlZ21lbnRzW2ldXG5cdFx0XHQjIHBoYXNl44KS5YWD44Gr56e75YuV6Led6Zui44KS6KiI566XXG5cdFx0XHRkaXN0YW5jZSA9IE1hdGguc2luKHBoYXNlK2kvQGZsdWlkUGF0aC5zZWdtZW50cy5sZW5ndGgqQG51bVdhdmVzKk1hdGguUEkqMikgKiBAYW1wbGl0dWRlXG5cdFx0XHRyYWRpYW4gPSBAZmx1aWRSYWRpYW5zW2ldXG5cdFx0XHRpZiAhQGNsb3NlZCAmJiBAZml4RW5kcyAmJiAoaSA9PSAwIHx8IGkgPT0gQGZsdWlkUGF0aC5zZWdtZW50cy5sZW5ndGgtMSkgdGhlbiBkaXN0YW5jZSA9IDBcblx0XHRcdCMgXG5cdFx0XHRmbHVpZFNlZ21lbnQucG9pbnQueCA9IGJhc2VTZWdtZW50LnBvaW50LnggKyBNYXRoLmNvcyhyYWRpYW4pICogZGlzdGFuY2Vcblx0XHRcdGZsdWlkU2VnbWVudC5wb2ludC55ID0gYmFzZVNlZ21lbnQucG9pbnQueSArIE1hdGguc2luKHJhZGlhbikgKiBkaXN0YW5jZVxuXHRcdFx0Zmx1aWRTZWdtZW50LmhhbmRsZUluLnggPSBiYXNlU2VnbWVudC5oYW5kbGVJbi54XG5cdFx0XHRmbHVpZFNlZ21lbnQuaGFuZGxlSW4ueSA9IGJhc2VTZWdtZW50LmhhbmRsZUluLnlcblx0XHRcdGZsdWlkU2VnbWVudC5oYW5kbGVPdXQueCA9IGJhc2VTZWdtZW50LmhhbmRsZU91dC54XG5cdFx0XHRmbHVpZFNlZ21lbnQuaGFuZGxlT3V0LnkgPSBiYXNlU2VnbWVudC5oYW5kbGVPdXQueVxuXG5cdFx0IyBmbHVpZFNlZ21lbnTjga7jgrnjg6Djg7zjgrnljJZcblx0XHQjIEBmbHVpZFBhdGguc21vb3RoKClcblx0XHQjIGZvciBmbHVpZFNlZ21lbnQsaSBpbiBAZmx1aWRQYXRoLnNlZ21lbnRzXG5cdFx0IyBcdGxlZnQgPSBpZiBpID4gMCB0aGVuIEBmbHVpZFBhdGguc2VnbWVudHNbaS0xXS5wb2ludCBlbHNlIG51bGxcblx0XHQjIFx0cmlnaHQgPSBpZiBpIDwgQGZsdWlkUGF0aC5zZWdtZW50cy5sZW5ndGgtMSB0aGVuIEBmbHVpZFBhdGguc2VnbWVudHNbaSsxXS5wb2ludCBlbHNlIG51bGxcblx0XHQjIFx0QHNtb290aFNlZ21lbnQoZmx1aWRTZWdtZW50LGxlZnQscmlnaHQsQHNtb290aEZhY3RvcilcblxuXHRcdCMgRmxleGliaWxpdHnjgavlv5zjgZjjgablkITjg53jgqTjg7Pjg4jjgpLoqIjnrpdcblx0XHRmb3IgZmx1aWRTZWdtZW50LGkgaW4gQGZsdWlkUGF0aC5zZWdtZW50c1xuXHRcdFx0YmFzZVNlZ21lbnQgPSBAcGF0aC5zZWdtZW50c1tpXVxuXHRcdFx0QHNlZ21lbnRzW2ldLnBvaW50LnggPSBiYXNlU2VnbWVudC5wb2ludC54ICsgKGZsdWlkU2VnbWVudC5wb2ludC54IC0gYmFzZVNlZ21lbnQucG9pbnQueCkgKiBAZmxleGliaWxpdHlcblx0XHRcdEBzZWdtZW50c1tpXS5wb2ludC55ID0gYmFzZVNlZ21lbnQucG9pbnQueSArIChmbHVpZFNlZ21lbnQucG9pbnQueSAtIGJhc2VTZWdtZW50LnBvaW50LnkpICogQGZsZXhpYmlsaXR5XG5cdFx0XHRAc2VnbWVudHNbaV0uaGFuZGxlSW4ueCA9IGJhc2VTZWdtZW50LmhhbmRsZUluLnggKyAoZmx1aWRTZWdtZW50LmhhbmRsZUluLnggLSBiYXNlU2VnbWVudC5oYW5kbGVJbi54KSAqIEBmbGV4aWJpbGl0eVxuXHRcdFx0QHNlZ21lbnRzW2ldLmhhbmRsZUluLnkgPSBiYXNlU2VnbWVudC5oYW5kbGVJbi55ICsgKGZsdWlkU2VnbWVudC5oYW5kbGVJbi55IC0gYmFzZVNlZ21lbnQuaGFuZGxlSW4ueSkgKiBAZmxleGliaWxpdHlcblx0XHRcdEBzZWdtZW50c1tpXS5oYW5kbGVPdXQueCA9IGJhc2VTZWdtZW50LmhhbmRsZU91dC54ICsgKGZsdWlkU2VnbWVudC5oYW5kbGVPdXQueCAtIGJhc2VTZWdtZW50LmhhbmRsZU91dC54KSAqIEBmbGV4aWJpbGl0eVxuXHRcdFx0QHNlZ21lbnRzW2ldLmhhbmRsZU91dC55ID0gYmFzZVNlZ21lbnQuaGFuZGxlT3V0LnkgKyAoZmx1aWRTZWdtZW50LmhhbmRsZU91dC55IC0gYmFzZVNlZ21lbnQuaGFuZGxlT3V0LnkpICogQGZsZXhpYmlsaXR5XG5cblxubW9kdWxlLmV4cG9ydHMgPSBGbHVpZGFibGVQYXRoXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9fY29mZmVlL2Zvcm1hdC9mbHVpZGFibGUtcGF0aC5jb2ZmZWVcbiAqKi8iLCJyZXF1aXJlICdleHRlbnNpb24nXG5Db25maWdcdFx0XHRcdD0gcmVxdWlyZSAnY29uZmlnJ1xuVXRpbHNcdFx0XHRcdFx0PSByZXF1aXJlICd1dGlscydcblNjZW5lQmFzZVx0XHRcdD0gcmVxdWlyZSAnc2NlbmUtYmFzZSdcbkN1c3RvbVN0cm9rZVx0PSByZXF1aXJlICdjdXN0b20tc3Ryb2tlJ1xuRmx1aWRhYmxlUGF0aFx0PSByZXF1aXJlICdmbHVpZGFibGUtcGF0aCdcblxuIyBcbiMg44OX44Oq44Oz44K344O844Oz44Kv44Op44K5XG4jIFxuY2xhc3MgU2NlbmUgZXh0ZW5kcyBTY2VuZUJhc2Vcblx0IyBcblx0IyDopqrjgq/jg6njgrnjga5pbml044Oh44K944OD44OJ44GL44KJ5ZG844Gw44KM44KLXG5cdCMgXG5cdF9vbkluaXQ6IC0+XG5cblxuXHRcdCMg44OZ44O844K5XG5cdFx0QGJhc2VTVkcgPSBAaW1wb3J0U1ZHIENvbmZpZy5TVkcuQkFTRVxuXHRcdEBiYXNlU1ZHLnJlbW92ZSgpXG5cblx0XHQjIOmqqOagvOOBrue3mlxuXHRcdEBib25lID0gQGJhc2VTVkcuY2hpbGRyZW5bMV1cblx0XHRAYm9uZS5zdHJva2VXaWR0aCA9IDAuMjVcblx0XHRAYm9uZS5zdHJva2VDb2xvciA9ICcjZmYwMDAwJ1xuXHRcdEBib25lLmZpbGxDb2xvciA9IG5ldyBwYXBlci5Db2xvciAwLDAsMCwwXG5cdFx0QGNvbnRhaW5lci5hZGRDaGlsZCBAYm9uZVxuXG5cdFx0QGZsdWlkID0gbmV3IEZsdWlkYWJsZVBhdGggQGJvbmVcblx0XHRAZmx1aWQuc3Ryb2tlV2lkdGggPSAwLjI1XG5cdFx0QGZsdWlkLnN0cm9rZUNvbG9yID0gJyMwMDAwZmYnXG5cdFx0QGZsdWlkLmZpbGxDb2xvciA9IG5ldyBwYXBlci5Db2xvciAwLDAsMCwwXG5cdFx0QGNvbnRhaW5lci5hZGRDaGlsZCBAZmx1aWRcblx0XHRAZmx1aWQuc2VsZWN0ZWQgPSB0cnVlXG5cdFx0QGZsdWlkLmZ1bGx5U2VsZWN0ZWQgPSB0cnVlXG5cblxuXHRcdEBzY2FsZSg0KVxuXG5cdFx0cmV0dXJuXG5cblx0IyBcblx0IyDjgqLjgq/jg4bjgqPjg5bjgrfjg7zjg7PjgavjgarjgovmmYJcblx0IyBcblx0X29uU3RhcnQ6ICgpLT5cblx0XHRAY29udGFpbmVyLnBvc2l0aW9uLnggPSAwXG5cdFx0QGFkZENoaWxkIEBjb250YWluZXJcblx0XHRyZXR1cm5cblxuXHQjIFxuXHQjIOmdnuOCouOCr+ODhuOCo+ODluOCt+ODvOODs+OBq+OBquOCi+aZglxuXHQjIFxuXHRfb25FbmQ6ID0+XG5cdFx0QHJlbW92ZUNoaWxkcmVuKClcblx0XHRyZXR1cm5cblxuXHQjXG5cdCMg5pu05paw5pmCXG5cdCNcblx0X29uVXBkYXRlOiAtPlxuXHRcdEBmbHVpZC51cGRhdGUoKVxuXHRcdHJldHVyblxuXG5cdCMgXG5cdCMg44K544K/44Oz44OQ44Kk5pmCXG5cdCMgXG5cdF9vblN0YW5kYnk6IC0+XG5cdFx0cmV0dXJuXG5cblx0I1xuXHQjIOOCqOODleOCp+OCr+ODiFxuXHQjXG5cdF9vbkVmZmVjdDogLT5cblx0XHRyZXR1cm5cblxuXHQjXG5cdCMg44K344O844Oz56e76KGMXG5cdCNcblx0X29uU3dhcHBpbmc6ICgpID0+XG5cdFx0cmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gU2NlbmVcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL19jb2ZmZWUvX21vY2svMDUtZmx1aWRhYmxlX3BhdGgvc2NlbmUuY29mZmVlXG4gKiovIiwiIyBcbiMg44OH44OQ44OD44Kw55So44Kq44OX44K344On44OzXG4jIFxuY2xhc3MgRGF0T3B0aW9uXG5cdGNvbnN0cnVjdG9yOiAoKS0+XG5cdFx0QGFuY2hvciA9IGZhbHNlXG5cdFx0QGZsZXhpYmlsaXR5ID0gMVxuXHRcdEBzcGVlZCA9IDAuMDFcblx0XHRAYW1wbGl0dWRlID0gMVxuXHRcdEBudW1XYXZlcyA9IDEwXG5cdFx0QHNtb290aEZhY3RvciA9IDAuM1xuXHRcdEBmaXhFbmRzID0gdHJ1ZVxuXHRcdHJldHVyblxuXG4jIFxuIyDjg4fjg5Djg4PjgrDnlKjjgrPjg7Pjgr3jg7zjg6vjgq/jg6njgrlcbiMgQHBhcmFtIHtBcnJheX0gZnVsaWRhYmxlczog5a++6LGh44Kq44OW44K444Kn44Kv44OIXG4jIFxuY2xhc3MgRGF0R1VJIGV4dGVuZHMgZGF0LkdVSVxuXHRASUQgPSAnRGF0R1VJJ1xuXHRjb25zdHJ1Y3RvcjogKGZ1bGlkYWJsZXMpIC0+XG5cdFx0c3VwZXIoKVxuXHRcdEBkYXRPcHRpb24gPSBuZXcgRGF0T3B0aW9uKClcblx0XHRAZG9tRWxlbWVudC5pZCA9IERhdEdVSS5JRFxuXHRcdEBmdWxpZGFibGVzID0gZnVsaWRhYmxlc1xuXHRcdCQoXCIjI3tEYXRHVUkuSUR9XCIpLmNzcyh7XCJwYWRkaW5nLXRvcFwiOiA1MH0pXG5cblx0XHRjb25zb2xlLmxvZyBmdWxpZGFibGVzXG5cblx0XHRAYWRkKEBkYXRPcHRpb24sICdmbGV4aWJpbGl0eScsIDAsIDEpLm9uQ2hhbmdlICgpPT5cblx0XHRcdGZvciBmdWxpZGFibGUgaW4gQGZ1bGlkYWJsZXNcblx0XHRcdFx0ZnVsaWRhYmxlLmZsZXhpYmlsaXR5ID0gQGRhdE9wdGlvbi5mbGV4aWJpbGl0eVxuXG5cdFx0QGFkZChAZGF0T3B0aW9uLCAnc3BlZWQnLCAwLjAwMSwgMC4wNSkub25DaGFuZ2UgKCk9PlxuXHRcdFx0Zm9yIGZ1bGlkYWJsZSBpbiBAZnVsaWRhYmxlc1xuXHRcdFx0XHRmdWxpZGFibGUuc3BlZWQgPSBAZGF0T3B0aW9uLnNwZWVkXG5cblx0XHRAYWRkKEBkYXRPcHRpb24sICdhbXBsaXR1ZGUnLCAwLCAxMCkub25DaGFuZ2UgKCk9PlxuXHRcdFx0Zm9yIGZ1bGlkYWJsZSBpbiBAZnVsaWRhYmxlc1xuXHRcdFx0XHRmdWxpZGFibGUuYW1wbGl0dWRlID0gQGRhdE9wdGlvbi5hbXBsaXR1ZGVcblxuXHRcdEBhZGQoQGRhdE9wdGlvbiwgJ251bVdhdmVzJywgMCwgMzApLm9uQ2hhbmdlICgpPT5cblx0XHRcdGZvciBmdWxpZGFibGUgaW4gQGZ1bGlkYWJsZXNcblx0XHRcdFx0ZnVsaWRhYmxlLm51bVdhdmVzID0gQGRhdE9wdGlvbi5udW1XYXZlc1xuXG5cdFx0QGFkZChAZGF0T3B0aW9uLCAnc21vb3RoRmFjdG9yJywgMCwgMSkub25DaGFuZ2UgKCk9PlxuXHRcdFx0Zm9yIGZ1bGlkYWJsZSBpbiBAZnVsaWRhYmxlc1xuXHRcdFx0XHRmdWxpZGFibGUuc21vb3RoRmFjdG9yID0gQGRhdE9wdGlvbi5zbW9vdGhGYWN0b3JcblxuXHRcdEBhZGQoQGRhdE9wdGlvbiwgJ2ZpeEVuZHMnKS5vbkNoYW5nZSAoKT0+XG5cdFx0XHRmb3IgZnVsaWRhYmxlIGluIEBmdWxpZGFibGVzXG5cdFx0XHRcdGZ1bGlkYWJsZS5maXhFbmRzID0gQGRhdE9wdGlvbi5maXhFbmRzXG5cbm1vZHVsZS5leHBvcnRzID0gRGF0R1VJXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9fY29mZmVlL19tb2NrLzA1LWZsdWlkYWJsZV9wYXRoL2RhdC5jb2ZmZWVcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9