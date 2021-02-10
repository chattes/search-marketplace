import { AdsQuery } from "../../AdsSearch/AdsQuery";
import { IAdsQueryRepo } from "../AdsQuery";
import { User } from "../../../user/domain/User";
export declare class AzureBlobAdsQueryRepo implements IAdsQueryRepo {
    private static azureConnection;
    private blobClient;
    private constructor();
    static getInstance(): IAdsQueryRepo;
    save(query: AdsQuery, user: User): Promise<boolean>;
    getQueriesByUser(user: User): Promise<never[]>;
    delete(query: AdsQuery): Promise<boolean>;
}
