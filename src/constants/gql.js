import {gql} from "@apollo/client";
import {apolloClient} from "./apollo";

export async function fetchAllData(variables) {
  const {data} = await apolloClient.query({
    variables,
    query: gql`
      query ($limit: Int!, $skip: Int!) {
        entryCollection(limit: $limit, skip: $skip) {
          total
          items {
            ... on HomepageMedia {
              order
              altText
              redirectUrl
              identifier
              mediaCollection {
                items {
                  url
                  title
                  contentfulMetadata {
                    tags {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    fetchPolicy: "cache-first",
  });
  return data;
}
