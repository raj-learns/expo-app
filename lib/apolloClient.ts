// apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Or your deployed server endpoint
  cache: new InMemoryCache(),
});

export default client;
