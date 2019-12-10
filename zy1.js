/*
* @Author: Ëï½õïÚ
* @Date:   2019-12-10 22:43:15
* @Last Modified by:   孙锦镖
* @Last Modified time: 2019-12-10 22:57:40
*/
var box=document.getElementById("box");
var box2=document.getElementById('box2');
var oNavlist=document.getElementById('nav').children;
var slider=document.getElementById('slider');
var left=document.getElementById('left');
var right=document.getElementById('right');
var index=1;
var timer;
var isMoving=false;
window.onload=function(){
	var  timer=setInterval(function(){
	    var now=parseInt(getStyle(box,"left"));
	    box.style.left=now-1+"px";
        if(now==-500){
		    now=1200;
		    box.style.left=now-1+"px";
		}
	},10)
}
function next(){
	if(!isMoving){
		isMoving=true;
		index++;
		navChange();
	    animate(slider,{left:-1200*index},function(){
		    if(index>5){
				slider.style.left="-1200px";
			    index=1;
			}
			isMoving=false;
		});
	}   
}
function prev(){
	index--;
	navChange();
	animate(slider,{left:-1200*index},function(){
		if(index===0){
			slider.style.left="-6000px";
			index=5;
		}
	});
}
var timer=setInterval(next,3000);
box2.onmouseover=function(){
	animate(left,{opacity:50});
	animate(right,{opacity:50});
	clearInterval(timer);
}
box2.onmouseout=function(){
	animate(left,{opacity:0});
	animate(right,{opacity:0});
	timer=setInterval(next,3000);
}
right.onclick=next;
left.onclick=prev;
for(var i=0;i<oNavlist.length;i++){
	oNavlist[i].idx=i;
	oNavlist[i].onclick=function(){
		index=this.idx+1;
		navChange();
		animate(slider,{left:-1200*index});
	}
}
function navChange(){
	for(var i=0;i<oNavlist.length;i++){
		oNavlist[i].className=' ';
	}
	if(index===6){
		oNavlist[0].className='active';
	}
	else if(index===0){
		oNavlist[4].className='active';			
	}else{
		oNavlist[index-1].className='active';
	}			
}
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
    }
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
                now = parseInt(getStyle(obj,attr)*100);
			}else{
                now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
            speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
                isStop = false;
			}
		}
    if(isStop){
		clearInterval(obj.timer);
         callback&&callback();
		}
	}, 30)
}