<template>
    <div style="height: 10%; z-index: 1;" class="position-fixed top-0 w-100 border-thin bg-white">
        <div class="w-50 h-100 d-flex position-absolute">
            <div class="h-100 w-25 pa-2 mr-5 cursor-pointer">
                <v-img class="h-100 w-auto" src="../assets/logo.png"></v-img>
            </div>

            <div class="w-75 d-flex h-100 pa-5 align-center">
                <p class="cursor-pointer text-center mr-16" v-for="item in headerItems">{{ $t(`${item.title}`) }}</p>
            </div>
        </div>

        <div class="w-50 h-100 position-absolute right-0 d-flex justify-between">
            <div class="w-75 h-100 d-flex justify-start align-center mr-10">
                <v-text-field
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
            </div>

            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-avatar class="text-center h-100 d-flex justify-end align-center mx-5 cursor-pointer" style="width: 15%;" v-bind="props">
                        <v-icon size="45" icon="mdi-account-circle"></v-icon>
                    </v-avatar>
                </template>

                <v-list class="pa-3" min-width="250px">
                    <v-list-item class="cursor-pointer">Linh Nguyen Duc</v-list-item>
                    <hr class="my-1">
                    <v-list-item v-for="(item, index) in menuItems" :key="index" :value="index">
                        <v-row class="w-100 h-100" no-gutters>
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

            <!-- <div class="d-flex justify-end align-center mx-5" style="width: 15%;">
                <v-btn class="h-50 w-100" color="blue" size="large" variant="tonal" block @click="goTo(loginPage)">
                    {{ $t('login') }}
                    <v-icon class="ml-2">mdi-login</v-icon>
                </v-btn>
            </div> -->
        </div>
    </div>
</template>

<script>
import { HeaderIconItems, HeaderItems, MenuItems } from '@/constants/label_constant';
import { RouteConstant } from '@/constants/route_constant';

export default {
    data: () => ({
        headerItems: HeaderItems,
        headerIconItems: HeaderIconItems,
        menuItems: MenuItems,
        loginPage: RouteConstant.LOGIN_PAGE.name,
        loaded: false,
        loading: false,
    }),

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
    },
}
</script>