import { QueryRequest } from "../../ads/AdTypes";
import { IQueryValidator } from "../types";

let kijijivalidator: IQueryValidator;

describe("Kijiji Query handler", () => {
  beforeAll(() => {
    class fakeQueryValidator implements IQueryValidator {
      validateQuery(query: QueryRequest): QueryRequest | Error {
        let validatedQuery: QueryRequest = query;
        if (!validatedQuery.location || validatedQuery.location === "") {
          throw new Error("Location is required");
        }
        if (!validatedQuery.category || validatedQuery.category === "") {
          throw new Error("Category is required");
        }
        if (!validatedQuery.maxResults || validatedQuery.maxResults === 0) {
          validatedQuery.maxResults = 20;
        }
        if (!validatedQuery.maxPrice || validatedQuery.maxPrice === 0) {
          validatedQuery.maxPrice = 200;
        }
        if (!validatedQuery.queryString) {
          validatedQuery.queryString = "";
        }
        return validatedQuery;
      }
    }
    kijijivalidator = new fakeQueryValidator();
  });
  it("it should validate required field location", () => {
    let q1: QueryRequest = {
      location: "",
      category: "",
    };
    expect(() => kijijivalidator.validateQuery(q1)).toThrow(
      "Location is required"
    );
  });
  it("it should validate required field category", () => {
    let q1: QueryRequest = {
      location: "TORONTO",
      category: "",
    };
    expect(() => kijijivalidator.validateQuery(q1)).toThrow(
      "Category is required"
    );
  });
  it("should default values for non-mandatory fields", () => {
    let q1: QueryRequest = {
      location: "TORONTO",
      category: "MUSIC",
    };
    expect((kijijivalidator.validateQuery(q1) as QueryRequest).maxResults).toBe(
      20
    );
    expect((kijijivalidator.validateQuery(q1) as QueryRequest).maxPrice).toBe(
      200
    );
    expect(
      (kijijivalidator.validateQuery(q1) as QueryRequest).queryString
    ).toBe("");
  });
});
