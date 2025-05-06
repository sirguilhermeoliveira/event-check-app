import { Communities } from '../api/collections/communities/communities';
import { People } from '../api/collections/people/people';
import { PEOPLE_DATA } from '../seeds/people.seed';
import { COMMUNITIES_DATA } from '../seeds/communities.seed';

export const loadInitialData = async () => {
  if ((await Communities.find().countAsync()) === 0) {
    for await (const community of COMMUNITIES_DATA) {
      await Communities.insertAsync(community);
    }
  }
  
  if ((await People.find().countAsync()) === 0) {
    const communities = await Communities.find().fetchAsync();
    let idx = 0;
    for await (const person of PEOPLE_DATA) {
      await People.insertAsync({
        ...person,
        communityId: communities[idx++ % communities.length]._id,
      });
    }
  }
};
