import { Dep } from '../observer/observer';

function Watcher (vm, exp, fn) {
    this.vm = vm;
    this.exp = exp;
    this.fn = fn;
    this.val = this.get();
}
Watcher.prototype.updata = function () {
    this.run();
}
Watcher.prototype.run = function () {
    var val = this.vm.data[this.exp];
    var oldVal = this.val;
    if (val !== oldVal) {
        this.val = val;
        this.fn.call(this.vm, val, oldVal);
    }
}
Watcher.prototype.get = function () {
    Dep.target = this;
    var val = this.vm.data[this.exp];
    Dep.target = null;
    return val;
}

export default Watcher;