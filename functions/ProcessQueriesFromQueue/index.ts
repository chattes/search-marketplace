import { AzureFunction, Context } from "@azure/functions";

import { isNull, isEmpty } from "lodash";
import {
  locations,
  categories,
  SearchParameters,
  SearchOptions,
  search,
  Ad,
} from "kijiji-scraper";

/**
 *
 * @param context
 * @param myQueueItem
 *
 *
 */

type AdsResults = {
  title: string;
  description: string;
  date: Date;
  image: string;
  price: number;
  location: string;
  adUrl: string;
};

type Query = {
  [paramName: string]: any;
  id: string;
  location: string;
  queryString: string;
  maxPrice?: number;
  category?: string;
  maxResults?: number;
};

type kijijiQuery = {
  id: string;
  location: Partial<typeof locations>;
  category: Partial<typeof categories>;
  maxPrice: number;
  maxResults: number;
  query: string;
};
type Result = {
  [paramName: string]: any;
};
type SearchResult = {
  id: string;
  query: string;
  maxPrice: number;
  results: AdsResults[] | void;
};

const queueTrigger: AzureFunction = async function (
  context: Context,
  myQueueItem: Query
): Promise<SearchResult | void> {
  context.log("Queue trigger function processed work item", myQueueItem);

  if (!isValidQuery(myQueueItem)) {
    return context.log(
      "Query is Invalid... Ignoring Query. Should be Deleted from Storage"
    );
  }
  const kijijiQuery = buildQuery(myQueueItem);
  const options = {
    maxResults: kijijiQuery.maxResults,
    pageDelayMs: 1500,
    scrapeResultDetails: true,
  } as SearchOptions;
  const params = {
    locationId: kijijiQuery.location,
    categoryId: kijijiQuery.category,
    q: kijijiQuery.query,
    maxPrice: kijijiQuery.maxResults,
  } as SearchParameters;

  const results = await search(params, options).catch((err) =>
    context.log("Kijiji Search has failed", err, JSON.stringify(kijijiQuery))
  );
  if (!results) return context.log("No results found for Query");
  const sanitizedResults = sanitizeResults(
    results,
    myQueueItem.queryString,
    myQueueItem.maxPrice
  );
  if (isEmpty(sanitizedResults)) return context.log("No results found");
  const searchResults: SearchResult = {
    id: myQueueItem.id,
    query: myQueueItem.queryString,
    maxPrice: myQueueItem.maxPrice,
    results: sanitizedResults,
  };
  return searchResults;
};

const sanitizeResults = (
  results: Ad[],
  query: string,
  maxPrice: number
): AdsResults[] => {
  let queryToCompare =
    query.length > 3
      ? query.substring(1, query.length - 1).toLowerCase()
      : query.toLowerCase();
  const filteredResults: Array<AdsResults> = results
    .filter((result) => result.attributes.price <= maxPrice)
    .filter(
      (result) =>
        !!result?.attributes?.location && !isEmpty(result.attributes.location)
    )
    .filter((result) => !isEmpty(result.url))
    .filter(
      (result) =>
        result.title.toLowerCase().includes(queryToCompare) ||
        result.description.toLowerCase().includes(queryToCompare)
    )
    .map(
      (result): AdsResults =>
        ({
          title: result.title,
          description: result.description,
          date: result.date,
          image: result.image,
          price: result.attributes.price,
          location: result.attributes.location,
          adUrl: result.url,
        } as AdsResults)
    );

  return filteredResults;
};

const isValidQuery = (query: Query): boolean => {
  if (isNull(query.location) || isEmpty(query.location)) return false;
  if (isNull(query.queryString) || isEmpty(query.queryString)) return false;
  if (isNull(query.id) || isEmpty(query.id)) return false;
  return true;
};

const buildQuery = (query: Query): kijijiQuery => {
  let validQuery = {} as kijijiQuery;
  validQuery.id = query.id;
  validQuery.maxPrice = query.maxPrice || 100;
  validQuery.maxResults = query.maxResults || 20;
  validQuery.query = query.queryString;
  if (query.location.toLowerCase() === "toronto") {
    validQuery.location = locations.ONTARIO.TORONTO_GTA;
  } else {
    validQuery.location = locations.ONTARIO;
  }
  switch (query.category.toLowerCase()) {
    case "cars":
      validQuery.category = categories.CARS_AND_VEHICLES.CARS_AND_TRUCKS;
      break;
    case "electronics":
      validQuery.category = categories.BUY_AND_SELL.ELECTRONICS;
      break;
    case "rent":
      validQuery.category = categories.REAL_ESTATE.FOR_RENT;
      break;
    case "jwellery":
      validQuery.category = categories.BUY_AND_SELL.JEWELLERY_AND_WATCHES;
      break;
    case "furniture":
      validQuery.category = categories.BUY_AND_SELL.FURNITURE;
      break;
    default:
      validQuery.category = categories.BUY_AND_SELL;
      break;
  }
  return validQuery;
};

export default queueTrigger;
