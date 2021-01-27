import { OAds } from "../ads/AdTypes";
export type QueryRequest = {
  location: string;
  category: string;
  maxPrice?: number;
  queryString?: string;
  maxResults?: number;
};

export interface IQueryHandler {
  getAdsService(query: QueryRequest): Promise<Array<OAds>>;
}

export interface IQueryValidator {
  validateQuery(query: QueryRequest): Error | QueryRequest;
}
