import Heading from "@/components/Heading";
import HtmlBlock from "@/components/HtmlBlock";
import NextImage from "@/components/NextImage";
import React from "react";

const TitleContentWithTopRoundedImageCardsList = (props) => {
  const { cardsList } = props;

  const cards = Array(cardsList)
    .fill(null)
    .map((_, i) => {
      return {
        title: props[`cardsList${i}Title`],
        content: props[`cardsList${i}Content`],
        image: props[`cardsList${i}Image`],
      };
    });

  return (
    <section
      data-testid="title-content-with-top-rounded-image-cards-list"
      className="container my-10 flex items-center justify-center"
    >
      <div className="grid lg:grid-cols-2 items-center justify-between lg:w-[93%] gap-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-brand-sky-blue p-5 lg:p-10 rounded-lg relative overflow-hidden"
          >
            <div className="w-[400px] h-[400px] bg-brand-mustard-yellow rounded-full absolute -top-[130px] -right-[130px] lg:block hidden" />
            <div className="w-[300px] h-[300px] bg-brand-pumpkin-orange rounded-full absolute -top-[80px] -right-[80px] lg:block hidden" />
            <NextImage
              {...card?.image}
              otherClasses="object-cover object-center w-[280px] h-[280px] bg-white rounded-full absolute -top-[70px] -right-[70px] z-20 lg:block hidden"
            />
            <Heading
              type="h2"
              otherClasses="text-h2 font-normal font-cubano text-white mb-5 lg:mb-10 w-[40%]"
            >
              {card.title}
            </Heading>
            <div className="bg-white rounded-lg px-5 py-10">
              <div className="w-full h-[10px] bg-brand-mustard-yellow rounded-lg mb-3" />
              <HtmlBlock
                content={card?.content}
                className="lg:w-[55%] [&>p]:!text-p1 [&>p]:!text-brand-dark-gray"
              />
              <div className="w-[20%] h-[10px] bg-brand-mustard-yellow rounded-lg mt-3" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TitleContentWithTopRoundedImageCardsList;
