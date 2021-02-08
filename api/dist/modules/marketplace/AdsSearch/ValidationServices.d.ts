export interface ILocationValidationService {
    validateLocation(location: string): boolean;
}
export declare class LocationCAValidator implements ILocationValidationService {
    private static _instance;
    private constructor();
    static getInstance(): LocationCAValidator;
    validateLocation(location: string): boolean;
}
