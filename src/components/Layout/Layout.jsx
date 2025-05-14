import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Footer/Footer";
import Seo from "./Seo";
import Header from "@/components/Header/Header";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";

export const Layout = (props) => {
  const {
    children,
    seo,
    siteSettings,
    previousPost,
    nextPost,
    isPopUp,
    onClose,
  } = props;
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();
  const uri =
    router.asPath?.slice(-1) === "/" ? router.asPath : router.pathname + "/";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // You can adjust this
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div>
      <Header data={siteSettings?.header} isPopUp={isPopUp} onClose={onClose} />

      <Seo seo={seo} uri={uri} />
      <main>{children}</main>

      <div
        className={clsx(
          previousPost || nextPost
            ? "w-full bg-brand-sky-blue py-6 px-5 lg:px-10"
            : "w-fit h-auto"
        )}
      >
        <div
          ref={sectionRef}
          className={clsx(
            "container grid grid-cols-1 sm:grid-cols-2 gap-[4rem] sm:gap-[7.25rem] relative",
            !previousPost || !nextPost ? "!px-0" : ""
          )}
        >
          {previousPost && (
            <Link
              href={previousPost?.slug}
              className="w-full flex items-center justify-between gap-3"
            >
              <div>
                <p className="text-p2 font-openSans text-white">Previous</p>
                <div className="w-[4.6606rem] h-[.0938rem] bg-brand-mustard-yellow mt-3 mb-2" />
                <p className="text-p2 font-pbsKidsHeadline font-normal text-white">
                  {previousPost?.title}
                </p>
              </div>
              <Image
                src="https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/05/ne-pre.svg"
                alt="Previous"
                width={24}
                height={60}
                className="w-6 h-[3.75rem]"
              />
            </Link>
          )}

          {isPopUp && (
            <button
              onClick={() => onClose()}
              className={` ${
                isVisible
                  ? previousPost || nextPost
                    ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
                    : "fixed bottom-20 ease-in left-1/2 -translate-x-1/2 opacity-70 hover:opacity-100"
                  : "fixed bottom-20 ease-in left-1/2 -translate-x-1/2 opacity-70 hover:opacity-100"
              } transition-all duration-300 z-50`}
            >
              <Image
                src={
                  isVisible
                    ? previousPost || nextPost
                      ? "https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/05/Close-Button-white.svg"
                      : "/images/Button_-Close.svg"
                    : "/images/Button_-Close.svg"
                }
                alt="Close"
                width={42}
                height={42}
                className="w-[2.625rem] h-[2.625rem]"
              />
            </button>
          )}

          {nextPost && (
            <Link
              href={nextPost?.slug}
              className="w-full flex items-center justify-between gap-3 sm:col-start-2"
            >
              <Image
                src="https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/05/ne-pre.svg"
                alt="Next"
                width={24}
                height={60}
                className="w-6 h-[3.75rem] rotate-180"
              />
              <div className="flex flex-col items-end">
                <p className="text-p2 font-openSans text-white">Next</p>
                <div className="w-[4.6606rem] h-[.0938rem] bg-brand-mustard-yellow mt-3 mb-2" />
                <p className="text-p2 font-pbsKidsHeadline font-normal text-white text-right">
                  {nextPost?.title}
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>

      <Footer data={siteSettings?.footer} />
    </div>
  );
};

export default Layout;
