window.addEventListener("load",function(){
  //轮播图
  var mySwiper = new Swiper('.swiper-container', {
	autoplay: true,//可选选项，自动滑动
	loop : true
         });
    

  //判断本地是否存储歌单
    if(!localStorage.db){
    	//音乐歌单
	    for (let i = 0; i < db.length; i++) {
	    	var item = db[i];
	    	var lystr=item.lyric;
	        var arr1=[];
	        var arr2=lystr.split("↵");
	        for(let j=0;j<arr2.length;j++){
	        	var obj={};
	        	obj.time=arr2[j].split("]")[0].substr(1,5);
	        	obj.lyric=arr2[j].split("]")[1];
	        	arr1.push(obj);
	        }
	        item.lyric=arr1;
	    }
	       localStorage.db=JSON.stringify(db);
    }
    
    // 本地存储资源
    var songDb = JSON.parse(localStorage.db);
    //音频节点
    var audio = document.querySelector("#audio");
    //进度条
    var progress = document.querySelector(".progress").querySelector(".linear");
    //音频总时间
    var time=audio.duration;
    //歌名与歌手
    var songName=document.querySelector(".jianjie").querySelector(".btm_songName");
    var singer=document.querySelector(".jianjie").querySelector(".btm_singer");
    //歌手照片
    var singerPic=document.querySelector(".singerPic");
    //歌单
    var songList=document.querySelector("#songList");

    //播放按键绑定事件
    var play_btn=document.querySelector(".play_btn").querySelector(".right");
    var num = Number(localStorage.num)?Number(localStorage.num):0;
    play_btn.addEventListener("click",function(event){
      let target = event.target; 
      switch (target.id){
      	//上一曲
      	case "pre":
        changePre(songDb);
      	break;
      	//播放暂停
      	case "switch":
      	if(audio.paused){
          audio.play();
          target.className="iconfont icon-zanting";
      	}else{
      		audio.pause();
          target.className="iconfont icon-bofang"
          
      	}
      	break;
      	//下一曲
      	case "next":
      	changeNext(songDb);
      	break;
      	//菜单
      	case "menu":
      	
      	break;
      }
     

    },false);

    //歌单列表绑定事件
    songList.addEventListener("click",function(event){
       let target=event.target;
       let i = 0;
       let len=songList.childElementCount;
       let child = songList.firstElementChild;
       do{
         if(target===child){
             //播放音乐
             num = i;
             int(songDb);
             break;
          }
          child = child.nextElementSibling;
          i++;   
          
       }while(i <= len);
    },false);
    
    //跳转到详情页
    singerPic.onclick=function(){
      window.location.href="play.html";
      localStorage.num=num;
    }
    
    //弹出菜单栏
    document.querySelector("#menu").onclick=function(){
      if(songList.style.height){
        songList.style.height="";
      }else{
        songList.style.height="2rem";
      }
      
    }

    //初始化
    function int(obj){
          audio.src=obj[num].url;
          songName.innerText=obj[num].name;
          singer.innerText=obj[num].singer;
          singerPic.src=obj[num].thumb;

    };

    int(songDb);
    

    //初始化歌单列表
    (function list(obj){
      let len=obj.length;
      for(let i=0;i<len;i++){
        let li=document.createElement("li");
        li.innerText=obj[i].name;
        songList.appendChild(li);
      }
    })(songDb);

    //切换歌单
    function changePre(obj){
        if(num>0){
        	num--;
        	int(obj);
          audio.autoplay=true;
          play_btn.querySelector("#switch").className="iconfont icon-zanting";
        }else{
        	num=obj.length-1;
          int(obj);
          audio.autoplay=true;
        }
    }

    function changeNext(obj){
    	if(num<obj.length-1){
    		num++;
    		int(obj);
        audio.autoplay=true;
        play_btn.querySelector("#switch").className="iconfont icon-zanting"
    	}else{
    		num=0;
        int(obj);
        audio.autoplay=true;
    	}
    }
    
     //进度条
    function rate(){
      let timing=audio.currentTime;
      let rate = Number(timing/time);
      progress.style.width=(rate*100)+'%';
    }

    audio.addEventListener("play",function(){
      setInterval(rate,100)
    },false);


	},false);
    