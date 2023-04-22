<?php
/**
 * CKEditor build script
 *
 * @package ckeditor
 * @subpackage build
 */

$tstart = microtime(true);
set_time_limit(0);

/* define version */
define('PKG_NAME','CKEditor');
define('PKG_NAMESPACE','ckeditor');
define('PKG_VERSION','1.4.5');
define('PKG_RELEASE','pl');

require_once dirname(__FILE__) . '/build.config.php';
/* define sources */
$root = dirname(__FILE__,3).'/';
$sources = array(
    'root' => $root,
    'build' => $root . '_build/'. PKG_NAME_LOWER .'/',
    'data' => $root . '_build/'. PKG_NAME_LOWER .'/data/',
    'processors' => $root . 'core/model/modx/processors/resource/',
    'lexicon' => $root . 'core/components/'.PKG_NAMESPACE.'/lexicon/',
    'documents' => $root.'core/components/'.PKG_NAMESPACE.'/documents/',
    'elements' => $root.'core/components/'.PKG_NAMESPACE.'/elements/',
    'source_manager_assets' => $root.'manager/assets/components/'.PKG_NAMESPACE,
    'source_core' => $root.'core/components/'.PKG_NAMESPACE,
);
unset($root);

/* load modx */
require_once MODX_CORE_PATH . 'model/modx/modx.class.php';

$modx= new modX();
$modx->initialize('mgr');
$modx->setLogLevel(modX::LOG_LEVEL_INFO);
$modx->setLogTarget(XPDO_CLI_MODE ? 'ECHO' : 'HTML'); flush();

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

$vehicle->resolve('file',array(
    'source' => $sources['processors'],
    'target' => "return MODX_CORE_PATH . 'model/modx/processors/ckeditor/';",
));

$vehicle->resolve('file',array(
    'source' => $sources['source_core'],
    'target' => "return MODX_CORE_PATH . 'components/';",
));
$vehicle->resolve('php',array(
    'source' => $sources['data'].'transport.resolver.php',
	'name' => 'resolve',
	'type' => 'php'
));
$vehicle->resolve('php',array(
    'source' => $sources['data'].'modappstat.resolver.php',
    'name' => 'modappstat',
    'type' => 'php'
));
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
unset($settings,$setting);


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

exit ();
