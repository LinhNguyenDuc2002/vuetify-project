import { RouteConstant } from "@/constants/route_constant";
import UserLayout from "@/layouts/UserLayout.vue";
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
    ],
};
  
export default UserRoutes;