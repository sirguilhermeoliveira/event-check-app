import { Mongo } from 'meteor/mongo';

export const Communities = new Mongo.Collection('communities');

Communities.schema = {
    _id: { type: String, optional: false },
    name: { type: String, optional: false },
  };