
window.onload=function(){
	var container=document.getElementById("container"); //获取父div节点
	var list=document.getElementById("list"); //获取子div节点，存放7张照片
	var buttons=document.getElementById("buttons").getElementsByTagName("span"); //获取子div节点，存放5个span按钮
	var prev=document.getElementById("prev"); //获取子a节点，左箭头
	var next=document.getElementById("next"); //获取子a节点，右箭头
	var index=1; //用于改变span按钮样式的下标
	var timer; //定时器
	
	//定义方法showButton，显示当前span按钮为高亮
	function showButton(){
		for(var i=0;i<buttons.length;i++){ //遍历循环5个span按钮
			if(buttons[i].className=="on"){ //若有高亮的span
				buttons[i].className=""; //清空全部span样式
			    break; //并退出循环
			}
		}
		buttons[index-1].className="on";
	}
	
	//定义方法animate，该方法使list左右切换
	function animate(offset){
		var newLeft=parseInt(list.style.left)+offset;//左边新的left=右边原始left+偏移量
		//为切换img的animate方法添加动画延缓效果
		var time=300;  //自定义，切换总时间
		var interval=10; //自定义，每次位移间隔(每隔10毫秒移动一次，总共耗时300毫秒)
		var speed=offset/(time/interval);  //每次位移量
		function go(){
		// 参数offset为负,当前left>目标left(list的div往左)||  参数offset为正,当前left<目标left(list的div往右)
       	  if(((speed<0) && (parseInt(list.style.left)>newLeft)) || ((speed>0) && (parseInt(list.style.left)<newLeft))){
				 list.style.left=parseInt(list.style.left)+speed+"px";
				 setTimeout(go,interval); //每隔interval毫秒后，调用一次go方法
			}else {
		/**
		 * 1 list存放的是7张img，通过切换left值来显示某张img
		 * 2 5实图img的left取值[-600,-3000]；2辅助图img取值0和-3600
		 * 3 判断若list的新newLeft>-600或新newLeft<-3000时，使当前left归位  
		 */
		list.style.left=newLeft+"px"; //必须经过上诉流程后，再将list新的newLeft值赋予list的left
		if(newLeft>-600){ //此时img到了第1张辅助图
			list.style.left=-3000+"px";
		}
		if(newLeft<-3000){ //此时img到了第7张辅助图
			list.style.left=-600+"px";
		}
			}
		} //go方法的结束
		go(); //在animate方法内部，调用一次go方法
	}
	
	//定义play方法，自动播放img
	function play(){
		timer=setInterval(function(){
	       next.onclick(); //不断调用next.onclick
		},4000);
	}
	//定义stop方法，终止自动播放img
	function stop(){
	   clearInterval(timer);	
	}
	//为container容器添加鼠标移入和移出事件
	container.onmouseover=stop;
	container.onmouseout=play;
	
	//为右箭头next添加onclick事件
	next.onclick=function(){
		if(index==5){
			index=1;
		}else{
	    index+=1;  //小圆点span与当前照片img相对应
		}
		showButton();
		animate(-600);
	};
	
	//为左箭头prev添加onclick事件
	prev.onclick=function(){
		if(index==1){
			index=5;
		}else{
	    index-=1;  //小圆点span与当前照片img相对应
		}
		showButton();
		animate(600);
	};
	
		//遍历5个span按钮
	for(var i=0;i<buttons.length;i++){
		//为5个span按钮添加onclick事件
		buttons[i].onclick=function(){
		   //若点击的是当前span按钮，则不执行下面的代码
    		if(this.className=="on"){
    			return; //意思是：不执行下面语句
    		}
			var myIndex=parseInt(this.getAttribute("index")); //获得点击的当前自定义index属性
			var offset=-600*(myIndex-index); //获取原始index代表的图像与当前index的图像的间距
            animate(offset); //调用切换img的方法
    		index=myIndex; //更新index值(很重要)
    		showButton(); //调用显示span按钮的方法
		};
	}
	play();
};
