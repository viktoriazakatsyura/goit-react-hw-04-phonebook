import { useState, useEffect } from 'react';
import shortid from 'shortid';
import { Container } from './App.styles';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (
      contacts.find(item => {
        return item.name === contact.name;
      })
    ) {
      return alert(`${contact.name} is already in contacts`);
    }
    setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const filterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteOnContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm addContacts={addContacts} />
      <h2>Contacts</h2>
      <Filter filter={filterChange} />
      <ContactList
        contacts={contacts}
        filterValue={filter}
        onDeleteContact={deleteOnContact}
      />
    </Container>
  );
};

export default App;




// import { Component } from 'react';
// import shortid from 'shortid';
// import { Container } from './App.styles';

// import ContactForm from './ContactForm/ContactForm';
// import ContactList from './ContactList/ContactList';
// import Filter from './Filter/Filter';

// class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   addContacts = ({ name, number }) => {
//     const contact = {
//       id: shortid.generate(),
//       name,
//       number,
//     };

//     if (
//       this.state.contacts.find(item => {
//         return item.name === contact.name;
//       })
//     ) {
//       return alert(`${contact.name} is already in contacts`);
//     }
//     this.setState(prevSate => ({
//       contacts: [contact, ...prevSate.contacts],
//     }));
//   };

//   filterChange = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   deleteOnContact = contactId => {
//     this.setState(prevSate => ({
//       contacts: prevSate.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   render() {
//     const { contacts, filter } = this.state;
//     return (
//       <Container>
//         <h1>Phonebook</h1>
//         <ContactForm addContacts={this.addContacts} />
//         <h2>Contacts</h2>
//         <Filter filter={this.filterChange} />
//         <ContactList
//           contacts={contacts}
//           filterValue={filter}
//           onDeleteContact={this.deleteOnContact}
//         />
//       </Container>
//     );
//   }
// }
// export default App;
