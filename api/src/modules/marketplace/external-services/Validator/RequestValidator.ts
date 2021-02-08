import { QueryRequest } from "../../ads/AdTypes";
import { IQueryValidator} from "../types";

class RequestQueryValidator implements IQueryValidator {
  validateQuery(query: QueryRequest): QueryRequest | Error {
    let validatedQuery: QueryRequest = query;
    if (!validatedQuery.location || validatedQuery.location === "") {
      throw new Error("Location is required");
    }
    if (!validatedQuery.category || validatedQuery.category === "") {
      throw new Error("Category is required");
    }
    if (!validatedQuery.maxResults || validatedQuery.maxResults === 0) {
      validatedQuery.maxResults = 20;
    }
    if (!validatedQuery.maxPrice || validatedQuery.maxPrice === 0) {
      validatedQuery.maxPrice = undefined;
    }
    if (!validatedQuery.queryString) {
      validatedQuery.queryString = "";
    }
    return validatedQuery;
  }
}


export default RequestQueryValidator;
