"use client";
import { useState } from "react";
import clsx from "clsx";
import HtmlBlock from "@/components/HtmlBlock";
import CustomLink from "@/components/CustomLink";
import Icon from "@/components/Icon";

export const Calendar = (props) => {
  const {
    heading,
    description,
    headingBackgroundColor,
    showBackground,
    allSelectedEvents,
  } = props;

  const [openStates, setOpenStates] = useState(
    allSelectedEvents?.map(() => false)
  );

  const handleIconClick = (index) => {
    setOpenStates((prev) =>
      prev?.map((state, i) => (i === index ? !state : state))
    );
  };

  function formatDateParts(input) {
    if (!input) return null;

    const date = new Date(input);
    if (isNaN(date.getTime())) return null;

    const day = date.getDate();
    const month = date
      .toLocaleString("en-US", { month: "short" })
      .toLowerCase();
    const year = date.getFullYear();

    return { day, month, year };
  }

  return (
    <section
      data-testid="calendar"
      className={clsx(
        "w-full overflow-hidden",
        showBackground?.includes("1")
          ? "bg-brand-light-grey lg:py-[3.5rem] py-10"
          : "lg:mb-[3.5rem] mb-10"
      )}
    >
      <div
        className={clsx(
          "w-full h-auto",
          showBackground?.includes("1")
            ? "pb-[1.125rem] bg-transparent"
            : `bg-${headingBackgroundColor} pt-[1.125rem] pb-6`
        )}
      >
        {heading && (
          <h2
            className={clsx(
              "text-h2  font-normal uppercase text-center font-cubano",
              showBackground?.includes("1")
                ? "text-brand-denim-blue"
                : "text-white"
            )}
          >
            {heading}
          </h2>
        )}
      </div>
      <div
        className={clsx(
          " container flex flex-col items-center justify-center  w-full",
          showBackground?.includes("1")
            ? "gap-8 mt-0"
            : "gap-7 lg:gap-[3.0625rem]"
        )}
      >
        {description && (
          <div
            className={clsx(
              "w-full h-max rounded-[.625rem] text-center relative",
              showBackground?.includes("0")
                ? "p-5 lg:py-[2.875rem] lg:px-[3.75rem] bg-brand-light-grey "
                : "p-0 bg-transparent "
            )}
          >
            {showBackground?.includes("0") && (
              <>
                <div
                  className={`absolute top-[-0.0938rem] left-[-95vw] w-screen h-[50%] z-[-1] bg-${headingBackgroundColor} `}
                />
                <div
                  className={`absolute top-[-0.0938rem] left-[95%] w-screen h-[50%] z-[-1] bg-${headingBackgroundColor} `}
                />
              </>
            )}
            <HtmlBlock className={clsx("text-center ")} content={description} />
          </div>
        )}
        <div className="w-full flex flex-col items-center gap-6">
          {allSelectedEvents?.map(({ node }, index) => {
            const { id, slug, title, aboutEvents } = node || {};
            const { date, time, text, link } = aboutEvents || {};

            const arrangeDate = formatDateParts(date);

            return (
              <div
                key={id}
                className="w-full grid grid-cols-1 md:grid-cols-[25%_75%] lg:grid-cols-[18.432%_81.5%] rounded-2xl overflow-hidden"
              >
                <div className="bg-brand-sky-blue flex flex-col items-center justify-center px-[1.0938rem] py-3 rounded-tl-2xl md:rounded-bl-2xl">
                  <span className="text-h4 lg:text-h2 font-normal text-white font-cubano">
                    {arrangeDate?.day}
                  </span>
                  <span className="text-h4 lg:text-h2 font-normal text-white font-cubano uppercase mb-[.375rem]">
                    {arrangeDate?.month}
                  </span>
                  <span className="text-p1 font-bold text-white">
                    {arrangeDate?.year}
                  </span>
                </div>
                <div className="bg-white border-r [@media_(max-width:767px)]:border-l [@media_(max-width:767px)]:border-b [@media_(max-width:767px)]:border-t-0 border-y border-brand-grey w-full p-5 md:py-5 md:px-8 flex flex-col items-stretch [@media_(max-width:767px)]:rounded-bl-2xl md:rounded-tr-2xl rounded-br-2xl">
                  <button
                    onClick={() => handleIconClick(index)}
                    className="w-full flex flex-wrap items-center justify-between gap-3 mb-[1.5625rem]"
                  >
                    <p className="text-p1 text-brand-royal-blue font-bold font-openSans capitalize">
                      {title}
                    </p>
                    <Icon
                      icon="green-fill-right-arrow"
                      iconHeight={39}
                      iconWidth={39}
                      otherClasses={`transition-transform duration-300 ${
                        openStates[index] ? "rotate-90" : "rotate-0"
                      }`}
                    />
                  </button>
                  <div className="w-full h-[.25rem] bg-brand-mustard-yellow rounded-full mb-4"></div>
                  <div
                    className={`overflow-auto transition-all duration-300 ${
                      openStates[index] ? "max-h-[62.5rem]" : "max-h-0"
                    }`}
                  >
                    {text && (
                      <HtmlBlock
                        className="p-[1.5625rem] rounded-[.625rem] bg-brand-light-grey mb-4"
                        content={text}
                      />
                    )}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-p2 text-brand-dark-gray font-semibold font-openSans">
                      {time}
                    </p>
                    {link?.url && (
                      <CustomLink
                        anchor={{
                          url: link?.url,
                          target: link?.target || "_blank",
                          title: link?.title,
                        }}
                        variant={10}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
