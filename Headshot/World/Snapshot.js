/**
 * @author Artur Sh. Mamedbekov
 */
if(typeof define !== 'function'){
  var define = require('amdefine')(module);
}

define(function(require, exports, module){
  function Snapshot(id, state){
    this.id = id;
    this.state = state;
  }

  module.exports = Snapshot;
});
