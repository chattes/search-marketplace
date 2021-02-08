import { IURLChecker, AdMaker, IGenId, IDateValidator } from "./AdTypes";
declare const buildMakeAds: (urlChecker: IURLChecker, idGenerator: IGenId, dateValidator: IDateValidator) => AdMaker;
export default buildMakeAds;
