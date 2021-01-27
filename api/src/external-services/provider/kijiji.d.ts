import { OAds } from "../../ads/AdTypes";
import { IQueryHandler, QueryRequest } from "../types";
declare class GetKijijiAds implements IQueryHandler {
    constructor();
    getAdsService(query: QueryRequest): Promise<OAds[]>;
    private mapLocation;
    private mapCategories;
    private searchAds;
    private validate;
}
export default GetKijijiAds;
