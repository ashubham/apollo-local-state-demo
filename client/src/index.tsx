import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider, gql } from '@apollo/client';
import { SessionContextProvider } from './contexts/globalClientState';

import App from './App';
import { client } from './apollo-client';

render(
  <ApolloProvider client={client}>
    <SessionContextProvider>
      <App />
    </SessionContextProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);
