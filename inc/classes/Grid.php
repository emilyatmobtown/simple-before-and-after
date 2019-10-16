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
	 * Get settings for grid
	 *
	 * @param  array $local_settings
	 * @return array @$grid_settings
	 * @since  0.1.2
	 */
	public function get_grid_settings( $local_settings = [] ) {
		// Set the grid's settings to the grid's defaults, which came from the
		// global custom and default settings
		$grid_settings = [];
		$grid_settings = self::$grid_defaults;

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
			$grid_settings = wp_parse_args( $local_settings, $grid_settings );
		}

		return $grid_settings;
	}

	/**
	 * Get HTML for grid
	 *
	 * @param  array  $args
	 * @return string $html
	 * @since  0.1.1
	 */
	public function get_grid( $local_settings = [] ) {
		// Get the grid's settings, overriding globals with any local settings
		$args = self::get_grid_settings( $local_settings );

		// Set up query args
		$query_args = array(
			'orderby'                => 'rand',
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

		$ba_query = new WP_Query( $query_args );

		if ( $ba_query->have_posts() ) {
			ob_start();
			?>

			<div class="sba-grid">

			<?php
			while ( $ba_query->have_posts() ) {
				$ba_query->the_post();

				$post_id      = $ba_query->post->ID;
				$before_url   = get_post_meta( $post_id, 'sba_before_img', true );
				$after_url    = get_post_meta( $post_id, 'sba_after_img', true );
				$before_id    = attachment_url_to_postid( $before_url );
				$after_id     = attachment_url_to_postid( $after_url );
				$before_label = $args['before_label'];
				$after_label  = $args['after_label'];

				// Must have both Before and After images to display
				if ( ! empty( $before_url ) && ! empty( $after_url ) ) {
					?>

					<div class="sba-grid-item-wrapper">
						<div class="sba-grid-item">

					<?php if ( ! empty( $before_label ) ) { ?>

							<span class="sba-img-caption"><?php echo esc_attr( $before_label ); ?></span>

					<?php } ?>

					<?php echo wp_get_attachment_image( $before_id, 'sba-grid-image', false, array( 'class' => 'sba-before-img' ) ); ?>

					<?php if ( ! empty( $after_label ) ) { ?>

							<span class="sba-img-caption inactive"><?php echo esc_attr( $after_label ); ?></span>

					<?php } ?>

					<?php echo wp_get_attachment_image( $after_id, 'sba-grid-image', false, array( 'class' => 'sba-after-img inactive' ) ); ?>

						</div><!-- .sba-grid-item -->
					</div><!-- .sba-grid-item-wrapper -->
					<?php
				}
			}
			?>

		</div><!-- .sba-grid -->

			<?php
		}

		$output = ob_get_clean();
		wp_reset_postdata();

		return $output;
	}
}
