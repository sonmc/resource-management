export function handleSearchText(text) {
    let phone = '';
    let email = '';
    let name = text;
    const phoneRegex = /^0\d{9}$/;
    const isValidPhoneNumber = phoneRegex.test(text);
    if (isValidPhoneNumber) {
        phone = text;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    const isValidEmail = emailRegex.test(email);
    if (isValidEmail) {
        email = text;
    }

    return {
        phone,
        email,
        name,
    };
}
