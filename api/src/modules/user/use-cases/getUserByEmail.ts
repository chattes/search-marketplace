import { Result } from "../../../shared/core/Result";
import { UseCases } from "../../../shared/core/UseCase";
import { User } from "../domain/User";
import { UserEmail } from "../domain/UserEmail";
import { GetUserQueryDTO } from "./getUserQueryDTO";

type Response = Result<User>;

export class GetUserByEmailUseCase
  implements UseCases<GetUserQueryDTO, Promise<Response>> {
  async execute(request?: GetUserQueryDTO): Promise<Response> {
    if (!request)
      return Result.fail<User>("Invalid Request while creating user");
    const userEmail = UserEmail.create({ emailId: request?.email || "" });
    if (!userEmail.isSuccess) {
      return Result.fail<User>(userEmail.message);
    }

    const user = User.create({ email: userEmail.getValue() });

    if (!user.isSuccess) {
      return Result.fail<User>(user.message);
    }

    return Result.ok<User>(user.getValue());
  }
}
