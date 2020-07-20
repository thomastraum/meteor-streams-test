
import { Notifications } from '/api/notifications.js';
import '../api/userpresence.js';

//allow any connected client to listen on the stream
Notifications.permissions.read(function(userId, eventName) {
  return true;
});

Notifications.on('startup', function() {
  this.onDisconnect  = ()=>{
    const id  = this.subscriptionId;
    onDisconnectCallback(id);
  }
});

const onDisconnectCallback = function (subscriptionId) {
  console.log("onDisconnectCallback", subscriptionId);
  Notifications.emit('disconnected',
    subscriptionId
  )
};


//notify clients with a message per every second
// setInterval(function() {
//   console.log("asda");
//   Notifications.emit('message', 'Server Generated Message', Date.now());
// }, 1000);
