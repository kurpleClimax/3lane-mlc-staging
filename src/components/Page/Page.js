import { BlockRenderer } from "@/components/BlockRenderer";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Seo from "../Layout/Seo";
export const Page = (props) => {
  const { seo, data } = props;
  const router = useRouter();

  const uri =
    router.asPath?.slice(-1) === "/" ? router.asPath : router.asPath + "/";
  return (
    <>
      {Object.keys(seo || {})?.length > 0 && <Seo seo={seo} uri={uri} />}
      <Layout siteSettings={data?.siteOptions}>
        <BlockRenderer blocks={props.blocks} bread={props.breadData} />
      </Layout>
    </>
  );
};
