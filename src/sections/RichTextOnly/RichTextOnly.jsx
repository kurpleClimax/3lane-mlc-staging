import React from "react";
import clsx from "clsx";
import { stripNewlinesFromBr } from "@/utils/miscellaneous";
import styles from "./RichTextOnly.module.scss";

export const RichTextOnly = ({ otherClasses, content }) => {
  const richTextOnlyClasses = clsx(otherClasses);

  return (
    <section
      className={`${richTextOnlyClasses} max-w-screen-xxl mx-auto lg:px-[120px] px-[28px] my-9 lg:my-16`}
      data-testid="rich-text-only"
    >
      <div
        dangerouslySetInnerHTML={{
          __html: stripNewlinesFromBr(content),
        }}
        className={`whitespace-break-spaces ${styles.listStyles}`}
      ></div>
    </section>
  );
};

export default RichTextOnly;
