<template>
    <div class="d-flex align-center" style="height: 90%;">
        <v-card v-if="!check" class="py-8 px-6 text-center mx-auto" elevation="8" max-width="450" width="100%">
            <Title :title="$t('otp.title')"></Title>
        
            <div class="text-body-2" v-html="$t('message.info.otp', { email: email })"></div>
        
            <v-sheet color="surface">
                <v-otp-input v-model="otpNumber" variant="solo"></v-otp-input>
            </v-sheet>

            <p v-if="messageError" class="h-100 error-message mb-2">{{ $t(messageError) }}</p>
        
            <v-btn class="my-4" color="purple" height="40" variant="flat" width="70%" @click="OTPAuthentication">
                <span v-if="!otpLoading">{{ $t('otp.btn.verify') }}</span>
                <Loading v-else></Loading>
            </v-btn>
        
            <div class="text-caption">
                {{ $t('otp.message.remind') }} <a href="#" @click.prevent="otp = ''">{{ $t('otp.btn.resend') }}</a>
            </div>
        </v-card>

        <Success v-else :message="$t('message.info.create_account')" :page="'LoginPage'"></Success>
    </div>
</template>
  
<script>
import UserApi from '@/services/api/UserApi';
import * as SecurityConstant from '@/constants/security_constant';
import { OTP_TYPE } from '@/constants/variable_constant';

export default {
    data: () => ({
        otp: '',
        messageError: '',
        email: sessionStorage.getItem(SecurityConstant.MAIL),
        otpLoading: false,
        check: false,
    }),

    computed: {
        otpNumber: {
            get() {
                return this.otp;
            },

            set(value) {
                this.otp = value.replace(/[^0-9]/g, '');
            },
        },
    },

    methods: {
        goTo(page) {
            this.$router.push({ name: page });
        },

        OTPAuthentication() {
            const otpType = sessionStorage.getItem(SecurityConstant.OTP_OPTION);
            if(otpType === OTP_TYPE.CREATE_ACCOUNT) {
                this.toCreateAccount();
            }
        },

        async toCreateAccount() {
            this.otpLoading = true;
            const key = sessionStorage.getItem(SecurityConstant.SECRET_KEY)
            if(key !== null) {
                const data = {
                    secret: key,
                    otp: this.otp
                }

                const response = await UserApi.verifyOTPToCreateAccount(data);
                if(response.code === 200) {
                    sessionStorage.removeItem(SecurityConstant.SECRET_KEY);
                    sessionStorage.removeItem(SecurityConstant.OTP_OPTION);
                    sessionStorage.removeItem(SecurityConstant.MAIL);
                    this.check = true;
                    this.otpLoading = false;
                }
                else {
                    this.otpLoading = false;
                    this.messageError = 'message.error.otp_wrong';
                }
            }
        }
    }
}
</script>