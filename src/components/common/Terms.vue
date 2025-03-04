<template>
    <div class="text-center">
        <v-dialog v-model="dialog" class="d-flex justify-center" max-width="60%" max-height="90%" persistent>
            <v-icon size="25" class="position-absolute ma-2 right-0 cursor-pointer" @click="closeDialog" style="z-index: 1;">mdi-window-close</v-icon>
            
            <v-card class="pa-10 h-100 w-100">
                <v-card-title class="title pa-0">Terms of service</v-card-title>

                <!-- <div class="d-flex justify-between align-center w-100">
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
                </div> -->
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialog: this.termPopup,
        }
    },

    props:{
        termPopup: {
            type: Boolean,
            required: true
        },
    },

    methods: {
        closeDialog() {
            this.dialog = false;
            this.$emit('close-term-popup', false);
        }
    }
}
</script>