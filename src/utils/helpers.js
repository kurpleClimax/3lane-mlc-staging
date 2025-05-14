import getYoutubeId from "get-youtube-id";
import sanitizeHtml from "sanitize-html";
import { decode } from "html-entities";

export const getPageUri = async (uri, slug, type) => {
  switch (type) {
    case "page":
      return uri;

    case "news":
      return `/news/${slug}`;

    default:
      return "/";
  }
};

export const mapVariantToButtonType = (id) => {
  const colors = {
    7: { color: "mustard-yellow", type: "mustard-yellow-filled" },
    8: { color: "mustard-yellow", type: "mustard-yellow-outline" },
    9: { color: "sky-blue", type: "sky-blue-filled" },
    10: { color: "sky-blue", type: "sky-blue-filled-arrow-right" },
    11: { color: "sky-blue", type: "sky-blue-outline-arrow-right" },
    12: { color: "sky-blue", type: "sky-blue-outline-youtube-icon-right" },
    13: { color: "lime-green", type: "lime-green-filled-arrow-right" },
  };

  return (
    colors[id] || {
      color: "sky-blue",
      type: "sky-blue-filled-arrow-right",
    }
  );
};

export function convertToTitleCase(str) {
  let words = str?.split("-");

  for (let i = 0; i < words?.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  // Join the words back together with spaces
  let result = words?.join(" ");

  return result;
}

export const getYouTubeThumbnail = (url, large = true) => {
  const videoID = getYoutubeId(url);
  if (!videoID) return null; // Handle invalid URL case

  // Videos that don't support 'maxresdefault' (returns black/blank image)
  const noMaxResDefaultVideos = [
    "1l4gkNFe2_4",
    "mZSaS6HuFMY",
    "9ntcddqPg3Y",
    "h4egFg4kE4A",
    "igePjFkpT38",
    "hxkvzuZB8Tk",
    "gcrQHHI7vCE",
    "WV-QhJFypKQ",
    "xpjsMgTysSw",
    "3TocRd8kn6Y",
    "e6dz4HKoZCA",
    "XFDO7983f9Q",
    "hYYPVnwr6ak",
    "ZHlWV45UFWg",
    "jpf-1H7kSpI",
    "N_aR29lgwxs",
    "EZyX8zLODxg",
    "e0SWvTfDiLg",
    "hXG997ZoBX4",
    "-Ys0g8gvFUk",
  ];

  const thumbnailType = large
    ? noMaxResDefaultVideos.includes(videoID)
      ? "hqdefault"
      : "maxresdefault"
    : "0"; // '0' is the first frame (low quality)

  return `https://img.youtube.com/vi/${videoID}/${"maxresdefault"}.jpg`;
};

export const cleanRichText = (htmlContent) => {
  const cleanedHtml = sanitizeHtml(htmlContent, {
    allowedTags: sanitizeHtml?.defaults.allowedTags.filter(
      (tag) => tag !== "img" && tag !== "iframe" && tag !== "a" && tag !== "br"
    ), // Removed 'table' from allowedTags
    transformTags: {
      p: (tagName, attribs) => {
        if (
          !attribs.class &&
          !attribs.id &&
          !attribs.style &&
          !attribs.innerHTML?.trim()
        ) {
          return { tagName: "p", text: "" };
        }
        return { tagName, attribs };
      },
    },
    exclusiveFilter: (frame) => {
      // Remove <table> tags
      if (frame.tag === "table") {
        return {
          tagName: "div",
          attribs: {},
          text: "",
        };
      }
      return false;
    },
    textFilter: (text) =>
      text
        ?.replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
  });

  // Remove empty <p> tags post-sanitization
  const cleanedAndFilteredHtml = cleanedHtml
    .replace(/<p>\s*<\/p>/g, "")
    .replace(/<p>\s*<\/p>/g, "");

  return cleanedAndFilteredHtml;
};

export const sortedDataFunction = (key, direction, data) => {
  const sortableData = [...data];
  sortableData.sort((a, b) => {
    let value1 = a[key];
    let value2 = b[key];

    if (!isNaN(value1) && !isNaN(value2)) {
      value1 = parseFloat(value1);
      value2 = parseFloat(value2);
    }

    if (value1 < value2) {
      return direction === "asc" ? -1 : 1;
    }
    if (value1 > value2) {
      return direction === "asc" ? 1 : -1;
    }

    return 0;
  });

  return sortableData;
};

export const cleanContent = (content) => {
  if (!content) return "";
  content = decode(content);

  // Remove style attributes from all tags
  content = content?.replace(/(<[^>]+) style=".*?"/gi, "$1");

  // Function to remove <em> tags recursively
  const removeEmTags = (html) => {
    // Regex to find <em> tags and replace them with their inner HTML
    while (/<em>(.*?)<\/em>/gi.test(html)) {
      html = html?.replace(/<em>(.*?)<\/em>/gi, "$1");
    }
    return html;
  };

  // Function to remove <i> tags recursively
  const removeITags = (html) => {
    // Regex to find <i> tags and replace them with their inner HTML
    while (/<i>(.*?)<\/i>/gi.test(html)) {
      html = html?.replace(/<i>(.*?)<\/i>/gi, "$1");
    }
    return html;
  };

  // Apply the function to remove all <em> tags inside <p> tags
  content = removeEmTags(content);

  // Apply the function to remove all <i> tags
  content = removeITags(content);

  // Convert specific button shortcode to HTML link with a button class
  content = content?.replace(
    /\[button.*?link\s*=\s*["“”](.*?)["“”].*?\](.*?)\[\/button\]/gi,
    '<a href="$1" id="news-button">$2</a>'
  );

  // Replace [alert type="info"]...[/alert] with <div class="featured-box">...</div>
  content = content?.replace(
    /\[alert.*?type\s*=\s*["“”](.*?)["“”].*?\](.*?)\[\/alert\]/gis,
    '<div class="featured-box">$2</div>'
  );

  // Remove other shortcodes
  content = content?.replace(/\[.*?\]/g, "");

  // Remove empty <p> tags or those containing only &nbsp;
  // This pattern handles cases with spaces, tabs, and line breaks
  content = content?.replace(/<p>(\s|&nbsp;|<br>)*<\/p>/gi, "");

  // Remove any extra whitespace around tags
  content = content?.replace(/\s+</g, "<").replace(/>\s+/g, ">");

  // Conditionally replace URLs
  content = content?.replace(
    /https:\/\/smartgrowthamerica\.org(\/wp-content\/uploads[^"]*)/gi,
    (match, p1) => {
      return process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL + p1;
    }
  );

  // Replace other URLs with 'TEST'
  content = content?.replace(
    /https:\/\/smartgrowthamerica\.org(?!\/wp-content\/uploads[^"]*)/gi,
    process.env.NEXT_PUBLIC_CANONICAL_URL
  );

  // Set font size of <a> tags under <li> tags to 1.25rem
  content = content.replace(/<li[^>]*>(.*?)<\/li>/gi, (match, p1) => {
    return `<li>${p1.replace(
      /<a(.*?)>/gi,
      '<a$1 style="font-size: 1.1rem; margin-right: 4px; margin-left: 4px;">'
    )}</li>`;
  });

  content = content?.replace(
    /<a(.*?)>/gi,
    '<a$1 style="font-size: 1.25rem; margin-right: 4px; margin-left: 4px;">'
  );

  return content;
};

export const cleanOnlyPTags = (htmlContent) => {
  // Remove all tags except <p> and their contents
  const cleanedHtml = htmlContent?.replace(/<[^>]*>/g, "");

  // Remove extra spaces and trim
  const cleanedAndTrimmedHtml = cleanedHtml?.replace(/\s+/g, " ").trim();
  const cleanHtmlContent = cleanContent(
    cleanedAndTrimmedHtml?.replace("&nbsp;", "")
  );

  return cleanHtmlContent;
};

export const appendSiteURLToImages = (content) => {
  if (!content) return content;

  // Regex to find all image URLs starting with /wp-content/uploads
  const regex = /src="\/wp-content\/uploads/g;

  // Replace the matched URLs with the full URL
  return content?.replace(
    regex,
    `src="${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-content/uploads`
  );
};

export const keepSpecificHtmlTags = (htmlContent) => {
  // Remove all tags except <p>, <a>, <img>, <span>, <style>, <br>, and newline characters
  const cleanedHtml = htmlContent?.replace(
    /<(?!\/?(p|a|img|span|style|ul|li|ol|br)(\s|\/?)[^>]*>)[^>]*>/gi,
    ""
  );

  // Remove extra spaces and trim
  const cleanedAndTrimmedHtml = cleanedHtml?.replace(/\s+/g, " ").trim();

  return cleanedAndTrimmedHtml;
};

export const extractKeyValuePairs = (obj) => {
  const result = {};
  Object.keys(obj).forEach((key) => {
    if (Array.isArray(obj[key])) {
      result[key] = obj[key];
    }
  });
  return result;
};
