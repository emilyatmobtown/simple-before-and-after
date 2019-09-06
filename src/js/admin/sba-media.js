/**
 * Description: Loads media uploader to select Before and After images
 **/

 jQuery( document ).ready( function( $ ) {
	'use strict';

    var frame,
    uploadImageButton = $( '#before_and_after_meta_box.postbox .sba-meta-box-upload-button' ),
    deleteImageButton = $( '#before_and_after_meta_box.postbox .sba-meta-box-delete-button' );

	// Runs when the upload button is clicked.
	uploadImageButton.on( 'click', function( e ) {

        var field = $( this ).parent( '.field' ),
        img = field.find( '.sba-meta-box-img' ),
        imgInput = field.find( '.sba-meta-box-input-field' ),
        deleteButton = field.find( '.sba-meta-box-delete-button' );

        // Make sure the media API exists
        if ( typeof 'undefined' === wp  || ! wp.media ) {
            return;
        }

        // Prevent the default action from occurring.
		e.preventDefault();

        // Create a new media frame
        frame = wp.media({
            title: metaImage.title,
            button: { text: metaImage.button },
            multiple: false,  // Allow only single file selection
            library: {
                type: [ 'image/jpeg', 'image/png', 'image/gif' ]
            }
        });

		// Runs when an image is selected.
		frame.on( 'select', function() {

			// Grab the attachment selection and creates a JSON representation of the model.
			var attachment = frame.state().get( 'selection' ).first().toJSON();

            // Send the src for our custom image field.
            img.attr( 'src', attachment.url ).removeClass( 'inactive' );

            // Send the attachment URL to our custom image input field.
			imgInput.val( attachment.url );

            // Shows delete Button
            deleteButton.removeClass( 'inactive' );

		});

		// Opens the media library frame on click.
		frame.open();
	});

    // Runs when the delete button is clicked
    deleteImageButton.on( 'click', function( e ) {

        var field = $( this ).parent( '.field' ),
        img = field.find( '.sba-meta-box-img' ),
        imgInput = field.find( '.sba-meta-box-input-field' );

        // Prevent the default action from occurring.
		e.preventDefault();

        // Remove the image URL from the img tag
        img.attr( 'src', '' ).addClass( 'inactive' );

        // Remove the image URL from the input field
        imgInput.val( '' );

        // Hide the delete button
        $( this ).addClass( 'inactive' );
    });
});
