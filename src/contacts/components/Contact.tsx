import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { getActiveContact } from '../../store/rootReducer';
import { contactsAction } from '../contacts.store';
import { ContactForm } from './ContactForm';

export const Contact: React.FunctionComponent = () => {
  const activeContact = useSelector(getActiveContact);
  const isNewContact = !activeContact.values;
  const values = isNewContact
    ? {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
      }
    : activeContact.values;
  const dispatch = useDispatch();
  return (
    <div className="flex flex-1 justify-between flex-col self-center">
      <ContactForm
        values={values}
        isNew={isNewContact}
        onSubmit={(contact) => {
          const data = isNewContact
            ? { [v4()]: contact }
            : { [activeContact.id]: contact };

          dispatch(
            contactsAction.upsertContacts({
              contacts: data,
              updateStore: true,
            }),
          );
        }}
      />
    </div>
  );
};
