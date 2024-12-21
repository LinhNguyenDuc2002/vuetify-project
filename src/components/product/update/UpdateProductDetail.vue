<template>
    <div class="text-center">
        <v-dialog v-model="dialog" class="d-flex justify-center" max-width="60%" max-height="90%" persistent>
            <v-icon size="25" class="position-absolute ma-2 right-0 cursor-pointer" @click="changePopUpDialog(true)" style="z-index: 1;">mdi-window-close</v-icon>
            <v-form ref="form" @submit.prevent="checkForm">
                <v-card class="pa-10 h-100 w-100">
                    <!-- <template v-slot:actions>
                        <v-btn class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
                    </template> -->
                    <!-- <v-card-title class="title pa-0">Add a new product type</v-card-title> -->

                    <div class="d-flex justify-between align-center w-100">
                        <div class="w-50">
                            <div class="mb-3">
                                <div class="text-subtitle-1 text-medium-emphasis">{{ $t('product.type') }}</div>
                                <v-text-field 
                                    v-model="productDetail.name"
                                    density="compact" 
                                    :placeholder="$t('product.type')"
                                    variant="outlined"
                                    :error-messages="message.nameError">
                                </v-text-field>
                            </div>

                            <div class="w-100 d-flex align-center justify-between mb-3">
                                <div class="mr-auto" style="width: 45%;">
                                    <div class="text-subtitle-1 text-medium-emphasis">{{ $t('product.price') }}</div>
                                    <v-text-field 
                                        v-model="productDetail.price"
                                        type="number"
                                        density="compact" 
                                        :placeholder="$t('product.price')"
                                        variant="outlined"
                                        :error-messages="message.priceError">
                                    </v-text-field>
                                </div>

                                <div style="width: 45%;">
                                    <div class="text-subtitle-1 text-medium-emphasis">{{ $t('product.quantity') }}</div>
                                    <v-text-field 
                                        v-model="productDetail.quantity"
                                        type="number"
                                        density="compact" 
                                        :placeholder="$t('product.quantity')"
                                        variant="outlined"
                                        :error-messages="message.quantityError">
                                    </v-text-field>
                                </div>
                            </div>
                        </div>

                        <div class="w-50 ml-16 h-100">
                            <div class="position-relative d-flex justify-between align-center mb-5">
                                <div class="mr-5">
                                    <input type="file" id="file-detail" multiple accept="image/*" @change="handleFileUpload">
                                    <v-btn @click="openFileDialog" color="blue" elevation="0">Chọn ảnh</v-btn>
                                </div>

                                <p class="h-100 text-center error-message">{{ message.imageMessage }}</p>
                            </div>

                            <div class="preview-detail" style="min-height: 85px">
                                <div v-if="productDetail.image" class="position-relative cursor-pointer border-thin rounded d-flex">
                                    <v-icon size="20" class="position-absolute ma-1 right-0" @click="removeImage()" style="z-index: 1;">mdi-window-close</v-icon>
                                    <v-img class="position-absolute h-100 w-100" :src="createObjectURL(productDetail.image)" alt="Product image"></v-img>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-100">
                        <div class="text-subtitle-1 text-medium-emphasis">{{ $t('product.description') }}</div>

                        <v-col class="pa-0" cols="12" sm="6" style="max-width: 100%;">
                            <v-textarea
                                v-model="productDetail.description"
                                class="w-100"
                                variant="outlined"
                                auto-grow
                                shaped>
                            </v-textarea>
                        </v-col>
                    </div>

                    <div class="d-flex justify-between">
                        <v-btn class="mr-auto" style="width: 20%;" color="blue" @click="changePopUpDialog(true)">Cancle</v-btn>
                        <v-btn style="width: 20%;" color="blue" type="submit">OK</v-btn>
                    </div>
                </v-card>
            </v-form>
        </v-dialog>
    </div>

    <PopUp v-if="popUpDialog" 
        :popUpDialog="popUpDialog" 
        :message="'Bạn muốn xóa không'" 
        @update-popup-dialog="changePopUpDialog"
        @update-parent-dialog="changeDialog"></PopUp>
</template>

<style>
.preview-detail {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
}
</style>

<script>
import { ERROR_MESSAGE } from '@/constants/message';
import { PriceRule, QuantityRule, RequiredRule } from '@/rules/Rule';
import ProductApi from '@/services/api/ProductApi';
import '@/styles/common.css';

export default {
    data() {
        return {
            dialog: this.openDialog,
            popUpDialog: false,
            statusProduct: false,
            message: {
                nameError: '',
                imageMessage: '',
                priceError: '',
                quantityError: '',
            },
        }
    },

    props:{
        // openDialog: {
        //     type: Boolean,
        //     required: true
        // },
        idProduct: {
            type: String,
            required: true,
        },
    },

    watch: {
        idProduct: {
            immediate: true,
            handler(newId) {
                this.fetchProductTypes();
            }
        },
    },

    methods: {
        // async fetchProduct() {
        //     const response = await ProductApi.get(this.idProduct);
        //     if(response != null && response.code === 200) {
        //         this.productDetail = response.data;
        //     }
        // },

        changeDialog() {
            this.dialog = !this.dialog;
            this.$emit('change-open-dialog', this.dialog);
        },

        changePopUpDialog(value) {
            if(this.statusProduct) {
                this.popUpDialog = value;
            }
            else {
                this.changeDialog();
            }
        },

        openFileDialog() {
            document.getElementById('file-detail').click();
        },
        
        handleFileUpload(event) {
            const files = event.target.files;
            const fileArray = Array.from(files);

            fileArray.forEach(file => {
                this.productDetail.image = file;
            });
            this.message.imageMessage = '';
        },

        createObjectURL(file) {
            return URL.createObjectURL(file);
        },

        removeImage() {
            URL.revokeObjectURL(this.image);
            this.image = null;
            this.productDetail.image = null;
        },

        checkForm() {
            const errorName = RequiredRule.map(rule => rule(this.productDetail.name)).find(error => error !== true);
            this.message.nameError = errorName ? this.$t(errorName) : '';

            const errorPrice = PriceRule.map(rule => rule(this.productDetail.name)).find(error => error !== true);
            this.message.priceError = errorPrice ? this.$t(errorPrice) : '';

            const errorQuantity = QuantityRule.map(rule => rule(this.productDetail.name)).find(error => error !== true);
            this.message.quantityError = errorQuantity ? this.$t(errorQuantity) : '';

            let validImage = false;
            if(this.productDetail.image == null) {
                this.message.imageMessage = this.$t(ERROR_MESSAGE.not_image);
                validImage = true;
            }

            if(!errorName && !errorPrice && !errorQuantity && !validImage) {
                this.addDetail();
            }
        },

        addDetail() {
            this.details.push(this.productDetail);
            this.changeDialog();
        },
    }
}
</script>