import { gql } from "@apollo/client";

export const ALL_NEWS = gql`
  query ALL_NEWS {
    allNews(first: 100000) {
      edges {
        node {
          id
          slug
          title
          aboutNews {
            startDate
            endDate
          }
          featuredImage {
            node {
              title
              sourceUrl
            }
          }
          newsTypes {
            edges {
              node {
                name
              }
            }
          }
          blocks
        }
      }
    }
  }
`;

export const NEWS_BY_SLUG = gql`
  query NEWS_BY_SLUG($slug: ID!) {
    news(id: $slug, idType: SLUG) {
      id
      slug
      title
      date
      aboutNews {
        startDate
        endDate
      }
      featuredImage {
        node {
          title
          sourceUrl
        }
      }
      newsTypes {
        edges {
          node {
            name
          }
        }
      }
      blocks
    }
  }
`;

export const ALL_NEWS_TYPES = gql`
  query ALL_NEWS_TYPES {
    newsTypes(first: 100) {
      nodes {
        id
        name
      }
    }
  }
`;
