import { IMakeAdsListFn } from "./use-cases-types";
import { IQueryHandler } from "../external-services/types";
declare const buildMakeListAds: (queryService: IQueryHandler) => IMakeAdsListFn;
export default buildMakeListAds;
