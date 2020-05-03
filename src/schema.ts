import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLSchema,
  
} from 'graphql';

 import {EventType, EventInputType} from './types/events';
import { getEvents, AddEvent } from './controllers/event';
import {Authenticate} from './helpers/authMiddleware'
import {getLoggedUsers, AddNewUsers, Login, getAllUsers} from './controllers/auth'
import { UserType, UserInputType, UserInputLoginType, UserTypeToken } from './types/user';
 




const query = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'All the query that our schema supports',
  fields: () => ({
    events: {
      type: new GraphQLList(EventType),
      description: 'Get all events',
      resolve: () => getEvents(),
    },
    GetAllUser: {
      type: new GraphQLList(UserType),
      description: 'Get all events',
      resolve: () => getAllUsers(),
    },
    GetLoginUser: {
      type: UserType,
      description: 'get a single user',
      resolve: async (obj, _args, { req, res, next }) => {
        try {
          await Authenticate(req, res, next);
          return getLoggedUsers(obj.id);
        } catch (err) {
          return [];
        }
      },
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
        eventInp: {
          type: new GraphQLNonNull(EventInputType),
        },
      },
      resolve: (_, { eventInp }) => {
        return AddEvent(eventInp);
      },
    },
    signUp: {
      type: UserTypeToken,
      description: 'Add a single user',
      args: {
        userInput: {
          type: new GraphQLNonNull(UserInputType),
        },
      },
      resolve: (_, { userInput }) => {
        return AddNewUsers(userInput);
      },
    },
    signIn: {
      type: UserTypeToken,
      description: 'login a single user',
      args: {
        userInput: {
          type: new GraphQLNonNull(UserInputLoginType),
        },
      },
      resolve: (_, { userInput }) => {
        return Login(userInput);
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: query,
  mutation:mutation
});

export default schema;
