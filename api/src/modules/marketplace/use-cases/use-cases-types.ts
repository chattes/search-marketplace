import {QueryRequest} from "../ads/AdTypes"
import {IAds} from "../ads/AdTypes"
export type IMakeAdsListFn = (query: QueryRequest)  => Promise<Array<IAds>>
