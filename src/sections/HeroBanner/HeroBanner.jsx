import React from "react";
import styles from "./HeroBanner.module.scss";
import clsx from "clsx";
import Image from "next/image";
import HtmlBlock from "@/components/HtmlBlock";

export default function HeroBanner(props) {
  const { title, text, image } = props;
  return (
    <section
      data-testid="hero-banner"
      className="w-full bg-brand-green relative overflow-hidden"
    >
      <div className="container pt-6 pb-4 md:py-[2.875rem] flex max-md:flex-col">
        <div className="md:max-w-[62%] lg:max-w-[72.3%] [@media(min-width:1200px)]:max-w-[76.3%] w-full">
          {title && (
            <h2
              className={clsx(
                styles.heading,
                "text-white font-cubano text-[5rem] leading-[5.5rem] font-normal mb-5"
              )}
            >
              {title}
            </h2>
          )}

          {text && (
            <HtmlBlock
              content={text}
              className="!font-pbsKidsHeadline !font-normal !text-h4 !text-white [&>p]:!font-pbsKidsHeadline [&>p]:!font-normal [&>p]:!text-h4 [&>p]:!text-white"
            />
          )}
        </div>
      </div>

      <div className="mx-auto relative md:absolute -bottom-14 md:-right-[2.8rem] h-[21.9375rem] w-[21.9375rem]">
        <div className="relative h-full w-full border-[1rem] border-brand-green z-20 rounded-full ">
          {image?.url && (
            <Image
              src={image?.url}
              alt={image?.text}
              fill
              className="object-cover rounded-full border-[2rem] border-brand-lime-green"
            />
          )}
        </div>
        <div className="h-[5.4375rem] w-[5.4375rem] bg-brand-sky-blue rounded-full left-0 bottom-0 absolute z-30"></div>
        <div className="h-[6.25rem] w-[6.25rem] bg-brand-pink absolute right-[.9375rem] -top-[2.4rem] rounded-full"></div>
      </div>
    </section>
  );
}
