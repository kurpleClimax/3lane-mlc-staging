"use client";
import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import styles from "./NewsCards.module.scss";

const ITEMS_PER_PAGE = 6;

export default function NewsCards(props) {
  const { allNews, allNewsTypes } = props;

  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    searchTerm: "",
    selectedTypes: [],
  });
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const newsTypes = allNewsTypes || [];

  const filteredNews = useMemo(() => {
    const searchTerm = filters?.searchTerm?.toLowerCase() || "";

    return allNews?.filter(({ node }) => {
      const matchesSearch = node?.title?.toLowerCase()?.includes(searchTerm);
      const matchesTags = node?.newsTypes?.edges?.some(({ node }) =>
        node?.name?.toLowerCase()?.includes(searchTerm)
      );
      const blockSearch = node?.blocks?.some((block) => {
        const blockFields = [
          block?.attributes?.data?.heading,
          block?.attributes?.data?.title,
          block?.attributes?.data?.text,
          block?.attributes?.data?.tag,
          block?.attributes?.data?.description,
          block?.attributes?.data?.content,
          block?.attributes?.data?.list,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return blockFields?.includes(searchTerm);
      });

      const matchesTypes =
        filters.selectedTypes?.length === 0 ||
        filters.selectedTypes?.some((type) =>
          node?.newsTypes?.edges?.some(
            (item) => item?.node?.name?.toLowerCase() === type?.toLowerCase()
          )
        );

      const matchesSearchTerm =
        searchTerm === "" || matchesSearch || blockSearch || matchesTags;

      return matchesSearchTerm && matchesTypes;
    });
  }, [allNews, filters.searchTerm, filters.selectedTypes]);

  const visibleNews = useMemo(() => {
    return filteredNews?.slice(0, visibleCount);
  }, [filteredNews, visibleCount]);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [filters.searchTerm, filters.selectedTypes]);

  const handleSearch = (e) => {
    setFilters((prev) => ({
      ...prev,
      searchTerm: e.target.value,
    }));
  };

  const clearSearch = () => {
    setFilters((prev) => ({
      ...prev,
      searchTerm: "",
      selectedTypes: [],
    }));
  };

  const toggleTypeSelection = (type) => {
    setFilters((prev) => ({
      ...prev,
      selectedTypes: prev?.selectedTypes?.includes(type)
        ? prev?.selectedTypes?.filter((t) => t !== type)
        : [...prev?.selectedTypes, type],
    }));
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  function formatEventDate(startDateRaw, endDateRaw) {
    let formattedDate = "";

    const parseDate = (dateStr) => {
      const parsed = new Date(dateStr);
      return isNaN(parsed) ? null : parsed;
    };

    const formatMonthDay = (date) => {
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });
    };

    const startDate = parseDate(startDateRaw);
    const endDate = parseDate(endDateRaw);

    if (startDate && !endDate) {
      formattedDate = formatMonthDay(startDate);
    } else if (startDate && endDate) {
      const jan1 = startDate.getMonth() === 0 && startDate.getDate() === 1;
      const dec31 = endDate.getMonth() === 11 && endDate.getDate() === 31;

      if (jan1 && dec31) {
        formattedDate = `${startDate.getFullYear()} - ${endDate.getFullYear()}`;
      } else {
        formattedDate = `${formatMonthDay(startDate)} - ${formatMonthDay(
          endDate
        )}`;
      }
    }

    return formattedDate;
  }

  return (
    <section
      data-testid="news-cards"
      className="container mb-10 flex flex-col gap-4 lg:gap-[1.8125rem] lg:mb-[3.5rem] sm:flex-row"
    >
      {/* Filters Section */}
      <div className="h-[calc(auto-5rem)] w-full sm:max-w-[35%] lg:max-w-[21.5625rem]">
        {/* Search Input */}
        <div className="flex items-center justify-center gap-4 rounded-[.625rem] border border-brand-grey p-4">
          <input
            placeholder="Search by Keyword"
            className="w-full focus:outline-none placeholder:text-brand-black"
            value={filters.searchTerm}
            onChange={handleSearch}
          />
          <Image
            src="https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/04/Search.svg"
            alt="search-icon"
            className="h-[1.6875rem] w-[1.6875rem]"
            height={27}
            width={27}
          />
        </div>

        {/* Search Term Display */}
        {(filters.searchTerm || filters.selectedTypes?.length > 0) && (
          <>
            <div className="flex items-center flex-wrap gap-4 mt-[1.875rem] rounded-t-[.625rem] bg-brand-light-grey p-[2.0625rem]">
              {filters.searchTerm && (
                <div className="flex w-fit items-center justify-center gap-[.625rem] rounded-[.625rem] border border-[#0A145A] px-3 py-2">
                  <p className="text-[1rem] leading-6 font-normal text-brand-blue-dark capitalize">
                    {filters.searchTerm}
                  </p>
                  <Image
                    src="https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/04/Button_Close.svg"
                    alt="cross"
                    className="h-6 w-6 cursor-pointer"
                    height={24}
                    width={24}
                    onClick={() => {
                      setFilters((prev) => ({
                        ...prev,
                        searchTerm: "",
                      }));
                    }}
                  />
                </div>
              )}
              {filters.selectedTypes?.length > 0 &&
                filters.selectedTypes?.map((type) => (
                  <div
                    key={type}
                    className=" flex w-fit items-center justify-center gap-[.625rem] rounded-[.625rem] border border-[#0A145A] px-3 py-2"
                  >
                    <p className="text-[1rem] leading-6 font-normal text-brand-blue-dark capitalize">
                      {type}
                    </p>
                    <Image
                      src="https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/04/Button_Close.svg"
                      alt="cross"
                      className="h-6 w-6 cursor-pointer"
                      height={24}
                      width={24}
                      onClick={() => toggleTypeSelection(type)}
                    />
                  </div>
                ))}
            </div>
            <div className="rounded-b-[.625rem] border-t border-t-brand-grey bg-brand-light-grey px-5 py-[1.1875rem]">
              <p
                className="text-center text-[1rem] leading-6 font-semibold text-brand-denim-blue underline cursor-pointer"
                onClick={clearSearch}
              >
                Clear Search
              </p>
            </div>
          </>
        )}

        {/* Types Filter */}
        {newsTypes?.length > 0 && (
          <>
            <div
              onClick={() => setShowFilters(!showFilters)}
              className="mt-[1.875rem] flex cursor-pointer items-center gap-[.8125rem] border-b border-b-brand-grey pb-4"
            >
              <Image
                src="https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/04/arrow-down.svg"
                alt="arrow-down"
                className={`h-4 w-4 transform transition-transform duration-200 ease-in-out ${
                  showFilters ? "rotate-0" : "-rotate-90"
                }`}
                height={16}
                width={16}
              />
              <p className="text-p2 font-bold text-brand-dark-gray">Types</p>
            </div>
            <div
              className={clsx(
                showFilters ? "h-fit" : "h-0 overflow-hidden",
                "transition-all duration-300"
              )}
            >
              <div className="flex flex-col gap-[1.0625rem] pt-8 pb-[1.875rem] lg:pl-6">
                {newsTypes?.map((item, i) => (
                  <div key={item?.id} class="inline-flex items-center gap-3">
                    <label
                      class="flex items-center cursor-pointer relative"
                      for={item?.name}
                    >
                      <input
                        type="checkbox"
                        className={clsx(
                          styles.customCheckbox,
                          "h-[1.5625rem] w-[1.5625rem] border border-brand-mustard-yellow flex-shrink-0"
                        )}
                        id={item?.name}
                        checked={filters.selectedTypes.includes(
                          item?.name?.toLowerCase()
                        )}
                        onChange={() =>
                          toggleTypeSelection(item?.name?.toLowerCase())
                        }
                      />
                    </label>
                    <label
                      className="cursor-pointer text-p2 font-normal text-brand-black"
                      for={item?.name}
                    >
                      {item?.name}
                    </label>
                  </div>
                ))}
              </div>
              <div className="h-[.0625rem] w-[90%] bg-brand-grey"></div>
            </div>
          </>
        )}
      </div>

      {/* Vertical Divider */}
      <div className="flex w-[.0625rem] flex-col max-sm:hidden">
        <div className="h-[90%] w-[.0625rem] bg-brand-grey"></div>
        <div className="h-[10%]"></div>
      </div>

      {/* News Cards Section */}
      <div className="flex-1">
        <p className="mb-8 text-p3 font-normal text-brand-black">
          {visibleNews?.length || 0} Results
        </p>

        {visibleNews?.length > 0 ? (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full`}
          >
            {visibleNews?.map(({ node }) => {
              const { id, slug, title, aboutNews, newsTypes, featuredImage } =
                node;

              const type = newsTypes?.edges[0]?.node?.name;

              return (
                <Link
                  href={`/news/${slug}`}
                  target="_blank"
                  key={id}
                  className={`flex w-full flex-col rounded-[.625rem] bg-brand-grey-2 px-6 py-5 hover:scale-[1.02] transition-all duration-300`}
                >
                  <div className="relative mb-4 h-[15.19rem] flex-shrink-0 overflow-hidden">
                    <Image
                      src={
                        featuredImage?.node?.sourceUrl ||
                        "https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/04/placeholder-image.png"
                      }
                      alt={featuredImage?.node?.title || "news image"}
                      fill
                      className="object-contain z-20"
                    />
                    <Image
                      src={
                        featuredImage?.node?.sourceUrl ||
                        "https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/04/placeholder-image.png"
                      }
                      alt={featuredImage?.node?.title || "news image"}
                      fill
                      className="object-cover blur-md z-10"
                    />
                  </div>

                  <div className="flex h-full flex-col justify-between gap-3">
                    <h1 className="text-p1 font-pbsKidsHeadline font-normal text-brand-royal-blue">
                      {title}
                    </h1>

                    <div>
                      {type && (
                        <span className="mb-3 block w-fit rounded-[.25rem] bg-brand-pumpkin-orange px-2 py-[.125rem] text-[1rem] leading-6 font-normal text-white">
                          {type}
                        </span>
                      )}

                      <p className="text-[1.125rem] leading-[1.625rem] font-normal text-brand-black">
                        {formatEventDate(
                          aboutNews?.startDate,
                          aboutNews?.endDate
                        )}
                      </p>

                      <button className="mt-4 flex items-center justify-center gap-[.625rem] rounded-[.625rem] bg-brand-lime-green px-5 pt-[.5625rem] pb-[.75rem] group">
                        <span className="text-[1.125rem] leading-[1.625rem] font-normal text-white">
                          Learn More
                        </span>
                        <Image
                          src="https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/04/arrow-right.svg"
                          alt="arrow-right"
                          height={16}
                          width={16}
                          className="h-4 w-4 group-hover:ml-1 transition-all duration-300"
                        />
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="p-6 bg-brand-light-grey rounded-[.625rem] content-center text-center text-p2 font-normal text-brand-black">
            There are no results for that search, please try again.
          </p>
        )}

        {visibleCount < filteredNews?.length && (
          <button
            onClick={loadMore}
            className="mx-auto mt-10 flex items-center justify-center gap-[.625rem] rounded-[.625rem] border-[.125rem] border-brand-sky-blue px-5 pt-[.5625rem] pb-3"
          >
            <span className="text-[1.25rem] leading-7 font-normal text-brand-sky-blue">
              Load More
            </span>
            <Image
              src="https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/04/blue-arrow.svg"
              alt="blue-arrow-right"
              height={16}
              width={16}
              className="h-4 w-4"
            />
          </button>
        )}
      </div>
    </section>
  );
}
