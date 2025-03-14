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
                            <td :rowspan="(item.types.length === 1) ? 1 : (item.types.length - 1)" class="pa-3 text-center">
                                <p class="mb-3">{{ item.name }}</p>
                                <div class="mb-3">
                                    <input type="file" id="file-input" multiple accept="image/*" @change="handleFileUpload">
                                    <v-btn class="dashed-border pa-3 h-auto w-auto" style="min-height: 90px; min-width: 90px;" @click="openFileDialog" elevation="0">
                                        <v-icon size="30" color="#03A9F4">mdi-image-plus-outline</v-icon>
                                    </v-btn>
                                </div>
                                <div class="mb-3 d-flex justify-center">
                                    <div class="position-relative cursor-pointer border-thin rounded d-flex" style="height: 90px; width: 90px;">
                                        <v-icon size="20" class="position-absolute ma-1 right-0" @click="removeImage(index)">mdi-window-close</v-icon>
                                        <v-img max-width="100%" max-height="100%" :src="item" alt="Product image"></v-img>
                                    </div>
                                </div>

                                <!-- <p class="h-100 text-center error-message">{{ message.imageMessage }}</p> -->
                            </td>
                            <td class="px-3">{{ item.types[0].name }}</td>
                            <td class="px-3"></td>
                            <td class="px-3"></td>
                            <td class="px-3"></td>
                        </tr>

                        <tr v-if="item.types.length > 1" v-for="(subItem, subIndex) in item.types.slice(1, item.types.length - 1)">
                            <td class="px-3">{{ subItem.name }}</td>
                            <td class="px-3"></td>
                            <td class="px-3"></td>
                            <td class="px-3"></td>
                        </tr>
                    </template>

                    <template v-else>
                        <tr v-for="(item, index) in product_types.slice(0, product_types.length - 1)" @click="">
                            <td class="pa-3 text-center">
                                <p class="mb-3">{{ item.name }}</p>
                                
                                <div class="mb-3">
                                    <input type="file" id="file-input" multiple accept="image/*" @change="handleFileUpload">
                                    <v-btn class="dashed-border pa-3 h-auto w-auto" style="min-height: 90px; min-width: 90px;" @click="openFileDialog" elevation="0">
                                        <v-icon size="30" color="#03A9F4">mdi-image-plus-outline</v-icon>
                                    </v-btn>
                                </div>
                                <div class="mb-3 d-flex justify-center">
                                    <div class="position-relative cursor-pointer border-thin rounded d-flex" style="height: 90px; width: 90px;">
                                        <v-icon size="20" class="position-absolute ma-1 right-0" @click="removeImage(index)">mdi-window-close</v-icon>
                                        <v-img max-width="100%" max-height="100%" alt="Product image"></v-img>
                                    </div>
                                </div>

                                <!-- <p class="h-100 text-center error-message">{{ message.imageMessage }}</p> -->
                            </td>
                            <td class="px-3"></td>
                            <td class="px-3"></td>
                            <td class="px-3"></td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            headers: [
                {text: 'product.type'},
                {text: 'product.price'},
                {text: 'product.quantity'},
            ],
            product_types: [],
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

    methods: {
        initializeProductTypes() {
            for (let i = 0; i < this.types[0].selections.length; i++) {
                this.product_types.push({
                    image: null,
                    first_type: this.types[0].selections[i],
                    price: null,
                    quantity: null,
                });
            }
        },

        handleFileUpload(event) {
            // const files = event.target.files;
            // if((files.length + this.product.images.length) > 4) {
            //     this.message.imageMessage = this.$t(ERROR_MESSAGE.maximum_image_capacity);
            //     return;
            // }
            // const fileArray = Array.from(files);

            // fileArray.forEach(file => {
            //     const url = URL.createObjectURL(file);
            //     this.images.push(url);
            //     this.product.images.push(file);
            // });
            // this.message.imageMessage = '';
        },

        removeImage(index) {
            URL.revokeObjectURL(this.images[index]);
            this.images.splice(index, 1);
            this.product.images.splice(index, 1);
        },

        toggleSelectAll() {
            if (this.selectAll) {
                this.selected = this.details.map((item, index) => index);
            } else {
                this.selected = [];
            }
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
