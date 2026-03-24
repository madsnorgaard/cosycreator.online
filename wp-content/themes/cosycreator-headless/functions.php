<?php
/**
 * Cosy Creator Headless Theme
 *
 * This theme outputs nothing to the browser.
 * The Nuxt 3 frontend at cosycreator.online handles all display.
 * WordPress serves as the content management backend only.
 *
 * To manage content:
 *   https://wp.cosycreator.online/wp-admin
 *
 * REST API:
 *   https://wp.cosycreator.online/wp-json/wp/v2/posts?_embed
 *   https://wp.cosycreator.online/wp-json/wp/v2/categories
 */

defined('ABSPATH') || exit;

// ── Enable post thumbnails (featured images) ────────────────
add_theme_support('post-thumbnails');

// ── Allow CORS from internal Docker network for Nuxt SSR ───
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        // Allow requests from Nuxt container (internal) and the public domain
        $allowed = [
            'http://cosycreator_nuxt',
            'https://cosycreator.online',
            'https://www.cosycreator.online',
        ];
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        if (in_array($origin, $allowed, true) || empty($origin)) {
            header('Access-Control-Allow-Origin: ' . ($origin ?: '*'));
        }
        header('Access-Control-Allow-Methods: GET, OPTIONS');
        header('Access-Control-Allow-Headers: Authorization, Content-Type');
        return $value;
    });
}, 15);

// ── Return 200 for all public-facing frontend routes ────────
// (Nuxt handles the actual HTML; WP just needs to not 404)
add_action('template_redirect', function () {
    if (is_admin() || (defined('REST_REQUEST') && REST_REQUEST)) {
        return;
    }
    // Signal to Nuxt that WP is alive; frontend ignores this
    status_header(200);
    header('Content-Type: text/plain');
    echo 'cosycreator.online — headless WP backend';
    exit;
});

// ── Register custom image sizes for portfolio artwork ───────
add_image_size('portfolio-thumb',   600,  600, true);
add_image_size('portfolio-large',   1400, 1400, false);

// ── Expose full image URLs in REST API response ─────────────
add_filter('wp_get_attachment_image_src', '__return_false', 1);

// ── Add custom category "Portfolio" taxonomy if needed ──────
// Categories are built-in; just instruct: create categories in
// WP Admin → Posts → Categories (e.g. Icons, Illustrations, Game UI)

// ── Disable XML-RPC (not needed for headless) ───────────────
add_filter('xmlrpc_enabled', '__return_false');

// ── Remove unnecessary head tags ───────────────────────────
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'rsd_link');
