import { ENV_BASE_API } from '@/constants/env_constant';
import BaseApi from './BaseApi';
import * as HeaderParam from '@/constants/header_constant';

const CONTEXT_PATH = "/api/user-service/user"

const UserApi = {
    getLoggedInUser: async () => {
        const token = sessionStorage.getItem('access_token');

        var uri = `${ENV_BASE_API}${CONTEXT_PATH}/me`;

        var header = {
            [HeaderParam.CONTENT_TYPE]: 'application/json',
            [HeaderParam.AUTHORIZATION]: `Bearer ${token}`
        }

        var params = {}

        const response = await BaseApi.get(uri, header, params);
        if(response == null) {
            return null;
        }
        return response.data;
    },

    signup: async (data) => {
        var uri = `${ENV_BASE_API}${CONTEXT_PATH}/customer`;

        var header = {
            [HeaderParam.CONTENT_TYPE]: 'application/json',
        }

        const response = await BaseApi.post(uri, data, header);
        if(response == null) {
            return null;
        }
        return response.data;
    }
};

export default UserApi;