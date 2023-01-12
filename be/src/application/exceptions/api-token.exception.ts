import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiTokenException extends HttpException {
    constructor() {
        super('Token is required', HttpStatus.PAYMENT_REQUIRED);
    }
}
