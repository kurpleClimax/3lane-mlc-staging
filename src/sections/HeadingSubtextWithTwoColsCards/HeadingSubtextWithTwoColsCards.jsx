import CustomLink from "@/components/CustomLink";
import Heading from "@/components/Heading";
import HtmlBlock from "@/components/HtmlBlock";
import NextImage from "@/components/NextImage";
import React from "react";

const HeadingSubtextWithTwoColsCards = (props) => {
  const { heading, subtext, leftColCards, rightColCards } = props;

  const leftCards = Array(leftColCards)
    .fill(null)
    .map((_, i) => {
      return {
        title: props[`leftColCards${i}Title`],
        content: props[`leftColCards${i}Content`],
        buttonAnchor: props[`leftColCards${i}ButtonAnchor`],
        buttonVariant: props[`leftColCards${i}ButtonVariant`],
      };
    });

  const rightCards = Array(rightColCards)
    .fill(null)
    .map((_, i) => {
      return {
        image: props[`rightColCards${i}Image`],
        title: props[`rightColCards${i}Title`],
        content: props[`rightColCards${i}Content`],
        buttonAnchor: props[`rightColCards${i}ButtonAnchor`],
        buttonVariant: props[`rightColCards${i}ButtonVariant`],
      };
    });
  return (
    <section
      data-testid="heading-subtext-with-two"
      className="container my-5 lg:my-10 overflow-hidden"
    >
      <div className="flex items-center justify-center">
        <div className="w-[93%]">
          <div className="w-full bg-brand-light-peach p-10 rounded-lg">
            <div className="flex lg:flex-row flex-col items-center justify-between gap-5 bg-brand-pumpkin-orange py-10 px-28 rounded-lg scale-[1.20] mt-10 ">
              <div className="lg:w-[60%]">
                {heading && (
                  <HtmlBlock
                    content={heading}
                    className="[&>p]:!text-white [&>p]:!text-h2 [&>p]:!font-cubano [&>p]:!flex text-center lg:text-start lg:[&>p]:!flex-row [&>p]:!flex-col [&>p]:!items-center [&>p]:!justify-center [&>p]:!gap-4 [&>p>strong]:!text-brand-lime-green [&>p>strong]:!text-large [&>p>strong]:!font-cubano [&>p>strong]:!stroke-[1px] [&>p>strong]:!stroke-white [&>p>strong]:![-webkit-text-stroke:1px_white] [&>p]:!uppercase [&>p>strong]:!uppercase"
                  />
                )}
              </div>
              <div className="lg:w-[40%]">
                <div className="w-full h-[6px] bg-brand-light-peach rounded-lg" />
                <div className="w-full my-5 bg-brand-mustard-yellow p-5">
                  <HtmlBlock
                    content={subtext}
                    className="text-center [&>p]:!text-p1 [&>p]:!font-pbsKidsHeadline [&>p]:!text-white"
                  />
                </div>
                <div className="w-full h-[6px] bg-brand-light-peach rounded-lg" />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-start justify-between gap-5 lg:gap-10 mt-20 lg:mt-20">
              <div className="lg:w-[45%] flex flex-col gap-5 lg:gap-10">
                {leftCards.map((item) => {
                  const button = {
                    anchor: item.buttonAnchor,
                    variant: item.buttonVariant,
                  };
                  return (
                    <div className="w-full bg-white px-5 py-10 rounded-lg flex flex-col items-center justify-center">
                      <Heading
                        type="h2"
                        otherClasses="text-h4 font-pbsKidsHeadline text-brand-lime-green text-center font-normal mb-5 lg:w-[80%]"
                      >
                        {item.title}
                      </Heading>
                      <div className="w-full h-[6px] bg-brand-mustard-yellow rounded-lg" />
                      <HtmlBlock
                        content={item.content}
                        className="text-center [&>p]:!text-p2 [&>p]:!font-openSans [&>p]:!text-brand-black my-5"
                      />
                      <CustomLink {...button} otherClasses="mt-5" />
                    </div>
                  );
                })}
              </div>
              <div className="lg:w-[55%] max-h-[735px] rounded-lg overflow-hidden flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {rightCards.map((item) => {
                  const button = {
                    anchor: item.buttonAnchor,
                    variant: item.buttonVariant,
                  };
                  return (
                    <div className="w-full min-h-[735px] bg-white px-5 py-10 flex flex-col items-center gap-10 border-b border-b-brand-light-peach">
                      <NextImage
                        {...item?.image}
                        otherClasses="object-cover object-center h-[375px]"
                      />
                      <div className="flex flex-col items-center justify-center">
                        <Heading
                          type="h2"
                          otherClasses="text-h4 font-pbsKidsHeadline text-brand-lime-green text-center font-normal mb-5 lg:w-[80%]"
                        >
                          {item.title}
                        </Heading>
                        <div className="w-full h-[6px] bg-brand-mustard-yellow rounded-lg" />
                        <HtmlBlock
                          content={item.content}
                          className="text-center [&>p]:!text-p2 [&>p]:!font-openSans [&>p]:!text-brand-black my-5"
                        />
                        <CustomLink {...button} otherClasses="mt-5" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeadingSubtextWithTwoColsCards;
