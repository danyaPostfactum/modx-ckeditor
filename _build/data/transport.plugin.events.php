<?php
$events = array();

$events['OnManagerPageBeforeRender'] = $modx->newObject('modPluginEvent');
$events['OnManagerPageBeforeRender']->fromArray(array(
    'event' => 'OnManagerPageBeforeRender',
    'priority' => 0,
    'propertyset' => 0
),'',true,true);

$events['OnDocFormPrerender'] = $modx->newObject('modPluginEvent');
$events['OnDocFormPrerender']->fromArray(array(
    'event' => 'OnDocFormPrerender',
    'priority' => 0,
    'propertyset' => 0
),'',true,true);

$events['OnRichTextEditorRegister'] = $modx->newObject('modPluginEvent');
$events['OnRichTextEditorRegister']->fromArray(array(
    'event' => 'OnRichTextEditorRegister',
    'priority' => 0,
    'propertyset' => 0
),'',true,true);

$events['OnRichTextBrowserInit'] = $modx->newObject('modPluginEvent');
$events['OnRichTextBrowserInit']->fromArray(array(
    'event' => 'OnRichTextBrowserInit',
    'priority' => 0,
    'propertyset' => 0
),'',true,true);


return $events;