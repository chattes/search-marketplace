import {
  IAds,
  AdTypes,
  IURLChecker,
  OAds,
  AdMaker,
  IGenId,
  IDateValidator,
} from "./AdTypes";

const buildMakeAds = (
  urlChecker: IURLChecker,
  idGenerator: IGenId,
  dateValidator: IDateValidator
): AdMaker => {
  return function makeAds(ads: OAds): IAds {
    if (!ads.title) throw new Error("Title is required");
    if (!ads.url) throw new Error("URL Should be provided");
    if (!urlChecker.checkURL(ads.url)) throw new Error("Provide a valid url");
    if (!ads.date || !dateValidator.isDateValid(ads.date)) {
      throw new Error("A date must be provided");
    }
    const Ads: IAds = Object.freeze({
      getId: () =>
        ads.id ||
        idGenerator.generate(`${ads.title}${ads.date?.toISOString()}`),
      getTitle: () => ads.title || "",
      getDescription: () => ads.description || "",
      getImage: () => ads.image || "",
      getDate: () => ads.date || new Date(),
      getLocation: () => ads.location || "",
      getPrice: () => ads.price || 0,
      getAdType: () => ads.adType || AdTypes.OFFERED,
      getUrl: () => ads.url || "",
    });

    return Ads;
  };
};

export default buildMakeAds;
