<?php

namespace SimpleBeforeAndAfter;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Nope!' );
}

class Settings {

	protected static $defaults;

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

		self::set_defaults();
	}

	public function set_defaults() {
		self::$defaults = array(
			'image_total'  => 6,
			'image_width'  => 485,
			'image_height' => 200,
		);
	}

	/**
	 * Get settings with defaults
	 *
	 * @param bool $set_default determines whether to override with defaults
	 * @return array
	 * @since  0.1.1
	 */
	public static function get_settings( $set_default = false ) {
		$settings = get_option( 'sba_settings', [] );

		// Use defaults where no value is set
		if ( $set_default ) {
			// Remove empty values in settings to override with defaults
			$settings = array_filter(
				$settings,
				function( $option ) {
					return ! empty( $option );
				}
			);
			$settings = wp_parse_args( $settings, self::$defaults );
		}

		return $settings;
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
			'image_total',
			// translators: This is the label of the Number of Images field on the Settings page
			__( 'Number of Images', 'simple-before-and-after' ),
			array( $this, 'image_total_callback' ),
			'simple-before-and-after',
			'sba_setting_section_1'
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
			// translators: This is the label of the Image Height field on the Settings page
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
	public function image_total_callback() {
		$settings    = self::get_settings();
		$value       = isset( $settings['image_total'] ) ? $settings['image_total'] : '';
		$placeholder = self::$defaults['image_total'];
		?>

		<input type="text" id="image_total" name="sba_settings[image_total]" placeholder="Default: <?php echo esc_attr( $placeholder ); ?>" value="<?php echo esc_attr( $value ); ?>">

		<?php
	}

	/**
	 * Outputs setting for image width
	 *
	 * @since 0.1.1
	 */
	public function image_width_callback() {
		$settings    = self::get_settings();
		$value       = isset( $settings['image_width'] ) ? $settings['image_width'] : '';
		$placeholder = self::$defaults['image_width'];
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
		$settings    = self::get_settings();
		$value       = isset( $settings['image_height'] ) ? $settings['image_height'] : '';
		$placeholder = self::$defaults['image_height'];
		?>

		<input type="text" id="sba_image_height" name="sba_settings[image_height]" placeholder="Default: <?php echo esc_attr( $placeholder ); ?>" value="<?php echo esc_attr( $value ); ?>"> px
		<p class="description">Changes to the image size will only apply to images uploaded after the setting is saved. To resize older images, regenerate the thumbnails.</p>

		<?php
	}

	/**
	 * Sanitizes and sets settings
	 *
	 * @param array $settings to be sanitized
	 * @since 0.1.1
	 */
	public function sanitize_settings( $settings ) {
		$new_settings = self::get_settings();

		$validated = self::validate_image_total( $settings['image_total'] );
		if ( ! $validated ) {
			$new_settings['image_total'] = '';
		} elseif ( isset( $settings['image_total'] ) ) {
			$new_settings['image_total'] = absint( $settings['image_total'] );
		}

		$validated = self::validate_image_dimension( $settings['image_width'] );
		if ( ! $validated ) {
			$new_settings['image_width'] = '';
		} elseif ( isset( $settings['image_width'] ) ) {
			$new_settings['image_width'] = absint( $settings['image_width'] );
		}

		$validated = self::validate_image_dimension( $settings['image_height'] );
		if ( ! $validated ) {
			$new_settings['image_height'] = '';
		} elseif ( isset( $settings['image_height'] ) ) {
			$new_settings['image_height'] = absint( $settings['image_height'] );
		}

		return $new_settings;
	}

	/**
	 * Validates image total.
	 *
	 * @param $data to be validated
	 * @return bool
	 * @since 0.1.1
	 */
	public function validate_image_total( $data = null ) {

		if ( empty( $data ) && '0' !== $data ) {
			// Rejects empty data without an error message
			return false;

		} elseif ( empty( absint( $data ) ) || is_float( $data + 0 ) || $data < 1 ) {
			// Rejects non-numeric strings, zero, null, false, empty, floats, and negative numbers
			add_settings_error(
				'sba_settings',
				esc_attr( 'settings_updated' ),
				// translators: This is the error message for an invalid image dimension.
				__( 'Invalid total. The default value will be used. Next time, please use a whole number greater than zero.', 'simple-before-and-after' ),
				'error'
			);

			return false;

		} elseif ( $data > 50 ) {
			// Rejects 9999 to ensure consistent hard crops
			add_settings_error(
				'sba_settings',
				esc_attr( 'settings_updated' ),
				// translators: This is the error message for an image dimension that is 9999.
				__( 'The image total is too high. The default value will be used. Next time, please use a number that is 50 or less.', 'simple-before-and-after' ),
				'error'
			);

			return false;
		}

		return true;
	}

	/**
	 * Validates image dimension.
	 *
	 * @param $data to be validated
	 * @return bool
	 * @since 0.1.1
	 */
	public function validate_image_dimension( $data = null ) {

		if ( empty( $data ) && '0' !== $data ) {
			// Rejects empty data without an error message
			return false;

		} elseif ( empty( absint( $data ) ) || is_float( $data + 0 ) || $data < 1 ) {
			// Rejects non-numeric strings, zero, null, false, empty, floats, and negative numbers
			add_settings_error(
				'sba_settings',
				esc_attr( 'settings_updated' ),
				// translators: This is the error message for an invalid image dimension.
				__( 'Invalid dimension. The default value will be used. Next time, please use a whole number greater than zero. To resize previously uploaded images, regenerate the thumbnails.', 'simple-before-and-after' ),
				'error'
			);

			return false;

		} elseif ( 9999 === $data ) {
			// Rejects 9999 to ensure consistent hard crops
			add_settings_error(
				'sba_settings',
				esc_attr( 'settings_updated' ),
				// translators: This is the error message for an image dimension that is 9999.
				__( 'Invalid dimension. The default value will be used. Next time, please use a number that is not 9999. To resize previously uploaded images, regenerate the thumbnails.', 'simple-before-and-after' ),
				'error'
			);

			return false;
		}

		return true;
	}
}
