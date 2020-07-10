import { Notifications } from '/api/notifications.js';
import './main.html';

// getimage[0].style.transform = "translateX(0," + val + ")";
// translate with CSS
function moveTo(x,y) {
  $("#thesprite").css({
    top: y,
    left: x,
    position:'absolute'
  });
}

//listen on notifications on the message event
Notifications.on('message', function(message, time) {
  console.log(this.userId,this.subscriptionId);
  moveTo(message.x,message.y);
  var completeMessage = `${message.x} : ${message.y} @${new Date(time).toString()}`;
  $('#messages').prepend('<div>' + completeMessage + '</div>');
});

// setInterval(function() {
//   console.log("asda");
//   Notifications.emit('message',{
//     x:Math.random()*200,
//     y:Math.random()*200,
//   }, Date.now());
// }, 1000);

//simple clear message action
Template.body.events({

  'click #randomize-pos': function() {
    // console.log('clicked');
    Notifications.emit('message',{
      x:Math.random()*200,
      y:Math.random()*200,
    }, Date.now());
  },
  'click #clear-messages': function() {
    $('#messages').html('');
  }
});
