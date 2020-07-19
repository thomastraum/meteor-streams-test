import { Template } from 'meteor/templating';
import { Notifications } from '/api/notifications.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
// import '/api/userpresence.js';

import { mouseSprite } from './mousesprite';

import './users-show.js';
import './main.html';

const allMice = [];
const allIds = [];


//listen on notifications on the message event
Notifications.on('message', function(message) {
  if (!allIds.includes(this.subscriptionId)) {
      const mouse = new mouseSprite( this.subscriptionId );
      allMice.push(mouse);
      allIds.push(this.subscriptionId);
      Session.set('usersNumber', allIds.length);
      console.log(allIds.length);
  }

  for (var i = 0; i < allMice.length; i++) {
    const myMice = allMice[i];
    if (this.subscriptionId === myMice.id) {
      myMice.moveSprite( message.x * $('body').width(), message.y *  $('body').height())
    }
  }
});

Template.body.onCreated(function() {
  this.autorun(()=>{
    this.subscribe('userPresence')
    Session.set('usersNumber', allIds.length);
  })
});

Template.body.rendered = function(){
};

Template.main.helpers({
  getUsersCount: ()=>{
    return Presences.find({}).count();
  }
})

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
