import { RouteConstant } from "./route_constant";

export const AdminToolBarItems = [
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
        title: 'settings',
        icon: 'mdi-cog-outline',
        path: RouteConstant.LANGUAGE_PAGE.path,
    },
];

export const UserToolBarItems = [
    {
        title: 'toolbar.my_account',
        icon: 'mdi-account-outline',
        child: [
            {
                title: 'toolbar.profile',
                icon: 'mdi-account-edit-outline',
                path: RouteConstant.USER_DETAIL_PAGE.path
            },
            {
                title: 'toolbar.address',
                icon: 'mdi-map-marker-outline',
                path: RouteConstant.ADDRESS_DETAIL_PAGE.path
            },
            {
                title: 'toolbar.change_password',
                icon: 'mdi-onepassword',
                path: RouteConstant.CHANGE_PASSWORD_PAGE.path
            },
            {
                title: 'toolbar.change_email',
                icon: 'mdi-email-outline',
                path: RouteConstant.CHANGE_EMAIL_PAGE.path
            },
        ]
    },
    {
        title: 'view_orders',
        icon: 'mdi-list-box-outline',
        path: RouteConstant.ORDER_PAGE.path
    },
    {
        title: 'view_carts',
        icon: 'mdi-cart-outline',
        path: RouteConstant.CART_PAGE.path,
    },
    {
        title: 'settings',
        icon: 'mdi-cog-outline',
        path: RouteConstant.LANGUAGE_PAGE.path,
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
        title: 'my_account',
        icon: 'mdi-account-outline',
        name: RouteConstant.USER_DETAIL_PAGE.name
    },
    {
        title: 'view_orders',
        icon: 'mdi-list-box-outline',
        path: ''
    },
    // {
    //     title: 'settings',
    //     icon: 'mdi-cog-outline',
    // },
    {
        title: 'help',
        icon: 'mdi-help-circle-outline',
        path: ''
    },
    {
        title: 'logout',
        icon: 'mdi-logout',
        name: 'logout'
    },
];
