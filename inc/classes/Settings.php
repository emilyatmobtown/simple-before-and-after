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

		<input type="text" id="image_width" name="sba_settings[image_width]" placeholder="Default: <?php echo esc_attr( $placeholder ); ?>" value="<?php echo esc_attr( $value ); ?>"> px

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

		<input type="text" id="sba_image_height" name="sba_settings[image_height]" placeholder="Default: <?php echo esc_attr( $placeholder ); ?>" value="<?php echo esc_attr( $value ); ?>"> px

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

		$validated = $this->validate_image_dimension( $settings['image_width'] );
		if ( ! $validated || empty( $settings['image_width'] ) ) {
			$new_settings['image_width'] = '';
		} elseif ( isset( $settings['image_width'] ) ) {
			$new_settings['image_width'] = absint( $settings['image_width'] );
		}

		$validated = $this->validate_image_dimension( $settings['image_height'] );
		if ( ! $validated || empty( $settings['image_height'] ) ) {
			$new_settings['image_height'] = '';
		} elseif ( isset( $settings['image_height'] ) ) {
			$new_settings['image_height'] = absint( $settings['image_height'] );
		}

		return $new_settings;
	}

	/**
	 * Validates image dimension.
	 *
	 * @param $data
	 * @return bool
	 * @since 0.1.1
	 */
	public function validate_image_dimension( $data = null ) {

		if ( empty( $data ) ) {

			// Rejects empty data
			add_settings_error(
				'sba_settings',
				esc_attr( 'settings_updated' ),
				// translators: This is the update message for an invalid image dimension.
				__( 'No dimension entered. The default value will be used.', 'simple-before-and-after' ),
				'updated'
			);

			return false;

		} elseif ( empty( absint( $data ) ) ) {

			// Rejects non-numeric strings, zero, null, false, empty
			add_settings_error(
				'sba_settings',
				esc_attr( 'settings_updated' ),
				// translators: This is the error message for an invalid image dimension.
				__( 'Invalid dimension. Please enter a whole number greater than zero.', 'simple-before-and-after' ),
				'error'
			);

			return false;

		} elseif ( is_float( $data + 0 ) ) {

			// Rejects floats
			add_settings_error(
				'sba_settings',
				esc_attr( 'settings_updated' ),
				// translators: This is the error message for an image dimension that is not a whole number.
				__( 'Invalid dimension. Please enter a whole number.', 'simple-before-and-after' ),
				'error'
			);

			return false;

		} elseif ( $data < 1 ) {

			// Rejects negative numbers
			add_settings_error(
				'sba_settings',
				esc_attr( 'settings_updated' ),
				// translators: This is the error message for an image dimension that is less than one.
				__( 'Invalid dimension. Please enter a number greater than zero.', 'simple-before-and-after' ),
				'error'
			);

			return false;

		} elseif ( 9999 === $data ) {

			// Rejects 9999 to ensure consistent hard crops
			add_settings_error(
				'sba_settings',
				esc_attr( 'settings_updated' ),
				// translators: This is the error message for an image dimension that is 9999.
				__( 'Invalid dimension. Please enter a number that is not 9999.', 'simple-before-and-after' ),
				'error'
			);

			return false;
		}

		return true;
	}
}
