import { Notifications } from '/api/notifications.js';
import { mouseSprite } from './mousesprite';
import './main.html';

function moveTo(x,y) {
  document.getElementById("thesprite").style.transform = `translate(${x}px,${y}px)`;
}

//listen on notifications on the message event
Notifications.on('message', function(message) {
  // console.log(this.userId,this.subscriptionId);

  moveTo( message.x * $('body').width(), message.y *  $('body').height() );
  // var completeMessage = `${message.x} : ${message.y}`;
  // $('#messages').prepend('<div>' + completeMessage + '</div>');
});


Template.body.rendered = function(){
  myMouse1 = new mouseSprite();
};

//simple clear message action
Template.body.events({
  'mousemove ' : function(e) {
    const percentOffsetX = e.offsetX /  $('body').width();
    const percentOffsetY = e.offsetY /  $('body').height();

// console.log(percentOffsetX);
    Notifications.emit('message',{
      x : percentOffsetX,
      y : percentOffsetY,
    });
  },
  'click #clear-messages': function() {
    $('#messages').html('');
  }
});
