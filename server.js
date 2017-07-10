var http    = require('http'),
    configs = require('./config'),
    ev      = require('./ev'),
    axios   = require('axios');
var server  = http.createServer();
var io      = require('socket.io');
var socket  = io(server);
var users   = [],
    clients = [];

socket.on('connection', client => {
  client.on(ev.events.LOGIN, data => {
    handleLogin(data, client)
  });
  client.on(ev.events.DISCONNECT, re => {
    var i    = clients.indexOf(client);
    var user = users[i];
    user && handleLogout(user);
    clients.splice(i, 1);
    users.splice(i, 1);
  });
  client.on(ev.commands.RELOAD, data => {
    socket.emit(ev.events.RELOAD, data)
  });
  client.on(ev.commands.NOTICE, data => {
    socket.emit(ev.events.NOTICE, data)
  });
  client.on(ev.commands.GIFT, data => {
    socket.emit(ev.events.GIFT, data)
  })
});
server.listen(configs.SERVER_PORT);
function handleLogin({id, roomId, mainId, loginId}, client) {
  var user = {
    id    : id,
    roomId: roomId,
    mainId: mainId,
    loginId : loginId
  };
  users.push(user);
  clients.push(client);
  loginUser(user, roomId);
  console.log(`${id} login room ${roomId}`);
}

function loginUser(user, roomId) {
  axios.post(configs.API_ADDRESS + '/join', user).then(re => {
    socket.emit(ev.events.USERS, {
      roomId: roomId,
      mainId: user.mainId
    });
  });
}

function handleLogout({id, roomId, mainId, loginId}) {
  var user = {
    id    : id,
    roomId: roomId,
    loginId : loginId
  };
  axios.post(configs.API_ADDRESS + '/leave', user).then(re => {
    socket.emit(ev.events.USERS, {
      roomId: roomId,
      mainId: mainId,
    });
  });
  console.log(`${id} logout room ${roomId}`);
}

