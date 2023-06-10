"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPhoneNumber = exports.isEmail = void 0;
function isEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}
exports.isEmail = isEmail;
function isPhoneNumber(phoneNumber) {
    const landlinePattern = /^0[2-9]\d{8}$/;
    const mobilePattern = /^0[3-9]\d{8}$/;
    const mobileWithAreaCodePattern = /^0[1-9]\d{9}$/;
    return landlinePattern.test(phoneNumber) || mobilePattern.test(phoneNumber) || mobileWithAreaCodePattern.test(phoneNumber);
}
exports.isPhoneNumber = isPhoneNumber;
