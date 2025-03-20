<template>
    <div class="mt-5">
        <!-- <div class="d-flex justify-between align-center mb-5">
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
                <v-btn class="mr-auto cursor-pointer" style="width: 45%;" color="blue" @click="changeOpenDialog(true)">
                    <v-icon class="mr-3">mdi-plus</v-icon>{{ $t('button.add') }}
                </v-btn>

                <v-btn class="cursor-pointer" style="width: 45%;" color="blue" @click="deleteSelected()">
                    <v-icon class="mr-3">mdi-trash-can-outline</v-icon>{{ $t('button.delete') }}
                </v-btn>
            </div>
        </div> -->

        <div class="border-thin">
            <table class="w-100 my-table">
                <thead>
                    <tr>
                        <th v-for="(type, index) in types" class="text-start pl-3">{{ type.name || `Phân loại ${index + 1}` }}</th>
                        <th v-for="header in headers" class="text-start pl-3">{{ $t(header.text) }}</th>
                    </tr>
                </thead>

                <tbody>
                    <template v-if="types.length > 1" v-for="(item, index) in product_types.slice(0, product_types.length - 1)">
                        <tr>
                            <td :rowspan="(item.types.length === 1) ? 1 : (item.types.length - 1)" class="pa-3 text-center" width="30%">
                                <p class="mb-3">{{ item.name }}</p>
                                <div v-if="item.image !== null" class="mb-3 d-flex justify-center">
                                    <div class="position-relative cursor-pointer border-thin rounded d-flex" style="height: 90px; width: 90px;">
                                        <v-icon size="15" class="position-absolute ma-1 right-0" @click="removeImage(index)" style="z-index: 1;">mdi-window-close</v-icon>
                                        <v-img max-width="100%" max-height="100%" :src="createObjectURL(item.image)" alt="Product image"></v-img>
                                    </div>
                                </div>
                                <div v-else class="mb-3">
                                    <v-file-input hide-input prepend-icon="" :id="`file-input-${index}`" accept="image/*" 
                                    @change="(event) => handleFileUpload(event, index)">
                                        <template #prepend>
                                            <v-btn class="dashed-border pa-3 h-auto w-auto" style="min-height: 90px; min-width: 90px;" @click="openFileDialog(index)" elevation="0">
                                                <v-icon size="30" color="#03A9F4">mdi-image-plus-outline</v-icon>
                                            </v-btn>
                                        </template>
                                    </v-file-input>
                                </div>
                                <p class="h-100 text-center error-message">{{ imageMessage[index] }}</p>
                            </td>
                            <td class="px-3">{{ item.types[0].name }}</td>
                            <td class="pa-3">
                                <v-text-field type="number" v-model="item.types[0].price" density="compact" variant="outlined">
                                </v-text-field>
                            </td>
                            <td class="pa-3">
                                <v-text-field type="number" v-model="item.types[0].quantity" density="compact" variant="outlined">
                                </v-text-field>
                            </td>
                        </tr>

                        <tr v-if="item.types.length > 1" v-for="(subItem, subIndex) in item.types.slice(1, item.types.length - 1)">
                            <td class="px-3">{{ subItem.name }}</td>
                            <td class="pa-3">
                                <v-text-field type="number" v-model="subItem.price" density="compact" variant="outlined"
                                    :rules="priceRule">
                                </v-text-field>
                            </td>
                            <td class="pa-3">
                                <v-text-field type="number" v-model="subItem.quantity" density="compact" variant="outlined"
                                    :rules="quantityRule">
                                </v-text-field>
                            </td>
                        </tr>
                    </template>

                    <template v-else>
                        <tr v-for="(item, index) in product_types.slice(0, product_types.length - 1)">
                            <td class="pa-3 text-center" width="30%">
                                <p class="mb-3">{{ item.name }}</p>
                                <div v-if="item.image !== null" class="mb-3 d-flex justify-center">
                                    <div class="position-relative cursor-pointer border-thin rounded d-flex" style="height: 90px; width: 90px;">
                                        <v-icon size="15" class="position-absolute ma-1 right-0" @click="removeImage(index)" style="z-index: 1;">mdi-window-close</v-icon>
                                        <v-img max-width="100%" max-height="100%" :src="createObjectURL(item.image)" alt="Product image"></v-img>
                                    </div>
                                </div>
                                <div v-else class="mb-3">
                                    <v-file-input hide-input prepend-icon="" :id="`file-input-${index}`" accept="image/*" 
                                        @change="(event) => handleFileUpload(event, index)">
                                        <template #prepend>
                                            <v-btn class="dashed-border pa-3 h-auto w-auto" style="min-height: 90px; min-width: 90px;" @click="openFileDialog(index)" elevation="0">
                                                <v-icon size="30" color="#03A9F4">mdi-image-plus-outline</v-icon>
                                            </v-btn>
                                        </template>
                                    </v-file-input>
                                </div>
                                <p class="h-100 text-center error-message">{{ imageMessage[index] }}</p>
                            </td>
                            <td class="pa-3">
                                <v-text-field type="number" v-model="item.price" density="compact" variant="outlined"
                                    :rules="priceRule">
                                </v-text-field>
                            </td>
                            <td class="pa-3">
                                <v-text-field type="number" v-model="item.quantity" density="compact" variant="outlined"
                                    :rules="quantityRule">
                                </v-text-field>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { ERROR_MESSAGE } from '@/constants/message';
import { PriceRule, QuantityRule, FileRule } from '@/rules/Rule';

export default {
    data() {
        return {
            headers: [
                {text: 'product.price'},
                {text: 'product.quantity'},
            ],
            imageMessage: [],
        }
    },

    props: {
        product_types: {
            type: Array,
            required: true
        },

        types: {
            type: Array,
            required: true
        }
    },

    computed: {
        priceRule() {
            return PriceRule(this.$t);
        },
        quantityRule() {
            return QuantityRule(this.$t);
        },
        fileRule() {
            return FileRule(2, this.$t);
        }
    },

    watch: {
        product_types: {
            handler(newVal) {
                this.imageMessage = new Array(newVal.length).fill('');
            }
        }
    },

    methods: {
        openFileDialog(index) {
            document.getElementById(`file-input-${index}`).click();
        },

        handleFileUpload(event, index) {
            const file = event.target.files[0];
            if (file) {
                const isValid = this.fileRule.every(rule => {
                    const result = rule(file);
                    if (result !== true) {
                        this.imageMessage[index] = result;
                        return false; // Dừng vòng lặp khi có lỗi
                    }
                    return true; // Tiếp tục nếu không có lỗi
                });

                if (isValid) {
                    this.imageMessage[index] = '';
                    this.$emit('update-product-type-image', index, file);
                }
            }
        },

        removeImage(index) {
            this.$emit('update-product-type-image', index, null);
        },

        createObjectURL(file) {
            if(file instanceof File) {
                return URL.createObjectURL(file);
            }
            return file;
        },
    }
}
</script>

<style>
th, td {
    border: 1px solid #ccc; /* Viền cho các ô */
    padding: 10px; /* Thêm khoảng cách bên trong ô */
}

table {
  width: 100%;
  border-collapse: collapse; /* Xóa khoảng cách giữa các viền */
}

input[type="file"] {
    display: none;
}

.preview {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
}
</style>
