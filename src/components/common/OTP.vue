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
        
            <v-btn class="my-4" color="purple" height="40" variant="flat" width="70%">{{ $t('otp.btn.verify') }}</v-btn>
        
            <div class="text-caption">
                {{ $t('otp.message.remind') }} <a href="#" @click.prevent="otp = ''">{{ $t('otp.btn.resend') }}</a>
            </div>
        </v-card>
    </div>
</template>
  
<script>
export default {
    data: () => ({
        otp: '',
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
}
</script>