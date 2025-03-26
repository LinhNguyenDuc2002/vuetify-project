<template>
    <div>
        <v-form ref="form">
            <v-card class="pa-10 bg-white rounded">
                <div class="d-flex justify-space-between">
                    <div class="w-75 pr-10 border-e-thin">
                        <div class="d-flex justify-space-between">
                            <div style="width: 45%;">
                                <div class="text-subtitle-1 text-medium-emphasis">Username</div>
                                <v-text-field density="compact" variant="outlined" class="mb-3" disabled="">
                                    {{ userData.username }}
                                </v-text-field>
                            </div>

                            <div style="width: 45%;">
                                <div class="text-subtitle-1 text-medium-emphasis">Giới tính</div>
                                <v-radio-group v-model="userData.sex" inline>
                                    <v-radio label="Nam" value="Male"></v-radio>
                                    <v-radio label="Nữ" value="Female"></v-radio>
                                    <v-radio label="Khác" value="Other"></v-radio>
                                </v-radio-group>
                            </div>
                        </div>

                        <div class="d-flex justify-space-between">
                            <div style="width: 45%;">
                                <div class="text-subtitle-1 text-medium-emphasis">First name</div>
                                <v-text-field v-model="userData.first_name" density="compact" variant="outlined" class="mb-3">
                                    <!-- <template v-slot:append-inner>
                                        <span class="text-note">{{ userData.first_name.length }}/20</span>
                                    </template> -->
                                </v-text-field>
                            </div>

                            <div style="width: 45%;">
                                <div class="text-subtitle-1 text-medium-emphasis">Last name</div>
                                <v-text-field v-model="userData.last_name" density="compact" variant="outlined" class="mb-3">
                                    <template v-slot:append-inner>
                                        <span class="text-note">{{ userData.last_name.length }}/20</span>
                                    </template>
                                </v-text-field>
                            </div>
                        </div>

                        <div class="d-flex justify-space-between">
                            <div style="width: 45%;">
                                <div class="text-subtitle-1 text-medium-emphasis">Phone number</div>
                                <v-text-field v-model="userData.phone" density="compact" variant="outlined" class="mb-3">
                                    <template v-slot:append-inner>
                                        <span class="text-note">{{ userData.phone.length }}/10</span>
                                    </template>
                                </v-text-field>
                            </div>

                            <div style="width: 45%;">
                                <div class="text-subtitle-1 text-medium-emphasis">Ngày sinh</div>
                                <v-text-field v-model="birthday" type="date" density="compact" variant="outlined" class="mb-3">
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
                            <v-btn class="btn mb-5" style="height: 40px;" size="large" elevation="0" @click="changeOpenDialog(true)">
                                Chọn ảnh
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
import UserApi from '@/services/api/UserApi';

export default {
    data: () => ({
        imageUrl: imageUrl,
        userData: {
            username: '',
            first_name: '',
            last_name: '',
            phone: '',
            sex: 'Other',
            birthday: null
        }
    }),

    computed: {
        birthday: {
            get() {
                return this.userData.birthday ? this.userData.birthday.split('T')[0] : null;
            },
            set(value) {
                this.userData.birthday = new Date(value).toISOString();
            },
        },
    },

    mounted() {
        this.fetchUser();
    },

    methods: {
        async fetchUser() {
            const response = await UserApi.getLoggedInUser();
            const data = response.data;
            if(data !== null && data.code === 200) {
                this.userData = data.data;
                console.log(this.userData);
            }
        },

        checkForm() {

        },

        updateInfo() {

        },
    }
}
</script>