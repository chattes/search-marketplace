import { User } from "../../user/domain/User";
import { AdsQuery } from "../AdsSearch/AdsQuery";

export interface IAdsQueryRepo {
    save(query: AdsQuery, user: User): Promise<boolean>
    getQueriesByUser(user: User): Promise<Array<any>>
    delete(query: AdsQuery) : Promise<boolean>
}
