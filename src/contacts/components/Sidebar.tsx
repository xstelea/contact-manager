import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/Button';
import {
  getActiveContactId,
  getFilteredContactList,
} from '../../store/rootReducer';
import { contactsAction } from '../contacts.store';
import { Search } from './Search';

export const Sidebar: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const contactList = useSelector(getFilteredContactList);
  const activeContactId = useSelector(getActiveContactId);
  return (
    <div className="w-1/5 bg-gray-200 text-gray-800 justify-between flex flex-col">
      <Search />
      <div className="flex-grow">
        {contactList.map((item) => (
          <Button
            type="button"
            key={item.id}
            onClick={() => {
              dispatch(contactsAction.setActiveContact(item.id));
            }}
            className={`w-full hover:text-white focus:outline-none ${
              activeContactId === item.id ? 'bg-gray-800 text-white' : ''
            }`}
          >
            {item.firstName}
          </Button>
        ))}
      </div>

      <Button
        type="button"
        className="w-full border hover:text-white focus:outline-none"
        onClick={() => {
          dispatch(contactsAction.setActiveContact(''));
        }}
      >
        Add Contact
      </Button>
    </div>
  );
};
