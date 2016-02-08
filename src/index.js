"use strict";
import sf from 'sf';//resolved by webpack's "externals"
import SfQuill from './sf-quill';

require("style!css?minimize!quill/dist/quill.snow.css");

sf.instancesController.registerInstanceType(SfQuill,"js-sf-quill");
module.exports = SfQuill;   // ES6 default export will not expose us as global