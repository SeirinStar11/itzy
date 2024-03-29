window.addEventListener('load',function(){
    // 播放函数
    function play(obj,target,callback){
        // 清楚之前的定时器
        clearInterval(obj.timer);
        // 当前位置在目标位置坐标左侧，步长为正向右走(反之向左为负)
        var step=obj.offsetLeft<target?1:-1;
        obj.timer=setInterval(function(){
            if(target==obj.offsetLeft) {
                clearInterval(obj.clearInterval);
                // 有回调函数就调用
                if(callback){
                    callback();
                }
            }
            else {
                obj.style.left=obj.offsetLeft+step+'px';
            }
        },1)
    }
    // 添加点击事件播放图片
    function click_play(obj){
        // 动态添加小圆圈并复制第一张图到最后 
        function add_circle(obj) {
            var ul=obj.querySelector('ul');
            var ol=obj.querySelector('ol');
            for(var i=0;i<ul.children.length;i++){
                var li=document.createElement('li');
                li.setAttribute('index',i);
                ol.appendChild(li);
            }
            ol.children[0].className='current';
            var copy=ul.children[0].cloneNode(true);
            ul.appendChild(copy);
        }
        add_circle(obj);
        // 节流阀
        var flag=true;
        // 获取元素
        var l=obj.querySelector('.l');
        var r=obj.querySelector('.r');
        var ul=obj.querySelector('ul');
        var ol=obj.querySelector('ol');
        var pic_width=obj.offsetWidth;
        // 加上克隆图片的总图片数量
        var count=Math.round(ul.offsetWidth/pic_width);
        // 鼠标经过离开轮播图
        ul.addEventListener('mouseover',function(){
            clearInterval(autoplay);
        })
        ul.addEventListener('mouseleave',function(){
            autoplay=setInterval(function(){
                r.click();
            },3000)
        })
        // 右按键
        r.addEventListener('click',function(){
            if(flag){
                // 关闭节流阀
                flag=false;
                // 跳转后当前图片索引
                var index=Math.abs(ul.offsetLeft)/pic_width+1;
                if(index==count){
                    index=1;
                    ul.style.left=0;
                }
                // 跳转后当前圆圈索引
                var circle=index;
                if(circle==count-1){
                    circle=0;
                }
                // 跳转前若到克隆图片则图片左偏移量归零
                for(var i=0;i<ol.children.length;i++){
                    ol.children[i].className='';
                }
                ol.children[circle].className='current';
                // 完成动画之后打开节流阀
                play(ul,ul.offsetLeft-pic_width,function(){
                    flag=true;
                });
            }
        })
        l.addEventListener('click',function(){
            if(flag){
                flag=false;
                // 跳转后当前图片索引
                var index=Math.abs(ul.offsetLeft)/pic_width-1;
                if(index<0){
                    index=count-2;
                    ul.style.left=-(count-1)*pic_width+'px';
                }
                // 跳转后当前圆圈索引
                var circle=index;
                console.log(circle);
                // 跳转前若到克隆图片则图片左偏移量归零
                for(var i=0;i<ol.children.length;i++){
                    ol.children[i].className='';
                }
                ol.children[circle].className='current';
                play(ul,ul.offsetLeft+pic_width,function(){
                    flag=true;
                });
            }
        })
        // 自动播放
        var autoplay=setInterval(function(){
            r.click();
        },3000)
    }


    // 团体轮播图
    var team_play=document.querySelector('.team_play');
    var team_pic=team_play.querySelector('.pic');
    click_play(team_pic);

    // 个人轮播图
    var yeji=document.querySelector('#yeji');
    var yeji_pic=yeji.querySelector('.pic');
    click_play(yeji_pic);
    var lia=document.querySelector('#lia');
    var lia_pic=lia.querySelector('.pic');
    click_play(lia_pic);
    var ryujin=document.querySelector('#ryujin');
    var ryujin_pic=ryujin.querySelector('.pic');
    click_play(ryujin_pic);
    var chae=document.querySelector('#chae');
    var chae_pic=chae.querySelector('.pic');
    click_play(chae_pic);
    var yuna=document.querySelector('#yuna');
    var yuna_pic=yuna.querySelector('.pic');
    click_play(yuna_pic);
})