(function (content, func) {
	func(content);
})(this, function (content) {
	//使用			new Carousel(parent, object);
	//parent 		盒子元素
	//spanClass 	小圆点class名称(自行设置样式)(默认span)
	//spanOn		小圆点切换class名称(自行设置样式)(默认spanOn)
	//spanOver		小圆点触摸样式(自行设置样式)(默认spanOver)
	//spanPos		小圆点所在位置(默认center)
	//way 			切换的模式(left:左右滑动，opacity:淡入淡出)(默认left)
	//times			图片自动轮播的时间(毫秒数)(默认3000)
	//Xevent		鼠标事件种类
	var Carousel = function ( parent, object = {} ) {
		this.parent = parent;
		this.f_width = this.parent.clientWidth;
		this.img = this.parent.querySelectorAll('img');
		this.imgLe = this.img.length;
		this.spanClass = object.spanClass || 'span';
		this.spanOn = object.spanOn || 'spanOn';
		this.spanOver = object.spanOver || 'spanOver';
		this.spanPos = object.spanPos || 'center';
		this.way = object.way || 'left';
		this.times = object.times || 3000;
		this.fn = object.fn || null;
		this.Xevent = object.Xevent || 'mouseover';
		this.spanArr = [];
		this.timer = null;
		this.sellTimer = null;
		this.i = 0;
		this.init();
	}

	Carousel.prototype.init = function () {
		let cut = document.createElement('div');
		for ( let i = 0; i < this.imgLe; i ++ ){
			let span = document.createElement('span');
			if ( i <= 0 ){
				span.classList.add(this.spanOn);
			}
			span.classList.add(this.spanClass);
			cut.appendChild(span);
			this.spanArr.push(span);
			this.img[i].style.width = this.f_width + 'px';			
		}
		cut.style.position = 'absolute';
		cut.style.bottom = 10 + 'px';
		cut.style.zIndex = 10;
		this.cut = cut;
		this.parent.style.position = 'relative';
		this.parent.style.overflow = 'hidden';
		this.parent.appendChild(cut);
		switch (this.spanPos) {
			case 'center':
				cut.style.left = this.f_width * 0.5 - cut.offsetWidth * 0.5 + 'px';
				break;
			case 'left':
				cut.style.left = '20px';
				break;
			case 'right':
				cut.style.right = '20px';
				break;
		}
		this.switched()[this.way]();
		this.sellTimer = setInterval( this.setInt.bind(this), this.times);
		this.cut.addEventListener( this.Xevent, this.click.bind(this) );
		if ( this.Xevent !== 'mouseover' ) {
			this.cut.addEventListener( 'mouseover', (e) => {
				let but = e.target,
					count = this.spanArr.indexOf(but),
					classN = but.className.search(this.spanOn);
				if ( count === -1 || classN !== -1 ){
					return;
				}
				but.classList.add(this.spanOver);
			})
			this.cut.addEventListener( 'mouseout', (e) => {
				let but = e.target;
				but.classList.remove(this.spanOver);
			})
		}		
		this.parent.addEventListener( 'mouseover', () => {
			clearInterval(this.sellTimer);
		})
		this.parent.addEventListener( 'mouseout', () => {
			this.sellTimer = setInterval( this.setInt.bind(this), this.times);
		})
	}

	Carousel.prototype.switched = function(){
		return {
			left: () => {
				let _div = this._div = wrap( this.img, this.parent );
				for ( let i = 0; i < this.imgLe; i ++ ){
					this.img[i].style.float = "left";
				}
				_div.style.transition = 'all .5s';
				_div.style.width = this.imgLe * this.f_width + 'px';
				_div.style.position = 'relative';
				_div.style.left = 0;
			},
			opacity: () => {
				this.parent.style.height = getStyle( this.img[0], 'height' );
				for ( let i = 0; i < this.imgLe; i ++ ){
					this.img[i].style.position = 'absolute';
					this.img[i].style.transition = 'all 1s';
					this.img[i].style.top = 0;
					this.img[i].style.left = 0;
					if ( i <= 0 ){
						this.img[i].style.opacity = '1';
					} else {
						this.img[i].style.opacity = '0';
					}
				}
			}
		}
	}

	Carousel.prototype.click = function(e) {
		let but = e.target,
			count = this.spanArr.indexOf(but);

		if ( count === -1 || but.className === this.spanOn ){
			return;
		}
		this.i = count;
		for ( let i = 0, le = this.spanArr.length; i < le; i ++ ) {
			this.spanArr[i].classList.remove(this.spanOn);
		}
		but.classList.add(this.spanOn);
		but.classList.remove(this.spanOver);
		if ( this.way === 'left' ) {
			// sport( this._div, { left: - this.i * this.f_width } );
			this._div.style.left = - this.i * this.f_width + "px";
		}
		if ( this.way === 'opacity' ) {
			for ( let i = 0; i < this.imgLe; i ++ ) {
				if ( getStyle( this.img[i], 'opacity' ) >= '0' ){
					this.img[i].style.opacity = '0'
				}
			}
			this.img[this.i].style.opacity = '1'
		}
		if (this.fn) {
			this.fn(this.i);
		}
	}

	Carousel.prototype.setInt = function() {
		this.i ++;
		if ( this.i >= this.spanArr.length ) {
			this.i = 0;
		}
		var but = this.spanArr[this.i];
		for ( let i = 0, le = this.spanArr.length; i < le; i ++ ) {
			this.spanArr[i].classList.remove(this.spanOn);
		}
		but.classList.add(this.spanOn);
		if ( this.way === 'left' ) {
			// sport( this._div, { left: - this.i * this.f_width } );
			this._div.style.left = - this.i * this.f_width + "px";
		}
		if ( this.way === 'opacity' ) {
			for ( let i = 0; i < this.imgLe; i ++ ) {
				if ( getStyle( this.img[i], 'opacity' ) >= '0' ){
					this.img[i].style.opacity = '0'
				}
			}
			this.img[this.i].style.opacity = '1'
		}
		if (this.fn) {
			this.fn(this.i);
		}
	}

	function wrap ( element, parent ){
		let div = document.createElement('div');
		for ( let i = 0, le = element.length; i < le; i ++ ) {
			let el = element[i];
			while ( true ){
				if ( el.parentNode !== parent ) {
					el = el.parentNode;
				} else {
					break;
				}
			}
			div.appendChild(el);
		}
		parent.appendChild(div);
		return div;
	}

	function getStyle ( element, attr ) {
		if ( element.currentStyle ) {
			return element.currentStyle[attr];
		} else {
			return window.getComputedStyle( element, null )[attr];
		}
  	}
    

	function sport ( curEl, curStyle = {}, fn ){
		function pino () {
			clearTimeout(this.timer);
			for ( let i in curStyle ) {
				let tStyle = parseInt( getStyle( curEl, i ) );
				let speed = ( curStyle[i] - tStyle ) / 8;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
				curEl.style[i] = tStyle + speed + 'px';
				if (speed === 0){
					return;
				}
			}
			this.timer = setTimeout( pino, 1000/60 )
		};
		pino()
	}

	content.Carousel = Carousel
})