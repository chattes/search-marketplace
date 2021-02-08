import buildMakeAds from "./ads";
import {
  urlChecker,
  IdGenerator,
  dateValidator,
} from "../utils";

const hashFunction = new IdGenerator();

const makeAds = buildMakeAds(
  new urlChecker(),
  hashFunction,
  new dateValidator()
);

export default makeAds;
