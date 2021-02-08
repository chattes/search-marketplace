import { IGenId } from "../ads/AdTypes";
import QueryString from "./QueryString";
import QueryLocation from "./QueryLocation";
import { Result } from "../../../shared/core/Result";

export interface filterProps {
  [key: string]: any;
}
export interface IQueryEntity<T> {
  query: QueryString;
  location: QueryLocation;
  filters: T;
}

export class AdsQuery {
  private _query;
  private _location;
  private _filters;
  private _id;
  private constructor(
    queryRaw: IQueryEntity<filterProps>,
    idGenerator: IGenId
  ) {
    const stringyQuery = `${queryRaw.location._location}${
      queryRaw.query._query
    }${JSON.stringify(queryRaw.filters)}`;
    this._id = idGenerator.generate(stringyQuery);
    this._location = queryRaw.location._location;
    this._query = queryRaw.query._query;
    this._filters = queryRaw.filters;
  }

  get id() {
    return this._id;
  }

  get location() {
    return this._location;
  }

  get filters() {
    return this._filters;
  }

  get query(): string {
    return this._query;
  }
  public static create(
    query: IQueryEntity<filterProps>,
    idGenerator: IGenId
  ): Result<AdsQuery> {
    return Result.ok(new AdsQuery(query, idGenerator));
  }
}
