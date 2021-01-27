export enum AdTypes {
  OFFERED = "OFFERED",
}
export interface IAds {
  getId(): string;
  getTitle(): string;
  getDescription(): string;
  getImage(): string;
  getDate(): Date;
  getLocation(): string;
  getPrice(): Number;
  getAdType(): AdTypes;
  getUrl(): string;
}

export interface IGenId {
  generate(input?: string): string;
}

export interface IDateValidator {
  isDateValid(dateString: Date): boolean
}

export type AdMaker = (ads: OAds) => IAds;

export interface IURLChecker {
  checkURL(url: string | undefined): boolean;
}

export type OAds = {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  date?: Date;
  location?: string;
  price?: Number;
  adType?: AdTypes;
  url?: string;
};

export const Location = {
  TORONTO: "TORONTO",
  BARRIE: "BARRIE",
  GUELPH: "GUELPH",
};

export const Categories = {
  CARS: "CARS",
  HOUSE: "HOUSE",
  ANYTHING: "BUY AND SELL",
};
