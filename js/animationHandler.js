$(document).ready(function () {

    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    var fadeInDown = 'animated fadeInDown';

    $('h1').addClass(fadeInDown).one(animationEnd, function(){
        $('h1').removeClass(fadeInDown);
        startLetterAnimation();
    });

    $('h1').click(function(event) {

        if (history.state.name !== 'main_page')
        {
            history.back();
        }
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
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    var zoomIn = 'animated zoomIn';

    var letter = $(`#glow-letter-${index}`).text();

    $('#content').append(`<div id='${letter}' class='content-letter'>${letter}</div>`);
    $(`#${letter}`).click(clickHandler);

    $(`.content-letter:eq(${index-1})`).addClass(zoomIn).one(animationEnd, function(){
        $(`.content-letter:eq(${index-1})`).removeClass(zoomIn);
    });
}