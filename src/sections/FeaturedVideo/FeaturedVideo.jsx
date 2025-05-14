import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { getYouTubeThumbnail } from "@/utils/helpers";
import CustomLink from "@/components/CustomLink";

// Dynamically import ReactPlayer with SSR disabled
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function FeaturedVideo(props) {
  const { heading, videoUrl, buttonVariant, buttonAnchor } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  const button = {
    variant: buttonVariant,
    anchor: buttonAnchor,
  };

  return (
    <section
      data-testid="featured-video"
      className="lg:mb-[3.5rem] mb-10 container"
    >
      <div className="bg-brand-mustard-yellow rounded-[1.5rem] px-5 lg:px-[3.8125rem] pt-10 pb-7">
        {heading && (
          <h2 className="text-white font-cubano text-center text-h4 md:text-h2 font-normal mb-4 lg:mb-[2.0625rem]">
            {heading}
          </h2>
        )}

        {videoUrl && hasWindow && (
          <div className="relative w-full aspect-[16/8] overflow-hidden">
            <ReactPlayer
              url={videoUrl}
              light={getYouTubeThumbnail(videoUrl)}
              playIcon={
                <Image
                  src="https://mlc-cms.3lanemarketing.com/wp-content/uploads/2025/04/Button_-Play.svg"
                  height={0}
                  width={0}
                  alt="play-icon"
                  className="h-12 w-12 sm:h-16 sm:w-16 md:h-[4.6875rem] md:w-[75px] aspect-square"
                  onClick={() => setIsPlaying(true)}
                />
              }
              playing={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              controls
              width="100%"
              height="100%"
              className="absolute top-0 left-0"
            />
          </div>
        )}
        {buttonAnchor?.url && (
          <div className="w-max mx-auto mt-4 lg:mt-[1.6875rem]">
            <CustomLink {...button} />
          </div>
        )}
      </div>
    </section>
  );
}
