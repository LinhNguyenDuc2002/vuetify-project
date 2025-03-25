<template>
    <div>
        <v-form ref="form">
            <v-card class="pa-10 bg-white rounded">
                <div class="d-flex justify-space-between">
                    <div style="width: 45%;">
                        <div class="text-subtitle-1 text-medium-emphasis">Quốc gia</div>
                        <v-select
                            class="mb-3"
                            :placeholder="$t('product.category')"
                            variant="outlined">
                        </v-select>
                    </div>

                    <div style="width: 45%;">
                        <div class="text-subtitle-1 text-medium-emphasis">Tỉnh</div>
                        <v-select
                            class="mb-3"
                            :placeholder="$t('product.category')"
                            variant="outlined">
                        </v-select>
                    </div>
                </div>

                <div class="d-flex justify-space-between">
                    <div style="width: 45%;">
                        <div class="text-subtitle-1 text-medium-emphasis">Huyện</div>
                        <v-select
                            class="mb-3"
                            :placeholder="$t('product.category')"
                            variant="outlined">
                        </v-select>
                    </div>

                    <div style="width: 45%;">
                        <div class="text-subtitle-1 text-medium-emphasis">Xã</div>
                        <v-select
                            class="mb-3"
                            :placeholder="$t('product.category')"
                            variant="outlined">
                        </v-select>
                    </div>
                </div>

                <div>
                    <div class="text-subtitle-1 text-medium-emphasis">Địa chỉ cụ thể</div>
                    <v-text-field density="compact" :placeholder="$t('product.name')"
                        variant="outlined" class="mb-3">
                        <template v-slot:append-inner>
                            <span class="text-note">1/100</span>
                        </template>
                    </v-text-field>
                </div>

                <div class="d-flex w-100 justify-end">
                    <v-btn style="width: 20%;" color="blue" type="submit">Lưu</v-btn>
                </div>
            </v-card>
        </v-form>
    </div>
</template>

<script>

</script>