"use client";
import { useState } from "react";
import HtmlBlock from "@/components/HtmlBlock";
import ProjectSlider from "@/components/ProjectSlider/ProjectSlider";
import Tabs from "@/components/Tabs/Tabs";

const dummyNewsData = {
  news: [
    {
      node: {
        title: "Exploring Michigan's Waterways",
        uri: "/exploring-michigans-waterways",
        featuredImage: {
          node: {
            url: "https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/05/Rectangle-1.png",
          },
        },
      },
    },
    {
      node: {
        title: "History of the Great Lakes",
        uri: "/history-of-the-great-lakes",
        featuredImage: {
          node: {
            url: "https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/05/Rectangle-1.png",
          },
        },
      },
    },
    {
      node: {
        title: "Ecology and Conservation",
        uri: "/ecology-and-conservation",
        featuredImage: null,
      },
    },
    {
      node: {
        title: "Michigan's Native Plants",
        uri: "/michigans-native-plants",
        featuredImage: {
          node: {
            url: "https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/05/Rectangle-1.png",
          },
        },
      },
    },
    {
      node: {
        title: "Michigan's Native Plants",
        uri: "/michigans-native-plants",
        featuredImage: {
          node: {
            url: "https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/05/Rectangle-1.png",
          },
        },
      },
    },
    {
      node: {
        title: "Michigan's Native Plants",
        uri: "/michigans-native-plants",
        featuredImage: {
          node: {
            url: "https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/05/Rectangle-1.png",
          },
        },
      },
    },
    {
      node: {
        title: "Michigan's Native Plants",
        uri: "/michigans-native-plants",
        featuredImage: {
          node: {
            url: "https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/05/Rectangle-1.png",
          },
        },
      },
    },
    {
      node: {
        title: "Michigan's Native Plants",
        uri: "/michigans-native-plants",
        featuredImage: {
          node: {
            url: "https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/05/Rectangle-1.png",
          },
        },
      },
    },
    {
      node: {
        title: "Michigan's Native Plants",
        uri: "/michigans-native-plants",
        featuredImage: {
          node: {
            url: "https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/05/Rectangle-1.png",
          },
        },
      },
    },
    {
      node: {
        title: "Michigan's Native Plants",
        uri: "/michigans-native-plants",
        featuredImage: {
          node: {
            url: "https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/05/Rectangle-1.png",
          },
        },
      },
    },
    {
      node: {
        title: "Michigan's Native Plants",
        uri: "/michigans-native-plants",
        featuredImage: {
          node: {
            url: "https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/05/Rectangle-1.png",
          },
        },
      },
    },
  ],
};

const tabsData = [
  "News K-12 Series",
  "Secondary & General Audience Programming",
  "Collections for Teaching & Learning",
];

const dummyData = {
  "News K-12 Series": dummyNewsData,
  "Secondary & General Audience Programming": dummyNewsData,
  "Collections for Teaching & Learning": dummyNewsData,
};

export const ProjectsShowcase = () => {
  const [activeTab, setActiveTab] = useState(tabsData[0]);

  return (
    <section
      data-testid="projects-showcase"
      className="mb-10 lg:mb-[3.5rem] container !pl-10 !mr-0 !pr-0"
    >
      <div className="container !mr-0 !ml-auto !p-0 bg-brand-light-peach rounded-tl-[3.125rem] rounded-bl-[3.125rem] !py-5 md:!py-10 lg:!pt-[2.6875rem] lg:!pb-12 !pl-5 md:!pl-10 lg:!pl-[3.4375rem]">
        <h2 className="w-full max-w-[59.25rem] text-h4 md:text-h2 text-brand-pumpkin-orange font-cubano capitalize font-normal mb-2 md:mb-5 pr-5">
          What’s New This Month
        </h2>
        <HtmlBlock
          className="w-full max-w-[59.25rem] mb-2 md:mb-5 lg:mb-[2.1875rem] pr-5"
          content="Our October programming brings fresh, dynamic content to K-12 classrooms. Browse all of this month’s offerings or navigate using the links below."
        />
        <div className="!pr-0 p-5 md:py-10 lg:pt-[1.375rem] lg:pb-[2.875rem] bg-white">
          <div className="w-full max-w-[625.3125rem] mb-5 md:mb-10 lg:mb-[3.5rem] pr-5">
            <Tabs
              tabsData={tabsData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              otherClasses=""
            />
          </div>
          <ProjectSlider data={dummyData[activeTab]} />
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
