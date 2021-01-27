import { QueryRequest } from "../external-services/types";
import { IAds } from "../ads/AdTypes";
export declare type IMakeAdsListFn = (query: QueryRequest) => Promise<Array<IAds>>;
