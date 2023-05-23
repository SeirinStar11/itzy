window.addEventListener('load',function(){
    function music_play(obj){
        var music=obj.querySelector('.music');
        // 装歌词的盒子
        var lrcbox=music.querySelector('.lrc');
        // 获取装有歌词的文本域
        var textarea=music.querySelector('textarea');
        // 获取最原始的[时间戳]+歌词的字符串
        var txt=textarea.value;
        // 分割txt得到txtarr数 组，数组里每一个值存放一个时间戳和一句歌词
        var txtarr=txt.split('[');
        // 用于保存处理完成后的歌词
        var ok_lrc="";
        for(var i=0;i<txtarr.length;i++){
            // 把数组里的每个元素通过]切割成[时间、该时间歌词]
            var every_line=txtarr[i].split(']');
            // (1)每行数组第一个元素为时间
            var every_time=every_line[0];
            // 把时间按.分割开(分割后第二个元素为毫秒不需要)
            every_time=every_time.split(".");
            // 把分秒分隔开
            every_time=every_time[0].split(":")
            // 分秒转成秒
            every_time=every_time[0]*60+every_time[1]*1;
            // (2)每行第二个元素为歌词
            var every_lrc=every_line[1];
            // 若该行有歌词将每句歌词作为一个p标签放进ok_lrc里面,并将该句歌词的class设置为出现的秒数
            if(every_lrc){
                ok_lrc +="<p id="+every_time+">"+every_lrc+"</p>";
            }
            lrcbox.innerHTML=ok_lrc;
        }


        // 监听歌曲播放时间
        var audio=music.querySelector('audio');
        // 把歌词全部选出来
        var allp=music.querySelectorAll("p");
        // 当前的歌词行数
        var num=0;
        audio.addEventListener('timeupdate',function(){
            // 获取当前播放时间
            var curtime=parseInt(this.currentTime);
            // 获取该播放时间对应的歌词
            var cur_lrc=document.getElementById(curtime)
            // 若该时间对应有歌词
            if(cur_lrc){
                // 把其余歌词的颜色改一致
                for(var i=0;i<allp.length;i++){
                    allp[i].style.color='black';
                    allp[i].style.fontSize=10+'px';
                }
                // 给当前歌词加特殊样式
                cur_lrc.style.color='red';
                cur_lrc.style.fontSize=14+'px';
                // 到盒子第四行开始每切一句歌词页面滚动一次
                if(allp[num+4].id==curtime){
                    lrcbox.style.top=-20*(num)+'px';
                    num++;
                }
            }  
        })
    }
    var play=document.querySelectorAll('.music_play');
    for(var i=0;i<play.length;i++){
        music_play(play[i]);
    }

})