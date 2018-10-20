const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const { userGroupList, userList } = require('./mockData');

const resolvers = {
  Query: {
    hello: () => 'Hello world!',

    user: (obj, args, context, info) => {
      return getUserByID(args.id);
    },

    userList: () => getUserList(),

    userGroup: (obj, args, context, info) => getUserGroup(args.id),
  },

  // This is an example of a resolver that modifies the default
  // resolver - instead of returning all users from the UserGroup,
  // we return only those that are active
  UserGroup: {
    users(obj, args, context, info) {
      return obj.users.filter(u => u.isActive);
    }
  }
};

const typeDefs = gql`
  type UserGroup {
    id: ID
    displayName: String
    users: [User]
  }

  type User {
    email: String
    firstName: String
    id: ID
    lastName: String
    password: String
  }

  type Query {
    hello: String
    user(id: ID): User
    userList: [User]
    userGroup(id: ID): UserGroup
  }
`;

const getUserByID = (id) => {
  return userList.find(user => user.id === parseInt(id));
}

const getUserList = () => {
  return userList;
}

const getUserGroup = (id) => {
  return userGroupList.find(group => group.id === parseInt(id));
}

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
);
