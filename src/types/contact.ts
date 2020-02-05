import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

const contactType = new GraphQLObjectType({
  name: 'Contact',
  description: 'Describes the contact data in our application',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The UUID of a contact',
    },
    firstName: {
      type: GraphQLString,
      description: 'The first name of the contact',
      resolve: parent => parent.first_name,
    },
    lastName: {
      type: GraphQLString,
      description: 'The last name of the contact',
      resolve: parent => parent.last_name,
    },
    phone: {
      type: GraphQLString,
      description: 'The phone number of the contact',
    },
  }),
});

export default contactType;
