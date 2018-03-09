(function(){
    var obj = {
        addEvent(element, type, handler){
            if (element.addEventListener) {
                element.addEventListener (type, handler ,false);
            } else if (element.attachEvent) {
                element.attachEvent ('on' + type, handle); 
            } else {
                element['on'+type] = handler
            }
        },
        getStyle(obj,attr){          
            if(obj.currentStyle){             
                return obj.currentStyle[attr];                           
            }else{
                return getComputedStyle(obj,false)[attr];        
            }
        },
        better_button (){
            var better = document.getElementsByClassName('better')[0],
                btn = better.getElementsByClassName('button')[0],
                span = btn.getElementsByTagName('span')[0],
                hide = document.getElementsByClassName('hide')[0],
                key = hide.getElementsByClassName('key'),
                area = hide.getElementsByClassName('area')[0];
            var hdisplay = this.getStyle(hide,'display'),
                areah = parseInt(this.getStyle(area,'height')),
                self = this,
                timer;
            this.addEvent(btn,'click', function(){
                clearInterval(timer);
                if ( hdisplay === 'none'){
                    span.style.transform = 'rotate(180deg)';
                    area.style.height = 0 + 'px';
                    area.style.display = 'block';
                    hide.style.display = 'block';
                    key[0].style.display = 'block';
                    timer = setInterval(function(){
                        area.style.height = parseInt(area.style.height) + 40 + 'px';
                        if (parseInt(area.style.height) > 380) {
                            clearInterval(timer);
                            hdisplay = 'block';
                            key[1].style.display = 'block';
                        }
                    },80)
                }
                else {
                    span.style.transform = 'rotate(0deg)';
                    key[0].style.display = 'none';
                    key[1].style.display = 'none';
                    timer = setInterval(function(){
                        area.style.height = parseInt(area.style.height) - 40 + 'px';
                        if (parseInt(area.style.height) <= 45) {
                            clearInterval(timer);
                            hdisplay = 'none';
                            hide.style.display = 'none';
                            area.style.display = 'none';
                        }
                    },80)
                }
            })
        },
        question_hover (){
            var question = document.getElementsByClassName('question')[0],
                reportp = question.getElementsByClassName('reportp')[0],
                reportul = question.getElementsByClassName('reportul')[0];
            var self = this;
            this.addEvent(question,'mouseover',function(e){ 
                reportp.style.display = 'inline-block';
            })
            this.addEvent(question,'mouseout',function(e){
                reportp.style.display = 'none';
            })
            this.addEvent(reportp,'mouseover',function(e){ 
                reportul.style.display = 'inline-block';
            })
            this.addEvent(reportp,'mouseout',function(e){ 
                reportul.style.display = 'none';
            })
            this.addEvent(reportul,'mouseover',function(e){ 
                reportul.style.display = 'inline-block';
            })
            this.addEvent(reportul,'mouseout',function(e){ 
                reportul.style.display = 'none';
            })
        },
        answer_hover (){
            var answer_div = document.getElementsByClassName('answer-div');
            var self = this;
            for (var i = 0, le = answer_div.length; i < le; i ++){
                (function(i){
                    var reportp = answer_div[i].getElementsByClassName('reportp')[0],
                        reportul = answer_div[i].getElementsByClassName('reportul')[0];
                    self.addEvent(answer_div[i],'mouseover', function(){
                        reportp.style.display = 'inline-block';
                    })
                    self.addEvent(answer_div[i],'mouseout',function(e){
                        reportp.style.display = 'none';
                    })
                    self.addEvent(reportp,'mouseover',function(e){ 
                        reportul.style.display = 'block';
                    })
                    self.addEvent(reportp,'mouseout',function(e){ 
                        reportul.style.display = 'none';
                    })
                    self.addEvent(reportul,'mouseover',function(e){ 
                        reportul.style.display = 'inline-block';
                    })
                    self.addEvent(reportul,'mouseout',function(e){ 
                        reportul.style.display = 'none';
                    })
                })(i)
            }
        },
        answer_button(){
            var answer_div = document.getElementsByClassName('answer-div');
            var self = this,
                timer;
            for (var i = 0, le = answer_div.length; i < le; i ++){
                (function(i){
                    var com = answer_div[i].getElementsByClassName('com')[0],
                        reply = answer_div[i].getElementsByClassName('reply')[0],
                        area = answer_div[i].getElementsByTagName('textarea')[0];
                    self.addEvent(com, 'click', function(){
                        clearInterval(timer);
                        if (self.getStyle(reply,'display') === 'none'){
                            reply.style.display = 'block';
                            reply.style.height = '0px';
                            area.style.height = '0px';
                            timer = setInterval(function(){
                                reply.style.height = parseInt(self.getStyle(reply,'height')) + 40 + 'px';
                                area.style.height = parseInt(self.getStyle(area,'height')) + 30 + 'px';
                                if ( parseInt(self.getStyle(reply,'height')) > 100) {
                                    clearInterval(timer);
                                } 
                            },80)
                        }
                        else {
                            timer = setInterval(function(){
                                reply.style.height = parseInt(self.getStyle(reply,'height')) - 40 + 'px';
                                area.style.height = parseInt(self.getStyle(area,'height')) - 30 + 'px';
                                if ( parseInt(self.getStyle(reply,'height')) < 10) {
                                    clearInterval(timer);
                                    reply.style.display = 'none';
                                } 
                            },80)
                        }
                        
                    })
                })(i)
            }
        },
        zan (){
            var answer_div = document.getElementsByClassName('answer-div');
            var self = this;
            for (var i = 0, le = answer_div.length; i < le; i ++){
                (function(i){
                    var up = answer_div[i].getElementsByClassName('up')[0],
                        down = answer_div[i].getElementsByClassName('down')[0],
                        uspan = up.getElementsByTagName('span')[0],
                        dspan = down.getElementsByTagName('span')[0],
                        unum = uspan.innerHTML,
                        dnum = dspan.innerHTML;
                    self.addEvent(up,'mouseover', function(){
                        uspan.innerHTML = '赞';
                    })
                    self.addEvent(up,'mouseout', function(){
                        uspan.innerHTML = unum;
                    })
                    self.addEvent(down,'mouseover', function(){
                        dspan.innerHTML = '踩';
                    })
                    self.addEvent(down,'mouseout', function(){
                        dspan.innerHTML = dnum;
                    })
                    self.addEvent(up,'click', function(){
                        uspan.innerHTML = ++ unum;
                    })
                    self.addEvent(down,'click', function(){
                        dspan.innerHTML = ++ dnum;
                    })
                })(i)
            }
        },
        head_a (){
            var a = document.getElementsByClassName('question')[0]
                    .getElementsByClassName('icon')[0]
                    .getElementsByTagName('a');
            var self = this;
            for (var i = 0, le = a.length; i < le; i ++) {
                (function (i) {
                    self.addEvent(a[i], 'mouseover', function () {
                        this.style.transform = 'rotateY(180deg)';
                    })
                    self.addEvent(a[i], 'mouseout', function () {
                        this.style.transform = 'rotateY(0deg)';
                    })
                })(i)
            }
        }
    }
    obj.better_button();
    obj.question_hover();
    obj.answer_hover();
    obj.answer_button();
    obj.zan();
    obj.head_a();
})()