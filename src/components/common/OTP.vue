<template>
    <div class="d-flex align-center" style="height: 90%;">
        <v-card class="py-8 px-6 text-center mx-auto" elevation="8" max-width="400" width="100%">
            <h3 class="text-h6 mb-4">{{ $t('otp.title') }}</h3>
        
            <div class="text-body-2">
                We sent a verification code to john..@gmail.com <br />
        
                Please check your email and paste the code below.
            </div>
        
            <v-sheet color="surface">
                <v-otp-input v-model="otpNumber" variant="solo"></v-otp-input>
            </v-sheet>

            <p v-if="messageError" class="h-100 error-message mb-2">{{ $t(messageError) }}</p>
        
            <v-btn class="my-4" color="purple" height="40" variant="flat" width="70%" @click="toCreateAccount">{{ $t('otp.btn.verify') }}</v-btn>
        
            <div class="text-caption">
                {{ $t('otp.message.remind') }} <a href="#" @click.prevent="otp = ''">{{ $t('otp.btn.resend') }}</a>
            </div>
        </v-card>
    </div>
</template>
  
<script>
import UserApi from '@/services/api/UserApi';

export default {
    data: () => ({
        otp: '',
        type: {
            CREATE_ACCOUNT: 'CREATE_ACCOUNT',
        },
        messageError: '',
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

        // OTPauthentication() {
        //     if(this.propType === this.type.CREATE_ACCOUNT) {

        //     }
        // },

        async toCreateAccount() {
            if(sessionStorage.getItem("temp_key") !== null) {
                const data = {
                    secret: sessionStorage.getItem("temp_key"),
                    otp: this.otp
                }

                const response = await UserApi.verifyOTPToCreateAccount(data);
                if(response.code === 200) {
                    this.goTo('LoginPage');
                }
                else {
                    this.messageError = 'message.error.otp_wrong';
                }
            }
            
        }
    }
}
</script>