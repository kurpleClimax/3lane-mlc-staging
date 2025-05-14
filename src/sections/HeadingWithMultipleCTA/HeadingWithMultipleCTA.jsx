import CustomLink from "@/components/CustomLink";
import HtmlBlock from "@/components/HtmlBlock";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

export default function HeadingWithMultipleCTA(props) {
  const { heading, ctas } = props;

  const ArrayGeneration = () => {
    const newArray = [];
    for (let i = 0; i < ctas; i++) {
      const title = props[`ctas${i}Title`];
      const text = props[`ctas${i}Text`];
      const dueTill = props[`ctas${i}DueTill`];
      const image = props[`ctas${i}Image`];
      const button1 = {
        variant: props[`ctas${i}Button1Variant`],
        anchor: props[`ctas${i}Button1Anchor`],
      };
      const button2 = {
        variant: props[`ctas${i}Button2Variant`],
        anchor: props[`ctas${i}Button2Anchor`],
      };

      newArray.push({
        title,
        text,
        dueTill,
        image,
        button1,
        button2,
      });
    }
    return newArray;
  };

  const cards = ArrayGeneration();

  return (
    <section
      data-testid="heading-with-multiple-cta"
      className="lg:mb-[3.5rem] mb-10"
    >
      {heading && (
        <div className="bg-brand-sky-blue">
          <h1 className="text-white container text-center font-cubano text-h2 font-normal py-6">
            {heading}
          </h1>
        </div>
      )}
      <div className="container">
        {cards?.map((item, index) => (
          <div key={index} className="mt-10">
            <div
              className={clsx(
                cards?.length - 1 > index && "mb-10",
                "lg:px-[3.125rem] grid grid-cols-1 md:grid-cols-[40%_55.7%] xl:grid-cols-[33.3%_63%] gap-5 lg:gap-[2.375rem]"
              )}
            >
              <div className="h-[20rem] sm:h-[24rem] md:h-auto relative w-full">
                {item?.image?.url && (
                  <Image
                    src={item?.image?.url}
                    alt={item?.image?.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-brand-royal-blue text-h4 font-normal font-pbsKidsHeadline mb-4">
                  {item?.title}
                </h2>

                <HtmlBlock
                  className="text-brand-black text-p1 font-normal"
                  content={item?.text}
                />

                {item?.dueTill && (
                  <>
                    <div className="bg-brand-mustard-yellow h-[.0625rem] my-6 w-full"></div>
                    <HtmlBlock
                      className="text-brand-black text-p2 font-normal [&>a]:font-bold [&>p>a]:font-bold"
                      content={item?.dueTill}
                    />
                  </>
                )}

                {(item.button1?.anchor?.url || item.button2?.anchor?.url) && (
                  <div className="mt-10 flex gap-6 flex-wrap">
                    {item?.button1?.anchor?.url && (
                      <CustomLink {...item.button1} />
                    )}
                    {item?.button2?.anchor?.url && (
                      <CustomLink {...item.button2} />
                    )}
                  </div>
                )}
              </div>
            </div>

            {cards?.length - 1 > index && (
              <div className="bg-brand-mustard-yellow h-[.1875rem] w-full"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
