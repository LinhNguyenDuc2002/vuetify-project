import { BASE_API } from '../../constant/RouteConstant';
import { DEFAULT_SIZE } from '../../constant/ParameterConstant';
import * as HeaderParams from '../../constant/SecurityConstant';

import BaseApi from './BaseApi';

const CONTEXT_PATH = "/api/product-service/product"

const ProductApi = {
    getAll: async (page, category) => {
        var uri = `${BASE_API}${CONTEXT_PATH}`;

        var params = {
            page: page,
            size: DEFAULT_SIZE,
            category: category ? category : ''
        }

        var header = {
            [HeaderParams.CONTENT_TYPE]: [HeaderParams.APPLICATION_JSON]
        }

        const response = await BaseApi.get(uri, header, params)
        if(response != null) {
            return response.data;
        }
        return response;
    },

    get: async (id) => {
        // const token = sessionStorage.getItem('access_token');

        var uri = `${BASE_API}${CONTEXT_PATH}/${id}`;

        var params = {}

        var header = {
            [HeaderParams.CONTENT_TYPE]: [HeaderParams.APPLICATION_JSON],
            // [HeaderParams.AUTHORIZATION]: `Bearer ${token}`
        }

        const response = await BaseApi.get(uri, header, params)
        if(response != null) {
            return response.data;
        }
        return response;
    },

    add: async(data, file) => {
        const token = sessionStorage.getItem('access_token');

        var uri = `${BASE_API}${CONTEXT_PATH}`;

        const formData = new FormData();
        formData.append('product', JSON.stringify(data));
        file.forEach((image) => {
            formData.append('images', image);
        });

        var header = {
            [HeaderParams.CONTENT_TYPE]: [HeaderParams.MULTIPART_FORM_DATA],
            [HeaderParams.AUTHORIZATION]: `Bearer ${token}`
        }

        const response = await BaseApi.post(uri, formData, header)
        if(response != null) {
            return response.data;
        }
        return response;
    },

    delete: async(id) => {
        const token = sessionStorage.getItem('access_token');

        var uri = `${BASE_API}${CONTEXT_PATH}/${id}`;

        var header = {
            [HeaderParams.CONTENT_TYPE]: [HeaderParams.APPLICATION_JSON],
            [HeaderParams.AUTHORIZATION]: `Bearer ${token}`
        }

        const response = await BaseApi.delete(uri, header)
        if(response != null) {
            return response.data;
        }
        return response;
    }
};

export default ProductApi;