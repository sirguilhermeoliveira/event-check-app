import { Mongo } from 'meteor/mongo';
import { Events } from 'shared/types';

export const Communities = new Mongo.Collection<Events>('communities');
