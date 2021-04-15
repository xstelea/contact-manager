import React from 'react';
import { SHA256 } from 'crypto-js';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from './auth.store';
import { getIsNewUser, getIsWrongPassword } from '../store/rootReducer';
import { Button } from '../components/Button';

export const AuthPage: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const isNewUser = useSelector(getIsNewUser);
  const isWrongPassword = useSelector(getIsWrongPassword);
  return (
    <div className="self-center">
      <div className="text-3xl mb-2">
        <p>Welcome to</p>
        <p>Simple Secure Contact Manager</p>
      </div>
      <p className="mb-5 font-thin">
        Please enter a password for your {isNewUser && 'new'} contact data file
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const hashedPassword = SHA256(
            ((event.target as unknown) as [HTMLInputElement])[0].value,
          ).toString();

          dispatch(
            isNewUser
              ? authAction.createStore(hashedPassword)
              : authAction.authenticate(hashedPassword),
          );
        }}
      >
        <input
          type="password"
          className={`rounded w-full text-black p-1 border outline-none ${
            isWrongPassword ? 'border-red-500' : ''
          }`}
          required={true}
          minLength={6}
          maxLength={30}
        />
        {isWrongPassword && (
          <div className="text-red-500 text-sm">
            Wrong password, please try again
          </div>
        )}
        <div className="flex justify-around mt-5">
          <Button type="submit">OK</Button>
        </div>
      </form>
    </div>
  );
};
