import {
  IDateValidator,
  IGenId,
  IURLChecker,
} from "../ads/AdTypes";
import ValidUrl from "valid-url";
import crypto from "crypto";
import moment from "moment";

export class urlChecker implements IURLChecker {
  checkURL(url: string | undefined): boolean {
    const urlToCheck: string = !!url ? url : "";
    const isValid = ValidUrl.isUri(urlToCheck) ? true : false;
    return isValid;
  }
}

export class IdGenerator implements IGenId {
  generate(input?: string): string {
    if (input) {
      return crypto.createHash("sha256").update(input).digest("hex");
    }
    // TODO Better Id Generation
    return crypto
      .createHash("sha256")
      .update(`RandomTitle${new Date().toISOString()}`)
      .digest("hex");
  }
}

export class dateValidator implements IDateValidator {
  isDateValid(dateString: Date): boolean {
    let mDate = moment(dateString);
    return mDate.isValid();
  }
}
