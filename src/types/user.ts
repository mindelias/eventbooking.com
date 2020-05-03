import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
} from 'graphql';

// const UsersType = new GraphQLObjectType({
//   name: 'Users',
//   fields: () => {
//     const PlacesType = require('./places');
//     return {
//       email: { type: GraphQLNonNull(GraphQLString) },
//       username: { type: GraphQLNonNull(GraphQLString) },
//       visitedPlaces: {
//         type: new GraphQLList(PlacesType),
//         resolve: async (obj, args, { pgPool, req }) => {
//           try {
//             await verifyJwt(req);
//             return pgdb(pgPool).getVisitedPlaces(obj.id);
//           } catch (err) {
//             return [];
//           }
//         },
//       },
//     };
//   },
// });
export const UserType = new GraphQLObjectType({
  name: 'Regsiter',
  description: 'Describes the user data in our application',
  fields: () => ({
    _id: {
      type: GraphQLID,
      description: 'The UUID of a specific user',
    },
    fullname: {
      type: GraphQLString,
      description: 'The full name of a user',
      resolve: parent => parent.fullname,
    },
    email: {
      type: GraphQLString,
      description: 'The email of a user',
      resolve: parent => parent.email,
    },
    password: {
      type: GraphQLString,
      description: 'The password of a user',
    },
    createdAt: {
      type: GraphQLString,
      description: 'The date a user is created',
    },
    updatedAt: {
      type: GraphQLString,
      description: 'The date a user updated irs data',
    },

    deletedAt: {
      type: GraphQLString,
      description: 'The date a user data is being deleted',
    },
  }),
});

export const UserTypeToken = new GraphQLObjectType({
  name: 'userwithtoken',
  description: 'Describes the user data in our application',
  fields: () => ({
    _id: {
      type: GraphQLID,
      description: 'The UUID of a specific user',
    },
    fullname: {
      type: GraphQLString,
      description: 'The full name of a user',
      resolve: parent => parent.fullname,
    },
    email: {
      type: GraphQLString,
      description: 'The email of a user',
      resolve: parent => parent.email,
    },
    password: {
      type: GraphQLString,
      description: 'The password of a user',
    },
    token: {
      type: GraphQLString,
      description: 'token of a user',
    },

    createdAt: {
      type: GraphQLString,
      description: 'The date a user is created',
    },
    updatedAt: {
      type: GraphQLString,
      description: 'The date a user updated irs data',
    },

    deletedAt: {
      type: GraphQLString,
      description: 'The date a user data is being deleted',
    },
  }),
});

export const UserInputType = new GraphQLInputObjectType({
  name: 'userInput',
  description: 'Describes the event data in our application',
  fields: () => ({
    fullname: {
      type: GraphQLString,
      description: 'The fullname of a user',
      // resolve: parent => parent.title,
    },
    email: {
      type: GraphQLString,
      description: 'The email of a  user',
      // resolve: parent => parent.description,
    },
    password: {
      type: GraphQLString,
      description: 'The password of a user',
    },
  }),
});

export const UserInputLoginType = new GraphQLInputObjectType({
  name: 'userInputLogin',
  description: 'Describes the event data in our application',
  fields: () => ({
    email: {
      type: GraphQLString,
      description: 'The email of a  user',
      // resolve: parent => parent.description,
    },
    password: {
      type: GraphQLString,
      description: 'The password of a user',
    },
  }),
});
