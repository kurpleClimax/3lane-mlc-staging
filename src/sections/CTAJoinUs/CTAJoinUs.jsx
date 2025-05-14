import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import HtmlBlock from "@/components/HtmlBlock";
import CustomLink from "@/components/CustomLink";

export default function CTAJoinUs(props) {
  const {
    heading,
    description,
    image,
    dateAndTime,
    buttonVariant,
    buttonAnchor,
  } = props;

  const formatted = dayjs(dateAndTime).format("MMMM D, YYYY [at] h:mma");

  const button = {
    variant: buttonVariant,
    anchor: buttonAnchor,
  };

  return (
    <section
      data-testid="cta-join-us"
      className="lg:mb-[3.5rem] mb-10 container"
    >
      <div className="rounded-[.625rem] bg-brand-sky-blue lg:pl-12 md:pl-5 flex gap-[.9375rem] overflow-hidden max-md:flex-col">
        <div className="pt-10 pb-[2.1875rem] max-md:px-5">
          {heading && (
            <h2 className="text-white text-h2 font-normal font-cubano mb-4">
              {heading}
            </h2>
          )}
          {description && (
            <HtmlBlock
              content={description}
              className="!text-white [&>p]:!text-white text-p1 font-normal"
            />
          )}

          <div className="mb-6 mt-3 h-[.0625rem] w-full bg-brand-mustard-yellow"></div>

          {dateAndTime && (
            <p className="text-white text-p1 font-normal">
              <span className="font-pbsKidsHeadline">Date & Time:</span>
              <span> {formatted}</span>
            </p>
          )}

          {buttonAnchor?.url && (
            <div className="3 mt-[1.5625rem]">
              <CustomLink {...button} otherClasses="w-fit" />
            </div>
          )}
        </div>

        <div className="relative h-[22rem] md:h-auto md:max-w-[20.57rem] w-full">
          {image?.url && (
            <Image
              src={image?.url}
              alt={image?.title || "CTA Join Us"}
              className="object-cover"
              fill
            />
          )}
        </div>
      </div>
    </section>
  );
}
