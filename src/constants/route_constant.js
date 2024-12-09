const HOME_PATH = "";
const ADMIN_PATH = "/admin";

const LOGIN_PATH = HOME_PATH + "/login";
const SIGNUP_PATH = HOME_PATH + "/signup";
const OTP_PATH = HOME_PATH + "/verify-otp";

const ADD_PRODUCT_PATH = ADMIN_PATH + "/product/add";
const PRODUCT_LIST_PATH = ADMIN_PATH + "/product/all";

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
    }
};