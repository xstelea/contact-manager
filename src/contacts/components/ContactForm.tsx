import React, { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { IContact } from '../contact.interface';
import { ContactFormInput } from './ContactFormInput';

export const ContactForm: React.FunctionComponent<{
  values: IContact;
  onSubmit: (values: IContact) => void;
  isNew: boolean;
}> = ({ values, onSubmit, isNew }) => {
  const [state, setState] = useState(values);

  useEffect(() => {
    setState(
      isNew
        ? {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            address: '',
          }
        : values,
    );
  }, [isNew, values]);

  return (
    <form
      className="flex w-1/2 self-center flex-col"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(state);
      }}
    >
      {[
        { id: 'firstName', name: 'First name', value: state.firstName },
        { id: 'lastName', name: 'Last name', value: state.lastName },
        { id: 'phoneNumber', name: 'Phone number', value: state.phoneNumber },
        { id: 'email', name: 'Email', value: state.email },
        {
          id: 'address',
          name: 'Address',
          value: state.address,
          textArea: true,
        },
      ].map(({ id, name, value, textArea }) => (
        <ContactFormInput
          key={id}
          id={id}
          name={name}
          value={value}
          textArea={textArea}
          onChange={(newValue) =>
            setState((prevValue) => ({ ...prevValue, [id]: newValue }))
          }
        />
      ))}

      <Button type="submit" className="w-full">
        {isNew ? 'Save' : 'Edit'}
      </Button>
    </form>
  );
};
