import React from "react";
import { getAllNews, getNewsBySlug } from "@/lib/api";
import { BlockRenderer } from "@/components/BlockRenderer";
import Head from "next/head";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { addCustomPostTypesToBlocks } from "@/utils/addCustomPostTypesToBlocks";
import client from "@/lib/apollo/client";
import { SITE_SETTINGS_QUERY } from "@/queries/all-sitewide-settings/all-sitewide-settings";

const NewsPost = (props) => {
  const { postData, innerBlocks, allNews, slug, data } = props;
  const router = useRouter();

  // Get previous & Next
  function getNextPost(currentSlug, arr) {
    const index = arr?.findIndex((member) => member.node?.slug === currentSlug);
    if (index === -1 || index === arr?.length - 1) return null;
    return arr[index + 1].node;
  }

  function getPreviousPost(currentSlug, arr) {
    const index = arr?.findIndex((member) => member.node?.slug === currentSlug);
    if (index <= 0) return null;
    return arr[index - 1].node;
  }

  const nextPost = getNextPost(slug, allNews);
  const previousPost = getPreviousPost(slug, allNews);

  return (
    <>
      <Head>
        <title>{`${postData?.title} - MLC`}</title>
        <meta name="description" content={postData?.title} />
      </Head>
      <Layout
        isPopUp={true}
        onClose={() => {
          router.push("/news");
        }}
        siteSettings={data?.siteOptions}
        nextPost={nextPost}
        previousPost={previousPost}
      >
        <article>
          <BlockRenderer blocks={innerBlocks} />
        </article>
      </Layout>
    </>
  );
};

export const getStaticPaths = async () => {
  const data = await getAllNews();

  const paths = data.map(({ node }) => ({
    params: { slug: node.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const post = await getNewsBySlug(params?.slug);

  const allNewsData = await getAllNews();
  const matchSlug = allNewsData?.some(
    ({ node }) => node?.slug === params?.slug,
  );

  const newsType = post?.newsTypes?.edges?.[0]?.node?.name || "";

  const innerBlocks = await addCustomPostTypesToBlocks(
    params?.slug,
    post?.blocks,
    newsType,
  );

  const { data: siteSettingsData, errors: siteSettingsErrors } =
    await client.query({
      query: SITE_SETTINGS_QUERY,
      fetchPolicy: "no-cache",
    });

  if (siteSettingsErrors) {
    throw JSON.stringify(siteSettingsErrors, null, 2);
  }

  if (!matchSlug) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: siteSettingsData?.sitewideSettings || {},
      postData: post,
      allNews: allNewsData,
      slug: params?.slug,
      innerBlocks: innerBlocks || [],
    },
    revalidate: false,
  };
}

export default NewsPost;
