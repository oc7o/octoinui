import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { useMemo } from "react";

// let client: ApolloClient<any> | null = null;

// export const getClient = () => {
//   // create a new client if there's no existing one
//   // or if we are running on the server.
//   if (!client || typeof window === "undefined") {
//     client = new ApolloClient({
//       link: new HttpLink({
//         uri: "https://main--time-pav6zq.apollographos.net/graphql",
//       }),
//       cache: new InMemoryCache(),
//     });
//   }

//   return client;
// };

function creaetApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: "http://localhost:8000/graphql",
    }),
    cache: new InMemoryCache(),
    headers: {
      Authorization: `JWT ${localStorage.getItem("token")}`,
    },
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });
}

export function useApollo() {
  const client = useMemo(() => creaetApolloClient(), []);
  return client;
}
