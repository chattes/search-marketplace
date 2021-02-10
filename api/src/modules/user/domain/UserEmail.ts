import { Result } from "../../../shared/core/Result";

export interface UserEmailProps {
  emailId: string;
}

export class UserEmail {
  private _emailId: string;
  private constructor(props: UserEmailProps) {
    this._emailId = props.emailId;
  }
  get emailId(): string {
    return this._emailId;
  }
  private static isEmailValid(email: string): boolean {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  private static formatEmail(email: string): string {
    return email.trim().toLowerCase();
  }
  public static create(userEmail: UserEmailProps): Result<UserEmail> {
    if (!this.isEmailValid(userEmail.emailId)) {
      return Result.fail<UserEmail>("Email Id is not valid");
    }
    return Result.ok<UserEmail>(
      new UserEmail({ emailId: this.formatEmail(userEmail.emailId) })
    );
  }
}
