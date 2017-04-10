function addLoadEvent(func){
    var load = window.onload;
    if(typeof window.onload != Function){
        window.onload = func;
    }
    else{
        window.onload = function(){
            load();
            func();
        }
    }
}

var arr = [];
var box = document.getElementById('box');

//存放坐标
function seat(){
    var row = box.getElementsByClassName('row');
    for (var i = 0; i < row.length; i ++){
        var col = row[i].getElementsByClassName('col');
        var ar = [];
        for (var j = 0; j < col.length; j ++){
            ar.push(col[j])
        }
        arr.push(ar)
    }
}

//生成随机坐标
function randoms(){
    var i = Math.floor(Math.random()*4);
    var j = Math.floor(Math.random()*4);
    var div = arr[i][j];
    return div;
}

function numb(){
    return Math.random() > 0.2 ? 2 : 4;
}

//开局两个随机数
function initial(){
    while(1){
        var div = randoms();
        var dic = randoms();
        if (div !== dic){
            var nua = numb();
            var nub = numb();
            break;
        }
    }
    dic.innerHTML = '<div class="div s' + nua + '">' + nua + '</div>';
    div.innerHTML = '<div class="div s' + nub + '">' + nub + '</div>';
}

function full(){
    for (var j = 0; j < arr.length; j ++){
        var x = arr[j].some(function(al){
            return al.innerHTML === '';
        })
        if (x == true){
            return true;
        }
    }
    alert('辣鸡！重来请猛戳F5 ~')
    return false;
}

//游戏中随机出现的数
function initials(){
    while(full()){
        var div = randoms();
        if (div.innerHTML == ''){
            nua = numb();
            break;
        }
    }
    div.innerHTML = '<div class="div s' + nua + '">' + nua + '</div>';
}

//上移动
function up(){
    for (var j = 1; j < arr.length; j ++){
        var t = -1;
        for (var x = 0 ; x < arr.length ; x ++){
            if (arr[j][x].innerHTML !== ''){
                for (var i = j; i >= 1; i--){
                    if (arr[i-1][x].innerHTML === ''){
                        var num = arr[i][x].innerHTML;
                        arr[i-1][x].innerHTML = num;
                        arr[i][x].innerHTML = '';
                    } else if (arr[i][x].innerHTML === arr[i-1][x].innerHTML){
                        if (t != -1){
                            if (i <= 2){
                                var num = arr[i][x].firstChild.innerHTML - 0;
                                arr[i-1][x].innerHTML = '<div class="div s'+ 2 * num +'">' + 2 * num + '</div>';
                                arr[i][x].innerHTML = '';
                            } 
                            else {
                                break;
                            }
                        }
                        else{
                            var num = arr[i][x].firstChild.innerHTML - 0;
                            arr[i-1][x].innerHTML = '<div class="div s'+ 2 * num +'">' + 2 * num + '</div>';
                            arr[i][x].innerHTML = '';
                            t ++;
                        }
                    }
                }
            }
        }
    }
}

//下移动
function down(){
    for (var j = 2; j >= 0; j --){
        var t = -1;
        for (var x = 3; x >= 0; x --){
            if (arr[j][x].innerHTML !== ''){
                for (var i = j; i <= 2; i ++){
                    if (arr[i+1][x].innerHTML === ''){
                        var num = arr[i][x].innerHTML;
                        arr[i+1][x].innerHTML = num;
                        arr[i][x].innerHTML = '';
                    } else if (arr[i][x].innerHTML === arr[i+1][x].innerHTML){
                        if (t != -1){
                            if (i <= 1){
                                var num = arr[i][x].firstChild.innerHTML - 0;
                                arr[i+1][x].innerHTML = '<div class="div s'+ 2 * num +'">' + 2 * num + '</div>';
                                arr[i][x].innerHTML = '';
                            } 
                            else {
                                break;
                            }
                        } 
                        else {
                            var num = arr[i][x].firstChild.innerHTML - 0;
                            arr[i+1][x].innerHTML = '<div class="div s'+ 2 * num +'">' + 2 * num + '</div>';
                            arr[i][x].innerHTML = '';
                            t ++;
                        }
                    }
                }
            }
        }
    }
}

//左移动
function left(){
    arr.forEach(function(el,le){
        var t = -1;
        el.forEach(function(x,l,e){
            if (x.innerHTML !== ''){
                if (l > 0){
                    for (var i = l - 1; i >= 0; i--){
                        if (e[i].innerHTML === ''){
                            var num = e[i+1].innerHTML;
                            e[i].innerHTML = num;
                            e[i+1].innerHTML = '';
                        } 
                        else if (e[i].innerHTML === e[i+1].innerHTML){
                            if (t != -1){
                                if (i >= 1){
                                    var num = e[i+1].firstChild.innerHTML - 0;
                                    e[i].innerHTML = '<div class="div s'+ 2 * num +'">' + 2 * num + '</div>';
                                    e[i+1].innerHTML = '';
                                } 
                                else {
                                    break;
                                }
                            }
                            else{
                                var num = e[i+1].firstChild.innerHTML - 0;
                                e[i].innerHTML = '<div class="div s'+ 2 * num +'">' + 2 * num + '</div>';
                                e[i+1].innerHTML = '';
                                t ++;
                            }
                        }
                    }
                }
            }
        })
    })
}

//右移动
function right(){
    arr.forEach(function(el,le){
        var t = -1;
        for (var j = 2; j >= 0; j --){
            if (el[j].innerHTML !== ''){
                for (var i = j; i <= 2; i ++){
                    if (el[i+1].innerHTML === ''){
                        var num = el[i].innerHTML;
                        el[i+1].innerHTML = num;
                        el[i].innerHTML = '';
                    }
                    else if (el[i].innerHTML === el[i+1].innerHTML){
                        if (t != -1){
                            if (i <= 1){
                                    var num = el[i].firstChild.innerHTML - 0;
                                    el[i+1].innerHTML = '<div class="div s'+ 2 * num +'">' + 2 * num + '</div>';
                                    el[i].innerHTML = '';
                                } 
                                else {
                                    break;
                                }
                        }
                        else{
                            var num = el[i].firstChild.innerHTML - 0;
                            el[i+1].innerHTML = '<div class="div s'+ 2 * num +'">' + 2 * num + '</div>';
                            el[i].innerHTML = '';
                            t ++;
                        }
                    }
                }
            }
        }
    })
}

//键盘事件
document.onkeyup = function(e){
    if (e.keyCode == 37){
        left();
        initials();
    }
    if (e.keyCode == 38){
        up();
        initials()
    }
    if (e.keyCode == 39){
        right();
        initials();
    }
    if(e.keyCode == 40){
        down();
        initials();
    }
}

addLoadEvent(seat());
addLoadEvent(initial());
