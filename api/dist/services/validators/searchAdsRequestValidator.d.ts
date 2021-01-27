/**
 * Validates Incoming HTTP Requests for Ad Search
 */
import { HttpRequest, IRequestValidator } from "../Types";
declare class SearchAdsRequestValidtor implements IRequestValidator {
    validateRequest(request: HttpRequest): void;
}
export default SearchAdsRequestValidtor;
