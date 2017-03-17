define(function(require, exports, module){
  var Action = require('Headshot/Action/Action'),
    Input = require('Headshot/Action/Input');

  /**
   * @class ActionFactory
   * @constructor
   */
  function ActionFactory(){
    this.currentId = 0;
  }

  ActionFactory.prototype.generateId = function(){
    return this.currentId++;
  };

  ActionFactory.createInput = function(keyboard){
    /*
    if(!keyboard.isLeft && !keyboard.isTop && !keyboard.isRight && !keyboard.isDown){
      return undefined;
    }
    */

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
    var id = this.generateId();
    data.input = ActionFactory.createInput(keyboard);

    return new Action(id, data);
  };

  module.exports = ActionFactory;
});
