<template>
    <div>
        <v-form ref="form" @submit.prevent="updateInfo">
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
                                <v-radio-group inline v-model="userData.sex" :rules="radioRule">
                                    <v-radio label="Nam" :value="true"></v-radio>
                                    <v-radio label="Nữ" :value="false"></v-radio>
                                    <v-radio label="Khác" value="other"></v-radio>
                                </v-radio-group>
                            </div>
                        </div>

                        <div class="d-flex justify-space-between">
                            <div style="width: 45%;">
                                <div class="text-subtitle-1 text-medium-emphasis">First name</div>
                                <v-text-field v-model="userData.first_name" density="compact" variant="outlined" class="mb-3"
                                    :rules="requiredRule(20)" :maxlength="20">
                                    <!-- <template v-slot:append-inner>
                                        <span class="text-note">{{ userData.first_name.length }}/20</span>
                                    </template> -->
                                </v-text-field>
                            </div>

                            <div style="width: 45%;">
                                <div class="text-subtitle-1 text-medium-emphasis">Last name</div>
                                <v-text-field v-model="userData.last_name" density="compact" variant="outlined" class="mb-3"
                                    :rules="requiredRule(20)" :maxlength="20">
                                    <template v-slot:append-inner>
                                        <span class="text-note">{{ userData.last_name.length }}/20</span>
                                    </template>
                                </v-text-field>
                            </div>
                        </div>

                        <div class="d-flex justify-space-between">
                            <div style="width: 45%;">
                                <div class="text-subtitle-1 text-medium-emphasis">Phone number</div>
                                <v-text-field v-model="userData.phone" density="compact" variant="outlined" class="mb-3"
                                    :rules="requiredRule(10)" :maxlength="10">
                                    <template v-slot:append-inner>
                                        <span class="text-note">{{ userData.phone.length }}/10</span>
                                    </template>
                                </v-text-field>
                            </div>

                            <div style="width: 45%;">
                                <div class="text-subtitle-1 text-medium-emphasis">Ngày sinh</div>
                                <v-text-field v-model="birthday" type="date" density="compact" variant="outlined" class="mb-3"
                                    :rules="birthdayRule">
                                </v-text-field>
                            </div>
                        </div>
                    </div>

                    <div class="w-25">
                        <div class="w-100 d-flex justify-center">
                            <div class="mb-5" style="height: 80px; width: 80px;">
                                <v-img class="border-thin" width="100%" height="100%" :src="createObjectURL()" alt="Product image" style="border-radius: 50%;"></v-img>
                            </div>
                        </div>

                        <div class="w-100 text-center">
                            <v-file-input hide-input prepend-icon="" v-model="image" id="file-input-avatar" accept="image/*" 
                                @change="handleFileUpload">
                                <template #prepend>
                                    <v-btn class="btn mb-5" style="height: 40px;" size="large" elevation="0" @click="openFileDialog('file-input-avatar')">
                                        Chọn ảnh
                                    </v-btn>
                                </template>
                            </v-file-input>

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
import imageUrl from '@/assets/avatar.webp';
import UserApi from '@/services/api/UserApi';
import { RequiredRule, BirthdayRule, FileRule, RadioRule } from '@/rules/Rule';

export default {
    data: () => ({
        image: null,
        imageMessage: '',
        userData: {
            username: '',
            first_name: '',
            last_name: '',
            phone: '',
            sex: null,
            birthday: null,
            avatar_url: ''
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
        birthdayRule() {
            return BirthdayRule(this.$t);
        },
        fileRule() {
            return FileRule(2, this.$t);
        },
        radioRule() {
            return RadioRule(this.$t);
        }
    },

    mounted() {
        this.fetchUser();
    },

    methods: {
        requiredRule(maxLength) {
            return RequiredRule(maxLength, this.$t);
        },

        async fetchUser() {
            const response = await UserApi.getLoggedInUser();
            const data = response.data;
            console.log(data);
            if(data !== null && data.code === 200) {
                this.userData = data.data;
                if(!this.userData.sex) {
                    this.userData.sex = 'other';
                }
            }
        },

        async updateInfo() {
            console.log(this.userData);
            const isValid = await this.$refs.form.validate();

            let formData = new FormData();
            formData.append('firstName', this.userData.first_name);
            formData.append('lastName', this.userData.last_name);
            formData.append('dob', new Date(this.userData.birthday));
            formData.append('phone', this.userData.phone);
            if(this.userData.sex !== 'other') {
                formData.append('sex', this.userData.sex);
            }
            if(this.image) {
                formData.append('avatar', this.image);
            }

            if(isValid.valid) {
                this.imageMessage = '';
                const response = await UserApi.update(formData);
                const data = response.data;
                if(data !== null && data.code === 200) {
                    
                }
            }
        },

        openFileDialog(key) {
            document.getElementById(key).click();
        },

        handleFileUpload(event) {
            const isValid = this.fileRule.every(rule => {
                const result = rule(this.image);
                if (result !== true) {
                    this.imageMessage = result;
                    return false; // Dừng vòng lặp khi có lỗi
                }
                return true; // Tiếp tục nếu không có lỗi
            });

            if (!isValid) {
                return; // Nếu không hợp lệ, dừng xử lý
            }
        },

        createObjectURL() {
            if(this.image !== null && this.image instanceof File) {
                return URL.createObjectURL(this.image);
            }

            if(this.userData.avatar_url) {
                return this.userData.avatar_url;
            }
           
            return imageUrl;
        }
    }
}
</script>