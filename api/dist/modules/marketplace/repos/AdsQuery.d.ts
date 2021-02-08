import { AdsQuery } from "../AdsSearch/AdsQuery";
export interface IAdsQueryRepo {
    save(query: AdsQuery): Promise<boolean>;
    getQueriesByUser(user: any): Promise<Array<any>>;
    delete(query: AdsQuery): Promise<boolean>;
}
