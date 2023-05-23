window.addEventListener('load',function(){
    var cd_nav=document.querySelector('.cd_nav');
    var nav_ul=cd_nav.querySelector('ul');
    var cd_more=document.querySelector('.cd_more');
    var more_ul=cd_more.querySelector('ul');
    // 添加一一对应序号
    for(var i=0;i<nav_ul.children.length;i++){
        nav_ul.children[i].setAttribute('index',i);
        more_ul.children[i].setAttribute('index',i);
    }
    for(var i=0;i<nav_ul.children.length;i++){
        nav_ul.children[i].addEventListener('click',function(){
            for(var j=0;j<more_ul.children.length;j++){
                if(more_ul.children[j].getAttribute('index')==this.getAttribute('index')){
                    more_ul.children[j].style.display='block';
                }
                else{
                    more_ul.children[j].style.display='none';
                }
            }
        })
    }
})