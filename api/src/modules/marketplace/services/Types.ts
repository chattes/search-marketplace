// TODO Correct types for body etc
export type HttpRequest = {
  body: any;
  query: any;
  params: any;
  ip: string;
  method: string;
  path: string;
  headers: any;
};

export type HttpResponse = {
  headers: any;
  statusCode: number;
  body: any;
};
export type IController = (request: HttpRequest) => Promise<HttpResponse>;

export interface IRequestValidator {
  validateRequest(request: HttpRequest): void;
}
