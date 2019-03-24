var socket = require('socket.io-client')("http://51.77.192.7:3000",{query: "id=idc"});

module.exports.socket = socket;