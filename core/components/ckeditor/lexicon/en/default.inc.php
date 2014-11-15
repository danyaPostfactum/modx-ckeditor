<?php
/**
 * Default Language file for CKEditor
 *
 * @package ckeditor
 * @subpackage lexicon
 */

$_lang['ckeditor'] = 'CKEditor';

$_lang['area_general'] = 'General settings';

$_lang['setting_ckeditor.ui_color'] = 'UI color';
$_lang['setting_ckeditor.ui_color_desc'] = 'UI color value in hexadecimal format. For example: «#328000» .';
$_lang['setting_ckeditor.skin'] = 'Editor skin';
$_lang['setting_ckeditor.skin_desc'] = 'Editor skin name. A skin must be located in the «{manager_path}assets/components/ckeditor/ckeditor/skins/» folder.';
$_lang['setting_ckeditor.toolbar'] = 'Toolbar';
$_lang['setting_ckeditor.toolbar_desc'] = 'Toolbar configuration in JSON format. For example: «[ [ "Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo" ], "/", { "name": "basicstyles", "items": [ "Bold", "Italic" ] } ]».';
$_lang['setting_ckeditor.toolbar_groups'] = 'Toolbar groups';
$_lang['setting_ckeditor.toolbar_groups_desc'] = 'Toolbar groups configuration in JSON format. You can define which groups of buttons (like e.g. basicstyles, clipboard and forms) are displayed and in which order. Registered buttons are associated with toolbar groups by toolbar property in their definition. This setting\'s advantage is that you don\'t have to modify toolbar configuration when adding/removing plugins which register their own buttons.';
$_lang['setting_ckeditor.format_tags'] = 'Formats Dropdown';
$_lang['setting_ckeditor.format_tags_desc'] = 'List of formats that can be applied to text from the formats dropdown. List of tags separated by a semicolorn. Defaults to p;h1;h2;h3;h4;h5;h6;pre;address;div';
$_lang['setting_ckeditor.extra_plugins'] = 'Extra plugins';
$_lang['setting_ckeditor.extra_plugins_desc'] = 'List of plugins, separated by «,». All plugins must be located in the «{manager_path}/assets/components/ckeditor/ckeditor/plugins/» folder.';
$_lang['setting_ckeditor.object_resizing'] = 'Object resizing';
$_lang['setting_ckeditor.object_resizing_desc'] = 'Enable object resizing (images, tables).';
$_lang['setting_ckeditor.autocorrect_dash'] = 'Dash character';
$_lang['setting_ckeditor.autocorrect_dash_desc'] = 'A dash character to automatically replace typed hyphens with.';
$_lang['setting_ckeditor.autocorrect_double_quotes'] = 'Double quotes';
$_lang['setting_ckeditor.autocorrect_double_quotes_desc'] = 'A pair of opening and closing marks to convert typewriter quotation marks to (smart quotes). In english writing “curly quotes” are used.';
$_lang['setting_ckeditor.autocorrect_single_quotes'] = 'Single quotes';
$_lang['setting_ckeditor.autocorrect_single_quotes_desc'] = 'A pair of opening and closing marks to convert typewriter apostrophes to (smart quotes). In english writing ‘curly quotes’ are used.';
$_lang['setting_ckeditor.styles_set'] = 'CSS styles set';
$_lang['setting_ckeditor.styles_set_desc'] = 'The "styles definition set" to use in the editor. Provide the path to a .js file containing the Styles Set (as styleset_name:path/to/styleset.js) or the name of a predefined Styles Set. Reference: http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.config.html#.stylesSet';
$_lang['setting_ckeditor.remove_plugins'] = 'Remove plugins';
$_lang['setting_ckeditor.remove_plugins_desc'] = 'List of plugins to exclude, separated by «,».';
$_lang['setting_ckeditor.native_spellchecker'] = 'Native spellchecker';
$_lang['setting_ckeditor.native_spellchecker_desc'] = 'Enables the built-in words spell checker if browser provides one.';
