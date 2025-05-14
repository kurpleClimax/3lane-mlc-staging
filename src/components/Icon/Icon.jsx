import React from "react";

export const Icon = ({
  icon,
  iconColor,
  iconWidth = 26,
  iconHeight = 26,
  otherClasses,
  ...props
}) => {
  return (
    <svg
      className={otherClasses}
      data-testid='icon'
      style={{ stroke: iconColor }}
      width={`${iconWidth / 16}rem`}
      height={`${iconHeight / 16}rem`}
      aria-hidden='true'
      focusable='false'
      {...props}
    >
      <use href={`/sprite.svg#${icon}`} xlinkHref={`/sprite.svg#${icon}`} />
    </svg>
  );
};

export default Icon;
