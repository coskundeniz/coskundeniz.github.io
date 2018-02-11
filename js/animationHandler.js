$(document).ready(function () {

    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    var fadeInDown = 'animated fadeInDown';

    $('h1').addClass(fadeInDown).one(animationEnd, function(){
        $('h1').removeClass(fadeInDown);
        startLetterAnimation();
    });

});

function startLetterAnimation()
{
    var index = 0;
    var transitionEnd = 'webkitTransitionEnd oTransitionEnd msTransitionEnd transitionend';

    var intervalId = setInterval(function () {

        index++;

        $(`#glow-letter-${index}`).addClass('glowing-character').one(transitionEnd, 
            characterGlowTransitionEnded.bind(this, index));

        appendContentLetters(index);

        if (index == 4)
        {
            clearInterval(intervalId);
        }
    }, 1250);
}

function characterGlowTransitionEnded(index)
{
    setTimeout(function() {
        $(`#glow-letter-${index}`).removeClass('glowing-character');
    }, 750);
}

function appendContentLetters(index)
{
    $('#content').append(`<div class="content-letter">${$(`#glow-letter-${index}`).text()}</div>`)
}