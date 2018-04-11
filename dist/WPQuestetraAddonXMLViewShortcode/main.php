<?php
/*
Plugin Name: WP Questetra Addon XML Show Shortcode
Plugin URI: https://questetra.github.io/WP-Questetra-Addon-XML-Show-Shortcode/
Description: Questetra Addon XML の配布に関連したショートコード
Version: 0.3
Author: June YAMAMOTO
Author URI: https://www.questetra.com/
License: GPL2
*/

function WPQuestetraAddonXMLViewrShortcode_EnqueueScript() {
  wp_enqueue_style( 'wp-questetra-addonxml-viewer-shortcode-style', plugin_dir_url( __FILE__ ). 'css/style.css', array());
  wp_enqueue_script( 'wp-questetra-addonxml-viewer-shortcode', plugin_dir_url( __FILE__ ). 'js/jquery.questetraAddonView-min.js', array('jquery'), '20141010',true);
}
add_action('wp_enqueue_scripts', 'WPQuestetraAddonXMLViewrShortcode_EnqueueScript');

function WPQuestetraAddonXMLViewrShortcode_Shortcode_AddonXML_Loader($atts, $content = null){
  $atts = shortcode_atts(array(
    'src' => null,
    'lang'=> null
  ), $atts);

  $res = '<div data-questetra="addon-xml-loader" data-addon-xml-src="'.$atts['src'].'" data-addon-xml-lang="'.$atts['lang'].'">';
  $res .= '<div class="questetra-addon-xml-viewer-loader-status-wait-view" style="display:none">wait</div>';
  $res .= '<div class="questetra-addon-xml-viewer-loader-status-loading-view" style="display:none">loading</div>';
  $res .= '<div class="questetra-addon-xml-viewer-loader-status-loaded-view" style="display:none">';
  $res .= do_shortcode($content);
  $res .= '</div>';
  $res .= '</div><!-- /addon-xml //--> ';
  return $res;
}
add_shortcode('addon_xml_loader', 'WPQuestetraAddonXMLViewrShortcode_Shortcode_AddonXML_Loader');

// 詳細パーツショートコード ----------------------------------------------------------------------------
// プラグイン名 : service-task-definition > label
function WPQuestetraAddonXMLViewrShortcode_Shortcode_AddonXML_Label($atts, $content = null){
  return '<h1 class="addon-xml-label">'.do_shortcode($content).'</h1>';
}
add_shortcode('addon_xml_label', 'WPQuestetraAddonXMLViewrShortcode_Shortcode_AddonXML_Label');

// サマリ : service-task-definition > summary
function WPQuestetraAddonXMLViewrShortcode_Shortcode_AddonXML_Summary($atts, $content = null){
  return '<p class="addon-xml-summary">'.do_shortcode($content).'</p>';
}
add_shortcode('addon_xml_summary', 'WPQuestetraAddonXMLViewrShortcode_Shortcode_AddonXML_Summary');

// ヘルプ : service-task-definition > summary
function WPQuestetraAddonXMLViewrShortcode_Shortcode_AddonXML_Help($atts, $content = null){
  return '<a class="addon-xml-help">'.do_shortcode($content).'</a>';
}
add_shortcode('addon_xml_help', 'WPQuestetraAddonXMLViewrShortcode_Shortcode_AddonXML_Help');

// アイコン
function WPQuestetraAddonXMLViewrShortcode_Shortcode_AddonXML_Icon($atts, $content = null){
  return '<img class="addon-xml-icon" />';
}
add_shortcode('addon_xml_icon', 'WPQuestetraAddonXMLViewrShortcode_Shortcode_AddonXML_Icon');

// タスク
function WPQuestetraAddonXMLViewrShortcode_Shortcode_AddonXML_Task($atts, $content = null){
  return '<div class="addon-xml-task"><img class="addon-xml-icon" /></div>';
}
add_shortcode('addon_xml_task', 'WPQuestetraAddonXMLViewrShortcode_Shortcode_AddonXML_Task');

// コンフィグ
function WPQuestetraAddonXMLViewrShortcode_Shortcode_AddonXML_Config($atts, $content = null){
  return '<div class="addon-xml-config">'.do_shortcode($content).'</div>';
}
add_shortcode('addon_xml_config', 'WPQuestetraAddonXMLViewrShortcode_Shortcode_AddonXML_Config');

// コンフィグTable
function WPQuestetraAddonXMLViewrShortcode_Shortcode_AddonXML_ConfigTable($atts, $content = null){
  return '<thead><tr><th>variable name</th><th>variable label</th></tr></thead><tbody class="addon-xml-config-table"></tbody>';
}
add_shortcode('addon_xml_config_table', 'WPQuestetraAddonXMLViewrShortcode_Shortcode_AddonXML_ConfigTable');

// Script
function WPQuestetraAddonXMLViewrShortcode_Shortcode_AddonXML_Script($atts, $content = null){
  return '<pre class="addon-xml-script"></pre>';
}
add_shortcode('addon_xml_script', 'WPQuestetraAddonXMLViewrShortcode_Shortcode_AddonXML_Script');