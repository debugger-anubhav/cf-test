import {ApolloLink} from "apollo-link";
import {HttpLink} from "apollo-link-http";
import {ApolloClient, InMemoryCache} from "@apollo/client";

const TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
const SPACE_ID = process.env.NEXT_PUBLIC_SPACE_ID;
const ENVIRONMENT = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT;

const URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

const http = new HttpLink({
  uri: URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

const link = ApolloLink.from([http]);

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link,
  cache,
});
