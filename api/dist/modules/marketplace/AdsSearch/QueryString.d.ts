import { Result } from "../../../shared/core/Result";
export default class QueryString {
    _query: string;
    private constructor();
    static create(query: string): Result<QueryString>;
}
