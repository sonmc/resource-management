import { validate } from 'class-validator';
import { AuthPresenter } from './auth.presenter';

async function authValidate(data: AuthPresenter) {
    const errors = await validate(data);
    if (errors.length > 0) {
        return { status: 'error', result: {} };
    }
    return { status: 'success', result: data };
}

export { authValidate };
