// import { BASE_API } from '@/constants/constant';
import BaseApi from './BaseApi';

const BASE_API = "http://localhost:8082"
const CONTEXT_PATH = "/api/product-service/category"

const CategoryApi = {
    getAllPagination: async (search, size, page) => {
        var uri = `${BASE_API}${CONTEXT_PATH}/pagination?search=${search}&size=${size}&page=${page}`;

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

    getAll: async (search) => {
        var uri = `${BASE_API}${CONTEXT_PATH}?search=${search}`;

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