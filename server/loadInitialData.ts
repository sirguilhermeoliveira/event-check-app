import { Communities } from '../api/collections/communities/communities';
import { People } from '../api/collections/people/people';
import { PEOPLE_DATA } from '../seeds/people.seed';
import { COMMUNITIES_DATA } from '../seeds/communities.seed';
import { Events, Person } from 'shared/types';



export const loadInitialData = async (): Promise<void> => {
  if ((await Communities.find().countAsync()) === 0) {
    for await (const community of COMMUNITIES_DATA as Events[]) {
      await Communities.insertAsync(community);
    }
  }

  if ((await People.find().countAsync()) === 0) {
    const communities = (await Communities.find().fetchAsync()) as Events[];
    let idx = 0;

    for await (const person of PEOPLE_DATA as Person[]) {
      await People.insertAsync({
        ...person,
        communityId: communities[idx++ % communities.length]._id,
      });
    }
  }
};
