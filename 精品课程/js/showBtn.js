
//师资队伍轮播图
 var list=document.getElementById('listShow');
    var btn1=document.getElementsByClassName('btn1')[0];
    var btn2=document.getElementsByClassName('btn2')[0];
    btn1.onclick=function(){
        list.style.left="20px";
    }
    btn2.onclick=function(){
      list.style.left="-532px";
    };
