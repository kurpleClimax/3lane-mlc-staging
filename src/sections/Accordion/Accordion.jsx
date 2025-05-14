"use client";
import { useState } from "react";
import NextImage from "@/components/NextImage";
import HtmlBlock from "@/components/HtmlBlock";
import Icon from "@/components/Icon";

import style from "./Accordion.module.scss";

export const Accordion = (props) => {
  const { accordion } = props;

  const [openStates, setOpenStates] = useState(Array(accordion).fill(false));

  const handleIconClick = (index) => {
    setOpenStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };

  const data = () => {
    let newArr = [];

    for (let i = 0; i < accordion; i++) {
      const title = props[`accordion${i}Title`];
      const text = props[`accordion${i}Text`];

      newArr.push({ title, text });
    }
    return newArr;
  };

  const accordionData = data();

  return (
    <section
      data-testid="accordion"
      className="container mb-[2.5rem] lg:mb-[3.5rem] flex flex-col gap-5 lg:gap-8 items-center justify-between my-5 lg:my-10"
    >
      {accordionData?.map((accordionsData, index) => {
        return (
          <div key={index} className="w-full">
            <div
              className={`w-full flex flex-col items-center justify-between gap-4 md:gap-6 px-5 pb-5 lg:pb-8 lg:px-9 ${
                openStates[index] ? "bg-brand-light-grey rounded-3xl pt-5" : ""
              }`}
            >
              <button
                onClick={() => handleIconClick(index)}
                className="w-full flex items-center justify-between gap-3"
              >
                {accordionsData?.title && (
                  <p className="text-p1 text-start text-brand-royal-blue font-bold font-openSans capitalize">
                    {accordionsData?.title}
                  </p>
                )}
                <Icon
                  icon="green-fill-right-arrow"
                  iconHeight={39}
                  iconWidth={39}
                  otherClasses={`transition-transform duration-300 ${
                    openStates[index] ? "rotate-90" : "rotate-0"
                  }`}
                />
              </button>
              <div
                className={`flex flex-col items-center justify-between gap-4 md:gap-6 w-full h-full overflow-auto transition-all duration-300 ease-in-out ${
                  openStates[index] ? "max-h-[62.5rem]" : "hidden"
                }`}
              >
                {openStates[index] && (
                  <div className="w-full h-[.25rem] bg-brand-mustard-yellow rounded-full"></div>
                )}
                {accordionsData?.text && openStates[index] && (
                  <HtmlBlock
                    className={`ml-4 md:ml-10 ${style.listStyling}`}
                    content={accordionsData?.text}
                  />
                )}
              </div>
            </div>
            {!openStates[index] && (
              <div className="w-full h-[.25rem] bg-brand-mustard-yellow rounded-full"></div>
            )}
          </div>
        );
      })}
    </section>
  );
};
