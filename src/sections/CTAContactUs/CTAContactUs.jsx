import React from "react";
import Image from "next/image";
import HtmlBlock from "@/components/HtmlBlock";
import CustomLink from "@/components/CustomLink";

export default function CTAContactUs(props) {
  const { title, heading, description, image, buttonVariant, buttonAnchor } =
    props;

  const button = {
    variant: buttonVariant,
    anchor: buttonAnchor,
  };

  return (
    <section
      data-testid="cta-contact-us"
      className="lg:mb-[3.5rem] mb-10 overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-[3.4375rem] md:py-[3.6875rem] container">
        <div className="md:pb-[1.875rem] pt-[1.875rem]">
          {title && (
            <h4 className="text-brand-pumpkin-orange font-pbsKidsHeadline text-h4 font-normal mb-[.625rem]">
              {title}
            </h4>
          )}
          {heading && (
            <h2 className="font-cubano text-brand-royal-blue text-h2 font-normal">
              {heading}
            </h2>
          )}
          <div className="bg-brand-mustard-yellow h-[.375rem] w-full my-[1.875rem]"></div>
          {description && (
            <HtmlBlock
              content={description}
              className="text-brand-black text-p1 font-normal [&>strong]:font-bold [&>p>strong]:font-bold"
            />
          )}

          {buttonAnchor?.url && (
            <div className="mt-[1.875rem]">
              <CustomLink {...button} otherClasses="w-fit" />
            </div>
          )}
        </div>
        <div className="relative h-max md:h-[25.125rem] md:w-full md:mr-4 lg:mr-0 max-md:my-[3.6875rem]">
          {image?.url && (
            <>
              <Image
                src={image?.url}
                alt={image?.title}
                className="object-contain md:object-cover object-right md:object-top z-30 rounded-l-[.625rem] border-r-[1.25rem] border-r-brand-pink hidden md:block"
                fill
              />

              <img
                src={image?.url}
                alt={image?.title}
                className="w-[90%] xsm:w-[80%] h-full max-h-[26rem] relative object-contain md:object-cover object-right md:object-top z-30 rounded-l-[.625rem] border-r-[1.25rem] border-r-brand-pink block md:hidden"
              />
            </>
          )}
          <div className="bg-brand-light-peach h-[calc(100%+7.375rem)] -top-[3.6875rem] z-10 rounded-l-[5.625rem] left-[20vw] md:left-[5.5625rem] absolute w-[100vw]"></div>
          <div className="h-[7rem] sm:h-[10.25rem] w-[7rem] sm:w-[10.25rem] bg-brand-pumpkin-orange rounded-[6.25rem] z-20 -bottom-[2.9375rem] right-[0rem] xsm:right-[2.5rem] md:-right-6 lg:-right-[2rem] [@media(min-width:1310px)]:-right-[3.125rem] absolute"></div>
        </div>
      </div>
    </section>
  );
}
