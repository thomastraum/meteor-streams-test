
import { Notifications } from '/api/notifications.js';

//allow any connected client to listen on the stream
Notifications.permissions.read(function(userId, eventName) {
  return true;
});

//notify clients with a message per every second
// setInterval(function() {
//   console.log("asda");
//   Notifications.emit('message', 'Server Generated Message', Date.now());
// }, 1000);
