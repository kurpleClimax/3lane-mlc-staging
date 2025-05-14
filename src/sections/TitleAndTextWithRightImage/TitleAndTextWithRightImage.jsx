"use client";
import { usePathname } from "next/navigation";

import NextImage from "@/components/NextImage";
import HtmlBlock from "@/components/HtmlBlock";

export const TitleAndTextWithRightImage = (props) => {
  const { title, tag, text, image } = props;

  const pathname = usePathname();
  return (
    <section
      data-testid="title-and-text-with-right-image"
      className={`container flex flex-col items-center justify-between gap-[1.5625rem] mb-10 lg:mb-[3.5rem]`}
    >
      {title && (
        <h2 className="w-full max-w-[62.5rem] text-h4 md:text-h2 text-brand-royal-blue font-normal font-cubano uppercase text-center">
          {title}
        </h2>
      )}
      {tag && (
        <span className="py-[.125rem] px-[.5rem] bg-brand-pumpkin-orange w-max uppercase text-p3 font-normal text-white rounded-[.25rem]">
          {tag}
        </span>
      )}
      <div className="w-full h-[.375rem] bg-brand-golden-yellow rounded-full lg:mb-[1.125rem]"></div>
      <div className="w-full px-0 md:px-[3.75rem] lg:px-[6.125rem]">
        <div className="w-full md:w-auto float-right md:ml-10 lg:ml-[4.1875rem] mb-4 md:mb-8">
          {image?.url && (
            <div className="relative w-full md:w-[28.125rem] h-[16rem]">
              <NextImage
                url={image?.url}
                alt={image?.title}
                fill
                otherClasses="object-cover"
              />
            </div>
          )}
        </div>
        {text && (
          <HtmlBlock content={text} className="break-words [&>p>a]:font-bold" />
        )}
      </div>
    </section>
  );
};
