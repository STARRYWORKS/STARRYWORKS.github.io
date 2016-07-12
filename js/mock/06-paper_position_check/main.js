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

	var Main,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	Main = (function() {
	  function Main() {
	    this.onResize = bind(this.onResize, this);
	    this.onFrame = bind(this.onFrame, this);
	    this.$canvas = $('#MainCanvas');
	    this.canvas = this.$canvas.get(0);
	    this.context = this.canvas.getContext('2d');
	    this.$window = $(window);
	    paper.setup(this.canvas);
	    this.pathRed = new paper.Path([100, 0], [100, 100]);
	    this.pathRed.pivot = new paper.Point(0, 0);
	    this.pathRed.position = {
	      x: 100,
	      y: 100
	    };
	    this.pathRed.strokeColor = 'red';
	    console.log("\n before ---------");
	    console.log("@pathRed.position", this.pathRed.position);
	    this.pathBlack = new paper.Path([0, 0], [100, 100]);
	    this.pathBlack.pivot = new paper.Point(0, 0);
	    this.pathBlack.position = {
	      x: 50,
	      y: 50
	    };
	    this.pathBlack.strokeColor = 'black';
	    this.pathGreen = new paper.Path([0, 100], [100, 0]);
	    this.pathGreen.pivot = new paper.Point(0, 0);
	    this.pathGreen.position = {
	      x: 50,
	      y: 50
	    };
	    this.pathGreen.strokeColor = 'green';
	    this.group = new paper.Group({
	      children: [this.pathBlack, this.pathGreen]
	    });
	    this.group.transformContent = false;
	    this.group.pivot = new paper.Point(0, 0);
	    this.group.position = {
	      x: 200,
	      y: 200
	    };
	    this.group.addChild(this.pathRed);
	    console.log("@group.position", this.group.position);
	    this.rootLayer = paper.project.activeLayer;
	    console.log("\n after ---------");
	    console.log("@pathRed.position", this.pathRed.position);
	    console.log("@group.position", this.group.position);
	    this.rootLayer.addChild(this.group);
	    this.pathBlue = new paper.Path([50, 50], [150, 50]);
	    this.pathBlue.pivot = new paper.Point(0, 0);
	    this.pathBlue.strokeColor = 'blue';
	    this.pathBlue.position = new paper.Point(20, 20);
	    this.rootLayer.transformContent = false;
	    this.rootLayer.pivot = new paper.Point(0, 0);
	    this.rootLayer.position = new paper.Point(300, 300);
	    console.log("\n after add ---------");
	    console.log("@pathBlue.position", this.pathBlue.position);
	    console.log("\n ---------");
	    console.log("paper.project", paper.project);
	    console.log("@rootLayer.children", this.rootLayer.children);
	    console.log("@rootLayer.position", this.rootLayer.position);
	    setTimeout((function(_this) {
	      return function() {
	        console.log("setTimeout");
	        _this.pathGray = new paper.Path([100, 0], [100, 100]);
	        _this.pathGray.pivot = new paper.Point(10, 10);
	        _this.pathGray.strokeColor = 'gray';
	        _this.rootLayer.addChild(_this.pathGray);
	        console.log('@pathGray.position:' + _this.pathGray.position);
	        console.log('@pathGray.matrix:' + _this.pathGray.matrix);
	        return console.log('@pathGray.globalMatrix:' + _this.pathGray.globalMatrix);
	      };
	    })(this), 2000);
	    this.layer = new paper.Layer();
	    this.layer.transformContent = false;
	    this.layer.pivot = new paper.Point(0, 0);
	    this.layer.position = new paper.Point(400, 50);
	    this.layer.addChild(this.pathBlue);
	    this.rootLayer.addChild(this.layer);
	    paper.view.onFrame = this.onFrame;
	    this.$window.on('resize', this.onResize);
	    this.onResize();
	    return;
	  }
	
	  Main.prototype.onFrame = function() {
	    TWEEN.update();
	    this.context.clearRect(0, 0, this.stageWidth, this.stageHeight);
	    paper.view.update(true);
	    this.ctxScale = 1;
	    this.drawBasePosition(this.rootLayer);
	  };
	
	  Main.prototype.drawBasePosition = function(obj) {
	    var child, color, i, len, ref, x, y;
	    x = obj.position.x;
	    y = obj.position.y;
	    color = '#00ffff';
	    if (obj instanceof paper.Layer) {
	      color = '#ff88ff';
	    } else if (obj instanceof paper.Group) {
	      color = '#88ff88';
	    }
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
	    this.context.save();
	    obj.matrix.applyToContext(this.context);
	    if (obj instanceof paper.Layer || obj instanceof paper.Group) {
	      ref = obj.children;
	      for (i = 0, len = ref.length; i < len; i++) {
	        child = ref[i];
	        this.drawBasePosition(child);
	      }
	    }
	    return this.context.restore();
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
	
	  Main.prototype.onResize = function() {
	    this.stageWidth = this.$window.width();
	    this.stageHeight = this.$window.height();
	    this.$canvas.attr('width', this.stageWidth + 'px');
	    this.$canvas.attr('height', this.stageHeight + 'px');
	    this.$canvas.css('width', this.stageWidth + 'px');
	    this.$canvas.css('height', this.stageHeight + 'px');
	  };
	
	  return Main;
	
	})();
	
	$(function() {
	  return window.main = new Main();
	});


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWNkODQ0ZTY3YTI3Zjk1NjQzNmU/ODM2YioqKioqKiIsIndlYnBhY2s6Ly8vLi9fY29mZmVlL19tb2NrLzA2LXBhcGVyX3Bvc2l0aW9uX2NoZWNrL21haW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDbkNBO0dBQUE7O0FBQU07R0FDUTs7O0tBQ1osSUFBQyxRQUFELEdBQVcsRUFBRSxhQUFGO0tBQ1gsSUFBQyxPQUFELEdBQVUsSUFBQyxRQUFPLENBQUMsR0FBVCxDQUFhLENBQWI7S0FDVixJQUFDLFFBQUQsR0FBVyxJQUFDLE9BQU0sQ0FBQyxVQUFSLENBQW1CLElBQW5CO0tBQ1gsSUFBQyxRQUFELEdBQVcsRUFBRSxNQUFGO0tBR1gsS0FBSyxDQUFDLEtBQU4sQ0FBWSxJQUFDLE9BQWI7S0FHQSxJQUFDLFFBQUQsR0FBZSxTQUFLLENBQUMsSUFBTixDQUFXLENBQUMsR0FBRCxFQUFNLENBQU4sQ0FBWCxFQUFxQixDQUFDLEdBQUQsRUFBTSxHQUFOLENBQXJCO0tBQ2YsSUFBQyxRQUFPLENBQUMsS0FBVCxHQUFxQixTQUFLLENBQUMsS0FBTixDQUFZLENBQVosRUFBYyxDQUFkO0tBQ3JCLElBQUMsUUFBTyxDQUFDLFFBQVQsR0FBb0I7T0FBQyxHQUFFLEdBQUg7T0FBUSxHQUFFLEdBQVY7O0tBQ3BCLElBQUMsUUFBTyxDQUFDLFdBQVQsR0FBdUI7S0FHdkIsT0FBTyxDQUFDLEdBQVIsQ0FBWSxxQkFBWjtLQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksbUJBQVosRUFBaUMsSUFBQyxRQUFPLENB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TSxFQUFOLEVBQVMsS0FBVDtLQUNULElBQUMsUUFBTyxDQUFDLFNBQVQ7S0FDQSxJQUFDLFFBQU8sQ0FBQyxNQUFULENBQWdCLElBQUksQ0FBQyxDQUFyQixFQUF1QixJQUFJLENBQUMsQ0FBNUI7S0FDQSxJQUFDLFFBQU8sQ0FBQyxNQUFULENBQWdCLElBQUksQ0FBQyxDQUFMLEdBQU8sRUFBRSxDQUFDLENBQTFCLEVBQTRCLElBQUksQ0FBQyxDQUFMLEdBQU8sRUFBRSxDQUFDLENBQXRDO0tBQ0EsSUFBQyxRQUFPLENBQUMsV0FBVCxHQUF1QjtLQUN2QixJQUFDLFFBQU8sQ0FBQyxTQUFULEdBQXFCLElBQUksSUFBQztLQUUxQixJQUFDLFFBQU8sQ0FBQyxTQUFUO0tBQ0EsSUFBQyxRQUFPLENBQUMsTUFBVDtHQVJTOztrQkFXVixXQUFVO0tBQ1QsSUFBQyxXQUFELEdBQWMsSUFBQyxRQUFPLENBQUMsS0FBVDtLQUNkLElBQUMsWUFBRCxHQUFlLElBQUMsUUFBTyxDQUFDLE1BQVQ7S0FDZixJQUFDLFFBQU8sQ0FBQyxJQUFULENBQWMsT0FBZCxFQUFzQixJQUFDLFdBQUQsR0FBWSxJQUFsQztLQUNBLElBQUMsUUFBTyxDQUFDLElBQVQsQ0FBYyxRQUFkLEVBQXVCLElBQUMsWUFBRCxHQUFhLElBQXBDO0tBQ0EsSUFBQyxRQUFPLENBQUMsR0FBVCxDQUFhLE9BQWIsRUFBcUIsSUFBQyxXQUFELEdBQVksSUFBakM7S0FDQSxJQUFDLFFBQU8sQ0FBQyxHQUFULENBQWEsUUFBYixFQUFzQixJQUFDLFlBQUQsR0FBYSxJQUFuQztHQU5TOzs7Ozs7QUFZWCxHQUFFO1VBQ0QsTUFBTSxDQUFDLElBQVAsR0FBa0I7QUFEakIsRUFBRiIsImZpbGUiOiJtb2NrLzA2LXBhcGVyX3Bvc2l0aW9uX2NoZWNrL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDVjZDg0NGU2N2EyN2Y5NTY0MzZlXG4gKiovIiwiI1xuIyBNYWlu44Kv44Op44K5XG4jXG5jbGFzcyBNYWluXG5cdGNvbnN0cnVjdG9yOiAoKSAtPlxuXHRcdEAkY2FudmFzID0gJCgnI01haW5DYW52YXMnKVxuXHRcdEBjYW52YXMgPSBAJGNhbnZhcy5nZXQoMClcblx0XHRAY29udGV4dCA9IEBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuXHRcdEAkd2luZG93ID0gJCh3aW5kb3cpXG5cblx0XHQjIOOCreODo+ODs+ODkOOCueaMh+WumlxuXHRcdHBhcGVyLnNldHVwKEBjYW52YXMpXG5cdFx0XG5cblx0XHRAcGF0aFJlZCA9IG5ldyBwYXBlci5QYXRoKFsxMDAsIDBdLCBbMTAwLCAxMDBdKVxuXHRcdEBwYXRoUmVkLnBpdm90ID0gbmV3IHBhcGVyLlBvaW50KDAsMClcblx0XHRAcGF0aFJlZC5wb3NpdGlvbiA9IHt4OjEwMCwgeToxMDB9XG5cdFx0QHBhdGhSZWQuc3Ryb2tlQ29sb3IgPSAncmVkJ1xuXG5cblx0XHRjb25zb2xlLmxvZyBcIlxcbiBiZWZvcmUgLS0tLS0tLS0tXCJcblx0XHRjb25zb2xlLmxvZyBcIkBwYXRoUmVkLnBvc2l0aW9uXCIsIEBwYXRoUmVkLnBvc2l0aW9uXG5cblx0XHRAcGF0aEJsYWNrID0gbmV3IHBhcGVyLlBhdGgoWzAsIDBdLCBbMTAwLCAxMDBdKVxuXHRcdEBwYXRoQmxhY2sucGl2b3QgPSBuZXcgcGFwZXIuUG9pbnQoMCwwKVxuXHRcdEBwYXRoQmxhY2sucG9zaXRpb24gPSB7eDo1MCwgeTo1MH1cblx0XHRAcGF0aEJsYWNrLnN0cm9rZUNvbG9yID0gJ2JsYWNrJ1xuXHRcdEBwYXRoR3JlZW4gPSBuZXcgcGFwZXIuUGF0aChbMCwgMTAwXSwgWzEwMCwgMF0pXG5cdFx0QHBhdGhHcmVlbi5waXZvdCA9IG5ldyBwYXBlci5Qb2ludCgwLDApXG5cdFx0QHBhdGhHcmVlbi5wb3NpdGlvbiA9IHt4OjUwLCB5OjUwfVxuXHRcdEBwYXRoR3JlZW4uc3Ryb2tlQ29sb3IgPSAnZ3JlZW4nXG5cdFx0XG5cdFx0QGdyb3VwID0gbmV3IHBhcGVyLkdyb3VwKHtcblx0XHRcdGNoaWxkcmVuOiBbQHBhdGhCbGFjaywgQHBhdGhHcmVlbl1cblx0XHR9KVxuXHRcdEBncm91cC50cmFuc2Zvcm1Db250ZW50ID0gZmFsc2Vcblx0XHRAZ3JvdXAucGl2b3QgPSBuZXcgcGFwZXIuUG9pbnQoMCwwKVxuXHRcdEBncm91cC5wb3NpdGlvbiA9IHt4OjIwMCwgeToyMDB9XG5cblx0XHRAZ3JvdXAuYWRkQ2hpbGQgQHBhdGhSZWRcblxuXHRcdGNvbnNvbGUubG9nIFwiQGdyb3VwLnBvc2l0aW9uXCIsIEBncm91cC5wb3NpdGlvblxuXG5cdFx0QHJvb3RMYXllciA9IHBhcGVyLnByb2plY3QuYWN0aXZlTGF5ZXJcblxuXHRcdGNvbnNvbGUubG9nIFwiXFxuIGFmdGVyIC0tLS0tLS0tLVwiXG5cdFx0Y29uc29sZS5sb2cgXCJAcGF0aFJlZC5wb3NpdGlvblwiLCBAcGF0aFJlZC5wb3NpdGlvblxuXHRcdGNvbnNvbGUubG9nIFwiQGdyb3VwLnBvc2l0aW9uXCIsIEBncm91cC5wb3NpdGlvblxuXG5cdFx0IyBAcm9vdExheWVyLmFkZENoaWxkKEBwYXRoUmVkKVxuXHRcdEByb290TGF5ZXIuYWRkQ2hpbGQoQGdyb3VwKVxuXHRcdCMgQHN0YWdlTGF5ZXIgPSBuZXcgTGF5ZXIoKVxuXHRcdCMgQHN0YWdlTGF5ZXIucG9zaXRpb24gPSB7eDoxMDAsIHk6MTAwfVxuXG5cdFx0QHBhdGhCbHVlID0gbmV3IHBhcGVyLlBhdGgoWzUwLCA1MF0sIFsxNTAsIDUwXSlcblx0XHRAcGF0aEJsdWUucGl2b3QgPSBuZXcgcGFwZXIuUG9pbnQoMCwwKVxuXHRcdEBwYXRoQmx1ZS5zdHJva2VDb2xvciA9ICdibHVlJ1xuXHRcdEBwYXRoQmx1ZS5wb3NpdGlvbiA9IG5ldyBwYXBlci5Qb2ludCgyMCwyMClcblxuXHRcdEByb290TGF5ZXIudHJhbnNmb3JtQ29udGVudCA9IGZhbHNlXG5cdFx0QHJvb3RMYXllci5waXZvdCA9IG5ldyBwYXBlci5Qb2ludCgwLDApXG5cdFx0QHJvb3RMYXllci5wb3NpdGlvbiA9IG5ldyBwYXBlci5Qb2ludCgzMDAsMzAwKVxuXG5cdFx0Y29uc29sZS5sb2cgXCJcXG4gYWZ0ZXIgYWRkIC0tLS0tLS0tLVwiXG5cdFx0Y29uc29sZS5sb2cgXCJAcGF0aEJsdWUucG9zaXRpb25cIiwgQHBhdGhCbHVlLnBvc2l0aW9uXG5cblx0XHRjb25zb2xlLmxvZyBcIlxcbiAtLS0tLS0tLS1cIlxuXHRcdGNvbnNvbGUubG9nIFwicGFwZXIucHJvamVjdFwiLCBwYXBlci5wcm9qZWN0XG5cdFx0Y29uc29sZS5sb2cgXCJAcm9vdExheWVyLmNoaWxkcmVuXCIsIEByb290TGF5ZXIuY2hpbGRyZW5cblx0XHRjb25zb2xlLmxvZyBcIkByb290TGF5ZXIucG9zaXRpb25cIiwgQHJvb3RMYXllci5wb3NpdGlvblxuXG5cdFx0c2V0VGltZW91dCg9PlxuXHRcdFx0Y29uc29sZS5sb2cgXCJzZXRUaW1lb3V0XCJcblx0XHRcdEBwYXRoR3JheSA9IG5ldyBwYXBlci5QYXRoKFsxMDAsIDBdLCBbMTAwLCAxMDBdKVxuXHRcdFx0QHBhdGhHcmF5LnBpdm90ID0gbmV3IHBhcGVyLlBvaW50KDEwLDEwKVxuXHRcdFx0QHBhdGhHcmF5LnN0cm9rZUNvbG9yID0gJ2dyYXknXG5cdFx0XHRAcm9vdExheWVyLmFkZENoaWxkIEBwYXRoR3JheVxuXG5cdFx0XHRjb25zb2xlLmxvZyAnQHBhdGhHcmF5LnBvc2l0aW9uOicrQHBhdGhHcmF5LnBvc2l0aW9uXG5cdFx0XHRjb25zb2xlLmxvZyAnQHBhdGhHcmF5Lm1hdHJpeDonK0BwYXRoR3JheS5tYXRyaXhcblx0XHRcdGNvbnNvbGUubG9nICdAcGF0aEdyYXkuZ2xvYmFsTWF0cml4OicrQHBhdGhHcmF5Lmdsb2JhbE1hdHJpeFxuXG5cdFx0LDIwMDApXG5cblx0XHRAbGF5ZXIgPSBuZXcgcGFwZXIuTGF5ZXIoKVxuXHRcdEBsYXllci50cmFuc2Zvcm1Db250ZW50ID0gZmFsc2Vcblx0XHRAbGF5ZXIucGl2b3QgPSBuZXcgcGFwZXIuUG9pbnQoMCwwKVxuXHRcdEBsYXllci5wb3NpdGlvbiA9IG5ldyBwYXBlci5Qb2ludCg0MDAsNTApXG5cdFx0QGxheWVyLmFkZENoaWxkIEBwYXRoQmx1ZVxuXG5cdFx0QHJvb3RMYXllci5hZGRDaGlsZCBAbGF5ZXJcblxuXHRcdCPjgqTjg5njg7Pjg4joqK3lrppcblx0XHRwYXBlci52aWV3Lm9uRnJhbWUgPSBAb25GcmFtZVxuXHRcdEAkd2luZG93Lm9uKCdyZXNpemUnLEBvblJlc2l6ZSlcblx0XHRAb25SZXNpemUoKVxuXG5cdFx0cmV0dXJuXG5cblx0b25GcmFtZTogKCkgPT5cblx0XHRUV0VFTi51cGRhdGUoKVxuXHRcdCMgQHBhdGhSZWQucG9zaXRpb24ueSArPSAwLjVcblx0XHQjIEBwYXRoUmVkLnNlZ21lbnRzWzBdLnBvaW50LnkgKz0gMC41XG5cdFx0IyBAcm9vdExheWVyLnBvc2l0aW9uLnkgKz0gMC41XG5cdFx0IyBAcm9vdExheWVyLnBvc2l0aW9uLnggKz0gMC4xXG5cblx0XHRAY29udGV4dC5jbGVhclJlY3QoMCwwLEBzdGFnZVdpZHRoLEBzdGFnZUhlaWdodClcblx0XHRwYXBlci52aWV3LnVwZGF0ZSh0cnVlKVxuXG5cdFx0QGN0eFNjYWxlID0gMVxuXHRcdEBkcmF3QmFzZVBvc2l0aW9uKEByb290TGF5ZXIpXG5cdFx0cmV0dXJuXG5cblx0ZHJhd0Jhc2VQb3NpdGlvbjogKG9iaikgLT5cblx0XHQjIOWfuua6lueCueOCkuaPj+eUu1xuXHRcdHggPSBvYmoucG9zaXRpb24ueFxuXHRcdHkgPSBvYmoucG9zaXRpb24ueVxuXHRcdGNvbG9yID0gJyMwMGZmZmYnICPjg5bjg6vjg7xcblx0XHRpZiBvYmogaW5zdGFuY2VvZiBwYXBlci5MYXllciB0aGVuIGNvbG9yID0gJyNmZjg4ZmYnICMgTGF5ZXLjga/jg5Tjg7Pjgq9cblx0XHRlbHNlIGlmIG9iaiBpbnN0YW5jZW9mIHBhcGVyLkdyb3VwIHRoZW4gY29sb3IgPSAnIzg4ZmY4OCcgIyDjgrDjg6vjg7zjg5fjga/jgrDjg6rjg7zjg7Ncblx0XHRAZHJhd0xpbmUoe3g6eC01LCB5Onl9LCB7eDoxMCwgeTowfSwgY29sb3IgKVxuXHRcdEBkcmF3TGluZSh7eDp4LCB5OnktNX0sIHt4OjAsIHk6MTB9LCBjb2xvciApXG5cdFx0QGNvbnRleHQuc2F2ZSgpXG5cdFx0b2JqLm1hdHJpeC5hcHBseVRvQ29udGV4dChAY29udGV4dClcblx0XHQjIOOCsOODq+ODvOODl+OChExheWVy44Gu5aC05ZCI44Gv5a2Q44Kq44OW44K444Kn44Kv44OI44KS5Yem55CG44GZ44KLXG5cdFx0aWYgb2JqIGluc3RhbmNlb2YgcGFwZXIuTGF5ZXIgfHwgb2JqIGluc3RhbmNlb2YgcGFwZXIuR3JvdXBcblx0XHRcdGZvciBjaGlsZCBpbiBvYmouY2hpbGRyZW5cblx0XHRcdFx0QGRyYXdCYXNlUG9zaXRpb24oY2hpbGQpXG5cdFx0QGNvbnRleHQucmVzdG9yZSgpXG5cblx0IyBcblx0IyBcblx0IyBcblx0ZHJhd0xpbmU6IChmcm9tLHRvLGNvbG9yKSAtPlxuXHRcdEBjb250ZXh0LmJlZ2luUGF0aCgpXG5cdFx0QGNvbnRleHQubW92ZVRvKGZyb20ueCxmcm9tLnkpXG5cdFx0QGNvbnRleHQubGluZVRvKGZyb20ueCt0by54LGZyb20ueSt0by55KVxuXHRcdEBjb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3Jcblx0XHRAY29udGV4dC5saW5lV2lkdGggPSAxIC8gQGN0eFNjYWxlXG5cdFx0IyBAY29udGV4dC5saW5lV2lkdGggPSAxMFxuXHRcdEBjb250ZXh0LmNsb3NlUGF0aCgpXG5cdFx0QGNvbnRleHQuc3Ryb2tlKClcblx0XHRyZXR1cm5cblxuXHRvblJlc2l6ZTogKCkgPT5cblx0XHRAc3RhZ2VXaWR0aCA9IEAkd2luZG93LndpZHRoKClcblx0XHRAc3RhZ2VIZWlnaHQgPSBAJHdpbmRvdy5oZWlnaHQoKVxuXHRcdEAkY2FudmFzLmF0dHIoJ3dpZHRoJyxAc3RhZ2VXaWR0aCsncHgnKVxuXHRcdEAkY2FudmFzLmF0dHIoJ2hlaWdodCcsQHN0YWdlSGVpZ2h0KydweCcpXG5cdFx0QCRjYW52YXMuY3NzKCd3aWR0aCcsQHN0YWdlV2lkdGgrJ3B4Jylcblx0XHRAJGNhbnZhcy5jc3MoJ2hlaWdodCcsQHN0YWdlSGVpZ2h0KydweCcpXG5cdFx0cmV0dXJuXG5cbiNcbiMgRE9NIFJFQURZXG4jXG4kKCgpLT5cblx0d2luZG93Lm1haW4gPSBuZXcgTWFpbigpXG4pXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL19jb2ZmZWUvX21vY2svMDYtcGFwZXJfcG9zaXRpb25fY2hlY2svbWFpbi5jb2ZmZWVcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9