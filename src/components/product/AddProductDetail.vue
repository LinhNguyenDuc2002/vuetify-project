<template>
    <div class="text-center">
        <v-dialog v-model="dialog" class="d-flex justify-center" max-width="60%" max-height="90%" persistent>
            <v-icon size="25" class="position-absolute ma-2 right-0 cursor-pointer" @click="changePopUpDialog(true)" style="z-index: 1;">mdi-window-close</v-icon>
            <v-form ref="form">
                <v-card class="pa-10 h-100 w-100">
                    <!-- <template v-slot:actions>
                        <v-btn class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
                    </template> -->
                    <v-card-title class="title pa-0">Add a new product type</v-card-title>

                    <div class="d-flex justify-between align-center w-100">
                        <div class="w-50">
                            <div class="mb-3">
                                <div class="text-subtitle-1 text-medium-emphasis">{{ $t('product.type') }}</div>
                                <v-text-field 
                                    v-model="productDetail.name"
                                    density="compact" 
                                    :placeholder="$t('product.type')"
                                    variant="outlined"
                                    :rules="requiredRule">
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
                                        :rules="requiredRule">
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
                                        :rules="requiredRule">
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

                                <p v-if="imageMessage" class="h-100 text-center error-message">{{ imageMessage }}</p>
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
                        <v-btn style="width: 20%;" color="blue" @click="checkForm()">OK</v-btn>
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
import { ERROR_MESSAGE } from '@/constants/message_constants';
import { RequiredRule } from '@/rules/Rule';
import '@/styles/common.css';

export default {
    data() {
        return {
            dialog: this.openDialog,
            popUpDialog: false,
            productDetail: {
                name: '',
                description: '',
                quantity: null,
                price: '',
                image: null,
            },
            statusProduct: false,
            imageMessage: '',
            validImage: false,
            requiredRule: RequiredRule(this.$i18n.t),
        }
    },

    props:{
        openDialog: {
            type: Boolean,
            required: true
        },
        details: {
            type: Array,
            required: true
        }
    },

    watch: {
        productDetail: {
            handler() {
                this.statusProduct = true;
            },
            deep: true // Follow productDetail
        }
    },

    methods: {
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
            this.imageMessage = '';
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
            const isValid = this.$refs.form.validate();
            if(this.productDetail.image == null) {
                this.imageMessage = this.$t(ERROR_MESSAGE.not_image);
                this.validImage = true;
            }

            
            if (!isValid && !this.validImage) {
                console.log("ok")
                this.addDetail();
            }
            console.log("ok1")
        },

        addDetail() {
            console.log("ok")
            this.details.push(this.productDetail);
            this.changeDialog();
        },
        
    }
}
</script>