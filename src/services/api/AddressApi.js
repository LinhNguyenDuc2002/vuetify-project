import { ENV_BASE_API } from '@/constants/env_constant';
import * as HeaderParam from '@/constants/header_constant';

import BaseApi from './BaseApi';
import I18n from '@/i18n/i18n';

const CONTEXT_PATH = "/api/user-service/address"

const AddressApi = {
    get: async () => {
        const token = sessionStorage.getItem('access_token');

        var uri = `${ENV_BASE_API}${CONTEXT_PATH}`;

        var header = {
            [HeaderParam.CONTENT_TYPE]: [HeaderParam.APPLICATION_JSON],
            [HeaderParam.ACCEPT_LANGUAGE]: I18n.global.locale,
            [HeaderParam.AUTHORIZATION]: `Bearer ${token}`,
        }

        var params = {}

        const response = await BaseApi.get(uri, header, params);
        if(response === null) {
            return null;
        }
        return response;
    },

    update: async (data) => {
        const token = sessionStorage.getItem('access_token');

        var uri = `${ENV_BASE_API}${CONTEXT_PATH}`;

        var header = {
            [HeaderParam.CONTENT_TYPE]: [HeaderParam.APPLICATION_JSON],
            [HeaderParam.ACCEPT_LANGUAGE]: I18n.global.locale,
            [HeaderParam.AUTHORIZATION]: `Bearer ${token}`
        }

        const response = await BaseApi.put(uri, data, header);
        if(response == null) {
            return null;
        }
        return response;
    },

    getAllCities: async () => {
        var uri = 'https://esgoo.net/api-tinhthanh/1/0.htm';

        var header = {}

        var params = {}

        const response = await BaseApi.get(uri, header, params);
        if(response == null) {
            return null;
        }
        return response;
    },

    getAllDistricts: async (cityId) => {
        var uri = `https://esgoo.net/api-tinhthanh/2/${cityId}.htm`;

        var header = {}

        var params = {}

        const response = await BaseApi.get(uri, header, params);
        if(response == null) {
            return null;
        }
        return response;
    },

    getAllWards: async (districtId) => {
        var uri = `https://esgoo.net/api-tinhthanh/3/${districtId}.htm`;

        var header = {}

        var params = {}

        const response = await BaseApi.get(uri, header, params);
        if(response == null) {
            return null;
        }
        return response;
    }
};

export default AddressApi;