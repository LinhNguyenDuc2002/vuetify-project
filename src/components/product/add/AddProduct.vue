<template>
    <div>
        <v-form ref="form" @submit.prevent="checkForm">
            <div class="pa-10 bg-white rounded mb-4">
                <p class="sub-title">Thông tin cơ bản</p>

                <div class="w-100 h-100">
                    <div class="w-100 h-100 mb-5">
                        <div class="d-flex mb-3 w-100" style="flex-wrap: wrap;">
                            <div v-for="(item, index) in images" :key="index" class="position-relative cursor-pointer border-thin rounded d-flex mr-3" style="height: 90px; width: 90px;">
                                <v-icon size="20" class="position-absolute ma-1 right-0" @click="removeImage(index)">mdi-window-close</v-icon>
                                <v-img max-width="100%" max-height="100%" :src="item" alt="Product image"></v-img>
                            </div>

                            <div class="mr-5">
                                <input type="file" id="file-input" multiple accept="image/*" @change="handleFileUpload">
                                <v-btn class="dashed-border pa-3 h-auto w-auto" style="min-height: 90px; min-width: 90px;" @click="openFileDialog" elevation="0">
                                    <v-icon size="30" color="#03A9F4">mdi-image-plus-outline</v-icon>
                                </v-btn>
                            </div>
                        </div>

                        <p class="w-100 error-message">{{ message.imageMessage }}</p>
                    </div>

                    <div class="text-subtitle-1 text-medium-emphasis">{{ $t('product.name') }}</div>
                    <v-text-field v-model="product.name" density="compact" :placeholder="$t('product.name')"
                        :error-messages="message.nameError"
                        variant="outlined" class="mb-3">
                    </v-text-field>

                    <div class="text-subtitle-1 text-medium-emphasis">{{ $t('product.category') }}</div>
                    <v-select
                        class="mb-3"
                        v-model="product.category_id"
                        :items="categories"
                        item-value="id"
                        item-title="name"
                        density="compact"
                        :error-messages="message.categoryError"
                        :placeholder="$t('product.category')"
                        variant="outlined">
                    </v-select>
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
            </div>

            <div class="pa-10 bg-white rounded mb-4">
                <p class="sub-title">Thông tin chi tiết</p>
            </div>

            <div class="pa-10 bg-white rounded">
                <p class="sub-title">Thông tin bán hàng</p>

                <div v-if="typeName.length > 0" class="mb-5">
                    <div v-for="(type, index) in typeName" :key="index" class="bg-grey-lighten-3 position-relative pa-5 mb-3">
                        <v-icon size="20" class="position-absolute mr-5 right-0 cursor-pointer" @click="closeType(index)">mdi-window-close</v-icon>

                        <div class="w-50">
                            <div class="text-subtitle-1 text-medium-emphasis">{{ `Phân loại ${index + 1}` }}</div>
                            <v-text-field v-model="type.name" density="compact" :placeholder="$t('product.name')"
                                :error-messages="message.nameError"
                                variant="outlined" class="mb-3">
                            </v-text-field>
                        </div>

                        <div class="d-flex justify-space-between" style="flex-wrap: wrap;">
                            <div v-if="index === 0" v-for="(item, subindex) in product.product_types" :key="subindex" class="d-flex align-center" style="width: 45%;">
                                <div class="w-100 mr-3">
                                    <div class="text-subtitle-1 text-medium-emphasis">{{ `Tùy chọn ${subindex + 1}` }}</div>
                                    <v-text-field v-model="item.name" density="compact" :placeholder="$t('product.name')"
                                        :error-messages="message.nameError"
                                        @input="addSelection(index)"
                                        variant="outlined" class="mb-3">
                                    </v-text-field>
                                </div>

                                <v-icon v-if="subindex != product.product_types.length - 1" class="cursor-pointer" @click="deleteSelection(index, subindex)" :class="{ 'disabled': a !== 2 }">
                                    mdi-trash-can-outline
                                </v-icon>
                            </div>

                            <div v-if="index === 1" v-for="(item, subindex) in product.product_types[0].types" :key="subindex" class="d-flex align-center" style="width: 45%;">
                                <div class="w-100 mr-3">
                                    <div class="text-subtitle-1 text-medium-emphasis">{{ `Tùy chọn ${subindex + 1}` }}</div>
                                    <v-text-field v-model="item.name" density="compact" :placeholder="$t('product.name')"
                                        :error-messages="message.nameError"
                                        @input="addSelection(index)"
                                        variant="outlined" class="mb-3">
                                    </v-text-field>
                                </div>

                                <v-icon v-if="subindex != product.product_types[0].types.length - 1" class="cursor-pointer" @click="deleteSelection(index, subindex)" :class="{ 'disabled': a !== 2 }">
                                    mdi-trash-can-outline
                                </v-icon>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="typeName.length < 2" class="mb-5">
                    <v-btn class="btn mr-5" style="width: 40%; height: 50px;" size="large" elevation="0" @click="addType()">
                        <v-icon class="mr-3" size="20">mdi-plus</v-icon>Thêm nhóm phân loại
                    </v-btn>
                </div>

                <div v-if="typeName.length > 0" class="mb-5">
                    <ProductTypeTable :types="typeName" :product_types="product.product_types" @update-details="setDetails"></ProductTypeTable>
                    <p class="error-message">{{ message.detailsError }}</p>
                </div>

                <div v-else class="w-50">
                    <div class="text-subtitle-1 text-medium-emphasis">Đơn giá</div>
                    <v-text-field v-model="product.name" density="compact" :placeholder="$t('product.name')"
                        :error-messages="message.nameError"
                        variant="outlined" class="mb-3">
                    </v-text-field>

                    <div class="text-subtitle-1 text-medium-emphasis">Kho hàng</div>
                    <v-text-field v-model="product.name" density="compact" :placeholder="$t('product.name')"
                        :error-messages="message.nameError"
                        variant="outlined" class="mb-3">
                    </v-text-field>
                </div>

                <div>
                    <v-btn class="btn mr-5" style="width: 40%; height: 50px;" size="large" elevation="0">
                        <v-icon class="mr-3" size="20">mdi-plus</v-icon>Thêm mã giảm giá
                    </v-btn>
                </div>
            </div>

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
                product_types: [],
            },
            images: [],
            categories: [],
            message: {
                nameError: '',
                categoryError: '',
                imageMessage: '',
                detailsError: '',
            },
            typeName: [],
        }
    },

    watch: {
        'product.product_types.length': function() {
            if(this.product.product_types.length > 0) {
                this.message.detailsError = '';
            }
        }
    },

    methods: {
        async fetchCategory() {
            const response = await CategoryApi.getAll('');
            if(response != null && response.code === 200) {
                this.categories = response.data;
            }
        },

        addType() {
            if(this.typeName.length === 0) {
                this.initProductTypes(0);
            }
            else if(this.typeName.length === 1) {
                this.initProductTypes(1);
            }
            this.typeName.push({
                name: '',
            })
        },

        initProductTypes(index) {
            if(index === 0) {
                let types = [];
                if(this.product.product_types.length > 0) {
                    for(let i=0; i<this.product.product_types[0].types.length; i++) {
                        const typeForm = {
                            name: this.product.product_types[0].types[i].name,
                            price: null,
                            quantity: null,
                        };
                        types.push(typeForm);
                    }
                }

                const productTypeForm = {
                    name: '',
                    image: null,
                    price: null,
                    quantity: null,
                    types: types
                };
                this.product.product_types.push(productTypeForm);
            }
            else if(index === 1) {
                const typeForm = {
                    name: '',
                    price: null,
                    quantity: null,
                };
                for(let i=0; i<this.product.product_types.length; i++) {
                    this.product.product_types[i].types.push(typeForm);
                }
            }
            console.log(this.product);
        },

        closeType(index) {
            this.typeName.splice(index, 1);
            if(index === 0) {
                if(this.product.product_types[0].types.length > 0) {
                    this.product.product_types = [];
                    const subType = this.product.product_types[0].types;
                    for(let i=0; i<subType; i++) {
                        const productTypeForm = {
                            name: subType.name,
                            image: null,
                            price: null,
                            quantity: null,
                            types: []
                        };

                        this.product.product_types.push(productTypeForm);
                    }
                }
                else {
                    this.product.product_types = [];
                }
            }
            else if(index === 1) {
                for(let i=0; i<this.product.product_types.length; i++) {
                    this.product.product_types[i].types = [];
                }
            }
            console.log(this.typeName)
        },

        addSelection(index) {
            if(index === 0) {
                const lnt = this.product.product_types.length;
                const value = this.product.product_types[lnt - 1].name;
                if(value.length > 0) {
                    this.initProductTypes(0);
                }
            }
            else if(index === 1) {
                const lnt = this.product.product_types[0].types.length;
                const value = this.product.product_types[0].types[lnt - 1].name;
                if(value.length > 0) {
                    this.initProductTypes(1);
                }
            }
        },

        openFileDialog() {
            document.getElementById('file-input').click();
        },

        deleteSelection(index, subindex) {
            if(index === 0) {
                this.product.product_types.splice(subindex, 1);
            }
            else if(index === 1) {
                for(let i=0; i<this.product.product_types.length; i++) {
                    this.product.product_types[i].types.splice(subindex, 1);
                }
            }
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

        setDetails(product_types) {
            this.product.product_types = product_types;
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

            if(this.product.product_types.length === 0) {
                this.message.detailsError = this.$t(ERROR_MESSAGE.required_product_detail);
            }

            if(!errorName && !errorCategory && !validImage && this.product.product_types.length > 0) {
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

            this.product.product_types.forEach((item, index) => {
                formData.append(`productDetails[${index}].name`, item.name);
                formData.append(`productDetails[${index}].description`, item.description);
                formData.append(`productDetails[${index}].quantity`, item.quantity);
                formData.append(`productDetails[${index}].price`, item.price);
                formData.append(`productDetails[${index}].image`, item.image);
            });
        
            const response = await ProductApi.add(formData);
        }
    },

    mounted() {
        this.fetchCategory();
    }
}
</script>