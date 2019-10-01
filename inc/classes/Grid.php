<?php

namespace SimpleBeforeAndAfter;

use WP_Query;
use SimpleBeforeAndAfter\Settings as Settings;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Nope!' );
}

class Grid {

	protected static $defaults;

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
	 * @since 0.1.1
	 */
	public function setup() {
		self::set_defaults();
	}

	public function set_defaults() {
		$settings       = Settings::get_settings( true );
		self::$defaults = array(
			'before_and_after_id'         => '',
			'number_of_before_and_afters' => $settings['image_total'],
		);
	}

	public function get_grid( $args = [] ) {

		// Remove empty values in settings to override with defaults
		$args = array_filter(
			$args,
			function( $option ) {
				return ! empty( $option );
			}
		);
		$args = wp_parse_args( $args, self::$defaults );

		$query_args = array(
			'post_type'              => 'before_and_after',
			'posts_per_page'         => $args['number_of_before_and_afters'],
			'post_status'            => 'publish',
			'no_found_rows'          => true,
			'update_post_term_cache' => false,
		);

		// If we only passed in one post ID
		if ( ! empty( $default_args['before_and_after_id'] ) ) {
			$query_args['include'] = $default_args['before_and_after_id'];
		}

		$html     = '';
		$ba_query = new WP_Query( $query_args );

		if ( $ba_query->have_posts() ) {
			$html .= '<div class="sba-grid">';

			while ( $ba_query->have_posts() ) {
				$ba_query->the_post();
				$ba_id         = $ba_query->post->ID;
				$ba_before_url = get_post_meta( $ba_id, 'sba_before_img', true );
				$ba_after_url  = get_post_meta( $ba_id, 'sba_after_img', true );

				// Must have both Before and After images to display
				if ( ! empty( $ba_before_url ) && ! empty( $ba_after_url ) ) {
					$html .= '<div class="sba-grid-item-wrapper">';
					$html .= '<div class="sba-grid-item">';

					$ba_before_id = attachment_url_to_postid( $ba_before_url );
					$html        .= '<span class="sba-img-caption">';
					// translators: This is the caption for the Before image when the grid is displayed.
					$html .= __( 'Before', 'simple-before-and-after' );
					$html .= '</span>';
					$html .= wp_get_attachment_image( $ba_before_id, 'sba-grid-image', false, array( 'class' => 'sba-before-img' ) );

					$ba_after_id = attachment_url_to_postid( $ba_after_url );
					$html       .= '<span class="sba-img-caption inactive">';
					// translators: This is the caption for the After image when the grid is displayed.
					$html .= __( 'After', 'simple-before-and-after' );
					$html .= '</span>';
					$html .= wp_get_attachment_image( $ba_after_id, 'sba-grid-image', false, array( 'class' => 'sba-after-img inactive' ) );

					$html .= '</div>'; // .sba-grid-item
					$html .= '</div>'; // .sba-grid-item-wrapper
				}
			}

			$html .= '</div>'; // .sba-grid-wrapper
		}

		wp_reset_postdata();

		return $html;
	}
}
