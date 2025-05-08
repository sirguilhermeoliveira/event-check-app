import { expect } from "chai";
import { Meteor } from "meteor/meteor";
import { Communities } from "../../collections/communities/communities";
import { loadInitialData } from "../../../server/loadInitialData";
import '../../../api/methods/communities/communities.methods';

if (Meteor.isServer) {
    describe("communities.methods tests", function () {
        beforeEach(async function () {
            await Communities.removeAsync({});
            await loadInitialData();
        });
        it("should return all communities when 'communities.findAll' is called", async function () {
            const result = await Meteor.callAsync('communities.findAll');
            const allCommunities = Communities.find().fetch();
            expect(result).to.be.an('array');
        });
    
        it("should return an empty array if no communities exist", async function () {
            await Communities.removeAsync({});
            const result = await Meteor.callAsync('communities.findAll');
    
            expect(result).to.be.an('array');
            expect(result).to.have.lengthOf(0);
        });
    })}