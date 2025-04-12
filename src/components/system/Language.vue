<template>
    <div>
        <v-form ref="form">
            <v-card class="pa-10 bg-white rounded">
                <div class="text-subtitle-1 text-medium-emphasis">Ngôn ngữ</div>
                <v-select
                    v-model="language"
                    :items="languages"
                    item-value="id"
                    item-title="name"
                    density="compact"
                    :rules="selectRule"
                    :placeholder="$t('product.category')"
                    variant="outlined">
                </v-select>

                <div class="d-flex w-100 justify-end">
                    <v-btn style="width: 20%;" color="blue" type="submit">Lưu</v-btn>
                </div>
            </v-card>
        </v-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            language: null,
            languages: [
                {
                    id: 'vi',
                    name: 'Viet Nam'
                },
                {
                    id: 'en',
                    name: 'English'
                },
                {
                    id: 'ja',
                    name: 'Japan'
                }
            ]
        }
    },
}
</script>