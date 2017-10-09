const topic = url('?topic')
const wsProtocol = url('protocol') === 'https' ? 'wss' : 'ws';
const socket = new WebSocket(`${wsProtocol}://${window.location.host}`);
const connection = new sharedb.Connection(socket);
const channelsDoc = connection.get('chatcodes', 'channels');

channelsDoc.subscribe(showChannels);
channelsDoc.on('op', showChannels);

function showChannels() {
    const {data} = channelsDoc;
    const {channels} = data;
    $('table#channels tbody').children().remove();
    channels.forEach((channel) => {
        const {archived, channelID, channelName, created, topic} = channel;
        const row = $('<tr />');
        const channelURL = `${url('protocol')}://${url('hostname')}${url('port') === '80' ? '' : ':'+url('port')}/${channelName}`;
        const observerURL = `${channelURL}/${channelID}`;

        row.append($('<td />').append($('<a />', { text: channelName, href: archived ? observerURL : channelURL, target: '_blank' })));
        row.append($('<td />').append($('<a />', { text: channelID, href: observerURL, target: '_blank' })));
        row.append($('<td />', {text: topic}));
        row.append($('<td />', {text: $.timeago(created)}));
        row.append($('<td />', {text: archived ?  $.timeago(archived) : '(no)'}));

        $('table#channels tbody').append(row);
    });
}
