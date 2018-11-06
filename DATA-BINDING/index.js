import Binding from './src/index';

document.body.innerHTML = '<div id="app"><p>{{ a }}</p><p>{{ b }}</p></div>'

var data = {
    a: 1,
    b: 2,
    c: {
        d: [
            {
                e: 3
            }
        ]
    }
}


var selfVue = new Binding({
    el: "#app",
    data: data
});

setTimeout(() => selfVue.a = 200, 2000)