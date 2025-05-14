import Image from "next/image";
import React from "react";
import styles from "./CTARegisterNow.module.scss";
import clsx from "clsx";
import HtmlBlock from "@/components/HtmlBlock";
import CustomLink from "@/components/CustomLink";

export default function CTARegisterNow(props) {
  const { heading, description, image, buttonVariant, buttonAnchor } = props;

  const button = {
    variant: buttonVariant,
    anchor: buttonAnchor,
  };

  return (
    <section data-testid="cta-register-now" className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[43.1%_51%] sm:gap-5 md:gap-10 lg:gap-[3.125rem] bg-brand-lime-green overflow-hidden">
        <div
          className={clsx(
            styles.bg,
            "md:relative w-full h-full [@media(max-width:768px)]:max-h-[25.3125rem]"
          )}
        >
          {image?.url && (
            <Image
              src={image?.url}
              alt={image?.title}
              width={620}
              height={620}
              className="md:absolute right-0 md:top-1/2 md:-translate-y-1/2 lg:top-[-3rem] lg:translate-y-0 w-full [@media(min-width:1441px)]:w-[38.75rem] [@media(min-width:1441px)]:h-[38.75rem] aspect-square object-cover rounded-full border-[1.875rem] md:border-[3.3125rem] border-brand-mustard-yellow overflow-hidden"
            />
          )}
        </div>

        <div className="w-full max-w-[40.5rem] py-5 md:py-10 lg:py-[4.0313rem] pl-5 md:pl-0 pr-5 lg:pr-0 flex-1 order-first md:order-none">
          {heading && (
            <h2 className="text-white font-cubano text-h2 font-normal mb-3">
              {heading}
            </h2>
          )}
          {description && (
            <HtmlBlock
              className="text-p1 [&>a]:!text-white [&>p>a]:!text-white [&>a]:font-bold [&>p>a]:font-bold !text-white break-words"
              content={description}
            />
          )}

          {buttonAnchor?.url && (
            <div className="mt-8">
              <CustomLink {...button} otherClasses="w-fit" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
