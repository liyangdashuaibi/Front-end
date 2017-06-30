window.onload = function(){
	var iframe = document.getElementsByTagName('iframe')[0],
		celan = document.getElementById('celan'),
		zhengwen = document.getElementById('zhengwen'),
		sett = ['个人主页/task6.html','大事件表/大事件表.html','毛泽东思想/毛泽东思想.html'],
		set = ['个人主页','大事件表','毛泽东思想'];
	
	var two = celan.getElementsByClassName('two'),
		one = zhengwen.getElementsByClassName('one')[0];
	for (var i = 0; i < sett.length; i ++){
		(function(i){
			var u = two[i].getElementsByTagName('p')[0];
			u.onclick = function(){
				for (var j = 0; j < two.length; j ++){
					two[j].getElementsByTagName('p')[0].style.color = '#fff';
				}
				this.style.color = '#5e7c85';
				iframe.src = sett[i];
				one.getElementsByTagName('span')[1].innerHTML = set[i];
			}
		})(i)
	}
}
