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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmRmYjUwM2E2ZGY3ODYxZWYxZTM/MmEzZioqIiwid2VicGFjazovLy8uL19jb2ZmZWUvX21vY2svMDItc2hhcGVfdHdlZW4vbWFpbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNsQ0E7R0FBQTs7QUFBTTtHQUNROzs7S0FDWixPQUFPLENBQUMsR0FBUixDQUFZLE1BQVo7S0FDQSxJQUFDLFFBQUQsR0FBVyxFQUFFLGFBQUY7S0FDWCxJQUFDLE9BQUQsR0FBVSxJQUFDLFFBQU8sQ0FBQyxHQUFULENBQWEsQ0FBYjtLQUNWLE9BQU8sQ0FBQyxHQUFSLENBQVksU0FBWixFQUFzQixJQUFDLE9BQXZCO0tBQ0EsSUFBQyxRQUFELEdBQVcsSUFBQyxPQUFNLENBQUMsVUFBUixDQUFtQixJQUFuQjtLQUNYLElBQUMsUUFBRCxHQUFXLEVBQUUsTUFBRjtLQUdYLEtBQUssQ0FBQyxLQUFOLENBQVksSUFBQyxPQUFiO0tBRUEsSUFBQyxNQUFELEdBQVMsQ0FDSixTQUFLLENBQUMsT0FBTixDQUFtQixTQUFLLENBQUMsS0FBTixDQUFZLENBQVosRUFBYyxHQUFkLENBQW5CLEVBQTJDLFNBQUssQ0FBQyxLQUFOLENBQVksQ0FBWixFQUFjLENBQWQsQ0FBM0MsRUFBaUUsU0FBSyxDQUFDLEtBQU4sQ0FBWSxHQUFaLEVBQWdCLENBQWhCLENBQWpFLENBREksRUFFSixTQUFLLENBQUMsT0FBTixDQUFtQixTQUFLLENBQUMsS0FBTixDQUFZLEdBQVosRUFBZ0IsQ0FBaEIsQ0FBbkIsRUFBMkMsU0FBSyxDQUFDLEtB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Q0FBQyxDQUF4QixHQUE0QixDQUFDLFVBQVcsR0FBRSxDQUFDLFNBQVMsQ0FBQyxDQUF4QixHQUE0QixVQUFXLEdBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBckQsSUFBMEQsSUFBQztHQU4vRjs7a0JBU2hCLFdBQVU7S0FDVCxJQUFDLFdBQUQsR0FBYyxJQUFDLFFBQU8sQ0FBQyxLQUFUO0tBQ2QsSUFBQyxZQUFELEdBQWUsSUFBQyxRQUFPLENBQUMsTUFBVDtLQUNmLElBQUMsUUFBTyxDQUFDLElBQVQsQ0FBYyxPQUFkLEVBQXNCLElBQUMsV0FBRCxHQUFZLElBQWxDO0tBQ0EsSUFBQyxRQUFPLENBQUMsSUFBVCxDQUFjLFFBQWQsRUFBdUIsSUFBQyxZQUFELEdBQWEsSUFBcEM7S0FDQSxJQUFDLFFBQU8sQ0FBQyxHQUFULENBQWEsT0FBYixFQUFxQixJQUFDLFdBQUQsR0FBWSxJQUFqQztLQUNBLElBQUMsUUFBTyxDQUFDLEdBQVQsQ0FBYSxRQUFiLEVBQXNCLElBQUMsWUFBRCxHQUFhLElBQW5DO0dBTlM7Ozs7OztBQVlYLEdBQUU7VUFDRCxNQUFNLENBQUMsSUFBUCxHQUFrQjtBQURqQixFQUFGIiwiZmlsZSI6Im1vY2svMDItc2hhcGVfdHdlZW4vbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZmRmYjUwM2E2ZGY3ODYxZWYxZTNcbiAqKi8iLCJcbiNcbiMgTWFpbuOCr+ODqeOCuVxuI1xuY2xhc3MgTWFpblxuXHRjb25zdHJ1Y3RvcjogKCkgLT5cblx0XHRjb25zb2xlLmxvZyAnbWFpbidcblx0XHRAJGNhbnZhcyA9ICQoJyNNYWluQ2FudmFzJylcblx0XHRAY2FudmFzID0gQCRjYW52YXMuZ2V0KDApXG5cdFx0Y29uc29sZS5sb2cgJ0BjYW52YXMnLEBjYW52YXNcblx0XHRAY29udGV4dCA9IEBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuXHRcdEAkd2luZG93ID0gJCh3aW5kb3cpXG5cblx0XHQjIOOCreODo+ODs+ODkOOCueaMh+WumlxuXHRcdHBhcGVyLnNldHVwKEBjYW52YXMpXG5cblx0XHRAUEFUSDEgPSBbXG5cdFx0XHRuZXcgcGFwZXIuU2VnbWVudCggbmV3IHBhcGVyLlBvaW50KDAsNDAwKSwgbmV3IHBhcGVyLlBvaW50KDAsMCksIG5ldyBwYXBlci5Qb2ludCgyMDAsMCkgKSxcblx0XHRcdG5ldyBwYXBlci5TZWdtZW50KCBuZXcgcGFwZXIuUG9pbnQoMzAwLDApLCBuZXcgcGFwZXIuUG9pbnQoLTIwMCwwKSwgbmV3IHBhcGVyLlBvaW50KDIwMCwwKSApLFxuXHRcdFx0bmV3IHBhcGVyLlNlZ21lbnQoIG5ldyBwYXBlci5Qb2ludCg2MDAsNDAwKSwgbmV3IHBhcGVyLlBvaW50KC0yMDAsMCksIG5ldyBwYXBlci5Qb2ludCgwLDApIClcblx0XHRdXG5cblx0XHRAUEFUSDIgPSBbXG5cdFx0XHRuZXcgcGFwZXIuU2VnbWVudCggbmV3IHBhcGVyLlBvaW50KDEwMCwwKSwgbmV3IHBhcGVyLlBvaW50KDAsMCksIG5ldyBwYXBlci5Qb2ludCgwLDIwMCkgKSxcblx0XHRcdG5ldyBwYXBlci5TZWdtZW50KCBuZXcgcGFwZXIuUG9pbnQoMzAwLDQwMCksIG5ldyBwYXBlci5Qb2ludCgtMTAwLDApLCBuZXcgcGFwZXIuUG9pbnQoMTAwLDApICksXG5cdFx0XHRuZXcgcGFwZXIuU2VnbWVudCggbmV3IHBhcGVyLlBvaW50KDUwMCwwKSwgbmV3IHBhcGVyLlBvaW50KDAsMjAwKSwgbmV3IHBhcGVyLlBvaW50KDAsMCkgKVxuXHRcdF1cblxuXHRcdEBsYXllciA9IHBhcGVyLnByb2plY3QuYWN0aXZlTGF5ZXJcblx0XHRAcGF0aCA9IG5ldyBwYXBlci5QYXRoKEBQQVRIMSlcblx0XHRAcGF0aC5zdHJva2VDb2xvciA9IG5ldyBwYXBlci5Db2xvcigxLDAsMClcblx0XHRAcGF0aC5zdHJva2VXaWR0aCA9IDVcblx0XHRAcGF0aC5mdWxseVNlbGVjdGVkID0gdHJ1ZVxuXHRcdEBsYXllci5hZGRDaGlsZChAcGF0aClcblx0XHRAcG9zaXRpb24gPSAwLjBcblxuXHRcdGNvbnNvbGUubG9nIEBwYXRoLnNlZ21lbnRzWzBdXG5cblx0XHRAcGF0aDIgPSBuZXcgcGFwZXIuUGF0aChAUEFUSDIpXG5cdFx0QHBhdGgyLnN0cm9rZUNvbG9yID0gbmV3IHBhcGVyLkNvbG9yKDAsMSwwKVxuXHRcdEBwYXRoMi5zdHJva2VXaWR0aCA9IDJcblx0XHRAcGF0aDIuZnVsbHlTZWxlY3RlZCA9IHRydWVcblxuXHRcdCPjgqTjg5njg7Pjg4joqK3lrppcblx0XHRwYXBlci52aWV3Lm9uRnJhbWUgPSBAb25GcmFtZVxuXHRcdEAkd2luZG93Lm9uKCdyZXNpemUnLEBvblJlc2l6ZSlcblx0XHRAb25SZXNpemUoKVxuXHRcdHJldHVyblxuXG5cdG9uRnJhbWU6ICgpID0+XG5cdFx0VFdFRU4udXBkYXRlKClcblx0XHRAY29udGV4dC5jbGVhclJlY3QoMCwwLEBzdGFnZVdpZHRoLEBzdGFnZUhlaWdodClcblxuXHRcdEBwb3NpdGlvbiArPSAwLjAwMDFcblx0XHRpZiBAcG9zaXRpb24gPiAxIHRoZW4gQHBvc2l0aW9uID0gMVxuXG5cdFx0Zm9yIHNlZ3VtZW50LCBpIGluIEBwYXRoLnNlZ21lbnRzXG5cdFx0XHRAY2hhbmdlU2VndW1lbnQgc2VndW1lbnQsIGlcblxuXHRcdHBhcGVyLnZpZXcudXBkYXRlKHRydWUpXG5cdFx0cmV0dXJuXG5cblx0Y2hhbmdlU2VndW1lbnQ6IChzZWd1bWVudCwgaSwgYmVmb3JlUGF0aCA9IEBQQVRIMSwgYWZ0cmVyUGF0aCA9IEBQQVRIMiApLT5cblx0XHRzZWd1bWVudC5wb2ludC54ID0gYmVmb3JlUGF0aFtpXS5wb2ludC54ICsgKGFmdHJlclBhdGhbaV0ucG9pbnQueCAtIGJlZm9yZVBhdGhbaV0ucG9pbnQueCkgKiBAcG9zaXRpb25cblx0XHRzZWd1bWVudC5wb2ludC55ID0gYmVmb3JlUGF0aFtpXS5wb2ludC55ICsgKGFmdHJlclBhdGhbaV0ucG9pbnQueSAtIGJlZm9yZVBhdGhbaV0ucG9pbnQueSkgKiBAcG9zaXRpb25cblx0XHRzZWd1bWVudC5oYW5kbGVJbi54ID0gYmVmb3JlUGF0aFtpXS5oYW5kbGVJbi54ICsgKGFmdHJlclBhdGhbaV0uaGFuZGxlSW4ueCAtIGJlZm9yZVBhdGhbaV0uaGFuZGxlSW4ueCkgKiBAcG9zaXRpb25cblx0XHRzZWd1bWVudC5oYW5kbGVJbi55ID0gYmVmb3JlUGF0aFtpXS5oYW5kbGVJbi55ICsgKGFmdHJlclBhdGhbaV0uaGFuZGxlSW4ueSAtIGJlZm9yZVBhdGhbaV0uaGFuZGxlSW4ueSkgKiBAcG9zaXRpb25cblx0XHRzZWd1bWVudC5oYW5kbGVPdXQueCA9IGJlZm9yZVBhdGhbaV0uaGFuZGxlT3V0LnggKyAoYWZ0cmVyUGF0aFtpXS5oYW5kbGVPdXQueCAtIGJlZm9yZVBhdGhbaV0uaGFuZGxlT3V0LngpICogQHBvc2l0aW9uXG5cdFx0c2VndW1lbnQuaGFuZGxlT3V0LnkgPSBiZWZvcmVQYXRoW2ldLmhhbmRsZU91dC55ICsgKGFmdHJlclBhdGhbaV0uaGFuZGxlT3V0LnkgLSBiZWZvcmVQYXRoW2ldLmhhbmRsZU91dC55KSAqIEBwb3NpdGlvblxuXHRcdHJldHVyblxuXG5cdG9uUmVzaXplOiAoKSA9PlxuXHRcdEBzdGFnZVdpZHRoID0gQCR3aW5kb3cud2lkdGgoKVxuXHRcdEBzdGFnZUhlaWdodCA9IEAkd2luZG93LmhlaWdodCgpXG5cdFx0QCRjYW52YXMuYXR0cignd2lkdGgnLEBzdGFnZVdpZHRoKydweCcpXG5cdFx0QCRjYW52YXMuYXR0cignaGVpZ2h0JyxAc3RhZ2VIZWlnaHQrJ3B4Jylcblx0XHRAJGNhbnZhcy5jc3MoJ3dpZHRoJyxAc3RhZ2VXaWR0aCsncHgnKVxuXHRcdEAkY2FudmFzLmNzcygnaGVpZ2h0JyxAc3RhZ2VIZWlnaHQrJ3B4Jylcblx0XHRyZXR1cm5cblxuI1xuIyBET00gUkVBRFlcbiNcbiQoKCktPlxuXHR3aW5kb3cubWFpbiA9IG5ldyBNYWluKClcbilcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vX2NvZmZlZS9fbW9jay8wMi1zaGFwZV90d2Vlbi9tYWluLmNvZmZlZVxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=