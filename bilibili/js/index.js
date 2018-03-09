(function () {
	let app = document.querySelector('#app');

	//顶部鼠标移入
	let headerM = app.querySelector('.bili-header-m');
	{
		let	nav_con = headerM.querySelectorAll('.nav-con');
		//iframe数据
		let iframeArr = {
			game: 'pageLayout/gameCenter.html',
			live: 'pageLayout/LiveBroadcast.html',
			mobile: {
				mobile: 'images/mobile1.png',
				xiaz: '../images/xiaz.png'
			}
		}
		//左
		{
			let lchilds = nav_con[0].querySelectorAll('li');
			for ( let j = 0, len = lchilds.length; j < len; j ++ ) {
				let li = lchilds[j], attr = obtainClass( li, 'class' )[1];
				if ( iframeArr[attr] != null ) {
					let timer = null;
					li.addEventListener( 'mouseover', function (e) {
						var oEvent = e || event;
						var oFrom = oEvent.fromElement || oEvent.relatedTarget;
						if ( this.contains(oFrom) ) return;
						clearTimeout(timer);
						if ( this.children.length > 1 ) {
							for ( let i = 0, le = this.children.length; i < le; i ++ ) {
								if ( this.children[i].className === 'i-frame' || this.children[i].className === 'app-orcode-box'  ) {
									timer =setTimeout( () => {
										this.children[i].style.display = 'block';
										sport( this.children[i], { top: 42, opacity: 100} )
									}, 400)
								}
							}
							return;
						}
						var div = document.createElement('div');
						if ( typeof iframeArr[attr] === 'string' ) {
							div.className = 'i-frame';
							div.innerHTML = '<iframe src="' + iframeArr[attr] + '" frameborder="0" width="100%" height="100%"></iframe>'
						} else {
							div.className = 'app-orcode-box';
							div.style.background = `url(${iframeArr[attr].mobile})`;
							document.styleSheets[0].addRule('.app-orcode-box:after', `background: url(${iframeArr[attr].xiaz})`)
						}
						
						timer = setTimeout( () => {
							this.appendChild(div);
						}, 400)
					})
					li.addEventListener( 'mouseout', function (e) {
						clearTimeout(timer)
						var oEvent = e || event;
					 	var oTo = oEvent.toElement||oEvent.relatedTarget;
						if ( this.contains(oTo) ) return;
						for ( let i = 0, le = this.children.length; i < le; i ++ ) {
							if ( this.children[i].className === 'i-frame' || this.children[i].className === 'app-orcode-box' ) {
								sport( this.children[i], { top: 50, opacity: 0 }, function(){
									this.children[i].style.display = 'none';
								}.bind(this))						
							}
						}
					})
				}
			}
		}
		//右
		{
			let rchilds = nav_con[1];
			rchilds.addEventListener( 'mouseover', function(e) {
				var oEvent = e || event;
				var navItem = ptarget( oEvent.target, 'nav-item' );
				var bubble = navItem.querySelector('.dd-bubble');
				var oFrom = oEvent.fromElement || oEvent.relatedTarget;
				if ( navItem.contains(oFrom) ) return;
				clearTimeout(bubble.timer);
				bubble.timer = setTimeout( () => {
					if ( navItem.classList.contains("profile-info") ) {
						var img = navItem.querySelector('.i-face');
						img.id = "if-face";
					}
					bubble.style.display = 'block';
					sport( bubble, { top: 42, opacity: 100 })
				}, 400)
			})
			rchilds.addEventListener( 'mouseout', function(e) {
				var oEvent = e || event;
				var navItem = ptarget( oEvent.target, 'nav-item' );
				var bubble = navItem.querySelector('.dd-bubble');
				var oTo = oEvent.toElement||oEvent.relatedTarget;
				if ( navItem.contains(oTo) ) return;
				if ( navItem.classList.contains("profile-info") ) {
					var img = navItem.querySelector('.i-face');
					img.id = '';
				}
				sport( bubble, { top: 50, opacity: 0 }, function(){
					bubble.style.display = 'none';
				})
			})
		}
	}

	// 动态
	{
		let dynDate = {
			0: {
				old: [ 18307639, 18295259, 18241564, 18182135, 18171839 ],
				news: [ 18049212, 18304467 ]
			},
			1: {
				old: [],
				news: []
			},
			2: {
				old: [],
				news: []
			} 
		}
		let dynamicM = headerM.querySelector('.dynamic-m'),
			dynMenu = dynamicM.querySelector('.dyn_menu'),
			menuLi = dynMenu.querySelectorAll('li'),
			line = dynMenu.querySelector('.line'),
			dynList = dynamicM.querySelector('.dyn_list_wrapper'),
			dynSpan = dynList.querySelectorAll('span'),
			dynHistory = dynList.querySelector('.history'),
			noData = dynList.querySelector('.no-data');

		let docFrameS0 = document.createDocumentFragment(),
			docFrameS1 = document.createDocumentFragment();
		let dynArr = {};
		let cLength = 0;
		let count = 0;
		
		for ( let i = 0, le = menuLi.length; i < le; i ++ ) {
			menuLi[i].addEventListener( 'click', function(e){
				dynToggle(i); 
			})
		}
		function dynImp ( { UserInfo: { Username }, VideoInfo: { Title, PicUrl, Aid } } ) {
			count ++;
			var li = document.createElement('li');
			li.className = "d-data";
			li.innerHTML = `<div class="preview v">
								<a href="javascript:;" title="${Title}">
									<img src="${PicUrl}">
									<div class="watch-later-trigger watch-later"></div>
								</a>
							</div>
							<div class="r">
								<div class="title">
									<a href="javascript:;">${Username}</a>
									<span>投稿了</span>
								</div>
								<div class="info">
									<a href="javascript:;" title="${Title}">${Title}</a>
								</div>
							</div>`;
			Aid = parseInt(Aid);
			let indexOld = dynArr.old.indexOf(Aid),
				indexNews = dynArr.news.indexOf(Aid);
			if ( indexOld !== -1 ) {
				docFrameS1.appendChild(li);
			} else if ( indexNews !== -1 ) {
				docFrameS0.appendChild(li);
			}
			if ( count >= cLength ) {
				count = 0; 
				dynSpan[1].appendChild(docFrameS1);
				dynSpan[0].appendChild(docFrameS0);
				
				dynHistory.style.display = 'block';
				noData.style.display = 'none';
			}
		}
		function dynToggle (i) {
			if ( menuLi[i].className === 'on' ) return;
			for ( let j = 0, le = menuLi.length; j < le; j ++ ) {
				menuLi[j].classList.remove('on');
			}
			menuLi[i].classList.add('on');
			line.style.left = 6 + i * 43 + 'px';

			dynSpan[0].innerHTML = "";
			dynSpan[1].innerHTML = "";

			let dynCache = { old: {}, news: {} };
			dynArr = dynDate[i];
			cLength = objLength(dynArr.old) + objLength(dynArr.news);
			ajaxModule( dynArr.old, dynImp, dynCache.old );
			ajaxModule( dynArr.news, dynImp, dynCache.news );
		}
		dynToggle(0);
	}
	
	//投稿
	{
		let upLoad = headerM.querySelector('.up-load'),
			up_nav = upLoad.querySelector('.up-nav');

		upLoad.addEventListener( 'mouseover', function (e) {
			var oEvent = e || event;
			var oFrom = oEvent.fromElement || oEvent.relatedTarget;
			if ( this.contains(oFrom) ) return;
			clearTimeout(up_nav.timer);
			up_nav.timer = setTimeout( function(){
				up_nav.style.display = 'block';
				sport( up_nav, { top: 42, opacity: 100 })
			}, 400)
		})
		upLoad.addEventListener( 'mouseout', function (e) {
			var oEvent = e || event;
			var oTo = oEvent.toElement || oEvent.relatedTarget;
			if ( this.contains(oTo) ) return;
			sport( up_nav, { top: 50, opacity: 0 }, function(){
				up_nav.style.display = 'none';
			})
		})
	}

	//轮播图
	{
		let carouselBox = app.querySelector('.carousel-box'),
			panel = carouselBox.querySelector('.panel');
		new Carousel( panel, { spanPos: 'right', Xevent: 'click', fn: function (i) {
			var title = this.parent.querySelector('.title');
			var a = title.querySelectorAll('a');
			for ( var j = 0; j < a.length; j ++ ) {
				a[j].classList.remove('on');
			}
			a[i].classList.add('on');
		}});
	}

	//稍等观看
	{
		app.addEventListener( 'click', function (e) {
			var trigger = e.target;
			if ( !trigger.classList.contains('w-later') ) return;
			e.preventDefault();
			if ( trigger.classList.contains('added') === true ) {
				trigger.classList.remove('added');
			} else {
				trigger.classList.add('added');
			}
		})
	}

	//轮播图右边
	{
		let chiefRec = app.querySelector('.chief-recommend-module');
		let recModule = chiefRec.querySelector('.recommend-module');
		let recBtn = recModule.querySelectorAll('.rec-btn');
		let recL = recBtn[0], recR = recBtn[1];
		let load = recModule.querySelector('.load');
		let status = 'threeDay';
		let statusObj = { 
			threeDay: '三日',
			yesterday: '昨日',
			week: '一周',
		}
		let weekData = [ 4143031, 18034023, 18037199, 18028176, 6825375, 180796, 18098984, 17837933 ];
		let yesterdayData = [ 17956529, 11037395, 17912406, 17911261, 17717908, 4495965, 17778266, 17725164 ];
		let threeDayData = [ 16672898, 18036687, 17985826, 15389322, 16874218, 14799014, 16193762, 3484033 ];
		let count = 0;
		let moduleCache = {};
		let docFrame = document.createDocumentFragment();
		let createMod = function ( { UserInfo: { Username }, VideoInfo: { Title, PicUrl, Aid } } ) {
			count ++;
			let href = "https://www.bilibili.com/video/av" + Aid;
			let play = ( Math.random() + Math.round( Math.random() * 10 ) ).toFixed(1);
			let div = document.createElement('div');
			div.className = "groom-module";
			div.innerHTML =    `<a href=${href} target="_blank" title=${Title}>
								<img src=${PicUrl} title=${Title} class="pic">
								<div class="card-mark">
									<p class="title">${Title}</p>
									<p class="author">up主：${Username}</p>
									<p class="play">播放：${play}万</p>	
								</div>
					    	</a>
					    	<div class="watch-later-trigger w-later"></div>`;
			docFrame.appendChild(div);
			if ( count >= threeDayData.length ) {
				count = 0;
				insertBe( recModule, docFrame );
				recL.style.display = "block";
				recR.style.display = "block";
				load.style.display = "none";
			}
		}
		ajaxModule( threeDayData, createMod, moduleCache );
		let resetModule = function () {
			var groomModule = recModule.querySelectorAll('.groom-module');
			for ( let j = 0, le = groomModule.length; j < le; j ++ ) {
				recModule.removeChild(groomModule[j]);
			}
			load.style.display = "block";
			recL.style.display = "none";
			recR.style.display = "none";
		}
		recL.addEventListener( 'click', function (e) {
			resetModule();
			switch ( status ) {
				case 'threeDay':
					status = 'yesterday';
					recL.innerHTML = statusObj.week;
					recR.innerHTML = statusObj.threeDay;
					break;
				case 'yesterday':
					status = 'week';
					recL.innerHTML = statusObj.threeDay;
					recR.innerHTML = statusObj.yesterday;
					break;
				case 'week':
					status = 'threeDay';
					recL.innerHTML = statusObj.yesterday;
					recR.innerHTML = statusObj.week;
					break;
			}
			var arr = eval( status + 'Data' );
			ajaxModule( arr, createMod, moduleCache );
		})
		recR.addEventListener( 'click', function (e) {
			resetModule();
			switch ( status ) {
				case 'threeDay':
					status = 'week';
					recR.innerHTML = statusObj.yesterday;
					recL.innerHTML = statusObj.threeDay;
					break;
				case 'yesterday':
					status = 'threeDay';
					recR.innerHTML = statusObj.week;
					recL.innerHTML = statusObj.yesterday;
					break;
				case 'week':
					status = 'yesterday';
					recR.innerHTML = statusObj.threeDay;
					recL.innerHTML = statusObj.week;
					break;
			}
			var arr = eval( status + 'Data' );
			ajaxModule( arr, createMod, moduleCache );
		})
	}

	//鼠标移入显示画面（功能类）
	{
		function lop (e) {
			var {x} = positionEl( e, this );
			var w = this.offsetWidth;
			var percent = ( x / w ).toFixed(2);
			this.span.style.width = percent * 100 + '%';
			var imagePercent = parseInt(this.dynImgle * percent);
			var width = 1, height = 0;
			var imagePercentArr = String(imagePercent).split('');
			switch (imagePercentArr.length) {
				case 1:
					width = imagePercent;
					break;
				case 2:
					height = imagePercentArr[0];
					width = imagePercentArr[1];
					break;
				case 3:
					height = Math.floor(imagePercent / 10);
					width = imagePercentArr[2];
			}
			this.cover.style.backgroundPosition = `-${width * 160}px -${height * 90}px`;
		}
		function spreadModuleHover (e) {
			var oEvent = e || event;
			var oFrom = oEvent.fromElement || oEvent.relatedTarget;
			if ( this.contains(oFrom) ) return;

			this.coverPreview = this.querySelector('.cover-preview');
			this.cover = this.coverPreview.querySelector('.cover');
			this.span = this.coverPreview.querySelector('span');
			this.timer = setTimeout( () => {
				this.coverPreview.classList.add('show');
				this.addEventListener( 'mousemove', lop );
			}, 1000)
		}
		function spreadModuleOut (e) {
			var oEvent = e || event;
			var oTo = oEvent.toElement || oEvent.relatedTarget;
			if ( this.contains(oTo) ) return;

			clearTimeout(this.timer);
			var coverPreview = this.querySelector('.cover-preview');
			coverPreview.classList.remove('show');
			this.removeEventListener('mousemove',lop);
		}
	}

	//推广
	{
		let popularizeModule = app.querySelector('.popularize-module');
		let storey = popularizeModule.querySelector('.storey-box');
		let load = storey.querySelector('.load');

		let storeyDate = [ 18110418, 18032771, 18080232, 18070321, 18101278 ];
		let storeyImageSize = { 
			18110418: 100,
			18032771: 100,
			18080232: 16,
			18070321: 35,
			18101278: 42
		}
		let storeyCache = {};
		let count = 0;
		let docFrame = document.createDocumentFragment();
		ajaxModule( storeyDate, function ( { UserInfo: { Username }, VideoInfo: { Title, PicUrl, Aid, Cid } } )  {
			let href = "https://www.bilibili.com/video/av" + Aid;
			let url = 'http://9bl.bakayun.cn/API/GetVideoUrl.php?cid=' + Cid + '&type=jsonp&quality=1'; 
			myFrame.jsonp( url, function ( { Result: { Url: { TimeLength: TimeLength } } } ) {
				count ++;
				let div = document.createElement('div');
				div.className = "spread-module";
				div.dynImgle = storeyImageSize[Aid];
				div.innerHTML =    `<a href="${href}" target="_blank">
										<div class="pic">
											<div class="lazy-img">
												<img alt=${Title} src=${PicUrl}>
											</div>
											<div class="cover-preview">
												<div class="cover" style="background-image:url(images/${Aid}.jpg@.webp)"></div>
												<div class="progress-bar"><span></span></div>
											</div>
											<div class="mask-video"></div>
											<span class="dur">${milliTurnMS(TimeLength)}</span>
											<div class="watch-later-trigger w-later"></div>
										</div>
										<p title="${Title}" class="t">${Title}</p>
									</a>`;
				docFrame.appendChild(div);
				div.addEventListener( 'mouseover', spreadModuleHover);
				div.addEventListener( 'mouseout', spreadModuleOut);
				if ( count >= storeyDate.length ) {
					storey.appendChild(docFrame);
					storey.removeChild(load);
				}
			})
		}, storeyCache );
	}

	//正在直播
	let biliLive = app.querySelector('.bili_live');
	{
		let storey = biliLive.querySelector('.storey-box');
		let liveData = [
			{
				Username: "如语Lanzy",
				Title: "不好听不要钱",
				PicUrl: "images/living0.jpg",
				HoverUrl: "images/livingH0.jpg",
				Name: "娱乐 · 唱见",
				Num: "1734",
			},
			{
				Username: "污DDDDDDD",
				Title: "FGO爆肝小霸王",
				PicUrl: "images/living1.jpg",
				HoverUrl: "images/livingH1.jpg",
				Name: "手游 · Fate/GO",
				Num: "1551",
			},
			{
				Username: "丶第六天萌王",
				Title: "开麦太累了T T",
				PicUrl: "images/living2.jpg",
				HoverUrl: "images/livingH2.jpg",
				Name: "游戏 · 300英雄",
				Num: "1.0万",
			},
			{
				Username: "早稻叽",
				Title: "突然开播~",
				PicUrl: "images/living3.jpg",
				HoverUrl: "images/livingH3.jpg",
				Name: "娱乐 · 唱见",
				Num: "998",
			},
			{
				Username: "37不是37",
				Title: "【37】仙界求生",
				PicUrl: "images/living4.jpg",
				HoverUrl: "images/livingH4.jpg",
				Name: "游戏 · 绝地求生：大逃杀",
				Num: "1.5万",
			},
			{
				Username: "七七七七七次郎",
				Title: "迟到了抱歉呀~",
				PicUrl: "images/living5.jpg",
				HoverUrl: "images/livingH5.jpg",
				Name: "娱乐 · 唱见",
				Num: "4643",
			},
			{
				Username: "Mo默明",
				Title: "探索艾迪芬奇的记忆",
				PicUrl: "images/living6.jpg",
				HoverUrl: "images/livingH6.jpg",
				Name: "游戏 · 其他游戏",
				Num: "8080",
			},
			{
				Username: "设计师Emotional",
				Title: "[宝藏世界]当设计师进入了求关注的世界~",
				PicUrl: "images/living7.jpg",
				HoverUrl: "images/livingH7.jpg",
				Name: "绘画 · 原创绘画",
				Num: "555",
			},
			{
				Username: "干物猫小圆",
				Title: "聚众吸猫",
				PicUrl: "images/living8.jpg",
				HoverUrl: "images/livingH8.jpg",
				Name: "娱乐 · 萌宠",
				Num: "2694",
			},
			{
				Username: "莓冶RINAKO",
				Title: "草莓粗不说话（•∞•）/",
				PicUrl: "images/living9.jpg",
				HoverUrl: "images/livingH9.jpg",
				Name: "绘画 · 同人绘画",
				Num: "233",
			},
		];
		let count = 0;
		let docFrame = document.createDocumentFragment();
		for ( let i = 0; i < liveData.length; i ++ ) {
			let div = document.createElement("div");
			div.classList.add("card-live-module");
			div.innerHTML = 	`<a href="javascript:;">
									<div class="pic">
										<div class="lazy-img">
											<img alt=${liveData[i].Title} src=${liveData[i].PicUrl}>
										</div>
										<div class="snum">
											<span class="auther">${liveData[i].Username}</span>
											<span class="online"><i></i> ${liveData[i].Num}</span>
										</div>
										<div class="mask" style="background-image: url(${liveData[i].HoverUrl})"></div>
									</div>
									<p title="${liveData[i].Title}" class="t">${liveData[i].Title}</p>
									<p class="num">${liveData[i].Name}</p>
								</a>`;
			docFrame.appendChild(div);
		}
		storey.appendChild(docFrame);
	}

	//正在直播右侧
	{
		let livingRankData = [
			{
				name: "宫本狗雨",
				title: "绝地大吃鸡",
				num: "10.0万",
				imgUrl: "images/livingRank1.jpg"
			},
			{
				name: "两仪滚",
				title: "【滚】罪域的骨终为王！",
				num: "9.9万",
				imgUrl: "images/livingRank2.jpg"
			},
			{
				name: "风竹教主解说",
				title: "不能均杀12场，玩什么吃鸡！",
				num: "7.3万",
				imgUrl: "images/livingRank3.jpg"
			},
			{
				name: "梦醒三声梦",
				title: "二狗带你看王者荣耀",
				num: "6.4万",
				imgUrl: "images/livingRank4.jpg"
			},
			{
				name: "这个黑岩不太冷",
				title: "李泽岩爱300",
				num: "3.5万",
				imgUrl: "images/livingRank5.jpg"
			},
			{
				name: "小天不是受QAQ",
				title: "(ฅ´ω`ฅ)玩！",
				num: "3.4万",
				imgUrl: "images/livingRank6.jpg"
			},
		];
		let rank = biliLive.querySelector('.rank');
		let docFrame = document.createDocumentFragment();
		for ( let i = 0; i < livingRankData.length; i ++ ) {
			let data = livingRankData[i];
			let div = document.createElement("div");
			div.classList.add("r-item");
			div.innerHTML =    `<span class="number">${ i + 1 }</span>
								<a href="javascript:;" class="preview">
									<div class="lazy-img">
										<img src=${data.imgUrl}>
									</div>
								</a>
								<a href="javascript:;">
									<div class="r-i">
										<p class="r-i-t">
											<span class="u-name">${data.name}</span>
											<span class="u-online">
												<i></i>
												<em>${data.num}</em>
											</span>
										</p>
										<div title=${data.title} class="r-i-st">${data.title}</div>
									</div>
								</a>`;
			docFrame.appendChild(div);
		}
		rank.appendChild(docFrame);

		let sliderBox = biliLive.querySelector('.slider-box');
		let panel = sliderBox.querySelector('.panel');
		new Carousel( panel, { spanPos: 'center', fn: function (i) {
			var title = this.parent.querySelector('.title');
			var a = title.querySelectorAll('a');
			for ( var j = 0; j < a.length; j ++ ) {
				a[j].classList.remove('on');
			}
			a[i].classList.add('on');
		}});

		let biliTab = biliLive.querySelector(".bili-tab"),
			tabCon = biliLive.querySelector(".tab-con"),
			biliTabItem = biliTab.querySelectorAll(".bili-tab-item");
		for ( let i = 0; i < biliTabItem.length; i ++ ) {
			biliTabItem[i].addEventListener( "click", function (e) {
				for ( let j = 0; j < biliTabItem.length; j ++ ) {
					biliTabItem[j].classList.remove("on");
				}
				this.classList.add("on");
				tabCon.style.marginLeft = - 260 * i + "px";
			})
		}
	}

	//动画
	let biliDouga = app.querySelector('.bili_douga');
	{
		let animaDynData1 = [ 810872, 18195604, 16009489, 11794899, 16714434, 1731700, 18226392, 1328701, 7531383, 17753447 ];
		let animaDynImgData1 = {
			810872: { play: "716.9万", danmu: "65.7万", durtime: "05:23", imgle: 100 },
			16009489: { play: "38.6万", danmu: "4714", durtime: "11:42", imgle: 100 },
			18195604: { play: "4.1万", danmu: "90", durtime: "01:31", imgle: 16 },
			11794899: { play: "1.8万", danmu: "1767", durtime: "34:37", imgle: 100 },
			16714434: { play: "5359", danmu: "163", durtime: "03:07", imgle: 32 },
			1731700: { play: "507.8万", danmu: "12.4万", durtime: "08:10", imgle: 100 },
			1328701: { play: "395.5万", danmu: "8.6万", durtime: "03:50", imgle: 100 },
			18226392: { play: "55.1万", danmu: "5590", durtime: "11:07", imgle: 100 },
			7531383: { play: "232.8万", danmu: "6329", durtime: "02:48", imgle: 100 },
			17753447: { play: "153.8万", danmu: "4.2万", durtime: "20:53", imgle: 100 }
		};
		let count1 = 0;
		let docFrame1 = document.createDocumentFragment();

		let animaDynData2 = [ 18156937, 18394394, 17498239, 15567633, 17226778, 18327392, 18130801, 4853715, 3222375, 18317790 ];
		let animaDynImgData2 = {
			18156937: { play: "750", danmu: "17", durtime: "05:56", imgle: 60 },
			18394394: { play: "2282", danmu: "213", durtime: "05:45", imgle: 58 },
			17498239: { play: "1.3万", danmu: "469", durtime: "03:07", imgle: 32 },
			15567633: { play: "13.0万", danmu: "1158", durtime: "05:15", imgle: 53 },
			17226778: { play: "15.1万", danmu: "5633", durtime: "04:53", imgle: 49 },
			18327392: { play: "1374", danmu: "14", durtime: "01:31", imgle: 16 },
			18130801: { play: "1.6万", danmu: "140", durtime: "08:29", imgle: 85 },
			4853715: { play: "67.0万", danmu: "7.0万", durtime: "29:09", imgle: 100 },
			3222375: { play: "95.6万", danmu: "8452", durtime: "02:46", imgle: 76 },
			18317790: { play: "1.7万", danmu: "479", durtime: "14:19", imgle: 51 }
		}
		let count2 = 0;
		let docFrame2 = document.createDocumentFragment();

		let storey = biliDouga.querySelector('.storey-box'),
			load = storey.querySelector(".load");
		function ajaxMo (data,dataImg,count,docFrame) {
			ajaxModule( data, function ( { UserInfo: { Username }, VideoInfo: { Title, PicUrl, Aid } } ) {
				count ++;
				Title = Title.replace( />/g, "&gt;" );
				let dynData = dataImg[Aid];
				let div = document.createElement("div");
				div.classList.add("spread-module");
				div.dynImgle = dynData.imgle;
				div.innerHTML =    `<a href="https://www.bilibili.com/video/av${Aid}" target="_blank">
										<div class="pic">
											<div class="lazy-img"><img alt=${Title} src=${PicUrl}></div>
											<i class="icon medal "></i>
											<div class="cover-preview">
												<div class="cover" style="background-image: url(images/${Aid}.jpg@.webp)"></div>
												<div class="progress-bar"><span style="width: 0%;"></span></div>
											</div>
											<div class="mask-video"></div>
											<span class="dur">${dynData.durtime}</span>
											<div class="watch-later-trigger w-later"></div>
										</div>
										<p title=${Title} class="t">${Title}</p>
										<p class="num">
											<span class="play"><i class="icon"></i>${dynData.play}</span>
											<span class="danmu"><i class="icon"></i>${dynData.danmu}</span>
										</p>
									</a>`
				docFrame.appendChild(div);
				div.addEventListener( 'mouseover', spreadModuleHover);
				div.addEventListener( 'mouseout', spreadModuleOut);
				if ( count >= data.length ) {
					storey.appendChild(docFrame);
					load.style.display = "none";
				}
			})
		}

		ajaxMo( animaDynData1, animaDynImgData1, count1, docFrame1 );
		
		let zoneTitle = biliDouga.querySelector('.zone-title'),
			biliTab = zoneTitle.querySelector('.bili-tab'),
			biliTabItem = biliTab.querySelectorAll('.bili-tab-item');
		for ( let i = 0; i < biliTabItem.length; i ++ ) {
			biliTabItem[i].addEventListener( "click", function () {
				for ( let j = 0; j < biliTabItem.length; j ++ ) {
					biliTabItem[j].classList.remove("on");
				}
				this.classList.add("on");
				let spreadModule = storey.querySelectorAll(".spread-module");
				load.style.display = "block";
				for ( let j = 0, le = spreadModule.length; j < le; j ++ ) {
					storey.removeChild(spreadModule[j]);
				}
				ajaxMo( eval( "animaDynData" + (i + 1) ), eval( "animaDynImgData" + (i + 1) ), eval( "count" + (i + 1) ), eval( "docFrame" + (i + 1) ) );
			})
		}
	}

	//动画右侧
	{
		let zoneRank = biliDouga.querySelector(".zone-rank");
		let zoneRankDynData = [
			{ Aid: 18182135, rank: 1, date: "2018-01-11 12:00", play: "163.8万", danmu: "2.2万", time: "13:10", shouc: "6.7万", yinb: "9.9万", score: "170.5万" },
			{ Aid: 18226392, rank: 2, date: "2018-01-12 20:06", play: "56.3万", danmu: "5653", time: "11:07", shouc: "5.7万", yinb: "7.7万", score: "103.8万" },
			{ Aid: 18211792, rank: 3, date: "2018-01-12 17:00", play: "72.4万", danmu: "7742", time: "11:51", shouc: "3.7万", yinb: "5.1万", score: "95.9万" },
			{ Aid: 18391465, rank: 4, date: "2018-01-17 11:30", play: "12.1万", danmu: "567", time: "08:20", shouc: "4.2万", yinb: "6.6万", score: "77.9万" },
			{ Aid: 18313733, rank: 5, date: "2018-01-14 21:54", play: "50.3万", danmu: "4754", time: "14:14", shouc: "1.8万", yinb: "3.1万", score: "60.2万" },
			{ Aid: 18231092, rank: 6, date: "2018-01-12 18:48", play: "38.3万", danmu: "2719", time: "13:55", shouc: "2.3万", yinb: "2.2万", score: "56.2万" },
			{ Aid: 18203262, rank: 7, date: "2018-01-11 21:04", play: "45.4万", danmu: "3935", time: "12:32", shouc: "1.7万", yinb: "1.8万", score: "55.8万" },
		]
		let count1 = 0, count2 = 0;
		let docFrame1 = document.createDocumentFragment(),
			docFrame2 = document.createDocumentFragment();

		let rankList = zoneRank.querySelectorAll(".rank-list");

		for ( let j = 0, len = rankList.length; j < len; j ++ ) {
			let count = eval( "count" + ( j + 1 ) );
			for ( let i = 0, le = zoneRankDynData.length; i < le; i ++ ) {
				let data = zoneRankDynData[i];
				let url = "http://9bl.bakayun.cn/API/GetVideoInfo.php?aid=" + data.Aid + "&type=jsonp";
				let li = document.createElement("li");
				li.className = "rank-item" + ( data.rank <= 3 ? ( " highlight" + ( data.rank === 1 ? " first show-detail" : "" ) ) : "" );
				let docFrame = eval( "docFrame" + ( j + 1 ) );
				docFrame.appendChild(li);
				myFrame.jsonp( url, function ( { Result } ) {
					let { UserInfo: { Username }, VideoInfo: { Title, PicUrl, Aid }, Describe } = Result;
					count ++;
					li.innerHTML = `<i class="ri-num">${data.rank}</i>
									<a href="javascript:;" title=${ Title + "播放:" + data.time} class="ri-info-wrap clearfix">
										${ ( data.rank === 1 ? `<div class='lazy-img ri-preview'><img alt=${Title} src=${PicUrl}></div>` : "" ) }
										<div class="ri-detail">
											<p class="ri-title">${Title}</p>
											<p class="ri-point">综合评分：${data.score}</p>
										</div>
										${ ( data.rank === 1 ? `<div class="watch-later-trigger w-later"></div>` : "" ) }
									</a>`;
					li.addEventListener( "mouseover" , function (e) { 
						var oEvent = e || event;
						var oFrom = oEvent.fromElement || oEvent.relatedTarget;
						if ( this.contains(oFrom) ) return;
						this.timer = setTimeout( () => {
							var { x, y } = this.getBoundingClientRect();
							data.x = x; data.y = y + document.documentElement.scrollTop;
							addEventOverLi(data, Result, i) ;
						}, 800)
					});
					li.addEventListener( "mouseout" , function (e) {
						var oEvent = e || event;
						var oTo = oEvent.toElement || oEvent.relatedTarget;
						if ( this.contains(oTo) ) return;
						clearTimeout(this.timer);
						addEventOutLi();
					});

					if ( count >= le ) {
						count = 0;
						rankList[j].appendChild(docFrame);
					}
				})
			}
		}
		let addEventOverLi = function ( data, result, i ) {
			let { UserInfo: { Username }, VideoInfo: { Title, PicUrl, Aid, Describe } } = result;
			let div = document.createElement("div");
			div.className = "video-info-module";
			div.innerHTML =    `<div class="v-title">${Title}</div>
								<div class="v-info">
									<span class="name">${Username}</span>
									<span class="line"></span>
									<span class="time">${data.date}</span>
								</div>
								<div class="v-preview clearfix">
									<div class="lazy-img">
										<img src=${PicUrl}>
									</div>
									<p class="txt">${Describe}</p>
								</div>
								<div class="v-data">
									<span class="play"><i class="icon"></i>${data.play}</span>
									<span class="danmu"><i class="icon"></i>${data.danmu}</span>
									<span class="star"><i class="icon"></i>${data.shouc}</span>
									<span class="coin"><i class="icon"></i>${data.yinb}</span>
								</div>`;
			app.appendChild(div);
			div.style.left = data.x + "px";
			div.style.top = data.y - div.offsetHeight - 10 + "px";
			
		}
		let addEventOutLi = function () {
			if ( app.querySelector(".video-info-module") ) app.removeChild(app.querySelector(".video-info-module"));
		}

		let biliTab = zoneRank.querySelector(".bili-tab"),
			biliTabItem = biliTab.querySelectorAll(".bili-tab-item"),
			rankListWrap = zoneRank.querySelector(".rank-list-wrap");
		for ( let i = 0, le = biliTabItem.length; i < le; i ++ ) {
			biliTabItem[i].addEventListener( "mouseover", function (e) {
				for ( let j = 0; j < le; j ++ ) {
					biliTabItem[j].classList.remove("on");
				}
				biliTabItem[i].classList.add("on");
				rankListWrap.style.marginLeft = -100 * i + "%";
			})
		};

		let rankDropdown = zoneRank.querySelector(".rank-dropdown"),
			selected = rankDropdown.querySelector(".selected"),
			dropdownList = rankDropdown.querySelector(".dropdown-list"),
			dropdownItem = dropdownList.querySelectorAll(".dropdown-item");
		for ( let i = 0, le = dropdownItem.length; i < le; i ++ ) {
			dropdownItem[i].addEventListener( "click", function (e) {
				selected.innerHTML = this.innerHTML;
				for ( let j = 0; j < le; j ++ ) {
					dropdownItem[j].style = "";
				}
				this.style.display = "none";
			})
		}
	}

	//番剧
	let biliBangumi = app.querySelector(".bili_bangumi");
	{
		let bangumiTimingModule = biliBangumi.querySelector(".bangumi-timing-module");
		let timingBox = bangumiTimingModule.querySelector(".timing-box");
		
		let weekData = {
			0: [
				{ title: "紫罗兰的永恒花园", imgUrl: "images/newBangumi1.jpg", jishu: 2, istoday: true },
				{ title: "OVERLORDⅡ", imgUrl: "images/newBangumi2.jpg", jishu: 2 },
				{ title: "比宇宙更远的地方", imgUrl: "images/newBangumi3.jpg", jishu: 3 },
				{ title: "少年阿贝 GO!GO!小芝麻 第二季", imgUrl: "images/newBangumi4.jpg", jishu: 28 },
				{ title: "樱花忍法帖", imgUrl: "images/newBangumi5.jpg", jishu: 2 },
				{ title: "龙王的工作！", imgUrl: "images/newBangumi6.jpg", jishu: 2 },
				{ title: "刻刻", imgUrl: "images/newBangumi7.jpg", jishu: 2 },
				{ title: "續 刀劍亂舞 -花丸-（僅限港澳台）", imgUrl: "images/newBangumi8.jpg", jishu: 2 },
				{ title: "三颗星彩色冒险", imgUrl: "images/newBangumi9.jpg", jishu: 2 },
				{ title: "IDOLiSH7-偶像星愿-", imgUrl: "images/newBangumi10.jpg", jishu: 4 },
				{ title: "魔卡少女樱 CLEAR CARD篇", imgUrl: "images/newBangumi11.jpg", jishu: 2 },
				{ title: "原书·原书使", imgUrl: "images/newBangumi16.jpg", jishu: 1 },
				{ title: "pop子和pipi美的日常", imgUrl: "images/newBangumi12.jpg", jishu: 2 },
				{ title: "魔法使的新娘（僅限台灣地區）", imgUrl: "images/newBangumi13.jpg", jishu: 14 },
				{ title: "DARLING in the FRANXX（僅限港澳台地區）	", imgUrl: "images/newBangumi14.jpg", jishu: 1 },
				{ title: "Slow Start", imgUrl: "images/newBangumi15.jpg", jishu: 2 },
			],
			1: [
				{ title: "龙王的工作！", imgUrl: "images/newBangumi6.jpg", jishu: 2 },
				{ title: "刻刻", imgUrl: "images/newBangumi7.jpg", jishu: 2 },
				{ title: "續 刀劍亂舞 -花丸-（僅限港澳台）", imgUrl: "images/newBangumi8.jpg", jishu: 2 },
				{ title: "樱花忍法帖", imgUrl: "images/newBangumi5.jpg", jishu: 2 }
			],
			2: [
				{ title: "OVERLORDⅡ", imgUrl: "images/newBangumi2.jpg", jishu: 2 },
				{ title: "比宇宙更远的地方", imgUrl: "images/newBangumi3.jpg", jishu: 3 },
				{ title: "少年阿贝 GO!GO!小芝麻 第二季", imgUrl: "images/newBangumi4.jpg", jishu: 28 }
			],
			3: [],
			4: [
				{ title: "紫罗兰的永恒花园", imgUrl: "images/newBangumi1.jpg", jishu: 2, istoday: true },
				{ title: "爱吃拉面的小泉同学", imgUrl: "images/newBangumi17.jpg", jishu: 2 },
				{ title: "原书·原书使", imgUrl: "images/newBangumi16.jpg", jishu: 1 }
			],
			5: [
				{ title: "粗点心战争2", imgUrl: "images/newBangumi18.jpg", jishu: 1 },
				{ title: "小木乃伊到我家", imgUrl: "images/newBangumi19.jpg", jishu: 1 },
				{ title: "博多豚骨拉面团", imgUrl: "images/newBangumi20.jpg", jishu: 1 },
				{ title: "刀使巫女", imgUrl: "images/newBangumi21.jpg", jishu: 2 },
				{ title: "妖精森林的小不点", imgUrl: "images/newBangumi22.jpg", jishu: 1 },
				{ title: "宅饮", imgUrl: "images/newBangumi23.jpg", jishu: 1 },
				{ title: "打工小哥", imgUrl: "images/newBangumi24.jpg", jishu: 1 },
			],
			6: [
				{ title: "戒律的复活", imgUrl: "images/newBangumi25.jpg", jishu: 1 },
				{ title: "citrus～柑橘味香气～", imgUrl: "images/newBangumi26.jpg", jishu: 2 },
				{ title: "皇帝圣印战记", imgUrl: "images/newBangumi27.jpg", jishu: 2 },
				{ title: "三丽鸥男子", imgUrl: "images/newBangumi28.jpg", jishu: 2 },
				{ title: "Dies irae 神怒之日（僅限港澳台地區）", imgUrl: "images/newBangumi29.jpg", jishu: 11 },
				{ title: "Classica Loid 第二季", imgUrl: "images/newBangumi30.jpg", jishu: 15 },
				{ title: "时间飞船24 逆袭的三恶人", imgUrl: "images/newBangumi31.jpg", jishu: 14 },
				{ title: "暖暖日记 2nd", imgUrl: "images/newBangumi32.jpg", jishu: 92 },
				{ title: "怪物弹珠 第二季 后篇", imgUrl: "images/newBangumi33.jpg", jishu: 13 },
				{ title: "DRIVE HEAD 机动救急警察", imgUrl: "images/newBangumi34.jpg", jishu: 37 },
			],
			7: [
				{ title: "魔卡少女樱 CLEAR CARD篇", imgUrl: "images/newBangumi11.jpg", jishu: 2 },
				{ title: "Fate/EXTRA Last Encore", imgUrl: "images/newBangumi35.jpg" },
				{ title: "pop子和pipi美的日常", imgUrl: "images/newBangumi12.jpg", jishu: 2 },
				{ title: "Slow Start", imgUrl: "images/newBangumi15.jpg", jishu: 2 },
				{ title: "3月的狮子 第二季", imgUrl: "images/newBangumi36.jpg", jishu: 35 },
				{ title: "魔法使的新娘（僅限台灣地區）", imgUrl: "images/newBangumi13.jpg", jishu: 14 },
				{ title: "三颗星彩色冒险", imgUrl: "images/newBangumi9.jpg", jishu: 2 },
				{ title: "IDOLiSH7-偶像星愿-", imgUrl: "images/newBangumi10.jpg", jishu: 4 },
				{ title: "DARLING in the FRANXX（僅限港澳台地區）	", imgUrl: "images/newBangumi14.jpg", jishu: 1 }
			]
		}
		function geneRate (arrData) {
			let docFrame = document.createDocumentFragment();
			for ( let i = 0, le = arrData.length; i < le; i ++ ) {
				let { title, imgUrl, jishu, istoday } = arrData[i];
				let div = document.createElement("div");
				title = title.replace( /\s/g, "&nbsp;");
				div.className = "card-timing-module clearfix card-timing";
				div.innerHTML =    `<a href="javascript:;" title=${title} class="pic">
										<div class="lazy-img">
											<img src=${imgUrl} alt=${title}>
										</div>
									</a>
									<div class="r-text">
										<a href="javascript:;" title=${title} class="t">${title}</a>
										<p class="update ${ istoday === true ? " on" : "" }">
											<span>更新至<a href="javascript:;">${ jishu != null ? jishu + "话" : "尚未更新"}</a></span>
										</p>
									</div>`;
				docFrame.appendChild(div);
			}
			timingBox.appendChild(docFrame);
		}
		geneRate(weekData[0]);

		let biliTab = bangumiTimingModule.querySelector(".bili-tab"),
			biliTabItem = biliTab.querySelectorAll(".bili-tab-item");

		for ( let i = 0, le = biliTabItem.length; i < le; i ++ ) {
			biliTabItem[i].addEventListener( "click", function (e) {
				for ( let j = 0; j < le; j ++ ) {
					biliTabItem[j].classList.remove("on");
					biliTabItem[j].innerHTML = biliTabItem[j].innerHTML.replace( /周/g, "");
				}
				this.classList.add("on");
				this.innerHTML = i > 0 ? ( "周" + this.innerHTML ) : this.innerHTML;	
				if (weekData[i].length <= 0) {
					timingBox.innerHTML = "<div class='empty-status'><p>今天没有番剧更新</p></div>";
				} else {
					timingBox.innerHTML = "";
					geneRate(weekData[i]);
				}
			})
		}
	}

	//番剧右侧
	{
		let zoneRank = biliBangumi.querySelector(".zone-rank"),
			rankList = biliBangumi.querySelector(".bangumi-rank-list");

		let rankData = [
			[
				{ title: "OVERLORDⅡ", imgUrl: "images/newBangumi2.jpg", jishu: 2, play: "630.5万", danmu: "9.3万", shouc: "192.0万" },
				{ title: "紫罗兰的永恒花园", imgUrl: "images/newBangumi1.jpg", jishu: 2, play: "657.2万", danmu: "9.6万", shouc: "262.5万" },
				{ title: "龙王的工作！", imgUrl: "images/newBangumi6.jpg", jishu: 2, play: "303.1万", danmu: "8.9万", shouc: "88.2万" },
				{ title: "魔卡少女樱 CLEAR CARD篇", imgUrl: "images/newBangumi11.jpg", jishu: 2, play: "560.9万", danmu: "24.5万", shouc: "189.5万" },
				{ title: "OVERLORD", imgUrl: "images/newBangumi37.jpg", jishu: 13, play: "7347.9万", danmu: "121.2万", shouc: "134.2万" },
				{ title: "小木乃伊到我家", imgUrl: "images/newBangumi19.jpg", jishu: 1, play: "90.9万", danmu: "1.6万", shouc: "47.2万" },
				{ title: "pop子和pipi美的日常", imgUrl: "images/newBangumi12.jpg", jishu: 2, play: "271.2万", danmu: "4.9万", shouc: "44.7万" },
				{ title: "比宇宙更远的地方", imgUrl: "images/newBangumi3.jpg", jishu: 3, play: "165.6万", danmu: "4.3万", shouc: "40.1万" },
				{ title: "刻刻", imgUrl: "images/newBangumi7.jpg", jishu: 2, play: "183.3万", danmu: "1.9万", shouc: "55.2万" },
				{ title: "爱吃拉面的小泉同学", imgUrl: "images/newBangumi17.jpg", jishu: 2, play: "265.7万", danmu: "6.3万", shouc: "59万" }
			],
			[
				{ title: "紫罗兰的永恒花园", imgUrl: "images/newBangumi1.jpg", jishu: 2, play: "657.2万", danmu: "9.6万", shouc: "262.5万" },
				{ title: "OVERLORDⅡ", imgUrl: "images/newBangumi2.jpg", jishu: 2, play: "630.5万", danmu: "9.3万", shouc: "192.0万" },
				{ title: "魔卡少女樱 CLEAR CARD篇", imgUrl: "images/newBangumi11.jpg", jishu: 2, play: "560.9万", danmu: "24.5万", shouc: "189.5万" },
				{ title: "戒律的复活", imgUrl: "images/newBangumi25.jpg", jishu: 1, play: "138.8万", danmu: "1.5万", shouc: "78.9万" },
				{ title: "龙王的工作！", imgUrl: "images/newBangumi6.jpg", jishu: 2, play: "303.1万", danmu: "8.9万", shouc: "88.2万" },
				{ title: "OVERLORD", imgUrl: "images/newBangumi37.jpg", jishu: 13, play: "7347.9万", danmu: "121.2万", shouc: "134.2万" },
				{ title: "pop子和pipi美的日常", imgUrl: "images/newBangumi12.jpg", jishu: 2, play: "271.2万", danmu: "4.9万", shouc: "44.7万" },
				{ title: "小木乃伊到我家", imgUrl: "images/newBangumi19.jpg", jishu: 1, play: "90.9万", danmu: "1.6万", shouc: "47.2万" },
				{ title: "citrus～柑橘味香气～", imgUrl: "images/newBangumi26.jpg", jishu: 2, play: "229.2万", danmu: "8.2万", shouc: "78.1万" },
				{ title: "刻刻", imgUrl: "images/newBangumi7.jpg", jishu: 2, play: "183.3万", danmu: "1.9万", shouc: "55.2万" }
			]
		]


		function createRinkItem (i) {
			let docFrame = document.createDocumentFragment();
			let data = rankData[i];
			for ( let i = 0, le = data.length; i < le; i ++ ) {
				let { title, jishu, play } = data[i];
				let li = document.createElement("li");
				li.className = "rank-item" + ( i <= 3 ? " highlight" : "" );
				li.innerHTML = `<i class="ri-num">${i+1}</i>
								<a href="javascript:;" title="${title} 播放:${play}" class="ri-info-wrap">
									<p class="ri-title">${title}</p>
									<span class="ri-total">更新至第${jishu}话</span>
								</a>`;
				docFrame.appendChild(li);
			}
			rankList.appendChild(docFrame);
		}
		createRinkItem(0);

		let rankDropdown = zoneRank.querySelector(".rank-dropdown"),
			selected = rankDropdown.querySelector(".selected"),
			dropdownList = rankDropdown.querySelector(".dropdown-list"),
			dropdownItem = dropdownList.querySelectorAll(".dropdown-item");
		for ( let i = 0, le = dropdownItem.length; i < le; i ++ ) {
			dropdownItem[i].addEventListener( "click", function (e) {
				rankList.innerHTML = "";
				selected.innerHTML = this.innerHTML;
				for ( let j = 0; j < le; j ++ ) {
					dropdownItem[j].style = "";
				}
				this.style.display = "none";
				createRinkItem(i);
			})
		}


		let addEventOverLi = function( data, i, j ) {
			let div = document.createElement("div");
			let { title, imgUrl, jishu, play, danmu, shouc } = data;
			div.className = "bangumi-info-module";
			div.innerHTML =    `<div class="v-preview" clearfix>
									<div class="lazy-img cover">
										<img alt=${title} src=${imgUrl}>
									</div>
									<p class="title">${title}</p>
									<p class="desc">连载中，更新至第${jishu}话</p>
								</div>
								<div class="v-data">
									<span class="play"><i class="icon"></i>${play}</span>
									<span class="danmu"><i class="icon"></i>${danmu}</span>
									<span class="fav"><i class="icon"></i>${shouc}</span>
								</div>`;
			app.appendChild(div);
			div.style.left = data.x + "px";
			div.style.top = data.y - div.offsetHeight - 10 + "px";
		}

		let overData = [];
		let timer;
		rankList.addEventListener( "mouseover" , function (e) { 
			var oEvent = e || event;
			let oE = ptarget( oEvent.target, "rank-item" );
			let arr = rankList.querySelectorAll(".rank-item");
			for ( var j = 0; j < dropdownItem.length; j ++ ) {
				if ( dropdownItem[j].innerHTML === selected.innerHTML ) break;
			}
			for ( var i = 0; i < arr.length; i ++ ) {
			    if ( oE === arr[i] ) break;
			}
			if ( i >= 10 ) return;
			timer = setTimeout( () => {
				let data = rankData[j][i];
				let { x, y } = oE.getBoundingClientRect();
				data.x = x; data.y = y + document.documentElement.scrollTop;
				addEventOverLi( data ,i, j );
			}, 800);
		});
		rankList.addEventListener( "mouseout" , function (e) {
			var oEvent = e || event;
			let oE = ptarget( oEvent.target, "rank-item" );
			clearTimeout(timer);
			if ( app.querySelector(".bangumi-info-module") ) app.removeChild(app.querySelector(".bangumi-info-module"));
		});
	}

	//侧边栏
	{
		let elevatorModule = app.querySelector(".elevator-module"),
			navList = elevatorModule.querySelector(".nav-list"),
			sortable = navList.querySelectorAll(".sortable");

		let zoneWrapModule = app.querySelectorAll(".zone-wrap-module");

		//点击跳转
		{
			navList.addEventListener( "click",  clickJump);

			function clickJump ( e = window.event ) {
				let eT = e.target;
				if ( eT.className === "item sortable" ) {
					for ( let i = 0, le = sortable.length; i < le; i ++ ) {
						sortable[i].classList.remove("on");
					}
					let sortI;
					sortable.forEach( function ( item, index ) {
						if ( eT === item ) {
							sortI = index;
						}
					})
					eT.classList.add("on");
					let scroll = zoneWrapModule[sortI].offsetTop;
					addEventScrollTo(scroll);
				}
			}
		}

		//滚动切换
		{
			window.onscroll = scrollSwitch;

			function scrollSwitch () {
				let currentScroll = getScrollTop() + 200;
				for ( let i = 0, le = zoneWrapModule.length; i < le; i ++ ) {
					let offsetTop = zoneWrapModule[i].offsetTop;
					if ( i > 0 ){
						let offsetOldTop = zoneWrapModule[i-1].offsetTop;
						if ( currentScroll < offsetTop && currentScroll >= offsetOldTop ) {
							for ( let i = 0, le = sortable.length; i < le; i ++ ) {
								sortable[i].classList.remove("on");
							}
							if ( getScrollTop() + getWindowHeight() == getScrollHeight() ) {
								sortable[le-1].classList.add("on");
								return;
							}
							sortable[ i - 1 ].classList.add("on");
							return;
						} else if ( currentScroll > offsetTop ) {
							for ( let i = 0, le = sortable.length; i < le; i ++ ) {
								sortable[i].classList.remove("on");
							}
							sortable[i].classList.add("on");
						} 
					} else {
						if ( currentScroll < offsetTop ) {
							for ( let i = 0, le = sortable.length; i < le; i ++ ) {
								sortable[i].classList.remove("on");
							}
						}
					}
				}
			}
		} 

		//排序
		{
			let navBg = elevatorModule.querySelector(".nav-bg");
			let customize = navList.querySelector(".customize");

			let div = document.createElement("div");
				div.classList.add("elevator-mask");
			div.addEventListener( "click", addDisNone );

			customize.addEventListener( "click", function () {
				if ( navBg.classList.contains("open") ) {
					addDisNone();
				} else {
					addDisBlock();
				}
			})
			//点击排序
			function addDisBlock () {
				navBg.classList.add("open");
				elevatorModule.classList.add("edit-state");
				document.body.appendChild(div);
				div.style.display = "block";
				sport( div, { "opacity": 100 } );
				navList.removeEventListener( "click", clickJump );
				navList.addEventListener( "mousedown", addSortdownMove);
				window.onscroll = "";
				sortable.forEach( function (item) {
					item.classList.remove("on");
				})
			}
			function addDisNone () {
				sport( div, { "opacity": 0 }, function () {
					document.body.removeChild(div);
				});
				elevatorModule.classList.remove("edit-state");
				navBg.classList.remove("open");
				navList.addEventListener( "click", clickJump );
				zoneWrapModule = app.querySelectorAll(".zone-wrap-module");
				sortable = navList.querySelectorAll(".sortable");
				window.onscroll = scrollSwitch;
				window.scrollTo( 0, getScrollTop() - 0.001 );
			}

			//拖动sortable
			let hold = document.createElement("div");
			hold.classList.add("item","hold");

			let that;			//被点击的元素
			let isUpDown;		//判断是从上还是往下
			let eIndex;			//被点击的元素的位置
			function addSortdownMove ( e = window.event ) {
				e.preventDefault();
				let eT = e.target;
				if ( eT.classList.contains("sortable") ) {
					zoneWrapModule = app.querySelectorAll(".zone-wrap-module");
					sortable = navList.querySelectorAll(".sortable");
					that = e.target;
					sortable.forEach( function ( item, index ){
						if ( that === item ) {
							eIndex = index;			
						}
					})
					insertAfter( hold, that );
					that.classList.add("select");
					document.addEventListener( "mousemove", addSortOverMove );
					document.addEventListener( "mouseup", addSortupMove );
				}
			}
			function addSortOverMove ( e = window.event ) {
				let { height } = that.getBoundingClientRect();
				let { y } = positionEl( e, navList );
				that.style.top = y - height / 2 + "px";
				for ( let i = 0, le = sortable.length; i < le; i ++ ) {
					let up = sortable[i].offsetTop,
						down = up + 32;
					if ( y <= up && y >= up - 5 ) {
						isUpDown = "up";
					}
					if (  y >= down && y <= down + 5 ) {
						isUpDown = "down";
					}
					if ( y > up && y < down && sortable[i] !== that ) {
						if ( isUpDown ) {
							switch ( isUpDown ) {
								case "up":
									insertBefore( sortable[i], that );
									insertAfter( hold, that );
									break;
								case "down":
									insertAfter( sortable[i], that );
									insertAfter( hold, that );
									break;
							}
						}
					}
				}
			}
			function addSortupMove () {
				document.removeEventListener( "mousemove", addSortOverMove );
				document.removeEventListener( "mouseup", addSortupMove );
				zoneWrapModule = app.querySelectorAll(".zone-wrap-module");
				sortable = navList.querySelectorAll(".sortable");
				
				sortable.forEach( function ( item, index ){
					if ( that === item ) {
						if ( eIndex > index ) {
							insertBefore( zoneWrapModule[eIndex], zoneWrapModule[index] );
						} else if ( eIndex < index ) {
							insertAfter( zoneWrapModule[eIndex], zoneWrapModule[index] );
						}
					}
				})
				that.classList.remove("select");
				that.style = {};
				navList.removeChild(hold);
			}
		}

		//跳转函数
		function addEventScrollTo (top) {
			let speed = getScrollTop() - top
			function BuiltIn () {
				let currentScroll = getScrollTop();
			 	if ( currentScroll !== top ) {
			 		if ( getScrollTop() + getWindowHeight() == getScrollHeight() && currentScroll < top ) return;
			        window.requestAnimationFrame(BuiltIn);
			        let speed;
			        if ( currentScroll > top ) {
			        	speed = currentScroll - 120;
			        	if ( speed < top ) speed = top;
			        }
			        if ( currentScroll < top ) {
			        	speed = currentScroll + 120;
			        	if ( speed > top ) speed = top;
			        }     	
			        window.scrollTo( 0, speed );
			    }
		    }
		    BuiltIn();
		}

		//回到顶部
		{
			let backTop = elevatorModule.querySelector(".back-top");
			backTop.addEventListener( "click", function () {
				addEventScrollTo(0);
			});
		}

		//小电视变形
		{
			let appDownload = elevatorModule.querySelector(".app-download"),
				appIcon = appDownload.querySelector(".app-icon"),
				appTipsIcon = appDownload.querySelector(".app-tips-icon");
			let count = 0,
				timer;
			appDownload.addEventListener( "mouseover", function () {
				clearTimeout(timer);
				renderOver();
				appTipsIcon.style.display = "block";
				sport( appTipsIcon, {"opacity": 100});
			})
			appDownload.addEventListener( "mouseout", function () {
				clearTimeout(timer);
				renderOut();
				sport( appTipsIcon, {"opacity": 0}, function () {
					appTipsIcon.style.display = "none";
				});
			})
			function renderOver () {
				let x = parseInt( getStyle( appIcon, "backgroundPositionX" ) );
				if ( x <= - 1200 ) {
					count = 10;
				} else {
					count ++;
				}
				appIcon.style.backgroundPositionX = - count * 80 + 'px';  
			    timer = setTimeout( renderOver, 100 );
			}
			function renderOut () {
				let x = parseInt( getStyle( appIcon, "backgroundPositionX" ) );
				if ( x >= 0 ) {
					return;
				}
				count --;
				appIcon.style.backgroundPositionX = - count * 80 + 'px';
			 	timer = setTimeout( renderOut, 100 );
			}
		}
	}
}())