import { combineReducers } from 'redux';
import { contacts, filter } from "./contacts/reducer";

export const rootReducer = combineReducers({
    contacts,
    filter,
});