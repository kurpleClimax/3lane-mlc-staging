import { gql } from "@apollo/client";
import { getPageStaticProps } from "@/utils/getPageStaticProps";
import { Page } from "@/components/Page";
import client from "@/lib/apollo/client";

export default Page;

export const getStaticProps = getPageStaticProps;

export const getStaticPaths = async () => {
  const { data, errors } = await client.query({
    query: gql`
      query AllPagesQuery {
        pages(first: 1000) {
          nodes {
            uri
          }
        }
      }
    `,
    fetchPolicy: "no-cache",
  });

  if (errors) {
    throw JSON.stringify(errors, null, 2);
  }

  const paths = [...data.pages.nodes]
    .filter((page) => page.uri !== "/")
    .map((page) => ({
      params: {
        slug: page.uri.substring(1, page.uri.length - 1).split("/"),
      },
    }))

  return {
    paths,
    fallback: "blocking",
  };
};
