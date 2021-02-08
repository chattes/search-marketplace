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
export declare class AdsQuery {
    private _query;
    private _location;
    private _filters;
    private _id;
    private constructor();
    get id(): string;
    get location(): string;
    get filters(): filterProps;
    get query(): string;
    static create(query: IQueryEntity<filterProps>, idGenerator: IGenId): Result<AdsQuery>;
}
