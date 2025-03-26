const HOME_PATH = "";
const ADMIN_PATH = "/admin";
const USER_PATH = "/user"

const LOGIN_PATH = HOME_PATH + "/login";
const SIGNUP_PATH = HOME_PATH + "/signup";
const OTP_PATH = HOME_PATH + "/verify-otp";
const PRODUCT_DETAIL_PATH = HOME_PATH + "/product/:id";

const USER_DETAIL_PATH = USER_PATH + "/account/profile";
const ADDRESS_DETAIL_PATH = USER_PATH + "/account/address";
const CHANGE_PASSWORD_PATH = USER_PATH + "/account/password";
const CHANGE_EMAIL_PATH = USER_PATH + "/account/email"

const ADD_PRODUCT_PATH = ADMIN_PATH + "/product/add";
const PRODUCT_LIST_PATH = ADMIN_PATH + "/product/all";
const CATEGORY_TABLE_PATH = ADMIN_PATH + "/category/all";

export const RouteConstant = {
    HOME_PAGE: {
        path: HOME_PATH,
        name: 'HomePage',
    },
    LOGIN_PAGE: {
        path: LOGIN_PATH,
        name: 'LoginPage',
    },
    SIGNUP_PAGE: {
        path: SIGNUP_PATH,
        name: 'SignupPage',
    },
    OTP_PAGE: {
        path: OTP_PATH,
        name: 'OTPPage',
    },
    PRODUCT_DETAIL_PAGE: {
        path: PRODUCT_DETAIL_PATH,
        name: 'ProductDetailPage'
    },

    // Authenticate
    USER_HOME_PAGE: {
        path: USER_PATH,
    },
    USER_DETAIL_PAGE: {
        path: USER_DETAIL_PATH,
        name: 'UserDetailPage'
    },
    ADDRESS_DETAIL_PAGE: {
        path: ADDRESS_DETAIL_PATH,
        name: 'AddressDetailPage'
    },
    CHANGE_PASSWORD_PAGE: {
        path: CHANGE_PASSWORD_PATH,
        name: 'ChangePasswordPage'
    },
    CHANGE_EMAIL_PAGE: {
        path: CHANGE_EMAIL_PATH,
        name: 'ChangeEmailPage'
    },

    // Admin
    ADMIN_HOME_PAGE: {
        path: ADMIN_PATH,
        name: 'AdminHomePage',
    },
    ADD_PRODUCT_PAGE: {
        path: ADD_PRODUCT_PATH,
        name: 'AddProduct',
    },
    PRODUCT_LIST_PAGE: {
        path: PRODUCT_LIST_PATH,
        name: 'ProductList'
    },
    CATEGORY_TABLE_PAGE: {
        path: CATEGORY_TABLE_PATH,
        name: 'CategoryTable'
    }
};