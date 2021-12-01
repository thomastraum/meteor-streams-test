import { Template } from 'meteor/templating';
import { Notifications } from '/api/notifications.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import { mouseSprite } from './mousesprite';

import './users-show.js';
import './main.html';

Template.body.onCreated(function() {
    this.autorun(() => {
        // this.subscribe('userPresence')
    });

    this.autorun(() => {
        if (this.subscriptionsReady()) {
            // createMice( Presences.find({}).count() );
        }
    });
    Notifications.emit('startup', "");
});

Template.body.rendered = function() {};

Template.main.helpers({
    getUsersCount: () => {
        // return Presences.find({}).count();
    }
})

Template.body.events({
    'mousemove ': function(e) {
        const percentOffsetX = e.offsetX / $('body').width();
        const percentOffsetY = e.offsetY / $('body').height();

        Notifications.emit('message', {
            x: percentOffsetX,
            y: percentOffsetY,
        });
    },
    'click #clear-messages': function() {
        $('#messages').html('');
    }
});

const allMice = {};
const allIds = [];

function createMice(count) {
    // write somerhing here later
    console.log('count', count);
};

Notifications.on('disconnected', function(subscriptionId) {
    console.log('disconnected', subscriptionId);
    // console.log(allMice);
    if (allMice[subscriptionId]) {
        allMice[subscriptionId].deleteMe();
        delete allMice[subscriptionId];
    }
});

//listen on notifications on the message event
Notifications.on('message', function(message) {
    if (!allMice[this.subscriptionId]) {
        const mouse = new mouseSprite(this.subscriptionId);
        allMice[this.subscriptionId] = mouse;
        console.log(allIds.length);
    }
    allMice[this.subscriptionId].moveSprite(message.x * $('body').width(), message.y * $('body').height());

});