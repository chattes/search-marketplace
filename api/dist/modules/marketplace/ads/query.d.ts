import { IGenId, IQuery, IQueryValidator, QueryRequest } from "./AdTypes";
declare const buildMakeQuery: (validator: IQueryValidator, hashFunction: IGenId) => (query: QueryRequest) => IQuery;
export default buildMakeQuery;
