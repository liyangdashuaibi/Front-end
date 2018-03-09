	// 获取元素的样式信息
	// element		元素
	// attr 		样式名
	let getStyle = function ( element, attr ) {
		if ( element.currentStyle ) {
			return element.currentStyle[attr];
		} else {
			return window.getComputedStyle( element, null )[attr];
		}
  	}

  	// 基本的运动函数
  	// curEL 		元素
  	// curStyle 	移动的参数
  	// fn 			运动完成后的回调函数
	let sport = function ( curEl, curStyle = {}, fn ) {
		clearTimeout(curEl.timer);
		function pino () {
			var bStop = true;
			for ( let i in curStyle ) {
				let tStyle = 0;
				if ( i === 'opacity' ) {
					tStyle = Math.round( parseFloat( curEl.style.opacity || getStyle( curEl, i ) ) * 100 );
				} else {
					tStyle = parseInt( getStyle( curEl, i ) );
				}
				let speed = ( curStyle[i] - tStyle ) / 8;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);	//取整，解决浏览器忽略小于1px的数值 导致运动结束时，离目标值Itarget少几个像素的问题 
				if ( tStyle !== curStyle[i] ){
					bStop  = false;
				}
				if ( i === 'opacity' ) {
					tStyle += speed;
					curEl.style.filter = 'alpha(opacity:' + tStyle + ')';
					curEl.style.opacity = tStyle / 100;
				} else {
					curEl.style[i] = tStyle + speed + 'px';
				}		
			}
			if (bStop) {
				if (fn) fn();
				return;
			}
			curEl.timer = setTimeout( pino, 1000/60 );
		};
		pino()
	}

	// 检测元素及元素的父元素是否包含ID、Class、标签名
	// el    		元素
	// selec		ID、Class、为空(标签名)
	// str  		要检测的ID、Class、标签名
	let obtainClass = function ( el, selec ) {
		return selec ? ( el.getAttribute(selec) === null ? "" : el.getAttribute(selec) ).split(" ") : el.nodeName.toLowerCase();
	}
	let testClass = function ( el, selec ) {
		return obtainClass( el, selec ).indexOf(str) === -1 ? false : true; 
	}
	let ptarget = function ( el, selec ) {
		if ( el.classList ) {
			if ( el.classList.contains(selec) ) {
				return el;
			};
			return ptarget( el.parentNode, selec );
		} else {
			return;
		}

	}

	// 把子字符串插入到主字符串的前面
	// str 			主要字符串
	// flg 			要添加的字符串
	let insertFlg = function( str, flg ) {
	    var arr = [];
	    arr.push(flg);
	    arr.push(str);
	    return arr.join('');
	}

	// 在父元素最前面添加元素
	let insertBe = function ( parent, newEL ) {
		var ft = parent.firstChild;
		parent.insertBefore( newEL, ft ); 
	}
	// 在元素后面添加相邻元素
	function insertAfter ( newElement, targetElement ) {  
	    var parent = targetElement.parentNode;  
	    if ( parent.lastChild == targetElement ) {   
	        parent.appendChild(newElement);  
	    } else {  
	        parent.insertBefore( newElement, targetElement.nextElementSibling ); 
	    }  
	}  
	// 在元素前面添加相邻元素
	function insertBefore ( newElement, targetElement ) {
		var parent = targetElement.parentNode;
		if ( parent.firstChild == targetElement ) {   
	       insertBe( parent, newElement );  
	    } else {  
	        parent.insertBefore( newElement, targetElement ); 
	    } 
	}

	// 传入AV号数组获得每个AV号的视频信息
	// arr 			AV号数组
	// fn 			回调函数
	// CacheObj 	缓存数据的对象
	let ajaxModule = function ( arr, fn, CacheObj ) {
		if ( arr.length === 0 ) return;
		var urlf = "http://9bl.bakayun.cn/API/GetVideoInfo.php?aid=";
		var urll = "&type=jsonp"; 
		if ( CacheObj && CacheObj[arr] !== undefined ) {
			for ( let i = 0; i < arr.length; i ++ ) {
				fn( CacheObj[arr][i] );
			}
		} else {
			if ( CacheObj && CacheObj !== undefined ) {
				CacheObj[arr] = [];
			}
			for ( let i = 0; i < arr.length; i ++ ) {
				let url = urlf + arr[i] + urll;
				myFrame.jsonp( url, function (data) {
					fn( data.Result );
					if ( CacheObj && CacheObj !== undefined ) {
						CacheObj[arr][i] = data.Result;
					}
				})
			}
		}
	}

	// 毫秒转化为时:分:秒
	// milli  		毫秒数
	let milliTurnMS = function (milli) {
		let STime = parseInt( milli / 1000 );
		let MTime = 0;
		let HTime = 0;
		if ( STime > 60 ) {
			MTime = parseInt( STime / 60 );
			STime = parseInt( STime % 60 );
			if ( MTime > 60 ) {
	            HTime = parseInt( MTime / 60 );
	            MTime = parseInt( MTime % 60 );
            }
		}
		return `${ HTime > 0 ? ( HTime < 10 ? "0" + HTime : HTime ) + ":" : ""}
				${ MTime > 0 ? ( MTime < 10 ? "0" + MTime : MTime ) + ":" : ""}
				${ STime < 10 ? "0" + STime : STime }`;
	}	

	// 获取鼠标相对于某一个元素的坐标值
	// className	元素Class值
	let positionEl = function ( e, el ) {
		var pos = el.getBoundingClientRect();
		var posX = pos.left, posY = pos.top;
	  	e = e || window.event;
	  	var x = e.clientX - posX,
	  		y = e.clientY - posY;
	  	return { x, y };
	}

	// 获取对象长度
	let objLength = function (obj) {
		var count = 0;
		for ( let i in obj ) {
			if ( obj.hasOwnProperty(i) ) {
				count ++;
			}
		}
		return count;
	}

	//滚动条在Y轴上的滚动距离
	function getScrollTop () {
	　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
	　　if(document.body){
	　　　　bodyScrollTop = document.body.scrollTop;
	　　}
	　　if(document.documentElement){
	　　　　documentScrollTop = document.documentElement.scrollTop;
	　　}
	　　scrollTop = ( bodyScrollTop - documentScrollTop > 0 ) ? bodyScrollTop : documentScrollTop;
	　　return scrollTop;
	}
	//文档的总高度
	function getScrollHeight () {
	　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
	　　if(document.body){
	　　　　bodyScrollHeight = document.body.scrollHeight;
	　　}
	　　if(document.documentElement){
	　　　　documentScrollHeight = document.documentElement.scrollHeight;
	　　}
	　　scrollHeight = ( bodyScrollHeight - documentScrollHeight > 0 ) ? bodyScrollHeight : documentScrollHeight;
	　　return scrollHeight;
	}
	//浏览器视口的高度
	function getWindowHeight () {
	　　var windowHeight = 0;
	　　if( document.compatMode == "CSS1Compat" ){
	　　　　windowHeight = document.documentElement.clientHeight;
	　　}else{
	　　　　windowHeight = document.body.clientHeight;
	　　}
	　　return windowHeight;
	}