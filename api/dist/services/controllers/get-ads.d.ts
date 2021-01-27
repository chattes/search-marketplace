import { IController, IRequestValidator } from "../../services/Types";
import { IMakeAdsListFn } from "../../use-cases/use-cases-types";
declare const makeGetAds: (listAds: IMakeAdsListFn, validtor: IRequestValidator) => IController;
export default makeGetAds;
