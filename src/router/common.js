import { RouteConstant } from "@/constants/route_constant";
import LoginPage from "@/pages/auth/LoginPage.vue";
import SignupPage from "@/pages/auth/SignupPage.vue";
import OTPPage from "@/pages/auth/OTPPage.vue";
import index from "@/pages/index.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const CommonRoutes = {
    path: RouteConstant.HOME_PAGE.path,
    component: DefaultLayout,
    children: [
        {
            path: '',
            name: RouteConstant.HOME_PAGE.name,
            component: index,
            meta: { breadcrumb: 'toolbar.home' },
        },
        {
            path: RouteConstant.LOGIN_PAGE.path,
            name: RouteConstant.LOGIN_PAGE.name,
            component: LoginPage,
        },
        {
            path: RouteConstant.SIGNUP_PAGE.path,
            name: RouteConstant.SIGNUP_PAGE.name,
            component: SignupPage,
        },
        {
            path: RouteConstant.OTP_PAGE.path,
            name: RouteConstant.OTP_PAGE.name,
            component: OTPPage,
            beforeEnter: (to, from, next) => {
                if (from.path === RouteConstant.SIGNUP_PAGE.path) {
                    next();
                } else {
                    next(false);
                }
            },
        },
    ],
};
  
export default CommonRoutes;