define(function(require){
  var ActionFactory = require('Action/ActionFactory'),
    ActionsQueue = require('Action/ActionsQueue'),
    Sprite = require('app/Display/Sprite'),
    SpriteListener = require('app/Stat/SpriteListener'),
    DiffSpriteListener = require('app/Stat/DiffSpriteListener'),
    Keyboard = require('app/Input/Keyboard'),
    Timer = require('app/Timer/Timer'),
    ServerMockBuilder = require('app/ServerMock/ServerMockBuilder'),
    $ = require('jquery');

  var client = new Eureca.Client,
    actionFactory = new ActionFactory,
    serverMock = ServerMockBuilder.getInstance(client, new Sprite('serverObject', {x: 0}))
      .latency(250)
      .tickrate(100)
      .build(),
    serverReal = undefined,
    server = undefined,
    obj = new Sprite('clientObject', {x: 0}),
    timer = new Timer(30),
    keyboard = new Keyboard,
    pendingActions = new ActionsQueue,
    $server = $('#server'),
    $serverType = $('#server_type');

  // Статистика
  new SpriteListener(obj, 'clientSpriteStat');
  new SpriteListener(serverMock.sprite, 'serverSpriteStat');
  new DiffSpriteListener(obj, serverMock.sprite, 'diffSpriteStat');

  $('#fps').on('change', function(){
    var $this = $(this),
      fps = parseInt($this.val());
    if(fps <= 0){
      fps = 30;
      $this.val(30);
    }

    timer.setFPS(fps);
  });
  $('#tickrate').on('change', function(){
    var $this = $(this),
      tickrate = parseInt($this.val());
    if(tickrate <= 1){
      tickrate = 100;
      $this.val(100);
    }

    serverMock.setTickrate(tickrate);
  });
  $('#latency').on('change', function(){
    var $this = $(this),
      latency = parseInt($this.val());
    if(latency < 0){
      latency = 250;
      $this.val(250);
    }

    serverMock.latency = latency;
  });

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
  $serverType.val('off');
  $server.hide();

  function simulateAction(action, obj){
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
    if(keyboard.isLeft){
      var action = actionFactory.create({type: 'left'});
    }
    else if(keyboard.isRight){
      var action = actionFactory.create({type: 'right'});
    }
    else{
      return;
    }

    if(server !== undefined){
      server.action(action);
    }
    pendingActions.push(action);

    // Прогнозирование
    simulateAction(action, obj);
  };
  timer.run();

  function reconciliation(actionsQueue, snapshot){
    var pendingActions = new ActionsQueue;

    while(actionsQueue.has()){
      var action = actionsQueue.shift();
      if(action.id <= snapshot.id){
        continue;
      }
      simulateAction(action, obj);
      pendingActions.push(action);
    }

    return pendingActions;
  }

  client.exports.sync = function(snapshot){
    obj.update({
      x: snapshot.state.x
    });

    // Согласование
    pendingActions = reconciliation(pendingActions, snapshot)
  };

  client.ready(function(serverProxy){
    serverReal = serverProxy;
  });
});
