import { RouteConstant } from "@/constants/route_constant";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import index from "@/pages/index";

const CommonRoutes = [
    {
      path: RouteConstant.HOME_PAGE.path,
      name: RouteConstant.HOME_PAGE.name,
      component: index,
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
];
  
export default CommonRoutes;