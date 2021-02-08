import {
  IAds,
  IURLChecker,
  AdTypes,
  OAds,
  IGenId,
  IDateValidator,
} from "./AdTypes";
import buildMakeAds from "./ads";

class DateValidator implements IDateValidator {
  isDateValid(dateString: Date): boolean {
    return true;
  }
}

class urlChecker implements IURLChecker {
  constructor() {
    this.checkURL = this.checkURL.bind(this);
  }
  checkURL(url: string | undefined) {
    if (!url) return false;
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
    const result = urlRegex.test(url);
    return result;
  }
}

class IdGenerator implements IGenId {
  constructor() {
    this.generate = this.generate.bind(this);
  }
  generate(input?: string): string {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 20; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

describe("Ads", () => {
  it("Should Create Ads", () => {
    const adsMaker = buildMakeAds(
      new urlChecker(),
      new IdGenerator(),
      new DateValidator()
    );
    let fakeAd: OAds = {
      title: "Fake Title",
      url: "https://google.com/",
      date: new Date(),
    };
    const Ads: IAds = adsMaker(fakeAd);
    expect(Ads.getTitle()).toBe("Fake Title");
    expect(Ads.getAdType()).toBe(AdTypes.OFFERED);
    expect(Ads.getId()).toBeTruthy();
  });
  it("Should Validate Ad Created", () => {
    const URLChecker = new urlChecker();
    const adsMaker = buildMakeAds(
      URLChecker,
      new IdGenerator(),
      new DateValidator()
    );
    const fakeAd: OAds = {
      url: "httttttp://thunderbolt.com",
      title: "Title 2",
    };
    expect(() => adsMaker(fakeAd)).toThrowError("Provide a valid url");
    expect(() => adsMaker({})).toThrowError("Title is required");
    expect(() => adsMaker({ title: "Test1" })).toThrowError(
      "URL Should be provided"
    );
  });
});
