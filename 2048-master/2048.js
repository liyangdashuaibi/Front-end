
var grid=new Array();
var grade=0;
var previousScore=new Array();
var span=document.getElementsByTagName('span');
//最高分
var best=span[1];
best.innerHTML=0;
//日常分
span[0].innerHTML=0;

var div=document.getElementsByClassName('game-container');
var container=div[0];

function addLoadEvent(func){  
    var oldload=window.onload;
    if(typeof window.onload!='function'){
        window.onload=func;
    }else{
        window.onload=function () {
                oldload();
                func();
                }
    }
}


/*function shuchu(){   //调试用
    for(i=0;i<4;i++){
        console.log(grid[i][0],grid[i][1],grid[i][2],grid[i][3]);
    }
    console.log('*****************');
}*/
function newGame(){ 
    var x1=0,y1=0;
    for(i=0;i<4;i++){
        grid[i]=new Array();
        for(j=0;j<4;j++){
            grid[i][j]=0;
        }
    }
    var x = Math.floor(Math.random() * 4);
    var y = Math.floor(Math.random() * 4);
    grid[x][y]=2;
    do{
       x1 = Math.floor(Math.random() * 4);
       y2 = Math.floor(Math.random() * 4);
       grid[x1][y1]=2;
    }while((x==x1)&&(y==y1))
    //shuchu();
    span[0].innerHTML=0;
    hContent();
}
function  hContent(){   //将数组表示在html内
    var i,j;
    for(i=0;i<4;i++){
        for(j=0;j<4;j++){           
            var elmt=document.getElementById("d"+(4*i+j));
            elmt.innerHTML='<div class="s'+grid[i][j]+'">'+grid[i][j]+'</div>';

        }
    }
}

function up(ary,j){ //上移
    var leth=ary.length;
    var x
    for(i=leth-1;i>0;i--){
        if(ary[i][j]&&!ary[i-1][j]){
            x=ary[i][j];
            ary[i][j]=ary[i-1][j];
            ary[i-1][j]=x;
            up(ary,j);
        }
    }
}
function down(ary,j){ //下移
    var leth=ary.length;
    for(i=0;i<leth-1;i++){
        if(ary[i][j]&&!ary[i+1][j]){
            x=ary[i+1][j];
            ary[i+1][j]=ary[i][j];
            ary[i][j]=x;
            down(ary,j);
        }
    }
}
function left(ary,i){ //左移
    var leth=ary.length;
    for(j=leth-1;j>0;j--){
        if(ary[i][j]&&!ary[i][j-1]){
            ary[i][j-1]=ary[i][j];
            ary[i][j]=0;
            left(ary,i);
        }
    }
}
function right(ary,i){ //右移
    var leth=ary.length;
    for(j=0;j<leth-1;j++){
        if(ary[i][j]&&!ary[i][j+1]){
            ary[i][j+1]=ary[i][j];
            ary[i][j]=0;
            right(ary,i);
        }
    }
}

function downDoubling(ary,i,j){ //向下合并，i从length开始
    var leth=ary.length;
    for(i--;i>0;i--){
        //shuchu();
        if(ary[i][j]==ary[i-1][j]){
            if(!ary[i][j]){
                down(ary,j);
                continue;
            } 
            ary[i][j]*=2;
            ary[i-1][j]=0;
            if(i==3) downDoubling(ary,i-1,j);
            down(ary,j);
            break;
        }
    }
}

function upDoubling(ary,i,j){ //向上合并，i从0开始
    var leth=ary.length;
    for(;i<leth-1;i++){
        //shuchu();
        if(ary[i][j]==ary[i+1][j]){
            if(!ary[i][j]){
                up(ary,j);
                continue;
            } 
            ary[i][j]*=2;
            ary[i+1][j]=0;
            if(i==0) upDoubling(ary,i+2,j);
            up(ary,j);
            break;
        }
    }
}

function rightDoubling(ary,i,j){ //向右合并，j从length开始
    var leth=ary.length;
    for(j--;j>0;j--){
        //shuchu();
        if(ary[i][j]==ary[i][j-1]){
            if(!ary[i][j]){
                right(ary,i);
                continue;
            } 
            ary[i][j]*=2;
            ary[i][j-1]=0;
            if(j==3) rightDoubling(ary,i,j-1);
            right(ary,i);
            break;
        }
    }

}

function leftDoubling(ary,i,j){ //向左合并，j从0开始
    var leth=ary.length;
    for(;j<leth-1;j++){
        //shuchu();
        if(ary[i][j]==ary[i][j+1]){
            if(!ary[i][j]){
                left(ary,i);
                continue;
            } 
            ary[i][j]*=2;
            ary[i][j+1]=0;
            if(j==0) leftDoubling(ary,i,j+2);
            left(ary,i);
            break;
        }
    }
}
function add(a){   //添加一个新数字2/4
    var k=0;
    while (!failure()){
    var i = Math.floor(Math.random() * 4);
    var j = Math.floor(Math.random() * 4);
    if (a[i][j] == 0)
        {
        a[i][j] = Math.random()<0.9?2:4;
        break;        
    }
    //shuchu();
    }
}

document.onkeyup=function(l){    //键盘事件函数
    var x=l.keyCode;
    if(x==37){      //左
        for(var i=0;i<grid.length;i++){
            left(grid,i);
           // shuchu();
        }     
        for(var i=0;i<grid.length;i++)
        {       
            leftDoubling(grid,i,0);
        }
    }
    if(x==38){   //上
        for(var j=0;j<grid.length;j++){
            up(grid,j);
            //shuchu();
        } 
        for(var j=0;j<grid.length;j++){
            upDoubling(grid,0,j);
        }
    }
    if(x==39){   //右
        for(var i=0;i<grid.length;i++){
            right(grid,i);
            //shuchu();
        }   
        for(var i=0;i<grid.length;i++){
        rightDoubling(grid,i,grid.length);
        }
    }
    if(x==40){   //下
        for(var j=0;j<grid.length;j++){
            down(grid,j);
            //shuchu();
        } 
        for(var j=0;j<grid.length;j++){
            downDoubling(grid,grid.length,j);
        }
    } 
    var fale=failure();
    if(fale){
        previousScore[previousScore.length]=grade;
        var showGrade='you fail!the score is'+':'+grade+'!';
        alert(showGrade);
        bestScore();
        return 0;
    }    
    if(x>40||x<37) return 0;
    add(grid);
    hContent();
    //shuchu();
    score();
    bestScore();
}
//触摸事件
var x0,y0;
var fx=-1;
function tstart(event){
        event.preventDefault();
        var touch = event.touches[0];    
        var x = Number(touch.pageX); //页面触点X坐标  
        var y = Number(touch.pageY); //页面触点Y坐标   
        x0=x;
        y0=y;
}
function tmove(event){
    event.preventDefault();
    fx=-1;
    var touch = event.touches[0];
    var x = Number(touch.pageX); //页面触点X坐标  
    var y = Number(touch.pageY); //页面触点Y坐标   
        var jdz=Math.abs((y-y0)/(x-x0))
        if((y-y0)>50&&(jdz>1))
        {
            fx="down"; //up
        }
        else if((y-y0)<-50&&((jdz>1)))
        {
            fx="up";  //上
        }
        else if((x-x0)>50&&((jdz<1)))
        {
            fx="right";   //右
        }
        else if((x-x0)<-50&&((jdz<1)))
        {
            fx="left";    //左
        }
}
function tend(event){
    event.preventDefault();
    if(fx=="down")
    {
        for(var j=0;j<grid.length;j++){
        down(grid,j);
        //shuchu();
        } 
        for(var j=0;j<grid.length;j++){
            downDoubling(grid,grid.length,j);
        }
    }
    else if(fx=="up")
    {
        for(var j=0;j<grid.length;j++){
        up(grid,j);
        //shuchu();
        } 
        for(var j=0;j<grid.length;j++){
            upDoubling(grid,0,j);
        }
    }
    else if(fx=="right")
    {
        for(var i=0;i<grid.length;i++){
        right(grid,i);
        //shuchu();
        }   
        for(var i=0;i<grid.length;i++){
            rightDoubling(grid,i,grid.length);
        }
    }
    else if(fx=="left")
    {
        for(var i=0;i<grid.length;i++){
        left(grid,i);
    // shuchu();
        }     
        for(var i=0;i<grid.length;i++)
        {       
            leftDoubling(grid,i,0);
        }
    }
  else return 0;
    var fale=failure();
    if(fale){
        previousScore[previousScore.length]=grade;
        var showGrade='you fail!the score is'+':'+grade+'!';
        alert(showGrade);
        bestScore();
        return 0;
    }    
    add(grid);
    hContent();
    //shuchu();
    score();
    bestScore();
}


//绑定事件  
function touchEvent() {  
    container.addEventListener('touchstart', tstart, false);  
    container.addEventListener('touchmove', tmove, false);  
    container.addEventListener('touchend', tend, false);  
}  

function reGame(){ //重新开始游戏
    var a=document.getElementsByTagName('a');
    var replay=a[0];
    replay.onclick=function(){
        previousScore[previousScore.length]=grade;
        newGame();
        hContent();
        span[0].innerHTML=0;
        bestScore();
        return false;
    }
}


function failure(){   //判断是否已经满了
    for(i=0;i<grid.length;i++){
        for(j=0;j<grid.length;j++){
            if(!grid[i][j]) return false;
        }
    }
    return true;
}

function score(){ //按照权重计算成绩
    grade=0;
    for(i=0;i<grid.length;i++){
        for(j=0;j<grid.length;j++){
            switch(grid[i][j]){
                case 2:grade+=2*1;
                       break;
                case 4:grade+=4*1;
                       break;
                case 8:grade+=8*2;
                       break;
                case 16:grade+=16*3;
                        break;
                case 32:grade+=32*4;
                        break;
                case 64:grade+=64*5;
                        break;
                case 128:grade+=128*6;
                        break;
                case 256:grade+=256*7;
                        break;
                case 512:grade+=512*8;
                        break;
                case 1024:grade+=1024*9;
                        break;
                case 2048:grade+=2048*10;
                          alert("you win!");
                        break;
            }
        }
    span[0].innerHTML=grade;
    }
}

function bestScore(){  //用一个数组储存所有的成绩，数组最后一项为最好的成绩。
    var leth=previousScore.length;
    var a=previousScore;
    for(var i=0;i<leth-1;i++){
        if(a[i]>a[i+1]){
            var x=a[i];
            a[i]=a[i+1]
            a[i+1]=x;
        }
    }
    if(leth==0) best.innerHTML=grade;
    else if(a[leth-1]>grade){
        best.innerHTML=a[leth-1];
    }
    else best.innerHTML=grade;
}
addLoadEvent(newGame);
addLoadEvent(hContent);
addLoadEvent(reGame);
addLoadEvent(touchEvent);

