<?php
/**
 * The base class for CKEditor.
 *
 * @package ckeditor
 */
class CKEditor {
    /**
     * @var modX A reference to the modX object.
     */
    public $modx = null;
    /**
     * @var array An array of configuration options
     */
    public $config = array();
    /**
     * @var bool A flag to prevent double script registering
     */
    public $assetsLoaded = false;

    function __construct(modX &$modx,array $config = array()) {
        $this->modx =& $modx;

        $corePath = $this->modx->getOption('ckeditor.core_path',$config,$this->modx->getOption('core_path').'components/ckeditor/');
        $managerAssetsUrl = $this->modx->getOption('ckeditor.manager_assets_url',$config,$this->modx->getOption('manager_url').'assets/components/ckeditor/');

        $this->config = array_merge(array(
            'corePath' => $corePath,
            'managerAssetsUrl' => $managerAssetsUrl,
        ), $config);

        $this->modx->lexicon->load('ckeditor:default');
    }

    public function initialize() {
        if (!$this->assetsLoaded) {
            $this->modx->controller->addLexiconTopic('ckeditor:default');
            $this->modx->controller->addJavascript($this->config['managerAssetsUrl'].'modx.htmleditor.js');
            $this->modx->controller->addJavascript($this->config['managerAssetsUrl'].'ckeditor/ckeditor.js');
        }
        $this->assetsLoaded = true;
    }
}
