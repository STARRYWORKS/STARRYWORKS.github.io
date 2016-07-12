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
	    console.log('main');
	    this.$canvas = $('#MainCanvas');
	    this.canvas = this.$canvas.get(0);
	    console.log('@canvas', this.canvas);
	    this.context = this.canvas.getContext('2d');
	    this.$window = $(window);
	    paper.setup(this.canvas);
	    this.PATH1 = [new paper.Segment(new paper.Point(0, 400), new paper.Point(0, 0), new paper.Point(200, 0)), new paper.Segment(new paper.Point(300, 0), new paper.Point(-200, 0), new paper.Point(200, 0)), new paper.Segment(new paper.Point(600, 400), new paper.Point(-200, 0), new paper.Point(0, 0))];
	    this.PATH2 = [new paper.Segment(new paper.Point(100, 0), new paper.Point(0, 0), new paper.Point(0, 200)), new paper.Segment(new paper.Point(300, 400), new paper.Point(-100, 0), new paper.Point(100, 0)), new paper.Segment(new paper.Point(500, 0), new paper.Point(0, 200), new paper.Point(0, 0))];
	    this.layer = paper.project.activeLayer;
	    this.path = new paper.Path(this.PATH1);
	    this.path.strokeColor = new paper.Color(1, 0, 0);
	    this.path.strokeWidth = 5;
	    this.path.fullySelected = true;
	    this.layer.addChild(this.path);
	    this.position = 0.0;
	    console.log(this.path.segments[0]);
	    this.path2 = new paper.Path(this.PATH2);
	    this.path2.strokeColor = new paper.Color(0, 1, 0);
	    this.path2.strokeWidth = 2;
	    this.path2.fullySelected = true;
	    paper.view.onFrame = this.onFrame;
	    this.$window.on('resize', this.onResize);
	    this.onResize();
	    return;
	  }
	
	  Main.prototype.onFrame = function() {
	    var i, j, len, ref, segument;
	    TWEEN.update();
	    this.context.clearRect(0, 0, this.stageWidth, this.stageHeight);
	    this.position += 0.0001;
	    if (this.position > 1) {
	      this.position = 1;
	    }
	    ref = this.path.segments;
	    for (i = j = 0, len = ref.length; j < len; i = ++j) {
	      segument = ref[i];
	      this.changeSegument(segument, i);
	    }
	    paper.view.update(true);
	  };
	
	  Main.prototype.changeSegument = function(segument, i, beforePath, aftrerPath) {
	    if (beforePath == null) {
	      beforePath = this.PATH1;
	    }
	    if (aftrerPath == null) {
	      aftrerPath = this.PATH2;
	    }
	    segument.point.x = beforePath[i].point.x + (aftrerPath[i].point.x - beforePath[i].point.x) * this.position;
	    segument.point.y = beforePath[i].point.y + (aftrerPath[i].point.y - beforePath[i].point.y) * this.position;
	    segument.handleIn.x = beforePath[i].handleIn.x + (aftrerPath[i].handleIn.x - beforePath[i].handleIn.x) * this.position;
	    segument.handleIn.y = beforePath[i].handleIn.y + (aftrerPath[i].handleIn.y - beforePath[i].handleIn.y) * this.position;
	    segument.handleOut.x = beforePath[i].handleOut.x + (aftrerPath[i].handleOut.x - beforePath[i].handleOut.x) * this.position;
	    segument.handleOut.y = beforePath[i].handleOut.y + (aftrerPath[i].handleOut.y - beforePath[i].handleOut.y) * this.position;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDQ4ZjUzZmI4ZjNkYzZiZWY0OWE/MDg5ZCoqKiIsIndlYnBhY2s6Ly8vLi9fY29mZmVlL19tb2NrLzAyLXNoYXBlX3R3ZWVuL21haW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDbENBO0dBQUE7O0FBQU07R0FDUTs7O0tBQ1osT0FBTyxDQUFDLEdBQVIsQ0FBWSxNQUFaO0tBQ0EsSUFBQyxRQUFELEdBQVcsRUFBRSxhQUFGO0tBQ1gsSUFBQyxPQUFELEdBQVUsSUFBQyxRQUFPLENBQUMsR0FBVCxDQUFhLENBQWI7S0FDVixPQUFPLENBQUMsR0FBUixDQUFZLFNBQVosRUFBc0IsSUFBQyxPQUF2QjtLQUNBLElBQUMsUUFBRCxHQUFXLElBQUMsT0FBTSxDQUFDLFVBQVIsQ0FBbUIsSUFBbkI7S0FDWCxJQUFDLFFBQUQsR0FBVyxFQUFFLE1BQUY7S0FHWCxLQUFLLENBQUMsS0FBTixDQUFZLElBQUMsT0FBYjtLQUVBLElBQUMsTUFBRCxHQUFTLENBQ0osU0FBSyxDQUFDLE9BQU4sQ0FBbUIsU0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFaLEVBQWMsR0FBZCxDQUFuQixFQUEyQyxTQUFLLENBQUMsS0FBTixDQUFZLENBQVosRUFBYyxDQUFkLENBQTNDLEVBQWlFLFNBQUssQ0FBQyxLQUFOLENBQVksR0FBWixFQUFnQixDQUFoQixDQUFqRSxDQURJLEVBRUosU0FBSyxDQUFDLE9BQU4sQ0FBbUIsU0FBSyxDQUFDLEtBQU4sQ0FBWSxHQUFaLEVBQWdCLENBQWhCLENBQW5CLEVBQTJDLFNBQUssQ0FBQyxL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LENBQUMsQ0FBeEIsR0FBNEIsQ0FBQyxVQUFXLEdBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBeEIsR0FBNEIsVUFBVyxHQUFFLENBQUMsU0FBUyxDQUFDLENBQXJELElBQTBELElBQUM7R0FOL0Y7O2tCQVNoQixXQUFVO0tBQ1QsSUFBQyxXQUFELEdBQWMsSUFBQyxRQUFPLENBQUMsS0FBVDtLQUNkLElBQUMsWUFBRCxHQUFlLElBQUMsUUFBTyxDQUFDLE1BQVQ7S0FDZixJQUFDLFFBQU8sQ0FBQyxJQUFULENBQWMsT0FBZCxFQUFzQixJQUFDLFdBQUQsR0FBWSxJQUFsQztLQUNBLElBQUMsUUFBTyxDQUFDLElBQVQsQ0FBYyxRQUFkLEVBQXVCLElBQUMsWUFBRCxHQUFhLElBQXBDO0tBQ0EsSUFBQyxRQUFPLENBQUMsR0FBVCxDQUFhLE9BQWIsRUFBcUIsSUFBQyxXQUFELEdBQVksSUFBakM7S0FDQSxJQUFDLFFBQU8sQ0FBQyxHQUFULENBQWEsUUFBYixFQUFzQixJQUFDLFlBQUQsR0FBYSxJQUFuQztHQU5TOzs7Ozs7QUFZWCxHQUFFO1VBQ0QsTUFBTSxDQUFDLElBQVAsR0FBa0I7QUFEakIsRUFBRiIsImZpbGUiOiJtb2NrLzAyLXNoYXBlX3R3ZWVuL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDQ0OGY1M2ZiOGYzZGM2YmVmNDlhXG4gKiovIiwiXG4jXG4jIE1haW7jgq/jg6njgrlcbiNcbmNsYXNzIE1haW5cblx0Y29uc3RydWN0b3I6ICgpIC0+XG5cdFx0Y29uc29sZS5sb2cgJ21haW4nXG5cdFx0QCRjYW52YXMgPSAkKCcjTWFpbkNhbnZhcycpXG5cdFx0QGNhbnZhcyA9IEAkY2FudmFzLmdldCgwKVxuXHRcdGNvbnNvbGUubG9nICdAY2FudmFzJyxAY2FudmFzXG5cdFx0QGNvbnRleHQgPSBAY2FudmFzLmdldENvbnRleHQoJzJkJylcblx0XHRAJHdpbmRvdyA9ICQod2luZG93KVxuXG5cdFx0IyDjgq3jg6Pjg7Pjg5DjgrnmjIflrppcblx0XHRwYXBlci5zZXR1cChAY2FudmFzKVxuXG5cdFx0QFBBVEgxID0gW1xuXHRcdFx0bmV3IHBhcGVyLlNlZ21lbnQoIG5ldyBwYXBlci5Qb2ludCgwLDQwMCksIG5ldyBwYXBlci5Qb2ludCgwLDApLCBuZXcgcGFwZXIuUG9pbnQoMjAwLDApICksXG5cdFx0XHRuZXcgcGFwZXIuU2VnbWVudCggbmV3IHBhcGVyLlBvaW50KDMwMCwwKSwgbmV3IHBhcGVyLlBvaW50KC0yMDAsMCksIG5ldyBwYXBlci5Qb2ludCgyMDAsMCkgKSxcblx0XHRcdG5ldyBwYXBlci5TZWdtZW50KCBuZXcgcGFwZXIuUG9pbnQoNjAwLDQwMCksIG5ldyBwYXBlci5Qb2ludCgtMjAwLDApLCBuZXcgcGFwZXIuUG9pbnQoMCwwKSApXG5cdFx0XVxuXG5cdFx0QFBBVEgyID0gW1xuXHRcdFx0bmV3IHBhcGVyLlNlZ21lbnQoIG5ldyBwYXBlci5Qb2ludCgxMDAsMCksIG5ldyBwYXBlci5Qb2ludCgwLDApLCBuZXcgcGFwZXIuUG9pbnQoMCwyMDApICksXG5cdFx0XHRuZXcgcGFwZXIuU2VnbWVudCggbmV3IHBhcGVyLlBvaW50KDMwMCw0MDApLCBuZXcgcGFwZXIuUG9pbnQoLTEwMCwwKSwgbmV3IHBhcGVyLlBvaW50KDEwMCwwKSApLFxuXHRcdFx0bmV3IHBhcGVyLlNlZ21lbnQoIG5ldyBwYXBlci5Qb2ludCg1MDAsMCksIG5ldyBwYXBlci5Qb2ludCgwLDIwMCksIG5ldyBwYXBlci5Qb2ludCgwLDApIClcblx0XHRdXG5cblx0XHRAbGF5ZXIgPSBwYXBlci5wcm9qZWN0LmFjdGl2ZUxheWVyXG5cdFx0QHBhdGggPSBuZXcgcGFwZXIuUGF0aChAUEFUSDEpXG5cdFx0QHBhdGguc3Ryb2tlQ29sb3IgPSBuZXcgcGFwZXIuQ29sb3IoMSwwLDApXG5cdFx0QHBhdGguc3Ryb2tlV2lkdGggPSA1XG5cdFx0QHBhdGguZnVsbHlTZWxlY3RlZCA9IHRydWVcblx0XHRAbGF5ZXIuYWRkQ2hpbGQoQHBhdGgpXG5cdFx0QHBvc2l0aW9uID0gMC4wXG5cblx0XHRjb25zb2xlLmxvZyBAcGF0aC5zZWdtZW50c1swXVxuXG5cdFx0QHBhdGgyID0gbmV3IHBhcGVyLlBhdGgoQFBBVEgyKVxuXHRcdEBwYXRoMi5zdHJva2VDb2xvciA9IG5ldyBwYXBlci5Db2xvcigwLDEsMClcblx0XHRAcGF0aDIuc3Ryb2tlV2lkdGggPSAyXG5cdFx0QHBhdGgyLmZ1bGx5U2VsZWN0ZWQgPSB0cnVlXG5cblx0XHQj44Kk44OZ44Oz44OI6Kit5a6aXG5cdFx0cGFwZXIudmlldy5vbkZyYW1lID0gQG9uRnJhbWVcblx0XHRAJHdpbmRvdy5vbigncmVzaXplJyxAb25SZXNpemUpXG5cdFx0QG9uUmVzaXplKClcblx0XHRyZXR1cm5cblxuXHRvbkZyYW1lOiAoKSA9PlxuXHRcdFRXRUVOLnVwZGF0ZSgpXG5cdFx0QGNvbnRleHQuY2xlYXJSZWN0KDAsMCxAc3RhZ2VXaWR0aCxAc3RhZ2VIZWlnaHQpXG5cblx0XHRAcG9zaXRpb24gKz0gMC4wMDAxXG5cdFx0aWYgQHBvc2l0aW9uID4gMSB0aGVuIEBwb3NpdGlvbiA9IDFcblxuXHRcdGZvciBzZWd1bWVudCwgaSBpbiBAcGF0aC5zZWdtZW50c1xuXHRcdFx0QGNoYW5nZVNlZ3VtZW50IHNlZ3VtZW50LCBpXG5cblx0XHRwYXBlci52aWV3LnVwZGF0ZSh0cnVlKVxuXHRcdHJldHVyblxuXG5cdGNoYW5nZVNlZ3VtZW50OiAoc2VndW1lbnQsIGksIGJlZm9yZVBhdGggPSBAUEFUSDEsIGFmdHJlclBhdGggPSBAUEFUSDIgKS0+XG5cdFx0c2VndW1lbnQucG9pbnQueCA9IGJlZm9yZVBhdGhbaV0ucG9pbnQueCArIChhZnRyZXJQYXRoW2ldLnBvaW50LnggLSBiZWZvcmVQYXRoW2ldLnBvaW50LngpICogQHBvc2l0aW9uXG5cdFx0c2VndW1lbnQucG9pbnQueSA9IGJlZm9yZVBhdGhbaV0ucG9pbnQueSArIChhZnRyZXJQYXRoW2ldLnBvaW50LnkgLSBiZWZvcmVQYXRoW2ldLnBvaW50LnkpICogQHBvc2l0aW9uXG5cdFx0c2VndW1lbnQuaGFuZGxlSW4ueCA9IGJlZm9yZVBhdGhbaV0uaGFuZGxlSW4ueCArIChhZnRyZXJQYXRoW2ldLmhhbmRsZUluLnggLSBiZWZvcmVQYXRoW2ldLmhhbmRsZUluLngpICogQHBvc2l0aW9uXG5cdFx0c2VndW1lbnQuaGFuZGxlSW4ueSA9IGJlZm9yZVBhdGhbaV0uaGFuZGxlSW4ueSArIChhZnRyZXJQYXRoW2ldLmhhbmRsZUluLnkgLSBiZWZvcmVQYXRoW2ldLmhhbmRsZUluLnkpICogQHBvc2l0aW9uXG5cdFx0c2VndW1lbnQuaGFuZGxlT3V0LnggPSBiZWZvcmVQYXRoW2ldLmhhbmRsZU91dC54ICsgKGFmdHJlclBhdGhbaV0uaGFuZGxlT3V0LnggLSBiZWZvcmVQYXRoW2ldLmhhbmRsZU91dC54KSAqIEBwb3NpdGlvblxuXHRcdHNlZ3VtZW50LmhhbmRsZU91dC55ID0gYmVmb3JlUGF0aFtpXS5oYW5kbGVPdXQueSArIChhZnRyZXJQYXRoW2ldLmhhbmRsZU91dC55IC0gYmVmb3JlUGF0aFtpXS5oYW5kbGVPdXQueSkgKiBAcG9zaXRpb25cblx0XHRyZXR1cm5cblxuXHRvblJlc2l6ZTogKCkgPT5cblx0XHRAc3RhZ2VXaWR0aCA9IEAkd2luZG93LndpZHRoKClcblx0XHRAc3RhZ2VIZWlnaHQgPSBAJHdpbmRvdy5oZWlnaHQoKVxuXHRcdEAkY2FudmFzLmF0dHIoJ3dpZHRoJyxAc3RhZ2VXaWR0aCsncHgnKVxuXHRcdEAkY2FudmFzLmF0dHIoJ2hlaWdodCcsQHN0YWdlSGVpZ2h0KydweCcpXG5cdFx0QCRjYW52YXMuY3NzKCd3aWR0aCcsQHN0YWdlV2lkdGgrJ3B4Jylcblx0XHRAJGNhbnZhcy5jc3MoJ2hlaWdodCcsQHN0YWdlSGVpZ2h0KydweCcpXG5cdFx0cmV0dXJuXG5cbiNcbiMgRE9NIFJFQURZXG4jXG4kKCgpLT5cblx0d2luZG93Lm1haW4gPSBuZXcgTWFpbigpXG4pXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL19jb2ZmZWUvX21vY2svMDItc2hhcGVfdHdlZW4vbWFpbi5jb2ZmZWVcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9