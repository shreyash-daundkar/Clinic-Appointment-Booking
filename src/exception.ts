export class HttpException extends Error {

    error: any;
    statusCode: number;

    constructor(message: string, error: any, statusCode: number) {
        super(message);
        this.error = error;
        this.statusCode = statusCode;
    };
}