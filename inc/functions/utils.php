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

/**
 * Get status of WP_CLI
 *
 * @return bool
 * @since  0.1.1
 */
function is_wp_cli() {
	return defined( 'WP_CLI' ) && WP_CLI;
}
