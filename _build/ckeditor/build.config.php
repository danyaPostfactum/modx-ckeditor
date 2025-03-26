<?php
/* define version */
define('PKG_NAME','CKEditor');
define('PKG_NAME_LOWER', strtolower(PKG_NAME));

define('PKG_NAMESPACE','ckeditor');
define('PKG_VERSION','1.4.7');
//TODO remove system settings when package removed or ask user for full replace
define('PKG_RELEASE','ce');
if (isset($_SERVER['MODX_BASE_PATH'])) {
    define('MODX_BASE_PATH', $_SERVER['MODX_BASE_PATH']);
} elseif (file_exists(dirname(__FILE__ ,3) . '/core')) {
    define('MODX_BASE_PATH', dirname(__FILE__,3) . '/');
} else {
    define('MODX_BASE_PATH', dirname(__FILE__,4) . '/');
}
define('MODX_CORE_PATH', MODX_BASE_PATH . 'core/');
define('MODX_MANAGER_PATH', MODX_BASE_PATH . 'manager/');
define('MODX_CONNECTORS_PATH', MODX_BASE_PATH . 'connectors/');
define('MODX_ASSETS_PATH', MODX_BASE_PATH . 'assets/');

// define urls
define('MODX_BASE_URL', '/');
define('MODX_CORE_URL', MODX_BASE_URL . 'core/');
define('MODX_MANAGER_URL', MODX_BASE_URL . 'manager/');
define('MODX_CONNECTORS_URL', MODX_BASE_URL . 'connectors/');
define('MODX_ASSETS_URL', MODX_BASE_URL . 'assets/');

$BUILD_RESOLVERS = array(
    'transport',
    'modappstat',
);
