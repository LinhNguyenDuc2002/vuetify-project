import { RouteConstant } from "./route_constant";

export const ToolBarItems = [
    {
        title: 'toolbar.home',
        icon: 'mdi-home-outline',
    },

    {
        title: 'toolbar.category',
        icon: 'mdi-shape-outline',
        path: RouteConstant.CATEGORY_TABLE_PAGE.path
    },

    {
        title: 'toolbar.product',
        icon: 'mdi-shopping-outline',
        child: [
            {
                title: 'toolbar.product_list',
                icon: 'mdi-format-list-bulleted',
                path: RouteConstant.PRODUCT_LIST_PAGE.path
            },
            {
                title: 'toolbar.add_product',
                icon: 'mdi-plus',
                path: RouteConstant.ADD_PRODUCT_PAGE.path
            },
        ]
    },
    
    {
        title: 'mail_address',
        icon: 'mdi-chevron-up-circle',
    },
    {
        title: 'toolbar.dashboard',
        icon: 'mdi-view-dashboard-outline',
    },
    {
        title: 'repeat_your_password',
        icon: 'mdi-chevron-up-circle',
    },
    {
        title: 'sign_in_with_google',
        icon: 'mdi-chevron-up-circle',
    },
    {
        title: 'sign_in_with_facebook',
        icon: 'mdi-chevron-up-circle',
    },
    {
        title: 'create_an_account',
        icon: 'mdi-chevron-up-circle',
    },
    {
        title: 'mail_address',
        icon: 'mdi-chevron-up-circle',
    },
];

export const HeaderItems = [
    {
        title: 'home',
        name: RouteConstant.HOME_PAGE.name,
    },
    {
        title: 'product.category',
        name: RouteConstant.HOME_PAGE.name,
    },
    {
        title: 'about',
        name: RouteConstant.HOME_PAGE.name,
    },
];

export const HeaderIconItems = [
    {
        icon: 'mdi-cart-outline',
    },
    {
        icon: 'mdi-bell-outline',
    },
    {
        icon: 'mdi-chat-processing-outline',
    },
];

export const AdminHeaderIconItems = [
    {
        icon: 'mdi-bell-outline',
    },
    {
        icon: 'mdi-chat-processing-outline',
    },
];

export const MenuItems = [
    {
        title: 'view_orders',
        icon: 'mdi-list-box-outline',
    },
    {
        title: 'edit_profile',
        icon: 'mdi-account-edit-outline',
    },
    {
        title: 'settings',
        icon: 'mdi-cog-outline',
    },
    {
        title: 'help',
        icon: 'mdi-help-circle-outline',
    },
    {
        title: 'logout',
        icon: 'mdi-logout',
        name: 'logout'
    },
];
