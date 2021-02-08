import { Result } from "../../../shared/core/Result";
import _ from "lodash";

export default class QueryString {
  public _query: string;

  private constructor(query: string) {
    this._query = query;
  }
  public static create(query: string): Result<QueryString> {
    let _query = query ? query.trim() : null;

    if (_.isNil(_query) || _.isEmpty(_query)) {
      return Result.fail<QueryString>("Query is required");
    }

    if (_query.length > 30) {
      return Result.fail<QueryString>(
        "Query cannot be greater than 30 characters"
      );
    }
    return Result.ok<QueryString>(new QueryString(_query));
  }
}
