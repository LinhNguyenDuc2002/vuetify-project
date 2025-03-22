<template>
    <div>
        <v-form ref="form" @submit.prevent="checkForm">
            <div class="d-flex justify-between align-center w-100 h-100">
                <div class="text-subtitle-1 text-medium-emphasis">{{ $t('product.name') }}</div>
                <v-text-field v-model="product.name" density="compact" :placeholder="$t('product.name')"
                    :error-messages="message.nameError"
                    variant="outlined" class="mb-3">
                </v-text-field>
            </div>

            <div class="w-100">
                <div class="text-subtitle-1 text-medium-emphasis">{{ $t('product.description') }}</div>
                <v-col class="pa-0" cols="12" sm="6" style="max-width: 100%;">
                    <v-textarea
                        v-model="product.description"
                        class="w-100"
                        variant="outlined"
                        auto-grow
                        shaped>
                    </v-textarea>
                </v-col>
            </div>

            <p class="error-message">{{ message.detailsError }}</p>

            <div class="d-flex w-100 my-5 justify-end">
                <v-btn style="width: 20%;" color="blue" type="submit">Thêm sản phẩm</v-btn>
            </div>
        </v-form>
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

export default {
    data () {
        return {
            product: {
                name: '',
                description: '',
                category_id: null,
                images: [],
                product_details: []
            },
            images: [],
            categories: [],
            message: {
                nameError: '',
                categoryError: '',
                imageMessage: '',
                detailsError: '',
            },
        }
    },

    props: {
        categoryDialog: {
            type: Boolean,
            required: true
        }
    },

    watch: {
        'product.product_details.length': function() {
            if(this.product.product_details.length > 0) {
                this.message.detailsError = '';
            }
        }
    },

    methods: {
        async fetchCategory() {
            const response = await CategoryApi.getAll();
            if(response != null && response.code === 200) {
                this.categories = response.data;
            }
        },

        openFileDialog() {
            document.getElementById('file-input').click();
        },
        
        handleFileUpload(event) {
            const files = event.target.files;
            if((files.length + this.product.images.length) > 4) {
                this.message.imageMessage = this.$t(ERROR_MESSAGE.maximum_image_capacity);
                return;
            }
            const fileArray = Array.from(files);

            fileArray.forEach(file => {
                const url = URL.createObjectURL(file);
                this.images.push(url);
                this.product.images.push(file);
            });
            this.message.imageMessage = '';
        },

        removeImage(index) {
            URL.revokeObjectURL(this.images[index]);
            this.images.splice(index, 1);
            this.product.images.splice(index, 1);
        },

        setDetails(updatedDetails) {
            this.product.product_details = updatedDetails;
        },

        checkForm() {
            const errorName = RequiredRule.map(rule => rule(this.product.name)).find(error => error !== true);
            this.message.nameError = errorName ? this.$t(errorName) : '';

            const errorCategory = SelectRule.map(rule => rule(this.product.category_id)).find(error => error !== true);
            this.message.categoryError = errorCategory ? this.$t(errorCategory) : '';

            let validImage = false;
            if(this.product.images.length === 0) {
                this.message.imageMessage = this.$t(ERROR_MESSAGE.not_image);
                validImage = true;
            }

            if(this.product.product_details.length === 0) {
                this.message.detailsError = this.$t(ERROR_MESSAGE.required_product_detail);
            }

            if(!errorName && !errorCategory && !validImage && this.product.product_details.length > 0) {
                this.addProduct()
            }
        },

        setDetailMessage(message) {
            this.message.detailsError = message;
        },

        async addProduct() {
            console.log(this.product)
            let formData = new FormData();
            formData.append('name', this.product.name);
            formData.append('description', this.product.description);
            formData.append('categoryId', this.product.category_id);

            this.product.images.forEach((item, index) => {
                formData.append(`images[${index}]`, item);
            });

            this.product.product_details.forEach((item, index) => {
                formData.append(`productDetails[${index}].name`, item.name);
                formData.append(`productDetails[${index}].description`, item.description);
                formData.append(`productDetails[${index}].quantity`, item.quantity);
                formData.append(`productDetails[${index}].price`, item.price);
                formData.append(`productDetails[${index}].image`, item.image);
            });
        
            const response = await ProductApi.add(formData);
        }
    }
}
</script>