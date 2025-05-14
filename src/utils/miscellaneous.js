// import dayjs from 'dayjs'
import sanitizeHtml from "sanitize-html";
import Link from "@/components/Link/Link";
import parseHtml, { domToReact } from "html-react-parser";
import styleToJS from "style-to-js";

/**
 * Sanitize markup or text when used inside dangerouslysetInnerHTML
 *
 * @param {string} content Plain or html string.
 *
 * @return {string} Sanitized string
 */
export function sanitize(content = "") {
  return sanitizeHtml(content, {
    allowedTags: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "div",
      "p",
      "ul",
      "ol",
      "li",
      "img",
      "video",
      "source",
      "iframe",
      "table",
      "tbody",
      "tr",
      "td",
      "br",
      "b",
      "i",
      "u",
      "em",
      "strong",
      "a",
      "span",
    ],
    allowedAttributes: {
      div: ["class", "style"],
      p: ["class", "style"],
      ul: ["class"],
      ol: ["class"],
      li: ["class"],
      img: ["class", "src", "srcset", "alt", "width", "height"],
      video: [
        "aria-label",
        "tabindex",
        "id",
        "data-has-controls",
        "poster",
        "preload",
        "autoplay",
        "muted",
        "loop",
        "data-t",
      ],
      source: ["type", "src"],
      iframe: [
        "class",
        "src",
        "loading",
        "title",
        "width",
        "height",
        "frameborder",
        "allow",
        "allowfullscreen",
      ],
      table: [
        "class",
        "width",
        "border",
        "cellpadding",
        "cellspacing",
        "style",
        "align",
        "bgcolor",
      ],
      tr: [
        "class",
        "width",
        "border",
        "cellpadding",
        "cellspacing",
        "style",
        "align",
        "bgcolor",
      ],
      td: [
        "class",
        "width",
        "border",
        "cellpadding",
        "cellspacing",
        "style",
        "align",
        "bgcolor",
      ],
      a: ["class", "href", "name", "target", "rel", "title", "data-type"],
      span: ["class", "style"],
    },
  });
}

export function processBulletin(content = "") {
  return sanitizeHtml(content, {
    allowedTags: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "div",
      "p",
      "ul",
      "ol",
      "li",
      "img",
      "video",
      "source",
      "iframe",
      "table",
      "tbody",
      "tr",
      "td",
      "br",
      "b",
      "i",
      "u",
      "em",
      "strong",
      "a",
      "span",
    ],
    allowedAttributes: {
      div: ["class", "style"],
      p: ["class", "style"],
      ul: ["class", "style"],
      ol: ["class", "style"],
      li: ["class", "style"],
      img: ["class", "src", "srcset", "alt", "width", "height", "style"],
      video: [
        "aria-label",
        "tabindex",
        "id",
        "data-has-controls",
        "poster",
        "preload",
        "autoplay",
        "muted",
        "loop",
        "data-t",
      ],
      source: ["type", "src"],
      iframe: [
        "class",
        "src",
        "loading",
        "title",
        "width",
        "height",
        "frameborder",
        "allow",
        "allowfullscreen",
      ],
      table: [
        "class",
        "width",
        "border",
        "cellpadding",
        "cellspacing",
        "style",
        "align",
        "bgcolor",
      ],
      tr: [
        "class",
        "width",
        "border",
        "cellpadding",
        "cellspacing",
        "style",
        "align",
        "bgcolor",
      ],
      td: [
        "class",
        "width",
        "border",
        "cellpadding",
        "cellspacing",
        "style",
        "align",
        "bgcolor",
      ],
      a: ["class", "href", "name", "target", "rel", "style", "title", "data-type"],
      span: ["class", "style"],
    },
  });
}

export function processPost(content = "") {
  const regex =
    /<img(?![^>]*\bsrc=['"][^'"]*['"])[^>]*\bsrcset=['"]([^'"]+)['"][^>]*>/gi;
  const modifiedHtmlString = content.replace(regex, (match, url) => {
    return match.replace(
      /srcset=['"]([^'"]+)['"]/,
      `src="${url}" srcset="${url}"`
    );
  });

  return sanitize(modifiedHtmlString);
}

export function processPostExcerpt(content = "") {
  const text = sanitizeHtml(content, {
    allowedTags: [],
    allowedAttributes: {},
  });

  let truncatedText = text.slice(0, 135);
  if (truncatedText.length === 135) {
    const splitContent = truncatedText.split(" ");
    splitContent.pop();
    truncatedText = splitContent.join(" ") + "...";
  }

  return truncatedText;
}

// export function replaceDevToLiveURL (content = '') {
//   return content.replaceAll(
//     'dev.NASPO.org',
//     // process.env.NEXT_PUBLIC_NEXTJS_SITE_URL
//     'www.naspo.org'
//   )
// }

export const stripTrailingSlash = (path) => path.replace(/\/$/, "");

export const isLinkActive = (asPath, path) => {
  if (!asPath || !path) {
    return false;
  }

  return asPath === stripTrailingSlash(path);
};

export const convertAmpersands = (html) => html?.replace(/&amp;/g, "&") ?? "";

export const convertAmpersandsToEntities = (html) => {
  if (typeof html !== "string") {
    return html;
  }

  return html?.replace(/&/g, "&amp;") ?? "";
};

export const stripHtml = (htmlString) => {
  if (typeof htmlString !== "string") {
    return "";
  }

  return htmlString.replace(/(<([^>]+)>)/gi, "");
};

export const addWPUrl = (url) => {
  if (url?.indexOf("/wp-content/") === 0) {
    return `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}${url}`;
  }

  return url;
};

export const convertToSlug = (str) => {
  if (typeof str !== "string") {
    return "";
  }

  return str
    .toLowerCase()
    .replace(/\s*-\s*/g, "-")
    .split(/\s+/)
    .join("-")
    .replace(/[^-a-z0-9_]/g, "");
};

export function toSnakeCase(str) {
  if (!str || typeof str !== "string") {
    return "";
  }

  return (
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      ?.map((x) => x.toLowerCase())
      ?.join("_") || str
  );
}

export const convertSlugToCamelCase = (str) =>
  str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function buildPayload(formData) {
  const boundary = "xxxxxxxxxx";
  let data = "";
  for (const i in formData) {
    if ({}.hasOwnProperty.call(formData, i)) {
      data += "--" + boundary + "\r\n";
      data +=
        'Content-Disposition: form-data; name="' +
        i +
        '"; \r\n\r\n' +
        formData[i] +
        "\r\n";
    }
  }

  data += "--" + boundary + "\r\n";
  const payload = Buffer.from(data, "utf8");
  return payload;
}

export function throttle(callback, limit) {
  let wait = false; // Initially, we're not waiting
  return function () {
    // We return a throttled function
    if (!wait) {
      // If we're not waiting
      callback.call(); // Execute users function
      wait = true; // Prevent future invocations
      setTimeout(function () {
        // After a period of time
        wait = false; // And allow future invocations
      }, limit);
    }
  };
}

export function capitalize(str) {
  if (typeof str !== "string") {
    return "";
  }

  if (str.length === 1) {
    return str.toUpperCase();
  }

  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function makeTitleCase(str) {
  if (typeof str !== "string") {
    return "";
  }

  return str
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}

export function isExternalUrl(url) {
  try {
    const { hostname } = new URL(url);
    const { hostname: currentHostname } = new URL(
      process.env.NEXT_PUBLIC_NEXTJS_SITE_URL
    );
    return (
      (!url?.startsWith("/") && hostname !== currentHostname) ||
      /\/news\/[^/]+\/$/.test(url)
    );
  } catch (error) {
    return false;
  }
}

export function getYoutubeThumbnailFromUrl(url, large = false) {
  const videoId = url?.match(/v=([^&]+)/)?.[1];
  const idsWithoutMaxImage = [
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
  ];

  return `https://img.youtube.com/vi/${videoId}/${
    large
      ? idsWithoutMaxImage.includes(videoId)
        ? "hqdefault"
        : "maxresdefault"
      : "0"
  }.jpg`;
}

export const truncateText = (text = "", wordLimit) => {
  const words = text?.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

// export function getFeaturedEventBgClass (eventTypes) {
//   const bgMap = {
//     'naspo-exchange': 'bg-brand-blue',
//     'annual-conferences': 'bg-brand-orange',
//     'naspo-reach': 'bg-brand-green'
//   }

//   const bgClass = eventTypes.reduce(
//     (str, eventType) => str || bgMap[eventType?.slug],
//     ''
//   )
//   return bgClass || 'bg-brand-blue'
// }

// export function getRegionalConferenceBoxBgClass (region) {
//   const bgMap = {
//     'eastern-region': 'bg-brand-violet',
//     'western-region': 'bg-brand-blue',
//     'midwestern-region': 'bg-brand-green-4',
//     'southern-region': 'bg-brand-blue-light-3'
//   }

//   const bgClass = bgMap[region]
//   return bgClass || 'bg-brand-blue'
// }

// export function getStateName (stateAbbr) {
//   const stateMap = {
//     AL: 'Alabama',
//     AK: 'Alaska',
//     AS: 'American Samoa',
//     AZ: 'Arizona',
//     AR: 'Arkansas',
//     CA: 'California',
//     CO: 'Colorado',
//     CT: 'Connecticut',
//     DE: 'Delaware',
//     DC: 'District Of Columbia',
//     FM: 'Federated States Of Micronesia',
//     FL: 'Florida',
//     GA: 'Georgia',
//     GU: 'Guam',
//     HI: 'Hawaii',
//     ID: 'Idaho',
//     IL: 'Illinois',
//     IN: 'Indiana',
//     IA: 'Iowa',
//     KS: 'Kansas',
//     KY: 'Kentucky',
//     LA: 'Louisiana',
//     ME: 'Maine',
//     MH: 'Marshall Islands',
//     MD: 'Maryland',
//     MA: 'Massachusetts',
//     MI: 'Michigan',
//     MN: 'Minnesota',
//     MS: 'Mississippi',
//     MO: 'Missouri',
//     MT: 'Montana',
//     NE: 'Nebraska',
//     NV: 'Nevada',
//     NH: 'New Hampshire',
//     NJ: 'New Jersey',
//     NM: 'New Mexico',
//     NY: 'New York',
//     NC: 'North Carolina',
//     ND: 'North Dakota',
//     MP: 'Northern Mariana Islands',
//     OH: 'Ohio',
//     OK: 'Oklahoma',
//     OR: 'Oregon',
//     PW: 'Palau',
//     PA: 'Pennsylvania',
//     PR: 'Puerto Rico',
//     RI: 'Rhode Island',
//     SC: 'South Carolina',
//     SD: 'South Dakota',
//     TN: 'Tennessee',
//     TX: 'Texas',
//     UT: 'Utah',
//     VT: 'Vermont',
//     VI: 'Virgin Islands',
//     VA: 'Virginia',
//     WA: 'Washington',
//     WV: 'West Virginia',
//     WI: 'Wisconsin',
//     WY: 'Wyoming'
//   }

//   return stateMap[stateAbbr]
// }

// export function getStateAbbr (stateName) {
//   const stateMap = {
//     alabama: 'AL',
//     alaska: 'AK',
//     'american-samoa': 'AS',
//     arizona: 'AZ',
//     arkansas: 'AR',
//     california: 'CA',
//     colorado: 'CO',
//     connecticut: 'CT',
//     delaware: 'DE',
//     'district-of-columbia': 'DC',
//     'federated-states-of-micronesia': 'FM',
//     florida: 'FL',
//     georgia: 'GA',
//     guam: 'GU',
//     hawaii: 'HI',
//     idaho: 'ID',
//     illinois: 'IL',
//     indiana: 'IN',
//     iowa: 'IA',
//     kansas: 'KS',
//     kentucky: 'KY',
//     louisiana: 'LA',
//     maine: 'ME',
//     'marshall-islands': 'MH',
//     maryland: 'MD',
//     massachusetts: 'MA',
//     michigan: 'MI',
//     minnesota: 'MN',
//     mississippi: 'MS',
//     missouri: 'MO',
//     montana: 'MT',
//     nebraska: 'NE',
//     nevada: 'NV',
//     'new-hampshire': 'NH',
//     'new-jersey': 'NJ',
//     'new-mexico': 'NM',
//     'new-york': 'NY',
//     'north-carolina': 'NC',
//     'north-dakota': 'ND',
//     'northern-mariana-islands': 'MP',
//     ohio: 'OH',
//     oklahoma: 'OK',
//     oregon: 'OR',
//     palau: 'PW',
//     pennsylvania: 'PA',
//     'puerto-rico': 'PR',
//     'rhode-island': 'RI',
//     'south-carolina': 'SC',
//     'south-dakota': 'SD',
//     tennessee: 'TN',
//     texas: 'TX',
//     'u-s-virgin-islands': 'VI',
//     utah: 'UT',
//     vermont: 'VT',
//     'virgin-islands': 'VI',
//     virginia: 'VA',
//     washington: 'WA',
//     'west-virginia': 'WV',
//     wisconsin: 'WI',
//     wyoming: 'WY'
//   }

//   return stateMap[stateName]
// }

// export function getEventUrl (event) {
//   const { slug, eventTypes } = event
//   const isPastEvent = dayjs(
//     event?.eventFields?.eventEndDate || event?.eventFields?.eventStartDate
//   ).isBefore(dayjs(), 'day')

//   if (eventTypes?.nodes?.some((node) => node?.slug === 'naspo-reach')) {
//     if (isPastEvent) {
//       return '/events-and-webinars/naspo-reach/past-events/'
//     }

//     return '/events-and-webinars/naspo-reach/'
//   }

//   if (eventTypes?.nodes?.some((node) => node?.slug === 'annual-conferences')) {
//     if (isPastEvent) {
//       return '/events-and-webinars/naspo-annual/past-events/'
//     }

//     return '/events-and-webinars/naspo-annual/'
//   }

//   if (eventTypes?.nodes?.some((node) => node?.slug === 'career-fairs')) {
//     return `/events-and-webinars/career-fairs/${slug}/`
//   }

//   if (eventTypes?.nodes?.some((node) => node?.slug === 'naspo-exchange')) {
//     if (isPastEvent) {
//       return '/events-and-webinars/naspo-exchange/past-events/'
//     }

//     return '/events-and-webinars/naspo-exchange/'
//   }

//   if (eventTypes?.nodes?.some((node) => node?.slug === 'eastern-region')) {
//     if (isPastEvent) {
//       return '/events-and-webinars/regional-conferences/eastern-region/past-events/'
//     }

//     return '/events-and-webinars/regional-conferences/eastern-region/'
//   }

//   if (eventTypes?.nodes?.some((node) => node?.slug === 'western-region')) {
//     if (isPastEvent) {
//       return '/events-and-webinars/regional-conferences/western-region/past-events/'
//     }

//     return '/events-and-webinars/regional-conferences/western-region/'
//   }

//   if (eventTypes?.nodes?.some((node) => node?.slug === 'midwestern-region')) {
//     if (isPastEvent) {
//       return '/events-and-webinars/regional-conferences/midwestern-region/past-events/'
//     }

//     return '/events-and-webinars/regional-conferences/midwestern-region/'
//   }

//   if (eventTypes?.nodes?.some((node) => node?.slug === 'southern-region')) {
//     if (isPastEvent) {
//       return '/events-and-webinars/regional-conferences/southern-region/past-events/'
//     }

//     return '/events-and-webinars/regional-conferences/southern-region/'
//   }

//   return '/events-and-webinars/'
// }

export function isEmail(str) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

export function isUrlInternal(link) {
  if (
    !link ||
    link.indexOf("https:") === 0 ||
    link.indexOf("#") === 0 ||
    link.indexOf("http") === 0 ||
    link.indexOf("://") === 0
  ) {
    return false;
  }
  return true;
}

function setStyleProp(style, props) {
  if (style === null || style === undefined) {
    return;
  }
  try {
    props.style = styleToJS(style, { reactCompat: true });
  } catch (err) {
    props.style = {};
  }
}

export function replace(node) {
  const attribs = node.attribs || {};
  if (node.name === "a" && !isExternalUrl(attribs.href)) {
    const { href, style, ...props } = attribs;
    if (href === undefined) {
      return node;
    }

    setStyleProp(style, props);
    if (props.class) {
      props.className = props.class;
      delete props.class;
    }
    return (
      <Link href={href ?? ""} {...props}>
        {!!node.children &&
          !!node.children.length &&
          domToReact(node.children, { replace })}
      </Link>
    );
  } else if (node.name === "a") {
    attribs.target = "_blank";
    attribs.rel = "noopener";
    const { style, ...props } = attribs;
    setStyleProp(style, props);
    return (
      <a {...props}>
        {!!node.children &&
          !!node.children.length &&
          domToReact(node.children, { replace })}
      </a>
    );
  }
}

export function parseHtmlWithLink(html) {
  return parseHtml(html, { replace });
}

export function filterBulletinExcerpt(excerpt) {
  const re =
    /\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\s+/g;
  return excerpt?.replace(re, "") ?? "";
}

export function getOffsetTop(element) {
  let offsetTop = 0;
  while (element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return offsetTop;
}

export function convertToCamelCase(obj) {
  const newObj = {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      let newKey = key;
      if (key.includes("_") && key.indexOf("_") > 0) {
        const parts = key.split("_");
        newKey =
          parts[0] +
          parts
            .slice(1)
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join("");
      }
      newObj[newKey] = obj[key];
    }
  }
  return newObj;
}
export function mapDepartment(variant) {
  const variants = {
    17: "Leadership",
    18: "Board Members",
  };

  return variants[variant];
}

export function mapDepartmentSlug(variant) {
  const variants = {
    17: "Leadership",
    18: "Board Members",
  };

  return variants[variant];
}

export function stripNewlinesFromBr(str) {
  return str?.replace(/<br \/>\r\n/g, "<br />") ?? "";
}

export function convertUrlToBreadcrumbs(url) {
  return (
    url
      ?.slice(1, url?.length - 1)
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
      ?.replace(/\//g, " > ") ?? ""
  );
}

export const nonBreadRoutes = ["/search/", "/homepage/", "/", "/policy-form/"];
