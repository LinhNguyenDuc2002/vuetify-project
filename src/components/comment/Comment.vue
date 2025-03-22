<template>
    <div class="bg-white pa-5 w-100">
        <div class="w-100">
            <p class="sub-title bg-grey-lighten-3 w-100 rounded pa-3">Đánh giá sản phẩm</p>
        </div>

        <div class="d-flex align-center justify-space-between mb-5 w-100 pb-3 border-b-thin">
            <div class="d-flex">
                <p class="underline" style="font-size: 20px;">3.5</p>
                <div class="ml-1">
                    <v-icon color="#FFAB00" size="30">mdi-star</v-icon>
                    <v-icon color="#FFAB00" size="30">mdi-star</v-icon>
                    <v-icon color="#FFAB00" size="30">mdi-star</v-icon>
                    <v-icon color="#FFAB00" size="30">mdi-star-half-full</v-icon>
                    <v-icon color="#FFAB00" size="30">mdi-star-outline</v-icon>
                </div>
            </div>

            <div class="d-flex">
                <div class="d-flex cursor-pointer pa-2 mx-3 align-center justify-center border-thin" style="height: 40px; min-width: 100px">
                    Tất cả (100)
                </div>
                <div class="d-flex cursor-pointer pa-2 mx-3 align-center justify-center border-thin" style="height: 40px; min-width: 100px">
                    5<v-icon class="mx-1" color="#FFAB00" size="25">mdi-star</v-icon>(10)
                </div>
                <div class="d-flex cursor-pointer pa-2 mx-3 align-center justify-center border-thin" style="height: 40px; min-width: 100px">
                    4<v-icon class="mx-1" color="#FFAB00" size="25">mdi-star</v-icon>(10)
                </div>
                <div class="d-flex cursor-pointer pa-2 mx-3 align-center justify-center border-thin" style="height: 40px; min-width: 100px">
                    3<v-icon class="mx-1" color="#FFAB00" size="25">mdi-star</v-icon>(10)
                </div>
                <div class="d-flex cursor-pointer pa-2 mx-3 align-center justify-center border-thin" style="height: 40px; min-width: 100px">
                    2<v-icon class="mx-1" color="#FFAB00" size="25">mdi-star</v-icon>(10)
                </div>
                <div class="d-flex cursor-pointer pa-2 ml-3 align-center justify-center border-thin" style="height: 40px; min-width: 100px">
                    1<v-icon class="mx-1" color="#FFAB00" size="25">mdi-star</v-icon>(10)
                </div>
            </div>
        </div>

        <div>
            <div v-for="i in 3" class="d-flex pb-10 border-b-thin mx-3 mb-5">
                <div style="height: 45px; width: 45px; border-radius: 50%; background-color: black;" class="mr-2">
                    
                </div>

                <div>
                    <div>
                        <p style="font-size: 15px;">phamduthien</p>
                        <div>
                            <v-icon color="#FFAB00" size="15">mdi-star</v-icon>
                            <v-icon color="#FFAB00" size="15">mdi-star</v-icon>
                            <v-icon color="#FFAB00" size="15">mdi-star</v-icon>
                            <v-icon color="#FFAB00" size="15">mdi-star-half-full</v-icon>
                            <v-icon color="#FFAB00" size="15">mdi-star-outline</v-icon>
                        </div>
                    </div>

                    <div>
                        <p style="font-size: 12px; color: grey;">2025-02-10 18:12 | Phân loại hàng: Đen,M</p>
                    </div>

                    <div class="my-3">
                        <p>Hàng cũng ok!</p>
                    </div>

                    <div class="d-flex mb-3">
                        <div style="height: 70px; width: 70px;" class="border-thin mr-2"></div>
                        <div style="height: 70px; width: 70px;" class="border-thin mr-2"></div>
                        <div style="height: 70px; width: 70px;" class="border-thin mr-2"></div>
                        <div style="height: 70px; width: 70px;" class="border-thin mr-2"></div>
                    </div>

                    <div class="bg-grey-lighten-3 pa-3">
                        <p class="mb-2">Phản hồi của cửa hàng</p>

                        <p style="color: grey;">dạ cảm ơn bạn!</p>
                    </div>
                </div>
            </div>

            <Pagination></Pagination>
        </div>
    </div>
</template>

<script>
import Pagination from '../common/Pagination.vue';

</script>