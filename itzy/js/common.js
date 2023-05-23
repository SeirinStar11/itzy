window.addEventListener('load',function(){
    var nav=document.querySelector('nav');
    var nav_li=nav.querySelectorAll('li');
    for(var i=0;i<nav_li.length;i++){
        console.log(nav_li[i]);
        nav_li[i].addEventListener('click',function(){
            console.log(1);
            for(var j=0;j<nav_li.length;j++){
                nav_li[j].style.backgroundColor='rgb(233,77,202)';
            }
            nav_li[i].style.backgroundColor='while';
        })
    }
})