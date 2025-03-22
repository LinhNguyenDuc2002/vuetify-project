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
                <v-btn class="btn mr-5" style="width: 45%; height: 40px;" size="large" elevation="0" @click="changeOpenDialog(true)">
                    <v-icon class="mr-3" size="20">mdi-plus</v-icon>{{ $t('button.add') }}
                </v-btn>

                <v-btn class="btn" style="width: 45%; height: 40px;" size="large" elevation="0" @click="deleteSelected()">
                    <v-icon class="mr-3" size="20">mdi-trash-can-outline</v-icon>{{ $t('button.delete') }}
                </v-btn>
            </div>
        </div>

        <div class="border-thin">
            <table class="w-100">
                <thead>
                    <tr>
                        <th style="width: 5%;">
                            <v-checkbox
                                v-model="selectAll"
                                @change="toggleSelectAll"
                                hide-details>
                            </v-checkbox>
                        </th>
                        <th class="text-start pl-3" style="width: 15%;">{{ $t('category.icon') }}</th>
                        <th class="text-start pl-3" style="width: 45%;">{{ $t('category.name') }}</th>
                        <th class="text-start pl-3" style="width: 15%;">{{ $t('category.number') }}</th>
                        <th class="text-start pl-3" style="width: 15%;">{{ $t('category.status') }}</th>
                        <th class="text-start pl-3" style="width: 5%;"></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(item, index) in categories" class="cursor-pointer" @click="">
                        <td>
                            <v-checkbox
                                v-model="selected"
                                :value="index"
                                hide-details>
                            </v-checkbox>
                        </td>
                        <td class="px-3">
                            <v-img></v-img>
                        </td>
                        <td class="px-3">{{ item.name }}</td>
                        <td class="px-3">{{ item.total }}</td>
                        <td class="px-3">{{ item.status }}</td>
                        <td class="px-3"><v-icon>mdi-pencil-box-outline</v-icon></td>
                    </tr>
                </tbody>
            </table>

            <PaginationTable :size="size" :page="page" :total="total" @update-size="updateSize" @update-page="updatePage"></PaginationTable>
        </div>
    </div>

    <AddCategory v-if="dialog" :categoryDialog="dialog"></AddCategory>
</template>

<script>
import CategoryApi from '@/services/api/CategoryApi';
import { fa } from 'vuetify/locale';

export default {
    data() {
        return {
            selected: [],
            selectAll: false,
            categories: [],
            size: 5,
            page: 1,
            total: 0,
            search: '',
            dialog: false
        }
    },

    watch: {
        size: function() {
            this.page = 1;
            this.fetchCategory();
        },
        page: function() {
            this.fetchCategory();
        },
    },

    methods: {
        toggleSelectAll() {
            if (this.selectAll) {
                this.selected = this.categories.map((item, index) => index);
            } else {
                this.selected = [];
            }
        },

        async fetchCategory() {
            const response = await CategoryApi.getAllPagination(this.search, this.size, this.page - 1);
            console.log(response);
            if(response != null && response.code === 200) {
                this.categories = response.data['elements'];
                this.total = response.data['total_page'];
            }
        },

        updateSize(size) {
            this.size = size;
        },

        updatePage(page) {
            this.page = page;
        },

        changeOpenDialog(value) {
            this.dialog = value;
        }
    },

    mounted() {
        this.fetchCategory();
    }
}
</script>
