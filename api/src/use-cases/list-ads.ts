import { IMakeAdsListFn } from "./use-cases-types";
import { IAds, OAds } from "../ads/AdTypes";
import makeAds from "../ads";
import { IQueryHandler, QueryRequest } from "../external-services/types";
const buildMakeListAds = (queryService: IQueryHandler): IMakeAdsListFn => {
  return async function makeListAds(query: QueryRequest): Promise<Array<IAds>> {
    const results: Array<OAds> = await queryService.getAdsService(query);
    const ResultAds: Array<IAds> = results
      .map((ad) => makeAds(ad))
      .filter((ad) => ad.getPrice() !== 0);

    return ResultAds;
  };
};

export default buildMakeListAds;
