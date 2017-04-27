import {
	compMgr
} from './compMgr';
import {extend} from 'tinper-sparrow/src/extend';
import {
	on,
	off,
	trigger,
	stopEvent
} from 'tinper-sparrow/src/event';
import {
    App,
    createApp
} from './createApp';

window.App = App;


//公开接口、属性对外暴露
let api = {
	createApp:createApp,
	compMgr: compMgr
};
if(document.readyState && document.readyState === 'complete') {
	compMgr.updateComp();
} else {
	on(window, 'load', function() {
		compMgr.updateComp();
	});
}
// export api;
//export default api;
extend(api,window.u || {});

window.u = api;
window.iweb = {}
window.iweb.browser = window.u;
export {api as u};
