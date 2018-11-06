// 渲染 var x = new Scrollbar(element, options);
// 更新 x.render(options);

// options      {}   参数
// boxHeight    盒元素高度
// barWidth     滚动条宽度
// barRadius    滚动条圆角角度
// barColor     滚动条颜色
// rollspeed    一次滚轮事件滚动的距离 * 1
// isDisplay    是否移出容器元素时隐藏滚动条

;(function () {
    var WHEEL_SPEED = 5;
    // 工具
    var powerful = {
        // 类型判断
        surveytype: (function () {
            var gettype = Object.prototype.toString
            var utility = {
                isObj: function (o) {
                    return gettype.call(o) === "[object Object]";
                },
                isArray: function (o) {
                    return gettype.call(o) === "[object Array]";
                },
                isFunction: function (o) {
                    return gettype.call(o) === "[object Function]";
                },
                isString: function (o) {
                    return gettype.call(o) === "[object String]";
                }
            }
            return utility;
        })(),
        // 合并对象
        extend: function () {
            var args = Array.prototype.slice.call(arguments);
            var options, name, src, copy, copyIsArray, clone,
                target = args[0] || {},
                i = 1,
                length = args.length,
                deep = false;
            var utility = powerful.surveytype;
            if (typeof target === 'boolean') {
                deep = target;
                target = args[i] || {};
                i++;
            }
            if (!utility.isObj(target) && !utility.isFunction(target)) {
                target = {};
            }
            for (; i < length; i++) {
                options = arguments[i];
                if (options !== null) {
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        if (target === copy) {
                            continue;
                        }
                        copyIsArray = utility.isArray(target);
                        if (deep && copy && (utility.isObj(target) || copyIsArray)) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && utility.isArray(target) ? src : [];
                            } else {
                                clone = src && utility.isObj(target) ? src : {};
                            }
                            target[name] = extend(deep, clone, copy);
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            return target;
        },
        // 禁止浏览器滚轮滚动
        scrollHanlder: (function () {
            var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
            function preventDefault(e) {
                e = e || window.event;
                if (e.preventDefault)
                    e.preventDefault();
                e.returnValue = false;
            }
            function preventDefaultForScrollKeys(e) {
                if (keys[e.keyCode]) {
                    preventDefault(e);
                    return false;
                }
            }
            var oldonwheel, oldonmousewheel1, oldonmousewheel2, oldontouchmove, oldonkeydown, isDisabled;
            function disableScroll() {
                if (window.addEventListener) // older FF
                    window.addEventListener('DOMMouseScroll', preventDefault, false);
                oldonwheel = window.onwheel;
                window.onwheel = preventDefault; // modern standard

                oldonmousewheel1 = window.onmousewheel;
                window.onmousewheel = preventDefault; // older browsers, IE
                oldonmousewheel2 = document.onmousewheel;
                document.onmousewheel = preventDefault; // older browsers, IE

                oldontouchmove = window.ontouchmove;
                window.ontouchmove = preventDefault; // mobile

                oldonkeydown = document.onkeydown;
                document.onkeydown = preventDefaultForScrollKeys;
                isDisabled = true;
            }
            function enableScroll() {
                if (!isDisabled) return;
                if (window.removeEventListener)
                    window.removeEventListener('DOMMouseScroll', preventDefault, false);

                window.onwheel = oldonwheel; // modern standard

                window.onmousewheel = oldonmousewheel1; // older browsers, IE
                document.onmousewheel = oldonmousewheel2; // older browsers, IE

                window.ontouchmove = oldontouchmove; // mobile

                document.onkeydown = oldonkeydown;
                isDisabled = false;
            }
            return {
                disableScroll: disableScroll,
                enableScroll: enableScroll
            };
        })(),
        // 设置样式
        css: function (oDiv, style, price) {
            if (powerful.surveytype.isString(style) && price != undefined) {
                oDiv.style[style] = price;
            } 
            else if (powerful.surveytype.isObj(style)) {
                for (var item in style) {
                    oDiv.style[item] = style[item];
                }
            }
        },
        // 获取样式
        getStyle: function (oDiv, name) {
            if (oDiv.style.styleFloat) {
                return oDiv.style.styleFloat;   //ie下float处理
            } else if (oDiv.style.cssFloat) {
                return oDiv.style.cssFloat;     //火狐等float处理
            }
            if (oDiv.currentStyle) {
                return oDiv.currentStyle[name];
            } else {
                return getComputedStyle(oDiv, false)[name];
            }
        },
        // 隐藏元素获取样式
        getHideStyle: function (hide, oDiv, name) {
            var getStyle = powerful.getStyle;
            for (var i = 0, le = hide.length; i < le; i ++ ) {
                hide[i].display = getStyle(hide[i], 'display');
                hide[i].position = getStyle(hide[i], 'position');
                hide[i].visibility = getStyle(hide[i], 'visibility');
                hide[i].ztop = getStyle(hide[i], 'top');
                hide[i].zleft = getStyle(hide[i], 'left');
                powerful.css(hide[i], {
                    display: 'block',
                    position: 'absolute',
                    visibility: 'hidden',
                    top: '-9999px',
                    left: '-9999px'
                })
            }
            var oDivN = oDiv.offsetHeight;
            for (var i = 0, le = hide.length; i < le; i++) {
                powerful.css(hide[i], {
                    display: hide[i].display,
                    position: hide[i].position,
                    visibility: hide[i].visibility,
                    top: hide[i].ztop,
                    left: hide[i].zleft
                })
            }
            return oDivN;
        },
        // 事件绑定(兼容滚轮事件)
        addListener: (function (window) {
            var _eventCompat = function (event) {
                var type = event.type;
                if (type == 'DOMMouseScroll' || type == 'mousewheel') {
                    event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
                }
                if (event.srcElement && !event.target) {
                    event.target = event.srcElement;
                }
                if (!event.preventDefault && event.returnValue !== undefined) {
                    event.preventDefault = function () {
                        event.returnValue = false;
                    };
                }
                if (!event.pageY) {
                    event.pageY = event.clientY;
                    event.pageX = event.clientX;
                }
                return event;
            }
            if (window.addEventListener) {
                return function (el, type, fn, capture) {
                    if (type === "mousewheel" && document.mozFullScreen !== undefined) {
                        type = "DOMMouseScroll";
                    }
                    el.addEventListener(type, function (event) {
                        fn.call(this, _eventCompat(event))
                    }, capture || false)
                }
            } else if (window.attachEvent) {
                return function (el, type, fn, capture) {
                    el.attachEvent("on" + type, function (event) {
                        event = event || window.event;
                        fn.call(el, _eventCompat(event));
                    });
                }
            }
        })(window),
        // 返回某个指定的字符串值在字符串中首次出现的位置（indexOf）
        indexOf: function (arr, item) {
            var i = 0, le = arr.length;
            for (; i < le; i ++) {
                if (arr[i] === item) {
                    return i;
                }
            }
            return -1;
        },
        // 判断类名是否存在
        hasClass: function (oDiv, classname) {
            var classnames = oDiv.className.split(" ");
            return powerful.indexOf(classnames, classname) === -1 ? false : true;
        },
        // 获取父元素
        parents: function (oDiv, pString) {
            var tp = oDiv.parentNode;
            var p = document.querySelectorAll(pString);
            var i = 0, le = p.length;
            if (tp === document.body) {
                return '';
            }
            if (le === 0){
                return powerful.parents(tp, pString);
            } else {
                for (; i < le; i++) {
                    if (tp === p[i]) {
                        return tp;
                    }
                    if (i === le - 1) {
                        return powerful.parents(tp, pString);
                    }
                }
            }
        },
        // 获取display: none 的父元素(为了获取display: none元素的子元素的高)
        parentN: function (oDiv, arr) {
            if (oDiv === document.body) {
                return arr;
            }
            var dis = powerful.getStyle(oDiv, 'display');
            
            if (dis === 'none') {
                arr.push(oDiv);
            }
            return powerful.parentN(oDiv.parentNode, arr)
        },
        // 简易动画框架
        animate: function (oDiv, json) {
            clearInterval(oDiv.timer)
            oDiv.timer = setInterval(function () {
                var flag = true;
                for (var i in json) {
                    var icur = parseInt(powerful.getStyle(oDiv, i));
                    var speed = (json[i] - icur) / 10;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    if (json[i] !== icur) {
                        flag = false;
                    }
                    powerful.css(oDiv, i, icur + speed + 'px');
                }
                if (flag) {
                    clearInterval(oDiv.timer);
                }
            }, WHEEL_SPEED)
        },
        // 获取元素
        element: function (str, parent) {
            var p = parent ? parent : document;
            return p.querySelector(str);
        }
    }
    
    function Scrollbar (element, options) {
        var oriOptions = {
            boxHeight: '200px',
            barWidth: '4px',
            barRadius: '2px',
            barColor: '#dddddd',
            rollspeed: 1,
            isDisplay: false,
            isBottomroll: false
        }
        this.element = powerful.surveytype.isString(element) ? powerful.element(element) : element;
        // this.content = powerful.element(".content", this.element)
        this.content = document.createElement('div');
        this.bar = document.createElement('div');
        this.options = powerful.extend(oriOptions, options);
        this.isBar = true;
        this.init();
    }
    // 渲染滚动条并且绑定事件
    Scrollbar.prototype.init = function () {
        // 设置盒子元素
        powerful.css(this.element, 'overflow', 'hidden');
        if (powerful.getStyle(this.element, 'position') === 'static') {
            powerful.css(this.element, 'position', 'relative');
        }
        // 设置滚动元素
        powerful.css(this.content, 'width', '100%');
        this.content.className = 'content';
        this.content.innerHTML = this.element.innerHTML;
        this.element.innerHTML = "";
        this.element.appendChild(this.content);
        // 计算滚动条高度
        var parentN = powerful.parentN(this.content, []);
        this.coH = parentN.length === 0 ? parseInt(powerful.getStyle(this.content, 'height')) : parseInt(powerful.getHideStyle(parentN, this.content, 'height'));
        this.coH = isNaN(this.coH) ? this.content.clientHeight : this.coH;
        this.elH = parseInt(this.options.boxHeight);
        this.eventBind();
        powerful.css(this.element, 'height', this.elH + 'px');
        // 如果滚动元素的高度 < 设置的盒元素的高度，则不设置滚动条
        if (this.coH <= this.elH) {
            this.isBar = false;
            return;
        }
        // 计算滚动条的高
        this.baH = Math.round((this.elH / this.coH).toFixed(2) * this.elH);
        this.baH = this.baH < 10 ? 10 : this.baH;
        // 设置滚动条
        powerful.css(this.bar, {
            height: this.baH + 'px',
            width: this.options.barWidth,
            borderRadius: this.options.barRadius,
            backgroundColor: this.options.barColor,
            position: 'absolute',
            top: '0',
            right: '0'
        })
        this.bar.className = 'scrollbal';
        if (this.options.isDisplay) {
            powerful.css(this.bar, 'display', 'none');
        }
        this.element.appendChild(this.bar);
        // 最大&最小滚动距离
        this.maxTop = this.elH - this.baH;
        this.minTop = 0;
    }
    Scrollbar.prototype.eventBind = function () {
        var t = this;
        // 滚动条拖动事件
        var isClick = false;
        var y1, y2, ty, tTop;
        powerful.addListener(document.body, 'mousedown', function (e) {
            if (e.target === t.bar) {
                y1 = e.pageY;
                isClick = true;
                tTop = parseInt(powerful.getStyle(t.bar, 'top'));
            }
        })
        powerful.addListener(document.body, 'mousemove', function (e) {
            if (isClick) {
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
                y2 = e.pageY;
                ty = tTop + y2 - y1;
                if (ty > t.maxTop) {
                    ty = t.maxTop;
                }
                if (ty < t.minTop) {
                    ty = t.minTop;
                }
                if (powerful.getStyle(t.bar, 'display') === "none") {
                    powerful.css(t.bar, 'display', 'block')
                }
                powerful.css(t.bar, 'top', ty + 'px');
                var pe = (ty / t.maxTop).toFixed(2);
                t.contentUpdate(pe);
            }
        })
        powerful.addListener(document.body, 'mouseup', function (e) {
            if (isClick) {
                isClick = false;
                if (t.options.isDisplay) {
                    var classN = t.element.className.split(" ")[0];
                    classC = classN === "" ? t.element.nodeName.toLowerCase() : '.' + classN;
                    if (powerful.parents(e.target, classC) === '') {
                        powerful.css(t.bar, 'display', 'none');
                    }
                }
            }
        })
        // 滚轮事件
        var isDisable = false;
        powerful.addListener(this.element, 'mouseenter', function (e) {
            if (t.options.isDisplay) {
                powerful.css(t.bar, 'display', 'block');
            }
            isScroll = true;
        })
        powerful.addListener(this.element, 'mousewheel', function (e) {
            if (t.isBar) {
                e.preventDefault();
                // 每次滚动的距离
                var rollDistance = Math.round(((t.elH / t.coH).toFixed(2)) * t.elH * t.options.rollspeed);
                if (e.delta > 0) {
                    rollDistance = -rollDistance;
                }
                rollDistance = parseInt(powerful.getStyle(t.bar, 'top')) + rollDistance;
                if (rollDistance > t.maxTop) {
                    rollDistance = t.maxTop;
                }
                if (rollDistance < t.minTop) {
                    rollDistance = t.minTop;
                }
                powerful.animate(t.bar, { 'top': rollDistance });
                var pe = (rollDistance / t.maxTop).toFixed(2);
                t.contentUpdate(pe, true);
            }
        })
        powerful.addListener(this.element, 'mouseleave', function (e) {
            if (t.options.isDisplay) {
                powerful.css(t.bar, 'display', 'none');
            }
            isScroll = true;
        })
    }
    // 响应滚动条内容移动
    Scrollbar.prototype.contentUpdate = function (pe, isAnimate) {
        var hide = this.coH - this.elH;
        if (!isAnimate) {
            powerful.css(this.content, 'marginTop', Math.round(- hide * pe) + 'px');
        } else {
            powerful.animate(this.content, {'marginTop': Math.round(-hide * pe)});
        }
    }
    // 重新渲染滚动条
    Scrollbar.prototype.render = function (options) {
        this.options = powerful.extend(this.options, options);
        // 重新获取容器元素高度
        this.elH = parseInt(this.options.boxHeight);
        // 重新计算滚动元素高度
        var oldcoH = this.coH, oldbaH = this.baH;
        var parentN = powerful.parentN(this.content, []);
        this.coH = parentN.length === 0 ? parseInt(powerful.getStyle(this.content, 'height')) : parseInt(powerful.getHideStyle(parentN, this.content, 'height'));
        this.coH = isNaN(this.coH) ? this.content.clientHeight : this.coH;
        // 如果滚动元素 <= 容器元素则删除滚动条
        if (this.coH <= this.elH) {
            powerful.css(this.content, 'margin-top', '0');
            if (powerful.element('.scrollbal', this.element) !== null) {
                this.element.removeChild(this.bar);
                this.isBar = false;
            }
            return;
        }
        // 重新计算滚动条
        this.baH = Math.round((this.elH / this.coH).toFixed(2) * this.elH);
        this.baH = this.baH < 10 ? 10 : this.baH;
        // 最大&&最小滚动距离
        this.maxTop = this.elH - this.baH;
        this.minTop = 0;
        // 更新滚动条的高度和偏移量，更新滚动元素的偏移量
        powerful.css(this.bar, 'height', this.baH + 'px');
        if (oldbaH === undefined) {
            powerful.css(this.content, 'margin-top', "0");
            powerful.css(this.bar, 'top', "0");
        } else {
            if (this.options.isBottomroll) {
                powerful.css(this.content, 'margin-top', - (this.coH - this.elH) + "px");
                powerful.css(this.bar, 'top', this.elH - this.baH + "px");
            } else {
                var bT = parseInt(powerful.getStyle(this.bar, 'top'));
                var newBTop = bT + (oldbaH - this.baH)
                newBTop = newBTop < 0 ? 0 : newBTop;
                newBTop = newBTop > this.elH - this.baH ? this.elH - this.baH : newBTop;
                powerful.css(this.bar, 'top', newBTop + "px");
                var pe = (newBTop / this.maxTop).toFixed(2);
                this.contentUpdate(pe);
            }
        }
        // 如果滚动条被删除则在添加滚动条
        if (powerful.element('.scrollbal', this.element) === null) {
            this.bar.className = 'scrollbal';
            powerful.css(this.bar, {
                width: this.options.barWidth,
                borderRadius: this.options.barRadius,
                backgroundColor: this.options.barColor,
                position: 'absolute',
                right: '0'
            });
            this.element.appendChild(this.bar);
            this.isBar = true;
        }
    }

    window.Scrollbar = Scrollbar;
})()