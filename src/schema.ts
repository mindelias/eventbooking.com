import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLSchema,
  
} from 'graphql';

 import {EventType, EventInputType} from './types/events';
 import {getEvents, AddEvent} from './controllers/event';

const query = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'All the query that our schema supports',
  fields: () => ({
    allContacts: {
      type: new GraphQLList(EventType),
      description: 'Get all events',
      resolve: () => getEvents(),
    },
    // contactByID: {
    //   type: ContactType,
    //   description: 'Gets you a single contact by their UUID',
    //   args: {
    //     contactID: {
    //       type: new GraphQLNonNull(GraphQLString),
    //       description: 'The UUID of the contact to get',
    //     },
    //   },
    //   resolve: (_, { contactID }) => {
    //     return getContactByID(contactID);
    //   },
    // },
  }),
});

const mutation = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'All the changes that our schema supports',
  fields: () => ({
    createEvents: {
      type: EventType,
      description: 'Add a single event',
      args: {
        eventInput: {
          type: new GraphQLNonNull(EventInputType)
        }
      },
      resolve: (_, { eventInput}) => {
        return AddEvent(eventInput);
      },
    },
     
  }),
});

const schema = new GraphQLSchema({
  query: query,
  mutation:mutation
});

export default schema;
