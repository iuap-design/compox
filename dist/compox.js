/**
 * compox v3.2.0
 * 
 * author : yonyou FED
 * homepage : https://github.com/iuap-design/compox#readme
 * bugs : https://github.com/iuap-design/compox/issues
 */

(function (exports) {
'use strict';

/**
 * Module : Sparrow touch event
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-28 14:41:17
 */

var on$1 = function on(element, eventName, child, listener) {
	if (!element) return;
	if (arguments.length < 4) {
		listener = child;
		child = undefined;
	} else {
		var childlistener = function childlistener(e) {
			if (!e) {
				return;
			}
			var tmpchildren = element.querySelectorAll(child);
			tmpchildren.forEach(function (node) {
				if (node == e.target) {
					listener.call(e.target, e);
				}
			});
		};
	}
	//capture = capture || false;

	if (!element["uEvent"]) {
		//在dom上添加记录区
		element["uEvent"] = {};
	}
	//判断是否元素上是否用通过on方法填加进去的事件
	if (!element["uEvent"][eventName]) {
		element["uEvent"][eventName] = [child ? childlistener : listener];
		if (u.event && u.event[eventName] && u.event[eventName].setup) {
			u.event[eventName].setup.call(element);
		}
		element["uEvent"][eventName + 'fn'] = function (e) {
			//火狐下有问题修改判断
			if (!e) e = typeof event != 'undefined' && event ? event : window.event;
			element["uEvent"][eventName].forEach(function (fn) {
				try {
					e.target = e.target || e.srcElement; //兼容IE8
				} catch (ee) {}
				if (fn) fn.call(element, e);
			});
		};
		if (element.addEventListener) {
			// 用于支持DOM的浏览器
			element.addEventListener(eventName, element["uEvent"][eventName + 'fn']);
		} else if (element.attachEvent) {
			// 用于IE浏览器
			element.attachEvent("on" + eventName, element["uEvent"][eventName + 'fn']);
		} else {
			// 用于其它浏览器
			element["on" + eventName] = element["uEvent"][eventName + 'fn'];
		}
	} else {
		//如果有就直接往元素的记录区添加事件
		var lis = child ? childlistener : listener;
		var hasLis = false;
		element["uEvent"][eventName].forEach(function (fn) {
			if (fn == lis) {
				hasLis = true;
			}
		});
		if (!hasLis) {
			element["uEvent"][eventName].push(child ? childlistener : listener);
		}
	}
};

/**
 * Module : Sparrow dom
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-16 13:59:17
 */
/**
 * 元素上是否存在该类
 * @param {Object} element
 * @param {Object} value
 */
var hasClass = function hasClass(element, value) {
	if (!element) return false;
	if (element.nodeName && (element.nodeName === '#text' || element.nodeName === '#comment')) return false;
	if (typeof element.classList === 'undefined') {
		if (u._hasClass) {
			return u._hasClass(element, value);
		} else {
			return $(element).hasClass(value);
		}

		return false;
	} else {
		return element.classList.contains(value);
	}
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/**
 * Module : Sparrow util tools
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-27 21:46:50
 */

/**
 * 创建一个带壳的对象,防止外部修改
 * @param {Object} proto
 */
var isArray = Array.isArray || function (val) {
	return Object.prototype.toString.call(val) === '[object Array]';
};
var inArray = function inArray(node, arr) {
	if (!arr instanceof Array) {
		throw "arguments is not Array";
	}
	for (var i = 0, k = arr.length; i < k; i++) {
		if (node == arr[i]) {
			return true;
		}
	}
	return false;
};
var each = function each(obj, callback) {
	if (obj.forEach) {
		obj.forEach(function (v, k) {
			callback(k, v);
		});
	} else if (obj instanceof Object) {
		for (var k in obj) {
			callback(k, obj[k]);
		}
	} else {
		return;
	}
};
try {
	NodeList.prototype.forEach = Array.prototype.forEach;
} catch (e) {}

/**
 * 获得字符串的字节长度
 */
String.prototype.lengthb = function () {
	//	var str = this.replace(/[^\x800-\x10000]/g, "***");
	var str = this.replace(/[^\x00-\xff]/g, "**");
	return str.length;
};

/**
 * 将AFindText全部替换为ARepText
 */
String.prototype.replaceAll = function (AFindText, ARepText) {
	//自定义String对象的方法
	var raRegExp = new RegExp(AFindText, "g");
	return this.replace(raRegExp, ARepText);
};

/**
 * Module : compox compMgr
 * Author : huyue(huyueb@yonyou.com)
 * Date	  : 2016-07-28 18:41:06
 * Update : 2017-01-18 09:26:00
 */

function _findRegisteredClass(name, optReplace) {
    for (var i = 0; i < CompMgr.registeredControls.length; i++) {
        if (CompMgr.registeredControls[i].className === name) {
            if (typeof optReplace !== 'undefined') {
                CompMgr.registeredControls[i] = optReplace;
            }
            return CompMgr.registeredControls[i];
        }
    }
    return false;
}

function _getUpgradedListOfElement(element) {
    var dataUpgraded = element.getAttribute('data-upgraded');
    // Use `['']` as default value to conform the `,name,name...` style.
    return dataUpgraded === null ? [''] : dataUpgraded.split(',');
}

function _isElementUpgraded(element, jsClass) {
    var upgradedList = _getUpgradedListOfElement(element);
    return upgradedList.indexOf(jsClass) != -1;
}

function _upgradeElement(element, optJsClass) {
    if (!((typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object' && element instanceof Element)) {
        throw new Error('Invalid argument provided to upgrade MDL element.');
    }
    var upgradedList = _getUpgradedListOfElement(element);
    var classesToUpgrade = [];
    if (!optJsClass) {
        var className = element.className;
        for (var i = 0; i < CompMgr.registeredControls.length; i++) {
            var component = CompMgr.registeredControls[i];
            if (className.indexOf(component.cssClass) > -1 && classesToUpgrade.indexOf(component) === -1 && !_isElementUpgraded(element, component.className)) {
                classesToUpgrade.push(component);
            }
        }
    } else if (!_isElementUpgraded(element, optJsClass)) {
        classesToUpgrade.push(_findRegisteredClass(optJsClass));
    }

    // Upgrade the element for each classes.
    for (var i = 0, n = classesToUpgrade.length, registeredClass; i < n; i++) {
        registeredClass = classesToUpgrade[i];
        if (registeredClass) {
            if (element[registeredClass.className]) {
                continue;
            }
            // Mark element as upgraded.
            upgradedList.push(registeredClass.className);
            element.setAttribute('data-upgraded', upgradedList.join(','));
            var instance = new registeredClass.classConstructor(element);
            CompMgr.createdControls.push(instance);
            // Call any callbacks the user has registered with this component type.
            for (var j = 0, m = registeredClass.callbacks.length; j < m; j++) {
                registeredClass.callbacks[j](element);
            }
            element[registeredClass.className] = instance;
        } else {
            throw new Error('Unable to find a registered component for the given class.');
        }
    }
}

function _upgradeDomInternal(optJsClass, optCssClass, ele) {
    if (typeof optJsClass === 'undefined' && typeof optCssClass === 'undefined') {
        for (var i = 0; i < CompMgr.registeredControls.length; i++) {
            _upgradeDomInternal(CompMgr.registeredControls[i].className, registeredControls[i].cssClass, ele);
        }
    } else {
        var jsClass = optJsClass;
        if (!optCssClass) {
            var registeredClass = _findRegisteredClass(jsClass);
            if (registeredClass) {
                optCssClass = registeredClass.cssClass;
            }
        }
        var elements;
        if (ele) {
            elements = hasClass(ele, optCssClass) ? [ele] : ele.querySelectorAll('.' + optCssClass);
        } else {
            elements = document.querySelectorAll('.' + optCssClass);
        }
        for (var n = 0; n < elements.length; n++) {
            _upgradeElement(elements[n], jsClass);
        }
    }
}

var CompMgr = {
    plugs: {},
    //用来存储控件的名称对应列表
    dataAdapters: {},
    /** 注册的控件*/
    registeredControls: [],
    createdControls: [],
    /**
     *
     * @param options  {el:'#content', model:{}}
     */
    apply: function apply(options) {
        if (options) {
            var _el = options.el || document.body;
            var model = options.model;
        }
        if (typeof _el == 'string') {
            _el = document.body.querySelector(_el);
        }
        if (_el == null || (typeof _el === 'undefined' ? 'undefined' : _typeof(_el)) != 'object') _el = document.body;
        var comps = _el.querySelectorAll('[u-meta]');
        comps.forEach(function (element) {
            if (element['comp']) return;
            var options = JSON.parse(element.getAttribute('u-meta'));
            if (options && options['type']) {
                //var comp = CompMgr._createComp({el:element,options:options,model:model});
                var comp = CompMgr.createDataAdapter({
                    el: element,
                    options: options,
                    model: model
                });
                if (comp) {
                    element['adpt'] = comp;
                    element['u-meta'] = comp;
                }
            }
        });
    },
    addPlug: function addPlug(config) {
        var plug = config['plug'],
            name = config['name'];
        this.plugs || (this.plugs = {});
        if (this.plugs[name]) {
            throw new Error('plug has exist:' + name);
        }
        plug.compType = name;
        this.plugs[name] = plug;
    },
    addDataAdapter: function addDataAdapter(config) {
        var adapter = config['adapter'],
            name = config['name'];
        //dataType = config['dataType'] || ''
        //var key = dataType ? name + '.' + dataType : name;
        this.dataAdapters || (dataAdapters = {});
        if (this.dataAdapters[name]) {
            throw new Error('dataAdapter has exist:' + name);
        }
        this.dataAdapters[name] = adapter;
    },
    getDataAdapter: function getDataAdapter(name) {
        if (!name) return;
        this.dataAdapters || (dataAdapters = {});
        //var key = dataType ? name + '.' + dataType : name;
        return this.dataAdapters[name];
    },
    /**
     * 创建dataAdapter,通过识别控件的type，来找到它对应的adapter
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    createDataAdapter: function createDataAdapter(options) {
        var opt = options['options'];
        var type = opt['type'],
            id = opt['id'];
        var adpt = this.dataAdapters[type];
        if (!adpt) return null;
        var comp = new adpt(options);
        comp.type = type;
        comp.id = id;
        return comp;
    },
    _createComp: function _createComp(options) {
        var opt = options['options'];
        var type = opt['type'];
        var plug = this.plugs[type];
        if (!plug) return null;
        var comp = new plug(options);
        comp.type = type;
        return comp;
    },
    /**
     * 注册UI控件
     */
    regComp: function regComp(config) {
        var newConfig = {
            classConstructor: config.comp,
            className: config.compAsString || config['compAsString'],
            cssClass: config.css || config['css'],
            callbacks: [],
            dependencies: config.dependencies || []
        };
        config.comp.prototype.compType = config.compAsString;
        for (var i = 0; i < this.registeredControls.length; i++) {
            var item = this.registeredControls[i];
            //registeredControls.forEach(function(item) {
            if (item.cssClass === newConfig.cssClass) {
                throw new Error('The provided cssClass has already been registered: ' + item.cssClass);
            }
            if (item.className === newConfig.className) {
                throw new Error('The provided className has already been registered');
            }
        }
        this.registeredControls.push(newConfig);
    },
    updateComp: function updateComp(ele) {
        this._reorderComps();
        for (var n = 0; n < this.registeredControls.length; n++) {
            _upgradeDomInternal(this.registeredControls[n].className, null, ele);
        }
    },
    // 后续遍历registeredControls，重新排列
    _reorderComps: function _reorderComps() {
        var tmpArray = [];
        var dictory = {};

        for (var n = 0; n < this.registeredControls.length; n++) {
            dictory[this.registeredControls[n].className] = this.registeredControls[n];
        }
        for (var n = 0; n < this.registeredControls.length; n++) {
            traverse(this.registeredControls[n]);
        }

        this.registeredControls = tmpArray;

        function traverse(control) {
            if (inArray(control, tmpArray)) return;
            if (control.dependencies.length > 0) {
                for (var i = 0, len = control.dependencies.length; i < len; i++) {
                    var childControl = dictory[control.dependencies[i]];
                    traverse(childControl);
                }
            }
            tmpArray.push(control);
        }
    }
};

var compMgr = CompMgr;

/**
 * Module : Sparrow extend enum
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-27 21:46:50
 */

var enumerables = true;
var enumerablesTest = {
	toString: 1
};
for (var i in enumerablesTest) {
	enumerables = null;
}
if (enumerables) {
	enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'constructor'];
}

/**
 * Module : Sparrow extend
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-27 21:46:50
 */

/**
 * 复制对象属性
 *
 * @param {Object}  目标对象
 * @param {config} 源对象
 */
var extend = function extend(object, config) {
	var args = arguments,
	    options;
	if (args.length > 1) {
		for (var len = 1; len < args.length; len++) {
			options = args[len];
			if (object && options && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
				var i, j, k;
				for (i in options) {
					object[i] = options[i];
				}
				if (enumerables) {
					for (j = enumerables.length; j--;) {
						k = enumerables[j];
						if (options.hasOwnProperty && options.hasOwnProperty(k)) {
							object[k] = options[k];
						}
					}
				}
			}
		}
	}
	return object;
};

if (!Object.assign) {
	Object.assign = extend;
}

/**
 * Module : Sparrow class
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-28 08:45:39
 */

var Class = function Class(o) {
	if (!(this instanceof Class) && isFunction(o)) {
		return classify(o);
	}
};

// Create a new Class.
//
//  var SuperPig = Class.create({
//    Extends: Animal,
//    Implements: Flyable,
//    initialize: function() {
//      SuperPig.superclass.initialize.apply(this, arguments)
//    },
//    Statics: {
//      COLOR: 'red'
//    }
// })
//
Class.create = function (parent, properties) {
	if (!isFunction(parent)) {
		properties = parent;
		parent = null;
	}

	properties || (properties = {});
	parent || (parent = properties.Extends || Class);
	properties.Extends = parent;

	// The created class constructor
	function SubClass() {
		var ret;
		// Call the parent constructor.
		parent.apply(this, arguments);

		// Only call initialize in self constructor.
		if (this.constructor === SubClass && this.initialize) {
			ret = this.initialize.apply(this, arguments);
		}
		return ret ? ret : this;
	}

	// Inherit class (static) properties from parent.
	if (parent !== Class) {
		mix(SubClass, parent, parent.StaticsWhiteList);
	}

	// Add instance properties to the subclass.
	implement.call(SubClass, properties);

	// Make subclass extendable.
	return classify(SubClass);
};

function implement(properties) {
	var key, value;

	for (key in properties) {
		value = properties[key];

		if (Class.Mutators.hasOwnProperty(key)) {
			Class.Mutators[key].call(this, value);
		} else {
			this.prototype[key] = value;
		}
	}
}

// Create a sub Class based on `Class`.
Class.extend = function (properties) {
	properties || (properties = {});
	properties.Extends = this;

	return Class.create(properties);
};

function classify(cls) {
	cls.extend = Class.extend;
	cls.implement = implement;
	return cls;
}

// Mutators define special properties.
Class.Mutators = {

	'Extends': function Extends(parent) {
		var existed = this.prototype;
		var proto = createProto(parent.prototype);

		// Keep existed properties.
		mix(proto, existed);

		// Enforce the constructor to be what we expect.
		proto.constructor = this;

		// Set the prototype chain to inherit from `parent`.
		this.prototype = proto;

		// Set a convenience property in case the parent's prototype is
		// needed later.
		this.superclass = parent.prototype;
	},

	'Implements': function Implements(items) {
		isArray$1(items) || (items = [items]);
		var proto = this.prototype,
		    item;

		while (item = items.shift()) {
			mix(proto, item.prototype || item);
		}
	},

	'Statics': function Statics(staticProperties) {
		mix(this, staticProperties);
	}
};

// Shared empty constructor function to aid in prototype-chain creation.
function Ctor() {}

// See: http://jsperf.com/object-create-vs-new-ctor
var createProto = Object.__proto__ ? function (proto) {
	return {
		__proto__: proto
	};
} : function (proto) {
	Ctor.prototype = proto;
	return new Ctor();
};

// Helpers
// ------------

function mix(r, s, wl) {
	// Copy "all" properties including inherited ones.
	for (var p in s) {
		if (s.hasOwnProperty(p)) {
			if (wl && indexOf(wl, p) === -1) continue;

			// 在 iPhone 1 代等设备的 Safari 中，prototype 也会被枚举出来，需排除
			if (p !== 'prototype') {
				r[p] = s[p];
			}
		}
	}
}

var toString$1 = Object.prototype.toString;

var isArray$1 = Array.isArray || function (val) {
	return toString$1.call(val) === '[object Array]';
};

var isFunction = function isFunction(val) {
	return toString$1.call(val) === '[object Function]';
};

var indexOf = function indexOf(arr, item) {
	if (Array.prototype.indexOf && arr.indexOf) {
		return arr.indexOf(item);
	} else {
		for (var i = 0, len = arr.length; i < len; i++) {
			if (arr[i] === item) {
				return i;
			}
		}
		return -1;
	}
};

/**
 * Module : Sparrow hotKeys
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-28 20:25:39
 */

var hotkeys = {};
hotkeys.special_keys = {
    27: 'esc', 9: 'tab', 32: 'space', 13: 'enter', 8: 'backspace', 145: 'scroll', 20: 'capslock',
    144: 'numlock', 19: 'pause', 45: 'insert', 36: 'home', 46: 'del', 35: 'end', 33: 'pageup',
    34: 'pagedown', 37: 'left', 38: 'up', 39: 'right', 40: 'down', 112: 'f1', 113: 'f2', 114: 'f3',
    115: 'f4', 116: 'f5', 117: 'f6', 118: 'f7', 119: 'f8', 120: 'f9', 121: 'f10', 122: 'f11', 123: 'f12'
};

hotkeys.shift_nums = {
    "`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",
    "8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ":", "'": "\"", ",": "<",
    ".": ">", "/": "?", "\\": "|"
};

hotkeys.add = function (combi, options, callback) {
    if (isFunction(options)) {
        callback = options;
        options = {};
    }
    var opt = {},
        defaults = { type: 'keydown', propagate: false, disableInInput: false, target: document.body, checkParent: true },
        that = this;
    opt = extend(opt, defaults, options || {});
    combi = combi.toLowerCase();

    // inspect if keystroke matches
    var inspector = function inspector(event) {
        //event = $.event.fix(event); // jQuery event normalization.
        var element = this; //event.target;
        // @ TextNode -> nodeType == 3
        element = element.nodeType == 3 ? element.parentNode : element;

        if (opt['disableInInput']) {
            // Disable shortcut keys in Input, Textarea fields
            var target = element; //$(element);
            if (target.tagName == "INPUT" || target.tagName == "TEXTAREA") {
                return;
            }
        }
        var code = event.which,
            type = event.type,
            character = String.fromCharCode(code).toLowerCase(),
            special = that.special_keys[code],
            shift = event.shiftKey,
            ctrl = event.ctrlKey,
            alt = event.altKey,
            propagate = true,
            // default behaivour
        mapPoint = null;

        // in opera + safari, the event.target is unpredictable.
        // for example: 'keydown' might be associated with HtmlBodyElement
        // or the element where you last clicked with your mouse.
        if (opt.checkParent) {
            //              while (!that.all[element] && element.parentNode){
            while (!element['hotkeys'] && element.parentNode) {
                element = element.parentNode;
            }
        }

        //          var cbMap = that.all[element].events[type].callbackMap;
        var cbMap = element['hotkeys'].events[type].callbackMap;
        if (!shift && !ctrl && !alt) {
            // No Modifiers
            mapPoint = cbMap[special] || cbMap[character];
        }
        // deals with combinaitons (alt|ctrl|shift+anything)
        else {
                var modif = '';
                if (alt) modif += 'alt+';
                if (ctrl) modif += 'ctrl+';
                if (shift) modif += 'shift+';
                // modifiers + special keys or modifiers + characters or modifiers + shift characters
                mapPoint = cbMap[modif + special] || cbMap[modif + character] || cbMap[modif + that.shift_nums[character]];
            }
        if (mapPoint) {
            mapPoint.cb(event);
            if (!mapPoint.propagate) {
                event.stopPropagation();
                event.preventDefault();
                return false;
            }
        }
    };
    // first hook for this element
    var data = opt.target['hotkeys'];
    if (!data) {
        opt.target['hotkeys'] = data = { events: {} };
    }
    //      if (!hotkeys.all[opt.target]){
    //          hotkeys.all[opt.target] = {events:{}};
    //      }
    if (!data.events[opt.type]) {
        data.events[opt.type] = { callbackMap: {} };
        on(opt.target, opt.type, inspector);
        //$.event.add(opt.target, opt.type, inspector);
    }
    //      if (!hotkeys.all[opt.target].events[opt.type]){
    //          hotkeys.all[opt.target].events[opt.type] = {callbackMap: {}}
    //          $.event.add(opt.target, opt.type, inspector);
    //      }
    data.events[opt.type].callbackMap[combi] = { cb: callback, propagate: opt.propagate };
    //      hotkeys.all[opt.target].events[opt.type].callbackMap[combi] =  {cb: callback, propagate:opt.propagate};
    return hotkeys;
};
hotkeys.remove = function (exp, opt) {
    opt = opt || {};
    target = opt.target || document.body;
    type = opt.type || 'keydown';
    exp = exp.toLowerCase();

    delete target['hotkeys'].events[type].callbackMap[exp];
};

hotkeys.scan = function (element, target) {
    element = element || document.body;
    element.querySelectorAll('[u-enter]').forEach(function (el) {
        var enterValue = el.getAttribute('u-enter');
        if (!enterValue) return;
        if (enterValue.substring(0, 1) == '#') hotkeys.add('enter', { target: this }, function () {
            var _el = element.querySelector(enterValue);
            if (_el) {
                _el.focus();
            }
        });else {
            target = target || window;
            var func = h(target, enterValue);
            hotkeys.add('enter', { target: this }, function () {
                func.call(this);
            });
        }
    });
    element.querySelectorAll('[u-hotkey]').forEach(function (el) {
        var hotkey = el.getAttribute('u-hotkey');
        if (!hotkey) return;
        hotkeys.add(hotkey, function () {
            el.click();
        });
    });
};

var hotkeys = hotkeys;

/**
 * Module : compox createApp
 * Author : huyue(huyueb@yonyou.com)
 * Date   : 2017-01-17 10:13:10
 */
var App = function App() {
    classCallCheck(this, App);

    // init
    this.init = init;
    this.dataTables = {};
};

var init = function init(viewModel, element, doApplyBindings) {
    var self = this;
    element = element || document.body;
    if (!isArray(element)) {
        element = [element];
    }
    this.elements = element;
    each(this.elements, function (i, element) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        if (element) {
            element.querySelectorAll('[u-meta]').forEach(function (ele) {
                var options = JSON.parse(ele.getAttribute('u-meta'));
                options['type'] = options['type'] || 'string';
                if (options && options['type']) {
                    if (self.adjustFunc) self.adjustFunc.call(self, options);
                    var comp = compMgr.createDataAdapter({ el: ele, options: options, model: viewModel, app: self });
                    ele['u-meta'] = comp;
                }
            });
        }

        if (hotkeys) hotkeys.scan(element);
        if (typeof doApplyBindings == 'undefined' || doApplyBindings == true) ko.applyBindings(viewModel, element);
        compMgr.updateComp(element);
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

window.App = App;

//公开接口、属性对外暴露
var api = {
	createApp: createApp,
	compMgr: compMgr
};
if (document.readyState && document.readyState === 'complete') {
	compMgr.updateComp();
} else {
	on$1(window, 'load', function () {
		compMgr.updateComp();
	});
}
// export api;
//export default api;
extend(api, window.u || {});

window.u = api;
window.iweb = {};
window.iweb.browser = window.u;

exports.u = api;

}((this.bar = this.bar || {})));
