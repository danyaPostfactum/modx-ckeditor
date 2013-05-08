<?php
/**
 * CKEditor WYSIWYG Editor Plugin
 *
 * Events: OnManagerPageBeforeRender, OnRichTextEditorRegister, OnRichTextBrowserInit, OnDocFormPrerender
 *
 * @var modX $modx
 * @author Danil Kostin <danya.postfactum(at)gmail.com>
 *
 * @package ckeditor
 */

if ($modx->event->name == 'OnRichTextEditorRegister') {
    $modx->event->output('CKEditor');
    return;
}

if ($modx->getOption('which_editor', null, 'CKEditor') !== 'CKEditor' || !$modx->getOption('use_editor', null, true)) {
    return;
}

switch ($modx->event->name) {
    case 'OnRichTextEditorInit':
        /** @var CKEditor $ckeditor */
        $ckeditor = $modx->getService('ckeditor', 'CKEditor', $modx->getOption('ckeditor.core_path', null, $modx->getOption('core_path').'components/ckeditor/') . 'model/ckeditor/');
        $ckeditor->initialize();
        break;
    case 'OnRichTextBrowserInit':
        $funcNum = $_REQUEST['CKEditorFuncNum'];
        $modx->event->output("function(data){
        window.parent.opener.CKEDITOR.tools.callFunction({$funcNum}, data.fullRelativeUrl);
    }");
        break;
}

return;