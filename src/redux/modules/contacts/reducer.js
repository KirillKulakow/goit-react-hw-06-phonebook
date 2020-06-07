import {addContact, deleteContact, filteredContact, setContact} from './actions';
import {createReducer} from "@reduxjs/toolkit";


export const contacts = createReducer([], {
    [addContact]: (state, action) => ([...state, action.payload]),
    [deleteContact]: (state, action) => state.filter((contact) => contact.id !== action.payload),
    [setContact]: (state, action) => action.payload,
});

export const filter = createReducer('', {
    [filteredContact]: (state, action) => action.payload,
});
