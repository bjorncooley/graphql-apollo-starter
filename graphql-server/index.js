const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const userList = require('./mockData');

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    user: (obj, args, context, info) => {
      return getUserByID(args.id);
    },
    userList: () => getUserList(),
  },
};

const typeDefs = gql`
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
  }
`;

const getUserByID = (id) => {
  return userList.find((user) => user.id === parseInt(id));
}

const getUserList = () => {
  return userList;
}

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
);
