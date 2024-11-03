import { BASE_API } from '../../constant/RouteConstant';
import * as HeaderParams from '../../constant/SecurityConstant';

import BaseApi from './BaseApi';

const CONTEXT_PATH = "/api/user-service/address"

const AddressApi = {
    get: async (id) => {
        const token = sessionStorage.getItem('access_token');

        var uri = `${BASE_API}${CONTEXT_PATH}/user/${id}`;

        var header = {
            'Content-Type': 'application/json',
            [HeaderParams.AUTHORIZATION]: `Bearer ${token}`
        }

        var params = {}

        const response = await BaseApi.get(uri, header, params);
        if(response == null) {
            return null;
        }
        return response.data;
    }
};

export default AddressApi;