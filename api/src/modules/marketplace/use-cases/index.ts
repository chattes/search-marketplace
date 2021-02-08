import GetKijijiAds from "../external-services/provider/kijiji";
import buildMakeListAds from "./list-ads";
import { IMakeAdsListFn } from "./use-cases-types";

export const makeAdsList: IMakeAdsListFn = buildMakeListAds(new GetKijijiAds());
