<template>
    <div class="d-flex justify-between mx-16 mb-5 align-center">
        <v-card class="mx-16 my-6 w-50 text-center" elevation="0">
            <v-img max-width="100%" src="../assets/draw1.webp"></v-img>
        </v-card>

        <v-card class="mx-16 pa-12 w-50" elevation="0" rounded="lg">
            <v-card-title class="text-center mb-3">{{ $t('create_an_account') }}</v-card-title>

            <v-form>
                <v-text-field class="mb-2" density="compact" :placeholder="$t('username')" prepend-inner-icon="mdi-account-outline"
                    variant="outlined"></v-text-field>

                <v-text-field class="mb-2" density="compact" :placeholder="$t('mail_address')" prepend-inner-icon="mdi-email-outline"
                variant="outlined"></v-text-field>

                <v-text-field class="mb-2" density="compact" :placeholder="$t('phone_number')" prepend-inner-icon="mdi-phone-in-talk-outline"
                variant="outlined"></v-text-field>

                <v-text-field 
                    class="mb-2" density="compact" :placeholder="$t('password')" prepend-inner-icon="mdi-lock-outline"
                    :append-inner-icon="visible1 ? 'mdi-eye-off' : 'mdi-eye'" :type="visible1 ? 'text' : 'password'"
                    @click:append-inner="visible1 = !visible1"
                    variant="outlined">
                </v-text-field>

                <v-text-field class="mb-2" density="compact" :placeholder="$t('repeat_your_password')" prepend-inner-icon="mdi-key-outline"
                    :append-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'" :type="visible2 ? 'text' : 'password'"
                    @click:append-inner="visible2 = !visible2"
                    variant="outlined">
                </v-text-field>

                <div class="form-check d-flex justify-content-center">
                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                    <label class="form-check-label" for="form2Example3g">
                        I agree all statements in <a href="#!" class="text-blue text-decoration-none">Terms of service</a>
                    </label>
                </div>

                <v-btn type="submit" class="mb-8 mt-8" color="blue" size="large" variant="tonal" block>
                    Register
                </v-btn>
            </v-form>

            <p class="text-center text-muted mt-5">
                Have already an account?
                <a href="#" @click.prevent="goTo(loginPage)" class="text-blue text-decoration-none">Login here</a>
            </p>
        </v-card>
  </div>
</template>

<script>
import { RouteConstant } from '@/constants/route_constant';

export default {
  data: () => ({
    loginPage: RouteConstant.LOGIN_PAGE.name,
    visible1: false,
    visible2: false,
    userRegistration: {
        username: '',
        password: '',
        email: '',
        phone: '',
    }
  }),

  methods: {
    goTo(page) {
        this.$router.push({ name: page });
    },
  }
}
</script>