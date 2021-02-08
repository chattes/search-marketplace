import { AdsQuery } from "../../AdsSearch/AdsQuery";
import { IAdsQueryRepo } from "../AdsQuery";
export declare class AzureBlobAdsQueryRepo implements IAdsQueryRepo {
    private static azureConnection;
    private blobClient;
    private constructor();
    static getInstance(): IAdsQueryRepo;
    save(query: AdsQuery): Promise<boolean>;
    getQueriesByUser(user: any): Promise<never[]>;
    delete(query: AdsQuery): Promise<boolean>;
}
