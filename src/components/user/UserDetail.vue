<template>
    <div>
        <v-form ref="form">
            <v-card class="pa-10 bg-white rounded">
                <div class="d-flex justify-space-between">
                    <div class="w-75 pr-10 border-e-thin">
                        <div class="text-subtitle-1 text-medium-emphasis">Username</div>
                        <v-text-field density="compact" :placeholder="$t('product.name')"
                            variant="outlined" class="mb-3" disabled="">
                        </v-text-field>

                        <div class="d-flex justify-space-between">
                            <div style="width: 45%;">
                                <div class="text-subtitle-1 text-medium-emphasis">First name</div>
                                <v-text-field density="compact" :placeholder="$t('product.name')"
                                    variant="outlined" class="mb-3">
                                    <template v-slot:append-inner>
                                        <span class="text-note">1/20</span>
                                    </template>
                                </v-text-field>
                            </div>

                            <div style="width: 45%;">
                                <div class="text-subtitle-1 text-medium-emphasis">Last name</div>
                                <v-text-field density="compact" :placeholder="$t('product.name')"
                                    variant="outlined" class="mb-3">
                                    <template v-slot:append-inner>
                                        <span class="text-note">1/20</span>
                                    </template>
                                </v-text-field>
                            </div>
                        </div>

                        <div class="d-flex justify-space-between">
                            <div style="width: 45%;">
                                <div class="text-subtitle-1 text-medium-emphasis">Email</div>
                                <v-text-field density="compact" :placeholder="$t('product.name')"
                                    variant="outlined" class="mb-3">
                                    <template v-slot:append-inner>
                                        <span class="text-note">1/100</span>
                                    </template>
                                </v-text-field>
                            </div>

                            <div style="width: 45%;">
                                <div class="text-subtitle-1 text-medium-emphasis">Phone number</div>
                                <v-text-field density="compact" :placeholder="$t('product.name')"
                                    variant="outlined" class="mb-3">
                                    <template v-slot:append-inner>
                                        <span class="text-note">1/10</span>
                                    </template>
                                </v-text-field>
                            </div>
                        </div>

                        <div class="d-flex justify-space-between">
                            <div style="width: 45%;">
                                <div class="text-subtitle-1 text-medium-emphasis">Giới tính</div>
                                <v-radio-group inline>
                                    <v-radio label="Nam" value="one"></v-radio>
                                    <v-radio label="Nữ" value="two"></v-radio>
                                    <v-radio label="Khác" value="three"></v-radio>
                                </v-radio-group>
                            </div>

                            <div style="width: 45%;">
                                <div class="text-subtitle-1 text-medium-emphasis">Ngày sinh</div>
                                <v-text-field type="date" density="compact" :placeholder="$t('product.name')"
                                    variant="outlined" class="mb-3">
                                    <!-- <template v-slot:append-inner>
                                        <span class="text-note">{{ product.name.length }}/100</span>
                                    </template> -->
                                </v-text-field>
                            </div>
                        </div>
                    </div>

                    <div class="w-25">
                        <div class="w-100 d-flex justify-center">
                            <div class="mb-5" style="border-radius: 50%; height: 80px; width: 80px; background-color: black;">
                                <!-- <Image :imageUrl="imageUrl"></Image> -->
                            </div>
                        </div>

                        <div class="w-100 text-center">
                            <v-btn class="btn mb-5" style="width: 45%; height: 40px;" size="large" elevation="0" @click="changeOpenDialog(true)">
                                <v-icon class="mr-3" size="20">mdi-plus</v-icon>{{ $t('button.add') }}
                            </v-btn>

                            <p style="color: grey;">Dụng lượng file tối đa 1 MB</p>
                            <p style="color: grey;">Định dạng:.JPEG, .PNG</p>
                        </div>
                    </div>
                </div>

                <div class="d-flex w-100 justify-end">
                    <v-btn style="width: 20%;" color="blue" type="submit">Lưu</v-btn>
                </div>
            </v-card>
        </v-form>
    </div>
</template>

<script>
import imageUrl from '@/assets/logo.png';

export default {
    data: () => ({
        imageUrl: imageUrl
    })
}
</script>