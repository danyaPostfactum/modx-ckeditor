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
    { "name": "insert", "items": [ "Image", "Flash", "Table", "HorizontalRule", "SpecialChar", "Iframe" ] },
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

$settings['styles_set']= $modx->newObject('modSystemSetting');
$settings['styles_set']->fromArray(array(
        'key' => 'ckeditor.styles_set',
        'xtype' => 'textarea',
        'value' => 'default',
        'namespace' => 'ckeditor',
        'area' => 'general'
    ),'',true,true);

$settings['body_class']= $modx->newObject('modSystemSetting');
$settings['body_class']->fromArray(array(
        'key' => 'ckeditor.body_class',
        'xtype' => 'textfield',
        'value' => '',
        'namespace' => 'ckeditor',
        'area' => 'general'
    ),'',true,true);

$settings['body_id']= $modx->newObject('modSystemSetting');
$settings['body_id']->fromArray(array(
        'key' => 'ckeditor.body_id',
        'xtype' => 'textfield',
        'value' => '',
        'namespace' => 'ckeditor',
        'area' => 'general'
    ),'',true,true);

$settings['remove_plugins']= $modx->newObject('modSystemSetting');
$settings['remove_plugins']->fromArray(array(
        'key' => 'ckeditor.remove_plugins',
        'xtype' => 'textfield',
        'value' => '',
        'namespace' => 'ckeditor',
        'area' => 'general'
    ),'',true,true);

$settings['enter_mode']= $modx->newObject('modSystemSetting');
$settings['enter_mode']->fromArray(array(
        'key' => 'ckeditor.enter_mode',
        'xtype' => 'textfield',
        'value' => 'CKEDITOR.ENTER_P',
        'namespace' => 'ckeditor',
        'area' => 'general'
    ),'',true,true);

$settings['shift_enter_mode']= $modx->newObject('modSystemSetting');
$settings['shift_enter_mode']->fromArray(array(
        'key' => 'ckeditor.shift_enter_mode',
        'xtype' => 'textfield',
        'value' => 'CKEDITOR.ENTER_BR',
        'namespace' => 'ckeditor',
        'area' => 'general'
    ),'',true,true);

$settings['auto_paragraph']= $modx->newObject('modSystemSetting');
$settings['auto_paragraph']->fromArray(array(
        'key' => 'ckeditor.auto_paragraph',
        'xtype' => 'combo-boolean',
        'value' => '0',
        'namespace' => 'ckeditor',
        'area' => 'general'
    ),'',true,true);

$settings['native_spellchecker']= $modx->newObject('modSystemSetting');
$settings['native_spellchecker']->fromArray(array(
        'key' => 'ckeditor.native_spellchecker',
        'xtype' => 'combo-boolean',
        'value' => '1',
        'namespace' => 'ckeditor',
        'area' => 'general'
    ),'',true,true);

return $settings;