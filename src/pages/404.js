/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import client from "@/lib/apollo/client";
import { SITE_SETTINGS_QUERY } from "@/queries/all-sitewide-settings/all-sitewide-settings";
import Heading from "@/components/Heading";
import HtmlBlock from "@/components/HtmlBlock";
import NextLink from "@/components/NextLink";
import Icon from "@/components/Icon";
import NextImage from "@/components/NextImage";

const Page404 = ({ data, pageNotFound }) => {
  return (
    <>
      <Head>
        <title>Page Not Found - SGA</title>
        <meta
          name="description"
          content="The page you are looking for does not exist."
        />
      </Head>
      <Layout siteSettings={data}>
        <div className="flex flex-col items-center justify-center h-[60vh] lg:h-[90vh] bg-brand-pink relative overflow-hidden">
          <div className="container relative z-20">
            <div className="lg:w-[35%] h-auto flex flex-col items-start z-20">
              <Heading
                type="h4"
                otherClasses="font-pbsKidsHeadline text-h4 font-normal text-white uppercase"
              >
                {pageNotFound?.heading}
              </Heading>
              <Heading
                type="h2"
                otherClasses="font-pbsKidsHeadline text-h2 font-normal text-white uppercase"
              >
                {pageNotFound?.title}
              </Heading>
              <HtmlBlock
                content={pageNotFound?.content}
                className="[&>p]:!text-white [&>p]:!text-p1 [&>p]:!font-openSans [&>p]:!font-normal my-5"
              />
              <NextLink
                href={pageNotFound?.backToHomepage?.url}
                otherClasses="flex items-center gap-2 hover:gap-4 transition-all duration-300 bg-brand-sky-blue px-4 py-3 rounded-lg text-white text-p2 font-openSans font-normal"
              >
                {pageNotFound?.backToHomepage?.title}
                <Icon icon="arrow-right-white" iconHeight={16} iconWidth={16} />
              </NextLink>
            </div>
          </div>
          <div className="border-l-[10px] border-l-brand-lime-green absolute right-0 top-28 w-[55vw] h-[60vh] z-20  bg-white overflow-hidden lg:block hidden">
            <NextImage
              {...pageNotFound?.image?.node}
              otherClasses="object-cover object-center w-full h-auto"
            />
          </div>
          <div className="absolute w-[1000px] h-[1000px] bg-brand-pumpkin-orange rounded-full -top-60 -left-[20%] z-10" />
        </div>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const { data, errors } = await client.query({
    query: SITE_SETTINGS_QUERY,
    fetchPolicy: "no-cache",
  });

  if (errors) {
    console.error("Error fetching site settings:", errors);
    return { props: { siteSettings: {}, pageNotFound: {} } };
  }

  const siteData = data?.sitewideSettings?.siteOptions;
  const pageNotFound = siteData?.pageNotFound || {};

  return {
    props: {
      data: siteData || {},
      navbar: siteData || {},
      pageNotFound: pageNotFound || {},
    },
    revalidate: false,
  };
}

export default Page404;
