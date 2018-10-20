const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
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
    user: User
  }
`;

const getUser = () => {
  return {
    email: 'user@example.com',
    firstName: 'Jean-Luc',
    id: 812312312,
    lastName: 'Gray',
    password: 'whatever'
  }
}

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    user: () => {
      return getUser();
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
);
