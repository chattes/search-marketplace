import makeGetAds from "./get-ads";
import { makeAdsList } from "../../use-cases";
import { IController } from "../Types";
import { SearchAdsRequestValidator } from "../validators";
import buildCreateAdsQuery from "./save-query";
import { CreateAdsQueryUseCase } from "../../use-cases/CreateAds/createAdsQueryUseCase";
import { AzureBlobAdsQueryRepo } from "../../repos/Implementation/AzureBlobAdsQuery";

export const getAds: IController = makeGetAds(
  makeAdsList,
  new SearchAdsRequestValidator()
);

const AdsQueryRepo = AzureBlobAdsQueryRepo.getInstance();

export const saveQuery: IController = buildCreateAdsQuery(
  new CreateAdsQueryUseCase(AdsQueryRepo)
);
