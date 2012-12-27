<?php
/**
 * CKEditor WYSIWYG Editor for MODx Revolution
 *
 * @author Danil Kostin <danya.postfactum@gmail.com>
 *
 * @package ace
 */

/**
 * Resolver to set which_editor to CKEditor
 * 
 * @package ace
 * @subpackage build
 */
$success= true;
if ($pluginid= $object->get('id')) {
    switch ($options[xPDOTransport::PACKAGE_ACTION]) {
        case xPDOTransport::ACTION_INSTALL:
        case xPDOTransport::ACTION_UPGRADE:
            $object->xpdo->log(xPDO::LOG_LEVEL_INFO,'Attempting to set which_editor setting to CKEditor.');
            // set CKEditor as default element editor
            $setting = $object->xpdo->getObject('modSystemSetting',array('key' => 'which_editor'));
            if ($setting) {
                $setting->set('value','CKEditor');
                $setting->save();
            }
            unset($setting);
            break;
        case xPDOTransport::ACTION_UNINSTALL:
            $success= true;
            break;
    }
    switch ($options[xPDOTransport::PACKAGE_ACTION]) {
        case xPDOTransport::ACTION_UPGRADE:
            break;
	}
}

return $success;