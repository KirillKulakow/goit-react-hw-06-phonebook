import React, {useState, useEffect} from 'react';
import {CSSTransition} from 'react-transition-group';
import './App.css';
import './AnimationStyles/Error.css';
import './AnimationStyles/Contact.css';
import './AnimationStyles/Filter.css';
import NavBar from './Components/NavBar/NavBar';
import Form from './Components/Form/Form';
import FilterContacts from './Components/FilterContacts/FilterContacts';
import ContactList from './Containers/ContactList/ContactList';
import Contact from './Components/Contact/Contact';
import Error from './Components/Error/Error';
import { addContact, deleteContact, filteredContact } from './redux/modules/contacts/actions';
import {connect, useDispatch} from 'react-redux';

function App({contacts, filter}) {
  const [error, setError] = useState(false);
  const setFilterQuery = (query) => {
    dispatch(filteredContact(query));
  };
  const dispatch = useDispatch();

  const addToContacts = (obj) => {
    if(contacts.some(el => el.name === obj.name) || contacts.some(el => el.number === obj.number)){
      setError(true);
      return
    }
    dispatch(addContact(obj));
  };

  const deleteFromContacts = (id) => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = (query) => {
    return contacts.filter(element => (element.name.toLowerCase()).includes(query.toLowerCase()));
  };

  useEffect(() => {
    if(error){
      const timer = setTimeout(() => {
        setError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  },[error]);

  return (
      <>
        <NavBar/>
        <Form addToContacts={addToContacts}/>
        <CSSTransition in={contacts.length > 1} timeout={250} classNames='filter_animation' unmountOnExit>
          <FilterContacts setFilterQuery={setFilterQuery} filterQuery={filter}/>
        </CSSTransition>
        {!!contacts && <ContactList>
          {(!!filter ? filteredContacts(filter) : contacts).map((item) => (
            <CSSTransition key={item.id} timeout={250} classNames='contact_animation'>
              <Contact {...item} deleteFromContacts={deleteFromContacts}/>
            </CSSTransition>
          ))}
        </ContactList>}
        <CSSTransition in={error} timeout={250} classNames='error_animation' mountOnEnter unmountOnExit>
          <Error/>
        </CSSTransition>
      </>
  );
}

const mapStateToProps = state => ({
  contacts: state.contacts,
  filter: state.filter,
});

export default connect(
    mapStateToProps,
)(App);
