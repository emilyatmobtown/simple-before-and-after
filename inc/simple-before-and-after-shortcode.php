<?php

defined( 'ABSPATH' ) or die( 'Nope!' );

if ( ! class_exists( 'Simple_Before_And_After_Shortcode' ) ) {
    class Simple_Before_And_After_Shortcode {
        public function __construct() {
            add_action( 'init', array( $this, 'register_before_and_after_shortcodes' ) );
        }

        public function register_before_and_after_shortcodes() {
            add_shortcode( 'simple_before_and_after', array( $this, 'before_and_after_shortcode_output' ) );
        }

        public function before_and_after_shortcode_output( $atts, $content = '', $tag ) {
            global $simple_before_and_after;

            $args = shortcode_atts( array(
                'before_and_after_id'         => '',
                'number_of_before_and_afters' => ''
            ), $atts, $tag );

            $html = $simple_before_and_after->get_before_and_after_grid( $args );

            return $html;
        }
    }

    $simple_before_and_after_shortcode = new Simple_Before_And_After_Shortcode;
}
