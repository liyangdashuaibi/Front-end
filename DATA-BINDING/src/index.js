import { observer } from "./observer/observer";
import Watcher from './watcher/watcher';
import Compile from './compile/compile';

function Binding(options) {
    this.vm = this;
    this.data = options.data;
    Object.keys(this.data).forEach( (key) => {
        this.proxyKeys(key);
    });
    observer(this.data);
    new Compile(options.el, this.vm);
    return this;
}
Binding.prototype.proxyKeys = function (key) {
    var self = this;
    Object.defineProperty(this, key, {
        enumerable: false,
        configurable: true,
        get: function proxyGetter() {
            return self.data[key];
        },
        set: function proxySetter(newVal) {
            self.data[key] = newVal;
        }
    })
}

export default Binding;