import { gql } from "@apollo/client";
import { cleanAndTransformBlocks } from "@/utils/cleanAndTransformBlocks";
import { addCustomPostTypesToBlocks } from "@/utils/addCustomPostTypesToBlocks";
import { getBreadcrumbsData } from "@/utils/getBreadcrumbsData";
import client from "@/lib/apollo/client";
import { SITE_SETTINGS_QUERY } from "@/queries/all-sitewide-settings/all-sitewide-settings";

export const getPageStaticProps = async (context) => {
  const uri = context.params?.slug
    ? `/${context.params?.slug.join("/")}/`
    : "/";

  const { data, errors } = await client.query({
    query: gql`
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            title
            uri
            blocks(postTemplate: false)
            featuredImage {
              node {
                sourceUrl
              }
            }
            seo {
              title
              metaDesc
              breadcrumbs {
                text
                url
              }
            }
            template {
              templateName
            }
          }
          ... on Post {
            id
            title
            blocks(postTemplate: false)
            seo {
              title
              metaDesc
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    `,
    variables: {
      uri,
    },
    fetchPolicy: "no-cache",
  });

  if (errors) {
    throw JSON.stringify(errors, null, 2);
  }

  if (!data?.nodeByUri) {
    return {
      notFound: true,
    };
  }

  let breadData;
  if (context.params?.slug?.length) {
    breadData = await getBreadcrumbsData(
      `/${context.params?.slug?.join("/")}/`
    );
  }

  // Run Site Settings Query
  const { data: siteSettingsData, errors: siteSettingsErrors } =
    await client.query({
      query: SITE_SETTINGS_QUERY,
      fetchPolicy: "no-cache",
    });

  if (siteSettingsErrors) {
    throw JSON.stringify(siteSettingsErrors, null, 2);
  }

  let blocks = cleanAndTransformBlocks(data?.nodeByUri?.blocks ?? []);
  blocks = await addCustomPostTypesToBlocks(uri, blocks);

  return {
    props: {
      params: context.params || null,
      seo: data?.nodeByUri?.seo || null,
      title: data?.nodeByUri?.title || "",
      featuredImage: data?.nodeByUri?.featuredImage?.node?.sourceUrl || null,
      blocks,
      breadData: breadData || {},
      data: siteSettingsData?.sitewideSettings || {},
    },
    revalidate: false,
  };
};
