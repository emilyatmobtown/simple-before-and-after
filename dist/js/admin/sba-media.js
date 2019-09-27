"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Description: Loads media uploader to select Before and After images
 **/
jQuery(document).ready(function ($) {
  'use strict'; // Listen for a click on both the upload button and the image

  var frame,
      uploadImageTargets = $('#before_and_after_meta_box.postbox .sba-meta-box-upload-button, #before_and_after_meta_box.postbox .sba-meta-box-img'),
      deleteImageButton = $('#before_and_after_meta_box.postbox .sba-meta-box-delete-button'); // Runs when one of the upload targets is clicked.

  uploadImageTargets.on('click', function (e) {
    var field = $(this).closest('.field'),
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNiYS1tZWRpYS5qcyJdLCJuYW1lcyI6WyJqUXVlcnkiLCJkb2N1bWVudCIsInJlYWR5IiwiJCIsImZyYW1lIiwidXBsb2FkSW1hZ2VUYXJnZXRzIiwiZGVsZXRlSW1hZ2VCdXR0b24iLCJvbiIsImUiLCJmaWVsZCIsImNsb3Nlc3QiLCJpbWciLCJmaW5kIiwiaW1nSW5wdXQiLCJkZWxldGVCdXR0b24iLCJ3cCIsIm1lZGlhIiwicHJldmVudERlZmF1bHQiLCJ0aXRsZSIsIm1ldGFJbWFnZSIsImJ1dHRvbiIsInRleHQiLCJtdWx0aXBsZSIsImxpYnJhcnkiLCJ0eXBlIiwiYXR0YWNobWVudCIsInN0YXRlIiwiZ2V0IiwiZmlyc3QiLCJ0b0pTT04iLCJhdHRyIiwidXJsIiwicmVtb3ZlQ2xhc3MiLCJ2YWwiLCJvcGVuIiwicGFyZW50IiwiYWRkQ2xhc3MiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7O0FBSUNBLE1BQU0sQ0FBRUMsUUFBRixDQUFOLENBQW1CQyxLQUFuQixDQUEwQixVQUFVQyxDQUFWLEVBQWM7QUFDeEMsZUFEd0MsQ0FHeEM7O0FBQ0EsTUFBSUMsS0FBSjtBQUFBLE1BQ0FDLGtCQUFrQixHQUFHRixDQUFDLENBQUUsc0hBQUYsQ0FEdEI7QUFBQSxNQUVBRyxpQkFBaUIsR0FBR0gsQ0FBQyxDQUFFLGdFQUFGLENBRnJCLENBSndDLENBUXhDOztBQUNBRSxFQUFBQSxrQkFBa0IsQ0FBQ0UsRUFBbkIsQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBVUMsQ0FBVixFQUFjO0FBRTdDLFFBQUlDLEtBQUssR0FBR04sQ0FBQyxDQUFFLElBQUYsQ0FBRCxDQUFVTyxPQUFWLENBQW1CLFFBQW5CLENBQVo7QUFBQSxRQUNBQyxHQUFHLEdBQUdGLEtBQUssQ0FBQ0csSUFBTixDQUFZLG1CQUFaLENBRE47QUFBQSxRQUVBQyxRQUFRLEdBQUdKLEtBQUssQ0FBQ0csSUFBTixDQUFZLDJCQUFaLENBRlg7QUFBQSxRQUdBRSxZQUFZLEdBQUdMLEtBQUssQ0FBQ0csSUFBTixDQUFZLDZCQUFaLENBSGYsQ0FGNkMsQ0FPN0M7O0FBQ0EsUUFBSyxRQUFPLFdBQVAsTUFBdUJHLEVBQXZCLElBQThCLENBQUVBLEVBQUUsQ0FBQ0MsS0FBeEMsRUFBZ0Q7QUFDL0M7QUFDQSxLQVY0QyxDQVk3Qzs7O0FBQ0FSLElBQUFBLENBQUMsQ0FBQ1MsY0FBRixHQWI2QyxDQWU3Qzs7QUFDQWIsSUFBQUEsS0FBSyxHQUFHVyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNoQkUsTUFBQUEsS0FBSyxFQUFFQyxTQUFTLENBQUNELEtBREQ7QUFFaEJFLE1BQUFBLE1BQU0sRUFBRTtBQUFFQyxRQUFBQSxJQUFJLEVBQUVGLFNBQVMsQ0FBQ0M7QUFBbEIsT0FGUTtBQUdoQkUsTUFBQUEsUUFBUSxFQUFFLEtBSE07QUFHRTtBQUNsQkMsTUFBQUEsT0FBTyxFQUFFO0FBQ1JDLFFBQUFBLElBQUksRUFBRSxDQUFFLFlBQUYsRUFBZ0IsV0FBaEIsRUFBNkIsV0FBN0I7QUFERTtBQUpPLEtBQVQsQ0FBUixDQWhCNkMsQ0F5QjdDOztBQUNBcEIsSUFBQUEsS0FBSyxDQUFDRyxFQUFOLENBQVUsUUFBVixFQUFvQixZQUFXO0FBRTlCO0FBQ0EsVUFBSWtCLFVBQVUsR0FBR3JCLEtBQUssQ0FBQ3NCLEtBQU4sR0FBY0MsR0FBZCxDQUFtQixXQUFuQixFQUFpQ0MsS0FBakMsR0FBeUNDLE1BQXpDLEVBQWpCLENBSDhCLENBSzlCOztBQUNBbEIsTUFBQUEsR0FBRyxDQUFDbUIsSUFBSixDQUFVLEtBQVYsRUFBaUJMLFVBQVUsQ0FBQ00sR0FBNUIsRUFBa0NDLFdBQWxDLENBQStDLFVBQS9DLEVBTjhCLENBUTlCOztBQUNBbkIsTUFBQUEsUUFBUSxDQUFDb0IsR0FBVCxDQUFjUixVQUFVLENBQUNNLEdBQXpCLEVBVDhCLENBVzlCOztBQUNBakIsTUFBQUEsWUFBWSxDQUFDa0IsV0FBYixDQUEwQixVQUExQjtBQUVBLEtBZEQsRUExQjZDLENBMEM3Qzs7QUFDQTVCLElBQUFBLEtBQUssQ0FBQzhCLElBQU47QUFDQSxHQTVDRCxFQVR3QyxDQXVEeEM7O0FBQ0E1QixFQUFBQSxpQkFBaUIsQ0FBQ0MsRUFBbEIsQ0FBc0IsT0FBdEIsRUFBK0IsVUFBVUMsQ0FBVixFQUFjO0FBRTVDLFFBQUlDLEtBQUssR0FBR04sQ0FBQyxDQUFFLElBQUYsQ0FBRCxDQUFVZ0MsTUFBVixDQUFrQixRQUFsQixDQUFaO0FBQUEsUUFDQXhCLEdBQUcsR0FBR0YsS0FBSyxDQUFDRyxJQUFOLENBQVksbUJBQVosQ0FETjtBQUFBLFFBRUFDLFFBQVEsR0FBR0osS0FBSyxDQUFDRyxJQUFOLENBQVksMkJBQVosQ0FGWCxDQUY0QyxDQU01Qzs7QUFDQUosSUFBQUEsQ0FBQyxDQUFDUyxjQUFGLEdBUDRDLENBUzVDOztBQUNBTixJQUFBQSxHQUFHLENBQUNtQixJQUFKLENBQVUsS0FBVixFQUFpQixFQUFqQixFQUFzQk0sUUFBdEIsQ0FBZ0MsVUFBaEMsRUFWNEMsQ0FZNUM7O0FBQ0F2QixJQUFBQSxRQUFRLENBQUNvQixHQUFULENBQWMsRUFBZCxFQWI0QyxDQWU1Qzs7QUFDQTlCLElBQUFBLENBQUMsQ0FBRSxJQUFGLENBQUQsQ0FBVWlDLFFBQVYsQ0FBb0IsVUFBcEI7QUFDQSxHQWpCRDtBQWtCQSxDQTFFQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRGVzY3JpcHRpb246IExvYWRzIG1lZGlhIHVwbG9hZGVyIHRvIHNlbGVjdCBCZWZvcmUgYW5kIEFmdGVyIGltYWdlc1xuICoqL1xuXG4galF1ZXJ5KCBkb2N1bWVudCApLnJlYWR5KCBmdW5jdGlvbiggJCApIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8vIExpc3RlbiBmb3IgYSBjbGljayBvbiBib3RoIHRoZSB1cGxvYWQgYnV0dG9uIGFuZCB0aGUgaW1hZ2Vcblx0dmFyIGZyYW1lLFxuXHR1cGxvYWRJbWFnZVRhcmdldHMgPSAkKCAnI2JlZm9yZV9hbmRfYWZ0ZXJfbWV0YV9ib3gucG9zdGJveCAuc2JhLW1ldGEtYm94LXVwbG9hZC1idXR0b24sICNiZWZvcmVfYW5kX2FmdGVyX21ldGFfYm94LnBvc3Rib3ggLnNiYS1tZXRhLWJveC1pbWcnICksXG5cdGRlbGV0ZUltYWdlQnV0dG9uID0gJCggJyNiZWZvcmVfYW5kX2FmdGVyX21ldGFfYm94LnBvc3Rib3ggLnNiYS1tZXRhLWJveC1kZWxldGUtYnV0dG9uJyApO1xuXG5cdC8vIFJ1bnMgd2hlbiBvbmUgb2YgdGhlIHVwbG9hZCB0YXJnZXRzIGlzIGNsaWNrZWQuXG5cdHVwbG9hZEltYWdlVGFyZ2V0cy5vbiggJ2NsaWNrJywgZnVuY3Rpb24oIGUgKSB7XG5cblx0XHR2YXIgZmllbGQgPSAkKCB0aGlzICkuY2xvc2VzdCggJy5maWVsZCcgKSxcblx0XHRpbWcgPSBmaWVsZC5maW5kKCAnLnNiYS1tZXRhLWJveC1pbWcnICksXG5cdFx0aW1nSW5wdXQgPSBmaWVsZC5maW5kKCAnLnNiYS1tZXRhLWJveC1pbnB1dC1maWVsZCcgKSxcblx0XHRkZWxldGVCdXR0b24gPSBmaWVsZC5maW5kKCAnLnNiYS1tZXRhLWJveC1kZWxldGUtYnV0dG9uJyApO1xuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoZSBtZWRpYSBBUEkgZXhpc3RzXG5cdFx0aWYgKCB0eXBlb2YgJ3VuZGVmaW5lZCcgPT09IHdwICB8fCAhIHdwLm1lZGlhICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFByZXZlbnQgdGhlIGRlZmF1bHQgYWN0aW9uIGZyb20gb2NjdXJyaW5nLlxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdC8vIENyZWF0ZSBhIG5ldyBtZWRpYSBmcmFtZVxuXHRcdGZyYW1lID0gd3AubWVkaWEoe1xuXHRcdFx0dGl0bGU6IG1ldGFJbWFnZS50aXRsZSxcblx0XHRcdGJ1dHRvbjogeyB0ZXh0OiBtZXRhSW1hZ2UuYnV0dG9uIH0sXG5cdFx0XHRtdWx0aXBsZTogZmFsc2UsICAvLyBBbGxvdyBvbmx5IHNpbmdsZSBmaWxlIHNlbGVjdGlvblxuXHRcdFx0bGlicmFyeToge1xuXHRcdFx0XHR0eXBlOiBbICdpbWFnZS9qcGVnJywgJ2ltYWdlL3BuZycsICdpbWFnZS9naWYnIF1cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIFJ1bnMgd2hlbiBhbiBpbWFnZSBpcyBzZWxlY3RlZC5cblx0XHRmcmFtZS5vbiggJ3NlbGVjdCcsIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBHcmFiIHRoZSBhdHRhY2htZW50IHNlbGVjdGlvbiBhbmQgY3JlYXRlcyBhIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsLlxuXHRcdFx0dmFyIGF0dGFjaG1lbnQgPSBmcmFtZS5zdGF0ZSgpLmdldCggJ3NlbGVjdGlvbicgKS5maXJzdCgpLnRvSlNPTigpO1xuXG5cdFx0XHQvLyBTZW5kIHRoZSBzcmMgZm9yIG91ciBjdXN0b20gaW1hZ2UgZmllbGQuXG5cdFx0XHRpbWcuYXR0ciggJ3NyYycsIGF0dGFjaG1lbnQudXJsICkucmVtb3ZlQ2xhc3MoICdpbmFjdGl2ZScgKTtcblxuXHRcdFx0Ly8gU2VuZCB0aGUgYXR0YWNobWVudCBVUkwgdG8gb3VyIGN1c3RvbSBpbWFnZSBpbnB1dCBmaWVsZC5cblx0XHRcdGltZ0lucHV0LnZhbCggYXR0YWNobWVudC51cmwgKTtcblxuXHRcdFx0Ly8gU2hvd3MgZGVsZXRlIEJ1dHRvblxuXHRcdFx0ZGVsZXRlQnV0dG9uLnJlbW92ZUNsYXNzKCAnaW5hY3RpdmUnICk7XG5cblx0XHR9KTtcblxuXHRcdC8vIE9wZW5zIHRoZSBtZWRpYSBsaWJyYXJ5IGZyYW1lIG9uIGNsaWNrLlxuXHRcdGZyYW1lLm9wZW4oKTtcblx0fSk7XG5cblx0Ly8gUnVucyB3aGVuIHRoZSBkZWxldGUgYnV0dG9uIGlzIGNsaWNrZWRcblx0ZGVsZXRlSW1hZ2VCdXR0b24ub24oICdjbGljaycsIGZ1bmN0aW9uKCBlICkge1xuXG5cdFx0dmFyIGZpZWxkID0gJCggdGhpcyApLnBhcmVudCggJy5maWVsZCcgKSxcblx0XHRpbWcgPSBmaWVsZC5maW5kKCAnLnNiYS1tZXRhLWJveC1pbWcnICksXG5cdFx0aW1nSW5wdXQgPSBmaWVsZC5maW5kKCAnLnNiYS1tZXRhLWJveC1pbnB1dC1maWVsZCcgKTtcblxuXHRcdC8vIFByZXZlbnQgdGhlIGRlZmF1bHQgYWN0aW9uIGZyb20gb2NjdXJyaW5nLlxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdC8vIFJlbW92ZSB0aGUgaW1hZ2UgVVJMIGZyb20gdGhlIGltZyB0YWdcblx0XHRpbWcuYXR0ciggJ3NyYycsICcnICkuYWRkQ2xhc3MoICdpbmFjdGl2ZScgKTtcblxuXHRcdC8vIFJlbW92ZSB0aGUgaW1hZ2UgVVJMIGZyb20gdGhlIGlucHV0IGZpZWxkXG5cdFx0aW1nSW5wdXQudmFsKCAnJyApO1xuXG5cdFx0Ly8gSGlkZSB0aGUgZGVsZXRlIGJ1dHRvblxuXHRcdCQoIHRoaXMgKS5hZGRDbGFzcyggJ2luYWN0aXZlJyApO1xuXHR9KTtcbn0pO1xuIl0sImZpbGUiOiJzYmEtbWVkaWEuanMifQ==
