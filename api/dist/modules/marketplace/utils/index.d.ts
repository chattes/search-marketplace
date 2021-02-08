import { IDateValidator, IGenId, IURLChecker } from "../ads/AdTypes";
export declare class urlChecker implements IURLChecker {
    checkURL(url: string | undefined): boolean;
}
export declare class IdGenerator implements IGenId {
    generate(input?: string): string;
}
export declare class dateValidator implements IDateValidator {
    isDateValid(dateString: Date): boolean;
}
