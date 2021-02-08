import { Result } from "../../../shared/core/Result";
import { ILocationValidationService } from "./ValidationServices";
export default class QueryLocation {
    _location: string;
    private constructor();
    static create(location: string, locationValidationService: ILocationValidationService): Result<QueryLocation>;
}
