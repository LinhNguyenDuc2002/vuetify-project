<template>
    <v-card width="400px" height="400px">
        <div class="position-relative h-100 w-100">
            <v-list class="w-100">    
                <v-list-item class="w-100 cursor-pointer py-2">
                    <v-row class="w-100" no-gutters>
                        <v-col cols="2">
                            <Image class="border-thin w-100" :imageUrl="imageUrl" style="height: 50px;"></Image>
                        </v-col>

                        <v-col cols="7" class="w-100 px-3 d-flex align-center">
                            <div>
                                <p class="w-100">Sản phẩm này ...</p>
                                <p class="w-100" style="font-size: 12px;">SL 2</p>
                            </div>
                        </v-col>

                        <v-col cols="3" class="d-flex align-center justify-center">
                            <p class="price">195.000đ</p>
                        </v-col>
                    </v-row>
                </v-list-item>

                <v-list-item class="w-100 cursor-pointer py-2">
                    <v-row class="w-100" no-gutters>
                        <v-col cols="2">
                            <Image class="border-thin w-100" :imageUrl="imageUrl" style="height: 50px;"></Image>
                        </v-col>

                        <v-col cols="7" class="w-100 px-3 d-flex align-center">
                            <div>
                                <p class="w-100">Sản phẩm này ...</p>
                                <p class="w-100" style="font-size: 12px;">SL 2</p>
                            </div>
                        </v-col>

                        <v-col cols="3" class="d-flex align-center justify-center">
                            <p class="price">195.000đ</p>
                        </v-col>
                    </v-row>
                </v-list-item>

                <v-list-item class="w-100 cursor-pointer py-2">
                    <v-row class="w-100" no-gutters>
                        <v-col cols="2">
                            <Image class="border-thin w-100" :imageUrl="imageUrl" style="height: 50px;"></Image>
                        </v-col>

                        <v-col cols="7" class="w-100 px-3 d-flex align-center">
                            <div>
                                <p class="w-100">Sản phẩm này ...</p>
                                <p class="w-100" style="font-size: 12px;">SL 2</p>
                            </div>
                        </v-col>

                        <v-col cols="3" class="d-flex align-center justify-center">
                            <p class="price">195.000đ</p>
                        </v-col>
                    </v-row>
                </v-list-item>

                <v-list-item class="w-100 cursor-pointer py-2">
                    <v-row class="w-100" no-gutters>
                        <v-col cols="2">
                            <Image class="border-thin w-100" :imageUrl="imageUrl" style="height: 50px;"></Image>
                        </v-col>

                        <v-col cols="7" class="w-100 px-3 d-flex align-center">
                            <div>
                                <p class="w-100">Sản phẩm này ...</p>
                                <p class="w-100" style="font-size: 12px;">SL 2</p>
                            </div>
                        </v-col>

                        <v-col cols="3" class="d-flex align-center justify-center">
                            <p class="price">195.000đ</p>
                        </v-col>
                    </v-row>
                </v-list-item>

                <v-list-item class="w-100 cursor-pointer py-2">
                    <v-row class="w-100" no-gutters>
                        <v-col cols="2">
                            <Image class="border-thin w-100" :imageUrl="imageUrl" style="height: 50px;"></Image>
                        </v-col>

                        <v-col cols="7" class="w-100 px-3 d-flex align-center">
                            <div>
                                <p class="w-100">Sản phẩm này ...</p>
                                <p class="w-100" style="font-size: 12px;">SL 2</p>
                            </div>
                        </v-col>

                        <v-col cols="3" class="d-flex align-center justify-center">
                            <p class="price">195.000đ</p>
                        </v-col>
                    </v-row>
                </v-list-item>
            </v-list>

            <div class="d-flex justify-space-between position-absolute bottom-0 px-4 mb-3 w-100">
                <p class="d-flex align-center" style="font-size: 12px;">37 mặt hàng</p>
                <v-btn color="blue" size="large" variant="tonal" elevation="0">Xem giỏ hàng</v-btn>
            </div>
        </div>

        <!-- <div>
            <Image></Image>

            <div>
                <v-btn>Login</v-btn>
            </div>
        </div> -->
    </v-card>
</template>

<script>
import Image from '../common/Image.vue';
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