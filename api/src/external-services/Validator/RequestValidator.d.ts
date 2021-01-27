import { IQueryValidator, QueryRequest } from "../types";
declare class RequestQueryValidator implements IQueryValidator {
    validateQuery(query: QueryRequest): QueryRequest | Error;
}
export default RequestQueryValidator;
