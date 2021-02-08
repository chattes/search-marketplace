import { QueryRequest } from "../ads/AdTypes";
import { IAds } from "../ads/AdTypes";
export declare type IMakeAdsListFn = (query: QueryRequest) => Promise<Array<IAds>>;
