var express = require('express'),
  http = require('http'),
  Eureca = require('eureca.io'),
  GameServer = require('./backend/GameServer');

var app = express(app),
  server = http.createServer(app),
  eurecaServer = new Eureca.Server({allow: ['sync']}),
  clients = {},
  gameServer = new GameServer({x: 0}, clients);

eurecaServer.attach(server);
eurecaServer.onConnect(function(connection){
  clients[connection.id] = connection.clientProxy;
});
eurecaServer.onDisconnect(function(connection){
  if(clients[connection.id] === undefined){
    return;
  }
  delete clients[connection.id];
});
eurecaServer.exports.action = function(action){
  gameServer.action(action);
};

app.use(express.static('node_modules'));
app.use(express.static('Headshot'));
app.use(express.static('public'));
app.get('/', function(req, res, next){
  res.sendfile('public/index.html');
});

gameServer.setTickrate(50).run();
server.listen(8000);
console.log('Server running on port 8000');
