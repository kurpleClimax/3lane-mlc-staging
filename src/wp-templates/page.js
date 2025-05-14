import { gql, useQuery } from "@apollo/client";
import { Loader } from "@/components/Loader";
import { useEffect, useState } from "react";
import { Page } from "@/components/Page";
import { getBreadcrumbsData } from "@/utils/getBreadcrumbsData";
import { cleanAndTransformBlocks } from "@/utils/cleanAndTransformBlocks";
import { addCustomPostTypesToBlocks } from "@/utils/addCustomPostTypesToBlocks";

export default function Component({ data: pageData, ...context }) {
  const uri = context.params?.slug
    ? `/${context.params?.slug.join("/")}/`
    : "/";

  const [finalData, setFinalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function processBlocks() {
      if (pageData) {
        try {
          let breadData;
          if (context.params?.slug?.length) {
            breadData = await getBreadcrumbsData(
              `/${context.params?.slug?.join("/")}/`
            );
          }

          let blocks = cleanAndTransformBlocks(pageData?.page?.blocks ?? []);
          blocks = await addCustomPostTypesToBlocks(uri, blocks);

          setFinalData({
            seo: pageData?.page?.seo || null,
            title: pageData?.page?.title || "",
            featuredImage:
              pageData?.page?.featuredImage?.node?.sourceUrl || null,
            blocks,
            data: siteData?.sitewideSettings || {},
            navbar: siteData || {},
            breadData: breadData || {},
          });
        } catch (error) {
          console.error("Error processing blocks:", error);
          setIsError(true);
        }
        setIsLoading(false);
      }
    }
    processBlocks();
  }, [pageData]);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading the page!</div>;
  if (!finalData) return <div>No data found!</div>;

  return (
    <>
      <Page {...finalData} />
    </>
  );
}

Component.query = gql`
  query PageQuery($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      id
      title
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
    }
  }
`;

Component.variables = ({ databaseId }, ctx) => ({
  databaseId,
  asPreview: ctx?.asPreview,
});
