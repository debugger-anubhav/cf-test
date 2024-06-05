import {gql} from "@apollo/client";
import {apolloClient} from "./apollo";

export async function getAllBanners() {
  const {data} = await apolloClient.query({
    query: gql`
      query {
        homepageBannersCollection(limit: 100) {
          items {
            bannerNumber
            altText
            image {
              url
            }
          }
        }
      }
    `,
    fetchPolicy: "cache-first",
  });
  return data.homepageBannersCollection.items;
}
