<?php
/**
 * Plugin Name:         Simple Before and After
 * Description:         Displays a simple grid that swaps Before and After images.
 * Version:             0.1.0
 * Requires at least:   4.9
 * Requires PHP:        7.0
 * Author:              Emily Leffler Schulman, Mobtown Studios
 * Author URI:          https://emilylefflerschulman.com
 * License:             GPLv2 or later
 * License URI:         https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:         simple-before-and-after
 * Domain Path:         /languages
 *
 * @package             SimpleBeforeAndAfter
 */

namespace SimpleBeforeAndAfter;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Nope!' );
}

// Global constants
define( 'SBA_VERSION', '0.1.0' );
define( 'SBA_URL', plugin_dir_url( __FILE__ ) );
define( 'SBA_PATH', plugin_dir_path( __FILE__ ) );
define( 'SBA_INC', SBA_PATH . 'inc/' );

// Include files
require_once SBA_INC . 'functions/core.php';

// Activation/Deactivation
register_activation_hook( __FILE__, '\SimpleBeforeAndAfter\Core\activate' );
register_deactivation_hook( __FILE__, '\SimpleBeforeAndAfter\Core\deactivate' );

// Bootstrap.
Core\setup();

// Load classes
spl_autoload_register(
	function( $class ) {
		// project-specific namespace prefix.
		$prefix = 'SimpleBeforeAndAfter\\';
		// base directory for the namespace prefix.
		$base_dir = SBA_INC . 'classes/';
		// does the class use the namespace prefix?
		$len = strlen( $prefix );

		if ( strncmp( $prefix, $class, $len ) !== 0 ) {
			return;
		}

		$relative_class = substr( $class, $len );
		$file           = $base_dir . str_replace( '\\', '/', $relative_class ) . '.php';

			// if the file exists, require it.
		if ( file_exists( $file ) ) {
			require $file;
		}
	}
);

// Set Up Before and After Post Type
BeforeAndAfterPostType::factory();

// Set Up Grid
Grid::factory();

// Set Up Grid Shortcode
GridShortcode::factory();
