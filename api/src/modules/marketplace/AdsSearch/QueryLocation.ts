import { Result } from "../../../shared/core/Result";
import _ from "lodash";
import { ILocationValidationService } from "./ValidationServices";

export default class QueryLocation {
  public _location: string;

  private constructor(location: string) {
    this._location = location;
  }
  public static create(
    location: string,
    locationValidationService: ILocationValidationService
  ): Result<QueryLocation> {
    let _location = location ? location.trim().toLowerCase() : null;

    if (_.isNil(_location) || _.isEmpty(_location)) {
      return Result.fail<QueryLocation>("City is required");
    }

    if (!locationValidationService.validateLocation(location)) {
      return Result.fail<QueryLocation>("Your location is not supported");
    }

    const queryLocation = new QueryLocation(_location.toLowerCase())
    return Result.ok<QueryLocation>(queryLocation);
  }
}
