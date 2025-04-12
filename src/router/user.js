import { RouteConstant } from "@/constants/route_constant";
import UserLayout from "@/layouts/UserLayout.vue";
import AddressDetailPage from "@/pages/address/AddressDetailPage.vue";
import CartPage from "@/pages/cart/CartPage.vue";
import OrderListPage from "@/pages/order/OrderListPage.vue";
import LanguagePage from "@/pages/system/LanguagePage.vue";
import ChangeEmailPage from "@/pages/user/ChangeEmailPage.vue";
import ChangePasswordPage from "@/pages/user/ChangePasswordPage.vue";
import UserDetailPage from "@/pages/user/UserDetailPage.vue";

const UserRoutes = {
    path: RouteConstant.USER_HOME_PAGE.path,
    component: UserLayout,
    children: [
        {
            path: RouteConstant.USER_DETAIL_PAGE.path,
            name: RouteConstant.USER_DETAIL_PAGE.name,
            component: UserDetailPage,
        },
        {
            path: RouteConstant.ADDRESS_DETAIL_PAGE.path,
            name: RouteConstant.ADDRESS_DETAIL_PAGE.name,
            component: AddressDetailPage,
        },
        {
            path: RouteConstant.CHANGE_PASSWORD_PAGE.path,
            name: RouteConstant.CHANGE_PASSWORD_PAGE.name,
            component: ChangePasswordPage,
        },
        {
            path: RouteConstant.CHANGE_EMAIL_PAGE.path,
            name: RouteConstant.CHANGE_EMAIL_PAGE.name,
            component: ChangeEmailPage,
        },
        {
            path: RouteConstant.CART_PAGE.path,
            name: RouteConstant.CART_PAGE.name,
            component: CartPage,
        },
        {
            path: RouteConstant.ORDER_PAGE.path,
            name: RouteConstant.ORDER_PAGE.name,
            component: OrderListPage,
        },
        {
            path: RouteConstant.LANGUAGE_PAGE.path,
            name: RouteConstant.LANGUAGE_PAGE.name,
            component: LanguagePage,
        },
    ],
};
  
export default UserRoutes;