import { ERROR_MESSAGE } from "@/constants/message";

export const RequiredRule = (maxLength, t) => [
    v => !!v || t(ERROR_MESSAGE.not_empty),
    v => (v.length <= maxLength) || t(ERROR_MESSAGE.maximum_length, { length: maxLength })
];

export const SelectionRule = (list, maxLength, t) => [
    v => !!v || t(ERROR_MESSAGE.not_empty),
    v => (v.length <= maxLength) || t(ERROR_MESSAGE.maximum_length, { length: maxLength }),
    v => !list.includes(v.toLowerCase()) || t(ERROR_MESSAGE.existed_selection)
];

export const SelectRule = (t) => [
    v => !!v || t(ERROR_MESSAGE.required_select),
];

export const FileRule = (size, t) => [
    v => !!v || t(ERROR_MESSAGE.required_file),
    v => v && v.size <= size * 1000000 || t(ERROR_MESSAGE.capacity_file, { size: size }),
    v => ['image/jpeg', 'image/png', 'application/pdf'].includes(v.type) || t(ERROR_MESSAGE.type_file),
];

export const PriceRule = (t) => [
    v => !!v || t(ERROR_MESSAGE.not_empty),
    v => !isNaN(Number(v)) || t(ERROR_MESSAGE.must_be_number),
    v => (Number(v) >= 0) || t(ERROR_MESSAGE.minimum_price),
    v => (Number(v) <= 1000000000000) || t(ERROR_MESSAGE.maximum_price, { price: 1000000000000 })
];

export const QuantityRule = (t) => [
    v => !!v || t(ERROR_MESSAGE.not_empty),
    v => Number.isInteger(Number(v)) || t(ERROR_MESSAGE.must_be_integer),
    v => (Number(v) >= 0) || t(ERROR_MESSAGE.minimum_quantity),
    v => (Number(v) <= 1000000000) || t(ERROR_MESSAGE.maximum_quantity, { quantity: 1000000000 })
];

export const UsernameLoginRule = [
    v => !!v || ERROR_MESSAGE.username_not_empty,
    v => !/\s/.test(v) || ERROR_MESSAGE.username_not_empty,
];

export const PasswordLoginRule = [
    v => !!v || ERROR_MESSAGE.password_not_empty,
    v => !/\s/.test(v) || ERROR_MESSAGE.password_not_empty,
];

export const UsernameRule = (t) => [
    v => !!v || t(ERROR_MESSAGE.username_not_empty),
    v => !/\s/.test(v) || t(ERROR_MESSAGE.username_no_spaces),
    v => (v.length <= 255) || t(ERROR_MESSAGE.maximum_length)
];

export const PasswordRule = (t) => [
    v => !!v || t(ERROR_MESSAGE.password_not_empty),
    v => !/\s/.test(v) || t(ERROR_MESSAGE.password_no_spaces),
    v => (v && v.length >= 8) || t(ERROR_MESSAGE.password_length),
    v => /[A-Z]/.test(v) || t(ERROR_MESSAGE.password_uppercase),
    v => /[a-z]/.test(v) || t(ERROR_MESSAGE.password_lowercase),
    v => /[0-9]/.test(v) || t(ERROR_MESSAGE.password_number),
    v => /[!@#$%^&*(),.?":{}|<>]/.test(v) || t(ERROR_MESSAGE.password_special),
    v => (v.length <= 255) || t(ERROR_MESSAGE.maximum_length)
];

export const RepeatPasswordRule = (password, t) => [
    v => !!v || t(ERROR_MESSAGE.password_not_empty),
    v => (v === password) || t(ERROR_MESSAGE.repeat_password),
];

export const EmailRule = (t) => [
    v => !!v || t(ERROR_MESSAGE.email_not_empty),
    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || t(ERROR_MESSAGE.email_invalid),
    v => !/\s/.test(v) || t(ERROR_MESSAGE.email_format),
];

export const BirthdayRule = (t) => [
    v => !!v || t(ERROR_MESSAGE.required_birthday),
    v => {
        const date = new Date(v);
        return !isNaN(date.getTime()) || t(ERROR_MESSAGE.date_invalid);
    },
    v => {
        const today = new Date();
        const birthDate = new Date(v);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        return age > 18 || (age === 18 && monthDifference >= 0) || t(ERROR_MESSAGE.age_not_enough);
    }
];

export const RadioRule = (t) => [
    v => !!v || t(ERROR_MESSAGE.required_radio),
];