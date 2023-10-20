import React, { useState } from 'react';
import css from './ContactForm.module.css';

export const ContactForm = ({ handleAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = event => {
    switch (event.target.name) {
      case 'name': {
        setName(event.target.value);
        break;
      }
      case 'number': {
        setNumber(event.target.value);
        break;
      }
      default:
        return;
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    handleAddContact({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <div className={css.containerForm}>
      <h1 className={css.titltForm}>Phonebook</h1>
      <form className={css.form} onSubmit={handleFormSubmit}>
        <label className={css.lebel}>
          Name
          <input
            onChange={handleInputChange}
            value={name}
            type="text"
            name="name"
            className={css.input}
            required
          />
        </label>
        <label className={css.lebel}>
          Number
          <input
            onChange={handleInputChange}
            value={number}
            type="tel"
            name="number"
            className={css.input}
            required
          />
        </label>
        <button className={css.addBtn}>Add contact</button>
      </form>
    </div>
  );
};
