import { convertToCamelCase } from "@/utils/miscellaneous";
import { usePathname } from "next/navigation";
import { nonBreadRoutes } from "@/utils/miscellaneous";
import RichText from "@/sections/RichTextOnly/RichTextOnly";
import { Paragraph } from "@/components/Paragraph";
import { TitleAndTextWithRightImage } from "@/sections/TitleAndTextWithRightImage/TitleAndTextWithRightImage";
import { Calendar } from "@/sections/Calendar/Calendar";
import NewsCards from "@/sections/NewsCards/NewsCards";
import CTAContactUs from "@/sections/CTAContactUs/CTAContactUs";
import CTAJoinUs from "@/sections/CTAJoinUs/CTAJoinUs";
import CTARegisterNow from "@/sections/CTARegisterNow/CTARegisterNow";
import HeroBanner from "@/sections/HeroBanner/HeroBanner";
import ContentWithRightImage from "@/sections/ContentWithRightImage/ContentWithRightImage";
import HeadingWithMultipleCTA from "@/sections/HeadingWithMultipleCTA/HeadingWithMultipleCTA";
import { Accordion } from "@/sections/Accordion/Accordion";
import FeaturedVideo from "@/sections/FeaturedVideo/FeaturedVideo";
import NewsHeroBanner from "@/sections/NewsHeroBanner/NewsHeroBanner";
import Breadcrumbs from "../Breadcrums";
import TwoColsImageWithTitleAndContent from "@/sections/TwoColsImageWithTitleAndContent";
import TitleContentWithTopRoundedImageCardsList from "@/sections/TitleContentWithTopRoundedImageCardsList";
import TitleWithPartnersListAndContent from "@/sections/TitleWithPartnersListAndContent";
import HeadingSubtextWithTwoColsCards from "@/sections/HeadingSubtextWithTwoColsCards";
import HeadingAndSubtext from "@/sections/HeadingAndSubtext";
import BgImageWithDetailCardslist from "@/sections/BgImageWithDetailCardslist";
import TextWithBgColorSkyBlue from "@/sections/TextWithBgColorSkyBlue";
import HistoryDetailList from "@/sections/HistoryDetailList";
import SubTitleAndHeadingWithContentButtonAndImage from "@/sections/SubTitleAndHeadingWithContentButtonAndImage";
import TitleContentAndButtonWithStationPartnersList from "@/sections/TitleContentAndButtonWithStationPartnersList";

const blockComponents = {
  "core/paragraph": Paragraph,
  "acf/richtextonly": RichText,
  "acf/sectiontitleandtextwithrightimage": TitleAndTextWithRightImage,
  "acf/sectionnewscards": NewsCards,
  "acf/ctacontactus": CTAContactUs,
  "acf/ctajoinus": CTAJoinUs,
  "acf/ctaregisternow": CTARegisterNow,
  "acf/sectionherobanner": HeroBanner,
  "acf/sectioncalendar": Calendar,
  "acf/ctacontentwithrightimage": ContentWithRightImage,
  "acf/sectionheadingwithmultiplecta": HeadingWithMultipleCTA,
  "acf/sectionaccordion": Accordion,
  "acf/sectionfeaturedvideo": FeaturedVideo,
  "acf/sectionnewsherobanner": NewsHeroBanner,
  "acf/twocolsimagewithtitleandcontent": TwoColsImageWithTitleAndContent,
  "acf/titlecontentwithtoproundedimagecardslist":
    TitleContentWithTopRoundedImageCardsList,
  "acf/titlewithpartnerslistandcontent": TitleWithPartnersListAndContent,
  "acf/headingsubtextwithtwocolscards": HeadingSubtextWithTwoColsCards,
  "acf/headingandsubtext": HeadingAndSubtext,
  "acf/bgimagewithdetailcardslist": BgImageWithDetailCardslist,
  "acf/textwithbgcolorskyblue": TextWithBgColorSkyBlue,
  "acf/historydetaillist": HistoryDetailList,
  "acf/subtitleandheadingwithcontentbuttonandimage":
    SubTitleAndHeadingWithContentButtonAndImage,
  "acf/titlecontentandbuttonwithstationpartnerslist":
    TitleContentAndButtonWithStationPartnersList,
};

export const BlockRenderer = (props) => {
  const { blocks = [], bread } = props;
  const pathname = usePathname()?.replace(/\/$/, "");

  return (
    <div className="flex flex-col">
      {blocks.map((block, index) => {
        const data = convertToCamelCase(block.attributes.data);
        const BlockComponent = blockComponents[block.name];

        const nextBlock = blocks[index + 1];

        if (block.name === "core/block" && block.innerBlocks?.length) {
          return <BlockRenderer key={block?.id} blocks={block.innerBlocks} />;
        }

        return (
          <div key={block?.id}>
            {BlockComponent ? <BlockComponent block={block} {...data} /> : null}

            {index === 0 &&
              bread &&
              !nonBreadRoutes.includes(pathname) &&
              pathname !== "/contact-us" && (
                <div
                  className={`w-full py-0 bg-white border-b border-b-brand-grey mb-5`}
                >
                  <div className="container">
                    <Breadcrumbs
                      breadcrumbsData={bread}
                      hideBorder={
                        nextBlock && nextBlock.name === "acf/navigationtab"
                      }
                    />
                  </div>
                </div>
              )}
          </div>
        );
      })}
    </div>
  );
};
