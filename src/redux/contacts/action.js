import {ADD_CONTACT, DELETE_CONTACT, FILTER_CONTACT, SET_CONTACT} from './types';

export const addContact = (data) => ({
    type: ADD_CONTACT,
    payload: data,
});

export const deleteContact = (id) => ({
    type: DELETE_CONTACT,
    payload: id,
});

export const filteredContact = (query) => ({
    type: FILTER_CONTACT,
    payload: query,
});

export const setContact = (contacts) => ({
    type: SET_CONTACT,
    payload: [...contacts],
})