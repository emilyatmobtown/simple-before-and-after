"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Description: Loads media uploader to select Before and After images
 **/
jQuery(document).ready(function ($) {
  'use strict';

  var frame,
      uploadImageButton = $('#before_and_after_meta_box.postbox .sba-meta-box-upload-button'),
      deleteImageButton = $('#before_and_after_meta_box.postbox .sba-meta-box-delete-button'); // Runs when the upload button is clicked.

  uploadImageButton.on('click', function (e) {
    var field = $(this).parent('.field'),
        img = field.find('.sba-meta-box-img'),
        imgInput = field.find('.sba-meta-box-input-field'),
        deleteButton = field.find('.sba-meta-box-delete-button'); // Make sure the media API exists

    if (_typeof('undefined') === wp || !wp.media) {
      return;
    } // Prevent the default action from occurring.


    e.preventDefault(); // Create a new media frame

    frame = wp.media({
      title: metaImage.title,
      button: {
        text: metaImage.button
      },
      multiple: false,
      // Allow only single file selection
      library: {
        type: ['image/jpeg', 'image/png', 'image/gif']
      }
    }); // Runs when an image is selected.

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
    var field = $(this).parent('.field'),
        img = field.find('.sba-meta-box-img'),
        imgInput = field.find('.sba-meta-box-input-field'); // Prevent the default action from occurring.

    e.preventDefault(); // Remove the image URL from the img tag

    img.attr('src', '').addClass('inactive'); // Remove the image URL from the input field

    imgInput.val(''); // Hide the delete button

    $(this).addClass('inactive');
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNiYS1tZWRpYS5qcyJdLCJuYW1lcyI6WyJqUXVlcnkiLCJkb2N1bWVudCIsInJlYWR5IiwiJCIsImZyYW1lIiwidXBsb2FkSW1hZ2VCdXR0b24iLCJkZWxldGVJbWFnZUJ1dHRvbiIsIm9uIiwiZSIsImZpZWxkIiwicGFyZW50IiwiaW1nIiwiZmluZCIsImltZ0lucHV0IiwiZGVsZXRlQnV0dG9uIiwid3AiLCJtZWRpYSIsInByZXZlbnREZWZhdWx0IiwidGl0bGUiLCJtZXRhSW1hZ2UiLCJidXR0b24iLCJ0ZXh0IiwibXVsdGlwbGUiLCJsaWJyYXJ5IiwidHlwZSIsImF0dGFjaG1lbnQiLCJzdGF0ZSIsImdldCIsImZpcnN0IiwidG9KU09OIiwiYXR0ciIsInVybCIsInJlbW92ZUNsYXNzIiwidmFsIiwib3BlbiIsImFkZENsYXNzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7OztBQUlDQSxNQUFNLENBQUVDLFFBQUYsQ0FBTixDQUFtQkMsS0FBbkIsQ0FBMEIsVUFBVUMsQ0FBVixFQUFjO0FBQ3hDOztBQUVHLE1BQUlDLEtBQUo7QUFBQSxNQUNBQyxpQkFBaUIsR0FBR0YsQ0FBQyxDQUFFLGdFQUFGLENBRHJCO0FBQUEsTUFFQUcsaUJBQWlCLEdBQUdILENBQUMsQ0FBRSxnRUFBRixDQUZyQixDQUhxQyxDQU94Qzs7QUFDQUUsRUFBQUEsaUJBQWlCLENBQUNFLEVBQWxCLENBQXNCLE9BQXRCLEVBQStCLFVBQVVDLENBQVYsRUFBYztBQUV0QyxRQUFJQyxLQUFLLEdBQUdOLENBQUMsQ0FBRSxJQUFGLENBQUQsQ0FBVU8sTUFBVixDQUFrQixRQUFsQixDQUFaO0FBQUEsUUFDQUMsR0FBRyxHQUFHRixLQUFLLENBQUNHLElBQU4sQ0FBWSxtQkFBWixDQUROO0FBQUEsUUFFQUMsUUFBUSxHQUFHSixLQUFLLENBQUNHLElBQU4sQ0FBWSwyQkFBWixDQUZYO0FBQUEsUUFHQUUsWUFBWSxHQUFHTCxLQUFLLENBQUNHLElBQU4sQ0FBWSw2QkFBWixDQUhmLENBRnNDLENBT3RDOztBQUNBLFFBQUssUUFBTyxXQUFQLE1BQXVCRyxFQUF2QixJQUE4QixDQUFFQSxFQUFFLENBQUNDLEtBQXhDLEVBQWdEO0FBQzVDO0FBQ0gsS0FWcUMsQ0FZdEM7OztBQUNOUixJQUFBQSxDQUFDLENBQUNTLGNBQUYsR0FiNEMsQ0FldEM7O0FBQ0FiLElBQUFBLEtBQUssR0FBR1csRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDYkUsTUFBQUEsS0FBSyxFQUFFQyxTQUFTLENBQUNELEtBREo7QUFFYkUsTUFBQUEsTUFBTSxFQUFFO0FBQUVDLFFBQUFBLElBQUksRUFBRUYsU0FBUyxDQUFDQztBQUFsQixPQUZLO0FBR2JFLE1BQUFBLFFBQVEsRUFBRSxLQUhHO0FBR0s7QUFDbEJDLE1BQUFBLE9BQU8sRUFBRTtBQUNMQyxRQUFBQSxJQUFJLEVBQUUsQ0FBRSxZQUFGLEVBQWdCLFdBQWhCLEVBQTZCLFdBQTdCO0FBREQ7QUFKSSxLQUFULENBQVIsQ0FoQnNDLENBeUI1Qzs7QUFDQXBCLElBQUFBLEtBQUssQ0FBQ0csRUFBTixDQUFVLFFBQVYsRUFBb0IsWUFBVztBQUU5QjtBQUNBLFVBQUlrQixVQUFVLEdBQUdyQixLQUFLLENBQUNzQixLQUFOLEdBQWNDLEdBQWQsQ0FBbUIsV0FBbkIsRUFBaUNDLEtBQWpDLEdBQXlDQyxNQUF6QyxFQUFqQixDQUg4QixDQUtyQjs7QUFDQWxCLE1BQUFBLEdBQUcsQ0FBQ21CLElBQUosQ0FBVSxLQUFWLEVBQWlCTCxVQUFVLENBQUNNLEdBQTVCLEVBQWtDQyxXQUFsQyxDQUErQyxVQUEvQyxFQU5xQixDQVFyQjs7QUFDVG5CLE1BQUFBLFFBQVEsQ0FBQ29CLEdBQVQsQ0FBY1IsVUFBVSxDQUFDTSxHQUF6QixFQVQ4QixDQVdyQjs7QUFDQWpCLE1BQUFBLFlBQVksQ0FBQ2tCLFdBQWIsQ0FBMEIsVUFBMUI7QUFFVCxLQWRELEVBMUI0QyxDQTBDNUM7O0FBQ0E1QixJQUFBQSxLQUFLLENBQUM4QixJQUFOO0FBQ0EsR0E1Q0QsRUFSd0MsQ0FzRHJDOztBQUNBNUIsRUFBQUEsaUJBQWlCLENBQUNDLEVBQWxCLENBQXNCLE9BQXRCLEVBQStCLFVBQVVDLENBQVYsRUFBYztBQUV6QyxRQUFJQyxLQUFLLEdBQUdOLENBQUMsQ0FBRSxJQUFGLENBQUQsQ0FBVU8sTUFBVixDQUFrQixRQUFsQixDQUFaO0FBQUEsUUFDQUMsR0FBRyxHQUFHRixLQUFLLENBQUNHLElBQU4sQ0FBWSxtQkFBWixDQUROO0FBQUEsUUFFQUMsUUFBUSxHQUFHSixLQUFLLENBQUNHLElBQU4sQ0FBWSwyQkFBWixDQUZYLENBRnlDLENBTXpDOztBQUNOSixJQUFBQSxDQUFDLENBQUNTLGNBQUYsR0FQK0MsQ0FTekM7O0FBQ0FOLElBQUFBLEdBQUcsQ0FBQ21CLElBQUosQ0FBVSxLQUFWLEVBQWlCLEVBQWpCLEVBQXNCSyxRQUF0QixDQUFnQyxVQUFoQyxFQVZ5QyxDQVl6Qzs7QUFDQXRCLElBQUFBLFFBQVEsQ0FBQ29CLEdBQVQsQ0FBYyxFQUFkLEVBYnlDLENBZXpDOztBQUNBOUIsSUFBQUEsQ0FBQyxDQUFFLElBQUYsQ0FBRCxDQUFVZ0MsUUFBVixDQUFvQixVQUFwQjtBQUNILEdBakJEO0FBa0JILENBekVBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBEZXNjcmlwdGlvbjogTG9hZHMgbWVkaWEgdXBsb2FkZXIgdG8gc2VsZWN0IEJlZm9yZSBhbmQgQWZ0ZXIgaW1hZ2VzXG4gKiovXG5cbiBqUXVlcnkoIGRvY3VtZW50ICkucmVhZHkoIGZ1bmN0aW9uKCAkICkge1xuXHQndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgZnJhbWUsXG4gICAgdXBsb2FkSW1hZ2VCdXR0b24gPSAkKCAnI2JlZm9yZV9hbmRfYWZ0ZXJfbWV0YV9ib3gucG9zdGJveCAuc2JhLW1ldGEtYm94LXVwbG9hZC1idXR0b24nICksXG4gICAgZGVsZXRlSW1hZ2VCdXR0b24gPSAkKCAnI2JlZm9yZV9hbmRfYWZ0ZXJfbWV0YV9ib3gucG9zdGJveCAuc2JhLW1ldGEtYm94LWRlbGV0ZS1idXR0b24nICk7XG5cblx0Ly8gUnVucyB3aGVuIHRoZSB1cGxvYWQgYnV0dG9uIGlzIGNsaWNrZWQuXG5cdHVwbG9hZEltYWdlQnV0dG9uLm9uKCAnY2xpY2snLCBmdW5jdGlvbiggZSApIHtcblxuICAgICAgICB2YXIgZmllbGQgPSAkKCB0aGlzICkucGFyZW50KCAnLmZpZWxkJyApLFxuICAgICAgICBpbWcgPSBmaWVsZC5maW5kKCAnLnNiYS1tZXRhLWJveC1pbWcnICksXG4gICAgICAgIGltZ0lucHV0ID0gZmllbGQuZmluZCggJy5zYmEtbWV0YS1ib3gtaW5wdXQtZmllbGQnICksXG4gICAgICAgIGRlbGV0ZUJ1dHRvbiA9IGZpZWxkLmZpbmQoICcuc2JhLW1ldGEtYm94LWRlbGV0ZS1idXR0b24nICk7XG5cbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBtZWRpYSBBUEkgZXhpc3RzXG4gICAgICAgIGlmICggdHlwZW9mICd1bmRlZmluZWQnID09PSB3cCAgfHwgISB3cC5tZWRpYSApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFByZXZlbnQgdGhlIGRlZmF1bHQgYWN0aW9uIGZyb20gb2NjdXJyaW5nLlxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgbWVkaWEgZnJhbWVcbiAgICAgICAgZnJhbWUgPSB3cC5tZWRpYSh7XG4gICAgICAgICAgICB0aXRsZTogbWV0YUltYWdlLnRpdGxlLFxuICAgICAgICAgICAgYnV0dG9uOiB7IHRleHQ6IG1ldGFJbWFnZS5idXR0b24gfSxcbiAgICAgICAgICAgIG11bHRpcGxlOiBmYWxzZSwgIC8vIEFsbG93IG9ubHkgc2luZ2xlIGZpbGUgc2VsZWN0aW9uXG4gICAgICAgICAgICBsaWJyYXJ5OiB7XG4gICAgICAgICAgICAgICAgdHlwZTogWyAnaW1hZ2UvanBlZycsICdpbWFnZS9wbmcnLCAnaW1hZ2UvZ2lmJyBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cdFx0Ly8gUnVucyB3aGVuIGFuIGltYWdlIGlzIHNlbGVjdGVkLlxuXHRcdGZyYW1lLm9uKCAnc2VsZWN0JywgZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vIEdyYWIgdGhlIGF0dGFjaG1lbnQgc2VsZWN0aW9uIGFuZCBjcmVhdGVzIGEgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwuXG5cdFx0XHR2YXIgYXR0YWNobWVudCA9IGZyYW1lLnN0YXRlKCkuZ2V0KCAnc2VsZWN0aW9uJyApLmZpcnN0KCkudG9KU09OKCk7XG5cbiAgICAgICAgICAgIC8vIFNlbmQgdGhlIHNyYyBmb3Igb3VyIGN1c3RvbSBpbWFnZSBmaWVsZC5cbiAgICAgICAgICAgIGltZy5hdHRyKCAnc3JjJywgYXR0YWNobWVudC51cmwgKS5yZW1vdmVDbGFzcyggJ2luYWN0aXZlJyApO1xuXG4gICAgICAgICAgICAvLyBTZW5kIHRoZSBhdHRhY2htZW50IFVSTCB0byBvdXIgY3VzdG9tIGltYWdlIGlucHV0IGZpZWxkLlxuXHRcdFx0aW1nSW5wdXQudmFsKCBhdHRhY2htZW50LnVybCApO1xuXG4gICAgICAgICAgICAvLyBTaG93cyBkZWxldGUgQnV0dG9uXG4gICAgICAgICAgICBkZWxldGVCdXR0b24ucmVtb3ZlQ2xhc3MoICdpbmFjdGl2ZScgKTtcblxuXHRcdH0pO1xuXG5cdFx0Ly8gT3BlbnMgdGhlIG1lZGlhIGxpYnJhcnkgZnJhbWUgb24gY2xpY2suXG5cdFx0ZnJhbWUub3BlbigpO1xuXHR9KTtcblxuICAgIC8vIFJ1bnMgd2hlbiB0aGUgZGVsZXRlIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgZGVsZXRlSW1hZ2VCdXR0b24ub24oICdjbGljaycsIGZ1bmN0aW9uKCBlICkge1xuXG4gICAgICAgIHZhciBmaWVsZCA9ICQoIHRoaXMgKS5wYXJlbnQoICcuZmllbGQnICksXG4gICAgICAgIGltZyA9IGZpZWxkLmZpbmQoICcuc2JhLW1ldGEtYm94LWltZycgKSxcbiAgICAgICAgaW1nSW5wdXQgPSBmaWVsZC5maW5kKCAnLnNiYS1tZXRhLWJveC1pbnB1dC1maWVsZCcgKTtcblxuICAgICAgICAvLyBQcmV2ZW50IHRoZSBkZWZhdWx0IGFjdGlvbiBmcm9tIG9jY3VycmluZy5cblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBpbWFnZSBVUkwgZnJvbSB0aGUgaW1nIHRhZ1xuICAgICAgICBpbWcuYXR0ciggJ3NyYycsICcnICkuYWRkQ2xhc3MoICdpbmFjdGl2ZScgKTtcblxuICAgICAgICAvLyBSZW1vdmUgdGhlIGltYWdlIFVSTCBmcm9tIHRoZSBpbnB1dCBmaWVsZFxuICAgICAgICBpbWdJbnB1dC52YWwoICcnICk7XG5cbiAgICAgICAgLy8gSGlkZSB0aGUgZGVsZXRlIGJ1dHRvblxuICAgICAgICAkKCB0aGlzICkuYWRkQ2xhc3MoICdpbmFjdGl2ZScgKTtcbiAgICB9KTtcbn0pO1xuIl0sImZpbGUiOiJzYmEtbWVkaWEuanMifQ==
