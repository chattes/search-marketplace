import { Result } from "../../../shared/core/Result";
import { UserEmail } from "./UserEmail";
interface Userprops {
    email: UserEmail;
}
export declare class User {
    private _id;
    private _props;
    get id(): string;
    get props(): Userprops;
    private constructor();
    private static generateId;
    static create(userprops: Userprops): Result<User>;
}
export {};
