/**
 * Validates Incoming HTTP Requests for Ad Search
 */
import { HttpRequest, IRequestValidator } from "../Types";
import Joi from "joi";

const searchSchema = Joi.object({
  location: Joi.string().required(),
  category: Joi.string().required(),
  search: Joi.string().required(),
  maxPrice: Joi.number(),
});

class SearchAdsRequestValidtor implements IRequestValidator {
  validateRequest(request: HttpRequest): void {
    const { value, error } = searchSchema.validate(request.query);
    console.log(value);
    if (error) throw new Error(error.message);
  }
}

export default SearchAdsRequestValidtor;
