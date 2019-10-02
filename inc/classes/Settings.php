<?php

namespace SimpleBeforeAndAfter;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Nope!' );
}

class Settings {

	protected static $defaults;
	protected static $setting_titles;

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
		self::set_setting_titles();
	}

	public function set_defaults() {
		self::$defaults = array(
			'item_total'   => 6,
			'image_width'  => 485,
			'image_height' => 200,
			// translators: This is the default caption on the Before image in the grid.
			'before_label' => __( 'Before', 'simple-before-and-after' ),
			// translators: This is the default caption on the After image in the grid.
			'after_label'  => __( 'After', 'simple-before-and-after' ),
		);
	}

	public function set_setting_titles() {
		self::$setting_titles = array(
			// translators: This is the label for the Max Items in a Grid setting.
			'item_total'   => __( 'Max Items in a Grid', 'simple-before-and-after' ),
			// translators: This is the label of the Image Width field on the Settings page.
			'image_width'  => __( 'Image Width', 'simple-before-and-after' ),
			// translators: This is the label of the Image Height field on the Settings page.
			'image_height' => __( 'Image Height', 'simple-before-and-after' ),
			// translators: This is the default caption on the Before image in the grid.
			'before_label' => __( 'Before Label', 'simple-before-and-after' ),
			// translators: This is the default caption on the After image in the grid.
			'after_label'  => __( 'After Label', 'simple-before-and-after' ),
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
			// translators: This is the title of the settings page.
			__( 'Simple Before and After Settings', 'simple-before-and-after' ),
			// translators: This is the name of the settings page in the Settings menu.
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
				// translators: This is the heading of the settings page.
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
	 * Add settings sections and/or setting fields
	 *
	 * @since 0.1.1
	 */
	public function add_settings() {
		// Get the defaults
		$fields = self::$defaults;

		// Get the titles
		$titles = self::$setting_titles;

		add_settings_section(
			'sba_setting_section_1',
			'',
			'',
			'simple-before-and-after'
		);

		// Loop through each setting
		foreach ( $fields as $field_name => $field_value ) {

			switch ( $field_name ) {
				case 'item_total':
				case 'image_height':
					add_settings_field(
						$field_name,
						$titles[ $field_name ],
						array( $this, $field_name . '_callback' ),
						'simple-before-and-after',
						'sba_setting_section_1'
					);
					break;

				case 'image_width':
					add_settings_field(
						$field_name,
						$titles[ $field_name ],
						array( $this, 'text_field_callback' ),
						'simple-before-and-after',
						'sba_setting_section_1',
						array(
							'name'  => $field_name,
							'units' => 'px',
						)
					);
					break;

				default:
					add_settings_field(
						$field_name,
						$titles[ $field_name ],
						array( $this, 'text_field_callback' ),
						'simple-before-and-after',
						'sba_setting_section_1',
						array( 'name' => $field_name )
					);
					break;
			}
		}
	}

	/**
	 * Outputs HTML for item total setting
	 *
	 * @since 0.1.1
	 */
	public function item_total_callback() {
		self::text_field_callback( array( 'name' => 'item_total' ) );
		?>

		<p class="description">This is the maximum number of Before and After items that will appear in a grid. If there are more items than the max, a random selection will be shown. If there are fewer items than the max, then all be shown.</p>

		<?php
	}

	/**
	* Outputs HTML for image height setting
	 *
	 * @since 0.1.1
	 */
	public function image_height_callback() {
		$args = array(
			'name'  => 'image_height',
			'units' => 'px',
		);

		self::text_field_callback( $args );
		?>

		<p class="description">Changes to the image size will only apply to images uploaded after the setting is saved. To resize older images, regenerate the thumbnails.</p>

		<?php
	}

	/**
	 * Outputs HTML for a text field setting
	 *
	 * @param array $args
	 * @since 0.1.1
	 */
	public function text_field_callback( $args ) {
		if ( empty( $args['name'] ) ) {
			return;
		}

		$name  = ( ! empty( $args['name'] ) ) ? $args['name'] : '';
		$units = ( ! empty( $args['units'] ) ) ? $args['units'] : '';

		// Get saved settings
		$settings = self::get_settings();

		// Set value to an empty string if no setting saved
		$value = isset( $settings[ $name ] ) ? $settings[ $name ] : '';

		// Set placeholder to default value
		// translators: This is the label for default values in the text field placeholder, i.e. Default: 485px
		$placeholder  = __( ' Default', 'simple-before-and-after' );
		$placeholder .= ': ';
		$placeholder .= self::$defaults[ $name ];

		// Output HTML
		?>

		<input type="text" id="sba_<?php echo esc_attr( $name ); ?>" name="sba_settings[<?php echo esc_attr( $name ); ?>]" class="sba_text_field sba_<?php echo esc_attr( $name ); ?>" placeholder="<?php echo esc_attr( $placeholder ); ?>" value="<?php echo esc_attr( $value ); ?>">

		<?php

		// Output HTML for units if not empty
		if ( ! empty( $units ) ) {
			?>

			<span class="sba_text_field_units"><?php echo esc_attr( $units ); ?></span>

			<?php
		}
	}

	/**
	 * Sanitizes and sets settings
	 *
	 * @param array $settings to be sanitized
	 * @return array $new_settings sanitized settings
	 * @since 0.1.1
	 */
	public function sanitize_settings( $settings ) {
		// Get the defaults
		$fields = self::$defaults;

		// Get the saved settings
		$new_settings = self::get_settings();

		// Loop through each setting
		foreach ( $fields as $field_name => $field_value ) {

			// Construct a variable function to validate each input. Function name includes field name, i.e. validate_item_total
			$validator = 'validate_' . $field_name;

			// Validate the input. Pass the input and the field name to the validator
			$validated = call_user_func( array( $this, $validator ), $settings[ $field_name ], $field_name );

			// If the input is not validated, set the new setting to an empty string
			if ( ! $validated ) {
				$new_settings[ $field_name ] = '';
			} elseif ( isset( $settings[ $field_name ] ) ) {

				// If the input is validated, choose a sanitizer
				if ( is_int( $field_value ) ) {

					// Use absint() as sanitizer if setting default is an integer
					$sanitizer = 'absint';

				} elseif ( is_string( $field_value ) ) {

					// Use sanitize_text_field() as sanitizer if setting default is a string
					$sanitizer = 'sanitize_text_field';
				}

				// Sanitize and save to new settings
				if ( ! empty( $sanitizer ) ) {
					$new_settings[ $field_name ] = call_user_func( $sanitizer, $settings[ $field_name ] );
				}
			}
		}

		// Return the new settings
		return $new_settings;
	}

	/**
	 * Validates item total.
	 *
	 * @param $data to be validated
	 * @param $label of field being validated
	 * @return bool
	 * @since 0.1.1
	 */
	public function validate_item_total( $data = null, $label = '' ) {
		$result     = true;
		$show_error = true;
		$message    = '';
		$message   .= ( ! empty( $label ) ) ? self::$setting_titles[ $label ] . ': ' : '';

		if ( empty( $data ) && '0' !== $data ) {
			// Rejects empty data without an error message
			$show_error = false;
			$result     = false;

		} elseif ( empty( absint( $data ) ) || is_float( $data + 0 ) || $data < 1 ) {
			// Rejects non-numeric strings, zero, null, false, empty, floats, and negative numbers
			$result = false;

			// translators: This is the error message for an invalid image dimension.
			$message .= __( 'Invalid total. The default value will be used. Next time, please use a whole number greater than zero.', 'simple-before-and-after' );

		} elseif ( $data > 50 ) {
			// Rejects 9999 to ensure consistent hard crops
			$result = false;

			// translators: This is the error message for an image dimension that is 9999.
			$message .= __( 'The image total is too high. The default value will be used. Next time, please use a number that is 50 or less.', 'simple-before-and-after' );

		}

		if ( ! $result && $show_error ) {
			add_settings_error(
				'sba_settings',
				'item_total',
				esc_attr( $message ),
				'error'
			);
		}

		return $result;
	}

	/**
	 * Validates image width. Alias of validate_image_dimension.
	 *
	 * @param $params variable-number parameters
	 * @since 0.1.1
	 */
	public function validate_image_width( ...$params ) {
		return self::validate_image_dimension( ...$params );
	}

	/**
	 * Validates image height. Alias of validate_image_dimension.
	 *
	 * @param $params variable-number parameters
	 * @since 0.1.1
	 */
	public function validate_image_height( ...$params ) {
		return self::validate_image_dimension( ...$params );
	}

	/**
	 * Validates image dimension.
	 *
	 * @param $data to be validated
	 * @param $label of field being validated
	 * @return bool
	 * @since 0.1.1
	 */
	public function validate_image_dimension( $data = null, $label = '' ) {
		$result     = true;
		$show_error = true;
		$message    = '';
		$message   .= ( ! empty( $label ) ) ? self::$setting_titles[ $label ] . ': ' : '';

		if ( empty( $data ) && '0' !== $data ) {
			// Rejects empty data without an error message
			$show_error = false;
			$result     = false;

		} elseif ( empty( absint( $data ) ) || is_float( $data + 0 ) || $data < 1 ) {
			// Rejects non-numeric strings, zero, null, false, empty, floats, and negative numbers
			$result = false;

			// translators: This is the error message for an invalid image dimension.
			$message .= __( 'Invalid dimension. The default value will be used. Next time, please use a whole number greater than zero. To resize previously uploaded images, regenerate the thumbnails.', 'simple-before-and-after' );

		} elseif ( 9999 === $data ) {
			// Rejects 9999 to ensure consistent hard crops
			$result = false;

			// translators: This is the error message for an image dimension that is 9999.
			$message .= __( 'Invalid dimension. The default value will be used. Next time, please use a number that is not 9999. To resize previously uploaded images, regenerate the thumbnails.', 'simple-before-and-after' );

		}

		if ( ! $result && $show_error ) {
			add_settings_error(
				'sba_settings',
				'image_dimension',
				esc_attr( $message ),
				'error'
			);
		}

		return $result;
	}

	/**
	 * Validates before label. Alias of validate_label.
	 *
	 * @param $params variable-number parameters
	 * @since 0.1.1
	 */
	public function validate_before_label( ...$params ) {
		return self::validate_label( ...$params );
	}

	/**
	 * Validates after label. Alias of validate_label.
	 *
	 * @param $params variable-number parameters
	 * @since 0.1.1
	 */
	public function validate_after_label( ...$params ) {
		return self::validate_label( ...$params );
	}

	/**
	 * Validates text label.
	 *
	 * @param $data to be validated
	 * @param $label of field being validated
	 * @return bool
	 * @since 0.1.1
	 */
	public function validate_label( $data = null, $label = '' ) {
		$result     = true;
		$show_error = true;
		$message    = '';
		$message   .= ( ! empty( $label ) ) ? self::$setting_titles[ $label ] . ': ' : '';

		if ( empty( $data ) && '0' !== $data ) {
			// Rejects empty data without an error message
			$show_error = false;
			$result     = false;

		} elseif ( sanitize_text_field( $data ) !== $data ) {
			// Rejects invalid text
			$result = false;

			// translators: This is the error message for an invalid text label.
			$message .= __( 'Invalid text label. The default value will be used.', 'simple-before-and-after' );

		}

		if ( ! $result && $show_error ) {
			add_settings_error(
				'sba_settings',
				'label',
				esc_attr( $message ),
				'error'
			);
		}

		return $result;
	}
}
