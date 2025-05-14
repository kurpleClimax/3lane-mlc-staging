import { gql } from "@apollo/client";

export const ALL_STATION_PARTNERS = gql`
  query ALL_STATION_PARTNERS(
    $where: RootQueryToStationPartnerConnectionWhereArgs
  ) {
    stationPartners(where: $where, first: 1000) {
      nodes {
        title
        content
        slug
        stationPartnerFieldsGroup {
          colorfulLogo {
            node {
              sourceUrl
            }
          }
          whiteLogo {
            node {
              sourceUrl
            }
          }
          link {
            title
            url
          }
        }
      }
    }
  }
`;
