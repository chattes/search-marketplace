export declare class Result<T> {
    isSuccess: boolean;
    message: string;
    private value;
    private constructor();
    getValue(): T;
    static ok<U>(value: U): Result<U>;
    static fail<U>(errorMessage: string): Result<U>;
}
