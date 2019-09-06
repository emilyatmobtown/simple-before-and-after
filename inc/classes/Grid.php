<?php

namespace SimpleBeforeAndAfter;

use WP_Query;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Nope!' );
}

class Grid {
	protected $total_posts_to_show;

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
		add_action( 'init', array( $this, 'set_total_posts_to_show' ) );
	}

	public function set_total_posts_to_show() {
		$this->total_posts_to_show = apply_filters( 'sba_total_posts_to_show', 6 );
	}

	public function get_total_posts_to_show() {
		if ( empty( $this->total_posts_to_show ) ) {
			return null;
		} else {
			return $this->total_posts_to_show;
		}
	}

	public function get_before_and_after_grid( $args = '' ) {
		$default_args = array(
			'before_and_after_id'         => '',
			'number_of_before_and_afters' => $this->get_total_posts_to_show(),
		);

		if ( ! empty( $args ) && is_array( $args ) ) {
			foreach ( $args as $arg_key => $arg_value ) {
				if ( array_key_exists( $arg_key, $default_args ) ) {
					$default_args[ $arg_key ] = $arg_value;
				}
			}
		}

		$query_args = array(
			'post_type'              => 'before_and_after',
			'posts_per_page'         => $default_args['number_of_before_and_afters'],
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
					$html .= wp_get_attachment_image( $ba_before_id, array( '485', '200' ), false, array( 'class' => 'sba-before-img' ) );

					$ba_after_id = attachment_url_to_postid( $ba_after_url );
					$html       .= '<span class="sba-img-caption inactive">';
					// translators: This is the caption for the After image when the grid is displayed.
					$html .= __( 'After', 'simple-before-and-after' );
					$html .= '</span>';
					$html .= wp_get_attachment_image( $ba_after_id, array( '485', '200' ), false, array( 'class' => 'sba-after-img inactive' ) );

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
