$(document).ready(function () {

    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    var slideInLeft = 'animated fadeInDown';

    $('h1').addClass(slideInLeft).one(animationEnd, function(){
        $('h1').removeClass(slideInLeft);
    });
    
});

