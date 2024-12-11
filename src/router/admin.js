import { RouteConstant } from "@/constants/route_constant";
import AdminLayout from "@/layouts/AdminLayout.vue";
import AdminHomePage from "@/pages/AdminHomePage.vue";
import CategoryPage from "@/pages/category/CategoryPage.vue";
import AddProductPage from "@/pages/product/AddProductPage.vue";
import ProductListPage from "@/pages/product/ProductListPage.vue";

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
    {
      path: RouteConstant.PRODUCT_LIST_PAGE.path,
      name: RouteConstant.PRODUCT_LIST_PAGE.name,
      component: ProductListPage,
    },
    {
      path: RouteConstant.CATEGORY_TABLE_PAGE.path,
      name: RouteConstant.CATEGORY_TABLE_PAGE.name,
      component: CategoryPage,
    },
  ],
};
  
export default AdminRoutes;