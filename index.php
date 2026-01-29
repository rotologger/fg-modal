<?php

/**
 * Plugin Name:       FG Modal
 * Description:       A block which renders a pop-up that appears on a page and disables all other content.
 * Version:           1.04
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Fabian Genthner
 * Author URI:	      https://fabiangenthner.de
 * Text Domain:       fg-modal
 *
 * @package CreateBlock
 */

if (! defined('ABSPATH')) {
    exit;
}

function fg_modal_init()
{
    register_block_type(__DIR__ . '/build/fg-modal');
}
add_action('init', 'fg_modal_init');
