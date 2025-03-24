<template>
    <div>
        <v-form ref="form" @submit.prevent="checkForm">
            <v-card class="pa-10 bg-white rounded mb-4">
                <p class="sub-title">Thông tin cơ bản</p>

                <div class="w-100 h-100">
                    <div class="w-100 h-100 mb-5">
                        <div class="d-flex mb-3 w-100" style="flex-wrap: wrap;">
                            <div v-for="(item, index) in product.images" :key="index" class="position-relative cursor-pointer border-thin rounded d-flex mr-3" style="height: 90px; width: 90px;">
                                <v-icon size="15" class="position-absolute ma-1 right-0" @click="removeImage(index)" style="z-index: 1;">mdi-window-close</v-icon>
                                <v-img max-width="100%" max-height="100%" :src="createObjectURL(item)" alt="Product image"></v-img>
                            </div>

                            <div class="mr-5">
                                <v-file-input hide-input prepend-icon="" v-model="images" id="file-input" multiple accept="image/*" 
                                    @change="handleFileUpload">
                                    <template #prepend>
                                        <v-btn class="dashed-border pa-3 h-auto w-auto" style="min-height: 90px; min-width: 90px;" @click="openFileDialog('file-input')" elevation="0">
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
                        v-model="product.categoryId"
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
                        <!-- <v-textarea
                            v-model="product.description"
                            class="w-100"
                            variant="outlined"
                            auto-grow
                            shaped>
                        </v-textarea> -->
                        <div class="editor" id="editor" contenteditable="true"></div>
                        <v-file-input hide-input prepend-icon="" id="file-insert" multiple accept="image/*" style="width: fit-content;"
                            @change="insertImage">
                            <template #prepend>
                                <v-btn class="btn w-100" style="height: 40px;" size="large" elevation="0" @click="openFileDialog('file-insert')">
                                    Chèn ảnh
                                </v-btn>
                            </template>
                        </v-file-input>
                    </v-col>
                </div>
            </v-card>

            <v-card class="pa-10 bg-white rounded mb-4">
                <p class="sub-title">Thông tin chi tiết</p>
            </v-card>

            <v-card class="pa-10 bg-white rounded">
                <p class="sub-title">Thông tin bán hàng</p>

                <div v-if="types.length > 0" class="mb-5">
                    <div v-for="(type, index) in types" :key="index" class="bg-grey-lighten-3 position-relative pa-5 mb-3">
                        <v-icon size="20" class="position-absolute mr-5 right-0 cursor-pointer" @click="closeType(index)">mdi-window-close</v-icon>

                        <div class="w-50">
                            <div class="text-subtitle-1 text-medium-emphasis">{{ `Phân loại ${index + 1}` }}</div>
                            <v-text-field v-model="type.name" density="compact" :placeholder="$t('product.name')"
                                :rules="(index === 1) ? selectionRule(2, 0, 20) : requiredRule(20)" :maxlength="20"
                                variant="outlined" class="mb-3">
                                <template v-slot:append-inner>
                                    <span class="text-note">{{ type.name.length }}/20</span>
                                </template>
                            </v-text-field>
                        </div>

                        <div class="d-flex justify-space-between" style="flex-wrap: wrap;">
                            <div v-for="(item, subindex) in type.attributes" :key="subindex" class="d-flex align-center" style="width: 45%;">
                                <div class="w-100 mr-3">
                                    <div class="text-subtitle-1 text-medium-emphasis">{{ `Tùy chọn ${subindex + 1}` }}</div>
                                    <v-text-field v-model="item.value" density="compact" :placeholder="$t('product.name')"
                                        :error-messages="message.nameError"
                                        :rules="(subindex < type.attributes.length - 1 || subindex === 0) ? selectionRule(index, subindex, 20) : []"
                                        @input="addSelection(index)"
                                        variant="outlined" class="mb-3">
                                        <template v-slot:append-inner>
                                            <span class="text-note">{{ item.value.length }}/20</span>
                                        </template>
                                    </v-text-field>
                                </div>

                                <v-icon v-if="subindex < type.attributes.length - 1" class="cursor-pointer" @click="deleteSelection(index, subindex)">
                                    mdi-trash-can-outline
                                </v-icon>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="types.length < 2" class="mb-5">
                    <v-btn class="btn mr-5" style="width: 40%; height: 50px;" size="large" elevation="0" @click="addType()">
                        <v-icon class="mr-3" size="20">mdi-plus</v-icon>Thêm nhóm phân loại
                    </v-btn>
                </div>

                <div v-if="types.length > 0" class="mb-5">
                    <ProductTypeTable 
                        :types="types" :product_types="product.productTypes" 
                        @update-details="setDetails" @update-product-type-image="updateProductTypeImage">
                    </ProductTypeTable>
                    <p class="mt-3 error-message">{{ errorMessage }}</p>
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
            </v-card>

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

.editor {
    width: 100%;
    height: 500px;
    border: 1px solid #ccc;
    padding: 10px;
    overflow: auto;
    background-color: #f9f9f9;
    margin-bottom: 10px;
}
</style>

<script>
import CategoryApi from '@/services/api/CategoryApi';
import { RequiredRule, SelectRule, PriceRule, QuantityRule, FileRule, SelectionRule } from '../../../rules/Rule';
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
                categoryId: null,
                images: [],
                productTypes: [],
            },
            images: [],
            categories: [],
            message: {
                nameError: '',
                categoryError: '',
                imageMessage: '',
            },
            types: [],
            errorMessage: ''
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
        },
        fileRule() {
            return FileRule(2, this.$t);
        },
    },

    watch: {
        'product.productTypes.length': function() {
            if(this.product.productTypes.length > 0) {
                this.message.detailsError = '';
            }
        }
    },

    methods: {
        requiredRule(maxLength) {
            return RequiredRule(maxLength, this.$t);
        },
        selectionRule(index, subindex, maxLength) {
            let list = [];
            if(index < 2) {
                list = this.types[index].attributes
                .slice(0, this.types[index].attributes.length - 1)
                .filter((_, i) => i !== subindex)
                .map(att => att.value.toLowerCase());
            }
            else {
                list.push(this.types[0].name.toLowerCase());
            }
            return SelectionRule(list, maxLength, this.$t);
        },

        async fetchCategory() {
            const response = await CategoryApi.getAll('');
            if(response != null && response.code === 200) {
                this.categories = response.data;
            }
        },

        addType() {
            this.types.push({
                name: '',
                attributes: [
                    {value: ''}
                ]
            });

            this.initProductTypes(this.types.length - 1);
        },

        initProductTypes(index) {
            let types = [];
            const lnt = this.product.productTypes.length;

            for(let i=0; i<this.types[0].attributes.length; i++) {
                if(lnt > i) {
                    this.product.productTypes[i].name = this.types[0].attributes[i].value;

                    if(this.types.length > 1) {
                        for(let j=0; j<this.types[1].attributes.length; j++) {
                            const value = this.types[1].attributes[j].value;

                            if(this.product.productTypes[i].types.length > j) {
                                this.product.productTypes[i].types[j].name = value;
                            }

                            if(i === 0) {
                                const typeForm = {
                                    name: value,
                                    price: null,
                                    quantity: null,
                                };
                                types.push(typeForm);
                            }
                        }
                    }
                }
            }

            if(index === 0) {
                this.product.productTypes.push(
                    {
                        name: '',
                        image: null,
                        price: null,
                        quantity: null,
                        types: types
                    }
                );
            }
            else if(index === 1) {
                for(let i=0; i<lnt; i++) {
                    this.product.productTypes[i].types.push(
                        {
                            name: '',
                            price: null,
                            quantity: null,
                        }
                    );
                }
            }
        },

        closeType(index) {
            this.types.splice(index, 1);
            if(index === 0) {
                if(this.types.length > 0) {
                    this.product.productTypes = [];
                    const subType = this.types[0].attributes;
                    for(let i=0; i<subType.length; i++) {
                        const productTypeForm = {
                            name: subType[i].value,
                            image: null,
                            price: null,
                            quantity: null,
                            types: []
                        };

                        this.product.productTypes.push(productTypeForm);
                    }
                }
                else {
                    this.product.productTypes = [];
                }
            }
            else if(index === 1) {
                for(let i=0; i<this.product.productTypes.length; i++) {
                    this.product.productTypes[i].types = [];
                }
            }
        },

        addSelection(index) {
            if(index < 2) {
                const lnt = this.types[index].attributes.length;
                const value = this.types[index].attributes[lnt - 1].value;
                if(value.length > 0) {
                    this.types[index].attributes.push({value: ''});
                    this.initProductTypes(index);
                }
                else {
                    this.initProductTypes(2);
                }
            }
        },

        openFileDialog(id) {
            document.getElementById(id).click();
        },

        insertImage(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
                document.getElementById('editor').appendChild(img);
            };
            
            if (file) {
                reader.readAsDataURL(file);
            }
        },

        deleteSelection(index, subindex) {
            this.types[index].attributes.splice(subindex, 1);
            if(index === 0) {
                this.product.productTypes.splice(subindex, 1);
            }
            else if(index === 1) {
                for(let i=0; i<this.product.productTypes.length; i++) {
                    this.product.productTypes[i].types.splice(subindex, 1);
                }
            }
        },

        updateProductTypeImage(index, file) {
            this.product.productTypes[index].image = file;
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
               

                if(size > 1000000) {
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

        async checkForm() {
            let checkImage = true;
            if(this.product.images.length === 0) {
                this.message.imageMessage = this.$t(ERROR_MESSAGE.required_file);
                checkImage = false;
            }

            for(let i=0; i<this.product.productTypes.length - 1; i++) {
                if(this.product.productTypes[i].image === null) {
                    this.errorMessage = this.$t(ERROR_MESSAGE.required_type_file);
                    checkImage = false;
                    break;
                }
            }

            const isValid = await this.$refs.form.validate();
            if(isValid.valid && checkImage) {
                this.errorMessage = '';
                this.message.imageMessage = '';
                this.addProduct();
            }
        },

        async addProduct() {
            for(let i=0; i<this.types.length; i++) {
                this.types[i].attributes.pop();
            }
            this.product.productTypes.pop();
            for(let i=0; i<this.product.productTypes.length; i++) {
                this.product.productTypes[i].types.pop();
            }

            this.product.description = document.getElementById('editor').innerHTML;
            
            let data = {
                product: this.product,
                types: this.types
            }
            const formData = this.objectToFormData(data);
            const response = await ProductApi.add(formData);
            console.log(response);
        },

        objectToFormData(obj, formData = new FormData(), parentKey = '') {
            for (const key in obj) {
                const propName = parentKey ? `${parentKey}.${key}` : key;

                if (key === 'images') {
                    for (let i = 0; i < obj[key].length; i++) {
                        formData.append(`${propName}[${i}]`, obj[key][i]);
                    }
                } else if (key === 'image') {
                    formData.append(propName, obj[key]);
                } else if (Array.isArray(obj[key])) {
                    // Nếu là mảng, đệ quy cho từng phần tử
                    obj[key].forEach((item, index) => {
                        this.objectToFormData(item, formData, `${propName}[${index}]`);
                    });
                } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                    // Nếu là đối tượng, đệ quy
                    this.objectToFormData(obj[key], formData, propName);
                } else {
                    // Thêm vào FormData
                    if(obj[key] !== null) {
                        formData.append(propName, obj[key]);
                    }
                }
            }
            return formData;
        },
    },

    mounted() {
        this.fetchCategory();
    }
}
</script>