function clickHandler(event)
{
    switch (event.data.letter)
    {        
        case 'C':
        {
            getDataFromJson('c.json');       
            break;
        }
        case 'O':
        {
            getDataFromJson('o.json'); 
            break;
        }
        case 'D':
        {
            getDataFromJson('d.json'); 
            break;
        }
        case 'E':
        {
            getDataFromJson('e.json'); 
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