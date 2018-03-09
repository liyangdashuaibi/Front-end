(function(){
	var live_list = document.querySelector('.lf-list'),
		banner = document.querySelector('.banner');
	var liveArr = [
		{
			img: '../images/liveL1.jpg',
			title: '二狗子大佬',
			href: 'javascript:;'
		},
		{
			img: '../images/liveL2.jpg',
			title: '下限酱',
			href: 'javascript:;'
		},
		{
			img: '../images/liveL3.jpg',
			title: '玖玖小咸鱼',
			href: 'javascript:;'
		},
		{
			img: '../images/liveL4.jpg',
			title: 'Di君',
			href: 'javascript:;'
		},
		{
			img: '../images/liveL5.gif',
			title: '（≥ω≤）',
			href: 'javascript:;'
		},
		{
			img: '../images/liveL6.jpg',
			title: '璃猫タヌキ',
			href: 'javascript:;'
		},
	];
	var bannerArr = [
		{
			img: '../images/liveR1.jpg',
			title: '秘技！学习记忆超级能',
			href: 'javascript:;'
		},
		{
			img: '../images/liveR2.jpg',
			title: '活动最后一周，奖品你拿了么？',
			href: 'javascript:;'
		}
	]

	var liveInner = '', bannerInner = '';
	for ( let i = 0, le = liveArr.length; i < le; i ++ ) {
		liveInner += `<a href="${liveArr[i].href}" class="lf-item"><img src="${liveArr[i].img}" /><i>LIVE</i><p>${liveArr[i].title}</p></a>`;
	}
	for ( let i = 0, le = bannerArr.length; i < le; i ++ ) {
		bannerInner += `<a href="${bannerArr[i].href}" title="${bannerArr[i].title}"><img src="${bannerArr[i].img}" /></a>`;
	}

	live_list.innerHTML = liveInner;
	banner.innerHTML = bannerInner;

	live_list.addEventListener( 'mouseover', function(e){
		var a = e.target.nodeName === 'A' ? e.target : ( e.target.parentNode.nodeName === 'A' ? e.target.parentNode : null );
		if ( a == null ) return;
		var i = a.querySelector('i');
		i.style.display = "block";
	})
	live_list.addEventListener( 'mouseout', function(e){
		var a = e.target.nodeName === 'A' ? e.target : ( e.target.parentNode.nodeName === 'A' ? e.target.parentNode : null );
		if ( a == null ) {
			return;
		}
		var i = a.querySelector('i');
		i.style.display = "none";
	})
}())