
import { Notifications } from '/api/notifications.js';
import '../api/userpresence.js';

//allow any connected client to listen on the stream
Notifications.permissions.read(function(userId, eventName) {
  return true;
});

Notifications.on('message', function(content) {
    // this.onDisconnect  = onDisconnectCallback(this.id);
    console.log('message on the server');
  });

const onDisconnectCallback = function (e) {

  console.log("onDisconnectCallback");
};


//notify clients with a message per every second
// setInterval(function() {
//   console.log("asda");
//   Notifications.emit('message', 'Server Generated Message', Date.now());
// }, 1000);
