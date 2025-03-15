<template>
    <div>
        <v-form ref="form" @submit.prevent="checkForm">
            <div class="pa-10 bg-white rounded mb-4">
                <p class="sub-title">Thông tin cơ bản</p>

                <div class="w-100 h-100">
                    <div class="w-100 h-100 mb-5">
                        <div class="d-flex mb-3 w-100" style="flex-wrap: wrap;">
                            <div v-for="(item, index) in product.images" :key="index" class="position-relative cursor-pointer border-thin rounded d-flex mr-3" style="height: 90px; width: 90px;">
                                <v-icon size="15" class="position-absolute ma-1 right-0" @click="removeImage(index)" style="z-index: 1;">mdi-window-close</v-icon>
                                <v-img max-width="100%" max-height="100%" :src="createObjectURL(item)" alt="Product image"></v-img>
                            </div>

                            <div class="mr-5">
                                <v-file-input hide-input prepend-icon="" v-model="images" id="file-input" multiple accept="image/*" @change="handleFileUpload">
                                    <template #prepend>
                                        <v-btn class="dashed-border pa-3 h-auto w-auto" style="min-height: 90px; min-width: 90px;" @click="openFileDialog" elevation="0">
                                            <v-icon size="30" color="#03A9F4">mdi-image-plus-outline</v-icon>
                                        </v-btn>
                                    </template>
                                </v-file-input>
                            </div>
                        </div>

                        <p class="w-100 error-message">{{ message.imageMessage }}</p>
                    </div>

                    <div class="text-subtitle-1 text-medium-emphasis">{{ $t('product.name') }}</div>
                    <v-text-field v-model="product.name" density="compact" :placeholder="$t('product.name')"
                        :error-messages="message.nameError"
                        :rules="requiredRule(100)"
                        variant="outlined" class="mb-3">
                        <template v-slot:append-inner>
                            <span class="text-note">{{ product.name.length }}/100</span>
                        </template>
                    </v-text-field>

                    <div class="text-subtitle-1 text-medium-emphasis">{{ $t('product.category') }}</div>
                    <v-select
                        class="mb-3"
                        v-model="product.category_id"
                        :items="categories"
                        item-value="id"
                        item-title="name"
                        density="compact"
                        :rules="selectRule"
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
                                :rules="requiredRule(20)" :maxlength="20"
                                variant="outlined" class="mb-3">
                                <template v-slot:append-inner>
                                    <span class="text-note">{{ type.name.length }}/20</span>
                                </template>
                            </v-text-field>
                        </div>

                        <div class="d-flex justify-space-between" style="flex-wrap: wrap;">
                            <div v-if="index === 0" v-for="(item, subindex) in product.product_types" :key="subindex" class="d-flex align-center" style="width: 45%;">
                                <div class="w-100 mr-3">
                                    <div class="text-subtitle-1 text-medium-emphasis">{{ `Tùy chọn ${subindex + 1}` }}</div>
                                    <v-text-field v-model="item.name" density="compact" :placeholder="$t('product.name')"
                                        :error-messages="message.nameError"
                                        :rules="(subindex < product.product_types.length - 1 || subindex === 0) ? requiredRule(20) : []"
                                        @input="addSelection(index)"
                                        variant="outlined" class="mb-3">
                                        <template v-slot:append-inner>
                                            <span class="text-note">{{ item.name.length }}/20</span>
                                        </template>
                                    </v-text-field>
                                </div>

                                <v-icon v-if="subindex < product.product_types.length - 1" class="cursor-pointer" @click="deleteSelection(index, subindex)">
                                    mdi-trash-can-outline
                                </v-icon>
                            </div>

                            <div v-if="index === 1" v-for="(item, subindex) in product.product_types[0].types" :key="subindex" class="d-flex align-center" style="width: 45%;">
                                <div class="w-100 mr-3">
                                    <div class="text-subtitle-1 text-medium-emphasis">{{ `Tùy chọn ${subindex + 1}` }}</div>
                                    <v-text-field v-model="item.name" density="compact" :placeholder="$t('product.name')"
                                        :error-messages="message.nameError"
                                        :rules="(subindex < product.product_types.length - 1 || subindex === 0) ? requiredRule(20) : []"
                                        @input="addSelection(index)"
                                        variant="outlined" class="mb-3">
                                        <template v-slot:append-inner>
                                            <span class="text-note">{{ item.name.length }}/20</span>
                                        </template>
                                    </v-text-field>
                                </div>

                                <v-icon v-if="subindex < product.product_types[0].types.length - 1" class="cursor-pointer" @click="deleteSelection(index, subindex)">
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
                    <ProductTypeTable 
                        :types="typeName" :product_types="product.product_types" 
                        @update-details="setDetails" @update-product-type-image="updateProductTypeImage">
                    </ProductTypeTable>
                    <p class="error-message">{{ message.detailsError }}</p>
                </div>

                <div v-else class="w-50">
                    <div class="text-subtitle-1 text-medium-emphasis">{{ $t('product.price') }}</div>
                    <v-text-field v-model="product.price" density="compact" :placeholder="$t('product.price')"
                        :error-messages="message.nameError"
                        :rules="priceRule"
                        variant="outlined" class="mb-3">
                    </v-text-field>

                    <div class="text-subtitle-1 text-medium-emphasis">{{ $t('product.quantity') }}</div>
                    <v-text-field v-model="product.quantity" density="compact" :placeholder="$t('product.quantity')"
                        :error-messages="message.nameError"
                        :rules="quantityRule"
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
import { RequiredRule, SelectRule, PriceRule, QuantityRule, FileRule } from '../../../rules/Rule';
import { ERROR_MESSAGE } from '../../../constants/message';
import ProductApi from '@/services/api/ProductApi';

export default {
    data () {
        return {
            product: {
                name: '',
                price: null,
                quantity: null,
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
            fileRule: FileRule(2, this.$t),
        }
    },

    computed: {
        priceRule() {
            return PriceRule(this.$t);
        },
        quantityRule() {
            return QuantityRule(this.$t);
        },
        selectRule() {
            return SelectRule(this.$t);
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
        requiredRule(maxLength) {
            return RequiredRule(maxLength, this.$t);
        },

        async fetchCategory() {
            const response = await CategoryApi.getAll('');
            if(response != null && response.code === 200) {
                this.categories = response.data;
            }
        },

        addType() {
            this.typeName.push({
                name: '',
            });

            if(this.typeName.length === 1) {
                this.initProductTypes(0);
            }
            else if(this.typeName.length === 2) {
                this.initProductTypes(1);
            }
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

        updateProductTypeImage(index, file) {
            this.product.product_types[index].image = file;
        },
        
        handleFileUpload(event) {
            let size = 0;
            if (this.images.length > 0) {
                for (const file of this.images) {
                    const isValid = this.fileRule.every(rule => {
                        const result = rule(file);
                        if (result !== true) {
                            this.message.imageMessage = result;
                            return false; // Dừng vòng lặp khi có lỗi
                        }
                        return true; // Tiếp tục nếu không có lỗi
                    });

                    if (!isValid) {
                        return; // Nếu không hợp lệ, dừng xử lý
                    }
                    size += file.size;
                }
               

                if(size > 10000000) {
                    this.message.imageMessage = "lỗi";
                    return;
                }

                this.message.imageMessage = '';
                this.product.images = this.images;
            }
        },

        createObjectURL(file) {
            return URL.createObjectURL(file);
        },

        removeImage(index) {
            this.product.images.splice(index, 1);
        },

        setDetails(product_types) {
            this.product.product_types = product_types;
        },

        async checkForm() {
            // let checkImage = true;
            // if(this.product.images.length === 0) {
            //     this.message.imageMessage = this.$t(ERROR_MESSAGE.not_image);
            //     checkImage = false;
            // }

            const isValid = await this.$refs.form.validate();
            if(isValid.valid) {
                console.log(this.product);
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