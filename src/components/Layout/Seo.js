import { NextSeo } from "next-seo";

function Seo({ seo = {}, uri }) {
  const {
    title,
    metaDesc,
    opengraphDescription,
    opengraphTitle,
    opengraphImage,
    opengraphSiteName,
  } = seo;

  const currentLocation = process.browser ? window.location.origin : null;
  const opengraphUrl =
    (process.env.NEXT_PUBLIC_CANONICAL_URL
      ? process.env.NEXT_PUBLIC_CANONICAL_URL
      : currentLocation) + uri;

  return (
    <NextSeo
      title={title}
      description={opengraphDescription || metaDesc}
      canonical={opengraphUrl}
      noindex={
        process.env.NEXT_PUBLIC_NEXTJS_SITE_URL !==
        process.env.NEXT_PUBLIC_CANONICAL_URL
      } // metaRobotsNoindex}
      nofollow={
        process.env.NEXT_PUBLIC_NEXTJS_SITE_URL !==
        process.env.NEXT_PUBLIC_CANONICAL_URL
      } // metaRobotsNofollow}
      openGraph={{
        type: "website",
        locale: "en_US",
        url: opengraphUrl,
        title: opengraphTitle,
        description: opengraphDescription,
        images: [
          {
            url: opengraphImage?.sourceUrl,
            width: 1280,
            height: 720,
          },
        ],
        /* eslint-disable */
        site_name: opengraphSiteName,
        /* eslint-enable */
      }}
      /* twitter={{
				handle: '@Codeytek',
				site: '@Codeytek',
				cardType: 'summary_large_image'
			}} */
    />
  );
}

export default Seo;
