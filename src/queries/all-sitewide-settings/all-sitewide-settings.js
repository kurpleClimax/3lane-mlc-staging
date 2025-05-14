import { IMAGE_FRAGMENT } from "@/utils/helpers.fragment";
import { gql } from "@apollo/client";

export const SITE_SETTINGS_QUERY = gql`
  ${IMAGE_FRAGMENT}
  query SITE_SETTINGS_QUERY {
    sitewideSettings {
      siteOptions {
        header {
          logo {
            node {
              ...CustomImage
            }
          }
          socialMedia {
            icon {
              node {
                ...CustomImage
              }
            }
            link {
              title
              url
            }
          }
          subscribeLink {
            title
            url
          }
          contactUsLink {
            title
            url
          }
          careersLink {
            title
            url
          }
          tvLink {
            title
            url
          }
          menu {
            parent {
              title
              url
            }
            children {
              childLink {
                title
                url
              }
            }
          }
        }
        footer {
          logo {
            node {
              ...CustomImage
            }
          }
          socialMediaText
          socialMedia {
            link {
              title
              url
            }
            icon {
              node {
                ...CustomImage
              }
            }
          }
          address
          contactUsLink {
            title
            url
          }
          image {
            node {
              ...CustomImage
            }
          }
          newsletterText
          partnersTitle
          partners {
            link {
              title
              url
            }
            logo {
              node {
                ...CustomImage
              }
            }
          }
          supportersText
          copyright
          siteBy {
            title
            url
          }
        }
        pageNotFound {
          title
          heading
          content
          backToHomepage {
            title
            url
          }
          image {
            node {
              ...CustomImage
            }
          }
        }
      }
    }
  }
`;
