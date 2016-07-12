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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDQ4ZjUzZmI4ZjNkYzZiZWY0OWE/MDg5ZCoqKioiLCJ3ZWJwYWNrOi8vLy4vX2NvZmZlZS9fbW9jay8wMy1jb3Nfc2luL21haW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDckNBO0dBQUE7O0FBQUEsU0FBUTs7QUFDUixVQUFTOztBQUNULGNBQWE7O0FBRVA7R0FDUTs7QUFDWjtLQUFBLFVBQVUsRUFBRSxRQUFGO0tBQ1YsSUFBQyxPQUFELEdBQVUsT0FBTyxDQUFDLEdBQVIsQ0FBWSxDQUFaO0tBQ1YsSUFBQyxJQUFELEdBQU8sSUFBQyxPQUFNLENBQUMsVUFBUixDQUFtQixJQUFuQjtLQUNQLElBQUMsS0FBRCxHQUFZLFdBQU8sSUFBQyxJQUFSLEVBQVksb0JBQVo7S0FDWixJQUFDLElBQUQsR0FBVyxXQUFPLElBQUMsSUFBUixFQUFZLG9CQUFaO0tBQ1gsSUFBQyxNQUFELEdBQWEsV0FBTyxJQUFDLElBQVIsRUFBWSxvQkFBWjtLQVFiLElBQUMsTUFBRCxHQUFTO0tBQ1QsSUFBQyxPQUFEO0FBQ0E7R0FoQlk7O2tCQWtCYixTQUFRO0FBQ1A7S0FBQSxJQUFDLE1BQUQsSUFBVTtLQUNWLElBQUMsSUFBRyxDQUFDLFNBQUwsQ0FBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLEtBQW5CLEVBQXlCLE1BQXpCO0tBQ0EsSUFBQyxLQUFJLENBQUMsQ0FBTixHQUFVLElBQUMsTUFBSyxDQUFDLENBQVAsR0FBVyxNQUFNLElBQUksQ0FBQyxHQUFMLENBQVMsSUFBQyxNQUFWLElBQW1CO0tBQzlDLElBQUMsS0FBSSxDQUFDLENBQU4sR0FBVTtLQUNWLElBQUMsSUFBRyxDQUFDLENBQUwsR0FBUztLQUNULElBQUMsSUFBRyxDQUFDLENBQUwsR0FBUyxJQUFDLE1BQUssQ0FBQyxDQUFQLEdBQVcsTUFBTSxJQUFJLENBQUMsR0FBTCxDQUFTLElBQUMsTUFBVixJQUFtQjtLQUM3QyxJQUFDLEtBQUksQ0FBQyxJQUFOO0tBQ0EsSUFBQyxJQUFHLENBQUMsSUFBTDtLQUNBLElBQUMsTUFBSyxDQUFDLElBQVA7S0FFQSxRQUFRLFNBQU87S0FDZixJQUFDLElBQUcsQ0FBQyxNQUFMLENBQVksQ0FBWixFQUFjLEtBQWQ7QUFDQSxVQUFTLHFGQUFUO09BQ0MsUUFBUSxJQUFDLE1BQUQsR0FBUyxJQUFFLFVBQUYsR0FBZSxDQUFmLEdBQW1CLElBQUksQ0FBQztPQUN6QyxZQUFZLElBQUksQ0FBQyxHQUFMLENBQVMsQ0FBQyxJQUFDLE1BQUQsR0FBUyxJQUFFLFVBQVosSUFBd0IsR0FBakMsSUFBd0M7T0FDcEQsSUFBSSxJQUFFLEtBQUYsR0FBUTtPQUNaLElBQUksUUFBUSxJQUFJLENBQUMsR0FBTCxDQUFTLEtBQVQsSUFBa0I7T0FDOUIsSUFBQyxJQUFHLENBQUMsTUFBTCxDQUFZLENBQVosRUFBYyxDQUFkO0FBTEQ7S0FNQSxJQUFDLElBQUcsQ0FBQyxXQUFMLEdBQW1CO0tBQ25CLElBQUMsSUFBRyxDQUFDLFdBQUwsR0FBbUI7S0FDbkIsSUFBQyxJQUFHLENBQUMsTUFBTDtLQUVBLHNCQUFzQixJQUFDLE9BQXZCO0dBdkJPOzs7Ozs7QUEyQkg7R0FDUSxnQkFBQyxHQUFELEVBQUssS0FBTDtLQUNaLElBQUMsSUFBRCxHQUFPO0tBQ1AsSUFBQyxNQUFELEdBQVM7S0FDVCxJQUFDLEVBQUQsR0FBSztLQUNMLElBQUMsRUFBRCxHQUFLO0dBSk87O29CQU1iLE9BQU07S0FDTCxJQUFDLElBQUcsQ0FBQyxTQUFMLEdBQWlCLElBQUM7S0FDbEIsSUFBQyxJQUFHLENBQUMsU0FBTDtLQUNBLElBQUMsSUFBRyxDQUFDLEdBQUwsQ0FBUyxJQUFDLEVBQVYsRUFBYSxJQUFDLEVBQWQsRUFBaUIsRUFBakIsRUFBcUIsQ0FBckIsRUFBd0IsSUFBSSxDQUFDLEVBQUwsR0FBUSxDQUFoQyxFQUFtQyxLQUFuQztZQUNBLElBQUMsSUFBRyxDQUFDLElBQUw7R0FKSzs7Ozs7O0FBT1AsR0FBRTtBQUNEO1VBQUEsT0FBVztBQURWLEVBQUYiLCJmaWxlIjoibW9jay8wMy1jb3Nfc2luL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDQ0OGY1M2ZiOGYzZGM2YmVmNDlhXG4gKiovIiwiXG5XSURUSCA9IDgwMFxuSEVJR0hUID0gODAwXG5OVU1fUE9JTlRTID0gODBcblxuY2xhc3MgTWFpblxuXHRjb25zdHJ1Y3RvcjogKCkgLT5cblx0XHQkY2FudmFzID0gJChcIiNQbGF5MlwiKVxuXHRcdEBjYW52YXMgPSAkY2FudmFzLmdldCgwKVxuXHRcdEBjdHggPSBAY2FudmFzLmdldENvbnRleHQoJzJkJylcblx0XHRAYmx1ZSA9IG5ldyBDaXJjbGUoQGN0eCwncmdiYSgwLDAsMjU1LDAuNzUpJylcblx0XHRAcmVkID0gbmV3IENpcmNsZShAY3R4LCdyZ2JhKDI1NSwwLDAsMC43NSknKVxuXHRcdEBncmVlbiA9IG5ldyBDaXJjbGUoQGN0eCwncmdiYSgwLDI1NSwwLDAuNzUpJylcblxuXHRcdCMgY3R4LmJlZ2luUGF0aCgpXG5cdFx0IyBjdHgubW92ZVRvKDAsMClcblx0XHQjIGN0eC5saW5lVG8oMTAsMTApXG5cdFx0IyBjdHguc3Ryb2tlU3R5bGUgPSAncmdiKDAsIDAsIDApJ1xuXHRcdCMgY3R4LmxpbmVXaWR0aCA9IDVcblx0XHQjIGN0eC5zdHJva2UoKVxuXHRcdEBjb3VudCA9IDBcblx0XHRAdXBkYXRlKClcblx0XHRyZXR1cm5cblxuXHR1cGRhdGU6ICgpID0+XG5cdFx0QGNvdW50ICs9IDAuMDVcblx0XHRAY3R4LmNsZWFyUmVjdCgwLDAsV0lEVEgsSEVJR0hUKVxuXHRcdEBibHVlLnggPSBAZ3JlZW4ueCA9IDIwMCArIE1hdGguY29zKEBjb3VudCkgKiAxMDBcblx0XHRAYmx1ZS55ID0gMjAwXG5cdFx0QHJlZC54ID0gMjAwXG5cdFx0QHJlZC55ID0gQGdyZWVuLnkgPSAyMDAgKyBNYXRoLnNpbihAY291bnQpICogMTAwXG5cdFx0QGJsdWUuZHJhdygpXG5cdFx0QHJlZC5kcmF3KClcblx0XHRAZ3JlZW4uZHJhdygpXG5cblx0XHRiYXNlWSA9IEhFSUdIVC0yMDBcblx0XHRAY3R4Lm1vdmVUbygwLGJhc2VZKVxuXHRcdGZvciBpIGluIFswLi5OVU1fUE9JTlRTXVxuXHRcdFx0cGhhc2UgPSBAY291bnQgKyBpL05VTV9QT0lOVFMgKiA0ICogTWF0aC5QSVxuXHRcdFx0YW1wbGl0dWRlID0gTWF0aC5zaW4oKEBjb3VudCArIGkvTlVNX1BPSU5UUykqMS4zKSAqIDEwXG5cdFx0XHR4ID0gaSpXSURUSC9OVU1fUE9JTlRTXG5cdFx0XHR5ID0gYmFzZVkgKyBNYXRoLnNpbihwaGFzZSkgKiBhbXBsaXR1ZGVcblx0XHRcdEBjdHgubGluZVRvKHgseSlcblx0XHRAY3R4LnN0cm9rZVN0eWxlID0gJ3JnYigwLCAwLCAwKSdcblx0XHRAY3R4LnN0cm9rZVdpZHRoID0gM1xuXHRcdEBjdHguc3Ryb2tlKClcblxuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShAdXBkYXRlKVxuXHRcdHJldHVyblxuXG5cbmNsYXNzIENpcmNsZVxuXHRjb25zdHJ1Y3RvcjogKGN0eCxjb2xvcikgLT5cblx0XHRAY3R4ID0gY3R4XG5cdFx0QGNvbG9yID0gY29sb3Jcblx0XHRAeCA9IDBcblx0XHRAeSA9IDBcblxuXHRkcmF3OiAtPlxuXHRcdEBjdHguZmlsbFN0eWxlID0gQGNvbG9yXG5cdFx0QGN0eC5iZWdpblBhdGgoKVxuXHRcdEBjdHguYXJjKEB4LCBAeSwgMTAsIDAsIE1hdGguUEkqMiwgZmFsc2UpXG5cdFx0QGN0eC5maWxsKClcblxuXG4kKC0+XG5cdG1haW4gPSBuZXcgTWFpbigpXG4pXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9fY29mZmVlL19tb2NrLzAzLWNvc19zaW4vbWFpbi5jb2ZmZWVcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9