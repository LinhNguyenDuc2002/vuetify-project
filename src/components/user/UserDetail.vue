<template>
    <div>
        <v-form ref="form">
            <v-card class="d-flex justify-space-between pa-10 bg-white rounded mb-4">
                <div class="w-75 mr-16">

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