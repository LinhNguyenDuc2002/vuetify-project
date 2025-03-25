<template>
    <div>
        <v-form ref="form">
            <v-card class="pa-10 bg-white rounded">
                <div>
                    <div class="text-subtitle-1 text-medium-emphasis">Mật khẩu hiện tại</div>
                    <v-text-field density="compact" :placeholder="$t('product.name')"
                        variant="outlined" class="mb-3">
                        <template v-slot:append-inner>
                            <span class="text-note">1/100</span>
                        </template>
                    </v-text-field>

                    <div class="text-subtitle-1 text-medium-emphasis">Mật khẩu mới</div>
                    <v-text-field density="compact" :placeholder="$t('product.name')"
                        variant="outlined" class="mb-3">
                        <template v-slot:append-inner>
                            <span class="text-note">1/100</span>
                        </template>
                    </v-text-field>

                    <div class="text-subtitle-1 text-medium-emphasis">Nhập lại mật khẩu mới</div>
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