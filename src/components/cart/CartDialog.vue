<template>
    <v-menu v-model="dialog" class="pa-3" min-width="250px">
        <!-- <div>

        </div> -->

        <div class="h-100 w-100">
            <Image :imageUrl="imageUrl"></Image>

            <p>{{ $t('message.warn.login_to_check_cart') }}</p>

            <div>
                <v-btn class="h-50 w-100" color="blue" size="large" variant="tonal" :to="{ name: loginPage }" block >
                    {{ $t('login') }}
                </v-btn>

                <v-btn class="h-50 w-100" color="blue" size="large" variant="tonal" :to="{ name: signupPage }" block >
                    {{ $t('signup') }}
                </v-btn>
            </div>
        </div>
    </v-menu>
</template>

<script>
import Image from '../common/Image.vue';
import imageUrl from '@/assets/not_login.webp';

export default {
    data() {
        return {
            dialog: this.cartDialog,
            imageUrl
        }
    },

    props:{
        cartDialog: {
            type: Boolean,
            required: true
        },
    },
}
</script>