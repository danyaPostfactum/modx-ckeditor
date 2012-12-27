<?php
/**
 * CKEditor WYSIWYG Editor Plugin
 *
 * Events: OnManagerPageBeforeRender, OnRichTextEditorRegister, OnRichTextBrowserInit, OnDocFormPrerender
 *
 * @author Danil Kostin <danya.postfactum(at)gmail.com>
 *
 * @package ckeditor
 */

if ($modx->event->name == 'OnRichTextEditorRegister') {
    $modx->event->output('CKEditor');
    return;
}

if ($modx->getOption('which_editor',null,'CKEditor') !== 'CKEditor' || !$modx->getOption('use_editor',null,true)) {
    return;
}

if ($modx->event->name == 'OnRichTextBrowserInit') {
    $funcNum = $_REQUEST['CKEditorFuncNum'];
    $modx->event->output("function(data){
        window.parent.opener.CKEDITOR.tools.callFunction({$funcNum}, data.fullRelativeUrl);
    }");
    return;
}

$ckeditor = $modx->getService('ckeditor','CKEditor',$modx->getOption('ckeditor.core_path',null,$modx->getOption('core_path').'components/ckeditor/').'model/ckeditor/');

$ckeditor->initialize();

if ($modx->event->name == 'OnDocFormPrerender') {
    $richText = $modx->controller->resourceArray['richtext'];
    $classKey = $modx->controller->resourceArray['class_key'];

    if ($richText && !in_array($classKey, array('modStaticResource','modSymLink','modWebLink','modXMLRPCResource'))) {
        $selector = '#ta, .modx-richtext';
    } else {
        $selector = '.modx-richtext';
    }

    $modx->controller->addHtml('<script>'."
        Ext.onReady(function() {
            var textAreas = Ext.query('$selector');
            textAreas.forEach(function(textArea){
                var htmlEditor = MODx.load({
                    xtype: 'modx-htmleditor',
                    width: 'auto',
                    height: parseInt(textArea.style.height) || 200,
                    name: textArea.name,
                    value: textArea.value || '<p></p>'
                });

                textArea.name = '';
                textArea.style.display = 'none';

                htmlEditor.render(textArea.parentNode);
                htmlEditor.editor.on('key', function(e){ MODx.fireResourceFormChange() });
            });
        });
    ".'</script>');
}

return;