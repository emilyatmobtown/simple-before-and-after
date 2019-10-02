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
			'before_and_after_id' => '',
			'item_total'          => $settings['item_total'],
			'before_label'        => $settings['before_label'],
			'after_label'         => $settings['after_label'],
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
			'posts_per_page'         => $args['item_total'],
			'post_status'            => 'publish',
			'no_found_rows'          => true,
			'update_post_term_cache' => false,
		);

		// If we only passed in one post ID
		if ( ! empty( $args['before_and_after_id'] ) ) {
			$query_args['include'] = $args['before_and_after_id'];
		}

		$html     = '';
		$ba_query = new WP_Query( $query_args );

		if ( $ba_query->have_posts() ) {
			$html .= '<div class="sba-grid">';

			while ( $ba_query->have_posts() ) {
				$ba_query->the_post();
				$post_id      = $ba_query->post->ID;
				$before_url   = get_post_meta( $post_id, 'sba_before_img', true );
				$after_url    = get_post_meta( $post_id, 'sba_after_img', true );
				$before_label = $args['before_label'];
				$after_label  = $args['after_label'];

				// Must have both Before and After images to display
				if ( ! empty( $before_url ) && ! empty( $after_url ) ) {
					$html .= '<div class="sba-grid-item-wrapper">';
					$html .= '<div class="sba-grid-item">';

					$before_id = attachment_url_to_postid( $before_url );

					if ( ! empty( $before_label ) ) {
						$html .= '<span class="sba-img-caption">';
						$html .= esc_attr( $before_label );
						$html .= '</span>';
					}

					$html .= wp_get_attachment_image( $before_id, 'sba-grid-image', false, array( 'class' => 'sba-before-img' ) );

					$after_id = attachment_url_to_postid( $after_url );

					if ( ! empty( $after_label ) ) {
						$html .= '<span class="sba-img-caption inactive">';
						$html .= esc_attr( $after_label );
						$html .= '</span>';
					}

					$html .= wp_get_attachment_image( $after_id, 'sba-grid-image', false, array( 'class' => 'sba-after-img inactive' ) );

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
