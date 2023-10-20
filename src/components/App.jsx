import React from 'react';

import css from './App.module.css';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  deleteContact,
  setfilter,
  toggleFavoriteContact,
} from 'redux/phoneBookSlice';

export const App = () => {
  const contacts = useSelector(state => state.phoneBook.contacts);
  const filter = useSelector(state => state.phoneBook.filter);
  const dispatch = useDispatch();

  const handleAddContact = formData => {
    const isInContact = contacts.some(
      contact => contact.name.toLowerCase() === formData.name
    );

    if (isInContact) {
      return alert(`${formData.name} is already in contacts`);
    }

    const newContact = {
      name: formData.name,
      number: formData.number,
      id: nanoid(),
      favourite: false,
    };
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const handleInputChange = event => {
    dispatch(setfilter(event.target.value));
  };
  const toggleFavorite = contactId => {
    dispatch(toggleFavoriteContact(contactId));
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContactsByName = getVisibleContacts();
  const sortedFilteredContacts = [...filteredContactsByName].sort(
    (a, b) => b.favourite - a.favourite
  );

  return (
    <div className={css.phoneBook}>
      <ContactForm handleAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <p>Find contacts by name</p>
      <Filter filter={filter} handleInputChange={handleInputChange} />
      <ContactList
        contacts={sortedFilteredContacts}
        handleDeleteContact={handleDeleteContact}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
};
