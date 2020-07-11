import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'

import './users-show.html'

Template.users_show.onCreated(function() {

});

Template.users_show.helpers({
  getCurrentUsers(){
    return Session.get('usersNumber')
  },
});
