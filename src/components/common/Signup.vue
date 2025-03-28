<template>
    <div class="d-flex justify-between mx-16 mb-5 align-center" style="margin-top: 5%;">
        <Image class="mx-16 my-6 w-50 text-center" :imageUrl="imageUrl"></Image>

        <v-card class="mx-16 px-12 pt-12 w-50" elevation="0" rounded="lg">
            <v-card-title class="text-center mb-3 text-uppercase">{{ $t('create_an_account') }}</v-card-title>

            <v-form ref="form" @submit.prevent="checkForm">
                <v-text-field class="mb-2" density="compact" variant="outlined" prepend-inner-icon="mdi-account-outline"
                    v-model="userRegistration.username"
                    :placeholder="$t('username')"
                    :error-messages="$t(message.usernameError)"
                    :rules="usernameRule">
                </v-text-field>

                <v-text-field class="mb-2" density="compact" prepend-inner-icon="mdi-email-outline" variant="outlined"
                    v-model="userRegistration.email"
                    :placeholder="$t('mail_address')"
                    :error-messages="$t(message.emailError)"
                    :rules="emailRule">
                </v-text-field>

                <v-text-field class="mb-2" density="compact" variant="outlined" prepend-inner-icon="mdi-phone-in-talk-outline"
                    v-model="userRegistration.phone"
                    :placeholder="$t('phone_number')"
                    :error-messages="$t(message.phoneError)"
                    :rules="requiredRule(10)">
                </v-text-field>

                <v-text-field class="mb-2" density="compact" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                    v-model="userRegistration.password"
                    :append-inner-icon="visible1 ? 'mdi-eye-off' : 'mdi-eye'" :type="visible1 ? 'text' : 'password'"
                    @mousedown="handleMouseDown"
                    @mouseleave="ruleDialog = false"
                    @blur="ruleDialog = false"
                    :placeholder="$t('password')"
                    @click:append-inner="visible1 = !visible1"
                    :error-messages="$t(message.passwordError)"
                    :rules="passwordRule">
                </v-text-field>
                <RulePopUp v-if="ruleDialog" :items=passwordRule></RulePopUp>

                <v-text-field class="mb-2" density="compact" variant="outlined" prepend-inner-icon="mdi-key-outline"
                    v-model="repeatPassword"
                    :placeholder="$t('repeat_your_password')" 
                    :append-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'" :type="visible2 ? 'text' : 'password'"
                    :error-messages="$t(message.repeatError)"
                    @click:append-inner="visible2 = !visible2"
                    :rules="repeatPasswordRule">
                </v-text-field>

                <p v-if="message.signupError" class="h-100 error-message mb-2">{{ $t(message.signupError) }}</p>

                <div class="form-check d-flex justify-content-center">
                    <input v-model="isChecked" class="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                    <label class="form-check-label" for="form2Example3g">
                        I agree all statements in <a href="#!" class="text-blue text-decoration-none" @click.prevent="changeTermPopup(true)">Terms of service</a>
                    </label>
                </div>

                <v-btn type="submit" class="mb-8 mt-8" color="blue" size="large" variant="tonal" block>
                    <span v-if="!signupLoading">Register</span>
                    <Loading v-else></Loading>
                </v-btn>
            </v-form>

            <p class="text-center text-muted mt-5">
                Have already an account?
                <a href="#" @click.prevent="goTo(loginPage)" class="text-blue text-decoration-none">Login here</a>
            </p>
        </v-card>
    </div>

    <Terms v-if="termPopup" :termPopup="termPopup"  @close-term-popup="changeTermPopup"></Terms>
</template>

<script>
import { RouteConstant } from '@/constants/route_constant';
import { EmailRule, PasswordRule, RepeatPasswordRule, RequiredRule, UsernameRule } from '@/rules/Rule';
import RulePopUp from './RulePopUp.vue';
import { PasswordRuleMessage } from '@/rules/message';
import { ERROR_MESSAGE } from '@/constants/message';
import UserApi from '@/services/api/UserApi';
import imageUrl from '@/assets/draw2.webp';
import * as SecurityConstant from '@/constants/security_constant';
import { OTP_TYPE } from '@/constants/variable_constant';

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
        passwordRule: PasswordRuleMessage,
        signupLoading: false,
        termPopup: false,
        imageUrl,
    }),

    computed: {
        usernameRule() {
            return UsernameRule(this.$t);
        },
        passwordRule() {
            return PasswordRule(this.$t);
        },
        emailRule() {
            return EmailRule(this.$t);
        },
        repeatPasswordRule() {
            return RepeatPasswordRule(this.userRegistration.password, this.$t);
        },
    },

    methods: {
        requiredRule(size) {
            return RequiredRule(size, this.$t);
        },

        goTo(page) {
            this.$router.push({ name: page });
        },

        changeTermPopup(value) {
            this.termPopup = value;
        },

        async checkForm() {
            const isValid = await this.$refs.form.validate();
            if(isValid.valid) {
                let check = true;
                if(!this.isChecked) {
                    this.message.signupError = ERROR_MESSAGE.term_service;
                    check = false;
                }
                
                if(check) {
                    this.signup();
                }
            }
        },

        async signup() {
            this.signupLoading = true;
            
            const response = await UserApi.signup(this.userRegistration);
            console.log(response);
            if(response.data.code === 200) {
                sessionStorage.setItem(SecurityConstant.SECRET_KEY, response.data.data['secret_key']);
                sessionStorage.setItem(SecurityConstant.MAIL, response.data.data['mail']);
                sessionStorage.setItem(SecurityConstant.OTP_OPTION, OTP_TYPE.CREATE_ACCOUNT);
                this.goTo('OTPPage');
            }
            else {
                this.message.signupError = response.data['message']
            }
            this.signupLoading = false;
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