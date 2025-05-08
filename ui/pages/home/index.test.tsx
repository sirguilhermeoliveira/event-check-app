import React from 'react';
import { Meteor } from "meteor/meteor";
import { expect } from 'chai';
import { Home } from './index';
import { render } from '@testing-library/react';
import { loadInitialData } from '../../../server/loadInitialData';
import { People } from "../../../api/collections/people/people";
import { Communities } from "../../../api/collections/communities/communities";
import sinon from 'sinon';
import { fireEvent } from '@testing-library/react';

if (typeof window === "undefined") {
  const { JSDOM } = require("jsdom");
  const dom = new JSDOM('<!doctype html><html><body></body></html>');
  global.window = dom.window;
  global.document = dom.window.document;
  if (!global.navigator) {
    global.navigator = dom.window.navigator;
  }
}

if (Meteor.isServer) {
    let stubCall: sinon.SinonStub;
  describe('home tests', () => {
    beforeEach(async function () {
          stubCall = sinon.stub(Meteor, 'call');
      await People.removeAsync({});
      await Communities.removeAsync({});
      await loadInitialData();
    });

      afterEach(() => {
    stubCall.restore();
  });

    it('should render loading', () => {
      const { getByText } = render(<Home />);
      const loadingElement = getByText('...Loading');
      expect(loadingElement.textContent).to.equal('...Loading');
    });

    it('should not render error or data elements while loading', () => {
      const { queryByTestId } = render(<Home />);
      expect(queryByTestId('error')).to.be.null;
      expect(queryByTestId('data')).to.be.null;
    });

     it('should fetch events and render EventSelect', async () => {
    stubCall.withArgs('communities.findAll').yields(null, [
      { _id: '1', name: 'Event 1' },
      { _id: '2', name: 'Event 2' },
    ]);

    const { findByText } = render(<Home />);
    const eventElement = await findByText('Event 1');
    expect(eventElement).to.exist;
  });

  it('should fetch people when an event is selected', async () => {
    stubCall.withArgs('communities.findAll').yields(null, [
      { _id: '1', name: 'Event 1' },
      { _id: '2', name: 'Event 2' },
    ]);

    stubCall.withArgs('people.findAllByEvent').yields(null, {
      total: 1,
      totalCheckIn: 1,
      totalPages: 1,
      people: [{ _id: '1', firstName: 'Guilherme', lastName: "Silva", companyName: "Test Company", title: "Dev", communityId: "1", checkInDate: null, checkOutDate: null }],
    });

      const { findByRole, findByText } = render(<Home />);

 const select = await findByRole('combobox');

   fireEvent.change(select, { target: { value: '1' } });
   
 const personElement = await findByText((content, element) =>
  content.startsWith('Test Company')
  );
    expect(personElement).to.exist;
  });
  });
}