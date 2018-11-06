// 文本节点
function ReactDOMTextComponent (text) {
    // 存下当前字符串
    this._currentElement = text;
    // 用来标识当前component
    this._rootNodeID = null;
}
// component渲染时生成的dom结构
ReactDOMTextComponent.prototype.mountComponent = function (rootID) {
    this._rootNodeID = rootID;
    return '<span data-reactid="' + rootID + '">' + this._currentElement + '</span>';
}

// 浏览器默认节点
function ReactDOMComponent (element) {
    this._currentElement = element;
    this._rootNodeID = null;
}
ReactDOMComponent.prototype.mountComponent = function (rootID) {
    this._rootNodeID = rootID;
    
    var props = this._currentElement.props;
    var tagOpen = '<' + this._currentElement.type;
    var tagClose = '</' + this._currentElement.type + '>';

    tagOpen += ' data-reactid=' + this._rootNodeID;

    // 拼凑属性
    for (var propKey in props) {
        if (/^on[A-Za-z]/.test(propKey)) {
            var eventType = propKey.replace('on', '');
            ins.daughter(document, eventType, '[data-reactid=' + this._rootNodeID + ']', props[propKey]);
        }
        if (props[propKey] && propKey != 'children' && !/^on[A-Za-z]/.test(propKey)) {
            tagOpen += ' ' + propKey + '=' + props[propKey];
        }
    }

    // 拼凑子节点
    var content = '';
    var children = props.children || [];
    var childrenInstances = []; //用于保存所有的子节点的componet实例，以后会用到
    var that = this;
    children.forEach(function (item, index) {
        //这里再次调用了instantiateReactComponent实例化子节点component类，拼接好返回
        var childComponentInstance = instantiateReactComponent(item);
        childComponentInstance._mountIndex = index;

        childrenInstances.push(childComponentInstance);
        //子节点的rootId是父节点的rootId加上新的key也就是顺序的值拼成的新值
        var curRootId = that._rootNodeID + '.' + index;
        //得到子节点的渲染内容
        var childMarkup = childComponentInstance.mountComponent(curRootId);
        //拼接在一起
        content += ' ' + childMarkup;
    });

    //留给以后更新时用的这边先不用管
    this._renderedChildren = childrenInstances;

    //拼出整个html内容
    return tagOpen + '>' + content + tagClose;
}

// 自定义节点
function ReactCompositeComponent (element) {
    this._currentElement = element;
    this._rootNodeID = null;
    this._instance = null;
}
ReactCompositeComponent.prototype.mountComponent = function (rootID) {
    this._rootNodeID = rootID;
    var publicProps = this._currentElement.props;
    var ReactClass = this._currentElement.type;
    var inst = new ReactClass(publicProps);
    this._instance = inst;
    //保留对当前comonent的引用，下面更新会用到
    this._reactInternalInstance = this;
    
    if (inst.componentWillMount) {
        inst.componentWillMount();
        //这里在原始的reactjs其实还有一层处理，就是  componentWillMount调用setstate，不会触发rerender而是自动提前合并，这里为了保持简单，就略去了
    }

    var renderedElement = this._instance.render();
    //得到renderedElement对应的component类实例
    var renderedComponentInstance = instantiateReactComponent(renderedElement);
    this._renderedComponent = renderedComponentInstance; //存起来留作后用
    //拿到渲染之后的字符串内容，将当前的_rootNodeID传给render出的节点
    var renderedMarkup = renderedComponentInstance.mountComponent(this._rootNodeID);

    ins.on(document, 'mountReady', function () {
        inst.componentDidMount && inst.componentDidMount();
    });

    return renderedMarkup;
}

// component工厂  用来返回一个component实例
function instantiateReactComponent (node) {
    // 文本节点
    if (typeof node === 'string' || typeof node === 'number') {
        return new ReactDOMTextComponent(node);
    }
    // 浏览器默认节点
    if (typeof node === 'object' && typeof node.type === 'string') {
        return new ReactDOMComponent(node);
    }
    // 自定义节点
    if (typeof node === 'object' && typeof node.type === 'function') {
        return new ReactCompositeComponent(node);
    }
}

// 渲染元素节点
function ReactElement(type, key, props) {
    this.type = type;
    this.key = key;
    this.props = props;
}

// 定义ReactClass类,所有自定义的超级父类
var ReactClass = function () {};
// 留给子类去继承覆盖
ReactClass.prototype.render = function () {};

React = {
    nextReactRootID: 0,
    createClass (spec) {
        // 生成一个子类
        var Constructor = function (props) {
            this.props = props;
            this.state = this.getInitialState ? this.getInitialState() : null;
        }
        // 原型继承，继承超级父类
        Constructor.prototype = new ReactClass();
        Constructor.prototype.constructor = Constructor;
        // 混入spec到原型
        Constructor.prototype = ins.extend({}, Constructor.prototype, spec);
        return Constructor;
    },
    createElement (type, config, children) {
        var props = {}, propName;
        config = config || {};
        var key = config.key || null;
        for (propName in config) {
            if (config.hasOwnProperty(propName) && propName !== 'key') {
                props[propName] = config[propName];
            }
        }
        var childrenLength = arguments.length - 2;
        if (childrenLength === 1) {
            props.children = Array.isArray(children) ? children : [children];
        }
        if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i ++) {
                childArray[i] = arguments[i+2];
            }
            props.children = childArray;
        }

        return new ReactElement(type, key, props);
    },
    render (element, container) {
        var componentInstance = instantiateReactComponent(element);
        var markup = componentInstance.mountComponent(React.nextReactRootID++);
        container.innerHTML = markup;
        // 触发完成mount的事件
        ins.trigger(document, 'mountReady');
    }
}

// 工具函数
ins = {
    // 定义事件
    on (dom, type, fn, capture=false) {
        var _eventCompat = function (event) {
            return event;
        }
        if (window.addEventListener) {
            dom.addEventListener(type, function (e) {
                fn.call(this, _eventCompat(e));
            }, capture);
        } else if (window.attachEvent) {
            dom.attachEvent("on" + type, function (e) {
                e = e || window.event;
                fn.call(this, _eventCompat(e));
            });
        }
    },
    // 触发自定义事件
    trigger (dom, type) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(type, false, false);
        dom.dispatchEvent(evt);
    },
    // 只支持属性的事件代理
    daughter (dom, type, daughter, fn) {
        ins.on(dom, type, function (e) {
            var complete = document.body.querySelectorAll('*');
            var attr = daughter.replace(/(\[|\])/g, '').split('=');
            complete = [].slice.call(complete).filter(function (item) {
                return item.getAttribute(attr[0]) != null && item.getAttribute(attr[0]) === e.target.getAttribute(attr[0]);
            })
            if (complete.length === 0) return;
            fn.call(this);
        })
    },
    // 合并对象（浅）
    extend () {
        var args = Array.prototype.slice.call(arguments);
        for (var i = args.length; i > 0; i --) {
            for (var key in args[i]) {
                args[i-1] = args[i];
            }
        }
        return args[0];
    }
}