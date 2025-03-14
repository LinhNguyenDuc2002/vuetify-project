<template>
    <div class="bg-grey-lighten-3 w-100">
        <v-row v-if="!loading" justify="start" class="py-10" style="margin-left: 128px; margin-right: 128px;">
            <v-col cols="2" v-for="(item, index) in products" :key="index">
                <ProductItem :product="item"></ProductItem>
            </v-col>
        </v-row>

        <v-row v-else justify="start" class="py-10" style="margin-left: 128px; margin-right: 128px;">
            <v-col cols="2" v-for="index in number">
                <v-skeleton-loader
                class="border"
                max-width="300"
                height="300px"
                type="image, heading, subtitle, table-heading"
                ></v-skeleton-loader>
            </v-col>
        </v-row>

        <Pagination v-if="length > 1" :page="page" :length="length" @next-page="nextPage" class="mb-5"></Pagination>
    </div>


</template>

<script>
import { ITEM_OF_NUMBER_PER_PAGE } from '@/constants/variable_constant';
import ProductApi from '@/services/api/ProductApi';
import ProductItem from './product/ProductItem.vue';

export default {
    data() {
        return {
            number: ITEM_OF_NUMBER_PER_PAGE,
            loading: true,
            products: [],
            page: 1,
            length: null,
        }
    },

    mounted() {
        this.fetchProduct(this.page -1, null, null, null);
    },

    methods: {
        async fetchProduct(page, search, category, sort) {
            const response = await ProductApi.getAll(page, this.number, null, null, null);
            const data = response.data;
            if(data !== null && data.code === 200) {
                this.products = data.data.elements;
                console.log(this.products);
                this.page = data.page_number;
                this.lengh = data.total_page;
                this.loading = false;
            }
        },

        async nextPage(value) {
            await this.fetchProduct(value - 1, null, null, null);
        }
    }
}
</script>