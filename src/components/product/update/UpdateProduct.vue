<template>
    <div class="mt-10">
        <div class="d-flex w-100 my-5">
            <v-btn class="mr-5" style="width: 10%;" color="blue" type="submit" @click="changeEditStatus()">Sửa</v-btn>
            <v-btn class="mr-5" style="width: 10%;" color="blue" type="submit">Xóa</v-btn>
            <v-btn class="mr-5" style="width: 10%;" color="blue" type="submit" :disabled="!editStatus" @click="changePopUpDialog(true)">Lưu</v-btn>
            <v-btn class="mr-5" style="width: 10%;" color="blue" @click="hidden()">Đóng</v-btn>
        </div>
        <!-- <v-form ref="form" @submit.prevent="checkForm"> -->
        <v-form>
            <div class="d-flex justify-between align-center w-100 h-100">
                <div class="h-100 w-50 mr-auto">
                    <div class="text-subtitle-1 text-medium-emphasis">{{ $t('product.name') }}</div>
                    <v-text-field variant="outlined" class="mb-3"
                        v-model="product.name" density="compact"
                        :placeholder="$t('product.name')"
                        :disabled="!editStatus"
                        :error-messages="message.nameError">
                    </v-text-field>

                    <div class="text-subtitle-1 text-medium-emphasis">{{ $t('product.category') }}</div>
                    <v-select class="mb-3" density="compact" variant="outlined"
                        v-model="product.category.name"
                        :items="categories"
                        item-value="id"
                        item-title="name"
                        :error-messages="message.categoryError"
                        :placeholder="$t('product.category')"
                        :disabled="!editStatus">
                    </v-select>
                </div>

                <div class="w-50 ml-16 h-100">
                    <div class="position-relative d-flex justify-between align-center mb-5">
                        <div class="mr-5">
                            <input type="file" id="file-input" multiple accept="image/*" @change="handleFileUpload">
                            <v-btn @click="openFileDialog" color="blue" elevation="0" :disabled="!editStatus">Chọn ảnh</v-btn>
                        </div>

                        <p class="h-100 text-center error-message">{{ message.imageMessage }}</p>
                    </div>

                    <div class="preview" style="min-height: 85px">
                        <div v-for="(item, index) in images" :key="index" class="position-relative cursor-pointer border-thin rounded d-flex">
                            <v-icon size="20" class="position-absolute ma-1 right-0" @click="removeImage(index)" style="z-index: 1;">mdi-window-close</v-icon>
                            <v-img class="position-absolute h-100 w-100" :src="item" alt="Product image"></v-img>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-100">
                <div class="text-subtitle-1 text-medium-emphasis">{{ $t('product.description') }}</div>
                <v-col class="pa-0" cols="12" sm="6" style="max-width: 100%;">
                    <v-textarea class="w-100" variant="outlined" auto-grow shaped
                        v-model="product.description"
                        :disabled="!editStatus">
                    </v-textarea>
                </v-col>
            </div>

            <p class="error-message">{{ message.detailsError }}</p>
        </v-form>



        <PopUp v-if="popUpDialog" 
            :popUpDialog="popUpDialog" 
            :message="'Bạn muốn xóa không'" 
            @update-popup-dialog="changePopUpDialog"
            @update-parent-dialog="handle">
        </PopUp>
    </div>
</template>

<style>
input[type="file"] {
    display: none;
}

.preview {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
}
</style>

<script>
import CategoryApi from '@/services/api/CategoryApi';
import { RequiredRule, SelectRule } from '../../../rules/Rule';
import { ERROR_MESSAGE } from '../../../constants/message';
import ProductApi from '@/services/api/ProductApi';
import ProductDetailList from './ProductDetailList.vue';
import { fa } from 'vuetify/locale';

export default {
    data () {
        return {
            product: null,
            images: [],
            message: {
                nameError: '',
                categoryError: '',
                imageMessage: '',
                detailsError: '',
            },
            productDetails: [],
            editStatus: false,
            statusProduct: false,
            popUpDialog: false,
            showList: false,
        }
    },

    props: {
        idProduct: {
            type: String,
            required: true,
        },
        categories: {
            type: Array,
            required: true,
        }
    },

    watch: {
        idProduct: {
            immediate: true, // Gọi ngay khi component được khởi tạo
            async handler(newId) {
                await this.fetchProduct(); // Chờ fetchProduct hoàn thành
                // this.editStatus = false;
                // this.statusProduct = false;
                // this.popUpDialog = false;
                // this.showList = false;
            }
        },
        product: {
            handler() {
                this.statusProduct = true;
            },
            deep: true // Follow product
        }
    },

    methods: {
        hidden() {
            this.$emit('update-selected-product', null);
        },

        async fetchProduct() {
            const response = await ProductApi.get(this.idProduct);
            if(response != null && response.code === 200) {
                this.product = response.data;
            }

            // this.showList = true;
        },

        changeEditStatus() {
            this.editStatus = !this.editStatus;
        },

        changePopUpDialog(value) {
            if(this.statusProduct) {
                this.popUpDialog = value;
            }
        },

        handle() {
            console.log("Ok")
         }

        // openFileDialog() {
        //     document.getElementById('file-input').click();
        // },
        
        // handleFileUpload(event) {
        //     const files = event.target.files;
        //     if((files.length + this.product.images.length) > 4) {
        //         this.message.imageMessage = this.$t(ERROR_MESSAGE.maximum_image_capacity);
        //         return;
        //     }
        //     const fileArray = Array.from(files);

        //     fileArray.forEach(file => {
        //         const url = URL.createObjectURL(file);
        //         this.images.push(url);
        //         this.product.images.push(file);
        //     });
        //     this.message.imageMessage = '';
        // },

        // removeImage(index) {
        //     URL.revokeObjectURL(this.images[index]);
        //     this.images.splice(index, 1);
        //     this.product.images.splice(index, 1);
        // },

        // setDetails(updatedDetails) {
        //     this.product.product_details = updatedDetails;
        // },

        // checkForm() {
        //     const errorName = RequiredRule.map(rule => rule(this.product.name)).find(error => error !== true);
        //     this.message.nameError = errorName ? this.$t(errorName) : '';

        //     const errorCategory = SelectRule.map(rule => rule(this.product.category_id)).find(error => error !== true);
        //     this.message.categoryError = errorCategory ? this.$t(errorCategory) : '';

        //     let validImage = false;
        //     if(this.product.images.length === 0) {
        //         this.message.imageMessage = this.$t(ERROR_MESSAGE.not_image);
        //         validImage = true;
        //     }

        //     if(this.product.product_details.length === 0) {
        //         this.message.detailsError = this.$t(ERROR_MESSAGE.required_product_detail);
        //     }

        //     if(!errorName && !errorCategory && !validImage && this.product.product_details.length > 0) {
        //         this.addProduct()
        //     }
        // },

        // setDetailMessage(message) {
        //     this.message.detailsError = message;
        // },

        // async updateProduct() {
        //     console.log(this.product)
        //     let formData = new FormData();
        //     formData.append('name', this.product.name);
        //     formData.append('description', this.product.description);
        //     formData.append('categoryId', this.product.category_id);

        //     this.product.images.forEach((item, index) => {
        //         formData.append(`images[${index}]`, item);
        //     });

        //     this.product.product_details.forEach((item, index) => {
        //         formData.append(`productDetails[${index}].name`, item.name);
        //         formData.append(`productDetails[${index}].description`, item.description);
        //         formData.append(`productDetails[${index}].quantity`, item.quantity);
        //         formData.append(`productDetails[${index}].price`, item.price);
        //         formData.append(`productDetails[${index}].image`, item.image);
        //     });
        
        //     const response = await ProductApi.add(formData);
        // }
    },
}
</script>