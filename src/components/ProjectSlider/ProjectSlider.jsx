"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import clsx from "clsx";
import HtmlBlock from "@/components/HtmlBlock";
import CustomLink from "../CustomLink";
import Link from "next/link";

const ProjectSlider = ({ data }) => {
  const { news } = data;
  const [marginLeft, setMarginLeft] = useState(0);
  const [paddingLeft, setPaddingLeft] = useState(0);
  const containerRef = useRef();
  const mainSliderRef = useRef(null);
  const barRef = useRef(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const id = "project-slider";

  useEffect(() => {
    const mainSlider = mainSliderRef.current;
    const bar = barRef.current;
    const leftArrow = leftArrowRef.current;
    const rightArrow = rightArrowRef.current;

    if (!mainSlider || !bar) return;

    const updateDimensions = () => {
      const shouldShowArrows = mainSlider.scrollWidth > mainSlider.clientWidth;
      if (rightArrow)
        rightArrow.style.display = shouldShowArrows ? "flex" : "none";
      if (leftArrow)
        leftArrow.style.display = shouldShowArrows ? "flex" : "none";
      if (bar) bar.style.width = shouldShowArrows ? "0%" : "100%";
    };

    const getScreenWidth = () => {
      const cards = document.querySelectorAll(
        `#slider-${id} > div, #slider-${id} > a`
      );
      if (!cards.length) return 0;
      const cardWidth = cards[0].offsetWidth;
      const screenWidth = window.innerWidth;
      return screenWidth >= 449 ? cardWidth + 20 : cardWidth;
    };

    const updateProgressBar = () => {
      const totalWidth = mainSlider.scrollWidth - mainSlider.clientWidth;
      const currentScroll = mainSlider.scrollLeft;
      const progress = totalWidth > 0 ? (currentScroll / totalWidth) * 100 : 0;
      const shouldShowArrows = mainSlider.scrollWidth > mainSlider.clientWidth;
      if (bar)
        bar.style.width = shouldShowArrows
          ? `${Math.max(progress, 2)}%`
          : "100%";

      const isAtStart = currentScroll <= 0;
      const isAtEnd =
        currentScroll + mainSlider.clientWidth >= mainSlider.scrollWidth - 7;

      if (leftArrow) {
        leftArrow.style.opacity = isAtStart ? 0.5 : 1;
        leftArrow.style.cursor = isAtStart ? "not-allowed" : "pointer";
      }
      if (rightArrow) {
        rightArrow.style.opacity = isAtEnd ? 0.5 : 1;
        rightArrow.style.cursor = isAtEnd ? "not-allowed" : "pointer";
      }
    };

    const handleScroll = (scrollAmount) => {
      mainSlider.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      setTimeout(updateProgressBar, 300);
    };

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - mainSlider.offsetLeft);
      setScrollLeft(mainSlider.scrollLeft);
      mainSlider.style.cursor = "grabbing";
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      mainSlider.style.cursor = "grab";
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - mainSlider.offsetLeft;
      mainSlider.scrollLeft = scrollLeft - (x - startX) * 2;
    };

    const handleProgressBarClick = (e) => {
      const clickX = e.clientX - e.currentTarget.getBoundingClientRect().left;
      const scrollWidth = mainSlider.scrollWidth - mainSlider.clientWidth;
      mainSlider.scrollTo({
        left: (clickX / e.currentTarget.offsetWidth) * scrollWidth,
        behavior: "smooth",
      });
    };

    const handleLeftArrowClick = () => {
      if (leftArrow.style.pointerEvents !== "none") {
        handleScroll(-getScreenWidth());
      }
    };

    const handleRightArrowClick = () => {
      if (rightArrow.style.pointerEvents !== "none") {
        handleScroll(getScreenWidth());
      }
    };

    // Add event listeners
    const progressBar = document.getElementById(`progress-bar-${id}`);
    if (progressBar)
      progressBar.addEventListener("click", handleProgressBarClick);
    if (leftArrow) leftArrow.addEventListener("click", handleLeftArrowClick);
    if (rightArrow) rightArrow.addEventListener("click", handleRightArrowClick);
    mainSlider.addEventListener("scroll", updateProgressBar);
    mainSlider.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    // Initial setup
    updateDimensions();
    updateProgressBar();

    const debouncedResize = debounce(() => {
      updateDimensions();
      updateProgressBar();
    }, 100);

    window.addEventListener("resize", debouncedResize);

    // Cleanup
    return () => {
      if (progressBar)
        progressBar.removeEventListener("click", handleProgressBarClick);
      if (leftArrow)
        leftArrow.removeEventListener("click", handleLeftArrowClick);
      if (rightArrow)
        rightArrow.removeEventListener("click", handleRightArrowClick);
      mainSlider.removeEventListener("scroll", updateProgressBar);
      mainSlider.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", debouncedResize);
    };
  }, [id, isDragging, scrollLeft, startX]);

  // Debounce function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const updateMarginLeft = () => {
    if (containerRef.current) {
      const computedStyle = window.getComputedStyle(containerRef.current);
      const marginLeftValue = parseFloat(computedStyle.marginLeft);
      const paddingLeftValue = parseFloat(computedStyle.paddingLeft);
      setMarginLeft(marginLeftValue);
      setPaddingLeft(paddingLeftValue);
    }
  };

  useEffect(() => {
    updateMarginLeft();
    window.addEventListener("resize", updateMarginLeft);

    return () => {
      window.removeEventListener("resize", updateMarginLeft);
    };
  }, []);
  if (!news || news.length === 0) {
    return <div>No news available</div>;
  }

  return (
    <div
      className={`w-full flex flex-col items-start gap-5 lg:gap-10`}
      ref={containerRef}
    >
      <div className="w-full max-w-[62.8125rem] flex flex-col items-start gap-4 pr-5">
        <h2 className="text-h4 md:text-h2 tracking-[.0938rem] md:tracking-normal text-white text-stroke-brand-royal-blue font-cubano font-normal uppercase">
          Read, Write, ROAR! Upper Elementary
        </h2>
        <HtmlBlock
          className=""
          content="We’re expanding our <b>Read, Write, ROAR!</b> series for upper elementary students. All month long, we’ll roll out new lessons exploring Michigan history, ecology, and science—while helping students develop essential reading and writing skills. These lessons are research-based and aligned to Michigan state standards, making them a perfect fit for classrooms across the state."
        />
      </div>

      <div className="prev-next relative z-[9999] container">
        <button
          ref={leftArrowRef}
          id={`arrow-left-${id}`}
          className="bg-brand-mustard-yellow absolute top-[12rem] md:top-[15rem] left-[-1.4rem] md:left-[0.1rem] !z-[9999] flex h-[2.4375rem] w-[2.4375rem] flex-shrink-0 flex-col items-center justify-center rounded-full lg:left-[-1.1rem]"
        >
          <Image
            src="https://fogadmin.3lanemarketing.com/wp-content/uploads/2025/04/white-arrow.svg"
            alt="arrow"
            height={16}
            width={16}
            className="mr-[.1938rem] h-4 w-4 rotate-180"
          />
        </button>

        <button
          ref={rightArrowRef}
          id={`arrow-right-${id}`}
          className="bg-brand-mustard-yellow absolute  top-[12rem] md:top-[15rem] right-[0.5rem] !z-[9999] h-[2.4375rem] w-[2.4375rem] flex-shrink-0 flex-col items-center justify-center rounded-full lg:right-[2.6rem]"
        >
          <Image
            src="https://fogadmin.3lanemarketing.com/wp-content/uploads/2025/04/white-arrow.svg"
            alt="arrow"
            height={16}
            width={16}
            className="ml-[.1938rem] h-4 w-4"
          />
        </button>
      </div>
      <div
        className="overflow-x-hidden !pr-0 md:px-5 max-lg:!w-full sm:ml-5 sm:px-0 lg:ml-auto"
        style={{
          width: `calc(100% - ${marginLeft + paddingLeft}px)`,
        }}
      >
        <div
          className="project-slider-scroll-container grid w-full grid-flow-col gap-4 overflow-x-scroll overflow-y-auto scroll-smooth"
          id={`slider-${id}`}
          ref={mainSliderRef}
        >
          {news?.map(({ node }, index) => {
            const { id, slug, title, featuredImage } = node;

            return (
              <div
                className="rounded-[.625rem] bg-brand-grey-2 p-4 md:py-5 md:px-6 w-[14rem] sm:w-[17rem] md:w-[24rem] cursor-pointer h-[inherit] !flex flex-col justify-between gap-4"
                key={index}
              >
                <div
                  className={clsx(
                    !featuredImage?.node?.url &&
                      "bg-silver-light flex justify-center items-center",
                    "relative h-[12.125rem] w-full"
                  )}
                >
                  {featuredImage?.node?.url ? (
                    <Image
                      src={featuredImage?.node?.url}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                      alt="Featured Image"
                      priority
                    />
                  ) : (
                    <Image
                      src={`https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/05/White.svg`}
                      height={0}
                      width={0}
                      className="aspect-square h-[12.125rem] !w-full object-contain"
                      alt="Logo"
                      priority
                    />
                  )}
                </div>
                <div className={``}>
                  <h2
                    className={`text-p1 text-brand-royal-blue font-normal font-pbsKidsHeadline`}
                  >
                    {title}
                  </h2>
                </div>
                <div>
                  <CustomLink
                    variant={13}
                    anchor={{
                      title: "Learn more",
                      url: "#",
                      target: "_blank",
                    }}
                    otherClasses="capitalize w-max"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="container !pl-0 flex flex-wrap items-center gap-[1.0625rem] overflow-hidden md:flex-nowrap"
        ref={containerRef}
      >
        <Link
          href="/resources"
          className="w-fit flex-shrink-0 bg-brand-denim-blue hover:bg-brand-denim-blue/85 text-white  px-5 pt-[.5625rem] pb-3 text-p2 font-normal  capitalize flex items-center gap-3 rounded-lg transition-all duration-300  group font-openSans"
        >
          <span className="text-p3 text-brand-white font-libre-franklin font-normal">
            Browse All Projects
          </span>

          <Image
            src="https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/05/Vector.svg"
            alt="arrow"
            width={23}
            height={16}
            className="h-4 w-[1.4375rem] transition-all duration-500 group-hover:translate-x-2"
          />
        </Link>

        <div
          className="bg-brand-light-grey h-[.375rem] w-full cursor-pointer rounded-b-[.25rem]"
          id={`progress-bar-${id}`}
        >
          <div
            ref={barRef}
            className="bg-brand-sky-blue h-full rounded-[2.5rem]"
            id={`slide-bar-${id}`}
            style={{ width: "20px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectSlider;
