import React, { Component } from 'react';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory'
import getproducts from '../amazonInventory-middleware/graphql/queries/product/getProducts';
import ApolloClient  from 'apollo-client';

const client = new ApolloClient({
  link: createHttpLink({uri: 'https://e4ae5ace.ngrok.io/graphql'}),
  cache: new InMemoryCache()
});

const AppHOC = (WrappedComponent) =>  {
  return class App extends Component {
    render() {
      return (
        <ApolloProvider client={client}>
          <WrappedComponent {...this.props} client={client}/>      
        </ApolloProvider>
      )
    }
  }
}

export default AppHOC;
