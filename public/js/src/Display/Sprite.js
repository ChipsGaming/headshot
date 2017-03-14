define(function(require){
  var $ = require('jquery');

  function Sprite(id, state){
    this.id = id;
    this.$el = $('#' + id);
    this.state = {};

    this.update(state);
  }

  Sprite.prototype.update = function(state){
    this.state = state;
    this.$el.css('left', state.x + 'px');
  };

  return Sprite;
});
