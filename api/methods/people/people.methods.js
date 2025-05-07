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

  async 'people.findAll'(searchTerm = '', page = 1, limit = 5) {
    check(searchTerm, String);
    check(page, Number);
    check(limit, Number);

    const nameParts = searchTerm.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');
    
    const query = {
      $and: [
        { firstName: { $regex: firstName, $options: 'i' } },
        { lastName: { $regex: lastName, $options: 'i' } }
      ]
    };

    const total = await People.find().countAsync();
    const totalCheckIn = await People.find({ checkInDate: { $ne: null } }).countAsync();
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
    totalCheckIn
  };
  }})