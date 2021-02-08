import { IAds, QueryRequest } from "../../ads/AdTypes";
import {
  HttpRequest,
  HttpResponse,
  IController,
  IRequestValidator,
} from "../../services/Types";
import { IMakeAdsListFn } from "../../use-cases/use-cases-types";

const makeGetAds = (
  listAds: IMakeAdsListFn,
  validtor: IRequestValidator
): IController => {
  return async function getAds(
    httpRequest: HttpRequest
  ): Promise<HttpResponse> {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      validtor.validateRequest(httpRequest);
      const query: QueryRequest = {
        location: httpRequest.query.location,
        category: httpRequest.query.category,
        maxPrice: httpRequest.query.maxPrice,
        queryString: httpRequest.query.search,
      };
      const ads: Array<IAds> = await listAds(query);
      const adsResponse = ads.map((ad) => ({
        id: ad.getId(),
        title: ad.getTitle(),
        description: ad.getDescription(),
        type: ad.getAdType(),
        price: ad.getPrice(),
        url: ad.getUrl(),
        location: ad.getLocation(),
        date: ad.getDate(),
        image: ad.getImage(),
      }));

      return {
        headers,
        statusCode: 200,
        body: adsResponse,
      };
    } catch (error) {
      return {
        headers,
        statusCode: 400,
        body: {
          error: error.message,
        },
      };
    }
  };
};

export default makeGetAds;
