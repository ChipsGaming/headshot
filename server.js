var express = require('express'),
  http = require('http'),
  Eureca = require('eureca.io'),
  Client = require('./model/Headshot/Server/Client'),
  ClientList = require('./model/Headshot/Server/ClientList'),
  World = require('./model/Headshot/World/World'),
  State = require('./model/Headshot/World/State'),
  Simulator = require('./model/Simulator'),
  GameServer = require('./model/GameServer');

var app = express(app),
  server = http.createServer(app),
  eurecaServer = new Eureca.Server({allow: ['sync', 'hello', 'bye']}),
  clients = new ClientList,
  gameServer = new GameServer(new World(new Simulator), clients);

eurecaServer.attach(server);
eurecaServer.onConnect(function(connection){
  var client = Client.createFromConnection(connection);

  clients.add(client);
  gameServer.world.add(new State(client.id));
  client.proxy.hello(client.id);
});
eurecaServer.onDisconnect(function(connection){
  clients.remove(connection.id);
  gameServer.world.remove(connection.id);

  clients.forEach(function(client){
    client.proxy.bye(connection.id);
  });
});
eurecaServer.exports.action = function(action){
  gameServer.action(action);
};

app.use(express.static('node_modules'));
app.use(express.static('model'));
app.use(express.static('public'));
app.get('/', function(req, res, next){
  res.sendfile('public/index.html');
});

gameServer.setTickrate(100).run();
server.listen(8000);
console.log('Server running on port 8000');
