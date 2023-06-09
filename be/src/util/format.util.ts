export function isEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}
export function isPhoneNumber(phoneNumber: string) {
    const landlinePattern = /^0[2-9]\d{8}$/;
    const mobilePattern = /^0[3-9]\d{8}$/;
    const mobileWithAreaCodePattern = /^0[1-9]\d{9}$/;
    return landlinePattern.test(phoneNumber) || mobilePattern.test(phoneNumber) || mobileWithAreaCodePattern.test(phoneNumber);
}
