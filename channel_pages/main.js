var sharedb = require('sharedb/lib/client');
var $ = require('jquery');

// Open WebSocket connection to ShareDB server
var socket = new WebSocket('wss://' + window.location.host);
var connection = new sharedb.Connection(socket);
var doc = connection.get('chatcodes', 'channels');

var urlVars = getUrlVars();
var topic = urlVars.topic;

doc.subscribe(showChannels);
doc.on('op', showChannels);

function showChannels() {
    var data = doc.data;
    var i = 1;
    $('body').html('');
    doc.data['channels'].forEach(function(channel) {
        if(!channel.archived && (!topic || (topic === channel.topic))) {
            var link = $('<a />');
            var href = window.location.protocol+'//'+window.location.host+'/'+channel.channelName;
            link.attr({
                'href': href,
                'target': '_blank'
            });
            link.text(' ' + channel.channelName + '('+i+') ');
            $('body').append(link);
            i++;
        }
    });
    if(i===1) {
        $('body').text('(no active converstations on this problem)');
    }
    // var createHref = window.location.protocol+'//'+window.location.host+'/'+$.param({ topic: topic, code:code })
    // var create = $('<a />', {text: 'Create New', target:'_blank', href:createHref}).on('click', function() {
    //     console.log(topic);
    // });
    // $('body').append(create);
}
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}