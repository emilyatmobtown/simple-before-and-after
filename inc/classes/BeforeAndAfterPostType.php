<?php

namespace SimpleBeforeAndAfter;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Nope!' );
}

class BeforeAndAfterPostType {

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
		add_action( 'init', array( $this, 'register_before_and_after_post_type' ) );
		add_action( 'add_meta_boxes', array( $this, 'add_before_and_after_meta_boxes' ) );
		add_action( 'save_post_before_and_after', array( $this, 'save_before_and_after' ) );
	}

	/**
	* Register custom post type
	*
	* @since 0.1.0
	**/
	public function register_before_and_after_post_type() {
		$labels = array(
			// translators: This is the name of the Before and After post type.
			'name'               => __( 'Before and Afters', 'simple-before-and-after' ),
			// translators: This is the singular name of the Before and After post type.
			'singular_name'      => __( 'Before and After', 'simple-before-and-after' ),
			// translators: This is a label to add a new Before and After post.
			'add_new'            => __( 'Add New Before and After', 'simple-before-and-after' ),
			// translators: This is a label to add a new Before and After post.
			'add_new_item'       => __( 'Add New Before and After', 'simple-before-and-after' ),
			// translators: This is a label to edit a  Before and After post.
			'edit_item'          => __( 'Edit Before and After', 'simple-before-and-after' ),
			// translators: This is a label for a new Before and After post.
			'new_item'           => __( 'New Before and After', 'simple-before-and-after' ),
			// translators: This is a label to show all Before and After posts.
			'all_items'          => __( 'All Before and Afters', 'simple-before-and-after' ),
			// translators: This is a label to view a Before and After post.
			'view_item'          => __( 'View Before and After', 'simple-before-and-after' ),
			// translators: This is a label to search the Before and After posts.
			'search_items'       => __( 'Search Before and Afters', 'simple-before-and-after' ),
			// translators: This is a message shown when no matching Before and After posts are found.
			'not_found'          => __( 'No Before and Afters Found', 'simple-before-and-after' ),
			// translators: This is a message shown when no matching Before and After posts are found in Trash.
			'not_found_in_trash' => __( 'No Before and Afters Found in Trash', 'simple-before-and-after' ),
			// translators: This is the name of the menu item for Before and After posts.
			'menu_name'          => __( 'Before and Afters', 'simple-before-and-after' ),
		);

		$args = array(
			// translators: This is the label for Before and After posts.
			'label'               => __( 'Before and Afters', 'simple-before-and-after' ),
			'labels'              => $labels,
			'description'         => '',
			'public'              => true,
			'publicly_queryable'  => true,
			'show_ui'             => true,
			'show_in_rest'        => false,
			'rest_base'           => '',
			'has_archive'         => false,
			'show_in_menu'        => true,
			'show_in_nav_menus'   => false,
			'exclude_from_search' => true,
			'capability_type'     => 'post',
			'map_meta_cap'        => true,
			'hierarchical'        => false,
			'rewrite'             => array(
				'slug'       => 'before_and_after',
				'with_front' => true,
			),
			'query_var'           => true,
			'menu_position'       => 7,
			'supports'            => array( 'title' ),
		);

		register_post_type( 'before_and_after', $args );
	}

	public function add_before_and_after_meta_boxes() {
		add_meta_box(
			'before_and_after_meta_box',
			'Before and After Images',
			array( $this, 'show_before_and_after_meta_box' ),
			'before_and_after',
			'normal',
			'high'
		);
	}

	public function show_before_and_after_meta_box( $post ) {
		wp_nonce_field( basename( __FILE__ ), 'before_and_after_nonce_field' );

		$before_url = get_post_meta( $post->ID, 'sba_before_img', true );
		$after_url  = get_post_meta( $post->ID, 'sba_after_img', true );

		?>
		<p>Select or upload your images.</p>
		<div class="field-container">
			<div class="field sba-meta-box-field">
				<label for="sba_before_img" class="sba-meta-box-field-label">
				<?php
					// translators: This is the caption for the Before field on the post edit screen.
					esc_html_e( 'Before', 'simple-before-and-after' )
				?>
				</label>

				<?php
				$before_img_src      = empty( $before_url ) ? '' : $before_url;
				$before_active_class = empty( $before_url ) ? 'inactive' : '';
				?>

				<div class="sba-meta-box-img-wrapper">
					<img id="sba_before_img" src="<?php echo esc_url( $before_url ); ?>" class="sba-meta-box-img <?php echo esc_html( $before_active_class ); ?>" alt="Before Image" />
				</div>
				<input id="sba_before_img_input" class="large-text sba-meta-box-input-field" name="sba_before_img_input" type="hidden" value="<?php echo esc_url( $before_url ); ?>">
				<button id="sba_before_img_upload_btn" class="button sba-meta-box-button sba-meta-box-upload-button" type="button">
					<?php
					// translators: This is the label for the button that opens the media loader on the post edit screen.
					esc_html_e( 'Upload or Edit Image', 'simple-before-and-after' )
					?>
				</button>
				<button id="sba_before_img_delete_btn" class="button sba-meta-box-button sba-meta-box-delete-button <?php echo esc_html( $before_active_class ); ?>" type="button">
					<?php
					// translators: This is the label for the button that deletes the image on the post edit screen.
					esc_html_e( 'Delete Image', 'simple-before-and-after' )
					?>
				</button>
			</div>
			<div class="field sba-meta-box-field">
				<label for="sba_after_img" class="sba-meta-box-field-label">
				<?php
					// translators: This is the caption for the After field on the post edit screen.
					esc_html_e( 'After', 'simple-before-and-after' )
				?>
				</label>

				<?php
				$after_img_src      = empty( $after_url ) ? '' : $after_url;
				$after_active_class = empty( $after_url ) ? 'inactive' : '';
				?>

				<div class="sba-meta-box-img-wrapper">
					<img id="sba_after_img" src="<?php echo esc_url( $after_url ); ?>" class="sba-meta-box-img <?php echo esc_html( $after_active_class ); ?>" alt="After Image" />
				</div>
				<input id="sba_after_img_input" class="large-text sba-meta-box-input-field" name="sba_after_img_input" type="hidden" value="<?php echo esc_url( $after_url ); ?>">
				<button type="button" class="button sba-meta-box-button sba-meta-box-upload-button" id="sba_after_img_upload_btn">
					<?php
					// translators: This is the label for the button that opens the media loader on the post edit screen.
					esc_html_e( 'Upload or Edit Image', 'simple-before-and-after' )
					?>
				</button>
				<button id="sba_after_img_delete_btn" class="button sba-meta-box-button sba-meta-box-delete-button <?php echo esc_html( $after_active_class ); ?>" type="button">
					<?php
					// translators: This is the label for the button that deletes the image on the post edit screen.
					esc_html_e( 'Delete Image', 'simple-before-and-after' )
					?>
				</button>
			</div>
		</div>
		<?php
	}

	public function save_before_and_after( $post_id ) {
		//check for nonce
		if ( ! isset( $_POST['before_and_after_nonce_field'] ) ) {
			return $post_id;
		}

		//verify nonce
		if ( ! wp_verify_nonce( $_POST['before_and_after_nonce_field'], basename( __FILE__ ) ) ) {
			return $post_id;
		}

		//check for autosave
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return $post_id;
		}

		$before_img = isset( $_POST['sba_before_img_input'] ) ? esc_url_raw( $_POST['sba_before_img_input'] ) : '';
		$after_img  = isset( $_POST['sba_after_img_input'] ) ? esc_url_raw( $_POST['sba_after_img_input'] ) : '';

		update_post_meta( $post_id, 'sba_before_img', $before_img );
		update_post_meta( $post_id, 'sba_after_img', $after_img );
	}

}
