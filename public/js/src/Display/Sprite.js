define(function(require){
  var $ = require('jquery');

  function Sprite(id, state){
    this.id = id;
    this.$el = $('#' + id);
    this.state = state;

    this.update();
  }

  Sprite.prototype.update = function(){
    this.$el.css('left', this.state.x + 'px');

    this.$el.trigger('update');
  };

  return Sprite;
});
