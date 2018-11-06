function Observer (data) {
    this.data = data;
    this.walk(data);
}
Observer.prototype.walk = function (data) {
    Object.keys(data).forEach((key) => {
        this.defineReactive(data, key, data[key]);
    })
}
Observer.prototype.defineReactive = function (data, key, val) {
    var dep = new Dep();
    var childObj = observer(val);
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get () {
            if (Dep.target) dep.addSub(Dep.target);
            return val;
        },
        set (newVal) {
            if (val === newVal) return;
            val = newVal;
            dep.notify();
        }
    })
}
function observer (val) {
    if (!val || typeof val !== 'object') {
        return;
    }
    return new Observer(val);
}

function Dep () {
    this.subs = [];
}
Dep.prototype.addSub = function (sub) {
    this.subs.push(sub);
}
Dep.prototype.notify = function () {
    this.subs.forEach((sub) => {
        sub.updata();
    })
}
Dep.target = null;

export { observer, Dep };