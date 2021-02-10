import { Result } from "../../../shared/core/Result";
import { UseCases } from "../../../shared/core/UseCase";
import { User } from "../domain/User";
import { GetUserQueryDTO } from "./getUserQueryDTO";
declare type Response = Result<User>;
export declare class GetUserByEmailUseCase implements UseCases<GetUserQueryDTO, Promise<Response>> {
    execute(request?: GetUserQueryDTO): Promise<Response>;
}
export {};
