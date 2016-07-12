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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDQ4ZjUzZmI4ZjNkYzZiZWY0OWE/MDg5ZCoqIiwid2VicGFjazovLy8uL19jb2ZmZWUvX21vY2svMDEtcGFwZXJfcG9zaXRpb24vbWFpbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNsQ0E7R0FBQTs7OztBQUFBLGdCQUFlO0dBQ2QsTUFBTTtLQUNMLHlDQUF3QyxrQ0FEbkM7S0FFTCxxQkFBb0IsZUFGZjtLQUdMLDBDQUF5Qyx3QkFIcEM7S0FJTCxnQkFBZSxjQUpWO0tBS0wsMEJBQXlCLHFCQUxwQjtLQU1MLHNCQUFxQixrQkFOaEI7S0FPTCw4RUFBNkUsaUNBUHhFO0tBUUwsa0JBQWlCLGlCQVJaO0tBU0wsdUJBQXNCLGFBVGpCO0lBRFE7OztBQWVUOzs7R0FDTCxZQUFDLEtBQUQsR0FBTyxDQUFDLFNBQVMsQ0FBQyxlQUFWLElBQTZCLFNBQVMsQ0FBQyxRQUF2QyxJQUFtRCxTQUFTLENBQUMsWUFBOUQsQ0FBMkUsQ0FBQyxNQUE1RSxDQUFtRixDQUFuRixFQUFxRixDQUFyRjs7R0FFUCxZQUFDLFNBQUQsR0FBVyxTQUFDLE9BQUQ7QUFDVjtLQUFBLElBQUcseUVBQUg7T0FBdUMsVUFBVSxZQUFhLEtBQUMsS0FBRCxDQUFPLFVBQXJFOztBQUNBLFlBQU87R0FGRzs7Ozs7OztBQUlaOzs7OztBQVNNO0dBQ1E7S0FDWixJQUFDLFVBQUQsR0FBYTtHQUREOzttQ0FHYixtQkFBa0IsU0FBQyxJQUFELEVBQU0sUUFBTixFQUFlLElBQWY7O09BQWUsT0FBSzs7S0FDckMsSUFBSSxzQkFBSjtPQUFx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O0dBSlE7O2tCQU9ULFdBQVU7QUFDVDtLQUFBLElBQUMsV0FBRCxHQUFjLElBQUMsUUFBTyxDQUFDLEtBQVQ7S0FDZCxJQUFDLFlBQUQsR0FBZSxJQUFDLFFBQU8sQ0FBQyxNQUFUO0tBQ2YsSUFBQyxRQUFPLENBQUMsSUFBVCxDQUFjLE9BQWQsRUFBc0IsSUFBQyxXQUFELEdBQVksSUFBbEM7S0FDQSxJQUFDLFFBQU8sQ0FBQyxJQUFULENBQWMsUUFBZCxFQUF1QixJQUFDLFlBQUQsR0FBYSxJQUFwQztLQUNBLElBQUMsUUFBTyxDQUFDLEdBQVQsQ0FBYSxPQUFiLEVBQXFCLElBQUMsV0FBRCxHQUFZLElBQWpDO0tBQ0EsSUFBQyxRQUFPLENBQUMsR0FBVCxDQUFhLFFBQWIsRUFBc0IsSUFBQyxZQUFELEdBQWEsSUFBbkM7S0FDQSxJQUFDLFNBQVEsQ0FBQyxNQUFWLEdBQXVCLFNBQUssQ0FBQyxNQUFOO0tBQ3ZCLElBQUMsU0FBUSxDQUFDLFFBQVEsQ0FBQyxDQUFuQixHQUF1QixJQUFDLFdBQUQsR0FBYztLQUNyQyxJQUFDLFNBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBbkIsR0FBdUIsSUFBQyxZQUFELEdBQWU7S0FDdEMsUUFBVSxDQUFLLElBQUMsV0FBRCxHQUFjLElBQUMsWUFBbEIsR0FBbUMsSUFBQyxXQUFwQyxHQUFvRCxJQUFDLFlBQXZELElBQXNFO0tBQ2hGLElBQUcsUUFBUSxDQUFYO09BQWtCLFFBQVEsRUFBMUI7O0tBQ0EsSUFBQyxTQUFRLENBQUMsS0FBVixDQUFnQixLQUFoQixFQUFzQixLQUF0QjtHQVpTOzs7Ozs7QUFtQlgsR0FBRTtVQUNELE1BQU0sQ0FBQyxJQUFQLEdBQWtCO0FBRGpCLEVBQUYiLCJmaWxlIjoibW9jay8wMS1wYXBlcl9wb3NpdGlvbi9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0NDhmNTNmYjhmM2RjNmJlZjQ5YVxuICoqLyIsIiNcbiMgTG9jYWxpemFibGVz44Kv44Op44K5XG4jXG5cbkxPQ0FMSVpBQkxFUyA9IHtcblx0J2phJzoge1xuXHRcdCdUaGlzIHdlYiBwYWdlIHJlcXVpcmVzIFdlYkdMIHN1cHBvcnQuJzon44GT44Gu44Oa44O844K444KS6KGo56S644GZ44KL44Gr44GvV2ViR0zjgavlr77lv5zjgZfjgZ/jg5bjg6njgqbjgrbjgYzlv4XopoHjgafjgZnjgIInLFxuXHRcdCdUaGUgdXJsIGlzIGVtcHR5Lic6J1VSTOOBjOWFpeWKm+OBleOCjOOBpuOBhOOBvuOBm+OCkycsXG5cdFx0J1RoZSB1cmwgYW5kIGltYWdlIGZpbGUgYXJlIGJvdGggZW1wdHkuJzonVVJM44GK44KI44Gz55S75YOP44OV44Kh44Kk44Or44GM5YWl5Yqb44GV44KM44Gm44GE44G+44Gb44KTJyxcblx0XHQnSW52YWxpZCB1cmwuJzonVVJM44GM5q2j44GX44GP44GC44KK44G+44Gb44KTJyxcblx0XHQnVGhlIHVybCB3YXMgbm90IGZvdW5kLic6J1VSTOOBrueUu+WDj+OBq+OCouOCr+OCu+OCueOBp+OBjeOBvuOBm+OCk+OBp+OBl+OBnycsXG5cdFx0J05vIGZhY2Ugd2FzIGZvdW5kLic6J+eUu+WDj+S4reOBq+mhlOOBjOaknOWHuuOBleOCjOOBvuOBm+OCk+OBp+OBl+OBnycsXG5cdFx0J1RoZSBmYWNlIGlzIG5vdCBzbWlsaW5nLiBZb3UgY2FuIG9ubHkgdXBsb2FkIGEgcGhvdG8gd2l0aCBzbWlsaW5nIGZhY2UocykuJzon5qSc5Ye644GV44KM44Gf6aGU44GM56yR6aGU44Gn44Gv44GC44KK44G+44Gb44KT44CC56yR6aGU44Gu5YaZ55yf44Gu44G/55m76Yyy44Gn44GN44G+44GZ44CCJyxcblx0XHQnVW5rbm93biBlcnJvci4nOifljp/lm6DkuI3mmI7jga7jgqjjg6njg7zjgYznmbrnlJ/jgZfjgb7jgZfjgZ8nLFxuXHRcdCdZb3VyIHBhZ2UgaXMgcmVhZHkuJzon44Oa44O844K444KS55Sf5oiQ44GX44G+44GX44Gf44CCJyxcblx0fVxufVxuXG5cbmNsYXNzIExvY2FsaXphYmxlc1xuXHRAbGFuZzogKG5hdmlnYXRvci5icm93c2VyTGFuZ3VhZ2UgfHwgbmF2aWdhdG9yLmxhbmd1YWdlIHx8IG5hdmlnYXRvci51c2VyTGFuZ3VhZ2UpLnN1YnN0cigwLDIpXG5cblx0QGxvY2FsaXplOiAobWVzc2FnZSkgLT5cblx0XHRpZiBMT0NBTElaQUJMRVNbQGxhbmddP1ttZXNzYWdlXT8gdGhlbiBtZXNzYWdlID0gTE9DQUxJWkFCTEVTW0BsYW5nXVttZXNzYWdlXVxuXHRcdHJldHVybiBtZXNzYWdlXG5cbiMjI1xuYXV0aDogS2ltdXJhXG5kYXRhOiAyMDE2LzAxLzE2XG4jIyNcblxuI1xuIyBTaW1wbGVFdmVudERpc3BhdGNoZXLjgq/jg6njgrlcbiNcblxuY2xhc3MgU2ltcGxlRXZlbnREaXNwYXRjaGVyXG5cdGNvbnN0cnVjdG9yOiAoKSAtPlxuXHRcdEBsaXN0ZW5lcnMgPSB7fVxuXG5cdGFkZEV2ZW50TGlzdGVuZXI6IChuYW1lLGNhbGxiYWNrLGFyZ3M9W10pIC0+XG5cdFx0aWYgIUBsaXN0ZW5lcnM/IHRoZW4gQGxpc3RlbmVycyA9IHt9XG5cdFx0aWYgIUBsaXN0ZW5lcnNbbmFtZV0/IHRoZW4gQGxpc3RlbmVyc1tuYW1lXSA9IFtdXG5cdFx0IyBUT0RPOiDph43opIfjg6rjgrnjg4rjg7zjg4Hjgqfjg4Pjgq9cblx0XHRAbGlzdGVuZXJzW25hbWVdLnB1c2goIG5ldyBTaW1wbGVFdmVudExpc3RlbmVyKG5hbWUsY2FsbGJhY2ssYXJncykgKVxuXHRcdHJldHVyblxuXG5cdHJlbW92ZUV2ZW50TGlzdGVuZXI6IChuYW1lLGNhbGxiYWNrKSAtPlxuXHRcdGlmICFAbGlzdGVuZXJzPyB8fCAhQGxpc3RlbmVyc1tuYW1lXT8gdGhlbiByZXR1cm5cblx0XHRpZiAoIGNhbGxiYWNrID09IG51bGwgKVxuXHRcdFx0QGxpc3RlbmVyc1tuYW1lXSA9IFtdXG5cdFx0XHRyZXR1cm5cblx0XHR3aGlsZSAoIChpID0gQGluZGV4T2ZDYWxsYmFjayhuYW1lLGNhbGxiYWNrKSkgPj0gMCApXG5cdFx0XHRAbGlzdGVuZXJzW25hbWVdLnNwbGljZShpLDEpXG5cdFx0cmV0dXJuXG5cblx0ZGlzcGF0Y2hFdmVudDogKG5hbWUsZGF0YT17fSkgLT5cblx0XHRpZiAhQGxpc3RlbmVycz8gfHwgIUBsaXN0ZW5lcnNbbmFtZV0/IHRoZW4gcmV0dXJuXG5cdFx0ZXZlbnQgPSBuZXcgU2ltcGxlRXZlbnQodGhpcyxuYW1lLGRhdGEpXG5cdFx0Zm9yIGxpc3RlbmVyIGluIEBsaXN0ZW5lcnNbbmFtZV1cblx0XHRcdGxpc3RlbmVyLmRpc3BhdGNoRXZlbnQoZXZlbnQpXG5cdFx0cmV0dXJuXG5cblx0aW5kZXhPZkNhbGxiYWNrOiAobmFtZSxjYWxsYmFjaykgLT5cblx0XHRmb3IgbGlzdGVuZXIsaSBpbiBAbGlzdGVuZXJzP1tuYW1lXVxuXHRcdFx0aWYgbGlzdGVuZXIuY2FsbGJhY2sgPT0gY2FsbGJhY2sgdGhlbiByZXR1cm4gaVxuXHRcdHJldHVybiAtMVxuXG5jbGFzcyBTaW1wbGVFdmVudFxuXHRjb25zdHJ1Y3RvcjogKHRhcmdldCxuYW1lLGRhdGE9e30pIC0+XG5cdFx0QHRhcmdldCA9IHRhcmdldFxuXHRcdEBuYW1lID0gbmFtZVxuXHRcdEBkYXRhID0gZGF0YVxuXHRcdHJldHVyblxuXG5cbmNsYXNzIFNpbXBsZUV2ZW50TGlzdGVuZXJcblx0Y29uc3RydWN0b3I6IChuYW1lLGNhbGxiYWNrLGFyZ3M9bnVsbCkgLT5cblx0XHRAbmFtZSA9IG5hbWVcblx0XHRAY2FsbGJhY2sgPSBjYWxsYmFja1xuXHRcdEBhcmdzID0gYXJnc1xuXHRcdHJldHVyblxuXG5cdGRpc3BhdGNoRXZlbnQ6IChldmVudCkgLT5cblx0XHRpZiB0eXBlb2YoQGNhbGxiYWNrKSAhPSAnZnVuY3Rpb24nIHRoZW4gcmV0dXJuXG5cdFx0aWYgQGFyZ3MgJiYgQGFyZ3MubGVuZ3RoID4gMFxuXHRcdFx0QGNhbGxiYWNrLmFwcGx5KG51bGwsIEBhcmdzKVxuXHRcdGVsc2Vcblx0XHRcdEBjYWxsYmFjay5hcHBseShudWxsLCBbZXZlbnRdKVxuXHRcdHJldHVyblxuXG4jIyNcbmF1dGg6IEtpbXVyYVxuZGF0YTogMjAxNi8wMS8xNlxuIyMjXG5cbiNcbiMgVG91Y2jjgq/jg6njgrlcbiNcblxuY2xhc3MgVG91Y2ggZXh0ZW5kcyBTaW1wbGVFdmVudERpc3BhdGNoZXJcblx0QERPV05cdD0gXCJkb3duXCJcblx0QE1PVkVcdD0gXCJtb3ZlXCJcblx0QFVQXHRcdD0gXCJ1cFwiXG5cblx0QHNoYXJlZEluc3RhbmNlID0gbnVsbFxuXHRAaW5pdDogKHRhcmdldCkgLT5cblx0XHRAc2hhcmVkSW5zdGFuY2UgPSBuZXcgVG91Y2godGFyZ2V0KVxuXHRcdHJldHVyblxuXG5cdGNvbnN0cnVjdG9yOiAodGFyZ2V0KSAtPlxuXHRcdEAkd2luZG93ID0gJCh3aW5kb3cpXG5cdFx0QCR0YXJnZXQgPSAkKHRhcmdldClcblx0XHRAJHRhcmdldC5vbigndG91Y2hzdGFydCcsQG9uRG93bilcblx0XHRAJHRhcmdldC5vbignbW91c2Vkb3duJyxAb25Eb3duKVxuXHRcdEBkb3duUG9pbnQgPSB7eDowLHk6MH1cblx0XHRAdmVjdG9yID0ge3g6MCx5OjB9XG5cdFx0cmV0dXJuXG5cblx0b25Eb3duOiAoZXZlbnQpID0+XG5cdFx0QCR3aW5kb3cub24oJ3RvdWNoZW5kJyxAb25VcClcblx0XHRAJHdpbmRvdy5vbigndG91Y2htb3ZlJyxAb25Nb3ZlKVxuXHRcdEAkd2luZG93Lm9uKCdtb3VzZXVwJyxAb25VcClcblx0XHRAJHdpbmRvdy5vbignbW91c2Vtb3ZlJyxAb25Nb3ZlKVxuXHRcdEBkb3duUG9pbnQgPSB7eDpldmVudC5vcmlnaW5hbEV2ZW50LnBhZ2VYLHk6ZXZlbnQub3JpZ2luYWxFdmVudC5wYWdlWX1cblx0XHRAZGlzcGF0Y2hFdmVudChUb3VjaC5ET1dOKVxuXHRcdHJldHVyblxuXG5cdG9uTW92ZTogKGV2ZW50KSA9PlxuXHRcdEB2ZWN0b3IueCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQucGFnZVggLSBAZG93blBvaW50Lnhcblx0XHRAdmVjdG9yLnkgPSBldmVudC5vcmlnaW5hbEV2ZW50LnBhZ2VZIC0gQGRvd25Qb2ludC55XG5cdFx0QGRpc3BhdGNoRXZlbnQoVG91Y2guTU9WRSlcblx0XHRyZXR1cm5cblxuXHRvblVwOiAoZXZlbnQpID0+XG5cdFx0QCR3aW5kb3cub2ZmKCd0b3VjaGVuZCcsQG9uVXApXG5cdFx0QCR3aW5kb3cub2ZmKCd0b3VjaG1vdmUnLEBvbk1vdmUpXG5cdFx0QCR3aW5kb3cub2ZmKCdtb3VzZXVwJyxAb25VcClcblx0XHRAJHdpbmRvdy5vZmYoJ21vdXNlbW92ZScsQG9uTW92ZSlcblx0XHRAdmVjdG9yLnggPSBldmVudC5vcmlnaW5hbEV2ZW50LnBhZ2VYIC0gQGRvd25Qb2ludC54XG5cdFx0QHZlY3Rvci55ID0gZXZlbnQub3JpZ2luYWxFdmVudC5wYWdlWSAtIEBkb3duUG9pbnQueVxuXHRcdEBkaXNwYXRjaEV2ZW50KFRvdWNoLlVQKVxuXG5cdFx0cmV0dXJuXG5cbiMjI1xuYXV0aDogS2ltdXJhXG5kYXRhOiAyMDE2LzA1LzIwXG4jIyNcblxuU1ZHID0gJzxzdmcgaWQ9XCJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNDVcIiBoZWlnaHQ9XCI2MVwiIHZpZXdCb3g9XCJcIj5cbiAgPGRlZnM+XG4gICAgPHN0eWxlPlxuICAgICAgLmNscy0xIHtcbiAgICAgICAgZmlsbDogbm9uZTtcbiAgICAgICAgc3Ryb2tlOiBibGFjaztcbiAgICAgICAgc3Ryb2tlLWxpbmVqb2luOiBtaXRlcjtcbiAgICAgICAgc3Ryb2tlLXdpZHRoOiA1LjVweDtcbiAgICAgIH1cbiAgICA8L3N0eWxlPlxuICA8L2RlZnM+XG4gIDx0aXRsZT5idXR0b24tc3ZnPC90aXRsZT5cbiAgPGc+XG4gICAgPHBhdGggY2xhc3M9XCJjbHMtMVwiIGQ9XCJNMzAsNDUuNWwxLjE3NTEtMzEuMzM3M0E5LjE4MzMsOS4xODMzLDAsMCwxLDQwLjE2ODgsNS41QzQ5Ljg0NzUsNSw1Ny41LDUsNzIuNSw1czIyLjY1MjUsMCwzMi4zMzEyLjVhOS4xODMzLDkuMTgzMywwLDAsMSw4Ljk5MzcsOC42NjI3TDExNSw0NS41XCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAgLTQuNzUpXCIvPlxuICA8L2c+XG4gIDxnPlxuICAgIDxwb2x5bGluZSBjbGFzcz1cImNscy0xXCIgcG9pbnRzPVwiMCA2MC43NSAxNSA2MC43NSAyMCA0MC43NSAxMjUgNDAuNzUgMTMwIDYwLjc1IDE0NSA2MC43NVwiLz5cbiAgPC9nPlxuPC9zdmc+XG4nXG5MSU5FX1dJRFRIID0gNS41XG5cbiNcbiMg44Oc44K/44Oz44Kq44OW44K444Kn44Kv44OIXG4jIEBwYXJhbSB7T2JqZWN0fSBncm91cDog44OR44K544OH44O844K/XG4jXG5jbGFzcyBCdG4gZXh0ZW5kcyBwYXBlci5Hcm91cFxuXHRjb25zdHJ1Y3RvcjogKGdyb3VwKSAtPlxuXHRcdHN1cGVyKGdyb3VwLmNoaWxkcmVuKVxuXHRcdEBzdHJva2UgPSBAY2hpbGRyZW5bMF1cblx0XHQjIOWhl+OCiuOCkuS9nOaIkFxuXHRcdEBmaWxsID0gQHN0cm9rZS5jbG9uZSgpXG5cdFx0QGZpbGwuc3Ryb2tlV2lkdGggPSAwXG5cdFx0QGZpbGwuZmlsbENvbG9yID0gJyNmZGY2NjMnXG5cdFx0QGZpbGwuY2xvc2VkID0gdHJ1ZVxuXHRcdEBpbnNlcnRDaGlsZCgwLEBmaWxsKVxuXHRcdEBiYXNlUG9zaXRpb24gPSBAcG9zaXRpb25cblx0XHRAbGVmdEJvdHRvbVNlZ21lbnRQb3NpdGlvbiA9IEBzdHJva2Uuc2VnbWVudHNbMF0ucG9pbnQuc3VidHJhY3QoQGJhc2VQb3NpdGlvbilcblx0XHRAbGVmdFRvcFNlZ21lbnRQb3NpdGlvbiA9IEBzdHJva2Uuc2VnbWVudHNbMV0ucG9pbnQuc3VidHJhY3QoQGJhc2VQb3NpdGlvbilcblx0XHRAbGVmdFNlZ21lbnRQb3NpdGlvbiA9IEBzdHJva2Uuc2VnbWVudHNbMl0ucG9pbnQuc3VidHJhY3QoQGJhc2VQb3NpdGlvbilcblx0XHRAdG9wU2VnbWVudFBvc2l0aW9uID0gQHN0cm9rZS5zZWdtZW50c1szXS5wb2ludC5zdWJ0cmFjdChAYmFzZVBvc2l0aW9uKVxuXHRcdEByaWdodFRvcFNlZ21lbnRQb3NpdGlvbiA9IEBzdHJva2Uuc2VnbWVudHNbNF0ucG9pbnQuc3VidHJhY3QoQGJhc2VQb3NpdGlvbilcblx0XHRAcmlnaHRTZWdtZW50UG9zaXRpb24gPSBAc3Ryb2tlLnNlZ21lbnRzWzVdLnBvaW50LnN1YnRyYWN0KEBiYXNlUG9zaXRpb24pXG5cdFx0QHJpZ2h0Qm90dG9tU2VnbWVudFBvc2l0aW9uID0gQHN0cm9rZS5zZWdtZW50c1s2XS5wb2ludC5zdWJ0cmFjdChAYmFzZVBvc2l0aW9uKVxuXHRcdEBwcmVzcyA9IDBcblx0XHRAc3Ryb2tlLnNldEZ1bGx5U2VsZWN0ZWQodHJ1ZSlcblx0XHRAYWRkQW5jaG9yKClcblx0XHRyZXR1cm5cblxuXHRzZXRQcmVzczogKHByZXNzKSAtPlxuXHRcdEBwcmVzcyA9IHByZXNzXG4jXHRcdEB1cGRhdGUoKVxuXG5cdHVwZGF0ZTogKCkgPT5cblx0XHRpZiBAcHJlc3MgPCAtMSB0aGVuIEBwcmVzcyA9IC0xXG5cdFx0ZWxzZSBpZiBAcHJlc3MgPiAyIHRoZW4gQHByZXNzID0gMlxuXHRcdCMgeeW6p+aomVxuXHRcdHkgPSBAcHJlc3Ncblx0XHRpZiB5IDwgMCB0aGVuIHkgPSAwXG5cdFx0ZWxzZSBpZiB5ID4gMSB0aGVuIHkgPSAxXG5cdFx0QHBvc2l0aW9uLnkgPSBAYmFzZVBvc2l0aW9uLnkgKyBUV0VFTi5FYXNpbmcuU2ludXNvaWRhbC5Jbk91dCh5KSAqIDIwXG5cdFx0IyDmirzjgZfjgZnjgY5cblx0XHRpZiBAcHJlc3MgPiAxXG5cdFx0XHRwID0gQHByZXNzIC0gMVxuXHRcdFx0IyDkuIvjgavlh7njgoBcblx0XHRcdEBzdHJva2Uuc2VnbWVudHNbM10ucG9pbnQueSA9IEBwb3NpdGlvbi55ICsgQHRvcFNlZ21lbnRQb3NpdGlvbi55ICsgcCAqIDJcblxuXHRcdFx0IyDmqKrjgavohqjjgonjgoBcblx0XHRcdCMg5bem5LiKIOawtOW5sy0yIOWeguebtC0yXG5cdFx0XHRAc3Ryb2tlLnNlZ21lbnRzWzFdLnBvaW50LnggPSBAcG9zaXRpb24ueCArIEBsZWZ0VG9wU2VnbWVudFBvc2l0aW9uLnggKyBwICogLTJcblx0XHRcdEBzdHJva2Uuc2VnbWVudHNbMV0ucG9pbnQueSA9IEBwb3NpdGlvbi55ICsgQGxlZnRUb3BTZWdtZW50UG9zaXRpb24ueSArIHAgKiAtMlxuXG5cdFx0XHRAc3Ryb2tlLnNlZ21lbnRzWzJdLnBvaW50LnggPSBAcG9zaXRpb24ueCArIEBsZWZ0U2VnbWVudFBvc2l0aW9uLnggKyBwICogLTJcblx0XHRcdEBzdHJva2Uuc2VnbWVudHNbMl0ucG9pbnQueSA9IEBwb3NpdGlvbi55ICsgQGxlZnRTZWdtZW50UG9zaXRpb24ueSArIHAgKiAtMlxuXG5cdFx0XHQjIOW3puS4iyDmsLTlubMtMlxuXHRcdFx0IyBAc3Ryb2tlLnNlZ21lbnRzWzBdLnBvaW50LnggPSBAcG9zaXRpb24ueCArIEBsZWZ0Qm90dG9tU2VnbWVudFBvc2l0aW9uLnggKyBwICogLTJcblxuXG5cdFx0XHQjIOWPs+S4iiDmsLTlubMyIOWeguebtC0yXG5cdFx0XHRAc3Ryb2tlLnNlZ21lbnRzWzRdLnBvaW50LnggPSBAcG9zaXRpb24ueCArIEByaWdodFRvcFNlZ21lbnRQb3NpdGlvbi54ICsgcCAqIDJcblx0XHRcdEBzdHJva2Uuc2VnbWVudHNbNF0ucG9pbnQueSA9IEBwb3NpdGlvbi55ICsgQHJpZ2h0VG9wU2VnbWVudFBvc2l0aW9uLnkgKyBwICogLTJcblxuXHRcdFx0QHN0cm9rZS5zZWdtZW50c1s1XS5wb2ludC54ID0gQHBvc2l0aW9uLnggKyBAcmlnaHRTZWdtZW50UG9zaXRpb24ueCArIHAgKiAyXG5cdFx0XHRAc3Ryb2tlLnNlZ21lbnRzWzVdLnBvaW50LnkgPSBAcG9zaXRpb24ueSArIEByaWdodFNlZ21lbnRQb3NpdGlvbi55ICsgcCAqIC0yXG5cblx0XHRcdCMg5Y+z5LiLIOawtOW5szJcblx0XHRcdCMgQHN0cm9rZS5zZWdtZW50c1s2XS5wb2ludC54ID0gQHBvc2l0aW9uLnggKyBAcmlnaHRCb3R0b21TZWdtZW50UG9zaXRpb24ueCArIHAgKiAyXG5cblx0XHRcdEBwb3NpdGlvbi54ID0gQGJhc2VQb3NpdGlvbi54XG5cbiMg5byV44Gj5by144KK44GZ44GOXG5cdFx0ZWxzZSBpZiBAcHJlc3MgPCAwXG5cdFx0XHRwID0gQHByZXNzXG5cdFx0XHRAc3Ryb2tlLnNlZ21lbnRzWzNdLnBvaW50LnkgPSBAcG9zaXRpb24ueSArIEB0b3BTZWdtZW50UG9zaXRpb24ueSArIHAgKiAwLjVcblx0XHRcdEBwb3NpdGlvbi54ID0gQGJhc2VQb3NpdGlvbi54ICsgTWF0aC5zaW4obmV3IERhdGUoKS5nZXRUaW1lKCkgKiAwLjAzKSAqIDAuNVxuXHRcdFx0QHBvc2l0aW9uLnkgPSBAYmFzZVBvc2l0aW9uLnkgKyBwICogMi43NVxuXHRcdGVsc2VcbiNcdFx0XHRAc3Ryb2tlLnNlZ21lbnRzWzNdLnBvaW50LnkgPSBAcG9zaXRpb24ueSArIEB0b3BTZWdtZW50UG9zaXRpb24ueVxuI1xuI1x0XHRcdEBzdHJva2Uuc2VnbWVudHNbMV0ucG9pbnQueCA9IEBwb3NpdGlvbi54ICsgQGxlZnRUb3BTZWdtZW50UG9zaXRpb24ueFxuI1x0XHRcdEBzdHJva2Uuc2VnbWVudHNbMV0ucG9pbnQueSA9IEBwb3NpdGlvbi55ICsgQGxlZnRUb3BTZWdtZW50UG9zaXRpb24ueVxuI1xuI1x0XHRcdEBzdHJva2Uuc2VnbWVudHNbMl0ucG9pbnQueCA9IEBwb3NpdGlvbi54ICsgQGxlZnRTZWdtZW50UG9zaXRpb24ueFxuI1x0XHRcdEBzdHJva2Uuc2VnbWVudHNbMl0ucG9pbnQueSA9IEBwb3NpdGlvbi55ICsgQGxlZnRTZWdtZW50UG9zaXRpb24ueVxuI1xuI1x0XHRcdEBzdHJva2Uuc2VnbWVudHNbNF0ucG9pbnQuWCA9IEBwb3NpdGlvbi5YICsgQHJpZ2h0VG9wU2VnbWVudFBvc2l0aW9uLlhcbiNcdFx0XHRAc3Ryb2tlLnNlZ21lbnRzWzRdLnBvaW50LnkgPSBAcG9zaXRpb24ueSArIEByaWdodFRvcFNlZ21lbnRQb3NpdGlvbi55XG4jXG4jXHRcdFx0QHN0cm9rZS5zZWdtZW50c1s1XS5wb2ludC54ID0gQHBvc2l0aW9uLnggKyBAcmlnaHRTZWdtZW50UG9zaXRpb24ueFxuI1x0XHRcdEBzdHJva2Uuc2VnbWVudHNbNV0ucG9pbnQueSA9IEBwb3NpdGlvbi55ICsgQHJpZ2h0U2VnbWVudFBvc2l0aW9uLnlcbiNcblx0XHRcdEBwb3NpdGlvbi54ID0gQGJhc2VQb3NpdGlvbi54XG5cblx0XHRyZXR1cm5cblxuXG5cdHJlbGVhc2U6ICgpIC0+XG5cdFx0QHR3ZWVuID0gbmV3IFRXRUVOLlR3ZWVuKEApXG5cdFx0LnRvKHsncHJlc3MnOiAwfSwgMTAwKVxuXHRcdC5lYXNpbmcoVFdFRU4uRWFzaW5nLkJhY2suT3V0KVxuXHRcdC5zdGFydCgpXG5cdFx0cmV0dXJuXG4jXG4jIOOCouODs+OCq+ODvOODneOCpOODs+ODiOOBrui/veWKoFxuI1xuXHRhZGRBbmNob3I6ICgpLT5cblxuXHRcdCMwIOOBqCAx44Gu6ZaT44Gr44Ki44Oz44Kr44O844KS6L+95YqgXG5cdFx0cDEgPSBAc3Ryb2tlLnNlZ21lbnRzWzBdLnBvaW50XG5cdFx0cDIgPSBAc3Ryb2tlLnNlZ21lbnRzWzFdLnBvaW50XG5cdFx0dmVjdG9yID0gcDIuc3VidHJhY3QocDEpXG5cdFx0dmVjdG9yLmxlbmd0aCA9IHZlY3Rvci5sZW5ndGggKiAwLjVcblx0XHRwID0gcDEuYWRkKHZlY3Rvcilcblx0XHRAc3Ryb2tlLmluc2VydCgxLHApXG5cblx0XHRjb25zb2xlLmxvZyBcIj09PT09PT0gYnRuID09PT09PT09PT1cIlxuXHRcdGNvbnNvbGUubG9nIFwiQGJ0bi5wb3NpdGlvblwiLCBAcG9zaXRpb25cblx0XHRjb25zb2xlLmxvZyBcInAxXCIsIHAxXG5cdFx0Y29uc29sZS5sb2cgXCJwMlwiLCBwMlxuXHRcdGNvbnNvbGUubG9nIFwicFwiLCBwXG5cblx0XHRyZXR1cm5cblxuXG4jXG4jIOWcn+WPsOOCquODluOCuOOCp+OCr+ODiFxuIyBAcGFyYW0ge09iamVjdH0gZ3JvdXA6IOODkeOCueODh+ODvOOCv1xuI1xuY2xhc3MgQmFzZSBleHRlbmRzIHBhcGVyLkdyb3VwXG5cdGNvbnN0cnVjdG9yOiAoZ3JvdXApIC0+XG5cdFx0c3VwZXIoZ3JvdXAuY2hpbGRyZW4pXG5cdFx0QHN0cm9rZSA9IEBjaGlsZHJlblswXVxuXG5cdFx0IyDlnJ/lj7Dpg6jliIbjga7loZfjgorjgpLkvZzmiJBcblx0XHRAZmlsbCA9IEBzdHJva2UuY2xvbmUoKVxuXHRcdEBmaWxsLnN0cm9rZVdpZHRoID0gMFxuXHRcdEBmaWxsLmZpbGxDb2xvciA9ICcjZTJlY2VkJ1xuXG5cdFx0IyDloZfjgorjgavlv4XopoHjgarjgYTkuKHnq6/jga7jg53jgqTjg7Pjg4jjgpLliYrpmaRcblx0XHRAZmlsbC5zZWdtZW50cy5wb3AoKVxuXHRcdEBmaWxsLnNlZ21lbnRzLnNoaWZ0KClcblx0XHRAZmlsbC5jbG9zZWQgPSB0cnVlXG5cblx0XHQjIOe3muW5heWIhuOBoOOBkeWhl+OCiuOCkuS8uOOBsOOBmVxuXHRcdHZlY3RvciA9IEBmaWxsLnNlZ21lbnRzWzBdLnBvaW50LnN1YnRyYWN0KEBmaWxsLnNlZ21lbnRzWzFdLnBvaW50KVxuXHRcdHZlY3Rvci5sZW5ndGggPSBMSU5FX1dJRFRIICogMC41XG5cdFx0QGZpbGwuc2VnbWVudHNbMF0ucG9pbnQgPSBAZmlsbC5zZWdtZW50c1swXS5wb2ludC5hZGQodmVjdG9yKVxuXHRcdHZlY3RvciA9IEBmaWxsLnNlZ21lbnRzWzNdLnBvaW50LnN1YnRyYWN0KEBmaWxsLnNlZ21lbnRzWzJdLnBvaW50KVxuXHRcdHZlY3Rvci5sZW5ndGggPSBMSU5FX1dJRFRIICogMC41XG5cdFx0QGZpbGwuc2VnbWVudHNbM10ucG9pbnQgPSBAZmlsbC5zZWdtZW50c1szXS5wb2ludC5hZGQodmVjdG9yKVxuXG5cdFx0QGluc2VydENoaWxkKDAsQGZpbGwpXG5cblx0XHRjb25zb2xlLmxvZyBcIj09PT09PT0gQmFzZSA9PT09PT09PT09XCJcblx0XHRjb25zb2xlLmxvZyBcIkBiYXNlLnBvc2l0aW9uXCIsIEBwb3NpdGlvblxuXG5cdFx0cmV0dXJuXG5cbiNcbiMgTWFpbuOCr+ODqeOCuVxuI1xuY2xhc3MgTWFpblxuXHRjb25zdHJ1Y3RvcjogKCkgLT5cblx0XHRAJGNhbnZhcyA9ICQoJyNNYWluQ2FudmFzJylcblx0XHRAY2FudmFzID0gQCRjYW52YXMuZ2V0KDApXG5cdFx0QGNvbnRleHQgPSBAY2FudmFzLmdldENvbnRleHQoJzJkJylcblx0XHRUb3VjaC5pbml0KEBjYW52YXMpXG5cdFx0QCR3aW5kb3cgPSAkKHdpbmRvdylcblxuXHRcdCMg44Kt44Oj44Oz44OQ44K55oyH5a6aXG5cdFx0cGFwZXIuc2V0dXAoQGNhbnZhcylcblxuXHRcdCMg44OV44Kp44O844Oe44OD44OIU1ZH6Kqt44G/6L6844G/XG5cdFx0cGFwZXIucHJvamVjdC5pbXBvcnRTVkcoU1ZHKVxuXHRcdGNvbnRhaW5lciA9IHBhcGVyLnByb2plY3QubGF5ZXJzWzBdLmNoaWxkcmVuWzBdXG5cdFx0Y29udGFpbmVyLmZpbGxDb2xvciA9IG5ldyBwYXBlci5Db2xvcigwLDI1NSwwKVxuXHRcdCMg44OV44Kp44O844Oe44OD44OI44KS5Z+644Gr5YaN5a6a576pXG5cdFx0Y29uc29sZS5sb2cgXCI9PT09PT09IGNvbnRhaW5lciA9PT09PT09PT09XCJcblx0XHRjb25zb2xlLmxvZyBcIkBjb250YWluZXIucG9zaXRpb25cIiwgY29udGFpbmVyLnBvc2l0aW9uXG5cblx0XHRAYnRuID0gbmV3IEJ0bihjb250YWluZXIuY2hpbGRyZW5bMF0pXG5cdFx0QGJhc2UgPSBuZXcgQmFzZShjb250YWluZXIuY2hpbGRyZW5bMV0pXG5cblx0XHRAYnRuTGF5ZXIgPSBwYXBlci5wcm9qZWN0LmxheWVyc1swXVxuXHRcdGNvbnNvbGUubG9nIFwiPT09PT09PSBidG5MYXllciA9PT09PT09PT09XCJcblx0XHRjb25zb2xlLmxvZyBcIkBidG5MYXllci5wb3NpdGlvblwiLCBAYnRuTGF5ZXIucG9zaXRpb25cblx0XHRAYnRuTGF5ZXIuZmlsbENvbG9yID0gbmV3IHBhcGVyLkNvbG9yKDI1NSwwLDApXG5cdFx0QGJ0bkxheWVyLnJlbW92ZUNoaWxkcmVuKClcblx0XHRAYnRuTGF5ZXIuYWRkQ2hpbGQoQGJ0bilcblx0XHRAYnRuTGF5ZXIuYWRkQ2hpbGQoQGJhc2UpXG5cblx0XHQjIGNvbnNvbGUubG9nIHBhcGVyLnByb2plY3RcblxuXHRcdCPjgqTjg5njg7Pjg4joqK3lrppcblx0XHRwYXBlci52aWV3Lm9uRnJhbWUgPSBAb25GcmFtZVxuXHRcdEAkd2luZG93Lm9uKCdyZXNpemUnLEBvblJlc2l6ZSlcblx0XHRAb25SZXNpemUoKVxuXHRcdFRvdWNoLnNoYXJlZEluc3RhbmNlLmFkZEV2ZW50TGlzdGVuZXIoVG91Y2guRE9XTiwgQG9uRG93bilcblx0XHRUb3VjaC5zaGFyZWRJbnN0YW5jZS5hZGRFdmVudExpc3RlbmVyKFRvdWNoLk1PVkUsIEBvbk1vdmUpXG5cdFx0VG91Y2guc2hhcmVkSW5zdGFuY2UuYWRkRXZlbnRMaXN0ZW5lcihUb3VjaC5VUCwgQG9uVXApXG5cdFx0cmV0dXJuXG5cblx0b25Eb3duOiAoZXZlbnQpID0+XG5cdFx0cmV0dXJuXG5cblx0b25Nb3ZlOiAoZXZlbnQpID0+XG5cdFx0dG91Y2ggPSBldmVudC50YXJnZXRcblx0XHRAYnRuLnNldFByZXNzICh0b3VjaC52ZWN0b3IueSAvIEBzdGFnZUhlaWdodCkgKiAxMFxuXHRcdHJldHVyblxuXG5cdG9uVXA6IChldmVudCkgPT5cblx0XHRAYnRuLnJlbGVhc2UoKVxuXHRcdHJldHVyblxuXG5cdG9uRnJhbWU6ICgpID0+XG5cdFx0VFdFRU4udXBkYXRlKClcbiNcdFx0QGJ0bi51cGRhdGUoKVxuXHRcdEBjb250ZXh0LmNsZWFyUmVjdCgwLDAsQHN0YWdlV2lkdGgsQHN0YWdlSGVpZ2h0KVxuXHRcdHBhcGVyLnZpZXcudXBkYXRlKHRydWUpXG5cdFx0cmV0dXJuXG5cblx0b25SZXNpemU6ICgpID0+XG5cdFx0QHN0YWdlV2lkdGggPSBAJHdpbmRvdy53aWR0aCgpXG5cdFx0QHN0YWdlSGVpZ2h0ID0gQCR3aW5kb3cuaGVpZ2h0KClcblx0XHRAJGNhbnZhcy5hdHRyKCd3aWR0aCcsQHN0YWdlV2lkdGgrJ3B4Jylcblx0XHRAJGNhbnZhcy5hdHRyKCdoZWlnaHQnLEBzdGFnZUhlaWdodCsncHgnKVxuXHRcdEAkY2FudmFzLmNzcygnd2lkdGgnLEBzdGFnZVdpZHRoKydweCcpXG5cdFx0QCRjYW52YXMuY3NzKCdoZWlnaHQnLEBzdGFnZUhlaWdodCsncHgnKVxuXHRcdEBidG5MYXllci5tYXRyaXggPSBuZXcgcGFwZXIuTWF0cml4KClcblx0XHRAYnRuTGF5ZXIucG9zaXRpb24ueCA9IEBzdGFnZVdpZHRoICogMC41XG5cdFx0QGJ0bkxheWVyLnBvc2l0aW9uLnkgPSBAc3RhZ2VIZWlnaHQgKiAwLjVcblx0XHRzY2FsZSA9ICggKCBpZiBAc3RhZ2VXaWR0aCA8IEBzdGFnZUhlaWdodCB0aGVuIEBzdGFnZVdpZHRoIGVsc2UgQHN0YWdlSGVpZ2h0KSAvIDMyMCApXG5cdFx0aWYgc2NhbGUgPiAzIHRoZW4gc2NhbGUgPSAzXG5cdFx0QGJ0bkxheWVyLnNjYWxlKHNjYWxlLHNjYWxlKVxuXHRcdHJldHVyblxuXG5cbiNcbiMgRE9NIFJFQURZXG4jXG4kKCgpLT5cblx0d2luZG93Lm1haW4gPSBuZXcgTWFpbigpXG4pXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL19jb2ZmZWUvX21vY2svMDEtcGFwZXJfcG9zaXRpb24vbWFpbi5jb2ZmZWVcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9