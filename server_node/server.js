let io = require("socket.io")(1000);

console.log('Connecting to port ' + 1000);

io.on('error', function (socket) {
    console.log('error: ' + socket);
});

io.on('connection', function (socket) {
    console.log('connection: ' + socket.id);
});

let Redis = require('ioredis');
let redis = new Redis(6379);
 
redis.psubscribe("*", function (error, count) {

});

redis.on('pmessage', function (partner, channel, message) {
    
    message = JSON.parse(message);

    // console.log(partner);
    // console.log(channel);
    // console.log(message);

    io.emit(channel + ':' + message.event, message.data.message);
    console.log('DH send ', channel + ':' + message.event);
});