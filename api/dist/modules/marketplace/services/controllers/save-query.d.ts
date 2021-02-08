import { IController } from "../../services/Types";
import { CreateAdsQueryUseCase } from "../../use-cases/CreateAds/createAdsQueryUseCase";
declare const buildCreateAdsQuery: (saveQuery: CreateAdsQueryUseCase) => IController;
export default buildCreateAdsQuery;
