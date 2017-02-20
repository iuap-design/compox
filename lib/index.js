'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.u = undefined;

var _compMgr = require('./compMgr');

var _extend = require('tinper-sparrow/src/extend');

var _event = require('tinper-sparrow/src/event');

var _createApp = require('./createApp');

window.App = _createApp.App;

//公开接口、属性对外暴露
var api = {
	createApp: _createApp.createApp,
	compMgr: _compMgr.compMgr
};
if (document.readyState && document.readyState === 'complete') {
	_compMgr.compMgr.updateComp();
} else {
	(0, _event.on)(window, 'load', function () {
		_compMgr.compMgr.updateComp();
	});
}
// export api;
//export default api;
(0, _extend.extend)(api, window.u || {});

window.u = api;
window.iweb = {};
window.iweb.browser = window.u;
exports.u = api;