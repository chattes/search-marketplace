import { OAds } from "../../ads/AdTypes";
import { IQueryHandler } from "../types";
import { QueryRequest } from "../../ads/AdTypes";
declare class GetKijijiAds implements IQueryHandler {
    constructor();
    getAdsService(query: QueryRequest): Promise<OAds[]>;
    private mapLocation;
    private mapCategories;
    private searchAds;
    private validate;
}
export default GetKijijiAds;
