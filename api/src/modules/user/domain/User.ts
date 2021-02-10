import { Result } from "../../../shared/core/Result"
import { UserEmail} from "./UserEmail"
import getUuid from 'uuid-by-string'
interface Userprops {
    email: UserEmail,
}

export class User {
    private _id: string
    private _props: Userprops

    public get id(): string {
        return this._id
    }

    public get props(): Userprops {
        return this._props
    } 

    private constructor(props: Userprops, id: string){
        this._props = props
        this._id = id 
    }
    private static generateId(input: string): string{
        return getUuid(input, 3)
    }
    public static create(userprops: Userprops) {
        const user = new User(userprops, this.generateId(userprops.email.emailId))
        return Result.ok<User>(user)
    }
}