define(function(require){
  var ActionFactory = require('Headshot/Action/ActionFactory'),
    Sprite = require('app/Display/Sprite'),
    Keyboard = require('app/Input/Keyboard'),
    Timer = require('app/Timer/Timer'),
    ServerMockBuilder = require('app/ServerMock/ServerMockBuilder'),
    $ = require('jquery');

  var client = new Eureca.Client,
    actionFactory = new ActionFactory,
    serverMock = ServerMockBuilder.getInstance(client, new Sprite('serverObject', {x: 0}))
      .latency(250)
      .update(100)
      .build(),
    serverReal = undefined,
    server = undefined,
    $server = $('#server'),
    $serverType = $('#server_type'),
    $actions = $('#actions'),
    $x = $('#x'),
    $serverX = $('#serverX'),
    $xDiff = $('#xDiff');

  $serverType.val('off');
  $server.hide();

  var obj = new Sprite('clientObject', {x: 0}),
    timer = new Timer(30),
    keyboard = new Keyboard,
    actions = [];

  $serverType.change(function(){
    obj.update({x: 0});
    serverMock.sprite.update({x: 0});
    serverMock.stop();
    if($serverType.val() == 'off'){
      server = undefined;
      $server.hide();
    }
    else if($serverType.val() == 'mock'){
      serverMock.run();
      server = serverMock;
      $server.show();
    }
    else{
      server = serverReal;
      $server.hide();
    }
    $serverType.blur();
  });

  function applyAction(action, obj){
    if(action.data.type == 'left'){
      obj.update({
        x: obj.state.x - 5
      });
    }
    else if(action.data.type == 'right'){
      obj.update({
        x: obj.state.x + 5
      });
    }
  }

  timer.update = function(){
    $x.html(obj.state.x);
    if(server !== undefined && server.sprite !== undefined){
      $serverX.html(server.sprite.state.x);
      $xDiff.html(obj.state.x - server.sprite.state.x);
    }
    $actions.html(actions.length);

    if(keyboard.isLeft){
      var action = actionFactory.create({type: 'left'});
    }
    else if(keyboard.isRight){
      var action = actionFactory.create({type: 'right'});
    }
    else{
      return;
    }

    actions.push(action);
    if(server !== undefined){
      server.action(action);
    }
    applyAction(action, obj); // Прогнозирование
  };
  timer.run();

  client.exports.sync = function(snapshot){
    obj.update({
      x: snapshot.state.x
    });
    // Согласование
    var i = 0;
    while(i < actions.length){
      var action = actions[i];
      if(action.id <= snapshot.id){
        actions.splice(i, 1);
      }
      else{
        applyAction(action, obj);
        i++;
      }
    }
  };

  client.ready(function(serverProxy){
    serverReal = serverProxy;
  });
});
