import { Meteor } from 'meteor/meteor';
import { Communities } from '../../collections/communities/communities';

Meteor.methods({
 async 'communities.findAll'() {
    return Communities.find().fetch();
  },
})