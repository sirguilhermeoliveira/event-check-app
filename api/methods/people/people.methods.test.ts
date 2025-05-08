import { expect } from "chai";
import { Meteor } from "meteor/meteor";
import { People } from "../../collections/people/people";
import { loadInitialData } from "../../../server/loadInitialData";
import '../../../api/methods/people/people.methods';

if (Meteor.isServer) {
    describe("people.methods tests", function () {
        beforeEach(async function () {
            await People.removeAsync({});
            await loadInitialData();
        });

        it("should check in a person", async function () {
            const personId = "testPersonId";
            await People.insertAsync({ _id: personId, firstName: "John", lastName: "Doe" });

            await Meteor.callAsync("people.checkIn", personId);

            const person = await People.findOneAsync(personId);
            expect(person).to.have.property("checkInDate").that.is.not.null;
            expect(person).to.have.property("checkOutDate").that.is.null;
        });
        it("should throw an error if person not found during check-in", async function () {
            try {
                await Meteor.callAsync("people.checkIn", "nonExistentId");
            } catch (error: any) {
                expect(error.error).to.equal("person-not-found");
            }
        });

        it("should check out a person", async function () {
            const personId = "testPersonId";
            await People.insertAsync({
                _id: personId,
                firstName: "Guilherme",
                lastName: "Giancola",
                checkInDate: new Date(),
            });

            await Meteor.callAsync("people.checkOut", personId);

            const person = await People.findOneAsync(personId);
            expect(person).to.have.property("checkInDate").that.is.null;
            expect(person).to.have.property("checkOutDate").that.is.not.null;
        });

        it("should throw an error if person not found during check-out", async function () {
            try {
                await Meteor.callAsync("people.checkOut", "nonExistentId");
            } catch (error: any) {
                expect(error.error).to.equal("person-not-found");
            }
        });

        it("should throw an error if person is not checked in during check-out", async function () {
            const personId = "testPersonId";
            await People.insertAsync({ _id: personId, firstName: "John", lastName: "Doe" });

            try {
                await Meteor.callAsync("people.checkOut", personId);
            } catch (error: any) {
                expect(error.error).to.equal("not-checked-in");
            }
        });

        it("should find all people by event", async function () {
            const selectedEventId = "event123";
            await People.insertAsync({ communityId: selectedEventId, firstName: "John", lastName: "Doe" });
            await People.insertAsync({ communityId: selectedEventId, firstName: "Jane", lastName: "Smith" });

            const response = await Meteor.callAsync("people.findAllByEvent", "", 1, 5, selectedEventId);

            expect(response).to.have.property("people").that.is.an("array").with.lengthOf(2);
            expect(response).to.have.property("total").that.equals(2);
            expect(response).to.have.property("totalPages").that.equals(1);
        });
    })}