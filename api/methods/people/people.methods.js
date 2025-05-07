import { Meteor } from 'meteor/meteor';
import { People } from '../../collections/people/people';
import { check } from 'meteor/check';

Meteor.methods({
 async 'people.checkIn'(personId) {
      check(personId, String);
        
    const person = await People.findOneAsync(personId);

    if (!person) {
      throw new Meteor.Error('person-not-found', 'Person not found');
    }

    await People.updateAsync(personId, {
      $set: {
        checkInDate: new Date(),
        checkOutDate: null
      }
    });
  },

  async 'people.checkOut'(personId) {
    check(personId, String);

    const person = await People.findOneAsync(personId);
    if (!person) {
      throw new Meteor.Error('person-not-found', 'Person not found');
    }

    if (!person.checkInDate) {
      throw new Meteor.Error('not-checked-in', 'This person didn\'t check in');
    }

    await People.updateAsync(personId, {
      $set: {
        checkInDate: null,
        checkOutDate: new Date()
      }
    });
},

  async 'people.findAllByEvent'(searchTerm = '', page = 1, limit = 5, selectedEventId = '') {
    check(searchTerm, String);
    check(page, Number);
    check(limit, Number);
    check(selectedEventId, String);

    const nameParts = searchTerm.trim().split(/\s+/); 

    const nameRegexFilters = nameParts.map(part => ({
      $or: [
        { firstName: { $regex: part, $options: 'i' } },
        { lastName: { $regex: part, $options: 'i' } },
      ]
    }));
    
    const query = {
      $and: [
        { communityId: selectedEventId },
        ...(searchTerm ? nameRegexFilters : [])
      ]
    };
  
    const total = await People.find(query).countAsync();
    const totalCheckIn = await People.find({
      communityId: selectedEventId,
      checkInDate: { $ne: null }
    }).countAsync();
    const totalCheckInByCompany = await People.find({
      communityId: selectedEventId,
      checkInDate: { $ne: null }
    }).fetch();
    const totalPages = Math.ceil(total / limit);

    const people = await People.find(query, {
      skip: (page - 1) * limit,
      limit,
      sort: { firstName: 1 }
    }).fetch();

  return {
    people,
    total,
    totalPages,
    totalCheckIn,
    totalCheckInByCompany
  };
  }})