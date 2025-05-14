import CustomLink from "@/components/CustomLink";
import HtmlBlock from "@/components/HtmlBlock";
import NextImage from "@/components/NextImage";
import React from "react";

const BgImageWithDetailCardslist = (props) => {
  const { cardsList } = props;

  const cards = Array(cardsList)
    .fill(null)
    .map((_, i) => {
      return {
        bgImage: props[`cardsList${i}BgImage`],
        logo: props[`cardsList${i}Logo`],
        content: props[`cardsList${i}Content`],
        buttonAnchor: props[`cardsList${i}ButtonAnchor`],
        buttonVariant: props[`cardsList${i}ButtonVariant`],
      };
    });

  return (
    <section
      data-testid="bg-image-with-detail-cards-list"
      className="container my-5 lg:my-10"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 items-center justify-between gap-5 lg:gap-10">
        {cards.map((card, index) => {
          const button = {
            anchor: card?.buttonAnchor,
            variant: card?.buttonVariant,
          };
          return (
            <div
              key={index}
              className="relative min-h-[500px] rounded-t-lg overflow-hidden"
            >
              <NextImage
                {...card.bgImage}
                otherClasses="object-cover object-center h-[300px]"
              />
              <div className="w-full h-[200px] bg-brand-sky-blue" />
              <div className="w-[90%] h-[280px] bg-white absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-lg flex flex-col items-center p-5 transition-all duration-300 hover:h-[400px] group">
                <NextImage
                  {...card?.logo}
                  otherClasses="object-contain object-center w-full h-[80px]"
                />
                <div className="w-full h-[6px] bg-brand-mustard-yellow rounded-lg mt-3" />
                <div className="overflow-hidden">
                  <HtmlBlock
                    content={
                      card?.content?.length > 80
                        ? `${card.content.substring(0, 80)}...`
                        : card?.content
                    }
                    className="[&>p]:!text-p2 [&>p]:!font-openSans [&>p]:!text-brand-black mt-3 group-hover:hidden"
                  />
                  <HtmlBlock
                    content={card?.content}
                    className="[&>p]:!text-p2 [&>p]:!font-openSans [&>p]:!text-brand-black mt-3 hidden group-hover:block"
                  />
                  <CustomLink {...button} otherClasses="mt-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BgImageWithDetailCardslist;
