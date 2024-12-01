<template>
    <div>
        <div class="d-flex justify-between align-center w-100 h-100">
            <div class="h-100 w-50 mr-auto">
                <div class="text-subtitle-1 text-medium-emphasis">{{ $t('product.name') }}</div>
                <v-text-field v-model="product.name"density="compact" :placeholder="$t('product.name')"
                variant="outlined"></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis">{{ $t('product.category') }}</div>
                <v-select
                    v-model="product.category_id"
                    :items="categories"
                    item-value="id"
                    item-title="name"
                    density="compact"
                    :placeholder="$t('product.category')"
                    variant="outlined">
                </v-select>
            </div>

            <div class="w-50 ml-16 h-100">
                <div class="position-relative d-flex justify-between" style="margin-bottom: 15px;">
                    <div class="mr-5">
                        <input type="file" id="file-input" multiple accept="image/*" @change="handleFileUpload">
                        <v-btn @click="openFileDialog" color="blue" elevation="0">Chọn ảnh</v-btn>
                    </div>

                    <p class="h-100 text-center" style="color: red;">shdsd jdjsd dgywe ưdwdkwd</p>
                </div>

                <div class="preview" style="min-height: 75px">
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
                <v-textarea
                    v-model="product.description"
                    class="w-100"
                    variant="outlined"
                    auto-grow
                    shaped>
                </v-textarea>
            </v-col>
        </div>

        <ProductDetailTable :details="product.product_details"></ProductDetailTable>

        <div class="d-flex w-100 my-5 justify-end">
            <v-btn style="width: 20%;" color="blue">Thêm sản phẩm</v-btn>
        </div>
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
export default {
    data () {
        return {
            product: {
                name: '',
                description: '',
                category_id: null,
                images: [],
                product_details: [
                    
                ]
            },
            images: [],
            categories: [],
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
            const fileArray = Array.from(files);

            fileArray.forEach(file => {
                const url = URL.createObjectURL(file);
                this.images.push(url);
                this.product.images.push(file);
            });
        },

        removeImage(index) {
            URL.revokeObjectURL(this.images[index]);
            this.images.splice(index, 1);
            this.product.images.splice(index, 1);
        }
    },

    mounted() {
        this.fetchCategory();
    }
}
</script>