export default function authHeader() {
    const obj = JSON.parse(localStorage.getItem('authUser'));

    if (obj && obj.accessTokenCookie) {
        return { Authorization: obj.accessTokenCookie };
    } else {
        return {};
    }
}
