import { BASE_PRODUCT_SERVICE, BASE_API } from '../../constant/RouteConstant';
import BaseApi from './BaseApi';

const CONTEXT_PATH = "/api/product-service/category"

const CategoryApi = {
    getAll: async () => {
        var uri = `${BASE_API}${CONTEXT_PATH}`;

        var header = {
            'Content-Type': 'application/json'
        }

        var params = {};

        const response = await BaseApi.get(uri, header, params);
        if(response != null) {
            return response.data;
        }
        return response;
    },
};

export default CategoryApi;