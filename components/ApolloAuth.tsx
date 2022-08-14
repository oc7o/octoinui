import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { useAuthContext } from '../auth/AuthContext';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider, useQuery } from '@apollo/client';
import { ME_QUERY } from '../auth/graphql';


function ApolloAuthCheck({ children } : { children: React.ReactNode }) {


    const { state, dispatch } = useAuthContext()
    const { data, loading, error } = useQuery(ME_QUERY)

    if (state.loggedIn) {
      if (loading) {
        return <h1>Loading...</h1>
      }
      if (data.me === null) {
        console.log('logged in but no user found');
        
        dispatch({ type: 'logout' })
      }
      if (error) {
          console.log(error);
          
      }
    }
    
    return <>{children}</>;
  }


export default function ApolloAuth ({ children } : { children: React.ReactNode }) {

    const httpLink = createHttpLink({
        uri: 'http://localhost:8000/graphql',
      });
      
        const { state, dispatch } = useAuthContext()
            
      const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = state.token;
        
        // return the headers to the context so httpLink can read them
        return {
          headers: {
            ...headers,
            Authorization: token ? `JWT ${token}` : "",
          }
        }
      });
      
      const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
      });

    return <ApolloProvider client={client}>
        <ApolloAuthCheck>
          {children}
        </ApolloAuthCheck>
    </ApolloProvider>
}