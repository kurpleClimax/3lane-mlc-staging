import React, { useState } from "react";
import clsx from "clsx";
import { FaCheckCircle } from "react-icons/fa";
import Icon from "@/components/Icon";
import styles from "./Accessibility.module.css";
import Image from "next/image";

export const Accessibility = ({
  accessibilitySettings,
  setAccessibilitySettings,
  otherClasses,
}) => {
  const accessibilityClasses = clsx(
    otherClasses,
    "max-w-[23.5rem] xsm:max-w-[27.1875rem] max-h-[35.75rem] z-50 fixed left-8 left-[0.5rem] xsm:left-[3.5rem] bottom-[88px] xsm:bottom-[67px] p-4 xsm:p-[1.3125rem] bg-brand-white border border-[#D6D6D6] shadow-[0px_6px_6px_0px_rgba(0,0,0,0.05)]"
  );

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const settingsAreDefault = Object.values(accessibilitySettings).every(
    (settings) => !settings
  );

  return (
    <>
      <div
        className="fixed left-3 bottom-3 z-50 inline-block !bg-none cursor-pointer"
        aria-label="Accessibility"
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      >
        <Image
          src="https://sgavpbcms.3lanemarketing.com/wp-content/uploads/2024/10/accessibility.svg"
          alt="Accessibility"
          width={51}
          height={51}
          className="w-[3.188rem] h-[3.188rem]"
        />
      </div>
      {menuIsOpen && (
        <div className={accessibilityClasses} data-testid="accessibility">
          <div className={styles.form}>
            <div className="flex justify-between items-center pb-5 pl-[.875rem]">
              <h3 className="font-Lato py-1 text-base sm:text-xl font-bold">
                Accessibility Tools
              </h3>
              <div className="flex justify-center items-center gap-3">
                <div
                  className={`${
                    accessibilitySettings?.textSize === 2 ? "px-2" : "px-6"
                  } py-3 font-Lato flex items-center cursor-pointer border border-brand-blue-light rounded-md !bg-brand-transparent text-xs 2xl:text-base text-brand-blue-light font-bold  ${
                    settingsAreDefault ? "hidden" : ""
                  }`}
                  onClick={() =>
                    setAccessibilitySettings({
                      colorContrast: false,
                      highlightLinks: false,
                      textSize: 0,
                      letterSpacing: 0,
                      pauseAnimations: false,
                      cursorSize: 0,
                    })
                  }
                >
                  <Image
                    src="/images/clear-all-cross.svg"
                    alt="clear all icon"
                    className="inline-block mr-1"
                    width={18}
                    height={18}
                  />
                  <span>Clear All</span>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => setMenuIsOpen(false)}
                >
                  <Image
                    src="/images/Button_Close.svg"
                    alt="close accessibility"
                    className="inline-block mr-1 w-8 xsm:w-auto h-8 xsm:h-auto"
                    width={46}
                    height={46}
                  />
                </div>
              </div>
            </div>
            <div className="h-[2px] bg-brand-green mb-[1.9375rem] mt-0" />
            <div
              className={`h-[18rem] sm:h-[20rem] grid grid-cols-2 sm:pl-[.875rem] px-3 xsm:pr-[2.375rem] mr-0 xsm:mr-[.875rem] gap-3 overflow-y-scroll  ${styles.CustomScrollbar} `}
            >
              <button
                className={` min-h-[8.25rem] p-3 2xl:p-[.875rem] bg-brand-gray-secondary text-center text-brand-black relative flex flex-col items-center`}
                type="button"
                onClick={() =>
                  setAccessibilitySettings((prevSettings) => ({
                    ...prevSettings,
                    colorContrast: !prevSettings.colorContrast,
                  }))
                }
              >
                <div className={styles.colorContrast}>
                  <Icon
                    icon="accessibility-icon-contrast"
                    iconWidth={28}
                    iconHeight={28}
                    otherClasses=""
                  />
                </div>
                <div className={styles.label}>COLOR CONTRAST</div>

                <FaCheckCircle
                  className={clsx(
                    !accessibilitySettings.colorContrast ? "opacity-0" : "",
                    "absolute right-1 bottom-1"
                  )}
                  color="#231F20"
                  size="1.375rem"
                />
              </button>
              <button
                className={`relative min-h-[8.25rem] p-3 2xl:p-[.875rem]  bg-brand-gray-secondary text-center text-brand-black`}
                type="button"
                style={{ borderColor: "#0082C8" }}
                onClick={() =>
                  setAccessibilitySettings((prevSettings) => ({
                    ...prevSettings,
                    highlightLinks: !prevSettings.highlightLinks,
                  }))
                }
              >
                <div className={styles.highlightLinks}>
                  <Icon
                    icon="accessibility-icon-highlightlinks"
                    iconWidth={28}
                    iconHeight={28}
                    otherClasses=""
                  />
                </div>
                <div className={styles.label}>HIGHLIGHT LINKS</div>
                <div className="flex justify-end">
                  <FaCheckCircle
                    className={clsx(
                      !accessibilitySettings.highlightLinks ? "opacity-0" : "",
                      "absolute right-1 bottom-1"
                    )}
                    color="#231F20"
                    size="1.375rem"
                  />
                </div>
              </button>
              <button
                className={`relative min-h-[8.25rem] p-3 2xl:p-[.875rem]  bg-brand-gray-secondary text-center text-brand-black`}
                type="button"
                onClick={() =>
                  setAccessibilitySettings((prevSettings) => ({
                    ...prevSettings,
                    textSize:
                      prevSettings.textSize < 2 ? prevSettings.textSize + 1 : 0,
                  }))
                }
              >
                <div className={styles.textSize}>
                  <Icon
                    icon="accessibility-icon-biggertext"
                    iconWidth={28}
                    iconHeight={28}
                    otherClasses=""
                  />
                </div>
                <div className={styles.label}>
                  TEXT <br /> SIZE
                </div>

                {/* <div className="h-2 flex-1 mr-2 2xl:mr-4 bg-brand-gray-600">
                <div
                  className="h-2 bg-brand-gray-600"
                  style={{ width: `${accessibilitySettings.textSize * 50}%` }}
                />
              </div> */}
                <FaCheckCircle
                  color="#231F20"
                  size="1.375rem"
                  className={clsx(
                    accessibilitySettings.textSize === 0 ? " opacity-0" : "",
                    "absolute right-1 bottom-1"
                  )}
                />
              </button>
              <button
                className={`relative min-h-[8.25rem] p-3 2xl:p-[.875rem]  bg-brand-gray-secondary text-center text-brand-black`}
                type="button"
                onClick={() =>
                  setAccessibilitySettings((prevSettings) => ({
                    ...prevSettings,
                    letterSpacing:
                      prevSettings.letterSpacing < 2
                        ? prevSettings.letterSpacing + 1
                        : 0,
                  }))
                }
              >
                <div className={styles.letterSpacing}>
                  <Icon
                    icon="accessibility-icon-letterspacing"
                    iconWidth={28}
                    iconHeight={28}
                    otherClasses=""
                  />
                </div>
                <div className={styles.label}>LETTER SPACING</div>

                {/* <div className="h-2 flex-1 mr-2 2xl:mr-4 bg-brand-gray-600">
                <div
                  className="h-2 bg-brand-gray-600"
                  style={{
                    width: `${accessibilitySettings.letterSpacing * 50}%`,
                  }}
                />
              </div> */}
                <FaCheckCircle
                  color="#231F20"
                  size="1.375rem"
                  className={clsx(
                    accessibilitySettings.letterSpacing === 0
                      ? " opacity-0"
                      : "",
                    "absolute right-1 bottom-1"
                  )}
                />
              </button>
              <button
                className={`relative min-h-[8.25rem] p-3 2xl:p-[.875rem]  bg-brand-gray-secondary text-center text-brand-black`}
                onClick={() =>
                  setAccessibilitySettings((prevSettings) => ({
                    ...prevSettings,
                    pauseAnimations: !prevSettings.pauseAnimations,
                  }))
                }
              >
                <div className={styles.pauseAnimations}>
                  <Icon
                    icon="accessibility-icon-pauseanimations"
                    iconWidth={28}
                    iconHeight={28}
                    otherClasses=""
                  />
                </div>
                <div className={styles.label}>PAUSE ANIMATIONS</div>
                <div className="flex justify-end">
                  <FaCheckCircle
                    className={clsx(
                      !accessibilitySettings.pauseAnimations ? "opacity-0" : "",
                      "absolute right-1 bottom-1"
                    )}
                    color="#231F20"
                    size="1.375rem"
                  />
                </div>
              </button>
              <button
                className={`relative min-h-[8.25rem] p-3 2xl:p-[.875rem]  bg-brand-gray-secondary text-center text-brand-black`}
                type="button"
                onClick={() =>
                  setAccessibilitySettings((prevSettings) => ({
                    ...prevSettings,
                    cursorSize:
                      prevSettings.cursorSize < 2
                        ? prevSettings.cursorSize + 1
                        : 0,
                  }))
                }
              >
                <div className={styles.cursorSize}>
                  <Icon
                    icon="accessibility-icon-cursor"
                    iconWidth={28}
                    iconHeight={28}
                    otherClasses=""
                  />
                </div>
                <div className={styles.label}>
                  CURSOR <br /> SIZE
                </div>

                {/* <div className="h-2 flex-1 mr-2 2xl:mr-4 bg-brand-gray-600">
                <div
                  className="h-2 bg-brand-gray-600"
                  style={{
                    width: `${accessibilitySettings.cursorSize * 50}%`,
                  }}
                />
              </div> */}
                <FaCheckCircle
                  color="#231F20"
                  size="1.375rem"
                  className={clsx(
                    accessibilitySettings.cursorSize === 0 ? " opacity-0" : "",
                    "absolute right-1 bottom-1"
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Accessibility;