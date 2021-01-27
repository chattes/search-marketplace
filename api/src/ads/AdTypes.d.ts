export declare enum AdTypes {
    OFFERED = "OFFERED"
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
    isDateValid(dateString: Date): boolean;
}
export declare type AdMaker = (ads: OAds) => IAds;
export interface IURLChecker {
    checkURL(url: string | undefined): boolean;
}
export declare type OAds = {
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
export declare const Location: {
    TORONTO: string;
    BARRIE: string;
    GUELPH: string;
};
export declare const Categories: {
    CARS: string;
    HOUSE: string;
    ANYTHING: string;
};
