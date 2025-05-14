import {
  getAllEvents,
  getAllNews,
  getAllNewsTypes,
  getAllStationPartnersById,
} from "@/lib/api";

export const addCustomPostTypesToBlocks = async (uri, blocks, type = "") => {
  try {
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      switch (block.name) {
        case "core/block": {
          if (block.innerBlocks?.length) {
            await addCustomPostTypesToBlocks(uri, block?.innerBlocks);
          }
          break;
        }
        case "acf/sectionnewscards": {
          block.attributes.data.allNews = await getAllNews();
          block.attributes.data.allNewsTypes = await getAllNewsTypes();

          break;
        }
        case "acf/sectioncalendar": {
          block.attributes.data.allSelectedEvents = await getAllEvents(
            block.attributes.data?.events
          );
          break;
        }
        case "acf/sectionnewsherobanner": {
          block.attributes.data.newsTypes = type;
          break;
        }
        case "acf/titlecontentandbuttonwithstationpartnerslist": {
          block.attributes.data.select_station_partners =
            await getAllStationPartnersById(
              block.attributes.data?.stationPartners
            );
          break;
        }

        default:
          break;
      }

      blocks[i] = block;
    }
  } catch (error) {
    console.error("An error occurred while processing blocks:", error);
    // Handle the error appropriately, e.g., log it, return a default value, etc.
  }

  return blocks;
};
