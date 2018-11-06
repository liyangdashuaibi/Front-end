var waterfall = {
    getStyle: function(obj,attr){         
        if(obj.currentStyle){             
            return obj.currentStyle[attr];                         
        }else{
            return getComputedStyle(obj,false)[attr];       
        }
    },
    total: function(div){
    	var child = div.children,
    		le = child.length,
    		leng = 0;
    	for (var i = 0; i < le; i ++){
    		if ( i > 1 && i < le -1){
    			leng += this.space;
    		}
    		leng += parseInt(this.getStyle(child[i],'height'));
    	}
    	return leng;
    },
    arr: [],
    space: null,
    fall: function(id,le,space){  //元素,布局的数量,布局的间隔
        this.space = space;
        var box = id;
        	box.style.overflow = 'hidden';
            box.style.paddingTop = box.style.paddingBottom = space + 'px';
        var boxWidth = parseInt(this.getStyle(box,'width')),
            boxHeight = parseInt(this.getStyle(box,'height'));
        for (var i = 0; i < le; i ++){
            var div = document.createElement('div');
            this.arr.push(div);
            div.style.cssFloat = 'left';
            div.style.width = (boxWidth - ((le + 1) * space)) / le + 'px';
            div.style.height = boxHeight + 'px';
            div.style.marginLeft = space + 'px';
            box.appendChild(div);
        }
    },
    add: function(image,height){  //src,高度
    	var self = this;
        var arr = this.arr,
        	div = document.createElement('div');
        	img = document.createElement('img');
        div.style.width = '100%';
        div.style.height = height + 'px';
        img.src = image;
        img.style.width = '100%';
        img.style.height = '100%';
        div.appendChild(img);
        var l = arr.some(function(x){
            return x.children.length <= 0;
        })
        if (l){
            for (var i = 0; i < arr.length; i ++){
                if (arr[i].children.length <= 0){
                    arr[i].appendChild(div);
                    return;
                }
            }
        }
        else {
        	var min = arr.reduce(function(x,y){
        		return self.total(x) > self.total(y) ? y : x;
        	})
        	div.style.marginTop = self.space + 'px';
        	min.appendChild(div)
        }
    }
}
var div = document.getElementById('div');
waterfall.fall(div,4,10);   //创建布局，  参数：元素  布局的个数  间隔宽度
waterfall.add('2 (1).jpeg',400);   //添加图片，  参数：图片的src  图片的高度
//重复的添加图片完成布局
waterfall.add('2 (1).jpeg',500);
waterfall.add('2 (1).jpeg',300);
waterfall.add('2 (1).jpeg',100);
waterfall.add('2 (1).jpeg',100);
waterfall.add('2 (1).jpeg',100);
waterfall.add('2 (1).jpeg',100);

