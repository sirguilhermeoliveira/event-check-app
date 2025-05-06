import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createRoot } from 'react-dom/client';
import { Home } from '../ui/pages/home/index';

Meteor.startup(() => {
  const root = createRoot(document.getElementById('app'));
  root.render(<Home />);
});
