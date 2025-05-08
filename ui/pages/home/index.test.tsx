import React from 'react';
import { Meteor } from "meteor/meteor";
import { expect } from 'chai';
import { Home } from './index';
import { render } from '@testing-library/react';
import { loadInitialData } from '../../../server/loadInitialData';
import { People } from "../../../api/collections/people/people";
import { Communities } from "../../../api/collections/communities/communities";

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
  describe('home tests', () => {
    beforeEach(async function () {
      await People.removeAsync({});
      await Communities.removeAsync({});
      await loadInitialData();
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
  });
}