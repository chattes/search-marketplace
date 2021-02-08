import { UseCases } from "../../../../shared/core/UseCase";
import { CreateAdsAueryDTO } from "./createAdsQueryDTO";
import QueryLocation from "../../AdsSearch/QueryLocation";
import QueryString from "../../AdsSearch/QueryString";
import { LocationCAValidator } from "../../AdsSearch/ValidationServices";
import { AdsQuery } from "../../AdsSearch/AdsQuery";
import { IdGenerator } from "../../utils/index";
import { Result } from "../../../../shared/core/Result";
import { IAdsQueryRepo } from "../../repos/AdsQuery";

type Response = Result<any> | Result<void>;

export class CreateAdsQueryUseCase
  implements UseCases<CreateAdsAueryDTO, Promise<Response>> {
    private _adsRepo;
  constructor(adsRepo: IAdsQueryRepo) {
    this.execute = this.execute.bind(this);
    this._adsRepo = adsRepo;
  }
  toDomain(request: CreateAdsAueryDTO): Result<AdsQuery> {
    const locationValidator = LocationCAValidator.getInstance();
    const qLocation = QueryLocation.create(
      request?.location || "",
      locationValidator
    );
    if (!qLocation.isSuccess) {
      return Result.fail(qLocation.message);
    }

    const qString = QueryString.create(request?.query || "");
    if (!qString.isSuccess) {
      return Result.fail(qString.message);
    }

    const AdQuery = AdsQuery.create(
      {
        location: qLocation.getValue(),
        query: qString.getValue(),
        filters: {
          maxPrice: request?.maxPrice || 9999,
          category: request?.category || "",
          maxResults: request?.maxResults || 20,
        },
      },
      new IdGenerator()
    );
    return AdQuery;
  }
  async execute(request?: CreateAdsAueryDTO): Promise<Response> {
    if (!request) {
      Result.fail("Request cannot be empty");
    }
    const AdQuery = this.toDomain(request!);

    if (!AdQuery.isSuccess) {
      return Result.fail(AdQuery.message);
    }


    const saveResult = await this._adsRepo.save(AdQuery.getValue())
    if(!saveResult){
      return Result.fail("Your Query was not saved!");
    }

    let val: void = undefined;
    return Result.ok<void>(val);
  }
}
