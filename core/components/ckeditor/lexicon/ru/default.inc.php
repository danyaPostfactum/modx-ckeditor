<?php
/**
 * Russian Language file for CKEditor
 *
 * @package ckeditor
 * @subpackage lexicon
 */

$_lang['ckeditor'] = 'CKEditor';

$_lang['area_general'] = 'Основные настройки';

$_lang['setting_ckeditor.ui_color'] = 'Цвет редактора';
$_lang['setting_ckeditor.ui_color_desc'] = 'Основной цвет панелей редактора в шестнадцатеричном формате. Например: «#328000» .';
$_lang['setting_ckeditor.skin'] = 'Шкурка редактора';
$_lang['setting_ckeditor.skin_desc'] = 'Название шкурки редактора. Шкурки располагаются в папке «{manager_path}assets/components/ckeditor/ckeditor/skins/».';
$_lang['setting_ckeditor.toolbar'] = 'Панель кнопок';
$_lang['setting_ckeditor.toolbar_desc'] = 'Конфигурация панели кнопок редактора в формате JSON. Например: «[ [ "Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo" ], "/", { "name": "basicstyles", "items": [ "Bold", "Italic" ] } ]».';
$_lang['setting_ckeditor.toolbar_groups'] = 'Группы кнопок';
$_lang['setting_ckeditor.toolbar_groups_desc'] = 'Конфигурация групп панели кнопок в формате JSON. Можно указать какие группы кнопок (такие как, к примеру, basicstyles, clipboard и forms) и в каком порядке отображать. Зарегистрированные кнопки связаны с группами. Используя эту настройку, множно не прописывать все кнопки в настройку "Панель кнопок". Таким образом, при последующем подключнии плагинов с кнопками, не будет необходимости править настройки для отображения новых кнопок. Пример: «[{"name":"editing","groups":["find","selection","spellchecker"]},{"name":"links"},{"name":"insert"},{"name":"forms"},"/",{"name":"basicstyles","groups":["basicstyles","cleanup"]}]»';
$_lang['setting_ckeditor.format_tags'] = 'Список форматов';
$_lang['setting_ckeditor.format_tags_desc'] = 'Список форматов, доступных в выпадающем списке: список тегов, разделенных через точку с запятой. Значение по умолчанию: p;h1;h2;h3;h4;h5;h6;pre;address;div';
$_lang['setting_ckeditor.extra_plugins'] = 'Дополнительные плагины';
$_lang['setting_ckeditor.extra_plugins_desc'] = 'Список дополнительных плагинов, перечисленных через запятую. Дополнительные плагины следует распологать в папке «{manager_path}/assets/components/ckeditor/ckeditor/plugins/».';
$_lang['setting_ckeditor.object_resizing'] = 'Изменение размеров объектов';
$_lang['setting_ckeditor.object_resizing_desc'] = 'Разрешить изменение размеров объектов (изображений, таблиц) мышью.';
$_lang['setting_ckeditor.autocorrect_dash'] = 'Символ тире';
$_lang['setting_ckeditor.autocorrect_dash_desc'] = 'Символ, используемый в качестве замены дефиса между словами';
$_lang['setting_ckeditor.autocorrect_double_quotes'] = 'Символы двойных кавычек';
$_lang['setting_ckeditor.autocorrect_double_quotes_desc'] = 'Пара символов, используемых в качестве открывающей и закрывающей кавычки при замене «программистской» двойной кавычки. В русском языке используются французские кавычки «ёлочки».';
$_lang['setting_ckeditor.autocorrect_single_quotes'] = 'Символы одинарных кавычек';
$_lang['setting_ckeditor.autocorrect_single_quotes_desc'] = 'Пара символов, используемых в качестве открывающей и закрывающей кавычки при замене одинарной кавычки. Эти кавычки можно использовать в качестве кавычек второго уровня. В русском языке используются немецкие кавычки „лапки“.';
$_lang['setting_ckeditor.styles_set'] = 'Набор CSS стилей';
$_lang['setting_ckeditor.styles_set_desc'] = 'Набор определений стилей. Укажите путь до .js файла, содержащего набор стилей (в формате имя_набора_стилей:path/to/styleset.js) либо имя предопеределенного набора. Документация: http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.config.html#.stylesSet';
$_lang['setting_ckeditor.remove_plugins'] = 'Удаляемые плагины';
$_lang['setting_ckeditor.remove_plugins_desc'] = 'Список исключаемых плагинов для загрузки, через запятую.';
$_lang['setting_ckeditor.native_spellchecker'] = 'Проверка правописания браузером';
$_lang['setting_ckeditor.native_spellchecker_desc'] = 'Включает встроенную в браузер проверку правописания (если она есть).';
$_lang['setting_ckeditor.resource_editor_height'] = 'Высота редактора ресурса';
$_lang['setting_ckeditor.resource_editor_height_desc'] = 'Настройка высоты редактора содержимого ресурса (документа)';
