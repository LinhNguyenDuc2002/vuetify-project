import { BASE_API } from '../../constant/RouteConstant';
import { DEFAULT_SIZE } from '../../constant/ParameterConstant';
import * as HeaderParams from '../../constant/SecurityConstant';

import BaseApi from './BaseApi';

const CONTEXT_PATH = "/api/product-service/product-type"

const ProductTypeApi = {
    getAll: async (page, category) => {
        var uri = `${BASE_API}${CONTEXT_PATH}`;

        var params = {
            page: page,
            size: DEFAULT_SIZE,
            category: category ? category : ''
        }

        var header = {
            'Content-Type': 'application/json'
        }

        const response = await BaseApi.get(uri, header, params)
        if(response != null) {
            return response.data;
        }
        return response;
    },

    get: async (id) => {
        var uri = `${BASE_API}${CONTEXT_PATH}/${id}`;

        var params = {}

        var header = {
            'Content-Type': 'application/json',
        }

        const response = await BaseApi.get(uri, header, params)
        if(response != null) {
            return response.data;
        }
        return response;
    },
};

export default ProductTypeApi;