'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createApp = exports.App = undefined;

var _compMgr = require('./compMgr');

var _util = require('tinper-sparrow/src/util');

var _hotKeys = require('tinper-sparrow/src/util/hotKeys');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Module : compox createApp
                                                                                                                                                           * Author : huyue(huyueb@yonyou.com)
                                                                                                                                                           * Date   : 2017-01-17 10:13:10
                                                                                                                                                           */


var App = function App() {
    _classCallCheck(this, App);

    // init
    this.init = init;
    this.dataTables = {};
};

var init = function init(viewModel, element, doApplyBindings) {
    var self = this;
    element = element || document.body;
    if (!(0, _util.isArray)(element)) {
        element = [element];
    }
    this.elements = element;
    (0, _util.each)(this.elements, function (i, element) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        if (element) {
            element.querySelectorAll('[u-meta]').forEach(function (ele) {
                var options = JSON.parse(ele.getAttribute('u-meta'));
                options['type'] = options['type'] || 'string';
                if (options && options['type']) {
                    if (self.adjustFunc) self.adjustFunc.call(self, options);
                    var comp = _compMgr.compMgr.createDataAdapter({ el: ele, options: options, model: viewModel, app: self });
                    ele['u-meta'] = comp;
                }
            });
        }

        if (_hotKeys.hotkeys) _hotKeys.hotkeys.scan(element);
        if (typeof doApplyBindings == 'undefined' || doApplyBindings == true) ko.applyBindings(viewModel, element);
        _compMgr.compMgr.updateComp(element);
    });

    _getDataTables(this, viewModel);
};

var _getDataTables = function _getDataTables(app, viewModel) {
    for (var key in viewModel) {
        if (viewModel[key] && viewModel[key] instanceof u.DataTable) {
            viewModel[key].id = key;
            viewModel[key].parent = viewModel;
            app.addDataTable(viewModel[key]);
        }
    }
};

var createApp = function createApp() {
    var app = new App();
    if (arguments.length > 0) {
        var arg = arguments[0];
        app.init(arg.model, arg.el);
    }
    return app;
};
exports.App = App;
exports.createApp = createApp;