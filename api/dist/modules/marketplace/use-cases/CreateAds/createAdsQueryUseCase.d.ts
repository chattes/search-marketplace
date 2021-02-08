import { UseCases } from "../../../../shared/core/UseCase";
import { CreateAdsAueryDTO } from "./createAdsQueryDTO";
import { AdsQuery } from "../../AdsSearch/AdsQuery";
import { Result } from "../../../../shared/core/Result";
import { IAdsQueryRepo } from "../../repos/AdsQuery";
declare type Response = Result<any> | Result<void>;
export declare class CreateAdsQueryUseCase implements UseCases<CreateAdsAueryDTO, Promise<Response>> {
    private _adsRepo;
    constructor(adsRepo: IAdsQueryRepo);
    toDomain(request: CreateAdsAueryDTO): Result<AdsQuery>;
    execute(request?: CreateAdsAueryDTO): Promise<Response>;
}
export {};
