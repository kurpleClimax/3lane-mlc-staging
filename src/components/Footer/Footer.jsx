import React from "react";
import NextImage from "../NextImage";
import NextLink from "../NextLink";
import HtmlBlock from "../HtmlBlock";
import Icon from "../Icon";

export const Footer = ({ data }) => {
  return (
    <div data-testid="footer" className="relative">
      <div className="flex lg:flex-row flex-col items-center justify-between relative z-10">
        <div className="lg:w-[50vw] w-full bg-brand-blue-dark py-10 min-h-[510px] z-10 px-5 lg:px-0">
          <div className="flex flex-col items-start xl:ml-[calc(50vw-600px)] mr-10 lg:mr-20">
            <NextLink href={"/"}>
              <NextImage
                {...data?.logo?.node}
                otherClasses="object-contain object-center w-auto h-[130px]"
              />
            </NextLink>
            <div className="my-5 lg:my-10 py-5 border-t border-t-white border-b border-b-white w-full flex items-center gap-5">
              <p className="text-p1 font-pbsKidsHeadline text-white">
                {data?.socialMediaText}
              </p>
              <div className="flex items-center gap-5">
                {data?.socialMedia?.map((item) => (
                  <NextLink href={item?.link?.url} key={item?.id}>
                    <NextImage
                      {...item?.icon?.node}
                      otherClasses="object-cover object-center h-[1.75rem] w-auto"
                    />
                  </NextLink>
                ))}
              </div>
            </div>
            <HtmlBlock
              content={data?.address}
              className="text-white text-p2 font-openSans [&>p]:!text-white"
            />

            <NextLink
              href={data?.contactUsLink?.url}
              otherClasses="border border-brand-sky-blue bg-brand-sky-blue px-4 py-2 font-openSans font-normal text-p2 rounded-lg text-white lg:mt-10 my-5 flex items-center gap-2 hover:gap-4 transition-all duration-300 hover:bg-brand-sky-blue/80"
            >
              {data?.contactUsLink?.title}
              <Icon icon="arrow-right-white" iconHeight={16} iconWidth={16} />
            </NextLink>
          </div>
        </div>
        <div className="lg:w-[50vw] w-full bg-brand-mustard-yellow p-10 min-h-[510px] relative overflow-hidden">
          <div
            className="bg-contain bg-center bg-no-repeat absolute flex flex-col items-center justify-center top-5 right-0 w-[500px] h-[500px] z-[100]"
            style={{
              backgroundImage: `url("https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/05/Union.png")`,
            }}
          >
            <p className="text-h3 font-cubano text-white text-center uppercase">
              {data?.newsletterText}
            </p>
            <NextLink
              href={"#"}
              otherClasses="border border-brand-sky-blue bg-brand-sky-blue px-4 py-2 font-openSans font-normal text-p2 rounded-lg text-white my-5 flex items-center gap-2 hover:gap-4 transition-all duration-300 hover:bg-brand-sky-blue/80"
            >
              Sign Up
              <Icon icon="arrow-right-white" iconHeight={16} iconWidth={16} />
            </NextLink>
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-0 left-[38vw] z-10">
          <NextImage
            {...data?.image?.node}
            otherClasses="h-[500px] w-auto object-contain object-center"
          />
        </div>
        <div className="hidden lg:block absolute bottom-0 right-[28vw] z-20">
          <NextImage
            url={
              "https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/05/Dog-MLC-Back-To-School-Assets-High-Res-300px-1.svg"
            }
            width={100}
            height={100}
            otherClasses="h-[100px] w-auto object-contain object-center"
          />
        </div>
        <div className="absolute bottom-0 right-[8vw] z-20">
          <NextImage
            url={
              "https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/05/school-bus-MLC-Back-To-School-Assets-High-Res-300px-1.svg"
            }
            width={100}
            height={100}
            otherClasses="h-[70px] w-auto object-contain object-center"
          />
        </div>
      </div>
      <div className="bg-brand-sky-blue py-6">
        <div className="container">
          <div className="flex flex-col items-center justify-center">
            <p className="text-white text-p1 font-pbsKidsHeadline font-normal text-center">
              {data?.partnersTitle}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
              {data?.partners?.map((item) => (
                <NextLink
                  href={item?.link?.url}
                  key={item?.id}
                  otherClasses="bg-white rounded-lg flex items-center justify-center p-2 hover:scale-[1.05] transition-all duration-300 min-h-[80px]"
                >
                  {item?.logo?.node ? (
                    <NextImage
                      {...item?.logo?.node}
                      height={1000}
                      width={1000}
                      otherClasses="h-[80px] w-auto object-contain object-center"
                    />
                  ) : (
                    <p className="text-p2 font-openSans font-bold text-brand-black text-center px-4">
                      {item?.link?.title}
                    </p>
                  )}
                </NextLink>
              ))}
            </div>
            <p className="text-white text-p1 font-pbsKidsHeadline font-normal text-center">
              {data?.supportersText}
            </p>
          </div>
        </div>
      </div>
      <div className="border-b-8 border-b-brand-blue-dark bg-white py-3">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between py-3">
            <HtmlBlock
              content={data?.copyright}
              className="text-p4 text-center [&>p]:!font-openSans [&>p]:!text-p4 font-normal [&>p]:!text-brand-navy [&>p>a]:!text-p4 [&>p>a]:!font-openSans [&>p>a]:!font-normal [&>p>a]:!text-brand-navy [&>p>a]:!no-underline"
            />

            <div className="text-p4 font-openSans font-normal text-brand-navy">
              Site By{" "}
              <NextLink href={data?.siteBy?.url} otherClasses="font-semibold">
                {data?.siteBy.title}
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
