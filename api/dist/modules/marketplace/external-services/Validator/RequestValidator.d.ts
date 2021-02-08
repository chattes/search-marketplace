import { QueryRequest } from "../../ads/AdTypes";
import { IQueryValidator } from "../types";
declare class RequestQueryValidator implements IQueryValidator {
    validateQuery(query: QueryRequest): QueryRequest | Error;
}
export default RequestQueryValidator;
