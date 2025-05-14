import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getLastBreadcrumbLink } from "@/utils/getBreadcrumbLink";

export default function Breadcrumbs({ breadcrumbsData }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false); // State to track expansion

  if (pathname === "/") {
    return <div className=""></div>;
  }

  const grandParent = breadcrumbsData?.parent?.node?.parent?.node;
  const parent = breadcrumbsData?.parent?.node;
  const title = breadcrumbsData?.title;
  const lastBreadcrumbLink = getLastBreadcrumbLink(breadcrumbsData, pathname);

  const isTextBreadcrumb = (breadcrumbTitle) =>
    breadcrumbTitle === "About" || breadcrumbTitle === "Ocean Planning";

  return (
    <div className={`flex items-center gap-x-1 lg:gap-x-2 py-5`}>
      {/* Home Link - Always Visible */}
      <Link
        className="text-p4 text-brand-black font-openSans font-normal"
        href="/"
      >
        Home
      </Link>

      {/* --- MOBILE VIEW (Collapsed Middle Breadcrumbs) --- */}
      <span className="sm:hidden">
        {!expanded && (grandParent || parent) && (
          <>
            <span className="text-p4 text-brand-black font-openSans font-normal">
              /
            </span>
            <span
              className="text-p4 text-brand-black font-openSans font-normal cursor-pointer"
              onClick={() => setExpanded(true)}
            >
              ...
            </span>
          </>
        )}
      </span>

      {/* --- LARGE SCREEN (Always Show Full Breadcrumbs) OR EXPANDED MOBILE VIEW --- */}
      <span className="hidden sm:flex items-center gap-x-1 lg:gap-x-2">
        {grandParent && (
          <>
            <span className="text-p4 text-brand-black font-openSans font-normal">
              /
            </span>
            {isTextBreadcrumb(grandParent?.title) ? (
              <span className="text-p4 text-brand-black font-openSans font-normal">
                {grandParent?.title}
              </span>
            ) : (
              <Link
                className="text-p4 text-brand-black font-openSans font-normal"
                href={grandParent?.uri}
              >
                {grandParent?.title}
              </Link>
            )}
          </>
        )}

        {parent && (
          <>
            <span className="text-p4 text-brand-black font-openSans font-normal">
              /
            </span>
            {isTextBreadcrumb(parent?.title) ? (
              <span className="text-p4 text-brand-black font-openSans font-normal">
                {parent?.title}
              </span>
            ) : (
              <Link
                className="text-p4 text-brand-black font-openSans font-normal"
                href={parent?.uri}
              >
                {parent?.title}
              </Link>
            )}
          </>
        )}
      </span>

      {/* --- MOBILE VIEW (Expanded on Click) --- */}
      {expanded && (
        <span className="sm:hidden flex items-center gap-x-1 lg:gap-x-2">
          {grandParent && (
            <>
              <span className="text-p4 text-brand-black font-openSans font-normal">
                /
              </span>
              {isTextBreadcrumb(grandParent?.title) ? (
                <span className="text-p4 text-brand-black font-openSans font-normal">
                  {grandParent?.title}
                </span>
              ) : (
                <Link
                  className="text-p4 text-brand-black font-openSans font-normal"
                  href={grandParent?.uri}
                >
                  {grandParent?.title}
                </Link>
              )}
            </>
          )}

          {parent && (
            <>
              <span className="text-p4 text-brand-black font-openSans font-normal">
                /
              </span>
              {isTextBreadcrumb(parent?.title) ? (
                <span className="text-p4 text-brand-black font-openSans font-normal">
                  {parent?.title}
                </span>
              ) : (
                <Link
                  className="text-p4 text-brand-black font-openSans font-normal"
                  href={parent?.uri}
                >
                  {parent?.title}
                </Link>
              )}
            </>
          )}
        </span>
      )}

      {/* Last Breadcrumb (Always visible on both mobile and desktop) */}
      <span className="text-p4 text-brand-black font-openSans font-normal">
        /
      </span>
      <Link
        className="text-p4 text-brand-royal-blue font-bold"
        href={breadcrumbsData?.uri}
      >
        {title?.split(">").pop().trim()}
      </Link>

      {/* Last Breadcrumb Link if exists */}
      {lastBreadcrumbLink && (
        <>
          <span className="text-p4 text-brand-black font-openSans font-normal">
            /
          </span>
          {lastBreadcrumbLink}
        </>
      )}
    </div>
  );
}
