define(function(require, exports, module){
  var Action = require('Headshot/Action/Action'),
    Input = require('Headshot/Action/Input');

  /**
   * @class ActionFactory
   * @constructor
   */
  function ActionFactory(){
  }

  ActionFactory.generateId = function(){
    return Date.now();
  };

  ActionFactory.createInput = function(keyboard){
    var input = new Input;
    if(keyboard.isLeft){
      input.keyboard[37] = true;
    }
    if(keyboard.isTop){
      input.keyboard[38] = true;
    }
    if(keyboard.isRight){
      input.keyboard[39] = true;
    }
    if(keyboard.isDown){
      input.keyboard[40] = true;
    }

    return input;
  };

  ActionFactory.prototype.create = function(data, keyboard){
    var id = ActionFactory.generateId();
    data.input = ActionFactory.createInput(keyboard);

    return new Action(id, data);
  };

  module.exports = ActionFactory;
});
