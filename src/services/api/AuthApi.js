import { BASE_API } from '../../constant/RouteConstant';
import * as HeaderParams from '../../constant/SecurityConstant';

import BaseApi from './BaseApi';

const CONTEXT_PATH = "/api/user-service/oauth2/token"

const AuthApi = {
    login: async (data) => {
        var uri = `${BASE_API}${CONTEXT_PATH}`;

        var header = {
            'Content-Type': 'application/x-www-form-urlencoded',
            [HeaderParams.HEADER_ORIGIN]: HeaderParams.HEADER_ORIGIN_VALUE
        }

        const response = await BaseApi.post(uri, data, header);
        if(response == null) {
            return null;
        }
        var result = response.data;
        sessionStorage.setItem('access_token', result.access_token);
        sessionStorage.setItem('refresh_token', result.refresh_token);
        
        return result;
    },
    
    // otp: async (data) => {
    //     try {
    //         const response = await axios.post(`${BASE_API}` + CONTEXT_PATH, data);
    //         return response.data;
    //     } catch (error) {
    //         throw error;
    //     }
    // },
};

export default AuthApi;