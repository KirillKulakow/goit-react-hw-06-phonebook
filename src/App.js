import React, {useState, useEffect} from 'react';
import {CSSTransition} from 'react-transition-group';
import './App.css';
import './AnimationStyles/Error.css';
import './AnimationStyles/Contact.css';
import './AnimationStyles/Filter.css';
import NavBar from './Components/AppTitle/NavBar';
import Form from './Components/ContactForm/Form';
import FilterContacts from './Components/FilterContacts/FilterContacts';
import ContactList from './Common/ContactList/ContactList';
import Contact from './Components/Contact/Contact';
import Error from './Components/NotificationError/Error';
import {addContact, deleteContact, filteredContact, setContact} from './redux/modules/contacts/actions';
import {connect, useDispatch} from 'react-redux';
import {getLS, saveLS} from "./helpers/localStorage";

function App({contacts, filter}) {
  const [error, setError] = useState(false);
  const setFilterQuery = (query) => {
    dispatch(filteredContact(query));
  };
  const dispatch = useDispatch();

  const addToContacts = (obj) => {
    const isExist = contacts.some(({name,number}) => (name === obj.name || number === obj.number));
    if(isExist){
      setError(true);
      return
    }
    dispatch(addContact(obj));
    saveLS('contacts', [...contacts, obj]);
  };

  const deleteFromContacts = (id) => {
    dispatch(deleteContact(id));
    let newContacts = contacts.filter((contact) => contact.id !== id);
    saveLS('contacts', [...newContacts])
    dispatch(filteredContact(''));
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

  useEffect(() => {
    let newContacts = getLS('contacts');
    if(newContacts){
      dispatch(setContact(newContacts));
    };
  }, [])

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
