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

	var Circle, HEIGHT, Main, NUM_POINTS, WIDTH,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	WIDTH = 800;
	
	HEIGHT = 800;
	
	NUM_POINTS = 80;
	
	Main = (function() {
	  function Main() {
	    this.update = bind(this.update, this);
	    var $canvas;
	    $canvas = $("#Play2");
	    this.canvas = $canvas.get(0);
	    this.ctx = this.canvas.getContext('2d');
	    this.blue = new Circle(this.ctx, 'rgba(0,0,255,0.75)');
	    this.red = new Circle(this.ctx, 'rgba(255,0,0,0.75)');
	    this.green = new Circle(this.ctx, 'rgba(0,255,0,0.75)');
	    this.count = 0;
	    this.update();
	    return;
	  }
	
	  Main.prototype.update = function() {
	    var amplitude, baseY, i, j, phase, ref, x, y;
	    this.count += 0.05;
	    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
	    this.blue.x = this.green.x = 200 + Math.cos(this.count) * 100;
	    this.blue.y = 200;
	    this.red.x = 200;
	    this.red.y = this.green.y = 200 + Math.sin(this.count) * 100;
	    this.blue.draw();
	    this.red.draw();
	    this.green.draw();
	    baseY = HEIGHT - 200;
	    this.ctx.moveTo(0, baseY);
	    for (i = j = 0, ref = NUM_POINTS; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
	      phase = this.count + i / NUM_POINTS * 4 * Math.PI;
	      amplitude = Math.sin((this.count + i / NUM_POINTS) * 1.3) * 10;
	      x = i * WIDTH / NUM_POINTS;
	      y = baseY + Math.sin(phase) * amplitude;
	      this.ctx.lineTo(x, y);
	    }
	    this.ctx.strokeStyle = 'rgb(0, 0, 0)';
	    this.ctx.strokeWidth = 3;
	    this.ctx.stroke();
	    requestAnimationFrame(this.update);
	  };
	
	  return Main;
	
	})();
	
	Circle = (function() {
	  function Circle(ctx, color) {
	    this.ctx = ctx;
	    this.color = color;
	    this.x = 0;
	    this.y = 0;
	  }
	
	  Circle.prototype.draw = function() {
	    this.ctx.fillStyle = this.color;
	    this.ctx.beginPath();
	    this.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
	    return this.ctx.fill();
	  };
	
	  return Circle;
	
	})();
	
	$(function() {
	  var main;
	  return main = new Main();
	});


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmRmYjUwM2E2ZGY3ODYxZWYxZTM/MmEzZioqKiIsIndlYnBhY2s6Ly8vLi9fY29mZmVlL19tb2NrLzAzLWNvc19zaW4vbWFpbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNyQ0E7R0FBQTs7QUFBQSxTQUFROztBQUNSLFVBQVM7O0FBQ1QsY0FBYTs7QUFFUDtHQUNROztBQUNaO0tBQUEsVUFBVSxFQUFFLFFBQUY7S0FDVixJQUFDLE9BQUQsR0FBVSxPQUFPLENBQUMsR0FBUixDQUFZLENBQVo7S0FDVixJQUFDLElBQUQsR0FBTyxJQUFDLE9BQU0sQ0FBQyxVQUFSLENBQW1CLElBQW5CO0tBQ1AsSUFBQyxLQUFELEdBQVksV0FBTyxJQUFDLElBQVIsRUFBWSxvQkFBWjtLQUNaLElBQUMsSUFBRCxHQUFXLFdBQU8sSUFBQyxJQUFSLEVBQVksb0JBQVo7S0FDWCxJQUFDLE1BQUQsR0FBYSxXQUFPLElBQUMsSUFBUixFQUFZLG9CQUFaO0tBUWIsSUFBQyxNQUFELEdBQVM7S0FDVCxJQUFDLE9BQUQ7QUFDQTtHQWhCWTs7a0JBa0JiLFNBQVE7QUFDUDtLQUFBLElBQUMsTUFBRCxJQUFVO0tBQ1YsSUFBQyxJQUFHLENBQUMsU0FBTCxDQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsS0FBbkIsRUFBeUIsTUFBekI7S0FDQSxJQUFDLEtBQUksQ0FBQyxDQUFOLEdBQVUsSUFBQyxNQUFLLENBQUMsQ0FBUCxHQUFXLE1BQU0sSUFBSSxDQUFDLEdBQUwsQ0FBUyxJQUFDLE1BQVYsSUFBbUI7S0FDOUMsSUFBQyxLQUFJLENBQUMsQ0FBTixHQUFVO0tBQ1YsSUFBQyxJQUFHLENBQUMsQ0FBTCxHQUFTO0tBQ1QsSUFBQyxJQUFHLENBQUMsQ0FBTCxHQUFTLElBQUMsTUFBSyxDQUFDLENBQVAsR0FBVyxNQUFNLElBQUksQ0FBQyxHQUFMLENBQVMsSUFBQyxNQUFWLElBQW1CO0tBQzdDLElBQUMsS0FBSSxDQUFDLElBQU47S0FDQSxJQUFDLElBQUcsQ0FBQyxJQUFMO0tBQ0EsSUFBQyxNQUFLLENBQUMsSUFBUDtLQUVBLFFBQVEsU0FBTztLQUNmLElBQUMsSUFBRyxDQUFDLE1BQUwsQ0FBWSxDQUFaLEVBQWMsS0FBZDtBQUNBLFVBQVMscUZBQVQ7T0FDQyxRQUFRLElBQUMsTUFBRCxHQUFTLElBQUUsVUFBRixHQUFlLENBQWYsR0FBbUIsSUFBSSxDQUFDO09BQ3pDLFlBQVksSUFBSSxDQUFDLEdBQUwsQ0FBUyxDQUFDLElBQUMsTUFBRCxHQUFTLElBQUUsVUFBWixJQUF3QixHQUFqQyxJQUF3QztPQUNwRCxJQUFJLElBQUUsS0FBRixHQUFRO09BQ1osSUFBSSxRQUFRLElBQUksQ0FBQyxHQUFMLENBQVMsS0FBVCxJQUFrQjtPQUM5QixJQUFDLElBQUcsQ0FBQyxNQUFMLENBQVksQ0FBWixFQUFjLENBQWQ7QUFMRDtLQU1BLElBQUMsSUFBRyxDQUFDLFdBQUwsR0FBbUI7S0FDbkIsSUFBQyxJQUFHLENBQUMsV0FBTCxHQUFtQjtLQUNuQixJQUFDLElBQUcsQ0FBQyxNQUFMO0tBRUEsc0JBQXNCLElBQUMsT0FBdkI7R0F2Qk87Ozs7OztBQTJCSDtHQUNRLGdCQUFDLEdBQUQsRUFBSyxLQUFMO0tBQ1osSUFBQyxJQUFELEdBQU87S0FDUCxJQUFDLE1BQUQsR0FBUztLQUNULElBQUMsRUFBRCxHQUFLO0tBQ0wsSUFBQyxFQUFELEdBQUs7R0FKTzs7b0JBTWIsT0FBTTtLQUNMLElBQUMsSUFBRyxDQUFDLFNBQUwsR0FBaUIsSUFBQztLQUNsQixJQUFDLElBQUcsQ0FBQyxTQUFMO0tBQ0EsSUFBQyxJQUFHLENBQUMsR0FBTCxDQUFTLElBQUMsRUFBVixFQUFhLElBQUMsRUFBZCxFQUFpQixFQUFqQixFQUFxQixDQUFyQixFQUF3QixJQUFJLENBQUMsRUFBTCxHQUFRLENBQWhDLEVBQW1DLEtBQW5DO1lBQ0EsSUFBQyxJQUFHLENBQUMsSUFBTDtHQUpLOzs7Ozs7QUFPUCxHQUFFO0FBQ0Q7VUFBQSxPQUFXO0FBRFYsRUFBRiIsImZpbGUiOiJtb2NrLzAzLWNvc19zaW4vbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZmRmYjUwM2E2ZGY3ODYxZWYxZTNcbiAqKi8iLCJcbldJRFRIID0gODAwXG5IRUlHSFQgPSA4MDBcbk5VTV9QT0lOVFMgPSA4MFxuXG5jbGFzcyBNYWluXG5cdGNvbnN0cnVjdG9yOiAoKSAtPlxuXHRcdCRjYW52YXMgPSAkKFwiI1BsYXkyXCIpXG5cdFx0QGNhbnZhcyA9ICRjYW52YXMuZ2V0KDApXG5cdFx0QGN0eCA9IEBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuXHRcdEBibHVlID0gbmV3IENpcmNsZShAY3R4LCdyZ2JhKDAsMCwyNTUsMC43NSknKVxuXHRcdEByZWQgPSBuZXcgQ2lyY2xlKEBjdHgsJ3JnYmEoMjU1LDAsMCwwLjc1KScpXG5cdFx0QGdyZWVuID0gbmV3IENpcmNsZShAY3R4LCdyZ2JhKDAsMjU1LDAsMC43NSknKVxuXG5cdFx0IyBjdHguYmVnaW5QYXRoKClcblx0XHQjIGN0eC5tb3ZlVG8oMCwwKVxuXHRcdCMgY3R4LmxpbmVUbygxMCwxMClcblx0XHQjIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2IoMCwgMCwgMCknXG5cdFx0IyBjdHgubGluZVdpZHRoID0gNVxuXHRcdCMgY3R4LnN0cm9rZSgpXG5cdFx0QGNvdW50ID0gMFxuXHRcdEB1cGRhdGUoKVxuXHRcdHJldHVyblxuXG5cdHVwZGF0ZTogKCkgPT5cblx0XHRAY291bnQgKz0gMC4wNVxuXHRcdEBjdHguY2xlYXJSZWN0KDAsMCxXSURUSCxIRUlHSFQpXG5cdFx0QGJsdWUueCA9IEBncmVlbi54ID0gMjAwICsgTWF0aC5jb3MoQGNvdW50KSAqIDEwMFxuXHRcdEBibHVlLnkgPSAyMDBcblx0XHRAcmVkLnggPSAyMDBcblx0XHRAcmVkLnkgPSBAZ3JlZW4ueSA9IDIwMCArIE1hdGguc2luKEBjb3VudCkgKiAxMDBcblx0XHRAYmx1ZS5kcmF3KClcblx0XHRAcmVkLmRyYXcoKVxuXHRcdEBncmVlbi5kcmF3KClcblxuXHRcdGJhc2VZID0gSEVJR0hULTIwMFxuXHRcdEBjdHgubW92ZVRvKDAsYmFzZVkpXG5cdFx0Zm9yIGkgaW4gWzAuLk5VTV9QT0lOVFNdXG5cdFx0XHRwaGFzZSA9IEBjb3VudCArIGkvTlVNX1BPSU5UUyAqIDQgKiBNYXRoLlBJXG5cdFx0XHRhbXBsaXR1ZGUgPSBNYXRoLnNpbigoQGNvdW50ICsgaS9OVU1fUE9JTlRTKSoxLjMpICogMTBcblx0XHRcdHggPSBpKldJRFRIL05VTV9QT0lOVFNcblx0XHRcdHkgPSBiYXNlWSArIE1hdGguc2luKHBoYXNlKSAqIGFtcGxpdHVkZVxuXHRcdFx0QGN0eC5saW5lVG8oeCx5KVxuXHRcdEBjdHguc3Ryb2tlU3R5bGUgPSAncmdiKDAsIDAsIDApJ1xuXHRcdEBjdHguc3Ryb2tlV2lkdGggPSAzXG5cdFx0QGN0eC5zdHJva2UoKVxuXG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKEB1cGRhdGUpXG5cdFx0cmV0dXJuXG5cblxuY2xhc3MgQ2lyY2xlXG5cdGNvbnN0cnVjdG9yOiAoY3R4LGNvbG9yKSAtPlxuXHRcdEBjdHggPSBjdHhcblx0XHRAY29sb3IgPSBjb2xvclxuXHRcdEB4ID0gMFxuXHRcdEB5ID0gMFxuXG5cdGRyYXc6IC0+XG5cdFx0QGN0eC5maWxsU3R5bGUgPSBAY29sb3Jcblx0XHRAY3R4LmJlZ2luUGF0aCgpXG5cdFx0QGN0eC5hcmMoQHgsIEB5LCAxMCwgMCwgTWF0aC5QSSoyLCBmYWxzZSlcblx0XHRAY3R4LmZpbGwoKVxuXG5cbiQoLT5cblx0bWFpbiA9IG5ldyBNYWluKClcbilcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL19jb2ZmZWUvX21vY2svMDMtY29zX3Npbi9tYWluLmNvZmZlZVxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=