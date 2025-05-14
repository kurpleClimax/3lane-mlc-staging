import Heading from "@/components/Heading";
import HtmlBlock from "@/components/HtmlBlock";
import NextImage from "@/components/NextImage";
import React from "react";
import styles from "./HistoryDetailList.module.scss";
import clsx from "clsx";

const HistoryDetailList = (props) => {
  const { historyList } = props;
  const list = Array(historyList)
    .fill(null)
    .map((_, i) => {
      return {
        data: props[`historyList${i}Date`],
        content: props[`historyList${i}Content`],
        image: props[`historyList${i}Image`],
      };
    });

  const getColorsForIndex = (index) => {
    // For items divisible by 4 (4,8,12...)
    if ((index + 1) % 4 === 0) {
      return {
        bg: "brand-sky-blue",
        border: "brand-mustard-yellow",
      };
    }

    // For other even numbers (2,6,10...)
    const evenIndex = index + 1;
    if (evenIndex % 4 === 2) {
      // For 2, 10, 18...
      return {
        bg: "brand-pumpkin-orange",
      };
    } else {
      // For 6, 14, 22...
      return {
        bg: "brand-green",
      };
    }
  };

  const renderHistoryItem = (item, index) => {
    const isEven = index % 2 === 0;
    const isDivisibleBy4 = (index + 1) % 4 === 0;
    const colors = getColorsForIndex(index);

    if (isEven) {
      return (
        <div key={index} className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-10">
            <div className="lg:w-[30%]">
              <Heading
                type="h3"
                otherClasses="text-center text-h2 font-cubano text-brand-dark-gray"
              >
                {item.data}
              </Heading>
            </div>
            <div className="lg:w-[70%] min-h-[300px] flex lg:flex-row flex-col items-center justify-center gap-5 lg:gap-10 border-l border-l-brand-sky-blue p-10">
              <div className="w-[50%]">
                <NextImage
                  {...item?.image}
                  otherClasses="w-full h-[250px] object-cover object-center"
                />
              </div>
              <div className="lg:w-[50%]">
                <HtmlBlock
                  content={item?.content}
                  className={(clsx(), styles.htmlBlock)}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div key={index} className="container relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-10">
            <div className="lg:w-[30%]">
              <Heading
                type="h3"
                otherClasses="text-center text-h2 font-cubano text-brand-dark-gray w-full"
              >
                {item.data}
              </Heading>
            </div>
            <div className="lg:w-[70%] min-h-[300px] flex lg:flex-row flex-col-reverse items-center justify-between gap-5 bg-brand-light-grey lg:pl-10 relative p-5 lg:p-0">
              <div className="w-8 h-8 rounded-full bg-white border-4 border-brand-sky-blue absolute -top-3 -left-3" />
              {index !== list.length - 1 && (
                <div className="w-8 h-8 rounded-full bg-white border-4 border-brand-sky-blue absolute -bottom-3 -left-3" />
              )}
              <div className="lg:w-[50%]">
                <HtmlBlock
                  content={item?.content}
                  className={(clsx(), styles.htmlBlock)}
                />
              </div>
              <div className="lg:w-[50%] lg:hidden block">
                <NextImage
                  {...item?.image}
                  otherClasses="w-[100%] h-[250px] object-cover object-center"
                />
              </div>
              <div className="hidden lg:block lg:w-[50%] min-h-[300px] overflow-hidden relative">
                <div
                  className={`w-[500px] h-[500px] rounded-full bg-${colors.bg} absolute -top-[90px] left-[10px] lg:block hidden`}
                />
                {isDivisibleBy4 ? (
                  // Layout for numbers divisible by 4 (4,8,12)
                  <>
                    <div
                      className={`absolute w-[460px] h-[460px] rounded-full -top-20 left-[50px] bg-${colors.border} lg:block hidden`}
                    />
                    <NextImage
                      {...item?.image}
                      otherClasses="object-cover object-center absolute w-[400px] h-[400px] rounded-full -top-11 left-[80px] lg:block hidden"
                    />
                  </>
                ) : (
                  // Layout for other even numbers (2,6,10)
                  <NextImage
                    {...item?.image}
                    otherClasses={`w-[350px] h-[350px] rounded-full object-cover object-center absolute top-[50px] -right-[50px] border-[30px] border-brand-lime-green lg:block hidden`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <section data-testid="history-detail-list" className="my-5 lg:my-10">
      <div className="flex flex-col items-start gap-5 lg:gap-10">
        {list.map((item, i) => renderHistoryItem(item, i))}
      </div>
    </section>
  );
};

export default HistoryDetailList;
