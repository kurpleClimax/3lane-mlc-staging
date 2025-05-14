import { ALL_EVENTS } from "@/queries/all-events/all-events";
import client from "./apollo/client";
import {
  ALL_NEWS,
  ALL_NEWS_TYPES,
  NEWS_BY_SLUG,
} from "@/queries/all-news/all-news";
import { ALL_STATION_PARTNERS } from "@/queries/all-station-partners/all-station-partners";

export async function getAllNews() {
  const promise = client.query({
    query: ALL_NEWS,
    fetchPolicy: "no-cache",
  });

  const { data, errors } = await promise;
  if (errors) {
    return null;
  }
  return data?.allNews?.edges;
}

export async function getNewsBySlug(slug) {
  const promise = client.query({
    query: NEWS_BY_SLUG,
    fetchPolicy: "no-cache",
    variables: {
      slug,
    },
  });

  const { data, errors } = await promise;
  if (errors) {
    return null;
  }
  return data?.news;
}

export async function getAllNewsTypes() {
  const promise = client.query({
    query: ALL_NEWS_TYPES,
    fetchPolicy: "no-cache",
  });

  const { data, errors } = await promise;
  if (errors) {
    return null;
  }
  return data?.newsTypes?.nodes;
}

export async function getAllEvents(ids) {
  if (!Array.isArray(ids) || ids.length === 0) {
    return [];
  }

  try {
    const { data } = await client.query({
      query: ALL_EVENTS,
      fetchPolicy: "no-cache",
      variables: {
        where: {
          in: ids,
        },
      },
    });

    return data?.events?.edges || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return null;
  }
}

export async function getAllStationPartnersById(ids) {
  const promise = client.query({
    query: ALL_STATION_PARTNERS,
    variables: {
      where: {
        in: ids,
      },
    },
    fetchPolicy: "no-cache",
  });
  const { data, errors } = await promise;

  if (errors) {
    return null;
  }
  console.log("data=>", data?.stationPartners?.nodes);
  return data?.stationPartners?.nodes;
}
