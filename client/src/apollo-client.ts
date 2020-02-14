import { ApolloClient, InMemoryCache, HttpLink, Reference } from '@apollo/client';

export const client: any = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000/',
  }),
  resolvers: {}
});
