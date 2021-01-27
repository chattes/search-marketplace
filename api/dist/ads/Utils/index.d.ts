import { IGenId, IURLChecker } from "../AdTypes";
export declare class urlChecker implements IURLChecker {
    checkURL(url: string | undefined): boolean;
}
export declare class IdGenerator implements IGenId {
    generate(input?: string): string;
}
