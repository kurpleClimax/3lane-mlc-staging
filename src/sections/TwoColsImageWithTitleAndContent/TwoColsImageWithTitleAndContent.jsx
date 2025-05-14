import Heading from "@/components/Heading";
import HtmlBlock from "@/components/HtmlBlock";
import NextImage from "@/components/NextImage";
import clsx from "clsx";
import React from "react";

const TwoColsImageWithTitleAndContent = (props) => {
  const { image, title, content, circleImage } = props;
  return (
    <section
      data-testid="two-cols-image-with-title-and-content"
      className={clsx("container", circleImage?.url ? "my-20" : "my-10")}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-10">
        <div className="lg:w-[40%] w-full  relative">
          <NextImage
            {...image}
            otherClasses="object-cover object-center w-full h-auto min-h-[400px] rounded-lg"
          />
          {circleImage?.url && (
            <NextImage
              {...circleImage}
              height={1000}
              width={1000}
              otherClasses="object-contain object-center w-[150px] h-[150px] absolute -top-[50px] -left-[50px] lg:block hidden"
            />
          )}
        </div>
        <div className="lg:w-[50%] w-full">
          <Heading
            type="h2"
            otherClasses="text-h2 font-cubano text-brand-royal-blue pb-5 mb-5 border-b-8 border-brand-mustard-yellow uppercase"
          >
            {title}
          </Heading>
          <HtmlBlock
            content={content}
            className="[&>p]:!text-p1 [&>p]:!text-brand-black [&>p>strong]:!text-brand-black"
          />
        </div>
      </div>
    </section>
  );
};

export default TwoColsImageWithTitleAndContent;
