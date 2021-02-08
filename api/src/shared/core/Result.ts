import _ from "lodash";
export class Result<T> {
  /* tslint:disable:no-unused-variable */
  public isSuccess: boolean;
  public message: string;
  private value: T;

  private constructor(isSuccess: boolean, message?: string, value?: T) {
    this.isSuccess = isSuccess;
    if (isSuccess && _.isNull(value)) {
      throw new Error("Need value for Success");
    }
    if (!isSuccess && _.isEmpty(message)) {
      throw new Error("Need a message for Failure");
    }
    this.message = message!;
    this.value = value!;
  }

  public getValue(): T {
    if (this.isSuccess) {
      return this.value;
    } else {
      throw new Error("Cannot get value for Error");
    }
  }

  public static ok<U>(value: U) {
    return new Result<U>(true, undefined, value);
  }
  public static fail<U>(errorMessage: string) {
    return new Result<U>(false, errorMessage);
  }
}
