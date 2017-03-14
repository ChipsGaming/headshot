define(function(require){
  var $ = require('jquery');

  function DiffSpriteListener(spriteA, spriteB, display){
    this.spriteA = spriteA;
    this.spriteB = spriteB;
    this.display = display;
    this.$display = $('#' + display);

    spriteA.$el.on('update', $.proxy(this.onUpdate, this));
    spriteB.$el.on('update', $.proxy(this.onUpdate, this));
  }

  DiffSpriteListener.prototype.onUpdate = function(){
    this.$display.html(this.spriteA.state.x - this.spriteB.state.x);
  };

  return DiffSpriteListener;
});
