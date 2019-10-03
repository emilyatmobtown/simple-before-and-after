<?php

namespace SimpleBeforeAndAfter;

use SimpleBeforeAndAfter\Grid as Grid;
use SimpleBeforeAndAfter\Settings as Settings;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Nope!' );
}

class GridShortcode {

	/**
	 * Return singleton instance of class
	 *
	 * @return self
	 * @since  0.1.0
	 */
	public static function factory() {
		static $instance = false;
		if ( ! $instance ) {
			$instance = new self();
			$instance->setup();
		}
		return $instance;
	}

	/**
	 * Initialize class
	 *
	 * @since 0.1.0
	 */
	public function setup() {
		add_action( 'init', array( $this, 'register_before_and_after_shortcodes' ) );
	}

	/**
	 * Register shortcode
	 *
	 * @since 0.1.0
	 */
	public function register_before_and_after_shortcodes() {
		add_shortcode( 'simple_before_and_after', array( $this, 'before_and_after_shortcode_output' ) );
	}

	/**
	 * Shortcode callback that returns Grid HTML
	 *
	 * @param array $atts
	 * @param string $content
	 * @param string $tag
	 * @return string
	 * @since 0.1.0
	 */
	public function before_and_after_shortcode_output( $atts, $content = '', $tag ) {
		// Don't add global defaults here. That's covered in Grid
		$args = shortcode_atts(
			array(
				'ids'          => '',
				'item_total'   => '',
				'image_width'  => '',
				'image_height' => '',
				'before_label' => '',
				'after_label'  => '',
			),
			$atts,
			$tag
		);

		$args = Settings\sanitize_settings( $args );
		$html = Grid::factory()->get_grid( $args );
		return $html;
	}
}
