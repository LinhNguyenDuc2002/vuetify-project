<template>
    <div class="mt-5">
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

            <div class="w-25 d-flex justify-between align-center">
                <v-btn class="mr-auto" style="width: 45%;" color="blue" @click="changeOpenDialog(true)">
                    <v-icon class="mr-3">mdi-plus</v-icon>{{ $t('button.add') }}
                </v-btn>

                <v-btn style="width: 45%;" color="blue">
                    <v-icon class="mr-3">mdi-trash-can-outline</v-icon>{{ $t('button.delete') }}
                </v-btn>
            </div>
        </div>

        <div class="border-thin">
            <table class="w-100 my-table">
                <thead>
                    <tr>
                        <th>
                            <v-checkbox
                                v-model="selectAll"
                                @change="toggleSelectAll"
                                hide-details>
                            </v-checkbox>
                        </th>
                        <th v-for="header in headers" class="text-start pl-3">{{ $t(header.text) }}</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="item in details" class="cursor-pointer">
                        <td>
                            <v-checkbox
                                v-model="selected"
                                :value="item.id"
                                hide-details>
                            </v-checkbox>
                        </td>
                        <td class="px-3">
                            <v-img :src="item.image"></v-img>
                        </td>
                        <td class="px-3">{{ item.name }}</td>
                        <td class="px-3">{{ item.price }}</td>
                        <td class="px-3">{{ item.quantity }}</td>
                    </tr>
                </tbody>
            </table>

            <PaginationTable></PaginationTable>
        </div>
    </div>

    <AddProductDetail v-if="openDialog" :openDialog="this.openDialog" @change-open-dialog="changeOpenDialog" :details="details"></AddProductDetail>
</template>

<script>
import PaginationTable from '../common/PaginationTable.vue';
import AddProductDetail from './AddProductDetail.vue';

export default {
    data() {
        return {
            openDialog: false,
            selected: [],
            selectAll: false,
            headers: [
                {text: 'product.image', value: 1},
                {text: 'product.type', value: 2},
                {text: 'product.price', value: 4},
                {text: 'product.quantity', value: 5},
            ],
           
        }
    },

    props: {
        details: {
            type: Array,
            required: true
        }
    },

    methods: {
        toggleSelectAll() {
            if (this.selectAll) {
                this.selected = this.details.map(item => item.id);
            } else {
                this.selected = [];
            }
        },

        changeOpenDialog(value) {
            this.openDialog = value;
        }
    }
}
</script>
