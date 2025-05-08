import { Meteor } from 'meteor/meteor';
import { loadInitialData } from './loadInitialData';
import '../api/methods/people/people.methods';
import '../api/methods/communities/communities.methods';

Meteor.startup(async () => {
await loadInitialData();
});