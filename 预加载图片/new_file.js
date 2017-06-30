var imgs = ['http://img02.tooopen.com/images/20140314/sy_56657159411.jpg',
			'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496476359&di=2e5dd87dd27f1611c377a770d443e935&imgtype=jpg&er=1&src=http%3A%2F%2F5.26923.com%2Fdownload%2Fpic%2F000%2F336%2Ff53aeaeb29247542ce702d0384cb5139.jpg',
			'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495883322895&di=a68736c5b1f68609ad7613db3ad6967a&imgtype=0&src=http%3A%2F%2Fi-7.vcimg.com%2Ftrim%2F6577a1de77497d6da6f3be5148fab286381975%2Ftrim.jpg',
			'http://tupian.enterdesk.com/2014/lxy/24/2/10.jpg'],
	img = document.getElementById('img'),
	btn = document.getElementsByClassName('btn'),
	loading = document.getElementsByClassName('loading')[0]
	progress = document.getElementsByClassName('progress')[0],
	len = imgs.length;
	
img.src = imgs[0];
	
function preloadimages(arr){	
	var count = 0,
		arr = (typeof arr === 'string') ? [arr] : arr;
	function imageloadpost(){
		progress.innerHTML = Math.round((count + 1) / len * 100) + '%';
		count ++;
		if (count === arr.length){
			loading.style.display = 'none';
			document.title = '1/' + arr.length + '张';
		}
	}
	for (var i = 0; i < arr.length; i ++){
		var imgb = new Image();
		imgb.onload = function(){
			imageloadpost();
		}
		imgb.onerror = function(){
			imageloadpost();
		}
		imgb.src = arr[i];
	}
}

preloadimages(imgs)

{
	let index = 0;
	for (let i = 0; i < btn.length; i ++){
		btn[i].po = i
		btn[i].onclick = function(){
			if (this.po == 0){
				index = Math.max(0,--index);
			}
			else {
				index = Math.min(len - 1,++index);
			}
			img.src = imgs[index];
			document.title = (index + 1) + '/' + len + '张'
		}
	}
}
