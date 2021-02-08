import { IGenId, IQuery, IQueryValidator, QueryRequest } from "./AdTypes";

const buildMakeQuery = (validator: IQueryValidator, hashFunction: IGenId) => {
  return function makeQuery(query: QueryRequest): IQuery {
    let { isValid, message } = validator.validate(query);
    if (!isValid && message) {
      throw new Error(message);
    }
    if (!isValid && !message) {
      throw new Error("The Query is Invalid!");
    }

    let searchQuery: IQuery = {
      getQueryId: () => "",
      getLocation: () => query.location.toUpperCase(),
      getCategory: () => query.category.toUpperCase(),
      getMaxPrice: () => query.maxPrice || 5000,
      getQueryString: () => query.queryString || "",
    };

    searchQuery.getQueryId = () => {
      return hashFunction.generate(
        `${searchQuery.getLocation()}${searchQuery.getCategory()}${searchQuery
          .getMaxPrice()
          .toString()}${searchQuery.getQueryString().toLowerCase()}`
      );
    };
    return Object.freeze(searchQuery);
  };
};

export default buildMakeQuery;
