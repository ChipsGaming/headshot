var express = require('express'),
  http = require('http'),
  Eureca = require('eureca.io'),
  Snapshot = require('./Headshot/Server/Snapshot');

var app = express(app),
  server = http.createServer(app),
  eurecaServer = new Eureca.Server({allow: ['sync']}),
  currentState = {
    x: 0
  };

eurecaServer.attach(server);
eurecaServer.exports.action = function(action){
  if(action.data.type == 'left'){
    currentState = {
      x: currentState.x - 5
    };
  }
  else if(action.data.type == 'right'){
    currentState = {
      x: currentState.x + 5
    };
  }

  this.clientProxy.sync(new Snapshot(action.id, currentState));
};

app.use(express.static('node_modules'));
app.use(express.static('Headshot'));
app.use(express.static('public'));
app.get('/', function(req, res, next){
  res.sendfile('public/index.html');
});

server.listen(8000);
console.log('Server running on port 8000');
