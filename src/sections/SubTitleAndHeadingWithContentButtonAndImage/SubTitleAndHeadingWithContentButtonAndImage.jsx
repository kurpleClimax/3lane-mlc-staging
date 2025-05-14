import CustomLink from "@/components/CustomLink";
import Heading from "@/components/Heading";
import HtmlBlock from "@/components/HtmlBlock";
import NextImage from "@/components/NextImage";
import React from "react";

const SubTitleAndHeadingWithContentButtonAndImage = (props) => {
  const { subTitle, heading, content, buttonAnchor, buttonVariant, image } =
    props;

  const button = {
    anchor: buttonAnchor,
    variant: buttonVariant,
  };

  return (
    <section
      data-testid="subtitle-and-heading-with-content-button-and-image"
      className="relative my-10 lg:my-20"
    >
      <div className="w-[500px] h-[430px] absolute -top-10 right-0 z-10 bg-brand-light-peach rounded-l-[90px] lg:block hidden" />
      <div className="container">
        <div className="flex lg:flex-row flex-col items-center justify-center gap-5 lg:gap-10 z-50 relative">
          <div className="w-[95%] flex lg:flex-row flex-col-reverse items-center justify-between gap-5 lg:gap-10">
            <div className="lg:w-[50%]">
              {subTitle && (
                <Heading
                  type="h2"
                  otherClasses="text-h4 font-pbsKidsHeadline font-normal text-brand-pumpkin-orange"
                >
                  {subTitle}
                </Heading>
              )}
              {heading && (
                <Heading
                  type="h2"
                  otherClasses="text-h2 font-pbsKidsHeadline font-normal text-brand-royal-blue"
                >
                  {heading}
                </Heading>
              )}
              <div className="w-full h-[6px] bg-brand-pumpkin-orange rounded-full my-5" />

              <HtmlBlock
                content={content}
                className="[&>p]:!text-p1 [&>p]:!font-openSans [&>p]:!text-brand-black"
              />
              <CustomLink {...button} otherClasses="mt-10" />
            </div>
            <div className="w-[50%] relative z-20">
              <NextImage
                {...image}
                otherClasses="object-cover object-center border-r-[20px] border-r-brand-pink z-20 relative w-full h-auto"
              />
              <div className="absolute w-[100px] h-[100px] rounded-full -bottom-[40px] -right-[40px] bg-brand-pumpkin-orange z-10 lg:block hidden" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubTitleAndHeadingWithContentButtonAndImage;
