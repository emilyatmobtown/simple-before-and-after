/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/admin/sba-media.js":
/*!***********************************!*\
  !*** ./src/js/admin/sba-media.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Description: Load media uploader on pages with our custom metabox
 * Author:      Chris Ferdinandi
 * Author URI:  https://gist.github.com/cferdinandi
 */
jQuery(document).ready(function ($) {
  'use strict'; // Instantiates the variable that holds the media library frame.

  var metaImageFrame; // Runs when the media button is clicked.

  $('body').click(function (e) {
    // Get the btn
    var btn = e.target; // Check if it's the upload button

    if (!btn || !$(btn).attr('data-media-uploader-target')) return; // Get the field target

    var field = $(btn).data('media-uploader-target'); // Prevents the default action from occuring.

    e.preventDefault(); // Sets up the media library frame

    metaImageFrame = wp.media.frames.metaImageFrame = wp.media({
      title: meta_image.title,
      button: {
        text: 'Use this file'
      }
    }); // Runs when an image is selected.

    metaImageFrame.on('select', function () {
      // Grabs the attachment selection and creates a JSON representation of the model.
      var media_attachment = metaImageFrame.state().get('selection').first().toJSON(); // Sends the attachment URL to our custom image input field.

      $(field).val(media_attachment.url);
    }); // Opens the media library frame.

    metaImageFrame.open();
  });
});

/***/ }),

/***/ 1:
/*!*****************************************!*\
  !*** multi ./src/js/admin/sba-media.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/emilylefflerschulman/Library/Mobile Documents/com~apple~CloudDocs/_code/wp-local-docker-sites/framemender-test/wordpress/wp-content/plugins/simple-before-and-after/src/js/admin/sba-media.js */"./src/js/admin/sba-media.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FkbWluL3NiYS1tZWRpYS5qcyJdLCJuYW1lcyI6WyJqUXVlcnkiLCJkb2N1bWVudCIsInJlYWR5IiwiJCIsIm1ldGFJbWFnZUZyYW1lIiwiY2xpY2siLCJlIiwiYnRuIiwidGFyZ2V0IiwiYXR0ciIsImZpZWxkIiwiZGF0YSIsInByZXZlbnREZWZhdWx0Iiwid3AiLCJtZWRpYSIsImZyYW1lcyIsInRpdGxlIiwibWV0YV9pbWFnZSIsImJ1dHRvbiIsInRleHQiLCJvbiIsIm1lZGlhX2F0dGFjaG1lbnQiLCJzdGF0ZSIsImdldCIsImZpcnN0IiwidG9KU09OIiwidmFsIiwidXJsIiwib3BlbiJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBOzs7OztBQUtDQSxNQUFNLENBQUNDLFFBQUQsQ0FBTixDQUFpQkMsS0FBakIsQ0FBdUIsVUFBU0MsQ0FBVCxFQUFXO0FBRWxDLGVBRmtDLENBSWxDOztBQUNBLE1BQUlDLGNBQUosQ0FMa0MsQ0FPbEM7O0FBQ0FELEdBQUMsQ0FBRSxNQUFGLENBQUQsQ0FBWUUsS0FBWixDQUFrQixVQUFTQyxDQUFULEVBQVk7QUFFN0I7QUFDQSxRQUFJQyxHQUFHLEdBQUdELENBQUMsQ0FBQ0UsTUFBWixDQUg2QixDQUs3Qjs7QUFDQSxRQUFLLENBQUNELEdBQUQsSUFBUSxDQUFDSixDQUFDLENBQUVJLEdBQUYsQ0FBRCxDQUFTRSxJQUFULENBQWUsNEJBQWYsQ0FBZCxFQUE4RCxPQU5qQyxDQVE3Qjs7QUFDQSxRQUFJQyxLQUFLLEdBQUdQLENBQUMsQ0FBRUksR0FBRixDQUFELENBQVNJLElBQVQsQ0FBZSx1QkFBZixDQUFaLENBVDZCLENBVzdCOztBQUNBTCxLQUFDLENBQUNNLGNBQUYsR0FaNkIsQ0FjN0I7O0FBQ0FSLGtCQUFjLEdBQUdTLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTQyxNQUFULENBQWdCWCxjQUFoQixHQUFpQ1MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDMURFLFdBQUssRUFBRUMsVUFBVSxDQUFDRCxLQUR3QztBQUUxREUsWUFBTSxFQUFFO0FBQUVDLFlBQUksRUFBRztBQUFUO0FBRmtELEtBQVQsQ0FBbEQsQ0FmNkIsQ0FvQjdCOztBQUNBZixrQkFBYyxDQUFDZ0IsRUFBZixDQUFrQixRQUFsQixFQUE0QixZQUFXO0FBRXRDO0FBQ0EsVUFBSUMsZ0JBQWdCLEdBQUdqQixjQUFjLENBQUNrQixLQUFmLEdBQXVCQyxHQUF2QixDQUEyQixXQUEzQixFQUF3Q0MsS0FBeEMsR0FBZ0RDLE1BQWhELEVBQXZCLENBSHNDLENBS3RDOztBQUNBdEIsT0FBQyxDQUFFTyxLQUFGLENBQUQsQ0FBV2dCLEdBQVgsQ0FBZUwsZ0JBQWdCLENBQUNNLEdBQWhDO0FBRUEsS0FSRCxFQXJCNkIsQ0ErQjdCOztBQUNBdkIsa0JBQWMsQ0FBQ3dCLElBQWY7QUFFQSxHQWxDRDtBQW9DQSxDQTVDQSxFIiwiZmlsZSI6InNiYS1tZWRpYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcbiIsIi8qKlxuICogRGVzY3JpcHRpb246IExvYWQgbWVkaWEgdXBsb2FkZXIgb24gcGFnZXMgd2l0aCBvdXIgY3VzdG9tIG1ldGFib3hcbiAqIEF1dGhvcjogICAgICBDaHJpcyBGZXJkaW5hbmRpXG4gKiBBdXRob3IgVVJJOiAgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vY2ZlcmRpbmFuZGlcbiAqL1xuIGpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCl7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8vIEluc3RhbnRpYXRlcyB0aGUgdmFyaWFibGUgdGhhdCBob2xkcyB0aGUgbWVkaWEgbGlicmFyeSBmcmFtZS5cblx0dmFyIG1ldGFJbWFnZUZyYW1lO1xuXG5cdC8vIFJ1bnMgd2hlbiB0aGUgbWVkaWEgYnV0dG9uIGlzIGNsaWNrZWQuXG5cdCQoICdib2R5JyApLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblxuXHRcdC8vIEdldCB0aGUgYnRuXG5cdFx0dmFyIGJ0biA9IGUudGFyZ2V0O1xuXG5cdFx0Ly8gQ2hlY2sgaWYgaXQncyB0aGUgdXBsb2FkIGJ1dHRvblxuXHRcdGlmICggIWJ0biB8fCAhJCggYnRuICkuYXR0ciggJ2RhdGEtbWVkaWEtdXBsb2FkZXItdGFyZ2V0JyApICkgcmV0dXJuO1xuXG5cdFx0Ly8gR2V0IHRoZSBmaWVsZCB0YXJnZXRcblx0XHR2YXIgZmllbGQgPSAkKCBidG4gKS5kYXRhKCAnbWVkaWEtdXBsb2FkZXItdGFyZ2V0JyApO1xuXG5cdFx0Ly8gUHJldmVudHMgdGhlIGRlZmF1bHQgYWN0aW9uIGZyb20gb2NjdXJpbmcuXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0Ly8gU2V0cyB1cCB0aGUgbWVkaWEgbGlicmFyeSBmcmFtZVxuXHRcdG1ldGFJbWFnZUZyYW1lID0gd3AubWVkaWEuZnJhbWVzLm1ldGFJbWFnZUZyYW1lID0gd3AubWVkaWEoe1xuXHRcdFx0dGl0bGU6IG1ldGFfaW1hZ2UudGl0bGUsXG5cdFx0XHRidXR0b246IHsgdGV4dDogICdVc2UgdGhpcyBmaWxlJyB9LFxuXHRcdH0pO1xuXG5cdFx0Ly8gUnVucyB3aGVuIGFuIGltYWdlIGlzIHNlbGVjdGVkLlxuXHRcdG1ldGFJbWFnZUZyYW1lLm9uKCdzZWxlY3QnLCBmdW5jdGlvbigpIHtcblxuXHRcdFx0Ly8gR3JhYnMgdGhlIGF0dGFjaG1lbnQgc2VsZWN0aW9uIGFuZCBjcmVhdGVzIGEgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwuXG5cdFx0XHR2YXIgbWVkaWFfYXR0YWNobWVudCA9IG1ldGFJbWFnZUZyYW1lLnN0YXRlKCkuZ2V0KCdzZWxlY3Rpb24nKS5maXJzdCgpLnRvSlNPTigpO1xuXG5cdFx0XHQvLyBTZW5kcyB0aGUgYXR0YWNobWVudCBVUkwgdG8gb3VyIGN1c3RvbSBpbWFnZSBpbnB1dCBmaWVsZC5cblx0XHRcdCQoIGZpZWxkICkudmFsKG1lZGlhX2F0dGFjaG1lbnQudXJsKTtcblxuXHRcdH0pO1xuXG5cdFx0Ly8gT3BlbnMgdGhlIG1lZGlhIGxpYnJhcnkgZnJhbWUuXG5cdFx0bWV0YUltYWdlRnJhbWUub3BlbigpO1xuXG5cdH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=