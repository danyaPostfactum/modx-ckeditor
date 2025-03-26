<?php
$settings = array();

$settings['ui_color']= $modx->newObject('modSystemSetting');
$settings['ui_color']->fromArray(array(
        'key' => 'ckeditor.ui_color',
        'xtype' => 'textfield',
        'value' => '#DDDDDD',
        'namespace' => PKG_NAME_LOWER,
		'area' => 'general'
    ),'',true,true);

$settings['toolbar']= $modx->newObject('modSystemSetting');
$settings['toolbar']->fromArray(array(
        'key' => 'ckeditor.toolbar',
        'xtype' => 'textarea',
        'value' => '',
        'namespace' => PKG_NAME_LOWER,
		'area' => 'general'
    ),'',true,true);

$settings['toolbar_groups']= $modx->newObject('modSystemSetting');
$settings['toolbar_groups']->fromArray(array(
        'key' => 'ckeditor.toolbar_groups',
        'xtype' => 'textarea',
        'value' => '[{"name":"document","groups":["mode","document","doctools"]},{"name":"clipboard","groups":["clipboard","undo"]},{"name":"editing","groups":["find","selection","spellchecker"]},{"name":"links"},{"name":"insert"},{"name":"forms"},"/",{"name":"basicstyles","groups":["basicstyles","cleanup"]},{"name":"paragraph","groups":["list","indent","blocks","align","bidi"]},{"name":"styles"},{"name":"colors"},{"name":"tools"},{"name":"others"},{"name":"about"}]',
        'namespace' => PKG_NAME_LOWER,
        'area' => 'general'
    ),'',true,true);

$settings['format_tags']= $modx->newObject('modSystemSetting');
$settings['format_tags']->fromArray(array(
        'key' => 'ckeditor.format_tags',
        'xtype' => 'textfield',
        'value' => 'p;h1;h2;h3;h4;h5;h6;pre;address;div',
        'namespace' => PKG_NAME_LOWER,
        'area' => 'general'
    ),'',true,true);

$settings['skin']= $modx->newObject('modSystemSetting');
$settings['skin']->fromArray(array(
        'key' => 'ckeditor.skin',
        'xtype' => 'textfield',
        'value' => 'moono-lisa',
        'namespace' => PKG_NAME_LOWER,
        'area' => 'general'
    ),'',true,true);

$settings['extra_plugins']= $modx->newObject('modSystemSetting');
$settings['extra_plugins']->fromArray(array(
        'key' => 'ckeditor.extra_plugins',
        'xtype' => 'textfield',
        'value' => 'html5video,nbsp',
        'namespace' => PKG_NAME_LOWER,
        'area' => 'general'
    ),'',true,true);

$settings['object_resizing']= $modx->newObject('modSystemSetting');
$settings['object_resizing']->fromArray(array(
        'key' => 'ckeditor.object_resizing',
        'xtype' => 'combo-boolean',
        'value' => '0',
        'namespace' => PKG_NAME_LOWER,
        'area' => 'general'
    ),'',true,true);

$settings['autocorrect_dash']= $modx->newObject('modSystemSetting');
$settings['autocorrect_dash']->fromArray(array(
        'key' => 'ckeditor.autocorrect_dash',
        'xtype' => 'textfield',
        'value' => '—',
        'namespace' => PKG_NAME_LOWER,
        'area' => 'general'
    ),'',true,true);

$settings['autocorrect_double_quotes']= $modx->newObject('modSystemSetting');
$settings['autocorrect_double_quotes']->fromArray(array(
        'key' => 'ckeditor.autocorrect_double_quotes',
        'xtype' => 'textfield',
        'value' => '«»',
        'namespace' => PKG_NAME_LOWER,
        'area' => 'general'
    ),'',true,true);

$settings['autocorrect_single_quotes']= $modx->newObject('modSystemSetting');
$settings['autocorrect_single_quotes']->fromArray(array(
        'key' => 'ckeditor.autocorrect_single_quotes',
        'xtype' => 'textfield',
        'value' => '„“',
        'namespace' => PKG_NAME_LOWER,
        'area' => 'general'
    ),'',true,true);

$settings['styles_set']= $modx->newObject('modSystemSetting');
$settings['styles_set']->fromArray(array(
        'key' => 'ckeditor.styles_set',
        'xtype' => 'textarea',
        'value' => 'default',
        'namespace' => PKG_NAME_LOWER,
        'area' => 'general'
    ),'',true,true);

$settings['remove_plugins']= $modx->newObject('modSystemSetting');
$settings['remove_plugins']->fromArray(array(
        'key' => 'ckeditor.remove_plugins',
        'xtype' => 'textfield',
        'value' => 'forms,smiley,liststyle,justify,pagebreak,colorbutton,indentblock,font,newpage,print,save,language,bidi,selectall,preview,flash',
        'namespace' => PKG_NAME_LOWER,
        'area' => 'general'
    ),'',true,true);

$settings['native_spellchecker']= $modx->newObject('modSystemSetting');
$settings['native_spellchecker']->fromArray(array(
        'key' => 'ckeditor.native_spellchecker',
        'xtype' => 'combo-boolean',
        'value' => '1',
        'namespace' => PKG_NAME_LOWER,
        'area' => 'general'
    ),'',true,true);

$settings['resource_editor_height']= $modx->newObject('modSystemSetting');
$settings['resource_editor_height']->fromArray(array(
        'key' => 'ckeditor.resource_editor_height',
        'xtype' => 'textfield',
        'value' => '600',
        'namespace' => PKG_NAME_LOWER,
        'area' => 'general'
    ),'',true,true);

$settings['version']= $modx->newObject('modSystemSetting');
$settings['version']->fromArray(array(
    'key' => 'ckeditor.version',
    'xtype' => 'textfield',
    'value' => PKG_VERSION.'-'.PKG_RELEASE,
    'namespace' => PKG_NAME_LOWER,
    'area' => 'Other',
),'',true,true);

return $settings;
