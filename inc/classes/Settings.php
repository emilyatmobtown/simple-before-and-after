<?php

namespace SimpleBeforeAndAfter;

use SimpleBeforeAndAfter\Utils;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Nope!' );
}

class Settings {

	/**
	 * Return singleton instance of class
	 *
	 * @return self
	 * @since 0.1.1
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
		add_action( 'admin_menu', array( $this, 'create_settings_page' ) );
		add_action( 'admin_init', array( $this, 'register_settings' ) );
		add_action( 'admin_init', array( $this, 'add_settings' ) );
	}

	/**
	 * Create settings page
	 *
	 * @since 0.1.1
	 */
	public function create_settings_page() {
		add_options_page(
			// translators: This is the title of the settings page
			__( 'Simple Before and After Settings', 'simple-before-and-after' ),
			// translators: This is the name of the settings page in the Settings menu
			__( 'Before and After', 'simple-before-and-after' ),
			'manage_options',
			'simple-before-and-after',
			array( $this, 'show_settings_page' )
		);
	}

	/**
	 * Display settings page
	 *
	 * @since 0.1.1
	 */
	public function show_settings_page() {
		?>
		<div class="wrap">
			<h1>
				<?php
				// translators: This is the heading of the settings page
				esc_html_e( 'Simple Before and After Settings', 'simple-before-and-after' );
				?>
			</h1>
			<form action="options.php" method="post">
				<?php settings_fields( 'simple-before-and-after' ); ?>
				<?php do_settings_sections( 'simple-before-and-after' ); ?>
				<?php submit_button(); ?>
			</form>
		</div>
		<?php
	}

	/**
	 * Register settings
	 *
	 * @since 0.1.1
	 */
	public function register_settings() {
		register_setting(
			'simple-before-and-after',
			'sba_settings',
			array( $this, 'sanitize_settings' )
		);
	}

	/**
	 * Add settings sections and/or settings_fields
	 *
	 * @since 0.1.1
	 */
	public function add_settings() {
		add_settings_section(
			'sba_setting_section_1',
			'',
			'',
			'simple-before-and-after'
		);

		add_settings_field(
			'image_width',
			// translators: This is the label of the Image Width field on the Settings page
			__( 'Image Width', 'simple-before-and-after' ),
			array( $this, 'image_width_callback' ),
			'simple-before-and-after',
			'sba_setting_section_1',
			array( 'label_for' => 'image_width' )
		);

		add_settings_field(
			'image_height',
			// translators: This is the label of the Image Heightx field on the Settings page
			__( 'Image Height', 'simple-before-and-after' ),
			array( $this, 'image_height_callback' ),
			'simple-before-and-after',
			'sba_setting_section_1'
		);
	}

	/**
	 * Outputs setting for image width
	 *
	 * @since 0.1.1
	 */
	public function image_width_callback() {
		$settings    = Utils\get_settings();
		$value       = isset( $settings['image_width'] ) ? $settings['image_width'] : '';
		$placeholder = SBA_DEFAULT_IMAGE_WIDTH;
		?>

		<input type="text" id="image_width" name="sba_settings[image_width]" placeholder="Default: <?php echo esc_attr( $placeholder ); ?>" value="<?php echo esc_attr( $value ); ?>">

		<?php
	}

	/**
	 * Outputs setting for image height
	 *
	 * @since 0.1.1
	 */
	public function image_height_callback() {
		$settings    = Utils\get_settings();
		$value       = isset( $settings['image_height'] ) ? $settings['image_height'] : '';
		$placeholder = SBA_DEFAULT_IMAGE_HEIGHT;
		?>

		<input type="text" id="sba_image_height" name="sba_settings[image_height]" placeholder="Default: <?php echo esc_attr( $placeholder ); ?>" value="<?php echo esc_attr( $value ); ?>">

		<?php
	}

	/**
	 * Sanitizes and sets settings
	 *
	 * @param array $settings
	 * @since 0.1.1
	 */
	public function sanitize_settings( $settings ) {
		$new_settings = Utils\get_settings();

		if ( isset( $settings['image_width'] ) && ! empty( $settings['image_width'] ) ) {
			$new_settings['image_width'] = absint( $settings['image_width'] );
		} else {
			$new_settings['image_width'] = SBA_DEFAULT_IMAGE_WIDTH;
		}

		if ( isset( $settings['image_height'] ) && ! empty( $settings['image_height'] ) ) {
			$new_settings['image_height'] = absint( $settings['image_height'] );
		} else {
			$new_settings['image_height'] = SBA_DEFAULT_IMAGE_HEIGHT;
		}

		return $new_settings;
	}
}
