import makeGetAds from "./get-ads";
import { makeAdsList } from "../../use-cases";
import { IController } from "../Types";
import { SearchAdsRequestValidator } from "../validators";

export const getAds: IController = makeGetAds(
  makeAdsList,
  new SearchAdsRequestValidator()
);
