<?php
/** @var modX $modx */
/** @var array $sources */

$settings = array();

$tmp = array(
    'ckeditor.version' => array(
        'xtype' => 'textfield',
        'value' => PKG_VERSION.'-'.PKG_RELEASE,
        'area' => 'Other',
    ),

);

foreach ($tmp as $k => $v) {
    /** @var modSystemSetting $setting */
    $setting = $modx->newObject('modSystemSetting');
    $setting->fromArray(array_merge(
        array(
            'key' => $k,
            'namespace' => PKG_NAME_LOWER,
        ), $v
    ), '', true, true);

    $settings[] = $setting;
}
unset($tmp);

return $settings;
