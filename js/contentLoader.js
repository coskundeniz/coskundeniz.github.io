function clickHandler(event)
{
    let previousContent = $('#content').html();
    history.pushState({name: 'main_page', content: previousContent}, null);

    switch (event.target.id)
    {
        case 'C':
        {
            getDataFromJson('c.json');
            history.pushState({name: 'c_content'}, null, 'about');
            break;
        }
        case 'O':
        {
            getDataFromJson('o.json');
            history.pushState({name: 'o_content'}, null, 'readings');
            break;
        }
        case 'D':
        {
            getDataFromJson('d.json');
            history.pushState({name: 'd_content'}, null, 'darbuka');
            break;
        }
        case 'E':
        {
            getDataFromJson('e.json');
            history.pushState({name: 'e_content'}, null, 'links');
            break;
        }
        default:
            break;
    }
}

function getDataFromJson(filename)
{
    $.getJSON('resources/' + filename, function(data) {

        loadContent(data);
    });
}

function loadContent(data)
{
    $('#content').html('');

    if (data.content)
    {
        data.content.forEach(function(line) {
            $('<p/>', { text: line }).addClass('content-line').appendTo('#content');
        });
    }

    if (data.readings)
    {
        $('<ul/>').attr('id', 'links').appendTo('#content');

        data.readings.reverse().forEach(function(entry) {

            var title = entry.title;
            var link = entry.link;

            $('<a/>', {text: title, href: link, target: 'blank', class: 'link-focus'})
                .appendTo($('<li/>').appendTo('#links'));
        });
    }

    if (data.links)
    {
        $('#content').append($('<div/>', {class: 'container'}));
        $('.container').append($('<div/>', {class: 'row'}));
        $('.row').append($('<div/>', {class: 'card-deck mx-auto'}));

        data.links.forEach(function(entry) {

            $('.card-deck').append($('<div/>', {class: 'card text-center video-card'}));
            $('.card').last().append($('<img/>', {src: entry.image, class: 'card-img-top video-link-img'}));
            $('.card').last().append($('<div/>', {class: 'card-body'}));
            $('.card-body').last().append($('<a/>', {class: 'stretched-link', text: entry.link, href: entry.link, target: 'blank'}));
        });
    }

    if (data.accounts)
    {
        $('<ul/>').attr('id', 'links').appendTo('#content');

        data.accounts.forEach(function(account) {

            $('<a/>', {text: account.name, href: account.link, target: 'blank', class: 'link-focus'})
                .appendTo($('<li/>').appendTo('#links'));

            if (account.name === 'E-MAIL')
            {
                $('a').removeAttr('target');
            }
        });
    }
}

window.addEventListener('popstate', function(event) {

    var state = event.state;

    if (state)
    {
        if (state.name === 'main_page')
        {
            $('#content').html(state.content);
            $('.content-letter').click(clickHandler);
        }
        else
        {
            var filename = state.name.split('_')[0] + '.json';
            getDataFromJson(filename);
        }
    }
});