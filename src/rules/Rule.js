import { ERROR_MESSAGE } from "@/constants/message_constants";

export const RequiredRule = [
    v => !!v || ERROR_MESSAGE.not_empty,
    v => (v.length <= 255) || ERROR_MESSAGE.maximum_length
];

export const SelectRule = [
    v => !!v || ERROR_MESSAGE.required_select,
];

export const PriceRule = [
    v => !!v || ERROR_MESSAGE.not_empty,
    v => !isNaN(Number(v)) || ERROR_MESSAGE.must_be_number,
    v => (Number(v) >= 0) || ERROR_MESSAGE.minimum_value,
    v => (Number(v) <= 1000000000000) || ERROR_MESSAGE.maximum_value
];

export const QuantityRule = [
    v => !!v || ERROR_MESSAGE.not_empty,
    v => Number.isInteger(Number(v)) || ERROR_MESSAGE.must_be_integer,
    v => (Number(v) >= 0) || ERROR_MESSAGE.minimum_value,
    v => (Number(v) <= 1000000000) || ERROR_MESSAGE.maximum_value
];

export const UsernameLoginRule = [
    v => !!v || ERROR_MESSAGE.username_not_empty,
    v => (typeof v === 'string' && v.trim() !== '') || ERROR_MESSAGE.username_not_empty,
];

export const PasswordLoginRule = [
    v => !!v || ERROR_MESSAGE.password_not_empty,
    v => (typeof v === 'string' && v.trim() !== '') || ERROR_MESSAGE.password_not_empty,
];