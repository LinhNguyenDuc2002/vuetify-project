<template>
    <div class="text-center">
        <v-dialog v-model="dialog" class="d-flex justify-center" max-width="60%" max-height="90%" persistent>
            <v-icon size="25" class="position-absolute ma-2 right-0 cursor-pointer" @click="changePopUpDialog(true)" style="z-index: 1;">mdi-window-close</v-icon>
            <v-card class="pa-10 h-100 w-100">
                <!-- <template v-slot:actions>
                    <v-btn class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
                </template> -->
                <v-card-title class="title pa-0">Add a new product type</v-card-title>

                <div class="d-flex justify-between align-center w-100">
                    <div class="w-50">
                        <div>
                            <div class="text-subtitle-1 text-medium-emphasis">{{ $t('product.name') }}</div>
                            <v-text-field 
                                density="compact" 
                                :placeholder="$t('product.name')"
                                variant="outlined">
                            </v-text-field>
                        </div>

                        <div class="w-100 d-flex align-center justify-between">
                            <div class="mr-auto" style="width: 45%;">
                                <div class="text-subtitle-1 text-medium-emphasis">{{ $t('product.price') }}</div>
                                <v-text-field 
                                    type="number"
                                    density="compact" 
                                    :placeholder="$t('product.price')"
                                    variant="outlined">
                                </v-text-field>
                            </div>

                            <div style="width: 45%;">
                                <div class="text-subtitle-1 text-medium-emphasis">{{ $t('product.quantity') }}</div>
                                <v-text-field 
                                    type="number"
                                    density="compact" 
                                    :placeholder="$t('product.quantity')"
                                    variant="outlined">
                                </v-text-field>
                            </div>
                        </div>
                    </div>

                    <div class="w-50 ml-16 h-100">
                        <div class="position-relative d-flex justify-between" style="margin-bottom: 15px;">
                            <div class="mr-5">
                                <input type="file" id="file-detail" multiple accept="image/*" @change="handleFileUpload">
                                <v-btn @click="openFileDialog" color="blue" elevation="0">Chọn ảnh</v-btn>
                            </div>

                            <p class="h-100 text-center" style="color: red;">shdsd jdjsd dgywe ưdwdkwd</p>
                        </div>

                        <div class="preview-detail" style="min-height: 75px">
                            <div v-if="image" class="position-relative cursor-pointer border-thin rounded d-flex">
                                <v-icon size="20" class="position-absolute ma-1 right-0" @click="removeImage()" style="z-index: 1;">mdi-window-close</v-icon>
                                <v-img class="position-absolute h-100 w-100" :src="image" alt="Product image"></v-img>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-100">
                    <div class="text-subtitle-1 text-medium-emphasis">{{ $t('product.description') }}</div>

                    <v-col class="pa-0" cols="12" sm="6" style="max-width: 100%;">
                        <v-textarea
                            class="w-100"
                            variant="outlined"
                            auto-grow
                            shaped>
                        </v-textarea>
                    </v-col>
                </div>

                <div class="d-flex justify-between">
                    <v-btn class="mr-auto" style="width: 20%;" color="blue" @click="changePopUpDialog(true)">Cancle</v-btn>
                    <v-btn style="width: 20%;" color="blue" @click="addDetail()">OK</v-btn>
                </div>
            </v-card>
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
            image: null,

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

    methods: {
        changeDialog() {
            this.dialog = !this.dialog;
            this.$emit('change-open-dialog', this.dialog);
        },

        changePopUpDialog(value) {
            this.popUpDialog = value;
        },

        openFileDialog() {
            document.getElementById('file-detail').click();
        },
        
        handleFileUpload(event) {
            const files = event.target.files;
            const fileArray = Array.from(files);

            fileArray.forEach(file => {
                const url = URL.createObjectURL(file);
                this.image = url;
                this.productDetail.image = file;
            });
        },

        removeImage() {
            URL.revokeObjectURL(this.image);
            this.image = null;
            this.productDetail.image = null;
        },

        addDetail() {
            this.details.push(this.productDetail);
        }
    }
}
</script>