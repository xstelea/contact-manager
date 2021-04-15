import React from 'react';
import { useDispatch } from 'react-redux';
import { contactsAction } from '../contacts.store';

export const Search: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  return (
    <input
      className="p-3 w-full outline-none"
      type="text"
      placeholder="Search contacts..."
      onChange={(event) => {
        dispatch(contactsAction.search(event.target.value.toLowerCase()));
      }}
    />
  );
};
