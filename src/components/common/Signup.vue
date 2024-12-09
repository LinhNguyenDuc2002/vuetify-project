<template>
    <div class="d-flex justify-between mx-16 mb-5 align-center">
        <v-card class="mx-16 my-6 w-50 text-center" elevation="0">
            <v-img max-width="100%" src="/src/assets/draw2.webp"></v-img>
        </v-card>

        <v-card class="mx-16 pa-12 w-50" elevation="0" rounded="lg">
            <v-card-title class="text-center mb-3">{{ $t('create_an_account') }}</v-card-title>

            <v-form ref="form" @submit.prevent="checkForm">
                <v-text-field class="mb-2" density="compact" variant="outlined" prepend-inner-icon="mdi-account-outline"
                    v-model="userRegistration.username"
                    :placeholder="$t('username')"
                    :error-messages="$t(message.usernameError)">
                </v-text-field>

                <v-text-field class="mb-2" density="compact" prepend-inner-icon="mdi-email-outline" variant="outlined"
                    v-model="userRegistration.email"
                    :placeholder="$t('mail_address')"
                    :error-messages="$t(message.emailError)">
                </v-text-field>

                <v-text-field class="mb-2" density="compact" variant="outlined" prepend-inner-icon="mdi-phone-in-talk-outline"
                    v-model="userRegistration.phone"
                    :placeholder="$t('phone_number')"
                    :error-messages="$t(message.phoneError)">
                </v-text-field>

                <v-text-field class="mb-2" density="compact" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                    v-model="userRegistration.password"
                    :append-inner-icon="visible1 ? 'mdi-eye-off' : 'mdi-eye'" :type="visible1 ? 'text' : 'password'"
                    @mousedown="handleMouseDown"
                    @mouseleave="ruleDialog = false"
                    @blur="ruleDialog = false"
                    :placeholder="$t('password')"
                    @click:append-inner="visible1 = !visible1"
                    :error-messages="$t(message.passwordError)">
                </v-text-field>
                <RulePopUp v-if="ruleDialog" :items=passwordRule></RulePopUp>

                <v-text-field class="mb-2" density="compact" variant="outlined" prepend-inner-icon="mdi-key-outline"
                    v-model="repeatPassword"
                    :placeholder="$t('repeat_your_password')" 
                    :append-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'" :type="visible2 ? 'text' : 'password'"
                    :error-messages="$t(message.repeatError)"
                    @click:append-inner="visible2 = !visible2">
                </v-text-field>

                <p v-if="message.signupError" class="h-100 error-message mb-2">{{ $t(message.signupError) }}</p>

                <div class="form-check d-flex justify-content-center">
                    <input v-model="isChecked" class="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
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
import { EmailRule, PasswordRule, RequiredRule, UsernameRule } from '@/rules/Rule';
import RulePopUp from './RulePopUp.vue';
import { PasswordRuleMessage } from '@/rules/message';
import { ERROR_MESSAGE } from '@/constants/message';
import UserApi from '@/services/api/UserApi';

export default {
  data: () => ({
    loginPage: RouteConstant.LOGIN_PAGE.name,
    visible1: false,
    visible2: false,
    ruleDialog: false,
    clickTimeout: null,
    isChecked: false,
    userRegistration: {
        username: '',
        password: '',
        email: '',
        phone: '',
    },
    repeatPassword: '',
    message: {
        usernameError: '',
        emailError: '',
        phoneError: '',
        passwordError: '',
        repeatError: '',
        signupError: '',
    },
    passwordRule: PasswordRuleMessage
  }),

  methods: {
    goTo(page) {
        this.$router.push({ name: page });
    },

    checkForm() {
        const errorUsername = UsernameRule.map(rule => rule(this.userRegistration.username)).find(error => error !== true);
        this.message.usernameError = errorUsername ? errorUsername : '';

        const errorPassword = PasswordRule.map(rule => rule(this.userRegistration.password)).find(error => error !== true);
        this.message.passwordError = errorPassword ? errorPassword : '';

        const errorEmail = EmailRule.map(rule => rule(this.userRegistration.email)).find(error => error !== true);
        this.message.emailError = errorEmail ? errorEmail : '';

        const errorPhone = RequiredRule.map(rule => rule(this.userRegistration.phone)).find(error => error !== true);
        this.message.phoneError = errorPhone ? errorPhone : '';

        const errorRepeatPassword = RequiredRule.map(rule => rule(this.repeatPassword)).find(error => error !== true);
        this.message.repeatError = errorRepeatPassword ? errorRepeatPassword : '';

        let check = false;
        if(!errorRepeatPassword) {
            if(this.userRegistration.password !== this.repeatPassword) {
                this.message.signupError = ERROR_MESSAGE.repeat_password;
                check = true;
            }
            else if(!this.isChecked) {
                this.message.signupError = ERROR_MESSAGE.term_service;
                check = true;
            }
        }

        if(!errorUsername && !errorPassword && !errorEmail && !errorPhone && !errorRepeatPassword && !check) {
            this.signup()
        }
    },

    async signup() {
        console.log(this.userRegistration);
        this.goTo('OTPPage');
        // const response = await UserApi.signup(this.userRegistration);
        // if(response.code === 200) {
        //     this.goTo('OTPPage');
        // }
    },

    handleMouseDown() {
        if (this.clickTimeout) {
            clearTimeout(this.clickTimeout);
            this.clickTimeout = null;
            this.ruleDialog = true;
        } else {
            this.clickTimeout = setTimeout(() => {
                this.clickTimeout = null; 
            }, 300);
        }
    },
  }
}
</script>