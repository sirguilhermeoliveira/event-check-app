import { Mongo } from 'meteor/mongo';
import { Person } from 'shared/types';

export const People = new Mongo.Collection<Person>('people');