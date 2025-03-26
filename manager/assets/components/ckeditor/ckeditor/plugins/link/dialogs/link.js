
/*
 Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
let link_div,
	link_input = {
		field: '',
		select: '',
		url: '',
		id: '',
		render: '',
	};
(function() {
	CKEDITOR.dialog.add("link", function(c) {
		function t(a, b) {
			var c = a.createRange();
			c.setStartBefore(b);
			c.setEndAfter(b);
			return c
		}
		var n = CKEDITOR.plugins.link,
			q, r = function() {
				var a = this.getDialog(),
					b = a.getContentElement("target", "popupFeatures"),
					a = a.getContentElement("target", "linkTargetName"),
					p = this.getValue();
				if (b && a) switch (b = b.getElement(), b.hide(), a.setValue(""), p) {
					case "frame":
						a.setLabel(c.lang.link.targetFrameName);
						a.getElement().show();
						break;
					case "popup":
						b.show();
						a.setLabel(c.lang.link.targetPopupName);
						a.getElement().show();
						break;
					default:
						a.setValue(p), a.getElement().hide()
				}
			},
			l = function(a) {
				a.target && this.setValue(a.target[this.id] || "")
			},
			e = function(a) {
				a.advanced && this.setValue(a.advanced[this.id] || "")
			},
			k = function(a) {
				a.target || (a.target = {});
				a.target[this.id] = this.getValue() || ""
			},
			m = function(a) {
				a.advanced || (a.advanced = {});
				a.advanced[this.id] = this.getValue() || ""
			},
			g = c.lang.common,
			b = c.lang.link,
			d;
		return {
			title: b.title,
			minWidth: "moono-lisa" == (CKEDITOR.skinName || c.config.skin) ? 450 : 350,
			minHeight: 240,
			contents: [{
				id: "info",
				label: b.info,
				title: b.info,
				elements: [{
					type: "text",
					id: "linkDisplayText",
					label: b.displayText,
					setup: function() {
						this.enable();
						this.setValue(c.getSelection().getSelectedText());
						q = this.getValue()
					},
					commit: function(a) {
						a.linkText = this.isEnabled() ? this.getValue() : ""
					}
				}, {
					id: "linkType",
					type: "select",
					label: b.type,
					"default": "url",
					items: [
						[b.toUrl, "url"],
						[b.toAnchor, "anchor"],
						[b.toEmail, "email"]
					],
					onChange: function() {
						var a = this.getDialog(),
							b = ["urlOptions", "anchorOptions", "emailOptions"],
							p = this.getValue(),
							f = a.definition.getContents("upload"),
							f = f && f.hidden;
						"url" == p ? (c.config.linkShowTargetTab && a.showPage("target"), f || a.showPage("upload")) : (a.hidePage("target"), f || a.hidePage("upload"));
						for (f = 0; f < b.length; f++) {
							var h = a.getContentElement("info", b[f]);
							h && (h = h.getElement().getParent().getParent(), b[f] == p + "Options" ? h.show() : h.hide())
						}
						a.layout()
					},
					setup: function(a) {
						this.setValue(a.type || "url")
					},
					commit: function(a) {
						a.type = this.getValue()
					}
				}, {
					type: "vbox",
					id: "urlOptions",
					children: [{
						type: "hbox",
						widths: ["25%", "75%"],
						children: [{
							id: "protocol",
							type: "select",
							label: g.protocol,
							"default": "http://",
							items: [
								["http://‎", "http://"],
								["https://‎", "https://"],
								["ftp://‎", "ftp://"],
								["news://‎", "news://"],
								["modx-id", "\[\[~"],
								[b.other, ""]
							],
							setup: function(a) {

								link_input.select = this.getInputElement().getId()
								let _link,f,
									_act = true;

								if (a.url) {

									_link = a.url.url;
									f = /^((http|https|ftp|news):\/\/(?=.)|\[\[~)/i.exec(_link);
								}
								if (f && f.length) {
									a.url && this.setValue(f['0'] || "")
									a.url.url = a.url.url.replace(/\[\[~|\]\]/gi, '')
									if (f['0'] == '[[~') {
										_act = false
									}

								} else {
									a.url && this.setValue(a.url.protocol || "")
								}
								document.getElementsByClassName('res-list')[0].hidden = _act
								if (!_act) {
									let fres = document.getElementById('input-res_id')
									fres.focus()
								}
							},
							commit: function(a) {
								a.url || (a.url = {});
								a.url.protocol = this.getValue()
							},
							onChange: function(a) {

								if (this.getValue() == '[[~') {
									document.getElementsByClassName('res-list')[0].hidden = false;
									let fres = document.getElementById('input-res_id');
									fres.focus()
								} else {
									document.getElementsByClassName('res-list')[0].hidden = true

								}
							}
						}, {
							type: "text",
							id: "url",
							label: g.url,
							required: !0,
							focus: false,
							onLoad: function(a) {
								this.allowOnChange = !0
							},
							onKeyUp: function() {
								this.allowOnChange = !1;
								var a = this.getDialog().getContentElement("info", "protocol"),
									b = this.getValue(),
									c = /^((javascript:)|[#\/\.\?])/i,
									f = /^((http|https|ftp|news):\/\/(?=.)|\[\[~)/i.exec(b);

								f ? (this.setValue(b.replace(/\[\[~|\]\]/gi, '')), a.setValue(f[0].toLowerCase())) : c.test(b) && a.setValue("");
								if (f && f['0'] == "[[~") {
									link_div.items.items[0].items.items['0'].setValue(b.replace(/\[\[~|\]\]/gi, ''))
									let fres = document.getElementById('input-res_id');
									fres.focus()
								}
								this.allowOnChange = !0
							},
							onChange: function() {
								if (this.allowOnChange) this.onKeyUp()
							},
							validate: function() {
								var a = this.getDialog();
								return a.getContentElement("info", "linkType") && "url" != a.getValueOf("info", "linkType") ? !0 : !c.config.linkJavaScriptLinksAllowed && /javascript\:/.test(this.getValue()) ? (alert(g.invalidValue), !1) : this.getDialog().fakeObj ? !0 : CKEDITOR.dialog.validate.notEmpty(b.noUrl).apply(this)
							},
							setup: function(a) {
								this.allowOnChange = !1;
								a.url && this.setValue(a.url.url);
								this.allowOnChange = !0

								link_input.field = document.getElementById(this._.inputId);

								if (this.getValue() != '') {
									let _val = this.getValue();
									setTimeout(lazyVal, 300, _val);
								} else {
									link_div.items.items[0].items.items[0].clearValue()
								}
							},
							commit: function(a) {
								this.onChange();
								a.url || (a.url = {});
								a.url.url = this.getValue();
								this.allowOnChange = !1
							}
						}],
						setup: function() {
							this.getDialog().getContentElement("info", "linkType") || this.getElement().show()
						}
					},
					{
						type: "vbox",
						id: "find_res_line",
						children: [
						],
						setup: function(a) {
							if (link_div != null) {
								link_div.destroy();
							}

							let _parent = document.getElementById(this.domId);
							_parent.classList.add('res-list');
							link_input.render = this.domId;

                            let editorSearchProcessor = 'ckeditor/resource/editorsearch';//for MODX2
                            if (MODx.config.version.startsWith('3.')){
                                editorSearchProcessor = 'Resource/GetList';
                            }

							Ext.onReady(
								function() {

									MODx.ux.CKEditor.FindRes = function(config) {
										config = config || {};
										config.renderTo = link_input.render;
										Ext.applyIf(config,{
											url: "/connectors/index.php"
											,fields: ['id','pagetitle','context_key']
											,renderTo:config.renderTo
											// ,cls:'res-list'
											,name: 'res_id'
							                ,hiddenName: 'res_id'
							                ,id: 'input-res_id'
											,anchor: '100%'
											,layout: 'anchor'
											,listEmptyText: ''
											,width: '100%'
                                            //TODO size attr change from 24 to 65 or add style width:100% for best UX and fix crop long pagetitle in search input
											,allowBlank : false
											,typeAhead: true
											,editable: true
											,minChars: 0
											,baseParams: {
												action: editorSearchProcessor,
												parent: config.parent,
												type: 'list',
                                                //limit: 0,
											}
											,mode: 'remote'
											,displayField: 'pagetitle'
											,tpl: new Ext.XTemplate('<tpl for="." ><div class="x-combo-list-item">{pagetitle} - <b>({id})</b> <tpl if="context_key!=\'web\'"><i>[{context_key}]</i></tpl></div></tpl>')
											,valueField: 'id'
											,listeners:{
										         scope: this,
										         'select': changeRes,
										    }
											,triggerConfig: {
												tag: 'span',
												cls: 'x-field-combo-btns-ops',
												cn: [
													{tag: 'div', cls: 'x-form-trigger x-field-combo-list'},
													// {tag: 'div', cls: 'x-form-trigger x-field-combo-mytrigger x-field-search-clear'}
												]
											}
											,onTriggerClickOps: function(event, btn){
												// В данном примере используется другой способ проверки (для разнообразия)
												if (btn && Ext.get(btn).hasClass('x-field-combo-trigops')) {
													this.clearValue();
												} else {
													// Вызываем родительский метод, который выводит список
													// MODx.combo.OptList.superclass.onTriggerClickOps.call(this);
													MODx.combo.ComboBox.superclass.onTriggerClickOps.call(this);
												}
											}
										});
										function changeRes(event,btn) {
											link_input.field.value = btn.id
										}
										MODx.ux.CKEditor.FindRes.superclass.constructor.call(this,config);
									};
									Ext.extend(MODx.ux.CKEditor.FindRes, MODx.combo.ComboBox);
									Ext.reg('doodle-combo-res', MODx.ux.CKEditor.FindRes);

									link_div = MODx.load({ xtype: "doodle-combo-res"});
									link_div.show();
								}
							);
						}

					},
					{
						type: "hbox",
						id: "btn_line",
						widths: ['75%', '25%'],
						children: [
						{
							type: "button",
							id: "showres",
							label: g.modx_res,
							onClick: function(){
								let _protocol = document.getElementById(link_input.select);
								_protocol.value = '[[~'
								let changeEvent = new Event('change');
							    _protocol.dispatchEvent(changeEvent);
							}
						},
						{
							type: "button",
							id: "browse",
							hidden: "true",
							filebrowser: "info:url",
							label: g.browseServer
						}
						],
					},
					]
				}, {
					type: "vbox",
					id: "anchorOptions",
					width: 260,
					align: "center",
					padding: 0,
					children: [{
						type: "fieldset",
						id: "selectAnchorText",
						label: b.selectAnchor,
						setup: function() {
							d = n.getEditorAnchors(c);
							this.getElement()[d && d.length ? "show" : "hide"]()
						},
						children: [{
							type: "hbox",
							id: "selectAnchor",
							children: [{
								type: "select",
								id: "anchorName",
								"default": "",
								label: b.anchorName,
								style: "width: 100%;",
								items: [
									[""]
								],
								setup: function(a) {
									this.clear();
									this.add("");
									if (d)
										for (var b = 0; b < d.length; b++) d[b].name && this.add(d[b].name);
									a.anchor && this.setValue(a.anchor.name);
									(a = this.getDialog().getContentElement("info", "linkType")) && "email" == a.getValue() && this.focus()
								},
								commit: function(a) {
									a.anchor ||
										(a.anchor = {});
									a.anchor.name = this.getValue()
								}
							}, {
								type: "select",
								id: "anchorId",
								"default": "",
								label: b.anchorId,
								style: "width: 100%;",
								items: [
									[""]
								],
								setup: function(a) {
									this.clear();
									this.add("");
									if (d)
										for (var b = 0; b < d.length; b++) d[b].id && this.add(d[b].id);
									a.anchor && this.setValue(a.anchor.id)
								},
								commit: function(a) {
									a.anchor || (a.anchor = {});
									a.anchor.id = this.getValue()
								}
							}],
							setup: function() {
								this.getElement()[d && d.length ? "show" : "hide"]()
							}
						}]
					}, {
						type: "html",
						id: "noAnchors",
						style: "text-align: center;",
						html: '\x3cdiv role\x3d"note" tabIndex\x3d"-1"\x3e' +
							CKEDITOR.tools.htmlEncode(b.noAnchors) + "\x3c/div\x3e",
						// focus: !0,
						setup: function() {
							this.getElement()[d && d.length ? "hide" : "show"]()
						}
					}],
					setup: function() {
						this.getDialog().getContentElement("info", "linkType") || this.getElement().hide()
					}
				}, {
					type: "vbox",
					id: "emailOptions",
					padding: 1,
					children: [{
						type: "text",
						id: "emailAddress",
						label: b.emailAddress,
						required: !0,
						validate: function() {
							var a = this.getDialog();
							return a.getContentElement("info", "linkType") && "email" == a.getValueOf("info", "linkType") ? CKEDITOR.dialog.validate.notEmpty(b.noEmail).apply(this) :
								!0
						},
						setup: function(a) {
							a.email && this.setValue(a.email.address);
							(a = this.getDialog().getContentElement("info", "linkType")) && "email" == a.getValue() && this.select()
						},
						commit: function(a) {
							a.email || (a.email = {});
							a.email.address = this.getValue()
						}
					}, {
						type: "text",
						id: "emailSubject",
						label: b.emailSubject,
						setup: function(a) {
							a.email && this.setValue(a.email.subject)
						},
						commit: function(a) {
							a.email || (a.email = {});
							a.email.subject = this.getValue()
						}
					}, {
						type: "textarea",
						id: "emailBody",
						label: b.emailBody,
						rows: 3,
						"default": "",
						setup: function(a) {
							a.email &&
								this.setValue(a.email.body)
						},
						commit: function(a) {
							a.email || (a.email = {});
							a.email.body = this.getValue()
						}
					}],
					setup: function() {
						this.getDialog().getContentElement("info", "linkType") || this.getElement().hide()
					}
				}]
			}, {
				id: "target",
				requiredContent: "a[target]",
				label: b.target,
				title: b.target,
				elements: [{
					type: "hbox",
					widths: ["50%", "50%"],
					children: [{
						type: "select",
						id: "linkTargetType",
						label: g.target,
						"default": "notSet",
						style: "width : 100%;",
						items: [
							[g.notSet, "notSet"],
							[b.targetFrame, "frame"],
							[b.targetPopup, "popup"],
							[g.targetNew,
								"_blank"
							],
							[g.targetTop, "_top"],
							[g.targetSelf, "_self"],
							[g.targetParent, "_parent"]
						],
						onChange: r,
						setup: function(a) {
							a.target && this.setValue(a.target.type || "notSet");
							r.call(this)
						},
						commit: function(a) {
							a.target || (a.target = {});
							a.target.type = this.getValue()
						}
					}, {
						type: "text",
						id: "linkTargetName",
						label: b.targetFrameName,
						"default": "",
						setup: function(a) {
							a.target && this.setValue(a.target.name)
						},
						commit: function(a) {
							a.target || (a.target = {});
							a.target.name = this.getValue().replace(/([^\x00-\x7F]|\s)/gi, "")
						}
					}]
				}, {
					type: "vbox",
					width: "100%",
					align: "center",
					padding: 2,
					id: "popupFeatures",
					children: [{
						type: "fieldset",
						label: b.popupFeatures,
						children: [{
							type: "hbox",
							children: [{
								type: "checkbox",
								id: "resizable",
								label: b.popupResizable,
								setup: l,
								commit: k
							}, {
								type: "checkbox",
								id: "status",
								label: b.popupStatusBar,
								setup: l,
								commit: k
							}]
						}, {
							type: "hbox",
							children: [{
								type: "checkbox",
								id: "location",
								label: b.popupLocationBar,
								setup: l,
								commit: k
							}, {
								type: "checkbox",
								id: "toolbar",
								label: b.popupToolbar,
								setup: l,
								commit: k
							}]
						}, {
							type: "hbox",
							children: [{
								type: "checkbox",
								id: "menubar",
								label: b.popupMenuBar,
								setup: l,
								commit: k
							}, {
								type: "checkbox",
								id: "fullscreen",
								label: b.popupFullScreen,
								setup: l,
								commit: k
							}]
						}, {
							type: "hbox",
							children: [{
								type: "checkbox",
								id: "scrollbars",
								label: b.popupScrollBars,
								setup: l,
								commit: k
							}, {
								type: "checkbox",
								id: "dependent",
								label: b.popupDependent,
								setup: l,
								commit: k
							}]
						}, {
							type: "hbox",
							children: [{
								type: "text",
								widths: ["50%", "50%"],
								labelLayout: "horizontal",
								label: g.width,
								id: "width",
								setup: l,
								commit: k
							}, {
								type: "text",
								labelLayout: "horizontal",
								widths: ["50%", "50%"],
								label: b.popupLeft,
								id: "left",
								setup: l,
								commit: k
							}]
						}, {
							type: "hbox",
							children: [{
								type: "text",
								labelLayout: "horizontal",
								widths: ["50%", "50%"],
								label: g.height,
								id: "height",
								setup: l,
								commit: k
							}, {
								type: "text",
								labelLayout: "horizontal",
								label: b.popupTop,
								widths: ["50%", "50%"],
								id: "top",
								setup: l,
								commit: k
							}]
						}]
					}]
				}]
			}, {
				id: "upload",
				label: b.upload,
				title: b.upload,
				hidden: !0,
				filebrowser: "uploadButton",
				elements: [{
					type: "file",
					id: "upload",
					label: g.upload,
					style: "height:40px",
					size: 29
				}, {
					type: "fileButton",
					id: "uploadButton",
					label: g.uploadSubmit,
					filebrowser: "info:url",
					"for": ["upload",
						"upload"
					]
				}]
			}, {
				id: "advanced",
				label: b.advanced,
				title: b.advanced,
				elements: [{
					type: "vbox",
					padding: 1,
					children: [{
						type: "hbox",
						widths: ["45%", "35%", "20%"],
						children: [{
							type: "text",
							id: "advId",
							requiredContent: "a[id]",
							label: b.id,
							setup: e,
							commit: m
						}, {
							type: "select",
							id: "advLangDir",
							requiredContent: "a[dir]",
							label: b.langDir,
							"default": "",
							style: "width:110px",
							items: [
								[g.notSet, ""],
								[b.langDirLTR, "ltr"],
								[b.langDirRTL, "rtl"]
							],
							setup: e,
							commit: m
						}, {
							type: "text",
							id: "advAccessKey",
							requiredContent: "a[accesskey]",
							width: "80px",
							label: b.acccessKey,
							maxLength: 1,
							setup: e,
							commit: m
						}]
					}, {
						type: "hbox",
						widths: ["45%", "35%", "20%"],
						children: [{
							type: "text",
							label: b.name,
							id: "advName",
							requiredContent: "a[name]",
							setup: e,
							commit: m
						}, {
							type: "text",
							label: b.langCode,
							id: "advLangCode",
							requiredContent: "a[lang]",
							width: "110px",
							"default": "",
							setup: e,
							commit: m
						}, {
							type: "text",
							label: b.tabIndex,
							id: "advTabIndex",
							requiredContent: "a[tabindex]",
							width: "80px",
							maxLength: 5,
							setup: e,
							commit: m
						}]
					}]
				}, {
					type: "vbox",
					padding: 1,
					children: [{
						type: "hbox",
						widths: ["45%", "55%"],
						children: [{
							type: "text",
							label: b.advisoryTitle,
							requiredContent: "a[title]",
							"default": "",
							id: "advTitle",
							setup: e,
							commit: m
						}, {
							type: "text",
							label: b.advisoryContentType,
							requiredContent: "a[type]",
							"default": "",
							id: "advContentType",
							setup: e,
							commit: m
						}]
					}, {
						type: "hbox",
						widths: ["45%", "55%"],
						children: [{
							type: "text",
							label: b.cssClasses,
							requiredContent: "a(cke-xyz)",
							"default": "",
							id: "advCSSClasses",
							setup: e,
							commit: m
						}, {
							type: "text",
							label: b.charset,
							requiredContent: "a[charset]",
							"default": "",
							id: "advCharset",
							setup: e,
							commit: m
						}]
					}, {
						type: "hbox",
						widths: ["45%", "55%"],
						children: [{
							type: "text",
							label: b.rel,
							requiredContent: "a[rel]",
							"default": "",
							id: "advRel",
							setup: e,
							commit: m
						}, {
							type: "text",
							label: b.styles,
							requiredContent: "a{cke-xyz}",
							"default": "",
							id: "advStyles",
							validate: CKEDITOR.dialog.validate.inlineStyle(c.lang.common.invalidInlineStyle),
							setup: e,
							commit: m
						}]
					}, {
						type: "hbox",
						widths: ["45%", "55%"],
						children: [{
							type: "checkbox",
							id: "download",
							requiredContent: "a[download]",
							label: b.download,
							setup: function(a) {
								void 0 !== a.download && this.setValue("checked", "checked")
							},
							commit: function(a) {
								this.getValue() && (a.download =
									this.getValue())
							}
						}]
					}]
				}]
			}],
			onShow: function() {
				var a = this.getParentEditor(),
					b = a.getSelection(),
					c = this.getContentElement("info", "linkDisplayText").getElement().getParent().getParent(),
					f = n.getSelectedLink(a, !0),
					h = f[0] || null;
				h && h.hasAttribute("href") && (b.getSelectedElement() || b.isInTable() || b.selectElement(h));
				b = n.parseLinkAttributes(a, h);
				1 >= f.length && n.showDisplayTextForElement(h, a) ? c.show() : c.hide();
				this._.selectedElements = f;
				this.setupContent(b)
			},
			onOk: function() {
				var a = {};
				this.commitContent(a);
				if (this._.selectedElements.length) {
					var b =
						this._.selectedElements,
						g = n.getLinkAttributes(c, a),
						f = [],
						h, d, l, e, k;
					for (k = 0; k < b.length; k++) {
						h = b[k];
						d = h.data("cke-saved-href");
						l = h.getHtml();
						// добавляем закрывающие ]]
						if (a.url.protocol == '[[~') {
							g.set.href = g.set.href +']]';
							g.set['data-cke-saved-href'] = g.set['data-cke-saved-href'] +']]';
						}
						h.setAttributes(g.set);
						h.removeAttributes(g.removed);
						if (a.linkText && q != a.linkText) e = a.linkText;
						else if (d == l || "email" == a.type && -1 != l.indexOf("@")) e = "email" == a.type ? a.email.address : g.set["data-cke-saved-href"];
						e && h.setText(e);
						f.push(t(c, h))
					}
					c.getSelection().selectRanges(f);
					delete this._.selectedElements
				} else {
					b = n.getLinkAttributes(c, a);
					// закрываем ]]
					if (a.url.protocol == '[[~') {
						b.set.href = b.set.href +']]';
						b.set['data-cke-saved-href'] = b.set['data-cke-saved-href'] +']]';
					}
					g = c.getSelection().getRanges();
					f = new CKEDITOR.style({
						element: "a",
						attributes: b.set
					});
					h = [];
					f.type = CKEDITOR.STYLE_INLINE;
					for (l = 0; l < g.length; l++) {
						d = g[l];
						d.collapsed ? (e = new CKEDITOR.dom.text(a.linkText || ("email" == a.type ? a.email.address : b.set["data-cke-saved-href"]), c.document), d.insertNode(e), d.selectNodeContents(e)) : q !== a.linkText && (e = new CKEDITOR.dom.text(a.linkText, c.document), d.shrink(CKEDITOR.SHRINK_TEXT), c.editable().extractHtmlFromRange(d), d.insertNode(e));
						e = d._find("a");
						for (k = 0; k < e.length; k++) e[k].remove(!0);
						f.applyToRange(d,
							c);
						h.push(d)
					}
					c.getSelection().selectRanges(h)
				}
			},
			onLoad: function() {
				c.config.linkShowAdvancedTab || this.hidePage("advanced");
				c.config.linkShowTargetTab || this.hidePage("target")
			},
			onFocus: function() {
				var a = this.getContentElement("info", "linkType");
				a && "url" == a.getValue() && (a = this.getContentElement("info", "url"), a.select())
			}
		}
	})
})();




function lazyVal(_val) {
	link_div.setValue(_val)
	let fres = document.getElementById('input-res_id');
	fres.focus()
}
