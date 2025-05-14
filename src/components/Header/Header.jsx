import React from "react";
import clsx from "clsx";
import NextLink from "../NextLink";
import NextImage from "../NextImage";
import Icon from "../Icon";

export const Header = ({ data, isPopUp, onClose }) => {
  const menu = data?.menu;
  return (
    <div className="z-[1000]" data-testid="header">
      <div
        className={clsx("bg-brand-sky-blue py-3", isPopUp ? "hidden" : "block")}
      >
        <div className="container">
          <div className="flex items-center justify-end gap-5 lg:gap-10">
            <div className="flex items-center justify-end gap-5">
              {data?.socialMedia?.map((item) => (
                <NextLink href={item?.link?.url} key={item?.id}>
                  <NextImage
                    {...item?.icon?.node}
                    otherClasses="object-cover object-center h-[1.75rem] w-auto"
                  />
                </NextLink>
              ))}
            </div>
            <div className="flex items-center justify-end gap-3">
              <NextLink
                href={data?.subscribeLink?.url}
                otherClasses="border border-white px-4 py-2 font-openSans font-semibold text-p4 rounded-lg text-white"
              >
                {data?.subscribeLink?.title}
              </NextLink>
              <NextLink
                href={data?.contactUsLink?.url}
                otherClasses="border border-brand-golden-yellow bg-brand-golden-yellow  px-4 py-2 font-openSans font-semibold text-p4 rounded-lg text-white"
              >
                {data?.contactUsLink?.title}
              </NextLink>
              <NextLink
                href={data?.careersLink?.url}
                otherClasses="border border-brand-green bg-brand-green  px-4 py-2 font-openSans font-semibold text-p4 rounded-lg text-white"
              >
                {data?.careersLink?.title}
              </NextLink>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-brand-blue-dark py-5">
        <div className="container">
          <div className="flex items-center justify-between gap-10">
            <div className="">
              <NextLink href="/">
                <NextImage
                  {...data?.logo?.node}
                  alt={data?.logo?.node?.alt}
                  otherClasses="object-contain object-center h-[3.5rem] w-auto"
                />
              </NextLink>
            </div>

            {isPopUp && (
              <div className="flex items-center justify-end gap-11">
                <button onClick={() => {}}>
                  <Icon icon="menu-white" iconHeight={48} iconWidth={48} />
                </button>
                <button
                  onClick={() => {
                    onClose();
                  }}
                >
                  <Icon
                    icon="popup-close-icon"
                    iconHeight={42}
                    iconWidth={42}
                  />
                </button>
              </div>
            )}

            <div
              className={clsx(
                "flex items-center gap-8",
                isPopUp ? "hidden" : "block"
              )}
            >
              {menu?.map((item, index) => (
                <div key={index}>
                  {item.children && item.children.length > 0 ? (
                    <div className="relative group">
                      <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg py-2 mt-2">
                        {item.children.map((child, childIndex) => (
                          <NextLink
                            key={childIndex}
                            href={child?.childLink?.url}
                            otherClasses="block px-4 py-2 text-brand-blue-dark hover:bg-brand-golden-yellow hover:text-white transition-colors duration-300"
                          >
                            {child?.childLink?.title}
                          </NextLink>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <NextLink
                      href={item.parent?.url}
                      otherClasses="text-white text-p3 font-normal font-openSans hover:text-brand-golden-yellow transition-colors duration-300"
                    >
                      {item.parent?.title}
                    </NextLink>
                  )}
                </div>
              ))}

              <NextLink href="#" otherClasses="">
                <Icon icon="Search-Icon" iconHeight={28} iconWidth={28} />
              </NextLink>

              <NextLink
                href={data?.tvLink?.url}
                otherClasses="border border-white px-4 py-2 font-openSans font-normal text-p3 text-white"
              >
                {data?.tvLink?.title}
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
