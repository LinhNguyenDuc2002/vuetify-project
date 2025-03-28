import { ENV_BASE_API } from '@/constants/env_constant';
import BaseApi from './BaseApi';
import * as HeaderParam from '@/constants/header_constant';
import I18n from '@/i18n/i18n';

const CONTEXT_PATH = "/api/product-service/product"

const ProductApi = {
    getAll: async (page, size, search, category, sort) => {
        var uri = `${ENV_BASE_API}${CONTEXT_PATH}`;

        var params = {
            'page': page,
            'size': size,
            'search': search ? search : null,
            'category': category ? category : null,
            'sort-columns': sort ? sort : null
        }

        var header = {
            [HeaderParam.CONTENT_TYPE]: [HeaderParam.APPLICATION_JSON],
            [HeaderParam.ACCEPT_LANGUAGE]: I18n.global.locale
        }

        const response = await BaseApi.get(uri, header, params);
        if(response == null) {
            return null;
        }
        return response;
    },

    get: async (id) => {
        var uri = `${ENV_BASE_API}${CONTEXT_PATH}/${id}`;

        var header = {
            [HeaderParam.CONTENT_TYPE]: [HeaderParam.APPLICATION_JSON],
            [HeaderParam.ACCEPT_LANGUAGE]: I18n.global.locale
        }

        const response = await BaseApi.get(uri, header, null);
        if(response == null) {
            return null;
        }
        return response;
    },

    add: async(data) => {
        const token = sessionStorage.getItem('access_token');

        var uri = `${ENV_BASE_API}${CONTEXT_PATH}`;

        var header = {
            [HeaderParam.CONTENT_TYPE]: [HeaderParam.APPLICATION_FORM_DATA],
            // [HeaderParam.AUTHORIZATION]: `Bearer ${token}`,
            [HeaderParam.ACCEPT_LANGUAGE]: I18n.global.locale
        }

        const response = await BaseApi.post(uri, data, header)
        if(response == null) {
            return null;
        }
        return response.data;
    },

    delete: async(id) => {
        const token = sessionStorage.getItem('access_token');

        var uri = `${BASE_API}${CONTEXT_PATH}/${id}`;

        var header = {
            [HeaderParam.CONTENT_TYPE]: [HeaderParam.APPLICATION_JSON],
            [HeaderParam.AUTHORIZATION]: `Bearer ${token}`
        }

        const response = await BaseApi.delete(uri, header)
        if(response != null) {
            return response.data;
        }
        return response;
    }
};

export default ProductApi;