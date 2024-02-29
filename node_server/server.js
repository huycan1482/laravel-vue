// let io = require("socket.io")(6001);

// console.log('Connecting to port ' + 6001);

// io.on('error', function (socket) {
//     console.log('error: ' + socket);
// });

// io.on('connection', function (socket) {
//     console.log('connection: ' + socket.id);
// });

const express = require('express');
const app = express();
const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer, {
	cors: {
		origin: "http://laravel-vue.local.com",
	},
});

io.on('connection', function (socket) {
    console.log('connection: ' + socket.id);

    // socket.on("join", (...args) => {
    //   	socket.join([args[0]]);
    // });

	socket.broadcast.emit("room-1", {
		mess: 'hi'
	});

});

httpServer.listen(3000, () => {
  	console.log('listening on *:3000');
});

// let redis = new Redis(6379);
 
// redis.psubscribe("*", function (error, count) {

// });

// redis.on('pmessage', function (partner, channel, message) {
    
//     message = JSON.parse(message);

//     // console.log(partner);
//     // console.log(channel);
//     // console.log(message);

//     io.emit(channel + ':' + message.event, message.data.message);
//     console.log('DH send ', channel + ':' + message.event);
// });