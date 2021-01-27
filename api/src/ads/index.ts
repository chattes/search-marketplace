import moment from "moment"
import buildMakeAds from "./ads";
import { IDateValidator } from "./AdTypes";
import { urlChecker, IdGenerator } from "./Utils";

class dateValidator implements IDateValidator{
    isDateValid(dateString: Date): boolean {
        let mDate = moment(dateString)
        return mDate.isValid()
    }

}

const makeAds = buildMakeAds(new urlChecker(), new IdGenerator(), new dateValidator());

export default makeAds;
