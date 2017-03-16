/**
 * @author Artur Sh. Mamedbekov
 */
if(typeof define !== 'function'){
  var define = require('amdefine')(module);
}

define(function(require, exports, module){
  function Snapshot(id, objects){
    this.id = id;
    this.objects = objects;
  }

  module.exports = Snapshot;
});
