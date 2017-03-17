define(function(require, exports, module){
  function Debug($list){
    this.$list = $list;
    this.counter = 0;
  }

  Debug.prototype.log = function(title, message){
    if(this.counter >= 10){
      this.$list.prepend('<hr/>');
      this.counter = 0;
    }
    this.$list.prepend('<p><b>' + title + ':</b><br/>' + message + '</p>');
    this.counter++;
  };

  module.exports = Debug;
});
