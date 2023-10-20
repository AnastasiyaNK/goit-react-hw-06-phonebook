import React, { useEffect, useState } from 'react';

import css from './App.module.css';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifiedContacts) ?? [];
    return parsedContacts;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);

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
    setContacts(prevState => [...prevState, newContact]);
  };

  const handleDeleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const handleInputChange = event => {
    setFilter(event.target.value);
  };
  const toggleFavorite = contactId => {
    // [{id: 1, favourite: false}]

    setContacts(
      contacts.map(contact => {
        if (contact.id === contactId) {
          return { ...contact, favourite: !contact.favourite };
        }
        return contact;
      })
    );
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContactsByName = getVisibleContacts();

  return (
    <div className={css.phoneBook}>
      <ContactForm handleAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <p>Find contacts by name</p>
      <Filter filter={filter} handleInputChange={handleInputChange} />
      <ContactList
        contacts={filteredContactsByName}
        handleDeleteContact={handleDeleteContact}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
};
