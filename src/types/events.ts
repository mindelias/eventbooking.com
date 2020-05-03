import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

export const EventType = new GraphQLObjectType({
  name: 'event',
  description: 'Describes the event data in our application',
  fields: () => ({
    _id: {
      type: GraphQLID,
      description: 'The UUID of a specific event',
    },
    title: {
      type: GraphQLString,
      description: 'The title of an event',
      resolve: parent => parent.title,
    },
    description: {
      type: GraphQLString,
      description: 'The description of an event',
      resolve: parent => parent.description,
    },
    price: {
      type: GraphQLInt,
      description: 'The price of an event of the contact',
    },
    image: {
      type: GraphQLString,
      description: 'The image of the event',
    },
    date: {
      type: GraphQLString,
      description: 'The date an is scheduled',
    },
  }),
});

export const EventInputType = new GraphQLInputObjectType({
  name: 'eventInput',
  description: 'Describes the event data in our application',
  fields: () => ({
    title: {
      type: GraphQLString,
      description: 'The title of an event',
      // resolve: parent => parent.title,
    },
    description: {
      type: GraphQLString,
      description: 'The description of an event',
      // resolve: parent => parent.description,
    },
    price: {
      type: GraphQLInt,
      description: 'The price of an event of the contact',
    },
    image: {
      type: GraphQLString,
      description: 'The image of an event',
    },
  }),
});


