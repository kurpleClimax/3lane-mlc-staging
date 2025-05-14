export const relativeToAbsoluteUrls = (htmlString = "") => {
  return htmlString.split(process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL).join("");
};
