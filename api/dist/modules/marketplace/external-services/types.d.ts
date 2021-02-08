import { OAds, QueryRequest } from "../ads/AdTypes";
export interface IQueryHandler {
    getAdsService(query: QueryRequest): Promise<Array<OAds>>;
}
export interface IQueryValidator {
    validateQuery(query: QueryRequest): Error | QueryRequest;
}
