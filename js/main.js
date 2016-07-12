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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var BalloonAway, BalloonFailure, Config, Delivery, Elevator, Escape, Explosion, Fall, Ghost, GnavTop, Jump, LoaderView, Localizables, Main, NORMAL, PaperStage, PatrolLamp, Poo, Pudding, Rocket, SimpleEventDispatcher, SoundManager, Squash, Touch, UPSIDE_DOWN, Ufo, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	SimpleEventDispatcher = __webpack_require__(7);
	
	PaperStage = __webpack_require__(16);
	
	SoundManager = __webpack_require__(17);
	
	Touch = __webpack_require__(6);
	
	Localizables = __webpack_require__(18);
	
	LoaderView = __webpack_require__(19);
	
	Pudding = __webpack_require__(20);
	
	Jump = __webpack_require__(26);
	
	Explosion = __webpack_require__(31);
	
	Ghost = __webpack_require__(35);
	
	Elevator = __webpack_require__(41);
	
	Escape = __webpack_require__(45);
	
	Delivery = __webpack_require__(50);
	
	Ufo = __webpack_require__(52);
	
	Rocket = __webpack_require__(57);
	
	PatrolLamp = __webpack_require__(65);
	
	Squash = __webpack_require__(69);
	
	Fall = __webpack_require__(73);
	
	BalloonFailure = __webpack_require__(76);
	
	BalloonAway = __webpack_require__(79);
	
	Poo = __webpack_require__(81);
	
	GnavTop = __webpack_require__(84);
	
	
	/*
	auth: Kimura
	data: 2016/05/20
	 */
	
	NORMAL = "normal";
	
	UPSIDE_DOWN = "upsidedown";
	
	Main = (function() {
	  function Main() {
	    this.onSPEasteEggInit = bind(this.onSPEasteEggInit, this);
	    this.onPCEasteEggInit = bind(this.onPCEasteEggInit, this);
	    this.onResize = bind(this.onResize, this);
	    this.onUp = bind(this.onUp, this);
	    this.onMove = bind(this.onMove, this);
	    this.onDown = bind(this.onDown, this);
	    this.onUpdate = bind(this.onUpdate, this);
	    this.gotoNextScene = bind(this.gotoNextScene, this);
	    this.sceneInit = bind(this.sceneInit, this);
	    this.touchInit = bind(this.touchInit, this);
	    this.dpr = window.devicePixelRatio === void 0 ? 1 : window.devicePixelRatio;
	    this.$window = $(window);
	    this.$canvas = $("#" + Config.Canvas.paper);
	    this.canvas = this.$canvas.get(0);
	    this.context = this.canvas.getContext('2d');
	    this.$humberger = $('.c-humberger').hide();
	    new GnavTop($('#GNav'), $('.c-humberger'), $('#Canvas'));
	    Touch.init(this.canvas);
	    if (UA.career !== UA.SAFARI) {
	      SoundManager.init();
	    } else {
	      setTimeout(SoundManager.init, 500);
	    }
	    this.paper = new PaperStage(this.$canvas);
	    this.$window.on('resize', this.onResize).trigger('resize');
	    paper.view.onFrame = this.onUpdate;
	    if (location.hash === "") {
	      this.loaderView = new LoaderView();
	      this.loaderView.addEventListener(LoaderView.VIEW_SHOW, this.sceneInit);
	      this.loaderView.addEventListener(LoaderView.VIEW_END, this.touchInit);
	    } else {
	      this.sceneInit();
	      this.touchInit();
	    }
	    this.direction = NORMAL;
	    if (UA.type === UA.PC) {
	      this.execCount = 0;
	      cheet(Config.KONAMI_COMMAND, this.onPCEasteEggInit);
	    } else {
	      this.isDirectionChanged = false;
	      this.$window.on("deviceorientation", this.onSPEasteEggInit);
	    }
	    if (Utils.ua.fb || Utils.ua.tw) {
	      this.$window.on('touchmove.noScroll', function(e) {
	        return e.preventDefault();
	      });
	    }
	  }
	
	  Main.prototype.touchInit = function() {
	    Touch.sharedInstance.addEventListener(Touch.DOWN, this.onDown);
	    Touch.sharedInstance.addEventListener(Touch.MOVE, this.onMove);
	    Touch.sharedInstance.addEventListener(Touch.UP, this.onUp);
	    this.$humberger.show();
	  };
	
	  Main.prototype.sceneInit = function() {
	    var i, j, key, ref, ref1, scene;
	    this.scenes = {
	      "PatrolLamp": new PatrolLamp(this.gotoNextScene),
	      "Elevator": new Elevator(this.gotoNextScene),
	      "Delivery": new Delivery(this.gotoNextScene),
	      "Escape": new Escape(this.gotoNextScene),
	      "Explosion": new Explosion(this.gotoNextScene),
	      "Squash": new Squash(this.gotoNextScene),
	      "Jump": new Jump(this.gotoNextScene),
	      "Ufo": new Ufo(this.gotoNextScene),
	      "Rocket": new Rocket(this.gotoNextScene),
	      "Pudding": new Pudding(this.gotoNextScene),
	      "Ghost": new Ghost(this.gotoNextScene),
	      "Fall": new Fall(this.gotoNextScene),
	      "BalloonFailure": new BalloonFailure(this.gotoNextScene),
	      "BalloonAway": new BalloonAway(this.gotoNextScene),
	      "Poo": new Poo(this.gotoNextScene)
	    };
	    this.sceneFrequencies = {
	      "PatrolLamp": 2,
	      "Elevator": 2,
	      "Delivery": 2,
	      "Escape": 4,
	      "Explosion": 2,
	      "Squash": 2,
	      "Jump": 4,
	      "Ufo": 2,
	      "Rocket": 2,
	      "Pudding": 4,
	      "Ghost": 2,
	      "Fall": 4,
	      "BalloonFailure": 2,
	      "BalloonAway": 2,
	      "Poo": 2
	    };
	    this.scenesLen = Object.keys(this.scenes).length;
	    this.sceneIndex = -1;
	    this.randomSceenes = [];
	    ref = this.scenes;
	    for (key in ref) {
	      scene = ref[key];
	      for (i = j = 0, ref1 = this.sceneFrequencies[key]; 0 <= ref1 ? j < ref1 : j > ref1; i = 0 <= ref1 ? ++j : --j) {
	        if (i % 2 === 0) {
	          this.randomSceenes.push(scene);
	        } else {
	          this.randomSceenes.unshift(scene);
	        }
	      }
	    }
	    this.shuffleArray(this.randomSceenes);
	    while (this.randomSceenes[0] === this.scenes["Escape"]) {
	      this.randomSceenes.push(this.randomSceenes.shift());
	    }
	    this.gotoNextScene();
	  };
	
	  Main.prototype.shuffleArray = function(array) {
	    var i, m, t;
	    m = array.length;
	    while (m) {
	      i = Math.floor(Math.random() * m--);
	      t = array[m];
	      array[m] = array[i];
	      array[i] = t;
	    }
	    return array;
	  };
	
	  Main.prototype.gotoNextScene = function() {
	    var _i, _key, key, ref, ref1, scene;
	    if (location.hash === "") {
	      this.sceneIndex++;
	      if (this.sceneIndex >= this.randomSceenes.length) {
	        this.shuffleArray(this.randomSceenes);
	        this.sceneIndex %= this.randomSceenes.length;
	      }
	      this.currentScene = this.randomSceenes[this.sceneIndex];
	      this.currentScene.start();
	    } else {
	      if (location.hash === "#all") {
	        this.sceneIndex++;
	        this.sceneIndex %= this.scenesLen;
	      } else if (location.hash !== "") {
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
	          this.currentScene = scene;
	          this.currentScene.start();
	          break;
	        }
	        _i += 1;
	      }
	    }
	  };
	
	  Main.prototype.onUpdate = function() {
	    var ref, ref1;
	    TWEEN.update();
	    if ((ref = this.currentScene) != null) {
	      ref.update();
	    }
	    this.context.clearRect(0, 0, this.stageWidth, this.stageHeight);
	    paper.view.update(true);
	    this.ctxScale = 1;
	    this.drawBasePosition(this.paper.stage);
	    if ((ref1 = this.statsView) != null) {
	      ref1.update();
	    }
	  };
	
	  Main.prototype.onDown = function(event) {
	    var point, press, touch;
	    touch = event.target;
	    point = touch.point;
	    press = 0;
	    if (this.direction === UPSIDE_DOWN) {
	      point.x = this.$window.width() - point.x;
	    }
	    if (!this.hitTest(point) && !this.$humberger.hasClass('close')) {
	      this.currentScene.touchDown(point, press);
	    }
	  };
	
	  Main.prototype.onMove = function(event) {
	    var point, press, touch, vector;
	    touch = event.target;
	    point = touch.point;
	    vector = touch.vector;
	    if (this.direction === UPSIDE_DOWN) {
	      point.x = this.$window.width() - point.x;
	      vector = vector.multiply(-1);
	    }
	    press = (vector.y / this.stageHeight) * 10;
	    if (!this.hitTest(point) && !this.$humberger.hasClass('close')) {
	      this.currentScene.touchMove(vector, point, press);
	    }
	  };
	
	  Main.prototype.onUp = function(event) {
	    var point, press, touch, vector;
	    touch = event.target;
	    point = touch.point;
	    vector = touch.vector;
	    if (this.direction === UPSIDE_DOWN) {
	      point.x = this.$window.width() - point.x;
	      vector = vector.multiply(-1);
	    }
	    press = (vector.y / this.stageHeight) * 10;
	    if (!this.hitTest(point) && !this.$humberger.hasClass('close')) {
	      this.currentScene.touchUp(vector, point, press);
	    }
	  };
	
	  Main.prototype.onResize = function() {
	    this.stageWidth = this.$window.width();
	    this.stageHeight = this.$window.height();
	    if (Utils.ua.fb || Utils.ua.tw) {
	      this.stageHeight -= 100;
	      this.$canvas.css({
	        'height': this.stageHeight
	      });
	    }
	    this.paper.resize(this.stageWidth, this.stageHeight);
	  };
	
	  Main.prototype.hitTest = function(point) {
	    var hit, maxX, maxY, minX, minY;
	    minX = this.$humberger.offset().left;
	    maxX = minX + this.$humberger.width();
	    minY = this.$humberger.offset().top;
	    maxY = minY + this.$humberger.height();
	    hit = minX <= point.x && maxX >= point.x && minY <= point.y && maxY >= point.y ? true : false;
	    return hit;
	  };
	
	  Main.prototype.onPCEasteEggInit = function() {
	    var _r;
	    this.execCount += 1;
	    if (this.execCount % 2 === 1) {
	      Utils.secretMode = true;
	      _r = 360;
	    } else {
	      Utils.secretMode = false;
	      _r = 0;
	    }
	    if (this.paper.stage.tween != null) {
	      this.paper.stage.tween.kill();
	    }
	    this.paper.stage.tween = TweenMax.to(this.paper.stage, .3, {
	      rotation: _r,
	      ease: Back.easeOut
	    });
	  };
	
	  Main.prototype.onSPEasteEggInit = function(evant) {
	    var beta;
	    beta = evant.originalEvent.beta;
	    if (Math.abs(-90 - beta) < 60 && this.direction === NORMAL) {
	      this.direction = UPSIDE_DOWN;
	      Utils.secretMode = true;
	      if (this.paper.stage.tween != null) {
	        this.paper.stage.tween.kill();
	      }
	      return this.paper.stage.tween = TweenMax.to(this.paper.stage, .3, {
	        rotation: 180,
	        ease: Back.easeOut
	      });
	    } else if (Math.abs(-90 - beta) >= 80 && this.direction === UPSIDE_DOWN) {
	      this.direction = NORMAL;
	      Utils.secretMode = false;
	      if (this.paper.stage.tween != null) {
	        this.paper.stage.tween.kill();
	      }
	      return this.paper.stage.tween = TweenMax.to(this.paper.stage, .3, {
	        rotation: 0,
	        ease: Back.easeOut
	      });
	    }
	  };
	
	  Main.prototype.drawBasePosition = function(obj) {
	    var child, color, j, len, ref, x, y;
	    x = obj.position.x;
	    y = obj.position.y;
	    color = '#00ffff';
	    if (obj instanceof paper.Layer) {
	      color = '#ff88ff';
	    } else if (obj instanceof paper.Group) {
	      color = '#88ff88';
	    }
	    if (this.pivotShowAll || (this.pivotShowLayer && obj instanceof paper.Layer) || (this.pivotShowGroup && obj instanceof paper.Group) || (this.pivotShowOther && !(obj instanceof paper.Layer) && !(obj instanceof paper.Group))) {
	      this.drawLine({
	        x: x - 5,
	        y: y
	      }, {
	        x: 10,
	        y: 0
	      }, color);
	      this.drawLine({
	        x: x,
	        y: y - 5
	      }, {
	        x: 0,
	        y: 10
	      }, color);
	    }
	    this.context.save();
	    obj.matrix.applyToContext(this.context);
	    if (obj instanceof paper.Layer || obj instanceof paper.Group) {
	      ref = obj.children;
	      for (j = 0, len = ref.length; j < len; j++) {
	        child = ref[j];
	        this.drawBasePosition(child);
	      }
	    }
	    this.context.restore();
	  };
	
	  Main.prototype.drawLine = function(from, to, color) {
	    this.context.beginPath();
	    this.context.moveTo(from.x, from.y);
	    this.context.lineTo(from.x + to.x, from.y + to.y);
	    this.context.strokeStyle = color;
	    this.context.lineWidth = 1 / this.ctxScale;
	    this.context.closePath();
	    this.context.stroke();
	  };
	
	  return Main;
	
	})();
	
	$(function() {
	  return window.main = new Main();
	});


/***/ },
/* 1 */,
/* 2 */
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
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var SimpleEventDispatcher, Touch,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	SimpleEventDispatcher = __webpack_require__(7);
	
	
	/*
	auth: Kimura
	data: 2016/01/16
	 */
	
	Touch = (function(superClass) {
	  extend(Touch, superClass);
	
	  Touch.DOWN = "down";
	
	  Touch.MOVE = "move";
	
	  Touch.UP = "up";
	
	  Touch.sharedInstance = null;
	
	  Touch.init = function(target) {
	    this.sharedInstance = new Touch(target);
	  };
	
	  function Touch(target) {
	    this.getPosition = bind(this.getPosition, this);
	    this.onUp = bind(this.onUp, this);
	    this.onMove = bind(this.onMove, this);
	    this.onDown = bind(this.onDown, this);
	    this.$window = $(window);
	    this.$target = $(target);
	    this.supportTouch = 'ontouchend' in document;
	    this.EVENT_TOUCHSTART = this.supportTouch ? 'touchstart' : 'mousedown';
	    this.EVENT_TOUCHMOVE = this.supportTouch ? 'touchmove' : 'mousemove';
	    this.EVENT_TOUCHEND = this.supportTouch ? 'touchend' : 'mouseup';
	    this.$window.on(this.EVENT_TOUCHSTART, this.onDown);
	    this.downPoint = new paper.Point(0, 0);
	    this.point = new paper.Point(0, 0);
	    this.vector = new paper.Point(0, 0);
	    return;
	  }
	
	  Touch.prototype.onDown = function(event) {
	    var position;
	    this.$window.on(this.EVENT_TOUCHEND, this.onUp);
	    this.$window.on(this.EVENT_TOUCHMOVE, this.onMove);
	    position = this.getPosition(event);
	    this.downPoint.x = this.point.x = position.pageX;
	    this.downPoint.y = this.point.y = position.pageY;
	    this.dispatchEvent(Touch.DOWN);
	  };
	
	  Touch.prototype.onMove = function(event) {
	    var position;
	    position = this.getPosition(event);
	    this.point.x = position.pageX;
	    this.point.y = position.pageY;
	    this.vector.x = position.pageX - this.downPoint.x;
	    this.vector.y = position.pageY - this.downPoint.y;
	    this.dispatchEvent(Touch.MOVE);
	  };
	
	  Touch.prototype.onUp = function(event) {
	    this.$window.off(this.EVENT_TOUCHEND, this.onUp);
	    this.$window.off(this.EVENT_TOUCHMOVE, this.onMove);
	    this.vector.x = this.point.x - this.downPoint.x;
	    this.vector.y = this.point.y - this.downPoint.y;
	    this.dispatchEvent(Touch.UP);
	  };
	
	  Touch.prototype.getPosition = function(event) {
	    var original;
	    original = event.originalEvent;
	    if (typeof original.touches !== 'undefined') {
	      return original.touches[0];
	    }
	    return event;
	  };
	
	  return Touch;
	
	})(SimpleEventDispatcher);
	
	module.exports = Touch;


/***/ },
/* 7 */
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
/* 8 */,
/* 9 */,
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ function(module, exports) {

	var LOCALIZABLES, Localizables;
	
	LOCALIZABLES = {
	  'ja': {
	    'This web page requires WebGL support.': 'このページを表示するにはWebGLに対応したブラウザが必要です。',
	    'The url is empty.': 'URLが入力されていません',
	    'The url and image file are both empty.': 'URLおよび画像ファイルが入力されていません',
	    'Invalid url.': 'URLが正しくありません',
	    'The url was not found.': 'URLの画像にアクセスできませんでした',
	    'No face was found.': '画像中に顔が検出されませんでした',
	    'The face is not smiling. You can only upload a photo with smiling face(s).': '検出された顔が笑顔ではありません。笑顔の写真のみ登録できます。',
	    'Unknown error.': '原因不明のエラーが発生しました',
	    'Your page is ready.': 'ページを生成しました。'
	  }
	};
	
	Localizables = (function() {
	  function Localizables() {}
	
	  Localizables.lang = (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0, 2);
	
	  Localizables.localize = function(message) {
	    var ref;
	    if (((ref = LOCALIZABLES[this.lang]) != null ? ref[message] : void 0) != null) {
	      message = LOCALIZABLES[this.lang][message];
	    }
	    return message;
	  };
	
	  return Localizables;
	
	})();
	
	module.exports = Localizables;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var Config, LoaderView, PaperStage, SimpleEventDispatcher, Touch, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	SimpleEventDispatcher = __webpack_require__(7);
	
	Touch = __webpack_require__(6);
	
	PaperStage = __webpack_require__(16);
	
	LoaderView = (function(superClass) {
	  extend(LoaderView, superClass);
	
	  LoaderView.VIEW_SHOW = "VIEW_SHOW";
	
	  LoaderView.VIEW_END = "VIEW_END";
	
	  function LoaderView() {
	    this.onResize = bind(this.onResize, this);
	    this.hide = bind(this.hide, this);
	    this.startAddEvent = bind(this.startAddEvent, this);
	    this.show = bind(this.show, this);
	    var _point, _shape, _size;
	    LoaderView.__super__.constructor.call(this);
	    this.sceneConfig = Config.Loading;
	    this.$window = $(window);
	    this.stage = PaperStage.instance.stage;
	    this.view = new paper.Group();
	    this.view.visible = false;
	    Utils.transformInit(this.view);
	    this.stage.addChild(this.view);
	    this.text = this.view.importSVG(this.sceneConfig.SVG.Text);
	    this.btnGroup = this.view.importSVG(this.sceneConfig.SVG.Button);
	    this.btn = this.btnGroup.children[0];
	    this.load = this.btnGroup.children[1];
	    this.play = this.btnGroup.children[2];
	    this.load.visible = false;
	    this.mask = new paper.Group();
	    Utils.transformInit(this.mask);
	    _size = new paper.Size(this.view.bounds.width, this.view.bounds.height);
	    _point = new paper.Point(this.view.bounds.x, this.view.bounds.y);
	    _shape = new paper.Shape.Rectangle(_point, _size);
	    _shape.fillColor = this.sceneConfig.COLOR.BG;
	    this.mask.addChild(_shape);
	    this.view.insertChild(0, this.mask);
	    this.$window.on('resize.LoaderView', this.onResize).trigger('resize.LoaderView');
	    this.show();
	  }
	
	  LoaderView.prototype.show = function() {
	    this.startAddEvent();
	    this.view.opacity = 0;
	    TweenMax.to(this.view, .2, {
	      opacity: 1,
	      ease: Expo.easeOut,
	      onStart: (function(_this) {
	        return function() {
	          return _this.view.visible = true;
	        };
	      })(this),
	      onComplete: (function(_this) {
	        return function() {
	          return _this.dispatchEvent(LoaderView.VIEW_SHOW);
	        };
	      })(this)
	    });
	  };
	
	  LoaderView.prototype.startAddEvent = function() {
	    this.tl = new TimelineMax({
	      repeat: -1
	    });
	    this.tl.to(this.play, 0, {
	      opacity: 0,
	      ease: Expo.easeIn,
	      delay: 1.8
	    });
	    this.tl.to(this.play, 0, {
	      opacity: 1,
	      ease: Expo.easeIn,
	      delay: .15
	    });
	    this.supportTouch = 'ontouchend' in document;
	    if (UA.type === UA.PC) {
	      this.EVENT_TOUCHMOVE = this.supportTouch ? 'touchmove.LoaderView' : 'mousemove.LoaderView';
	      this.EVENT_CLICK = 'click.LoaderView';
	      this.$window.on(this.EVENT_TOUCHMOVE, (function(_this) {
	        return function(event) {
	          if (_this.hitTest(event)) {
	            _this.btn.fillColor = _this.sceneConfig.COLOR.ENTER;
	            document.body.style.cursor = "pointer";
	          } else {
	            _this.btn.fillColor = _this.sceneConfig.COLOR.LEAVE;
	            document.body.style.cursor = "default";
	          }
	        };
	      })(this));
	      this.$window.on(this.EVENT_CLICK, (function(_this) {
	        return function(event) {
	          if (_this.hitTest(event)) {
	            document.body.style.cursor = "default";
	            _this.hide();
	          }
	        };
	      })(this));
	    } else {
	      this.EVENT_TOUCHSTART = this.supportTouch ? 'touchstart.LoaderView' : 'mousedown.LoaderView';
	      this.EVENT_TOUCHEND = this.supportTouch ? 'touchend.LoaderView' : 'mouseup.LoaderView';
	      this.$window.on(this.EVENT_TOUCHSTART, (function(_this) {
	        return function() {
	          return _this.btn.fillColor = _this.sceneConfig.COLOR.ENTER;
	        };
	      })(this));
	      this.$window.on(this.EVENT_TOUCHEND, (function(_this) {
	        return function() {
	          return _this.hide();
	        };
	      })(this));
	    }
	  };
	
	  LoaderView.prototype.hitTest = function(event) {
	    var option, point, test;
	    option = {
	      segments: true,
	      stroke: true,
	      fill: true,
	      tolerance: 5
	    };
	    point = {
	      x: event.originalEvent.pageX,
	      y: event.originalEvent.pageY
	    };
	    point = this.view.globalToLocal(point);
	    test = this.btnGroup.hitTest(point, option);
	    return test;
	  };
	
	  LoaderView.prototype.hide = function() {
	    this.view.visible = false;
	    this.view.removeChildren();
	    this.view.remove();
	    if (UA.type === UA.PC) {
	      this.$window.off(this.EVENT_TOUCHMOVE);
	      this.$window.off(this.EVENT_CLICK);
	    } else {
	      this.$window.off(this.EVENT_TOUCHSTART);
	      this.$window.off(this.EVENT_TOUCHEND);
	    }
	    this.tl.pause();
	    this.tl.kill();
	    return this.dispatchEvent(LoaderView.VIEW_END);
	  };
	
	  LoaderView.prototype.onResize = function() {
	    var _height, _scale, _size, _width;
	    _width = PaperStage.instance.width;
	    _height = PaperStage.instance.height;
	    this.view.scaling.set(1, 1);
	    if (_width < _height) {
	      _size = _width * .72;
	      _scale = _size / this.view.bounds.width;
	      if (this.view.bounds.width * _scale >= 300) {
	        _scale = 300 / this.view.bounds.width;
	      }
	    } else {
	      _size = _height * .72;
	      _scale = _size / this.view.bounds.height;
	      if (this.view.bounds.height * _scale >= 330) {
	        _scale = 330 / this.view.bounds.height;
	      }
	    }
	    this.view.scaling.set(_scale, _scale);
	  };
	
	  return LoaderView;
	
	})(SimpleEventDispatcher);
	
	module.exports = LoaderView;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Base, BtnView, Config, LogoTypeView, Pudding, PuddingView, SceneBase, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	SceneBase = __webpack_require__(22);
	
	BtnView = __webpack_require__(23);
	
	Base = __webpack_require__(13);
	
	LogoTypeView = __webpack_require__(24);
	
	PuddingView = __webpack_require__(25);
	
	SoundManager = __webpack_require__(17);
	
	Pudding = (function(superClass) {
	  extend(Pudding, superClass);
	
	  function Pudding() {
	    this._onSwapping = bind(this._onSwapping, this);
	    this._onEnd = bind(this._onEnd, this);
	    return Pudding.__super__.constructor.apply(this, arguments);
	  }
	
	  Pudding.prototype._onInit = function() {
	    var base, change, press, pull;
	    this.sceneConfig = Config.Pudding;
	    pull = Utils.getSvgChild(Config.SVG.PULL);
	    base = Utils.getSvgChild(Config.SVG.BASE);
	    press = Utils.getSvgChild(Config.SVG.PRESS);
	    change = Utils.getSvgChild(this.sceneConfig.SVG.Stretch);
	    this.btn = new BtnView([pull, base, press, change]);
	    this.btn.soft = 1;
	    this.base = new Base();
	    this.logoType = new LogoTypeView();
	    this.pudding = new PuddingView();
	    this.container.addChildren([this.btn, this.pudding, this.base, this.logoType]);
	  };
	
	  Pudding.prototype._onStart = function() {
	    this.container.position.x = 0;
	    this.addChild(this.container);
	  };
	
	  Pudding.prototype._onEnd = function() {
	    this.removeChildren();
	    this.logoType.end();
	    this.btn.end();
	    this.pudding.end();
	  };
	
	  Pudding.prototype._onUpdate = function() {
	    if (this.mode === SceneBase.Mode.Touching || this.mode === SceneBase.Mode.Standby) {
	      this.btn.update();
	    }
	  };
	
	  Pudding.prototype._onStandby = function() {
	    this.btn.up();
	  };
	
	  Pudding.prototype._onEffect = function() {
	    var _se;
	    _se = Utils.getSE(this.sceneConfig.SOUND.SE1);
	    SoundManager.play(_se);
	    this.btn.fall();
	    this.pudding.fall().then(this.pudding.drip).then(this.swap);
	    this.logoType.effect();
	  };
	
	  Pudding.prototype._onSwapping = function() {
	    TweenMax.to(this.container.position, .6, {
	      x: this.paper.width,
	      ease: Expo.easeInOut,
	      onComplete: this.end
	    });
	    this.nextContainer.position.x = -this.paper.width;
	    this.addChild(this.nextContainer);
	    TweenMax.to(this.nextContainer.position, .6, {
	      x: 0,
	      ease: Expo.easeInOut
	    });
	  };
	
	  return Pudding;
	
	})(SceneBase);
	
	module.exports = Pudding;


/***/ },
/* 21 */
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
/* 22 */
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var Btn, BtnView,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Btn = __webpack_require__(10);
	
	BtnView = (function(superClass) {
	  extend(BtnView, superClass);
	
	  function BtnView() {
	    return BtnView.__super__.constructor.apply(this, arguments);
	  }
	
	  BtnView.prototype.end = function() {
	    this.reset();
	  };
	
	  BtnView.prototype.fall = function() {
	    TweenMax.to(this.fill.position, .6, {
	      y: 100,
	      ease: Elastic.easeOut
	    });
	    TweenMax.to(this.fill, .12, {
	      morph: 3,
	      opacity: 0,
	      onUpdate: this.fill.update,
	      ease: Elastic.easeOut
	    });
	  };
	
	  return BtnView;
	
	})(Btn);
	
	module.exports = BtnView;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var LogoType, LogoTypeView,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	LogoType = __webpack_require__(15);
	
	LogoTypeView = (function(superClass) {
	  extend(LogoTypeView, superClass);
	
	  function LogoTypeView() {
	    return LogoTypeView.__super__.constructor.apply(this, arguments);
	  }
	
	  LogoTypeView.prototype.end = function() {
	    this.position.y = 0;
	  };
	
	  LogoTypeView.prototype.effect = function() {
	    TweenMax.to(this.position, .15, {
	      y: 60,
	      ease: Back.easeOut
	    });
	  };
	
	  return LogoTypeView;
	
	})(LogoType);
	
	module.exports = LogoTypeView;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var BASE, Config, DRIP_AFTER, DRIP_BEFORE, MorphablePath, PRESS, PULL, PuddingView, STRETCH, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	MorphablePath = __webpack_require__(12);
	
	BASE = 0;
	
	STRETCH = 1;
	
	PULL = 2;
	
	PRESS = 3;
	
	DRIP_BEFORE = 4;
	
	DRIP_AFTER = 5;
	
	PuddingView = (function(superClass) {
	  extend(PuddingView, superClass);
	
	  function PuddingView() {
	    this.update = bind(this.update, this);
	    this.drip = bind(this.drip, this);
	    var base, baseDripAfter, baseDripBefore, basePress, basePull, baseStretch, caramel, caramelDripAfter, caramelDripBefore, caramelPress, caramelPull, caramelStretch;
	    PuddingView.__super__.constructor.call(this);
	    this.sceneConfig = Config.Pudding;
	    this.morph = 0;
	    base = Utils.getSvgChild(this.sceneConfig.SVG.Base, 0);
	    baseStretch = Utils.getSvgChild(this.sceneConfig.SVG.Stretch, 0);
	    basePull = Utils.getSvgChild(this.sceneConfig.SVG.Pull, 0);
	    basePress = Utils.getSvgChild(this.sceneConfig.SVG.Press, 0);
	    baseDripBefore = Utils.getSvgChild(this.sceneConfig.SVG.Stretch, 0);
	    baseDripAfter = Utils.getSvgChild(this.sceneConfig.SVG.Drip, 0);
	    this.base = new MorphablePath([base, baseStretch, basePull, basePress, baseDripBefore, baseDripAfter]);
	    this.base.fillColor = this.sceneConfig.COLOR.BASE;
	    caramel = Utils.getSvgChild(this.sceneConfig.SVG.Base, 1);
	    caramelStretch = Utils.getSvgChild(this.sceneConfig.SVG.Stretch, 1);
	    caramelPull = Utils.getSvgChild(this.sceneConfig.SVG.Pull, 1);
	    caramelPress = Utils.getSvgChild(this.sceneConfig.SVG.Press, 1);
	    caramelDripBefore = Utils.getSvgChild(this.sceneConfig.SVG.Stretch, 1);
	    caramelDripAfter = Utils.getSvgChild(this.sceneConfig.SVG.Drip, 1);
	    this.caramel = new MorphablePath([caramel, caramelStretch, caramelPull, caramelPress, caramelDripBefore, caramelDripAfter]);
	    this.caramel.fillColor = this.sceneConfig.COLOR.CARAMEL;
	    Utils.transformInit(this);
	    this.addChildren([this.base, this.caramel]);
	    this.position.y = 20;
	    this.visible = false;
	  }
	
	  PuddingView.prototype.end = function() {
	    this.position.y = 20;
	    this.visible = false;
	    this.morph = 0;
	    this.update();
	  };
	
	  PuddingView.prototype.fall = function() {
	    var df, tl;
	    df = new $.Deferred;
	    this.opacity = 0;
	    this.visible = true;
	    TweenMax.to(this.position, .6, {
	      y: 80,
	      ease: Elastic.easeOut
	    });
	    tl = new TimelineMax({
	      onComplete: df.resolve
	    });
	    tl.to(this, .12, {
	      morph: STRETCH,
	      opacity: 1,
	      onUpdate: this.update,
	      ease: Sine.easeOut
	    });
	    tl.to(this, .1, {
	      morph: PRESS,
	      onUpdate: this.update,
	      ease: Sine.easeIn
	    });
	    tl.to(this, .1, {
	      morph: PULL,
	      onUpdate: this.update,
	      ease: Sine.easeOut
	    });
	    tl.to(this, .1, {
	      morph: STRETCH,
	      onUpdate: this.update,
	      ease: Sine.easeOut
	    });
	    return df.promise();
	  };
	
	  PuddingView.prototype.drip = function() {
	    var df;
	    df = new $.Deferred();
	    this.update(DRIP_BEFORE);
	    TweenMax.to(this, 1, {
	      morph: DRIP_AFTER - .5,
	      ease: Sine.easeInOut,
	      onUpdate: this.update
	    });
	    setTimeout(df.resolve, 550);
	    return df.promise();
	  };
	
	  PuddingView.prototype.update = function(morph) {
	    if (morph == null) {
	      morph = this.morph;
	    }
	    this.morph = morph;
	    this.base.update(this.morph);
	    this.caramel.update(this.morph);
	  };
	
	  return PuddingView;
	
	})(paper.Group);
	
	module.exports = PuddingView;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var BaseView, BtnView, Config, Jump, LogoGroupView, LogoType, LogoTypeView, SceneBase, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	SceneBase = __webpack_require__(22);
	
	BtnView = __webpack_require__(27);
	
	BaseView = __webpack_require__(28);
	
	LogoType = __webpack_require__(15);
	
	LogoGroupView = __webpack_require__(29);
	
	LogoTypeView = __webpack_require__(30);
	
	SoundManager = __webpack_require__(17);
	
	Jump = (function(superClass) {
	  extend(Jump, superClass);
	
	  function Jump() {
	    this._onSwapping = bind(this._onSwapping, this);
	    this._onEnd = bind(this._onEnd, this);
	    return Jump.__super__.constructor.apply(this, arguments);
	  }
	
	  Jump.prototype._onInit = function() {
	    var base, basePress;
	    this.sceneConfig = Config.Jump;
	    base = Utils.getSvgChild(Config.SVG.BASE, 1);
	    basePress = Utils.getSvgChild(this.sceneConfig.SVG.BasePress);
	    this.btn = new BtnView();
	    this.btn.soft = 1;
	    this.base = new BaseView([base, basePress]);
	    this.logoType = new LogoTypeView();
	    this.logoGroup = new LogoGroupView(this.btn, this.base);
	    this.container.addChildren([this.logoGroup, this.logoType]);
	    this.isSePlaying = false;
	  };
	
	  Jump.prototype._onStart = function() {
	    this.sePress = Utils.getSE(this.sceneConfig.SOUND.SE1);
	    this.seNoPress = Utils.getSE(this.sceneConfig.SOUND.SE2);
	    this.container.position.x = 0;
	    this.addChild(this.container);
	  };
	
	  Jump.prototype._onEnd = function() {
	    this.removeChildren();
	    this.base.end();
	    this.logoGroup.end();
	    this.logoType.end();
	  };
	
	  Jump.prototype._onModeChange = function() {
	    if (this.mode === SceneBase.Mode.Touching) {
	      SoundManager.play(this.sePress, 0, true);
	      this.isSePlaying = true;
	    } else if (this.mode === SceneBase.Mode.Standby) {
	      if (this.isSePlaying) {
	        SoundManager.play(this.seNoPress);
	      }
	      this.isSePlaying = false;
	      SoundManager.stop(this.sePress);
	    } else if (this.mode === SceneBase.Mode.Effect) {
	      this.isSePlaying = false;
	      SoundManager.stop(this.sePress);
	    }
	  };
	
	  Jump.prototype._onUpdate = function() {
	    var now, press, ref, ref1;
	    if (this.mode === SceneBase.Mode.Touching) {
	      press = this.press / 2;
	      if (press < 0) {
	        press = 0;
	      }
	      if (press > 1) {
	        press = 1;
	      }
	      press = TWEEN.Easing.Sine.In(press);
	      now = new Date().getTime();
	      this.position.x = this.basePosX + Math.sin(now * 0.025) * press * 1;
	    } else {
	      this.position.x = this.basePosX;
	    }
	    if (this.mode === SceneBase.Mode.Touching || this.mode === SceneBase.Mode.Standby) {
	      this.base.update();
	      if ((ref = this.btn) != null) {
	        ref.update(this.base.morph);
	      }
	      if ((ref1 = this.logoType) != null) {
	        ref1.update();
	      }
	    }
	  };
	
	  Jump.prototype._onEffect = function() {
	    var _se;
	    _se = Utils.getSE(this.sceneConfig.SOUND.SE3);
	    SoundManager.play(_se);
	    this.logoGroup.effect(this.press, this.vector).then(this.swap);
	    this.logoType.effect();
	  };
	
	  Jump.prototype._onSwapping = function() {
	    TweenMax.to(this.container.position, .6, {
	      x: this.paper.width,
	      ease: Expo.easeInOut,
	      onComplete: this.end
	    });
	    this.nextContainer.position.x = -this.paper.width;
	    this.addChild(this.nextContainer);
	    TweenMax.to(this.nextContainer.position, .6, {
	      x: 0,
	      ease: Expo.easeInOut
	    });
	  };
	
	  return Jump;
	
	})(SceneBase);
	
	module.exports = Jump;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var Btn, BtnView, Config,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Btn = __webpack_require__(10);
	
	BtnView = (function(superClass) {
	  extend(BtnView, superClass);
	
	  function BtnView() {
	    this.update = bind(this.update, this);
	    return BtnView.__super__.constructor.apply(this, arguments);
	  }
	
	  BtnView.prototype.update = function(adjustment) {
	    var press, y;
	    if (adjustment == null) {
	      adjustment = 0;
	    }
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
	    this.position.y = TWEEN.Easing.Sinusoidal.InOut(y) * 20 + (2 * adjustment);
	    if (this.press < 0) {
	      this.morph = this.press + 1;
	      this.stroke.update(this.morph);
	      this.fill.update(this.morph);
	    } else if (this.press > 1) {
	      this.morph = 1 + ((this.press - 1) * this.soft);
	      this.stroke.update(this.morph);
	      this.fill.update(this.morph);
	    }
	    return this._onUpdate();
	  };
	
	  return BtnView;
	
	})(Btn);
	
	module.exports = BtnView;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var Base, BaseView, Config,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Base = __webpack_require__(13);
	
	BaseView = (function(superClass) {
	  extend(BaseView, superClass);
	
	  function BaseView() {
	    return BaseView.__super__.constructor.apply(this, arguments);
	  }
	
	  BaseView.prototype.end = function() {
	    this.morph = 0;
	    this.reset();
	  };
	
	  BaseView.prototype._onUpdate = function() {
	    if (this.press < 1) {
	      this.press = 1;
	    } else if (this.press > 2) {
	      this.press = 2;
	    }
	    this.morph = this.press - 1;
	    this.boneStroke.update(this.morph);
	    this.stroke.update();
	    this.fill.update(this.morph);
	  };
	
	  return BaseView;
	
	})(Base);
	
	module.exports = BaseView;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var LogoGroupView,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	LogoGroupView = (function(superClass) {
	  extend(LogoGroupView, superClass);
	
	  function LogoGroupView(btn, base) {
	    this.btn = btn;
	    this.base = base;
	    LogoGroupView.__super__.constructor.call(this, [btn, base]);
	    this.transformContent = false;
	    this.pivot = new paper.Point(0, 0);
	  }
	
	  LogoGroupView.prototype.end = function() {
	    this.matrix = new paper.Matrix();
	    this.position.set(0, 0);
	    this.rotate(0);
	    this.scale(1);
	  };
	
	  LogoGroupView.prototype.effect = function(press, vector) {
	    var angle, df, downVector, dummy, topVector, yTl;
	    df = new $.Deferred();
	    this.press = press;
	    angle = vector.angle + 180;
	    if (angle < -180) {
	      angle += 360;
	    } else if (angle > 180) {
	      angle -= 360;
	    }
	    if (angle < -135) {
	      angle = -135;
	    } else if (angle > -45) {
	      angle = -45;
	    }
	    topVector = new paper.Point({
	      length: 175,
	      angle: angle
	    });
	    downVector = new paper.Point({
	      length: 200,
	      angle: angle
	    });
	    downVector.y -= (downVector.y - topVector.y) * 2.5;
	    dummy = {
	      scale: 1,
	      angle: 0,
	      x: this.position.x,
	      y: this.position.y
	    };
	    yTl = new TimelineMax();
	    yTl.to(dummy, .2, {
	      y: topVector.y,
	      ease: Cubic.easeOut
	    });
	    yTl.to(dummy, .3, {
	      y: downVector.y,
	      ease: Cubic.easeIn
	    });
	    TweenMax.to(dummy, .5, {
	      angle: (angle + 90) * 1.5,
	      ease: Sine.easeInOut
	    });
	    TweenMax.to(dummy, .5, {
	      scale: 0,
	      x: downVector.x,
	      ease: Sine.easeOut,
	      onComplete: df.resolve,
	      onUpdate: (function(_this) {
	        return function(v) {
	          _this.matrix.reset();
	          _this.scale(dummy.scale);
	          _this.rotate(dummy.angle);
	          _this.position.x = dummy.x;
	          return _this.position.y = dummy.y;
	        };
	      })(this)
	    });
	    return df.promise();
	  };
	
	  return LogoGroupView;
	
	})(paper.Group);
	
	module.exports = LogoGroupView;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var LogoType, LogoTypeView,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	LogoType = __webpack_require__(15);
	
	LogoTypeView = (function(superClass) {
	  extend(LogoTypeView, superClass);
	
	  function LogoTypeView() {
	    return LogoTypeView.__super__.constructor.apply(this, arguments);
	  }
	
	  LogoTypeView.prototype._onInit = function() {
	    var child, j, len, ref;
	    this.baseHeight = [];
	    ref = this.children;
	    for (j = 0, len = ref.length; j < len; j++) {
	      child = ref[j];
	      this.baseHeight.push(child.bounds.height);
	    }
	  };
	
	  LogoTypeView.prototype.end = function() {
	    var child, i, j, len, ref;
	    this.press = 0;
	    ref = this.children;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      child = ref[i];
	      child.matrix = new paper.Matrix();
	      child.scale(1, 1);
	      child.position.y = child.position.y + ((this.baseHeight[i] - child.bounds.height) / 2);
	    }
	  };
	
	  LogoTypeView.prototype._onUpdate = function() {
	    var press;
	    press = this.press / 2;
	    if (press < 0) {
	      press = 0;
	    }
	    if (press > 1) {
	      press = 1;
	    }
	    this.scaleRatio = 1 - TWEEN.Easing.Sine.In(press) * 0.03 - press * 0.05;
	    this.setChildrensScaleY(this.scaleRatio);
	  };
	
	  LogoTypeView.prototype.effect = function() {
	    var bound, diffScale;
	    bound = [];
	    this.scaleRatio *= 0.2;
	    this.setChildrensScaleY(this.scaleRatio);
	    diffScale = 1 - this.scaleRatio;
	    new TWEEN.Tween(null).to(null, 600).easing(TWEEN.Easing.Elastic.Out).onUpdate((function(_this) {
	      return function(v) {
	        return _this.setChildrensScaleY(_this.scaleRatio + (diffScale * v));
	      };
	    })(this)).start();
	  };
	
	  LogoTypeView.prototype.setChildrensScaleY = function(scale) {
	    var child, i, j, len, ref, results;
	    ref = this.children;
	    results = [];
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      child = ref[i];
	      child.matrix = new paper.Matrix();
	      child.scale(1, scale);
	      results.push(child.position.y = child.position.y + ((this.baseHeight[i] - child.bounds.height) / 2));
	    }
	    return results;
	  };
	
	  return LogoTypeView;
	
	})(LogoType);
	
	module.exports = LogoTypeView;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var BaseView, Btn, BtnView, Config, Explosion, LogoTypeView, SceneBase, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	SceneBase = __webpack_require__(22);
	
	Btn = __webpack_require__(10);
	
	BtnView = __webpack_require__(32);
	
	BaseView = __webpack_require__(33);
	
	LogoTypeView = __webpack_require__(34);
	
	SoundManager = __webpack_require__(17);
	
	Explosion = (function(superClass) {
	  extend(Explosion, superClass);
	
	  function Explosion() {
	    this._onSwapping = bind(this._onSwapping, this);
	    this._onEnd = bind(this._onEnd, this);
	    return Explosion.__super__.constructor.apply(this, arguments);
	  }
	
	  Explosion.prototype._onInit = function() {
	    var btn, btnInflated, btnPress, btnPull;
	    this.sceneConfig = Config.Explosion;
	    btnPull = Utils.getSvgChild(Config.SVG.PULL);
	    btn = Utils.getSvgChild(Config.SVG.BASE);
	    btnPress = Utils.getSvgChild(Config.SVG.PRESS);
	    btnInflated = Utils.getSvgChild(this.sceneConfig.SVG.Inflated);
	    this.btn = new BtnView([btnPull, btn, btnPress, btnInflated]);
	    this.btn.soft = 0;
	    this.base = new BaseView();
	    this.logoType = new LogoTypeView();
	    this.container.addChildren([this.btn, this.base, this.logoType]);
	  };
	
	  Explosion.prototype._onStart = function() {
	    this.seSiren = Utils.getSE(this.sceneConfig.SOUND.SE1);
	    this.seOn = Utils.getSE(this.sceneConfig.SOUND.SE2);
	    this.container.position.x = 0;
	    this.addChild(this.container);
	  };
	
	  Explosion.prototype._onEnd = function() {
	    this.container.visible = true;
	    this.removeChildren();
	    this.btn.end();
	    this.base.end();
	    this.logoType.end();
	  };
	
	  Explosion.prototype._onModeChange = function() {
	    if (this.mode === SceneBase.Mode.Touching) {
	      this.logoType.warningShow();
	      return SoundManager.play(this.seSiren, 0, true);
	    } else if (this.mode === SceneBase.Mode.Standby) {
	      this.logoType.warningHide();
	      return SoundManager.stop(this.seSiren, 300);
	    } else if (this.mode === SceneBase.Mode.Effect) {
	      return this.logoType.warningHide();
	    }
	  };
	
	  Explosion.prototype._onUpdate = function() {
	    if (this.mode === SceneBase.Mode.Touching || this.mode === SceneBase.Mode.Standby) {
	      this.btn.press = this.press;
	      this.btn.update();
	    }
	    if (this.mode === SceneBase.Mode.Touching) {
	      this.logoType.warningUpdate();
	    }
	  };
	
	  Explosion.prototype._onTouchMove = function() {
	    return this.pressed = false;
	  };
	
	  Explosion.prototype._onTouchMove = function() {
	    if (!this.pressed) {
	      if (this.press >= 1) {
	        SoundManager.play(this.seOn);
	        return this.pressed = true;
	      }
	    } else if (this.press < 1) {
	      return this.pressed = false;
	    }
	  };
	
	  Explosion.prototype._onTouchUp = function() {
	    if (this.mode === SceneBase.Mode.Standby) {
	      this.btn.up();
	    }
	  };
	
	  Explosion.prototype._onStandby = function() {
	    this.btn.up();
	  };
	
	  Explosion.prototype._onEffect = function() {
	    this.btn.inflated().then((function(_this) {
	      return function() {
	        return SoundManager.stop(_this.seSiren);
	      };
	    })(this)).then((function(_this) {
	      return function() {
	        return _this.logoType.explosion(_this.bounds.width);
	      };
	    })(this)).then((function(_this) {
	      return function() {
	        return _this.base.explosion(_this.bounds.width);
	      };
	    })(this)).then((function(_this) {
	      return function() {
	        return _this.btn.explosion(_this.bounds.width);
	      };
	    })(this)).then(this.swap);
	  };
	
	  Explosion.prototype._onSwapping = function() {
	    this.container.visible = false;
	    this.nextContainer.position.y = this.paper.height;
	    this.addChild(this.nextContainer);
	    TweenMax.to(this.nextContainer.position, .6, {
	      y: 0,
	      ease: Expo.easeInOut,
	      onComplete: this.end
	    });
	  };
	
	  return Explosion;
	
	})(SceneBase);
	
	module.exports = Explosion;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var Btn, BtnView, Config, INFLATED, PaperStage, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	Btn = __webpack_require__(10);
	
	PaperStage = __webpack_require__(16);
	
	SoundManager = __webpack_require__(17);
	
	INFLATED = 3;
	
	BtnView = (function(superClass) {
	  extend(BtnView, superClass);
	
	  function BtnView() {
	    this.morphingUpdate = bind(this.morphingUpdate, this);
	    this.explosion = bind(this.explosion, this);
	    return BtnView.__super__.constructor.apply(this, arguments);
	  }
	
	  BtnView.prototype._onInit = function() {
	    var _svg, i, len, path, ref;
	    this.sceneConfig = Config.Explosion;
	    this.explosionGroup = new paper.Group();
	    this.explosionGroup.visible = false;
	    Utils.transformInit(this.explosionGroup);
	    _svg = this.importSVG(this.sceneConfig.SVG.ExplosionBefore);
	    _svg.remove();
	    this.explosionGroup.addChildren(_svg.children);
	    ref = this.explosionGroup.children;
	    for (i = 0, len = ref.length; i < len; i++) {
	      path = ref[i];
	      Utils.transformInit(path, false);
	      path.savePos = path.position;
	    }
	    this.addChild(this.explosionGroup);
	  };
	
	  BtnView.prototype.end = function() {
	    var i, len, path, ref;
	    this.reset();
	    this.explosionGroup.visible = false;
	    ref = this.explosionGroup.children;
	    for (i = 0, len = ref.length; i < len; i++) {
	      path = ref[i];
	      path.position = path.savePos;
	    }
	  };
	
	  BtnView.prototype.colorWarning = function() {
	    this.fill.fillColor = Config.COLOR.BTN_FILL_RED;
	  };
	
	  BtnView.prototype.colorNormal = function() {
	    this.fill.fillColor = Config.COLOR.BTN_FILL;
	  };
	
	  BtnView.prototype.inflated = function() {
	    var df;
	    df = new $.Deferred;
	    TweenMax.to(this.position, 0.075, {
	      y: 0,
	      ease: Sine.easeIn
	    });
	    TweenMax.to(this, 0.075, {
	      morph: INFLATED,
	      ease: Sine.easeIn,
	      onUpdate: this.morphingUpdate,
	      onComplete: df.resolve
	    });
	    return df.promise();
	  };
	
	  BtnView.prototype.explosion = function(width) {
	    var _angle, _p, _point, _scale, _se, _x, _y, df, distance, i, len, length, path, position, rad, ref, scaling;
	    df = new $.Deferred;
	    this.fill.visible = false;
	    this.stroke.visible = false;
	    _se = Utils.getSE(this.sceneConfig.SOUND.SE3);
	    SoundManager.play(_se);
	    this.offsetPoint = new paper.Point(-5, -20);
	    distance = PaperStage.instance.width / width * 2.0;
	    this.explosionGroup.visible = true;
	    ref = this.explosionGroup.children;
	    for (i = 0, len = ref.length; i < len; i++) {
	      path = ref[i];
	      _p = new paper.Point(path.position.x, path.position.y);
	      _point = _p.subtract(this.offsetPoint);
	      rad = _point.angleInRadians;
	      rad += (Math.random() * 0.5 - 0.25) * Math.PI;
	      length = _point.length;
	      _x = Math.cos(rad) * length * distance;
	      _y = Math.sin(rad) * length * distance;
	      _scale = Math.random() * .5 + .75;
	      _angle = Math.random() * 180 - 90;
	      position = path.position;
	      scaling = path.scaling;
	      path.rotate(_angle);
	      TweenMax.to(position, .6, {
	        y: _y,
	        ease: Expo.easeOut
	      });
	      TweenMax.to(position, .6, {
	        x: _x,
	        ease: Expo.easeOut
	      });
	      TweenMax.to(scaling, .6, {
	        x: _scale,
	        y: _scale,
	        ease: Expo.easeOut
	      });
	    }
	    setTimeout(df.resolve, 400);
	    return df.promise();
	  };
	
	  BtnView.prototype.morphingUpdate = function() {
	    if (this._morph === this.morph) {
	      return;
	    }
	    this.stroke.update(this.morph);
	    this.fill.update(this.morph);
	    this._morph = this.morph;
	  };
	
	  return BtnView;
	
	})(Btn);
	
	module.exports = BtnView;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var Base, BaseView, Config, PaperStage, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	Base = __webpack_require__(13);
	
	PaperStage = __webpack_require__(16);
	
	BaseView = (function(superClass) {
	  extend(BaseView, superClass);
	
	  function BaseView() {
	    this.explosion = bind(this.explosion, this);
	    return BaseView.__super__.constructor.apply(this, arguments);
	  }
	
	  BaseView.prototype._onInit = function() {
	    var _svg, i, len, path, ref;
	    this.sceneConfig = Config.Explosion;
	    this.explosionGroup = new paper.Group();
	    this.explosionGroup.visible = false;
	    Utils.transformInit(this.explosionGroup);
	    _svg = this.importSVG(this.sceneConfig.SVG.ExplosionBaseBefore);
	    _svg.remove();
	    this.explosionGroup.addChildren(_svg.children);
	    ref = this.explosionGroup.children;
	    for (i = 0, len = ref.length; i < len; i++) {
	      path = ref[i];
	      Utils.transformInit(path, false);
	      path.savePos = path.position;
	    }
	    this.addChild(this.explosionGroup);
	  };
	
	  BaseView.prototype.end = function() {
	    var i, len, path, ref;
	    this.reset();
	    this.explosionGroup.visible = false;
	    ref = this.explosionGroup.children;
	    for (i = 0, len = ref.length; i < len; i++) {
	      path = ref[i];
	      path.position = path.savePos;
	    }
	  };
	
	  BaseView.prototype.explosion = function(width) {
	    var _angle, _p, _point, _scale, _x, _y, distance, i, len, length, path, position, rad, ref, scaling;
	    this.fill.visible = false;
	    this.stroke.visible = false;
	    this.offsetPoint = new paper.Point(-5, -20);
	    distance = PaperStage.instance.width / width * 1.6;
	    this.explosionGroup.visible = true;
	    ref = this.explosionGroup.children;
	    for (i = 0, len = ref.length; i < len; i++) {
	      path = ref[i];
	      _p = new paper.Point(path.position.x, path.position.y);
	      _point = _p.subtract(this.offsetPoint);
	      rad = _point.angleInRadians;
	      rad += (Math.random() * 0.5 - 0.25) * Math.PI;
	      length = _point.length;
	      _x = Math.cos(rad) * length * distance;
	      _y = Math.sin(rad) * length * distance;
	      _scale = Math.random() * .5 + .75;
	      _angle = Math.random() * 180 - 90;
	      position = path.position;
	      scaling = path.scaling;
	      path.rotate(_angle);
	      TweenMax.to(position, .6, {
	        y: _y,
	        ease: Expo.easeOut
	      });
	      TweenMax.to(position, .6, {
	        x: _x,
	        ease: Expo.easeOut
	      });
	      TweenMax.to(scaling, .6, {
	        x: _scale,
	        y: _scale,
	        ease: Expo.easeOut
	      });
	    }
	  };
	
	  return BaseView;
	
	})(Base);
	
	module.exports = BaseView;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var Config, LogoType, LogoTypeView, PaperStage, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	LogoType = __webpack_require__(15);
	
	Utils = __webpack_require__(2);
	
	Config = __webpack_require__(11);
	
	PaperStage = __webpack_require__(16);
	
	LogoTypeView = (function(superClass) {
	  extend(LogoTypeView, superClass);
	
	  function LogoTypeView() {
	    this.explosion = bind(this.explosion, this);
	    this.rasterOnLoad = bind(this.rasterOnLoad, this);
	    return LogoTypeView.__super__.constructor.apply(this, arguments);
	  }
	
	  LogoTypeView.prototype._onInit = function() {
	    var j, len, path, ref;
	    ref = this.pathes;
	    for (j = 0, len = ref.length; j < len; j++) {
	      path = ref[j];
	      path.savePos = path.position;
	      path.remove();
	    }
	    this.logoTypeGroup = new paper.Group();
	    Utils.transformInit(this.logoTypeGroup);
	    this.addChild(this.logoTypeGroup);
	    this.logoTypeGroup.addChildren(this.pathes);
	    this.raster = new paper.Raster('/images/play/explosion-bg.png');
	    this.raster.onLoad = this.rasterOnLoad;
	    this.raster.remove();
	    this.warning = new paper.Group();
	    Utils.transformInit(this.warning);
	    this.addChild(this.warning);
	    this.warning.visible = false;
	  };
	
	  LogoTypeView.prototype.rasterOnLoad = function() {
	    var group, i, j, len, path, ref;
	    this.raster.scaling.set(0.5, 0.5);
	    this.warningTypes = [];
	    ref = this.logoTypeGroup.children;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      path = ref[i];
	      group = new paper.Group([path.clone(), this.raster.clone()]);
	      Utils.transformInit(group);
	      group.clipped = true;
	      this.warning.addChild(group);
	    }
	  };
	
	  LogoTypeView.prototype.warningUpdate = function() {
	    var group, j, len, ref, results;
	    ref = this.warning.children;
	    results = [];
	    for (j = 0, len = ref.length; j < len; j++) {
	      group = ref[j];
	      if (group.children[1].position.x > 59) {
	        group.children[1].position.x = 0;
	      }
	      results.push(group.children[1].position.x += 0.5);
	    }
	    return results;
	  };
	
	  LogoTypeView.prototype.warningShow = function() {
	    this.logoTypeGroup.visible = false;
	    this.warning.visible = true;
	    this.warningUpdate();
	  };
	
	  LogoTypeView.prototype.warningHide = function() {
	    var group, j, len, ref;
	    this.logoTypeGroup.visible = true;
	    this.warning.visible = false;
	    ref = this.warning.children;
	    for (j = 0, len = ref.length; j < len; j++) {
	      group = ref[j];
	      group.children[1].position.x = 0;
	    }
	  };
	
	  LogoTypeView.prototype.end = function() {
	    var j, len, path, ref;
	    ref = this.logoTypeGroup.children;
	    for (j = 0, len = ref.length; j < len; j++) {
	      path = ref[j];
	      path.matrix = new paper.Matrix();
	      path.rotate(0);
	      path.scaling.set(1, 1);
	      path.position = path.savePos;
	    }
	  };
	
	  LogoTypeView.prototype.explosion = function(width) {
	    var _angle, _p, _point, _scale, _x, _y, distance, j, len, length, path, position, rad, ref, scaling;
	    this.offsetPoint = new paper.Point(-5, -20);
	    distance = PaperStage.instance.width / width * 1.3;
	    ref = this.logoTypeGroup.children;
	    for (j = 0, len = ref.length; j < len; j++) {
	      path = ref[j];
	      _p = new paper.Point(path.position.x, path.position.y);
	      _point = _p.subtract(this.offsetPoint);
	      rad = _point.angleInRadians;
	      rad += (Math.random() * 0.5 - 0.25) * Math.PI;
	      length = _point.length;
	      _x = Math.cos(rad) * length * distance;
	      _y = Math.sin(rad) * length * distance;
	      _scale = Math.random() * .5 + .75;
	      _angle = Math.random() * 180 - 90;
	      position = path.position;
	      scaling = path.scaling;
	      path.rotate(_angle);
	      TweenMax.to(position, .6, {
	        y: _y,
	        ease: Expo.easeOut
	      });
	      TweenMax.to(position, .6, {
	        x: _x,
	        ease: Expo.easeOut
	      });
	      TweenMax.to(scaling, .6, {
	        x: _scale,
	        y: _scale,
	        ease: Expo.easeOut
	      });
	    }
	  };
	
	  return LogoTypeView;
	
	})(LogoType);
	
	module.exports = LogoTypeView;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var BaseView, BtnView, Config, Ghost, GhostView, LightsVeiw, LogoTypeView, SceneBase, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	SceneBase = __webpack_require__(22);
	
	BtnView = __webpack_require__(36);
	
	BaseView = __webpack_require__(37);
	
	GhostView = __webpack_require__(38);
	
	LogoTypeView = __webpack_require__(39);
	
	LightsVeiw = __webpack_require__(40);
	
	SoundManager = __webpack_require__(17);
	
	Ghost = (function(superClass) {
	  extend(Ghost, superClass);
	
	  function Ghost() {
	    this._onSwapping = bind(this._onSwapping, this);
	    this._onEnd = bind(this._onEnd, this);
	    return Ghost.__super__.constructor.apply(this, arguments);
	  }
	
	  Ghost.prototype._onInit = function() {
	    this.lightsVeiw = new LightsVeiw();
	    this.btn = new BtnView();
	    this.base = new BaseView();
	    this.logoType = new LogoTypeView();
	    this.ghost = new GhostView();
	    this.container.addChildren([this.lightsVeiw, this.btn, this.base, this.logoType, this.ghost]);
	  };
	
	  Ghost.prototype._onStart = function() {
	    this.container.position.x = 0;
	    this.lightsVeiw.start();
	    this.addChild(this.container);
	  };
	
	  Ghost.prototype._onEnd = function() {
	    this.removeChildren();
	    this.lightsVeiw.end();
	    this.ghost.end();
	  };
	
	  Ghost.prototype._onUpdate = function() {
	    if (this.mode === SceneBase.Mode.Touching || this.mode === SceneBase.Mode.Standby) {
	      this.btn.update();
	    }
	  };
	
	  Ghost.prototype._onStandby = function() {
	    this.btn.up();
	  };
	
	  Ghost.prototype._onEffect = function() {
	    this.btn.hide();
	    this.base.hide();
	    this.logoType.dashed();
	    this.lightsVeiw.off(500).then((function(_this) {
	      return function() {
	        return _this.ghost.eyeShow(300);
	      };
	    })(this)).then((function(_this) {
	      return function() {
	        return _this.ghost.allShow(300);
	      };
	    })(this)).then(this.ghost.floating).then((function(_this) {
	      return function() {
	        return Utils.wait(200);
	      };
	    })(this)).then(this.btn.show).then(this.base.show).then(this.logoType.solid).then((function(_this) {
	      return function() {
	        return _this.lightsVeiw.on(500);
	      };
	    })(this)).then(this.swap);
	  };
	
	  Ghost.prototype._onSwapping = function() {
	    this.end();
	  };
	
	  return Ghost;
	
	})(SceneBase);
	
	module.exports = Ghost;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var Btn, BtnView,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Btn = __webpack_require__(10);
	
	BtnView = (function(superClass) {
	  extend(BtnView, superClass);
	
	  function BtnView() {
	    this.show = bind(this.show, this);
	    return BtnView.__super__.constructor.apply(this, arguments);
	  }
	
	  BtnView.prototype.show = function() {
	    this.visible = true;
	  };
	
	  BtnView.prototype.hide = function() {
	    this.visible = false;
	  };
	
	  return BtnView;
	
	})(Btn);
	
	module.exports = BtnView;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var Base, BaseView,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Base = __webpack_require__(13);
	
	BaseView = (function(superClass) {
	  extend(BaseView, superClass);
	
	  function BaseView() {
	    this.show = bind(this.show, this);
	    return BaseView.__super__.constructor.apply(this, arguments);
	  }
	
	  BaseView.prototype.show = function() {
	    this.visible = true;
	  };
	
	  BaseView.prototype.hide = function() {
	    this.visible = false;
	  };
	
	  return BaseView;
	
	})(Base);
	
	module.exports = BaseView;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var Config, EYES, GhostView, LEFT_EYE, MorphablePath, PaperStage, RIGHT_EYE, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	PaperStage = __webpack_require__(16);
	
	MorphablePath = __webpack_require__(12);
	
	SoundManager = __webpack_require__(17);
	
	EYES = 3;
	
	LEFT_EYE = 2;
	
	RIGHT_EYE = 3;
	
	GhostView = (function(superClass) {
	  extend(GhostView, superClass);
	
	  function GhostView() {
	    this.bodyMorphingTween = bind(this.bodyMorphingTween, this);
	    this.floating = bind(this.floating, this);
	    var _body, body1, body2, body3, eye, i, j, k, len, len1, path, ref;
	    GhostView.__super__.constructor.call(this);
	    this.sceneConfig = Config.Ghost;
	    this.tweenArr = [];
	    Utils.transformInit(this);
	    this.body = new paper.Group();
	    this.body.opacity = 0;
	    this.body.visible = false;
	    this.addChild(this.body);
	    Utils.transformInit(this.body);
	    body1 = Utils.getSvgChild(this.sceneConfig.SVG.Ghost1, -1);
	    body2 = Utils.getSvgChild(this.sceneConfig.SVG.Ghost2, -1);
	    body3 = Utils.getSvgChild(this.sceneConfig.SVG.Ghost3, -1);
	    for (i = j = 0, len = body1.length; j < len; i = ++j) {
	      path = body1[i];
	      _body = new MorphablePath([path, body2[i], body3[i]]);
	      _body.strokeCap = 'round';
	      _body.strokeWidth = Config.LINE_WIDTH;
	      _body.strokeColor = this.sceneConfig.COLOR.STROKE;
	      _body.fillColor = this.sceneConfig.COLOR.FILL;
	      if (i === 3 || i === 4) {
	        _body.strokeWidth = 4;
	      }
	      if (i === 5 || i === 6) {
	        _body.strokeWidth = 5.6;
	      }
	      this.body.addChild(_body);
	    }
	    this.eye = this.importSVG(this.sceneConfig.SVG.Eye);
	    this.eye.opacity = 0;
	    this.eye.visible = false;
	    Utils.transformInit(this.eye);
	    ref = this.eye.children;
	    for (k = 0, len1 = ref.length; k < len1; k++) {
	      eye = ref[k];
	      Utils.transformInit(eye);
	      eye.basePos = eye.position;
	    }
	  }
	
	  GhostView.prototype.end = function() {
	    this.opacity = 1;
	    this.position.set(0, 0);
	    this.scaling.set(1, 1);
	    this.body.opacity = 0;
	    this.body.visible = false;
	    this.eye.visible = false;
	    this.eye.opacity = 0;
	    $.each(this.body.children, (function(_this) {
	      return function(i, _body) {
	        var ref;
	        if ((ref = _this.tweenArr[i]) != null) {
	          ref.kill();
	        }
	        _body.morph = 0;
	        return _body.update(_body.morph);
	      };
	    })(this));
	  };
	
	  GhostView.prototype.eyeShow = function(duration) {
	    var df, leftEye, rightEye, tlLeft, tlRgiht;
	    if (duration == null) {
	      duration = 0;
	    }
	    df = new $.Deferred();
	    this.eye.visible = true;
	    leftEye = this.eye.children[LEFT_EYE].position;
	    rightEye = this.eye.children[RIGHT_EYE].position;
	    tlRgiht = new TimelineMax();
	    tlLeft = new TimelineMax({
	      onComplete: df.resolve
	    });
	    duration = duration / 1000;
	    TweenMax.to(this.eye, duration, {
	      opacity: 1,
	      ease: Quint.easeInOut
	    });
	    tlLeft.to(leftEye, 0.2, {
	      x: leftEye.x + 8,
	      delay: duration,
	      ease: Quint.easeInOut
	    });
	    tlLeft.to(leftEye, 0.2, {
	      x: leftEye.x,
	      ease: Quint.easeInOut
	    });
	    tlRgiht.to(rightEye, 0.2, {
	      x: rightEye.x + 8,
	      delay: duration,
	      ease: Quint.easeInOut
	    });
	    tlRgiht.to(rightEye, 0.2, {
	      x: rightEye.x,
	      ease: Quint.easeInOut
	    });
	    return df.promise();
	  };
	
	  GhostView.prototype.allShow = function(duration) {
	    var df;
	    if (duration == null) {
	      duration = 0;
	    }
	    duration = duration / 1000;
	    df = new $.Deferred();
	    this.body.visible = true;
	    TweenMax.to(this.body, duration, {
	      opacity: 1,
	      ease: Quint.easeInOut,
	      onComplete: df.resolve
	    });
	    return df.promise();
	  };
	
	  GhostView.prototype.floating = function() {
	    var _se, df, position, tl;
	    df = new $.Deferred();
	    _se = Utils.getSE(this.sceneConfig.SOUND.SE2);
	    SoundManager.play(_se, 0, true);
	    position = this.position;
	    tl = new TimelineMax({
	      onComplete: function() {
	        df.resolve();
	        return SoundManager.stop(_se, 300);
	      }
	    });
	    tl.to(position, 1.25, {
	      x: -60,
	      y: -60,
	      ease: Sine.easeInOut,
	      onStart: this.bodyMorphingTween,
	      onComplete: (function(_this) {
	        return function() {
	          return _this.scaling.set(-1, 1);
	        };
	      })(this)
	    });
	    tl.to(position, 1.25, {
	      x: 60,
	      y: -120,
	      onStart: this.bodyMorphingTween,
	      ease: Sine.easeInOut
	    });
	    TweenMax.to(this, 1.0, {
	      opacity: 0,
	      delay: 1.5,
	      ease: Sine.easeIn
	    });
	    return df.promise();
	  };
	
	  GhostView.prototype.bodyMorphingTween = function() {
	    return $.each(this.body.children, (function(_this) {
	      return function(i, _body) {
	        var ref, tween;
	        if ((ref = _this.tweenArr[i]) != null) {
	          ref.kill();
	        }
	        _body.morph = 0;
	        _body.update(_body.morph);
	        tween = TweenMax.to(_body, 1.5, {
	          morph: 2,
	          onUpdate: _body.update,
	          ease: Sine.easeInOut
	        });
	        if (_this.tweenArr[i] != null) {
	          return _this.tweenArr[i] = tween;
	        } else {
	          return _this.tweenArr.push(tween);
	        }
	      };
	    })(this));
	  };
	
	  return GhostView;
	
	})(paper.Group);
	
	module.exports = GhostView;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var Config, LogoType, LogoTypeView, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	LogoType = __webpack_require__(15);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	LogoTypeView = (function(superClass) {
	  extend(LogoTypeView, superClass);
	
	  function LogoTypeView() {
	    this.solid = bind(this.solid, this);
	    return LogoTypeView.__super__.constructor.apply(this, arguments);
	  }
	
	  LogoTypeView.prototype._onInit = function() {
	    this.sceneConfig = Config.Ghost;
	    this.dashedLogo = this.importSVG(this.sceneConfig.SVG.Dashed);
	    this.dashedLogo.visible = false;
	  };
	
	  LogoTypeView.prototype.dashed = function() {
	    return this.dashedLogo.visible = true;
	  };
	
	  LogoTypeView.prototype.solid = function() {
	    this.dashedLogo.visible = false;
	  };
	
	  return LogoTypeView;
	
	})(LogoType);
	
	module.exports = LogoTypeView;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var Config, LightsVeiw, PaperStage, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	PaperStage = __webpack_require__(16);
	
	SoundManager = __webpack_require__(17);
	
	LightsVeiw = (function(superClass) {
	  extend(LightsVeiw, superClass);
	
	  function LightsVeiw() {
	    this.onResize = bind(this.onResize, this);
	    LightsVeiw.__super__.constructor.call(this);
	    this.sceneConfig = Config.Ghost;
	    this.$window = $(window);
	    this.opacity = 0;
	  }
	
	  LightsVeiw.prototype.start = function() {
	    this.$window.on('resize.LightsVeiw', this.onResize).trigger('resize.LightsVeiw');
	  };
	
	  LightsVeiw.prototype.end = function() {
	    this.removeChildren();
	    this.opacity = 0;
	    return this.$window.off('resize.LightsVeiw');
	  };
	
	  LightsVeiw.prototype.off = function(duration) {
	    var _d, _se, df;
	    if (duration == null) {
	      duration = 0;
	    }
	    df = new $.Deferred();
	    _se = Utils.getSE(this.sceneConfig.SOUND.SE1);
	    SoundManager.play(_se);
	    _d = duration / 1000;
	    TweenMax.to(this, _d, {
	      opacity: 1,
	      ease: Expo.easeOut,
	      onComplete: df.resolve
	    });
	    return df.promise();
	  };
	
	  LightsVeiw.prototype.on = function(duration) {
	    var _d, df;
	    if (duration == null) {
	      duration = 0;
	    }
	    df = new $.Deferred();
	    _d = duration / 1000;
	    TweenMax.to(this, _d, {
	      opacity: 0,
	      ease: Expo.easeOut,
	      onComplete: df.resolve
	    });
	    return df.promise();
	  };
	
	  LightsVeiw.prototype.onResize = function() {
	    var _point, _shape, _size;
	    this.removeChildren();
	    _size = new paper.Size(PaperStage.instance.width, PaperStage.instance.height);
	    _point = new paper.Point((_size.width / -2) - 8, _size.height / -2);
	    _shape = new paper.Shape.Rectangle(_point, _size);
	    _shape.fillColor = this.sceneConfig.COLOR.BG;
	    Utils.transformInit(_shape);
	    this.addChild(_shape);
	  };
	
	  return LightsVeiw;
	
	})(paper.Group);
	
	module.exports = LightsVeiw;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var Base, Btn, Config, Elevator, ElevatorView, LogoGroupView, LogoTypeView, SceneBase, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	SceneBase = __webpack_require__(22);
	
	Btn = __webpack_require__(10);
	
	Base = __webpack_require__(13);
	
	LogoGroupView = __webpack_require__(42);
	
	LogoTypeView = __webpack_require__(43);
	
	ElevatorView = __webpack_require__(44);
	
	SoundManager = __webpack_require__(17);
	
	Elevator = (function(superClass) {
	  extend(Elevator, superClass);
	
	  function Elevator() {
	    this._onSwapping = bind(this._onSwapping, this);
	    this._onEnd = bind(this._onEnd, this);
	    return Elevator.__super__.constructor.apply(this, arguments);
	  }
	
	  Elevator.prototype._onInit = function() {
	    this.sceneConfig = Config.Elevator;
	    this.btn = new Btn();
	    this.btn.soft = 0.2;
	    this.base = new Base();
	    this.logoGroup = new LogoGroupView(this.btn, this.base);
	    this.logoType = new LogoTypeView();
	    this.elevator = new ElevatorView();
	    this.container.addChildren([this.logoGroup, this.logoType, this.elevator]);
	  };
	
	  Elevator.prototype._onStart = function() {
	    this.container.position.x = 0;
	    this.addChild(this.container);
	    this.elevator.start();
	  };
	
	  Elevator.prototype._onEnd = function() {
	    this.removeChildren();
	    this.logoGroup.end();
	    this.elevator.end();
	  };
	
	  Elevator.prototype._onUpdate = function() {
	    if (this.mode === SceneBase.Mode.Touching || this.mode === SceneBase.Mode.Standby) {
	      this.btn.update();
	    }
	  };
	
	  Elevator.prototype._onStandby = function() {
	    this.btn.up();
	  };
	
	  Elevator.prototype._onEffect = function() {
	    var seList;
	    seList = Utils.getSElist(this.sceneConfig.SOUND);
	    this.elevator.seList = seList;
	    this.logoGroup.seList = seList;
	    this.logoType.hide();
	    this.elevator.show().then(this.elevator.close).then(function() {
	      return Utils.wait(300);
	    }).then(this.logoGroup.goDown).then(this.elevator.open).then(this.logoType.show).then(this.swap);
	  };
	
	  Elevator.prototype._onSwapping = function() {
	    this.end();
	  };
	
	  return Elevator;
	
	})(SceneBase);
	
	module.exports = Elevator;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var Config, LogoGroupView, PaperStage, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	PaperStage = __webpack_require__(16);
	
	SoundManager = __webpack_require__(17);
	
	LogoGroupView = (function(superClass) {
	  extend(LogoGroupView, superClass);
	
	  function LogoGroupView(btn, base) {
	    this.goDown = bind(this.goDown, this);
	    this.sceneConfig = Config.Elevator;
	    this.btn = btn;
	    this.base = base;
	    LogoGroupView.__super__.constructor.call(this, [btn, base]);
	    Utils.transformInit(this);
	  }
	
	  LogoGroupView.prototype.end = function() {
	    this.position.y = 0;
	  };
	
	  LogoGroupView.prototype.goDown = function() {
	    var _endY, _height, _se, _startY, df, position, tl;
	    df = $.Deferred();
	    _se = Utils.getSE(this.seList.SE2);
	    SoundManager.play(_se, 0, true);
	    _height = PaperStage.instance.height;
	    _height = PaperStage.instance.height;
	    _startY = -120;
	    _endY = 120;
	    position = this.position;
	    tl = new TimelineMax({
	      onComplete: (function(_this) {
	        return function() {
	          df.resolve();
	          return SoundManager.stop(_se);
	        };
	      })(this)
	    });
	    tl.to(position, .7, {
	      y: _endY,
	      ease: Cubic.easeIn,
	      onComplete: (function(_this) {
	        return function() {
	          return position.y = _startY;
	        };
	      })(this)
	    });
	    tl.to(position, .6, {
	      y: _endY,
	      repeat: 1,
	      onComplete: (function(_this) {
	        return function() {
	          return position.y = _startY;
	        };
	      })(this)
	    });
	    tl.to(position, .7, {
	      y: 0,
	      ease: Cubic.easeOut,
	      onStart: (function(_this) {
	        return function() {
	          return _this.btn.fill.fillColor = Config.COLOR.BTN_FILL;
	        };
	      })(this)
	    });
	    return df.promise();
	  };
	
	  return LogoGroupView;
	
	})(paper.Group);
	
	module.exports = LogoGroupView;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var LogoType, LogoTypeView,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	LogoType = __webpack_require__(15);
	
	LogoTypeView = (function(superClass) {
	  extend(LogoTypeView, superClass);
	
	  function LogoTypeView() {
	    this.show = bind(this.show, this);
	    return LogoTypeView.__super__.constructor.apply(this, arguments);
	  }
	
	  LogoTypeView.prototype.show = function() {
	    this.visible = true;
	  };
	
	  LogoTypeView.prototype.hide = function() {
	    this.visible = false;
	  };
	
	  return LogoTypeView;
	
	})(LogoType);
	
	module.exports = LogoTypeView;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var Config, ElevatorView, PaperStage, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	PaperStage = __webpack_require__(16);
	
	SoundManager = __webpack_require__(17);
	
	ElevatorView = (function(superClass) {
	  extend(ElevatorView, superClass);
	
	  function ElevatorView() {
	    this.onResize = bind(this.onResize, this);
	    this.close = bind(this.close, this);
	    this.open = bind(this.open, this);
	    ElevatorView.__super__.constructor.call(this);
	    this.sceneConfig = Config.Elevator;
	    this.$window = $(window);
	    this.openSVG = this.importSVG(this.sceneConfig.SVG.Open);
	    Utils.transformInit([this, this.openSVG]);
	    Utils.transformInit(this.openSVG.children);
	    this.rightDoor = this.openSVG.children[0];
	    this.leftDoor = this.openSVG.children[1];
	    this.upMask = new paper.Group();
	    this.downMask = new paper.Group();
	    Utils.transformInit([this.upMask, this.downMask]);
	    this.upMask.visible = false;
	    this.downMask.visible = false;
	    this.insertChildren(0, [this.upMask, this.downMask]);
	    this.baseWidth = this.bounds.width;
	    this.baseHeight = this.bounds.height;
	    this.moveDistance = 60;
	    this.visible = false;
	  }
	
	  ElevatorView.prototype.start = function() {
	    this.$window.on('resize.ElevatorView', this.onResize).trigger('resize.ElevatorView');
	  };
	
	  ElevatorView.prototype.end = function() {
	    this.$window.off('resize.ElevatorView');
	    this.visible = false;
	    this.upMask.removeChildren();
	    this.downMask.removeChildren();
	  };
	
	  ElevatorView.prototype.show = function() {
	    var df;
	    df = $.Deferred();
	    this.visible = true;
	    return df.resolve().promise();
	  };
	
	  ElevatorView.prototype.open = function() {
	    var _delay, _ldX, _rdX, _se, df;
	    df = $.Deferred();
	    _se = Utils.getSE(this.seList.SE3);
	    SoundManager.play(_se);
	    _rdX = this.rightDoor.position.x + this.moveDistance;
	    _ldX = this.leftDoor.position.x - this.moveDistance;
	    _delay = .5;
	    TweenMax.to(this.rightDoor.position, .4, {
	      x: _rdX,
	      delay: _delay,
	      ease: Cubic.easeOut,
	      onComplete: df.resolve
	    });
	    TweenMax.to(this.leftDoor.position, .4, {
	      x: _ldX,
	      ease: Cubic.easeOut,
	      delay: _delay
	    });
	    return df.promise();
	  };
	
	  ElevatorView.prototype.close = function() {
	    var _ldX, _rdX, _se, df;
	    df = $.Deferred();
	    _se = Utils.getSE(this.seList.SE1);
	    SoundManager.play(_se);
	    _rdX = this.rightDoor.position.x - this.moveDistance;
	    _ldX = this.leftDoor.position.x + this.moveDistance;
	    TweenMax.to(this.rightDoor.position, .3, {
	      x: _rdX,
	      ease: Cubic.easeOut,
	      onComplete: df.resolve
	    });
	    TweenMax.to(this.leftDoor.position, .3, {
	      x: _ldX,
	      ease: Cubic.easeOut
	    });
	    return df.promise();
	  };
	
	  ElevatorView.prototype.onResize = function() {
	    var _h, _height, _point, _shape, _size, _y;
	    this.upMask.removeChildren();
	    this.downMask.removeChildren();
	    _height = PaperStage.instance.height;
	    this.upMask.visible = true;
	    _h = (_height / 2) + this.bounds.y;
	    _y = this.bounds.y - _h;
	    _size = new paper.Size(this.bounds.width, _h);
	    _point = new paper.Point(this.bounds.x, _y);
	    _shape = new paper.Shape.Rectangle(_point, _size);
	    _shape.fillColor = "#FFFFFF";
	    Utils.transformInit(_shape);
	    this.upMask.addChild(_shape);
	    this.downMask.visible = true;
	    _y = this.bounds.height + this.bounds.y;
	    _h = (_height / 2) - _y;
	    _size = new paper.Size(this.bounds.width, _h);
	    _point = new paper.Point(this.bounds.x, _y);
	    _shape = new paper.Shape.Rectangle(_point, _size);
	    _shape.fillColor = "#FFFFFF";
	    Utils.transformInit(_shape);
	    this.downMask.addChild(_shape);
	  };
	
	  return ElevatorView;
	
	})(paper.Group);
	
	module.exports = ElevatorView;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var BaseView, BtnView, CENTER, Config, Escape, LEFT, LogoGroupView, LogoTypeView, RIGHT, SE_LIST, SceneBase, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	SceneBase = __webpack_require__(22);
	
	BtnView = __webpack_require__(46);
	
	BaseView = __webpack_require__(47);
	
	LogoTypeView = __webpack_require__(48);
	
	LogoGroupView = __webpack_require__(49);
	
	SoundManager = __webpack_require__(17);
	
	CENTER = 'center';
	
	LEFT = 'left';
	
	RIGHT = 'right';
	
	SE_LIST = ["escape-se2", "escape-se3", "escape-se4", "escape-se5_1", "escape-se5_2"];
	
	Escape = (function(superClass) {
	  extend(Escape, superClass);
	
	  function Escape() {
	    this._onSwapping = bind(this._onSwapping, this);
	    this._onEnd = bind(this._onEnd, this);
	    return Escape.__super__.constructor.apply(this, arguments);
	  }
	
	  Escape.prototype._onInit = function() {
	    var base, baseLeft, baseRight, btn, btnLeft, btnRight;
	    this.sceneConfig = Config.Escape;
	    btn = Utils.getSvgChild(Config.SVG.BASE, 0);
	    btnLeft = Utils.getSvgChild(this.sceneConfig.SVG.Left, 0);
	    btnRight = Utils.getSvgChild(this.sceneConfig.SVG.Right, 0);
	    base = Utils.getSvgChild(Config.SVG.BASE, 1);
	    baseLeft = Utils.getSvgChild(this.sceneConfig.SVG.Left, 1);
	    baseRight = Utils.getSvgChild(this.sceneConfig.SVG.Right, 1);
	    this.btn = new BtnView([btnLeft, btn, btnRight], 1);
	    this.base = new BaseView([baseLeft, base, baseRight], 1);
	    this.logoGroup = new LogoGroupView(this.btn, this.base);
	    this.logoType = new LogoTypeView();
	    this.container.addChildren([this.logoGroup, this.logoType]);
	    this.escapePosition = CENTER;
	  };
	
	  Escape.prototype._onStart = function() {
	    this.seList = Utils.getSElist(this.sceneConfig.SOUND);
	    this.container.position.x = 0;
	    this.addChild(this.container);
	  };
	
	  Escape.prototype._onEnd = function() {
	    this.escapePosition = CENTER;
	    this.removeChildren();
	    this.logoGroup.end();
	    this.logoType.end();
	    this.btn.end();
	    this.base.end();
	  };
	
	  Escape.prototype._onTouchUp = function() {
	    return this.movObject();
	  };
	
	  Escape.prototype._onTouchDown = function() {
	    this.movObject();
	  };
	
	  Escape.prototype._onTouchMove = function() {
	    this.movObject();
	  };
	
	  Escape.prototype._onUpdate = function() {
	    var base1, base2, base3, base4, base5, base6, morph, p, x;
	    if (this.mode === SceneBase.Mode.Touching) {
	      p = this.press / 2;
	      if (p < 0) {
	        p = 0;
	      } else if (p > 1) {
	        p = 1;
	      }
	      p = TWEEN.Easing.Expo.InOut(p);
	      x = Math.sin(new Date().getTime() * 0.08) * 0.5 * p;
	      if (this.escapePosition === LEFT) {
	        x -= this.paper.width * 0.025 * p;
	        morph = 0.25 - (p * 0.25);
	      } else if (this.escapePosition === RIGHT) {
	        x += this.paper.width * 0.025 * p;
	        morph = 1.75 + (p * 0.25);
	      }
	      this.container.position.x = x;
	      if (typeof (base1 = this.btn).morphingUpdate === "function") {
	        base1.morphingUpdate(morph);
	      }
	      if (typeof (base2 = this.base).morphingUpdate === "function") {
	        base2.morphingUpdate(morph);
	      }
	    } else if (this.mode === SceneBase.Mode.Standby) {
	      if (typeof (base3 = this.btn).morphingUpdate === "function") {
	        base3.morphingUpdate(1);
	      }
	      if (typeof (base4 = this.base).morphingUpdate === "function") {
	        base4.morphingUpdate(1);
	      }
	    } else {
	      if (typeof (base5 = this.btn).morphingUpdate === "function") {
	        base5.morphingUpdate();
	      }
	      if (typeof (base6 = this.base).morphingUpdate === "function") {
	        base6.morphingUpdate();
	      }
	    }
	  };
	
	  Escape.prototype.movObject = function() {
	    var _se, pos, toX;
	    if (this.mode === SceneBase.Mode.Standby && this.press < 1) {
	      pos = CENTER;
	    } else {
	      if (this.escapePosition === CENTER) {
	        pos = this.point.x > this.paper.width * this.paper.scale * 0.5 ? LEFT : RIGHT;
	      } else {
	        if (this.point.x > this.paper.width * this.paper.scale * 0.6) {
	          pos = LEFT;
	        } else if (this.point.x < this.paper.width * this.paper.scale * 0.4) {
	          pos = RIGHT;
	        } else {
	          pos = this.escapePosition;
	        }
	      }
	    }
	    if (pos === this.escapePosition) {
	      return;
	    }
	    this.escapePosition = pos;
	    if (this.escapePosition === LEFT) {
	      toX = this.paper.width * -0.45;
	    } else if (this.escapePosition === RIGHT) {
	      toX = this.paper.width * 0.45;
	    } else {
	      toX = 0;
	    }
	    if (this.escapePosition === CENTER) {
	      _se = Utils.getSE(this.seList.SE2);
	      SoundManager.play(_se);
	    } else {
	      _se = Utils.getSE(this.seList.SE1);
	      SoundManager.play(_se);
	    }
	    this.logoGroup.move(toX);
	    this.logoType.move(toX);
	  };
	
	  Escape.prototype._onEffect = function() {
	    this.swap();
	  };
	
	  Escape.prototype._onSwapping = function() {
	    var _toX;
	    if (this.escapePosition === LEFT) {
	      _toX = this.paper.width * 1.5;
	      this.nextContainer.position.x = -this.paper.width;
	    } else {
	      _toX = this.paper.width * -1.5;
	      this.nextContainer.position.x = this.paper.width;
	    }
	    setTimeout((function(_this) {
	      return function() {
	        var _se;
	        _se = Utils.getSE(_this.seList.SE3);
	        return SoundManager.play(_se);
	      };
	    })(this), 350);
	    TweenMax.to(this.container.position, .4, {
	      x: _toX,
	      ease: Back.easeIn
	    });
	    this.btn.swap();
	    this.base.swap();
	    this.addChild(this.nextContainer);
	    TweenMax.to(this.nextContainer.position, .6, {
	      x: 0,
	      delay: .6,
	      ease: Expo.easeInOut,
	      onComplete: this.end
	    });
	  };
	
	  return Escape;
	
	})(SceneBase);
	
	module.exports = Escape;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var Btn, BtnView, CENTER, Config, LEFT, RIGHT,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Btn = __webpack_require__(10);
	
	CENTER = 'center';
	
	LEFT = 'left';
	
	RIGHT = 'right';
	
	BtnView = (function(superClass) {
	  extend(BtnView, superClass);
	
	  function BtnView() {
	    this.morphingUpdate = bind(this.morphingUpdate, this);
	    return BtnView.__super__.constructor.apply(this, arguments);
	  }
	
	  BtnView.prototype.end = function() {
	    this.reset(1);
	  };
	
	  BtnView.prototype.swap = function() {
	    TweenMax.to(this, .1, {
	      morph: 1,
	      ease: Expo.easeIn,
	      delay: .23
	    });
	    TweenMax.to(this.position, .1, {
	      y: 10,
	      ease: Expo.easeIn,
	      delay: .15
	    });
	  };
	
	  BtnView.prototype.morphingUpdate = function(morph) {
	    if (morph == null) {
	      morph = this.morph;
	    }
	    this.morph = morph;
	    if (this._morph === this.morph) {
	      return;
	    }
	    this.stroke.update(this.morph);
	    this.fill.update(this.morph);
	    this._morph = this.morph;
	  };
	
	  return BtnView;
	
	})(Btn);
	
	module.exports = BtnView;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var Base, BaseView, CENTER, Config, LEFT, RIGHT,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Base = __webpack_require__(13);
	
	CENTER = 'center';
	
	LEFT = 'left';
	
	RIGHT = 'right';
	
	BaseView = (function(superClass) {
	  extend(BaseView, superClass);
	
	  function BaseView() {
	    this.morphingUpdate = bind(this.morphingUpdate, this);
	    return BaseView.__super__.constructor.apply(this, arguments);
	  }
	
	  BaseView.prototype.end = function() {
	    this.reset(1);
	  };
	
	  BaseView.prototype.swap = function() {
	    TweenMax.to(this, .1, {
	      morph: 1,
	      ease: Expo.easeIn,
	      delay: .23
	    });
	  };
	
	  BaseView.prototype.morphingUpdate = function(morph) {
	    if (morph == null) {
	      morph = this.morph;
	    }
	    this.morph = morph;
	    if (this._morph === this.morph) {
	      return;
	    }
	    this.boneStroke.update(this.morph);
	    this.stroke.update();
	    this.fill.update(this.morph);
	    this._morph = this.morph;
	  };
	
	  return BaseView;
	
	})(Base);
	
	module.exports = BaseView;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var LogoType, LogoTypeView,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	LogoType = __webpack_require__(15);
	
	LogoTypeView = (function(superClass) {
	  extend(LogoTypeView, superClass);
	
	  function LogoTypeView() {
	    return LogoTypeView.__super__.constructor.apply(this, arguments);
	  }
	
	  LogoTypeView.prototype.end = function() {
	    this.position = new paper.Point(0, 0);
	  };
	
	  LogoTypeView.prototype.move = function(toX) {
	    if (this.moveTween != null) {
	      this.moveTween.kill();
	    }
	    this.moveTween = TweenMax.to(this.position, .275, {
	      x: toX,
	      ease: Cubic.easeOut
	    });
	  };
	
	  return LogoTypeView;
	
	})(LogoType);
	
	module.exports = LogoTypeView;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var LogoGroupView, Utils,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Utils = __webpack_require__(2);
	
	LogoGroupView = (function(superClass) {
	  extend(LogoGroupView, superClass);
	
	  function LogoGroupView(btn, base) {
	    this.btn = btn;
	    this.base = base;
	    LogoGroupView.__super__.constructor.call(this, [btn, base]);
	    Utils.transformInit(this);
	  }
	
	  LogoGroupView.prototype.move = function(toX) {
	    if (this.moveTween != null) {
	      this.moveTween.kill();
	    }
	    this.moveTween = TweenMax.to(this.position, .25, {
	      x: toX,
	      ease: Expo.easeOut
	    });
	  };
	
	  LogoGroupView.prototype.end = function() {
	    this.position = new paper.Point(0, 0);
	  };
	
	  return LogoGroupView;
	
	})(paper.Group);
	
	module.exports = LogoGroupView;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var Base, Btn, CardboardBoxView, Config, Delivery, LogoType, SceneBase, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	SceneBase = __webpack_require__(22);
	
	Btn = __webpack_require__(10);
	
	Base = __webpack_require__(13);
	
	LogoType = __webpack_require__(15);
	
	CardboardBoxView = __webpack_require__(51);
	
	SoundManager = __webpack_require__(17);
	
	Delivery = (function(superClass) {
	  extend(Delivery, superClass);
	
	  function Delivery() {
	    this._onSwapping = bind(this._onSwapping, this);
	    this._onEnd = bind(this._onEnd, this);
	    return Delivery.__super__.constructor.apply(this, arguments);
	  }
	
	  Delivery.prototype._onInit = function() {
	    this.sceneConfig = Config.Delivery;
	    this.btn = new Btn();
	    this.base = new Base();
	    this.logoType = new LogoType();
	    this.cardboardBox = new CardboardBoxView();
	    this.container.addChildren([this.btn, this.base, this.logoType, this.cardboardBox]);
	  };
	
	  Delivery.prototype._onStart = function() {
	    this.container.position.x = 0;
	    this.btn.position.y = 0;
	    this.base.position.y = 0;
	    this.cardboardBox.start();
	    this.addChild(this.container);
	  };
	
	  Delivery.prototype._onEnd = function() {
	    this.cardboardBox.end();
	    this.removeChildren();
	  };
	
	  Delivery.prototype._onUpdate = function() {
	    if (this.mode === SceneBase.Mode.Touching || this.mode === SceneBase.Mode.Standby) {
	      this.btn.update();
	    }
	  };
	
	  Delivery.prototype._onStandby = function() {
	    this.btn.up();
	  };
	
	  Delivery.prototype._onEffect = function() {
	    var _se;
	    _se = Utils.getSE(this.sceneConfig.SOUND.SE1);
	    SoundManager.play(_se);
	    Utils.wait(350).then((function(_this) {
	      return function() {
	        TweenMax.to(_this.btn.position, .3, {
	          y: _this.paper.height * 0.7,
	          ease: Cubic.easeOut,
	          delay: .55
	        });
	        return TweenMax.to(_this.base.position, .3, {
	          y: _this.paper.height * 0.7,
	          ease: Cubic.easeOut,
	          delay: .55
	        });
	      };
	    })(this)).then(this.cardboardBox.effect).then(this.swap);
	  };
	
	  Delivery.prototype._onSwapping = function() {
	    this.end();
	  };
	
	  return Delivery;
	
	})(SceneBase);
	
	module.exports = Delivery;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var CardboardBoxView, Config, MorphablePath, PaperStage, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	MorphablePath = __webpack_require__(12);
	
	PaperStage = __webpack_require__(16);
	
	SoundManager = __webpack_require__(17);
	
	CardboardBoxView = (function(superClass) {
	  extend(CardboardBoxView, superClass);
	
	  function CardboardBoxView() {
	    this.onResize = bind(this.onResize, this);
	    this.effect = bind(this.effect, this);
	    var _path, box1_1, box2_1, box2_2, box2_3, box3_1, box3_2, box4_1, box4_2, i, j, k, l, len, len1, len2, len3, m, path;
	    CardboardBoxView.__super__.constructor.call(this);
	    this.sceneConfig = Config.Delivery;
	    this.visible = false;
	    Utils.transformInit(this);
	    this.box1 = new paper.Group();
	    this.box2 = new paper.Group();
	    this.box3 = new paper.Group();
	    this.box4 = new paper.Group();
	    Utils.transformInit([this.box1, this.box2, this.box3, this.box4]);
	    this.addChildren([this.box1, this.box2, this.box3, this.box4]);
	    box1_1 = Utils.getSvgChild(this.sceneConfig.SVG.Box1_1, -1);
	    box2_1 = Utils.getSvgChild(this.sceneConfig.SVG.Box2_1, -1);
	    box2_2 = Utils.getSvgChild(this.sceneConfig.SVG.Box2_2, -1);
	    box2_3 = Utils.getSvgChild(this.sceneConfig.SVG.Box2_3, -1);
	    box3_1 = Utils.getSvgChild(this.sceneConfig.SVG.Box3_1, -1);
	    box3_2 = Utils.getSvgChild(this.sceneConfig.SVG.Box3_2, -1);
	    box4_1 = Utils.getSvgChild(this.sceneConfig.SVG.Box4_1, -1);
	    box4_2 = Utils.getSvgChild(this.sceneConfig.SVG.Box4_2, -1);
	    for (i = j = 0, len = box1_1.length; j < len; i = ++j) {
	      path = box1_1[i];
	      Utils.transformInit(path);
	      path.strokeWidth = Config.LINE_WIDTH;
	      path.strokeColor = this.sceneConfig.COLOR.BOX_PATH;
	      path.fillColor = this.sceneConfig.COLOR.BOX_FILL;
	      if (i > 2) {
	        path.fillColor = this.sceneConfig.COLOR.TAPE_FILL;
	      }
	    }
	    this.box1.addChildren(box1_1);
	    for (i = k = 0, len1 = box2_1.length; k < len1; i = ++k) {
	      path = box2_1[i];
	      _path = new MorphablePath([path, box2_2[i], box2_3[i]]);
	      _path.strokeWidth = Config.LINE_WIDTH;
	      _path.strokeColor = this.sceneConfig.COLOR.BOX_PATH;
	      _path.fillColor = this.sceneConfig.COLOR.BOX_FILL;
	      if (i > 4) {
	        _path.fillColor = this.sceneConfig.COLOR.TAPE_FILL;
	      }
	      _path.visible = false;
	      this.box2.addChild(_path);
	    }
	    for (i = l = 0, len2 = box3_1.length; l < len2; i = ++l) {
	      path = box3_1[i];
	      _path = new MorphablePath([path, box3_2[i]]);
	      _path.strokeWidth = Config.LINE_WIDTH;
	      _path.strokeColor = this.sceneConfig.COLOR.BOX_PATH;
	      _path.fillColor = this.sceneConfig.COLOR.BOX_FILL;
	      _path.fillColor = this.sceneConfig.COLOR.BOX_FILL;
	      if (i === 4 || i === 5) {
	        _path.fillColor = this.sceneConfig.COLOR.TAPE_FILL;
	      }
	      _path.visible = false;
	      this.box3.addChild(_path);
	    }
	    for (i = m = 0, len3 = box4_1.length; m < len3; i = ++m) {
	      path = box4_1[i];
	      _path = new MorphablePath([path, box4_2[i]], 0);
	      _path.strokeWidth = Config.LINE_WIDTH;
	      _path.strokeColor = this.sceneConfig.COLOR.BOX_PATH;
	      _path.fillColor = this.sceneConfig.COLOR.BOX_FILL;
	      if (i === 5 || i === 6) {
	        _path.fillColor = this.sceneConfig.COLOR.TAPE_FILL;
	      } else if (i === 1) {
	        _path.fillColor = Config.COLOR.BTN_FILL;
	      } else if (i === 2 || i === 3) {
	        _path.fillColor = Config.COLOR.BASE_FILL;
	      }
	      _path.visible = false;
	      this.box4.addChild(_path);
	    }
	  }
	
	  CardboardBoxView.prototype.start = function() {
	    $(window).on('resize.Delivery', this.onResize);
	    this.isEffected = false;
	    this.position.y -= PaperStage.instance.height * 0.6;
	    this.visible = true;
	  };
	
	  CardboardBoxView.prototype.end = function() {
	    var j, k, l, len, len1, len2, path, ref, ref1, ref2;
	    $(window).off('resize.Delivery');
	    this.visible = false;
	    this.opacity = 1;
	    this.box1.visible = true;
	    ref = this.box2.children;
	    for (j = 0, len = ref.length; j < len; j++) {
	      path = ref[j];
	      path.update(0);
	      path.visible = false;
	    }
	    ref1 = this.box3.children;
	    for (k = 0, len1 = ref1.length; k < len1; k++) {
	      path = ref1[k];
	      path.update(0);
	      path.visible = false;
	    }
	    ref2 = this.box4.children;
	    for (l = 0, len2 = ref2.length; l < len2; l++) {
	      path = ref2[l];
	      path.update(0);
	      path.visible = false;
	    }
	  };
	
	  CardboardBoxView.prototype.effect = function() {
	    var delay, df, tl;
	    df = new $.Deferred();
	    tl = new TimelineMax();
	    this.isEffected = true;
	    tl.to(this.position, .45, {
	      y: 0,
	      delay: .1,
	      ease: Expo.easeIn,
	      onComplete: (function(_this) {
	        return function() {
	          var _se;
	          _se = Utils.getSE(_this.sceneConfig.SOUND.SE2);
	          return SoundManager.play(_se);
	        };
	      })(this)
	    });
	    delay = 1.0;
	    this.box1.visible = true;
	    this.box2.visible = true;
	    this.box3.visible = true;
	    this.box4.visible = true;
	    $.each(this.box2.children, (function(_this) {
	      return function(i, path) {
	        path.visible = false;
	        return TweenMax.to(path, .25, {
	          morph: 2,
	          onUpdate: path.update,
	          ease: Expo.easeInOut,
	          delay: delay,
	          onStart: function() {
	            if (_this.box1.visible) {
	              _this.box1.visible = false;
	            }
	            return path.visible = true;
	          }
	        });
	      };
	    })(this));
	    $.each(this.box3.children, (function(_this) {
	      return function(i, path) {
	        path.visible = false;
	        return TweenMax.to(path, .25, {
	          morph: 1,
	          onUpdate: path.update,
	          ease: Expo.easeInOut,
	          delay: delay + .2,
	          onStart: function() {
	            if (_this.box2.visible) {
	              _this.box2.visible = false;
	            }
	            return path.visible = true;
	          }
	        });
	      };
	    })(this));
	    $.each(this.box4.children, (function(_this) {
	      return function(i, path) {
	        path.visible = false;
	        return TweenMax.to(path, .25, {
	          morph: 1,
	          onUpdate: path.update,
	          ease: Expo.easeIn,
	          delay: delay + .45,
	          onStart: function() {
	            if (_this.box3.visible) {
	              _this.box3.visible = false;
	            }
	            return path.visible = true;
	          }
	        });
	      };
	    })(this));
	    tl.to(this, 0, {
	      opacity: 0,
	      delay: delay + .3,
	      onComplete: df.resolve
	    });
	    return df.promise();
	  };
	
	  CardboardBoxView.prototype.onResize = function() {
	    if (this.isEffected) {
	      return;
	    }
	    this.position.y -= PaperStage.instance.height * 0.6;
	  };
	
	  return CardboardBoxView;
	
	})(paper.Group);
	
	module.exports = CardboardBoxView;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var Base, BaseView, BtnView, Config, LogoTypeView, SceneBase, SoundManager, Ufo, UfoView, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	SceneBase = __webpack_require__(22);
	
	BtnView = __webpack_require__(53);
	
	BaseView = __webpack_require__(54);
	
	Base = __webpack_require__(13);
	
	UfoView = __webpack_require__(55);
	
	LogoTypeView = __webpack_require__(56);
	
	SoundManager = __webpack_require__(17);
	
	Ufo = (function(superClass) {
	  extend(Ufo, superClass);
	
	  function Ufo() {
	    this._onSwapping = bind(this._onSwapping, this);
	    this._onEnd = bind(this._onEnd, this);
	    return Ufo.__super__.constructor.apply(this, arguments);
	  }
	
	  Ufo.prototype._onInit = function() {
	    var btn, btnPress, btnPull, btnUfo;
	    this.sceneConfig = Config.Ufo;
	    btnPull = Utils.getSvgChild(Config.SVG.PULL);
	    btn = Utils.getSvgChild(Config.SVG.BASE, 0);
	    btnPress = Utils.getSvgChild(Config.SVG.PRESS);
	    btnUfo = Utils.getSvgChild(this.sceneConfig.SVG.Btn, 0);
	    this.btn = new BtnView([btnPull, btn, btnPress, btnUfo]);
	    this.parts = new BaseView();
	    this.baseBg = new Base();
	    this.ufo = new UfoView(this.btn, this.parts, this.baseBg);
	    this.logoType = new LogoTypeView();
	    this.container.addChildren([this.logoType, this.ufo]);
	    this.nextContainer.removeChildren(2);
	  };
	
	  Ufo.prototype._onStart = function() {
	    this.container.position.x = 0;
	    this.addChild(this.container);
	  };
	
	  Ufo.prototype._onEnd = function() {
	    this.removeChildren();
	    this.logoType.end();
	    this.btn.end();
	    this.parts.end();
	    this.ufo.end();
	  };
	
	  Ufo.prototype._onUpdate = function() {
	    if (this.mode === SceneBase.Mode.Touching || this.mode === SceneBase.Mode.Standby) {
	      this.btn.update();
	    } else if (this.mode === SceneBase.Mode.Effect) {
	      this.btn.morphingUpdate();
	    }
	  };
	
	  Ufo.prototype._onTouchUp = function() {
	    var ref;
	    if (this.mode === SceneBase.Mode.Standby) {
	      return (ref = this.btn) != null ? ref.up() : void 0;
	    }
	  };
	
	  Ufo.prototype._onStandby = function() {
	    this.btn.up();
	  };
	
	  Ufo.prototype._onEffect = function() {
	    this.ufo.baseBgHide();
	    this.btn.change().then(this.parts.change).then(this.ufo.change).then(this.logoType.fly).then(this.ufo.fly).then(this.logoType.suck).then(this.ufo.float).then(Utils.wait(200)).then(this.logoType.fall).then((function(_this) {
	      return function() {
	        var position;
	        _this.nextContainer.position.y = -(_this.paper.height / 2);
	        _this.addChild(_this.nextContainer);
	        position = _this.nextContainer.position;
	        return TweenMax.to(position, .35, {
	          y: 0,
	          ease: Bounce.easeOut,
	          onComplete: _this.swap
	        });
	      };
	    })(this));
	  };
	
	  Ufo.prototype._onSwapping = function() {
	    this.end();
	  };
	
	  return Ufo;
	
	})(SceneBase);
	
	module.exports = Ufo;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var Btn, BtnView, Config, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	Btn = __webpack_require__(10);
	
	SoundManager = __webpack_require__(17);
	
	BtnView = (function(superClass) {
	  extend(BtnView, superClass);
	
	  function BtnView() {
	    this.morphingUpdate = bind(this.morphingUpdate, this);
	    return BtnView.__super__.constructor.apply(this, arguments);
	  }
	
	  BtnView.prototype.end = function() {
	    this.reset();
	  };
	
	  BtnView.prototype.change = function() {
	    var _se, df, position;
	    df = $.Deferred();
	    this.sceneConfig = Config.Ufo;
	    _se = Utils.getSE(this.sceneConfig.SOUND.SE1);
	    SoundManager.play(_se);
	    position = this.position;
	    TweenMax.to(this, .25, {
	      morph: 3,
	      ease: Expo.easeOut
	    });
	    TweenMax.to(position, .25, {
	      y: 0,
	      ease: Expo.easeOut
	    });
	    return df.resolve().promise();
	  };
	
	  BtnView.prototype.morphingUpdate = function() {
	    if (this._morph === this.morph) {
	      return;
	    }
	    this.stroke.update(this.morph);
	    this.fill.update(this.morph);
	    this._morph = this.morph;
	  };
	
	  return BtnView;
	
	})(Btn);
	
	module.exports = BtnView;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var BaseView, Config, MorphablePath, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	MorphablePath = __webpack_require__(12);
	
	BaseView = (function(superClass) {
	  extend(BaseView, superClass);
	
	  function BaseView() {
	    this.change = bind(this.change, this);
	    var base, baseUfo;
	    BaseView.__super__.constructor.call(this);
	    this.sceneConfig = Config.Ufo;
	    Utils.transformInit(this);
	    base = Utils.getSvgChild(this.sceneConfig.SVG.Base1);
	    baseUfo = Utils.getSvgChild(this.sceneConfig.SVG.Base2);
	    this.base = new MorphablePath([base, baseUfo]);
	    this.base.strokeWidth = Config.LINE_WIDTH;
	    this.base.strokeColor = Config.COLOR.BASE_PATH;
	    this.base.fillColor = Config.COLOR.BASE_FILL;
	    this.addChild(this.base);
	    this.base.visible = false;
	  }
	
	  BaseView.prototype.end = function() {
	    this.base.morph = 0;
	    this.base.update(this.base.morph);
	    this.base.closed = false;
	    this.base.visible = false;
	  };
	
	  BaseView.prototype.change = function() {
	    this.base.visible = true;
	    this.base.closed = true;
	    TweenMax.to(this.base, .25, {
	      morph: 1,
	      ease: Expo.easeOut,
	      onUpdate: this.base.update
	    });
	  };
	
	  return BaseView;
	
	})(paper.Group);
	
	module.exports = BaseView;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var Config, SoundManager, UfoView, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	SoundManager = __webpack_require__(17);
	
	UfoView = (function(superClass) {
	  extend(UfoView, superClass);
	
	  function UfoView(btn, parts, baseBg) {
	    this.float = bind(this.float, this);
	    this.fly = bind(this.fly, this);
	    this.change = bind(this.change, this);
	    var _line, child, j, k, len, len1, path, ref, ref1;
	    this.sceneConfig = Config.Ufo;
	    this.btn = btn;
	    this.parts = parts;
	    this.baseBg = baseBg;
	    UfoView.__super__.constructor.call(this, [btn, baseBg, parts]);
	    Utils.transformInit(this);
	    this.circles = new paper.Group();
	    Utils.transformInit(this.circles);
	    parts = Utils.getSvgChild(this.sceneConfig.SVG.Circle, -1);
	    this.circles.addChildren(parts);
	    ref = this.circles.children;
	    for (j = 0, len = ref.length; j < len; j++) {
	      path = ref[j];
	      Utils.transformInit(path);
	    }
	    this.partsInit();
	    _line = Utils.getSvgChild(this.sceneConfig.SVG.Line, -1);
	    this.line = new paper.Group(_line);
	    Utils.transformInit(this.line);
	    ref1 = this.line.children;
	    for (k = 0, len1 = ref1.length; k < len1; k++) {
	      child = ref1[k];
	      Utils.transformInit(child);
	    }
	    this.lineInit();
	    this.insertChild(0, this.circles);
	    this.addChild(this.line);
	  }
	
	  UfoView.prototype.partsInit = function() {
	    var i, j, len, path, ref;
	    ref = this.circles.children;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      path = ref[i];
	      path.strokeWidth = 0;
	      path.fillColor = Config.COLOR.BTN_FILL;
	      path.strokeWidth = Config.LINE_WIDTH;
	      path.strokeColor = Config.COLOR.BTN_PATH;
	      path.visible = false;
	    }
	  };
	
	  UfoView.prototype.lineInit = function() {
	    var _length, child, i, j, len, ref;
	    ref = this.line.children;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      child = ref[i];
	      child.strokeWidth = Config.LINE_WIDTH;
	      child.strokeColor = Config.COLOR.BTN_PATH;
	      _length = child.length;
	      child.dashArray = [_length, _length];
	      child.dashOffset = _length;
	    }
	  };
	
	  UfoView.prototype.end = function() {
	    this.matrix = new paper.Matrix();
	    this.scaling.set(1, 1);
	    this.position = new paper.Point(0, 0);
	    this.partsInit();
	    this.lineInit();
	    this.baseBg.visible = true;
	  };
	
	  UfoView.prototype.baseBgHide = function() {
	    this.baseBg.visible = false;
	  };
	
	  UfoView.prototype.change = function() {
	    $.each(this.circles.children, function() {
	      var path;
	      path = this;
	      path.position.y = -20;
	      return TweenMax.to(path.position, .25, {
	        y: 0,
	        delay: .2,
	        onStart: (function(_this) {
	          return function() {
	            return path.visible = true;
	          };
	        })(this)
	      });
	    });
	  };
	
	  UfoView.prototype.fly = function() {
	    var df, j, len, path, position, ref;
	    df = new $.Deferred();
	    position = this.position;
	    this.flyPosition = -25;
	    TweenMax.to(position, .75, {
	      y: this.flyPosition,
	      ease: Cubic.easeOut,
	      onComplete: df.resolve
	    });
	    ref = this.line.children;
	    for (j = 0, len = ref.length; j < len; j++) {
	      path = ref[j];
	      TweenMax.to(path, .4, {
	        dashOffset: path.length * 0.5,
	        repeat: -1,
	        yoyo: true,
	        ease: Sine.easeOut,
	        delay: .8
	      });
	    }
	    return df.promise();
	  };
	
	  UfoView.prototype.float = function() {
	    var df, i, j, len, path, position, ref, scaling, tl;
	    df = new $.Deferred();
	    position = this.position;
	    scaling = this.scaling;
	    tl = new TimelineMax();
	    tl.to(position, 0.6, {
	      y: this.flyPosition + 5,
	      ease: Linear.easeNone
	    }).to(position, 0.6, {
	      y: this.flyPosition - 5,
	      ease: Linear.easeNone
	    }).to(position, 0.6, {
	      y: this.flyPosition + 5,
	      ease: Linear.easeNone
	    }).to(position, 0.6, {
	      y: this.flyPosition - 5,
	      ease: Linear.easeNone,
	      onComplete: (function(_this) {
	        return function() {
	          var _se;
	          _se = Utils.getSE(_this.sceneConfig.SOUND.SE3);
	          return SoundManager.play(_se);
	        };
	      })(this)
	    });
	    ref = this.line.children;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      path = ref[i];
	      TweenMax.to(path, .2, {
	        dashOffset: path.length,
	        delay: 1.5
	      });
	    }
	    tl.to(position, 0.15, {
	      y: -60,
	      x: -100,
	      delay: .05,
	      ease: Cubic.easeInOut
	    }).to(position, 0.15, {
	      y: -120,
	      x: -100,
	      delay: .05,
	      ease: Cubic.easeInOut
	    }).to(position, 0.15, {
	      y: -60,
	      x: 100,
	      delay: .05,
	      ease: Cubic.easeInOut
	    }).to(position, 0.15, {
	      y: -80,
	      x: 0,
	      delay: .05,
	      ease: Cubic.easeInOut
	    }).to(position, 0.3, {
	      y: -150,
	      x: 100,
	      ease: Cubic.easeInOut
	    });
	    TweenMax.to(scaling, .4, {
	      x: 0,
	      y: 0,
	      delay: 3.1,
	      onComplete: function() {
	        df.resolve();
	        return SoundManager.stop("ufo-se3", 300);
	      }
	    });
	    return df.promise();
	  };
	
	  return UfoView;
	
	})(paper.Group);
	
	module.exports = UfoView;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var Config, LogoType, LogoTypeView, PaperStage, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	LogoType = __webpack_require__(15);
	
	PaperStage = __webpack_require__(16);
	
	SoundManager = __webpack_require__(17);
	
	LogoTypeView = (function(superClass) {
	  extend(LogoTypeView, superClass);
	
	  function LogoTypeView() {
	    this.fall = bind(this.fall, this);
	    this.suck = bind(this.suck, this);
	    this.fly = bind(this.fly, this);
	    return LogoTypeView.__super__.constructor.apply(this, arguments);
	  }
	
	  LogoTypeView.prototype._onInit = function() {
	    var i, j, len, path, ref;
	    ref = this.pathes;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      path = ref[i];
	      path.basePos = {
	        x: path.position.x,
	        y: path.position.y
	      };
	    }
	  };
	
	  LogoTypeView.prototype.end = function() {
	    var i, j, len, path, ref;
	    this.opacity = 1;
	    ref = this.pathes;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      path = ref[i];
	      path.position.x = path.basePos.x;
	      path.position.y = path.basePos.y;
	    }
	  };
	
	  LogoTypeView.prototype.fly = function() {
	    var _y;
	    _y = this.position.y + 75;
	    return TweenMax.to(this.position, .75, {
	      y: _y,
	      ease: Cubic.easeOut
	    });
	  };
	
	  LogoTypeView.prototype.suck = function() {
	    var _delay, _se, i, j, len, path, position, ref, tl;
	    this.sceneConfig = Config.Ufo;
	    _se = Utils.getSE(this.sceneConfig.SOUND.SE2);
	    SoundManager.play(_se);
	    _delay = 0;
	    ref = this.pathes;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      path = ref[i];
	      position = path.position;
	      tl = new TimelineMax();
	      tl.to(position, 0.15, {
	        x: -5,
	        delay: _delay,
	        ease: Cubic.easeOut
	      });
	      tl.to(position, 0.25, {
	        y: -100,
	        ease: Cubic.easeIn
	      });
	      _delay += 0.1;
	    }
	    setTimeout((function(_this) {
	      return function() {
	        _this.opacity = 0;
	        return SoundManager.stop(_se);
	      };
	    })(this), (_delay + 0.5) * 1000);
	  };
	
	  LogoTypeView.prototype.fall = function() {
	    var delay, df;
	    df = $.Deferred();
	    this.position.y = 0;
	    this.opacity = 1;
	    delay = .4;
	    $.each(this.pathes, function(i, path) {
	      path.position.x = path.basePos.x;
	      path.position.y = PaperStage.instance.height * -0.6;
	      delay += .020;
	      return TweenMax.to(path.position, .35, {
	        y: path.basePos.y,
	        delay: delay,
	        ease: Bounce.easeOut
	      });
	    });
	    setTimeout(df.resolve, (delay + 0.1) * 1000);
	    return df.promise();
	  };
	
	  return LogoTypeView;
	
	})(LogoType);
	
	module.exports = LogoTypeView;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var Base, BaseView, BtnView, Config, CountdownView, FireView, LogoTypeView, Rocket, RocketGroupView, SceneBase, SmokeView, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	SceneBase = __webpack_require__(22);
	
	BtnView = __webpack_require__(58);
	
	BaseView = __webpack_require__(59);
	
	Base = __webpack_require__(13);
	
	RocketGroupView = __webpack_require__(60);
	
	LogoTypeView = __webpack_require__(61);
	
	SmokeView = __webpack_require__(62);
	
	FireView = __webpack_require__(63);
	
	CountdownView = __webpack_require__(64);
	
	SoundManager = __webpack_require__(17);
	
	Rocket = (function(superClass) {
	  extend(Rocket, superClass);
	
	  function Rocket() {
	    this._onSwapping = bind(this._onSwapping, this);
	    this._onEnd = bind(this._onEnd, this);
	    return Rocket.__super__.constructor.apply(this, arguments);
	  }
	
	  Rocket.prototype._onInit = function() {
	    this.sceneConfig = Config.Rocket;
	    this.btn = new BtnView();
	    this.base = new BaseView();
	    this.fire = new FireView();
	    this.smoke = new SmokeView();
	    this.rocket = new RocketGroupView(this.btn, this.fire);
	    this.logoType = new LogoTypeView();
	    this.countdown = new CountdownView();
	    this.container.addChildren([this.rocket, this.base, this.logoType, this.smoke, this.countdown]);
	  };
	
	  Rocket.prototype._onStart = function() {
	    this.container.position.x = 0;
	    this.addChild(this.container);
	  };
	
	  Rocket.prototype._onEnd = function() {
	    this.removeChildren();
	    this.logoType.end();
	    this.rocket.end();
	    this.fire.end();
	    this.btn.end();
	    this.base.end();
	    this.smoke.end();
	    this.countdown.end();
	  };
	
	  Rocket.prototype._onUpdate = function() {
	    if (this.mode === SceneBase.Mode.Touching || this.mode === SceneBase.Mode.Standby) {
	      this.btn.update();
	    }
	  };
	
	  Rocket.prototype._onStandby = function() {
	    this.btn.up();
	  };
	
	  Rocket.prototype._onTouchUp = function() {
	    var ref;
	    if (this.mode === SceneBase.Mode.Standby) {
	      if ((ref = this.btn) != null) {
	        ref.up();
	      }
	    }
	  };
	
	  Rocket.prototype._onEffect = function() {
	    this.btn.change();
	    this.rocket.change();
	    this.countdown.effect().then(this.smoke.show).then(this.fire.effect).then(this.smoke.scroll).then(this.base.scroll).then(this.logoType.scroll).then(this.rocket.goOut).then(this.swap);
	  };
	
	  Rocket.prototype._onSwapping = function() {
	    this.nextContainer.position.y = this.paper.height;
	    this.addChild(this.nextContainer);
	    TweenMax.to(this.nextContainer.position, .6, {
	      y: 0,
	      ease: Expo.easeInOut,
	      onComplete: this.end
	    });
	  };
	
	  return Rocket;
	
	})(SceneBase);
	
	module.exports = Rocket;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var Btn, BtnView, Config, MorphablePath, SHOT, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Btn = __webpack_require__(10);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	MorphablePath = __webpack_require__(12);
	
	SHOT = 1;
	
	BtnView = (function(superClass) {
	  extend(BtnView, superClass);
	
	  function BtnView() {
	    this.change = bind(this.change, this);
	    return BtnView.__super__.constructor.apply(this, arguments);
	  }
	
	  BtnView.prototype._onInit = function() {
	    var _after, _before;
	    this.sceneConfig = Config.Rocket;
	    _before = Utils.getSvgChild(this.sceneConfig.SVG.Before);
	    _after = Utils.getSvgChild(this.sceneConfig.SVG.After);
	    this.rocket = new MorphablePath([_before, _after], 0);
	    this.rocket.strokeWidth = Config.LINE_WIDTH;
	    this.rocket.strokeColor = Config.COLOR.BTN_PATH;
	    this.rocket.fillColor = Config.COLOR.BTN_FILL;
	    this.rocket.visible = false;
	    this.addChild(this.rocket);
	  };
	
	  BtnView.prototype.end = function() {
	    this.reset();
	    this.rocket.visible = false;
	    this.rocket.update(0);
	  };
	
	  BtnView.prototype.change = function() {
	    this.fill.visible = false;
	    this.stroke.visible = false;
	    this.rocket.visible = true;
	    TweenMax.to(this.rocket, .25, {
	      morph: SHOT,
	      ease: Back.easeOut,
	      onUpdate: this.rocket.update
	    });
	  };
	
	  return BtnView;
	
	})(Btn);
	
	module.exports = BtnView;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var Base, BaseView, PaperStage, SHOT,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Base = __webpack_require__(13);
	
	PaperStage = __webpack_require__(16);
	
	SHOT = 2;
	
	BaseView = (function(superClass) {
	  extend(BaseView, superClass);
	
	  function BaseView() {
	    this.scroll = bind(this.scroll, this);
	    return BaseView.__super__.constructor.apply(this, arguments);
	  }
	
	  BaseView.prototype.end = function() {
	    this.reset();
	  };
	
	  BaseView.prototype.scroll = function() {
	    var position;
	    position = this.position;
	    TweenMax.to(position, 2.7, {
	      y: PaperStage.instance.height * 0.7,
	      ease: Expo.easeIn
	    });
	  };
	
	  return BaseView;
	
	})(Base);
	
	module.exports = BaseView;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var Config, RocketGroupView, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	RocketGroupView = (function(superClass) {
	  extend(RocketGroupView, superClass);
	
	  function RocketGroupView(btn, fire) {
	    this.goOut = bind(this.goOut, this);
	    var j, k, l, len, len1, len2, parts, ref, ref1, ref2;
	    this.sceneConfig = Config.Rocket;
	    this.btn = btn;
	    this.fire = fire;
	    RocketGroupView.__super__.constructor.call(this, [this.btn, this.fire]);
	    Utils.transformInit(this);
	    this.parts1 = this.importSVG(this.sceneConfig.SVG.Parts1);
	    Utils.transformInit(this.parts1);
	    ref = this.parts1.children;
	    for (j = 0, len = ref.length; j < len; j++) {
	      parts = ref[j];
	      Utils.transformInit(parts, false);
	      parts.visible = false;
	    }
	    this.parts2 = this.importSVG(this.sceneConfig.SVG.Parts2);
	    Utils.transformInit(this.parts2);
	    ref1 = this.parts2.children;
	    for (k = 0, len1 = ref1.length; k < len1; k++) {
	      parts = ref1[k];
	      Utils.transformInit(parts, false);
	      parts.visible = false;
	    }
	    this.parts3 = this.importSVG(this.sceneConfig.SVG.Parts3);
	    Utils.transformInit(this.parts3);
	    ref2 = this.parts3.children;
	    for (l = 0, len2 = ref2.length; l < len2; l++) {
	      parts = ref2[l];
	      Utils.transformInit(parts, false);
	      parts.visible = false;
	    }
	    this.parts3.insertBelow(this.btn);
	  }
	
	  RocketGroupView.prototype.end = function() {
	    var j, k, l, len, len1, len2, parts, ref, ref1, ref2;
	    this.position = new paper.Point(0, 0);
	    ref = this.parts1.children;
	    for (j = 0, len = ref.length; j < len; j++) {
	      parts = ref[j];
	      parts.scaling.set(1, 1);
	      parts.visible = false;
	    }
	    this.position = new paper.Point(0, 0);
	    ref1 = this.parts2.children;
	    for (k = 0, len1 = ref1.length; k < len1; k++) {
	      parts = ref1[k];
	      parts.scaling.set(1, 1);
	      parts.visible = false;
	    }
	    ref2 = this.parts3.children;
	    for (l = 0, len2 = ref2.length; l < len2; l++) {
	      parts = ref2[l];
	      parts.scaling.set(1, 1);
	      parts.visible = false;
	    }
	  };
	
	  RocketGroupView.prototype.change = function() {
	    var _delay, _ease, i, j, k, l, len, len1, len2, parts, ref, ref1, ref2;
	    _delay = .5;
	    ref = this.parts1.children;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      parts = ref[i];
	      parts.scaling.set(0.01, 0.01);
	      parts.visible = true;
	      _ease = i === 0 ? Back.easeOut : Expo.easeOut;
	      TweenMax.to(parts.scaling, .25, {
	        x: 1,
	        y: 1,
	        ease: _ease
	      });
	    }
	    ref1 = this.parts2.children;
	    for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
	      parts = ref1[i];
	      parts.scaling.set(0.01, 0.01);
	      parts.visible = true;
	      _ease = i === 0 ? Back.easeOut : Expo.easeOut;
	      TweenMax.to(parts.scaling, .25, {
	        x: 1,
	        y: 1,
	        ease: _ease,
	        delay: _delay
	      });
	    }
	    ref2 = this.parts3.children;
	    for (i = l = 0, len2 = ref2.length; l < len2; i = ++l) {
	      parts = ref2[i];
	      parts.scaling.set(0.01, 0.01);
	      parts.visible = true;
	      TweenMax.to(parts.scaling, .25, {
	        x: 1,
	        y: 1,
	        ease: Back.easeOut,
	        delay: _delay + .5
	      });
	    }
	  };
	
	  RocketGroupView.prototype.goOut = function() {
	    var df, position, tl;
	    df = new $.Deferred();
	    position = this.position;
	    tl = new TimelineMax();
	    tl.to(position, 0.1, {
	      x: 3,
	      ease: Expo.easeInOut
	    }).to(position, 0.1, {
	      x: -3,
	      ease: Expo.easeInOut
	    }).to(position, 0.1, {
	      x: 3,
	      ease: Expo.easeInOut
	    }).to(position, 0.1, {
	      x: -3,
	      ease: Expo.easeInOut
	    }).to(position, 0.1, {
	      x: 3,
	      ease: Expo.easeInOut
	    }).to(position, 0.1, {
	      x: -3,
	      ease: Expo.easeInOut
	    }).to(position, 0.09, {
	      x: 3,
	      ease: Expo.easeInOut
	    }).to(position, 0.09, {
	      x: -3,
	      ease: Expo.easeInOut
	    }).to(position, 0.09, {
	      x: 3,
	      ease: Expo.easeInOut
	    }).to(position, 0.09, {
	      x: -3,
	      ease: Expo.easeInOut
	    }).to(position, 0.09, {
	      x: 3,
	      ease: Expo.easeInOut
	    }).to(position, 0.09, {
	      x: -3,
	      ease: Expo.easeInOut
	    }).to(position, 0.09, {
	      x: 2,
	      ease: Expo.easeInOut
	    }).to(position, 0.09, {
	      x: -2,
	      ease: Expo.easeInOut
	    }).to(position, 0.09, {
	      x: 2,
	      ease: Expo.easeInOut
	    }).to(position, 0.09, {
	      x: -2,
	      ease: Expo.easeInOut
	    }).to(position, 0.09, {
	      x: 2,
	      ease: Expo.easeInOut
	    }).to(position, 0.09, {
	      x: -2,
	      ease: Expo.easeInOut
	    }).to(position, 0.09, {
	      x: 1,
	      ease: Expo.easeInOut
	    }).to(position, 0.09, {
	      x: -1,
	      ease: Expo.easeInOut
	    }).to(position, 0.09, {
	      x: 1,
	      ease: Expo.easeInOut
	    }).to(position, 0.09, {
	      x: -1,
	      ease: Expo.easeInOut
	    }).to(position, 0.09, {
	      x: 1,
	      ease: Expo.easeInOut
	    }).to(position, 0.09, {
	      x: -1,
	      ease: Expo.easeInOut
	    }).to(position, 0.09, {
	      x: 1,
	      ease: Expo.easeInOut
	    }).to(position, 0.09, {
	      x: 0,
	      ease: Expo.easeInOut
	    });
	    TweenMax.to(position, 1.0, {
	      y: $(window).height() * -1,
	      delay: 3,
	      onComplete: df.resolve
	    });
	    return df.promise();
	  };
	
	  return RocketGroupView;
	
	})(paper.Group);
	
	module.exports = RocketGroupView;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var LogoType, LogoTypeView, PaperStage,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	LogoType = __webpack_require__(15);
	
	PaperStage = __webpack_require__(16);
	
	LogoTypeView = (function(superClass) {
	  extend(LogoTypeView, superClass);
	
	  function LogoTypeView() {
	    this.scroll = bind(this.scroll, this);
	    return LogoTypeView.__super__.constructor.apply(this, arguments);
	  }
	
	  LogoTypeView.prototype._onInit = function() {};
	
	  LogoTypeView.prototype.end = function() {
	    this.position.y = 0;
	  };
	
	  LogoTypeView.prototype.scroll = function() {
	    var position;
	    position = this.position;
	    TweenMax.to(position, 2.7, {
	      y: PaperStage.instance.height * 0.7,
	      ease: Expo.easeIn
	    });
	  };
	
	  return LogoTypeView;
	
	})(LogoType);
	
	module.exports = LogoTypeView;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var Config, MorphablePath, PaperStage, SmokeView, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	PaperStage = __webpack_require__(16);
	
	MorphablePath = __webpack_require__(12);
	
	SmokeView = (function(superClass) {
	  extend(SmokeView, superClass);
	
	  function SmokeView() {
	    this.scroll = bind(this.scroll, this);
	    this.show = bind(this.show, this);
	    SmokeView.__super__.constructor.call(this);
	    this.sceneConfig = Config.Rocket;
	    Utils.transformInit(this);
	    this.smoke = [];
	    this.smoke.push(this.importSVG(this.sceneConfig.SVG.Smoke1));
	    this.smoke.push(this.importSVG(this.sceneConfig.SVG.Smoke2));
	    this.smoke.push(this.importSVG(this.sceneConfig.SVG.Smoke3));
	    this.smoke.push(this.importSVG(this.sceneConfig.SVG.Smoke4));
	    this.smoke.push(this.importSVG(this.sceneConfig.SVG.Smoke5));
	    this.smoke.push(this.importSVG(this.sceneConfig.SVG.Smoke6));
	    $.each(this.smoke, function(i, _smoke) {
	      _smoke.visible = false;
	      _smoke.opacity = 0;
	      $.each(_smoke.children, (function(_this) {
	        return function(j, path) {
	          path.baseX = path.position.x;
	          return path.baseY = path.position.y;
	        };
	      })(this));
	    });
	    this.sequence = 0;
	  }
	
	  SmokeView.prototype.show = function() {
	    $.each(this.smoke, (function(_this) {
	      return function(i, _smoke) {
	        if (_this.sequence !== i) {
	          if (_this.sequence < 4) {
	            TweenMax.to(_smoke, .05, {
	              delay: .25,
	              opacity: 0,
	              onComplete: function() {
	                return _smoke.visible = false;
	              }
	            });
	          }
	        } else {
	          TweenMax.to(_smoke, .05, {
	            opacity: 1,
	            onStart: function() {
	              _smoke.visible = true;
	              return _smoke.opacity = 0;
	            }
	          });
	          $.each(_smoke.children, function(j, path) {
	            var ref, startedTime, test;
	            test = j % 2 === 0 ? 1 : -1;
	            startedTime = new Date().getTime();
	            if ((ref = path.tween) != null) {
	              ref.kill();
	            }
	            path.opacity = 0;
	            path.position.x = path.baseX;
	            path.position.y = path.baseY;
	            path.tween = TweenMax.to(path.scaling, .3, {
	              x: 1,
	              y: 1,
	              repeat: -1,
	              yoyo: true,
	              delay: j * .05,
	              onStart: function() {
	                return path.opacity = 1;
	              },
	              onUpdate: function() {
	                var offset, time;
	                time = new Date().getTime() - startedTime;
	                offset = 1 + (time / 2000);
	                path.position.x = (path.baseX * offset) + (Math.sin(time * 0.05) * test);
	                return path.position.y = path.baseY + offset * 10;
	              }
	            });
	          });
	        }
	      };
	    })(this));
	    this.sequence += 1;
	    if (this.sequence < this.smoke.length) {
	      this.timeID = setTimeout(this.show, 280);
	    } else {
	      this.hide();
	    }
	  };
	
	  SmokeView.prototype.hide = function() {
	    TweenMax.to(this, 0, {
	      opacity: 0,
	      delay: 1.5,
	      onComplete: (function(_this) {
	        return function() {
	          $.each(_this.smoke, function(i, _smoke) {
	            _smoke.visible = false;
	            _smoke.opacity = 0;
	            $.each(_smoke.children, function(j, path) {
	              var ref;
	              path.scaling.set(1, 1);
	              return (ref = path.tween) != null ? ref.kill() : void 0;
	            });
	          });
	        };
	      })(this)
	    });
	  };
	
	  SmokeView.prototype.scroll = function() {
	    var position;
	    position = this.position;
	    TweenMax.to(position, 2.7, {
	      y: PaperStage.instance.height * 0.7,
	      ease: Expo.easeIn
	    });
	  };
	
	  SmokeView.prototype.end = function() {
	    this.position.set(0, 0);
	    this.sequence = 0;
	    this.opacity = 1;
	  };
	
	  return SmokeView;
	
	})(paper.Group);
	
	module.exports = SmokeView;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var Config, FireView, MorphablePath, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	MorphablePath = __webpack_require__(12);
	
	FireView = (function(superClass) {
	  extend(FireView, superClass);
	
	  function FireView() {
	    this.effect = bind(this.effect, this);
	    var child, fire1, fire2, i, j, len;
	    FireView.__super__.constructor.call(this);
	    this.sceneConfig = Config.Rocket;
	    Utils.transformInit(this);
	    fire1 = Utils.getSvgChild(this.sceneConfig.SVG.Fire1, -1);
	    fire2 = Utils.getSvgChild(this.sceneConfig.SVG.Fire2, -1);
	    this.pathes = [];
	    for (i = j = 0, len = fire1.length; j < len; i = ++j) {
	      child = fire1[i];
	      this.pathes.push(new MorphablePath([child, fire2[i]]));
	      this.pathes[i].strokeWidth = Config.LINE_WIDTH;
	      this.pathes[i].strokeColor = this.sceneConfig.COLOR.FIRE_STROKE;
	      this.pathes[i].fillColor = i < 3 ? this.sceneConfig.COLOR.FIRE_OUT : this.sceneConfig.COLOR.FIRE_IN;
	      this.pathes[i].visible = false;
	      this.addChild(this.pathes[i]);
	    }
	    this.tweenArr = [];
	    this.visible = false;
	  }
	
	  FireView.prototype.end = function() {
	    var i, j, len, ref, tween;
	    this.visible = false;
	    ref = this.tweenArr;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      tween = ref[i];
	      tween.pause();
	      this.children[i].visible = false;
	    }
	  };
	
	  FireView.prototype.effect = function() {
	    var j, k, len, len1, path, ref, ref1, tween;
	    this.visible = true;
	    if (this.tweenArr.length < 1) {
	      ref = this.pathes;
	      for (j = 0, len = ref.length; j < len; j++) {
	        path = ref[j];
	        tween = TweenMax.to(path, .3, {
	          morph: 1,
	          onUpdate: path.update,
	          repeat: -1,
	          yoyo: true
	        });
	        this.tweenArr.push(tween);
	      }
	    } else {
	      ref1 = this.tweenArr;
	      for (k = 0, len1 = ref1.length; k < len1; k++) {
	        tween = ref1[k];
	        tween.play();
	      }
	    }
	    $.each(this.pathes, (function(_this) {
	      return function(i, path) {
	        var _delay;
	        _delay = i === 0 || i === 3 ? 1500 : 2100;
	        setTimeout(function() {
	          return path.visible = true;
	        }, _delay);
	      };
	    })(this));
	    this.position.y -= 35;
	    TweenMax.to(this.position, 0.75, {
	      y: 0,
	      delay: 1.8
	    });
	  };
	
	  return FireView;
	
	})(paper.Group);
	
	module.exports = FireView;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var Config, CountDownView, PaperStage, SoundManager, Utils,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	PaperStage = __webpack_require__(16);
	
	SoundManager = __webpack_require__(17);
	
	CountDownView = (function(superClass) {
	  extend(CountDownView, superClass);
	
	  function CountDownView() {
	    var count, j, k, len, len1, path, ref, ref1;
	    CountDownView.__super__.constructor.call(this);
	    this.sceneConfig = Config.Rocket;
	    Utils.transformInit(this);
	    this.count = [];
	    this.count.push(this.importSVG(this.sceneConfig.SVG.Count3));
	    this.count.push(this.importSVG(this.sceneConfig.SVG.Count2));
	    this.count.push(this.importSVG(this.sceneConfig.SVG.Count1));
	    ref = this.count;
	    for (j = 0, len = ref.length; j < len; j++) {
	      count = ref[j];
	      Utils.transformInit(count, false);
	      count.visible = false;
	      ref1 = count.children;
	      for (k = 0, len1 = ref1.length; k < len1; k++) {
	        path = ref1[k];
	        Utils.transformInit(path);
	      }
	    }
	  }
	
	  CountDownView.prototype.start = function() {};
	
	  CountDownView.prototype.end = function() {
	    var count, j, len, ref;
	    ref = this.count;
	    for (j = 0, len = ref.length; j < len; j++) {
	      count = ref[j];
	      count.visible = false;
	    }
	  };
	
	  CountDownView.prototype.effect = function() {
	    var _delay, _i, _se, df;
	    df = new $.Deferred();
	    _delay = 0;
	    _i = 3;
	    _se = Utils.getSE(this.sceneConfig.SOUND.SE1);
	    SoundManager.play(_se);
	    $.each(this.count, function(i, count) {
	      TweenMax.to(count.scaling, .35, {
	        delay: _delay / 1000,
	        onStart: function() {
	          return count.visible = true;
	        },
	        onComplete: function() {
	          return count.visible = false;
	        }
	      });
	      return _delay += 500;
	    });
	    setTimeout(df.resolve, _delay);
	    return df.promise();
	  };
	
	  return CountDownView;
	
	})(paper.Group);
	
	module.exports = CountDownView;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var Base, BtnView, CarView, Config, LogoTypeView, PatrolLamp, SceneBase, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	SceneBase = __webpack_require__(22);
	
	BtnView = __webpack_require__(66);
	
	Base = __webpack_require__(13);
	
	LogoTypeView = __webpack_require__(67);
	
	CarView = __webpack_require__(68);
	
	SoundManager = __webpack_require__(17);
	
	PatrolLamp = (function(superClass) {
	  extend(PatrolLamp, superClass);
	
	  function PatrolLamp() {
	    this._onSwapping = bind(this._onSwapping, this);
	    this._onEnd = bind(this._onEnd, this);
	    return PatrolLamp.__super__.constructor.apply(this, arguments);
	  }
	
	  PatrolLamp.prototype._onInit = function() {
	    this.sceneConfig = Config.PatrolLamp;
	    this.btn = new BtnView();
	    this.btn.soft = 0.2;
	    this.base = new Base();
	    this.logoType = new LogoTypeView();
	    this.car = new CarView([this.btn, this.base]);
	    this.container.addChildren([this.car, this.logoType]);
	    this.nextContainer.removeChildren(2);
	  };
	
	  PatrolLamp.prototype._onStart = function() {
	    this.container.position.x = 0;
	    this.addChild(this.container);
	  };
	
	  PatrolLamp.prototype._onEnd = function() {
	    this.removeChildren();
	    this.btn.end();
	    this.car.end();
	    this.logoType.end();
	  };
	
	  PatrolLamp.prototype._onUpdate = function() {
	    if (this.mode === SceneBase.Mode.Touching || this.mode === SceneBase.Mode.Standby) {
	      this.btn.update();
	    }
	    this.car.update();
	  };
	
	  PatrolLamp.prototype._onStandby = function() {
	    this.btn.up();
	  };
	
	  PatrolLamp.prototype._onTouchUp = function() {
	    var ref;
	    if (this.mode === SceneBase.Mode.Standby) {
	      return (ref = this.btn) != null ? ref.up() : void 0;
	    }
	  };
	
	  PatrolLamp.prototype._onEffect = function() {
	    var _se;
	    _se = Utils.getSE(this.sceneConfig.SOUND.SE1);
	    Utils.wait(120).then(function() {
	      return SoundManager.play(_se);
	    });
	    this.btn.change().then(this.car.change).then((function(_this) {
	      return function() {
	        return Utils.wait(200);
	      };
	    })(this)).then(this.car.siren).then(this.logoType.move).then(this.car.changeReset).then(this.btn.hide).then(this.car.down).then(this.btn.grow).then(this.swap);
	  };
	
	  PatrolLamp.prototype._onSwapping = function() {
	    this.end();
	  };
	
	  return PatrolLamp;
	
	})(SceneBase);
	
	module.exports = PatrolLamp;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var Btn, BtnView, Config, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Btn = __webpack_require__(10);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	BtnView = (function(superClass) {
	  extend(BtnView, superClass);
	
	  function BtnView() {
	    this.morphingUpdate = bind(this.morphingUpdate, this);
	    this.grow = bind(this.grow, this);
	    this.hide = bind(this.hide, this);
	    this.change = bind(this.change, this);
	    return BtnView.__super__.constructor.apply(this, arguments);
	  }
	
	  BtnView.prototype._onInit = function() {
	    this.sceneConfig = Config.PatrolLamp;
	  };
	
	  BtnView.prototype.end = function() {
	    this.reset();
	  };
	
	  BtnView.prototype.change = function() {
	    var df;
	    df = new $.Deferred();
	    this.fill.fillColor = this.sceneConfig.COLOR.BTN;
	    TweenMax.to(this.position, .1, {
	      y: 0,
	      ease: Back.easeOut
	    });
	    TweenMax.to(this, .1, {
	      morph: 1,
	      ease: Back.easeOut,
	      onUpdate: this.morphingUpdate,
	      onComplete: df.resolve
	    });
	    return df.promise();
	  };
	
	  BtnView.prototype.hide = function() {
	    this.visible = false;
	  };
	
	  BtnView.prototype.grow = function() {
	    var df;
	    df = new $.Deferred();
	    this.morph = 1;
	    this.morphingUpdate();
	    this.position.set(0, 22);
	    TweenMax.to(this.position, .5, {
	      delay: .2,
	      y: 0,
	      ease: Expo.easeOut,
	      onComplete: df.resolve,
	      onStart: (function(_this) {
	        return function() {
	          return _this.visible = true;
	        };
	      })(this)
	    });
	    return df.promise();
	  };
	
	  BtnView.prototype.morphingUpdate = function() {
	    if (this._morph === this.morph) {
	      return;
	    }
	    this.stroke.update(this.morph);
	    this.fill.update(this.morph);
	    this._morph = this.morph;
	  };
	
	  return BtnView;
	
	})(Btn);
	
	module.exports = BtnView;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var Config, LogoType, LogoTypeView, PaperStage, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	LogoType = __webpack_require__(15);
	
	PaperStage = __webpack_require__(16);
	
	SoundManager = __webpack_require__(17);
	
	LogoTypeView = (function(superClass) {
	  extend(LogoTypeView, superClass);
	
	  function LogoTypeView() {
	    this.move = bind(this.move, this);
	    return LogoTypeView.__super__.constructor.apply(this, arguments);
	  }
	
	  LogoTypeView.prototype.end = function() {
	    this.position.x = 0;
	  };
	
	  LogoTypeView.prototype.move = function() {
	    var _se, _x, df, position, tl;
	    this.sceneConfig = Config.PatrolLamp;
	    _se = Utils.getSE(this.sceneConfig.SOUND.SE2);
	    df = new $.Deferred();
	    _x = ((PaperStage.instance.width / 2) + this.bounds.width) * -1;
	    tl = new TimelineMax({
	      onComplete: function() {
	        df.resolve();
	        return SoundManager.stop(_se, 300);
	      }
	    });
	    position = this.position;
	    tl.to(position, 1.5, {
	      x: _x,
	      ease: Sine.easeIn,
	      onStart: function() {
	        return SoundManager.play(_se);
	      },
	      onComplete: (function(_this) {
	        return function() {
	          return position.x = (PaperStage.instance.width / 2) + _this.bounds.width;
	        };
	      })(this)
	    });
	    tl.to(position, 1, {
	      x: 0,
	      ease: Sine.easeOut
	    });
	    return df.promise();
	  };
	
	  return LogoTypeView;
	
	})(LogoType);
	
	module.exports = LogoTypeView;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var CarView, Config, MorphablePath, PaperStage, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	PaperStage = __webpack_require__(16);
	
	MorphablePath = __webpack_require__(12);
	
	CarView = (function(superClass) {
	  extend(CarView, superClass);
	
	  function CarView(objcets) {
	    this.siren = bind(this.siren, this);
	    this.down = bind(this.down, this);
	    this.changeReset = bind(this.changeReset, this);
	    this.change = bind(this.change, this);
	    var light1, light2;
	    CarView.__super__.constructor.call(this);
	    this.isMoving = false;
	    this.sceneConfig = Config.PatrolLamp;
	    Utils.transformInit(this);
	    this.lamp = this.importSVG(this.sceneConfig.SVG.Lamp);
	    Utils.transformInit(this.lamp, false);
	    this.lamp.visible = false;
	    this.tireLeft = this.importSVG(this.sceneConfig.SVG.TireLeft);
	    Utils.transformInit(this.tireLeft, false);
	    this.tireLeft.visible = false;
	    this.tireRight = this.importSVG(this.sceneConfig.SVG.TireRight);
	    Utils.transformInit(this.tireRight, false);
	    this.tireRight.visible = false;
	    light1 = Utils.getSvgChild(this.sceneConfig.SVG.Light1);
	    light2 = Utils.getSvgChild(this.sceneConfig.SVG.Light2);
	    this.light = new MorphablePath([light1, light2], 0);
	    this.light.fillColor = this.sceneConfig.COLOR.LIGHT;
	    this.light.visible = false;
	    this.btn = objcets[0];
	    this.addChild(this.btn);
	    this.addChild(this.light);
	    this.addChild(this.lamp);
	    this.base = objcets[1];
	    this.addChild(this.base);
	    this.addChildren([this.tireLeft, this.tireRight]);
	  }
	
	  CarView.prototype.end = function() {
	    this.position.set(0, 0);
	    this.isMoving = false;
	    this.tireLeft.scaling.set(1, 1);
	    this.tireRight.scaling.set(1, 1);
	    this.tireLeft.visible = false;
	    this.tireRight.visible = false;
	    this.lamp.scaling.set(1, 1);
	    this.lamp.visible = false;
	    this.light.visible = false;
	    this.lightTween.pause();
	  };
	
	  CarView.prototype.change = function() {
	    var df, tl;
	    df = new $.Deferred();
	    tl = new TimelineMax({
	      onComplete: df.resolve
	    });
	    TweenMax.to(this.position, .1, {
	      y: -14,
	      ease: Back.easeOut
	    });
	    this.lamp.scaling.set(0.1, 0.1);
	    tl.to(this.lamp.scaling, .1, {
	      x: 1,
	      y: 1,
	      ease: Back.easeOut,
	      onStart: (function(_this) {
	        return function() {
	          return _this.lamp.visible = true;
	        };
	      })(this)
	    });
	    this.tireLeft.scaling.set(0.1, 0.1);
	    tl.to(this.tireLeft.scaling, .1, {
	      x: 1,
	      y: 1,
	      ease: Back.easeOut,
	      onStart: (function(_this) {
	        return function() {
	          return _this.tireLeft.visible = true;
	        };
	      })(this)
	    });
	    this.tireRight.scaling.set(0.1, 0.1);
	    tl.to(this.tireRight.scaling, .1, {
	      x: 1,
	      y: 1,
	      ease: Back.easeOut,
	      onStart: (function(_this) {
	        return function() {
	          return _this.tireRight.visible = true;
	        };
	      })(this)
	    });
	    return df.promise();
	  };
	
	  CarView.prototype.changeReset = function() {
	    this.tireLeft.visible = false;
	    this.tireRight.visible = false;
	    this.lamp.visible = false;
	    this.light.visible = false;
	    this.lightTween.pause();
	    return this.btn.fill.fillColor = Config.COLOR.BTN_FILL;
	  };
	
	  CarView.prototype.down = function() {
	    var df;
	    df = new $.Deferred();
	    TweenMax.to(this.position, .2, {
	      y: 0,
	      ease: Bounce.easeOut,
	      onComplete: df.resolve
	    });
	    return df.promise();
	  };
	
	  CarView.prototype.siren = function() {
	    this.isMoving = true;
	    this.light.visible = true;
	    if (this.lightTween == null) {
	      this.lightTween = TweenMax.to(this.light, .6, {
	        morph: 1,
	        repeat: -1,
	        onUpdate: this.light.update
	      });
	    }
	    this.lightTween.play();
	  };
	
	  CarView.prototype.update = function() {
	    if (!this.isMoving) {
	      return;
	    }
	    this.tireLeft.rotate(5);
	    this.tireRight.rotate(5);
	  };
	
	  return CarView;
	
	})(paper.Group);
	
	module.exports = CarView;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var Base, BtnSquashView, BtnView, Config, LogoType, SceneBase, SoundManager, Squash, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	SceneBase = __webpack_require__(22);
	
	BtnView = __webpack_require__(70);
	
	BtnSquashView = __webpack_require__(72);
	
	Base = __webpack_require__(13);
	
	LogoType = __webpack_require__(15);
	
	SoundManager = __webpack_require__(17);
	
	Squash = (function(superClass) {
	  extend(Squash, superClass);
	
	  function Squash() {
	    this._onSwapping = bind(this._onSwapping, this);
	    this._onEnd = bind(this._onEnd, this);
	    return Squash.__super__.constructor.apply(this, arguments);
	  }
	
	  Squash.prototype._onInit = function() {
	    var base, press, pull;
	    this.sceneConfig = Config.Squash;
	    pull = Utils.getSvgChild(Config.SVG.PULL);
	    base = Utils.getSvgChild(Config.SVG.BASE);
	    press = Utils.getSvgChild(this.sceneConfig.SVG.Press);
	    this.btn = new BtnView([pull, base, press]);
	    this.btnSquash = new BtnSquashView();
	    this.base = new Base();
	    this.logoType = new LogoType();
	    this.container.addChildren([this.btn, this.base, this.logoType, this.btnSquash]);
	    this.isSePlaying = false;
	  };
	
	  Squash.prototype._onStart = function() {
	    this.se = Utils.getSE(this.sceneConfig.SOUND.SE1);
	    this.container.position.set(0, 0);
	    this.addChild(this.container);
	  };
	
	  Squash.prototype._onEnd = function() {
	    this.removeChildren();
	    this.btn.show();
	    this.btnSquash.end();
	  };
	
	  Squash.prototype._onUpdate = function() {
	    if (this.mode === SceneBase.Mode.Touching || this.mode === SceneBase.Mode.Standby) {
	      this.btn.update();
	    }
	    if (this.mode === SceneBase.Mode.Touching && this.press >= 1 && !this.isSePlaying) {
	      this.isSePlaying = true;
	      SoundManager.play(this.se, 0, true);
	    } else if ((this.mode !== SceneBase.Mode.Touching || this.press < 1) && this.isSePlaying) {
	      this.isSePlaying = false;
	      SoundManager.stop(this.se);
	    }
	  };
	
	  Squash.prototype._onStandby = function() {
	    this.btn.up();
	  };
	
	  Squash.prototype._onEffect = function() {
	    this.btn.hide();
	    this.btnSquash.effect().then(this.swap);
	  };
	
	  Squash.prototype._onSwapping = function() {
	    TweenMax.to(this.container.position, .6, {
	      y: this.paper.height,
	      ease: Expo.easeInOut,
	      onComplete: this.end
	    });
	    this.nextContainer.position.y = -this.paper.height;
	    this.addChild(this.nextContainer);
	    TweenMax.to(this.nextContainer.position, .6, {
	      y: 0,
	      ease: Expo.easeInOut
	    });
	  };
	
	  return Squash;
	
	})(SceneBase);
	
	module.exports = Squash;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var Btn, BtnView, FluidablePath,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Btn = __webpack_require__(10);
	
	FluidablePath = __webpack_require__(71);
	
	BtnView = (function(superClass) {
	  extend(BtnView, superClass);
	
	  function BtnView() {
	    return BtnView.__super__.constructor.apply(this, arguments);
	  }
	
	  BtnView.prototype._onInit = function() {
	    this.soft = 1;
	    this.fluidStroke = new FluidablePath(this.stroke);
	    this.fluidStroke.strokeWidth = this.stroke.strokeWidth;
	    this.fluidStroke.strokeColor = this.stroke.strokeColor;
	    this.fluidStroke.fillColor = this.fill.fillColor;
	    this.fluidStroke.speed = 0.015;
	    this.fluidStroke.amplitude = 1;
	    this.addChild(this.fluidStroke);
	    this.stroke.remove();
	    this.fill.remove();
	  };
	
	  BtnView.prototype._onUpdate = function() {
	    var flexibility;
	    this.fluidStroke.setPath(this.stroke);
	    flexibility = this.press - 1;
	    if (flexibility < 0) {
	      flexibility = 0;
	    } else if (flexibility > 1) {
	      flexibility = 1;
	    }
	    return this.fluidStroke.flexibility = flexibility;
	  };
	
	  BtnView.prototype.show = function() {
	    this.visible = true;
	  };
	
	  BtnView.prototype.hide = function() {
	    this.visible = false;
	  };
	
	  return BtnView;
	
	})(Btn);
	
	module.exports = BtnView;


/***/ },
/* 71 */
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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var BtnSquashView, Config, MorphablePath, SoundManager, Utils,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	MorphablePath = __webpack_require__(12);
	
	SoundManager = __webpack_require__(17);
	
	BtnSquashView = (function(superClass) {
	  extend(BtnSquashView, superClass);
	
	  function BtnSquashView() {
	    var i, j, len, path, ref;
	    BtnSquashView.__super__.constructor.call(this);
	    this.sceneConfig = Config.Squash;
	    this.before = Utils.getSvgChild(this.sceneConfig.SVG.Before, -1);
	    this.halfway = Utils.getSvgChild(this.sceneConfig.SVG.Halfway, -1);
	    this.after = Utils.getSvgChild(this.sceneConfig.SVG.After, -1);
	    this.pathArr = [];
	    ref = this.before;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      path = ref[i];
	      this.pathArr.push(new MorphablePath([this.before[i], this.halfway[i], this.after[i]]));
	      this.pathArr[i].fillColor = Config.COLOR.BTN_FILL;
	      this.pathArr[i].strokeColor = Config.COLOR.BTN_PATH;
	      this.pathArr[i].strokeWidth = Config.LINE_WIDTH;
	    }
	    this.addChildren(this.pathArr);
	    this.visible = false;
	  }
	
	  BtnSquashView.prototype.end = function() {
	    var i, j, len, path, ref;
	    this.visible = false;
	    this.position.set(0, 0);
	    ref = this.pathArr;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      path = ref[i];
	      path.morph = 0;
	      path.update(path.morph);
	    }
	  };
	
	  BtnSquashView.prototype.effect = function() {
	    var _se, df, i, j, len, path, ref, tl;
	    df = $.Deferred();
	    this.visible = true;
	    _se = Utils.getSE(this.sceneConfig.SOUND.SE2);
	    SoundManager.play(_se);
	    ref = this.pathArr;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      path = ref[i];
	      tl = new TimelineMax();
	      tl.to(path, .2, {
	        morph: 1,
	        onUpdate: path.update,
	        ease: Expo.easeOut
	      });
	      tl.to(path, .8, {
	        morph: 2,
	        delay: .2,
	        onUpdate: path.update,
	        ease: Cubic.easeIn
	      });
	    }
	    this.position.set(0, 0);
	    TweenMax.to(this.position, .8, {
	      y: 10,
	      delay: .2,
	      ease: Cubic.easeIn
	    });
	    setTimeout(df.resolve, 900);
	    return df.promise();
	  };
	
	  return BtnSquashView;
	
	})(paper.Group);
	
	module.exports = BtnSquashView;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var Base, BtnView, Config, Fall, LogoTypeView, SceneBase, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	SceneBase = __webpack_require__(22);
	
	BtnView = __webpack_require__(74);
	
	Base = __webpack_require__(13);
	
	LogoTypeView = __webpack_require__(75);
	
	SoundManager = __webpack_require__(17);
	
	Fall = (function(superClass) {
	  extend(Fall, superClass);
	
	  function Fall() {
	    this._onSwapping = bind(this._onSwapping, this);
	    this._onEnd = bind(this._onEnd, this);
	    return Fall.__super__.constructor.apply(this, arguments);
	  }
	
	  Fall.prototype._onInit = function() {
	    this.sceneConfig = Config.Fall;
	    this.btn = new BtnView();
	    this.base = new Base();
	    this.logoType = new LogoTypeView();
	    this.container.addChildren([this.btn, this.base, this.logoType]);
	    this.nextContainer.removeChildren(1);
	  };
	
	  Fall.prototype._onStart = function() {
	    this.container.position.x = 0;
	    this.addChild(this.container);
	  };
	
	  Fall.prototype._onEnd = function() {
	    this.removeChildren();
	    this.btn.end();
	  };
	
	  Fall.prototype._onUpdate = function() {
	    if (this.mode === SceneBase.Mode.Touching || this.mode === SceneBase.Mode.Standby) {
	      this.btn.update();
	    }
	  };
	
	  Fall.prototype._onTouchUp = function() {
	    this.btn.morphing();
	  };
	
	  Fall.prototype._onStandby = function() {
	    this.btn.up();
	  };
	
	  Fall.prototype._onEffect = function() {
	    var _se;
	    _se = Utils.getSE(this.sceneConfig.SOUND.SE1);
	    SoundManager.play(_se);
	    this.btn.effect();
	    this.logoType.effect();
	    this.nextContainer.position.y = -this.paper.height * .5;
	    this.insertChild(0, this.nextContainer);
	    TweenMax.to(this.nextContainer.position, .3, {
	      delay: .4,
	      y: 0,
	      ease: Bounce.easeOut,
	      onComplete: this.swap
	    });
	  };
	
	  Fall.prototype._onSwapping = function() {
	    this.end();
	  };
	
	  return Fall;
	
	})(SceneBase);
	
	module.exports = Fall;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var Btn, BtnView, Config, PaperStage,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Btn = __webpack_require__(10);
	
	Config = __webpack_require__(11);
	
	PaperStage = __webpack_require__(16);
	
	BtnView = (function(superClass) {
	  extend(BtnView, superClass);
	
	  function BtnView() {
	    return BtnView.__super__.constructor.apply(this, arguments);
	  }
	
	  BtnView.prototype.morphing = function() {
	    this.fill.update(1);
	    this.stroke.update(1);
	  };
	
	  BtnView.prototype.end = function() {
	    this.reset();
	  };
	
	  BtnView.prototype.effect = function() {
	    var _y;
	    _y = PaperStage.instance.height * 0.7;
	    TweenMax.to(this.position, 0.25, {
	      y: _y
	    });
	  };
	
	  return BtnView;
	
	})(Btn);
	
	module.exports = BtnView;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var Config, LogoType, LogoTypeView, Utils,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	LogoType = __webpack_require__(15);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	LogoTypeView = (function(superClass) {
	  extend(LogoTypeView, superClass);
	
	  function LogoTypeView() {
	    return LogoTypeView.__super__.constructor.apply(this, arguments);
	  }
	
	  LogoTypeView.prototype._onInit = function() {
	    this.left = new paper.Group([this.pathes[2], this.pathes[3], this.pathes[4], this.pathes[5], this.pathes[0]]);
	    this.right = new paper.Group([this.pathes[1], this.pathes[6], this.pathes[9], this.pathes[7], this.pathes[8]]);
	    Utils.transformInit([this.left, this.right]);
	    this.addChildren([this.left, this.right]);
	  };
	
	  LogoTypeView.prototype.end = function() {
	    this.left.position.x = 0;
	    this.right.position.x = 0;
	  };
	
	  LogoTypeView.prototype.effect = function() {
	    var _leftPosition, _rightPosition, tlLeft, tlRight;
	    tlLeft = new TimelineMax();
	    tlRight = new TimelineMax();
	    _leftPosition = this.left.position;
	    _rightPosition = this.right.position;
	    tlLeft.to(_leftPosition, .2, {
	      x: -100,
	      ease: Expo.easeOut
	    });
	    tlLeft.to(_leftPosition, .3, {
	      x: 0,
	      ease: Expo.easeIn
	    });
	    tlRight.to(_rightPosition, .2, {
	      x: 100,
	      ease: Expo.easeOut
	    });
	    tlRight.to(_rightPosition, .3, {
	      x: 0,
	      ease: Expo.easeIn
	    });
	  };
	
	  return LogoTypeView;
	
	})(LogoType);
	
	module.exports = LogoTypeView;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var BalloonFailure, BangView, Base, BtnView, Config, LogoType, SceneBase, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	SceneBase = __webpack_require__(22);
	
	BtnView = __webpack_require__(77);
	
	Base = __webpack_require__(13);
	
	LogoType = __webpack_require__(15);
	
	BangView = __webpack_require__(78);
	
	SoundManager = __webpack_require__(17);
	
	BalloonFailure = (function(superClass) {
	  extend(BalloonFailure, superClass);
	
	  function BalloonFailure() {
	    this._onSwapping = bind(this._onSwapping, this);
	    this._onEnd = bind(this._onEnd, this);
	    return BalloonFailure.__super__.constructor.apply(this, arguments);
	  }
	
	  BalloonFailure.prototype._onInit = function() {
	    var base, infred, press, pull;
	    this.sceneConfig = Config.BalloonFailure;
	    pull = Utils.getSvgChild(Config.SVG.PULL);
	    base = Utils.getSvgChild(Config.SVG.BASE);
	    press = Utils.getSvgChild(Config.SVG.PRESS);
	    infred = Utils.getSvgChild(this.sceneConfig.SVG.Inflate);
	    this.btn = new BtnView([pull, base, press, infred]);
	    this.base = new Base();
	    this.logoType = new LogoType();
	    this.bang = new BangView();
	    this.container.addChildren([this.btn, this.base, this.logoType, this.bang]);
	  };
	
	  BalloonFailure.prototype._onStart = function() {
	    this.container.position.x = 0;
	    this.addChild(this.container);
	  };
	
	  BalloonFailure.prototype._onEnd = function() {
	    this.btn.end();
	    this.bang.end();
	    this.removeChildren();
	  };
	
	  BalloonFailure.prototype._onUpdate = function() {
	    if (this.mode === SceneBase.Mode.Touching || this.mode === SceneBase.Mode.Standby) {
	      this.btn.update();
	    } else if (this.mode === SceneBase.Mode.Effect) {
	      this.btn.morphingUpdate();
	    }
	  };
	
	  BalloonFailure.prototype._onStandby = function() {
	    this.btn.up();
	  };
	
	  BalloonFailure.prototype._onTouchUp = function() {
	    var ref;
	    if (this.mode === SceneBase.Mode.Standby) {
	      return (ref = this.btn) != null ? ref.up() : void 0;
	    }
	  };
	
	  BalloonFailure.prototype._onEffect = function() {
	    var _se;
	    _se = Utils.getSE(this.sceneConfig.SOUND.SE1);
	    SoundManager.play(_se);
	    this.btn.infred().then(this.btn.expansion).then(this.bang.show).then(this.btn.grow).then(this.swap);
	  };
	
	  BalloonFailure.prototype._onSwapping = function() {
	    this.end();
	  };
	
	  return BalloonFailure;
	
	})(SceneBase);
	
	module.exports = BalloonFailure;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var Btn, BtnView, Config, INFRED, MorphablePath, PaperStage, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	Btn = __webpack_require__(10);
	
	MorphablePath = __webpack_require__(12);
	
	PaperStage = __webpack_require__(16);
	
	INFRED = 3;
	
	BtnView = (function(superClass) {
	  extend(BtnView, superClass);
	
	  function BtnView() {
	    this.morphingUpdate = bind(this.morphingUpdate, this);
	    this.grow = bind(this.grow, this);
	    this.expansion = bind(this.expansion, this);
	    return BtnView.__super__.constructor.apply(this, arguments);
	  }
	
	  BtnView.prototype._onInit = function() {
	    this.sceneConfig = Config.BalloonFailure;
	    this.soft = 1;
	  };
	
	  BtnView.prototype.end = function() {
	    this.reset();
	  };
	
	  BtnView.prototype.infred = function() {
	    var df;
	    df = new $.Deferred();
	    TweenMax.to(this.position, 0.2, {
	      y: 0,
	      ease: Circ.easeOut
	    });
	    TweenMax.to(this, 1.1, {
	      morph: INFRED,
	      ease: Circ.easeOut,
	      delay: 0.1,
	      onComplete: df.resolve
	    });
	    return df.promise();
	  };
	
	  BtnView.prototype.expansion = function() {
	    TweenMax.to(this, .10, {
	      morph: INFRED + .05,
	      ease: Sine.easeIn,
	      onComplete: (function(_this) {
	        return function() {
	          return _this.visible = false;
	        };
	      })(this)
	    });
	  };
	
	  BtnView.prototype.grow = function() {
	    var df;
	    df = new $.Deferred();
	    this.morph = 1;
	    this.position.set(0, 22);
	    TweenMax.to(this.position, .4, {
	      delay: .3,
	      y: 0,
	      ease: Expo.easeOut,
	      onComplete: df.resolve,
	      onStart: (function(_this) {
	        return function() {
	          return _this.visible = true;
	        };
	      })(this)
	    });
	    return df.promise();
	  };
	
	  BtnView.prototype.morphingUpdate = function() {
	    if (this._morph === this.morph) {
	      return;
	    }
	    this.stroke.update(this.morph);
	    this.fill.update(this.morph);
	    this._morph = this.morph;
	  };
	
	  return BtnView;
	
	})(Btn);
	
	module.exports = BtnView;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var BangView, Config, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	BangView = (function(superClass) {
	  extend(BangView, superClass);
	
	  function BangView() {
	    this.show = bind(this.show, this);
	    BangView.__super__.constructor.call(this);
	    this.sceneConfig = Config.BalloonFailure;
	    this.bang = this.importSVG(this.sceneConfig.SVG.Bang);
	    Utils.transformInit(this.bang);
	    this.visible = false;
	  }
	
	  BangView.prototype.end = function() {
	    this.visible = false;
	  };
	
	  BangView.prototype.show = function() {
	    var df, scaling, tl;
	    df = new $.Deferred();
	    this.scaling.set(.25, .25);
	    tl = new TimelineMax({
	      onComplete: df.resolve
	    });
	    scaling = this.scaling;
	    tl.to(scaling, .1, {
	      x: 1.5,
	      y: 1.5,
	      delay: .1,
	      ease: Elastic.easeOut,
	      onStart: (function(_this) {
	        return function() {
	          return _this.visible = true;
	        };
	      })(this)
	    });
	    tl.to(scaling, .05, {
	      x: .5,
	      y: .5,
	      ease: Expo.easeOut,
	      onComplete: (function(_this) {
	        return function() {
	          return _this.visible = false;
	        };
	      })(this)
	    });
	    return df.promise();
	  };
	
	  return BangView;
	
	})(paper.Group);
	
	module.exports = BangView;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var BalloonAway, Base, BtnView, Config, LogoType, PaperStage, SceneBase, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	SceneBase = __webpack_require__(22);
	
	BtnView = __webpack_require__(80);
	
	Base = __webpack_require__(13);
	
	LogoType = __webpack_require__(15);
	
	PaperStage = __webpack_require__(16);
	
	SoundManager = __webpack_require__(17);
	
	BalloonAway = (function(superClass) {
	  extend(BalloonAway, superClass);
	
	  function BalloonAway() {
	    this._onSwapping = bind(this._onSwapping, this);
	    this._onEnd = bind(this._onEnd, this);
	    return BalloonAway.__super__.constructor.apply(this, arguments);
	  }
	
	  BalloonAway.prototype._onInit = function() {
	    var _point, _shape, _size, base, infred, press, pull;
	    this.sceneConfig = Config.BalloonAway;
	    pull = Utils.getSvgChild(Config.SVG.PULL);
	    base = Utils.getSvgChild(Config.SVG.BASE);
	    press = Utils.getSvgChild(Config.SVG.PRESS);
	    infred = Utils.getSvgChild(this.sceneConfig.SVG.Inflate);
	    this.btn = new BtnView([pull, base, press, infred]);
	    this.btn.soft = 1;
	    this.base = new Base();
	    this.logoType = new LogoType();
	    this.mask = new paper.Group();
	    this.container.addChildren([this.btn, this.mask, this.base, this.logoType]);
	    _size = new paper.Size(this.container.bounds.width, this.container.bounds.height);
	    _point = new paper.Point(this.container.bounds.x, this.container.bounds.y + this.btn.bounds.height);
	    _shape = new paper.Shape.Rectangle(_point, _size);
	    _shape.fillColor = "#FFFFFF";
	    Utils.transformInit(_shape);
	    this.mask.addChild(_shape);
	  };
	
	  BalloonAway.prototype._onStart = function() {
	    this.container.position.x = 0;
	    this.addChild(this.container);
	  };
	
	  BalloonAway.prototype._onEnd = function() {
	    this.btn.end();
	    this.removeChildren();
	  };
	
	  BalloonAway.prototype._onUpdate = function() {
	    if (this.mode === SceneBase.Mode.Touching || this.mode === SceneBase.Mode.Standby) {
	      this.btn.update();
	    } else if (this.mode === SceneBase.Mode.Effect) {
	      this.btn.morphingUpdate();
	    }
	  };
	
	  BalloonAway.prototype._onStandby = function() {
	    this.btn.up();
	  };
	
	  BalloonAway.prototype._onTouchUp = function() {
	    var ref;
	    if (this.mode === SceneBase.Mode.Standby) {
	      return (ref = this.btn) != null ? ref.up() : void 0;
	    }
	  };
	
	  BalloonAway.prototype._onEffect = function() {
	    var _se;
	    _se = Utils.getSE(this.sceneConfig.SOUND.SE1);
	    SoundManager.play(_se);
	    this.btn.infred().then((function(_this) {
	      return function() {
	        return SoundManager.stop(_se);
	      };
	    })(this)).then(function() {
	      return Utils.wait(100);
	    }).then(this.btn.away).then(this.btn.grow).then(this.swap);
	  };
	
	  BalloonAway.prototype._onSwapping = function() {
	    this.end();
	  };
	
	  return BalloonAway;
	
	})(SceneBase);
	
	module.exports = BalloonAway;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var Btn, BtnView, Config, INFRED, MorphablePath, PaperStage, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	Btn = __webpack_require__(10);
	
	MorphablePath = __webpack_require__(12);
	
	PaperStage = __webpack_require__(16);
	
	SoundManager = __webpack_require__(17);
	
	INFRED = 3;
	
	BtnView = (function(superClass) {
	  extend(BtnView, superClass);
	
	  function BtnView() {
	    this.morphingUpdate = bind(this.morphingUpdate, this);
	    this.grow = bind(this.grow, this);
	    this.away = bind(this.away, this);
	    return BtnView.__super__.constructor.apply(this, arguments);
	  }
	
	  BtnView.prototype._onInit = function() {
	    var _handle, handle1, handle2, handle3, handle4, i, j, len, path;
	    this.sceneConfig = Config.BalloonAway;
	    this.soft = 1;
	    handle1 = Utils.getSvgChild(this.sceneConfig.SVG.Handle1, -1);
	    handle2 = Utils.getSvgChild(this.sceneConfig.SVG.Handle2, -1);
	    handle3 = Utils.getSvgChild(this.sceneConfig.SVG.Handle3, -1);
	    handle4 = Utils.getSvgChild(this.sceneConfig.SVG.Handle4, -1);
	    this.handle = new paper.Group();
	    Utils.transformInit(this.handle);
	    this.insertChild(0, this.handle);
	    this.handle.visible = false;
	    for (i = j = 0, len = handle1.length; j < len; i = ++j) {
	      path = handle1[i];
	      _handle = new MorphablePath([path, handle2[i], handle3[i], handle4[i]]);
	      _handle.strokeWidth = Config.LINE_WIDTH;
	      _handle.strokeColor = Config.COLOR.BTN_PATH;
	      _handle.strokeCap = 'round';
	      if (i === 1) {
	        _handle.fillColor = Config.COLOR.BTN_FILL;
	      }
	      this.handle.addChild(_handle);
	    }
	    this.handleTween = [];
	  };
	
	  BtnView.prototype.end = function() {
	    var j, len, ref, tween;
	    this.reset();
	    this.handle.visible = false;
	    ref = this.handleTween;
	    for (j = 0, len = ref.length; j < len; j++) {
	      tween = ref[j];
	      tween.pause();
	    }
	  };
	
	  BtnView.prototype.infred = function() {
	    var df;
	    df = new $.Deferred();
	    TweenMax.to(this.position, .2, {
	      y: 0,
	      ease: Circ.easeOut
	    });
	    TweenMax.to(this, .5, {
	      morph: INFRED,
	      delay: .1,
	      ease: Back.easeOut,
	      onComplete: df.resolve
	    });
	    return df.promise();
	  };
	
	  BtnView.prototype.away = function() {
	    var _se, df, j, k, len, len1, path, position, ref, ref1, startedTime, tween;
	    df = $.Deferred();
	    _se = Utils.getSE(this.sceneConfig.SOUND.SE2);
	    SoundManager.play(_se);
	    this.handle.visible = true;
	    if (this.handleTween.length > 0) {
	      ref = this.handleTween;
	      for (j = 0, len = ref.length; j < len; j++) {
	        tween = ref[j];
	        tween.play();
	      }
	    } else {
	      ref1 = this.handle.children;
	      for (k = 0, len1 = ref1.length; k < len1; k++) {
	        path = ref1[k];
	        tween = TweenMax.to(path, 4, {
	          morph: 3,
	          onUpdate: path.update,
	          repeat: -1,
	          yoyo: true
	        });
	        tween.play();
	        this.handleTween.push(tween);
	      }
	    }
	    position = this.position;
	    startedTime = new Date().getTime();
	    TweenMax.to(position, 1.5, {
	      y: PaperStage.instance.height / -2 - (this.bounds.height / 2),
	      ease: Sine.easeIn,
	      onUpdate: (function(_this) {
	        return function() {
	          var time;
	          time = new Date().getTime() - startedTime;
	          return _this.position.x = Math.sin(time * 0.0035) * 30 * (time / 3000);
	        };
	      })(this),
	      onComplete: df.resolve
	    });
	    return df.promise();
	  };
	
	  BtnView.prototype.grow = function() {
	    var df;
	    df = new $.Deferred();
	    this.handle.visible = false;
	    this.morph = 1;
	    this.morphingUpdate();
	    this.position.set(0, 22);
	    TweenMax.to(this.position, .4, {
	      y: 0,
	      ease: Expo.easeOut,
	      onComplete: df.resolve,
	      onStart: (function(_this) {
	        return function() {
	          return _this.visible = true;
	        };
	      })(this)
	    });
	    return df.promise();
	  };
	
	  BtnView.prototype.morphingUpdate = function() {
	    if (this._morph === this.morph) {
	      return;
	    }
	    this.stroke.update(this.morph);
	    this.fill.update(this.morph);
	    this._morph = this.morph;
	  };
	
	  return BtnView;
	
	})(Btn);
	
	module.exports = BtnView;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var Base, BtnView, Config, LogoTypeView, Poo, SceneBase, SoundManager, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	SceneBase = __webpack_require__(22);
	
	BtnView = __webpack_require__(82);
	
	Base = __webpack_require__(13);
	
	LogoTypeView = __webpack_require__(83);
	
	SoundManager = __webpack_require__(17);
	
	Poo = (function(superClass) {
	  extend(Poo, superClass);
	
	  function Poo() {
	    this._onSwapping = bind(this._onSwapping, this);
	    this._onEnd = bind(this._onEnd, this);
	    return Poo.__super__.constructor.apply(this, arguments);
	  }
	
	  Poo.prototype._onInit = function() {
	    this.sceneConfig = Config.Poo;
	    this.btn = new BtnView();
	    this.base = new Base();
	    this.logoType = new LogoTypeView();
	    this.container.addChildren([this.btn, this.base, this.logoType]);
	  };
	
	  Poo.prototype._onStart = function() {
	    this.container.position.x = 0;
	    this.addChild(this.container);
	  };
	
	  Poo.prototype._onEnd = function() {
	    this.removeChildren();
	    this.btn.end();
	    this.logoType.end();
	  };
	
	  Poo.prototype._onUpdate = function() {
	    if (this.mode === SceneBase.Mode.Touching || this.mode === SceneBase.Mode.Standby) {
	      this.btn.update();
	    }
	  };
	
	  Poo.prototype._onStandby = function() {
	    this.btn.up();
	  };
	
	  Poo.prototype._onTouchUp = function() {
	    var ref;
	    if (this.mode === SceneBase.Mode.Standby) {
	      if ((ref = this.btn) != null) {
	        ref.up();
	      }
	    }
	  };
	
	  Poo.prototype._onEffect = function() {
	    var _se;
	    _se = Utils.getSE(this.sceneConfig.SOUND.SE1);
	    SoundManager.play(_se);
	    this.logoType.effect();
	    this.btn.effect().then(this.swap);
	  };
	
	  Poo.prototype._onSwapping = function() {
	    TweenMax.to(this.container.position, .6, {
	      x: this.paper.width,
	      ease: Expo.easeInOut,
	      onComplete: this.end
	    });
	    this.nextContainer.position.x = -this.paper.width;
	    this.addChild(this.nextContainer);
	    TweenMax.to(this.nextContainer.position, .6, {
	      x: 0,
	      ease: Expo.easeInOut
	    });
	  };
	
	  return Poo;
	
	})(SceneBase);
	
	module.exports = Poo;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var Btn, BtnView, Config, MorphablePath, PaperStage, Utils,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	Btn = __webpack_require__(10);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	Config = __webpack_require__(11);
	
	PaperStage = __webpack_require__(16);
	
	MorphablePath = __webpack_require__(12);
	
	BtnView = (function(superClass) {
	  extend(BtnView, superClass);
	
	  function BtnView() {
	    return BtnView.__super__.constructor.apply(this, arguments);
	  }
	
	  BtnView.prototype._onInit = function() {
	    var i, j, len, path, poo, poo1, poo2, poo3, poo4, poo5, poo6;
	    this.sceneConfig = Config.Poo;
	    poo1 = Utils.getSvgChild(this.sceneConfig.SVG.Poo1, -1);
	    poo2 = Utils.getSvgChild(this.sceneConfig.SVG.Poo2, -1);
	    poo3 = Utils.getSvgChild(this.sceneConfig.SVG.Poo1, -1);
	    poo4 = Utils.getSvgChild(this.sceneConfig.SVG.Poo3, -1);
	    poo5 = Utils.getSvgChild(this.sceneConfig.SVG.Poo4, -1);
	    poo6 = Utils.getSvgChild(this.sceneConfig.SVG.Poo5, -1);
	    this.poo = new paper.Group();
	    this.addChild(this.poo);
	    this.poo.visible = false;
	    Utils.transformInit(this.poo);
	    for (i = j = 0, len = poo1.length; j < len; i = ++j) {
	      path = poo1[i];
	      poo = new MorphablePath([path, poo2[i], poo3[i], poo4[i], poo5[i], poo6[i]]);
	      poo.strokeCap = 'round';
	      poo.strokeWidth = Config.LINE_WIDTH;
	      poo.strokeColor = Config.COLOR.BTN_PATH;
	      poo.fillColor = Config.COLOR.BTN_FILL;
	      this.poo.addChild(poo);
	    }
	  };
	
	  BtnView.prototype.end = function() {
	    var j, len, path, ref;
	    this.poo.visible = false;
	    ref = this.poo.children;
	    for (j = 0, len = ref.length; j < len; j++) {
	      path = ref[j];
	      path.morph = 0;
	      path.update(path.morph);
	    }
	    this.reset();
	  };
	
	  BtnView.prototype.effect = function() {
	    var df, j, len, path, ref, tl;
	    df = new $.Deferred();
	    this.position.y = 60;
	    TweenMax.to(this.position, .1, {
	      y: 120
	    });
	    ref = this.poo.children;
	    for (j = 0, len = ref.length; j < len; j++) {
	      path = ref[j];
	      tl = new TimelineMax();
	      tl.to(path, .1, {
	        morph: 1,
	        onUpdate: path.update,
	        ease: Expo.easeOut
	      });
	      tl.to(path, .5, {
	        morph: 5,
	        onUpdate: path.update,
	        ease: Sine.easeOut
	      });
	    }
	    setTimeout((function(_this) {
	      return function() {
	        _this.poo.visible = true;
	        _this.fill.visible = false;
	        return _this.stroke.visible = false;
	      };
	    })(this), 30);
	    setTimeout(df.resolve, 550);
	    return df.promise();
	  };
	
	  return BtnView;
	
	})(Btn);
	
	module.exports = BtnView;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var Config, LogoType, LogoTypeView, Utils,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	__webpack_require__(21);
	
	LogoType = __webpack_require__(15);
	
	Config = __webpack_require__(11);
	
	Utils = __webpack_require__(2);
	
	LogoTypeView = (function(superClass) {
	  extend(LogoTypeView, superClass);
	
	  function LogoTypeView() {
	    return LogoTypeView.__super__.constructor.apply(this, arguments);
	  }
	
	  LogoTypeView.prototype.end = function() {
	    this.position.y = 0;
	  };
	
	  LogoTypeView.prototype.effect = function() {
	    TweenMax.to(this.position, .15, {
	      y: 120,
	      ease: Back.easeOut
	    });
	  };
	
	  return LogoTypeView;
	
	})(LogoType);
	
	module.exports = LogoTypeView;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var Gnav, GnavTop, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Gnav = __webpack_require__(85);
	
	Utils = __webpack_require__(2);
	
	GnavTop = (function(superClass) {
	  extend(GnavTop, superClass);
	
	  function GnavTop($wrap, $trigger, $hideContents) {
	    this.$wrap = $wrap;
	    this.$trigger = $trigger;
	    this.$hideContents = $hideContents;
	    this._onResize = bind(this._onResize, this);
	    this._onCompletedClosing = bind(this._onCompletedClosing, this);
	    this._onCompletedOpening = bind(this._onCompletedOpening, this);
	    GnavTop.__super__.constructor.call(this, this.$wrap, this.$trigger, this.$hideContents);
	    this.$wrap.show().velocity({
	      translateY: '100%'
	    }, {
	      duration: 0
	    });
	    return;
	  }
	
	  GnavTop.prototype._open = function() {
	    this.wrapHeight = this._setHight();
	    this.scrollTop = $(window).scrollTop();
	    this.$wrap.velocity({
	      translateY: '100%'
	    }, {
	      duration: 0
	    });
	    this.$wrap.show();
	    this.$wrap.velocity({
	      translateY: '0'
	    }, {
	      duration: this.duration,
	      complete: this._onCompletedOpening
	    });
	    this.$trigger.velocity({
	      translateY: -this.wrapHeight + 95
	    }, {
	      duration: this.duration
	    });
	    this.$hideContents.velocity({
	      translateY: -this.wrapHeight
	    }, {
	      duration: this.duration
	    });
	    this.$trigger.addClass('close');
	    return this.isOpen = true;
	  };
	
	  GnavTop.prototype._onCompletedOpening = function() {
	    this.$hideContents.hide();
	    $('body,html').off(this.scrollEvent, this._onScroll);
	    return this.$wrap.css({
	      position: 'absolute'
	    });
	  };
	
	  GnavTop.prototype._close = function() {
	    this.$hideContents.show();
	    this.wrapHeight = this._setHight();
	    this.$wrap.velocity({
	      translateY: '0'
	    }, {
	      duration: 0
	    });
	    this.$wrap.show();
	    this.$wrap.css({
	      position: 'fixed'
	    });
	    $(window).scrollTop(this.scrollTop);
	    this.$wrap.velocity({
	      translateY: '100%'
	    }, {
	      duration: this.duration,
	      complete: this._onCompletedClosing
	    });
	    this.$trigger.velocity({
	      translateY: 0
	    }, {
	      duration: this.duration
	    });
	    this.$hideContents.velocity({
	      translateY: 0
	    }, {
	      duration: this.duration
	    });
	    this.$trigger.removeClass('close');
	    return this.isOpen = false;
	  };
	
	  GnavTop.prototype._onCompletedClosing = function() {
	    return $('body,html').off(this.scrollEvent, this._onScroll);
	  };
	
	  GnavTop.prototype._onResize = function() {
	    clearTimeout(this._timer);
	    return this._timer = setTimeout((function(_this) {
	      return function() {
	        _this.wrapHeight = _this._setHight();
	        if (_this.isOpen) {
	          _this.$trigger.velocity({
	            translateY: -_this.wrapHeight + 95
	          }, {
	            duration: 0
	          });
	        }
	        if (Utils.ua.fb || Utils.ua.tw) {
	          return _this.$wrap.css({
	            'height': _this.wrapHeight
	          });
	        }
	      };
	    })(this), 100);
	  };
	
	  return GnavTop;
	
	})(Gnav);
	
	module.exports = GnavTop;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var Gnav, Utils,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	Utils = __webpack_require__(2);
	
	Gnav = (function() {
	  function Gnav($wrap, $trigger, $hideContents) {
	    this.$wrap = $wrap;
	    this.$trigger = $trigger;
	    this.$hideContents = $hideContents;
	    this._onResize = bind(this._onResize, this);
	    this._onScroll = bind(this._onScroll, this);
	    this._onCompletedClosing = bind(this._onCompletedClosing, this);
	    this._onCompletedOpening = bind(this._onCompletedOpening, this);
	    this._onClickTrigger = bind(this._onClickTrigger, this);
	    this.isOpen = false;
	    this.wrapHeight = this._setHight();
	    this.scrollEvent = 'wheel mousewheel DOMMouseScroll touchmove.noScroll';
	    this.scrollTop = $(window).scrollTop();
	    this.duration = 300;
	    this.$wrap.show().velocity({
	      translateY: "-100%"
	    }, {
	      duration: 0
	    });
	    this.$trigger.on('click', this._onClickTrigger);
	    $(window).on('resize', this._onResize)["return"];
	  }
	
	  Gnav.prototype._onClickTrigger = function(e) {
	    $('body,html').on(this.scrollEvent, this._onScroll);
	    this.$wrap.css({
	      position: 'fixed'
	    });
	    if (this.isOpen) {
	      return this._close();
	    } else {
	      return this._open();
	    }
	  };
	
	  Gnav.prototype._open = function() {
	    this.wrapHeight = this._setHight();
	    this.scrollTop = $(window).scrollTop();
	    this.$wrap.velocity({
	      translateY: '-100%'
	    }, {
	      duration: 0
	    });
	    this.$wrap.show();
	    this.$wrap.velocity({
	      translateY: '0'
	    }, {
	      duration: this.duration,
	      complete: this._onCompletedOpening
	    });
	    this.$trigger.velocity({
	      translateY: this.wrapHeight - 80
	    }, {
	      duration: this.duration
	    });
	    this.$hideContents.velocity({
	      translateY: this.wrapHeight
	    }, {
	      duration: this.duration
	    });
	    this.$trigger.addClass('close');
	    this.isOpen = true;
	    if (Utils.ua.fb || Utils.ua.tw) {
	      $('body,html').scrollTop(0);
	      return $(window).on('touchmove.noScroll', function(e) {
	        return e.preventDefault();
	      });
	    }
	  };
	
	  Gnav.prototype._onCompletedOpening = function() {
	    this.$hideContents.hide();
	    $('body,html').off(this.scrollEvent, this._onScroll);
	    return this.$wrap.css({
	      position: 'absolute'
	    });
	  };
	
	  Gnav.prototype._close = function() {
	    this.$hideContents.show();
	    this.wrapHeight = this._setHight();
	    this.$wrap.velocity({
	      translateY: '0'
	    }, {
	      duration: 0
	    });
	    this.$wrap.show();
	    this.$wrap.css({
	      position: 'fixed'
	    });
	    $(window).scrollTop(this.scrollTop);
	    this.$wrap.velocity({
	      translateY: '-100%'
	    }, {
	      duration: this.duration,
	      complete: this._onCompletedClosing
	    });
	    this.$trigger.velocity({
	      translateY: 0
	    }, {
	      duration: this.duration
	    });
	    this.$hideContents.velocity({
	      translateY: 0
	    }, {
	      duration: this.duration
	    });
	    this.$trigger.removeClass('close');
	    this.isOpen = false;
	    if (Utils.ua.fb || Utils.ua.tw) {
	      return $(window).off('touchmove.noScroll');
	    }
	  };
	
	  Gnav.prototype._onCompletedClosing = function() {
	    return $('body,html').off(this.scrollEvent, this._onScroll);
	  };
	
	  Gnav.prototype._onScroll = function(e) {
	    return false;
	  };
	
	  Gnav.prototype._onResize = function() {
	    clearTimeout(this._timer);
	    return this._timer = setTimeout((function(_this) {
	      return function() {
	        _this.wrapHeight = _this._setHight();
	        if (_this.isOpen) {
	          _this.$trigger.velocity({
	            translateY: _this.wrapHeight - 80
	          }, {
	            duration: 0
	          });
	        }
	        if (Utils.ua.fb || Utils.ua.tw) {
	          return _this.$wrap.css({
	            'height': _this.wrapHeight
	          });
	        }
	      };
	    })(this), 100);
	  };
	
	  Gnav.prototype._setHight = function() {
	    var _height;
	    return _height = !Utils.ua.fb && !Utils.ua.tw ? $(window).height() : $(window).height() - 100;
	  };
	
	  return Gnav;
	
	})();
	
	module.exports = Gnav;


/***/ }
/******/ ]);