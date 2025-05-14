import { useEffect } from "react";
import "@/styles/globals.scss";
import "@/styles/accessibility.css";
import { useRouter } from "next/router";
import useLocalStorageState from "@/utils/useLocalStorageState";
import "../../faust.config";
import { FaustProvider } from "@faustwp/core";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [cookieConsent, setCookieConsent] = useLocalStorageState(
    "cookieConsent",
    ""
  );

  useEffect(() => {
    const updateConsent = () => {
      if (!cookieConsent) {
        return;
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "update_consent",
        ad_storage: cookieConsent,
        analytics_storage: cookieConsent,
        ad_user_data: cookieConsent,
        ad_personalization: cookieConsent,
      });
    };

    const handleRouteChange = () => {
      const id = router.asPath.split("#")[1];
      const hash = router.asPath.split("?")[1]?.replace("=", "");
      if (hash) {
        const section = document.getElementById(hash);
        if (section) {
          // section.scrollIntoView({ behavior: "smooth" });
          const sectionRect = section.getBoundingClientRect();
          const offset = sectionRect.top - 200;

          window.scrollTo({
            top: window.pageYOffset + offset,
            behavior: "smooth",
          });
        }
      }
      if (id) {
        const element = document.getElementById(id);
        if (element) {
          const sectionRect = element.getBoundingClientRect();
          const offset = sectionRect.top - 200;

          window.scrollTo({
            top: window.pageYOffset + offset,
            behavior: "smooth",
          });
        }
      }

      updateConsent();
    };

    handleRouteChange();

    const isExternalLink = (url) => {
      try {
        const linkUrl = new URL(url, window.location.href);
        return linkUrl.host !== window.location.host;
      } catch (e) {
        return false;
      }
    };

    // Get all link elements
    const links = document.querySelectorAll("a");

    if (links) {
      links.forEach((link) => {
        if (isExternalLink(link.href)) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        }
      });
    }

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, cookieConsent]);

  function onClose() {
    if (document.referrer) {
      if (new URL(document.referrer).pathname !== window.location.pathname) {
        router.push(new URL(document.referrer).pathname);
        return;
      }
    }
    window.close();
  }

  return (
    <FaustProvider pageProps={pageProps}>
      <div className="font-body smart-growth">
        <Component onClose={onClose} {...pageProps} key={router.asPath} />
      </div>
    </FaustProvider>
  );
}

export default MyApp;
