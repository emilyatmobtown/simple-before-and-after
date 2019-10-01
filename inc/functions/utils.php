<?php
/**
 * Utility functions
 *
 * @package SimpleBeforeAndAfter
 */

namespace SimpleBeforeAndAfter\Utils;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Nope!' );
}

// Global constants
define( 'SBA_DEFAULT_IMAGE_WIDTH', 485 );
define( 'SBA_DEFAULT_IMAGE_HEIGHT', 200 );

/**
 * Get settings with defaults
 *
 * @return array
 * @since  0.1.1
 */
function get_settings( $set_default = false ) {
	$defaults = [
		'image_width'  => SBA_DEFAULT_IMAGE_WIDTH,
		'image_height' => SBA_DEFAULT_IMAGE_HEIGHT,
	];

	$settings = get_option( 'sba_settings', [] );

	// Use defaults where no value is set
	if ( $set_default ) {
		// Remove empty values in settings to override with defaults
		$settings = array_filter(
			$settings,
			function( $option ) {
				return ! empty( $option );
			}
		);
		$settings = wp_parse_args( $settings, $defaults );
	}

	return $settings;
}
