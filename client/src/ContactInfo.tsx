import React from 'react';
import { gql } from 'apollo-boost';

function ContactInfo({ contacts }: { contacts: any[] }) {
  const contactList = contacts.map(contact => {
    return (
      <div key={contact.id}>
        <p>
          {contact.firstName} {contact.lastName}
          {contact.email ?? 'This user has no email'}
        </p>
      </div>
    );
  });

  return <>{contactList}</>;
}

ContactInfo.fragments = {
  contact: gql`
    fragment ContactInfo on Contact {
      id
      firstName
      lastName
      email
    }
  `,
};

export default ContactInfo;
