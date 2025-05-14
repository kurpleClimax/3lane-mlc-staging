import React from "react";
import clsx from "clsx";
import NextImage from "../NextImage";
import NextLink from "../NextLink";
import Icon from "../Icon";
import { decode } from "he";

export const CustomLink = ({
  otherClasses,
  variant,
  anchor,
  onClick = () => {},
  buttonLogo,
  scroll,
  scrollID,
}) => {
  const { title, target, url } = anchor || {};

  if (!isNaN(variant)) variant = mapVariant(variant);

  let children;

  let cond =
    (variant != null && variant.constructor.name === "Object"
      ? variant?.name
      : variant) + "-button";

  switch (cond) {
    case "sky-blue-filled-arrow-right-button":
      children = (
        <>
          {decode(title)}
          <Icon icon="arrow-right-white" iconHeight={20} iconWidth={20} />
        </>
      );
      break;

    case "sky-blue-outline-arrow-right-button":
      children = (
        <>
          {decode(title)}
          <Icon icon="arrow-right-sky-blue" iconHeight={20} iconWidth={20} />
        </>
      );
      break;

    case "sky-blue-outline-youtube-icon-right-button":
      children = (
        <>
          {decode(title)}
          <Icon icon="youtube-sky-blue" iconHeight={20} iconWidth={20} />
        </>
      );
      break;

    case "lime-green-filled-arrow-right-button":
      children = (
        <>
          {decode(title)}
          <Icon icon="arrow-right-white" iconHeight={20} iconWidth={20} />
        </>
      );
      break;

    default:
      children = decode(title || "");
      break;
  }

  return (
    <NextLink
      href={scrollID ? `${url}/${scrollID}` : url}
      target={target}
      scroll={scroll}
      onClick={onClick}
      otherClasses={clsx(otherClasses, cond)}
    >
      {buttonLogo?.position === "before" && (
        <NextImage
          otherClasses="!max-w-[4.813rem] !max-h-[1.875rem]"
          {...buttonLogo}
        />
      )}
      {children}
      {buttonLogo?.position === "after" && (
        <NextImage
          otherClasses="!max-w-[4.813rem] !max-h-[1.875rem]"
          {...buttonLogo}
        />
      )}
    </NextLink>
  );
};

export default CustomLink;

export function mapVariant(variant) {
  const variants = {
    7: "mustard-yellow-filled",
    8: "mustard-yellow-outline",
    9: "sky-blue-filled",
    10: "sky-blue-filled-arrow-right",
    11: "sky-blue-outline-arrow-right",
    12: "sky-blue-outline-youtube-icon-right",
    13: "lime-green-filled-arrow-right",
  };

  return variants[variant];
}
