window.addEventListener("load",function(){
   // 本地存储资源
   var songDb = JSON.parse(localStorage.db);
   //计数
   var num=Number(localStorage.num);
   //歌曲名
   var songName=document.querySelectorAll(".songNames");
   //歌手名
   var singerName=document.querySelectorAll(".singerNames");
   //音频节点
   var audio = document.querySelector("#audio");
   //海报头部
   var banner=document.querySelector(".banner");
   //进度条
   var progress = document.querySelector(".progress").querySelector(".linear");
   //歌词
   var lyrics=document.querySelector(".lyrics");
   //歌曲时间
   var time=document.querySelector(".timing").querySelectorAll("span")[1];
   //当前播放时间
   var now=document.querySelector(".timing").querySelectorAll("span")[0]
   //音量进度条
   var voice=document.querySelector("#voice");
   
   function int(obj){
      audio.src=obj[num].url;
      for(let i=0;i<songName.length;i++){
      	songName[i].innerText=obj[num].name;
      }
      for(let i=0;i<singerName.length;i++){
      	singerName[i].innerText=obj[num].singer;
      }
      banner.style.backgroundImage="url("+obj[num].singerthumb+")";
      lyrics.innerHTML='';
      for (let i = 0; i < obj[num].lyric.length; i++) {
      	let p=document.createElement("p");
      	p.innerText=obj[num].lyric[i].lyric;
      	lyrics.appendChild(p);
      }

      //banner.style.color="red";
      //singerPic.src=obj[num].thumb;
   };
   int(songDb);

   //初始音量
   audio.volume=0.5;
   //播放按键绑定事件
    var c_btn=document.querySelector(".c_btn");
    c_btn.addEventListener("click",function(event){
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
      }
     

    },false);

    //音量控制
    voice.addEventListener("input",function(){
       var value=voice.value;
       var rate=audio.volume=value/100;
       voice.style.backgroundSize= value+"%"+" "+"100%";

    },false);
    //物理设备修改音量
    audio.addEventListener("volumechange",function(){
       var v=voice.value=audio.volume*100;
       voice.style.backgroundSize= v+"%"+" "+"100%";
    },false);
    //切换歌单
    function changePre(obj){
        if(num>0){
        	num--;
        	int(obj);
          audio.autoplay=true;
          c_btn.querySelector("#switch").className="iconfont icon-zanting";
        }else{
        	num=obj.length-1;
        	int(obj);
        	audio.autoplay=true;
          c_btn.querySelector("#switch").className="iconfont icon-zanting";
        }
    }

    function changeNext(obj){
    	if(num<obj.length-1){
    		num++;
    		int(obj);
        audio.autoplay=true;
        c_btn.querySelector("#switch").className="iconfont icon-zanting"
    	}else{
    		num=0;
    		int(obj);
    		audio.autoplay=true;
          c_btn.querySelector("#switch").className="iconfont icon-zanting";
    	}
    }


   //进度条
    function rate(){
      let time=audio.duration;
      let timing=audio.currentTime;
      let rate = Number(timing/time);
      progress.style.width=(rate*100)+'%';
    }
    
    //时间进度
    function format(time){
    	time=Math.floor(time);
    	var m=Math.floor(time/60)<10? "0"+Math.floor(time/60):Math.floor(time/60);
    	var s=time%60<10? "0"+time%60:time%60;
    	var result=m+":"+s;
    	return result;
    }

    audio.addEventListener("timeupdate",function(){
      if(audio.duration){
      	rate();
      	time.innerText=format(audio.duration);
      	now.innerText=format(audio.currentTime);
      	
      	// for(let i=0;)
      }else{
      	time.innerText="00:00";
      	now.innerText="00:00";
      }
      rate();

    },false);

},false);



// volume.onclck=function(e){
//   var total=volume.offsetWidth;
//   var now=this.offsetX;
//   var d=now/total;
//   audio.volume=d;
//   volume.firstElementChild.style.width=d*100+"%";
// }