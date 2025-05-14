"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export default function NewsHeroBanner(props) {
  const { title, heading, image, newsTypes } = props;
  const logo = true;

  return (
    <section
      className={`w-full relative overflow-hidden mb-10 lg:mb-[3.5rem]`}
      data-testid="news-hero-banner"
    >
      <div
        className={clsx(
          "bg-brand-sky-blue relative",
          "after:absolute after:top-0 after:right-0 after:w-[7rem] after:h-full after:z-[1] after:bg-brand-mustard-yellow"
        )}
      >
        <div
          className={clsx(
            "container pt-[3.625rem] relative",
            logo
              ? "min-h-[20.75rem] pb-[20rem] xsm:pb-[13rem] sm:pb-[20rem] md:pb-8"
              : "min-h-auto pb-8"
          )}
        >
          <div
            className={clsx(
              "flex items-center justify-between gap-6 relative z-[2] mb-4"
            )}
          >
            {title && (
              <span className=" pt-[.125rem] pb-[.3125rem] px-2 text-white text-p2 font-semibold rounded-[.25rem] bg-brand-pumpkin-orange capitalize">
                {title}
              </span>
            )}
          </div>
          <div className="w-[79%] md:w-full flex items-start justify-between flex-col sm:flex-row gap-8 relative z-[2]">
            {heading && (
              <h2 className=" text-h2 md:text-[5rem] md:leading-[5.5rem] text-white font-normal font-cubano break-words">
                {heading}
              </h2>
            )}{" "}
            <div
              className={clsx(
                "relative flex-shrink-0 w-[20rem] hidden md:block h-[0.01rem]"
              )}
            ></div>
          </div>
        </div>
        <div className="absolute top-[1.5625rem] right-[4.5rem] z-[2]">
          <Link
            href="/news"
            className="w-max h-fit px-5 pt-[.5625rem] pb-3 rounded-[.625rem] bg-brand-lime-green  text-white text-p2 capitalize block "
          >
            browse All News
          </Link>
        </div>
        {logo && (
          <div className="absolute right-0 bottom-0 xsm:bottom-[-7.3rem] ">
            <div className="relative h-72 w-72 sm:h-[22.1875rem] sm:w-[22.1875rem] max-md:mx-auto flex-shrink-0">
              {image?.url && (
                <div className="absolute h-full w-full bg-white  border-brand-green border-[1rem] rounded-full lg:-right-[1.0625rem] bottom-0 z-20">
                  <Image
                    src={image?.url}
                    alt={image?.title || "News Hero Banner"}
                    className="border-[1rem] lg:border-[2rem] border-brand-lime-green object-contain object-center rounded-full"
                    fill
                  />
                </div>
              )}

              <div className="h-24 w-24 sm:h-[8.9375rem] z-10 sm:w-[8.9375rem] bg-brand-pink rounded-full absolute -right-8 top-0"></div>
            </div>
          </div>
        )}
      </div>

      <div className="min-h-[4.1rem] bg-brand-royal-blue py-5">
        <div className="container">
          {newsTypes && (
            <span className="rounded-[.25rem] py-[.125rem] px-2 border border-white text-white text-p4 font-normal capitalize">
              {newsTypes}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
