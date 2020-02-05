import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLSchema,
} from 'graphql';

import ContactType from './types/contact';
import { getContactByID, getContacts } from './controllers/contact';

const query = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'All the query that our schema supports',
  fields: () => ({
    allContacts: {
      type: new GraphQLList(ContactType),
      description: 'Get all contacts',
      resolve: () => getContacts(),
    },
    contactByID: {
      type: ContactType,
      description: 'Gets you a single contact by their UUID',
      args: {
        contactID: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The UUID of the contact to get',
        },
      },
      resolve: (_, { contactID }) => {
        return getContactByID(contactID);
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: query,
});

export default schema;
