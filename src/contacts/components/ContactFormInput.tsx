import React from 'react';

export const ContactFormInput: React.FunctionComponent<{
  name: string;
  id: string;
  type?: string;
  textArea?: boolean;
  value: string;
  onChange: (value: string) => void;
}> = ({ name, id, type = 'text', textArea, value, onChange }) => {
  return (
    <label htmlFor={id} className="text-left w-full mb-3">
      <div>{name}</div>
      {textArea ? (
        <textarea
          id={id}
          className="text-gray-800 w-full rounded p-2"
          required
          cols={50}
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        />
      ) : (
        <input
          required
          type={type}
          id={id}
          value={value}
          className="text-gray-800 w-full rounded p-2"
          onChange={(event) => {
            onChange(event.target.value);
          }}
        />
      )}
    </label>
  );
};
