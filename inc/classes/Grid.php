<?php

namespace SimpleBeforeAndAfter;

use WP_Query;
use SimpleBeforeAndAfter\Settings;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Nope!' );
}

class Grid {

	/**
	 * Holds the defaults for the grid, which combine global custom and default
	 * settings.
	 *
	 * @var $grid_defaults
	 * @since 0.1.0
	 */
	protected static $grid_defaults;

	/**
	 * Holds the settings for the grid, which combine the grid's defaults and
	 * locally set settings, i.e. shortcode attributes.
	 *
	 * @var $grid_defaults
	 * @since 0.1.2
	 */
	protected static $grid_settings;

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
		self::set_grid_defaults();
	}

	/**
	 * Set defaults for grid
	 *
	 * @since 0.1.1
	 */
	public function set_grid_defaults() {
		// Get the global settings, using the global defaults if no custom
		// globals are set
		$global_settings = Settings\get_global_settings( true );

		// Set the grid's defaults to the global settings
		self::$grid_defaults = array(
			'ids'          => '',
			'item_total'   => $global_settings['item_total'],
			'image_width'  => $global_settings['image_width'],
			'image_height' => $global_settings['image_height'],
			'before_label' => $global_settings['before_label'],
			'after_label'  => $global_settings['after_label'],
		);
	}

	/**
	 * Set settings for grid
	 *
	 * @since 0.1.1
	 */
	public function set_grid_settings( $local_settings = [] ) {
		// Set the grid's settings to the grid's defaults, which came from the
		// global custom and default settings
		self::$grid_settings = self::$grid_defaults;

		// If there are local settings
		if ( ! empty( $local_settings ) ) {

			// Remove empty values in local settings to override
			$local_settings = array_filter(
				$local_settings,
				function( $option ) {
					return ! empty( $option );
				}
			);

			// Set the grid's settings to the local settings. If empty, override
			// with the grid's settings, which came from the grid's defaults
			self::$grid_settings = wp_parse_args( $local_settings, self::$grid_settings );
		}
	}

	/**
	 * Get HTML for grid
	 *
	 * @param  array  $args
	 * @return string $html
	 * @since  0.1.1
	 */
	public function get_grid( $local_settings = [] ) {
		// Pass the local settings to the grid's settings
		self::set_grid_settings( $local_settings );

		// Set $args to the grid's settings
		$args = self::$grid_settings;

		// Set up query args
		$query_args = array(
			'post_type'              => 'before_and_after',
			'posts_per_page'         => $args['item_total'],
			'post_status'            => 'publish',
			'no_found_rows'          => true,
			'update_post_term_cache' => false,
		);

		// Add query argument if specific post IDs were passed in
		if ( ! empty( $args['ids'] ) ) {
			// Strip white space from ids string and convert to array
			$ids                    = preg_replace( '/\s+/', '', $args['ids'] );
			$query_args['post__in'] = explode( ',', $ids );
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
