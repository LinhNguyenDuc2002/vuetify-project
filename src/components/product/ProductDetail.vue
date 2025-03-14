<template>
    <div class="bg-grey-lighten-3 w-100">
        <div style="padding-top: 6%; padding-bottom: 3%; margin-left: 128px; margin-right: 128px;">
            <div class="d-flex bg-white pa-5 justify-space-between">
                <div style="width: 40%;">
                    <Image :imageUrl="imageUrl" class="d-flex border-thin text-center" style="height: 400px;"></Image>

                    <v-sheet class="w-100" elevation="0">
                        <v-slide-group v-model="model" class="pa-3" center-active show-arrows>
                            <v-slide-group-item v-for="n in 15" :key="n" v-slot="{ isSelected, toggle }">
                                <v-card  :color="isSelected ? 'primary' : 'grey-lighten-1'" class="ma-2 border-thin" height="80" width="80" @click="toggle">
                                    <div class="d-flex fill-height align-center justify-center">
                                        <v-scale-transition>
                                            <v-icon v-if="isSelected" color="white" icon="mdi-close-circle-outline" size="48"></v-icon>
                                        </v-scale-transition>
                                    </div>
                                </v-card>
                            </v-slide-group-item>
                        </v-slide-group>
                    </v-sheet>
                </div>

                <div style="width: 55%;">
                    <div class="w-100">
                        <p class="product_name">{{ product.name }}</p>
                    </div>

                    <div class="d-flex mt-2 mb-5">
                        <div class="d-flex">
                            <p class="underline text_size">3.5</p>
                            <div class="ml-1">
                                <v-icon color="#FFAB00" size="18">mdi-star</v-icon>
                                <v-icon color="#FFAB00" size="18">mdi-star</v-icon>
                                <v-icon color="#FFAB00" size="18">mdi-star</v-icon>
                                <v-icon color="#FFAB00" size="18">mdi-star-half-full</v-icon>
                                <v-icon color="#FFAB00" size="18">mdi-star-outline</v-icon>
                            </div>
                        </div>

                        <p class="mx-5" style="color: grey;">|</p>

                        <div class="d-flex">
                            <p class="underline ">3.5</p>
                            <p class="mx-1 text_size" style="color: grey;">Đánh giá</p>
                        </div>
                    </div>

                    <div class="d-flex justify-space-between mb-5">
                        <div>
                            <p class="strikethrough price" style="font-size: 15px;">{{ formatVND(125000000) }}</p>
                            <p class="price" style="font-size: 20px;">{{ formatVND(123000000) }}</p>
                        </div>

                        <div class="mr-16 d-flex align-end">
                            <p class="text_size" style="color: grey;">Đã bán: {{ product.sold }}/{{ product.quantity }}</p>
                        </div>
                    </div>

                    <div class="d-flex mb-5">
                        <div class="mr-3" style="width: 15%;">
                            <p>Phân loại</p>
                        </div>

                        <div class="d-flex" style="width: 85%; max-height: 50%; flex-wrap: wrap;">
                            <div class="d-flex cursor-pointer pa-2 mx-2 mb-2 align-center border-chosen" style="height: 50px; width: fit-content">
                                <Image :imageUrl="imageUrl" class="mr-2" style="width: 30px;"></Image>
                                <p>aaaaa bbb </p>
                            </div>
                            <div class="d-flex border-thin cursor-pointer pa-2 mx-2 mb-2 align-center" style="height: 50px; width: fit-content">
                                <Image :imageUrl="imageUrl" class="mr-2" style="width: 30px;"></Image>
                                <p>aaaaa  c</p>
                            </div>
                            <div class="d-flex border-thin cursor-pointer pa-2 mx-2 mb-2 align-center" style="height: 50px; width: fit-content">
                                <Image :imageUrl="imageUrl" class="mr-2" style="width: 30px;"></Image>
                                <p>aaaaa</p>
                            </div>
                            <div class="d-flex border-thin cursor-pointer pa-2 mx-2 mb-2 align-center" style="height: 50px; width: fit-content">
                                <Image :imageUrl="imageUrl" class="mr-2" style="width: 30px;"></Image>
                                <p>aaaaa bbb </p>
                            </div>
                            <div class="d-flex border-thin cursor-pointer pa-2 mx-2 mb-2 align-center" style="height: 50px; width: fit-content">
                                <Image :imageUrl="imageUrl" class="mr-2" style="width: 30px;"></Image>
                                <p>aaaaa  c</p>
                            </div>
                            <div class="d-flex border-thin cursor-pointer pa-2 mx-2 mb-2 align-center" style="height: 50px; width: fit-content">
                                <Image :imageUrl="imageUrl" class="mr-2" style="width: 30px;"></Image>
                                <p>aaaaa</p>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex mb-5">
                        <div class="mr-3" style="width: 15%;">
                            <p>Số lượng</p>
                        </div>

                        <div class="d-flex mr-3" style="height: 40px;">
                            <v-btn class="border-thin h-100" elevation="0" @click="(number > 0) ? (number -= 1) : 0"><v-icon>mdi-minus</v-icon></v-btn>
                            <input class="h-100 border-thin mx-1 px-2" type="number" min="1" :value="number" style="width: 100px;"/>
                            <v-btn class="border-thin h-100" elevation="0" @click="increase()"><v-icon>mdi-plus</v-icon></v-btn>
                        </div>

                        <div>
                            <p class="h-100 text-center" style="color: red;">{{ message }}</p>
                        </div>
                    </div>

                    <div class="h-auto d-flex mt-auto">
                        <v-btn class="btn mr-5" style="width: 40%; height: 50px;" size="large" elevation="0">
                            <v-icon class="mr-3" size="20">mdi-cart-plus</v-icon>Thêm vào giỏ hàng
                        </v-btn>

                        <v-btn style="width: 40%; height: 50px;" color="blue" size="large" variant="tonal" elevation="0">
                            Mua ngay
                        </v-btn>
                    </div>
                </div>
            </div>

            <div>
                <p>Chi tiết sản phẩm</p>
            </div>

            <div>
                <p>Đánh giá</p>
            </div>

            <div>
                
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import imageUrl from '@/assets/draw1.webp';
import { formatVND } from '@/services/util/StringUtil';
import ProductApi from '@/services/api/ProductApi';

export default {
    data: () => ({
        model: ref(null),
        imageUrl,
        product: {},
        number: 0,
        message: ''
    }),

    computed: {
        productId() {
            return this.$route.params.id; // Lấy ID từ param
        }
    },

    mounted() {
        this.fetchProduct();
    },

    methods: {
        formatVND(value) {
            return formatVND(value);
        },

        increase() {
            if(this.number >= this.product.quantity) {
                this.message = 'Sản phẩm không đủ';
            }
            else {
                this.number += 1;
            }
        },

        formattedPrice() {
            const minPrice = this.product.min_price;
            const maxPrice = this.product.max_price;

            if (minPrice === maxPrice) {
                return this.formatVND(minPrice);
            } else {
                return `${this.formatVND(minPrice)} - ${this.formatVND(maxPrice)}`;
            }
        },

        async fetchProduct() {
            const response = await ProductApi.get(this.productId);
            const body = response.data;
            if(body !== null && body.code === 200) {
                this.product = body.data;
            }
            console.log(response);
        }
    }
}
</script>

<style>
.product_name {
    font-size: 20px;
    line-height: 24px;
    color: black;
    overflow-wrap: break-word;
}
.strikethrough {
  text-decoration: line-through; /* Gạch ngang chữ */
}
.underline {
    text-decoration: underline;
}
.text_size {
    font-size: 16px;
}
.btn {
    border: 1px solid #03A9F4;
    color: #2196F3;
}
</style>