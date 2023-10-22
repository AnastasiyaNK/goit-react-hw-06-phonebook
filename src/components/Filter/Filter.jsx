import React from 'react';
import css from './Filter.module.css';

export const Filter = ({ filter, handleInputChange }) => {
  return (
    <input
      className={css.inputContacts}
      type="text"
      value={filter}
      onChange={handleInputChange}
    />
  );
};
