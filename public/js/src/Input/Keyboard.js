define(function(require){
  var $ = require('jquery');

  function Keyboard(){
    this.isLeft = false;
    this.isRight = false;
    this.isTop = false;
    this.isDown = false;

    $('body').keydown($.proxy(function(event){
      if(event.keyCode == 37){
        this.isLeft = true;
      }
      else if(event.keyCode == 38){
        this.isTop = true;
      }
      else if(event.keyCode == 39){
        this.isRight = true;
      }
      else if(event.keyCode == 40){
        this.isDown = true;
      }
    }, this));
    $('body').keyup($.proxy(function(event){
      if(event.keyCode == 37){
        this.isLeft = false;
      }
      else if(event.keyCode == 38){
        this.isTop = false;
      }
      else if(event.keyCode == 39){
        this.isRight = false;
      }
      else if(event.keyCode == 40){
        this.isDown = false;
      }
    }, this));
  }

  Keyboard.prototype.isLeft = function(){
    return this.isLeft;
  };

  Keyboard.prototype.isRight = function(){
    return this.isRight;
  };

  Keyboard.prototype.isTop = function(){
    return this.isTop;
  };

  Keyboard.prototype.isDown = function(){
    return this.isDown;
  };

  return Keyboard;
});
