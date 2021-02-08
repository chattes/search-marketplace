import moment from "moment";
import kijiji, { search, locations, categories } from "kijiji-scraper";
import { AdTypes, IDateValidator, OAds } from "../../ads/AdTypes";
import { IQueryHandler } from "../types";
import { QueryRequest } from "../../ads/AdTypes";
import RequestQueryValidator from "../Validator/RequestValidator";
import { Location, Categories } from "../../ads/AdTypes";

class DateValidator implements IDateValidator {
  isDateValid(dateString: Date): boolean {
    return moment(dateString).isValid();
  }
}

class GetKijijiAds implements IQueryHandler {
  constructor() {
    this.getAdsService = this.getAdsService.bind(this);
    this.searchAds = this.searchAds.bind(this);
    this.validate = this.validate.bind(this);
    this.mapCategories = this.mapCategories.bind(this);
    this.mapLocation = this.mapLocation.bind(this);
  }
  async getAdsService(query: QueryRequest): Promise<OAds[]> {
    let queryKijiji = {
      ...query,
      ...{
        location: this.mapLocation(query.location),
        category: this.mapCategories(query.category),
      },
    };
    let validatedQuery: any = this.validate(queryKijiji);

    const results: Array<kijiji.Ad> = await this.searchAds(validatedQuery);
    return results
      .filter((kijijiAd) => {
        const dValidator = new DateValidator();
        return dValidator.isDateValid(new Date(kijijiAd.date));
      })
      .map(
        (result: kijiji.Ad): OAds => {
          let searchResult: OAds = {};
          searchResult.title = result.title;
          searchResult.date = new Date(result.date);
          searchResult.description = result.description;
          searchResult.image = result.image;
          searchResult.url = result.url;
          searchResult.price = result?.attributes?.price || 0;
          searchResult.adType = result?.attributes?.type || AdTypes.OFFERED;
          searchResult.location = result?.attributes?.location || "Unknown";
          return searchResult;
        }
      );
  }

  private mapLocation(location: string): any {
    switch (location) {
      case Location.TORONTO:
        return locations.ONTARIO.TORONTO_GTA;
      case Location.BARRIE:
        return locations.ONTARIO.BARRIE;
      case Location.GUELPH:
        return locations.ONTARIO.GUELPH;
      default:
        return locations;
    }
  }

  private mapCategories(category: string): any {
    switch (category) {
      case Categories.CARS:
        return categories.CARS_AND_VEHICLES;
      case Categories.HOUSE:
        return categories.REAL_ESTATE;
      default:
        return categories;
    }
  }

  private async searchAds(query: QueryRequest): Promise<any> {
    try {
      const params: kijiji.SearchParameters = {
        locationId: query.location as any,
        categoryId: query.category as any,
        maxPrice: query.maxPrice,
        // adType: "OFFER",
        q: query.queryString,
      };

      const searchOptions: kijiji.SearchOptions = {
        maxResults: query.maxResults || 20,
        scrapeResultDetails: true,
        pageDelayMs: 1500,
      };
      const results = await search(params, searchOptions);

      return results;
    } catch (error) {
      // TODO - Generic logger - Research Hot To - Dependency Inversion/injection??
      console.log(error);
      return [];
    }
  }
  private validate(query: QueryRequest): Error | QueryRequest {
    let validator = new RequestQueryValidator();
    return validator.validateQuery(query);
  }
}

export default GetKijijiAds;
