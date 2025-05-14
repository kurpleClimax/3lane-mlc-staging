import CustomLink from "@/components/CustomLink";
import HtmlBlock from "@/components/HtmlBlock";
import Image from "next/image";
import React from "react";

export default function ContentWithRightImage(props) {
  const {
    heading,
    description,
    image,
    button1Variant,
    button1Anchor,
    button2Variant,
    button2Anchor,
  } = props;

  const button1 = {
    variant: button1Variant,
    anchor: button1Anchor,
  };
  const button2 = {
    variant: button2Variant,
    anchor: button2Anchor,
  };

  return (
    <section
      data-testid="content-with-right-image"
      className="container lg:mb-[3.5rem] mb-10 flex max-md:flex-col gap-5 lg:gap-[4.5625rem]"
    >
      <div className="md:py-[1.5625rem] w-full">
        {heading && (
          <h2 className="text-brand-royal-blue text-h2 font-cubano font-normal mb-4">
            {heading}
          </h2>
        )}
        {description && (
          <HtmlBlock
            content={description}
            className="text-brand-black text-p1 font-normal [&>strong]:!font-bold [&>p>strong]:!font-bold [&>p>a]:!font-bold"
          />
        )}
        {(button1Anchor?.url || button2Anchor?.url) && (
          <div className="flex flex-wrap gap-4 xl:gap-[1.5938rem] mt-8">
            {button1Anchor?.url && (
              <CustomLink {...button1} otherClasses="capitalize" />
            )}
            {button2Anchor?.url && (
              <CustomLink {...button2} otherClasses="capitalize" />
            )}
          </div>
        )}
      </div>
      {image?.url && (
        <div className="relative md:max-w-[26.125rem] w-full h-[22rem] md:h-auto rounded-[.625rem] overflow-hidden">
          <Image
            src={image?.url}
            alt={image?.title}
            className="object-cover"
            fill
          />
        </div>
      )}
    </section>
  );
}
