import { AdTypes, OAds } from "../ads/AdTypes";
import { IQueryHandler, QueryRequest } from "../external-services/types";
import buildMakeListAds from "./list-ads";

class FakeQueryHandler implements IQueryHandler {
  Data: any;
  constructor(data: any) {
    this.Data = data;
  }
  getAdsService = (query: QueryRequest): Promise<OAds[]> => {
    return new Promise((resolve, reject) => {
      if (this.Data instanceof Error) {
        reject(this.Data);
      }
      if (typeof this.Data === "object") {
        resolve([this.Data]);
      }
    });
  };
}

let FakeQuery: any = null;

describe("List Ads", () => {
  it("should list ads", async () => {
    let successAdResponse: OAds = {
      title: "This is a test ad",
      description: "Description of Test Ad",
      url: "https://test-ad.test",
      price: 200,
      image: "http://image-1.com",
      location: "Toronto",
      adType: AdTypes.OFFERED,
      date: new Date(),
    };
    FakeQuery = new FakeQueryHandler(successAdResponse);
    const makeAdsList = buildMakeListAds(FakeQuery);
    const query: QueryRequest = {
      queryString: "test",
      location: "TORONTO",
      category: "TEST",
    };
    const AdsResults = await makeAdsList(query);
    expect(AdsResults.length).toBe(1);
    expect(AdsResults[0].getAdType()).toBe(AdTypes.OFFERED);
  });
  it("Should Throw Error", async () => {
    FakeQuery = new FakeQueryHandler(new Error("Bad Data"));
    const makeAdsList = buildMakeListAds(FakeQuery);
    const query: QueryRequest = {
      queryString: "test",
      location: "TORONTO",
      category: "TEST",
    };
    await expect(makeAdsList(query)).rejects.toThrow("Bad Data");
  });
});
