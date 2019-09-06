<?php

namespace SimpleBeforeAndAfter;

use SimpleBeforeAndAfter\Grid as Grid;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Nope!' );
}

class GridShortcode {

	/**
	 * Return singleton instance of class
	 *
	 * @return self
	 * @since 0.1.0
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

	public function register_before_and_after_shortcodes() {
		add_shortcode( 'simple_before_and_after', array( $this, 'before_and_after_shortcode_output' ) );
	}

	public function before_and_after_shortcode_output( $atts, $content = '', $tag ) {
		$args = shortcode_atts(
			array(
				'before_and_after_id'         => '',
				'number_of_before_and_afters' => '',
			),
			$atts,
			$tag
		);

		$html = Grid::factory()->get_before_and_after_grid( $args );
		return $html;
	}
}
