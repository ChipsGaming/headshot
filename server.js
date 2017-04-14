var express = require('express'),
  http = require('http'),
  Eureca = require('eureca.io'),
  Client = require('./model/Headshot/Server/Client'),
  ClientList = require('./model/Headshot/Server/ClientList'),
  World = require('./model/Headshot/World/World'),
  WorldObjectFactory = require('./model/Headshot/World/WorldObjectFactory'),
  Simulator = require('./model/Simulator'),
  GameServer = require('./model/GameServer');

// Create factory
var woFactory=new WorldObjectFactory();
var app = express(app),
  server = http.createServer(app),
  // Create server
  eurecaServer = new Eureca.Server({allow: ['sync', 'hello', 'bye']}),
  clients = new ClientList,
  // Create game world
  gameServer = new GameServer(new World(new Simulator), clients);

eurecaServer.attach(server);

/**
 * When client connect to server
 */
eurecaServer.onConnect(function(connection){
  // Create client from connection
  var client = Client.createFromConnection(connection);

  // Add client to list
  clients.add(client);
  // Add client to game world
  gameServer.world.add( woFactory.create(client.id));
  client.proxy.hello(client.id);
});

/**
 * When client disconnect from server
 */
eurecaServer.onDisconnect(function(connection) {
  // Remove client from 
  clients.remove(connection.id);
  // Remove client from game world
  gameServer.world.remove(connection.id);

  //????
  // Message to client when he disconnect
  clients.forEach(function(client){
    client.proxy.bye(connection.id);
  });
});

/**
 * Server exposed this method client side
 * Клиент отправляет 'Действие' серверу
 */
eurecaServer.exports.action = function(action){
  action.data.clientId = this.user.clientId;
  // Add action to server queue
  gameServer.action(action);
};

app.use(express.static('node_modules'));
app.use(express.static('model'));
app.use(express.static('public'));
app.get('/', function(req, res, next){
  res.sendfile('public/index.html');
});

// Set tick rate to game server
gameServer.setTickrate(100).run();

server.listen(8000);
console.log('Server running on port 8000');
