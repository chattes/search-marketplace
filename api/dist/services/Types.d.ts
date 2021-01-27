export declare type HttpRequest = {
    body: any;
    query: any;
    params: any;
    ip: string;
    method: string;
    path: string;
    headers: any;
};
export declare type HttpResponse = {
    headers: any;
    statusCode: number;
    body: any;
};
export declare type IController = (request: HttpRequest) => Promise<HttpResponse>;
export interface IRequestValidator {
    validateRequest(request: HttpRequest): void;
}
