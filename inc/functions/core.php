<?php
/**
 * Core plugin functionality.
 *
 * @package SimpleBeforeAndAfter
 */

namespace SimpleBeforeAndAfter\Core;

use \WP_Error as WP_Error;

/**
 * Set-up routine
 *
 * @return void
 */
function setup() {
	$n = function( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	add_action( 'init', $n( 'i18n' ) );
	add_action( 'init', $n( 'init' ) );
	add_action( 'wp_enqueue_scripts', $n( 'scripts' ) );
	add_action( 'wp_enqueue_scripts', $n( 'styles' ) );
	add_action( 'admin_enqueue_scripts', $n( 'admin_scripts' ) );
	add_action( 'admin_enqueue_scripts', $n( 'admin_styles' ) );

	// Hook to allow async or defer on asset loading.
	add_filter( 'script_loader_tag', $n( 'script_loader_tag' ), 10, 2 );

	do_action( 'simple_before_and_after_loaded' );
}

/**
 * Registers the textdomain.
 *
 * @return void
 */
function i18n() {
	$locale = apply_filters( 'plugin_locale', get_locale(), 'simple-before-and-after' );
	load_textdomain( 'simple-before-and-after', WP_LANG_DIR . '/simple-before-and-after/simple-before-and-after-' . $locale . '.mo' );
	load_plugin_textdomain( 'simple-before-and-after', false, plugin_basename( SBA_PATH ) . '/languages/' );
}

/**
 * Initializes the plugin and fires an action other plugins can hook into.
 *
 * @return void
 */
function init() {
	do_action( 'simple_before_and_after_init' );
}

/**
 * Activate the plugin
 *
 * @return void
 */
function activate() {
	// First load the init scripts in case any rewrite functionality is being loaded
	init();
	flush_rewrite_rules();
}

/**
 * Deactivate the plugin
 *
 *
 * @return void
 */
function deactivate() {
	flush_rewrite_rules();
}


/**
 * The list of known contexts for enqueuing scripts/styles.
 *
 * @return array
 */
function get_enqueue_contexts() {
	return [ 'admin', 'frontend' ];
}

/**
 * Generate a URL to a script, taking into account whether SCRIPT_DEBUG is enabled.
 *
 * @param string $script Script file name (no .js extension)
 * @param string $context Context for the script ('admin', 'frontend')
 *
 * @return string|WP_Error URL
 */
function script_url( $script, $context ) {

	if ( ! in_array( $context, get_enqueue_contexts(), true ) ) {
		return new WP_Error( 'invalid_enqueue_context', 'Invalid $context specified in the SimpleBeforeAndAfter script loader.' );
	}

	return SBA_URL . "dist/js/${context}/${script}.js";

}

/**
 * Generate a URL to a stylesheet, taking into account whether SCRIPT_DEBUG is enabled.
 *
 * @param string $stylesheet Stylesheet file name (no .css extension)
 * @param string $context Context for the script ('admin', 'frontend')
 *
 * @return string URL
 */
function style_url( $stylesheet, $context ) {

	if ( ! in_array( $context, get_enqueue_contexts(), true ) ) {
		return new WP_Error( 'invalid_enqueue_context', 'Invalid $context specified in the SimpleBeforeAndAfter stylesheet loader.' );
	}

	return SBA_URL . "dist/css/${context}/${stylesheet}.css";

}

/**
 * Enqueue scripts for front-end.
 *
 * @return void
 */
function scripts() {

	wp_enqueue_script(
		'sba-script',
		script_url( 'simple-before-and-after', 'frontend' ),
		[],
		SBA_VERSION,
		true
	);

}

/**
 * Enqueue scripts for admin.
 *
 * @return void
 */
function admin_scripts() {
	global $typenow;

	if ( 'before_and_after' === $typenow ) {
		wp_enqueue_media();
		wp_enqueue_script(
			'sba-meta-box-image-loader',
			script_url( 'sba-media', 'admin' ),
			array( 'jquery' ),
			SBA_VERSION,
			true
		);
		wp_localize_script(
			'sba-meta-box-image-loader',
			'metaImage',
			array(
				// translators: This is the title of the image uploader.
				'title'  => __( 'Choose or Upload Image', 'simple-before-and-after' ),
				// translators: This is the button label for the image uploader.
				'button' => __( 'Use This Image', 'simple-before-and-after' ),
			)
		);
	}

}

/**
 * Enqueue styles for front-end.
 *
 * @return void
 */
function styles() {

	wp_enqueue_style(
		'sba-styles',
		style_url( 'simple-before-and-after', 'frontend' ),
		[],
		SBA_VERSION
	);

}

/**
 * Enqueue styles for admin.
 *
 * @return void
 */
function admin_styles() {
	global $typenow;

	if ( 'before_and_after' === $typenow ) {
		wp_enqueue_style(
			'sba-admin-styles',
			style_url( 'sba-admin', 'admin' ),
			[],
			SBA_VERSION
		);
	}

}

/**
 * Add async/defer attributes to enqueued scripts that have the specified script_execution flag.
 *
 * @link https://core.trac.wordpress.org/ticket/12009
 * @param string $tag    The script tag.
 * @param string $handle The script handle.
 * @return string
 */
function script_loader_tag( $tag, $handle ) {
	$script_execution = wp_scripts()->get_data( $handle, 'script_execution' );

	if ( ! $script_execution ) {
		return $tag;
	}

	if ( 'async' !== $script_execution && 'defer' !== $script_execution ) {
		return $tag; // _doing_it_wrong()?
	}

	// Abort adding async/defer for scripts that have this script as a dependency. _doing_it_wrong()?
	foreach ( wp_scripts()->registered as $script ) {
		if ( in_array( $handle, $script->deps, true ) ) {
			return $tag;
		}
	}

	// Add the attribute if it hasn't already been added.
	if ( ! preg_match( ":\s$script_execution(=|>|\s):", $tag ) ) {
		$tag = preg_replace( ':(?=></script>):', " $script_execution", $tag, 1 );
	}

	return $tag;
}
