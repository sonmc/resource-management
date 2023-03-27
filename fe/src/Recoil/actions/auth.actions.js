import { Login, Register } from '../../Services/auth.service';

export function authActions() {
    const baseUrl = `auth/`;

    return {
        login,
        logout,
        register,
    };

    function login({ username, password }) {
        return Login(baseUrl + 'login', { username, password }).then((res) => {
            return res;
        });
    }

    function logout() {
        return Login(baseUrl + 'login').then((res) => {
            return res;
        });
    }

    function register(user) {
        return Register(baseUrl, user);
    }
}
