<?php
$settings = array();

$settings['ui_color']= $modx->newObject('modSystemSetting');
$settings['ui_color']->fromArray(array(
        'key' => 'ckeditor.ui_color',
        'xtype' => 'textfield',
        'value' => '#DDDDDD',
        'namespace' => 'ckeditor',
		'area' => 'general'
    ),'',true,true);

$settings['toolbar']= $modx->newObject('modSystemSetting');
$settings['toolbar']->fromArray(array(
        'key' => 'ckeditor.toolbar',
        'xtype' => 'textarea',
        'value' => '[
    { "name": "clipboard", "groups": [ "clipboard", "undo" ], "items": [ "Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo" ] },
    { "name": "links", "items": [ "Link", "Unlink"] },
    { "name": "insert", "items": [ "Image", "Youtube", "Flash", "Table", "HorizontalRule", "SpecialChar", "Iframe" ] },
    { "name": "editing", "items": [ "Find", "Replace" ] },
    { "name": "tools", "items": [ "Maximize", "ShowBlocks" ] },
    { "name": "document", "groups": [ "mode" ], "items": [ "Source"] },
    "/",
    { "name": "basicstyles", "groups": [ "basicstyles", "cleanup" ], "items": [ "Bold", "Italic", "Subscript", "Superscript", "-", "RemoveFormat" ] },
    { "name": "paragraph", "groups": [ "list", "indent", "blocks", "align" ], "items": [ "NumberedList", "BulletedList", "-", "Outdent", "Indent", "-", "Blockquote", "CreateDiv", "-", "JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock" ] },
    { "name": "styles", "items": [ "Styles", "Format"] }
]',
        'namespace' => 'ckeditor',
		'area' => 'general'
    ),'',true,true);

$settings['format_tags']= $modx->newObject('modSystemSetting');
$settings['format_tags']->fromArray(array(
        'key' => 'ckeditor.format_tags',
        'xtype' => 'textfield',
        'value' => 'p;h1;h2;h3;h4;h5;h6;pre;address;div',
        'namespace' => 'ckeditor',
        'area' => 'general'
    ),'',true,true);

$settings['skin']= $modx->newObject('modSystemSetting');
$settings['skin']->fromArray(array(
        'key' => 'ckeditor.skin',
        'xtype' => 'textfield',
        'value' => 'moono',
        'namespace' => 'ckeditor',
        'area' => 'general'
    ),'',true,true);

$settings['extra_plugins']= $modx->newObject('modSystemSetting');
$settings['extra_plugins']->fromArray(array(
        'key' => 'ckeditor.extra_plugins',
        'xtype' => 'textfield',
        'value' => '',
        'namespace' => 'ckeditor',
        'area' => 'general'
    ),'',true,true);

$settings['object_resizing']= $modx->newObject('modSystemSetting');
$settings['object_resizing']->fromArray(array(
        'key' => 'ckeditor.object_resizing',
        'xtype' => 'combo-boolean',
        'value' => '0',
        'namespace' => 'ckeditor',
        'area' => 'general'
    ),'',true,true);

$settings['autocorrect_dash']= $modx->newObject('modSystemSetting');
$settings['autocorrect_dash']->fromArray(array(
        'key' => 'ckeditor.autocorrect_dash',
        'xtype' => 'textfield',
        'value' => '—',
        'namespace' => 'ckeditor',
        'area' => 'general'
    ),'',true,true);

$settings['autocorrect_double_quotes']= $modx->newObject('modSystemSetting');
$settings['autocorrect_double_quotes']->fromArray(array(
        'key' => 'ckeditor.autocorrect_double_quotes',
        'xtype' => 'textfield',
        'value' => '«»',
        'namespace' => 'ckeditor',
        'area' => 'general'
    ),'',true,true);

$settings['autocorrect_single_quotes']= $modx->newObject('modSystemSetting');
$settings['autocorrect_single_quotes']->fromArray(array(
        'key' => 'ckeditor.autocorrect_single_quotes',
        'xtype' => 'textfield',
        'value' => '„“',
        'namespace' => 'ckeditor',
        'area' => 'general'
    ),'',true,true);

return $settings;