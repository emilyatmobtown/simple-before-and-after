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
 * Description: Loads media uploader to select Before and After images
 */
jQuery(document).ready(function ($) {
  'use strict';

  var frame,
      uploadImageButton = $('#before_and_after_meta_box.postbox .sba-meta-box-upload-button'),
      deleteImageButton = $('#before_and_after_meta_box.postbox .sba-meta-box-delete-button'); // Runs when the upload button is clicked.

  uploadImageButton.on('click', function (e) {
    // Make sure the media API exists
    if (typeof wp === 'undefined' || !wp.media) {
      return;
    } // Prevent the default action from occurring.


    e.preventDefault(); // Create a new media frame

    frame = wp.media({
      title: meta_image.title,
      button: {
        text: meta_image.button
      },
      multiple: false,
      // Allow only single file selection
      library: {
        type: ['image/jpeg', 'image/png', 'image/gif']
      }
    });
    var field = $(this).parent('.field'),
        img = field.find('.sba-meta-box-img'),
        imgInput = field.find('.sba-meta-box-input-field'),
        deleteButton = field.find('.sba-meta-box-delete-button'); // Runs when an image is selected.

    frame.on('select', function () {
      // Grab the attachment selection and creates a JSON representation of the model.
      var attachment = frame.state().get('selection').first().toJSON(); // Send the src for our custom image field.

      img.attr('src', attachment.url).removeClass('inactive'); // Send the attachment URL to our custom image input field.

      imgInput.val(attachment.url); // Shows delete Button

      deleteButton.removeClass('inactive');
    }); // Opens the media library frame on click.

    frame.open();
  }); // Runs when the delete button is clicked

  deleteImageButton.on('click', function (e) {
    // Prevent the default action from occurring.
    e.preventDefault();
    var field = $(this).parent('.field'),
        img = field.find('.sba-meta-box-img'),
        imgInput = field.find('.sba-meta-box-input-field'); // Remove the image URL from the img tag

    img.attr('src', '').addClass('inactive'); // Remove the image URL from the input field

    imgInput.val(''); // Hide the delete button

    $(this).addClass('inactive');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FkbWluL3NiYS1tZWRpYS5qcyJdLCJuYW1lcyI6WyJqUXVlcnkiLCJkb2N1bWVudCIsInJlYWR5IiwiJCIsImZyYW1lIiwidXBsb2FkSW1hZ2VCdXR0b24iLCJkZWxldGVJbWFnZUJ1dHRvbiIsIm9uIiwiZSIsIndwIiwibWVkaWEiLCJwcmV2ZW50RGVmYXVsdCIsInRpdGxlIiwibWV0YV9pbWFnZSIsImJ1dHRvbiIsInRleHQiLCJtdWx0aXBsZSIsImxpYnJhcnkiLCJ0eXBlIiwiZmllbGQiLCJwYXJlbnQiLCJpbWciLCJmaW5kIiwiaW1nSW5wdXQiLCJkZWxldGVCdXR0b24iLCJhdHRhY2htZW50Iiwic3RhdGUiLCJnZXQiLCJmaXJzdCIsInRvSlNPTiIsImF0dHIiLCJ1cmwiLCJyZW1vdmVDbGFzcyIsInZhbCIsIm9wZW4iLCJhZGRDbGFzcyJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNE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SCxHQWpCRDtBQWtCSCxDQXpFQSxFIiwiZmlsZSI6InNiYS1tZWRpYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcbiIsIi8qKlxuICogRGVzY3JpcHRpb246IExvYWRzIG1lZGlhIHVwbG9hZGVyIHRvIHNlbGVjdCBCZWZvcmUgYW5kIEFmdGVyIGltYWdlc1xuICovXG5cbiBqUXVlcnkoIGRvY3VtZW50ICkucmVhZHkoIGZ1bmN0aW9uKCAkICl7XG5cdCd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBmcmFtZSxcbiAgICB1cGxvYWRJbWFnZUJ1dHRvbiA9ICQoICcjYmVmb3JlX2FuZF9hZnRlcl9tZXRhX2JveC5wb3N0Ym94IC5zYmEtbWV0YS1ib3gtdXBsb2FkLWJ1dHRvbicgKSxcbiAgICBkZWxldGVJbWFnZUJ1dHRvbiA9ICQoICcjYmVmb3JlX2FuZF9hZnRlcl9tZXRhX2JveC5wb3N0Ym94IC5zYmEtbWV0YS1ib3gtZGVsZXRlLWJ1dHRvbicpO1xuXG5cdC8vIFJ1bnMgd2hlbiB0aGUgdXBsb2FkIGJ1dHRvbiBpcyBjbGlja2VkLlxuXHR1cGxvYWRJbWFnZUJ1dHRvbi5vbiggJ2NsaWNrJywgZnVuY3Rpb24oIGUgKSB7XG5cbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBtZWRpYSBBUEkgZXhpc3RzXG4gICAgICAgIGlmICggdHlwZW9mIHdwID09PSAndW5kZWZpbmVkJyB8fCAhd3AubWVkaWEgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQcmV2ZW50IHRoZSBkZWZhdWx0IGFjdGlvbiBmcm9tIG9jY3VycmluZy5cblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IG1lZGlhIGZyYW1lXG4gICAgICAgIGZyYW1lID0gd3AubWVkaWEoe1xuICAgICAgICAgICAgdGl0bGU6IG1ldGFfaW1hZ2UudGl0bGUsXG4gICAgICAgICAgICBidXR0b246IHsgdGV4dDogbWV0YV9pbWFnZS5idXR0b24gfSxcbiAgICAgICAgICAgIG11bHRpcGxlOiBmYWxzZSwgIC8vIEFsbG93IG9ubHkgc2luZ2xlIGZpbGUgc2VsZWN0aW9uXG4gICAgICAgICAgICBsaWJyYXJ5OiB7XG4gICAgICAgICAgICAgICAgdHlwZTogWydpbWFnZS9qcGVnJywgJ2ltYWdlL3BuZycsICdpbWFnZS9naWYnXSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGZpZWxkID0gJCggdGhpcyApLnBhcmVudCggJy5maWVsZCcgKSxcbiAgICAgICAgaW1nID0gZmllbGQuZmluZCggJy5zYmEtbWV0YS1ib3gtaW1nJyApLFxuICAgICAgICBpbWdJbnB1dCA9IGZpZWxkLmZpbmQoICcuc2JhLW1ldGEtYm94LWlucHV0LWZpZWxkJyApLFxuICAgICAgICBkZWxldGVCdXR0b24gPSBmaWVsZC5maW5kKCAnLnNiYS1tZXRhLWJveC1kZWxldGUtYnV0dG9uJyApO1xuXG5cdFx0Ly8gUnVucyB3aGVuIGFuIGltYWdlIGlzIHNlbGVjdGVkLlxuXHRcdGZyYW1lLm9uKCAnc2VsZWN0JywgZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vIEdyYWIgdGhlIGF0dGFjaG1lbnQgc2VsZWN0aW9uIGFuZCBjcmVhdGVzIGEgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwuXG5cdFx0XHR2YXIgYXR0YWNobWVudCA9IGZyYW1lLnN0YXRlKCkuZ2V0KCAnc2VsZWN0aW9uJyApLmZpcnN0KCkudG9KU09OKCk7XG5cbiAgICAgICAgICAgIC8vIFNlbmQgdGhlIHNyYyBmb3Igb3VyIGN1c3RvbSBpbWFnZSBmaWVsZC5cbiAgICAgICAgICAgIGltZy5hdHRyKCAnc3JjJywgYXR0YWNobWVudC51cmwgKS5yZW1vdmVDbGFzcyggJ2luYWN0aXZlJyApO1xuXG4gICAgICAgICAgICAvLyBTZW5kIHRoZSBhdHRhY2htZW50IFVSTCB0byBvdXIgY3VzdG9tIGltYWdlIGlucHV0IGZpZWxkLlxuXHRcdFx0aW1nSW5wdXQudmFsKCBhdHRhY2htZW50LnVybCApO1xuXG4gICAgICAgICAgICAvLyBTaG93cyBkZWxldGUgQnV0dG9uXG4gICAgICAgICAgICBkZWxldGVCdXR0b24ucmVtb3ZlQ2xhc3MoICdpbmFjdGl2ZScgKTtcblxuXHRcdH0pO1xuXG5cdFx0Ly8gT3BlbnMgdGhlIG1lZGlhIGxpYnJhcnkgZnJhbWUgb24gY2xpY2suXG5cdFx0ZnJhbWUub3BlbigpO1xuXHR9KTtcblxuICAgIC8vIFJ1bnMgd2hlbiB0aGUgZGVsZXRlIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgZGVsZXRlSW1hZ2VCdXR0b24ub24oICdjbGljaycsIGZ1bmN0aW9uKCBlICkge1xuXG4gICAgICAgIC8vIFByZXZlbnQgdGhlIGRlZmF1bHQgYWN0aW9uIGZyb20gb2NjdXJyaW5nLlxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgZmllbGQgPSAkKCB0aGlzICkucGFyZW50KCAnLmZpZWxkJyApLFxuICAgICAgICBpbWcgPSBmaWVsZC5maW5kKCAnLnNiYS1tZXRhLWJveC1pbWcnICksXG4gICAgICAgIGltZ0lucHV0ID0gZmllbGQuZmluZCggJy5zYmEtbWV0YS1ib3gtaW5wdXQtZmllbGQnICk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBpbWFnZSBVUkwgZnJvbSB0aGUgaW1nIHRhZ1xuICAgICAgICBpbWcuYXR0ciggJ3NyYycsICcnICkuYWRkQ2xhc3MoICdpbmFjdGl2ZScgKTtcblxuICAgICAgICAvLyBSZW1vdmUgdGhlIGltYWdlIFVSTCBmcm9tIHRoZSBpbnB1dCBmaWVsZFxuICAgICAgICBpbWdJbnB1dC52YWwoICcnICk7XG5cbiAgICAgICAgLy8gSGlkZSB0aGUgZGVsZXRlIGJ1dHRvblxuICAgICAgICAkKCB0aGlzICkuYWRkQ2xhc3MoICdpbmFjdGl2ZScgKTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==