Ext.ux.CKEditor = function(config){

    this.config = config;

    Ext.ux.CKEditor.superclass.constructor.call(this, config);
    this.on('destroy', function (ct) {
        ct.destroyInstance();
    });

};


Ext.extend(Ext.ux.CKEditor, Ext.form.TextArea,  {

    editorConfig: {},

    readOnly: false,

    resize: 'vertical',

    onRender : function(ct, position){
        if(!this.el){
            this.defaultAutoCreate = {
                tag: "textarea",
                autocomplete: "off"
            };
        }
        Ext.form.TextArea.superclass.onRender.call(this, ct, position);
        this.editor = CKEDITOR.replace(this.id, this.editorConfig);
    },

    onResize: function(width, height) {
        Ext.form.TextArea.superclass.onResize.call(this, width, height);
        if (CKEDITOR.instances[this.id].is_instance_ready) {
            CKEDITOR.instances[this.id].resize(width, height);
        }
    },

    setValue : function(value){
        if (!value) value = '&nbsp;';
        Ext.form.TextArea.superclass.setValue.apply(this,arguments);
        if (CKEDITOR.instances[this.id]) CKEDITOR.instances[this.id].setData( value );
    },

    getValue : function(){
        if (CKEDITOR.instances[this.id]) CKEDITOR.instances[this.id].updateElement();
        return Ext.form.TextArea.superclass.getValue.call(this);
    },

    getRawValue : function(){
        if (CKEDITOR.instances[this.id]) CKEDITOR.instances[this.id].updateElement();
        return Ext.form.TextArea.superclass.getRawValue.call(this);
    },

    destroyInstance: function(){
        if (CKEDITOR.instances[this.id]) {
            delete CKEDITOR.instances[this.id];
        }
    }

});

Ext.reg('ckeditor', Ext.ux.CKEditor);

Ext.namespace('MODx.ux');

MODx.ux.CKEditor = Ext.extend(Ext.ux.CKEditor, {
    droppable: false,
    editorConfig: {
        baseHref:               MODx.config['site_url'],
        contentsCss:            MODx.config['editor_css_path'] || '',
        language:               MODx.config['manager_language'] || 'en',
        skin:                   MODx.config['ckeditor.skin'] || 'moono',
        uiColor:                MODx.config['ckeditor.ui_color'] || '#DDDDDD',
        toolbar:                MODx.config['ckeditor.toolbar'] ? JSON.parse(MODx.config['ckeditor.toolbar']) : null,
        extraPlugins:           MODx.config['ckeditor.extra_plugins'] || '',
        disableObjectResizing:  MODx.config['ckeditor.object_resizing'] == false,
        //keystrokes:             [], // TODO !!!
        startupMode:            MODx.config['ckeditor.startup_mode'] || 'wysiwyg',
        undoStackSize:          MODx.config['ckeditor.undo_size'] || 100,
        entities:           false,
        autoParagraph:      false,
        disableNativeSpellChecker: false,
        filebrowserBrowseUrl: MODx.config['manager_url'] + 'index.php?a=' + MODx.action['browser'] + '&source=' + MODx.config['default_media_source'], // TODO !!!
        dialog_backgroundCoverColor: 'silver',
        dialog_backgroundCoverOpacity: '0.5',
        magicline_putEverywhere: true,
        //menu_groups: 'clipboard,table,anchor,link,image', // TODO !!!
        toolbarCanCollapse: true,
        autocorrect_dash: MODx.config['ckeditor.autocorrect_dash'] || '—',
        autocorrect_doubleQuotes: MODx.config['ckeditor.autocorrect_double_quotes'] || '«»',
        autocorrect_singleQuotes: MODx.config['ckeditor.autocorrect_single_quotes'] || '„‟'
    },

    onRender: function (ct, position) {
        Ext.get('modx-content').setStyle('height', 'auto');
        this.editorConfig.height = this.height;

        MODx.ux.CKEditor.superclass.onRender.call(this, ct, position);

        var updateButton = (function(){
            var pageButtons = MODx.activePage ? MODx.activePage.buttons : {};
            for (var button in pageButtons) {
                if (pageButtons[button].process == 'update') {
                    return pageButtons[button];
                }
            }
            return null;
        })();

        this.editor.addCommand( '_save', {
            exec: function( editor ) {
                if (updateButton) {
                    MODx.activePage.ab.handleClick(updateButton);
                }
            }
        } );
        this.editor.setKeystroke( CKEDITOR.CTRL + 83, '_save' );

        if (this.droppable)
            this.makeDroppable();
    },

    makeDroppable: function() {
        var component = this;
        var editor = this.editor;
        editor.on('uiReady', function(){
            var ddTarget = new Ext.Element(editor.container.$);
            var ddTargetEl = ddTarget.dom;

            var iframeCover = new CKEDITOR.dom.element('div');
            iframeCover.setStyles({
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            });

            var insertion = {};
            var insertionHandler = {
                insertText: function(text) {
                    switch (editor.mode)
                    {
                        case 'wysiwyg':
                            editor.insertText(text);
                    }
                    editor.focus();
                },
                insertLink: function(link, text) {
                    switch (editor.mode)
                    {
                        case 'wysiwyg':
                            var selection = editor.getSelection();
                            var ranges = selection.getRanges( true );
                            if ( ranges.length == 1 && ranges[0].collapsed )
                            {
                                // Short mailto link text view (#5736).
                                var node = new CKEDITOR.dom.text( text, editor.document );
                                ranges[0].insertNode( node );
                                ranges[0].selectNodeContents( node );
                                selection.selectRanges( ranges );
                            }

                            // Apply style.
                            var style = new CKEDITOR.style( { element : 'a', attributes : {href : link} } );
                            style.type = CKEDITOR.STYLE_INLINE;     // need to override... dunno why.
                            style.apply( editor.document );
                            break;
                    }
                    editor.focus();
                },
                insertObject: function(link, type) {
                    var element;
                    switch (type)
                    {
                        case 'image':
                            element = {tagName: 'img', attributes: {src: link, alt: ''}};
                            break;
                        case 'audio':
                            element = {tagName: 'audio', attributes: {src: link, controls: ''}};
                            break;
                        case 'video':
                            element = {tagName: 'video', attributes: {src: link, controls: ''}};
                            break;
                    }
                    switch (editor.mode)
                    {
                        case 'wysiwyg':
                            var el = editor.document.createElement(element.tagName);
                            el.setAttributes(element.attributes);
                            editor.insertElement(el);
                            break;
                    }
                    editor.focus();
                }
            };

            var dropTarget = new Ext.dd.DropTarget(ddTargetEl, {
                ddGroup: 'modx-treedrop-dd'

                ,_notifyEnter: function(ddSource, e, data) {
                    editor.ui.space('contents').append( iframeCover );
                    ddTarget.frame();
                    editor.focus();
                }
                ,notifyOut: function(ddSource, e, data) {
                    iframeCover && iframeCover.remove();
                    ddTarget.on('mouseover', onMouseOver);
                }
                ,notifyDrop: function(ddSource, e, data) {
                    iframeCover && iframeCover.remove();
                    ddTarget.on('mouseover', onMouseOver);
                    if (!data.node || !data.node.attributes || !data.node.attributes.type) return false;
                    if (data.node.attributes.type != 'modResource' && data.node.attributes.leaf != true) return false;
                    var win = false;

                    switch (data.node.attributes.type) {
                        case 'modResource':
                            insertion.link = '[[~'+data.node.attributes.pk+']]';
                            insertion.text = data.node.text.replace(/\s*<.*>.*<.*>/, '');
                            break;
                        case 'snippet': win = true; break;
                        case 'chunk': win = true; break;
                        case 'tv': win = true; break;
                        case 'file':
                            var types = {
                                'jpg': 'image',
                                'jpeg': 'image',
                                'png': 'image',
                                'gif': 'image',
                                'svg': 'image',
                                'ogg': 'audio',
                                'mp3': 'audio',
                                'ogv': 'video',
                                'webm': 'video',
                                'mp4': 'video'
                            };
                            var ext = data.node.attributes.text.substring(data.node.attributes.text.lastIndexOf('.')+1);
                            insertion.link = data.node.attributes.url;
                            insertion.text = data.node.attributes.text;
                            insertion.type = types[ext];
                            break;
                        default:
                            var dh = Ext.getCmp(data.node.attributes.type+'-drop-handler');
                            if (dh) {
                                return dh.handle(data,{
                                    ddTargetEl: ddTargetEl
                                    ,cfg: cfg
                                    ,iframe: true
                                    ,iframeEl: ddTargetEl
                                    ,onInsert: insertionHandler.insertText
                                    ,panel: cfg.panel
                                });
                            }
                            return false;
                    }
                    if (win) {
                        MODx.loadInsertElement({
                            pk: data.node.attributes.pk
                            ,classKey: data.node.attributes.classKey
                            ,name: data.node.attributes.name
                            ,ddTargetEl: ddTargetEl
                            ,cfg: {onInsert: insertionHandler.insertText}
                            ,iframe: true
                            ,onInsert: insertionHandler.insertText
                        });
                    } else {
                        if (insertion.type)
                            insertionHandler.insertObject(insertion.link, insertion.type);
                        else
                            insertionHandler.insertLink(insertion.link, insertion.text);
                    }
                    return true;
                }
            });

            var onMouseOver = function(e){
                if (Ext.dd.DragDropMgr.dragCurrent && editor.mode == 'wysiwyg') {
                    dropTarget._notifyEnter();
                    ddTarget.un('mouseover', onMouseOver);
                }
            };
            ddTarget.on('mouseover', onMouseOver);

            component.on('destroy', function() {
                dropTarget.destroy();
            });
        });

    }
});

MODx.ux.CKEditor.replaceComponent = function(id) {
    var textArea = Ext.getCmp('ta');

    var htmlEditor = MODx.load({
        xtype: 'modx-htmleditor',
        width: 'auto',
        height: parseInt(textArea.height, 10) || 200,
        name: textArea.name,
        value: textArea.getValue() || '<p></p>',
        droppable: true
    });

    textArea.el.dom.removeAttribute('name');
    textArea.el.dom.style.display = 'none';
    textArea.on('destroy', function() {
        htmlEditor.destroy();
    });

    htmlEditor.render(textArea.el.parent().dom);
    htmlEditor.editor.on('change', function(e){ MODx.fireResourceFormChange(); });
};

MODx.ux.CKEditor.replaceTextAreas = function(textAreas) {
    Ext.each(textAreas, function(textArea){
        var htmlEditor = MODx.load({
            xtype: 'modx-htmleditor',
            width: 'auto',
            height: parseInt(textArea.style.height, 10) || 200,
            name: textArea.name,
            value: textArea.value || '<p></p>'
        });

        textArea.removeAttribute(name);
        textArea.style.display = 'none';

        htmlEditor.render(textArea.parentNode);
        htmlEditor.editor.on('change', function(e){ MODx.fireResourceFormChange(); });
    });
};

Ext.reg('modx-htmleditor', MODx.ux.CKEditor);

CKEDITOR_BASEPATH = MODx.config['ckeditor.manager_assets_url'] || (MODx.config['manager_url'] + 'assets/components/ckeditor/') + 'ckeditor/';