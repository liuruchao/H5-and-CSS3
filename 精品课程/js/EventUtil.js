var EventUtil={
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){  //IE
			element.attachEvent("on"+type,handler);
		}else{
			element["on"+type]=handler;
		}
	}, //添加事件处理程序
	removeHandler:function(element,type,handler){
		if(element.removeEventListener){  
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){  //IE
			element.detachEvent(type,handler);
		}else{
			element["on"+type]=null;
		}
	}, //移除事件处理程序
	getEvent:function(event){
		return event?event:window.event; //IE下event为window属性
	}, //得到event对象
	getTarget:function(event){
		return event.target || event.srcElement; //IE
	}, //得到事件目标
	preventDefault:function(event){
       if(event.preventDefault){
       	 event.preventDefault();
       }else{
       	event.returnValue=false; //IE
       }
	}, //取消事件默认的行为
	stopPropagation:function(event){
        if(event.stopPropagation){
        	event.stopPropagation();
        }else{
        	event.cancelBubble=true; //IE
        }
	} //取消事件冒泡
}