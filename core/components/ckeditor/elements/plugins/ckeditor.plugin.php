<?php
/**
 * CKEditor WYSIWYG Editor Plugin
 *
 * Events: OnManagerPageBeforeRender, OnRichTextEditorRegister, OnRichTextEditorInit, OnRichTextBrowserInit
 *
 * @var modX $modx
 * @author Danil Kostin <danya.postfactum(at)gmail.com>
 *
 * @package ckeditor
 */
$enabled = $modx->getOption('which_editor', null, 'CKEditor') == 'CKEditor' && $modx->getOption('use_editor', null, true);

switch ($modx->event->name) {
    case 'OnRichTextEditorRegister':
        $modx->event->output('CKEditor');
        break;
    case 'OnManagerPageBeforeRender':
        if ($enabled) {
            /** @var CKEditor $ckeditor */
            $ckeditor = $modx->getService('ckeditor', 'CKEditor', $modx->getOption('ckeditor.core_path', null, $modx->getOption('core_path').'components/ckeditor/') . 'model/ckeditor/');
            $ckeditor->initialize();
        }
        break;
    case 'OnRichTextEditorInit':
        break;
    case 'OnRichTextBrowserInit':
        if ($enabled) {
            $funcNum = $_REQUEST['CKEditorFuncNum'];
            $modx->event->output("function(data){
                window.parent.opener.CKEDITOR.tools.callFunction({$funcNum}, data.fullRelativeUrl);
            }");
        }
        break;
}

return;
