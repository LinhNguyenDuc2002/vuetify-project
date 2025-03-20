<template>
    <div class="bg-grey-lighten-3 w-100">
        <div style="padding-top: 6%; padding-bottom: 3%; margin-left: 128px; margin-right: 128px;">
            <div class="d-flex bg-white pa-5 justify-space-between">
                <div style="width: 40%;">
                    <Image :imageUrl="imageUrl" class="d-flex border-thin text-center" style="height: 400px;"></Image>

                    <v-sheet class="w-100" elevation="0">
                        <v-slide-group v-model="model" class="pa-3" center-active show-arrows>
                            <v-slide-group-item v-for="item in product.image_urls" v-slot="{ isSelected, toggle }">
                                <v-card :class="isSelected ? 'border-chosen' : ''" class="ma-2 border-thin pa-2" height="80" width="80" @click="toggle" elevation="0">
                                    <Image :imageUrl="item"></Image>
                                </v-card>
                            </v-slide-group-item>

                            <v-slide-group-item v-for="item in product.product_types" v-slot="{ isSelected, toggle }">
                                <v-card :class="isSelected ? 'border-chosen' : ''" class="ma-2 border-thin pa-2" height="80" width="80" @click="toggle" elevation="0">
                                    <Image :imageUrl="item.image_url"></Image>
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
                            <!-- <p class="strikethrough price" style="font-size: 15px;">{{ formatVND(125000000) }}</p> -->
                            <p class="price" style="font-size: 20px;">{{ formatVND(price) }}</p>
                        </div>

                        <div class="mr-16 d-flex align-end">
                            <p class="text_size" style="color: grey;">Đã bán: {{ product.sold }}/{{ product.quantity }}</p>
                        </div>
                    </div>

                    <div v-for="(item, index) in product.features" :key="index" class="d-flex mb-5">
                        <div class="mr-3" style="width: 15%;">
                            <p>{{ item.name }}</p>
                        </div>

                        <div v-if="index === 0" v-for="type in product.product_types" :key="type.attribute_id"
                            class="d-flex" style="width: 85%; max-height: 50%; flex-wrap: wrap;">
                            <div :class="(type.attribute_id === type1) ? 'border-chosen' : ''" class="d-flex cursor-pointer pa-2 mx-2 mb-2 align-center border-chosen" style="height: 50px; width: fit-content"
                                @click="handleClickProduct(index)">
                                <Image :imageUrl="type.image_url" class="mr-2" style="width: 30px;"></Image>
                                <p>{{ type.name }}</p>
                            </div>
                        </div>

                        <div v-else v-for="type in item.attributes" :key="type.id" class="d-flex" style="width: 85%; max-height: 50%; flex-wrap: wrap;">
                            <div :class="{
                                    'bg-grey-lighten-3': !typeList.includes(type.id),
                                    'border-chosen': type.id === type2
                                }"
                                class="d-flex cursor-pointer pa-2 mx-2 mb-2 align-center" style="height: 50px; width: fit-content"
                                @click="handleClickProduct(index)">
                                <p>{{ type.value }}</p>
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
                            <p class="h-100 text-center" style="color: grey;">{{ quantity }} sản phẩm</p>
                        </div>
                    </div>

                    <div class="mb-5">
                        <p class="h-100" style="color: red;">{{ message }}</p>
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
import { formatVND } from '@/services/util/StringUtil';
import ProductApi from '@/services/api/ProductApi';

export default {
    data: () => ({
        model: ref(null),
        imageUrl: null,
        product: {},
        type1: '',
        type2: '',
        typeList: [],
        price: 0,
        quantity: 0,
        number: 0,
        message: ''
    }),

    computed: {
        productId() {
            return this.$route.params.id; // Lấy ID từ param
        }
    },

    async mounted() {
        await this.fetchProduct();
        this.imageUrl = this.product.image_urls[0];
        if(this.product.product_types.length > 0) {
            this.type1 = this.product.product_types[0].attribute_id;
        }
        else {
            this.quantity = this.product.quantity;
            this.price = this.product.price;
            return;
        }
        
        if(this.product.product_types[0].types.length > 0) {
            this.typeList = this.product.product_types[0].types
            .filter(type => type.quantity > 0)
            .map(type => type.attribute_id);
            this.type2 = this.typeList[0];
            const foundType = await this.product.product_types[0].types.find(type => type.attribute_id === this.type2);
            this.quantity = foundType.quantity;
            this.price = foundType.price;
        }
        else {
            const foundType = this.product.product_types.find(type => type.attribute_id === this.type1);
            this.quantity = foundType.quantity;
            this.price = foundType.price;
        }
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
        },

        handleClickProduct(index) {
            if(index === 0) {

            }
            else {

            }
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