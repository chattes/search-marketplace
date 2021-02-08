import { HttpRequest, HttpResponse, IController } from "../../services/Types";
import { CreateAdsQueryUseCase } from "../../use-cases/CreateAds/createAdsQueryUseCase";
import { CreateAdsAueryDTO } from "../../use-cases/CreateAds/createAdsQueryDTO";

const buildCreateAdsQuery = (saveQuery: CreateAdsQueryUseCase): IController => {
  return async function saveQueryAds(
    httpRequest: HttpRequest
  ): Promise<HttpResponse> {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const result = await saveQuery.execute({
        location: httpRequest?.body?.location,
        category: httpRequest?.body?.category,
        maxPrice: httpRequest?.body?.maxPrice,
        query: httpRequest?.body?.search,
        maxResults: httpRequest?.body?.maxResults,
      } as CreateAdsAueryDTO);

      if (!result.isSuccess) {
        return {
          headers,
          statusCode: 400,
          body: {
            error: result.message,
          },
        };
      }

      return {
        headers,
        statusCode: 200,
        body: {},
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

export default buildCreateAdsQuery;
