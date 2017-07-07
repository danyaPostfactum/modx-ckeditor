(function(){

Ext.ux.CKEditor = Ext.extend(Ext.form.TextField,  {

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
        // strip undefined values
        var config = {};
        for (var prop in this.editorConfig) {
            if (Ext.isDefined(this.editorConfig[prop]))
                config[prop] = this.editorConfig[prop];
        }
        this.editor = CKEDITOR.replace(this.el.dom, config);
    },

    onResize: function(width, height) {
        Ext.form.TextArea.superclass.onResize.call(this, width, height);
        if (this.editor.is_instance_ready) {
            this.editor.resize(width, height);
        }
    },

    setValue : function(value){
        if (!value) value = '&nbsp;';
        Ext.form.TextArea.superclass.setValue.apply(this,arguments);
        if (this.editor) this.editor.setData( value );
    },

    getValue : function(){
        if (this.editor) this.editor.updateElement();
        return Ext.form.TextArea.superclass.getValue.call(this);
    },

    getRawValue : function(){
        if (this.editor) this.editor.updateElement();
        return Ext.form.TextArea.superclass.getRawValue.call(this);
    },

    destroy: function(){
        if (this.rendered) {
            // CKEditor tries to use removed frame element
            try {
                this.editor.destroy();
            } catch (e) {}
        }
        Ext.ux.CKEditor.superclass.destroy.call(this);
    }

});

Ext.reg('ckeditor', Ext.ux.CKEditor);

Ext.namespace('MODx.ux');

function getOption(key, type, defaultValue) {
    var raw = MODx.config[key];
    if (!raw)
        return defaultValue;
    var types = {
        'string': String,
        'boolean': Boolean,
        'number': Number,
        'json': JSON.parse
    };
    try {
        return types[type](raw);
    } catch (e) {
        return defaultValue;
    }
}

function getFileBrowseUrl() {
    var url = MODx.config['manager_url'] + 'index.php';
    var query = {a: MODx.action['browser'], source: MODx.config['default_media_source']};
    return url + '?' + Ext.urlEncode(query);
}

MODx.ux.CKEditor = Ext.extend(Ext.ux.CKEditor, {
    droppable: false,
    editorConfig: {
        baseHref:                       getOption('site_url', 'string', '/'),
        contentsCss:                    getOption('editor_css_path', 'string', ''),
        language:                       getOption('manager_language', 'string'),
        skin:                           getOption('ckeditor.skin', 'string'),
        uiColor:                        getOption('ckeditor.ui_color', 'string'),
        toolbar:                        getOption('ckeditor.toolbar', 'json'),
        toolbarGroups:                  getOption('ckeditor.toolbar_groups', 'json'),
        format_tags:                    getOption('ckeditor.format_tags', 'string'),
        extraPlugins:                   getOption('ckeditor.extra_plugins', 'string'),
        removePlugins:                  getOption('ckeditor.remove_plugins', 'string'),
        stylesSet:                      getOption('ckeditor.styles_set', 'json', MODx.config['ckeditor.styles_set']),
        startupMode:                    getOption('ckeditor.startup_mode', 'string'),
        undoStackSize:                  getOption('ckeditor.undo_size', 'number'),
        autocorrect_dash:               getOption('ckeditor.autocorrect_dash', 'string'),
        autocorrect_doubleQuotes:       getOption('ckeditor.autocorrect_double_quotes', 'string'),
        autocorrect_singleQuotes:       getOption('ckeditor.autocorrect_single_quotes', 'string'),
        disableObjectResizing:          !getOption('ckeditor.object_resizing', 'boolean'),
        disableNativeSpellChecker:      !getOption('ckeditor.native_spellchecker', 'boolean'),
        entities:                       false,
        autoParagraph:                  false,
        magicline_putEverywhere:        true,
        toolbarCanCollapse:             true,
        dialog_backgroundCoverColor:    'silver',
        dialog_backgroundCoverOpacity:  '0.5',
        filebrowserBrowseUrl:           getFileBrowseUrl(),
        //keystrokes:             [], // TODO !!!
        //menu_groups: 'clipboard,table,anchor,link,image', // TODO !!!
    },

    onRender: function (ct, position) {
        this.editorConfig.height = this.height;

        MODx.ux.CKEditor.superclass.onRender.call(this, ct, position);

        this.addSaveCommand();

        if (this.droppable)
            this.makeDroppable();
    },

    addSaveCommand: function() {
        var getUpdateButton = function(){
            var pageButtons = MODx.activePage ? MODx.activePage.buttons : {};
            for (var button in pageButtons) {
                var process = pageButtons[button].process;
                if (!process)
                    continue;
                if (process.split('/').pop() == 'update') {
                    return pageButtons[button];
                }
            }
            return null;
        };

        this.editor.addCommand( '_save', {
            exec: function( editor ) {
                var updateButton = getUpdateButton();
                if (updateButton) {
                    MODx.activePage.ab.handleClick(updateButton);
                }
            }
        } );
        this.editor.setKeystroke( CKEDITOR.CTRL + 83, '_save' );
    },

    makeDroppable: function() {
        var component = this;
        var editor = this.editor;
        editor.on('uiReady', function(){
            var ddTarget = new Ext.Element(editor.container.$, true);
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

            dropTarget.addToGroup('modx-treedrop-elements-dd');
            dropTarget.addToGroup('modx-treedrop-sources-dd');

            var onMouseOver = function(e){
                if (Ext.dd.DragDropMgr.dragCurrent && editor.mode == 'wysiwyg') {
                    dropTarget._notifyEnter();
                    ddTarget.un('mouseover', onMouseOver);
                }
            };
            ddTarget.on('mouseover', onMouseOver);

            component.on('beforedestroy', function() {
                dropTarget.destroy();
                ddTarget.un('mouseover', onMouseOver);
            });
        });

    }
});

MODx.ux.CKEditor.replaceElement = function(element) {
    var htmlEditor = MODx.load({
        xtype: 'modx-htmleditor',
        width: 'auto',
        height: Ext.Element(element).getHeight() || 200,
        applyTo: element,
        value: element.value || '<p></p>',
        droppable: true
    });
    element.style.display = 'none';
    return htmlEditor;
};

MODx.ux.CKEditor.replaceComponent = function(textArea) {
    if (!(textArea instanceof Ext.form.TextArea))
        return null;
    var htmlEditor = this.replaceElement(textArea.el.dom);

    textArea.on('destroy', function() {
        htmlEditor.destroy();
    });

    htmlEditor.editor.on('change', function() {
        Ext.defer(function() {
            //textArea.el.dom.value = htmlEditor.getValue();
            textArea.fireEvent('change', {});
        }, 10);
    });

    return htmlEditor;
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

CKEDITOR_BASEPATH = (MODx.config['ckeditor.manager_assets_url'] || (MODx.config['manager_url'] + 'assets/components/ckeditor/')) + 'ckeditor/';

MODx.loadedRTEs = {};
MODx.loadRTE = function(id) {

    var element = Ext.get(id);
    if (element) {
        id = element.id;
    }

    // Prevent multiple instantiation (mostly for TVs)
    // if (id in MODx.loadedRTEs) {
    //     return false;
    // }

    var component = Ext.getCmp(id);

    var editor;
    if (component) {
        if (id == 'ta' && getOption('ckeditor.resource_editor_height', 'number', 0)) {
            component.setHeight(getOption('ckeditor.resource_editor_height', 'number', 0));
        }
        editor = MODx.ux.CKEditor.replaceComponent(component);
    } else if (element) {
        editor = MODx.ux.CKEditor.replaceElement(element.dom);
    } else {
        return false;
    }

    MODx.loadedRTEs[id] = editor;
    return true;
};

MODx.unloadRTE = function(id) {
    var element = Ext.get(id);
    if (!element) {
        return false;
    }
    id = element.id;
    var editor = MODx.loadedRTEs[id];
    if (!editor) {
        return false;
    }
    // Do trick to avoid textarea removing
    editor.rendered = false;
    editor.editor.destroy();
    editor.destroy();
    element.dom.style.display = '';
    delete MODx.loadedRTEs[id];
    return true;
};

MODx.afterTVLoad = function() {
    var els = Ext.query('.modx-richtext');
    Ext.each(els, function(element) {
        MODx.loadRTE(element);
    });
};

MODx.unloadTVRTE = function() {
    var els = Ext.query('.modx-richtext');
    Ext.each(els, function(element) {
        MODx.unloadRTE(element);
    });
};

})();