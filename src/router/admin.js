import { RouteConstant } from "@/constants/route_constant";
import AdminLayout from "@/layouts/AdminLayout.vue";
import AdminHomePage from "@/pages/AdminHomePage.vue";
import AddProductPage from "@/pages/product/AddProductPage.vue";

const AdminRoutes = {
  path: RouteConstant.ADMIN_HOME_PAGE.path,
  component: AdminLayout,
  children: [
    {
      path: '',
      name: RouteConstant.ADMIN_HOME_PAGE.name,
      component: AdminHomePage,
    },
    {
      path: RouteConstant.ADD_PRODUCT_PAGE.path,
      name: RouteConstant.ADD_PRODUCT_PAGE.name,
      component: AddProductPage,
    },
  ],
};
  
export default AdminRoutes;