<template>
    <div>
        <v-card class="pa-10 bg-white rounded position-relative">
            <div class="d-flex align-center position-absolute top-0 left-0 w-100 order-type" style="height: 50px;">
                <a class="h-100">Tất cả</a>
                <a class="h-100">Chờ xác nhận</a>
                <a class="h-100">Chờ thanh toán</a>
                <a class="h-100">Đang giao hàng</a>
                <a class="h-100">Hoàn thành</a>
                <a class="h-100">Đã hủy</a>
                <a class="h-100">Trả hàng/ Hoàn tiền</a>
            </div>

            <div>

            </div>
            <table class="w-100 cart-table">
                <thead class="bg-white border-b-thin">
                    <tr>
                        <th style="width: 5%;">
                            <v-checkbox hide-details></v-checkbox>
                        </th>
                        <th class="text-start pl-3" style="width: 40%;">Sản phẩm</th>
                        <th class="text-start pl-3" style="width: 15%;">Đơn giá</th>
                        <th class="text-center pl-3" style="width: 20%;">Số lượng</th>
                        <th class="text-start pl-3" style="width: 15%;">Thành tiền</th>
                        <th class="text-start pl-3" style="width: 5%;"></th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>
                            <v-checkbox hide-details></v-checkbox>
                        </td>
                        <td class="px-3 d-flex align-center">
                            <v-row :gutter="8">
                                <v-col cols="3">
                                    <Image class="w-100 h-100" :imageUrl="imageUrl"></Image>
                                </v-col>

                                <v-col cols="5" class="d-flex align-center">
                                    <p>sản phẩm 1 shay ahgsa a</p>
                                </v-col>

                                <v-col cols="4" class="d-flex align-center">
                                    <p>Phân loại: L - Nâu</p>
                                </v-col>
                            </v-row>
                        </td>
                        <td class="px-3">125 000 000</td>
                        <td class="px-3">
                            <v-row class="h-100 w-100" no-gutters>
                                <v-col cols="4">
                                    <v-btn class="border-thin pa-0 w-100" elevation="0"><v-icon>mdi-minus</v-icon></v-btn>
                                </v-col>

                                <v-col cols="4">
                                    <input class="border-thin px-2 h-100 w-100" type="number" min="1"/>
                                </v-col>

                                <v-col cols="4">
                                    <v-btn class="border-thin pa-0 w-100" elevation="0"><v-icon>mdi-plus</v-icon></v-btn>
                                </v-col>
                            </v-row>
                        </td>
                        <td class="px-3">125 000 000</td>
                        <td class="px-3"><v-icon class="cursor-pointer">mdi-trash-can-outline</v-icon></td>
                    </tr>

                    <tr>
                        <td>
                            <v-checkbox hide-details></v-checkbox>
                        </td>
                        <td class="px-3 d-flex align-center">
                            <v-row :gutter="8">
                                <v-col cols="3">
                                    <Image class="w-100 h-100" :imageUrl="imageUrl"></Image>
                                </v-col>

                                <v-col cols="5" class="d-flex align-center">
                                    <p>sản phẩm 1 shay ahgsa a</p>
                                </v-col>

                                <v-col cols="4" class="d-flex align-center">
                                    <p>Phân loại: L - Nâu</p>
                                </v-col>
                            </v-row>
                        </td>
                        <td class="px-3">125 000 000</td>
                        <td class="px-3">
                            <v-row class="h-100 w-100" no-gutters>
                                <v-col cols="4">
                                    <v-btn class="border-thin pa-0 w-100" elevation="0"><v-icon>mdi-minus</v-icon></v-btn>
                                </v-col>

                                <v-col cols="4">
                                    <input class="border-thin px-2 h-100 w-100" type="number" min="1"/>
                                </v-col>

                                <v-col cols="4">
                                    <v-btn class="border-thin pa-0 w-100" elevation="0"><v-icon>mdi-plus</v-icon></v-btn>
                                </v-col>
                            </v-row>
                        </td>
                        <td class="px-3">125 000 000</td>
                        <td class="px-3"><v-icon class="cursor-pointer">mdi-trash-can-outline</v-icon></td>
                    </tr>
                </tbody>
            </table>
        </v-card>
    </div>
</template>

<script>
import Image from '../common/Image.vue';
import imageUrl from '@/assets/avatar.webp';
export default {
    data() {
        return {
            imageUrl
        }
    },
}
</script>

<style>
.order-type a {
    flex: 1; 
    text-align: center; 
    padding: 10px; 
    box-sizing: border-box;
}
</style>