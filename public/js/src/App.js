define(function(require){
  var ActionFactory = require('app/Action/ActionFactory'),
    ActionsQueue = require('Headshot/Action/ActionsQueue'),
    State = require('Headshot/World/State'),
    World = require('Headshot/World/World'),
    Simulator = require('Simulator'),
    Keyboard = require('app/Input/Keyboard'),
    Debug = require('app/Debug/Debug'),
    $ = require('jquery'),
    Phaser = require('Phaser');

  // World
  var myId = undefined,
    world = new World(new Simulator),
    actionFactory = new ActionFactory,
    pendingActions = new ActionsQueue,
    sprites = {};

  // Server
  var client = new Eureca.Client,
    server = undefined;

  // Display
  var keyboard = new Keyboard,
    debug = new Debug($('#debug'));

  var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser', {
    preload: function(game){
      game.load.spritesheet('dude','img/dude.png',32,48);
    },
    create: function(game){
      game.time.advancedTiming = true;
      game.time.desiredFps = 30;
      //game.stage.disableVisibilityChange = false;
      game.physics.startSystem(Phaser.Physics.ARCADE);
    },
    update: function(game){
      if(server === undefined || myId === undefined){
        return;
      }

      for(var id in sprites){
        var state = world.get(id),
          sprite = sprites[id];

        sprite.body.x = state.x;
        sprite.body.y = state.y;
        /*
        sprite.body.velocity.x = state.velocity.x;
        sprite.body.velocity.y = state.velocity.y;
        if(state.velocity.x > 0){
          sprite.animations.play('right');
        }
        else if(state.velocity.x < 0){
          sprite.animations.play('left');
        }
        else{
          sprite.animations.stop();
          sprite.frame = 4;
        }
        */
      }

      if(!keyboard.isTop && !keyboard.isDown && !keyboard.isLeft && !keyboard.isRight){
        return;
      }
      var action = actionFactory.create({objectId: myId}, keyboard);
    
      if(server !== undefined){
        server.action(action);
      }
      pendingActions.push(action);
      world.simulate(action); // Прогнозирование
    },
    render: function(game){
      game.debug.text('FPS: ' + game.time.fps, 10, 20);
      game.debug.text('ID: ' + myId, 10, 40);
    }
  });

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
    debug.log('Sync', snapshot.id)

    for(var id in snapshot.objects){
      var state = snapshot.objects[id];

      if(!world.hasId(state.id)){
        var player = new State(state.id);
        world.add(player);
        
        var playerSprite = game.add.sprite(game.world.width / 2 - 32 / 2, game.world.height / 2 - 48 / 2,'dude');
        sprites[player.id] = playerSprite;
        
        playerSprite.animations.add('left',[0,1,2,3],10,true);
        playerSprite.animations.add('right',[5,6,7,8],10,true);
        game.physics.arcade.enable(playerSprite)

        debug.log('New player', state.id);
      }
      else{
        var player = world.get(state.id);
      }

      /*
      player.velocity.x = state.velocity.x;
      player.velocity.y = state.velocity.y;
      */
      player.x = state.x;
      player.y = state.y;
    }

    // Согласование
    pendingActions = reconciliation(pendingActions, snapshot);
  };

  client.exports.hello = function(id, serverTime){
    myId = id;
    actionFactory.timeDiff=serverTime-Date.now();

    debug.log('My id', myId);
  };

  client.exports.bye = function(id){
    world.remove(id);
    var sprite = sprites[id];
    delete sprites[id];
    sprite.kill();

    debug.log('Client disabled', id);
  };

  client.ready(function(serverProxy){
    server = serverProxy;
  });
});
