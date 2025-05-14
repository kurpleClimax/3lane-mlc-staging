import { gql } from "@apollo/client";

export const ALL_EVENTS = gql`
  query ALL_EVENTS($where: RootQueryToEventConnectionWhereArgs) {
    events(where: $where) {
      edges {
        node {
          id
          slug
          title
          blocks
          aboutEvents {
            date
            time
            text
            link {
              target
              title
              url
            }
          }
          featuredImage {
            node {
              sourceUrl
              title
            }
          }
        }
      }
    }
  }
`;
