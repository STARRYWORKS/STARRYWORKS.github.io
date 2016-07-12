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
/***/ function(module, exports) {

	var Base, Btn, LINE_WIDTH, LOCALIZABLES, Localizables, Main, SVG, SimpleEvent, SimpleEventDispatcher, SimpleEventListener, Touch,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
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
	
	
	/*
	auth: Kimura
	data: 2016/01/16
	 */
	
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
	    this.onUp = bind(this.onUp, this);
	    this.onMove = bind(this.onMove, this);
	    this.onDown = bind(this.onDown, this);
	    this.$window = $(window);
	    this.$target = $(target);
	    this.$target.on('touchstart', this.onDown);
	    this.$target.on('mousedown', this.onDown);
	    this.downPoint = {
	      x: 0,
	      y: 0
	    };
	    this.vector = {
	      x: 0,
	      y: 0
	    };
	    return;
	  }
	
	  Touch.prototype.onDown = function(event) {
	    this.$window.on('touchend', this.onUp);
	    this.$window.on('touchmove', this.onMove);
	    this.$window.on('mouseup', this.onUp);
	    this.$window.on('mousemove', this.onMove);
	    this.downPoint = {
	      x: event.originalEvent.pageX,
	      y: event.originalEvent.pageY
	    };
	    this.dispatchEvent(Touch.DOWN);
	  };
	
	  Touch.prototype.onMove = function(event) {
	    this.vector.x = event.originalEvent.pageX - this.downPoint.x;
	    this.vector.y = event.originalEvent.pageY - this.downPoint.y;
	    this.dispatchEvent(Touch.MOVE);
	  };
	
	  Touch.prototype.onUp = function(event) {
	    this.$window.off('touchend', this.onUp);
	    this.$window.off('touchmove', this.onMove);
	    this.$window.off('mouseup', this.onUp);
	    this.$window.off('mousemove', this.onMove);
	    this.vector.x = event.originalEvent.pageX - this.downPoint.x;
	    this.vector.y = event.originalEvent.pageY - this.downPoint.y;
	    this.dispatchEvent(Touch.UP);
	  };
	
	  return Touch;
	
	})(SimpleEventDispatcher);
	
	
	/*
	auth: Kimura
	data: 2016/05/20
	 */
	
	SVG = '<svg id="" xmlns="http://www.w3.org/2000/svg" width="145" height="61" viewBox=""> <defs> <style> .cls-1 { fill: none; stroke: black; stroke-linejoin: miter; stroke-width: 5.5px; } </style> </defs> <title>button-svg</title> <g> <path class="cls-1" d="M30,45.5l1.1751-31.3373A9.1833,9.1833,0,0,1,40.1688,5.5C49.8475,5,57.5,5,72.5,5s22.6525,0,32.3312.5a9.1833,9.1833,0,0,1,8.9937,8.6627L115,45.5" transform="translate(0 -4.75)"/> </g> <g> <polyline class="cls-1" points="0 60.75 15 60.75 20 40.75 125 40.75 130 60.75 145 60.75"/> </g> </svg>';
	
	LINE_WIDTH = 5.5;
	
	Btn = (function(superClass) {
	  extend(Btn, superClass);
	
	  function Btn(group) {
	    this.update = bind(this.update, this);
	    Btn.__super__.constructor.call(this, group.children);
	    this.stroke = this.children[0];
	    this.fill = this.stroke.clone();
	    this.fill.strokeWidth = 0;
	    this.fill.fillColor = '#fdf663';
	    this.fill.closed = true;
	    this.insertChild(0, this.fill);
	    this.basePosition = this.position;
	    this.leftBottomSegmentPosition = this.stroke.segments[0].point.subtract(this.basePosition);
	    this.leftTopSegmentPosition = this.stroke.segments[1].point.subtract(this.basePosition);
	    this.leftSegmentPosition = this.stroke.segments[2].point.subtract(this.basePosition);
	    this.topSegmentPosition = this.stroke.segments[3].point.subtract(this.basePosition);
	    this.rightTopSegmentPosition = this.stroke.segments[4].point.subtract(this.basePosition);
	    this.rightSegmentPosition = this.stroke.segments[5].point.subtract(this.basePosition);
	    this.rightBottomSegmentPosition = this.stroke.segments[6].point.subtract(this.basePosition);
	    this.press = 0;
	    this.stroke.setFullySelected(true);
	    this.addAnchor();
	    return;
	  }
	
	  Btn.prototype.setPress = function(press) {
	    return this.press = press;
	  };
	
	  Btn.prototype.update = function() {
	    var p, y;
	    if (this.press < -1) {
	      this.press = -1;
	    } else if (this.press > 2) {
	      this.press = 2;
	    }
	    y = this.press;
	    if (y < 0) {
	      y = 0;
	    } else if (y > 1) {
	      y = 1;
	    }
	    this.position.y = this.basePosition.y + TWEEN.Easing.Sinusoidal.InOut(y) * 20;
	    if (this.press > 1) {
	      p = this.press - 1;
	      this.stroke.segments[3].point.y = this.position.y + this.topSegmentPosition.y + p * 2;
	      this.stroke.segments[1].point.x = this.position.x + this.leftTopSegmentPosition.x + p * -2;
	      this.stroke.segments[1].point.y = this.position.y + this.leftTopSegmentPosition.y + p * -2;
	      this.stroke.segments[2].point.x = this.position.x + this.leftSegmentPosition.x + p * -2;
	      this.stroke.segments[2].point.y = this.position.y + this.leftSegmentPosition.y + p * -2;
	      this.stroke.segments[4].point.x = this.position.x + this.rightTopSegmentPosition.x + p * 2;
	      this.stroke.segments[4].point.y = this.position.y + this.rightTopSegmentPosition.y + p * -2;
	      this.stroke.segments[5].point.x = this.position.x + this.rightSegmentPosition.x + p * 2;
	      this.stroke.segments[5].point.y = this.position.y + this.rightSegmentPosition.y + p * -2;
	      this.position.x = this.basePosition.x;
	    } else if (this.press < 0) {
	      p = this.press;
	      this.stroke.segments[3].point.y = this.position.y + this.topSegmentPosition.y + p * 0.5;
	      this.position.x = this.basePosition.x + Math.sin(new Date().getTime() * 0.03) * 0.5;
	      this.position.y = this.basePosition.y + p * 2.75;
	    } else {
	      this.position.x = this.basePosition.x;
	    }
	  };
	
	  Btn.prototype.release = function() {
	    this.tween = new TWEEN.Tween(this).to({
	      'press': 0
	    }, 100).easing(TWEEN.Easing.Back.Out).start();
	  };
	
	  Btn.prototype.addAnchor = function() {
	    var p, p1, p2, vector;
	    p1 = this.stroke.segments[0].point;
	    p2 = this.stroke.segments[1].point;
	    vector = p2.subtract(p1);
	    vector.length = vector.length * 0.5;
	    p = p1.add(vector);
	    this.stroke.insert(1, p);
	    console.log("======= btn ==========");
	    console.log("@btn.position", this.position);
	    console.log("p1", p1);
	    console.log("p2", p2);
	    console.log("p", p);
	  };
	
	  return Btn;
	
	})(paper.Group);
	
	Base = (function(superClass) {
	  extend(Base, superClass);
	
	  function Base(group) {
	    var vector;
	    Base.__super__.constructor.call(this, group.children);
	    this.stroke = this.children[0];
	    this.fill = this.stroke.clone();
	    this.fill.strokeWidth = 0;
	    this.fill.fillColor = '#e2eced';
	    this.fill.segments.pop();
	    this.fill.segments.shift();
	    this.fill.closed = true;
	    vector = this.fill.segments[0].point.subtract(this.fill.segments[1].point);
	    vector.length = LINE_WIDTH * 0.5;
	    this.fill.segments[0].point = this.fill.segments[0].point.add(vector);
	    vector = this.fill.segments[3].point.subtract(this.fill.segments[2].point);
	    vector.length = LINE_WIDTH * 0.5;
	    this.fill.segments[3].point = this.fill.segments[3].point.add(vector);
	    this.insertChild(0, this.fill);
	    console.log("======= Base ==========");
	    console.log("@base.position", this.position);
	    return;
	  }
	
	  return Base;
	
	})(paper.Group);
	
	Main = (function() {
	  function Main() {
	    this.onResize = bind(this.onResize, this);
	    this.onFrame = bind(this.onFrame, this);
	    this.onUp = bind(this.onUp, this);
	    this.onMove = bind(this.onMove, this);
	    this.onDown = bind(this.onDown, this);
	    var container;
	    this.$canvas = $('#MainCanvas');
	    this.canvas = this.$canvas.get(0);
	    this.context = this.canvas.getContext('2d');
	    Touch.init(this.canvas);
	    this.$window = $(window);
	    paper.setup(this.canvas);
	    paper.project.importSVG(SVG);
	    container = paper.project.layers[0].children[0];
	    container.fillColor = new paper.Color(0, 255, 0);
	    console.log("======= container ==========");
	    console.log("@container.position", container.position);
	    this.btn = new Btn(container.children[0]);
	    this.base = new Base(container.children[1]);
	    this.btnLayer = paper.project.layers[0];
	    console.log("======= btnLayer ==========");
	    console.log("@btnLayer.position", this.btnLayer.position);
	    this.btnLayer.fillColor = new paper.Color(255, 0, 0);
	    this.btnLayer.removeChildren();
	    this.btnLayer.addChild(this.btn);
	    this.btnLayer.addChild(this.base);
	    paper.view.onFrame = this.onFrame;
	    this.$window.on('resize', this.onResize);
	    this.onResize();
	    Touch.sharedInstance.addEventListener(Touch.DOWN, this.onDown);
	    Touch.sharedInstance.addEventListener(Touch.MOVE, this.onMove);
	    Touch.sharedInstance.addEventListener(Touch.UP, this.onUp);
	    return;
	  }
	
	  Main.prototype.onDown = function(event) {};
	
	  Main.prototype.onMove = function(event) {
	    var touch;
	    touch = event.target;
	    this.btn.setPress((touch.vector.y / this.stageHeight) * 10);
	  };
	
	  Main.prototype.onUp = function(event) {
	    this.btn.release();
	  };
	
	  Main.prototype.onFrame = function() {
	    TWEEN.update();
	    this.context.clearRect(0, 0, this.stageWidth, this.stageHeight);
	    paper.view.update(true);
	  };
	
	  Main.prototype.onResize = function() {
	    var scale;
	    this.stageWidth = this.$window.width();
	    this.stageHeight = this.$window.height();
	    this.$canvas.attr('width', this.stageWidth + 'px');
	    this.$canvas.attr('height', this.stageHeight + 'px');
	    this.$canvas.css('width', this.stageWidth + 'px');
	    this.$canvas.css('height', this.stageHeight + 'px');
	    this.btnLayer.matrix = new paper.Matrix();
	    this.btnLayer.position.x = this.stageWidth * 0.5;
	    this.btnLayer.position.y = this.stageHeight * 0.5;
	    scale = (this.stageWidth < this.stageHeight ? this.stageWidth : this.stageHeight) / 320;
	    if (scale > 3) {
	      scale = 3;
	    }
	    this.btnLayer.scale(scale, scale);
	  };
	
	  return Main;
	
	})();
	
	$(function() {
	  return window.main = new Main();
	});


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjBjODk2MGQyMGNmOWVlODBhY2U/MDIyOCoiLCJ3ZWJwYWNrOi8vLy4vX2NvZmZlZS9fbW9jay8wMS1wYXBlcl9wb3NpdGlvbi9tYWluLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ2xDQTtHQUFBOzs7O0FBQUEsZ0JBQWU7R0FDZCxNQUFNO0tBQ0wseUNBQXdDLGtDQURuQztLQUVMLHFCQUFvQixlQUZmO0tBR0wsMENBQXlDLHdCQUhwQztLQUlMLGdCQUFlLGNBSlY7S0FLTCwwQkFBeUIscUJBTHBCO0tBTUwsc0JBQXFCLGtCQU5oQjtLQU9MLDhFQUE2RSxpQ0FQeEU7S0FRTCxrQkFBaUIsaUJBUlo7S0FTTCx1QkFBc0IsYUFUakI7SUFEUTs7O0FBZVQ7OztHQUNMLFlBQUMsS0FBRCxHQUFPLENBQUMsU0FBUyxDQUFDLGVBQVYsSUFBNkIsU0FBUyxDQUFDLFFBQXZDLElBQW1ELFNBQVMsQ0FBQyxZQUE5RCxDQUEyRSxDQUFDLE1BQTVFLENBQW1GLENBQW5GLEVBQXFGLENBQXJGOztHQUVQLFlBQUMsU0FBRCxHQUFXLFNBQUMsT0FBRDtBQUNWO0tBQUEsSUFBRyx5RUFBSDtPQUF1QyxVQUFVLFlBQWEsS0FBQyxLQUFELENBQU8sVUFBckU7O0FBQ0EsWUFBTztHQUZHOzs7Ozs7O0FBSVo7Ozs7O0FBU007R0FDUTtLQUNaLElBQUMsVUFBRCxHQUFhO0dBREQ7O21DQUdiLG1CQUFrQixTQUFDLElBQUQsRUFBTSxRQUFOLEVBQWUsSUFBZjs7T0FBZSxPQUFLOztLQUNyQyxJQUFJLHNCQUFKO09BQXFC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R0FKUTs7a0JBT1QsV0FBVTtBQUNUO0tBQUEsSUFBQyxXQUFELEdBQWMsSUFBQyxRQUFPLENBQUMsS0FBVDtLQUNkLElBQUMsWUFBRCxHQUFlLElBQUMsUUFBTyxDQUFDLE1BQVQ7S0FDZixJQUFDLFFBQU8sQ0FBQyxJQUFULENBQWMsT0FBZCxFQUFzQixJQUFDLFdBQUQsR0FBWSxJQUFsQztLQUNBLElBQUMsUUFBTyxDQUFDLElBQVQsQ0FBYyxRQUFkLEVBQXVCLElBQUMsWUFBRCxHQUFhLElBQXBDO0tBQ0EsSUFBQyxRQUFPLENBQUMsR0FBVCxDQUFhLE9BQWIsRUFBcUIsSUFBQyxXQUFELEdBQVksSUFBakM7S0FDQSxJQUFDLFFBQU8sQ0FBQyxHQUFULENBQWEsUUFBYixFQUFzQixJQUFDLFlBQUQsR0FBYSxJQUFuQztLQUNBLElBQUMsU0FBUSxDQUFDLE1BQVYsR0FBdUIsU0FBSyxDQUFDLE1BQU47S0FDdkIsSUFBQyxTQUFRLENBQUMsUUFBUSxDQUFDLENBQW5CLEdBQXVCLElBQUMsV0FBRCxHQUFjO0tBQ3JDLElBQUMsU0FBUSxDQUFDLFFBQVEsQ0FBQyxDQUFuQixHQUF1QixJQUFDLFlBQUQsR0FBZTtLQUN0QyxRQUFVLENBQUssSUFBQyxXQUFELEdBQWMsSUFBQyxZQUFsQixHQUFtQyxJQUFDLFdBQXBDLEdBQW9ELElBQUMsWUFBdkQsSUFBc0U7S0FDaEYsSUFBRyxRQUFRLENBQVg7T0FBa0IsUUFBUSxFQUExQjs7S0FDQSxJQUFDLFNBQVEsQ0FBQyxLQUFWLENBQWdCLEtBQWhCLEVBQXNCLEtBQXRCO0dBWlM7Ozs7OztBQW1CWCxHQUFFO1VBQ0QsTUFBTSxDQUFDLElBQVAsR0FBa0I7QUFEakIsRUFBRiIsImZpbGUiOiJtb2NrLzAxLXBhcGVyX3Bvc2l0aW9uL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDIwYzg5NjBkMjBjZjllZTgwYWNlXG4gKiovIiwiI1xuIyBMb2NhbGl6YWJsZXPjgq/jg6njgrlcbiNcblxuTE9DQUxJWkFCTEVTID0ge1xuXHQnamEnOiB7XG5cdFx0J1RoaXMgd2ViIHBhZ2UgcmVxdWlyZXMgV2ViR0wgc3VwcG9ydC4nOifjgZPjga7jg5rjg7zjgrjjgpLooajnpLrjgZnjgovjgavjga9XZWJHTOOBq+WvvuW/nOOBl+OBn+ODluODqeOCpuOCtuOBjOW/heimgeOBp+OBmeOAgicsXG5cdFx0J1RoZSB1cmwgaXMgZW1wdHkuJzonVVJM44GM5YWl5Yqb44GV44KM44Gm44GE44G+44Gb44KTJyxcblx0XHQnVGhlIHVybCBhbmQgaW1hZ2UgZmlsZSBhcmUgYm90aCBlbXB0eS4nOidVUkzjgYrjgojjgbPnlLvlg4/jg5XjgqHjgqTjg6vjgYzlhaXlipvjgZXjgozjgabjgYTjgb7jgZvjgpMnLFxuXHRcdCdJbnZhbGlkIHVybC4nOidVUkzjgYzmraPjgZfjgY/jgYLjgorjgb7jgZvjgpMnLFxuXHRcdCdUaGUgdXJsIHdhcyBub3QgZm91bmQuJzonVVJM44Gu55S75YOP44Gr44Ki44Kv44K744K544Gn44GN44G+44Gb44KT44Gn44GX44GfJyxcblx0XHQnTm8gZmFjZSB3YXMgZm91bmQuJzon55S75YOP5Lit44Gr6aGU44GM5qSc5Ye644GV44KM44G+44Gb44KT44Gn44GX44GfJyxcblx0XHQnVGhlIGZhY2UgaXMgbm90IHNtaWxpbmcuIFlvdSBjYW4gb25seSB1cGxvYWQgYSBwaG90byB3aXRoIHNtaWxpbmcgZmFjZShzKS4nOifmpJzlh7rjgZXjgozjgZ/poZTjgYznrJHpoZTjgafjga/jgYLjgorjgb7jgZvjgpPjgILnrJHpoZTjga7lhpnnnJ/jga7jgb/nmbvpjLLjgafjgY3jgb7jgZnjgIInLFxuXHRcdCdVbmtub3duIGVycm9yLic6J+WOn+WboOS4jeaYjuOBruOCqOODqeODvOOBjOeZuueUn+OBl+OBvuOBl+OBnycsXG5cdFx0J1lvdXIgcGFnZSBpcyByZWFkeS4nOifjg5rjg7zjgrjjgpLnlJ/miJDjgZfjgb7jgZfjgZ/jgIInLFxuXHR9XG59XG5cblxuY2xhc3MgTG9jYWxpemFibGVzXG5cdEBsYW5nOiAobmF2aWdhdG9yLmJyb3dzZXJMYW5ndWFnZSB8fCBuYXZpZ2F0b3IubGFuZ3VhZ2UgfHwgbmF2aWdhdG9yLnVzZXJMYW5ndWFnZSkuc3Vic3RyKDAsMilcblxuXHRAbG9jYWxpemU6IChtZXNzYWdlKSAtPlxuXHRcdGlmIExPQ0FMSVpBQkxFU1tAbGFuZ10/W21lc3NhZ2VdPyB0aGVuIG1lc3NhZ2UgPSBMT0NBTElaQUJMRVNbQGxhbmddW21lc3NhZ2VdXG5cdFx0cmV0dXJuIG1lc3NhZ2VcblxuIyMjXG5hdXRoOiBLaW11cmFcbmRhdGE6IDIwMTYvMDEvMTZcbiMjI1xuXG4jXG4jIFNpbXBsZUV2ZW50RGlzcGF0Y2hlcuOCr+ODqeOCuVxuI1xuXG5jbGFzcyBTaW1wbGVFdmVudERpc3BhdGNoZXJcblx0Y29uc3RydWN0b3I6ICgpIC0+XG5cdFx0QGxpc3RlbmVycyA9IHt9XG5cblx0YWRkRXZlbnRMaXN0ZW5lcjogKG5hbWUsY2FsbGJhY2ssYXJncz1bXSkgLT5cblx0XHRpZiAhQGxpc3RlbmVycz8gdGhlbiBAbGlzdGVuZXJzID0ge31cblx0XHRpZiAhQGxpc3RlbmVyc1tuYW1lXT8gdGhlbiBAbGlzdGVuZXJzW25hbWVdID0gW11cblx0XHQjIFRPRE86IOmHjeikh+ODquOCueODiuODvOODgeOCp+ODg+OCr1xuXHRcdEBsaXN0ZW5lcnNbbmFtZV0ucHVzaCggbmV3IFNpbXBsZUV2ZW50TGlzdGVuZXIobmFtZSxjYWxsYmFjayxhcmdzKSApXG5cdFx0cmV0dXJuXG5cblx0cmVtb3ZlRXZlbnRMaXN0ZW5lcjogKG5hbWUsY2FsbGJhY2spIC0+XG5cdFx0aWYgIUBsaXN0ZW5lcnM/IHx8ICFAbGlzdGVuZXJzW25hbWVdPyB0aGVuIHJldHVyblxuXHRcdGlmICggY2FsbGJhY2sgPT0gbnVsbCApXG5cdFx0XHRAbGlzdGVuZXJzW25hbWVdID0gW11cblx0XHRcdHJldHVyblxuXHRcdHdoaWxlICggKGkgPSBAaW5kZXhPZkNhbGxiYWNrKG5hbWUsY2FsbGJhY2spKSA+PSAwIClcblx0XHRcdEBsaXN0ZW5lcnNbbmFtZV0uc3BsaWNlKGksMSlcblx0XHRyZXR1cm5cblxuXHRkaXNwYXRjaEV2ZW50OiAobmFtZSxkYXRhPXt9KSAtPlxuXHRcdGlmICFAbGlzdGVuZXJzPyB8fCAhQGxpc3RlbmVyc1tuYW1lXT8gdGhlbiByZXR1cm5cblx0XHRldmVudCA9IG5ldyBTaW1wbGVFdmVudCh0aGlzLG5hbWUsZGF0YSlcblx0XHRmb3IgbGlzdGVuZXIgaW4gQGxpc3RlbmVyc1tuYW1lXVxuXHRcdFx0bGlzdGVuZXIuZGlzcGF0Y2hFdmVudChldmVudClcblx0XHRyZXR1cm5cblxuXHRpbmRleE9mQ2FsbGJhY2s6IChuYW1lLGNhbGxiYWNrKSAtPlxuXHRcdGZvciBsaXN0ZW5lcixpIGluIEBsaXN0ZW5lcnM/W25hbWVdXG5cdFx0XHRpZiBsaXN0ZW5lci5jYWxsYmFjayA9PSBjYWxsYmFjayB0aGVuIHJldHVybiBpXG5cdFx0cmV0dXJuIC0xXG5cbmNsYXNzIFNpbXBsZUV2ZW50XG5cdGNvbnN0cnVjdG9yOiAodGFyZ2V0LG5hbWUsZGF0YT17fSkgLT5cblx0XHRAdGFyZ2V0ID0gdGFyZ2V0XG5cdFx0QG5hbWUgPSBuYW1lXG5cdFx0QGRhdGEgPSBkYXRhXG5cdFx0cmV0dXJuXG5cblxuY2xhc3MgU2ltcGxlRXZlbnRMaXN0ZW5lclxuXHRjb25zdHJ1Y3RvcjogKG5hbWUsY2FsbGJhY2ssYXJncz1udWxsKSAtPlxuXHRcdEBuYW1lID0gbmFtZVxuXHRcdEBjYWxsYmFjayA9IGNhbGxiYWNrXG5cdFx0QGFyZ3MgPSBhcmdzXG5cdFx0cmV0dXJuXG5cblx0ZGlzcGF0Y2hFdmVudDogKGV2ZW50KSAtPlxuXHRcdGlmIHR5cGVvZihAY2FsbGJhY2spICE9ICdmdW5jdGlvbicgdGhlbiByZXR1cm5cblx0XHRpZiBAYXJncyAmJiBAYXJncy5sZW5ndGggPiAwXG5cdFx0XHRAY2FsbGJhY2suYXBwbHkobnVsbCwgQGFyZ3MpXG5cdFx0ZWxzZVxuXHRcdFx0QGNhbGxiYWNrLmFwcGx5KG51bGwsIFtldmVudF0pXG5cdFx0cmV0dXJuXG5cbiMjI1xuYXV0aDogS2ltdXJhXG5kYXRhOiAyMDE2LzAxLzE2XG4jIyNcblxuI1xuIyBUb3VjaOOCr+ODqeOCuVxuI1xuXG5jbGFzcyBUb3VjaCBleHRlbmRzIFNpbXBsZUV2ZW50RGlzcGF0Y2hlclxuXHRARE9XTlx0PSBcImRvd25cIlxuXHRATU9WRVx0PSBcIm1vdmVcIlxuXHRAVVBcdFx0PSBcInVwXCJcblxuXHRAc2hhcmVkSW5zdGFuY2UgPSBudWxsXG5cdEBpbml0OiAodGFyZ2V0KSAtPlxuXHRcdEBzaGFyZWRJbnN0YW5jZSA9IG5ldyBUb3VjaCh0YXJnZXQpXG5cdFx0cmV0dXJuXG5cblx0Y29uc3RydWN0b3I6ICh0YXJnZXQpIC0+XG5cdFx0QCR3aW5kb3cgPSAkKHdpbmRvdylcblx0XHRAJHRhcmdldCA9ICQodGFyZ2V0KVxuXHRcdEAkdGFyZ2V0Lm9uKCd0b3VjaHN0YXJ0JyxAb25Eb3duKVxuXHRcdEAkdGFyZ2V0Lm9uKCdtb3VzZWRvd24nLEBvbkRvd24pXG5cdFx0QGRvd25Qb2ludCA9IHt4OjAseTowfVxuXHRcdEB2ZWN0b3IgPSB7eDowLHk6MH1cblx0XHRyZXR1cm5cblxuXHRvbkRvd246IChldmVudCkgPT5cblx0XHRAJHdpbmRvdy5vbigndG91Y2hlbmQnLEBvblVwKVxuXHRcdEAkd2luZG93Lm9uKCd0b3VjaG1vdmUnLEBvbk1vdmUpXG5cdFx0QCR3aW5kb3cub24oJ21vdXNldXAnLEBvblVwKVxuXHRcdEAkd2luZG93Lm9uKCdtb3VzZW1vdmUnLEBvbk1vdmUpXG5cdFx0QGRvd25Qb2ludCA9IHt4OmV2ZW50Lm9yaWdpbmFsRXZlbnQucGFnZVgseTpldmVudC5vcmlnaW5hbEV2ZW50LnBhZ2VZfVxuXHRcdEBkaXNwYXRjaEV2ZW50KFRvdWNoLkRPV04pXG5cdFx0cmV0dXJuXG5cblx0b25Nb3ZlOiAoZXZlbnQpID0+XG5cdFx0QHZlY3Rvci54ID0gZXZlbnQub3JpZ2luYWxFdmVudC5wYWdlWCAtIEBkb3duUG9pbnQueFxuXHRcdEB2ZWN0b3IueSA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQucGFnZVkgLSBAZG93blBvaW50Lnlcblx0XHRAZGlzcGF0Y2hFdmVudChUb3VjaC5NT1ZFKVxuXHRcdHJldHVyblxuXG5cdG9uVXA6IChldmVudCkgPT5cblx0XHRAJHdpbmRvdy5vZmYoJ3RvdWNoZW5kJyxAb25VcClcblx0XHRAJHdpbmRvdy5vZmYoJ3RvdWNobW92ZScsQG9uTW92ZSlcblx0XHRAJHdpbmRvdy5vZmYoJ21vdXNldXAnLEBvblVwKVxuXHRcdEAkd2luZG93Lm9mZignbW91c2Vtb3ZlJyxAb25Nb3ZlKVxuXHRcdEB2ZWN0b3IueCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQucGFnZVggLSBAZG93blBvaW50Lnhcblx0XHRAdmVjdG9yLnkgPSBldmVudC5vcmlnaW5hbEV2ZW50LnBhZ2VZIC0gQGRvd25Qb2ludC55XG5cdFx0QGRpc3BhdGNoRXZlbnQoVG91Y2guVVApXG5cblx0XHRyZXR1cm5cblxuIyMjXG5hdXRoOiBLaW11cmFcbmRhdGE6IDIwMTYvMDUvMjBcbiMjI1xuXG5TVkcgPSAnPHN2ZyBpZD1cIlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE0NVwiIGhlaWdodD1cIjYxXCIgdmlld0JveD1cIlwiPlxuICA8ZGVmcz5cbiAgICA8c3R5bGU+XG4gICAgICAuY2xzLTEge1xuICAgICAgICBmaWxsOiBub25lO1xuICAgICAgICBzdHJva2U6IGJsYWNrO1xuICAgICAgICBzdHJva2UtbGluZWpvaW46IG1pdGVyO1xuICAgICAgICBzdHJva2Utd2lkdGg6IDUuNXB4O1xuICAgICAgfVxuICAgIDwvc3R5bGU+XG4gIDwvZGVmcz5cbiAgPHRpdGxlPmJ1dHRvbi1zdmc8L3RpdGxlPlxuICA8Zz5cbiAgICA8cGF0aCBjbGFzcz1cImNscy0xXCIgZD1cIk0zMCw0NS41bDEuMTc1MS0zMS4zMzczQTkuMTgzMyw5LjE4MzMsMCwwLDEsNDAuMTY4OCw1LjVDNDkuODQ3NSw1LDU3LjUsNSw3Mi41LDVzMjIuNjUyNSwwLDMyLjMzMTIuNWE5LjE4MzMsOS4xODMzLDAsMCwxLDguOTkzNyw4LjY2MjdMMTE1LDQ1LjVcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCAtNC43NSlcIi8+XG4gIDwvZz5cbiAgPGc+XG4gICAgPHBvbHlsaW5lIGNsYXNzPVwiY2xzLTFcIiBwb2ludHM9XCIwIDYwLjc1IDE1IDYwLjc1IDIwIDQwLjc1IDEyNSA0MC43NSAxMzAgNjAuNzUgMTQ1IDYwLjc1XCIvPlxuICA8L2c+XG48L3N2Zz5cbidcbkxJTkVfV0lEVEggPSA1LjVcblxuI1xuIyDjg5zjgr/jg7Pjgqrjg5bjgrjjgqfjgq/jg4hcbiMgQHBhcmFtIHtPYmplY3R9IGdyb3VwOiDjg5Hjgrnjg4fjg7zjgr9cbiNcbmNsYXNzIEJ0biBleHRlbmRzIHBhcGVyLkdyb3VwXG5cdGNvbnN0cnVjdG9yOiAoZ3JvdXApIC0+XG5cdFx0c3VwZXIoZ3JvdXAuY2hpbGRyZW4pXG5cdFx0QHN0cm9rZSA9IEBjaGlsZHJlblswXVxuXHRcdCMg5aGX44KK44KS5L2c5oiQXG5cdFx0QGZpbGwgPSBAc3Ryb2tlLmNsb25lKClcblx0XHRAZmlsbC5zdHJva2VXaWR0aCA9IDBcblx0XHRAZmlsbC5maWxsQ29sb3IgPSAnI2ZkZjY2Mydcblx0XHRAZmlsbC5jbG9zZWQgPSB0cnVlXG5cdFx0QGluc2VydENoaWxkKDAsQGZpbGwpXG5cdFx0QGJhc2VQb3NpdGlvbiA9IEBwb3NpdGlvblxuXHRcdEBsZWZ0Qm90dG9tU2VnbWVudFBvc2l0aW9uID0gQHN0cm9rZS5zZWdtZW50c1swXS5wb2ludC5zdWJ0cmFjdChAYmFzZVBvc2l0aW9uKVxuXHRcdEBsZWZ0VG9wU2VnbWVudFBvc2l0aW9uID0gQHN0cm9rZS5zZWdtZW50c1sxXS5wb2ludC5zdWJ0cmFjdChAYmFzZVBvc2l0aW9uKVxuXHRcdEBsZWZ0U2VnbWVudFBvc2l0aW9uID0gQHN0cm9rZS5zZWdtZW50c1syXS5wb2ludC5zdWJ0cmFjdChAYmFzZVBvc2l0aW9uKVxuXHRcdEB0b3BTZWdtZW50UG9zaXRpb24gPSBAc3Ryb2tlLnNlZ21lbnRzWzNdLnBvaW50LnN1YnRyYWN0KEBiYXNlUG9zaXRpb24pXG5cdFx0QHJpZ2h0VG9wU2VnbWVudFBvc2l0aW9uID0gQHN0cm9rZS5zZWdtZW50c1s0XS5wb2ludC5zdWJ0cmFjdChAYmFzZVBvc2l0aW9uKVxuXHRcdEByaWdodFNlZ21lbnRQb3NpdGlvbiA9IEBzdHJva2Uuc2VnbWVudHNbNV0ucG9pbnQuc3VidHJhY3QoQGJhc2VQb3NpdGlvbilcblx0XHRAcmlnaHRCb3R0b21TZWdtZW50UG9zaXRpb24gPSBAc3Ryb2tlLnNlZ21lbnRzWzZdLnBvaW50LnN1YnRyYWN0KEBiYXNlUG9zaXRpb24pXG5cdFx0QHByZXNzID0gMFxuXHRcdEBzdHJva2Uuc2V0RnVsbHlTZWxlY3RlZCh0cnVlKVxuXHRcdEBhZGRBbmNob3IoKVxuXHRcdHJldHVyblxuXG5cdHNldFByZXNzOiAocHJlc3MpIC0+XG5cdFx0QHByZXNzID0gcHJlc3NcbiNcdFx0QHVwZGF0ZSgpXG5cblx0dXBkYXRlOiAoKSA9PlxuXHRcdGlmIEBwcmVzcyA8IC0xIHRoZW4gQHByZXNzID0gLTFcblx0XHRlbHNlIGlmIEBwcmVzcyA+IDIgdGhlbiBAcHJlc3MgPSAyXG5cdFx0IyB55bqn5qiZXG5cdFx0eSA9IEBwcmVzc1xuXHRcdGlmIHkgPCAwIHRoZW4geSA9IDBcblx0XHRlbHNlIGlmIHkgPiAxIHRoZW4geSA9IDFcblx0XHRAcG9zaXRpb24ueSA9IEBiYXNlUG9zaXRpb24ueSArIFRXRUVOLkVhc2luZy5TaW51c29pZGFsLkluT3V0KHkpICogMjBcblx0XHQjIOaKvOOBl+OBmeOBjlxuXHRcdGlmIEBwcmVzcyA+IDFcblx0XHRcdHAgPSBAcHJlc3MgLSAxXG5cdFx0XHQjIOS4i+OBq+WHueOCgFxuXHRcdFx0QHN0cm9rZS5zZWdtZW50c1szXS5wb2ludC55ID0gQHBvc2l0aW9uLnkgKyBAdG9wU2VnbWVudFBvc2l0aW9uLnkgKyBwICogMlxuXG5cdFx0XHQjIOaoquOBq+iGqOOCieOCgFxuXHRcdFx0IyDlt6bkuIog5rC05bmzLTIg5Z6C55u0LTJcblx0XHRcdEBzdHJva2Uuc2VnbWVudHNbMV0ucG9pbnQueCA9IEBwb3NpdGlvbi54ICsgQGxlZnRUb3BTZWdtZW50UG9zaXRpb24ueCArIHAgKiAtMlxuXHRcdFx0QHN0cm9rZS5zZWdtZW50c1sxXS5wb2ludC55ID0gQHBvc2l0aW9uLnkgKyBAbGVmdFRvcFNlZ21lbnRQb3NpdGlvbi55ICsgcCAqIC0yXG5cblx0XHRcdEBzdHJva2Uuc2VnbWVudHNbMl0ucG9pbnQueCA9IEBwb3NpdGlvbi54ICsgQGxlZnRTZWdtZW50UG9zaXRpb24ueCArIHAgKiAtMlxuXHRcdFx0QHN0cm9rZS5zZWdtZW50c1syXS5wb2ludC55ID0gQHBvc2l0aW9uLnkgKyBAbGVmdFNlZ21lbnRQb3NpdGlvbi55ICsgcCAqIC0yXG5cblx0XHRcdCMg5bem5LiLIOawtOW5sy0yXG5cdFx0XHQjIEBzdHJva2Uuc2VnbWVudHNbMF0ucG9pbnQueCA9IEBwb3NpdGlvbi54ICsgQGxlZnRCb3R0b21TZWdtZW50UG9zaXRpb24ueCArIHAgKiAtMlxuXG5cblx0XHRcdCMg5Y+z5LiKIOawtOW5szIg5Z6C55u0LTJcblx0XHRcdEBzdHJva2Uuc2VnbWVudHNbNF0ucG9pbnQueCA9IEBwb3NpdGlvbi54ICsgQHJpZ2h0VG9wU2VnbWVudFBvc2l0aW9uLnggKyBwICogMlxuXHRcdFx0QHN0cm9rZS5zZWdtZW50c1s0XS5wb2ludC55ID0gQHBvc2l0aW9uLnkgKyBAcmlnaHRUb3BTZWdtZW50UG9zaXRpb24ueSArIHAgKiAtMlxuXG5cdFx0XHRAc3Ryb2tlLnNlZ21lbnRzWzVdLnBvaW50LnggPSBAcG9zaXRpb24ueCArIEByaWdodFNlZ21lbnRQb3NpdGlvbi54ICsgcCAqIDJcblx0XHRcdEBzdHJva2Uuc2VnbWVudHNbNV0ucG9pbnQueSA9IEBwb3NpdGlvbi55ICsgQHJpZ2h0U2VnbWVudFBvc2l0aW9uLnkgKyBwICogLTJcblxuXHRcdFx0IyDlj7PkuIsg5rC05bmzMlxuXHRcdFx0IyBAc3Ryb2tlLnNlZ21lbnRzWzZdLnBvaW50LnggPSBAcG9zaXRpb24ueCArIEByaWdodEJvdHRvbVNlZ21lbnRQb3NpdGlvbi54ICsgcCAqIDJcblxuXHRcdFx0QHBvc2l0aW9uLnggPSBAYmFzZVBvc2l0aW9uLnhcblxuIyDlvJXjgaPlvLXjgorjgZnjgY5cblx0XHRlbHNlIGlmIEBwcmVzcyA8IDBcblx0XHRcdHAgPSBAcHJlc3Ncblx0XHRcdEBzdHJva2Uuc2VnbWVudHNbM10ucG9pbnQueSA9IEBwb3NpdGlvbi55ICsgQHRvcFNlZ21lbnRQb3NpdGlvbi55ICsgcCAqIDAuNVxuXHRcdFx0QHBvc2l0aW9uLnggPSBAYmFzZVBvc2l0aW9uLnggKyBNYXRoLnNpbihuZXcgRGF0ZSgpLmdldFRpbWUoKSAqIDAuMDMpICogMC41XG5cdFx0XHRAcG9zaXRpb24ueSA9IEBiYXNlUG9zaXRpb24ueSArIHAgKiAyLjc1XG5cdFx0ZWxzZVxuI1x0XHRcdEBzdHJva2Uuc2VnbWVudHNbM10ucG9pbnQueSA9IEBwb3NpdGlvbi55ICsgQHRvcFNlZ21lbnRQb3NpdGlvbi55XG4jXG4jXHRcdFx0QHN0cm9rZS5zZWdtZW50c1sxXS5wb2ludC54ID0gQHBvc2l0aW9uLnggKyBAbGVmdFRvcFNlZ21lbnRQb3NpdGlvbi54XG4jXHRcdFx0QHN0cm9rZS5zZWdtZW50c1sxXS5wb2ludC55ID0gQHBvc2l0aW9uLnkgKyBAbGVmdFRvcFNlZ21lbnRQb3NpdGlvbi55XG4jXG4jXHRcdFx0QHN0cm9rZS5zZWdtZW50c1syXS5wb2ludC54ID0gQHBvc2l0aW9uLnggKyBAbGVmdFNlZ21lbnRQb3NpdGlvbi54XG4jXHRcdFx0QHN0cm9rZS5zZWdtZW50c1syXS5wb2ludC55ID0gQHBvc2l0aW9uLnkgKyBAbGVmdFNlZ21lbnRQb3NpdGlvbi55XG4jXG4jXHRcdFx0QHN0cm9rZS5zZWdtZW50c1s0XS5wb2ludC5YID0gQHBvc2l0aW9uLlggKyBAcmlnaHRUb3BTZWdtZW50UG9zaXRpb24uWFxuI1x0XHRcdEBzdHJva2Uuc2VnbWVudHNbNF0ucG9pbnQueSA9IEBwb3NpdGlvbi55ICsgQHJpZ2h0VG9wU2VnbWVudFBvc2l0aW9uLnlcbiNcbiNcdFx0XHRAc3Ryb2tlLnNlZ21lbnRzWzVdLnBvaW50LnggPSBAcG9zaXRpb24ueCArIEByaWdodFNlZ21lbnRQb3NpdGlvbi54XG4jXHRcdFx0QHN0cm9rZS5zZWdtZW50c1s1XS5wb2ludC55ID0gQHBvc2l0aW9uLnkgKyBAcmlnaHRTZWdtZW50UG9zaXRpb24ueVxuI1xuXHRcdFx0QHBvc2l0aW9uLnggPSBAYmFzZVBvc2l0aW9uLnhcblxuXHRcdHJldHVyblxuXG5cblx0cmVsZWFzZTogKCkgLT5cblx0XHRAdHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4oQClcblx0XHQudG8oeydwcmVzcyc6IDB9LCAxMDApXG5cdFx0LmVhc2luZyhUV0VFTi5FYXNpbmcuQmFjay5PdXQpXG5cdFx0LnN0YXJ0KClcblx0XHRyZXR1cm5cbiNcbiMg44Ki44Oz44Kr44O844Od44Kk44Oz44OI44Gu6L+95YqgXG4jXG5cdGFkZEFuY2hvcjogKCktPlxuXG5cdFx0IzAg44GoIDHjga7plpPjgavjgqLjg7Pjgqvjg7zjgpLov73liqBcblx0XHRwMSA9IEBzdHJva2Uuc2VnbWVudHNbMF0ucG9pbnRcblx0XHRwMiA9IEBzdHJva2Uuc2VnbWVudHNbMV0ucG9pbnRcblx0XHR2ZWN0b3IgPSBwMi5zdWJ0cmFjdChwMSlcblx0XHR2ZWN0b3IubGVuZ3RoID0gdmVjdG9yLmxlbmd0aCAqIDAuNVxuXHRcdHAgPSBwMS5hZGQodmVjdG9yKVxuXHRcdEBzdHJva2UuaW5zZXJ0KDEscClcblxuXHRcdGNvbnNvbGUubG9nIFwiPT09PT09PSBidG4gPT09PT09PT09PVwiXG5cdFx0Y29uc29sZS5sb2cgXCJAYnRuLnBvc2l0aW9uXCIsIEBwb3NpdGlvblxuXHRcdGNvbnNvbGUubG9nIFwicDFcIiwgcDFcblx0XHRjb25zb2xlLmxvZyBcInAyXCIsIHAyXG5cdFx0Y29uc29sZS5sb2cgXCJwXCIsIHBcblxuXHRcdHJldHVyblxuXG5cbiNcbiMg5Zyf5Y+w44Kq44OW44K444Kn44Kv44OIXG4jIEBwYXJhbSB7T2JqZWN0fSBncm91cDog44OR44K544OH44O844K/XG4jXG5jbGFzcyBCYXNlIGV4dGVuZHMgcGFwZXIuR3JvdXBcblx0Y29uc3RydWN0b3I6IChncm91cCkgLT5cblx0XHRzdXBlcihncm91cC5jaGlsZHJlbilcblx0XHRAc3Ryb2tlID0gQGNoaWxkcmVuWzBdXG5cblx0XHQjIOWcn+WPsOmDqOWIhuOBruWhl+OCiuOCkuS9nOaIkFxuXHRcdEBmaWxsID0gQHN0cm9rZS5jbG9uZSgpXG5cdFx0QGZpbGwuc3Ryb2tlV2lkdGggPSAwXG5cdFx0QGZpbGwuZmlsbENvbG9yID0gJyNlMmVjZWQnXG5cblx0XHQjIOWhl+OCiuOBq+W/heimgeOBquOBhOS4oeerr+OBruODneOCpOODs+ODiOOCkuWJiumZpFxuXHRcdEBmaWxsLnNlZ21lbnRzLnBvcCgpXG5cdFx0QGZpbGwuc2VnbWVudHMuc2hpZnQoKVxuXHRcdEBmaWxsLmNsb3NlZCA9IHRydWVcblxuXHRcdCMg57ea5bmF5YiG44Gg44GR5aGX44KK44KS5Ly444Gw44GZXG5cdFx0dmVjdG9yID0gQGZpbGwuc2VnbWVudHNbMF0ucG9pbnQuc3VidHJhY3QoQGZpbGwuc2VnbWVudHNbMV0ucG9pbnQpXG5cdFx0dmVjdG9yLmxlbmd0aCA9IExJTkVfV0lEVEggKiAwLjVcblx0XHRAZmlsbC5zZWdtZW50c1swXS5wb2ludCA9IEBmaWxsLnNlZ21lbnRzWzBdLnBvaW50LmFkZCh2ZWN0b3IpXG5cdFx0dmVjdG9yID0gQGZpbGwuc2VnbWVudHNbM10ucG9pbnQuc3VidHJhY3QoQGZpbGwuc2VnbWVudHNbMl0ucG9pbnQpXG5cdFx0dmVjdG9yLmxlbmd0aCA9IExJTkVfV0lEVEggKiAwLjVcblx0XHRAZmlsbC5zZWdtZW50c1szXS5wb2ludCA9IEBmaWxsLnNlZ21lbnRzWzNdLnBvaW50LmFkZCh2ZWN0b3IpXG5cblx0XHRAaW5zZXJ0Q2hpbGQoMCxAZmlsbClcblxuXHRcdGNvbnNvbGUubG9nIFwiPT09PT09PSBCYXNlID09PT09PT09PT1cIlxuXHRcdGNvbnNvbGUubG9nIFwiQGJhc2UucG9zaXRpb25cIiwgQHBvc2l0aW9uXG5cblx0XHRyZXR1cm5cblxuI1xuIyBNYWlu44Kv44Op44K5XG4jXG5jbGFzcyBNYWluXG5cdGNvbnN0cnVjdG9yOiAoKSAtPlxuXHRcdEAkY2FudmFzID0gJCgnI01haW5DYW52YXMnKVxuXHRcdEBjYW52YXMgPSBAJGNhbnZhcy5nZXQoMClcblx0XHRAY29udGV4dCA9IEBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuXHRcdFRvdWNoLmluaXQoQGNhbnZhcylcblx0XHRAJHdpbmRvdyA9ICQod2luZG93KVxuXG5cdFx0IyDjgq3jg6Pjg7Pjg5DjgrnmjIflrppcblx0XHRwYXBlci5zZXR1cChAY2FudmFzKVxuXG5cdFx0IyDjg5Xjgqnjg7zjg57jg4Pjg4hTVkfoqq3jgb/ovrzjgb9cblx0XHRwYXBlci5wcm9qZWN0LmltcG9ydFNWRyhTVkcpXG5cdFx0Y29udGFpbmVyID0gcGFwZXIucHJvamVjdC5sYXllcnNbMF0uY2hpbGRyZW5bMF1cblx0XHRjb250YWluZXIuZmlsbENvbG9yID0gbmV3IHBhcGVyLkNvbG9yKDAsMjU1LDApXG5cdFx0IyDjg5Xjgqnjg7zjg57jg4Pjg4jjgpLln7rjgavlho3lrprnvqlcblx0XHRjb25zb2xlLmxvZyBcIj09PT09PT0gY29udGFpbmVyID09PT09PT09PT1cIlxuXHRcdGNvbnNvbGUubG9nIFwiQGNvbnRhaW5lci5wb3NpdGlvblwiLCBjb250YWluZXIucG9zaXRpb25cblxuXHRcdEBidG4gPSBuZXcgQnRuKGNvbnRhaW5lci5jaGlsZHJlblswXSlcblx0XHRAYmFzZSA9IG5ldyBCYXNlKGNvbnRhaW5lci5jaGlsZHJlblsxXSlcblxuXHRcdEBidG5MYXllciA9IHBhcGVyLnByb2plY3QubGF5ZXJzWzBdXG5cdFx0Y29uc29sZS5sb2cgXCI9PT09PT09IGJ0bkxheWVyID09PT09PT09PT1cIlxuXHRcdGNvbnNvbGUubG9nIFwiQGJ0bkxheWVyLnBvc2l0aW9uXCIsIEBidG5MYXllci5wb3NpdGlvblxuXHRcdEBidG5MYXllci5maWxsQ29sb3IgPSBuZXcgcGFwZXIuQ29sb3IoMjU1LDAsMClcblx0XHRAYnRuTGF5ZXIucmVtb3ZlQ2hpbGRyZW4oKVxuXHRcdEBidG5MYXllci5hZGRDaGlsZChAYnRuKVxuXHRcdEBidG5MYXllci5hZGRDaGlsZChAYmFzZSlcblxuXHRcdCMgY29uc29sZS5sb2cgcGFwZXIucHJvamVjdFxuXG5cdFx0I+OCpOODmeODs+ODiOioreWumlxuXHRcdHBhcGVyLnZpZXcub25GcmFtZSA9IEBvbkZyYW1lXG5cdFx0QCR3aW5kb3cub24oJ3Jlc2l6ZScsQG9uUmVzaXplKVxuXHRcdEBvblJlc2l6ZSgpXG5cdFx0VG91Y2guc2hhcmVkSW5zdGFuY2UuYWRkRXZlbnRMaXN0ZW5lcihUb3VjaC5ET1dOLCBAb25Eb3duKVxuXHRcdFRvdWNoLnNoYXJlZEluc3RhbmNlLmFkZEV2ZW50TGlzdGVuZXIoVG91Y2guTU9WRSwgQG9uTW92ZSlcblx0XHRUb3VjaC5zaGFyZWRJbnN0YW5jZS5hZGRFdmVudExpc3RlbmVyKFRvdWNoLlVQLCBAb25VcClcblx0XHRyZXR1cm5cblxuXHRvbkRvd246IChldmVudCkgPT5cblx0XHRyZXR1cm5cblxuXHRvbk1vdmU6IChldmVudCkgPT5cblx0XHR0b3VjaCA9IGV2ZW50LnRhcmdldFxuXHRcdEBidG4uc2V0UHJlc3MgKHRvdWNoLnZlY3Rvci55IC8gQHN0YWdlSGVpZ2h0KSAqIDEwXG5cdFx0cmV0dXJuXG5cblx0b25VcDogKGV2ZW50KSA9PlxuXHRcdEBidG4ucmVsZWFzZSgpXG5cdFx0cmV0dXJuXG5cblx0b25GcmFtZTogKCkgPT5cblx0XHRUV0VFTi51cGRhdGUoKVxuI1x0XHRAYnRuLnVwZGF0ZSgpXG5cdFx0QGNvbnRleHQuY2xlYXJSZWN0KDAsMCxAc3RhZ2VXaWR0aCxAc3RhZ2VIZWlnaHQpXG5cdFx0cGFwZXIudmlldy51cGRhdGUodHJ1ZSlcblx0XHRyZXR1cm5cblxuXHRvblJlc2l6ZTogKCkgPT5cblx0XHRAc3RhZ2VXaWR0aCA9IEAkd2luZG93LndpZHRoKClcblx0XHRAc3RhZ2VIZWlnaHQgPSBAJHdpbmRvdy5oZWlnaHQoKVxuXHRcdEAkY2FudmFzLmF0dHIoJ3dpZHRoJyxAc3RhZ2VXaWR0aCsncHgnKVxuXHRcdEAkY2FudmFzLmF0dHIoJ2hlaWdodCcsQHN0YWdlSGVpZ2h0KydweCcpXG5cdFx0QCRjYW52YXMuY3NzKCd3aWR0aCcsQHN0YWdlV2lkdGgrJ3B4Jylcblx0XHRAJGNhbnZhcy5jc3MoJ2hlaWdodCcsQHN0YWdlSGVpZ2h0KydweCcpXG5cdFx0QGJ0bkxheWVyLm1hdHJpeCA9IG5ldyBwYXBlci5NYXRyaXgoKVxuXHRcdEBidG5MYXllci5wb3NpdGlvbi54ID0gQHN0YWdlV2lkdGggKiAwLjVcblx0XHRAYnRuTGF5ZXIucG9zaXRpb24ueSA9IEBzdGFnZUhlaWdodCAqIDAuNVxuXHRcdHNjYWxlID0gKCAoIGlmIEBzdGFnZVdpZHRoIDwgQHN0YWdlSGVpZ2h0IHRoZW4gQHN0YWdlV2lkdGggZWxzZSBAc3RhZ2VIZWlnaHQpIC8gMzIwIClcblx0XHRpZiBzY2FsZSA+IDMgdGhlbiBzY2FsZSA9IDNcblx0XHRAYnRuTGF5ZXIuc2NhbGUoc2NhbGUsc2NhbGUpXG5cdFx0cmV0dXJuXG5cblxuI1xuIyBET00gUkVBRFlcbiNcbiQoKCktPlxuXHR3aW5kb3cubWFpbiA9IG5ldyBNYWluKClcbilcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vX2NvZmZlZS9fbW9jay8wMS1wYXBlcl9wb3NpdGlvbi9tYWluLmNvZmZlZVxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=