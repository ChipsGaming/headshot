define(function(require){
  var $ = require('jquery');

  function Keyboard(){
    this.isLeft = false;
    this.isRight = false;

    $('body').keydown($.proxy(function(event){
      if(event.keyCode == 37){
        this.isLeft = true;
      }
      else if(event.keyCode == 39){
        this.isRight = true;
      }
    }, this));
    $('body').keyup($.proxy(function(event){
      if(event.keyCode == 37){
        this.isLeft = false;
      }
      else if(event.keyCode == 39){
        this.isRight = false;
      }
    }, this));
  }

  Keyboard.prototype.isLeft = function(){
    return this.isLeft;
  };

  Keyboard.prototype.isRight = function(){
    return this.isRight;
  };

  return Keyboard;
});
