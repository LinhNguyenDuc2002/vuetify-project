<template>
    <div>
        <v-card class="pa-10 bg-white rounded">
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

        <v-card class="pa-10 bg-white rounded position-fixed" style="z-index: 1; right: 16px; left: 21%; bottom: 16px;">
            <div class="w-100 d-flex justify-end mb-3 pb-3 border-b-thin">
                <div class="w-50 d-flex justify-space-between">
                    <p>Voucher</p>
                    <a href="#">Chọn hoặc nhập mã</a>
                </div>
            </div>

            <div class="w-100 d-flex justify-space-between">
                <div class="d-flex align-center justify-space-between w-50">
                    <v-checkbox label="Chọn tất cả" hide-details></v-checkbox>
                    <v-btn>Xóa</v-btn>
                    <v-btn style="width: fit-content;">Bỏ sản phẩm không hoạt động</v-btn>
                </div>

                <div class="d-flex align-center">
                    <p class="mr-5">Tổng cộng (0 sản phẩm): 0đ</p>
                    <v-btn class="text-center" size="large" data-mdb-ripple-init style="background-color: #dd4b39; color: white;" type="submit" elevation="0">
                        Mua hàng
                    </v-btn>
                </div>
            </div>
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
.cart-table th, td {
    border: none;
}

.cart-table td {
    padding: 50px 0px;
}
</style>