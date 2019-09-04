<?php
/**
 * Plugin Name:         Simple Before and After
 * Plugin URI:
 * Description:         Displays a simple grid that swaps Before and After images.
 * Version:             0.1.0
 * Requires at least:   5.2
 * Requires PHP:        7.2
 * Author:              Emily Leffler Schulman, Mobtown Studios
 * Author URI:          https://emilylefflerschulman.com
 * License:             GPLv2 or later
 * License URI:         https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:         simple-before-and-after
 */

defined( 'ABSPATH' ) or die( 'Nope!' );

include( plugin_dir_path( __FILE__ ) . 'inc/simple-before-and-after-shortcode.php' );

if ( ! class_exists( 'Simple_Before_And_After' ) ) {
    class Simple_Before_And_After {
        private $total_posts_to_show;

    	public function __construct() {
            add_action( 'init', array( $this, 'set_total_posts_to_show' ) );
            add_action( 'init', array( $this, 'register_before_and_after_post_type' ) );
            add_action( 'add_meta_boxes', array( $this, 'add_before_and_after_meta_boxes' ) );
            add_action( 'save_post_before_and_after', array( $this, 'save_before_and_after' ) );
            add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ) );
            add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );

            register_activation_hook( __FILE__, array( $this, 'plugin_activate' ) );
            register_deactivation_hook( __FILE__, array( $this, 'plugin_deactivate' ) );
        }

        public function plugin_activate() {
            $this->register_before_and_after_post_type();
            flush_rewrite_rules();
        }

        public function plugin_deactivate() {
            flush_rewrite_rules();
        }

        public function enqueue_scripts() {
            $css_ver  = date( 'md-Gis', filemtime( plugin_dir_path( __FILE__ ) . 'dist/css/frontend/simple-before-and-after.css' ) );
            $js_ver  = date( 'md-Gis', filemtime( plugin_dir_path( __FILE__ ) . 'dist/js/simple-before-and-after.js' ) );

            wp_enqueue_style( 'sba-styles', plugin_dir_url( __FILE__ ). 'dist/css/frontend/simple-before-and-after.css', array(), $css_ver );
            wp_enqueue_script( 'sba-swapper', plugin_dir_url( __FILE__ ). 'dist/js/simple-before-and-after.js', array(), $js_ver, true );
        }

        public function enqueue_admin_scripts() {
            global $typenow;

    		if( $typenow === 'before_and_after' ) {
                $css_ver  = date( 'md-Gis', filemtime( plugin_dir_path( __FILE__ ) . 'dist/css/admin/sba-admin.css' ) );
                $js_ver  = date( 'md-Gis', filemtime( plugin_dir_path( __FILE__ ) . 'dist/js/sba-media.js' ) );

                wp_enqueue_style( 'sba-admin-styles', plugin_dir_url( __FILE__ ). 'dist/css/admin/sba-admin.css', array(), $css_ver );

    			wp_enqueue_media();
    			wp_register_script( 'sba-meta-box-image-loader', plugin_dir_url( __FILE__ ) . 'dist/js/sba-media.js', array( 'jquery' ), $js_ver );
    			wp_localize_script( 'sba-meta-box-image-loader', 'meta_image',
    				array(
                        // translators: This is the title of the image uploader.
    					'title'        => __( 'Choose or Upload Image', 'simple-before-and-after' ),
                        // translators: This is the button label for the image uploader.
    					'button'       => __( 'Use This Image', 'simple-before-and-after' ),
    				)
    			);
    			wp_enqueue_script( 'sba-meta-box-image-loader' );
    		}
        }

        public function set_total_posts_to_show() {
            $this->total_posts_to_show = apply_filters( 'sba_total_posts_to_show', 6 );
        }

        /**
        * register_before_and_after_post_type
        *
        * Registers Before and After custom post type.
        *
        **/
        public function register_before_and_after_post_type() {
            $labels = array(
                // translators: This is the name of the Before and After post type.
        		'name'                => __( 'Before and Afters', 'simple-before-and-after' ),
                // translators: This is the singular name of the Before and After post type.
        		'singular_name'       => __( 'Before and After', 'simple-before-and-after' ),
                // translators: This is a label to add a new Before and After post.
        		'add_new'             => __( 'Add New Before and After', 'simple-before-and-after' ),
                // translators: This is a label to add a new Before and After post.
        		'add_new_item'        => __( 'Add New Before and After', 'simple-before-and-after' ),
                // translators: This is a label to edit a  Before and After post.
        		'edit_item'           => __( 'Edit Before and After', 'simple-before-and-after' ),
                // translators: This is a label for a new Before and After post.
        		'new_item'            => __( 'New Before and After', 'simple-before-and-after' ),
                // translators: This is a label to show all Before and After posts.
        		'all_items'           => __( 'All Before and Afters', 'simple-before-and-after' ),
                // translators: This is a label to view a Before and After post.
        		'view_item'           => __( 'View Before and After', 'simple-before-and-after' ),
                // translators: This is a label to search the Before and After posts.
        		'search_items'        => __( 'Search Before and Afters', 'simple-before-and-after' ),
                // translators: This is a message shown when no matching Before and After posts are found.
        		'not_found'           => __( 'No Before and Afters Found', 'simple-before-and-after' ),
                // translators: This is a message shown when no matching Before and After posts are found in Trash.
        		'not_found_in_trash'  => __( 'No Before and Afters Found in Trash', 'simple-before-and-after' ),
                // translators: This is the name of the menu item for Before and After posts.
        		'menu_name'           => __( 'Before and Afters', 'simple-before-and-after' )
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
        		'rewrite'             => array( 'slug' => 'before_and_after', 'with_front' => true ),
        		'query_var'           => true,
        		'menu_position'       => 7,
        		'supports'            => array( 'title' )
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
                'default'
            );
        }

        public function show_before_and_after_meta_box( $post ) {
            wp_nonce_field( basename( __FILE__), 'before_and_after_nonce_field' );

            $before_url = get_post_meta( $post->ID, 'sba_before_img', true );
            $after_url = get_post_meta( $post->ID, 'sba_after_img', true );

            ?>
            <p>Select or upload your images.</p>
            <div class="field-container">
                <div class="field sba-meta-box-field">
                    <label for="sba_before_img" class="sba-meta-box-field-label"><?php
                        // translators: This is the caption for the Before field on the post edit screen.
                        _e( 'Before', 'simple-before-and-after' )
                    ?></label>

                    <?php
                    if (! empty( $before_url ) ) {
                        $before_id = attachment_url_to_postid( $before_url );
                        echo wp_get_attachment_image( $before_id, 'thumbnail', false, array( 'class' => 'sba-meta-box-img' ) );
                    }
                    ?>

                    <input type="url" class="large-text sba-meta-box-input-field" name="sba_before_img" id="sba_before_img" value="<?php echo esc_url( $before_url ); ?>">
                    <button type="button" class="button sba-meta-box-button" id="sba_before_img_upload_btn" data-media-uploader-target="#sba_before_img">
                        <?php
                        // translators: This is the label for the button that opens the media loader on the post edit screen.
                        _e( 'Upload Image', 'simple-before-and-after' )
                        ?>
                    </button>
                </div>
                <div class="field sba-meta-box-field">
                    <label for="sba_after_img" class="sba-meta-box-field-label"><?php
                        // translators: This is the caption for the After field on the post edit screen.
                        _e( 'After', 'simple-before-and-after' )
                    ?></label>

                    <?php
                    if (! empty( $after_url ) ) {
                        $after_id = attachment_url_to_postid( $after_url );
                        echo wp_get_attachment_image( $after_id, 'thumbnail', false, array( 'class' => 'sba-meta-box-img' ) );
                    }
                    ?>

                    <input type="url" class="large-text sba-meta-box-input-field" name="sba_after_img" id="sba_after_img" value="<?php echo esc_url( $after_url ); ?>">
                    <button type="button" class="button sba-meta-box-button" id="sba_after_img_upload_btn" data-media-uploader-target="#sba_after_img">
                        <?php
                        // translators: This is the label for the button that opens the media loader on the post edit screen.
                        _e( 'Upload Image', 'simple-before-and-after' )
                        ?>
                    </button>
                </div>
            </div>
            <?php
        }

        public function save_before_and_after( $post_id ) {
            //check for nonce
            if( ! isset( $_POST['before_and_after_nonce_field'] ) ) {
                return $post_id;
            }

            //verify nonce
            if( ! wp_verify_nonce( $_POST['before_and_after_nonce_field'], basename( __FILE__) ) ) {
                return $post_id;
            }

            //check for autosave
            if( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
                return $post_id;
            }

            $before_img = isset( $_POST['sba_before_img'] ) ? sanitize_url( $_POST['sba_before_img'] ) : '';
            $after_img = isset( $_POST['sba_after_img'] ) ? sanitize_url( $_POST['sba_after_img'] ) : '';

            update_post_meta( $post_id, 'sba_before_img', $before_img );
            update_post_meta( $post_id, 'sba_after_img', $after_img );
        }

        public function get_before_and_after_grid( $args = '' ) {
            $default_args = array(
                'before_and_after_id'           => '',
                'number_of_before_and_afters'   => $this->total_posts_to_show
            );

            if( ! empty( $args ) && is_array( $args ) ) {
                foreach( $args as $arg_key => $arg_value ) {
                    if( array_key_exists( $arg_key, $default_args ) ){
                        $default_args[$arg_key] = $arg_value;
                    }
                }
            }

            $query_args = array(
                'post_type'             => 'before_and_after',
                'posts_per_page'        => $default_args['number_of_before_and_afters'],
                'post_status'           => 'publish',
                'no_found_rows'         => true,
                'update_post_term_cache'=> false
            );

            // If we only passed in one post ID
            if(!empty($default_args['before_and_after_id'])){
                $query_args['include'] = $default_args['before_and_after_id'];
            }

            $html = '';
            $ba_query = new WP_Query( $query_args );

            if( $ba_query->have_posts() ) {
                $html .= '<div class="sba-grid">';

                    while ( $ba_query->have_posts() ) {
                        $html .= '<div class="sba-grid-item-wrapper">';
                        $html .= '<div class="sba-grid-item">';

                        $ba_query->the_post();
                        $ba_id = $ba_query->post->ID;
                        $ba_before_url = get_post_meta( $ba_id, 'sba_before_img', true );
                        $ba_after_url = get_post_meta( $ba_id, 'sba_after_img', true );

                        if( ! empty( $ba_before_url ) ) {
                            $ba_before_id = attachment_url_to_postid( $ba_before_url );
                            $html .= '<span class="sba-img-caption">';
                            // translators: This is the caption for the Before image when the grid is displayed.
                            $html .= __( 'Before', 'simple-before-and-after' );
                            $html .= '</span>';
                            $html .= wp_get_attachment_image( $ba_before_id, array( '485', '200' ), false, array( 'class' => 'sba-before-img' ) );
                        }

                        if( ! empty( $ba_after_url ) ) {
                            $ba_after_id = attachment_url_to_postid( $ba_after_url );
                            $html .= '<span class="sba-img-caption">';
                            // translators: This is the caption for the After image when the grid is displayed.
                            $html .= __( 'After', 'simple-before-and-after' );
                            $html .= '</span>';
                            $html .= wp_get_attachment_image( $ba_after_id, array( '485', '200' ), false, array( 'class' => 'sba-after-img inactive' ) );
                        }

                        $html .= '</div>'; // .sba-grid-item
                        $html .= '</div>'; // .sba-grid-item-wrapper
                    }

                $html .= '</div>'; // .sba-grid-wrapper
            }

            wp_reset_postdata();

            return $html;
        }
    }

    $simple_before_and_after = new Simple_Before_And_After;
}
