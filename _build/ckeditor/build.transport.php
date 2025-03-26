<?php
/**
 * CKEditor build script
 *
 * @package ckeditor
 * @subpackage build
 */

$tstart = microtime(true);
set_time_limit(0);

require_once dirname(__FILE__) . '/build.config.php';
/* define sources */
$root = dirname(__FILE__,3).'/';
$sources = array(
    'root' => $root,
    'build' => $root . '_build/'. PKG_NAME_LOWER .'/',
    'data' => $root . '_build/'. PKG_NAME_LOWER .'/data/other/',
    'resolvers' => $root . '_build/'. PKG_NAME_LOWER .'/data/resolvers/',
    'processors' => $root . '_build/'. PKG_NAME_LOWER .'/data/processors/resource/',//last folder from here will be created in file structure, cant target to root ./processors/ dir. TODO find reason and fix it.
    'lexicon' => $root . 'core/components/'.PKG_NAMESPACE.'/lexicon/',
    'documents' => $root.'core/components/'.PKG_NAMESPACE.'/documents/',
    'elements' => $root.'core/components/'.PKG_NAMESPACE.'/elements/',
    'source_manager_assets' => $root.'manager/assets/components/'.PKG_NAMESPACE,
    'source_assets' => $root . 'assets/components/' . PKG_NAME_LOWER,
    'source_core' => $root.'core/components/'.PKG_NAMESPACE,
);
unset($root);

/* load modx */
require_once MODX_CORE_PATH . 'model/modx/modx.class.php';

$modx= new modX();
$modx->initialize('mgr');
$modx->setLogLevel(modX::LOG_LEVEL_INFO);
$modx->setLogTarget(XPDO_CLI_MODE ? 'ECHO' : 'HTML'); flush();

$modx_version = $modx->getVersionData();
$modx3 = false;
if ($modx_version['version'] == 3) {
    $modx3 = true;
}

$modx->loadClass('transport.modPackageBuilder','',false, true);
$builder = new modPackageBuilder($modx);
$builder->createPackage(PKG_NAMESPACE,PKG_VERSION,PKG_RELEASE);
$builder->registerNamespace(PKG_NAMESPACE,false,true,'{core_path}components/'.PKG_NAMESPACE.'/');

/* create the plugin object */
$plugin= $modx->newObject('modPlugin');
$plugin->set('id',1);
$plugin->set('name', PKG_NAME);
$plugin->set('description', 'CKEditor WYSIWYG editor plugin for MODX2 and MODX3');
$plugin->set('static', true);
$plugin->set('static_file', PKG_NAMESPACE.'/elements/plugins/'.PKG_NAMESPACE.'.plugin.php');
$plugin->set('category', 0);

/* add plugin events */
$events = include $sources['data'].'transport.plugin.events.php';
if (is_array($events) && !empty($events)) {
    $plugin->addMany($events);
} else {
    $modx->log(xPDO::LOG_LEVEL_ERROR,'Could not find plugin events!');
}
$modx->log(xPDO::LOG_LEVEL_INFO,'Packaged in '.count($events).' Plugin Events.'); flush();
unset($events);

/* load plugin properties */
//$properties = include $sources['data'].'properties.inc.php';
//$plugin->setProperties($properties);
//$modx->log(xPDO::LOG_LEVEL_INFO,'Setting '.count($properties).' Plugin Properties.'); flush();

$attributes= array(
    xPDOTransport::UNIQUE_KEY => 'name',
    xPDOTransport::PRESERVE_KEYS => false,
    xPDOTransport::UPDATE_OBJECT => true,
    xPDOTransport::RELATED_OBJECTS => true,
    xPDOTransport::RELATED_OBJECT_ATTRIBUTES => array (
        'PluginEvents' => array(
            xPDOTransport::PRESERVE_KEYS => true,
            xPDOTransport::UPDATE_OBJECT => false,
            xPDOTransport::UNIQUE_KEY => array('pluginid','event'),
        ),
    ),
);
$vehicle = $builder->createVehicle($plugin, $attributes);

$modx->log(modX::LOG_LEVEL_INFO,'Adding file resolvers to plugin...');
$vehicle->resolve('file',array(
    'source' => $sources['source_manager_assets'],
    'target' => "return MODX_MANAGER_PATH . 'assets/components/';",
));

if (!$modx3){
    $vehicle->resolve('file',array(
        'source' => $sources['processors'],
        'target' => "return MODX_CORE_PATH . 'model/modx/processors/ckeditor/';",
    ));
    //TODO clean folder model/modx/processors/ckeditor/ on MODX3 because wrong installer in 1.4.6 and prev versions.
    //May be needed only when uninstall or update package...
}

$vehicle->resolve('file',array(
    'source' => $sources['source_core'],
    'target' => "return MODX_CORE_PATH . 'components/';",
));

/** @var array $BUILD_RESOLVERS */
foreach ($BUILD_RESOLVERS as $resolver) {
    if ($vehicle->resolve('php', array('source' => $sources['resolvers'] . $resolver . '.resolver' . '.php'))) {
        $modx->log(modX::LOG_LEVEL_INFO, 'Added resolver "' . $resolver . '" ');
    } else {
        $modx->log(modX::LOG_LEVEL_INFO, 'Could not add resolver "' . $resolver . '" ');
    }
}

$builder->putVehicle($vehicle);

/* load system settings */
$settings = include $sources['data'].'transport.settings_install.php';
if (is_array($settings) && !empty($settings)) {
    $attributes= array(
        xPDOTransport::UNIQUE_KEY => 'key',
        xPDOTransport::PRESERVE_KEYS => true,
        xPDOTransport::UPDATE_OBJECT => false,
    );
    foreach ($settings as $setting) {
        $vehicle = $builder->createVehicle($setting,$attributes);
        $builder->putVehicle($vehicle);
    }
    $modx->log(xPDO::LOG_LEVEL_INFO,'Packaged in '.count($settings).' System Settings.'); flush();
} else {
    $modx->log(xPDO::LOG_LEVEL_ERROR,'Could not package System Settings.');
}
unset($settings, $setting, $attributes);
$su = include $sources['data'] . 'transport.settings_update.php';
if (!is_array($su)) {
    $modx->log(modX::LOG_LEVEL_ERROR, 'Could not package in settings for update.');
} else {
    $attributes_u = array(
        xPDOTransport::UNIQUE_KEY => 'key',
        xPDOTransport::PRESERVE_KEYS => true,
        xPDOTransport::UPDATE_OBJECT => true,
    );
    foreach ($su as $setting_u) {
        $vehicle = $builder->createVehicle($setting_u, $attributes_u);
        $builder->putVehicle($vehicle);
    }
    $modx->log(modX::LOG_LEVEL_INFO, 'Packaged in ' . count($su) . ' System Settings for update its values.');
}
unset($su, $setting_u, $attributes_u);


$modx->log(modX::LOG_LEVEL_INFO,'Adding package attributes and setup options...');
$builder->setPackageAttributes(array(
    'license' => file_get_contents($sources['documents'] . 'license.txt'),
    'readme' => file_get_contents($sources['documents'] . 'readme.txt'),
    'changelog' => file_get_contents($sources['documents'] . 'changelog.txt')
   // 'setup-options' => array(
   //     'source' => $sources['build'].'setup.options.php',
   // ),
));

/* zip up package */
$modx->log(modX::LOG_LEVEL_INFO,'Packing up transport package zip...');
$builder->pack();

$tend= microtime(true);
$totalTime= ($tend - $tstart);
$totalTime= sprintf("%2.4f s", $totalTime);

$modx->log(modX::LOG_LEVEL_INFO,"Package built in {$totalTime}\n");

$download_url = '/_build/env/index.php?getpackage='.PKG_NAME_LOWER.'-'.PKG_VERSION.'-'.PKG_RELEASE;
$modx->log(modX::LOG_LEVEL_INFO,"\n<br /><a target='_blank' href='{$download_url}'>[DOWNLOAD PACKAGE]</a><br />\n");

exit ();
