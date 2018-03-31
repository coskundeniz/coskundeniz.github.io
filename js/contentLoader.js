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

            $('<a/>', {text: title, href: link, target: 'blank'})
                .appendTo($('<li/>').appendTo('#links'));
        });
    }

    if (data.links)
    {
        $('<ul/>').attr('id', 'links').appendTo('#content');

        data.links.forEach(function(entry) {

            $('<a/>', {text: entry.link, href: entry.link, target: 'blank'})
                .appendTo($('<li/>').appendTo('#links'));
        });
    }

    if (data.accounts)
    {
        $('<ul/>').attr('id', 'links').appendTo('#content');

        data.accounts.forEach(function(account) {

            $('<a/>', {text: account.name, href: account.link, target: 'blank'})
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

    if (state && state.name === 'main_page')
    {
        $('#content').html(state.content);
        $('.content-letter').click(clickHandler);
    }
});