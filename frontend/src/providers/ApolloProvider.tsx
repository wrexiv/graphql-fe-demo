import type { ReactNode } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloHooksProvider,
  from,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const handleAndReraiseError = (message: string, context: unknown = {}) => {
  if (process.env.NODE_ENV === "production") {
    // Sentry.captureMessage(JSON.stringify({ message, context }));
    console.error({ message, context });
  } else {
    // eslint-disable-next-line no-console
    console.error({ message, context });
  }
  throw new Error(`${message}, ${JSON.stringify(context)}`);
};

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  const { operationName, variables } = operation;
  if (graphQLErrors) {
    const errors = graphQLErrors.map(
      ({ message, locations, path }) =>
        `[GraphQL Error]: Message: ${message}, Location: ${JSON.stringify(
          locations
        )}, Path: ${JSON.stringify(path)}`
    );
    handleAndReraiseError(errors.join("; "), { operationName, variables });
  }
  if (networkError) {
    handleAndReraiseError(`[Network or CORS Error]: ${networkError.message}`, {
      operationName,
      variables,
    });
  }
});

const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql", // Replace with your GraphQL server URL
});

const logLink = new ApolloLink((operation, forward) => {
  console.info("request", operation.getContext());
  return forward(operation).map((result) => {
    console.info("response", operation.getContext());
    return result;
  });
});

// eslint-disable-next-line react-refresh/only-export-components
export const client = new ApolloClient({
  link: from([errorLink, logLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

const ApolloProvider = ({ children }: { children: ReactNode }) => (
  <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>
);

export default ApolloProvider;
