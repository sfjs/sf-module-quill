"use strict";

import sf from 'sf';//resolved by webpack's "externals"
import Quill from 'quill';

var SfQuill = function (sf, node, options) {
    this._construct(sf, node, options);
};

/**
 * @lends sf.Form.prototype
 */
SfQuill.prototype = Object.create(sf.core.BaseDOMConstructor.prototype);

/**
 * Name to register
 * @type {string}
 */
SfQuill.prototype.name = "quill";

SfQuill.prototype._construct = function (sf, node, options) {
    var that = this;
    this.init(sf, node, options);//call parent

    this.toolbarEl = this.node.querySelector('.quill-toolbar');
    this.editorEl = this.node.querySelector('.quill-editor');

    this.editor = new Quill(this.editorEl, {
        modules: {
            'toolbar': { container: this.toolbarEl },
            'link-tooltip': true
        },
        theme: 'snow'
    });

    if (this.options.value) this.editor.setHTML(this.options.value);

    this.editor.on('text-change', function() {
       that.save();
    });
    that.save();
};

/**
 * @override
 * @inheritDoc
 * @enum {string}
 */
SfQuill.prototype.optionsToGrab  = {
    name: {
        value: "html",
        domAttr: "data-name"
    },
    value: {
        value: "",
        domAttr: "data-value"
    }
};

SfQuill.prototype.save = function () {
    if (!this.input) {
        this.input = document.createElement("input");
        this.input.type = "hidden";
        this.input.name = this.options.name;
        this.node.appendChild(this.input);
    }
    this.input.value = this.editor.getHTML();
};

SfQuill.prototype.die = function () {

};

export { SfQuill as default };