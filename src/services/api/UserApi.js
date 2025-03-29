import { ENV_BASE_API } from '@/constants/env_constant';
import BaseApi from './BaseApi';
import * as HeaderParam from '@/constants/header_constant';
import I18n from '@/i18n/i18n';

const CONTEXT_PATH = "/api/user-service/user"

const UserApi = {
    getLoggedInUser: async () => {
        const token = sessionStorage.getItem('access_token');

        var uri = `${ENV_BASE_API}${CONTEXT_PATH}/me`;

        var header = {
            [HeaderParam.CONTENT_TYPE]: 'application/json',
            [HeaderParam.AUTHORIZATION]: `Bearer ${token}`,
            [HeaderParam.ACCEPT_LANGUAGE]: I18n.global.locale
        }

        var params = {}

        const response = await BaseApi.get(uri, header, params);
        if(response === null) {
            return null;
        }
        return response;
    },

    signup: async (data) => {
        var uri = `${ENV_BASE_API}${CONTEXT_PATH}/customer`;
        console.log(I18n.global.locale)

        var header = {
            [HeaderParam.CONTENT_TYPE]: 'application/json',
            [HeaderParam.ACCEPT_LANGUAGE]: I18n.global.locale
        }

        const response = await BaseApi.post(uri, data, header);
        if(response == null) {
            return null;
        }
        return response;
    },

    verifyOTPToCreateAccount: async (data) => {
        var uri = `${ENV_BASE_API}${CONTEXT_PATH}/verify`;

        var header = {
            [HeaderParam.CONTENT_TYPE]: 'application/json',
            [HeaderParam.ACCEPT_LANGUAGE]: I18n.global.locale,

        }

        const response = await BaseApi.post(uri, data, header);
        if(response == null) {
            return null;
        }
        return response.data;
    },

    update: async (data) => {
        const token = sessionStorage.getItem('access_token');
        var uri = `${ENV_BASE_API}${CONTEXT_PATH}`;

        var header = {
            [HeaderParam.CONTENT_TYPE]: [HeaderParam.APPLICATION_FORM_DATA],
            [HeaderParam.AUTHORIZATION]: `Bearer ${token}`,
            [HeaderParam.ACCEPT_LANGUAGE]: I18n.global.locale
        }

        const response = await BaseApi.put(uri, data, header);
        if(response == null) {
            return null;
        }
        return response;
    }
};

export default UserApi;