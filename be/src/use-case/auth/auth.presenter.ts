import { Min, Max } from 'class-validator';
export class AuthPresenter {
    @Min(0)
    @Max(10)
    username: string = '';
    @Min(1)
    password: string = '';
}
