//头部轮播图
 var curIndex = 0; 
 var timeInterval = 3000; 
 var arr = new Array(); 
 arr[0] = "images/lunbo2.jpg"; 
 arr[1] = "images/lunbo1.jpg";  
 setInterval(changeImg,timeInterval); 
  function changeImg() { 
   var obj = document.getElementById("obj"); 
   if (curIndex == arr.length-1) { 
    curIndex = 0; 
   } else { 
    curIndex += 1; 
     } 
   obj.src = arr[curIndex]; 
  }
//蒙层
var mask=document.getElementById('mask');
var course=document.getElementById('course');
var overView=mask.getElementsByTagName('div')[0];
EventUtil.addHandler(course,'click',function(){
	mask.style.display="block";
	overView.style.animation="box 1s linear 1";
});
EventUtil.addHandler(mask,'click',function(){
	mask.style.display="none";
})