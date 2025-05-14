import HtmlBlock from "@/components/HtmlBlock";
import React from "react";

const HeadingAndSubtext = (props) => {
  const { heading, subtext } = props;
  return (
    <section
      data-testid="heading-and-subtext"
      className="container my-5 lg:my-10 overflow-hidden"
    >
      <div className="flex items-center justify-center">
        <div className="w-[93%]">
          <div className="w-full bg-brand-light-peach p-10 py-14 rounded-lg">
            <div className="flex lg:flex-row flex-col items-center justify-between gap-5 bg-brand-pumpkin-orange py-10 px-20 rounded-lg scale-[1.20]">
              <div className="lg:w-[70%]">
                {heading && (
                  <HtmlBlock
                    content={heading}
                    className="[&>p]:!text-white [&>p]:!text-h2 [&>p]:!font-cubano [&>p]:!flex text-center lg:text-start lg:[&>p]:!flex-row [&>p]:!flex-col [&>p]:!items-center [&>p]:!justify-center [&>p]:!gap-4 [&>p>strong]:!text-brand-lime-green [&>p>strong]:!text-large [&>p>strong]:!font-cubano [&>p>strong]:!stroke-[1px] [&>p>strong]:!stroke-white [&>p>strong]:![-webkit-text-stroke:1px_white] [&>p]:!uppercase [&>p>strong]:!uppercase"
                  />
                )}
              </div>
              <div className="lg:w-[30%]">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeadingAndSubtext;
