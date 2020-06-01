import { addContact, deleteContact, filteredContact } from './actions';
import {createReducer} from "@reduxjs/toolkit";


const initialState = [{id: 1, name: 'Rosie Empson', number: '333-65-19'}, {id: 2, name: 'Kira Nelson', number: '652-72-58'}, {id: 3, name: 'Calli Roser', number: '333-65-21'}, {id: 4, name: 'Josh Rembic', number: '373-65-20'}];

export const contacts = createReducer(initialState, {
    [addContact]: (state, action) => [...state, action.payload],
    [deleteContact]: (state, action) => state.filter((contact) => contact.id !== action.payload),
});

export const filter = createReducer('', {
    [filteredContact]: (state, action) => action.payload,
});
