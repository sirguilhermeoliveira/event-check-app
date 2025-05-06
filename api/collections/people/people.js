import { Mongo } from 'meteor/mongo';

export const People = new Mongo.Collection('people');

People.schema = {
    _id: { type: String, optional: true },
    firstName: {type: String, optional: false},
    lastName: {type: String, optional: false},
    title: {type: String, optional: false},
    companyName: {type: String, optional: false},
    checkInDate: { type: Date, optional: true },
    checkOutDate: { type: Date, optional: true }
  };