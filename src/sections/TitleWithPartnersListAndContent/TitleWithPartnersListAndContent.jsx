import Heading from "@/components/Heading";
import HtmlBlock from "@/components/HtmlBlock";
import NextImage from "@/components/NextImage";
import NextLink from "@/components/NextLink";
import { decode } from "he";
import React from "react";

const TitleWithPartnersListAndContent = (props) => {
  const { title, content, partnersList } = props;

  const partners = Array(partnersList)
    .fill(null)
    .map((_, i) => {
      return {
        link: props[`partnersList${i}Link`],
        logo: props[`partnersList${i}Logo`],
      };
    });
  return (
    <section
      data-testid="title-with-partners-list-and-content"
      className="container my-5 lg:my-10"
    >
      <div className="flex flex-col items-center justify-center gap-5 lg:gap-10">
        <Heading
          type="h2"
          otherClasses="text-h2 font-cubano text-brand-royal-blue uppercase text-center w-[93%]"
        >
          {title}
        </Heading>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {partners?.map((item) => (
            <NextLink
              href={item?.link?.url}
              key={item?.id}
              otherClasses="bg-white rounded-lg flex items-center justify-center p-2 hover:scale-[1.05] transition-all duration-300 min-h-[80px] card-shadow"
            >
              {item?.logo?.url ? (
                <NextImage
                  {...item?.logo}
                  height={1000}
                  width={1000}
                  otherClasses="h-[80px] w-auto object-contain object-center"
                />
              ) : (
                <p className="text-p2 font-openSans font-bold text-brand-black text-center px-4">
                  {decode(item?.link?.title)}
                </p>
              )}
            </NextLink>
          ))}
        </div>
        <div className="bg-white w-fit px-10 py-4 card-shadow rounded-lg border border-brand-grey-2">
          <HtmlBlock
            content={content}
            className="[&>p]:!text-p1 [&>p]:!font-pbsKidsHeadline [&>p]:!text-brand-sky-blue text-center"
          />
        </div>
      </div>
    </section>
  );
};

export default TitleWithPartnersListAndContent;
