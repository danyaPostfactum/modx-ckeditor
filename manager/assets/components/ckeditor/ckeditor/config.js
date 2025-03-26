/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */
/*fix for clientconfig and others*/
for (var i in CKEDITOR.instances) {
    CKEDITOR.instances[i].on('change', function () {
        this.updateElement();
    });
    CKEDITOR.instances[i].on('afterPaste', function () {
        if (this.commands.toggleAutocorrect.state == 2) {
            this.execCommand('autocorrect');
        }
    });
}
/*end of fix for clientconfig and others*/

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
    config.autoGrow_minHeight = 100;
    config.autoGrow_maxHeight = 600;
    config.autoGrow_bottomSpace = 50;
    config.autoGrow_onStartup = true;
};
