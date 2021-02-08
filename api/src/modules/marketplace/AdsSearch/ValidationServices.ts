const canada = require("canada");

const cities: Array<string> = canada.cities.map((cityData: [string, string]) => cityData[0]);

export interface ILocationValidationService {
  validateLocation(location: string): boolean;
}

export class LocationCAValidator implements ILocationValidationService {
  private static _instance: LocationCAValidator;

  private constructor() {}

  public static getInstance() {
    if (this._instance) return this._instance;
    this._instance = new LocationCAValidator();
    return this._instance;
  }
  validateLocation(location: string): boolean {
    return cities.includes(location.toUpperCase());
  }
}
