/**
 * @author Artur Sh. Mamedbekov
 */
if(typeof define !== 'function'){
  var define = require('amdefine')(module);
}

define(function(require, exports, module){
  /**
   * @class Action
   * @constructor
   * @param {string} id Идентификатор действия.
   * @param {any[]} data Данные.
   */
  function Action(id, data){
    this.id = id;
    this.data = data;
  }

  module.exports = Action;
});
