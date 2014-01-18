angular.module('FoosServices', [], function($provide) {

  var FoosFlasher = function() {
      this.messages = [];
  }

  FoosFlasher.prototype.addMessage = function(msg) {
      console.log("adding msg: " + msg);
      this.messages.push(msg);
      console.log(this.messages);
  }

  FoosFlasher.prototype.getMessages = function() {
      var messages = this.messages.join("\n");
      this.messages = [];
      console.log("returning messages: " + messages);
      return messages;
  }

  $provide.factory('flasher', ['$window', function(win) {
    var flasher = new FoosFlasher();
    return flasher;
  }]);
});
