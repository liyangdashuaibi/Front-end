import Watcher from "../watcher/watcher";

function Compile (el, vm) {
    this.vm = vm;
    this.el = document.querySelector(el);
    this.fragment = null;
    this.init();
}
Compile.prototype.init = function () {
    if (this.el) {
        this.fragment = this.nodeToFragment(this.el);
        this.compileElement(this.fragment);
        this.el.appendChild(this.fragment);
    } else {
        console.log("DOM元素不存在")
    }
}
Compile.prototype.nodeToFragment = function (el) {
    var fragment = document.createDocumentFragment();
    var child = el.firstChild;
    while (child) {
        fragment.appendChild(child);
        child = el.firstChild;
    }
    return fragment;
}
Compile.prototype.compileElement = function (el) {
    var childNodes = el.childNodes;
    [].slice.call(childNodes).forEach(node => {
        var reg = /\{\{(.*)\}\}/;
        var text = node.textContent;
        if (this.isTextNode(node) && reg.test(text)) {
            this.compileText(node, reg.exec(text)[1].trim());
        } 
        else if (node.childNodes && node.childNodes.length) {
            this.compileElement(node);
        }
    });
}
Compile.prototype.compileText = function (node, exp) {
    var val = this.vm[exp];
    this.updateText(node, val); // 将初始化的数据初始化到视图中
    new Watcher(this.vm, exp, (value) => {
        this.updateText(node, value);
    })
}
Compile.prototype.updateText = function (node, val) {
    node.textContent = typeof val == 'undefined' ? '' : val;
}
Compile.prototype.isTextNode = function (node) {
    return node.nodeType == 3;
}

export default Compile;