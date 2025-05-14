// // import { mapMainMenuItems } from './mapMainMenuItems'

export const getSitewideSettings = async () => {
  const params = {
    query: `query MenuQuery {
      acfOptionsSitewideSettings {
        sitewideSettings {
          fieldGroupName
          dropdownLogo {
            mediaItemUrl
          }
          siteLogo {
            altText
            mediaDetails {
              width
              height
            }
            sourceUrl
            title
          }
          headerTop {
            getInvolvedSubmenu {
              menuTitles {
                parentTitle {
                  title
                  url
                }
                showSubmenu
                submenuCategory {
                  category {
                    title
                    url
                  }
                  allSubLinks {
                    link {
                      target
                      url
                      title
                    }
                  }
                }
              }
              menuBanner {
                heading
                content
                image {
                  mediaItemUrl
                }
                buttonGroup {
                  button1 {
                    anchor {
                      title
                      url
                    }
                    variant {
                      databaseId
                    }
                  }
                  button2 {
                    anchor {
                      title
                      url
                    }
                    variant {
                      databaseId
                    }
                  }
                  donateButton {
                    anchor {
                      title
                      url
                    }
                    variant {
                      databaseId
                    }
                  }
                }
              }
            }
            smartGrowthSubmenu {
              menuTitles {
                parentTitle {
                  title
                  url
                }
                showSubmenu
                submenuCategory {
                  category {
                    title
                    url
                  }
                  allSubLinks {
                    link {
                      target
                      url
                      title
                    }
                  }
                }
              }
              menuBanner {
                heading
                content
                image {
                  mediaItemUrl
                }
                buttonGroup {
                  button1 {
                    anchor {
                      title
                      url
                    }
                    variant {
                      databaseId
                    }
                  }
                  button2 {
                    anchor {
                      title
                      url
                    }
                    variant {
                      databaseId
                    }
                  }
                  donateButton {
                    anchor {
                      title
                      url
                    }
                    variant {
                      databaseId
                    }
                  }
                }
              }
            }
            getInvolvedSubmenu {
              fieldGroupName
              menuTitles {
                showSubmenu
                parentTitle {
                  target
                  title
                  url
                }
              }
            }
            fieldGroupName
            icon1 {
              altText
              mediaDetails {
                width
                height
              }
              sourceUrl
              title
            }
            icon2 {
              altText
              mediaDetails {
                width
                height
              }
              sourceUrl
              title
            }
            navbarButton {
              target
              title
              url
            }
          }
          mainMenu {
            fieldGroupName
            link {
              target
              title
              url
            }
          }

          aboutUsSubmenu {
            fieldGroupName
            menuBanner {
              content
              heading
              image {
                uri:sourceUrl
                title
                altText
                mediaDetails {
                  height
                  width
                }
              }
            }
            ctaBanner {
              text
              fieldGroupName
              button {
                anchor {
                  title
                  target
                  url
                }
                variant {
                  databaseId
                }
              }
            }
            menuTitles {
              showSubmenu
              submenuCategory {
                allSubLinks {
                  fieldGroupName
                  link {
                    target
                    title
                    url
                  }
                }
                category {
                  target
                  title
                  url
                }
                fieldGroupName
              }
              parentTitle {
                target
                title
                url
              }
            }
          }

        ourWorkSubmenu {
          fieldGroupName
          menuBanner {
            content
            heading
            image {
              uri:sourceUrl
              title
              altText
              mediaDetails {
                height
                width
              }
            }
          }
          ctaBanner {
            text
            fieldGroupName
            button {
              anchor {
                title
                target
                url
              }
              variant {
                databaseId
              }
            }
          }
          menuTitles {
            showSubmenu
            submenuCategory {
              allSubLinks {
                fieldGroupName
                link {
                  target
                  title
                  url
                }
              }
              category {
                target
                title
                url
              }
              fieldGroupName
            }
            parentTitle {
              target
              title
              url
            }
          }
        }

        impactSubmenu {
          fieldGroupName
          menuBanner {
            content
            heading
            image {
              uri:sourceUrl
              title
              altText
              mediaDetails {
                height
                width
              }
            }
          }
          ctaBanner {
            text
            fieldGroupName
            button {
              anchor {
                title
                target
                url
              }
              variant {
                databaseId
              }
            }
          }
          menuTitles {
            showSubmenu
            submenuCategory {
              allSubLinks {
                fieldGroupName
                link {
                  target
                  title
                  url
                }
              }
              category {
                target
                title
                url
              }
              fieldGroupName
            }
            parentTitle {
              target
              title
              url
            }
          }
        }

        eventsSubmenu {
          fieldGroupName
          menuBanner {
            content
            heading
            image {
              uri:sourceUrl
              title
              altText
              mediaDetails {
                height
                width
              }
            }
          }
          ctaBanner {
            text
            fieldGroupName
            button {
              anchor {
                title
                target
                url
              }
              variant {
                databaseId
              }
            }
          }
          menuTitles {
            showSubmenu
            submenuCategory {
              allSubLinks {
                fieldGroupName
                link {
                  target
                  title
                  url
                }
              }
              category {
                target
                title
                url
              }
              fieldGroupName
            }
            parentTitle {
              target
              title
              url
            }
          }
        }
        jobDescription {
          documents {
            title
            detail
          }
          email
          subject
        }

        knowledgeHubSubmenu {
          fieldGroupName
          menuBanner {
            content
            heading
            image {
              uri:sourceUrl
              title
              altText
              mediaDetails {
                height
                width
              }
            }
          }
          ctaBanner {
            text
            fieldGroupName
            button {
              anchor {
                title
                target
                url
              }
              variant {
                databaseId
              }
            }
          }
          menuTitles {
            showSubmenu
            submenuCategory {
              allSubLinks {
                fieldGroupName
                link {
                  target
                  title
                  url
                }
              }
              category {
                target
                title
                url
              }
              fieldGroupName
            }
            parentTitle {
              target
              title
              url
            }
          }
        }

          footer {
            subscribeButton {
              title
              url
            }
            socialLinks {
              logo {
                url: sourceUrl
                mediaDetails {
                  height
                  width
                }
              }
              link {
                title
                url
              }
              fieldGroupName
            }
            rightLogo {
              sourceUrl
            }
            logo {
              url: sourceUrl
              mediaDetails {
                height
                width
              }
            }
            sitebyText
            copyrightText
            email
            address
            followHeading
            newsletterHeading
             button1Variant {
              anchor {
                target
                title
                url
              }
              variant {
                databaseId
              }
            }
            button2Variant {
              anchor {
                target
                title
                url
              }
              variant {
                databaseId
              }
            }

            bottomLinks {
              link {
                title
                url
              }
            }
            rightLogo {
              mediaDetails {
                width
                height
              }
              url: sourceUrl
            }
            leftLogo {
              mediaDetails {
                height
                width
              }
              url: sourceUrl
            }
          }

      pageNotFound {
        heading
        title
        button {
          variant {
            databaseId
          }
          anchor {
            url
            title
            target
          }
        }
        image {
           url: sourceUrl
            title
            altText
            mediaDetails {
              height
              width
            }
          }
      }
      mediumCta {
        heading
        image {
          uri: sourceUrl
          title
          altText
          mediaDetails {
            height
            width
          }
        }
        button {
          target
          title
          url
        }
      }
        }
      }
    }
  `,
  };

  /*const response = await fetch(`${process.env.NEXT_PUBLIC_WP_GRAPHQL_URL}`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data } = await response.json();*/

  return {
    sitewideSettings: {}// data?.acfOptionsSitewideSettings?.sitewideSettings,
  };
};
