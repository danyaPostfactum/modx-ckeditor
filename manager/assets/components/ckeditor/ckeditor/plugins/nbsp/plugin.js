/**
 * @file insert Non-Breaking Space for CKEditor
 * Copyright (C) 2014 Alfonso Martínez de Lizarrondo
 * Create a command and enable the Ctrl+Space shortcut to insert a non-breaking space in CKEditor
 *
 */

CKEDITOR.plugins.add( 'nbsp',
{
	init : function( editor )
	{
		// Insert &nbsp; if Ctrl+Space is pressed:
		editor.addCommand( 'insertNbsp', {
			exec: function( editor ) {
				editor.insertHtml( '&nbsp;', 'text' );
			}
		});
		editor.setKeystroke( CKEDITOR.CTRL + 32 /* space */, 'insertNbsp' );
	}

} );
