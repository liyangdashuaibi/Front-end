(function(content){

	//用法new Screenshot(parent)	传入为字符串，id前面加#，class前面加.

	function Screenshot (parent) {
		this.box = document.querySelector(parent);
		this.img = this.box.querySelector('img') || null;
		this.c = canvas(this.box);
		this.bg = blackbg(this.box);
		this.c2 = canvas(this.bg);
		this.c3 = canvas( this.box, true );
		this.init();
	}

	content.Screenshot = Screenshot;

	Screenshot.prototype.init = function() {
		if ( !this.img ) return;

		document.onselectstart = function(){return false;};

		var x0, y0, x1, y1;
		var isDown = false, isImage = false, isDrag = false;

		var width, height;

		var img = new Image();
		img.src = this.img.src;
		img.onload = () => {
			width = img.width;
			height = img.height;
			this.c.width = width;
			this.c.height = height;
			this.box.style.width = width + 'px';
			this.box.style.height = height + 'px';
			this.bg.style.width = width + 'px';
			this.bg.style.height = height + 'px';
			isImage = true;
		}

		var ctx = this.c.getContext('2d');
		var ctx2 = this.c2.getContext('2d');
		var ctx3 = this.c3.getContext('2d');

		this.c.addEventListener( 'mousedown', (e) => {
			if ( !isImage ) return;
			e = e || window.event;
			isDown = true;
			x0 = e.pageX - this.box.offsetLeft;
			y0 = e.pageY - this.box.offsetTop;
		});

		this.c.addEventListener( 'mousemove',  (e) => {
			e = e || window.event;
			if ( !isDown ) return;
			ctx.clearRect( 0, 0, width, height );
			x1 = e.pageX - this.box.offsetLeft;
			y1 = e.pageY - this.box.offsetTop;
			if ( x1 <= 0 ) {
				x1 = 0;
			}
			if ( y1 <= 0 ) {
				y1 = 0;
			}
			drawLine( ctx, x0, y0, x1, y0 );  //上
			drawLine( ctx, x1, y1, x1, y0 );  //右
			drawLine( ctx, x1, y1, x0, y1 );  //下
      drawLine( ctx, x0, y0, x0, y1 );  //左
		});

		document.body.addEventListener( 'mouseup', (e) => {
			e = e || window.event;
			if ( !isDown ) return;
			isDown = false;
			this.bg.style.display = 'block';
			ctx.clearRect( 0, 0, width, height );
			if ( x0 > x1 ) {
                temp = x0;
                x0 = x1;
                x1 = temp;
            }
            if ( y0 > y1 ) {
                temp = y0;
                y0 = y1;
                y1 = temp;
			}
			this.c3.style.display = 'block';
			drawImg( this.c2, ctx2, this.img, x0, y0, x1, y1 );
			drawImg( this.c3, ctx3, this.img, x0, y0, x1, y1, true );
			// try {
				// let dataUrl = this.c2.toDataURL("image/jpg");
			// } catch (err) {
			// 	console.log(1)
			// }

		});

		var offsetX0, offsetX0, mL, mR, cWidth, cHeight;
		this.c2.addEventListener( 'mousedown', (e) => {
			e.stopPropagation();
			offsetX0 = e.pageX - this.box.offsetLeft;
			offsetY0 = e.pageY - this.box.offsetTop;
			mL = parseInt( getStyle( this.c2, 'marginLeft' ) );
			mR = parseInt( getStyle( this.c2, 'marginTop' ) );
			cWidth = parseInt( getStyle( this.c2, 'width' ) );
			cHeight = parseInt( getStyle( this.c2, 'height' ) );
			isDrag = true;
		})

		document.body.addEventListener( 'mousemove', (e) => {
			if ( !isDrag ) return;
			e.preventDefault();

			let offsetX = e.pageX - this.box.offsetLeft,
				offsetY = e.pageY - this.box.offsetTop;
			if ( offsetY < 0 ) {
				offsetY = 0;
			} else if ( offsetY > height ) {
				offsetY = height;
			}
			if ( offsetX < 0 ) {
				offsetX = 0;
			} else if ( offsetX > width ) {
				offsetX = width;
			}

			let moveX = offsetX - offsetX0,
				moveY = offsetY - offsetY0;

			let xoffset = moveX + mL,
				yoffset = moveY + mR;

			if ( offsetX0 - mL < 15 && offsetY0 - mR < 15 ) {
				let msL = mL + moveX,
					msR = mR + moveY;
				let xWidth = cWidth - moveX,
					xHeight = cHeight - moveY;
				this.c2.width = xWidth;
				this.c2.height = xHeight;
				this.c2.style.marginTop = msR + 'px';
				this.c2.style.marginLeft = msL + 'px';
				ctx2.drawImage( img, msL, msR, xWidth, xHeight, 0, 0, xWidth, xHeight);
				this.c3.width = xWidth;
				this.c3.height = xHeight;
				ctx3.drawImage( img, msL, msR, xWidth, xHeight, 0, 0, xWidth, xHeight);
				return false;
			}
			//左下
			if ( offsetX0 - mL < 15 && offsetY0 - mR > cHeight - 15 ) {
				let msL = mL + moveX;
				let xWidth = cWidth - moveX,
					xHeight = cHeight + moveY;
				this.c2.width = xWidth;
				this.c2.height = xHeight;
				this.c2.style.marginLeft = msL + 'px';
				ctx2.drawImage( img, msL, mR, xWidth, xHeight, 0, 0, xWidth, xHeight);
				this.c3.width = xWidth;
				this.c3.height = xHeight;
				ctx3.drawImage( img, msL, mR, xWidth, xHeight, 0, 0, xWidth, xHeight);
				return false;
			}
			//右下
			if ( offsetX0 - mL > cWidth - 15 && offsetY0 - mR > cHeight - 15 ) {
				let xWidth = cWidth + moveX,
					xHeight = cHeight + moveY;
				this.c2.width = xWidth;
				this.c2.height = xHeight;
				ctx2.drawImage( img, mL, mR, xWidth, xHeight, 0, 0, xWidth, xHeight);
				this.c3.width = xWidth;
				this.c3.height = xHeight;
				ctx3.drawImage( img, mL, mR, xWidth, xHeight, 0, 0, xWidth, xHeight);
				return false;
			}
			//右上
			if ( offsetX0 - mL > cWidth - 15 && offsetY0 - mR < 15 ) {
				let msR = mR + moveY;
				let xWidth = cWidth + moveX,
					xHeight = cHeight - moveY;
				this.c2.width = xWidth;
				this.c2.height = xHeight;
				this.c2.style.marginTop = msR + 'px';
				ctx2.drawImage( img, mL, msR, xWidth, xHeight, 0, 0, xWidth, xHeight);
				this.c3.width = xWidth;
				this.c3.height = xHeight;
				ctx3.drawImage( img, mL, msR, xWidth, xHeight, 0, 0, xWidth, xHeight);
				return false;
			}

			if ( xoffset < 0 ) {
				xoffset = 0;
			} else if ( xoffset > width - cWidth ){
				xoffset = width - cWidth;
			}
			if ( yoffset < 0 ) {
				yoffset = 0;
			} else if ( yoffset > height - cHeight ){
				yoffset = height - cHeight;
			}
			ctx2.drawImage( img, xoffset, yoffset, cWidth, cHeight, 0, 0, cWidth, cHeight);
			this.c2.style.marginTop = yoffset + 'px';
			this.c2.style.marginLeft = xoffset + 'px';

			ctx3.drawImage( img, xoffset, yoffset, cWidth, cHeight, 0, 0, cWidth, cHeight);
			return false;
		})

		document.body.addEventListener( 'mouseup', function (e) {
			isDrag = false;
		})

		this.bg.addEventListener( 'mousedown', function (e) {
			ctx.clearRect( 0, 0, width, height );
			ctx2.clearRect( 0, 0, width, height );
			ctx3.clearRect( 0, 0, width, height );
			this.style.display = "none";
		})
	};

	function drawImg ( canv, ctx, img, x0, y0, x1, y1, isTl ) {
		canv.width = x1 - x0;
		canv.height = y1 - y0;
		if ( !isTl ) {
			canv.style.marginTop = y0 + 'px';
			canv.style.marginLeft = x0 + 'px';
		}
		ctx.drawImage( img, x0, y0, x1 - x0, y1 - y0, 0, 0, x1 - x0, y1 - y0 );
	}

	function drawLine( ctx, x0, y0, x1, y1 ) {
		ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = 'white';
        ctx.stroke();
	}

	function canvas ( parent, istwo ) {
		var c = document.createElement('canvas');
		if ( !istwo ) {
			c.style.position = 'absolute';
			c.style.top = '0';
			c.style.left = '0';
			c.style.zIndex = '1';
			c.style.cursor = 'crosshair';
		} else {
			c.style.border = '1px solid black';
			c.style.display = 'none';
		}
		parent.appendChild(c);
		return c;
	}

	function blackbg (parent) {
		var black = document.createElement('div');
		black.style.position = 'absolute';
		black.style.top = '0';
		black.style.left = '0';
		black.style.zIndex = '10';
		black.style.background = 'rgba(0,0,0,0.8)';
		black.style.display = 'none';
		parent.appendChild(black);
		return black;
	}

	function getStyle(oDiv,name){
        if (oDiv.currentStyle) {
            return oDiv.currentStyle[name];
        } else {
            return getComputedStyle(oDiv, false)[name];
        }
    }
}(this))
