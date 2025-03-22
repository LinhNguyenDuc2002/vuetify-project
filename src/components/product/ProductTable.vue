<template>
    <div class="pa-10 bg-white rounded mb-4">
        <div class="d-flex justify-between align-center mb-5">
            <div class="w-25 mr-auto">
                <v-text-field
                    class="h-100 align-center"
                    :loading="loading"
                    append-inner-icon="mdi-magnify"
                    density="compact"
                    :label="$t('search')"
                    variant="outlined"
                    hide-details
                    single-line
                    @click:append-inner="onClick">
                </v-text-field>
            </div>

            <div class="w-25 d-flex justify-end align-center">
                <!-- <v-btn class="mr-auto" style="width: 45%;" color="blue" @click="changeOpenDialog(true)">
                    <v-icon class="mr-3">mdi-plus</v-icon>{{ $t('button.add') }}
                </v-btn> -->

                <v-btn class="btn" style="width: 45%; height: 40px;" size="large" elevation="0" @click="deleteSelected()">
                    <v-icon class="mr-3" size="20">mdi-trash-can-outline</v-icon>{{ $t('button.delete') }}
                </v-btn>
            </div>
        </div>

        <div class="border-thin">
            <table class="w-100 my-table">
                <thead>
                    <tr>
                        <th style="width: 5%;">
                            <v-checkbox
                                v-model="selectAll"
                                @change="toggleSelectAll"
                                hide-details>
                            </v-checkbox>
                        </th>
                        <th class="text-start pl-3" style="width: 30%;">{{ $t('product.name') }}</th>
                        <th class="text-start pl-3" style="width: 10%;">{{ $t('product.price') }}</th>
                        <th class="text-start pl-3" style="width: 10%;">{{ $t('product.quantity') }}</th>
                        <th class="text-start pl-3" style="width: 10%;">{{ $t('product.quantity') }}</th>
                        <th class="text-start pl-3" style="width: 20%;">{{ $t('product.category') }}</th>
                        <th class="text-start pl-3" style="width: 10%;">{{ $t('product.status') }}</th>
                        <th class="text-start pl-3" style="width: 5%;"></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(item, index) in products" :key="index" class="cursor-pointer" @click="showProduct(item.id, index)"
                        :class="{ 'background-chosen': selectedIndex === index }">
                        <td>
                            <v-checkbox
                                v-model="selected"
                                :value="index"
                                hide-details>
                            </v-checkbox>
                        </td>
                        <td class="px-3">{{ item.name }}</td>
                        <td class="px-3">
                            {{ item.minPrice == item.maxPrice ? item.minPrice : item.minPrice + ' - ' + item.maxPrice }}
                        </td>
                        <td class="px-3">{{ item.sold }}</td>
                        <td class="px-3">{{ item.quantity }}</td>
                        <td class="px-3">{{ item.category.name }}</td>
                        <td class="px-3">{{ item.status }}</td>
                        <td class="px-3"><v-icon>mdi-pencil-box-outline</v-icon></td>
                    </tr>
                </tbody>
            </table>

            <PaginationTable :size="size" :page="page" :total="total" @update-size="updateSize" @update-page="updatePage"></PaginationTable>
        </div>
    </div>

    <UpdateProduct v-if="selectedProduct" :idProduct="selectedProduct" :categories="categories"
        @update-selected-product="updateSelectedProduct">
    </UpdateProduct>
</template>

<script>
import ProductApi from '@/services/api/ProductApi';
import UpdateProduct from './update/UpdateProduct.vue';
import CategoryApi from '@/services/api/CategoryApi';
import ProductDetailList from './update/ProductDetailList.vue';

export default {
    components: {
        UpdateProduct,
    },
    data() {
        return {
            products: [],
            selected: [],
            selectAll: false,
            categories: [],
            size: 5,
            page: 1,
            total: 0,
            search: '',
            selectedCategory: null,
            sort: null,
            selectedProduct: null,
            selectedIndex: null
        }
    },

    watch: {
        size: function() {
            this.page = 1;
            this.fetchProducts();
        },
        page: function() {
            this.fetchProducts();
        },
        selectedProduct(value) {
            if(value) {
                const detail = this.$refs.table;
                window.scrollTo({
                    top: detail.clientHeight + 80,
                    behavior: 'smooth',
                });
            }
            else {
                window.scrollTo({
                    top: 0, // Cuộn đến đầu trang
                    behavior: 'smooth',
                });

                this.selectedIndex = null;
                this.selectedProduct = null;
            }
        }
    },

    methods: {
        toggleSelectAll() {
            if (this.selectAll) {
                this.selected = this.categories.map((item, index) => index);
            } else {
                this.selected = [];
            }
        },

        async fetchCategories() {
            const response = await CategoryApi.getAll('');
            if(response != null && response.code === 200) {
                this.categories = response.data;
            }
        },

        async fetchProducts() {
            const response = await ProductApi.getAll(this.page - 1, this.size, this.search, this.selectedCategory, this.sort);
            if(response != null && response.code === 200) {
                this.products = response.data['elements'];
                this.total = response.data['total_page'];
            }
        },

        async showProduct(id, index) {
            this.selectedIndex = index;
            this.selectedProduct = id;
        },

        updateSize(size) {
            this.size = size;
        },

        updatePage(page) {
            this.page = page;
        },

        updateSelectedProduct(value) {
            this.selectedProduct = value;
        }
    },

    mounted() {
        this.fetchProducts();
        this.fetchCategories();
    }
}
</script>
