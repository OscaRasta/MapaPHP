
I have a server in digital ocean which is using StartCOM class I primary intermediate CA for ssl. I have set u a websocket server and I want to make a connection to it from a page which is served by https.

When I try to connect to the websocket using just http it works fine. But when I try to use it over https by changing the websocket uri from ws to wss it does not connect.

What am I doing wrong. Connection is made using fancywebsockets.js

fancywebsockets.js

var FancyWebSocket = function(url)
{
    var callbacks = {};
    var ws_url = url;
    var conn;

    this.bind = function(event_name, callback){
        callbacks[event_name] = callbacks[event_name] || [];
        callbacks[event_name].push(callback);
        return this;// chainable
    };

    this.send = function(event_name, event_data){
        this.conn.send( event_data );
        return this;
    };

    this.connect = function() {
        if ( typeof(MozWebSocket) == 'function' )
            this.conn = new MozWebSocket(url);
        else
            this.conn = new WebSocket(url);

        // dispatch to the right handlers
        this.conn.onmessage = function(evt){
            dispatch('message', evt.data);
        };

        this.conn.onclose = function(){dispatch('close',null)}
        this.conn.onopen = function(){dispatch('open',null)}
    };

    this.disconnect = function() {
        this.conn.close();
    };

    var dispatch = function(event_name, message){
        var chain = callbacks[event_name];
        if(typeof chain == 'undefined') return; // no callbacks for this event
        for(var i = 0; i < chain.length; i++){
            chain[i]( message )
        }
    }
};

