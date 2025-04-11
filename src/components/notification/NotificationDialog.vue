<template>
    <v-card width="400px" height="400px">
        <div class="position-relative h-100 w-100">
            <v-list class="w-100">    
                <v-list-item class="w-100 cursor-pointer py-2">
                    <v-row class="w-100 pa-2" no-gutters>
                        <v-col cols="1" class="w-100 d-flex align-center justify-start">
                            <v-icon>mdi-bell-outline</v-icon>
                        </v-col>
                        <v-col cols="11" class="w-100 d-flex align-center">
                            <div>
                                <p class="w-100 noti-title">Sản phẩm này ...</p>
                                <p class="w-100 noti-content">hãy cho tôi ahgahaaaaaaa ahgaaaaaaaa ahgaa hagha ahaga agha ahgha haga ahgah ayew aghsha ahsghas ashagshasa sashagshas avahdahdghagdha dagdahgdhad</p>
                                <div class="d-flex justify-end">
                                    <p style="font-size: 10px;">19:00 21/03/2025</p>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-list-item>

                <v-list-item class="w-100 cursor-pointer py-2">
                    <v-row class="w-100 pa-2" no-gutters>
                        <v-col cols="1" class="w-100 d-flex align-center justify-start">
                            <v-icon>mdi-bell-outline</v-icon>
                        </v-col>
                        <v-col cols="11" class="w-100 d-flex align-center">
                            <div>
                                <p class="w-100 noti-title">Sản phẩm này ...</p>
                                <p class="w-100 noti-content">hãy cho tôi ahgahaaaaaaa ahgaaaaaaaa ahgaa hagha ahaga agha ahgha haga ahgah ayew aghsha ahsghas ashagshasa sashagshas avahdahdghagdha dagdahgdhad</p>
                                <div class="d-flex justify-end">
                                    <p style="font-size: 10px;">19:00 21/03/2025</p>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-list-item>

                <v-list-item class="w-100 cursor-pointer py-2">
                    <v-row class="w-100 pa-2" no-gutters>
                        <v-col cols="1" class="w-100 d-flex align-center justify-start">
                            <v-icon>mdi-bell-outline</v-icon>
                        </v-col>
                        <v-col cols="11" class="w-100 d-flex align-center">
                            <div>
                                <p class="w-100 noti-title">Sản phẩm này ...</p>
                                <p class="w-100 noti-content">hãy cho tôi ahgahaaaaaaa ahgaaaaaaaa ahgaa hagha ahaga agha ahgha haga ahgah ayew aghsha ahsghas ashagshasa sashagshas avahdahdghagdha dagdahgdhad</p>
                                <div class="d-flex justify-end">
                                    <p style="font-size: 10px;">19:00 21/03/2025</p>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-list-item>

                <v-list-item class="w-100 cursor-pointer py-2">
                    <v-row class="w-100 pa-2" no-gutters>
                        <v-col cols="1" class="w-100 d-flex align-center justify-start">
                            <v-icon>mdi-bell</v-icon>
                        </v-col>
                        <v-col cols="11" class="w-100 d-flex align-center">
                            <div>
                                <p class="w-100 noti-title">Sản phẩm này ...</p>
                                <p class="w-100 noti-content">hãy cho tôi ahgahaaaaaaa ahgaaaaaaaa ahgaa hagha ahaga agha ahgha haga ahgah ayew aghsha ahsghas ashagshasa sashagshas avahdahdghagdha dagdahgdhad</p>
                                <div class="d-flex justify-end">
                                    <p style="font-size: 10px;">19:00 21/03/2025</p>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-list-item>
            </v-list>

            <div class="d-flex justify-end position-absolute bottom-0 px-4 mb-3 w-100" style="z-index: 1;">
                <p class="d-flex align-center" style="font-size: 15px;">Xem tất cả</p>
            </div>
        </div>
    </v-card>
</template>

<script>
import imageUrl from '@/assets/not_login.webp';

export default {
    data() {
        return {
            dialog: this.cartDialog,
            imageUrl
        }
    },

    props:{
        cartDialog: {
            type: Boolean,
            required: true
        },
    },
}
</script>

<style>
.noti-title {

}
.noti-content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 12px;
    line-height: 15px;
}
</style>