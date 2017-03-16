define(function(require){
  var ActionFactory = require('app/Action/ActionFactory'),
    ActionsQueue = require('Headshot/Action/ActionsQueue'),
    State = require('Headshot/World/State'),
    World = require('Headshot/World/World'),
    Sprite = require('app/Display/Sprite'),
    Simulator = require('Simulator'),
    ServerMockBuilder = require('app/ServerMock/ServerMockBuilder'),
    SpriteListener = require('app/Stat/SpriteListener'),
    DiffSpriteListener = require('app/Stat/DiffSpriteListener'),
    Keyboard = require('app/Input/Keyboard'),
    Timer = require('app/Timer/Timer'),
    $ = require('jquery');

  // World
  var player = new State('Player'),
    playerMock = new State('Player'),
    world = new World(new Simulator),
    worldMock = new World(new Simulator),
    actionFactory = new ActionFactory,
    pendingActions = new ActionsQueue;
  world.add(player);
  worldMock.add(playerMock);

  // Server
  var client = new Eureca.Client,
    serverMock = ServerMockBuilder.getInstance(worldMock, client)
      .latency(250)
      .tickrate(100)
      .build(),
    serverReal = undefined,
    server = undefined;

  // Display
  var playerSprite = new Sprite('clientObject', player),
    playerMockSprite = new Sprite('serverObject', playerMock),
    timer = new Timer(30),
    keyboard = new Keyboard,
    $server = $('#server'),
    $serverType = $('#server_type');

  // Статистика
  new SpriteListener(playerSprite, 'clientSpriteStat');
  new SpriteListener(playerMockSprite, 'serverSpriteStat');
  new DiffSpriteListener(playerSprite, playerMockSprite, 'diffSpriteStat');

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
    player.x = 0;
    playerMock.x = 0;

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

  timer.update = function(){
    playerSprite.update();
    playerMockSprite.update();

    var action = actionFactory.create({objectId: 'Player'}, keyboard);
    if(action.data.input.keyboard.length == 0 && action.data.input.mouse.length == 0){
      return;
    }

    if(server !== undefined){
      server.action(action);
    }
    pendingActions.push(action);
    world.simulate(action); // Прогнозирование
  };
  timer.run();

  function reconciliation(actionsQueue, snapshot){
    var pendingActions = new ActionsQueue;

    while(actionsQueue.has()){
      var action = actionsQueue.shift();
      if(action.id <= snapshot.id){
        continue;
      }
      world.simulate(action);
      pendingActions.push(action);
    }

    return pendingActions;
  }

  client.exports.sync = function(snapshot){
    player.x = snapshot.state.x;

    // Согласование
    pendingActions = reconciliation(pendingActions, snapshot)
  };

  client.ready(function(serverProxy){
    serverReal = serverProxy;
  });
});
