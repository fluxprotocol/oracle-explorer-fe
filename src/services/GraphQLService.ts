import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { API_URL } from '../config';

const cache = new InMemoryCache();
const link = createHttpLink({
    uri: API_URL,
});

export const graphqlClient = new ApolloClient({
    cache,
    link,

    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        }
    }
});
