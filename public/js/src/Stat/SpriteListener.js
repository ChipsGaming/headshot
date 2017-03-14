define(function(require){
  var $ = require('jquery');

  function SpriteListener(sprite, display){
    this.sprite = sprite;
    this.display = display;
    this.$display = $('#' + display);

    sprite.$el.on('update', $.proxy(this.onUpdate, this));
  }

  SpriteListener.prototype.onUpdate = function(){
    this.$display.html(this.sprite.state.x);
  };

  return SpriteListener;
});
