import { RouteConstant } from "@/constants/route_constant";
import AdminHomePage from "@/pages/admin/AdminHomePage.vue";

const AdminRoutes = [
    {
      path: RouteConstant.ADMIN_HOME_PAGE.path,
      name: RouteConstant.ADMIN_HOME_PAGE.name,
      component: AdminHomePage,
    },
];
  
export default AdminRoutes;