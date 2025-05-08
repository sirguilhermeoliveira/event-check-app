import { Meteor } from 'meteor/meteor';
import { People } from '../../collections/people/people';
import { check } from 'meteor/check';
import { Person } from 'shared/types';
import { PeopleResponse } from 'ui/pages/home/types';

Meteor.methods({
 async 'people.checkIn'(personId: string): Promise<void> {
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

  async 'people.checkOut'(personId: string): Promise<void> {
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

  async 'people.findAllByEvent'(
    searchTerm: string = '',
    page: number = 1,
    limit: number = 5,
    selectedEventId: string = ''
  ): Promise<PeopleResponse> {
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

    interface Query {
      $and: (({ communityId: string; } | { $or: ({ firstName: { $regex: string; $options: string; }; } | { lastName: { $regex: string; $options: string; }; })[]; })[] );
    }
    
    const query: Query = {
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

    const checkedInPeople = await People.find({
      communityId: selectedEventId,
      checkInDate: { $ne: null }
    }).fetchAsync() as Person[];

    const totalCheckInByCompany: Record<string, number> = checkedInPeople.reduce((acc: Record<string, number>, person: Person) => {
      if (person.companyName) {
        acc[person.companyName] = (acc[person.companyName] || 0) + 1;
      }
      return acc;
    }, {});

    const totalPages = Math.ceil(total / limit);

    const people = await People.find(query as any, {
      skip: (page - 1) * limit,
      limit,
      sort: { firstName: 1 }
    }).fetchAsync() as Person[];

    return {
      people,
      total,
      totalPages,
      totalCheckIn,
      totalCheckInByCompany
    };
  }})