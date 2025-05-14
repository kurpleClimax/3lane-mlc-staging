"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./Tabs.module.scss";

const Tabs = ({ tabsData, otherClasses }) => {
  const [activeTab, setActiveTab] = useState("News K-12 Series");
  const [isMobile, setIsMobile] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTabButtonClick = (tab) => {
    setActiveTab(tab);
  };

  const handleDropdownToggle = () => {
    setIsSelectOpen((prev) => !prev);
  };

  const handleOptionClick = (tab) => {
    setActiveTab(tab);
    setIsSelectOpen(false);
  };

  return (
    <div className={`w-full flex flex-col ${otherClasses}`}>
      {isMobile ? (
        <div className="w-full z-10" ref={dropdownRef}>
          <div
            className={styles["tabs-dropdown"]}
            onClick={handleDropdownToggle}
            data-select-open={isSelectOpen}
          >
            {activeTab}
          </div>
          {isSelectOpen && (
            <div className={styles["tabs-dropdown-options"]}>
              {tabsData?.map((data, index) => (
                <div
                  key={index}
                  className={`${styles["tabs-dropdown-option"]} ${
                    activeTab === data ? styles["selected"] : ""
                  }`}
                  onClick={() => handleOptionClick(data)}
                >
                  {data}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full overflow-x-auto scrollbar-hide z-10">
          <div className="flex items-center gap-[1.5625rem] justify-start min-w-max">
            {tabsData?.map((data, index) => (
              <button
                key={index}
                className={`text-p2 text-brand-black transition-colors duration-200 whitespace-nowrap ${
                  activeTab === data
                    ? "border-b-[.4375rem] border-brand-mustard-yellow font-semibold pb-[1rem]"
                    : "font-normal pb-[1.3125rem]"
                }`}
                onClick={() => handleTabButtonClick(data)}
              >
                {data}
              </button>
            ))}
          </div>
        </div>
      )}
      <span className="w-full h-[.0625rem] bg-brand-grey mt-[-.25rem] hidden md:block" />
    </div>
  );
};

export default Tabs;
