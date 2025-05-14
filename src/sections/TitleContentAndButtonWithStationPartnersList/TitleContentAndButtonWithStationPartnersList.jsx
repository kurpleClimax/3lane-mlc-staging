import CustomLink from "@/components/CustomLink";
import Heading from "@/components/Heading";
import HtmlBlock from "@/components/HtmlBlock";
import Icon from "@/components/Icon";
import NextImage from "@/components/NextImage";
import NextLink from "@/components/NextLink";
import React from "react";

const TitleContentAndButtonWithStationPartnersList = (props) => {
  const { title, content, buttonAnchor, buttonVariant, selectStationPartners } =
    props;

  const button = {
    anchor: buttonAnchor,
    variant: buttonVariant,
  };
  return (
    <section
      data-testid="title-content-and-button-with-station-partners-list"
      className="bg-brand-light-grey p-5 lg:p-10 my-5 lg:my-10"
    >
      <div className="container">
        <div className="flex items-center justify-center flex-col gap-5">
          <Heading
            type="h2"
            otherClasses="text-h2 font-cubano font-normal text-center text-brand-royal-blue"
          >
            {title}
          </Heading>
          <HtmlBlock
            content={content}
            className="text-center [&>p]:!text-p1 [&>p]:!text-brand-black"
          />
          <CustomLink {...button} otherClasses="mt-5" />
        </div>
        <div className="flex items-center justify-center flex-wrap gap-5 mt-5 lg:mt-10">
          {selectStationPartners.map((partner) => {
            return (
              <NextLink
                key={partner.id}
                href={partner?.stationPartnerFieldsGroup?.link?.url}
                otherClasses="flip-card w-[31%] min-h-[350px]"
              >
                <div className="flip-card-inner rounded-lg min-h-[350px] flex flex-col items-center p-5 relative w-full">
                  {/* Front Side */}
                  <div className="flip-card-front bg-white rounded-lg min-h-[350px] flex flex-col items-center p-5 relative w-full">
                    <div className="flex-1 flex items-center justify-center w-full">
                      <NextImage
                        url={
                          partner.stationPartnerFieldsGroup.colorfulLogo.node
                            .sourceUrl
                        }
                        width={1000}
                        height={1000}
                        otherClasses="w-[150px] h-auto object-contain object-center"
                      />
                    </div>
                    <div className="flex justify-center w-full absolute left-0 bottom-4">
                      <Icon
                        icon="tilted-arrow"
                        iconHeight={40}
                        iconWidth={40}
                      />
                    </div>
                  </div>
                  {/* Back Side */}
                  <div className="flip-card-back bg-brand-sky-blue rounded-lg min-h-[350px] flex flex-col items-center justify-center p-5 absolute top-0 left-0 w-full h-full">
                    <NextImage
                      url={
                        partner.stationPartnerFieldsGroup.whiteLogo.node
                          .sourceUrl
                      }
                      width={1000}
                      height={1000}
                      otherClasses="w-[120px] h-auto object-contain object-center"
                    />
                    <HtmlBlock
                      content={partner?.content}
                      className="text-center [&>p]:!text-p2 [&>p]:!text-white mt-10"
                    />
                    <div className="bg-brand-denim-blue px-4 py-3 rounded-lg mt-10 text-p2 text-white text-center flex items-center justify-center gap-2 hover:bg-brand-denim-blue/90 hover:gap-4 transition-all duration-300">
                      {partner?.stationPartnerFieldsGroup?.link?.title}
                      <Icon
                        icon="arrow-right-white"
                        iconHeight={20}
                        iconWidth={20}
                      />
                    </div>
                  </div>
                </div>
              </NextLink>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TitleContentAndButtonWithStationPartnersList;
