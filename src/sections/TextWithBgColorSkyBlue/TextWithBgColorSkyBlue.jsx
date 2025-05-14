import HtmlBlock from "@/components/HtmlBlock";
import React from "react";

const TextWithBgColorSkyBlue = (props) => {
  return (
    <section
      data-testid="text-with-bg-sky-blue"
      className="bg-brand-sky-blue my-5 lg:my-10"
    >
      <div className="container p-10 flex items-center justify-center">
        <div className="lg:w-[90%]">
          <HtmlBlock
            content={props?.content}
            className="text-center [&>p]:!font-pbsKidsHeadline [&>p]:!text-h4 [&>p]:!text-white"
          />
        </div>
      </div>
    </section>
  );
};

export default TextWithBgColorSkyBlue;
