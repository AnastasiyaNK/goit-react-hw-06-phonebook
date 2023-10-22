import React from 'react';
import css from './ContactList.module.css';
import { BsClipboard2Heart, BsPersonHeart } from 'react-icons/bs';

export const ContactList = ({
  contacts,
  handleDeleteContact,
  toggleFavorite,
}) => {
  return (
    <ul>
      {contacts.map(contact => {
        return (
          <li className={css.contactItem} key={contact.id}>
            {contact.favourite && (
              <BsClipboard2Heart className={css.svgHeart} />
            )}
            {contact.name}: {contact.number}
            <button
              className={css.deleteBtn}
              onClick={() => handleDeleteContact(contact.id)}
            >
              &times;
            </button>
            <button
              className={css.deleteBtn}
              onClick={() => toggleFavorite(contact.id)}
            >
              <BsPersonHeart />
            </button>
          </li>
        );
      })}
    </ul>
  );
};
