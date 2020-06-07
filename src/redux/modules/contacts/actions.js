import { createAction } from '@reduxjs/toolkit';

export const addContact = createAction('ADD_CONTACT');
export const deleteContact = createAction('DELETE_CONTACT');
export const setContact = createAction('SET_CONTACT');
export const filteredContact = createAction('FILTER_CONTACT');
