<template>
    <div class="position-fixed top-0 w-100 border-thin bg-white d-flex" style="height: 10%; z-index: 1;">
        <div class="left-0 h-100 pa-2 cursor-pointer position-absolute" style="width: 5%;">
            <v-img class="h-100" src="/src/assets/logo.png"></v-img>
        </div>

        <div class="d-flex h-100 align-center position-absolute" style="margin-left: 10%;">
            <p 
                class="cursor-pointer text-center mr-16 div-text"
                @click="goTo(item.name)"
                v-for="item in headerItems">
                {{ $t(`${item.title}`) }}
            </p>
        </div>

        <div class="w-50 h-100 position-absolute right-0 d-flex justify-between" style="min-width: 50%;">
            <v-text-field
                class="h-100 align-center mt-2"
                :loading="loading"
                append-inner-icon="mdi-magnify"
                density="compact"
                :label="$t('search')"
                variant="outlined"
                hide-details
                single-line
                @click:append-inner="onClick">
            </v-text-field>

            <v-list class="d-flex">
                <v-list-item class="text-center" v-for="item in headerIconItems">
                    <v-icon class="cursor-pointer" size="25">{{ item.icon }}</v-icon>
                </v-list-item>
            </v-list>

            <v-menu v-if="userStore.isLoggedIn">
                <template v-slot:activator="{ props }">
                    <v-avatar class="text-center h-100 d-flex justify-end align-center mx-5 cursor-pointer" style="width: 15%;" v-bind="props">
                        <v-icon size="45" icon="mdi-account-circle"></v-icon>
                    </v-avatar>
                </template>

                <v-list class="pa-3" min-width="250px">
                    <v-list-item class="cursor-pointer">{{ userStore.userInfo }}</v-list-item>
                    <hr class="my-1">
                    <v-list-item v-for="(item, index) in menuItems" :key="index" :value="index">
                        <v-row class="w-100 h-100" @click="handleClick(item.name)" no-gutters>
                            <v-col cols="2">
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-col>

                            <v-col cols="10">
                                {{ $t(`${item.title}`) }}
                            </v-col>
                        </v-row>
                    </v-list-item>
                </v-list>
            </v-menu>

            <div v-else class="d-flex justify-end align-center mr-5" style="width: 18%;">
                <v-btn class="h-50 w-100" color="blue" size="large" variant="tonal" block @click="goTo(loginPage)">
                    {{ $t('login') }}
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import '@/styles/common.css';
import { HeaderIconItems, HeaderItems, MenuItems } from '@/constants/label_constant';
import { RouteConstant } from '@/constants/route_constant';
import { useUserStore } from '@/stores/app';
import { ACCESS_TOKEN } from '@/constants/security_constant';
import UserApi from '@/services/api/UserApi';

export default {
    data: () => ({
        userStore: null,
        headerItems: HeaderItems,
        headerIconItems: HeaderIconItems,
        menuItems: MenuItems,
        loginPage: RouteConstant.LOGIN_PAGE.name,
        loaded: false,
        loading: false,
    }),

    created() {
        this.userStore = useUserStore();
    },

    async mounted() {
        if(sessionStorage.getItem(ACCESS_TOKEN)) {
            const userInfo = await UserApi.getLoggedInUser();
            if(userInfo != null && userInfo.code === 200) {
                console.log(userInfo)
                const showName = userInfo.data.first_name + " " + userInfo.data.last_name;
                this.userStore.login(showName);
            }
        }
    },

    methods: {
        onClick() {
            this.loading = true

            setTimeout(() => {
            this.loading = false
            this.loaded = true
            }, 2000)
        },

        goTo(page) {
            this.$router.push({ name: page });
        },

        logout() {
            console.log("1")
            this.userStore.logout();
            sessionStorage.removeItem(SecurityConstant.ACCESS_TOKEN);
            sessionStorage.removeItem(SecurityConstant.REFRESH_TOKEN);
        },

        handleClick(name) {
            if(name === 'logout') {
                this.logout();
            }
        }
    },
}
</script>