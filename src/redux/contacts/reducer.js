import {ADD_CONTACT, DELETE_CONTACT, FILTER_CONTACT, SET_CONTACT} from './types';

export const contacts = (state = [], {type, payload}) => {
    switch (type) {
        case ADD_CONTACT:
            return [...state, payload];
        case DELETE_CONTACT:
            return state.filter((contact) => contact.id !== payload);
        case SET_CONTACT:
            return payload;
        default:
            return state;
    }
};
export const filter = (state = '', {type, payload}) => {
    switch (type) {
    case FILTER_CONTACT:
        return payload;
    default:
        return state;
    }
};

