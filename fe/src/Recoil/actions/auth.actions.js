import { Login, Register } from '../../Services/auth.service';

export function authActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/auth/`;

  return {
    login,
    logout,
    register,
  };

  function login({ username, password }) {
    return Login(baseUrl + 'login', { username, password }).then((res) => {
      localStorage.setItem('token', JSON.stringify(res.accessToken));
      localStorage.setItem('user', JSON.stringify(res.currentUser));
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
