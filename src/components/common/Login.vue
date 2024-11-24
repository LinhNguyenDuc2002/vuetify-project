<template>
    <div class="d-flex justify-between mx-16 mb-5 align-center">
        <v-card class="mx-16 my-6 w-50 text-center" elevation="0">
            <v-img max-width="100%" src="/src/assets/draw1.webp"></v-img>
        </v-card>

        <v-card class="mx-16 pa-12 w-50" elevation="0" rounded="lg">
            <v-card-title class="text-center mb-3 text-uppercase">{{ $t('login') }}</v-card-title>

            <div class="text-subtitle-1 text-medium-emphasis">{{ $t('username') }}</div>

            <v-text-field v-model="username" density="compact" :placeholder="$t('username')" prepend-inner-icon="mdi-account-outline"
                variant="outlined"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                {{ $t('password') }}
                <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
                    {{ $t('forgot_login_password') }}?
                </a>
            </div>

            <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                density="compact" :placeholder="$t('enter_your_password')" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="visible = !visible"></v-text-field>

            <div class="d-flex mb-5">
                <input class="mr-2" style="font-size: 15px;" type="checkbox" value="" id="remember-me" />
                <label for="remember-me"> {{ $t('remember_me') }} </label>
            </div>

            <v-btn class="mb-8" color="blue" size="large" variant="tonal" block>
                {{ $t('login') }}
            </v-btn>

            <hr class="my-4">
            <div class="mt-8">
                <v-btn class="w-100 mb-3 text-center mb-5" size="large" data-mdb-ripple-init style="background-color: #dd4b39; color: white;"
                type="submit">
                    <v-icon class="mr-1" size="20" color="white">mdi-google</v-icon> {{ $t('sign_in_with_google') }}
                </v-btn>
                <v-btn class="w-100 mb-3 text-center" size="large" data-mdb-ripple-init style="background-color: #3b5998; color: white;"
                type="submit">
                    <v-icon class="mr-1" size="20" color="white">mdi-facebook</v-icon> {{ $t('sign_in_with_facebook') }}
                </v-btn>
            </div>

            <v-card-text class="text-center">
                <a class="text-blue text-decoration-none" href="#" @click.prevent="goTo(signupPage)" rel="noopener noreferrer" target="_blank">
                    {{ $t('signup') }} <v-icon icon="mdi-chevron-right"></v-icon>
                </a>
            </v-card-text>
        </v-card>
  </div>
</template>

<script>
import { RouteConstant } from '@/constants/route_constant';

export default {
  data: () => ({
    signupPage: RouteConstant.SIGNUP_PAGE.name,
    visible: false,
    username: '',
    password: ''
  }),

  methods: {
    goTo(page) {
        this.$router.push({ name: page });
    },
  },

//   mounted() {
//     console.log(import.meta.env.VITE_API_URL);
//   }
}
</script>