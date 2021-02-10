import { Result } from "../../../shared/core/Result";
export interface UserEmailProps {
    emailId: string;
}
export declare class UserEmail {
    private _emailId;
    private constructor();
    get emailId(): string;
    private static isEmailValid;
    private static formatEmail;
    static create(userEmail: UserEmailProps): Result<UserEmail>;
}
