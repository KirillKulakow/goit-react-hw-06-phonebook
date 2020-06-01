import { ADD_CONTACT, DELETE_CONTACT, FILTER_CONTACT } from './types';


const initialState = [{id: 1, name: 'Rosie Empson', number: '333-65-19'}, {id: 2, name: 'Kira Nelson', number: '652-72-58'}, {id: 3, name: 'Calli Roser', number: '333-65-21'}, {id: 4, name: 'Josh Rembic', number: '373-65-20'}];

export const contacts = (state = initialState, {type, payload}) => {
    switch (type) {
        case ADD_CONTACT:
            return [...state, payload];
        case DELETE_CONTACT:
            return state.filter((contact) => contact.id !== payload);
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

