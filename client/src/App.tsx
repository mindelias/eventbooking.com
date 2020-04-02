import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import logo from './logo.svg';
import './App.css';
import ContactInfo from './ContactInfo';

const contactQuery = gql`
  query contacts($contactID: String!) {
    allContacts {
      id
      firstName
      ...ContactInfo
    }
    contactByID(contactID: $contactID) {
      ...contactInfo
    }
  }
  ${ContactInfo.fragments.contact}
`;

function App() {
  const { data, loading, error } = useQuery(contactQuery, {
    variables: { contactID: '14cc7f46-23a0-4017-bdef-6801e104090a' },
  });

  if (error) {
    return <>'There was an error'</>;
  }

  if (loading) {
    return <>'Loading'</>;
  }

  const contacts = data.allContacts.map(
    (contact: { id: string; firstName: string }) => {
      return <li key={contact.id}>{contact.firstName}</li>;
    }
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>{contacts}</ul>
        <ContactInfo contacts={data.allContacts} />
      </header>
    </div>
  );
}

export default App;
