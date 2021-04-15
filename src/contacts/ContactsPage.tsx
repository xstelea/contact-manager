import React from 'react';
import { Contact, Sidebar } from './components';

export const ContactsPage: React.FunctionComponent = () => {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <Contact />
    </div>
  );
};
